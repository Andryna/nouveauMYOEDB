import React, { Component } from 'react';
import { View, Image, TouchableOpacity, Text, FlatList, ScrollView, Alert, Button, StyleSheet } from "react-native";
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
import { connectToRedux } from '../config/reduxconfig';
import Homelayout from '../layouts/Homelayout';
import Dates from 'react-native-dates';
import moment from 'moment';
import SearchInput from '../components/textInputs/SearchInput';
import HeaderList from '../components/header/HeaderList';
import ImageItem from '../components/list/ImageItem';
import Svg, { Path } from 'react-native-svg';
import AddButton from '../components/buttons/AddButton';
import ImageModal from '../components/modals/ImageModal';
import Geolocation from '@react-native-community/geolocation';
import { check, request, PERMISSIONS, RESULTS } from 'react-native-permissions';
// import moment from 'moment';
const xml = `
<svg 
xmlns="http://www.w3.org/2000/svg" 
width="24" 
height="24" 
viewBox="0 0 24 24" 
style="fill: rgba(0, 0, 0, 1);transform: ;msFilter:;">
<path d="M4 11h6a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1zm10 0h6a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1h-6a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1zM4 21h6a1 1 0 0 0 1-1v-6a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1zm13 0c2.206 0 4-1.794 4-4s-1.794-4-4-4-4 1.794-4 4 1.794 4 4 4z">
</path>
</svg>
`;

const base_url = config.base_url;
const base_grp_url = config.base_grp_url;

class Images extends Component {
  static navigationOptions = {
    headerShown: false
  };

