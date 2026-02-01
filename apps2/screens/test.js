// import * as React from 'react';
// import { AppState, TouchableHighlight,Linking, Platform, Clipboard, StyleSheet, Text, Keyboard, KeyboardAvoidingView, Image, TouchableWithoutFeedback, Button, Alert, Slider, View, TouchableOpacity, ScrollView, ActivityIndicator, FlatList, TextInput, Modal, AsyncStorage, TouchableNativeFeedbackBase, ActionSheetIOS, TouchableOpacityBase } from 'react-native';
// // import enregistrement from './enregistrement';
// // import { createStackNavigator, HeaderTitle } from 'react-navigation';
// import App from './Login';
// import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
// import Icon from 'react-native-vector-icons/Ionicons';
// import Fontawesome from 'react-native-vector-icons/FontAwesome';
// import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
// import Sound from 'react-native-sound';
// import Tts from "react-native-tts";
// import { PowerTranslator, ProviderTypes, TranslatorConfiguration, TranslatorFactory } from 'react-native-power-translator';
// // import text from './text';
// import Spinner from 'react-native-spinkit';
// // import Popup from './tools/Popup';
// import Video from 'react-native-video';
// import { createAppContainer } from 'react-navigation';
// import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';

// import styles from '../styles/styleAcuueil';
// import Footer from './footer/layouts/footer';
// import AddAudio from './tools/modalViews/audio/layouts/addAudio'
// import Add from './tools/modalViews/audio/statics/styles/styleAdd';
// import config from '../config.json';
// // import RNFetchBlob from 'rn-fetch-blob';
// import Share from 'react-native-share';
// import I18n from 'react-native-i18n';
// import en from '../i18/en';
// import fr from '../i18/fr';
// import es from '../i18/es';
// import Dates from 'react-native-dates';
// import moment from 'moment';
// import {Picker} from '@react-native-picker/picker';
// import { Searchbar } from 'react-native-paper';
// import { TurboModuleRegistry } from 'react-native';
// import { Myownmodal } from './tools/modalViews/audio/layouts/Myownmodal';
// import BackgroundTimer from 'react-native-background-timer';
// const base_url = config.base_url;
// // import Speech from 'react-native-speech';

// // var Speech = require('react-native-speech');
// class Accueil extends React.Component {
//   state = {
//     data: [],
//     // cat:[],
//     origine: '',
//     target: '',
//     encours: false,
//     titre: '',
//     autre: '',

//     // idL:'1',



//     // isLoading:true,
//   }

//   static navigationOptions =
//     {
//       headerShown: false,
//       // title: 'Forma2+',
//       headerStyle: {
//         backgroundColor: '#2f3c7e',

//       },
//       drawerLabel: 'Home',
//       drawerIcon: ({ tintColor }) => (
//         <Icon name="ios-home" color={'blue'} size={20} />
//       ),
//       // centerComponent={{ text: 'MY TITLE', style: { color: '#fff' } }},
//       headerTintColor: '#fff',
//       headerLeft: () => null,
//       headerRight: () => <View>
//         {/* <TouchableOpacity 
//   onPress onPress={() => navigate('nouveau',{prevScreenTitle:' Utilisateur'})}
//   ><Text style={{color:'white'}}>Se deconnecté
//  </Text></TouchableOpacity> */}

//       </View>

//     }
//     ;
//   constructor(props) {
//     super(props)
//     this.state = {
//       categ: '',
//       url_images: '',
//       name: '',
//       coms: '',
//       image: false,
//       videoList: false,
//       modalplayer: false,
//       namefile: '',
//       details_exp: false,
//       targTEXTshow: false,
//       listexpres: false,
//       typelist: false,
//       addnew: false,
//       show1: false,
//       show2: false,
//       show4: false,
//       showfile: false,
//       create: false,
//       cati: false,
//       action: false,
//       action2: false,
//       showtext: false,
//       showtext2: false,
//       Ch_cat: false,
//       recordView: false,
//       lectureV: false,
//       users: false,
//       mark: false,
//       speechRate: 0.5,
//       dataSource: [],
//       lang: [],
//       isLoading: true,
//       page: 1,
//       seed: 1,
//       cat: [],
//       refreshing: false,
//       PickerValueHolder: '',
//       picIdlangue: 'en',
//       pic: '',
//       picat: '',
//       idL: '1',
//       login: this.props.navigation.state.params.login1,
//       nom1: this.props.navigation.state.params.nom1,
//       prenom1: this.props.navigation.state.params.prenom1,
//       email1: this.props.navigation.state.params.email1,
//       tel1: this.props.navigation.state.params.tel1,
//       adresse1: this.props.navigation.state.params.adresse1,
//       cp1: this.props.navigation.state.params.cp1,
//       ville1: this.props.navigation.state.params.ville1,
//       password1: this.props.navigation.state.params.password1,
//       id: this.props.navigation.state.params.id1,
//       id_groupe: this.props.navigation.state.params.id_groupe,
//       type:this.props.navigation.state.params.type,
//       trand:this.props.navigation.state.params.trand,
//       // *** video state ***
//       rate: 1,
//       volume: 1,
//       muted: false,
//       resizeMode: 'contain',
//       duration: 0.0,
//       currentTime: 0.0,
//       isPlaying: false,
//       paused: true,
//       sound: null,
//       // pausedText: 'Play',
//       hideControls: false,
//       pausedText: 'play',

//       captation: '',
//       captcolor: '#0066cc',
//       consucolor: '#0066cc',
//       consultation: false,
//       videolang: false,
//       addlist: false,
//       idecat: '',
//       cate: '',
//       all: false,
//       addcat: true,
//       allang: false,
//       idLan: '',
//       expres: '',
//       plus: false,
//       iconHeader: true,
//       imagedetails: false,
//       imageSearch: false,
//       nbExp: [],
//       nbaudio: '',
//       nbtext: '',
//       nbvideo: '',
//       myvideo: [],
//       myv: [],
//       jitsi: false,

//       content:'',
//     base64:'',
//     sendPic:false,
//     date: null,
//     focus: 'startDate',
//     startDate: null,
//     endDate: null,
//     bydate:false,
//     searchQuery:'',
//     edishw4:false
//     }

//     I18n.locale = this.state.trand;
//     I18n.fallbacks = true;
//     I18n.translations = {
//     en,
//     fr,
//     es
//   }; 

//     this.arrayholder = [];
//     this.video = Video; // video constructor

//     this.props.navigation.addListener('willFocus', () => {
//       this.getData();
//       this.getPicker();
//       this.getnbexp();
//     })



//   }

//   componentDidMount() {
//     AppState.addEventListener('change', this.handleAppStateChange);
//     this.getPicker();
//     this.getData();
//     this.getlang();
//     this.getnbexp();
//     this.getVideo();
//   }
//   componentWillUnmount() {
//     AppState.removeEventListener('change', this.handleAppStateChange);
//   }

//   handleAppStateChange = (nextAppState) => {
//    this.soundpause();
//     // console.log('tes');
//     if (nextAppState === 'inactive') {
//       // console.log('innactive');
//       // L'écran est éteint ou l'application est en arrière-plan
//       // Vous pouvez exécuter des tâches lorsque l'écran est éteint ici
//       BackgroundTimer.setTimeout(() => {
//         // Code à exécuter lorsque l'écran est éteint
//         // console.log('L\'écran est éteint');
//       }, 100); // Exemple : attendez 1 seconde avant d'exécuter le code
//     }
//   };

//   loadMore() {
//     const { page, myv, myvideo } = this.state;
//     const start = page * ITEMS_PER_PAGE;
//     const end = (page + 1) * ITEMS_PER_PAGE;

//     const newData = myvideo.slice(start, end); // here, we will receive next batch of the items
//     this.setState({ myv: [...myv, ...newData], page: page + 1 }); // here we are appending new batch to existing batch
//   }
//   getVideo = () => {
//     // this.setState({isLoading:true});
//     fetch(base_url + '/portail-stagiaire/listvideo.php', {
//       method: 'post',
//       headers: {
//         'Accept': 'application/json',
//         'Content-type': 'application/json'
//       },
//       body: JSON.stringify({
//         id: this.state.id,
//       })
//     })
//       .then((response) => response.json())
//       .then((rep) => {
//         let myv = rep.slice(0, 2);
//         const testk = rep.slice(0, 5);
//         // console.log(myv);
//         this.setState({
//           myv: myv,
//           myvideo: rep,
//           testk: rep
//         }
//         );

//         this.arrayholder = rep;
//       })
//       .catch((error) => {
//         console.error(error);
//       });

//   }

//   getnbexp = () => {
//     fetch(base_url + '/portail-stagiaire/nbvideo.php', {
//       method: 'post',
//       headers: {
//         'Accept': 'application/json',
//         'Content-type': 'application/json'
//       },
//       body: JSON.stringify({
//         id: this.state.id,
//         id_groupe: this.state.id_groupe
//       })
//     })
//       .then((response) => response.json())
//       .then((rep) => {
//         const nbaudio = rep.map(data =>
//           data.nbaudio);
//         const nbtext = rep.map(data =>
//           data.nbtext);
//         const nbvideo = rep.map(data =>
//           data.nbvideo);
//         const nbcat = rep.map(data =>
//           data.nbcat);
//         this.setState({
//           nbExp: rep,
//           nbaudio: nbaudio,
//           nbtext: nbtext,
//           nbvideo: nbvideo,
//           nbcat: nbcat
//         })
//       })
//       .catch((error) => {
//         console.error(error);
//       });

//   }
//   openModal = () => {
//     this.setState({
//       show1: false
//     })
//   }
//   openSearch() {
//     const {iconHeader}=this.state;
//         if (iconHeader){
//           // this.searchInput.focus();
//         this.setState({iconHeader:false, create:false});
//         // this.secondTextInput.focus();
          
//         }else if (this.state.imagedetails) {
         
          
//           this.setState({imagedetails:false,imageSearch:true});
//         } else {
//           this.secondTextInput.focus();
//         }
//   }

//   openPlus() {
//     this.setState({ plus: true, create:false });
//     this.soundpause();
//   }
//   openHome() {
//     this.setState({ iconHeader: true, imagedetails: false, create:false });
//     this.soundpause();
//   }
//   onLoad = (data) => {
//     this.setState({ duration: data.duration });
//     this.soundpause();
//   };

//   // video is playing
//   onProgress = (data) => {                                                       
//     // this.setState({ currentTime: data.currentTime });
//   };

//   // video ends
//   onEnd = () => {
//     this.setState({ paused: true, pausedText: 'Play' })
//     this.video.seek(0);
//   };

//   getCurrentTimePercentage() {
//     if (this.state.currentTime > 0) {
//       return parseFloat(this.state.currentTime) / parseFloat(this.state.duration);
//     }
//     return 0;
//   };

//   onChangeRate(itemValue, itemIndex) {
//     var rate = parseFloat(itemValue);
//     this.setState({ pickerValueHolder: itemValue, rate: rate });
//   }

//   // pressing on 'play' button
//   onPressBtnPlay() {
//     this.setState({ paused: false });
//   }
//   onPressBtnPause() {
//     this.setState({ paused: true });
//   }
//   // on press video event
//   onPressVideo() {
//     // showing controls if they don't show
//     if (this.state.hideControls) {
//       this.setState({ hideControls: false });
//       this.timeoutHandle = setTimeout(() => {
//         this.setState({ hideControls: true });
//       }, 1000);
//     }
//   }

//   // parse seconds to time (hour:minute:second)
//   parseSecToTime(sec) {
//     var sec_num = parseInt(sec, 10); // don't forget the second param
//     var hours = Math.floor(sec_num / 3600);
//     var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
//     var seconds = sec_num - (hours * 3600) - (minutes * 60);

//     if (hours < 10) { hours = "0" + hours; }
//     if (minutes < 10) { minutes = "0" + minutes; }
//     if (seconds < 10) { seconds = "0" + seconds; }

//     return hours + ':' + minutes + ':' + seconds;
//   }


//   // *** video methode ***


//   getPicker = () => {
//     const { id_groupe } = this.state;
//     // alert(id_groupe);
//     // const{page,seed}=this.state;
//     fetch(base_url + '/portail-stagiaire/picke_category.php', {
//       method: 'post',
//       headers: {
//         'Accept': 'application/json',
//         'Content-type': 'application/json'
//       },
//       body: JSON.stringify({
//         id_groupe: id_groupe
//       })
//     }
//     )
//       .then((response) => response.json())
//       .then((responseJson) => {
//         this.setState({
//           isLoading: false,
//           cat: responseJson,
//           idecat:''
//         });
//         // console.log(JSON.stringify(responseJson));
//       })
//       .catch((error) => {
//         console.error(error);
//       });

//   }
//   getlang = () => {
//     // console.log("okokok");
//     this.setState({ refreshing: true });
//     const myreponse = 
// [
//   {
//     "id":"1",
//     "intitule":"Anglais",
//     "date_creation":"",
//     "abrev":"en-US"
//   },
//   {
//   "id":"5",
//   "intitule":"Français",
//   "date_creation":"",
//   "abrev":"fr-FR"
//   }
// ];
//     fetch(base_url + '/portail-stagiaire/picker.php', {
//       method: 'post',
//       headers: {
//         'Accept': 'application/json',
//         'Content-type': 'application/json'
//       }
//     })
//       .then((response) => response.json())
//       .then((repo) => {
//         // alert(rep);
//         this.setState({
//           dataSource: myreponse,
//           // audio:rep.audio_langue_origine,
//           isLoading: false,
//           refreshing: false,
//           // paused:true,
//         }
//         );
//         // this.arrayholder = rep;
//         // console.log(JSON.stringify(repo));
//         //  alert(arra_map(ythis.state.data.content_langue_cible));
//       })
//       // })

//       .catch((error) => {
//         console.error(error);
//       });

//   }
//   getData = () => {
//     // this.setState({isLoading:true});
//     fetch(base_url + '/portail-stagiaire/expression.php', {
//       method: 'post',
//       headers: {
//         'Accept': 'application/json',
//         'Content-type': 'application/json'
//       },
//       body: JSON.stringify({
//         id: this.state.id,
//       })
//     })
//       .then((response) => response.json())
//       .then((rep) => {
//         // console.log(rep);
//         this.setState({
//           data: rep,
//           data3:rep,
//           isLoading: false,
//           refreshing: false,
//           paused: true,
//           pickerValueHolder:'',
//           idecat:''
//         }
//         );
//         this.arrayholder = rep;
//         // console.log('getData');
//       })
//       .catch((error) => {
//         console.error(error);
//       });

//   }

//   handleRefresh = () => {
//     this.setState({
//       refreshing: true
//     }, () => {
//       this.getData();
//     });
//     this.setState({
//       refreshing: false
//     });

//   };

//   ListViewItemSeparator = () => {
//     return (
//       <View
//         style={{
//           height: 2,
//           width: "100%",
//           backgroundColor: "#000",
//         }}
//       />
//     );
//   }



//   cnc() {
//     this.setState({ show2: false })

//   }
//   cnc2() {
//     this.setState({ videolang: false, plus: false })

//   }
//   nouv() {
//     props.navigation.navigate('nouveau', { prevScreenTitle: ' Utilisateur' })
//   }
//   recor() {
//     nouv();
//     canc();
//   }


