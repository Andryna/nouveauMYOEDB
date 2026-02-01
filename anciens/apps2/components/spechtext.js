import React, {
  Component
} from 'react';

import {
  AppRegistry,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
  Picker,
  ProgressBarAndroid,
  TouchableOpacity,
  TouchableHighlight,
  ScrollView,
  Image,
  FlatList,
  Modal,
  TextInput,
  Keyboard
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Voice from 'react-native-voice'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {widthPercentageToDP, heightPercentageToDP} from 'react-native-responsive-screen';
import { PowerTranslator, ProviderTypes, TranslatorConfiguration, TranslatorFactory } from 'react-native-power-translator';
import config from '../../config.json';
import Tts from "react-native-tts";
import {Timer, Countdown} from 'react-native-element-timer';
import Footer from './footer/layouts/footer';
import I18n from 'react-native-i18n';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Fontawesome from 'react-native-vector-icons/FontAwesome';
import Add from './tools/modalViews/audio/statics/styles/styleAdd';
import en from '../../i18/en';
import fr from '../../i18/fr';
import es from '../../i18/es';
const base_url = config.base_url;
export default class Spechtext extends Component {
  static navigationOptions =
   {
    headerShown: false
   };

    constructor(props) {
        super(props);
        this.state = {
          isLoading:false,
          transcripting:false,
          isRecording: false,
          canDetectFaces: false,
          canDetectText: false,
          canDetectBarcode: false,
          faces: [],
          textBlocks: [],
          barcodes: [],
          pitch: '',
          error: '',
          cam:false,
          end: '',
          started: '',
          results: [],
          expres:'',
          users:false,
          stopBuser:false,
          picIdlangue:'',
          dataSource:this.props.navigation.state.params.dataSource,
          mot:[],
          targTEXT:'',
          // part:[],
          partialResults: [],
          id: this.props.navigation.state.params.id, //id stagiaire
          PickerValueHolder: this.props.navigation.state.params.idlangue, //PickerValueHolder na  id langue
          infolangue: this.props.navigation.state.params.PickerValueHolder, // juste pour info
          id1: this.props.navigation.state.params.id1, 
          login:this.props.navigation.state.params.login1,
          nom1:this.props.navigation.state.params.nom1,
          prenom1:this.props.navigation.state.params.prenom1,
          email1:this.props.navigation.state.params.email1,
          tel1:this.props.navigation.state.params.tel1,
          adresse1:this.props.navigation.state.params.adresse1,
          cp1:this.props.navigation.state.params.cp1,
          ville1:this.props.navigation.state.params.ville1,
          password1:this.props.navigation.state.params.password1,
          id_groupe:this.props.navigation.state.params.id_groupe,
          idecat:this.props.navigation.state.params.idecat,
          textimg:'',
          progress:0,
          startrec:false,
          plus:false,
          create:false,
          show1:false,
          addcat: true
        };
        Voice.onSpeechStart = this.onSpeechStart;
        Voice.onSpeechEnd = this.onSpeechEnd;
        Voice.onSpeechError = this.onSpeechError;
        Voice.onSpeechResults = this.onSpeechResults;
        Voice.onSpeechPartialResults = this.onSpeechPartialResults;
        Voice.onSpeechVolumeChanged = this.onSpeechVolumeChanged;
        this.timerRef = React.createRef();
      }
    
      speaking = () => {
        const { pickerValueHolder } = this.state;
        const { id } = this.state;
        console.log(this.state.idecat + ' ' + id);
        fetch(base_url + '/portail-stagiaire/langue.php', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            PickerValueHolder: pickerValueHolder
          })
    
        }).then((response) => response.json())
          .then((idlangue) => {
            if (idlangue == '') {
              alert('Data empty');
            }
            else {
              this.props.navigation.navigate('spechtext', {
                idlangue: idlangue.id,
                id: this.state.id,
                PickerValueHolder: this.state.pickerValueHolder,
                login1: this.state.login,
                nom1: this.state.nom1,
                prenom1: this.state.prenom1,
                email1: this.state.email1,
                tel1: this.state.tel1,
                adresse1: this.state.adresse1,
                cp1: this.state.cp1,
                ville1: this.state.ville1,
                password1: this.state.password1,
                id1: this.state.id,
                id_groupe: this.state.id_groupe,
                idecat: this.state.idecat,
                dataSource: this.state.dataSource
              });
              console.log('idcat:  '+this.state.idecat + '   idlang' + idlangue.id);
            }
          }).catch((error) => {
            console.error(error);
          });
      }


      LangaudioView = (id, intitule, index, abrev) => {
        const { idLan } = this.state;
        let colors = ['#FFE9F9', '#EAF9FE', '#FFF5E5'
          , '#FBF5FF', '#FFF1EF', '#A2A2A2'];
        if (id !== '') {
          if (idLan == id) {
            return (
              <TouchableOpacity 
                onPress={() => { this.setState({ idLan: '', pickerValueHolder: '',allang:false }) }}>
                <View style={{ alignItems: 'center', borderWidth: 0.5,borderColor:'white', borderRadius: 15, justifyContent: 'center', height:35 ,backgroundColor:'white', //ito
                }}>
                  <Text style={{
                      marginHorizontal: wp('3%'),
                      marginVertical: hp('0.5%'),
                      fontWeight: '400',
                      textAlign: 'center',
                      // opacity: 0.5,
                      fontSize:12,
                      color:'black'
                  }}>
                    {intitule}
                  </Text>
                  <View
                    style={{
                      width: wp('4.5%'),
                      height: hp('2.5%'),
                      borderRadius: 30,
                      position: 'absolute',
                      right: 0,
                      top: hp('-1%')
                    }}>
                    <Image style={{
                      width: wp('4.5%'),
                      height: hp('2.5%'),
                    }}
                      source={require('../image/Check-category.png')}>
                    </Image>
    
                  </View>
    
                  {/* {this.contentView(item.id_expression,item.content_langue_origine,item.content_langue_cible,item.audio_langue_origine,item.intitule,item.date_creation,item.f_name,item.type_file,item.legende_f)}          */}
                </View>
              </TouchableOpacity>
    
    
            );
          }
          else {
            return (
              <TouchableOpacity
                // style={{
                //   backgroundColor:'red'
                // }}
                onPress={() => { this.setState({ idLan: id, pickerValueHolder: abrev,allang:false }) }}>
                <View style={{ alignItems: 'center', borderRadius: 15, justifyContent: 'center', height:35 ,backgroundColor:'#0C1D65', //ito
                      }}>
                  <View
                    // style={{
                    //   // backgroundColor: colors[index % colors.length],
                    //   backgroundColor:'#0C1D65', //ito
                    //   borderRadius: 20
                    // }}
                    >
                    <Text style={{
                      marginHorizontal: wp('3%'),
                      marginVertical: hp('0.5%'),
                      fontWeight: '400',
                      textAlign: 'center',
                      // opacity: 0.5,
                      fontSize:12,
                      color:'white'
                    }}>
                      {intitule}
                    </Text>
                  </View>
                  {/* {this.contentView(item.id_expression,item.content_langue_origine,item.content_langue_cible,item.audio_langue_origine,item.intitule,item.date_creation,item.f_name,item.type_file,item.legende_f)}          */}
                </View>
              </TouchableOpacity>
    
    
            );
          }
    
        }
      }


      onSpeechStart = e => {
          //Invoked when .start() is called without error
          console.log('onSpeechStart: ', e);
          this.setState({
            started: '√',
          });
          this.timerRef.current.start();
        };
      
        onSpeechEnd = async (e) => {
      
          if(this.state.stopBuser==false){
                this.setState({mot:this.state.mot+' '+this.state.partialResults,partialResults:[]});
                // alert(this.state.partialResults);
                // alert(JSON.stringify(this.state.partialResults)); 
const speechRecognizerOptions = {
  RECOGNITION_TIMEOUT: 10000, // 10 secondes
  EXTRA_SPEECH_INPUT_COMPLETE_SILENCE_LENGTH_MILLIS: 60000,
  EXTRA_SPEECH_INPUT_POSSIBLY_COMPLETE_SILENCE_LENGTH_MILLIS: 60000,
  EXTRA_SPEECH_INPUT_MINIMUM_LENGTH_MILLIS: 20000,
};
      
           await Voice.start(this.state.infolangue,speechRecognizerOptions);
      
          }else{
            this.timerRef.current.stop();
            alert('stoped');
            
          }
        };
      
        onSpeechError = e => {
          //Invoked when an error occurs. 
          console.log('onSpeechError: ', e);
          this.setState({
            error: JSON.stringify(e.error),
          });
        };
      
        onSpeechResults = e => {
          //Invoked when SpeechRecognizer is finished recognizing
          console.log('onSpeechResults: ', e);
          this.setState({
            results: e.value,
          });
        };
      
        onSpeechPartialResults = e => {
          this.setState({ 
            mot:this.state.partialResults,
            partialResults:e.value,
          });
          // alert(JSON.stringify(this.state.partialResults));
        };
      
        onSpeechVolumeChanged = e => {
          //Invoked when pitch that is recognized changed
          console.log('onSpeechVolumeChanged: ', e);
          this.setState({
            pitch: e.value,
          });
        };
      
        _startRecognizing = async () => {
          //Starts listening for speech for a specific locale
          this.setState({
            pitch: '',
            error: '',
            started: '',
            results: [],
            partialResults: [],
            end: '',
            mot:[],
            stopBuser:false,
            startrec:true
          });
      
          try {
            const speechRecognizerOptions = {
              RECOGNITION_TIMEOUT: 100000, // 10 secondes
              EXTRA_SPEECH_INPUT_COMPLETE_SILENCE_LENGTH_MILLIS: 60000,
              EXTRA_SPEECH_INPUT_POSSIBLY_COMPLETE_SILENCE_LENGTH_MILLIS: 60000,
            };
            await Voice.start(this.state.infolangue,speechRecognizerOptions);
          } catch (e) {
            //eslint-disable-next-line
            console.error(e);
          }
        };
      
        _stopRecognizing = async () => {
          this.setState({stopBuser:true,startrec:false})
        //  alert(this.state.mot);
          //Stops listening for speech
          try {
            await Voice.stop();
          } catch (e) {
            //eslint-disable-next-line
            console.error(e);
          }
        };
      
        _cancelRecognizing = async () => {
          //Cancels the speech recognition
          try {
            await Voice.cancel();
          } catch (e) {
            //eslint-disable-next-line
            console.error(e);
          }
        };
      
        _destroyRecognizer = async () => {
          //Destroys the current SpeechRecognizer instance
          try {
            await Voice.destroy();
          } catch (e) {
            //eslint-disable-next-line
            console.error(e);
          }
          this.setState({
            pitch: '',
            error: '',
            started: '',
            results: [],
            partialResults: [],
            end: '',
          });
        };
      
        save = () =>
        { 
          
          const {mot}=this.state; 
        const{targTEXT}=this.state;
            this.setState({ ActivityIndicator_Loading : true }, () =>
            {
                fetch(base_url + '/portail-stagiaire/save2.php',
                {
                    method: 'POST',
                    headers: 
                    {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(
                    {
                      id:this.state.id, 
                      expres:mot.toString(),
                      // expres:expres,
                      traduction:targTEXT,
                      PickerValueHolder:this.state.PickerValueHolder.id,
      
                    })
      
                }).then((response) => response.json()).then((reponse) =>
                {
                  alert(reponse);
                  this.setState({ ActivityIndicator_Loading : false });
                }).catch((error) =>
                {
                    console.error(error);
                    this.setState({ ActivityIndicator_Loading : false});
                });
            });
        }
      
        langue(){
           const {partialResults}=this.state; 
          alert(partialResults);
          // this.props.navigation.navigate('Accueil',id)
        }
      
        getPicker = () => {
          // const{page,seed}=this.state;
        fetch(base_url + '/portail-stagiaire/picker.php',{
                headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json',
                }
              }
             )
                .then((response) => response.json())
                .then((responseJson) => {
                  this.setState({
                    isLoading: false,
                    dataSource: responseJson
                  })
                })
                .catch((error) => {
                  console.error(error);
                }); 
      
        } 
      trans = (itemValue) =>{
        console.log(itemValue.substring(0,2));
        if(itemValue!=''){
              this.setState({picIdlangue:itemValue});
              const mylang = itemValue.substring(0,2);
              if(mylang =='en'){
                console.log(this.state.expres+'_%_'+itemValue.substring(0,2));
                TranslatorConfiguration.setConfig(ProviderTypes.Google, config.googleCloud.apiKey,itemValue.substring(0,2));
                // config.googleCloud.apiKey
                const translator = TranslatorFactory.createTranslator();
                translator.translate(this.state.mot.toString()).then(translated => {
                      Tts.setDefaultLanguage(itemValue);
                        Tts.speak(translated,{
                          iosVoiceId: 'com.apple.ttsbundle.Moira-compact',
                          rate: 0.4,
                        });
                        this. setState({targTEXT:translated})
                });
              }else if (mylang == "fr"){
                console.log(this.state.expres+'_%_'+itemValue.substring(0,2));
                TranslatorConfiguration.setConfig(ProviderTypes.Google, config.googleCloud.apiKey,itemValue.substring(0,2));
                // config.googleCloud.apiKey
                const translator = TranslatorFactory.createTranslator();
                translator.translate(this.state.mot.toString()).then(translated => {
                      Tts.setDefaultLanguage(itemValue);
                        Tts.speak(translated,{
                          iosVoiceId: 'com.apple.ttsbundle.siri_Marie_fr-FR_compact',
                          rate: 0.4,
                        });
                        this. setState({targTEXT:translated})
                });
              } else if (mylang == 'es'){
                console.log(this.state.expres+'_%_'+itemValue.substring(0,2));
                TranslatorConfiguration.setConfig(ProviderTypes.Google, config.googleCloud.apiKey,itemValue.substring(0,2));
                // config.googleCloud.apiKey
                const translator = TranslatorFactory.createTranslator();
                translator.translate(this.state.mot).then(translated => {
                      Tts.setDefaultLanguage(itemValue);
                        Tts.speak(translated,{
                          iosVoiceId: 'com.apple.ttsbundle.Monica-compact',
                          rate: 0.4,
                        });
                        this. setState({targTEXT:translated})
                });
              }
             
             }else {
               alert('This option is not available');
          }
      }
      
        handleTranslate = (itemValue) => {
          console.log(itemValue.substring(0,2));
      }
      readinText = () =>{
        alert(this.state.mot)
        Tts.setDefaultLanguage('fr');
              Tts.speak(this.state.mot.toString());
       }
       readinTranslation = () =>{
        Tts.setDefaultLanguage('en');
              Tts.speak(this.state.targTEXT.toString());
       }

      reecouter(){
        Tts.setDefaultLanguage(this.state.picIdlangue.substring(0,2));
        const mylang2 = this.state.picIdlangue.substring(0,2);
        Tts.stop();
        if(mylang2 =='en'){
          console.log(this.state.expres+'_%_'+itemValue.substring(0,2));
          TranslatorConfiguration.setConfig(ProviderTypes.Google, config.googleCloud.apiKey,itemValue.substring(0,2));
          // config.googleCloud.apiKey
          const translator = TranslatorFactory.createTranslator();
          translator.translate(this.state.mot).then(translated => {
                Tts.setDefaultLanguage(itemValue);
                  Tts.speak(translated,{
                    iosVoiceId: 'com.apple.ttsbundle.Moira-compact',
                    rate: 0.4,
                  });
                  this. setState({targTEXT:translated})
          });
        }else if (mylang2 == "fr"){
          console.log(this.state.expres+'_%_'+itemValue.substring(0,2));
          TranslatorConfiguration.setConfig(ProviderTypes.Google, config.googleCloud.apiKey,itemValue.substring(0,2));
          // config.googleCloud.apiKey
          const translator = TranslatorFactory.createTranslator();
          translator.translate(this.state.mot).then(translated => {
                Tts.setDefaultLanguage(itemValue);
                  Tts.speak(translated,{
                    iosVoiceId: 'com.apple.ttsbundle.siri_Marie_fr-FR_compact',
                    rate: 0.4,
                  });
                  this. setState({targTEXT:translated})
          });
        } else if (mylang2 == 'es'){
          console.log(this.state.expres+'_%_'+itemValue.substring(0,2));
          TranslatorConfiguration.setConfig(ProviderTypes.Google, config.googleCloud.apiKey,itemValue.substring(0,2));
          // config.googleCloud.apiKey
          const translator = TranslatorFactory.createTranslator();
          translator.translate(this.state.mot).then(translated => {
                Tts.setDefaultLanguage(itemValue);
                  Tts.speak(translated,{
                    iosVoiceId: 'com.apple.ttsbundle.Monica-compact',
                    rate: 0.4,
                  });
                  this. setState({targTEXT:translated})
          });
        }

      }
    

      LangView=(id,intitule,index,abrev)=>{
          const {idLan}=this.state;
          let colors = ['#FFE9F9', '#EAF9FE', '#FFF5E5', '#FBF5FF','#FFF1EF','#A2A2A2'];
          if (id!== ''){
        if (idLan==id){
        return(
          <TouchableOpacity
          onPress={()=>{this.setState({idLan:''},this.trans(abrev))}}>
                          <View style={{flexDirection:'row',alignItems:'center',backgroundColor:'#DBDDDC',borderWidth:0.5,borderRadius:20,justifyContent:'center'}}>
                                                                <Text style={{
                                                                  marginHorizontal:wp('3%'),
                                                                  marginVertical:hp('0.5%'),
                                                                  fontWeight:'100',
                                                                  textAlign:'center',
                                                                  opacity:0.5
                                                                }}>
                                                                  {intitule}
                                                                </Text>
                                                                <View
                                                                style={{
                                                                  width:wp('4.5%'),
                                                                  height:hp('2.5%'),
                                                                  borderRadius:30,
                                                                  position:'absolute',
                                                                  right:0,
                                                                  top:hp('-1%')
                                                                }}>
                                                                  <Image style={{
                                                    width:wp('4.5%'),
                                                    height:hp('2.5%'),
                                                  }}
                                                              source={require('../image/Check-category.png')}>
                                                  </Image>
        
                                                                </View>
                                                            
                                                              {/* {this.contentView(item.id_expression,item.content_langue_origine,item.content_langue_cible,item.audio_langue_origine,item.intitule,item.date_creation,item.f_name,item.type_file,item.legende_f)}          */}
                          </View>
        </TouchableOpacity>
                                                            
                                                            
        );
        }
        else{
        return(
          <TouchableOpacity
          // style={{
          //   backgroundColor:'red'
          // }}
          onPress={()=>{this.setState({idLan:id}),this.trans(abrev)}}>
                          <View style={{alignItems:'center',borderWidth:0.5,borderRadius:20,justifyContent:'flex-start'}}>
                                                                <View
                                                                style={{
                                                                  backgroundColor:colors[index % colors.length],
                                                                  borderRadius:20 
                                                                }}>
                                                                <Text style={{
                                                                  marginHorizontal:wp('3%'),
                                                                  marginVertical:hp('0.5%'),
                                                                  fontWeight:'100',
                                                                  textAlign:'center',
                                                                  opacity:0.5
                                                                }}>
                                                                  {intitule} {abrev}
                                                                </Text>
                                                                </View>
                                                              {/* {this.contentView(item.id_expression,item.content_langue_origine,item.content_langue_cible,item.audio_langue_origine,item.intitule,item.date_creation,item.f_name,item.type_file,item.legende_f)}          */}
                          </View>
        </TouchableOpacity>
                                                            
                                                            
        );
        }
        }
        }
        openPlus() {
          this.setState({plus:true});
         }
         openHome() {
          this.props.navigation.navigate('Accueil');
         }

      render() {
          const{stopBuser,path}=this.state;
          const {isLoading}=this.state;
          const {transcripting}=this.state;
        return (
          <View style={styles.container}>
              
              
              {/* header */}
              <View style={{ justifyContent: 'center', height: hp('8.5%'),width:wp('100%'), marginTop: hp('2.5%') ,marginBottom:-hp('2.5%'),backgroundColor:'#0C1D65'}}>
          <View
            style={{ height: hp('4%'), width: wp('100%'), flexDirection: 'row', justifyContent: 'space-between' }}>
            <TouchableOpacity
              onPress={() => {this.setState({ listexpres: false, iconHeader: true ,imagedetails:false}),this.openHome()}}>
              <View
                style={{
                  flexDirection: 'row',
                  // backgroundColor:'white'
                }}>
                  <Icon name={"arrow-back-outline"} size={25} color="white"
                  style={{alignSelf:'center'}}
                 />
                {this.state.iconHeader ? (<Text style={{
                  color: 'white',
                  marginLeft: wp('1%'),
                  fontSize: hp('2.2%'),
                  position: 'absolute',
                  bottom: -4
                }}>
                 {/* {I18n.t('home')} */}
                </Text>) : (

                    <View><Text style={{
                          color: 'white',
                          marginLeft: wp('15%'),
                          fontSize: hp('2.2%'),
                          textAlign:'center'

                        }}>
                          {/* {I18n.t('ALL EXPRESSIONSs')} */}
                          TRANSCRIPTION EN TEMPS REELS
                        </Text>
                    </View>)}
              </View>
            </TouchableOpacity>
            <View >
            </View>
          </View>
        </View>
              {/* header */}
              <View
            style={{
              // backgroundColor:'white',
              height:35,
              width:wp('90%'),
              alignSelf:'center',
              flexDirection:'row',
              justifyContent:'space-around',
              marginTop:hp('3%')
            }}>
                <TouchableOpacity
                  onPress={() => {this.trans('fr-FR')}}>
                  <View style={{ flexDirection: 'row', alignItems: 'center', height:35, borderWidth:0.5, paddingLeft:15,paddingRight:15, borderColor: '#5C4DB1', borderRadius: 15, justifyContent: 'center' }}>
                      <Text style={{
                        marginHorizontal: wp('3%'),
                        marginVertical: hp('0.5%'),
                        fontWeight: '400',
                        fontSize:14,
                        textAlign: 'center',
                        // opacity: 0.5,
                        color:'white'
                      }}>
                        FRANÇAIS
                      </Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity
                onPress={() => alert('test')}
                >
                    <Icon name="swap-horizontal-outline" size={30} color="white"
                    style={{
                      // transform: [{ rotate: '90deg'}]
                    }}
                    />
                </TouchableOpacity>
                
                <TouchableOpacity
                  onPress={() => {this.trans('en-US')}}>
                  <View style={{ flexDirection: 'row', alignItems: 'center', height:35, borderWidth:0.5, paddingLeft:15,paddingRight:15, borderColor: '#5C4DB1', borderRadius: 15, justifyContent: 'center' }}>
                      <Text style={{
                        marginHorizontal: wp('3%'),
                        marginVertical: hp('0.5%'),
                        fontWeight: '400',
                        fontSize:14,
                        textAlign: 'center',
                        // opacity: 0.5,
                        color:'white'
                      }}>
                        ANGLAIS
                      </Text>
                    </View>
                </TouchableOpacity>
            </View>



                <View 
                style={[styles.container]}
                >
        {/* <Text style={styles.instructions}>
          Press mike to start and speak after the Bip/Appuyer le micro pour commencer et parler apres le Bip
        </Text> */}
      
      <View
      style={{
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        marginTop:hp('2%'),
        width:wp('90%')
      }}>


            <Text
                  style={{
                          fontSize:14,
                          // marginLeft:wp('5%'),
                          // opacity:0.5,
                          color:'white',
                          // marginTop:hp('3%')
                          }}>
                        VOTRE DISCOURS
            </Text>
            <TouchableOpacity 
              style={{width:wp('8%')}}
              onPress={() =>this.readinText()}
            >
                  <Icon name={'ios-volume-high'} size={30} 
                        color={'#EA1E69'}  
                  />
            </TouchableOpacity>
      </View>


       <View
       style={{height:hp('20%'),backgroundColor:'white'}}>
              <ScrollView style={{borderWidth:0.2,width:wp('95%'),height:hp('10%')}}>

                <Text style={{color:'red',opacity:0, display:'none'}}>{this.state.mot}</Text>

                {this.state.partialResults.map((result, index) => {
                return (
                  <View>
                    {!this.state.stopBuser?(<Text
                    key={`partial-result-${index}`}
                    style={{
                      textAlign: 'center',

                      fontSize:hp('1.5%'),
                  
                      marginBottom: 1,
                      fontWeight: '500',
                      color:'green'
                    }}>
                    {result}

                    
                  </Text>):(
                  <TextInput
                    placeholder="your text"
                    value={this.state.mot.toString()}
                    onChangeText={mot => this.setState({mot})}
                    // key={`partial-result-${index}`}
                    multiline={true}
                    // numberOfLines={6}
                  />
                  )}
                  </View>
                  
                );
                })}

                </ScrollView>
       </View>
      <View
      style={{
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        marginTop:hp('2%'),
        width:wp('90%')
      }}>


            <Text
                  style={{
                          fontSize:14,
                          // marginLeft:wp('5%'),
                          // opacity:0.5,
                          color:'white',
                          // marginTop:hp('3%')
                          }}>
                        TRADUCTION
            </Text>
            <TouchableOpacity 
              style={{width:wp('8%')}}
              onPress={() =>this.readinTranslation()}
            >
                  <Icon name={'ios-volume-high'} size={30} 
                        color={'#EA1E69'}  
                  />
            </TouchableOpacity>
      </View>
        <View
         style={{flexDirection:'row',top:hp('1%'),display:'none'}}
        >
                  <View
                  style={{
                  marginVertical:hp('0%'),
                  marginLeft:wp('5%'),
                  }}>
                              <FlatList
                              data={this.state.dataSource}
                              extraData={this.state}
                              keyExtractor={(item)=>item.id}
                              refreshing={this.state.refreshing}
                              horizontal={true}
                              onRefresh={this.handleRefresh}
                              enableEmptySections={true}
                              renderSeparator= {this.ListViewItemSeparator}
                              renderItem={({item,index})=>
                              <View style={{flexDirection:'column',justifyContent:'center',marginRight:wp('2%'),height:hp('7.2%'),
                              paddingBottom:hp('1%')}}>
                              {this.LangView(item.id,item.intitule,index,item.abrev)}
                              </View>
                              }
                              />
                  </View>

         
          </View>
<View style={{borderWidth:0.2,top:5,width:wp('95%'),height:hp('20%'),backgroundColor:'white'}}>
              {/* <Text
              style={{fontSize:14,textAlign:'justify'}}
              >
                {this.state.targTEXT}
                
              </Text> */}
              <TextInput
                    placeholder="your translated text"
                    value={this.state.targTEXT.toString()}
                    onChangeText={targTEXT => this.setState({targTEXT})}
                    // key={`partial-result-${index}`}
                    multiline={true}
                    // numberOfLines={6}
                  />
             
                  <View
                style={{alignItems:'center'}}
                >
                  {isLoading?
                    (
                    <View
                    style={{alignItems:'center'}}
                    >
                    <Spinner  color={'#C9A022'} size={75} type={'Wave'} />
                    <Text
                    style={{fontSize:14,bottom:hp('2%'),fontWeight:'bold'}}
                    >
                    Uploading expression
                    </Text>
                    </View>
                    ):(null)
                  }
                  
                </View>

</View>
{!this.state.stopBuser?( <View
style={{
flexDirection:'row',
marginTop:hp('2%'),
alignSelf:'center'
// position:'absolute',
// right:wp('5%')
}}>
          <Timer
            ref={this.timerRef}
            formatTime = "hh:mm:ss"
            textStyle={{color:"white",fontSize:30}}
            onTimes={e => {}}
            onPause={e => {}}
            onEnd={e => {}}
        />
    
</View>):null}




<View style={{marginTop:hp('1%')}}>
  {/* { stopBuser ?  ( */}
    {!stopBuser ? (<View
    style={{
      // backgroundColor:'white',
      width:wp('60%'),
      alignSelf:'center',
      flexDirection:'row',
      justifyContent:'space-between',
      alignItems:'center'
    }}>
        {this.state.startrec?
        (<TouchableHighlight
          onPress={() =>this._stopRecognizing()}
          style={{width:60,height:60,backgroundColor:'white',borderRadius:50,justifyContent:'center',alignItems:'center'}}
          
        >
        <Icon name={'ios-pause'} size={40} 
                color={'#55C3D1'}  
                  />
        </TouchableHighlight>):
        (<TouchableHighlight
          onPress={() =>this. _startRecognizing()}
          style={{width:60,height:60,backgroundColor:'#EA1E69',borderRadius:50,justifyContent:'center',alignItems:'center'}}
          
        >
        <Icon name={'ios-mic'} size={40} 
                color={'white'}  
                  />
        </TouchableHighlight>)
        }
       {this.state.startrec?( <TouchableHighlight
          onPress={() =>{this._stopRecognizing()}}
          style={{width:50,height:50,backgroundColor:'white',borderRadius:50,justifyContent:'center',alignItems:'center'}}
        >
        <Icon name={'stop'} size={25} 
                color={'#55C3D1'}  
                  />
          </TouchableHighlight>):(<TouchableHighlight
          onPress={() =>{this._stopRecognizing()}}
          style={{width:50,height:50,backgroundColor:'white',borderRadius:50,justifyContent:'center',alignItems:'center'}}
        >
        <Icon name={'stop'} size={25} 
                color={'grey'}  
                  />
          </TouchableHighlight>)}
    </View>):null}
  

</View>
              <View style={{flexDirection:'row',display:'none'}}>
                      <View
                      style={{
                        // backgroundColor:'red',
                        width:wp('50%'),
                        height:hp('15%'),
                        position:'absolute',
                        top:hp('8%'),
                        right:0,                   
                        marginLeft:wp('12%'),
                        

                      }}
                      >
                        <Image
                          source={{ uri: this.state.path,isStatic:true }}
                          style={{width:wp('50%'), height:hp('15%'),marginLeft:wp('3%')}}
                        />
                      </View>
                        <View>
                                    {path?(
                                    <View>
                                    
                                    <TouchableOpacity 
                                                style={{
                                                  position:'absolute',
                                                  top:hp('18%'),
                                                  marginLeft:wp('14%'),
                                                  flexDirection:'row',
                                                  alignItems:'center'
                                                }}
                                                onPress={() =>this.setState({sendPic:true})}>
                                                <MaterialIcons name={'comment'} size={30} color={'#2f3c7e'}
                                                style={styles.icone} />
                                                <Text style={styles.textMod}>
                                                  Comment
                                                </Text> 
                                    </TouchableOpacity>

                                              </View>):(null)} 
                        </View>
              </View>

        {/* <Text style={styles.stat}>Intuitive list/Liste intituive</Text> */}
        <ScrollView style={{ marginBottom:heightPercentageToDP('20%'),opacity:0 }}>
          {this.state.results.map((result, index) => {
            return (
              <Text key={`result-${index}`} style={styles.stat}>
                {result}here
              </Text>
            );
          })}
        </ScrollView>
      </View>
     {this.state.stopBuser?( <View style={{
        flexDirection:'row',
        position:'absolute',
        bottom:hp('15%')
      }}>
          <TouchableOpacity style={{width:wp('40%'), height:hp('10%'),backgroundColor:'#DC4F89',borderRadius:10,alignItems:'center',justifyContent:'center'}}
              disabled={this.state.mot ==''}
              onPress={() =>this.save()}
              >
                        <Text style={{color:'white',fontWeight: 'bold',fontSize:hp('2%')}}>
                                          ENRESTRER
                        </Text>
            </TouchableOpacity>
            <TouchableOpacity style={{marginLeft:wp('5%'),width:wp('40%'), height:hp('10%'),backgroundColor:'#55C3D1',borderRadius:10,alignItems:'center',justifyContent:'center'}}
              // disabled={this.state.mot ==''}
              onPress={() =>this.setState({stopBuser:false})}
              >
                        <Text style={{color:'white',fontWeight: 'bold',fontSize:hp('2%')}}>
                                          NOUVEAU
                        </Text>
            </TouchableOpacity>
      </View>):null}
     
      <View
        style={{
          // backgroundColor:'#0C1D65',
          position:'absolute',
          bottom:0
          // height:hp('20%')
        }}>
             <Footer
              OpenHome={() => this.openHome()}
              OpenPlus={() => this.openPlus()}
              Opensearch={() => this.openSearch()}
              Search = {false}
              OpenLink={() => this.OpenLink()}
            />
        </View> 

{/* 
create
*/}



{/* 
create
*/}


        <Modal 
  transparent={true}
  animationType="slide"
  visible={this.state.plus}>
    <TouchableOpacity
    onPress={()=>this.setState({plus:false})}
    style={{
      width:wp('100%'),
      height:hp('100%'),
      backgroundColor:'grey'
    }}>
            
            <View style={{backgroundColor:'#F4F6FC',height:hp('30%'),width:wp('60%'),marginTop:hp('60%'),alignSelf:'center'}}>
            <View
                       style={{
                         flexDirection:'column',
                         alignItems:'center'
                       }}
                       >  
                      
                              <TouchableOpacity 
                                          // style={styles.buttadd}
                                          style={
                                            {
                                              flexDirection:'row',
                                              alignItems:'center',
                                              paddingLeft:wp('5%'),
                                              // justifyContent:'left',
                                              backgroundColor:'white',
                                              height:hp('7%'),
                                              width:wp('55%'),
                                              margin:hp('1%'),
                                              borderRadius:20,
          
                                            }
                                              }
                                          onPress={() => this.setState({create:true,plus:false})}>
                                          <Icon name={'md-create'} size={30} color={'#FF6C46'}
                                          style={styles.icone}
                                          />
                                          <Text style={styles.textMod}>
                                           new expression
                                          </Text> 
                              </TouchableOpacity> 
                              <TouchableOpacity 
                                 style={
                                  {
                                    flexDirection:'row',
                                    alignItems:'center',
                                    paddingLeft:wp('5%'),
                                    // justifyContent:'center',
                                    backgroundColor:'white',
                                    height:hp('7%'),
                                    width:wp('55%'),
                                    margin:hp('1%'),
                                    borderRadius:20,

                                  }
                                    }
                                  // style={styles.buttadd}
                                  onPress={() => this.setState({show1:true,plus:false})}>
                                  <Icon name={'ios-mic'} size={30} color={'#FF6C46'}
                                 style={styles.icone}
                                  />
                                  <Text style={styles.textMod2}>
                                    Add new audio
                                  </Text>  
                              </TouchableOpacity> 
                              
                              <TouchableOpacity 
                                          // style={styles.buttadd}
                                          style={
                                            {
                                              flexDirection:'row',
                                              alignItems:'center',
                                              paddingLeft:wp('5%'),
                                              // justifyContent:'center',
                                              backgroundColor:'white',
                                              height:hp('7%'),
                                              width:wp('55%'),
                                              margin:hp('1%'),
                                              borderRadius:20,
          
                                            }
                                              }
                                              // this.props.navigation.navigate('camera')
                                          onPress={() => this.setState({videolang:true})}>
                                          <Icon name={'ios-camera'} size={30} color={'#FF6C46'}
                                          style={styles.icone}/> 
                                          <Text style={styles.textMod2}>
                                            Record video and picture
                                          </Text> 
                              </TouchableOpacity>
                              <View
                              style={{
                                width:wp('60%'),
                                height:hp('3.5%'),
                                backgroundColor:'grey',
                                flexDirection:'column',
                                alignItems:'center'
                              }}>
                               
                                <View
                                style={{
                                  width: 0,
      height: 0,
      backgroundColor: 'transparent',
      borderStyle: 'solid',
      borderLeftWidth: 7,
      borderRightWidth: 7,
      borderBottomWidth: 15,
      // borderTopWidth:43,
      borderLeftColor: 'transparent',
      borderRightColor: 'transparent',
      // borderTopColor:'red',
      borderBottomColor:"#F4F6FC",
      transform: [
          { rotate: '180deg' }
      ],
      }}/>
                                        


                              </View>
                             

  </View>
            </View>
            
      </TouchableOpacity>
      
      
    {/* </KeyboardAvoidingView> */}
      
  </Modal>

  <Modal
          transparent={true}
          animationType="slide"
          visible={this.state.create}>
          <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
              <View
                style={{
                  width: wp('100%'),
                  height: hp('100%'),
                  backgroundColor:'#020D4D',
                  flex:1
                }}>
                <View>
                    {/* 
                    header
                    */}
                    <View style={{ justifyContent: 'center', height: hp('8.5%'),width:wp('100%'), marginTop: hp('2.5%') ,backgroundColor:'#0C1D65'}}>
              <View
                style={{ height: hp('4%'), width: wp('100%'), flexDirection: 'row', justifyContent: 'space-between' }}>
                <TouchableOpacity
                  onPress={() => {this.setState({ create: false, idLan: '', idecat: '', addcat: true }) }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      // backgroundColor:'white'
                    }}>
                      <Icon name={"arrow-back-outline"} size={25} color="white"
                      style={{alignSelf:'center',marginLeft:5}}
                    />
                    <Text style={{
                      color: 'white',
                      marginLeft: wp('23%'),
                      fontSize: hp('2.2%'),
                      textAlign:'center'

                      }}>
                      TRANSCRIPTION
                      </Text>
                  </View>
                </TouchableOpacity>
                {this.state.iconHeader? (<View style={{
                    flexDirection: 'row',
                    position: 'absolute',
                    right: wp('25%'),
                    top:10
                  }}>
                <Text style={{ marginLeft: wp('2%'), fontSize: hp('2%'),color:'white' }}>
                  {this.state.login.charAt(0).toUpperCase() + this.state.login.substring(1).toLowerCase()}
                </Text>
                </View>):null}
                {this.state.iconHeader?(<View
                  style={{
                    flexDirection: 'row',
                    position: 'absolute',
                    top:10,
                    right: wp('15%')
                  }}>
                  <Image style={{
                    width: 20,
                    height: 20,
                  }}
                    source={require('../image/Avatar-23.png')}>
                  </Image>
                </View>):null}
                {this.state.iconHeader?(<TouchableOpacity
                  onPress={() => this.clearAllData()}
                  style={{
                    flexDirection: 'row',
                    position: 'absolute',
                    right: wp('5%')
                  }}>
                  <View>
                    <Icon name="log-out-outline" size={30} color="white" />
                  </View>
                </TouchableOpacity>):null}
              </View>
            </View>
                    {/* Header */}
                    {/*  container */}
                    <View
            style={{
              // backgroundColor:'white',
              height:35,
              width:wp('90%'),
              alignSelf:'center',
              flexDirection:'row',
              justifyContent:'space-around',
              marginTop:hp('3%')
            }}>
                <TouchableOpacity
                  onPress={() => {alert('français'),this.handleTranslate('fr')}}>
                  <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: 'white',height:35, borderWidth:0.5, paddingLeft:15,paddingRight:15, borderColor: '#5C4DB1', borderRadius: 15, justifyContent: 'center' }}>
                      <Text style={{
                        marginHorizontal: wp('3%'),
                        marginVertical: hp('0.5%'),
                        fontWeight: '400',
                        fontSize:14,
                        textAlign: 'center',
                        opacity: 0.5
                      }}>
                        Français
                      </Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity
                onPress={() => alert('test')}
                >
                    <Icon name="swap-horizontal-outline" size={30} color="white"
                    style={{
                      // transform: [{ rotate: '90deg'}]
                    }}
                    />
                </TouchableOpacity>
                
                <TouchableOpacity
                  onPress={() => {alert('Anglais'),this.handleTranslate('en')}}>
                  <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: 'white',height:35, borderWidth:0.5, paddingLeft:15,paddingRight:15, borderColor: '#5C4DB1', borderRadius: 15, justifyContent: 'center' }}>
                      <Text style={{
                        marginHorizontal: wp('3%'),
                        marginVertical: hp('0.5%'),
                        fontWeight: '400',
                        fontSize:14,
                        textAlign: 'center',
                        opacity: 0.5
                      }}>
                        Anglais
                      </Text>
                    </View>
                </TouchableOpacity>
            </View>

            <View
            style = {{
              flexDirection:'row',
              justifyContent:'space-between',
              alignItems:'',
              alignSelf:'center',
              width:wp('90%'),
              // backgroundColor:'red',
              marginTop:hp('5%')
            }}>
                  <Text
                  style = {{
                      color:'white',
                      fontSize:14
                  }}>
                      VOTRE DISCOURS
                  </Text>
                  <TouchableOpacity
                  onPress={()=>this.readinText(this.state.expres,'fr')}
                  style={{
                    width:wp('20%')
                  }}>
                      <Icon name={"volume-medium-outline"} size={25} color="#EA1E69"
                          style={{alignSelf:'flex-end',marginLeft:5}}
                      />
                  </TouchableOpacity>
            </View>
            {/* <View
            style={{
              backgroundColor:'white',
              width:wp('90%'),
              height:hp('20%'),
              alignSelf:'center',
              borderRadius:5
            }}> */}
                <TextInput
                      ref={input => { this.textInput = input }}
                      // style={{ fontSize: hp('1.5%'), width: wp('90%'), marginLeft: wp('5%'), opacity: 0.7 }}
                      style={{
                        backgroundColor:'white',
                        width:wp('90%'),
                        height:hp('20%'),
                        alignSelf:'center',
                        borderRadius:5
                      }}
                      multiline={true}
                      // placeholderTextColor={'grey'}
                      underlineColorAndroid='#5C4DB1'
                      // placeholder=""
                      onChangeText={expres => this.setState({ expres })}
                    />
            {/* </View> */}
            <View
            style = {{
              flexDirection:'row',
              justifyContent:'space-between',
              alignItems:'',
              alignSelf:'center',
              width:wp('90%'),
              // backgroundColor:'red',
              marginTop:hp('5%')
            }}>
                  <Text
                  style = {{
                      color:'white',
                      fontSize:14
                  }}>
                      TRADUCTION
                  </Text>
                  <TouchableOpacity
                  onPress={()=>this.readinText(this.state.targTEXT,'en')}
                  style={{
                    width:wp('20%')
                  }}>
                      <Icon name={"volume-medium-outline"} size={25} color="#EA1E69"
                          style={{alignSelf:'flex-end',marginLeft:5}}
                      />
                  </TouchableOpacity>
            </View>
            <TextInput
                  ref={input => { this.textInput = input }}
                  // style={{ fontSize: hp('1.5%'), opacity: 0.7, width: wp('90%'), marginLeft: wp('5%'), marginVertical: hp('1%') }}
                  style={{
                    backgroundColor:'white',
                    width:wp('90%'),
                    height:hp('20%'),
                    alignSelf:'center',
                    borderRadius:5
                  }}
                  placeholderTextColor={'grey'}
                  multiline={true}
                  // onFocus={()=>setenableShift(false)}
                  value={this.state.targTEXT}
                  underlineColorAndroid='#5C4DB1'
                  // placeholder=". . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . "
                  onChangeText={targTEXT => this.setState({ targTEXT })}
                />
            <TouchableOpacity
            onPress={()=>{ this.picId(this.state.picIdlangue), this.saveTEXT(), this.setState({ create: false, idLan: '', idecat: '', addcat: true }) }}>
              <View
              style={{
                backgroundColor:'#EA1E69',
                width:wp('30%'),
                paddingLeft:10,
                paddingRight:10,
                height:40,
                alignSelf:'center',
                marginTop:hp('2%'),
                borderRadius:5,
                justifyContent:'center'
              }}>
                  <Text
                  style={{
                    color:'white',
                    textAlign:'center',
                    fontSize:14
                  }}>
                    Enregistrer
                  </Text>
              </View>
            </TouchableOpacity>
                    {/*  container */}
            </View>
            <View
            style={{
              // backgroundColor:'white',
              height:hp('10%'),
              position:'absolute',
              bottom:10
            }}>
                <Footer
                  OpenHome={() => this.openHome()}
                  OpenPlus={() => this.openPlus()}
                  Opensearch={() => this.openSearch()}
                  Search = {true}
                  OpenLink={() => this.OpenLink()}
                />
            </View>
        
          </View>
          </TouchableWithoutFeedback>

          {/* </KeyboardAvoidingView> */}

        </Modal>


