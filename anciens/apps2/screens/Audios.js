import React, { Component } from 'react';
import { View, Image, TouchableOpacity, Text, FlatList, ScrollView, Alert, StyleSheet } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import {styles, lists} from '../../styles/styleAcuueil';
import Icon from 'react-native-vector-icons/Ionicons';
import Video from 'react-native-video';
import Sound from 'react-native-sound';
import I18n from 'react-native-i18n';
import en from '../../i18/en';
import fr from '../../i18/fr';
import es from '../../i18/es';
import config from '../../config.json';
import VideoItem from '../components/list/VideoItem';
import AudioItem from '../components/list/AudioItem';
import { connectToRedux } from '../config/reduxconfig';
import Homelayout from '../layouts/Homelayout';
import Dates from 'react-native-dates';
import moment from 'moment';
import SearchInput from '../components/textInputs/SearchInput';
import BoxConsultation from '../components/buttons/BoxConsultation';
import HeaderList from '../components/header/HeaderList';
import { searchFilterFunction } from '../utils/dataManip';
import Svg, { Path } from 'react-native-svg';
import AddButton from '../components/buttons/AddButton';
import AudioModal from '../components/modals/AudioModal';
import { groupDataByIntitule } from '../utils/dataManip';
import ArrowBackButton from '../components/buttons/ArrowBackButton';
import AudioDetails from '../components/audiocomponents/AudioDetails';
import BeforeAudio from '../components/modals/BeforeAudio';
const base_url = config.base_url;

class Audios extends Component {
  static navigationOptions = {
    headerShown: false
  };

  constructor(props) {
    super(props);
    this.state = {
      // id_groupe: this.props.navigation.state.route.id_groupe,
      headerbackColor: '#192356',
      videoColor: '#081241',
      expressionColor: '#081241',
      imageColor: '#081241',
      audioColor: '#081241',
      refreshing:false,
      date: null,
      focus: 'startDate',
      startDate: null,
      endDate: null,
      audioData:this.props.audioData,
      newAudio:false,
      IsSelected:false,
      newItem:null,
      beforeAudio:false
    };

    I18n.locale = this.state.trand;
    I18n.fallbacks = true;
    I18n.translations = {
      en,
      fr,
      es
    };
    this.arrayholder = this.props.audioData;
    this.props.navigation.addListener('willFocus', () => {
      this.toggleAudioColor();
      this.setState({audioData:this.props.audioData});
      this.openFirstDate();

    });

    this.loadMore = this.loadMore.bind(this);
    this.currentMonth = moment();

    // Générez une liste des mois depuis le mois actuel jusqu'à 12 mois en arrière
    this.months = [];
    for (let index = 0; index < 13; index++) {
      const month = this.currentMonth.clone().subtract(index, 'months');
      
      // Arrêtez la génération si nous atteignons le mois actuel
      if (month.isSameOrBefore(this.currentMonth, 'month')) {
        this.months.unshift({
          month: month.format('MMM'), // Utilisez 'MMM' pour obtenir l'abréviation du mois
          year: month.format('YYYY'),
        });
      }
    }

    // Inversez la liste
    this.months.reverse();
  }
 componentDidMount (){
  this.openFirstDate();
  console.log("VIDEO LISTE in AUDIOS", this.props.audioData);
  // audioData
  // const groupedData = groupDataByIntitule(this.state.audioData);
  // console.log(JSON.stringify(groupedData));

 }

 


  handleRefresh = () => {
    this.setState(
      {
        refreshing: true
      },
      () => {
        console.log("refreshing");
        this.getVideo();
      }
    );
    this.setState({
      refreshing: false
    });
  };

  loadMore() {
    const { page, myv, myvideo } = this.state;
    const start = page * ITEMS_PER_PAGE;
    const end = (page + 1) * ITEMS_PER_PAGE;

    const newData = myvideo.slice(start, end);
    this.setState({ myv: [...myv, ...newData], page: page + 1 });
  }