//   ecouter = () => {
//     const { pickerValueHolder } = this.state;
//     const { id } = this.state;
//     console.log(this.state.idecat);
//     fetch(base_url + '/portail-stagiaire/langue.php', {
//       // 'https://demo.forma2plus.com/portail-stagiaire/index.php'
//       // 'http://10.0.2.2/projet/index.php'
//       method: 'POST',
//       headers: {
//         'Accept': 'application/json',
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({
//         PickerValueHolder: pickerValueHolder
//       })

//     }).then((response) => response.json())
//       .then((idlangue) => {
//         if (idlangue == '') {
//           alert('Data empty');
//         }
//         else {
//           // this.props.navigation.navigate('spechtext',{id,PickerValueHolder}
//           this.props.navigation.navigate('Enregistre', {
//             idlangue: idlangue,
//             id: this.state.id,
//             PickerValueHolder: this.state.pickerValueHolder,
//             login1: this.state.login,
//             nom1: this.state.nom1,
//             prenom1: this.state.prenom1,
//             email1: this.state.email1,
//             tel1: this.state.tel1,
//             adresse1: this.state.adresse1,
//             cp1: this.state.cp1,
//             ville1: this.state.ville1,
//             password1: this.state.password1,
//             id1: this.state.id,
//             id_groupe: this.state.id_groupe,
//             idecat: this.state.idecat,
//             dataSource: this.state.dataSource,
//             trand:this.state.trand
//           });
//         }
//       }).catch((error) => {
//         console.error(error);
//       });
//   }

//   tester = () => {
//     const { PickerValueHolder } = this.state;
//     // const {id}=this.state;
//     const { id } = this.state;
//     fetch(base_url + '/portail-stagiaire/langue.php', {
//       // 'https://demo.forma2plus.com/portail-stagiaire/index.php'
//       // 'http://10.0.2.2/projet/index.php'
//       method: 'POST',
//       headers: {
//         'Accept': 'application/json',
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({
//         PickerValueHolder: PickerValueHolder
//       })

//     }).then((response) => response.json())
//       .then((idlangue) => {
//         if (idlangue == '') {
//           alert('No language selected');
//         }
//         else {
//           // this.props.navigation.navigate('spechtext',{id,PickerValueHolder}
//           this.props.navigation.navigate('spechtext', {
//             idlangue: idlangue, id: this.state.id, PickerValueHolder: this.state.PickerValueHolder,
//             login1: this.state.login,
//             nom1: this.state.nom1,
//             prenom1: this.state.prenom1,
//             email1: this.state.email1,
//             tel1: this.state.tel1,
//             adresse1: this.state.adresse1,
//             cp1: this.state.cp1,
//             ville1: this.state.ville1,
//             password1: this.state.password1,
//             id1: this.state.id,
//             id_groupe: this.state.id_groupe

//           });
//         }
//       }).catch((error) => {
//         console.error(error);
//       });
//   }
//   gocam = () => {
//     const { pickerValueHolder } = this.state;
//     // const {id}=this.state;
//     const { id } = this.state;
//     fetch(base_url + '/portail-stagiaire/langue.php', {
//       // 'https://demo.forma2plus.com/portail-stagiaire/index.php'
//       // 'http://10.0.2.2/projet/index.php'
//       method: 'POST',
//       headers: {
//         'Accept': 'application/json',
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({
//         PickerValueHolder: pickerValueHolder
//       })

//     }).then((response) => response.json())
//       .then((idlangue) => {
//         if (idlangue == '') {
//           alert('No language selected');
//         }

//         else {
//           // this.props.navigation.navigate('spechtext',{id,PickerValueHolder}
//           this.props.navigation.navigate('Camera', {
//             idlangue: idlangue, id: this.state.id, PickerValueHolder: this.state.pickerValueHolder,
//             login1: this.state.login,
//             nom1: this.state.nom1,
//             prenom1: this.state.prenom1,
//             email1: this.state.email1,
//             tel1: this.state.tel1,
//             adresse1: this.state.adresse1,
//             cp1: this.state.cp1,
//             ville1: this.state.ville1,
//             password1: this.state.password1,
//             id1: this.state.id,
//             id_groupe: this.state.id_groupe,
//             idecat: this.state.idecat,
//             trand:this.state.trand

//           });
//         }
//       }).catch((error) => {
//         console.error(error);
//       });
//   }

//   // sound1 = new Sound(item.url, (error, sound) => {
//   //   if (error) {
//   //     alert('error' + error.message);
//   //     return;
//   //   }
//   //   sound1.play(() => {
//   //     sound1.release();
//   //   });
//   // });
//   soundpause = ()  => {
//     if (this.state.sound) {
//       this.state.sound.stop(() => {
//         // console.log('Lecture audio en pause');
//         this.setState({ isPlaying: false });
//       });
//     }
//   }
//   async _play(url) {
//     this.soundpause();
//     // this.setState({paused: false});
//     // alert('https://demo.forma2plus.com/portail-stagiaire/uploads_audio/'+url);
//     // // Works only on Andriod
  

//     Sound.setCategory('Playback');

//     const test = base_url + '/elearning2021/groupes/GRP' + this.state.id_groupe + '/' + url;
//     console.log(test);
//     const sound = new Sound(base_url + '/elearning2021/groupes/GRP' + this.state.id_groupe + '/' + url, null, (error) => {
//       if (error) {
//         alert('Audio does not exist');
//         this.setState({ paused: true });
//         return;
//       }

//       this.setState({ sound, paused: false });
//       sound.play((success) => {
//         if (success) {
//           alert('successfully finished playing');
//           this.setState({ paused: true });
//         } else {
//           alert('playback failed due to audio decoding errors');
//           this.setState({ paused: true });
//         }
//       });
//     });

      


//     // });
//     // alert('vita');
//     // if (this.state.recording) {
//     //   await this._stop();
//     // }

//     // These timeouts are a hacky workaround for some issues with react-native-sound.
//     // See https://github.com/zmxv/react-native-sound/issues/89.
//     // // setTimeout(() => {
//     //   url:https://demo.forma2plus.com/portail-stagiaire/uploads_audio/andry_1588232187.aac
//     //   var sound = new Sound('https://demo.forma2plus.com/portail-stagiaire/uploads_audio/andry_1588232187.aac', '', (error) => {
//     //     if (error) {
//     //       console.log('failed to load the sound', error);
//     //     }
//     //   });

//     //   // setTimeout(() => {
//     //   //   sound.play((success) => {
//     //   //     if (success) {
//     //   //       console.log('successfully finished playing');
//     //   //     } else {
//     //   //       console.log('playback failed due to audio decoding errors',);
//     //   //     }
//     //   //   });
//     //   // }
//     //   // , 100);
//     // }, 100);
//   }

//   // async _pause() {
//   //   if (!this.state.recording) {
//   //     console.warn('Can\'t pause, not recording!');
//   //     return;
//   //   }

//   //   try {
//   //     const filePath = await AudioRecorder.pauseRecording();
//   //     this.setState({paused: true});
//   //   } catch (error) {
//   //     console.error(error);
//   //   }
//   // }
//   pause = () => {
//     // if (this.state.paused=true){
//     //   alert('you must play before stoping');
//     // }
//     // else{
//     this.sound.pause();
//     this.setState({ paused: true });
//     // };
//   }

//   suprimer = (idxp, name) => {
//     const { id_groupe } = this.state;
//     console.log(name + ' et ' + idxp + ' ' + id_groupe);
//     if (name !== '') {
//       fetch(base_url + '/portail-stagiaire/delete.php', {
//         method: 'POST',
//         headers: {
//           'Accept': 'application/json',
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           id: idxp,
//           myFile: name,
//           id_groupe: id_groupe
//         })

//       }).then((response) => response.json())
//         .then((rep) => {
//           if (rep == '') {
//             alert('ts tonga');
//           }
//           else {

//             alert(rep);
//             this.getData();
//           }
//         }).catch((error) => {
//           console.error(error);
//         });
//     } else {
//       fetch(base_url + '/portail-stagiaire/deleteexp.php', {
//         method: 'POST',
//         headers: {
//           'Accept': 'application/json',
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           id: idxp
//         })

//       }).then((response) => response.json())
//         .then((rep) => {
//           if (rep == '') {
//             alert('ts tonga');
//           }
//           else {

//             alert(rep);
//             this.getData();
//           }
//         }).catch((error) => {
//           console.error(error);
//         });

//     }
//   }

//   delete = (idxp, name) => {
//     console.log(name);
//     Alert.alert(
//       `${I18n.t('DELETING EXPRESSION')}`, 
//       `${I18n.t('Are you sure you want to delete this Expression')}`,
//       [
//         {text: `${I18n.t('NO')}`, onPress: () => console.warn ('NO Pressed ')}, 
//         {text:`${I18n.t('YES')}`, onPress: () => this.suprimer(idxp,name)}
//       ]
//     );

//   };


//   saveTEXT = () => {
//     // this.picId(picIdlangue);
//     // alert(this.state.idL);
//     // this.picId(picIdlangue);
//     const { idL } = this.state;
//     const { pic } = this.state;
//     const { expres } = this.state;
//     const { id } = this.state;
//     const { targTEXT } = this.state;
//     const { id_groupe } = this.state;
    
//     console.log(idL + ' ' + ' ' + pic + ' ' + expres + ' ' + id + ' ' + targTEXT + '' + this.state.pic);
//     console.log('groupe', id_groupe);

//     if (this.state.pic == '') {
//       // alert('category vide');
//       this.setState({ ActivityIndicator_Loading: true }, () => {
//         fetch(base_url + '/portail-stagiaire/save2.php',
//           {
//             method: 'POST',
//             headers:
//             {
//               'Accept': 'application/json',
//               'Content-Type': 'application/json',
//             },
//             body: JSON.stringify(
//               // 'er'
//               {
//                 id: id,
//                 expres: expres,
//                 traduction: targTEXT,
//                 PickerValueHolder: this.state.idL,
//                 id_groupe:id_groupe
//                 // category:this.state.pic
//               })

//           }).then((response) => response.json()).then((reponse) => {
//             console.log(reponse);
//             alert('saved');
//             this.getData();
//             this.setState({ ActivityIndicator_Loading: false, targTEXT: '', expres: '', pic: '' });

//           }).catch((error) => {
//             console.error(error);

//             this.setState({ ActivityIndicator_Loading: false });
//           });
//       });

//     } else {
//       this.setState({ ActivityIndicator_Loading: true }, () => {
//         fetch(base_url + '/portail-stagiaire/save.php',
//           {
//             method: 'POST',
//             headers:
//             {
//               'Accept': 'application/json',
//               'Content-Type': 'application/json',
//             },
//             body: JSON.stringify(
//               {
//                 id: id,
//                 expres: expres,
//                 traduction: targTEXT,
//                 PickerValueHolder: this.state.idL,
//                 category: this.state.pic
//               })

//           }).then((response) => response.json()).then((reponse) => {
//             alert(reponse);
//             this.getData();
//             this.setState({ ActivityIndicator_Loading: false, targTEXT: '', expres: '', pic: '' });

//           }).catch((error) => {
//             console.error(error);

//             this.setState({ ActivityIndicator_Loading: false });
//           });
//       });
//     }
//     // alert(PickerValueHolder);

//   }

//   upDate = () => {
//     const { idexp, idL, text, id, targTEXT, ide, idecat } = this.state;
//     console.log("idexp: " + idexp + ', expres :' + text + ' , ' +'targ: '+ targTEXT + ' idecat' + idecat+ '---' + idexp);
   
//     this.setState({ ActivityIndicator_Loading: true }, () => {
//       fetch(base_url + '/portail-stagiaire/update.php',
//         {
//           method: 'POST',
//           headers:
//           {
//             'Accept': 'application/json',
//             'Content-Type': 'application/json',
//           },
//           body: JSON.stringify(
//             {
//               id: id,
//               expres: text,
//               traduction: targTEXT,
//               PickerValueHolder: idL,
//               idexp: idexp,
//               idecat: idecat

//             })


//         }).then((response) => response.json()).then((reponse) => {
//           alert(reponse);
//           this.getData();
//           this.setState({ idecat: '', ide: '' });

//         }).catch((error) => {
//           console.error(error);

//           this.setState({ ActivityIndicator_Loading: false });
//         });
//     });
//   }


//   Demo = () => {
//     return (
//       <View>
//         <TouchableOpacity >
//           <Icon name={'md-create'} size={30}
//           />

//         </TouchableOpacity>
//       </View>
//     );
//   };

//   searchFilterFunction = text => {
//     this.setState({
//       value: text,
//     });

//     const newData = this.arrayholder.filter(item => {
//       const itemData = `${item.content_langue_origine.toUpperCase()} ${item.content_langue_cible.toUpperCase()}`;
//       // const itemData = item.content_langue_origine ? item.content_langue_origine: '';
//       const textData = text.toUpperCase();

//       return itemData.indexOf(textData) > -1;
//     });
//     this.setState({
//       data: newData,
//     });
//   };
//   // _startHandler() {
//   //             Speech.speak({
//   //               text: 'Aujourd\'hui, Maman est morte. Ou peut-être hier, je ne sais pas.',
//   //               voice: 'fr-FR'
//   //             })
//   //             .then(started => {
//   //               console.log('Speech started');
//   //             })
//   //             .catch(error => {
//   //               console.log('You\'ve already started a speech instance.');
//   //             });
//   //           }
//   //           _pauseHandler() {
//   //             Speech.pause();
//   //           }

//   //           _resumeHandler() {
//   //             Speech.resume();
//   //           }

//   //           _stopHandler() {
//   //             Speech.stop();
//   //           }

//   mijanona = () => {
//     Tts.stop();
//   }

//   readText = async (phrase) => {
//     Tts.setDefaultLanguage(this.state.PickerValueHolder);
//     Tts.stop();
//     Tts.speak(phrase);
//   };
//   setSpeechRate = async rate => {
//     await Tts.setDefaultRate(rate);
//     this.setState({ speechRate: rate });
//   };
//   editModal = (orgTEXT, targTEXT, exp) => {
//     // this.setState({origine:orgTEXT,target:targTEXT,idexp:exp});
//     alert(exp);
//     this.props.navigation.navigate('text', { orig: orgTEXT, tar: targTEXT, id: this.state, idexp: exp });

//   }

//   // this.editModal(item.content_langue_origine,item.content_langue_cible)
//   handleTranslate = (itemValue) => {
//     if (itemValue != '') {

//       this.setState({ picIdlangue: itemValue });
//       // console.log(this.state.expres+'_%_'+itemValue.substring(0,2));
//       TranslatorConfiguration.setConfig(ProviderTypes.Google, config.googleCloud.apiKey, itemValue.substring(0, 2));
//       // config.googleCloud.apiKey
//       const translator = TranslatorFactory.createTranslator();
//       translator.translate(this.state.expres).then(translated => {
//         Tts.setDefaultLanguage(itemValue);
//         Tts.speak(translated);
//         this.setState({ targTEXT: translated })
//       });
//     } else {
//       alert('This option is not available');
//     }

//     // this.setState({submit: true})
//     // const translator = TranslatorFactory.createTranslator();
//     // translator.translate(text).then(translated => {
//     //     Tts.getInitStatus().then(() => {
//     //         // Tts.speak(translated);
//     //         this. setState({targTEXT:translated,expres:text})
//     //     });
//     //     Tts.stop();
//     // });
//   }
//   handleTranslatedit = (itemValue) => {
//     if (itemValue != '') {

//       this.setState({ picIdlangue: itemValue });
//       // console.log(this.state.expres+'_%_'+itemValue.substring(0,2));
//       TranslatorConfiguration.setConfig(ProviderTypes.Google, config.googleCloud.apiKey, itemValue.substring(0, 2));
//       // config.googleCloud.apiKey
//       const translator = TranslatorFactory.createTranslator();
//       translator.translate(this.state.text).then(translated => {
//         Tts.setDefaultLanguage(itemValue);
//         this.setState({ targTEXT: translated })
//       });
//     } else {
//       alert('This option is not available');
//     }

//     // this.setState({submit: true})
//     // const translator = TranslatorFactory.createTranslator();
//     // translator.translate(text).then(translated => {
//     //     Tts.getInitStatus().then(() => {
//     //         // Tts.speak(translated);
//     //         this. setState({targTEXT:translated,expres:text})
//     //     });
//     //     Tts.stop();
//     // });
//   }
//   // handleTranslate = (itemValue) => {
//   //   if(itemValue!=''){

//   //     this.setState({picIdlangue:itemValue});
//   //     TranslatorConfiguration.setConfig(ProviderTypes.Google, 'AIzaSyBZZC103oLC2F1dGoJRpYNJnaEM--nMEXg',itemValue.substring(0,2));

//   //     const translator = TranslatorFactory.createTranslator();
//   //     translator.translate(this.state.expres).then(translated => {
//   //           Tts.setDefaultLanguage(itemValue);
//   //             Tts.speak(translated);
//   //             this. setState({targTEXT:translated})
//   //     });
//   //    }else {
//   //      alert('This option is not available');
//   //    }

//   //                 // this.setState({submit: true})
//   //                 // const translator = TranslatorFactory.createTranslator();
//   //                 // translator.translate(text).then(translated => {
//   //                 //     Tts.getInitStatus().then(() => {
//   //                 //         // Tts.speak(translated);
//   //                 //         this. setState({targTEXT:translated,expres:text})
//   //                 //     });
//   //                 //     Tts.stop();
//   //   // });
//   // }

//   handleTranslateEdit = (itemValue) => {
//     if (itemValue != '') {

//       this.setState({ picIdlangue: itemValue });
//       TranslatorConfiguration.setConfig(ProviderTypes.Google, 'AIzaSyBZZC103oLC2F1dGoJRpYNJnaEM--nMEXg', itemValue.substring(0, 2));

//       const translator = TranslatorFactory.createTranslator();
//       translator.translate(this.state.text).then(translated => {
//         Tts.setDefaultLanguage(itemValue);
//         Tts.speak(translated);
//         this.setState({ targTEXT: translated })
//       });
//     } else {
//       alert('This option is not available');
//     }
//   }
//   handleTranslateshow = (itemValue) => {
//     if (itemValue != '') {

//       this.setState({ picIdlangue: itemValue });
//       TranslatorConfiguration.setConfig(ProviderTypes.Google, 'AIzaSyBZZC103oLC2F1dGoJRpYNJnaEM--nMEXg', itemValue.substring(0, 2));

//       const translator = TranslatorFactory.createTranslator();
//       translator.translate(this.state.original).then(translated => {
//         Tts.setDefaultLanguage(itemValue);
//         Tts.speak(translated);
//         this.setState({ targTEXTshow: translated })
//       });
//     } else {
//       alert('This option is not available');
//     }


//     // this.setState({submit: true})
//     // const translator = TranslatorFactory.createTranslator();
//     // translator.translate(text).then(translated => {
//     //     Tts.getInitStatus().then(() => {
//     //         // Tts.speak(translated);
//     //         this. setState({targTEXT:translated,expres:text})
//     //     });
//     //     Tts.stop();
//     // });
//   }

//   DoMath = (ex) => {
//     // const {expres}=this.state.toString();
//     console.log(ex);
//   }

//   picId = (picIdlangue) => {
//     //  this.setState({id1:picIdlangue});
//     // const {picIdlangue}=this.state;
//     // const {id}=this.state;
//     // const {id}=this.state;
//     fetch(base_url + '/portail-stagiaire/langue1.php', {
//       // 'https://demo.forma2plus.com/portail-stagiaire/index.php'
//       // 'http://10.0.2.2/projet/index.php'
//       method: 'POST',
//       headers: {
//         'Accept': 'application/json',
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({
//         picIdlangue: picIdlangue
//       })

//     }).then((response) => response.json())
//       .then((idLLL) => {
//         this.setState({
//           idL: idLLL.id
//         });
//         console.log(this.state.idL);
//       }).catch((error) => {
//         console.error(error);
//       });
//   }
//   upDateaudio(a) {
//     // alert(a);
//     this.props.navigation.navigate('update', {
//       idex: a,
//       login1: this.state.login,
//       nom1: this.state.nom1,
//       prenom1: this.state.prenom1,
//       email1: this.state.email1,
//       tel1: this.state.tel1,
//       adresse1: this.state.adresse1,
//       cp1: this.state.cp1,
//       ville1: this.state.ville1,
//       password1: this.state.password1,
//       id1: this.state.id


//     });



//   }
//   // renderContent =()=>{


//   // }
//   testVieww(i, j) {
//     var { paused } = this.state;
//     if (i == '') {
//       return (
//         <View style={{ height: hp('5%'), width: wp('8%'), marginLeft: wp('3%') }}>
//           <TouchableOpacity

//             // onPress={() =>this.testVieww()}>
//             onPress={() => { this.setState({ action: false, action2: false }), this.upDateaudio(j) }}>
//             <Icon name={'ios-mic'} size={30} color={'#2f3c7e'}

//             />
//           </TouchableOpacity>
//         </View>
//       );
//     } else {

//       return (

//         <View style={{ height: hp('5%'), width: wp('8%'), marginLeft: wp('3%') }}>
//           {/* <Text>test</Text> */}
//           { paused ? (<TouchableOpacity onPress={() => { this._play(i), this.setState({ paused: false }) }}>
//             <Icon name={'ios-play'} size={30} color={'red'}

//             />
//           </TouchableOpacity>
//           ) :
//             (<TouchableOpacity
//               style={{ marginLeft: wp('0.5%') }}
//               disabled={paused}
//               onPress onPress={() => this.pause()}>
//               <Icon name={'md-pause'} size={30} color={'red'}

//               />
//             </TouchableOpacity>)}
//         </View>);
//     }
//   }
//   // getUser () {
//   //   try {
//   //     AsyncStorage.multiGet(['login', 'password']).then((data) => {
//   //       let log = data[0][1];
//   //       let pas = data[1][1];

//   //       // this.setState({nomU:log,pasU:pas});
//   //       if(log !== ''){
//   //        alert('log');

//   //       }
//   //   });

//   //   } catch (error) {
//   //     // Error saving data
//   //   }
//   // }
//   clearAllData = async () => {
//     try {
//       await AsyncStorage.multiGet(['login', 'nom', 'prenom', 'email', 'tel', 'adresse', 'cp', 'ville', 'password', 'id']).then((data) => {
//         let a = data[0][1];
//         let b = data[1][1];
//         let c = data[2][1];
//         let d = data[3][1];
//         let e = data[4][1];
//         let f = data[5][1];
//         let g = data[6][1];
//         let h = data[7][1];
//         let i = data[8][1];
//         let j = data[9][1];
//         if (a !== null) {
//           console.log(a + ', ' + b + ', ' + c + ',' + d + ',' + e + ',' + f + ',' + g + ',' + h + ',' + i + ',' + j);
//           AsyncStorage.getAllKeys()
//             .then(keys => AsyncStorage.multiRemove(keys))
//             .then(() => {
//               alert('Vous êtes déconnecté');
//               this.props.navigation.goBack();
//             }
//             )

//         } else {
//           console.log('rien');
//           this.props.navigation.goBack();
//         }
//       });
//     } catch (error) {
//     }

//   }
//   removeUser = async () => {

//     await AsyncStorage.getAllKeys()
//       .then(keys => AsyncStorage.multiRemove(keys))
//       .then(() => console.log('remove data success'));

//     // try {
//     //   alert("ici");
//     //   let keys = ['login','nom','prenom','email','tel','adresse','cp','ville','password','id','id_groupe'];
//     //   await AsyncStorage.multiRemove(keys, (err) => {
//     //       console.log('Local storage user info removed!');

//     //     });
//     // // alert(log);
//     //         //Your logic


//     // } catch (error) {
//     //   // Error saving data
//     // }
//   }

//   headTab = (intit) => {
//     if (intit !== '') {
//       return (
//         <Text
//           style={{ textAlign: 'left', fontWeight: 'bold', color: '#0ABFAA', fontSize: hp('2%'), elevation: 1, textTransform: 'capitalize' }}
//         >
//           {intit.toLowerCase()}
//         </Text>
//       );
//     } else {
//       return (
//         <Text
//           style={{ color: '#bf1613' }}
//         >
//           Not categorised
//         </Text>
//       );
//     }



//   }
//   headerTableau = (cat) => {


//     if (this.titre !== cat && cat !== '') {

//       this.titre = cat;
//       return (

//         <Text style={{ textAlign: 'center', fontWeight: '400', borderWidth: 0.5, borderColor: 'grey', color: '#E55717', fontWeight: 'bold', fontSize: hp('2%'), padding: hp('1%') }}>
//           {cat.toUpperCase()}
//         </Text>

//       );
//     } if (this.titre !== cat && cat == '') {
//       this.titre = cat;
//       return (
//         <Text style={{ textAlign: 'center', fontWeight: '400', borderWidth: 0.5, color: 'blue', fontSize: hp('2%'), padding: hp('1%') }}>
//           NOT CATEGORISED
//         </Text>
//       );
//     }

//   }
//   saveCat = () => {
//     // this.picId(picIdlangue);
//     // alert(this.state.idL);
//     // this.picId(picIdlangue);
//     const { categ } = this.state;
//     const {id} = this.state;
//     // alert(this.state.categ);
//     this.setState({ ActivityIndicator_Loading: true }, () => {
//       fetch(base_url + '/portail-stagiaire/savecat.php',
//         {
//           // 'http://10.0.2.2/projet/save.php'
//           // 'https://demo.forma2plus.com/portail-stagiaire/index.php'
//           method: 'POST',
//           headers:
//           {
//             'Accept': 'application/json',
//             'Content-Type': 'application/json',
//           },
//           body: JSON.stringify(
//             {
//               categ: this.state.categ,
//               // desc:this.state.desc,
//               id_groupe: this.state.id_groupe,
//               id:id
//             })

//         }).then((response) => response.json()).then((reponse) => {
//           alert(reponse);
//           this.getPicker();
//           this.setState({ ActivityIndicator_Loading: false });

//         }).catch((error) => {
//           console.error(error);

//           this.setState({ ActivityIndicator_Loading: false });
//         });
//     });
//   }
//   contentVideo = (id, or, ci, od, intit, date, name, type) => {
//     if (name !== '' && type == 'video') {
//       return (
//         <TouchableOpacity
//           onPress={() => this.setState({ details_exp: true, original: or, cible: ci })}
//         // style={{}}
//         >
//           <Video
//             source={{ uri: base_url + "/portail-stagiaire/uploads_video/" + name }}
//             ref={(ref) => {
//               this.player = ref
//             }}
//             onBuffer={this.onBuffer}
//             onError={this.videoError}
//           />
//         </TouchableOpacity>
//       );
//     }
//   }

//   contentView = (id, or, ci, od, intit, date, name, type, legende,index, id_category) => {
//     if (id !== '') {

//       return (
//         <View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>

//           {this.textOrigine(id, or, ci, intit, date, name, od, type, legende,index, id_category)}
//         </View>
//       );
//     }
//   }
//   newlist = (id, or, ci, intit, date, name, od, type, legende) => {
//     const { ide } = this.state;
//     if (id == ide) {
//       if (od == '') {
//         return (
//           <View
//             style={{
//               flexDirection: 'row'
//             }}>
//             <View>
//               <Text
//                 style={{
//                   fontWeight: 'bold',
//                   color: 'red'
//                 }}>
//                 {or}
//               </Text>
//             </View>
//             <View>
//               <Text>
//                 {ci}
//               </Text>
//             </View>
//           </View>

//         )

//       } else {
//         return (
//           <View>
//             <Text>
//               Avec audio
//                                 </Text>
//           </View>

//         )

//       }

//     } else {
//       if (od == '') {
//         return (
//           <View
//             style={{
//               flexDirection: 'row',
//               borderWidth: 1
//             }}>
//             <View>
//               <View>
//                 <Text
//                   style={{
//                     fontWeight: 'bold',
//                     color: 'red'
//                   }}>
//                   {or}
//                 </Text>
//               </View>
//               <View>
//                 <Text>
//                   {ci}
//                 </Text>
//               </View>
//             </View>
//             <View>
//               <Text>
//                 {name}
//               </Text>
//               <Text>
//                 {intit}
//               </Text>
//             </View>
//           </View>
//         )

//       } else {
//         return (
//           <View>
//             <Text>
//               Avec audio
//                                 </Text>
//           </View>
//         )

//       }
//     }
//   }
//   textOrigine = (id, or, ci, intit, date, name, od, type, legende, index, id_category) => {
//     const { ide } = this.state;
//     const copied = 'Category: ' + intit + ' \n' + 'original: ' + or + ' \n' + 'translated: ' + ci;
//     let colorsBoxText = ['#FBAFA9', '#FFF8B9', '#AECCDC'
//       , '#D3E4EC', '#D4C0DC', '#F5E2DC','#A9FBB7','#D7FFB9'];
//     if (id == ide) {
//       return (
//         <View
//           style={{
//             flexDirection: 'row',
//             borderWidth: 0.4,
//             borderColor: 'grey',
//             margin: wp('2.5%'),
//             width: wp('45%'),
//             borderRadius: 10,
//             backgroundColor: 'white',
//             zIndex: 1

//           }}
//         >

//           <View style={{
//           }}>
//             <View

//               style={{
//                 flexDirection: 'row',
//                 alignItems: 'center',
//                 paddingBottom: hp('2%'),
//                 width: wp('95%'),
//                 backgroundColor: '#E3E5E4',
//                 borderRadius: 10
//               }}>
//               <TouchableOpacity
//                 style={{
//                   marginLeft: wp('2%'),
//                   width: wp('70%'),
//                 }}
//                 onPress={() => {this.showedit(id, or, ci, intit, date, name, od, type, legende, index, id_category)}} >
//                 <Text style={{ textAlign: 'justify', fontSize: hp('1.8%'), fontWeight: 'bold' }}
//                 >{or}
//                 </Text>
//                 <Text style={{ textAlign: 'justify', fontSize: hp('1.5%') }}
//                 >{ci}
//                 </Text>
//               </TouchableOpacity>
//               <TouchableOpacity
//                 style={{
//                   position: 'absolute',
//                   right: wp('2.5%'),
//                   width: wp('10%'),
//                   top: hp('0.2%')
//                 }}
//                 onPress={() => this.setState({ action: true, audioL: od, ide: '', text: or, targTEXT: ci })}

//               >
//                 <Icon name={'ellipsis-vertical'} size={28} color={'black'} />

//               </TouchableOpacity>


//             </View>
//             {/* <TouchableOpacity onPress={() => this.setState({action:false,ide:'',ido:'',text:'',targTEXT:''}) } */}
//             <View
//               style={{
//                 with: wp('45%'), height: hp('6%'), position: 'absolute', top: 0, bottom: 0, right: wp('15%'), zIndex: 500, backgroundColor: 'white', borderRadius: 10
//               }}>


//               <View
//                 style={{
//                   width: wp('45%'),
//                   height: hp('6%'),
//                   // marginLeft:wp('35%'),
//                   // position:'absolute',
//                   // top:hp('5%'),
//                   // left:0,
//                   alignItems: 'center',
//                   justifyContent: 'space-around',
//                   flexDirection: 'row'
//                 }}>
//                 <TouchableOpacity
//                   onPress={() => { Clipboard.setString(copied), alert('text copié') }}>
//                   <Image style={{
//                     width: 15,
//                     height: 15,
//                     alignSelf: 'center',
//                   }}
//                     source={require('../image/copy.png')}>
//                   </Image>
//                 </TouchableOpacity>
//                 <TouchableOpacity
//                   onPress={() => {this.showedit(id, or, ci, intit, date, name, od, type, legende, index, id_category)}}>   //modifier
//                   <Image style={{
//                     width: 15,
//                     height: 15,
//                     alignSelf: 'center',
//                   }}
//                     source={require('../image/edit-2.png')}>
//                   </Image>
//                 </TouchableOpacity>
//                 <TouchableOpacity
//                   onPress={() => this.delete(id, name)}>
//                   <Image style={{
//                     width: 12,
//                     height: 15,
//                     alignSelf: 'center',
//                   }}
//                     source={require('../image/delete.png')}>
//                   </Image>
//                 </TouchableOpacity>
//                 <TouchableOpacity
//                   onPress={() => this.download(name, od)}>
//                   <Image style={{
//                     width: 15,
//                     height: 15,
//                     alignSelf: 'center',
//                   }}
//                     source={require('../image/down-arrow.png')}>
//                   </Image>
//                 </TouchableOpacity>
//                 <TouchableOpacity
//                   onPress={() => this.onShare(or, ci, od, name)}>
//                   <Image style={{
//                     width: 15,
//                     height: 15,
//                     alignSelf: 'center',
//                   }}
//                     source={require('../image/share.png')}>
//                   </Image>
//                 </TouchableOpacity>
//               </View>

//             </View>

//           </View>
//         </View>
//       );

//     } else {
//       if (od == '') {
//         return (
//           <View
//             style={{
//               // flexDirection: 'row',
//               borderWidth: 0.4,
//               borderColor: 'grey',
//               margin: wp('1%'),
//               width: wp('45%'),
//               borderRadius: 10,
//               backgroundColor: colorsBoxText[index % colorsBoxText.length],

//             }}
//           >

//             <View style={{
//             }}>
//               {/* {(name !=='')?(<View
//                           style={{
//                             width:wp('20%'),
//                             height:hp('10%'),
//                             alignSelf:'center'
//                           }}
//                           >
//                                 {this.show_image(id,name,type,or,ci,legende)}
                            
//                         </View>):null} */}
//               <View

//                 style={{
//                   flexDirection: 'row',
//                   alignItems: 'center',
//                   paddingBottom: hp('2%'),
//                   width: wp('40%'),
//                   // backgroundColor:'red'
//                 }}>
//                 <TouchableOpacity
//                   style={{
//                     marginLeft: wp('2%'),
//                     width: wp('40%'),
//                   }}
//                   onPress={() => {this.showedit(id, or, ci, intit, date, name, od, type, legende, index, id_category)}} >
//                   <Text style={{ textAlign: 'justify', fontSize: 14, fontWeight: '400' }}
//                   >{or}
//                   </Text>
//                   <View
//                   style={{
//                     borderWidth:0.5,
//                     borderColor:'white',
//                     width:wp('30%'),
//                     alignSelf:'center',
//                     marginTop:hp('1%'),
//                     marginBottom:hp('1%'),
//                     opacity:0.5
//                   }}
//                   />
//                   <Text style={{ textAlign: 'justify', fontSize: 14 }}
//                   >{ci}
//                   </Text>
//                 </TouchableOpacity>
//                 <TouchableOpacity
//                   // onPress={()=>alert('open image details')}>
//                   onPress={() => this.setState({ imagedetails: true, original: or, cible: ci, legende: legende, intit: intit, date: date, name: name })}>
//                   {(name !== '') ? (
//                     <View
//                       style={{
//                         alignSelf: 'center',
//                         marginLeft: wp('10%')
//                       }}
//                     >
//                       {/* <Image style={{ width: 30, height: 30 }}
//                         source={require('../image/image.png')}>
//                       </Image> */}

//                     </View>) : <View
//                     style={{
//                       width:30,
//                       height:30
//                     }}
//                     />}
//                 </TouchableOpacity>
//                 {/* <TouchableOpacity
//                   style={{
//                     position: 'absolute',
//                     right: wp('2.5%'),
//                     width: wp('10%'),
//                     // top:hp('1%'),
//                     alignSelf: 'center'
//                   }}
//                   onPress={() => this.setState({ action: true, audioL: od, ide: id, text: or, targTEXT: ci })}
//                 >
//                   <Icon name={'ios-ellipsis-vertical'} size={28} color={'black'} />
//                 </TouchableOpacity> */}


//               </View>

//             </View>
//             <View
//               style={{
//                 with: wp('45%'), height:30, backgroundColor: '#F5E2DC', borderBottomLeftRadius:10,borderBottomRightRadius:10
//               }}>


//               <View
//                 style={{
//                   width: wp('45%'),
//                   height: 30,
//                   // marginLeft:wp('35%'),
//                   // position:'absolute',
//                   // top:hp('5%'),
//                   // left:0,
//                   alignItems: 'center',
//                   justifyContent: 'space-around',
//                   flexDirection: 'row'
//                 }}>
//                 <TouchableOpacity
//                 style={{
//                   // backgroundColor:'red',
//                   width:wp('10%'),
//                   height:30,
//                   justifyContent:'center'
//                 }}
//                   onPress={() => { Clipboard.setString(copied), alert('text copié') }}>
//                   <Icon name={"copy-outline"} size={15} 
//                     style={{alignSelf:'center'}}
//                    />
//                 </TouchableOpacity>
//                 <TouchableOpacity
//                 style={{
//                   // backgroundColor:'red',
//                   width:wp('10%'),
//                   height:30,
//                   justifyContent:'center'
//                 }}
//                   onPress={() => {this.showedit(id, or, ci, intit, date, name, od, type, legende, index, id_category)}}>
//                  <Icon name={"create-outline"} size={15} 
//                     style={{alignSelf:'center'}}
//                    />
//                 </TouchableOpacity>
//                 <TouchableOpacity
//                 style={{
//                   // backgroundColor:'red',
//                   width:wp('10%'),
//                   height:30,
//                   justifyContent:'center'
//                 }}
//                   onPress={() => this.delete(id, name)}>
//                   <Icon name={"trash-outline"} size={15} 
//                     style={{alignSelf:'center'}}
//                    />
//                 </TouchableOpacity>
//                 {/* <TouchableOpacity
//                   onPress={() => this.download(name, od)}>
//                   <Image style={{
//                     width: 15,
//                     height: 15,
//                     alignSelf: 'center',
//                   }}
//                     source={require('../image/down-arrow.png')}>
//                   </Image>
//                 </TouchableOpacity> */}
//                 <TouchableOpacity
//                 style={{
//                   // backgroundColor:'red',
//                   width:wp('10%'),
//                   height:30,
//                   justifyContent:'center'
//                 }}
//                   onPress={() => this.onShare(or, ci, od, name)}>
//                   <Icon name={"share-social-outline"} size={15} 
//                     style={{alignSelf:'center'}}
//                    />
//                 </TouchableOpacity>
//               </View>

//             </View>
//           </View>
//         );
//       }
//       else {
//         return (
//           <View
//             style={{
//               // flexDirection: 'row',
//               borderWidth: 0.4,
//               borderColor: 'grey',
//               margin: wp('1%'),
//               width: wp('45%'),
//               borderRadius: 10,
//               backgroundColor: colorsBoxText[index % colorsBoxText.length]
//             }}
//           >
//             {/* <View
//                   style={{
//                     // backgroundColor:'red',
//                     width:wp('20%'),
//                     height:hp('10%'),
//                     alignSelf:'center'
//                   }}
//                   >
//                    {this.show_image(id,name,type,or,ci,legende)}
//                         <Text>
//                           {name}
//                         </Text>
                 
                 
//                    </View> */}
//             {/* {this.testVieww(od,id)} */}
//             <View>
//               {/* {this.headerTableau(intit)} */}
//               {/* <View 
//                 style={{
//                   flexDirection:'row',
//                   justifyContent:'space-between'
//                 }}
//                 >
//                   <View style={{flexDirection:'row',justifyContent:'center'}}>
//                   {this.headTab(intit)}
                 
//                   </View>
//                   <View style={{
//                     flexDirection:'row',
//                     position:'absolute',
//                     marginLeft:wp('35%'),
//                   }}>
//                     <Text
//                       style={{
//                         position:'absolute',
//                         // marginLeft:wp('5%'),
                      
//                       }}>
//                       +
//                     </Text>
//                   <Icon name={'ios-musical-notes'} size={20} color={'red'}
//                                                 style={{
//                                                   position:'absolute',
//                                                   marginLeft:wp('3%'),
                                                
//                                                 }} />
//                 </View>
//                 <Text style={{textAlign:'left',fontWeight:'bold',borderColor:'grey',color:'#E55717',fontSize:hp('2%')}}>
//                   {intit.toUpperCase()}
//                 </Text>
               
//                  </View> */}
//               <View
//                 style={{
//                   // flexDirection: 'row',
//                   alignItems: 'center',
//                   paddingBottom: hp('2%'),
//                   width: wp('45%'),
//                 }}
//               >
//                 <TouchableOpacity
//                   style={{
//                     marginLeft: wp('2%'),
//                     width: wp('40%'),
//                   }}
//                   onPress={() => this.showedit(id, or, ci, intit, date, name, od, type, legende, index, id_category)} >
//                   <Text style={{ textAlign: 'justify', fontSize: 14, fontWeight: '400' }}
//                   >{or}
//                   </Text>
//                   <View
//                   style={{
//                     borderWidth:0.5,
//                     borderColor:'white',
//                     width:wp('30%'),
//                     alignSelf:'center',
//                     marginTop:hp('1%'),
//                     marginBottom:hp('1%'),
//                     opacity:0.5
//                   }}
//                   />
//                   <Text style={{ textAlign: 'justify', fontSize: 14 }}
//                   >{ci}
//                   </Text>
//                 </TouchableOpacity>
//                 {/* this._play(i) */}
//                 <View>
//                   {(name !== '') ? (
//                     <TouchableOpacity
//                       style={{
//                         alignSelf: 'center',
//                         // marginLeft: wp('10%')
//                       }}
//                       onPress={() => {
//                         this.setState({ listexpres: false }), this.props.navigation.navigate('VideoWebPlayer', { namevid: name, id_groupe: this.state.id_groupe }),
//                           console.log(name)
//                       }}
//                     >
//                       <Image style={{ width: 30, height: 30 }}
//                         source={require('../image/play-2.png')}>
//                       </Image>

//                     </TouchableOpacity>) : (
//                       <TouchableOpacity
//                         style={{
//                           alignSelf: 'center',
//                           // marginLeft: wp('10%')
//                         }}
//                         onPress={() => this._play(od)}
//                       >

//                         <Image style={{ width: 30, height: 30 }}
//                           source={require('../image/sound.png')}>
//                         </Image>

//                       </TouchableOpacity>)}
//                 </View>
//                 {/* <TouchableOpacity
//                   style={{
//                     position: 'absolute',
//                     right: wp('2.5%'),
//                     // top:hp('1%'),
//                     alignSelf: 'center'
//                   }}
//                   onPress={() => this.setState({ action: true, audioL: od, ide: id, text: or, targTEXT: ci })}
//                 >
//                   <Icon name={'ios-ellipsis-vertical'} size={28} color={'black'} />
//                 </TouchableOpacity> */}

//               </View>

//             </View>
//             <View
//               style={{
//                 with: wp('45%'), height:30, backgroundColor: '#F5E2DC', borderBottomLeftRadius:10,borderBottomRightRadius:10
//               }}>


//               <View
//                 style={{
//                   width: wp('45%'),
//                   height: 30,
//                   // marginLeft:wp('35%'),
//                   // position:'absolute',
//                   // top:hp('5%'),
//                   // left:0,
//                   alignItems: 'center',
//                   justifyContent: 'space-around',
//                   flexDirection: 'row'
//                 }}>
//                 <TouchableOpacity
//                 style={{
//                   // backgroundColor:'red',
//                   width:wp('10%'),
//                   height:30,
//                   justifyContent:'center'
//                 }}
//                   onPress={() => { Clipboard.setString(copied), alert('text copié') }}>
//                   <Icon name={"copy-outline"} size={15} 
//                     style={{alignSelf:'center'}}
//                    />
//                 </TouchableOpacity>
//                 <TouchableOpacity
//                 style={{
//                   // backgroundColor:'red',
//                   width:wp('10%'),
//                   height:30,
//                   justifyContent:'center'
//                 }}
//                   onPress={() => {this.showedit(id, or, ci, intit, date, name, od, type, legende, index, id_category)}}>
//                  <Icon name={"create-outline"} size={15} 
//                     style={{alignSelf:'center'}}
//                    />
//                 </TouchableOpacity>
//                 <TouchableOpacity
//                 style={{
//                   // backgroundColor:'red',
//                   width:wp('10%'),
//                   height:30,
//                   justifyContent:'center'
//                 }}
//                   onPress={() => this.delete(id, name)}>
//                   <Icon name={"trash-outline"} size={15} 
//                     style={{alignSelf:'center'}}
//                    />
//                 </TouchableOpacity>
//                 <TouchableOpacity
//                 style={{
//                   // backgroundColor:'red',
//                   width:wp('10%'),
//                   height:30,
//                   justifyContent:'center'
//                 }}
//                   onPress={() => this.download(name, od)}>
//                   <Icon name={"download-outline"} size={15} 
//                     style={{alignSelf:'center'}}
//                    />
//                 </TouchableOpacity>
//                 <TouchableOpacity
//                 style={{
//                   // backgroundColor:'red',
//                   width:wp('10%'),
//                   height:30,
//                   justifyContent:'center'
//                 }}
//                   onPress={() => this.onShare(or, ci, od, name)}>
//                   <Icon name={"share-social-outline"} size={15} 
//                     style={{alignSelf:'center'}}
//                    />
//                 </TouchableOpacity>
//               </View>

//             </View>
//           </View>
//         );
//       }

//     }
//   }
//   LangaudioView = (id, intitule, index, abrev) => {
//     const { idLan } = this.state;
//     let colors = ['#FFE9F9', '#EAF9FE', '#FFF5E5'
//       , '#FBF5FF', '#FFF1EF', '#A2A2A2'];
//     if (id !== '') {
//       if (idLan == id) {
//         return (
//           <TouchableOpacity 
//             onPress={() => { this.setState({ idLan: '', pickerValueHolder: '',allang:false }) }}>
//             <View style={{ alignItems: 'center', borderWidth: 0.5,borderColor:'white', borderRadius: 15, justifyContent: 'center', height:35 ,backgroundColor:'white', //ito
//             }}>
//               <Text style={{
//                   marginHorizontal: wp('3%'),
//                   marginVertical: hp('0.5%'),
//                   fontWeight: '400',
//                   textAlign: 'center',
//                   // opacity: 0.5,
//                   fontSize:12,
//                   color:'black'
//               }}>
//                 {intitule}
//               </Text>
//               <View
//                 style={{
//                   width: wp('4.5%'),
//                   height: hp('2.5%'),
//                   borderRadius: 30,
//                   position: 'absolute',
//                   right: 0,
//                   top: hp('-1%')
//                 }}>
//                 <Image style={{
//                   width: wp('4.5%'),
//                   height: hp('2.5%'),
//                 }}
//                   source={require('../image/Check-category.png')}>
//                 </Image>

//               </View>

//               {/* {this.contentView(item.id_expression,item.content_langue_origine,item.content_langue_cible,item.audio_langue_origine,item.intitule,item.date_creation,item.f_name,item.type_file,item.legende_f)}          */}
//             </View>
//           </TouchableOpacity>


//         );
//       }
//       else {
//         return (
//           <TouchableOpacity
//             // style={{
//             //   backgroundColor:'red'
//             // }}
//             onPress={() => { this.setState({ idLan: id, pickerValueHolder: abrev,allang:false }) }}>
//             <View style={{ alignItems: 'center', borderRadius: 15, justifyContent: 'center', height:35 ,backgroundColor:'#0C1D65', //ito
//                   }}>
//               <View
//                 // style={{
//                 //   // backgroundColor: colors[index % colors.length],
//                 //   backgroundColor:'#0C1D65', //ito
//                 //   borderRadius: 20
//                 // }}
//                 >
//                 <Text style={{
//                   marginHorizontal: wp('3%'),
//                   marginVertical: hp('0.5%'),
//                   fontWeight: '400',
//                   textAlign: 'center',
//                   // opacity: 0.5,
//                   fontSize:12,
//                   color:'white'
//                 }}>
//                   {intitule}
//                 </Text>
//               </View>
//               {/* {this.contentView(item.id_expression,item.content_langue_origine,item.content_langue_cible,item.audio_langue_origine,item.intitule,item.date_creation,item.f_name,item.type_file,item.legende_f)}          */}
//             </View>
//           </TouchableOpacity>


//         );
//       }

//     }
//   }
//   LangView = (id, intitule, index, abrev) => {
//     const { idLan } = this.state;
//     let colors = ['#FFE9F9', '#EAF9FE', '#FFF5E5', '#FBF5FF', '#FFF1EF', '#A2A2A2'];
//     if (id !== '') {
//       if (idLan == id) {
//         return (
//           <TouchableOpacity
//             onPress={() => { this.setState({ idLan: '' }, this.handleTranslate(abrev)) }}>
//             <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: '#DBDDDC', borderWidth: 0.5, borderRadius: 20, justifyContent: 'center' }}>
//               <Text style={{
//                 marginHorizontal: wp('3%'),
//                 marginVertical: hp('0.5%'),
//                 fontWeight: '100',
//                 textAlign: 'center',
//                 opacity: 0.5
//               }}>
//                 {intitule}
//               </Text>
//               <View
//                 style={{
//                   width: wp('4.5%'),
//                   height: hp('2.5%'),
//                   borderRadius: 30,
//                   position: 'absolute',
//                   right: 0,
//                   top: hp('-1%')
//                 }}>
//                 <Image style={{
//                   width: wp('4.5%'),
//                   height: hp('2.5%'),
//                 }}
//                   source={require('../image/Check-category.png')}>
//                 </Image>

//               </View>

//               {/* {this.contentView(item.id_expression,item.content_langue_origine,item.content_langue_cible,item.audio_langue_origine,item.intitule,item.date_creation,item.f_name,item.type_file,item.legende_f)}          */}
//             </View>
//           </TouchableOpacity>


//         );
//       }
//       else {
//         return (
//           <TouchableOpacity
//             // style={{
//             //   backgroundColor:'red'
//             // }}
//             onPress={() => { this.setState({ idLan: id }), this.handleTranslate(abrev) }}>
//             <View style={{ alignItems: 'center', borderWidth: 0.5, borderRadius: 20, justifyContent: 'flex-start' }}>
//               <View
//                 style={{
//                   backgroundColor: colors[index % colors.length],
//                   borderRadius: 20
//                 }}>
//                 <Text style={{
//                   marginHorizontal: wp('3%'),
//                   marginVertical: hp('0.5%'),
//                   fontWeight: '100',
//                   textAlign: 'center',
//                   opacity: 0.5
//                 }}>
//                   {intitule}
//                 </Text>
//               </View>
//               {/* {this.contentView(item.id_expression,item.content_langue_origine,item.content_langue_cible,item.audio_langue_origine,item.intitule,item.date_creation,item.f_name,item.type_file,item.legende_f)}          */}
//             </View>
//           </TouchableOpacity>


//         );
//       }



//     }


//   }
//   LangViewedit = (id, intitule, index, abrev) => {
//     const { idLan } = this.state;
//     let colors = ['#FFE9F9', '#EAF9FE', '#FFF5E5', '#FBF5FF', '#FFF1EF', '#A2A2A2'];
//     if (id !== '') {
//       if (idLan == id) {
//         return (
//           <TouchableOpacity
//             onPress={() => { this.setState({ idLan: '' }, this.handleTranslatedit(abrev)) }}>
//             <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: '#DBDDDC', borderWidth: 0.5, borderRadius: 20, justifyContent: 'center' }}>
//               <Text style={{
//                 marginHorizontal: wp('3%'),
//                 marginVertical: hp('0.5%'),
//                 fontWeight: '100',
//                 textAlign: 'center',
//                 opacity: 0.5
//               }}>
//                 {intitule}
//               </Text>
//               <View
//                 style={{
//                   width: wp('4.5%'),
//                   height: hp('2.5%'),
//                   borderRadius: 30,
//                   position: 'absolute',
//                   right: 0,
//                   top: hp('-1%')
//                 }}>
//                 <Image style={{
//                   width: wp('4.5%'),
//                   height: hp('2.5%'),
//                 }}
//                   source={require('../image/Check-category.png')}>
//                 </Image>

//               </View>

//               {/* {this.contentView(item.id_expression,item.content_langue_origine,item.content_langue_cible,item.audio_langue_origine,item.intitule,item.date_creation,item.f_name,item.type_file,item.legende_f)}          */}
//             </View>
//           </TouchableOpacity>


//         );
//       }
//       else {
//         return (
//           <TouchableOpacity
//             // style={{
//             //   backgroundColor:'red'
//             // }}
//             onPress={() => { this.setState({ idLan: id }), this.handleTranslatedit(abrev) }}>
//             <View style={{ alignItems: 'center', borderWidth: 0.5, borderRadius: 20, justifyContent: 'flex-start' }}>
//               <View
//                 style={{
//                   backgroundColor: colors[index % colors.length],
//                   borderRadius: 20
//                 }}>
//                 <Text style={{
//                   marginHorizontal: wp('3%'),
//                   marginVertical: hp('0.5%'),
//                   fontWeight: '100',
//                   textAlign: 'center',
//                   opacity: 0.5
//                 }}>
//                   {intitule}
//                 </Text>
//               </View>
//               {/* {this.contentView(item.id_expression,item.content_langue_origine,item.content_langue_cible,item.audio_langue_origine,item.intitule,item.date_creation,item.f_name,item.type_file,item.legende_f)}          */}
//             </View>
//           </TouchableOpacity>

//         );
//       }
//     }
//   }

//   categoryView = (id, intitule, index) => {
//     const { idecat } = this.state;
//     let colors = ['#FFE9F9', '#EAF9FE', '#FFF5E5', '#FBF5FF', '#FFF1EF', '#A2A2A2'];
//     if (id !== '') {
//       if (idecat == id) {
//         return (
//           <TouchableOpacity
//             onPress={() => this.setState({ idecat: '', pic: '' })}>
//             <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: 'white',height:35, borderWidth:0.5, paddingLeft:15,paddingRight:15, borderColor: '#5C4DB1', borderRadius: 15, justifyContent: 'center' }}>
//               <Text style={{
//                 // marginHorizontal: wp('3%'),
//                 // marginVertical: hp('0.5%'),
//                 fontSize: 12,
//                 fontWeight: '400',
//                 textAlign: 'center'
//               }}>
//                 {intitule}
//               </Text>
//               <View
//                 style={{
//                   width: wp('4.5%'),
//                   height: hp('2.5%'),
//                   borderRadius: 30,
//                   position: 'absolute',
//                   right: 0,
//                   top: hp('-1%')
//                 }}>
//                 <Image style={{
//                   width: wp('4.5%'),
//                   height: hp('2.5%'),
//                 }}
//                   source={require('../image/Check-category.png')}>
//                 </Image>

//               </View>

//               {/* {this.contentView(item.id_expression,item.content_langue_origine,item.content_langue_cible,item.audio_langue_origine,item.intitule,item.date_creation,item.f_name,item.type_file,item.legende_f)}          */}
//             </View>
//           </TouchableOpacity>


//         );
//       }
//       else {
//         return (
//           <TouchableOpacity
//             // style={{
//             //   backgroundColor:'red'
//             // }}
//             onPress={() => { this.setState({ idecat: id, pic: id,all: false  })}}>
//             <View style={{ alignItems: 'center', height:35, backgroundColor: '#0C1D65', borderRadius: 15, justifyContent: 'center', paddingLeft:15, paddingRight:15}}>
//               <View
//                 style={{
//                   // backgroundColor: colors[index % colors.length],
//                   // borderRadius: 20
//                 }}>
//                 <Text style={{
//                   // marginHorizontal: wp('3%'),
//                   // marginVertical: hp('0.5%'),
//                   fontWeight: '400',
//                   color:'white',
//                   fontSize:12,
//                   textAlign: 'center'
//                 }}>
//                   {intitule}
//                 </Text>
//               </View>
//               {/* {this.contentView(item.id_expression,item.content_langue_origine,item.content_langue_cible,item.audio_langue_origine,item.intitule,item.date_creation,item.f_name,item.type_file,item.legende_f)}          */}
//             </View>
//           </TouchableOpacity>


//         );
//       }



//     }

//   }
//   categoryViewFilter = (id, intitule, index) => {
//     const { idecat } = this.state;
//     let colors = ['#FFE9F9', '#EAF9FE', '#FFF5E5', '#FBF5FF', '#FFF1EF', '#A2A2A2'];
//     if (id !== '') {
//       if (idecat == id) {
//         return (
//           <TouchableOpacity
//             onPress={() => { this.filterbycat(''), this.setState({ idecat: '', pic: '' }) }}>
//             <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: 'white',height:35, borderWidth:0.5, paddingLeft:15,paddingRight:15, borderColor: '#5C4DB1', borderRadius: 15, justifyContent: 'center' }}>
//               <Text style={{
//                 marginHorizontal: wp('3%'),
//                 marginVertical: hp('0.5%'),
//                 fontWeight: '400',
//                 fontSize:14,
//                 textAlign: 'center',
//                 opacity: 0.5
//               }}>
//                 {intitule}
//               </Text>
//               <View
//                 style={{
//                   width: wp('4.5%'),
//                   height: hp('2.5%'),
//                   borderRadius: 30,
//                   position: 'absolute',
//                   right: 0,
//                   top: hp('-1%')
//                 }}>
//                 <Image style={{
//                   width: wp('4.5%'),
//                   height: hp('2.5%'),
//                 }}
//                   source={require('../image/Check-category.png')}>
//                 </Image>

//               </View>

//               {/* {this.contentView(item.id_expression,item.content_langue_origine,item.content_langue_cible,item.audio_langue_origine,item.intitule,item.date_creation,item.f_name,item.type_file,item.legende_f)}          */}
//             </View>
//           </TouchableOpacity>


//         );
//       }
//       else {
//         return (
//           <TouchableOpacity
//             // style={{
//             //   backgroundColor:'red'
//             // }}
//             onPress={() => { this.filterbycat(intitule), this.setState({ idecat: id, pic: id }) }}>
//             <View style={{ alignItems: 'center', height:35, backgroundColor: '#0C1D65', borderRadius: 15, justifyContent: 'center', paddingLeft:15, paddingRight:15}}>
//               <View
//                 style={{
//                   // backgroundColor: colors[index % colors.length],
//                   // borderRadius: 20
//                 }}>
//                 <Text style={{
//                   marginHorizontal: wp('3%'),
//                   marginVertical: hp('0.5%'),
//                   fontWeight: '400',
//                   color:'white',
//                   fontSize:12,
//                   textAlign: 'center',

//                   // opacity: 0.5
//                 }}>
//                   {intitule}
//                 </Text>
//               </View>
//               {/* {this.contentView(item.id_expression,item.content_langue_origine,item.content_langue_cible,item.audio_langue_origine,item.intitule,item.date_creation,item.f_name,item.type_file,item.legende_f)}          */}
//             </View>
//           </TouchableOpacity>


//         );
//       }



//     }

//   }


//   show_imageMOdal = () => {
//     if (this.state.url_images !== '') {

//       return (
//         <View>
//           <Image

//             source={{ uri: base_url + "/portail-stagiaire/uploads_image/10304_1600849709.jpg", isStatic: true }}
//             //  source={{ uri:this.state.url_images,isStatic:true }}
//             style={{ width: wp('96%'), height: hp('40%') }}
//           />
//           <Text
//             style={{
//               fontSize: hp('2%')
//             }}>
//             Comments:
//     </Text>

//         </View>



//       );

//     }
//   }
//   show_image = (id, name, type, or, ci, legende) => {

//     if (name !== '') {

//       const url_image = base_url + "/elearning2021/groupes/GRP" + this.state.id_groupe + "/" + name;
//       const url_video = base_url + "/portail-stagiaire/uploads_video/10304_1600175562.mp4";
//       switch (type) {
//         case 'image':
//           return (
//             <TouchableOpacity
//               onPress={() => this.setState({ image: true, url_images: url_image, coms: legende, ide: id, name: name, original: or, cible: ci })}
//             >
//               <Image
//                 style={{ width: wp('16%'), height: hp('8%') }}
//                 source={{
//                   uri: url_image,
//                 }}
//               />
//             </TouchableOpacity>
//           );
//         case 'video':
//           return (
//             <TouchableOpacity
//               onPress={() => { this.setState({ listexpres: false }), this.props.navigation.navigate('VideoPlayer', { namevid: name, id_groupe: this.state.id_groupe }) }}
//             >
//               <Icon name={"ios-film"} size={50} color={'#B36A00'}
//                 style={{
//                   alignSelf: 'center'
//                 }}
//               />
//             </TouchableOpacity>
//           );
//       }
//     } else {

//       return (
//         <Text>
//           {/* No file */}
//         </Text>
//       );
//     }
//   }
//   cibleTexte = (id, ci) => {
//     const { ido } = this.state;
//     if (id == ido) {
//       return (
//         <Text style={{ marginLeft: wp('2%'), fontSize: hp('2%'), textAlign: 'justify', backgroundColor: '#C4C6C7', fontWeight: 'bold' }}
//         // numberOfLines={1}

//         >{ci}
//         </Text>
//       );

//     } else {
//       return (<Text style={{ marginLeft: wp('2%'), fontSize: hp('2%'), textAlign: 'justify' }}
//       // numberOfLines={1}

//       >{ci}
//       </Text>);

//     }

//   }
//   upcat = (ca, ex) => {
//     this.setState({ ActivityIndicator_Loading: true }, () => {
//       fetch(base_url + '/portail-stagiaire/upcat.php',
//         {
//           // 'http://10.0.2.2/projet/save.php'
//           // 'https://demo.forma2plus.com/portail-stagiaire/index.php'
//           method: 'POST',
//           headers:
//           {
//             'Accept': 'application/json',
//             'Content-Type': 'application/json',
//           },
//           body: JSON.stringify(
//             {
//               ca: ca,
//               ex: ex,

//             })

//         }).then((response) => response.json()).then((reponse) => {
//           alert(reponse);
//           this.getData();
//           this.setState({ ActivityIndicator_Loading: false });

//         }).catch((error) => {
//           console.error(error);

//           this.setState({ ActivityIndicator_Loading: false });
//         });
//     });
//   }
//   filterbycat = itemValue => {

//     this.setState({ picat: itemValue });
//     // alert(itemValue);
//     const newData = this.arrayholder.filter(item => {
//       const itemData = `${item.intitule.toUpperCase()}`;
//       // const itemData = item.content_langue_origine ? item.content_langue_origine: '';
//       const textData = itemValue.toUpperCase();

//       return itemData.indexOf(textData) > -1;
//     });
//     this.setState({
//       data: newData,
//     });
//   }
//   trans = () => {
//     this.setState({ show2: true })
//   }
//   navPic = () => {
//     this.setState({ showfile: false, action: false });
//     this.props.navigation.navigate('camera');
//   }
//   playvideo = (name) => {
//     this.setState({ namefile: name, modalplayer: true })
//   }
// renderEditModal = () =>{
//   this.setState({edishw4:true});
//   return (
//     <Myownmodal 
//        isVisible={true}
//        textValue={'hi there'}
//        message={'trying to make a basic component modal'}/>
//   )
// }

//   showListVideo(id, f_name, type_file, legende_f) {
//     const { paused } = this.state;
//     const pauseVid = 'pause' + id;
//     let ide = "";
//     if (id !== ide) {
//       return (
//         <View>
//           {f_name !== "" ? (
//             <View>
//               {type_file == "video" ? (
//                 <View>
//                   <Video
//                     //  ref={(ref) => {
//                     //   this.Video = ref
//                     // }} 
//                     ref={(ref: Video) => { this.video = ref }}
//                     source={{ uri: base_url + "/elearning2020/groupes/GRP" + this.state.id_groupe + "/" + f_name }}
//                     style={{
//                       width: wp('35%'),
//                       height: hp('10%'),
//                       borderRadius: 7,
//                       backgroundColor: 'white',
//                       marginRight: wp('4%')
//                     }}
//                     rate={this.state.rate}
//                     paused={true}
//                     volume={this.state.volume}
//                     muted={this.state.muted}
//                     resizeMode={this.state.resizeMode}
//                     onLoad={this.onLoad}
//                     onProgress={this.onProgress}
//                     onEnd={this.onEnd}
//                     onAudioBecomingNoisy={this.onAudioBecomingNoisy}
//                     onAudioFocusChanged={this.onAudioFocusChanged}
//                     repeat={false}
//                   />
//                   <Text
//                     style={{
//                       color: 'grey',
//                       fontSize: hp('2%'),
//                       textAlign: 'center'
//                     }}>
//                     {legende_f}
//                   </Text>
//                   <View style={{
//                     position: 'absolute',
//                     top: hp('2%'),
//                     alignSelf: 'center'
//                   }}>
//                     {paused ? (
//                       <TouchableOpacity
//                         style={{
//                           width: wp('12%'),
//                           height: hp('6%'),
//                           backgroundColor: 'white',
//                           alignItems: 'center',
//                           justifyContent: 'center',
//                           borderRadius: 50,
//                           opacity: 0.5
//                         }}
//                         onPress={() => this.props.navigation.navigate('VideoPlayer', { namevid: f_name, id_groupe: this.state.id_groupe })}
//                       >
//                         <Icon name={'ios-play'} size={30} color={'white'}
//                           style={{
//                             alignSelf: 'center'
//                           }}
//                         />
//                       </TouchableOpacity>) : (
//                         <TouchableOpacity
//                           style={{
//                             width: wp('12%'),
//                             height: hp('6%'),
//                             backgroundColor: 'white',
//                             alignItems: 'center',
//                             justifyContent: 'center',
//                             borderRadius: 50,
//                             opacity: 0.5
//                           }}
//                           onPress={() => this.onPressBtnPause()}
//                         >
//                           <Icon name={"ios-pause"} size={30} color={'white'}
//                             style={{
//                               alignSelf: 'center'
//                             }}
//                           />
//                         </TouchableOpacity>)}
//                   </View>
//                 </View>
//               ) : null}
//             </View>
//           ) : null}
//         </View>
//       )
//     } else {
//       return null
//     }
//   }
//   downaudio(od) {
//    alert(od);

//   }
//   downfile(name) {
//     alert(name);
//   }
//   download(name, od) {
//     this.downaudio(od);
//     this.downfile(name);

//   }
//   onShare = (or, ci, od, name) => {
//     const ur_od = base_url + "/elearning2020/groupes/GRP15921/" + od
//     const ur_name = base_url + "/elearning2020/groupes/GRP15921/" + name

//     if (name !== null && name !== '') {
//       const shareOptions = {
//         title: 'Myoedb',
//         message: 'Origine:' + or + ' \n' + 'translated:' + ci,
//         urls: [ur_name]
//       };

//       Share.open(shareOptions)
//         .then((res) => { console.log(res) })
//         .catch((err) => { err && console.log(err); });

//     } else if (od !== null && od !== '') {
//       const shareOptions = {
//         title: 'MyOedb',
//         message: 'Origine:' + or + ' \n' + 'translated:' + ci,
//         urls: [ur_od],
//       };

//       Share.open(shareOptions)
//         .then((res) => { console.log(res) })
//         .catch((err) => { err && console.log(err); });
//     } else {
//       const shareOptions = {
//         title: 'Myoedb',
//         message: 'Origine:' + or + ' \n' + 'translated:' + ci,
//       };

//       Share.open(shareOptions)
//         .then((res) => { console.log(res) })
//         .catch((err) => { err && console.log(err); });
//     }



//   };
//   speaking = () => {
//     const { pickerValueHolder } = this.state;
//     const { id } = this.state;
//     console.log(this.state.idecat + ' ' + id);
//     fetch(base_url + '/portail-stagiaire/langue.php', {
//       method: 'POST',
//       headers: {
//         'Accept': 'application/json',
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({
//         PickerValueHolder: pickerValueHolder
//       })

//     }).then((response) => response.json())
//       .then((idlangue) => {
//         if (idlangue == '') {
//           alert('Data empty');
//         }
//         else {
//           this.props.navigation.navigate('spechtext', {
//             idlangue: idlangue.id,
//             id: this.state.id,
//             PickerValueHolder: this.state.pickerValueHolder,
//             login1: this.state.login,
//             nom1: this.state.nom1,
//             prenom1: this.state.prenom1,
//             email1: this.state.email1,
//             tel1: this.state.tel1,
//             adresse1: this.state.adresse1,
//             cp1: this.state.cp1,
//             ville1: this.state.ville1,
//             password1: this.state.password1,
//             id1: this.state.id,
//             id_groupe: this.state.id_groupe,
//             idecat: this.state.idecat,
//             dataSource: this.state.dataSource
//           });
//           // alert('ok');
//           console.log(this.state.idecat + ' ' + idlangue.id);
//         }
//       }).catch((error) => {
//         console.error(error);
//       });
//   }
//   OpenLink = () => {
//     // this.setState({ jitsi: true })
//   this.setState({jitsi:true})
//   // this.props.navigation.navigate('Room',{
//   //   id1:this.state.id,
//   //   id_groupe:this.state.id_groupe,
//   //   type:this.state.type
//   // });
//   // this.setState({jitsi:false});
//   // Clipboard.setString('https://preprod.forma2plus.com:3000/join/'+this.state.id+'_'+this.state.id_groupe);

//   }
//   Openjitsi = () =>{
//     // this.setState({jitsi:true})
//     this.props.navigation.navigate('Room',{
//       id1:this.state.id,
//       id_groupe:this.state.id_groupe,
//       type:this.state.type
//     });
//     this.setState({jitsi:false});
//     // Clipboard.setString('https://preprod.forma2plus.com:3000/join/'+this.state.id+'_'+this.state.id_groupe);
//   }
//   OpenZoom = () =>{
//   this.setState({jitsi:false});
//   alert('open zoom');
//     // this.setState({jitsi:true})
//     // this.props.navigation.navigate('Room',{
//     //   id1:this.state.id,
//     //   id_groupe:this.state.id_groupe,
//     //   type:this.state.type
//     // });
    
//     // Clipboard.setString('https://preprod.forma2plus.com:3000/join/'+this.state.id+'_'+this.state.id_groupe);
//   }


//   filterbyweek = () => {
//     // let thisMoment = moment();
//     this.setState({
//       data: this.state.data3,
//     });
//     let endOfWeek = moment().endOf('week');
//     let startOfWeek = moment().startOf('week');

//       const lowerLimit = startOfWeek.format("YYYY-MM-DD");
//       const upperLimit = endOfWeek.format("YYYY-MM-DD");
//       // alert('lowerLimit:'+lowerLimit+' et '+upperLimit);
//       const newData = this.arrayholder.filter(data => lowerLimit <= data.date_creation && data.date_creation <= upperLimit);
//       // console.log(newData);
      
//       this.setState({
//         data: newData,
//       });
//   }
//   filterbyMonth = () => {
//     // let thisMoment = moment();
//     this.setState({
//       data: this.state.data3,
//     });
//     let endOfWeek = moment().endOf('month');
//     let startOfWeek = moment().startOf('month');

//       const lowerLimit = startOfWeek.format("YYYY-MM-DD");
//       const upperLimit = endOfWeek.format("YYYY-MM-DD");
//       // alert('lowerLimit:'+lowerLimit+' et '+upperLimit);
//       const newData = this.arrayholder.filter(data => lowerLimit <= data.date_creation && data.date_creation <= upperLimit);
//       // console.log(newData);
      
//       this.setState({
//         data: newData,
//       });
//   }
//   filterbyyear = () => {
//     // let thisMoment = moment();
//     this.setState({
//       data: this.state.data3,
//     });
//     let endOfWeek = moment().endOf('year');
//     let startOfWeek = moment().startOf('year');

//       const lowerLimit = startOfWeek.format("YYYY-MM-DD");
//       const upperLimit = endOfWeek.format("YYYY-MM-DD");
//       // alert('lowerLimit:'+lowerLimit+' et '+upperLimit);
//       const newData = this.arrayholder.filter(data => lowerLimit <= data.date_creation && data.date_creation <= upperLimit);
//       // console.log(newData);
      
//       this.setState({
//         data: newData,
//       });
//   }
//   filterbytwodate = () => {
//     if(this.state.startDate!=null && this.state.endDate!=null){
//         const lowerLimit = this.state.startDate.format("YYYY-MM-DD");
//         const upperLimit = this.state.endDate.format("YYYY-MM-DD");
//         console.log('lowerLimit:'+lowerLimit+' et '+upperLimit);
//         const newData = this.arrayholder.filter(data => lowerLimit <= data.date_creation && data.date_creation <= upperLimit);
//         console.log(newData);
        
//         this.setState({
//           data: newData,
//         });
//     }
     
//     }
// showedit =  (id, or, ci, intit, date, name, od, type, legende, index,id_category) =>{
//   // this.setState({action: true, audioL: od, ide: id, text: or, targTEXT: ci  }, () => {
//   //   alert('ok');
//   // })
//   this.setState({action: true, text: or, targTEXT: ci,idexp:id});
//   this.setState({ show4: true, idecat:id_category });

//   // alert(id_category);
// //    this.setState({ action: true, text: or, targTEXT: ci }, () => {
// //   this.setState({ show4: true });
// //   // alert(or)
// // });
// }
// readinText = (txtToread,langcode) =>{
//   Tts.setDefaultLanguage(langcode);
//         Tts.speak(txtToread);
//  }

//   render() {
//     const {searchQuery}=this.state;
//     const url_imagee = base_url + "/portail-stagiaire/uploads_image/";
//     const flexCompleted = this.getCurrentTimePercentage() * 100;
//     // const{data}=this.state;                               
//     const { expres } = this.state;
//     TranslatorConfiguration.setConfig(ProviderTypes.Google, 'AIzaSyBZZC103oLC2F1dGoJRpYNJnaEM--nMEXg', this.state.picIdlangue);
//     const { paused } = this.state;
//     const { encours } = this.state;
//     const { titre } = "";

//     const isDateBlocked = (date) =>
//     date.isBefore(moment('05/09/2000','DD/MM/YYYY'));

//     const onDatesChange = ({ startDate, endDate, focusedInput }) =>{
//     this.setState({ ...this.state, focus: focusedInput }, () =>
//     this.setState({ ...this.state, startDate, endDate })
//     );
//   }

//   const onDateChange = ({ date }) =>
//     this.setState({ ...this.state, date });


//     if (this.state.isLoading) {
//       return (
//         <View style={{ alignSelf: "center", top: hp('40%') }}>
//           <Spinner
//             // style={{}}
//             color={'#2f3c7e'} size={75} type={'ThreeBounce'}
//           />
//         </View>
//       );
//     }
//     const { id } = this.state;
//     const { PickerValueHolder } = this.state;
//     const { goBack } = this.props.navigation;
//     return (
//       <KeyboardAvoidingView
//         style={{ flex: 1,backgroundColor:'#020D4D' }}
//         behavior="padding"
//       >
//         <View
//           style={{
//             backgroundColor: '#020D4D'
//           }} >
//           {/* *** HEADER *** */}
//           <View style={{ justifyContent: 'center',alignItems:'center', height: hp('8.5%'),width:wp('100%') ,marginBottom:-hp('1.5%'),backgroundColor:'#0C1D65'}}>
//             <View
//               style={{ height: hp('4%'), width: wp('100%'), flexDirection: 'row', justifyContent: 'space-between' }}>
//               <TouchableOpacity
//                 onPress={() => this.setState({ listexpres: false, iconHeader: true ,imagedetails:false})}>
//                 <View
//                   style={{
//                     flexDirection: 'row',
//                     // backgroundColor:'white'
//                   }}>
//                   {this.state.iconHeader ? (
//                     <Text></Text>
//                   ) : (

//                     <Icon name={"arrow-back-outline"} size={15} color="white"
//                     style={{alignSelf:'center'}}
//                    />)}
//                   {this.state.iconHeader ? (<Text style={{
//                     color: 'white',
//                     marginLeft: wp('8%'),
//                     fontSize: hp('2.2%'),
//                     position: 'absolute',
//                     bottom: -4
//                   }}>
//                    {/* {I18n.t('home')} */}
//                   </Text>) : (

//                       <View>
//                         {!this.state.imagedetails ?
//                           (<Text style={{
//                             color: 'white',
//                             marginLeft: wp('23%'),
//                             fontSize: hp('2.2%'),
//                             textAlign:'center'

//                           }}>
//                             {I18n.t('All expressions')}
//                           </Text>) :
//                           (<Text style={{
//                             color: '#5C4DB1',
//                             marginLeft: wp('3%'),
//                             fontSize: hp('2.2%')
//                           }}>
//                             {I18n.t('IMAGES DETAILS')}
//                           </Text>)}
//                       </View>)}
//                 </View>
//               </TouchableOpacity>
//               {this.state.iconHeader? (<View style={{
//                   flexDirection: 'row',
//                   position: 'absolute',
//                   right: wp('25%'),
//                   top:10
//                 }}>
//               <Text style={{ marginLeft: wp('2%'), fontSize: hp('2%'),color:'white' }}>
//                 {this.state.login.charAt(0).toUpperCase() + this.state.login.substring(1).toLowerCase()}
//               </Text>
//               </View>):null}
//               {this.state.iconHeader?(<View
//                 style={{
//                   flexDirection: 'row',
//                   position: 'absolute',
//                   top:10,
//                   right: wp('15%')
//                 }}>
//                 <Image style={{
//                   width: 20,
//                   height: 20,
//                 }}
//                   source={require('../image/Avatar-23.png')}>
//                 </Image>
//               </View>):null}
//               {this.state.iconHeader?(<TouchableOpacity
//                 onPress={() => this.clearAllData()}
//                 style={{
//                   flexDirection: 'row',
//                   position: 'absolute',
//                   right: wp('5%')
//                 }}>
//                 <View>
//                   <Icon name="log-out-outline" size={30} color="white" />

//                 </View>
//               </TouchableOpacity>):null}
//               {/* <View
//                 style={{
//                   flexDirection:'row',
//                   position:'absolute',
//                   right:wp('5%')
//                 }}>
//                           <Image style={{
//                             width:wp('5%'),
//                             height:hp('3%'),
//                           }}
//                                       source={require('../image/notification.png')}>
//                           </Image>
                     
//                 </View> */}
//               <View >
//                 {/* <TouchableOpacity style={{width:wp('12%'),height:hp('6%'),bottom:hp('3%'),marginLeft:wp('85%'),backgroundColor:'white',justifyContent:"center",borderRadius:10}}
//                 onPress={() => this.setState({users:true})}>
//                 <Image style={{width:wp('8.5%'),height:hp('5%'),alignSelf:'center'}}
//                             source={require('../image/grid-view-icon-27.jpg')}>
//                 </Image> 
//                 </TouchableOpacity>  */}
//               </View>
//             </View>
//           </View>
//           {/* ***HEADER*** */}

//           {/* *** ACCUEIL *** */}
//           {this.state.iconHeader ? (<View
//             style={{
//               width: wp('95%'),
//               height: hp('80%'),
//               alignSelf: 'center',
//               // backgroundColor: '#020D4D'
//             }}>


//             {/* *** HEADER *** */}

//             {/* *** HEADER *** */}


//             {/* *** PRE-TEXT *** */}
//             <View
//               style={{
//                 flexDirection: 'row',
//                 alignItems:'center',
//                 // backgroundColor:'red',
//                 justifyContent:'center'
//               }}>
//                   <View style={{ 
//                     borderWidth: 0.7,
//                     // borderColor: '#5C4DB1',
//                     width: wp('70%'), 
//                     height: hp('5%'), 
//                     borderRadius: 20, 
//                     alignItems: 'center',
//                     justifyContent: 'center', 
//                     backgroundColor: 'white', 
//                     // marginLeft: wp('1.5%'), 
//                     padding: 0 ,
//                     // marginTop:hp('2%'),
//                     alignSelf:'center'
//                     }}>

//                         <TextInput
//                             placeholder={I18n.t('Type your one or two words')}
//                             style={{ fontSize: 14, textAlign: 'center', padding: 0 }}
//                             ref={(input) => { this.secondTextInput = input; }}
//                             onChangeText={text => this.searchFilterFunction(text)}
//                             // autoFocus={true}
//                             autoCorrect={false}
//                             value={this.state.value}
//                             blurOnSubmit={false}
//                         />
//                         <View style={{ position: 'absolute', marginLeft: wp('3%'), top: hp('1%'), left: wp('2.5%') }}>
//                             <Icon name={'md-search'} size={20} color={'grey'} />
//                         </View>
//                   </View>
//             </View>
//             <View
//                   style={{
//                     flexDirection: 'row',
//                     marginTop: hp('3%'),
//                     marginBottom: hp('1%'),
//                     alignSelf:'center'
//                   }}>
                 
//                   <Text
//                     style={{
//                       color: 'white',
//                       fontWeight: 'bold',
//                       marginLeft: wp('1%'),
//                       fontSize: hp('2%'),
//                       textAlign:'center'
//                     }}>
//                     {I18n.t('stats')}
//                   </Text>
//              </View>
//             <View
//               style={{
//                 flexDirection: 'row',
//                 // alignItems: 'center',
//                 width:wp('90%'),
//                 alignSelf:'center',
//                 // borderWidth:1,
//                 // borderColor:'white',
//                 height:hp('15%'),
//                  justifyContent:'space-around'
//               }}>
//                 <View
//                   style={{
//                     // flexDirection: 'row',
//                     // borderWidth:1,
//                     // borderColor:'white',
//                     width:wp('25%'),
//                     backgroundColor:'#0C1D65',
//                     borderRadius:10,
//                     alignItems:'center',
//                     padding:5,
//                   }}>
//                   <Text
//                     style={{
//                       color: '#DC4F89',
//                       fontSize: 20,
//                       fontWeight:'bold'
//                     }}>
//                     {this.state.nbaudio}
//                   </Text>
//                   <Text
//                     style={{
//                       marginLeft: wp('1%'),
//                       marginTop:hp('2%'),
//                       opacity: 0.5,
//                       fontSize: 14,
//                       color:'white'
//                     }}>
//                     Audios
//                               </Text>
//                 </View>
//                 <View
//                   style={{
//                     // flexDirection: 'row',
//                     // borderWidth:1,
//                     // borderColor:'white',
//                     width:wp('25%'),
//                     backgroundColor:'#62CAD6',
//                     borderRadius:10,
//                     alignItems:'center',
//                     padding:5,
//                   }}>
//                   <Text
//                     style={{
//                       color: '#DC4F89',
//                       fontSize:20,
//                       fontWeight:'bold'
//                     }}>
//                     {this.state.nbtext}
//                   </Text>
//                   <Text
//                     style={{
//                       marginLeft: wp('1%'),
//                       marginTop:hp('2%'),
//                       opacity: 0.5,
//                       fontSize: 14,
//                       color:'white',
//                       textAlign:'center'
//                     }}>
//                     {I18n.t('text expressions')}
//                               </Text>
//                 </View>
//                 <View
//                   style={{
//                     // flexDirection: 'row',
//                     // borderWidth:1,
//                     // borderColor:'white',
//                     alignItems:'center',
//                     width:wp('25%'),
//                     backgroundColor:'#0C1D65',
//                     borderRadius:10
//                   }}>
//                   <Text
//                     style={{
//                       color: '#DC4F89',
//                       fontSize: 20,
//                       fontWeight:'bold'
//                     }}>
//                     {this.state.nbvideo}
//                   </Text>
//                   <Text
//                     style={{
//                       marginLeft: wp('1%'),
//                       marginTop:hp('2%'),
//                       opacity: 0.5,
//                       fontSize: 14,
//                       color:'white',
//                       textAlign:'center'
//                     }}>
//                     {I18n.t('pictures and videos')}
//                               </Text>
//                 </View>
            
//             </View>

//             {/* SEARCH */}
//             {/* <View style={{
//               borderWidth: 0.2,
//               width: wp('80%'),
//               height: hp('6%'),
//               borderRadius: 30,
//               justifyContent: 'center',
//               backgroundColor: 'white',
//               alignSelf: 'center',
//               justifyContent: 'center',
//               marginTop: hp('5%'),
//               marginBottom: hp('5%')
//             }}>
//               <TextInput
//                 placeholder="search for expressions ..."
//                 style={{ fontSize: hp('2%'), textAlign: 'center' }}
//                 ref={(input) => { this.searchInput = input; }}
//                 onChangeText={text => this.searchFilterFunction(text)}
//                 autoCorrect={false}
//                 value={this.state.value}
//                 onSubmitEditing={() => this.setState({ iconHeader: false })}
//                 blurOnSubmit={false}
//               />
//               <View style={{ position: 'absolute', marginLeft: wp('5%') }}>
//                 <Icon name={'md-search'} size={20} color={'grey'} />
//               </View>
//             </View> */}
//             {/* SEARCH */}

//             {/* Capta */}
//             <View
//                       style={{
//                         flexDirection:'row',
//                         marginTop:hp('6%')
//                       }}>
                            
//                               {/* <Text
//                                 style={{
//                                   color:'#5C4DB1',
//                                   fontWeight:'bold',
//                                   marginLeft:wp('1%'),
//                                   fontSize:14
//                                 }}>
//                                 {I18n.t('your task')}
//                               </Text> */}
//                       </View>
//             {/* Capta */}

//             {/* 3liste capt */}
//             <ScrollView
//               // horizontal={false}
//               // showsHorizontalScrollIndicator={false}
//               // pagingEnabled={true}
//               style={{height: hp('10%'), paddingBottom:10}}
//               >
//                 <View
//                 style={{
//                   alignItems:'center',
//                   width:wp('90%'),
//                   // backgroundColor:'white',
//                   flexDirection:'row',
//                   alignSelf:'center',
//                   // height:hp('30%'),
//                   justifyContent:'space-around'
//                 }}>
//                   <View
//                   style={{
//                     borderWidth:1,
//                     borderColor:'#62CAD6',
//                     borderRadius:10,
//                     height:hp('30%'),
//                     width:wp('50%')
//                   }}>
//                        <MaterialIcons name={'playlist-add'} size={30} color={'#62CAD6'}
//                                       style={{
//                                         alignSelf:'center',
//                                         marginTop:hp('8%'),marginBottom:hp('2%')
//                                     }}
//                                       />
//                       <Text
//                           style={{
//                             color:'white',
//                             fontSize:12,
//                             fontWeight:'100',
//                             marginLeft:wp('3%'),
//                             marginTop:hp('1%'),
//                             fontWeight:'bold',
//                             marginBottom:hp('1%'),
//                             textAlign:'center'
//                           }}>
//                               {I18n.t('new record')}
//                       </Text>
//                   </View>
//                   <View
//                       style={{
//                         flexDirection:'column',
//                         alignItems:'center',
//                         // backgroundColor:'#DC4F89',
//                         width:wp('35%'),
//                         height:hp('30%'),
//                         alignSelf:'center',
//                         borderRadius:5,
//                         justifyContent:'center'
//                       }}
//                       >  
//                           <TouchableOpacity 
//                                       // style={styles.buttadd}
//                                       style={
//                                         {
//                                           flexDirection:'row',
//                                           alignItems:'center',
//                                           paddingLeft:wp('2%'),
//                                           // justifyContent:'left',
//                                           backgroundColor:'#62CAD6',
//                                           height:hp('9%'),
//                                           marginBottom:hp('1.5%'),
//                                           width:wp('35%'),
//                                           // margin:hp('1%'),
//                                           borderRadius:10,
      
//                                         }
//                                           }
//                                       onPress={() => {this.setState({create:true}), this.getPicker()}}>
//                                       <Icon name={'md-create'} size={20} color={'white'}
//                                       style={styles.icone}
//                                       />
//                                       <Text style={[styles.textMod,{color:'white',fontWeight:'bold'}]}>
//                                         {I18n.t('Add new expression')}
//                                       </Text> 
//                           </TouchableOpacity> 
//                           <TouchableOpacity 
//                               style={
//                               {
//                                 flexDirection:'row',
//                                           alignItems:'center',
//                                           paddingLeft:wp('2%'),
//                                           // justifyContent:'left',
//                                           backgroundColor:'#62CAD6',
//                                           height:hp('9%'),
//                                           marginBottom:hp('1.5%'),
//                                           width:wp('35%'),
//                                           // margin:hp('1%'),
//                                           borderRadius:10,

//                               }
//                                 }
//                               // style={styles.buttadd}
//                               onPress={() => {this.setState({show1:true}), this.getPicker()}}>
//                               <Icon name={'ios-mic'} size={20} color={'white'}
//                               style={styles.icone}
//                               />
//                               <Text style={[styles.textMod2,{color:'white',fontWeight:'bold'}]}>
//                                 {I18n.t('Add new audio')}
//                               </Text>  
//                           </TouchableOpacity> 
//                           <TouchableOpacity 
//                                       // style={styles.buttadd}
//                                       style={
//                                         {
//                                           flexDirection:'row',
//                                           alignItems:'center',
//                                           paddingLeft:wp('2%'),
//                                           // justifyContent:'left',
//                                           backgroundColor:'#62CAD6',
//                                           height:hp('9%'),
//                                           // marginBottom:hp('1%'),
//                                           width:wp('35%'),
//                                           // margin:hp('1%'),
//                                           borderRadius:10,
      
//                                         }
//                                           }
//                                           // this.props.navigation.navigate('camera')
//                                       onPress={() => {this.setState({videolang:true}), this.getPicker()}}>
//                                       <Icon name={'ios-camera'} size={20} color={'white'}
//                                       style={styles.icone}/> 
//                                       <Text style={[styles.textMod2,{color:'white',fontWeight:'bold'}]}>
//                                         {I18n.t('Record video and picture')}
//                                       </Text> 
//                           </TouchableOpacity>
//                       </View>
//                     </View>
//                     <View
//                     style={{
//                       alignItems:'center',
//                       width:wp('90%'),
//                       // backgroundColor:'white',
//                       flexDirection:'row',
//                       alignSelf:'center',
//                       // height:hp('30%'),
//                       justifyContent:'space-around',
//                       marginTop:hp('3%')
//                     }}>
//                           <View
//                   style={{
//                     borderWidth:1,
//                     borderColor:'#EA1E69',
//                     borderRadius:10,
//                     height:hp('30%'),
//                     width:wp('50%')
//                   }}>
//                        <MaterialIcons name={'screen-search-desktop'} size={30} color={'#EA1E69'}
//                                       style={{
//                                         alignSelf:'center',
//                                         marginTop:hp('8%'),marginBottom:hp('2%')
//                                     }}
//                                       />
//                       <Text
//                           style={{
//                             color:'white',
//                             fontSize:12,
//                             fontWeight:'100',
//                             marginLeft:wp('3%'),
//                             marginTop:hp('1%'),
//                             fontWeight:'bold',
//                             marginBottom:hp('1%'),
//                             textAlign:'center'
//                           }}>
//                               {/* {I18n.t('new record')} */}CONSULTATION
//                       </Text>
//                           </View>
//                         <View
//                                                             style={{
//                                                               flexDirection:'column',
//                                                               alignItems:'center',
//                                                               // backgroundColor:'#DC4F89',
//                                                               width:wp('35%'),
//                                                               height:hp('30%'),
//                                                               alignSelf:'center',
//                                                               borderRadius:5,
//                                                               justifyContent:'center',
//                                                               marginTop:hp('1%')
//                                                             }}
//                                                             >  
                                  
//                                           <TouchableOpacity 
//                                                       // style={styles.buttadd}
//                                                       style={
//                                                         {
//                                                           flexDirection:'row',
//                                                           alignItems:'center',
//                                                           paddingLeft:wp('2%'),
//                                                           // justifyContent:'left',
//                                                           backgroundColor:'#EA1E69',
//                                                           height:hp('9%'),
//                                                           marginBottom:hp('1.5%'),
//                                                           width:wp('35%'),
//                                                           marginTop:hp('1%'),
//                                                           borderRadius:10,
                      
//                                                         }
//                                                           }
//                                                       onPress={() => {this.handleRefresh(),this.setState({iconHeader:false})}}>
//                                                       <Icon name="ios-document-text" size={20} color="white" />
//                                                       <Text style={[styles.textMod,{color:'white',fontWeight:'bold'}]}>
//                                                         {I18n.t('All expressions')}
//                                                       </Text> 
//                                           </TouchableOpacity> 
//                                           <TouchableOpacity 
//                                             style={
//                                               {
//                                                 flexDirection:'row',
//                                                 alignItems:'center',
//                                                 paddingLeft:wp('2%'),
//                                                 // justifyContent:'left',
//                                                 backgroundColor:'#EA1E69',
//                                                 height:hp('9%'),
//                                                 marginBottom:hp('1.5%'),
//                                                 width:wp('35%'),
//                                                 // margin:hp('1%'),
//                                                 borderRadius:10,
            
//                                               }
//                                                 }
//                                               // style={styles.buttadd}
//                                               onPress={() => this.props.navigation.navigate('CategoryView',{cat:this.state.cat,dataSource:this.state.dataSource,id_groupe:this.state.id_groupe,trand:this.state.trand,id:this.state.id})}>
//                                                <Icon name="ios-folder" size={20} color="white" />
//                                               <Text style={[styles.textMod2,{color:'white',fontWeight:'bold'}]}>
//                                               {I18n.t('View categories')}
//                                               </Text>  
//                                           </TouchableOpacity>   
//                                           <TouchableOpacity 
//                                                       // style={styles.buttadd}
//                                                       style={
//                                                         {
//                                                           flexDirection:'row',
//                                                           alignItems:'center',
//                                                           paddingLeft:wp('2%'),
//                                                           // justifyContent:'left',
//                                                           backgroundColor:'#EA1E69',
//                                                           height:hp('9%'),
//                                                           marginBottom:hp('1.5%'),
//                                                           width:wp('35%'),
//                                                           // margin:hp('1%'),
//                                                           borderRadius:10,
                      
//                                                         }
//                                                           }
//                                                           // this.props.navigation.navigate('camera')
//                                                       onPress={() => this.props.navigation.navigate('Recordings',{myv:this.state.myvideo,id:this.state.id,id_groupe:this.state.id_groupe,trand:this.state.trand})}>
//                                                        <MaterialIcons name={'video-label'} size={20} color={'white'}
//                                                           />
//                                                       <Text style={[styles.textMod2,{color:'white',fontWeight:'bold'}]}>
//                                                         {I18n.t('Your recordings')}
//                                                       </Text> 
//                                           </TouchableOpacity>
//                                           {/* <View
//                                           style={{
//                                             flexDirection:'row'
//                                           }}>
//                                                       <View
//                                                       style={{
//                                                         width:wp('3%'),
//                                                         height:hp('1.7%'),
//                                                         backgroundColor:'white',
//                                                         borderWidth:1,
//                                                         borderColor:'#5C4DB1',
//                                                         borderRadius:50
//                                                       }}/>
//                                                       <View
//                                                       style={{
//                                                         width:wp('3%'),
//                                                         height:hp('1.7%'),
//                                                         backgroundColor:'#5C4DB1',
//                                                         borderWidth:1,
//                                                         borderColor:'#5C4DB1',
//                                                         marginLeft:wp('2%'),
//                                                         borderRadius:50
//                                                       }}/>
                                            
//                                           </View> */}

//               </View>
  
//   </View>
// </ScrollView>



//             {/* 3Liste capt */}

//             {/* *** PRE-TEXT ***  */}

//             {/* *** MODAL ADD NEW *** */}

//             {/* *** MODAL ADD NEW *** */}


//             {/* *** LISTE DES FONCTIONNALITES*** */}


//           </View>) : (
//               <View>
//                 {!this.state.imagedetails ? (
//                 <View
//                   style={{ with: wp('100%'),height:hp('80%'),backgroundColor: '#020D4D' }}>
//                   {/* <View
//                     style={{
//                       flexDirection: 'row',
//                     }}>
//                     <View
//                       style={{
//                         flexDirection: 'column',
//                         marginLeft: wp('2.5%')
//                       }}>
//                       <Text
//                         style={{
//                           color: '#5C4DB1',
//                           fontSize: 14
//                         }}>
//                         {I18n.t('List of')}
//                                                   </Text>
//                       <View
//                         style={{
//                           borderWidth: 1,
//                           borderColor: '#DC4F89'
//                         }} />
//                     </View>
//                     <Text
//                       style={{
//                         color: '#5C4DB1',
//                         fontWeight: 'bold',
//                         marginLeft: wp('1%'),
//                         fontSize: 14
//                       }}>
//                       {I18n.t('your expressions')}
//                                         </Text>
//                     <View
//                       style={{
//                         // width:wp('5%'),
//                         height: hp('2.5%'),
//                         backgroundColor: 'pink',
//                         marginLeft: wp('2%')
//                       }}>
//                       <Text
//                         style={{
//                           color: 'black',
//                           fontWeight: '200',
//                           fontSize: 14,
//                           paddingTop: 2,
//                           paddingBottom: 2,
//                           paddingLeft: 2,
//                           paddingRight: 2
//                         }}>
//                         {this.state.nbtext}
//                       </Text>
//                     </View>
//                     <TouchableOpacity
//                       onPress={() => alert('pressed')}
//                       style={{
//                         position: 'absolute',
//                         right: wp('2.5%')
//                       }}>
//                       <Text
//                         style={{
//                           fontSize: 14,
//                           color: '#DC4F89'
//                         }}>
//                         {I18n.t('Filter')}
//                                         </Text>
//                     </TouchableOpacity>
//                   </View> */}
//                   <View
//               style={{
//                 flexDirection: 'row',
//                 alignItems:'center',
//                 // backgroundColor:'red',
//                 justifyContent:'center'
//               }}>
//                   <View style={{ 
//                     borderWidth: 0.7,
//                     // borderColor: '#5C4DB1',
//                     width: wp('70%'), 
//                     height: hp('5%'), 
//                     borderRadius: 20, 
//                     alignItems: 'center',
//                     justifyContent: 'center', 
//                     backgroundColor: 'white', 
//                     // marginLeft: wp('1.5%'), 
//                     padding: 0 ,
//                     // marginTop:hp('2%'),
//                     alignSelf:'center'
//                     }}>

//                         <TextInput
//                             placeholder={I18n.t('Type your one or two words')}
//                             style={{ fontSize: 14, textAlign: 'center', padding: 0 }}
//                             ref={(input) => { this.secondTextInput = input; }}
//                             onChangeText={text => this.searchFilterFunction(text)}
//                             // autoFocus={true}
//                             autoCorrect={false}
//                             value={this.state.value}
//                             blurOnSubmit={false}
//                         />
//                         <View style={{ position: 'absolute', marginLeft: wp('3%'), top: hp('1%'), left: wp('2.5%') }}>
//                             <Icon name={'md-search'} size={20} color={'grey'} />
//                         </View>
//                   </View>
//             </View>
                  

//                   <View
//                       style={{
//                         flexDirection:'column'
//                       }}>
//                           <View
//                           style={{
//                             flexDirection:'row',
//                             marginTop:hp('2%')
//                           }}>
//                                 <TouchableHighlight
//                                 onPress={()=>{this.filterbyweek(),this.setState({week:'grey'})}}
//                               style={{
//                                 borderRadius:15,
//                                 // borderWidth:0.5,
//                                 paddingLeft:10,
//                                 paddingRight:10,
//                                 justifyContent:'center',
//                                 height:35,
//                                 // paddingVertical:3,
//                                 // borderColor:'#5C4DB1',
//                                 marginLeft:wp('2.5%'),
//                                 backgroundColor:'#0C1D65'

//                               }}>
//                                     <Text
//                                     style={{
//                                       color:'grey',
//                                       fontSize:hp('1.8%')
//                                     }}>
//                                       {I18n.t('this week')}
//                                     </Text>
//                               </TouchableHighlight>
//                               <TouchableHighlight
//                               onPress={()=>this.filterbyMonth()}
//                                 style={{
//                                   borderRadius:15,
//                                   // borderWidth:0.5,
//                                   paddingLeft:10,
//                                   paddingRight:10,
//                                   marginLeft:wp('2.5%'),
//                                   // paddingVertical:3,
//                                   // borderColor:'#5C4DB1',
//                                   justifyContent:'center',
//                                   height:35,
//                                   backgroundColor:'#0C1D65'
                                  
//                                 }}>
//                                     <Text
//                                      style={{
//                                       color:'grey',
//                                       fontSize:hp('1.8%')
//                                     }}>
//                                       {I18n.t('this month')}
//                                     </Text>
//                               </TouchableHighlight>
//                               <TouchableHighlight
//                               onPress={()=>this.filterbyyear()}
//                                 style={{
//                                   borderRadius:15,
//                                   // borderWidth:0.5,
//                                   paddingLeft:10,
//                                   paddingRight:10,
//                                   marginLeft:wp('2.5%'),
//                                   // paddingVertical:3,
//                                   // borderColor:'#5C4DB1',
//                                   justifyContent:'center',
//                                   height:35,
//                                   backgroundColor:'#0C1D65'
                                  
//                                 }}>
//                                     <Text
//                                      style={{
//                                       color:'grey',
//                                       fontSize:hp('1.8%')
//                                     }}>
//                                       {I18n.t('this year')}
//                                     </Text>
//                               </TouchableHighlight>

//                                 <TouchableOpacity
//                                 onPress={()=>this.setState({bydate:true})}
//                                 style={{
//                                   borderRadius:15,
//                                   // borderWidth:0.5,
//                                   paddingLeft:10,
//                                   paddingRight:10,
//                                   marginLeft:wp('2.5%'),
//                                   // paddingVertical:3,
//                                   // borderColor:'#5C4DB1',
//                                   justifyContent:'center',
//                                   height:35,
//                                   backgroundColor:'#EA1E69'
                                  
//                                 }}>
//                                       <Icon name={'ios-calendar'} size={20} color={'white'} />
//                                 </TouchableOpacity>
//                               {this.state.startDate?(<TouchableOpacity
//                                 onPress={()=>this.setState({bydate:false,startDate:null,endDate:null,data:this.state.data3})}
//                                 style={{
//                                   marginLeft:wp('2.5%')
//                                 }}>
//                                       <Icon name={'ios-calendar'} size={20}  />
//                                 </TouchableOpacity>):null}
//                           </View>
//                      </View>


//                      {this.state.bydate?( <View
//                       style={{
//                        flex: 1,
//                        flexGrow: 1,
//                        marginTop: hp('2%')
//                       }}>
//                         <Dates
//                           onDatesChange={onDatesChange}
//                           isDateBlocked={isDateBlocked}
//                           startDate={this.state.startDate}
//                           endDate={this.state.endDate}
//                           focusedInput={this.state.focus}
//                           range
//                         />
//                       <View
//                       style={{flexDirection:'row'}}>
//                             {/* {this.state.date && <Text style={styles.date}>{this.state.date && this.state.date.format('LL')}</Text>} */}
//                             <View style={{flexDirection:'column',
//                                           width:wp('70%'),
//                                           marginLeft:wp('2.5%')
//                                           }}>
//                                   <Text style={[styles.date, this.state.focus === 'startDate' && styles.focused]}>{this.state.startDate && this.state.startDate.format("LL")} </Text>
//                                   <Text style={[styles.date, this.state.focus === 'endDate' && styles.focused]}>{this.state.endDate && this.state.endDate.format("LL")}</Text>
//                             </View>
//                             <TouchableOpacity
//                             onPress={()=>{this.filterbytwodate(),this.setState({bydate:false})}}
//                             style={{
//                               padding:10,
//                               backgroundColor:'#DC4F89',
//                               borderRadius:5,
//                               // width:80,
//                               marginRight:wp('2.5%'),
//                               alignItems:'center',
//                               position:'relative',
//                               right:wp('2.5%'),
//                               marginTop:hp('1%'),
//                               marginBottom:hp('1%')
//                             }}>
//                               <Text
//                               style={{textAlign:'center',color:'white'}}>{I18n.t('Search')}</Text>
//                             </TouchableOpacity>
//                       </View>
                      
//                      </View>):null}
                  
//                      <View
//                     style={{
//                       flexDirection: 'row',
//                       marginTop: hp('1%')
//                     }}>
//                     <View
//                       style={{
//                         flexDirection: 'column',
//                         marginLeft: wp('2.5%')
//                       }}>
//                       <Text
//                         style={{
//                           color: 'white',
//                           fontSize: 14,
//                           fontWeight:'400'
//                         }}>
//                         CATEGORIES
//                                                   </Text>
//                       {/* <View
//                         style={{
//                           borderWidth: 1,
//                           borderColor: '#DC4F89'
//                         }} /> */}
//                     </View>
//                     <View
//                       style={{
//                         // width:wp('5%'),
//                         height: hp('2.5%'),
//                         backgroundColor: 'pink',
//                         marginLeft: wp('2%')
//                       }}>
//                       {/* <Text
//                         style={{
//                           color: 'black',
//                           fontWeight: '200',
//                           fontSize: 14,
//                           paddingTop: 2,
//                           paddingBottom: 2,
//                           paddingLeft: 2,
//                           paddingRight: 2
//                         }}>
//                         {this.state.nbcat}
//                       </Text> */}
//                     </View>
// {/* 
//                     <TouchableOpacity
//                       onPress={() => alert('pressed')}
//                       style={{
//                         position: 'absolute',
//                         right: wp('2.5%')
//                       }}>
//                       <Text
//                         style={{
//                           fontSize: 14,
//                           color: 'grey'
//                         }}>
//                         {I18n.t('See all')}
//                                         </Text>
//                     </TouchableOpacity> */}

//                   </View>
//                   <View style={{
//                     // backgroundColor:'red',
//                     // justifyContent:'center'
//                   }}>
//                     {!this.state.all ? (
//                       <View
//                         style={{
//                           // marginVertical:hp('0.5%'),
//                           marginLeft: wp('2.5%'),
//                         }}>
//                         <FlatList
//                           data={this.state.cat}
//                           extraData={this.state}
//                           keyExtractor={(item) => item.id}
//                           refreshing={this.state.refreshing}
//                           horizontal={true}
//                           // numColumns={3}
//                           onRefresh={this.handleRefresh}
//                           enableEmptySections={true}
//                           renderSeparator={this.ListViewItemSeparator}
//                           renderItem={({ item, index }) =>
//                             <View style={{
//                               flexDirection: 'column', justifyContent: 'center', marginRight: wp('2%'), height: hp('7%'),
//                             }}>
//                               {this.categoryViewFilter(item.id, item.intitule, index)}
//                             </View>
//                           }
//                         />



//                       </View>) :
//                       (
//                         <View>
//                           <View
//                             style={{
//                               // marginVertical:hp('1%'),
//                               marginLeft: wp('5%')
//                             }}>
//                             <FlatList
//                               data={this.state.cat}
//                               extraData={this.state}
//                               keyExtractor={(item) => item.id}
//                               refreshing={this.state.refreshing}
//                               horizontal={false}
//                               numColumns={3}
//                               onRefresh={this.handleRefresh}
//                               enableEmptySections={false}
//                               renderSeparator={this.ListViewItemSeparator}
//                               renderItem={({ item, index }) =>
//                                 <View style={{
//                                   flexDirection: 'column', justifyContent: 'center', height: hp('7.2%'),
//                                   paddingBottom: hp('0.6%')
//                                 }}>
//                                   {this.categoryView(item.id, item.intitule, index)}
//                                 </View>
//                               }
//                             />
//                           </View>
//                         </View>
//                       )}
//                   </View>
//                   <View style={{ height: hp('60%'),alignItems:'center',marginLeft:wp('2.5%')}}>
//                     <FlatList
//                       data={this.state.data}
//                       extraData={this.state}
//                       keyExtractor={(item) => item.id_expression}
//                       refreshing={this.state.refreshing}
//                       onRefresh={this.handleRefresh}
//                       enableEmptySections={true}
//                       numColumns={2} //tena izy
//                       renderSeparator={this.ListViewItemSeparator}
//                       renderItem={({ item , index}) =>
//                         <View style={{ flexDirection: 'column' , alignItems:'center'}}>
//                           {/* {this.headerTableau(item.intitule)} */}
//                           <View
//                           //  style={{borderLeftWidth:0.5,borderRightWidth:0.5}}
//                           >
//                             <View style={{ flexDirection: 'row' ,alignItems:'center'}}>
//                               {this.contentView(item.id_expression, item.content_langue_origine, item.content_langue_cible, item.audio_langue_origine, item.intitule, item.date_creation, item.f_name, item.type_file, item.legende_f,index, item.id_category)}
//                             </View>
//                           </View>

//                         </View>
//                       }
//                     />


//                   </View>
//                   {/* <View
//                     style={{
//                       flexDirection: 'row',
//                     }}>
//                     <View
//                       style={{
//                         flexDirection: 'column',
//                         marginLeft: wp('2.5%')
//                       }}>
//                       <Text
//                         style={{
//                           color: '#5C4DB1',
//                           fontSize: 14
//                         }}>
//                         your
//                                                   </Text>
//                       <View
//                         style={{
//                           borderWidth: 1,
//                           borderColor: '#DC4F89'
//                         }} />
//                     </View>
//                     <Text
//                       style={{
//                         color: '#5C4DB1',
//                         fontWeight: 'bold',
//                         marginLeft: wp('1%'),
//                         fontSize: 14
//                       }}>
//                       recordings
//                                         </Text>
//                     <View
//                       style={{
//                         // width:wp('5%'),
//                         height: hp('2.5%'),
//                         backgroundColor: 'pink',
//                         marginLeft: wp('2%')
//                       }}>
//                       <Text
//                         style={{
//                           color: 'black',
//                           fontWeight: '200',
//                           fontSize: 14,
//                           paddingTop: 2,
//                           paddingBottom: 2,
//                           paddingLeft: 2,
//                           paddingRight: 2
//                         }}>
//                         {this.state.nbvideo}
//                       </Text>
//                     </View>
//                   </View> */}
//                   {/* <View style={{
//                     width: wp('35%'),
//                     height: hp('12%')
//                   }}>
//                     <View style={{ height: hp('15%'), width: wp('100%'), backgroundColor: '##F4F6FC' }}>
//                       <View style={{ height: hp('15%'), width: wp('80%'), backgroundColor: '#F4F6FC' }}>
//                         <FlatList
//                           data={this.state.myv}
//                           extraData={this.state}
//                           keyExtractor={(item) => item.id_expression}
//                           refreshing={this.state.refreshing}
//                           horizontal={true}
//                           onRefresh={this.handleRefresh}
//                           enableEmptySections={true}
//                           renderItem={({ item, index }) =>
//                             <View>
//                               {this.showListVideo(item.id_expression, item.f_name, item.type_file, item.legende_f, index)}
//                             </View>
//                           }
//                         />
//                       </View>
//                       <TouchableOpacity
//                         onPress={() => this.loadMore()}>
//                         <View
//                           style={{
//                             alignSelf: 'center'
//                           }}>
//                           <Icon name={'chevron-forward-outline'} size={45} color={'black'} />
//                         </View>
//                       </TouchableOpacity>
//                     </View>
//                   </View> */}


                  

//                 </View>) :
//                   <View
//                     style={{
//                       width: wp('100%'),
//                       height: hp('90%'),
//                       // backgroundColor:'red'
//                     }}>
//                     <Image style={{
//                       width: wp('90%'),
//                       height: hp('30%'),
//                       alignSelf: 'center',
//                       borderRadius: 10
//                     }}
//                       source={{ uri: base_url + "/elearning2021/groupes/GRP" + this.state.id_groupe + "/" + this.state.name }}>
//                     </Image>
//                     <View
//                       style={{
//                         width: wp('60%'),
//                         height: hp('5%'),
//                         // backgroundColor:'blue',
//                         marginLeft: wp('35%'),
//                         justifyContent: 'space-around',
//                         flexDirection: 'row'
//                       }}>
//                       <Image style={{
//                         width: 20,
//                         height: 20,
//                         alignSelf: 'center',
//                       }}
//                         source={require('../image/copy.png')}>
//                       </Image>
//                       <Image style={{
//                         width: 20,
//                         height: 20,
//                         alignSelf: 'center',
//                       }}
//                         source={require('../image/edit-2.png')}>
//                       </Image>
//                       <Image style={{
//                         width: 20,
//                         height: 20,
//                         alignSelf: 'center',
//                       }}
//                         source={require('../image/delete.png')}>
//                       </Image>
//                       <Image style={{
//                         width: 10,
//                         height: 20,
//                         alignSelf: 'center',
//                       }}
//                         source={require('../image/down-arrow.png')}>
//                       </Image>
//                       <Image style={{
//                         width: 20,
//                         height: 20,
//                         alignSelf: 'center',
//                       }}
//                         source={require('../image/share.png')}>
//                       </Image>
//                     </View>
//                     <View>
//                       <View
//                         style={{
//                           flexDirection: 'row',
//                           marginLeft: wp('5%')
//                         }}>
//                         <Text
//                           style={{
//                             fontSize: hp('2%'),
//                             opacity: 0.6
//                           }}>
//                          {I18n.t('Nom du fichier:')}
//                                               </Text>
//                         <Text
//                           style={{
//                             fontSize: hp('1.5%'),
//                             marginLeft: wp('2%'),
//                             opacity: 0.6
//                           }}>
//                           {this.state.name}
//                         </Text>
//                       </View>
//                       <View
//                         style={{
//                           flexDirection: 'row',
//                           marginLeft: wp('5%')

//                         }}>
//                         <Text
//                           style={{
//                             fontSize: hp('2%'),
//                             opacity: 0.6
//                           }}>
//                           {I18n.t('Date de création:')}
//                                               </Text>
//                         <Text
//                           style={{
//                             fontSize: hp('1.5%'),
//                             marginLeft: wp('2%'),
//                             opacity: 0.6
//                           }}>
//                           {this.state.date}
//                         </Text>
//                       </View>
//                       <View
//                         style={{
//                           flexDirection: 'column',
//                           marginTop: hp('1.5%'),
//                           marginLeft: wp('5%')
//                         }}>
//                         <Text
//                           style={{
//                             fontSize: hp('2%'),
//                             fontWeight: 'bold',
//                             color: '#5C4DB1'
//                           }}>
//                           {I18n.t('Description:')}
//                                               </Text>
//                         <View
//                           style={{
//                             height: 2,
//                             backgroundColor: 'pink'
//                           }} />
//                       </View>
//                       <View
//                         style={{
//                           marginTop: hp('0.5%'),
//                           marginLeft: wp('5%')
//                         }}>
//                         <Text
//                           style={{
//                             fontSize: hp('1.5%'),
//                             opacity: 0.6
//                           }}>
//                           {this.state.legende}
//                         </Text>
//                       </View>
//                       <View
//                         style={{
//                           flexDirection: 'column',
//                           marginTop: hp('1.5%'),
//                           marginLeft: wp('5%')
//                         }}>
//                         <Text
//                           style={{
//                             fontSize: hp('2%'),
//                             fontWeight: 'bold',
//                             color: '#5C4DB1',

//                           }}>
//                            {I18n.t('Image transcription:')}
//                                               </Text>
//                         <View
//                           style={{
//                             height: 2,
//                             backgroundColor: 'pink'
//                           }} />
//                       </View>
//                       <ScrollView
//                         style={{
//                           height: hp('15%'),
//                         }}>
//                         <View
//                           style={{
//                             flexDirection: 'row',
//                             width: wp('90%'),
//                             alignSelf: 'center',
//                             marginTop: hp('0.3%')
//                           }}>
//                           <View
//                             style={{
//                               backgroundColor: 'pink',
//                               width: wp('6%'),
//                               height: hp('3%')
//                             }}>
//                             <Text
//                               style={{
//                                 fontSize: hp('2%')
//                               }}>
//                               EN
//                             </Text>
//                           </View>
//                           <View
//                             style={{
//                               width: wp('82%'),
//                               left: wp('8%'),
//                               position: 'absolute',
//                               top: 0
//                             }}>
//                             <Text
//                               style={{
//                                 fontSize: hp('1.5%'),
//                                 opacity: 0.6,
//                                 textAlign: 'left'
//                               }}>
//                               {this.state.original}
//                             </Text>
//                           </View>
//                         </View>
//                         <View
//                           style={{
//                             flexDirection: 'row',
//                             width: wp('90%'),
//                             alignSelf: 'center',
//                             marginTop: hp('4%')
//                           }}>
//                           <View
//                             style={{
//                               backgroundColor: 'pink',
//                               width: wp('6%'),
//                               height: hp('3%')
//                             }}>
//                             <Text
//                               style={{
//                                 fontSize: hp('2%')
//                               }}>
//                               FR
//                                                                   </Text>
//                           </View>
//                           <View
//                             style={{
//                               width: wp('80%'),
//                               left: wp('8%'),
//                               position: 'absolute',
//                               top: 0,
//                             }}>
//                             <Text
//                               style={{
//                                 fontSize: hp('1.5%'),
//                                 opacity: 0.6,
//                                 textAlign: 'left'
//                               }}>
//                               {this.state.cible}
//                             </Text>
//                           </View>
//                         </View>
//                       </ScrollView>
//                       <View
//                         style={{
//                           flexDirection: 'column',
//                           marginTop: hp('1.5%'),
//                           marginLeft: wp('5%')
//                         }}>
//                         <Text
//                           style={{
//                             fontSize: hp('2%'),
//                             fontWeight: 'bold',
//                             color: '#5C4DB1',

//                           }}>
//                           {I18n.t('categories')}
//                                               </Text>
//                         <View
//                           style={{
//                             height: 2,
//                             backgroundColor: 'pink'
//                           }} />
//                       </View>
//                       <View
//                         style={{
//                           borderRadius: 15,
//                           borderWidth: 1,
//                           borderColor: '#5C4DB1',
//                           width: wp('45%'),
//                           marginTop: hp('2%'),
//                           marginLeft: wp('5%')
//                         }}>
//                         <Text
//                           style={{
//                             paddingTop: 2,
//                             paddingBottom: 2,
//                             textAlign: 'center',
//                             fontSize: hp('2%'),
//                             opacity: 0.6
//                           }}>
//                           {this.state.intit ? this.state.intit : 'Not categorised'}
//                         </Text>
//                       </View>
//                     </View>

//                   </View>
//                 }
//               </View>
//             )}

//           {/* *** ACCUEIL *** */}
          
         
//           {/* <View 
//                                             // style={styles.buttadd}
//                                             style={
//                                               {flexDirection:'row',
//                                                 // borderWidth:1,
//                                                 position:'absolute',
//                                                 bottom:hp('0%'),
//                                                 alignSelf:'flex-end',
//                                                 height:hp('6%'),
//                                                 width:wp('90%'),
//                                                 backgroundColor:'white',
//                                                 justifyContent:'space-around',
//                                                 alignItems:'center',
//                                                 alignSelf:'center',
//                                                 borderRadius:20
//                                               }
//                                                 }
//                                           >
//                                             <View>
//                                               <TouchableOpacity
//                                               onPress={() =>this.setState({consultation:false,captation:false,consucolor:'blue',captcolor:'blue'})}
//                                               >
//                                                     <Image style={{
//                                                       width:wp('6.8%'),
//                                                       height:hp('3.5%'),
//                                                     }}
//                                                                 source={require('../image/home.png')}>
//                                                     </Image>
//                                               </TouchableOpacity>
//                                             </View>
//                                             <View>
//                                             <TouchableOpacity
//                                               onPress={() =>alert('Plus')}
//                                               >
//                                                     <Image style={{
//                                                       width:wp('7.5%'),
//                                                       height:hp('3.8%'),
//                                                     }}
//                                                                 source={require('../image/Plus.png')}>
//                                                     </Image>
//                                               </TouchableOpacity>
//                                             </View>
//                                             <View>
//                                             <TouchableOpacity
//                                               onPress={() =>alert('Search')}
//                                               >
//                                                     <Image style={{
//                                                      width:wp('6.8%'),
//                                                      height:hp('3.6%'),
//                                                     }}
//                                                                 source={require('../image/search.png')}>
//                                                     </Image>
//                                               </TouchableOpacity>
//                        </View>
                                            
//         </View>             */}



//           {/* <View  style={{flexDirection:'row',top:hp('25%'),position:'absolute'}}>
//                                 <TouchableOpacity style={{ width:wp('15%'), height:hp('4.5%'),backgroundColor:'grey',borderRadius:5,alignItems:'center'}}
//                                 onPress={() => this.setState({addnew:false})}>
//                                           <Text style={{color:'white',fontWeight: 'bold'}}>
//                                               Close
//                                           </Text>
//                                 </TouchableOpacity> 
                                
//                         </View> */}
//           {/* </View> */}
//           {/* </View> */}
//           {/* *** LISTE DES FONCTIONNALITES *** */}

//           {/* image Search */}
//           <Modal
//             transparent={true}
//             animationType="fade"
//             visible={this.state.imageSearch}
//             onShow={() => { this.searchInput3.focus(); }}
//           >
//             <View
//               style={{
//                 width: wp('100%'),
//                 height: hp('100%'),
//                 backgroundColor: 'grey'
//               }}>
//               {/* SEARCH */}
//               <View style={{
//                 borderWidth: 0.2,
//                 width: wp('80%'),
//                 height: hp('6%'),
//                 borderRadius: 30,
//                 justifyContent: 'center',
//                 backgroundColor: 'white',
//                 alignSelf: 'center',
//                 marginTop: hp('5%'),
//                 marginBottom: hp('5%')
//               }}>

//                 <TextInput
//                   placeholder={I18n.t('search for expressions')}
//                   style={{ fontSize: hp('2%'), textAlign: 'center' }}
//                   ref={(input) => { this.searchInput3 = input; }}
//                   onChangeText={text => this.searchFilterFunction(text)}
//                   autoCorrect={false}
//                   value={this.state.value}
//                   onSubmitEditing={() => this.setState({ iconHeader: false, imageSearch: false })}
//                   blurOnSubmit={false}
//                 />
//                 <View style={{ position: 'absolute', marginLeft: wp('3%'), top: hp('1%') }}>
//                   <Icon name={'md-search'} size={20} color={'grey'} />
//                 </View>
//               </View>
//               {/* SEARCH */}
//             </View>
//           </Modal>
//           {/* image Search */}

//           {/* add list */}
//           <Modal
//             transparent={true}
//             animationType="fade"
//             visible={this.state.addlist}
//           >
//             <View
//               style={{
//                 backgroundColor: 'white',
//                 top: hp('30%'),
//                 width: wp('50%'),
//                 marginLeft: wp('50%'),
//                 height: hp('60%')
//               }}
//             >
//               <TouchableOpacity
//                 style={{
//                   alignSelf: 'flex-end',
//                   marginEnd: wp('3%'),
//                   // backgroundColor:'red',
//                   width: wp('7%'),
//                   height: hp('7%')
//                 }}
//                 onPress={() => this.setState({ addlist: false })}>
//                 <Icon name={'ios-close'} size={30} color={'red'} />

//               </TouchableOpacity>



//               {/* <TouchableOpacity 
//                                             style={{
//                                               alignSelf:'flex-end',
//                                               marginEnd:wp('3%'),
//                                               // backgroundColor:'red',
//                                               width:wp('10%'),
//                                               height:hp('10%')
//                                             }}
//                                             onPress={() =>this.setState({typelist:false})}>
//                                                       <Icon name={'ios-close'} size={30} color={'red'} />
                                                      
//                                             </TouchableOpacity> */}
//               <View style={styles.modliste}

//               >


//                 <View style={
//                   {
//                     // backgroundColor:'#0066cc',
//                     height: hp('7%'),
//                     width: wp('40%'),
//                     margin: hp('2%'),
//                     borderWidth: 1,
//                     borderColor: 'white',
//                     borderRadius: 15
//                   }
//                 }>
//                   <TouchableOpacity
//                     onPress={() => this.setState({ listexpres: true })}
//                     style={styles.twobut}
//                   >
//                     <Icon name={'ios-create'} size={20} color={'#E2B81A'} />
//                     <Text style={{ color: 'Black', fontSize: hp('2%'), textAlign: 'center', fontWeight: 'bold' }}>Text
//                                                       </Text>
//                   </TouchableOpacity>
//                 </View>
//                 <View style={
//                   {
//                     // backgroundColor:'#bf1613',
//                     height: hp('7%'),
//                     width: wp('40%'),
//                     // margin:hp('2%'),
//                     borderWidth: 1,
//                     borderColor: 'white',
//                     borderRadius: 15
//                   }
//                 }>
//                   <TouchableOpacity
//                     style={styles.twobut}
//                     onPress={() => this.setState({ videoList: true })}>
//                     <Icon name={'ios-mic'} size={20} color={'#E2B81A'} />
//                     <Text style={{ color: 'Black', fontSize: hp('2%'), textAlign: 'center', fontWeight: 'bold' }}>audio
//                                                       </Text>
//                   </TouchableOpacity>
//                 </View>
//                 <View style={
//                   {
//                     // backgroundColor:'#bf1613',
//                     height: hp('7%'),
//                     width: wp('40%'),
//                     margin: hp('2%'),
//                     borderWidth: 1,
//                     borderColor: 'white',
//                     borderRadius: 15
//                   }
//                 }>
//                   <TouchableOpacity
//                     style={styles.twobut}
//                     onPress={() => this.setState({ videoList: true })}>
//                     <Icon name={'ios-camera'} size={20} color={'#E2B81A'} />
//                     <Text style={{ color: 'Black', fontSize: hp('2%'), textAlign: 'center', fontWeight: 'bold' }}>video and picture
//                                                       </Text>
//                   </TouchableOpacity>
//                 </View>

//               </View>



//             </View>
//           </Modal>
//           {/* add list */}

//           {/* *** TYPE LISTE *** */}
//           <Modal
//             transparent={true}
//             animationType="fade"
//             visible={this.state.typelist}
//           >
//             <View
//               style={{
//                 backgroundColor: 'white',
//                 top: hp('30%'),
//                 width: wp('50%'),
//                 marginLeft: wp('50%'),
//                 height: hp('60%')
//               }}
//             >
//               <TouchableOpacity
//                 style={{
//                   alignSelf: 'flex-end',
//                   marginEnd: wp('3%'),
//                   // backgroundColor:'red',
//                   width: wp('7%'),
//                   height: hp('7%')
//                 }}
//                 onPress={() => this.setState({ typelist: false })}>
//                 <Icon name={'ios-close'} size={30} color={'red'} />

//               </TouchableOpacity>



//               {/* <TouchableOpacity 
//                                             style={{
//                                               alignSelf:'flex-end',
//                                               marginEnd:wp('3%'),
//                                               // backgroundColor:'red',
//                                               width:wp('10%'),
//                                               height:hp('10%')
//                                             }}
//                                             onPress={() =>this.setState({typelist:false})}>
//                                                       <Icon name={'ios-close'} size={30} color={'red'} />
                                                      
//                                             </TouchableOpacity> */}
//               <View style={styles.modliste}

//               >


//                 <View style={
//                   {
//                     backgroundColor: '#0066cc',
//                     height: hp('12.5%'),
//                     width: wp('40%'),
//                     margin: hp('2%'),
//                     borderWidth: 1,
//                     borderColor: 'white',
//                     borderRadius: 15
//                   }
//                 }>
//                   <TouchableOpacity
//                     onPress={() => this.setState({ listexpres: true })}
//                     style={styles.twobut}
//                   >
//                     <Icon name={'ios-book'} size={50} color={'#E2B81A'} />
//                     <Text style={{ color: 'white', fontSize: hp('2%'), textAlign: 'center', fontWeight: 'bold' }}>Expressions
//                                                       </Text>
//                   </TouchableOpacity>
//                 </View>
//                 <View style={
//                   {
//                     backgroundColor: '#bf1613',
//                     height: hp('12.5%'),
//                     width: wp('40%'),
//                     margin: hp('2%'),
//                     borderWidth: 1,
//                     borderColor: 'white',
//                     borderRadius: 15
//                   }
//                 }>
//                   <TouchableOpacity
//                     style={styles.twobut}
//                     onPress={() => this.setState({ videoList: true })}>
//                     <Icon name={'ios-film'} size={50} color={'#E2B81A'} />
//                     <Text style={{ color: 'white', fontSize: hp('2%'), textAlign: 'center', fontWeight: 'bold' }}>All videos
//                                                       </Text>
//                   </TouchableOpacity>
//                 </View>

//               </View>



//             </View>
//           </Modal>
//           {/* *** TYPE LISTE *** */}

//           {/* *** list expression *** */}
//           <Modal
//             transparent={true}
//             animationType="fade"
//             visible={this.state.listexpres}
//           >
//             <View
//               style={{ with: wp('100%'), height: hp('94%'), top: hp('6%'), backgroundColor: '#929caa' }}>
//               <TouchableOpacity
//                 style={{
//                   alignSelf: 'flex-end',
//                   marginEnd: wp('3%'),
//                   // backgroundColor:'red',
//                   width: wp('7%'),
//                   height: hp('7%'),
//                   position: 'absolute'
//                 }}
//                 onPress={() => this.setState({ listexpres: false, iconHeader: true })}>
//                 <Icon name={'ios-close'} size={30} color={'red'} />

//               </TouchableOpacity>
//               <View
//                 style={{ width: wp('70%'), marginTop: hp('1%'), marginLeft: wp('15%'), flexDirection: 'column', justifyContent: 'space-between' }}
//               >
//                 <View style={{ borderWidth: 0.2, width: wp('70%'), height: hp('5.5%'), borderRadius: 30, justifyContent: 'center', backgroundColor: 'white' }}>

//                   <TextInput
//                     placeholder="search expression"
//                     style={{ fontSize: hp('2%'), textAlign: 'center' }}

//                     onChangeText={text => this.searchFilterFunction(text)}
//                     autoCorrect={false}
//                     value={this.state.value}

//                   />
//                   <View style={{ position: 'absolute', marginLeft: wp('3%'), top: hp('1%') }}>
//                     <Icon name={'md-search'} size={20} color={'grey'} />
//                   </View>
//                 </View>

//                 <View style={{ borderWidth: 1, borderRadius: 30, backgroundColor: '#EFF4F5', top: hp('1%'), height: hp('5%'), width: wp('70%') }}>
//                   {/* <Picker
//                                         style={{fontWeight:'bold',bottom:hp('2%')}}
//                                         mode='dropdown'          
//                                         selectedValue={this.state.picat}
//                                         // selectedValue
//                                         // itemTextStyle={{fontSize:hp('2%')}}
//                                         onValueChange={(itemValue, itemIndex) => this.filterbycat(itemValue)}
//                                         >
//                                    <Picker.Item label={'All categories'} value=""/>
//                                         { this.state.cat.map((item, key)=>(
//                                       <Picker.Item label={item.intitule} value={item.intitule}  key={key} />)
//                                         )}
                                
//                                       </Picker> */}


//                   <Picker
//                     style={{ bottom: hp('2%') }}
//                     mode='dropdown'
//                     selectedValue={this.state.picat}
//                     onValueChange={(itemValue, itemIndex) => this.filterbycat(itemValue)} >
//                     <Picker.Item label={'All categories'} value="" />
//                     {this.state.cat.map((item, key) => (
//                       <Picker.Item label={item.intitule} value={item.intitule} key={key} />)
//                     )}
//                   </Picker>

//                 </View>
//               </View>
//               {/* <View style={{flexDirection:'row',backgroundColor:'#2f3c7e',top:hp('2%'),justifyContent:'space-evenly'}}>
//                                     <Text style={{color:'white'}}> Origine</Text>
//                                     <Text style={{color:'white'}}>Traduction</Text>
//                       </View> */}
//               <View style={{ top: hp('2%'), height: hp('69%'), backgroundColor: '#929caa' }}>
//                 <FlatList
//                   data={this.state.data}
//                   extraData={this.state}
//                   keyExtractor={(item) => item.id_expression}
//                   refreshing={this.state.refreshing}
//                   // numColumns={2}
//                   onRefresh={this.handleRefresh}
//                   enableEmptySections={true}
//                   renderSeparator={this.ListViewItemSeparator}
//                   renderItem={({ item }) =>
//                     <View style={{ flexDirection: 'column' }}>
//                       {/* {this.headerTableau(item.intitule)} */}
//                       <View
//                       //  style={{borderLeftWidth:0.5,borderRightWidth:0.5}}
//                       >
//                         <View style={{ flexDirection: 'row' }}>
//                           {this.contentView(item.id_expression, item.content_langue_origine, item.content_langue_cible, item.audio_langue_origine, item.intitule, item.date_creation, item.f_name, item.type_file, item.legende_f,index, item.id_category)}
//                         </View>
//                       </View>

//                     </View>
//                   }
//                 />


//               </View>
//             </View>
//           </Modal>

//           {/* *** list expression *** */}

//           {/* IMAGES DETAILS */}
//           <Modal
//             transparent={true}
//             animationType="fade"
//             visible={false}
//           >
//             <View
//               style={{ with: wp('100%'), height: hp('85%'), top: hp('13%'), backgroundColor: '#929caa' }}>

//             </View>
//           </Modal>
//           {/* IMAGES DETAILS */}


//           {/* *** video liste*** */}
//           <Modal
//             transparent={true}
//             animationType="fade"
//             visible={this.state.videoList}
//           >
//             <View
//               style={{ with: wp('100%'), height: hp('85%'), top: hp('13%'), backgroundColor: '#929caa' }}>
//               <TouchableOpacity
//                 style={{
//                   alignSelf: 'flex-end',
//                   marginEnd: wp('3%'),
//                   // backgroundColor:'red',
//                   width: wp('7%'),
//                   height: hp('7%'),
//                   position: 'absolute'
//                 }}
//                 onPress={() => this.setState({ videoList: false })}>
//                 <Icon name={'ios-close'} size={30} color={'red'} />

//               </TouchableOpacity>
//               <View
//                 style={{ width: wp('70%'), marginTop: hp('1%'), marginLeft: wp('15%'), flexDirection: 'column', justifyContent: 'space-between' }}
//               >
//                 <View style={{ borderWidth: 0.2, wid0th: wp('70%'), height: hp('5.5%'), borderRadius: 30, justifyContent: 'center', backgroundColor: 'white' }}>

//                   <TextInput
//                     placeholder="search expression"
//                     style={{ fontSize: hp('2%'), textAlign: 'center' }}

//                     onChangeText={text => this.searchFilterFunction(text)}
//                     autoCorrect={false}
//                     value={this.state.value}

//                   />
//                   <View style={{ position: 'absolute', marginLeft: wp('3%'), top: hp('1%') }}>
//                     <Icon name={'md-search'} size={20} color={'grey'} />
//                   </View>
//                 </View>

//                 <View style={{ borderWidth: 1, borderRadius: 30, backgroundColor: '#EFF4F5', top: hp('1%'), height: hp('5%'), width: wp('70%') }}>
//                   <Picker
//                     style={{ fontWeight: 'bold', bottom: hp('2%') }}
//                     mode='dropdown'
//                     selectedValue={this.state.picat}
//                     // itemTextStyle={{fontSize:hp('2%')}}
//                     onValueChange={(itemValue, itemIndex) => this.filterbycat(itemValue)}
//                   >
//                     <Picker.Item label={'All categories'} value="" />
//                     {this.state.cat.map((item, key) => (
//                       <Picker.Item label={item.intitule} value={item.intitule} key={key} />)
//                     )}

//                   </Picker>
//                 </View>
//               </View>
//               {/* <View style={{flexDirection:'row',backgroundColor:'#2f3c7e',top:hp('2%'),justifyContent:'space-evenly'}}>
//                                     <Text style={{color:'white'}}> Origine</Text>
//                                     <Text style={{color:'white'}}>Traduction</Text>
//                       </View> */}
//               <View style={{ top: hp('2%'), height: hp('69%'), backgroundColor: '#929caa' }}>
//                 <FlatList
//                   data={this.state.data}
//                   extraData={this.state}
//                   keyExtractor={(item) => item.id_expression}
//                   refreshing={this.state.refreshing}
//                   onRefresh={this.handleRefresh}
//                   enableEmptySections={true}
//                   renderSeparator={this.ListViewItemSeparator}
//                   renderItem={({ item }) =>
//                     <View style={{ flexDirection: 'column' }}>
//                       {/* {this.headerTableau(item.intitule)} */}
//                       <View
//                       //  style={{borderLeftWidth:0.5,borderRightWidth:0.5}}
//                       >
//                         <View style={{ flexDirection: 'row' }}>
//                           {this.contentVideo(item.id_expression, item.content_langue_origine, item.content_langue_cible, item.audio_langue_origine, item.intitule, item.date_creation, item.f_name, item.type_file)}
//                         </View>
//                       </View>

//                     </View>
//                   }
//                 />


//               </View>
//             </View>
//           </Modal>
//           {/* *** video list *** */}

//           {/* *** details expression*** */}
//           <Modal
//             transparent={true}
//             animationType="slide"
//             visible={this.state.details_exp}
//             // visible={true}
//           >
//             <View style={{ backgroundColor: 'white', position: 'absolute', height: hp('80%'), width: wp('95%'), marginLeft: wp('2.5%'), top: hp('14%') }}>
//               <View style={{ backgroundColor: 'white' }}>
//                 <View >
//                   <Text style={{ textAlign: 'center', fontSize: hp('3%') }}>Details
//                                             </Text>
//                 </View>
//                 <View style={{ fontSize: hp('3.2%'), fontWeight: 'bold', borderColor: 'grey', top: hp('2%'), height: hp('73%') }}>

//                   <ScrollView
//                     style={{
//                       width: wp('90%'),
//                       height:hp('25%'),
//                       backgroundColor: '#EBF1EA',
//                       marginLeft: wp('2%')
//                     }}
//                   >
//                     <Text
//                       style={{
//                         textAlign: 'justify'
//                       }}
//                     >
//                       {this.state.original}
//                     </Text>
//                   </ScrollView>
//                   <Text
//                     style={{
//                       marginLeft: wp('2%'),
//                       fontWeight: 'bold'
//                     }}
//                   >
//                     {I18n.t('Translated:')}
//                                             </Text>
//                   <ScrollView
//                     style={{
//                       width: wp('90%'),
//                       height:hp('25%'),
//                       backgroundColor: '#EBF1EA',
//                       marginLeft: wp('2%')
//                     }}
//                   >
//                     <Text
//                       style={{
//                         textAlign: 'justify'
//                       }}
//                     >
//                       {this.state.cible}
//                     </Text>
//                   </ScrollView>


//                   {/* <View style={{ alignSelf: 'center', fontSize: hp('3.2%'), borderRadius: 30, borderWidth: 2, width: wp('60%'), height: hp('5%'), borderColor: 'grey', backgroundColor: '#EFF4F5', top: hp('1%') }}
//                   >
//                     <Picker
//                       style={{ bottom: hp('2%') }}
//                       mode='dropdown'
//                       selectedValue={this.state.picIdlangue}
//                       onValueChange={(itemValue, itemIndex) => this.handleTranslateshow(itemValue)} >
//                       <Picker.Item label={I18n.t('Other language')} value="" />
//                       {this.state.dataSource.map((item, key) => (
//                         <Picker.Item label={item.intitule} value={item.abrev} key={key} />)
//                       )}
//                     </Picker>
//                   </View> */}
//                   {/* <View
//                     style={{
//                       width: wp('90%'),
//                       backgroundColor: '#EBF1EA',
//                       marginLeft: wp('2%'),
//                       top: hp('2%')
//                     }}
//                   >
//                     <Text>
//                       {this.state.targTEXTshow}
//                     </Text>
//                   </View> */}
//                   <View style={{ flexDirection: 'row', top: hp('75%'), position: 'absolute', alignSelf: 'center' }}>
//                     <TouchableOpacity style={{ width: wp('25%'), height: hp('4.5%'), backgroundColor: 'grey', borderRadius: 5, alignItems: 'center', alignSelf: 'center' }}
//                       onPress={() => this.setState({ details_exp: false, targTEXTshow: '' })}>
//                       <Text style={{ color: 'white', fontWeight: 'bold' }}>
//                         Close
//                                                       </Text>
//                     </TouchableOpacity>

//                   </View>
//                 </View>
//               </View>
//             </View>
//           </Modal>

//           {/* *** details expression*** */}


//           {/* *** FILTRE ET RECHERCHE *** */}
//           {/* <View
//       style={{width:wp('70%'),marginTop:hp('1%'),marginLeft:wp('15%'),flexDirection:'column',justifyContent:'space-between'}}
//       >
//                 <View style={{borderWidth:0.2,width:wp('70%'),height:hp('5.5%'),borderRadius:30,justifyContent:'center'}}>
                
//                             <TextInput
//                             placeholder="search expression"
//                             style={{fontSize:hp('2%'),textAlign:'center'}}
//                             onChangeText={text => this.searchFilterFunction(text)}
//                             autoCorrect={false}
//                             value={this.state.value}
//                             />
//                             <View style={{position:'absolute',marginLeft:wp('3%'),top:hp('1%')}}>
//                             <Icon name={'md-search'} size={20} color={'grey'} />
//                             </View>
//                 </View>
//                 <View style={{borderWidth:1,borderRadius:30,backgroundColor:'#EFF4F5',top:hp('1%'),height:hp('5%'),width:wp('70%')}}>
//                             <Picker
//                             style={{fontWeight:'bold',bottom:hp('2%')}}
//                             mode='dropdown'          
//                             selectedValue={this.state.picat}
//                             // itemTextStyle={{fontSize:hp('2%')}}
//                             onValueChange={(itemValue, itemIndex) => this.filterbycat(itemValue)}
//                             >
//                           <Picker.Item label={'All categories'} value=""/>
//                             { this.state.cat.map((item, key)=>(
//                             <Picker.Item label={item.intitule} value={item.intitule}  key={key} />)
//                             )}
                    
//                           </Picker>
//                 </View>
//     </View>  */}
//           {/* *** FILTRE ET RECHERCHE *** */}


//           {/* *** HEADER TABLEAU *** */}
//           {/* <View style={{flexDirection:'row',backgroundColor:'#2f3c7e',top:hp('2%'),justifyContent:'space-evenly'}}>
//               <Text style={{color:'white'}}> Origine</Text>
//               <Text style={{color:'white'}}>Traduction</Text>
//    </View> */}
//           {/* *** HEADER TABLEAU *** */}


//           {/* *** TABLEAU LISTE *** */}
//           {/* <View style={{ top:hp('2%'),flexDirection:'row',height:hp('8%')}}>
//               <FlatList
//               data={this.state.data}
//               extraData={this.state}
//               keyExtractor={(item)=>item.id_expression}
//               refreshing={this.state.refreshing}
//               onRefresh={this.handleRefresh}
//               enableEmptySections={true}
//               renderSeparator= {this.ListViewItemSeparator}
//               renderItem={({item})=>
//               <View style={{flexDirection:'column'}}>
//                         {this.headerTableau(item.intitule)}
//                         <View style={{borderLeftWidth:0.5,borderRightWidth:0.5}}>
//                         <View style={{flexDirection:'row'}}>
//                         {this.contentView(item.id_expression,item.content_langue_origine,item.content_langue_cible,item.audio_langue_origine)}         
//                         </View>
//                         </View>
              
//               </View>  
//                           }
//                           />
//     </View>  */}
//           {/* ***TABLEAU LISTE*** */}


//           {/* ACTIONS */}
//           <Modal
//             transparent={true}
//             animationType="slide"
//             visible={false}

//           >
//             <TouchableOpacity onPress={() => this.setState({ action: false, ide: '', ido: '', text: '', targTEXT: '' })}
//               style={{ with: wp('100%'), height: hp('100%') }}>
//               <View style={{ flexDirection: 'row', backgroundColor: 'green', width: wp('20%'), borderWidth: 1, position: 'relative' }}>

//                 <View style={
//                   { flexDirection: 'column' }
//                 }
//                 >
//                   {/* <TouchableOpacity 
//                                                           style={{height:hp('7%'),width:wp('12%'),alignItems:'center'}}
//                                                           onPress={() =>this.setState({showtext:true})}>
//                                                           <Icon name={'ios-paper'} size={30} color={'blue'} />
//                                                   </TouchableOpacity> */}
//                   <View
//                     styles={{ marginLeft: wp('3%') }}
//                   >
//                     {this.testVieww(this.state.audioL, this.state.ide)}
//                   </View>
//                   {/* <TouchableOpacity 
//                                                           style={{height:hp('7%'),width:wp('12%'),alignItems:'center'}}
//                                                           onPress={() =>{this.setState({lectureV:true,textR:this.state.original,speechRate:0.5})}}>
//                                                           <Icon name={'md-headset'} size={30} color={'blue'} />
//                                                   </TouchableOpacity> */}
//                   <TouchableOpacity
//                     style={{ height: hp('7%'), width: wp('12%'), alignItems: 'center' }}
//                     onPress onPress={() => this.setState({ show4: true, idexp: this.state.ide })}>
//                     <Icon name={'ios-create'} size={28} color={'blue'} />
//                   </TouchableOpacity>
//                   <TouchableOpacity
//                     style={{ height: hp('7%'), width: wp('12%'), alignItems: 'center' }}
//                     onPress onPress={() => this.setState({ Ch_cat: true })}>
//                     <Icon name={'ios-folder'} size={28} color={'blue'} />
//                   </TouchableOpacity>
//                   <TouchableOpacity
//                     style={{ height: hp('7%'), width: wp('12%'), alignItems: 'center' }}
//                     onPress onPress={() => this.delete(this.state.ide, this.state.audioL)}>
//                     <Icon name={'ios-trash'} size={28} color={'red'} />
//                   </TouchableOpacity>

//                 </View>
//                 {/* <View
//                                         style={
//                                           styles.actbut
//                                         }
//                                         > */}

//                 {/* <TouchableOpacity 
//                                                           style={{height:hp('7%'),width:wp('12%'),alignItems:'center'}}
//                                                           onPress onPress={() => this.setState({showfile:true})}>
//                                                           <Icon name={'ios-images'} size={28} color={'blue'} />
//                                                   </TouchableOpacity>  */}


//                 {/* </View>    */}


//               </View>
//             </TouchableOpacity>

//           </Modal>
//           {/* ACTION */}


//           {/* *** ACTION2 *** */}
//           <Modal
//             transparent={true}
//             animationType="slide"
//             visible={this.state.action2}

//           >
//             <TouchableOpacity onPress={() => this.setState({ action2: false })}
//               style={{ with: wp('100%'), height: hp('100%') }}>
//               <View style={{ flexDirection: 'row', backgroundColor: '#cce7e8', alignItems: 'center', with: wp('100%'), height: hp('7%'), top: hp('86%'), borderRadius: 15, borderColor: '#2f3c7e' }}>
//                 <View style={{ flexDirection: 'row', justifyContent: 'space-between', flexDirection: 'row', width: wp('92%') }}>
//                   <TouchableOpacity
//                     style={{ marginLeft: wp('6%'), height: hp('7%'), width: wp('12%'), alignItems: 'center' }}
//                     onPress={() => this.setState({ showtext2: true })}>
//                     <Icon name={'ios-paper'} size={30} color={'blue'} />
//                   </TouchableOpacity>
//                   {this.testVieww(this.state.audioL, this.state.ide)}
//                   <TouchableOpacity
//                     style={{ height: hp('7%'), width: wp('12%'), alignItems: 'center' }}
//                     onPress={() => { this.setState({ lectureV: true, textR: this.state.cible, speechRate: 0.5 }) }}>
//                     <Icon name={'md-headset'} size={30} color={'blue'} />
//                   </TouchableOpacity>
//                   <TouchableOpacity
//                     style={{ height: hp('7%'), width: wp('12%'), alignItems: 'center' }}
//                     onPress onPress={() => this.setState({ show4: true, text: this.state.original, targTEXT: this.state.cible, idexp: this.state.ide })}>
//                     <Icon name={'ios-create'} size={28} color={'blue'} />
//                   </TouchableOpacity>
//                   <TouchableOpacity
//                     style={{ height: hp('7%'), width: wp('12%'), alignItems: 'center' }}
//                     onPress onPress={() => this.setState({ Ch_cat: true })}>
//                     <Icon name={'ios-folder'} size={28} color={'blue'} />
//                   </TouchableOpacity>
//                   <TouchableOpacity
//                     style={{ height: hp('7%'), width: wp('12%'), alignItems: 'center' }}
//                     onPress onPress={() => this.delete(this.state.ide, this.state.audioL)}>
//                     <Icon name={'ios-trash'} size={28} color={'red'} />
//                   </TouchableOpacity>
//                 </View>
//               </View>
//             </TouchableOpacity>
//           </Modal>
//           {/* *** ACTION 2*** */}

//           {/* *** GALERY *** */}
//           <Modal
//             transparent={true}
//             animationType="slide"
//             visible={this.state.showfile}>
//             <View style={{ backgroundColor: '#cce7e8', position: 'absolute', top: hp('35%'), left: wp('10%'), right: wp('10%'), with: wp('80%'), height: hp('25%'), borderRadius: 15 }}>
//               <View>
//                 <View style={{ backgroundColor: '#2f3c7e', height: hp('5%'), borderTopStartRadius: 15, borderTopEndRadius: 15 }}>
//                   <Text style={{ fontSize: hp('2.5%'), color: 'white', fontWeight: 'bold', textAlign: 'center' }}>
//                     Liste of Picture an video
//                                             </Text>
//                 </View>
//                 <View style={{ top: hp('1%'), backgroundColor: '#EFF4F5' }}>
//                   <Text
//                     style={{ textAlign: 'center', color: 'grey' }}
//                   >
//                     No file for this expression!
//                                         </Text>

//                 </View>
//                 <TouchableOpacity
//                   onPress={() => this.navPic()}
//                   style={{ marginLeft: wp('3%'), width: wp('9%'), alignItems: 'center' }}
//                 >
//                   <Icon name="ios-add" color={'blue'} size={40} />
//                 </TouchableOpacity>
//                 <View style={{ top: hp('4%'), alignItems: 'center' }}>
//                   <TouchableOpacity style={{ width: wp('13%'), height: hp('5%'), backgroundColor: 'grey', borderRadius: 5, alignItems: 'center' }}
//                     onPress={() => { this.setState({ showfile: false }) }}>
//                     <Text style={{ color: 'white', fontWeight: 'bold', fontSize: hp('2%'), top: hp('1%') }}>
//                       Close
//                                                     </Text>
//                   </TouchableOpacity>

//                 </View>
//               </View>
//             </View>
//           </Modal>
//           {/* *** GALERY *** */}

//           {/* *** Show picture *** */}
//           <Modal
//             transparent={true}
//             animationType="slide"
//             visible={this.state.image}
//           >

//             <ScrollView style={{ backgroundColor: 'white', position: 'absolute', height: hp('80%'), width: wp('96%'), top: hp('13.5%'), marginLeft: wp('2%') }}>
//               <View style={{ backgroundColor: 'white', height: hp('5%'), width: wp('95%'), flexDirection: 'row', justifyContent: 'space-between', }}>
//                 <Text style={{ fontSize: hp('2.5%'), fontWeight: '100', marginLeft: wp('2%'), fontFamily: 'Lobster-Regular' }}>
//                   Picture details
//                   </Text>
//                 <TouchableOpacity
//                   style={{
//                     justifyContent: 'center', marginRight: wp('1%')
//                   }}
//                   onPress={() => this.setState({ image: false, ide: '' })}>
//                   {/* <Text>
//                 Close
//                 </Text> */}
//                   <Icon name={'ios-close'} color={'red'} size={50.5}
//                   />

//                 </TouchableOpacity>

//               </View>
//               {/* {this.show_imageMOdal()} */}
//               <View>
//                 <Image

//                   //  source={{ uri:"https://demo.forma2plus.com/portail-stagiaire/uploads_image/10304_1600849709.jpg",isStatic:true }}
//                   source={{ uri: this.state.url_images, isStatic: true }}
//                   style={{ width: wp('96%'), height: hp('40%') }}
//                 />
//                 <Text
//                   style={{
//                     fontSize: hp('2%')
//                   }}>
//                   Comments:
//     </Text>

//               </View>
//               <View
//                 style={{
//                   flexDirection: 'row'
//                 }}>
//                 <Text
//                   style={{
//                     width: wp('70%'),
//                     // backgroundColor:'grey'
//                   }}>
//                   {this.state.coms}
//                   {/* et {this.state .ide} et {this.state.name} */}
//                 </Text>

//                 <TouchableOpacity style={{ marginLeft: wp('10%'), borderRadius: 10 }}
//                   onPress={() => this.setState({ details_exp: true })}
//                 >
//                   <Icon name={'ios-book'} size={40} color={'#E2B81A'} />
//                 </TouchableOpacity>

//               </View>

//               <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: wp('3%') }}><TextInput
//                 // style={{borderRadius:15,borderWidth:1,fontSize:hp('2%'),borderColor:'white',width:wp('75%'),marginLeft:wp('1%'),backgroundColor:'white',top:hp('2%')}}
//                 multiline={true}
//                 placeholder="your comment hear ..."
//                 style={{ fontSize: hp('2%'), textAlign: 'justify', backgroundColor: 'white', borderRadius: 25, borderWidth: 1, width: wp('60%'), borderColor: 'grey', height: hp('6%') }}
//                 onChangeText={comment => this.setState({ comment })}
//                 autoCorrect={false}
//               />
//                 <TouchableOpacity style={{ marginLeft: wp('2%'), backgroundColor: '#2f3c7e', borderRadius: 10 }}
//                   onPress={() => alert("comment")}
//                 >
//                   <Text style={{ color: 'white', fontSize: hp('2%') }}>Comment
//   </Text>
//                 </TouchableOpacity>
//               </View>
//             </ScrollView>


//           </Modal>
//           {/* *** Show picture *** */}


//           {/* *** ORIGIN TEXT*** */}
//           <Modal
//             transparent={true}
//             animationType="slide"
//             visible={this.state.showtext}
//           >
//             <View style={{ backgroundColor: '#cce7e8', position: 'absolute', height: hp('60%'), width: wp('90%'), top: hp('15%'), marginLeft: wp('5%'), alignItems: 'center', borderRadius: 15 }}>
//               <View style={{ backgroundColor: '#2f3c7e', height: hp('6%'), width: wp('90%'), borderTopStartRadius: 15, borderTopEndRadius: 15 }}>
//                 <Text style={{ fontSize: hp('3.2%'), fontWeight: '100', color: 'white', textAlign: 'center' }}>
//                   Origin text
//                                 </Text>
//               </View>
//               <View style={{ fontSize: hp('3.2%'), fontWeight: 'bold', borderColor: 'grey', top: 10, height: hp('73%') }}>
//                 <Text style={{ backgroundColor: 'white', fontSize: hp('3%'), width: wp('85%'), textAlign: 'justify' }}>
//                   {this.state.original}
//                 </Text>
//               </View>
//               <View style={{ flexDirection: 'row', top: hp('50%'), position: 'absolute' }}>
//                 <TouchableOpacity style={{ width: wp('15%'), height: hp('4.5%'), backgroundColor: 'grey', borderRadius: 5, alignItems: 'center' }}
//                   onPress={() => this.setState({ showtext: false })}>
//                   <Text style={{ color: 'white', fontWeight: 'bold' }}>
//                     Close
//                                           </Text>
//                 </TouchableOpacity>
//               </View>
//             </View>
//           </Modal>
//           {/* *** ORIGIN TEXT*** */}


//           {/* *** TRANSLATED TEXT*** */}
//           <Modal
//             transparent={true}
//             animationType="slide"
//             visible={this.state.showtext2}>
//             <View style={{ backgroundColor: '#cce7e8', position: 'absolute', height: hp('60%'), width: wp('90%'), top: hp('15%'), marginLeft: wp('5%'), alignItems: 'center', borderRadius: 15 }}>
//               <View style={{ backgroundColor: '#2f3c7e', height: hp('6%'), width: wp('90%'), borderTopStartRadius: 15, borderTopEndRadius: 15 }}>
//                 <Text style={{ fontSize: hp('3.2%'), fontWeight: '100', color: 'white', textAlign: 'center' }}>
//                   Translated text
//                               </Text>
//               </View>
//               <View style={{ fontSize: hp('3.2%'), fontWeight: 'bold', borderColor: 'grey', top: 10, height: hp('73%') }}>
//                 <Text
//                   style={{ backgroundColor: 'white', fontSize: hp('3%'), width: wp('85%'), textAlign: 'justify' }}>
//                   {this.state.cible}
//                 </Text>
//               </View>
//               <View style={{ flexDirection: 'row', top: hp('50%'), position: 'absolute' }}>
//                 <TouchableOpacity style={{ width: wp('15%'), height: hp('4.5%'), backgroundColor: 'grey', borderRadius: 5, alignItems: 'center' }}
//                   onPress={() => this.setState({ showtext2: false })}>
//                   <Text style={{ color: 'white', fontWeight: 'bold' }}>
//                     Close
//                                             </Text>
//                 </TouchableOpacity>
//               </View>
//             </View>
//           </Modal>
//           {/* *** TRANSLATED TEXT*** */}


//           {/* *** MOOVE TO OTHER CATEGORY*** */}
//           <Modal
//             transparent={true}
//             animationType="slide"
//             visible={this.state.Ch_cat}>
//             <View style={{ backgroundColor: '#cce7e8', position: 'absolute', top: hp('35%'), left: wp('15%'), right: wp('15%'), with: wp('70%'), height: hp('25%'), borderRadius: 15 }}>
//               <View>
//                 <View style={{ backgroundColor: '#2f3c7e', height: hp('5%'), borderTopStartRadius: 15, borderTopEndRadius: 15 }}>
//                   <Text style={{ fontSize: hp('2.5%'), color: 'white', fontWeight: 'bold', textAlign: 'center' }}>
//                     Change category
//                                             </Text>
//                 </View>
//                 <View style={{ borderWidth: 1, borderRadius: 30, top: hp('5%'), backgroundColor: '#EFF4F5', height: hp('5%'), width: wp('70%') }}>
//                   <Picker
//                     style={{ fontWeight: 'bold', bottom: hp('2%') }}
//                     mode='dropdown'
//                     selectedValue={this.state.pic}
//                     onValueChange={(itemValue, itemIndex) => this.setState({ pic: itemValue })} >
//                     <Picker.Item label={'Select category'} value="" />
//                     {this.state.cat.map((item, key) => (
//                       <Picker.Item label={item.intitule} value={item.id} key={key} />)
//                     )}
//                   </Picker>
//                 </View>
//                 <View style={{ top: hp('8%'), flexDirection: 'row', justifyContent: 'space-evenly', }}>
//                   <TouchableOpacity style={{ width: wp('13%'), height: hp('5%'), backgroundColor: 'red', borderRadius: 5, alignItems: 'center' }}
//                     onPress={() => { this.setState({ Ch_cat: false }) }}>
//                     <Text style={{ color: 'white', fontWeight: 'bold', fontSize: hp('2%'), top: hp('1%') }}>
//                       Cancel
//                                                     </Text>
//                   </TouchableOpacity>
//                   <View style={{ width: wp('13'), height: hp('8%') }}>
//                     <TouchableOpacity style={{ width: wp('13%'), height: hp('5%'), borderRadius: 5, alignItems: 'center', backgroundColor: 'blue' }}
//                       onPress={() => { this.setState({ Ch_cat: false }), this.upcat(this.state.pic, this.state.ide) }} >
//                       <Text style={{ color: 'white', fontWeight: 'bold', fontSize: hp('2%'), top: hp('1%') }}>
//                         Valide
//                                                     </Text>
//                     </TouchableOpacity>
//                   </View>
//                 </View>
//               </View>
//             </View>
//           </Modal>
//           {/* *** MOOVE TO OTHER CATEGORY*** */}


//           {/* *** NEW CATEGORY*** */}
//           <Modal
//             transparent={true}
//             animationType="slide"
//             visible={this.state.cati} >
//             <View style={{ backgroundColor: '#cce7e8', position: 'absolute', top: hp('20%'), left: wp('10%'), right: wp('10%'), alignItems: 'center', with: wp('80%'), height: hp('44%'), flex: 1, borderRadius: 15, borderColor: '#2f3c7e' }}>
//               <View style={{ backgroundColor: '#2f3c7e', height: hp('5%'), width: wp('80%'), borderTopEndRadius: 15, borderTopStartRadius: 15 }}>
//                 <Text style={{ fontSize: hp('2.5%'), color: 'white', textAlign: 'center' }}>
//                   New category of expressions
//                                 </Text>
//               </View>
//               <TextInput
//                 ref={input => { this.textInput = input }}
//                 style={{ borderWidth: 1, fontSize: hp('2%'), borderColor: 'white', width: wp('75%'), marginLeft: wp('1%'), backgroundColor: 'white', top: hp('2%') }}
//                 placeholderTextColor={'grey'}
//                 placeholder="New category"
//                 onChangeText={categ => this.setState({ categ })}
//               />
//               <TextInput
//                 ref={input => { this.textInput = input }}
//                 style={{ borderWidth: 1, fontSize: hp('2%'), borderColor: 'white', width: wp('75%'), marginLeft: wp('1%'), backgroundColor: 'white', top: hp('6%') }}
//                 multiline={true}
//                 placeholderTextColor={'grey'}
//                 placeholder="Description"
//                 onChangeText={desc => this.setState({ desc })}
//               />
//               <View style={{ top: hp('15%'), flexDirection: 'row', alignItems: 'flex-end' }}>
//                 <TouchableOpacity style={{ width: wp('15%'), height: hp('4.5%'), backgroundColor: 'red', borderRadius: 5, alignItems: 'center', bottom: hp('7%') }}
//                   onPress={() => this.setState({ cati: false })}>
//                   <Text style={{ color: 'white', fontWeight: 'bold' }}>
//                     Cancel
//                                 </Text>
//                 </TouchableOpacity>
//                 <TouchableOpacity style={{ width: wp('15%'), height: hp('4.5%'), marginLeft: wp('25%'), backgroundColor: 'blue', borderRadius: 5, alignItems: 'center', bottom: hp('7%') }}
//                   onPress={() => { this.setState({ cati: false }), this.saveCat() }}
//                 >
//                   <Text style={{ color: 'white', fontWeight: 'bold' }}>
//                     Create
//                                             </Text>
//                 </TouchableOpacity>
//               </View>
//             </View>
//           </Modal>
//           {/* *** NEW CATEGORY*** */}


//           {/* *** RECORD AUDIO*** */}
//           <Modal
//             transparent={true}
//             animationType="slide"
//             visible={this.state.show1}>
//             {/* <View style={{backgroundColor:'#cce7e8',position: 'absolute', top:hp('20'), left:wp('10%'), right:wp('10%'),alignItems: 'center',with:wp('80%'),height:hp('24%'),flex:1,borderRadius:15,borderColor:'#2f3c7e'}}>
//                           <View style={{backgroundColor:'#2f3c7e',height:hp('5%'),width:wp('80%'),borderTopEndRadius:15,borderTopStartRadius:15}}>
//                               <Text style={{fontSize:hp('2.5%'),color:'white',textAlign:'center'}}>
//                                         Please choose your recording language
//                               </Text>
//                           </View> 
//                           <View  style={{fontSize:hp('3.2%'),borderRadius:30,borderWidth:2,width:wp('60%'),height:hp('5%'),borderColor:'grey',backgroundColor:'#EFF4F5',top:hp('3%'),justifyContent:'center'}}>
//                               <Picker
//                               mode='dropdown'
//                               selectedValue={this.state.PickerValueHolder}
//                               onValueChange={(itemValue, itemIndex) => this.setState({PickerValueHolder: itemValue})} >
//                               <Picker.Item label={'Select language'} value=""/>
//                               { this.state.dataSource.map((item, key)=>(
//                               <Picker.Item label={item.intitule} value={item.abrev}  key={key} />)
//                               )}
//                               </Picker>
//                           </View> 
//                           <View  style={{ top:hp('6%'),flexDirection:'row', alignItems:'flex-end',}}>
//                               <TouchableOpacity style={{ width:wp('15%'), height:hp('4.5%'),backgroundColor:'red',borderRadius:5,alignItems:'center'}}
//                               onPress={() => this.setState({show1:false})}>
//                               <Text style={{color:'white'}}>
//                                                 Cancel
//                               </Text>
//                               </TouchableOpacity> 
//                           <TouchableOpacity style={{width:wp('15%'), height:hp('4.5%'),marginLeft:wp('15%'),backgroundColor:'blue',borderRadius:5,alignItems:'center',}}
//                           onPress={() =>{this.setState({show1:false,addnew:false}),this.ecouter()}}>
//                               <Text style={{color:'white'}}>
//                                                 Record
//                               </Text>
//                           </TouchableOpacity>
//                           </View>
//               </View> */}

//             <ScrollView
//               style={{
//                 width: wp('100%'),
//                 height: hp('100%'),
//                 backgroundColor: '#020D4D'
//                 // backgroundColor:'red'
//               }}>
//               <View style={{ justifyContent: 'center', height: hp('10%'),width:wp('100%'), paddingTop: hp('2.5%') ,marginBottom:-hp('2.5%'),backgroundColor:'#0C1D65'}}>
//             <View
//               style={{ height: hp('4%'), width: wp('100%'), flexDirection: 'row', justifyContent: 'space-between' }}>
//               <TouchableOpacity
//                 onPress={() => this.setState({ listexpres: false, iconHeader: true ,imagedetails:false,show1: false, idecat: '', idLan: '', expres: '', targTEXT: '', all: false, addcat: true, pickerValueHolder: ''})}>
//                 <View
//                   style={{
//                     flexDirection: 'row',
//                     // backgroundColor:'white'
//                   }}>
//                     <Icon name="arrow-back-outline" size={30} color="white" />
                
//                  <Text style={{
//                     color: 'white',
//                     marginLeft: wp('45%'),
//                     fontSize: hp('2.2%'),
//                     position: 'absolute',
//                     // bottom: -4,

//                   }}>
//                    AUDIO
//                   </Text>
//                 </View>
//               </TouchableOpacity>
              
//               {/* <View
//                 style={{
//                   flexDirection:'row',
//                   position:'absolute',
//                   right:wp('5%')
//                 }}>
//                           <Image style={{
//                             width:wp('5%'),
//                             height:hp('3%'),
//                           }}
//                                       source={require('../image/notification.png')}>
//                           </Image>
                     
//                 </View> */}
//               <View >
//                 {/* <TouchableOpacity style={{width:wp('12%'),height:hp('6%'),bottom:hp('3%'),marginLeft:wp('85%'),backgroundColor:'white',justifyContent:"center",borderRadius:10}}
//                 onPress={() => this.setState({users:true})}>
//                 <Image style={{width:wp('8.5%'),height:hp('5%'),alignSelf:'center'}}
//                             source={require('../image/grid-view-icon-27.jpg')}>
//                 </Image> 
//                 </TouchableOpacity>  */}
//               </View>
//             </View>
          

//             </View>
//               <View
//               style={{
//                 height:35,
//                 width:wp('95%'),
//                 borderWidth:0.5,
//                 borderColor:'white',
//                 borderTopLeftRadius:30,
//                 borderBottomLeftRadius:30,
//                 borderRightWidth:0,
//                 // backgroundColor:'white',
//                 alignSelf:'flex-end',
//                 justifyContent:'center',
//                 marginTop:hp('14%'),
//                 flexDirection:'row'
//               }}>
//                     <Icon name={'radio-outline'} size={20} color={'#EA1E69'} style={{
//                       // marginLeft:20
//                       position:'absolute',
//                       left:20,
//                       top:7
//                     }}/>
//                     <Text style={{
//                       color:'white',
//                       fontSize:14,
//                       position:'absolute',
//                       left:70,
//                       top:7
//                     }}>
//                       {I18n.t('Record')}
//                     </Text>

//               </View>
//               <View
//               style={{
//                 flexDirection:'row',
//                 justifyContent:'space-between',
//                 width:wp('90%'),
//                 marginTop:hp('5%'),
//                 alignSelf:'center'

//               }}>
//                 <Text
//                 style={{color:'white',fontSize:14}}>Langue</Text>
//                 <TouchableOpacity
//                 // onPress={()=>alert('test')}  eto 
//                 onPress={() => this.setState({ allang: !this.state.allang })}
//                 >
//                    {!this.state.allang ? (
//                         <Text
//                           style={{
//                             fontSize: 14,
//                             opacity: 0.5,
//                             color:'white'

//                           }}>
//                           {I18n.t('See all')}
//                         </Text>) : (
//                         <Icon name={'ellipsis-horizontal-outline'} size={25} color={'white'} />)}
//                 </TouchableOpacity>
//               </View>
//               <ScrollView style={{  height: hp('65%'), width: wp('100%'), borderRadius: 15, marginTop: hp('1.5%') }}>
//                 <View>
//                   {/* <View
//                     style={{
//                       flexDirection: 'row',
//                       marginTop: hp('3%'),
//                       marginBottom: hp('1%'),
//                       marginLeft: wp('5%')
//                     }}>
//                     <View
//                       style={{
//                         flexDirection: 'column'
//                       }}>
//                       <Text
//                         style={{
//                           color: '#5C4DB1',
//                           fontSize: hp('2%')
//                         }}>
//                         audio record
//                                                   </Text>
//                       <View
//                         style={{
//                           borderWidth: 1,
//                           borderColor: '#DC4F89'
//                         }} />
//                     </View>
//                     <Text
//                       style={{
//                         color: '#5C4DB1',
//                         fontWeight: 'bold',
//                         marginLeft: wp('1%'),
//                         fontSize: hp('2%')
//                       }}>
//                       audio
//                                         </Text>
//                   </View> */}

//                   {/* <View
//                     style={{
//                       flexDirection: 'row'
//                     }}>
//                     <Text
//                       style={{
//                         fontSize: hp('1.5'),
//                         marginLeft: wp('5%'),
//                         opacity: 0.5
//                       }}>
//                       {I18n.t('Your recording language')}
//                                                       </Text>
//                     <View
//                       style={{
//                         right: wp('5%'),
//                         position: 'absolute'
//                       }}>
//                       <TouchableOpacity
//                         onPress={() => this.setState({ allang: !this.state.allang })}>
//                         {!this.state.allang ? (<Text
//                           style={{
//                             fontSize: hp('1.5%'),
//                             opacity: 0.5,
//                           }}>
//                           {I18n.t('See all')}
//                         </Text>) : (
//                             <Icon name={'ellipsis-horizontal-outline'} size={25} color={'black'} />)}
//                       </TouchableOpacity>
//                     </View>
//                   </View> */}

//                   <View style={{ fontSize: hp('3.2%'), fontWeight: 'bold', borderColor: 'grey' }}>

//                     <View style={{
//                       // backgroundColor:'red',
//                       justifyContent: 'center'
//                     }}>
//                       {!this.state.allang ? (
//                         <View
//                           style={{
//                             marginVertical: hp('1%'),
//                             marginLeft: wp('5%'),
//                           }}>
//                           <FlatList
//                             data={this.state.dataSource}
//                             extraData={this.state}
//                             keyExtractor={(item) => item.id}
//                             refreshing={this.state.refreshing}
//                             horizontal={true}
//                             // numColumns={3}
//                             onRefresh={this.handleRefresh}
//                             enableEmptySections={true}
//                             renderSeparator={this.ListViewItemSeparator}
//                             renderItem={({ item, index }) =>
//                               <View style={{
//                                 flexDirection: 'column', justifyContent: 'center', marginRight: wp('2%'), height: hp('7.2%'),
//                                 paddingBottom: hp('1%')
//                               }}>
//                                 {this.LangaudioView(item.id, item.intitule, index, item.abrev)}
//                               </View>
//                             }
//                           />



//                         </View>) :
//                         (
//                           <View>
//                             <View
//                               style={{
//                                 // marginVertical:hp('1%'),
//                                 marginLeft: wp('5%')
//                               }}>
//                               <FlatList
//                                 data={this.state.dataSource}
//                                 extraData={this.state}
//                                 keyExtractor={(item) => item.id}
//                                 refreshing={this.state.refreshing}
//                                 horizontal={false}
//                                 numColumns={4}
//                                 onRefresh={this.handleRefresh}
//                                 enableEmptySections={false}
//                                 renderSeparator={this.ListViewItemSeparator}
//                                 renderItem={({ item, index }) =>
//                                   <View style={{
//                                     flexDirection: 'column', justifyContent: 'space-evenly', height: hp('7.2%'),
//                                     paddingBottom: hp('0.6%'), marginRight: wp('2%')
//                                   }}>
//                                     {this.categoryView(item.id, item.intitule, index)}
//                                   </View>
//                                 }
//                               />
//                             </View>
//                           </View>
//                         )}
//                     </View>
//                     <View
//                       style={{
//                         flexDirection: 'row'
//                       }}>
//                       <Text
//                         style={{
//                           fontSize: 14,
//                           marginLeft: wp('5%'),
//                           color:'white'
//                         }}>
//                         CATEGORIE
//                                                     </Text>
//                       <View
//                         style={{
//                           right: wp('5%'),
//                           position: 'absolute'
//                         }}>
//                         <TouchableOpacity
//                           onPress={() => this.setState({ all: !this.state.all })}>
//                           {!this.state.all ? (<Text
//                             style={{
//                               fontSize: 14,
//                               // opacity: 0.5,
//                               color:'white'

//                             }}>
//                             {I18n.t('See all')}
//                           </Text>) : (
//                               <Icon name={'ellipsis-horizontal-outline'} size={25} color={'white'} />)}
//                         </TouchableOpacity>
//                       </View>
//                     </View>
//                     <View style={{
//                       // backgroundColor:'red',
//                       justifyContent: 'center',
//                       flexDirection:'row',
//                       marginTop:hp('5%')
//                     }}>

// {this.state.addcat ? (
//                       <View
//                         style={{
//                           borderWidth: 0.5,
//                           borderRadius: 15,
//                           backgroundColor: '#62CAD6',
//                           width: wp('10%'),
//                           justifyContent: 'center',
//                           alignItems: 'center',
//                           height: 35,
//                           // marginLeft: wp('5%')
//                         }}>
//                         <TouchableOpacity
//                           onPress={() => this.setState({ addcat: false })}>
//                           <Icon name={'add-outline'} size={25} color={'white'} />
//                         </TouchableOpacity>
//                       </View>
//                     ) : (<View
//                       style={{
//                         flexDirection: 'row'
//                       }}>

//                       <View>
//                         <TextInput
//                           style={{
//                             fontSize: hp('1.5%'), height: 35,
//                             width: wp('30%'),
//                             borderWidth: 0.2,
//                             marginLeft: wp('20%'),
//                             backgroundColor: '#E4E6E5',
//                             borderRadius: 15,
//                             paddingLeft: wp('5%'),
//                             justifyContent: 'center',
//                             alignItems: 'center'
//                             // position:'absolute'
//                           }}
//                           // underlineColorAndroid='transparent'
//                           onChangeText={categ => this.setState({ categ })}
//                           // placeholder={I18n.t('Enter your new category name')}
//                         />

//                       </View>

//                       <View
//                         style={{
//                           height: 35,
//                           width: wp('12.5%'),
//                           marginLeft: wp('2.5%'),
//                           borderRadius: 20,
//                           backgroundColor: '#5C4DB1',
//                           alignItems: 'center',
//                           justifyContent: 'center'
//                         }}>
//                         <TouchableOpacity
//                           disabled={this.state.categ == ''}
//                           onPress={() => { this.setState({ addcat: true }), this.saveCat() }}>
//                           <Text
//                             style={{
//                               color: 'white',
//                               fontSize: hp('1.5%'),
//                               textAlign: 'center'
//                             }}>
//                             {I18n.t('Add')}
//                                                     </Text>
//                         </TouchableOpacity>

//                       </View>
//                     </View>)}



//                       {!this.state.all ? (
//                         <View
//                           style={{
//                             // marginVertical: hp('1%'),
//                             marginLeft: wp('5%'),
//                             // backgroundColor:'white',
//                             width:wp('65%')
//                           }}>
//                           <FlatList
//                             data={this.state.cat}
//                             extraData={this.state}
//                             keyExtractor={(item) => item.id}
//                             refreshing={this.state.refreshing}
//                             horizontal={true}
//                             // numColumns={3}
//                             onRefresh={this.handleRefresh}
//                             enableEmptySections={true}
//                             renderSeparator={this.ListViewItemSeparator}
//                             renderItem={({ item, index }) =>
//                               <View style={{
//                                 flexDirection: 'column', justifyContent: 'center', marginRight: wp('2%'), height: 35,
//                                 // paddingBottom: hp('1%')
//                               }}>
//                                 {this.categoryView(item.id, item.intitule, index)}
//                               </View>
//                             }
//                           />



//                         </View>) :
//                         (
//                           <ScrollView
//                           style={{
//                             height:hp('30%')
//                           }}>
//                             <View
//                               style={{
//                                 // marginVertical:hp('1%'),
//                                 marginLeft: wp('5%'),
//                                 width:wp('75%'),

//                               }}>
//                               <FlatList
//                                 data={this.state.cat}
//                                 extraData={this.state}
//                                 keyExtractor={(item) => item.id}
//                                 refreshing={this.state.refreshing}
//                                 horizontal={false}
//                                 numColumns={3}
//                                 onRefresh={this.handleRefresh}
//                                 enableEmptySections={false}
//                                 renderSeparator={this.ListViewItemSeparator}
//                                 renderItem={({ item, index }) =>
//                                   <View style={{
//                                     flexDirection: 'column', justifyContent: 'center', height: hp('7.2%'),
//                                     paddingBottom: hp('0.6%')
//                                   }}>
//                                     {this.categoryView(item.id, item.intitule, index)}
//                                   </View>
//                                 }
//                               />
//                             </View>
//                           </ScrollView>
//                         )}

//                     </View>

                    
//                     <View style={{ flexDirection: 'row' ,alignItems:'center'}}>
//                       <TouchableOpacity style={[Add.rec,{width:wp('43%'),
//                       height:hp('12%'),
//                       borderRadius:5,
//                       backgroundColor:'#EA1E69'
//                       }]}
//                         disabled={this.state.pickerValueHolder == ''}
//                         onPress={() => { this.setState({ show1: false, addnew: false, plus: false }), this.ecouter() }}
//                       // onPress={() =>alert('record audio')}
//                       >
//                         <MaterialIcons name={'record-voice-over'} size={25} color={'white'} />
//                         <Text style={[Add.textRec,{marginTop:hp('2%'),fontWeight:'400'}]}>
//                         {I18n.t('record audio')}
//                                                                                   </Text>
//                       </TouchableOpacity>
//                       <TouchableOpacity style={[Add.real,{width:wp('43%'),height:hp('12%'),
//                       borderRadius:5,
//                       backgroundColor:'#62CAD6'
//                     }]}
//                         onPress={() => { this.setState({ show1: false, addnew: false, plus: false }), this.speaking() }}
//                       >
//                         <Fontawesome name={'file-audio-o'} size={25} color={'white'} />
//                         <Text style={[Add.textReal,{marginTop:hp('2%'), color:'white', fontWeight:'400'}]}>
//                         {I18n.t('REAL-TIME TRANSCRIPTION')}
//                                                       </Text>
//                       </TouchableOpacity>
                      
//                     </View>

//                   <View    style={[styles.butV,{marginTop:hp('5%')}]}>
//                         <TouchableOpacity 
//                         style={styles.butNew}
//                         onPress={() => this.setState({ show1: false, idecat: '', idLan: '', expres: '', targTEXT: '', all: false, addcat: true, pickerValueHolder: '' })}>
//                           {/* this.props.navigation.navigate('Accueil') 
//                           this.connecter()*/}
//                           {/* <Text style={styles.buttext}>
//                           {I18n.t('login')}
//                           </Text> */}
//                           <Icon name={"arrow-back-outline"} size={35} color={'white'}
//                               style={styles.inputIcon}
//                               />
//                         </TouchableOpacity>  
//                     </View>
//                     {/* <TouchableOpacity style={{ width: wp('0%'), height: hp('5%'), marginLeft: wp('5%'), borderRadius: 30, alignItems: 'center', marginTop: hp('1%'), justifyContent: 'center', marginBottom: hp('5%') }}
//                         onPress={() => this.setState({ show1: false, idecat: '', idLan: '', expres: '', targTEXT: '', all: false, addcat: true, pickerValueHolder: '' })}>
//                         <Text style={{ fontWeight: 'bold',fontSize:hp('1.5%') }}>
//                         {I18n.t('CANCEL')}
//                                                                                   </Text>
//                       </TouchableOpacity> */}
//                   </View>
//                 </View>
//               </ScrollView>
//               <View
//           style={{
//             backgroundColor:'#020D4D',
//             // height:hp('20%'),
//             position:'absolute',
//             bottom:0
//           }}>
//                <Footer
//                 OpenHome={() => {this.openHome(),this.setState({show1: false})}}
//                 OpenPlus={() => {this.openPlus(),this.setState({show1: false})}}
//                 Opensearch={() => {this.openSearch(),this.setState({show1: false})}}
//                 OpenLink={() => {this.OpenLink(),this.setState({show1: false})}}
//               />
//           </View>
//             </ScrollView>
//           </Modal>
//           {/* *** RECORD AUDIO*** */}


//           {/* transcription */}
//           <Modal
//             transparent={true}
//             animationType="slide"
//             visible={this.state.show2}>
//             <View style={{ backgroundColor: '#cce7e8', position: 'absolute', top: hp('20%'), left: wp('10%'), right: wp('10%'), alignItems: 'center', with: wp('80%'), height: hp('24%'), flex: 1, borderRadius: 15, borderColor: '#2f3c7e' }}>
//               <View style={{ backgroundColor: '#2f3c7e', height: hp('5%'), width: wp('80%'), borderTopEndRadius: 15, borderTopStartRadius: 15 }}>
//                 <Text style={{ fontSize: hp('2.5%'), color: 'white', textAlign: 'center' }}>
//                   Please choose your language
//                               </Text>
//               </View>
//               <View style={{ fontSize: hp('3.2%'), borderRadius: 30, borderWidth: 2, width: wp('60%'), height: hp('5%'), borderColor: 'grey', backgroundColor: '#EFF4F5', top: hp('3%') }}
//               >
//                 <Picker
//                   style={{ bottom: hp('2%') }}
//                   mode='dropdown'
//                   selectedValue={this.state.PickerValueHolder}
//                   onValueChange={(itemValue, itemIndex) => this.setState({ PickerValueHolder: itemValue })} >
//                   <Picker.Item label={'Select language'} value="" />
//                   {this.state.dataSource.map((item, key) => (
//                     <Picker.Item label={item.intitule} value={item.abrev} key={key} />)
//                   )}
//                 </Picker>
//                 {/* ***SIMPLE PICKER*** */}
//                 {/* <Picker         
//                           mode='dropdown'
//                           //  prompt='         Select a language'
//                           style={{alignItems:'center'}}
//                           selectedValue={this.state.language}
//                           onValueChange={(itemValue,itemIndex)=>this.setState({language:itemValue})}
//                           >
//                           <Picker.Item label="Français" value="frs"/>
//                           <Picker.Item label="Anglais" value="ang"/>
//                           <Picker.Item label="Espagnol" value="espa"/>
//                           </Picker> */}
//                 {/* *** SIMPLE PICKER*** */}
//               </View>
//               <View style={{ top: 70, flexDirection: 'row', alignItems: 'flex-end' }}>
//                 <TouchableOpacity style={{ width: wp('15%'), height: hp('4.5%'), backgroundColor: 'red', borderRadius: 5, alignItems: 'center', bottom: hp('7%') }}
//                   onPress={() => this.setState({ show2: false, addnew: true })}>
//                   <Text style={{ color: 'white', fontWeight: 'bold' }}>
//                     Cancel
//                                     </Text>
//                 </TouchableOpacity>
//                 <TouchableOpacity style={{ width: wp('15%'), height: hp('4.5%'), marginLeft: wp('25%'), backgroundColor: 'blue', borderRadius: 5, alignItems: 'center', bottom: hp('7%') }}
//                   onPress={() => { this.cnc(), this.tester() }}>
//                   <Text style={{ color: 'white', fontWeight: 'bold' }}>
//                     Go
//                                     </Text>
//                 </TouchableOpacity>
//               </View>
//             </View>
//           </Modal>
//           {/* transcription */}

//           {/* VIDEO */}
//           <Modal
//             transparent={true}
//             animationType="slide"
//             visible={this.state.videolang}>
//             {/* <View style={{backgroundColor:'#cce7e8',position: 'absolute', top:hp('20%'), left:wp('10%'), right:wp('10%'),alignItems: 'center',with:wp('80%'),height:hp('24%'),flex:1,borderRadius:15,borderColor:'#2f3c7e'}}>
//                           <View style={{backgroundColor:'#2f3c7e',height:hp('5%'),width:wp('80%'),borderTopEndRadius:15,borderTopStartRadius:15}}>
//                               <Text style={{fontSize:hp('2.5%'),color:'white',textAlign:'center'}}>
//                                         Please choose your language
//                               </Text>
//                           </View> 
//                           <View  style={{fontSize:hp('3.2%'),borderRadius:30,borderWidth:2,width:wp('60%'),height:hp('5%'),borderColor:'grey',backgroundColor:'#EFF4F5',top:hp('3%')}}
//                           >
//                               <Picker
//                               style={{bottom:hp('2%')}}
//                               mode='dropdown'
//                               selectedValue={this.state.PickerValueHolder}
//                               onValueChange={(itemValue, itemIndex) => this.setState({PickerValueHolder: itemValue})} >
//                               <Picker.Item label={'Select language'} value=""/>
//                               { this.state.dataSource.map((item, key)=>(
//                               <Picker.Item label={item.intitule} value={item.abrev}  key={key} />)
//                               )}
//                               </Picker> */}
//             {/* ***SIMPLE PICKER*** */}
//             {/* <Picker         
//                           mode='dropdown'
//                           //  prompt='         Select a language'
//                           style={{alignItems:'center'}}
//                           selectedValue={this.state.language}
//                           onValueChange={(itemValue,itemIndex)=>this.setState({language:itemValue})}
//                           >
//                           <Picker.Item label="Français" value="frs"/>
//                           <Picker.Item label="Anglais" value="ang"/>
//                           <Picker.Item label="Espagnol" value="espa"/>
//                           </Picker> */}
//             {/* *** SIMPLE PICKER*** */}
//             {/* </View> 
//                           <View  style={{ top:70,flexDirection:'row', alignItems:'flex-end'}}>
//                               <TouchableOpacity style={{ width:wp('15%'), height:hp('4.5%'),backgroundColor:'red',borderRadius:5,alignItems:'center',bottom:hp('7%')}}
//                               onPress={() => this.setState({videolang:false})}>
//                                     <Text style={{color:'white',fontWeight: 'bold'}}>
//                                                       Cancel
//                                     </Text>
//                               </TouchableOpacity> 
//                               <TouchableOpacity style={{width:wp('15%'), height:hp('4.5%'),marginLeft:wp('25%'),backgroundColor:'blue',borderRadius:5,alignItems:'center',bottom:hp('7%')}}
//                               onPress={() =>{this.cnc2 (),this.gocam()}}>
//                                     <Text style={{color:'white',fontWeight: 'bold'}}>
//                                                       Go
//                                     </Text>
//                               </TouchableOpacity>
//                           </View>
//               </View> */}
//         <ScrollView
//               style={{
//                 width: wp('100%'),
//                 height: hp('100%'),
//                 backgroundColor: '#020D4D'
//                 // backgroundColor:'red'
//               }}>
//               <View style={{ justifyContent: 'center', height: hp('10%'),width:wp('100%'), paddingTop: hp('2.5%') ,marginBottom:-hp('2.5%'),backgroundColor:'#0C1D65'}}>
//             <View
//               style={{ height: hp('4%'), width: wp('100%'), flexDirection: 'row', justifyContent: 'space-between' }}>
//               <TouchableOpacity
//                 onPress={() => this.setState({ listexpres: false, iconHeader: true ,imagedetails:false,videolang: false, idecat: '', idLan: '', expres: '', targTEXT: '', all: false, addcat: true, pickerValueHolder: ''})}>
//                 <View
//                   style={{
//                     flexDirection: 'row',
//                     // backgroundColor:'white'
//                   }}>
//                     <Icon name="arrow-back-outline" size={30} color="white" />
                
//                  <Text style={{
//                     color: 'white',
//                     marginLeft: wp('45%'),
//                     fontSize: hp('2.2%'),
//                     position: 'absolute',
//                     // bottom: -4,

//                   }}>
//                    VIDEO
//                   </Text>
//                 </View>
//               </TouchableOpacity>
//               <View >
//               </View>
//             </View>
          

//             </View>
//               <View
//               style={{
//                 height:35,
//                 width:wp('95%'),
//                 borderWidth:0.5,
//                 borderColor:'white',
//                 borderTopLeftRadius:30,
//                 borderBottomLeftRadius:30,
//                 borderRightWidth:0,
//                 // backgroundColor:'white',
//                 alignSelf:'flex-end',
//                 justifyContent:'center',
//                 marginTop:hp('14%'),
//                 flexDirection:'row'
//               }}>
//                     <Icon name={'radio-outline'} size={20} color={'#EA1E69'} style={{
//                       // marginLeft:20
//                       position:'absolute',
//                       left:20,
//                       top:7
//                     }}/>
//                     <Text style={{
//                       color:'white',
//                       fontSize:14,
//                       position:'absolute',
//                       left:70,
//                       top:7
//                     }}>
//                       Record video-picture
//                     </Text>

//               </View>
//               <View
//               style={{
//                 flexDirection:'row',
//                 justifyContent:'space-between',
//                 width:wp('90%'),
//                 marginTop:hp('5%'),
//                 alignSelf:'center'

//               }}>
//                 <Text
//                 style={{color:'white',fontSize:14}}>Langue</Text>
//                 <TouchableOpacity
//                 // onPress={()=>alert('test')}  eto 
//                 onPress={() => this.setState({ allang: !this.state.allang })}
//                 >
//                    {!this.state.allang ? (
//                         <Text
//                           style={{
//                             fontSize: 14,
//                             opacity: 0.5,
//                             color:'white'

//                           }}>
//                           {I18n.t('See all')}
//                         </Text>) : (
//                         <Icon name={'ellipsis-horizontal-outline'} size={25} color={'white'} />)}
//                 </TouchableOpacity>
//               </View>
//               <ScrollView style={{  height: hp('60%'), width: wp('100%'), borderRadius: 15, marginTop: hp('1.5%') }}>
//                 <View>
//                   <View style={{ fontSize: hp('3.2%'), fontWeight: 'bold', borderColor: 'grey' }}>

//                     <View style={{
//                       // backgroundColor:'red',
//                       justifyContent: 'center'
//                     }}>
//                       {!this.state.allang ? (
//                         <View
//                           style={{
//                             marginVertical: hp('1%'),
//                             marginLeft: wp('5%'),
//                           }}>
//                           <FlatList
//                             data={this.state.dataSource}
//                             extraData={this.state}
//                             keyExtractor={(item) => item.id}
//                             refreshing={this.state.refreshing}
//                             horizontal={true}
//                             // numColumns={3}
//                             onRefresh={this.handleRefresh}
//                             enableEmptySections={true}
//                             renderSeparator={this.ListViewItemSeparator}
//                             renderItem={({ item, index }) =>
//                               <View style={{
//                                 flexDirection: 'column', justifyContent: 'center', marginRight: wp('2%'), height: hp('7.2%'),
//                                 paddingBottom: hp('1%')
//                               }}>
//                                 {this.LangaudioView(item.id, item.intitule, index, item.abrev)}
//                               </View>
//                             }
//                           />



//                         </View>) :
//                         (
//                           <View>
//                             <View
//                               style={{
//                                 // marginVertical:hp('1%'),
//                                 marginLeft: wp('5%')
//                               }}>
//                               <FlatList
//                                 data={this.state.dataSource}
//                                 extraData={this.state}
//                                 keyExtractor={(item) => item.id}
//                                 refreshing={this.state.refreshing}
//                                 horizontal={false}
//                                 numColumns={4}
//                                 onRefresh={this.handleRefresh}
//                                 enableEmptySections={false}
//                                 renderSeparator={this.ListViewItemSeparator}
//                                 renderItem={({ item, index }) =>
//                                   <View style={{
//                                     flexDirection: 'column', justifyContent: 'space-evenly', height: hp('7.2%'),
//                                     paddingBottom: hp('0.6%'), marginRight: wp('2%')
//                                   }}>
//                                     {this.categoryView(item.id, item.intitule, index)}
//                                   </View>
//                                 }
//                               />
//                             </View>
//                           </View>
//                         )}
//                     </View>
//                     <View
//                       style={{
//                         flexDirection: 'row'
//                       }}>
//                       <Text
//                         style={{
//                           fontSize: 14,
//                           marginLeft: wp('5%'),
//                           color:'white'
//                         }}>
//                         CATEGORIE
//                                                     </Text>
//                       <View
//                         style={{
//                           right: wp('5%'),
//                           position: 'absolute'
//                         }}>
//                         <TouchableOpacity
//                           onPress={() => this.setState({ all: !this.state.all })}>
//                           {!this.state.all ? (<Text
//                             style={{
//                               fontSize: 14,
//                               // opacity: 0.5,
//                               color:'white'

//                             }}>
//                             {I18n.t('See all')}
//                           </Text>) : (
//                               <Icon name={'ellipsis-horizontal-outline'} size={25} color={'white'} />)}
//                         </TouchableOpacity>
//                       </View>
//                     </View>
//                     <View style={{
//                       // backgroundColor:'red',
//                       justifyContent: 'center',
//                       flexDirection:'row',
//                       marginTop:hp('5%')
//                     }}>

// {this.state.addcat ? (
//                       <View
//                         style={{
//                           borderWidth: 0.5,
//                           borderRadius: 15,
//                           backgroundColor: '#62CAD6',
//                           width: wp('10%'),
//                           justifyContent: 'center',
//                           alignItems: 'center',
//                           height: 35,
//                           // marginLeft: wp('5%')
//                         }}>
//                         <TouchableOpacity
//                           onPress={() => this.setState({ addcat: false })}>
//                           <Icon name={'add-outline'} size={25} color={'white'} />
//                         </TouchableOpacity>
//                       </View>
//                     ) : (<View
//                       style={{
//                         flexDirection: 'row'
//                       }}>

//                       <View>
//                         <TextInput
//                           style={{
//                             fontSize: hp('1.5%'), height: 35,
//                             width: wp('25%'),
//                             borderWidth: 0.2,
//                             marginLeft: wp('25%'),
//                             backgroundColor: '#E4E6E5',
//                             borderRadius: 20,
//                             paddingLeft: wp('5%'),
//                             justifyContent: 'center',
//                             alignItems: 'center'
//                           }}
//                           underlineColorAndroid='transparent'
//                           onChangeText={categ => this.setState({ categ })}
//                           placeholder={I18n.t('Enter your new category name')}

//                         />

//                       </View>

//                       <View
//                         style={{
//                           height: 35,
//                           width: wp('17.5%'),
//                           marginLeft: wp('2.5%'),
//                           borderRadius: 20,
//                           backgroundColor: '#5C4DB1',
//                           alignItems: 'center',
//                           justifyContent: 'center'
//                         }}>
//                         <TouchableOpacity
//                           disabled={this.state.categ == ''}
//                           onPress={() => { this.setState({ addcat: true }), this.saveCat() }}>
//                           <Text
//                             style={{
//                               color: 'white',
//                               fontSize: hp('1.5%'),
//                               textAlign: 'center'
//                             }}>
//                             {I18n.t('Add')}
//                                                     </Text>
//                         </TouchableOpacity>

//                       </View>
//                     </View>)}



//                       {!this.state.all ? (
//                         <View
//                           style={{
//                             // marginVertical: hp('1%'),
//                             marginLeft: wp('5%'),
//                             // backgroundColor:'white',
//                             width:wp('75%')
//                           }}>
//                           <FlatList
//                             data={this.state.cat}
//                             extraData={this.state}
//                             keyExtractor={(item) => item.id}
//                             refreshing={this.state.refreshing}
//                             horizontal={true}
//                             // numColumns={3}
//                             onRefresh={this.handleRefresh}
//                             enableEmptySections={true}
//                             renderSeparator={this.ListViewItemSeparator}
//                             renderItem={({ item, index }) =>
//                               <View style={{
//                                 flexDirection: 'column', justifyContent: 'center', marginRight: wp('2%'), height: 35,
//                                 // paddingBottom: hp('1%')
//                               }}>
//                                 {this.categoryView(item.id, item.intitule, index)}
//                               </View>
//                             }
//                           />



//                         </View>) :
//                         (
//                           <ScrollView
//                           style={{
//                             height:hp('30%')
//                           }}>
//                             <View
//                               style={{
//                                 // marginVertical:hp('1%'),
//                                 marginLeft: wp('5%'),
//                                 width:wp('65%'),

//                               }}>
//                               <FlatList
//                                 data={this.state.cat}
//                                 extraData={this.state}
//                                 keyExtractor={(item) => item.id}
//                                 refreshing={this.state.refreshing}
//                                 horizontal={false}
//                                 numColumns={3}
//                                 onRefresh={this.handleRefresh}
//                                 enableEmptySections={false}
//                                 renderSeparator={this.ListViewItemSeparator}
//                                 renderItem={({ item, index }) =>
//                                   <View style={{
//                                     flexDirection: 'column', justifyContent: 'center', height: hp('7.2%'),
//                                     paddingBottom: hp('0.6%')
//                                   }}>
//                                     {this.categoryView(item.id, item.intitule, index)}
//                                   </View>
//                                 }
//                               />
//                             </View>
//                           </ScrollView>
//                         )}

//                     </View>

                    
//                     <View style={{alignItems:'center'}}>
//                       <TouchableOpacity style={[Add.rec,{width:wp('43%'),
//                       height:hp('12%'),
//                       borderRadius:5,
//                       backgroundColor:'#EA1E69'
//                       }]}
//                       disabled={this.state.pickerValueHolder == ''}
//                       onPress={() => { this.cnc2(), this.gocam() }}
//                       // onPress={() =>alert('record audio')}
//                       >
//                         <Icon name={"camera-outline"} size={25} color={'white'} />
//                         <Text style={[Add.textRec,{marginTop:hp('2%'),fontWeight:'400'}]}>
//                         RECORD VIDEO/PICTURE
//                                                                                   </Text>
//                       </TouchableOpacity>
                      
//                     </View>

//                   <View    style={[styles.butV,{marginTop:hp('5%')}]}>
//                         <TouchableOpacity 
//                         style={styles.butNew}
//                         onPress={() => this.setState({ videolang: false, idecat: '', idLan: '', expres: '', targTEXT: '', all: false, addcat: true, pickerValueHolder: '' })}>
                         
//                           <Icon name={"arrow-back-outline"} size={35} color={'white'}
//                               style={styles.inputIcon}
//                               />
//                         </TouchableOpacity>  
//                     </View>
//                   </View>
//                 </View>
//               </ScrollView>
//               <View
//           style={{
//             backgroundColor:'#020D4D',
//             // height:hp('20%'),
//             position:'absolute',
//             bottom:-hp('5%')
//           }}>
//                <Footer
//                 OpenHome={() => {this.openHome(),this.setState({show1: false})}}
//                 OpenPlus={() => {this.openPlus(),this.setState({show1: false})}}
//                 Opensearch={() => {this.openSearch(),this.setState({show1: false})}}
//                 Search = {true}
//                 OpenLink={() => {this.OpenLink(),this.setState({show1: false})}}
//               />
//           </View>
//             </ScrollView>

//           </Modal>
//           {/* VIDEO */}

//           {/* MODAL UPDATE */}
//           <Modal
//             transparent={true}
//             animationType="slide"
//             visible={this.state.show4}>
//             <ScrollView
//               style={{
//                 width: wp('100%'),
//                 height: hp('100%'),
//                 backgroundColor: 'grey'
//               }}>

//               <ScrollView style={{ backgroundColor: '#F4F6FC', height: hp('75%'), width: wp('100%'), borderRadius: 15, marginTop: hp('20%') }}>

//                 <View
//                 //  style={{fontSize:hp('3.2%'),fontWeight: 'bold',borderColor:'grey',top :10,height:hp('80%')}}
//                 >
//                   <View
//                     style={{
//                       flexDirection: 'row',
//                       marginTop: hp('3%'),
//                       marginBottom: hp('1%'),
//                       marginLeft: wp('5%')
//                     }}>
//                     <View
//                       style={{
//                         flexDirection: 'column'
//                       }}>
//                       <Text
//                         style={{
//                           color: '#5C4DB1',
//                           fontSize: hp('2.8%')
//                         }}>
//                         {I18n.t('Edit')}
//                                                   </Text>
//                       <View
//                         style={{
//                           borderWidth: 1,
//                           width: wp('9%'),
//                           borderColor: '#DC4F89'
//                         }} />
//                     </View>
//                     <Text
//                       style={{
//                         color: '#5C4DB1',
//                         fontWeight: 'bold',
//                         marginLeft: wp('1%'),
//                         fontSize: hp('2.8%')
//                       }}>
//                       {I18n.t('text')}
//                                         </Text>
//                   </View>
//                   <TextInput
//                     ref={input => { this.textInput = input }}
//                     // style={{backgroundColor:'white',fontSize:hp('2%'),width:wp('90%'),alignSelf:'center'}}
//                     style={{ backgroundColor: 'white', fontSize: hp('2%'), width: wp('90%'), alignSelf: 'center' }}
//                     value={this.state.text}
//                     multiline={true}
//                     onSubmitEditing={Keyboard.dismiss}
//                     placeholder={I18n.t('your text')}
//                     onChangeText={text => this.setState({ text })}
//                   />
//                   {/* <View style={{borderWidth:1,borderRadius:30,borderColor:'grey',backgroundColor:'#EFF4F5',width:wp('85%'),height:hp('5%'),marginRight:wp('1.5%')}}>
//                                   <Picker
//                                   mode='dropdown'
//                                   style={{fontWeight:'bold',fontSize:hp('5%'),bottom:hp('2%')}}
//                                   selectedValue={this.state.picIdlangue}
//                                   onValueChange={(itemValue, itemIndex) => this.handleTranslateEdit(itemValue)} >
//                                   <Picker.Item label={'Select language'} value=""/>
//                                   { this.state.dataSource.map((item, key)=>(
//                                   <Picker.Item label={item.intitule} value={item.abrev}  key={key} />)
//                                   )}
//                                   </Picker>
//                         </View> */}
//                   <View
//                     style={{
//                       flexDirection: 'row'
//                     }}>
//                     <Text
//                       style={{
//                         fontSize: 14,
//                         marginLeft: wp('5%'),
//                         // marginTop:hp('2%'),
//                         opacity: 0.7
//                       }}>
//                       {I18n.t('Your recording language')}
//                                                       </Text>
//                     <View
//                       style={{
//                         right: wp('5%'),
//                         position: 'absolute'
//                       }}>
//                       <TouchableOpacity
//                         onPress={() => this.setState({ allang: !this.state.allang })}>
//                         {!this.state.allang ? (<Text
//                           style={{
//                             fontSize: 12,
//                             opacity: 0.7,

//                           }}>
//                            {I18n.t('See all')}
//                         </Text>) : (
//                             <Icon name={'ellipsis-horizontal-outline'} size={25} color={'black'} />)}
//                       </TouchableOpacity>
//                     </View>
//                   </View>

//                   <View style={{ fontSize: hp('3.2%'), fontWeight: 'bold', borderColor: 'grey' }}>

//                     <View style={{
//                       // backgroundColor:'red',
//                       justifyContent: 'center'
//                     }}>
//                       {!this.state.allang ? (
//                         <View
//                           style={{
//                             marginVertical: hp('1%'),
//                             marginLeft: wp('5%'),
//                           }}>
//                           <FlatList
//                             data={this.state.dataSource}
//                             extraData={this.state}
//                             keyExtractor={(item) => item.id}
//                             refreshing={this.state.refreshing}
//                             horizontal={true}
//                             // numColumns={3}
//                             onRefresh={this.handleRefresh}
//                             enableEmptySections={true}
//                             renderSeparator={this.ListViewItemSeparator}
//                             renderItem={({ item, index }) =>
//                               <View style={{
//                                 flexDirection: 'column', justifyContent: 'center', marginRight: wp('2%'), height: hp('7.2%'),
//                                 paddingBottom: hp('1%')
//                               }}>
//                                 {this.LangViewedit(item.id, item.intitule, index, item.abrev)}
//                               </View>
//                             }
//                           />



//                         </View>) :
//                         (
//                           <View>
//                             <View
//                               style={{
//                                 // marginVertical:hp('1%'),
//                                 marginLeft: wp('5%')
//                               }}>
//                               <FlatList
//                                 data={this.state.dataSource}
//                                 extraData={this.state}
//                                 keyExtractor={(item) => item.id}
//                                 refreshing={this.state.refreshing}
//                                 horizontal={false}
//                                 numColumns={4}
//                                 onRefresh={this.handleRefresh}
//                                 enableEmptySections={false}
//                                 renderSeparator={this.ListViewItemSeparator}
//                                 renderItem={({ item, index }) =>
//                                   <View style={{
//                                     flexDirection: 'column', justifyContent: 'space-evenly', height: hp('7.2%'),
//                                     paddingBottom: hp('0.6%'), marginRight: wp('2%')
//                                   }}>
//                                     {this.categoryView(item.id, item.intitule, index)}
//                                   </View>
//                                 }
//                               />
//                             </View>
//                           </View>
//                         )}
//                     </View>
//                     <View
//                       style={{
//                         flexDirection: 'row'
//                       }}>
//                       <Text
//                         style={{
//                           fontSize: 14,
//                           opacity: 0.7,
//                           marginLeft: wp('5%')
//                         }}>
//                         {I18n.t('Category optional')}
//                                                     </Text>
//                       <View
//                         style={{
//                           right: wp('5%'),
//                           position: 'absolute'
//                         }}>
//                         <TouchableOpacity
//                           onPress={() => this.setState({ all: !this.state.all })}>
//                           {!this.state.all ? (<Text
//                             style={{
//                               fontSize: 12,
//                               opacity: 0.7,

//                             }}>
//                             {I18n.t('See all')}
//                           </Text>) : (
//                               <Icon name={'ellipsis-horizontal-outline'} size={25} color={'black'} />)}
//                         </TouchableOpacity>
//                       </View>
//                     </View>
//                     <View style={{
//                       // backgroundColor:'red',
//                       justifyContent: 'center'
//                     }}>
//                       {!this.state.all ? (
//                         <View
//                           style={{
//                             marginVertical: hp('1%'),
//                             marginLeft: wp('5%'),
//                           }}>
//                           <FlatList
//                             data={this.state.cat}
//                             extraData={this.state}
//                             keyExtractor={(item) => item.id}
//                             refreshing={this.state.refreshing}
//                             horizontal={true}
//                             // numColumns={3}
//                             onRefresh={this.handleRefresh}
//                             enableEmptySections={true}
//                             renderSeparator={this.ListViewItemSeparator}
//                             renderItem={({ item, index }) =>
//                               <View style={{
//                                 flexDirection: 'column', justifyContent: 'center', marginRight: wp('2%'), height: hp('7.2%'),
//                                 paddingBottom: hp('1%')
//                               }}>
//                                 {this.categoryView(item.id, item.intitule, index)}
//                               </View>
//                             }
//                           />



//                         </View>) :
//                         (
//                           <View>
//                             <View
//                               style={{
//                                 // marginVertical:hp('1%'),
//                                 marginLeft: wp('5%')
//                               }}>
//                               <FlatList
//                                 data={this.state.cat}
//                                 extraData={this.state}
//                                 keyExtractor={(item) => item.id}
//                                 refreshing={this.state.refreshing}
//                                 horizontal={false}
//                                 numColumns={3}
//                                 onRefresh={this.handleRefresh}
//                                 enableEmptySections={false}
//                                 renderSeparator={this.ListViewItemSeparator}
//                                 renderItem={({ item, index }) =>
//                                   <View style={{
//                                     flexDirection: 'column', justifyContent: 'center', height: hp('7.2%'),
//                                     paddingBottom: hp('0.6%')
//                                   }}>
//                                     {this.categoryView(item.id, item.intitule, index)}
//                                   </View>
//                                 }
//                               />
//                             </View>
//                           </View>
//                         )}
//                     </View>

//                     {this.state.addcat ? (
//                       <View
//                         style={{
//                           borderWidth: 0.5,
//                           borderRadius: 20,
//                           backgroundColor: '#DBDDDC',
//                           width: wp('25tf%'),
//                           justifyContent: 'center',
//                           alignItems: 'center',
//                           height: hp('4.5%'),
//                           marginLeft: wp('5%')
//                         }}>
//                         <TouchableOpacity
//                           onPress={() => this.setState({ addcat: false })}>
//                           <Text>
//                             + {I18n.t('Add New')}
//                                                           </Text>
//                         </TouchableOpacity>
//                       </View>
//                     ) : (<View
//                       style={{
//                         flexDirection: 'row'
//                       }}>

//                       <View>
//                         <TextInput
//                           style={{
//                             fontSize: hp('2%'), height: hp('5.5%'),
//                             width: wp('70%'),
//                             borderWidth: 0.2,
//                             marginLeft: wp('5%'),
//                             backgroundColor: '#E4E6E5',
//                             borderRadius: 20,
//                             paddingLeft: wp('5%'),
//                             justifyContent: 'center',
//                             alignItems: 'center'
//                           }}
//                           underlineColorAndroid='transparent'
//                           onChangeText={categ => this.setState({ categ })}
//                           placeholder={I18n.t('Enter your new category name')}

//                         />

//                       </View>

//                       <View
//                         style={{
//                           height: hp('5.5%'),
//                           width: wp('17.5%'),
//                           marginLeft: wp('2.5%'),
//                           borderRadius: 20,
//                           backgroundColor: '#5C4DB1',
//                           alignItems: 'center',
//                           justifyContent: 'center'
//                         }}>
//                         <TouchableOpacity
//                           disabled={this.state.categ == ''}
//                           onPress={() => { this.setState({ addcat: true }), this.saveCat() }}>
//                           <Text
//                             style={{
//                               color: 'white',
//                               fontSize: 14,
//                               textAlign: 'center'
//                             }}>
//                              {I18n.t('Add')}
//                                                     </Text>
//                         </TouchableOpacity>

//                       </View>
//                     </View>)}
//                   </View>


//                   {/* <View>
//                                   <Text style={{textAlign:'center',color:'grey',fontWeight:'bold'}}>
//                                                   Target text
//                                   </Text>
//                         </View> */}
//                   <View style={{ marginTop: hp('1%') }}>
//                     <TextInput
//                       ref={input => { this.textInput = input }}
//                       style={{ backgroundColor: 'white', fontSize: hp('2%'), width: wp('90%'), alignSelf: 'center' }}
//                       multiline={true}
//                       value={this.state.targTEXT}
//                       placeholder={I18n.t('Translated text')}
//                       onChangeText={targTEXT => this.setState({ targTEXT })}
//                     />
//                   </View>
//                 </View>
//                 {/* <View  style={{flexDirection:'row',top:hp('70%'),position:'absolute'}}>
//                                   <TouchableOpacity style={{ width:wp('15%'), height:hp('4.5%'),backgroundColor:'grey',borderRadius:5,alignItems:'center'}}
//                                   onPress={() => this.setState({show4:false})}>
//                                             <Text style={{color:'white',fontWeight: 'bold'}}>
//                                                               Close
//                                             </Text>
//                                   </TouchableOpacity> 
//                                   <TouchableOpacity style={{width:wp('15%'), height:hp('4.5%'),marginLeft:wp('25%'),backgroundColor:'blue',borderRadius:5,alignItems:'center',}}
//                                   onPress={() =>{this.picId(this.state.picIdlangue),this.upDate(),this.setState({show4:false})}}>
//                                             <Text style={{color:'white',fontWeight: 'bold'}}>
//                                                               Save
//                                             </Text>
//                                   </TouchableOpacity>
//                         </View> */}
//                 <View style={{ flexDirection: 'column', alignItems:'center' }}>
//                   <TouchableOpacity style={Add.rec}
//                     //  disabled={this.state.pickerValueHolder ==''}
//                     onPress={() => { this.picId(this.state.picIdlangue), this.upDate(), this.setState({ show4: false })}}
//                   // onPress={() =>alert('record audio')}
//                   >
//                     <Text style={Add.textRec}>
//                     {I18n.t('SAVE')}
//                      </Text>
//                   </TouchableOpacity>

//                   <TouchableOpacity
//                   style={[Add.rec,{backgroundColor:'white'}]}
//                   //  style={{ width: wp('90%'), height: hp('5%'), marginLeft: wp('5%'), borderRadius: 30, alignItems: 'center', marginTop: hp('1%'), justifyContent: 'center', marginBottom: hp('5%'),alignItems:'center' }}
//                     onPress={() => this.setState({ show4: false, idecat:''})}>
//                     <Text 
//                     style={{ fontWeight: 'bold',textAlign:'center' }}
//                     // style={{color:'black'}]}
//                     >
//                     {I18n.t('CANCEL')}
//                     </Text>
//                   </TouchableOpacity>
//                 </View>
//               </ScrollView>
//             </ScrollView>
//           </Modal>
//           {/* MODAL UPDATE */}


//           {/* MODAL create */}
//           <Modal
//             transparent={true}
//             animationType="slide"
//             visible={this.state.create}>
//             <ScrollView
//               style={{
//                 width: wp('100%'),
//                 height: hp('100%'),
//                 backgroundColor:'#020D4D'
//               }}>

//               <ScrollView style={{ backgroundColor: '#020D4D', height: hp('100%'), width: wp('100%'), borderRadius: 15}}>
//                 <View
//                 style={{
//                   backgroundColor:'#020D4D',
//                   height: hp('97%')
//                 }}>
//                   {/* 
//                   new header
//                   */}
//                   <View style={{ justifyContent: 'center', height: hp('8.5%'),width:wp('100%'),backgroundColor:'#0C1D65'}}>
//                     <View
//                       style={{ height: hp('4%'), width: wp('100%'), flexDirection: 'row', justifyContent: 'space-between' }}>
//                       <TouchableOpacity
//                         onPress={() => {this.props.navigation.navigate('Accueil'),this.setState({ create: false, idLan: '', idecat: '', addcat: true }) }}>
//                         <View
//                           style={{
//                             flexDirection: 'row',
//                             // backgroundColor:'white'
//                           }}>
//                             <Icon name={"arrow-back-outline"} size={25} color="white"
//                             style={{alignSelf:'center',marginLeft:5}}
//                           />
//                           <Text style={{
//                             color: 'white',
//                             marginLeft: wp('23%'),
//                             fontSize: hp('2.2%'),
//                             // textAlign:'center'

//                             }}>
//                             TRANSCRIPTION
//                             </Text>
//                         </View>
//                       </TouchableOpacity>
//                       {this.state.iconHeader? (<View style={{
//                           flexDirection: 'row',
//                           position: 'absolute',
//                           right: wp('25%'),
//                           top:10
//                         }}>
//                       <Text style={{ marginLeft: wp('2%'), fontSize: hp('2%'),color:'white' }}>
//                         {this.state.login.charAt(0).toUpperCase() + this.state.login.substring(1).toLowerCase()}
//                       </Text>
//                       </View>):null}
//                       {this.state.iconHeader?(<View
//                         style={{
//                           flexDirection: 'row',
//                           position: 'absolute',
//                           top:10,
//                           right: wp('15%')
//                         }}>
//                         <Image style={{
//                           width: 20,
//                           height: 20,
//                         }}
//                           source={require('../image/Avatar-23.png')}>
//                         </Image>
//                       </View>):null}
//                       {this.state.iconHeader?(<TouchableOpacity
//                         onPress={() => this.clearAllData()}
//                         style={{
//                           flexDirection: 'row',
//                           position: 'absolute',
//                           right: wp('5%')
//                         }}>
//                         <View>
//                           <Icon name="log-out-outline" size={30} color="white" />
//                         </View>
//                       </TouchableOpacity>):null}
//                     </View>
//                   </View>
//                   {/* 
//                   new header
//                    */}
//                    {/* 
//                    new content 1
//                    */}
//                     <View
//                           style={{
//                             // backgroundColor:'white',
//                             backgroundColor:'#020D4D',
//                             height:35,
//                             width:wp('90%'),
//                             alignSelf:'center',
//                             flexDirection:'row',
//                             justifyContent:'space-around',
//                             marginTop:hp('3%')
//                           }}>
//                             <TouchableOpacity
//                               onPress={() => {this.handleTranslate('fr')}}>
//                               <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: 'white',height:35, borderWidth:0.5, paddingLeft:15,paddingRight:15, borderColor: '#5C4DB1', borderRadius: 15, justifyContent: 'center' }}>
//                                   <Text style={{
//                                     marginHorizontal: wp('3%'),
//                                     marginVertical: hp('0.5%'),
//                                     fontWeight: '400',
//                                     fontSize:14,
//                                     textAlign: 'center',
//                                     opacity: 0.5
//                                   }}>
//                                     Français
//                                   </Text>
//                                 </View>
//                             </TouchableOpacity>
//                             {/* <TouchableOpacity
//                             onPress={() => alert('test')}
//                             > */}
//                                 <Icon name="swap-horizontal-outline" size={30} color="white"
//                                 style={{
//                                   // transform: [{ rotate: '90deg'}]
//                                 }}
//                                 />
//                             {/* // </TouchableOpacity> */}
                            
//                             <TouchableOpacity
//                               onPress={() => {this.handleTranslate('en')}}>
//                               <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: 'white',height:35, borderWidth:0.5, paddingLeft:15,paddingRight:15, borderColor: '#5C4DB1', borderRadius: 15, justifyContent: 'center' }}>
//                                   <Text style={{
//                                     marginHorizontal: wp('3%'),
//                                     marginVertical: hp('0.5%'),
//                                     fontWeight: '400',
//                                     fontSize:14,
//                                     textAlign: 'center',
//                                     opacity: 0.5
//                                   }}>
//                                     Anglais
//                                   </Text>
//                                 </View>
//                             </TouchableOpacity>
//                        </View>
//                    {/* 
//                    new content 1
//                     */}
//                     {/* 2 */}
//                     <View
//                         style = {{
//                           flexDirection:'row',
//                           justifyContent:'space-between',
//                           alignSelf:'center',
//                           width:wp('90%'),
//                           // backgroundColor:'red',
//                           marginTop:hp('5%')
//                         }}>
//                               <Text
//                               style = {{
//                                   color:'white',
//                                   fontSize:14
//                               }}>
//                                   VOTRE DISCOURS
//                               </Text>
//                               <TouchableOpacity
//                               onPress={()=>this.readinText(this.state.expres,'fr')}
//                               style={{
//                                 width:wp('20%')
//                               }}>
//                                   <Icon name={"volume-medium-outline"} size={25} color="#EA1E69"
//                                       style={{alignSelf:'flex-end',marginLeft:5}}
//                                   />
//                               </TouchableOpacity>
//                     </View>
//                     {/* 2 */}
//                     {/* 3 */}
//                     <View
//                     style={{
//                       backgroundColor:'white',
//                       height:hp('20%'),
//                       width:wp('90%'),
//                       alignSelf:'center',
//                       borderRadius:5
//                     }}
//                     >
//                       <TextInput
//                         ref={input => { this.textInput = input }}
//                         style={{
//                           width:wp('90%')
//                         }}
//                         multiline={true}
//                         onChangeText={expres => this.setState({ expres })}
//                       />
//                     </View>
                   
//               {/* </View> */}
//               <View
//               style = {{
//                 flexDirection:'row',
//                 justifyContent:'space-between',
//                 alignSelf:'center',
//                 width:wp('90%'),
//                 // backgroundColor:'red',
//                 marginTop:hp('5%')
//               }}>
//                     <Text
//                     style = {{
//                         color:'white',
//                         fontSize:14
//                     }}>
//                         TRADUCTION
//                     </Text>
//                     <TouchableOpacity
//                     onPress={()=>this.readinText(this.state.targTEXT,'en')}
//                     style={{
//                       width:wp('20%')
//                     }}>
//                         <Icon name={"volume-medium-outline"} size={25} color="#EA1E69"
//                             style={{alignSelf:'flex-end',marginLeft:5}}
//                         />
//                     </TouchableOpacity>
//               </View>
//               <View
//                 style={{
//                   backgroundColor:'white',
//                   height:hp('20%'),
//                   width:wp('90%'),
//                   alignSelf:'center',
//                   borderRadius:5
//                 }}
//               >
//                 <TextInput
//                   ref={input => { this.textInput = input }}
//                   style={{
//                     width:wp('90%')
//                   }}
//                   placeholderTextColor={'grey'}
//                   multiline={true}
//                   // onFocus={()=>setenableShift(false)}
//                   value={this.state.targTEXT}
//                   // placeholder=". . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . "
//                   onChangeText={targTEXT => this.setState({ targTEXT })}
//                 />
//               </View>
             
//               <TouchableOpacity
//               onPress={()=>{ this.picId(this.state.picIdlangue), this.saveTEXT(), this.setState({ create: false, idLan: '', idecat: '', addcat: true }) }}>
//                 <View
//                 style={{
//                   backgroundColor:'#EA1E69',
//                   width:wp('30%'),
//                   paddingLeft:10,
//                   paddingRight:10,
//                   height:40,
//                   alignSelf:'center',
//                   marginTop:hp('2%'),
//                   borderRadius:5,
//                   justifyContent:'center'
//                 }}>
//                     <Text
//                     style={{
//                       color:'white',
//                       textAlign:'center',
//                       fontSize:14
//                     }}>
//                       Enregistrer
//                     </Text>
//                 </View>
//               </TouchableOpacity>
//                     {/* 3 */}
                 
//                 </View>
//               </ScrollView>
//               <View
//                     style={{
//                       // backgroundColor:'white',
//                       height:hp('10%'),
//                       position:'absolute',
//                       bottom:10
//                     }}>
//                     <Footer
//                       OpenHome={() => this.openHome()}
//                       OpenPlus={() => this.openPlus()}
//                       Opensearch={() => this.openSearch()}
//                       Search = {true}
//                       OpenLink={() => this.OpenLink()}
//                     />
//                 </View>
//             </ScrollView>


//             {/* </KeyboardAvoidingView> */}

//           </Modal>
//           {/* MODAL create */}

//           <Modal
//             transparent={true}
//             animationType="slide"
//             visible={this.state.plus}>
//             <TouchableOpacity
//               onPress={() => this.setState({ plus: false })}
//               style={{
//                 width: wp('100%'),
//                 height: hp('100%'),
//                 backgroundColor: 'grey'
//               }}>

//               <View style={{ backgroundColor: '#F4F6FC', height: hp('30%'), width: wp('60%'), marginTop: hp('60%'), alignSelf: 'center' }}>
//                 <View
//                   style={{
//                     flexDirection: 'column',
//                     alignItems: 'center'
//                   }}
//                 >

//                   <TouchableOpacity
//                     // style={styles.buttadd}
//                     style={
//                       {
//                         flexDirection: 'row',
//                         alignItems: 'center',
//                         paddingLeft: wp('5%'),
//                         // justifyContent:'left',
//                         backgroundColor: 'white',
//                         height: hp('7%'),
//                         width: wp('55%'),
//                         margin: hp('1%'),
//                         borderRadius: 20,

//                       }
//                     }
//                     onPress={() => this.setState({ plus: false, create: true })}>
//                     <Icon name={'md-create'} size={30} color={'#FF6C46'}
//                       style={styles.icone}
//                     />
//                     <Text style={styles.textMod}>
//                     {I18n.t('new expression')}
//                                             </Text>
//                   </TouchableOpacity>
//                   <TouchableOpacity
//                     style={
//                       {
//                         flexDirection: 'row',
//                         alignItems: 'center',
//                         paddingLeft: wp('5%'),
//                         // justifyContent:'center',
//                         backgroundColor: 'white',
//                         height: hp('7%'),
//                         width: wp('55%'),
//                         margin: hp('1%'),
//                         borderRadius: 20,

//                       }
//                     }
//                     // style={styles.buttadd}
//                     onPress={() => this.setState({ plus: false, show1: true })}>
//                     <Icon name={'ios-mic'} size={30} color={'#FF6C46'}
//                       style={styles.icone}
//                     />
//                     <Text style={styles.textMod2}>
//                     {I18n.t('Add new audio')}
//                                     </Text>
//                   </TouchableOpacity>

//                   <TouchableOpacity
//                     // style={styles.buttadd}
//                     style={
//                       {
//                         flexDirection: 'row',
//                         alignItems: 'center',
//                         paddingLeft: wp('5%'),
//                         // justifyContent:'center',
//                         backgroundColor: 'white',
//                         height: hp('7%'),
//                         width: wp('55%'),
//                         margin: hp('1%'),
//                         borderRadius: 20,

//                       }
//                     }
//                     // this.props.navigation.navigate('camera')
//                     onPress={() => this.setState({ plus: false, videolang: true })}>
//                     <Icon name={'ios-camera'} size={30} color={'#FF6C46'}
//                       style={styles.icone} />
//                     <Text style={styles.textMod2}>
//                     {I18n.t('Record video and picture')}
//                                             </Text>
//                   </TouchableOpacity>
//                   <View
//                     style={{
//                       width: wp('60%'),
//                       height: hp('3.5%'),
//                       backgroundColor: 'grey',
//                       flexDirection: 'column',
//                       alignItems: 'center'
//                     }}>

//                     <View
//                       style={{
//                         width: 0,
//                         height: 0,
//                         backgroundColor: 'transparent',
//                         borderStyle: 'solid',
//                         borderLeftWidth: 7,
//                         borderRightWidth: 7,
//                         borderBottomWidth: 15,
//                         // borderTopWidth:43,
//                         borderLeftColor: 'transparent',
//                         borderRightColor: 'transparent',
//                         // borderTopColor:'red',
//                         borderBottomColor: "#F4F6FC",
//                         transform: [
//                           { rotate: '180deg' }
//                         ],

//                         // margin: 0,
//                         // marginLeft: -6,
//                         // borderWidth: 0,
//                         // borderColor:"black"
//                       }} />



//                   </View>


//                 </View>
//               </View>

//             </TouchableOpacity>


//             {/* </KeyboardAvoidingView> */}

//           </Modal>

//           {/* *** TEXT PLAYBACK AUDIO *** */}
//           <Modal
//             transparent={true}
//             animationType="slide"
//             visible={this.state.lectureV}>
//             <View style={{ backgroundColor: '#cce7e8', position: 'absolute', top: hp('35%'), left: wp('15%'), right: wp('15%'), with: wp('70%'), height: hp('35%'), borderRadius: 15 }}>
//               <View>
//                 <View style={{ backgroundColor: '#2f3c7e', height: hp('5%'), borderTopStartRadius: 15, borderTopEndRadius: 15 }}>
//                   <Text style={{ fontSize: hp('2.5%'), color: 'white', fontWeight: 'bold', textAlign: 'center' }}>
//                     Text playback audio
//                                            </Text>
//                 </View>
//                 <View style={{ fontSize: hp('3.2%'), backgroundColor: '#EFF4F5', justifyContent: 'center', fontWeight: 'bold', borderRadius: 30, borderWidth: 2, borderColor: 'grey', top: hp('3%') }}
//                   placeholder="Start Year">
//                   <Picker
//                     mode='dropdown'
//                     selectedValue={this.state.PickerValueHolder}
//                     onValueChange={(itemValue, itemIndex) => this.setState({ PickerValueHolder: itemValue })} >
//                     {this.state.dataSource.map((item, key) => (
//                       <Picker.Item label={item.intitule} value={item.abrev} key={key} />)
//                     )}
//                   </Picker>
//                 </View>
//                 <View style={{
//                   width: 150, top: hp('2%'), marginLeft: wp('15%')
//                 }}>
//                   <Text style={{ color: '#2f3c7e', fontSize: hp('3%'), fontWeight: 'bold' }}>
//                     speech rate
//                                            </Text>
//                   <Slider
//                     minimumValue={0.01}
//                     maximumValue={0.99}
//                     value={this.state.speechRate}
//                     onSlidingComplete={this.setSpeechRate}
//                   />
//                 </View>
//                 <View style={{ top: hp('4%'), flexDirection: 'row', alignItems: 'flex-end', }}>
//                   <TouchableOpacity style={{ width: wp('25%'), left: wp('12%'), height: hp('8%'), backgroundColor: 'grey', borderRadius: 5, alignItems: 'center' }}
//                     onPress={() => { this.mijanona(), this.setState({ lectureV: false, speechRate: 0.5 }) }}>
//                     <Text style={{ color: 'white', fontWeight: 'bold', fontSize: hp('3%'), top: hp('1%') }}>
//                       Close
//                         </Text>
//                   </TouchableOpacity>
//                   <View style={{ width: wp('13'), height: hp('8%'), marginLeft: wp('20%') }}>
//                     <TouchableOpacity style={{ width: wp('13%'), height: hp('8%'), borderRadius: 5, alignItems: 'center', }}
//                       onPress={() => { this.readText(this.state.textR), this.setState({ encours: true }) }}
//                     >
//                       <Icon name={'md-headset'} size={50.5}
//                       />
//                     </TouchableOpacity>
//                   </View>
//                 </View>
//               </View>
//             </View>
//           </Modal>
//           {/* *** TEXT PLAYBACK AUDIO *** */}


//           {/* *** user *** */}
//           <Modal
//             transparent={true}
//             animationType="fade"
//             visible={this.state.users}
//           >
//             <TouchableOpacity onPress={() => this.setState({ users: false })}
//               style={{ with: wp('100%'), height: hp('100%') }}>
//               <View style={{ top: hp('7%'), width: wp('30%'), marginLeft: wp('70%') }}>
//                 <View style={{ backgroundColor: '#2f3c7e', height: hp('6.5%'), borderWidth: 1, borderColor: 'white' }}>
//                   <TouchableOpacity
//                     onPress={() => {
//                       this.setState({ users: false }), this.props.navigation.navigate('User', {
//                         login1: this.state.login,
//                         nom1: this.state.nom1,
//                         prenom1: this.state.prenom1,
//                         email1: this.state.email1,
//                         tel1: this.state.tel1,
//                         adresse1: this.state.adresse1,
//                         cp1: this.state.cp1,
//                         ville1: this.state.ville1,
//                         password1: this.state.password1,
//                         id1: this.state.id
//                       })
//                     }}
//                     style={{
//                       flexDirection: 'row',
//                       alignSelf: 'center'
//                     }}
//                   >
//                     <Icon name={'ios-person-circle-outline'} size={20} color={'white'} />
//                     <Text style={{ color: 'white', fontSize: hp('2%'), textAlign: 'center', marginLeft: wp('3%') }}>My profil
//                                                       </Text>
//                   </TouchableOpacity>
//                 </View>
//                 <View style={{ backgroundColor: '#2f3c7e', height: hp('6.5%'), borderWidth: 1, borderColor: 'white' }}>
//                   <TouchableOpacity
//                     style={{
//                       flexDirection: 'row',
//                       alignSelf: 'center'
//                     }}
//                     onPress={() => { this.props.navigation.navigate('Login'), this.setState({ users: false }), this.removeUser() }}>
//                     <Icon name={'md-log-out'} size={20} color={'white'} />
//                     <Text style={{ color: 'white', fontSize: hp('2%'), textAlign: 'center', marginLeft: wp('3%') }}>Logout
//                                             </Text>
//                   </TouchableOpacity>
//                 </View>
//               </View>
//             </TouchableOpacity>
//           </Modal>
//           {/* *** user*** */}


//           {/* *** Modal player *** */}

//           <Modal
//             transparent={true}
//             animationType="slide"
//             visible={this.state.modalplayer}
//           >
//             <View
//               style={{
//                 justifyContent: 'center',
//                 alignItems: 'center',
//                 backgroundColor: 'white',
//                 width: wp('100%'),
//                 height: hp('100%'),
//                 // top:hp('20%'),
//               }}
//             >
//               <TouchableWithoutFeedback
//                 style={styles.fullScreen}
//                 onPress={() => this.onPressVideo()}>
//                 <Video
//                   ref={(ref: Video) => { this.video = ref }}
//                   /* For ExoPlayer */
//                   source={{ uri: base_url + '/portail-stagiaire/uploads_video/' + this.state.namefile }}
//                   // /var/www/html/portail-stagiaire/uploads_video
//                   // https://demo.forma2plus.com/portail-stagiaire/uploads_audio
//                   // source={require('./videos/tom_and_jerry_31.mp4')}
//                   style={styles.fullScreen}
//                   rate={this.state.rate}
//                   paused={this.state.paused}
//                   volume={this.state.volume}
//                   muted={this.state.muted}
//                   resizeMode={this.state.resizeMode}
//                   onLoad={this.onLoad}
//                   onProgress={this.onProgress}
//                   onEnd={this.onEnd}
//                   onAudioBecomingNoisy={this.onAudioBecomingNoisy}
//                   onAudioFocusChanged={this.onAudioFocusChanged}
//                   repeat={false}
//                 />
//               </TouchableWithoutFeedback>
//               {
//                 !this.state.hideControls ?
//                   (
//                     <View style={styles.controls}>
//                       <View style={styles.generalControls}>
//                         <View style={styles.rateControl}>
//                           <Picker
//                             style={{ width: 110 }}
//                             selectedValue={this.state.pickerValueHolder}
//                             onValueChange={(itemValue, itemIndex) => this.onChangeRate(itemValue, itemIndex)} >
//                             <Picker.Item label="x1.5" value="1.5" />
//                             <Picker.Item label="x1.25" value="1.25" />
//                             <Picker.Item label="x1.0" value="1.0" />
//                             <Picker.Item label="x0.75" value="0.75" />
//                             <Picker.Item label="x0.5" value="0.5" />
//                           </Picker>
//                         </View>
//                         <View style={styles.playControl}>
//                           <Text onPress={() => this.onPressBtnPlay()}>{this.state.pausedText}</Text>
//                         </View>
//                         <View style={styles.resizeModeControl}>
//                           <Picker
//                             style={{ width: 150 }}
//                             selectedValue={this.state.resizeMode}
//                             onValueChange={(itemValue, itemIndex) => this.setState({ resizeMode: itemValue })} >
//                             <Picker.Item label="none" value="none" />
//                             <Picker.Item label="cover" value="cover" />
//                             <Picker.Item label="stretch" value="stretch" />
//                             <Picker.Item label="contain" value="contain" />
//                           </Picker>
//                         </View>
//                       </View>

//                       <View style={styles.trackingControls}>
//                         {/* <ProgressBarAndroid
//                           style={styles.progress}
//                           styleAttr="Horizontal"
//                           indeterminate={false}
//                           progress={this.getCurrentTimePercentage()}
//                         /> */}
//                         <Text>{this.parseSecToTime(parseInt(this.state.currentTime))}/{this.parseSecToTime(parseInt(this.state.duration))}</Text>
//                       </View>
//                     </View>
//                   ) : (null)
//               }

//               {/* <TouchableOpacity style={{ width:wp('15%'), height:hp('4.5%'),backgroundColor:'grey',borderRadius:5,alignItems:'center'}}
          
//                     onPress={() => this.setState({modalplayer:false,namefile:''})}>
//                       <Text style={{color:'white'}}>
//                             Cancel
//                       </Text>
                      
//                   </TouchableOpacity> */}
//             </View>


//           </Modal>

//           {/* MODAL JITSI-MEET */}

//           <Modal
//             transparent={true}
//             animationType="slide"
//             visible={this.state.jitsi}>
//             <TouchableOpacity
//               onPress={() => this.setState({ jitsi: false })}
//               style={{
//                 width: wp('100%'),
//                 height: hp('100%'),
//                 backgroundColor: 'grey'
//               }}>

//               <View style={{ backgroundColor: '#F4F6FC', height: hp('20%'), width: wp('40%'), bottom: hp('15%'), right: wp('5%'), position: 'absolute' }}>
//                 <View
//                   style={{
//                     flexDirection: 'column',
//                     alignItems: 'center'
//                   }}
//                 >

//                   <TouchableOpacity
//                     // style={styles.buttadd}
//                     style={
//                       {
//                         flexDirection: 'row',
//                         alignItems: 'center',
//                         paddingLeft: wp('2.5%'),
//                         // justifyContent:'left',
//                         backgroundColor: 'white',
//                         height: hp('7%'),
//                         width: wp('35s%'),
//                         margin: hp('1%'),
//                         borderRadius: 20,

//                       }
//                     }
//                     onPress={() => this.OpenZoom()}>
//                     <Image style={{ width: 20, height: 20 }}
//                       source={require('../image/zoomicon.png')}>
//                     </Image>
//                     <Text style={styles.textMod}>
//                     Zoom
//                                             </Text>
//                   </TouchableOpacity>
//                   <TouchableOpacity
//                     // style={styles.buttadd}
//                     style={
//                       {
//                         flexDirection: 'row',
//                         alignItems: 'center',
//                         paddingLeft: wp('2.5%'),
//                         // justifyContent:'left',
//                         backgroundColor: 'white',
//                         height: hp('7%'),
//                         width: wp('35s%'),
//                         margin: hp('1%'),
//                         borderRadius: 20,

//                       }
//                     }
//                     // 'https://meet.jitsi.si'
//                     onPress={() => this.Openjitsi()}>
//                     <Image style={{ width: 30, height: 40 }}
//                       source={require('../image/logoJitsi.png')}>
//                     </Image>
//                     <Text style={styles.textMod}>
//                     Jitsi
//                                             </Text>
//                   </TouchableOpacity>
//                   <View
//                     style={{
//                       width: wp('60%'),
//                       height: hp('3.5%'),
//                       backgroundColor: 'grey',
//                       flexDirection: 'column',
//                       alignItems: 'center'
//                     }}>

//                     <View
//                       style={{
//                         width: 0,
//                         height: 0,
//                         backgroundColor: 'transparent',
//                         borderStyle: 'solid',
//                         borderLeftWidth: 7,
//                         borderRightWidth: 7,
//                         borderBottomWidth: 15,
//                         // borderTopWidth:43,
//                         borderLeftColor: 'transparent',
//                         borderRightColor: 'transparent',
//                         // borderTopColor:'red',
//                         borderBottomColor: "#F4F6FC",
//                         transform: [
//                           { rotate: '180deg' }
//                         ],

//                         // margin: 0,
//                         // marginLeft: -6,
//                         // borderWidth: 0,
//                         // borderColor:"black"
//                       }} />



//                   </View>


//                 </View>
//               </View>

//             </TouchableOpacity>


//             {/* </KeyboardAvoidingView> */}

//           </Modal>
//           {/* MODAL JITSI-MEET */}



//         </View>
        
//         <View
//           style={{
//             // backgroundColor:'#020D4D',
//             height:hp('10%'),
//             position:'absolute',
//             bottom:0
//           }}>
//                <Footer
//                 OpenHome={() => this.openHome()}
//                 OpenPlus={() => this.openPlus()}
//                 Opensearch={() => this.openSearch()}
//                 OpenLink={() => this.OpenLink()}
//                 Search = {true}
//               />
//           </View>
//       </KeyboardAvoidingView>
//     )
//   }
// }






// export default Accueil;
// // createAppContainer(tabnavigator);
// // const styles = StyleSheet.create({
// //   butV:{
// //     alignItems: 'center',
// //     justifyContent:'center',
// //     marginTop:hp('5%')
// //       }


// // })