  constructor(props) {
    super(props);
    this.state = {
      id_groupe: '',
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
      imageList:this.props.imageList,
      newImage:false,
      location: null,
      watchId: null,
      idecat:null
    };

    I18n.locale = this.state.trand;
    I18n.fallbacks = true;
    I18n.translations = {
      en,
      fr,
      es
    };

    this.arrayholder = this.props.imageList;
    this.props.navigation.addListener('willFocus', () => {
      this.toggleImageColor();
      // this.setState({imageList:this.props.imageList});
      this.handleRefresh();
      this.chronologicalView()
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

  getFullMonthName(abbr) {
    const months = {
      Jan: "Janvier",
      Feb: "Février",
      Mar: "Mars",
      Apr: "Avril",
      May: "Mai",
      Jun: "Juin",
      Jul: "Juillet",
      Aug: "Août",
      Sep: "Septembre",
      Oct: "Octobre",
      Nov: "Novembre",
      Dec: "Décembre",
    };

    return months[abbr] || abbr; // Retourne l'abréviation si elle n'est pas trouvée
  }

  componentWillUnmount() {
    if (this.state.watchId !== null) {
      Geolocation.clearWatch(this.state.watchId);
    }
  }

  requestLocationPermission = async () => {
    let permission;

    if (Platform.OS === 'android') {
      permission = PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION;
    } else {
      permission = PERMISSIONS.IOS.LOCATION_WHEN_IN_USE;
    }

    const result = await check(permission);
    
    if (result === RESULTS.GRANTED) {
      // alert('ato');
      this.getCurrentLocation();
    } else {
      const requestResult = await request(permission);
      if (requestResult === RESULTS.GRANTED) {
        this.getCurrentLocation();
      } else {
        console.error('Permission denied');
      }
    }
  };

  getCurrentLocation = () => {
    Geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        this.setState({ location: position.coords });
        this.reverseGeocode(latitude, longitude);
        console.log('Position actuelle:', position);

      },
      (error) => {
        console.error('Erreur de localisation:', error);
      },
      {
        enableHighAccuracy: true,
        timeout: 15000,
        maximumAge: 10000,
      }
    );

    // Suivi des changements de position
    const watchId = Geolocation.watchPosition(
      (position) => {
        console.log('Position mise à jour:', position);
        this.setState({ location: position.coords });
      },
      (error) => {
        console.error('Erreur de suivi de position:', error);
      },
      {
        enableHighAccuracy: true,
        distanceFilter: 10, // Met à jour toutes les 10m
        interval: 2000, // Intervalle de mise à jour de 2 secondes
      }
    );

    this.setState({ watchId });
  };
  reverseGeocode = async (latitude, longitude) => {
    try {
      const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`);
      const data = await response.json();
      this.setState({ address: data.display_name });
    } catch (error) {
      console.error('Erreur de géocodage inversé:', error);
    }
  };

  refreshLocation = () => {
    Geolocation.getCurrentPosition((position) => {
      console.log('Position rafraîchie:', position);
      this.setState({ location: position.coords });
    });
  };


 componentDidMount (){
  this.getfirstCat();
  this.chronologicalView();
  console.log('cat',this.props.category);
  Geolocation.setRNConfiguration({
    skipPermissionRequests: false,
    authorizationLevel: 'whenInUse', // 'always' ou 'whenInUse' pour iOS
    enableBackgroundLocationUpdates: false,
    locationProvider: 'auto',
  });

  this.requestLocationPermission();
  // console.log('image',this.props.imageList);
  console.log('image', this.state.imageList);
console.log('Nombre d\'éléments dans le tableau:', this.props.imageList.length);

//   console.log("VIDEO LISTE", this.props.video);
 }
  handleRefresh = () => {
    this.setState(
      {
        refreshing: true,
        imageList:this.props.imageList
      },
      () => {
        console.log("refreshing");
        // this.getVideo();
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

  supprimer = (f_name) => {
    const {userInfo} = this.props;
    const { id_groupe } = this.state;
    console.log(' id: ' + f_name);

    fetch(base_url + '/portail-stagiaire/del_video.php', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        f_name: f_name,
        id_groupe: userInfo.id_groupe
      })
    }).then((response) => response.json())
      .then((rep) => {
        if (rep === '') {
          alert('pas de reponse');
        }
        else {
          alert('Video deleted successfully');
          this.getVideo();
        }
      }).catch((error) => {
        console.error(error);
      });
  }

  // delete = (f_name) => {
  //   Alert.alert(
  //     `${I18n.t('DELETING IMAGES')}`,
  //     `${I18n.t('Are you sure you want to delete this')}`,
  //     [
  //       { text: `${I18n.t('NO')}`, onPress: () => console.warn('NO Pressed') },
  //       { text: `${I18n.t('YES')}`, onPress: () => this.supprimer(f_name) },
  //     ]
  //   );
  // };
  delete = (f_name) => {
    Alert.alert(
      'DELETING IMAGES',
      'Are you sure you want to delete these images?',
      [
        { text: 'NO', onPress: () => console.warn('NO Pressed') },
        { text: 'YES', onPress: () => this.supprimer(f_name) },
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
    const {userInfo} = this.props;
    this.setState({
      videoColor: '#DB4165',
      expressionColor: this.state.headerbackColor,
      imageColor: this.state.headerbackColor,
      audioColor: this.state.headerbackColor,
    });
    this.props.navigation.navigate('Recordings',{'id_groupe' : userInfo.id_groupe});
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
    const {userInfo} = this.props;
    this.setState({
      videoColor: this.state.headerbackColor,
      expressionColor: this.state.headerbackColor,
      imageColor: this.state.headerbackColor,
      audioColor: '#47BD7A',
    });
    this.props.navigation.navigate('Audios',{'id_groupe' : userInfo.id_groupe});
  };
  toggleFirst = () => {
   this.toggleImageColor();
  };

    filterbytwodate = (lowerLimit,upperLimit) => {
      // if  (this.state.startDate != null && this.state.endDate != null) {
        console.log('lowerLimit:' + lowerLimit + ' et ' + upperLimit);
        const newData = this.props.imageList.filter(
          data =>
            lowerLimit <= data.date_creation && data.date_creation <= upperLimit,
        );
        console.log(newData);
  
        this.setState({
          imageList: newData,
        });
      // }
  
      }
  
    categoryViewFilter = (id, intitule, index) => {
      const { idecat } = this.state;
      let colors = ['#FFE9F9', '#EAF9FE', '#FFF5E5', '#FBF5FF', '#FFF1EF', '#A2A2A2'];
      if (id == idecat) {
          return (
            <TouchableOpacity
              onPress={() => { this.filterbycat(intitule), this.setState({ idecat: id, pic: id, toListe:true, selected:intitule })}}>
              <View style={{ marginLeft:5, borderRadius: 5, justifyContent: 'center', borderWidth:0.3, borderColor:'white', padding:8, borderColor:'#C9902A'}}>
                <View
                  style={{
                    justifyContent:'center',
                    // backgroundColor:'#0c123b',
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
      }else{
        return (
          <TouchableOpacity
            onPress={() => { this.filterbycat(intitule), this.setState({ idecat: id, pic: id, toListe:true, selected:intitule })}}>
            <View style={{ marginLeft:5, borderRadius: 5, justifyContent: 'center', borderBottomWidth:0.2, borderTopWidth:0.2, borderColor:'white', padding:8, backgroundColor:'#0c123b', borderColor:'red'}}>
              <View
                style={{
                  justifyContent:'center',
                  // backgroundColor:'#0c123b',
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
      const newData = this.props.imageList.filter(item => {
        const itemData = `${item.intitule.toUpperCase()}`;
        const textData = itemValue.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      this.setState({
        imageList: newData,
      });
    }
    chronologicalView(){
      // alert('chorno');
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
      // alert('click');
        // console.log(`Premier jour du mois : ${formattedFirstDay}`);
        // console.log(`Dernier jour du mois : ${formattedLastDay}`);
      
        // Appel de la fonction filterbytwodate avec les limites inférieure et supérieure calculées
        this.filterbytwodate(formattedFirstDay, formattedLastDay);
      
        // Calcul de l'intervalle en jours
        const intervalInDays = lastDayOfMonth.diff(firstDayOfMonth, 'days') + 1;
        // console.log(`Intervalle en jours : ${intervalInDays} jours`);
      };
      getfirstCat(){
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
        }
  render() {
    const isDateBlocked = (date) =>
    date.isBefore(moment('05/09/2000','DD/MM/YYYY'));
    const { latitude, longitude, error, location, address } = this.state;

    const onDatesChange = ({ startDate, endDate, focusedInput }) =>{
    this.setState({ ...this.state, focus: focusedInput }, () =>
    this.setState({ ...this.state, startDate, endDate })
    );
  }
    const {user} = this.state;
    const {userInfo} = this.props;

    
    return (
      // <View style={styles.container}>
        <Homelayout  navigation={this.props.navigation}>
        <View style={{alignSelf:'center', width:wp('100%'), zIndex:0, flex:1}}>
          
          <View style={{
            height: hp('85%'),
            width:wp('100%'),
            // paddingBottom: hp('10%'),
            backgroundColor:'#060a20'
          }}>
              <View style={lists.headerStyle}>
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
                  id_groupe = {userInfo.id_groupe}
                />
                <View style={lists.addNew}>
                  <TouchableOpacity
                    onPress={() => {
                      this.props.navigation.navigate('Accueil');
                    }}
                  >
                    <View style={{ flexDirection: 'row'}}>
                      {/* <Icon name="arrow-back-outline" size={25} color="white" style={{ alignSelf: 'center', marginLeft: 5 }} /> */}
                      <Text style={{ color: 'white', fontSize: hp('2.2%') }}>
                        My images
                      </Text>
                    </View>
                  </TouchableOpacity>
                  <AddButton
                    onPress={() => {
                      this.setState({newImage:true});
                    }}
                    backgroundColor="#48A2F1" 
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
                    
                  }}>
                  <Icon name={'ios-calendar'} size={20} color={'white'} />
                </TouchableOpacity>
              </View>
        <View
                    style={{
                      flexDirection:'column'
                    }}>
                        <View
                        style={{
                          flexDirection:'row',
                          // marginTop:hp('2%')

                        }}>
                          
                        </View>
                    </View>
                    {this.state.bydate?( 
                    <View
                    style={{
                    //  flex: 1,
                    //  flexGrow: 1,
                      marginTop: hp('2%'),
                    //  height:hp('100%'),
                      backgroundColor:'white'
                    }}>
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
                      }}>
                        <Text
                        style={{textAlign:'center',color:'white'}}>{I18n.t('Search')}</Text>
                      </TouchableOpacity>
                    </View>
                    
                    </View>):null}



{/* CATEGORY */}

{/* {!this.state.toListe?(
  <View >
      {this.state.showCat?(<View style={{ height: hp('61%'), position:'absolute', backgroundColor:'#192356', zIndex:1, marginTop:5, elevation:3 , padding:8}}>
        <TouchableOpacity
        onPress={()=>this.setState({showCat:false})}
        >
          <View style={{ justifyContent: 'center', height: hp('4%'), marginBottom:15}}>
            <View style={{ height: hp('4%'), flexDirection: 'row', justifyContent: 'space-between' }}>
              <View style={{ flexDirection: 'row', justifyContent:'center', alignItems:'center', paddingRight:15 }}>
                <Svg width={24} height={24} viewBox="0 0 24 24">
                  <Path
                    d="M4 11h6a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1zm10 0h6a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1h-6a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1zM4 21h6a1 1 0 0 0 1-1v-6a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1zm13 0c2.206 0 4-1.794 4-4s-1.794-4-4-4-4 1.794-4 4 1.794 4 4 4z"
                    fill="#48A2F1" 
                  />
                </Svg>
                <Text style={{ color: '#48A2F1', marginLeft: 15, fontSize: hp('2.2%') }}>
                  CATEGORY 
                </Text>
              </View>
            </View>
          </View>
        </TouchableOpacity>
        <FlatList
          data={this.props.category}
          extraData={this.props}
          keyExtractor={(item) => item.id}
          refreshing={this.state.refreshing}
          onRefresh={this.handleRefresh}
          numColumns={1}
          enableEmptySections={true}
          renderSeparator={this.ListViewItemSeparator}
          renderItem={({ item, index }) => (
            <View style={{}}>
              {this.categoryViewFilter(item.id, item.intitule, index)}
            </View>
          )}
        />
      </View>):(
      <View>
        <TouchableOpacity
        onPress={()=>this.setState({showCat:true, data:this.props.data})}
        >
          <View style={{ justifyContent: 'center', height: hp('4%'), marginBottom:15}}>
            <View style={{ height: hp('4%'), flexDirection: 'row', justifyContent: 'space-between' }}>
              <View style={{ flexDirection: 'row', justifyContent:'center', alignItems:'center', paddingRight:15 }}>
                <Icon name="chevron-forward" size={25} color="white" style={{ alignSelf: 'center', marginLeft: 5 , padding:2, backgroundColor:'#313d6e', borderRadius:5}} />
                </View>
            </View>
          </View>
        </TouchableOpacity>
      </View>
      )}
  </View>):(
  <View style={{ justifyContent: 'center', height: hp('4%'), width: wp('100%')}}>
    <View style={{ height: hp('4%'), width: wp('100%'), flexDirection: 'row', justifyContent: 'space-between' }}>
      <TouchableOpacity
        onPress={() => {
          this.setState({selected : '', toListe:false, data:this.props.data});
          this.filterbycat('')
        }}
        style={{justifyContent:'center', alignItems:'center'}}
      >
        <View style={{ flexDirection: 'row' ,justifyContent:'center', alignItems:'center', marginLeft:wp('2.5%')}}>
          <Icon name="arrow-back-outline" size={25} color="white" style={{ alignSelf: 'center', marginLeft: 5 , padding:2, backgroundColor:'#313d6e', borderRadius:5}} />
          <Icon name="folder" size={25} color="#48A2F1" style={{ alignSelf: 'center', marginLeft: 15 }} />
          <Text style={{ color: '#48A2F1', marginLeft: 15, fontSize: 16 }}>
            {this.state.selected} 
          </Text>
        </View>
      </TouchableOpacity>
      
    </View>
  </View>
  )} */}

{/* CATEGORY */}
{/* <View style={{ justifyContent: 'center', alignItems: 'center', width:wp('60%') }}>
        {location ? (
          <>
            <Text style={{color:'white'}}>
              Latitude: {location.latitude}, Longitude: {location.longitude}
            </Text>
            {address ? (
              <Text style={{color:'white'}}>Adresse: {address}</Text>
            ) : (
              <Text>Chargement de l'adresse...</Text>
            )}
          </>
        ) : (
          <Text>Chargement de la position...</Text>
        )}
        <Button title="Rafraîchir la position" onPress={this.getCurrentLocation} />
      </View> */}


      {/* debut */}
      <View
        style={{
          flexDirection:'row',
          justifyContent:'center'
        }}
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



          {/* 2 */}

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
            </TouchableOpacity>)
          }
          {/* fin */}
      </View>
      {!this.state.showCat?(
        <View 
          style={{
            paddingHorizontal:wp('2.5%'),
            marginBottom:5

          }}
        >
          <FlatList
            horizontal
            data={this.months}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item, index }) => 
              {
                const fullMonthName = this.getFullMonthName(item.month); // Conversion du mois abrégé
                const formattedDate = `${fullMonthName} ${item.year}`; // Format complet
                return(
                <TouchableOpacity onPress={() => this.handleDateClick(`${item.month} ${item.year}`)}>
                  <Text
                    style={ `${item.month} ${item.year}` === this.state.selectedMonth ? styleList.highlighted : styleList.normalMonth}
                  >
                    {formattedDate}
                  </Text>
                </TouchableOpacity>
              )}
          }
          />
        </View>
      ):null
      }
      {this.state.showCat?
        (<View>
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

        </View>
        ):null
      }

          <View
            style={{ flex:1, alignItems:'center', height:500}}
            >
              <FlatList
                data={this.state.imageList}
                extraData={this.props}
                keyExtractor={(item) => item.id_expression}
                refreshing={false}
                horizontal={false}
                // numColumns={2}
                onRefresh={this.handleRefresh}
                enableEmptySections={true}
                contentContainerStyle={{ alignItems:'flex-start', width: wp('100%')}}
                renderItem={({ item, index }) =>
                  <View style={{
                    width:wp('100%'),
                    // flexDirection: 'row',
                    // marginLeft: wp('5%'),
                    // alignItems:'center',
                    // alignSelf:'center',
                    marginBottom:5,
                    // marginRight:wp('2%'),
                    top:0
                  }}>
                    <ImageItem
                      f_name={item.f_name}
                      langue={item.langue}
                      lieu = {item.lieu}
                      date = {item.date_creat}
                      type_file={item.type_file}
                      legende_f={item.legende_f}
                      content_orig= {item.content_langue_origine}
                      content_cible= {item.content_langue_cible}
                      id_groupe={userInfo.id_groupe}
                      onDelete={() => this.delete(item.f_name)}
                      id_expression={item.id_expression}

                      onPlay={() => {this.props.navigation.navigate('ImageViewer', { f_name: item.f_name, id_groupe: userInfo.id_groupe, original:item.content_langue_origine, trad:item.content_langue_cible, description:item.legende_f,id_exp:item.id_exp, id_files:item.id_files, selectedLangue: item.langue, targetLangue:item.target_langue_cible, lieu: item.lieu, date:item.date_creat})}}
                    />
                    {/* {this.showListVideo(item.id_expression, item.f_name, item.type_file, item.legende_f, index, item.id)} */}
                  </View>
                }
              />
            </View>
            
          </View>
        </View>
        <ImageModal visible={this.state.newImage} category={this.props.category} userInfo = {this.props.userInfo} onClose={() => this.setState({newImage:false})} navigation={this.props.navigation} />
    </Homelayout>
      // </View>
    );
  }
}

export default connectToRedux(Images);
const styleList = StyleSheet.create({
  container: {
    height: hp('88%'),
    width: wp('100%'),
    alignSelf: 'center',
    backgroundColor: '#060a20',
    flex:1
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

