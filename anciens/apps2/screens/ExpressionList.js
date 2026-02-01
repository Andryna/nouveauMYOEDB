import React, {Component} from 'react';
import {View, Text, FlatList, TouchableOpacity, StyleSheet, Alert} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Fontawesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Dates from 'react-native-dates';
import Homelayout from '../layouts/Homelayout';
import {connectToRedux} from '../config/reduxconfig';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import SearchInput from '../components/textInputs/SearchInput';
import I18n from 'react-native-i18n';
import moment from 'moment';
import TimeFilterButton from '../components/buttons/TimeFilterButton';
import Expressions from '../components/list/Expressions';
import axios from 'axios';
import Sound from 'react-native-sound';
import {
  searchFilterFunction,
  filterbycat,
  filterByDateRange,
  filterByMonth,
  filterByWeek,
} from '../utils/dataManip';
import HeaderList from '../components/header/HeaderList';
import TextModals from '../components/modals/TextModals';
import Svg, {Path} from 'react-native-svg';
import AddButton from '../components/buttons/AddButton';
import {lists} from '../../styles/styleAcuueil';
import config from '../../config.json';
import ShowText from '../components/modals/ShowText';
import ShowEditText from '../components/modals/ShowEditText';
import Tts from "react-native-tts";
import { PowerTranslator, ProviderTypes, TranslatorConfiguration, TranslatorFactory } from 'react-native-power-translator';
import { interactWithGemini } from '../utils/request';
const base_url = config.base_url;
class ExpressionList extends Component {
  static navigationOptions = {
    headerShown: false,
    headerStyle: {
      backgroundColor: '#2f3c7e',
    },
    drawerLabel: 'Home',
    drawerIcon: ({tintColor}) => (
      <Icon name="home" color={'blue'} size={20} />
    ),
    headerTintColor: '#fff',
    headerLeft: () => null,
    headerRight: () => <View />
  };
  constructor(props) {
    super(props);
    this.state = {
      date: null,
      focus: 'startDate',
      startDate: null,
      endDate: null,
      data: this.props.data,
      headerbackColor: '#192356',
      videoColor: '#081241',
      expressionColor: '#081241',
      imageColor: '#081241',
      audioColor: '#081241',
      toListe: false,
      selected: '',
      refreshing: false,

      newAudio: false,
      newVideo: false,
      newText: false,
      newImage: false,
      menu: this.props.menu,
      beforeAudio: false,
      beforeTexte: false,
      beforeVideo: false,
      beforeImage: false,
      showCat: true,
      showText:false,
      selectedText: '',
      selectedTrad: '',
      showEditText:false,
      trad:false,
      selectedMonth: null,
      selectedId:'',
      selectedCat:'',
      target_langue_cible:"1",
      langue: "fr"
      // data:this.props.data
      // Vos états ici
    };
    this.arrayholder = this.props.data;
    this.props.navigation.addListener('willFocus', () => {
      // console.log('Réponse de Gemini:', this.state.data);
      this.toggleExpressionColor();
      this.chronologicalView();
      // this.handleRefresh();
      const {userInfo, data, category, nbExp, video} = this.props;
      // var jsonArray = JSON.parse(category);
      if (category.length > 0) {
        const myfirstcat = category[0];
        // console.log("MY REDUX",myfirstcat.id);
          this.filterbycat(myfirstcat.intitule);
            this.setState({
              idecat: myfirstcat.id,
              pic: myfirstcat.id,
              // toListe: true,
              selected: myfirstcat.intitule,
            });
    } else {
        console.log('Le tableau est vide.');
    }
    });

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


  

  componentDidMount() {
 
   this.getfirstCat();
   this.chronologicalView();
  }
  getfirstCat(){
    const {userInfo, data, category, nbExp, video} = this.props;
    // var jsonArray = JSON.parse(category);
    // this.handleRefresh();
    if (category.length > 0) {
      const myfirstcat = category[0];
      // console.log("MY REDUX",myfirstcat.id);
        this.filterbycat(myfirstcat.intitule);
          this.setState({
            idecat: myfirstcat.id,
            pic: myfirstcat.id,
            // toListe: true,
            selected: myfirstcat.intitule,
          });
    } else {
        console.log('Le tableau est vide.');
    }
  }
  handleDateClick = (clickedMonth) => {
    const clickedDate = moment(`${clickedMonth}-01`, 'MMM YYYY'); // La date est fixée au 1er jour du mois
    this.setState({
      selectedMonth: clickedDate.format('MMM YYYY'),
    });
    // alert(clickedDate.format('MMM YYYY'));
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
  };
  
  
  handleChangeText = text => {
    // Gérer les changements de texte
  };

  handleSearch = () => {
    // Gérer la recherche
  };

  filterByWeek = () => {
    // Filtrer par semaine
  };

  filterByMonth = () => {
    // Filtrer par mois
  };

  filterByYear = () => {
    // Filtrer par année
  };

  onDatesChange = dates => {
    // Gérer les changements de dates
  };

  isDateBlocked = date => {
    // Vérifier si une date est bloquée
  };

  filterbytwodate = (lowerLimit,upperLimit) => {
    // if  (this.state.startDate != null && this.state.endDate != null) {
      // console.log('lowerLimit:' + lowerLimit + ' et ' + upperLimit);
      const newData = this.arrayholder.filter(
        data =>
          lowerLimit <= data.date_creation && data.date_creation <= upperLimit,
      );
      // console.log(newData);

      this.setState({
        data: newData,
      });
    // }

    }

 handleRefresh = () => {
    const {userInfo, data, category, nbExp, video} = this.props;
    // var jsonArray = JSON.parse(category);
    if (category.length > 0) {
      const myfirstcat = category[0];
      console.log("MY REDUX",myfirstcat.id);
        this.filterbycat(myfirstcat.intitule);
          this.setState({
            idecat: myfirstcat.id,
            pic: myfirstcat.id,
            // toListe: true,
            selected: myfirstcat.intitule,
          });
  } else {
      console.log('Le tableau est vide.');
  }
    this.setState(
      {
        refreshing: true,
      },
      () => {
      this.props.fetchData(userInfo.id)
        .then(() => {
          this.setState({data:this.props.data, refreshing:false});
          this.arrayholder = this.props.data;
          if (category.length > 0) {
            const myfirstcat = category[0];
            console.log("MY REDUX",myfirstcat.id);
              this.filterbycat(myfirstcat.intitule);
                this.setState({
                  idecat: myfirstcat.id,
                  pic: myfirstcat.id,
                  // toListe: true,
                  selected: myfirstcat.intitule,
                });
                // this.chronologicalView();
        } else {
            console.log('Le tableau est vide.');
        }
        })
      }
    );
  };


    handleRefresh = async () => {
  //   const {userInfo, data, category, nbExp, video} = this.props;
  //   // var jsonArray = JSON.parse(category);
  //   if (category.length > 0) {
  //     const myfirstcat = category[0];
  //     // console.log("MY REDUX",myfirstcat.id);
  //       this.filterbycat(myfirstcat.intitule);
  //         this.setState({
  //           idecat: myfirstcat.id,
  //           pic: myfirstcat.id,
  //           // toListe: true,
  //           selected: myfirstcat.intitule,
  //         });
  // } else {
  //     console.log('Le tableau est vide.');
  // }
  // this.setState(
  //   { refreshing: true },
  //   () => 
    // {
      // Move async operations out of the setState callback
      this.fetchDataAndHandleCategory();
      
  //   }
  // );
  };


  fetchDataAndHandleCategory = async () => {
    const { userInfo, category } = this.props;
  
    try {
      // Wait for the fetch data promise to resolve
      await this.props.fetchData(userInfo.id);
  
      // Update the state with fetched data and stop refreshing
      this.setState({ data: this.props.data, refreshing: false });
      // Store the data in arrayholder
      this.arrayholder = this.props.data;
      // alert('eto');
      // console.log(this.state.data);
      
      // If category exists, apply filtering and update state
      if (category.length > 0) {
        const myfirstcat = category[0];
        // console.log("MY REDUX", myfirstcat.id);
  
        this.filterbycat(myfirstcat.intitule);
  
        this.setState({
          idecat: myfirstcat.id,
          pic: myfirstcat.id,
          selected: myfirstcat.intitule,
          data: this.props.data
        });
        this.chronologicalView();
      } else {
        console.log('Le tableau est vide.');
      }
    } catch (error) {
      // Handle errors during data fetch
      console.error("Error fetching data: ", error);
      this.setState({ refreshing: false });
    }
  };

  categoryViewFilter = (id, intitule, index) => {
    const {idecat} = this.state;
    let colors = [
      '#FFE9F9',
      '#EAF9FE',
      '#FFF5E5',
      '#FBF5FF',
      '#FFF1EF',
      '#A2A2A2',
    ];
    if (id !== idecat) {
      return (
        <TouchableOpacity
          onPress={() => {
            this.filterbycat(intitule),
              this.setState({
                idecat: id,
                pic: id,
                // toListe: true,
                selected: intitule,
              });
          ;}}>
          <View
            style={{
              marginLeft: 5,
              borderRadius: 5,
              justifyContent: 'center',
              // borderWidth: 0.2,
              backgroundColor:'#0c123b',
              marginRight:5,
              // borderTopWidth: 0.2,
              borderColor: '#C9902A',
              padding: 8,
            }}>
            <View
              style={{
                justifyContent: 'center',
              }}>
              <Text
                style={{
                  marginHorizontal: wp('3%'),
                  marginVertical: hp('0.5%'),
                  fontWeight: '400',
                  color: 'white',
                  fontSize: 12,
                  textAlign: 'left',
                }}>
                {intitule}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      );
    }else{
      return (
        <TouchableOpacity
          onPress={() => {
            this.filterbycat(intitule),
              this.setState({
                idecat: id,
                pic: id,
                // toListe: true,
                selected: intitule,
              });
          ;}}>
          <View
            style={{
              marginLeft: 5,
              borderRadius: 5,
              justifyContent: 'center',
              borderWidth: 0.4,
              // backgroundColor:'red',
              marginRight:5,
              // borderTopWidth: 0.2,
              borderColor: '#C9902A',
              padding: 8,
            }}>
            <View
              style={{
                justifyContent: 'center',
              }}>
              <Text
                style={{
                  marginHorizontal: wp('3%'),
                  marginVertical: hp('0.5%'),
                  fontWeight: '400',
                  color: 'white',
                  fontSize: 12,
                  textAlign: 'left',
                }}>
                {intitule}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      );
    }
  };

  filterbycat = itemValue => {
    this.setState({picat: itemValue, refreshing: false});
    const newData = this.props.data.filter(item => {
      const itemData = `${item.intitule.toUpperCase()}`;
      const textData = itemValue.toUpperCase();
      return itemData.indexOf(textData) > -1;
    });
    this.setState({
      data: newData,
    });
  };

  contentView = (
    id,
    or,
    ci,
    od,
    intit,
    date,
    name,
    type,
    legende,
    index,
    id_category,
    target_langue_cible,
    langue,
    item
  ) => {
    const {ide} = this.state;
    const {userInfo} = this.props;
    if (id !== '') {
      return (
        <View style={{flexDirection: 'row', justifyContent: 'space-evenly'}}>
          <Expressions
            id_stag={userInfo.id}
            id={id}
            or={or}
            ci={ci}
            intit={intit}
            date={date}
            name={name}
            od={od}
            type={type}
            legende={legende}
            index={index}
            id_category={id_category}
            langue={langue}
            ide={ide}
            deleteItem={this.delete}
            onShare={this.onShare}
            _play={this._play}
            show = {this.show}
            showEdit = {this.showEdit}
            refresh = {this.handleRefresh}
            item = {item}
          />
        </View>
      );
    }
  };
  show = (
    id,
    or,
    ci,
    od,
    intit,
    date,
    name,
    type,
    legende,
    index,
    id_category,
    target_langue_cible,
    langue) => {
    // alert('langue: '+langue);
    this.setState({showText:true, selectedText:or, selectedTrad: ci, selectedId:id, selectedCat:id_category, target_langue_cible:target_langue_cible, langue:langue});
  };
  showEdit = (id, or, ci) => {
    // alert('not filalized');
    this.setState({showEditText:false, selectedText:or, selectedTrad: ci});
  };
  handleChageOrig = (newtext) => {
    // console.log('txt: '+newtext);
    this.setState({selectedText:newtext, trad:true});
  }

  supprimer = (idxp, name) => {
    const { id_groupe } = this.state;
    console.log(name + ' et ' + idxp + ' ' + id_groupe);
  
      fetch(base_url + '/portail-stagiaire/deleteexp.php', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: idxp
        })
      })
      .then((response) => response.json())
        .then((rep) => {
          if (rep == '') {
            alert('le serveur ne repond pas');
          }
          else {
            // alert(rep);
            const {userInfo} = this.props;
            this.props.fetchData(userInfo.id)
            .then(() => {
              this.setState({data:this.props.data});
              this.arrayholder = this.props.data;
              this.chronologicalView();
              // alert('expression deleted');
              // this.props.navigation.navigate('Images',{id_groupe:userInfo.id_groupe});
            });
          }
        })
        .catch((error) => {
          console.error(error);
        });
      
    }

  delete = (idxp, name) => {
    Alert.alert(
      `${I18n.t('DELETING EXPRESSION')}`,
      `${I18n.t('Are you sure you want to delete this expression')}`,
      [
        { text: `${I18n.t('NO')}`, onPress: () => console.warn('NO Pressed') },
        { text: `${I18n.t('YES')}`, onPress: () => this.supprimer(idxp, name) },
      ]
    );
  };

  handleChangeText = text => {
    this.setState({value: text});
    searchFilterFunction(text, this.arrayholder, newData => {
      this.setState({data: newData});
    });
  };

  toggleVideoColor = () => {
    this.setState({
      videoColor: '#DB4165',
      expressionColor: this.state.headerbackColor,
      imageColor: this.state.headerbackColor,
      audioColor: this.state.headerbackColor,
    });
    const {userInfo} = this.props;
    this.props.navigation.navigate('Recordings', {
      id_groupe: userInfo.id_groupe,
    });
  };

  toggleExpressionColor = () => {
    this.setState({
      videoColor: this.state.headerbackColor,
      expressionColor: '#C9902A',
      imageColor: this.state.headerbackColor,
      audioColor: this.state.headerbackColor,
    });
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
    const {userInfo} = this.props;
    this.props.navigation.navigate('Audios', {id_groupe: userInfo.id_groupe});
  };
  toggleFirst = () => {
    this.toggleExpressionColor();
  };
  closeModal = () => {
    this.setState({
      newAudio: false,
      newText: false,
      showText: false,
      showEditText: false,
      trad:false,
      newVideo: false,
      newImage: false,
      beforeAudio: false,
      beforeTexte: false,
      beforeVideo: false,
      beforeImage: false,
    });
  };
  handleTranslate = (itemValue) => {
    if (itemValue != '') {

      this.setState({ picIdlangue: itemValue });
      
      // console.log(this.state.expres+'_%_'+itemValue.substring(0,2));
      TranslatorConfiguration.setConfig(ProviderTypes.Google, config.googleCloud.apiKey, itemValue.substring(0, 2));
      // config.googleCloud.apiKey
      const translator = TranslatorFactory.createTranslator();
      translator.translate(this.state.selectedText).then(translated => {
        Tts.setDefaultLanguage(itemValue);
        Tts.speak(translated);
        this.setState({ selectedTrad: translated, trad:false })
      });
    } else {
      alert('This option is not available');
    }
  }

  async chronologicalView() {
    //  this.handleRefresh();  // Wait for refresh to complete
  
    if (this.months && this.months.length > 0) {
      // Safely select and click on the first item
      const firstItem = this.months[0];
      this.handleDateClick(`${firstItem.month} ${firstItem.year}`);
    }
  
    this.setState({
      showCat: false,  // Update state to hide categories (or something else)
    });
  }
  updateText(lang) {
    // Vérifie que lang est défini et non null avant de mettre à jour l'état
    if (lang) {
      this.setState({ target_langue_cible: lang });
    }
  }
  
  
  render() {
    const isDateBlocked = date =>
      date.isBefore(moment('05/09/2000', 'DD/MM/YYYY'));

    const onDatesChange = ({startDate, endDate, focusedInput}) => {
      this.setState({...this.state, focus: focusedInput}, () =>
        this.setState({...this.state, startDate, endDate}),
      );
    };;
    const {data, category, userInfo} = this.props;
    return (
      <Homelayout navigation={this.props.navigation}>
        <View style={[styleList.container, ]}>
          <View style={lists.headerStyle}>
            <HeaderList
              videoToggle={this.toggleVideoColor}
              expressionToggle={this.toggleExpressionColor}
              imageToggle={this.toggleImageColor}
              audioToggle={this.toggleAudioColor}
              firstElToggle={this.toggleFirst}
              navigation={this.props.navigation}
              videoColor={this.state.videoColor}
              expressionColor={this.state.expressionColor}
              imageColor={this.state.imageColor}
              audioColor={this.state.audioColor}
              id_groupe={userInfo.id_groupe} />
            <View style={lists.addNew}>
              <TouchableOpacity
                onPress={() => {
                  this.props.navigation.navigate('Accueil');
                } }>
                <View style={{ flexDirection: 'row' }}>
                  <Text style={{ color: 'white', fontSize: 20 }}>
                    My expressions
                  </Text>
                </View>
              </TouchableOpacity>
              <AddButton
                onPress={() => {
                  this.setState({ newText: true });;
                } }
                backgroundColor="#C9902A" />
            </View>
          </View>
          <View>
            <View
              style={{
                flexDirection: 'row',
                alignSelf: 'center',
                display: 'none',
              }}>
              <SearchInput
                placeholder={I18n.t('Type your one or two words')}
                value={this.state.value}
                onChangeText={this.handleChangeText}
                onSearch={this.handleSearch} />
              <TouchableOpacity
                onPress={() => this.setState({ bydate: !this.state.date })}
                style={{
                  borderRadius: 15,
                  paddingLeft: 10,
                  paddingRight: 10,
                  marginLeft: wp('2.5%'),
                  justifyContent: 'center',
                  height: 35,
                  backgroundColor: '#EA1E69',
                  // display:'none'
                }}>
                <Icon name={'calendar'} size={20} color={'white'} />
              </TouchableOpacity>
            </View>
            <View
              style={{
                flexDirection: 'column',
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  // marginTop: hp('1%'),
                }}>

              </View>
            </View>
            {/* {this.state.date ?  */}
            {this.state.date ? 
            (
            <View
              style={{
                marginTop: hp('2%'),
                backgroundColor: 'white',
              }}>
              <Dates
                onDatesChange={onDatesChange}
                isDateBlocked={isDateBlocked}
                startDate={this.state.startDate}
                endDate={this.state.endDate}
                focusedInput={this.state.focus}
                range />
              <View style={{ flexDirection: 'row' }}>
                <View
                  style={{
                    flexDirection: 'column',
                    width: wp('70%'),
                    marginLeft: wp('2.5%'),
                  }} />
                <Text
                  style={[
                    styleList.date,
                    this.state.focus === 'startDate' && styleList.focused,
                  ]}>
                  {this.state.startDate &&
                    this.state.startDate.format('LL')}{' '}
                </Text>
                <Text
                  style={[
                    styleList.date,
                    this.state.focus === 'endDate' && styleList.focused,
                  ]}>
                  {this.state.endDate && this.state.endDate.format('LL')}
                </Text>
              </View>
              <View>
                  <TouchableOpacity
                    onPress={() => {
                      this.filterbytwodate(), this.setState({ bydate: false });
                      
                    } }
                    style={{
                      padding: 10,
                      backgroundColor: '#0C1D65',
                      borderRadius: 5,
                      // width:80,
                      marginRight: wp('2.5%'),
                      alignItems: 'center',
                      position: 'relative',
                      right: wp('2.5%'),
                      marginTop: hp('1%'),
                      marginBottom: hp('1%'),
                    }} 
                    >
                  <View>
                    <Text style={{ textAlign: 'center', color: 'white' }}>
                      {I18n.t('Search')}
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
            ):null}
        </View>
        <View>
          <View style={styleList.separator} />
          {!this.state.toListe ? (
            <View>
              {/* {this.state.showCat ? ( */}
                <View
                  style={{
                    // height: hp('61%'),
                    // position: 'absolute',
                    // backgroundColor: '#192356',
                    zIndex: 1,
                    // marginTop: 5,
                    elevation: 3,
                    padding: 8,
                  }}>
                  <View
                    style={{flexDirection:'row', justifyContent:'center'}}
                    >
                    
                    {this.state.showCat?(
                      <TouchableOpacity
                        onPress={() => this.chronologicalView()}>
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
                                fill="#C9902A" 
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
                            // height: hp('4%'),
                            width:wp('45%'),
                            // backgroundColor:'red',
                            // backgroundColor:'#313d6e',
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
                              {/* <Icon name="arrow-back-outline" size={25} color="white" style={{ alignSelf: 'center', marginLeft: 5 , padding:2, backgroundColor:'#313d6e', borderRadius:5}} /> */}
                              {/* <Icon name="grid" size={25} color="#C9902A" style={{ alignSelf: 'center', marginLeft: 15 }} /> */}
                              <Svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style="fill: rgba(0, 0, 0, 1);transform: ;msFilter:;">
                                <Path d="M5 22h14c1.103 0 2-.897 2-2V6c0-1.103-.897-2-2-2h-2V2h-2v2H9V2H7v2H5c-1.103 0-2 .897-2 2v14c0 1.103.897 2 2 2zM5 7h14v2H5V7z"
                                fill="#C9902A" 
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
                      onPress={() => {this.setState({ showCat: true }), this.getfirstCat()}}>
                      <View
                        style={{
                          justifyContent: 'center',
                          // height: hp('4%'),
                          marginBottom: 15,
                          width:wp('45%'),
                          // backgroundColor:'#313d6e',
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
                            {/* <Icon name="arrow-back-outline" size={25} color="white" style={{ alignSelf: 'center', marginLeft: 5 , padding:2, backgroundColor:'#313d6e', borderRadius:5}} /> */}
                            {/* <Icon name="grid" size={25} color="#C9902A" style={{ alignSelf: 'center', marginLeft: 15 }} /> */}
                            
                            {/* <Svg width={24} height={24} viewBox="0 0 24 24">
                              <Path
                                d="M4 11h6a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1zm10 0h6a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1h-6a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1zM4 21h6a1 1 0 0 0 1-1v-6a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1zm13 0c2.206 0 4-1.794 4-4s-1.794-4-4-4-4 1.794-4 4 1.794 4 4 4z"
                                fill="#C9902A" // Couleur blanche
                              />
                            </Svg> */}
                            <Svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style="fill: rgba(0, 0, 0, 1);transform: ;msFilter:;">
                              <Path d="M4 13h6a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1zm-1 7a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-4a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v4zm10 0a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-7a1 1 0 0 0-1-1h-6a1 1 0 0 0-1 1v7zm1-10h6a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1h-6a1 1 0 0 0-1 1v5a1 1 0 0 0 1 1z"
                              fill="#C9902A" 
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
                    </TouchableOpacity>):
                    (<TouchableOpacity
                    onPress={() => {this.setState({ showCat: true }), this.getfirstCat()}}>
                    <View
                      style={{
                        justifyContent: 'center',
                        // height: hp('4%'),
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
                          {/* <Icon name="arrow-back-outline" size={25} color="white" style={{ alignSelf: 'center', marginLeft: 5 , padding:2, backgroundColor:'#313d6e', borderRadius:5}} /> */}
                          {/* <Icon name="grid" size={25} color="#C9902A" style={{ alignSelf: 'center', marginLeft: 15 }} /> */}
                          
                          {/* <Svg width={24} height={24} viewBox="0 0 24 24">
                            <Path
                              d="M4 11h6a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1zm10 0h6a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1h-6a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1zM4 21h6a1 1 0 0 0 1-1v-6a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1zm13 0c2.206 0 4-1.794 4-4s-1.794-4-4-4-4 1.794-4 4 1.794 4 4 4z"
                              fill="#C9902A" // Couleur blanche
                            />
                          </Svg> */}
                          <Svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style="fill: rgba(0, 0, 0, 1);transform: ;msFilter:;">
                            <Path d="M4 13h6a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1zm-1 7a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-4a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v4zm10 0a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-7a1 1 0 0 0-1-1h-6a1 1 0 0 0-1 1v7zm1-10h6a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1h-6a1 1 0 0 0-1 1v5a1 1 0 0 0 1 1z"
                            fill="#C9902A" 
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
                  </TouchableOpacity>)
                    }
                  </View>
                  {this.state.showCat?
                    (
                      <FlatList
                        data={this.props.category}
                        extraData={this.props}
                        keyExtractor={item => item.id}
                        refreshing={this.state.refreshing}
                        horizontal={true}
                        onRefresh={this.handleRefresh}
                        numColumns={1}
                        enableEmptySections={true}
                        renderSeparator={this.ListViewItemSeparator}
                        renderItem={({ item, index }) => (
                          <View style={{}}>
                            {this.categoryViewFilter(
                              item.id,
                              item.intitule,
                              index
                            )}
                          </View>
                        )} 
                      />
                    ):null
                  }
                </View>
              {/* ) : ( */}
                
              {/* )} */}
            </View>
          ) : (
            <View
              style={{
                justifyContent: 'center',
                height: hp('4%'),
                width: wp('100%'),
              }}>
              <View
                style={{
                  height: hp('4%'),
                  width: wp('100%'),
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
                <TouchableOpacity
                  onPress={() => {
                    this.setState({
                      selected: '',
                      toListe: false,
                      data: this.props.data,
                    });
                    this.filterbycat('');;
                  } }
                  style={{ justifyContent: 'center', alignItems: 'center' }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'center',
                      alignItems: 'center',
                      marginLeft: wp('2.5%'),
                    }}>
                    <Icon
                      name="arrow-back-outline"
                      size={25}
                      color="white"
                      style={{
                        alignSelf: 'center',
                        marginLeft: 5,
                        padding: 2,
                        backgroundColor: '#313d6e',
                        borderRadius: 5,
                      }} />
                    <Icon
                      name="folder"
                      size={25}
                      color="#C9902A"
                      style={{ alignSelf: 'center', marginLeft: 15 }} />
                    <Text
                      style={{
                        color: '#C9902A',
                        marginLeft: 15,
                        fontSize: 16,
                      }}>
                      {this.state.selected}
                    </Text>
                  </View>
                </TouchableOpacity>

              </View>
            </View>
          )}
        </View>
        {!this.state.showCat?(<View style={{paddingHorizontal:wp('5%')}}>
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

        </View>):null}

        <View style={{  alignItems: 'center', height:'63%' }}>
          <FlatList
            data={this.state.data}
            extraData={this.state.data}
            keyExtractor={item => item.id_expression} // Ajout de la clé d'extraction
            refreshing={this.state.refreshing} // Ajout de l'attribut rafraîchissant


            // onRefresh={this.setState({data:this.props.data})} // Ajout de la gestion du rafraîchissement
            enableEmptySections={true}
            // numColumns={2} // Décommenter pour spécifier le nombre de colonnes
            renderSeparator={this.ListViewItemSeparator} // Ajout de l'attribut de séparation
            renderItem={({ item, index }) => (
              <View style={{ flexDirection: 'column', alignItems: 'center' }}>
                {/* {this.headerTableau(item.intitule)} */}
                <View>
                  <View
                    style={{ flexDirection: 'row', alignItems: 'center' }}>
                    {this.contentView(
                      item.id_expression,
                      item.content_langue_origine,
                      item.content_langue_cible,
                      item.audio_langue_origine,
                      item.intitule,
                      item.date_creation,
                      item.f_name,
                      item.type_file,
                      item.legende_f,
                      index,
                      item.id_category,
                      item.target_langue_cible,
                      item.langue,
                      item
                    )}
                  </View>
                </View>
              </View>
            )} />
        </View>
      </View>
      <View>
      <TextModals
        visible={this.state.newText}
        category={this.props.category}
        userInfo={this.props.userInfo}
        onClose={() => this.closeModal()}
        save={() => {
          this.closeModal(),
              this.setState({ data: this.props.data }),
              this.handleRefresh();
            alert('Expression saved');
        } }
        navigation={this.props.navigation}
          />
        <ShowText
          visible={this.state.showText}
          category={this.props.category}
          userInfo={this.props.userInfo}
          onClose={() => this.closeModal()}
          selectedText={this.state.selectedText}
          selectedTrad={this.state.selectedTrad}
          selectedId={this.state.selectedId}
          selectedCat={this.state.selectedCat}
          target_langue_cible={this.state.target_langue_cible}
          langue = {this.state.langue}
          save={() => {
            this.closeModal(),
              //  this.setState({ data: this.props.data }),

               this.handleRefresh()
                // alert('Expression saved');
          } }
          updateText={(lang) => this.updateText(lang)}
          navigation={this.props.navigation}
           />
        <ShowEditText
          visible={this.state.showEditText}
          category={this.props.category}
          userInfo={this.props.userInfo}
          onClose={() => this.closeModal()}
          selectedText={this.state.selectedText}
          selectedTrad={this.state.selectedTrad}
          onChange = {this.handleChageOrig}
          handleTranslate= {this.handleTranslate}
          trad = {this.state.trad}
          save={() => {
            this.closeModal(),
               this.setState({ data: this.props.data }),
                alert('Expression saved');
          } }
          navigation={this.props.navigation}
           />
      </View>
      </Homelayout>
    );
  }
}

export default connectToRedux(ExpressionList);

const styleList = StyleSheet.create({
  container: {
    height: hp('90%'),
    width: wp('100%'),
    alignSelf: 'center',
    backgroundColor: '#060a20',
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