{/* *** RECORD AUDIO*** */}
<Modal
          transparent={true}
          animationType="slide"
          visible={this.state.show1}>
          {/* <View style={{backgroundColor:'#cce7e8',position: 'absolute', top:hp('20'), left:wp('10%'), right:wp('10%'),alignItems: 'center',with:wp('80%'),height:hp('24%'),flex:1,borderRadius:15,borderColor:'#2f3c7e'}}>
                        <View style={{backgroundColor:'#2f3c7e',height:hp('5%'),width:wp('80%'),borderTopEndRadius:15,borderTopStartRadius:15}}>
                            <Text style={{fontSize:hp('2.5%'),color:'white',textAlign:'center'}}>
                                      Please choose your recording language
                            </Text>
                        </View> 
                        <View  style={{fontSize:hp('3.2%'),borderRadius:30,borderWidth:2,width:wp('60%'),height:hp('5%'),borderColor:'grey',backgroundColor:'#EFF4F5',top:hp('3%'),justifyContent:'center'}}>
                            <Picker
                            mode='dropdown'
                            selectedValue={this.state.PickerValueHolder}
                            onValueChange={(itemValue, itemIndex) => this.setState({PickerValueHolder: itemValue})} >
                            <Picker.Item label={'Select language'} value=""/>
                            { this.state.dataSource.map((item, key)=>(
                            <Picker.Item label={item.intitule} value={item.abrev}  key={key} />)
                            )}
                            </Picker>
                        </View> 
                        <View  style={{ top:hp('6%'),flexDirection:'row', alignItems:'flex-end',}}>
                            <TouchableOpacity style={{ width:wp('15%'), height:hp('4.5%'),backgroundColor:'red',borderRadius:5,alignItems:'center'}}
                            onPress={() => this.setState({show1:false})}>
                            <Text style={{color:'white'}}>
                                              Cancel
                            </Text>
                            </TouchableOpacity> 
                        <TouchableOpacity style={{width:wp('15%'), height:hp('4.5%'),marginLeft:wp('15%'),backgroundColor:'blue',borderRadius:5,alignItems:'center',}}
                        onPress={() =>{this.setState({show1:false,addnew:false}),this.ecouter()}}>
                            <Text style={{color:'white'}}>

                                              Record
                            </Text>
                        </TouchableOpacity>
                        </View>
            </View> */}

          <ScrollView
            style={{
              width: wp('100%'),
              height: hp('100%'),
              backgroundColor: '#020D4D'
              // backgroundColor:'red'
            }}>
            <View style={{ justifyContent: 'center', height: hp('10%'),width:wp('100%'), paddingTop: hp('2.5%') ,marginBottom:-hp('2.5%'),backgroundColor:'#0C1D65'}}>
          <View
            style={{ height: hp('4%'), width: wp('100%'), flexDirection: 'row', justifyContent: 'space-between' }}>
            <TouchableOpacity
              onPress={() => this.setState({ listexpres: false, iconHeader: true ,imagedetails:false,show1: false, idecat: '', idLan: '', expres: '', targTEXT: '', all: false, addcat: true, pickerValueHolder: ''})}>
              <View
                style={{
                  flexDirection: 'row',
                  // backgroundColor:'white'
                }}>
                  <Icon name="arrow-back-outline" size={30} color="white" />
              
               <Text style={{
                  color: 'white',
                  marginLeft: wp('45%'),
                  fontSize: hp('2.2%'),
                  position: 'absolute',
                  // bottom: -4,

                }}>
                 AUDIO
                </Text>
              </View>
            </TouchableOpacity>
            
            {/* <View
              style={{
                flexDirection:'row',
                position:'absolute',
                right:wp('5%')
              }}>
                        <Image style={{
                          width:wp('5%'),
                          height:hp('3%'),
                        }}
                                    source={require('../image/notification.png')}>
                        </Image>
                   
              </View> */}
            <View >
              {/* <TouchableOpacity style={{width:wp('12%'),height:hp('6%'),bottom:hp('3%'),marginLeft:wp('85%'),backgroundColor:'white',justifyContent:"center",borderRadius:10}}
              onPress={() => this.setState({users:true})}>
              <Image style={{width:wp('8.5%'),height:hp('5%'),alignSelf:'center'}}
                          source={require('../image/grid-view-icon-27.jpg')}>
              </Image> 
              </TouchableOpacity>  */}
            </View>
          </View>
        

          </View>
            <View
            style={{
              height:35,
              width:wp('95%'),
              borderWidth:0.3,
              borderColor:'white',
              borderTopLeftRadius:30,
              borderBottomLeftRadius:30,
              borderRightWidth:0,
              // backgroundColor:'white',
              alignSelf:'flex-end',
              justifyContent:'center',
              marginTop:hp('14%'),
              flexDirection:'row'
            }}>
                  <Icon name={'radio-outline'} size={20} color={'#EA1E69'} style={{
                    // marginLeft:20
                    position:'absolute',
                    left:20,
                    top:7
                  }}/>
                  <Text style={{
                    color:'white',
                    fontSize:14,
                    position:'absolute',
                    left:70,
                    top:7
                  }}>
                    {I18n.t('Record')}
                  </Text>

            </View>
            <View
            style={{
              flexDirection:'row',
              justifyContent:'space-between',
              width:wp('90%'),
              marginTop:hp('5%'),
              alignSelf:'center'

            }}>
              <Text
              style={{color:'white',fontSize:14}}>Langue</Text>
              <TouchableOpacity
              // onPress={()=>alert('test')}  eto 
              onPress={() => this.setState({ allang: !this.state.allang })}
              >
                 {!this.state.allang ? (
                      <Text
                        style={{
                          fontSize: 14,
                          opacity: 0.5,
                          color:'white'

                        }}>
                        {I18n.t('See all')}
                      </Text>) : (
                      <Icon name={'ellipsis-horizontal-outline'} size={25} color={'white'} />)}
              </TouchableOpacity>
            </View>
            <ScrollView style={{  height: hp('60%'), width: wp('100%'), borderRadius: 15, marginTop: hp('1.5%') }}>
              <View>
                {/* <View
                  style={{
                    flexDirection: 'row',
                    marginTop: hp('3%'),
                    marginBottom: hp('1%'),
                    marginLeft: wp('5%')
                  }}>
                  <View
                    style={{
                      flexDirection: 'column'
                    }}>
                    <Text
                      style={{
                        color: '#5C4DB1',
                        fontSize: hp('2%')
                      }}>
                      audio record
                                                </Text>
                    <View
                      style={{
                        borderWidth: 1,
                        borderColor: '#DC4F89'
                      }} />
                  </View>
                  <Text
                    style={{
                      color: '#5C4DB1',
                      fontWeight: 'bold',
                      marginLeft: wp('1%'),
                      fontSize: hp('2%')
                    }}>
                    audio
                                      </Text>
                </View> */}

                {/* <View
                  style={{
                    flexDirection: 'row'
                  }}>
                  <Text
                    style={{
                      fontSize: hp('1.5'),
                      marginLeft: wp('5%'),
                      opacity: 0.5
                    }}>
                    {I18n.t('Your recording language')}
                                                    </Text>
                  <View
                    style={{
                      right: wp('5%'),
                      position: 'absolute'
                    }}>
                    <TouchableOpacity
                      onPress={() => this.setState({ allang: !this.state.allang })}>
                      {!this.state.allang ? (<Text
                        style={{
                          fontSize: hp('1.5%'),
                          opacity: 0.5,

                        }}>
                        {I18n.t('See all')}
                      </Text>) : (
                          <Icon name={'ellipsis-horizontal-outline'} size={25} color={'black'} />)}
                    </TouchableOpacity>
                  </View>
                </View> */}

                <View style={{ fontSize: hp('3.2%'), fontWeight: 'bold', borderColor: 'grey' }}>

                  <View style={{
                    // backgroundColor:'red',
                    justifyContent: 'center'
                  }}>
                    {!this.state.allang ? (
                      <View
                        style={{
                          marginVertical: hp('1%'),
                          marginLeft: wp('5%'),
                        }}>
                        <FlatList
                          data={this.state.dataSource}
                          extraData={this.state}
                          keyExtractor={(item) => item.id}
                          refreshing={this.state.refreshing}
                          horizontal={true}
                          // numColumns={3}
                          onRefresh={this.handleRefresh}
                          enableEmptySections={true}
                          renderSeparator={this.ListViewItemSeparator}
                          renderItem={({ item, index }) =>
                            <View style={{
                              flexDirection: 'column', justifyContent: 'center', marginRight: wp('2%'), height: hp('7.2%'),
                              paddingBottom: hp('1%')
                            }}>
                              {this.LangaudioView(item.id, item.intitule, index, item.abrev)}
                            </View>
                          }
                        />



                      </View>) :
                      (
                        <View>
                          <View
                            style={{
                              // marginVertical:hp('1%'),
                              marginLeft: wp('5%')
                            }}>
                            <FlatList
                              data={this.state.dataSource}
                              extraData={this.state}
                              keyExtractor={(item) => item.id}
                              refreshing={this.state.refreshing}
                              horizontal={false}
                              numColumns={4}
                              onRefresh={this.handleRefresh}
                              enableEmptySections={false}
                              renderSeparator={this.ListViewItemSeparator}
                              renderItem={({ item, index }) =>
                                <View style={{
                                  flexDirection: 'column', justifyContent: 'space-evenly', height: hp('7.2%'),
                                  paddingBottom: hp('0.6%'), marginRight: wp('2%')
                                }}>
                                  {this.categoryView(item.id, item.intitule, index)}
                                </View>
                              }
                            />
                          </View>
                        </View>
                      )}
                  </View>
                  <View
                    style={{
                      flexDirection: 'row'
                    }}>
                    <Text
                      style={{
                        fontSize: 14,
                        marginLeft: wp('5%'),
                        color:'white'
                      }}>
                      CATEGORIE
                                                  </Text>
                    <View
                      style={{
                        right: wp('5%'),
                        position: 'absolute'
                      }}>
                      <TouchableOpacity
                        onPress={() => this.setState({ all: !this.state.all })}>
                        {!this.state.all ? (<Text
                          style={{
                            fontSize: 14,
                            // opacity: 0.5,
                            color:'white'

                          }}>
                          {I18n.t('See all')}
                        </Text>) : (
                            <Icon name={'ellipsis-horizontal-outline'} size={25} color={'white'} />)}
                      </TouchableOpacity>
                    </View>
                  </View>
                  <View style={{
                    // backgroundColor:'red',
                    justifyContent: 'center',
                    flexDirection:'row',
                    marginTop:hp('5%')
                  }}>

