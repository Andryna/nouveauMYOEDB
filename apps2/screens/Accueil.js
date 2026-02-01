import * as React from 'react';
import { ImageBackground, View, Text, KeyboardAvoidingView, StyleSheet, BackHandler } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/Ionicons';
import Spinner from 'react-native-spinkit';
import Footer from '../components/footer/layouts/footer';
import config from '../../config.json';
import I18n from 'react-native-i18n';
import en from '../../i18/en';
import fr from '../../i18/fr';
import es from '../../i18/es';
import BoxConsultation from '../components/buttons/BoxConsultation';
import UserProfileCard from '../components/header/UserProfileCard/UserProfileCard';
import { clearAllData } from '../utils/authUtils';
import { openHome, OpenCat,Openjitsi } from '../utils/All';
import Homelayout from '../layouts/Homelayout';
import HomeLayout2 from '../layouts/HomeLayout2';
import { connectToRedux } from '../config/reduxconfig';
import { check, request, PERMISSIONS, RESULTS } from 'react-native-permissions';
import ChatbotConfigModal from '../components/modals/ChatbotConfigModal';
import Geolocation from '@react-native-community/geolocation';
import AsyncStorage from '@react-native-async-storage/async-storage';
const base_url = config.base_url;



class Accueil extends React.Component {
  static navigationOptions =
    {
      headerShown: false,
      headerStyle: {
        backgroundColor: '#2f3c7e',
      },
      drawerLabel: 'Home',
      drawerIcon: ({ tintColor }) => (
        <Icon name="home" color={'blue'} size={20} />
      ),
      headerTintColor: '#fff',
      headerLeft: () => null,
      headerRight: () => <View> </View>
    }
    ;
  constructor(props) {
    super(props)
    this.state = {
      trand: '',
      user: '',
      clickvideo:"",
      clickaudio:"",
      clickimage:"",
      clickexpress:"",
    }

    I18n.locale = this.props.langMyoedb;
    I18n.fallbacks = true;
    I18n.translations = {
    en,
    fr,
    es
  }; 
    this.arrayholder = [];
    this.props.navigation.addListener('willFocus', () => {
      // alert(this.props.langMyoedb);
      this.props.toggleMenu();
      this.requestLocationPermission();
      Geolocation.setRNConfiguration({
        skipPermissionRequests: false,
        authorizationLevel: 'always', // 'always' ou 'whenInUse' pour iOS
        enableBackgroundLocationUpdates: false,
        locationProvider: 'auto',
      });
    })
  }

  componentDidMount = async () => {
    this.props.toggleMenu();
     const data_Token = await AsyncStorage.getItem('data_Token');
    console.log(data_Token);
    
    // alert(this.props.langMyoedb);
    this.requestLocationPermission();
    Geolocation.setRNConfiguration({
      skipPermissionRequests: false,
      authorizationLevel: 'whenInUse', // 'always' ou 'whenInUse' pour iOS
      enableBackgroundLocationUpdates: false,
      locationProvider: 'auto',
    });
// console.log("user info ATO  : ", this.props.userInfo);
    // Ajoutez un écouteur pour intercepter le bouton de retour physique
    this.backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      this.handleBackPress
    );
  }

  requestLocationPermission = async () => {
  try {
    const permission =
      Platform.OS === 'ios'
        ? PERMISSIONS.IOS.LOCATION_WHEN_IN_USE
        : PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION;

    const result = await check(permission);

    if (result === RESULTS.DENIED) {
      await request(permission);
    }

    if (result === RESULTS.BLOCKED) {
      console.warn('Permission localisation bloquée');
    }
  } catch (error) {
    console.error('Erreur permission localisation', error);
  }
};


  componentWillUnmount() {
    // Retirez l'écouteur lorsque le composant est démonté
    this.backHandler && this.backHandler.remove();
  }
  //   

  // Fonction pour gérer l'appui sur le bouton de retour physique
  handleBackPress = () => {
    // Empêchez le comportement par défaut du bouton de retour
    return true;
  };



 goToVideo = () =>{
  this.props.navigation.navigate('Recordings',{myv:this.props.video,id:this.state.id,id_groupe:this.state.id_groupe,trand:this.state.trand,user:this.state.user})
 }
 goToExp = () =>{
  this.props.navigation.navigate('Recordings',{myv:this.props.video,id:this.state.id,id_groupe:this.state.id_groupe,trand:this.state.trand,user:this.state.user})
 }
 goToImage = () =>{
  this.props.navigation.navigate('Recordings',{myv:this.props.video,id:this.state.id,id_groupe:this.state.id_groupe,trand:this.state.trand,user:this.state.user})
 }
 goToAudio = () =>{
  Alert('audio');
  // this.props.navigation.navigate('Recordings',{myv:this.props.video,id:this.state.id,id_groupe:this.state.id_groupe,trand:this.state.trand,user:this.state.user})
 }
  render() {
    const { user,cat } = this.state;
    const {nbaudio,nbtext,nbvideo,nbcat,userInfo} = this.props;

    return (
      <KeyboardAvoidingView style={styles.container}>
        
        <HomeLayout2 navigation={this.props.navigation}>
          <ImageBackground
            source={require('../image2/bg.png')}
            style={styles.background}
          >
            <View style={{ width: wp('95%'), alignSelf: 'center' }}>
              
              {/* <Text>{this.props.clickaudio} ghjgjh vvvjvj bvhvv</Text> */}
              
            </View>
          </ImageBackground>
          
        </HomeLayout2>
      </KeyboardAvoidingView>
    );
  }
}

export default connectToRedux(Accueil);







const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  background: {
    // flex: 1,
    // width: '100%',
    // height: '100%',
  },
  userProfileCard: {
    // Styles pour UserProfileCard
  },
  boxContainer: {
    // flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: hp('12%'),
  },
  box: {
    width: wp('40%'), // Largeur de chaque boîte
  },
  lastInsertContainer: {
    flexDirection: 'row',
    width: wp('90%'),
    justifyContent: 'space-around',
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: hp('2%'),
  },
  lastInsertBox: {
    width: wp('40%'), // Largeur de chaque boîte
  },
});