  supprimer = (idxp, name) => {
    const {userInfo} = this.props;
    const { id_groupe } = this.state;
    console.log(name + ' et ' + idxp + ' ' + id_groupe);
      fetch(base_url + '/portail-stagiaire/del_audio.php', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: idxp,
          myFile: name,
          id_groupe: userInfo.id_groupe
        })
      }).then((response) => response.json())
        .then((rep) => {
          if (rep == '') {
            alert('le serveur ne repond pas');
          }
          else {
            console.log(rep);
            const {userInfo} = this.props;
            this.props.fetchAudio(userInfo.id)
            .then(() => {
              this.setState({audioData: this.props.audioData});
              this.chronologicalView();
              alert('audio supprimé');
            });
          }
        }).catch((error) => {
          console.error(error);
        });
    
  }

  delete = (idxp, name) => {
    Alert.alert(
      `${I18n.t('DELETING VIDEO')}`,
      `${I18n.t('Are you sure you want to delete this Audio')}`,
      [
        { text: `${I18n.t('NO')}`, onPress: () => console.warn('NO Pressed') },
        { text: `${I18n.t('YES')}`, onPress: () => this.supprimer(idxp, name) },
      ]
    );
  };

  getVideo = () => {
    console.log(this.state.id);
    fetch(base_url + '/portail-stagiaire/listvideo.php', {
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-type': 'application/json'
      },
      body: JSON.stringify({
        id: this.state.id,
      })
    })
      .then((response) => response.json())
      .then((rep) => {
        let myv = rep.slice(0, 2);
        const testk = rep.slice(0, 5);
        console.log(myv);
        this.setState({
          myv: rep
        });
        this.arrayholder = rep;
      })
      .catch((error) => {
        console.error(error);
      });
  }


  toggleVideoColor = () => {
    this.setState({
      videoColor: '#DB4165',
      expressionColor: this.state.headerbackColor,
      imageColor: this.state.headerbackColor,
      audioColor: this.state.headerbackColor,
    });
    this.props.navigation.navigate('Recordings',{'id_groupe' : this.state.id_groupe});
  };

  toggleExpressionColor = () => {

    this.setState({
      videoColor: this.state.headerbackColor,
      expressionColor: '#C9902A',
      imageColor: this.state.headerbackColor,
      audioColor: this.state.headerbackColor,
    });
    this.props.navigation.navigate('ExpressionList',{'id_groupe' : this.state.id_groupe});
  };

  toggleImageColor = () => {
    this.setState({
      videoColor: this.state.headerbackColor,
      expressionColor: this.state.headerbackColor,
      imageColor: '#48A2F1',
      audioColor: this.state.headerbackColor,
    });
  };

  toggleAudioColor = () => {
    this.setState({
      videoColor: this.state.headerbackColor,
      expressionColor: this.state.headerbackColor,
      imageColor: this.state.headerbackColor,
      audioColor: '#47BD7A',
    });
  };
  toggleFirst = () => {
   this.toggleAudioColor();
  };

  handleChangeText = (text) => {
    this.setState({ value: text }); 
    searchFilterFunction(text, this.arrayholder, (newData) => {
      this.setState({ audioData: newData }); 
    });
  };

  filterbytwodate = (lowerLimit,upperLimit) => {
    const newData = this.props.audioData.filter(
      data =>
        lowerLimit <= data.date_creation && data.date_creation <= upperLimit,
    );
    console.log(newData);
    this.setState({
      audioData: newData,
    });

    // if(this.state.startDate!=null && this.state.endDate!=null){
    //     const lowerLimit = this.state.startDate.format("YYYY-MM-DD");
    //     const upperLimit = this.state.endDate.format("YYYY-MM-DD");
    //     console.log('lowerLimit:'+lowerLimit+' et '+upperLimit);
    //     alert('clicked');
    //     const newData = this.arrayholder.filter(data => lowerLimit <= data.date_creation && data.date_creation <= upperLimit);
    //     console.log("New List: "+newData);
    //     this.setState({
    //       audioData: newData,
    //     });
    //   }
  }

  categoryViewFilter = (id, intitule, index) => {
    const { idecat } = this.state;
    let colors = ['#FFE9F9', '#EAF9FE', '#FFF5E5', '#FBF5FF', '#FFF1EF', '#A2A2A2'];
    if (id !== '') {
      return (
        <TouchableOpacity
          onPress={() => { this.filterbycat(intitule), this.setState({ idecat: id, pic: id, toListe:true, selected:intitule })}}>
          <View style={{ marginLeft:5, borderRadius: 5, justifyContent: 'center', borderBottomWidth:0.2, borderTopWidth:0.2, borderColor:'white', padding:5}}>
            <View
              style={{
                justifyContent:'center'
              }}>
              <Text style={{
                marginHorizontal: wp('3%'),
                marginVertical: hp('0.5%'),
                fontWeight: '400',
                color:'white',
                fontSize:12,
                textAlign: 'left',
              }}>
                {intitule}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      );
    }
  }

  filterbycat = itemValue => {
    this.setState({ picat: itemValue, refreshing:false });
    const newData = this.props.audioData.filter(item => {
      const itemData = `${item.intitule.toUpperCase()}`;
      const textData = itemValue.toUpperCase();
      return itemData.indexOf(textData) > -1;
    });
    this.setState({
      audioData: newData,
    });
  }

  openFirstDate(){
    if (!this.state.showCat) {
      // Sélectionnez le premier élément
      const firstItem = this.months[0];
      
      // Cliquez automatiquement sur le premier élément
      this.handleDateClick(`${firstItem.month} ${firstItem.year}`);
    }
  }
  chronologicalView(){
    // this.openFirstDate();
    if (this.months.length > 0) {
      // Sélectionnez le premier élément
      const firstItem = this.months[0];
      
      // Cliquez automatiquement sur le premier élément
      this.handleDateClick(`${firstItem.month} ${firstItem.year}`);
    }
    this.setState({
      showCat:false
    });
  }
  toListe(){
    this.setState({IsSelected:false});
  }
  toListe = (item) => {
    this.setState({IsSelected:false});
    console.log("Naviguer vers une autre vue avec l'élément :", item);
  };
  toDetails(item){
    console.log(item);
    this.setState({IsSelected:true, newItem: item});
  }

  handleDateClick = (clickedMonth) => {
    const clickedDate = moment(`${clickedMonth}-01`, 'MMM YYYY'); // La date est fixée au 1er jour du mois
    this.setState({
      selectedMonth: clickedDate.format('MMM YYYY'),
    });
    console.log(clickedDate.format('MMM YYYY'));
    const firstDayOfMonth = clickedDate.clone().startOf('month');
    const lastDayOfMonth = clickedDate.clone().endOf('month');
  
    const formattedFirstDay = firstDayOfMonth.format('YYYY-MM-DD');
    const formattedLastDay = lastDayOfMonth.format('YYYY-MM-DD');
  
    // console.log(`Premier jour du mois : ${formattedFirstDay}`);
    // console.log(`Dernier jour du mois : ${formattedLastDay}`);
  

    // Appel de la fonction filterbytwodate avec les limites inférieure et supérieure calculées
    this.filterbytwodate(formattedFirstDay, formattedLastDay);
  
    // Calcul de l'intervalle en jours
    const intervalInDays = lastDayOfMonth.diff(firstDayOfMonth, 'days') + 1;
    // console.log(`Intervalle en jours : ${intervalInDays} jours`);
  }
  renderAudioItem = ({ item, index }) => {
    const {userInfo} = this.props;
    
    // Votre logique de rendu ici
    return (
      <View style={{ flexDirection: 'row', marginLeft: wp('5%') }}>
        <AudioItem
          f_name={item.f_name}
          type_file={item.type_file}
          legende_f={item.content_langue_origine.slice(0, 25)+'...'}
          content_orig= {item.content_langue_origine}
          content_cible= {item.content_langue_cible}
          id_groupe={this.state.id_groupe}
          itemDetails={item}
          onDelete={() => this.delete(item.id_expression, item.audio_langue_origine)}
          onPlay={() => {this.props.navigation.navigate('Audioplayer', { namevid: item.f_name, id_groupe: userInfo.id_groupe, original:item.content_langue_origine, trad:item.content_langue_cible, audio_langue_origine:item.audio_langue_origine,itemDetails:item })}}
          // onPlay={() => {this.setState({IsSelected:true}), this.toDetails(item)}}
        />
      </View>
    );
  };
  closeModal = () => {
    this.setState({newAudio:false,newText:false, newVideo:false, newImage:false, beforeAudio:false, beforeTexte:false, beforeVideo:false, beforeImage:false});
  };
  goToAudio = () => {
    this.closeModal();
    this.props.closeAll();
    const {userInfo} = this.props;
    this.props.navigation.navigate('Audios',{id_groupe:userInfo.id_groupe});
  };
  render() {
    const isDateBlocked = (date) =>
    date.isBefore(moment('05/09/2000','DD/MM/YYYY'));
    const onDatesChange = ({ startDate, endDate, focusedInput }) =>{
    this.setState({ ...this.state, focus: focusedInput }, () =>
    this.setState({ ...this.state, startDate, endDate })
    );
  }
  const groupedData = groupDataByIntitule(this.state.audioData);
    const {user} = this.state;
    return (
      <Homelayout  navigation={this.props.navigation}>
        <View style={{alignSelf:'center', width:wp('100%'), zIndex:0}}>
          <View 
            style={{
              height: hp('84%'),
              width:wp('100%'),
              backgroundColor:'#060a20'
            }}
          >
            <View style={[lists.headerStyle]}>
              <HeaderList
                videoToggle={this.toggleVideoColor}
                expressionToggle={this.toggleExpressionColor}
                imageToggle={this.toggleImageColor}
                audioToggle={this.toggleAudioColor}
                firstElToggle={this.toggleFirst}
                navigation={this.props.navigation} 
                videoColor = {this.state.videoColor}
                expressionColor = {this.state.expressionColor}
                imageColor = {this.state.imageColor}
                audioColor = {this.state.audioColor}
                id_groupe = {this.state.id_groupe}
              />
              <View style={lists.addNew}>
                <TouchableOpacity
                  onPress={() => {
                    console.log('Accueil');
                  }}
                >
                  <View style={{ flexDirection: 'row'}}>
                    <Text style={{ color: 'white', fontSize: 20 }}>
                      My Audios
                    </Text>
                  </View>
                </TouchableOpacity>
                <AddButton
                onPress={() => {
                  this.setState({beforeAudio:true});
                }}
                backgroundColor="#47BD7A" 
                />
              </View>
            </View>

            <View style={{flexDirection:'row', alignSelf:'center', display:'none'}}> 
              <SearchInput
                placeholder={I18n.t('Type your one or two words')}
                value={this.state.value}
                onChangeText={this.handleChangeText}
                onSearch={this.handleSearch}
              />
              <TouchableOpacity
                onPress={()=>this.setState({ bydate: !this.state.bydate })}
                style={{
                  borderRadius:15,
                  paddingLeft:10,
                  paddingRight:10,
                  marginLeft:wp('2.5%'),
                  justifyContent:'center',
                  height:35,
                  backgroundColor:'#EA1E69'
                  
                }}
              >
                <Icon name={'calendar'} size={20} color={'white'} />
              </TouchableOpacity>
            </View>
            <View
              style={{
                flexDirection:'column'
              }}
            >
              <View
                style={{
                  flexDirection:'row'
                }}>
              </View>
            </View>
            {this.state.bydate?( 
            <View
              style={{
                marginTop: hp('2%'),
                backgroundColor:'white'
              }}
            >
              <Dates
                onDatesChange={onDatesChange}
                isDateBlocked={isDateBlocked}
                startDate={this.state.startDate}
                endDate={this.state.endDate}
                focusedInput={this.state.focus}
                range
              />
              <View style={{flexDirection:'row'}}>
                <View 
                  style={{flexDirection:'column',
                    width:wp('65%'),
                    marginLeft:wp('2.5%')
                  }}
                  >
                  <Text style={[styles.date, this.state.focus === 'startDate' && styles.focused]}>{this.state.startDate && this.state.startDate.format("LL")} </Text>
                  <Text style={[styles.date, this.state.focus === 'endDate' && styles.focused]}>{this.state.endDate && this.state.endDate.format("LL")}</Text>
                </View>
                <TouchableOpacity
                  onPress={()=>{this.filterbytwodate(),this.setState({bydate:false})}}
                  style={{
                    padding:10,
                    backgroundColor:'#0C1D65',
                    borderRadius:5,
                    // width:80,
                    marginRight:wp('2.5%'),
                    alignItems:'center',
                    position:'relative',
                    right:wp('2.5%'),
                    marginTop:hp('1%'),
                    marginBottom:hp('1%')
                  }}
                  >
                  <Text
                    style={{textAlign:'center',color:'white'}}
                    >
                    {I18n.t('Search')}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
            ):null
            }
            {/* CATEGORY */}
            
            {/* CATEGORY */}



            {/* filtre */}
            {this.state.IsSelected?
              (
              <AudioDetails
              newItem = {this.state.newItem}
              toListe={this.toListe}
              userInfo = {this.props.userInfo}

              />
              ):
              (
                <View>
                  <View>
                    <View
                      style={{flexDirection:'row', justifyContent:'center'}}
                      >
                      {this.state.showCat?
                        (
                          <TouchableOpacity
                            onPress={() => {this.chronologicalView(), this.openFirstDate()}}>
                            <View
                              style={{
                                justifyContent: 'center',
                                width:wp('45%'),
                                backgroundColor:'#313d6e',
                                marginBottom: 15,
                                paddingVertical:5,
                                paddingLeft:10
  
                              }}>
                              <View
                                style={{
                                  height: hp('4%'),
                                  flexDirection: 'row',   
                                }}>
                                <View 
                                  style={{
                                    flexDirection: 'row',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    paddingRight: 15,
                                  }}>
                                  <Svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style="fill: rgba(0, 0, 0, 1);transform: ;msFilter:;">
                                    <Path d="M5 22h14c1.103 0 2-.897 2-2V6c0-1.103-.897-2-2-2h-2V2h-2v2H9V2H7v2H5c-1.103 0-2 .897-2 2v14c0 1.103.897 2 2 2zM5 7h14v2H5V7z"
                                    fill="#DB4165" 
                                    />
                                  </Svg>       
                                  <Text
                                    style={{
                                      color: 'white',
                                      marginLeft: 15,
                                      fontSize: 14,
                                    }}>
                                    Chronological View
                                  </Text>
                                </View>
                              </View>
                            </View>
                          </TouchableOpacity>
                        ):
                        (
                          <TouchableOpacity
                            onPress={() => this.chronologicalView()}>
                            <View
                              style={{
                                justifyContent: 'center',
                                width:wp('45%'),
                                marginBottom: 15,
                                paddingVertical:5,
                                paddingLeft:10
                              }}>
                              <View
                                style={{
                                  height: hp('4%'),
                                  flexDirection: 'row',   
                                }}>
                                <View 
                                  style={{
                                    flexDirection: 'row',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    paddingRight: 15,
                                  }}>
                                    <Svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style="fill: rgba(0, 0, 0, 1);transform: ;msFilter:;">
                                    <Path d="M5 22h14c1.103 0 2-.897 2-2V6c0-1.103-.897-2-2-2h-2V2h-2v2H9V2H7v2H5c-1.103 0-2 .897-2 2v14c0 1.103.897 2 2 2zM5 7h14v2H5V7z"
                                    fill="#DB4165" 
                                    />
                                  </Svg>       
                                  <Text
                                    style={{
                                      color: 'white',
                                      marginLeft: 15,
                                      fontSize: 14,
                                    }}>
                                    Chronological View
                                  </Text>
                                </View>
                              </View>
                            </View>
                          </TouchableOpacity>
                        )
                      }
                      {this.state.showCat?
                        (
                          <TouchableOpacity
                            onPress={() => {this.setState({ showCat: true }), this.setState({audioData:this.props.audioData})}}>
                            <View
                              style={{
                                justifyContent: 'center',
                                marginBottom: 15,
                                width:wp('45%'),
                                paddingVertical:5,
                                paddingLeft:10
                              }}>
                              <View
                                style={{
                                  height: hp('4%'),
                                  flexDirection: 'row',
                                  justifyContent: 'space-between',
                                }}>
                                <View
                                  style={{
                                    flexDirection: 'row',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    paddingRight: 15,
                                  }}>
                                  <Svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style="fill: rgba(0, 0, 0, 1);transform: ;msFilter:;">
                                    <Path d="M4 13h6a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1zm-1 7a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-4a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v4zm10 0a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-7a1 1 0 0 0-1-1h-6a1 1 0 0 0-1 1v7zm1-10h6a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1h-6a1 1 0 0 0-1 1v5a1 1 0 0 0 1 1z"
                                    fill="#DB4165" 
                                  />
                                  </Svg>
                                  <Text
                                    style={{
                                      color: 'white',
                                      marginLeft: 15,
                                      fontSize: 14,
                                    }}>
                                    Theme
                                  </Text>
                                </View>
                              </View>
                            </View>
                          </TouchableOpacity>
                        ):
                        (
                          <TouchableOpacity
                            onPress={() => {this.setState({ showCat: true }), this.setState({audioData:this.props.audioData})}}
                            >
                            <View
                              style={{
                                justifyContent: 'center',
                                marginBottom: 15,
                                width:wp('45%'),
                                backgroundColor:'#313d6e',
                                paddingVertical:5,
                                paddingLeft:10
                              }}>
                              <View
                                style={{
                                  height: hp('4%'),
                                  flexDirection: 'row',
                                  justifyContent: 'space-between',
                                }}>
                                <View
                                  style={{
                                    flexDirection: 'row',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    paddingRight: 15,
                                  }}>
                                  <Svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style="fill: rgba(0, 0, 0, 1);transform: ;msFilter:;">
                                    <Path d="M4 13h6a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1zm-1 7a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-4a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v4zm10 0a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-7a1 1 0 0 0-1-1h-6a1 1 0 0 0-1 1v7zm1-10h6a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1h-6a1 1 0 0 0-1 1v5a1 1 0 0 0 1 1z"
                                    fill="#DB4165" 
                                  />
                                  </Svg>
                                  <Text
                                    style={{
                                      color: 'white',
                                      marginLeft: 15,
                                      fontSize: 14,
                                    }}>
                                    Theme
                                  </Text>
                                </View>
                              </View>
                            </View>
                          </TouchableOpacity>
                        )
                      }
                    </View>
                    {!this.state.showCat?
                      (
                        <View style={{paddingHorizontal:wp('5%')}}>
                          <FlatList
                            horizontal
                            data={this.months}
                            keyExtractor={(item, index) => index.toString()}
                            renderItem={({ item, index }) => (
                              <TouchableOpacity onPress={() => this.handleDateClick(`${item.month} ${item.year}`)}>
                                <Text
                                  style={ `${item.month} ${item.year}` === this.state.selectedMonth ? styleList.highlighted : styleList.normalMonth}
                                >
                                  {`${item.month} ${item.year}`}
                                </Text>
                              </TouchableOpacity>
                            )}
                          />
                        </View>
                      ):null
                    }
                    
                  </View>
                  <View style={{ height: hp('58%'), backgroundColor:'#060a20', paddingBottom:10}}>
                    {/* <ScrollView> */}
                      <FlatList
                        data={groupedData}
                        keyExtractor={(item) => item.intitule}
                        renderItem={({ item }) => (
                          <View>
                            <View>
                              <Text style={{ color: 'white', padding: 8, marginLeft: 15, fontSize: 16, fontWeight: 'bold', marginTop: 15 }}>
                                {item.intitule}
                              </Text>
                            </View>
                            <FlatList
                              data={item.items}
                              keyExtractor={(item) => item.id_expression}
                              renderItem={this.renderAudioItem}
                            />
                          </View>
                        )}
                      />
                    {/* </ScrollView> */}
                  </View>
                </View>
              )
            }
            {/* </View> */}
            </View>
            </View>
            <BeforeAudio visible={this.state.beforeAudio} onClose={() => this.closeModal()} navigation={this.props.navigation} list = {()=>this.goToAudio()} newp = {()=>{this.closeModal(),this.props.navigation.navigate('Enregistre')}} />           
            <AudioModal visible={this.state.newAudio} category={this.props.category} userInfo = {this.props.userInfo} onClose={() => this.setState({newAudio:false})} navigation={this.props.navigation} />
      </Homelayout>
    );
  }
}

export default connectToRedux(Audios);

const styleList = StyleSheet.create({
  container: {
    height: hp('88%'),
    width: wp('100%'),
    alignSelf: 'center',
    backgroundColor: '#0d1569',
  },
  headerText: {
    color: 'white',
    fontWeight: '400',
    fontSize: 16,
  },
  highlighted: {
    marginLeft: 5,
    borderRadius: 5,
    justifyContent: 'center',
    borderWidth: 0.4,
    backgroundColor:'transparent',
    marginRight:5,
    // borderTopWidth: 0.2,
    borderColor: '#C9902A',
    padding: 8,
    color:'white'
  },
  normalMonth:{
    marginLeft: 5,
    borderRadius: 5,
    justifyContent: 'center',
    // borderWidth: 0.2,
    backgroundColor:'#0c123b',
    marginRight:5,
    // borderTopWidth: 0.2,
    borderColor: '#C9902A',
    padding: 8,
    color:'white',
    fontSize:14
  }
});