{this.state.addcat ? (
                    <View
                      style={{
                        borderWidth: 0.5,
                        borderRadius: 15,
                        backgroundColor: '#62CAD6',
                        width: wp('10%'),
                        justifyContent: 'center',
                        alignItems: 'center',
                        height: 35,
                        // marginLeft: wp('5%')
                      }}>
                      <TouchableOpacity
                        onPress={() => this.setState({ addcat: false })}>
                        <Icon name={'add-outline'} size={25} color={'white'} />
                      </TouchableOpacity>
                    </View>
                  ) : (<View
                    style={{
                      flexDirection: 'row'
                    }}>

                    <View>
                      <TextInput
                        style={{
                          fontSize: hp('1.5%'), height: 35,
                          width: wp('70%'),
                          borderWidth: 0.2,
                          marginLeft: wp('5%'),
                          backgroundColor: '#E4E6E5',
                          borderRadius: 20,
                          paddingLeft: wp('5%'),
                          justifyContent: 'center',
                          alignItems: 'center'
                        }}
                        underlineColorAndroid='transparent'
                        onChangeText={categ => this.setState({ categ })}
                        placeholder={I18n.t('Enter your new category name')}

                      />

                    </View>

                    <View
                      style={{
                        height: 35,
                        width: wp('17.5%'),
                        marginLeft: wp('2.5%'),
                        borderRadius: 20,
                        backgroundColor: '#5C4DB1',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}>
                      <TouchableOpacity
                        disabled={this.state.categ == ''}
                        onPress={() => { this.setState({ addcat: true }), this.saveCat() }}>
                        <Text
                          style={{
                            color: 'white',
                            fontSize: hp('1.5%'),
                            textAlign: 'center'
                          }}>
                          {I18n.t('Add')}
                                                  </Text>
                      </TouchableOpacity>

                    </View>
                  </View>)}



                    {!this.state.all ? (
                      <View
                        style={{
                          // marginVertical: hp('1%'),
                          marginLeft: wp('5%'),
                          // backgroundColor:'white',
                          width:wp('75%')
                        }}>
                        <FlatList
                          data={this.state.cat}
                          extraData={this.state}
                          keyExtractor={(item) => item.id}
                          refreshing={this.state.refreshing}
                          horizontal={true}
                          // numColumns={3}
                          onRefresh={this.handleRefresh}
                          enableEmptySections={true}
                          renderSeparator={this.ListViewItemSeparator}
                          renderItem={({ item, index }) =>
                            <View style={{
                              flexDirection: 'column', justifyContent: 'center', marginRight: wp('2%'), height: 35,
                              // paddingBottom: hp('1%')
                            }}>
                              {this.categoryView(item.id, item.intitule, index)}
                            </View>
                          }
                        />



                      </View>) :
                      (
                        <ScrollView
                        style={{
                          height:hp('30%')
                        }}>
                          <View
                            style={{
                              // marginVertical:hp('1%'),
                              marginLeft: wp('5%'),
                              width:wp('75%'),

                            }}>
                            <FlatList
                              data={this.state.cat}
                              extraData={this.state}
                              keyExtractor={(item) => item.id}
                              refreshing={this.state.refreshing}
                              horizontal={false}
                              numColumns={3}
                              onRefresh={this.handleRefresh}
                              enableEmptySections={false}
                              renderSeparator={this.ListViewItemSeparator}
                              renderItem={({ item, index }) =>
                                <View style={{
                                  flexDirection: 'column', justifyContent: 'center', height: hp('7.2%'),
                                  paddingBottom: hp('0.6%')
                                }}>
                                  {this.categoryView(item.id, item.intitule, index)}
                                </View>
                              }
                            />
                          </View>
                        </ScrollView>
                      )}

                  </View>

                  
                  <View style={{ flexDirection: 'row' ,alignItems:'center'}}>
                    <TouchableOpacity style={[Add.rec, {width:wp('43%'),
                    height:hp('12%'),
                    borderRadius:5,
                    backgroundColor:'#EA1E69'
                    }]}
                      disabled={this.state.pickerValueHolder == ''}
                      onPress={() => { this.setState({ show1: false, addnew: false, plus: false }), this.ecouter() }}
                    // onPress={() =>alert('record audio')}
                    >
                      <MaterialIcons name={'record-voice-over'} size={25} color={'white'} />
                      <Text style={[Add.textRec,{marginTop:hp('2%'),fontWeight:'400'}]}>
                      {I18n.t('record audio')}
                                                                                </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[Add.real,{width:wp('43%'),height:hp('12%'),
                    borderRadius:5,
                    backgroundColor:'#62CAD6'
                  }]}
                      onPress={() => { this.setState({ show1: false, addnew: false, plus: false }), this.speaking() }}
                    >
                      <Fontawesome name={'file-audio-o'} size={25} color={'white'} />
                      <Text style={[Add.textReal ,{marginTop:hp('2%'), color:'white', fontWeight:'400'}]}>
                      {I18n.t('REAL-TIME TRANSCRIPTION')}
                                                    </Text>
                    </TouchableOpacity>
                    
                  </View>

                <View    style={[styles.butV,{marginTop:hp('5%')}]}>
                      <TouchableOpacity 
                      style={styles.butNew}
                      onPress={() => this.setState({ show1: false, idecat: '', idLan: '', expres: '', targTEXT: '', all: false, addcat: true, pickerValueHolder: '' })}>
                        {/* this.props.navigation.navigate('Accueil') 
                        this.connecter()*/}
                        {/* <Text style={styles.buttext}>
                        {I18n.t('login')}
                        </Text> */}
                        <Icon name={"arrow-back-outline"} size={35} color={'white'}
                            style={styles.inputIcon}
                            />
                      </TouchableOpacity>  
                  </View>
                  {/* <TouchableOpacity style={{ width: wp('0%'), height: hp('5%'), marginLeft: wp('5%'), borderRadius: 30, alignItems: 'center', marginTop: hp('1%'), justifyContent: 'center', marginBottom: hp('5%') }}
                      onPress={() => this.setState({ show1: false, idecat: '', idLan: '', expres: '', targTEXT: '', all: false, addcat: true, pickerValueHolder: '' })}>
                      <Text style={{ fontWeight: 'bold',fontSize:hp('1.5%') }}>
                      {I18n.t('CANCEL')}
                                                                                </Text>
                    </TouchableOpacity> */}
                </View>
              </View>
            </ScrollView>
            <View
        style={{
          backgroundColor:'#020D4D',
          // height:hp('20%'),
          position:'absolute',
          bottom:-hp('5%')
        }}>
             <Footer
              OpenHome={() => {this.openHome(),this.setState({show1: false})}}
              OpenPlus={() => {this.openPlus(),this.setState({show1: false})}}
              Opensearch={() => {this.openSearch(),this.setState({show1: false})}}
              Search = {true}
              OpenLink={() => {this.OpenLink(),this.setState({show1: false})}}
            />
        </View>
          </ScrollView>
        </Modal>
        {/* *** RECORD AUDIO*** */}

          </View>
        );
      }
    }

    const styles = StyleSheet.create({
        container: {
          flex: 1,
          alignItems: 'center',
          backgroundColor:'#020D4D'
        },
        butV:{
          alignItems: 'center',
          justifyContent:'center',
          // marginTop:hp('5%')
            },
            butNew:{
              borderRadius:27,
              backgroundColor:'#EA1E69',
              color:'white',
              justifyContent:'center',
              alignItems:'center',
              height:hp('6%'),
              width: wp('15%'),
              }
      });
