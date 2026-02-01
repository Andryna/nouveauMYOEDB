import React, { Component } from 'react';
import { View, Text, TouchableOpacity, ImageBackground, Modal, TextInput, ScrollView,Animated,Alert,Keyboard, Image, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Svg, { Path } from 'react-native-svg';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Homelayout from '../../layouts/Homelayout';
import ModalLayout from '../../layouts/ModalLayout';
import RectButton from '../buttons/RectButton';
import Tts from "react-native-tts";
import { PowerTranslator, ProviderTypes, TranslatorConfiguration, TranslatorFactory } from 'react-native-power-translator';
import config from '../../../config.json';
const base_url = config.base_url;
import { connect,useDispatch } from 'react-redux';
import { fetchData } from '../../actions/expressions';
import { details } from '../../../styles/styleAcuueil';
import {Timer, Countdown} from 'react-native-element-timer';
import AudioRecord from 'react-native-audio-record';
import {check,request,PERMISSIONS,RESULTS} from 'react-native-permissions';
import Sound from 'react-native-sound';
import RNFS from 'react-native-fs';
import axios from 'axios';
import { Picker } from '@react-native-picker/picker';
import AddButton from '../buttons/AddButton';
import { getCat } from '../../actions/category';
import { saveCat } from '../../utils/request';
// import config from '../../../config.json';


class TextModalsIMG extends Component {
  constructor(props) {
    super(props);
    this.state = {
      trad:false,
      langue:'en-US',
      original_langue: 'fr-FR',
      target_langue: 'en-US',
      targ_lang_id: '1',
      HorizontalLine1:details.horizontalLine,
      showRecorder:true,
      recording:false,
      stoped:false,
      savedAudio:false,
      formattedTime: '00:00',
      inPlay:false,
      hasPermission: false,
      expres:'',
      infolangue:'fr-FR',
      isDropdownVisible: false,
      isDropdownVisibleOrig:false,
      newcat: false,
      inputCat: '',
      inputDesc:'',
      selectedCategory:this.props.category[0].id
      // Vos états
    };
    this.fadeAnim = new Animated.Value(1);
    this.timerRef = React.createRef();
    this.sound = null;
  }

  saveCat = () => {
    const { userInfo, getCat, category } = this.props;
    const { inputCat, inputDesc } = this.state;

    this.setState({ ActivityIndicator_Loading: true });

    saveCat(inputCat, inputDesc, userInfo, getCat)
      .then((reponse) => {
        
        console.log(this.props.category);
        this.setState({selectedCategory: this.props.category[0].id});
        this.setState({
          category: this.props.category,
          ActivityIndicator_Loading: false
        });
      })
      .catch((error) => {
        this.setState({ ActivityIndicator_Loading: false });
      });
  };
  componentDidMount(){
    this.startBlinking();
    this.checkPermission();
    const options = {
      sampleRate: 32000,
      channels: 1,
      bitsPerSample: 16,
      audioSource: 6,
      wavFile: 'test.wav',
    };
    AudioRecord.init(options);
    AudioRecord.on('data', data => {
    });
    console.log("erenea atob", this.props.category);
    // alert(config.googleCloud.apiKey);
    const {userInfo} = this.props;
    console.log(userInfo.id_groupe);
    this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this._keyboardDidShow);
    // Ajouter un écouteur pour détecter quand le clavier est fermé
    this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this._keyboardDidHide);
    Tts.addEventListener('tts-start', this.onTtsStart);
    Tts.addEventListener('tts-finish', this.onTtsFinish);
    Tts.addEventListener('tts-cancel', this.onTtsCancel);
    Tts.setDefaultVoice('com.apple.ttsbundle.Samantha-compact');
  }
  componentWillUnmount() {
    // Supprimer les écouteurs du clavier lors du démontage du composant
    this.keyboardDidShowListener.remove();
    this.keyboardDidHideListener.remove();
    
    // Supprimer les gestionnaires d'événements
    if (this.ttsStartListener) {
      this.ttsStartListener.remove();
    }
    if (this.ttsFinishListener) {
      this.ttsFinishListener.remove();
    }
    if (this.ttsCancelListener) {
      this.ttsCancelListener.remove();
    }
    
  }
  onTtsStart = (event) => {
    console.log('TTS Start', event);
  };

  onTtsFinish = (event) => {
    console.log('TTS Finish', event);
  };

  onTtsCancel = (event) => {
    console.log('TTS Cancel', event);
  };
  _keyboardDidShow = () => {
    this.setState({ isKeyboardOpen: true});
    console.log('Clavier ouvert', 'Le clavier est maintenant ouvert.');
  };

  // Fonction appelée lorsque le clavier est fermé
  _keyboardDidHide = () => {
    this.setState({ isKeyboardOpen: false});
    console.log('Clavier fermé', 'Le clavier est maintenant fermé.');
    if(this.state.expres){
      this.setState({trad:true});
      this.handleTranslate(this.state.langue);
    }
  };

  checkPermission = async () => {
    try {
      const result = await check(PERMISSIONS.IOS.MICROPHONE);
      if (result === RESULTS.GRANTED) {
        this.setState({ hasPermission: true });
      } else {
        this.requestPermission();
      }
    } catch (error) {
      Alert.alert('Permission check error', error.message);
    }
  };

  requestPermission = async () => {
    try {
      const result = await request(PERMISSIONS.IOS.MICROPHONE);
      this.setState({ hasPermission: result === RESULTS.GRANTED });
    } catch (error) {
      Alert.alert('Permission request error', error.message);
    }
  };
  startBlinking = () => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(this.fadeAnim, {
          toValue: 0,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(this.fadeAnim, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
      ])
    ).start();
  };
  handleTranslate = (itemValue) => {
    if (itemValue != '') {

      this.setState({ picIdlangue: itemValue });
      // console.log(this.state.expres+'_%_'+itemValue.substring(0,2));
      TranslatorConfiguration.setConfig(ProviderTypes.Google, config.googleCloud.apiKey, itemValue.substring(0, 2));
      // config.googleCloud.apiKey
      const translator = TranslatorFactory.createTranslator();
      translator.translate(this.state.expres).then(translated => {
        Tts.setDefaultLanguage(itemValue);
        // Tts.speak(translated);
        this.setState({ targTEXT: translated, trad:true })
      });
    } else {
      alert('This option is not available');
    }
  }
  readText = async (phrase, langue) => {
    Tts.setDefaultLanguage(langue);
    Tts.stop();
    Tts.speak(phrase);
  };
  speakTxt = async () => {
    const {langue, expres, infolangue} = this.state;
    // alert(expres);
      this.readText(expres, infolangue);
    
  }
  
  speakTrad = async () => {
    const {langue, targTEXT, target_langue} = this.state;
    // alert(targTEXT);
    alert(target_langue);
      this.readText(targTEXT, target_langue);
  }

  saveTEXT = () => {
    Tts.stop();
    const { idL } = this.state;
    const { pic, infolangue } = this.state;
    const { expres } = this.state;
    const { id } = this.state;
    const { targTEXT,langue,selectedCategory } = this.state;
    const { userInfo } = this.props;
  
    console.log(idL + ' ' + 'langue: '+langue+ ' ' + pic + ' ' + expres + ' ' + id + ' ' + targTEXT + '' + this.state.pic);
    // console.log('groupe', id_groupe);
    if (this.state.langue === 'en-US'){
      this.setState({langueSource:'fr'});
    }else{
      this.setState({langueSource:'en'});
    }
    
    

      this.setState({ ActivityIndicator_Loading: true}, () => {
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
                id: userInfo.id,
                expres: expres,
                traduction: targTEXT,
                PickerValueHolder: this.state.targ_lang_id,
                id_groupe:userInfo.id_groupe,
                idecate: selectedCategory,
                langue:infolangue.substring(0, 2)
              })
          }).then((response) => response.json()).then((reponse) => {
            console.log('rep',reponse);
            this.setState({audioFile:null, stoped:false})
            // alert('saved');
            this.props.dispatchfetchData(userInfo.id)
            .then(() => {
              this.props.save();
              this.props.navigation.navigate('ExpressionList',{'id_groupe':userInfo.id_groupe});
              this.setState({expres:'', targTEXT:''});
            })

            // this.props.dispatchfetchData(userInfo.id);
            // this.getData();
            // this.setState({ ActivityIndicator_Loading: false, targTEXT: '', expres: '', pic: '' });
          }).catch((error) => {
            console.error(error);
            this.setState({ ActivityIndicator_Loading: false });
          });
      });
  }
  transcript = async () => {
    // alert('transcription');
    this.setState({ transcripts: true, transcribed: false, expres:'transcription en cours'});
    const { userInfo } = this.props;
    const url = base_url + "/portail-stagiaire/upaudio.php";
    const { audioFile } = this.state;
    const path = audioFile;
    const { langue, infolangue, idLan } = this.state;

    const formData = new FormData();
    formData.append('id_stag', userInfo.id);
    formData.append('targL', '1');
    formData.append('infolangue', infolangue);
    formData.append('id_groupe', userInfo.id_groupe);
    formData.append('recording', {
        uri: path,
        name: 'teste.wav',
        type: 'audio/wav',
    });
    console.log('Path:', path);
    console.log('FormData:', formData);
    try {
        const response = await axios.post(url, formData, {
            headers: {
                Accept: 'application/json',
                'Content-Type': 'multipart/form-data',
            },
            onUploadProgress: progressEvent => {
              if (progressEvent.total) {
                const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                console.log('Upload Progress:', percentCompleted, '%');
                if (percentCompleted < 100) {
                  this.setState({ percentCompleted: percentCompleted });
                }
              } else {
                console.log('progressEvent.total is null or undefined');
              }
            }
        })
        .then((resp) => {
          // const {audioFile,idecate,transaudio,targTEXT,id_groupe,duration,infolangue}=this.state;
          // const Picker=this.state.idLan;
          // const tosend = {
          //   id_stag:userInfo.id,
          //   targL:Picker,
          //   infolangue:infolangue,
          //   idecate:idecate,
          //   id_groupe:userInfo.id_groupe,
          //   transaudio:transaudio,
          //   targTEXT:null,
          //   pathaudio:resp.data.audio,
          //   duration:duration
          // }
          // console.log(tosend);
          this.setState({trad:true,transcripts:false,expres:resp.data.result,pathaudio:resp.data.audio,percentCompleted:'100',transcribed:true});
          this.handleTranslate(this.state.langue);
          console.log(this.state.resp);
          }) 
        } catch (err) {
          console.log('Error:', err);
        }
};
writeTexte(){
  this.setState({
    stateText2: details.ActiveTextButton,
    stateText: details.DisabledTextButton,
    HorizontalLine1:'',
    HorizontalLine2:details.horizontalLine,
    showRecorder:false,
    expres:'',
    targTEXT:''
  }, async () => {
    // console.log("STATS .....................");
    console.log('write');
    // alert('record voice chosed');
  });
}
  recordVoice(){
    this.setState({
      stateText2: details.DisabledTextButton,
      stateText: details.ActiveTextButton,
      HorizontalLine1:details.horizontalLine,
      HorizontalLine2:'',
      showRecorder:true,
      expres:'',
      targTEXT:''
      // recording:true
    }, async () => {
      // console.log("STATS .....................");
      console.log('record voice chosed');
    });
  }

  startRec = () => {
    this.timerRef.current.stop();
    if (this.state.hasPermission) {
      this.setState({
        recording: true,
        stoped: false,
        savedAudio: false,
        audioFile:null,
        expres:'...'
      }, () => {
        if (!AudioRecord) {
          console.log('AudioRecord n\'est pas initialisé');
          return;
        }
        AudioRecord.start();
        this.timerRef.current.start();
        console.log('record voice started');
      });
    } else {
      Alert.alert('Permission required', 'Microphone permission is required to record audio.');
    }
  };

  stopRec = async () => {
    
    this.timerRef.current.pause();
    this.startBlinking();
    if (!this.state.recording) return;

    try {
      console.log('Stopping record...');
      if (!AudioRecord) {
        console.log('AudioRecord is not initialized');
        return;
      }

      let audioFile = await AudioRecord.stop();
      console.log('Audio file:', audioFile);

      this.setState({
        audioFile,
        recording: false,
        stoped: true,
        expres:'efa niova ny texte'
      }, async () => {
        RNFS.stat(audioFile)
          .then(res => {
            const fileSizeInBytes = res.size;
            const resp = {
              path: audioFile,
              size: fileSizeInBytes,
              fileName: 'test.wav',
              type: 'audio/wav',
            };
            console.log('resp', resp);
            this.setState({
              response: resp
            });
          })
          .catch(error => {
            console.error('Erreur lors de la lecture de la taille du fichier:', error);
          });

        const sound = new Sound(audioFile, '', (error) => {
          if (error) {
            console.log('failed to load the sound', error);
            return;
          }
          const duration = sound.getDuration();
          const hours = Math.floor(duration / 3600);
          const minutes = Math.floor((duration - (hours * 3600)) / 60);
          const seconds = Math.floor(duration - (hours * 3600) - (minutes * 60));
          const formattedHours = hours.toString().padStart(2, '0');
          const formattedMinutes = minutes.toString().padStart(2, '0');
          const formattedSeconds = seconds.toString().padStart(2, '0');
          const audiotime = `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
          this.setState({ duration: audiotime, durationInSeconds: duration });
          console.log(audiotime);
        });
        await this.transcript();
      });
    } catch (error) {
      console.error('Error stopping recording:', error);
    }
  };

  load = () => {
    return new Promise((resolve, reject) => {
      // if (!this.state.audioFile) {
      //   return reject('file path is empty');
      // }

      this.sound = new Sound(this.state.audioFile, '', error => {
        if (error) {
          console.log('failed to load the file', error);
          return reject(error);
        }
        this.setState({ loaded: true });
        return resolve();
      });
    });
  };

  play = async () => {
      try {
        await this.load();
      } catch (error) {
        console.log(error);
        return;
      }
    
    
    if (this.sound) {
      this.sound.stop();
    }

    this.setState({ inPlay: true });
    Sound.setCategory('Playback');

    this.sound.play((success) => {
      if (success) {
        this.setState({ paused: true, inPlay: false });
        console.log('successfully finished playing');
        this.sound.stop();
      } else {
        console.log('playback failed due to audio decoding errors');
      }
    });

  };
  pause = () => {
    if (this.sound) {
      this.sound.pause(() => {
        this.setState({ paused: true });
      });
    }
  };

saveAudio(){
  this.setState({
    // stoped:false,
    savedAudio:true
  })
}
handleTick = (time) => {
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;
  const formattedTime = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  this.setState({ formattedTime });
};
pause(){
  this.setState({
    inPlay:false
  })
}
handleLanguageChange = () => {
  this.setState(
    (prevState) => ({
      langue: prevState.langue === 'fr-FR' ? 'en-US' : 'fr-FR'
    }),
    () => {
      // Appelé après que l'état ait été mis à jour
      this.handleTranslate(this.state.langue);
    }
  );
};
handleValueChange = (itemValue, itemIndex) => {
  // alert(itemValue);
  this.setState({ selectedCategory: itemValue });
  const {userInfo,selectedId} = this.props;
  const {selectedText, selectedTrad} = this.state;
  // alert(userInfo.id);
  console.log(userInfo.id);
  console.log(selectedId);
  console.log(selectedText);
  console.log(selectedTrad);
  // alert(itemValue);
  // Vous pouvez ajouter d'autres logiques ici si nécessaire
};
cancel(){
  this.props.onClose();
  this.setState({targTEXT:'', expres:''});
  Tts.stop();
}
toggleDropdown = () => {
  this.setState(prevState => ({ isDropdownVisible: !prevState.isDropdownVisible }));
};
toggleDropdownOrig = () => {
  this.setState(prevState => ({ isDropdownVisibleOrig: !prevState.isDropdownVisibleOrig }));
};

  render() {
    const {trad,isKeyboardOpen, isDropdownVisible, isDropdownVisibleOrig, langue, target_langue, infolangue} = this.state; 
    const {userInfo, category} = this.props;
    const imageSource = this.state.langue !== 'en-US' ? require('../../image/en.png') : require('../../image/fr.png');
    const imageTrans = this.state.langue === 'en-US' ? require('../../image/en.png') : require('../../image/fr.png');
    const languages = [
      { id: "1", code: 'en-US', label: 'ENGLISH', imageSource: require('../../image/en.png') },
      { id: "5", code: 'fr-FR', label: 'FRENCH', imageSource: require('../../image/fr.png') },
      { id: "7", code: 'de-DE', label: 'ALLEMAND', imageSource: require('../../image/Germany.png') },
      { id: "4", code: 'es-ES', label: 'SPANISH', imageSource: require('../../image/es.png') },
    ];
    const mylangue = target_langue === 'en'
      ? require('../../image/en.png')
      : langue === 'fr'
      ? require('../../image/fr.png')
      : require('../../image/en.png');
    
    const flagSourceOrigin = infolangue === 'en-US'
      ? require('../../image/en.png')
      : infolangue === 'fr-FR'
      ? require('../../image/fr.png')
      : infolangue === 'es-ES'
      ? require('../../image/es.png')
      : infolangue === 'de-DE'
      ? require('../../image/Germany.png')
      : require('../../image/en.png');
    const flagSource = target_langue === 'en-US'
      ? require('../../image/en.png')
      : target_langue === 'fr-FR'
      ? require('../../image/fr.png')
      : target_langue === 'es-ES'
      ? require('../../image/es.png')
      : target_langue === 'de-DE'
      ? require('../../image/Germany.png')
      : require('../../image/en.png');

    const currentLanguage = languages.find(lang => lang.code === langue);
    return (
      <Modal
        animationType="slide"
        visible={this.props.visible}
        // visible={true}
      >
        <ModalLayout navigation={this.props.navigation}>
          {/* <Text>test</Text> */}
        <View style={{ width: wp('100%'), backgroundColor:'#192356', paddingBottom:hp('10%') }}>
          <ScrollView style={{width: wp('100%'), borderRadius: 15 }}>
            <View style={{}}>
              {!isKeyboardOpen?(<View>
                <View style={{ justifyContent: 'center', height: hp('8.5%'), width: wp('100%')}}>
                  <View style={{ height: hp('4%'), width: wp('100%'), flexDirection: 'row', justifyContent: 'space-between',paddingLeft:15 }}>
                    <TouchableOpacity
                      onPress={() => {
                        this.cancel()
                      }}
                    >
                      <View style={{ flexDirection: 'row' }}>
                        <Icon name="arrow-back-outline" size={25} color="white" style={{ alignSelf: 'center', marginLeft: 5 }} />
                        <Text style={{ color: 'white', marginLeft: wp('18%'), fontSize: hp('2.2%') }}>
                          NEW EXPRESSION 
                        </Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                </View>
                
              </View>):null}

              <View style={{ width: wp('90%'), alignSelf: 'center', marginTop: hp('3%'), alignItems:'center'}}>
                  {/* <Text style={{color:'white'}}>test</Text> */}
                  <TouchableOpacity onPress={this.toggleDropdownOrig} style={styles.selector}>
                    <Text style={styles.selectorText}>Original language</Text>
                    <Icon
                      name={isDropdownVisibleOrig ? "chevron-up" : "chevron-down"}
                      size={30}
                      color="#48A2F1"
                    />
                    <Image source={flagSourceOrigin} style={styles.flag} /> 
                  </TouchableOpacity>
                  {isDropdownVisibleOrig && (
                    <View style={styles.dropdown}>
                      {languages.map((language) => (
                        <TouchableOpacity key={language.code} onPress={() => this.setState({infolangue:language.code, isDropdownVisibleOrig:false})}>
                          <View style={styles.languageOption}>
                            <Text style={styles.languageLabel}>{language.label}</Text>
                            <Image style={styles.languageImage} source={language.imageSource} />
                          </View>
                        </TouchableOpacity>
                      ))}
                    </View>
                  )}
                  
                </View>

              <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignSelf: 'center', width: wp('90%'), marginTop: hp('5%') }}>
                <Text style={{ color: 'white', fontSize: 14 }}>YOUR TEXT</Text>
                <TouchableOpacity onPress={() => this.speakTxt()} style={{ width: wp('20%') }}>
                  <Icon name="volume-medium-outline" size={25} color="#EA1E69" style={{ alignSelf: 'flex-end', marginLeft: 5 }} />
                </TouchableOpacity>
              </View>
              <View style={{ backgroundColor: 'white', width: wp('90%'), alignSelf: 'center', borderRadius: 5 }}>
                <TextInput ref={input => { this.textInput = input }} style={{ width: wp('90%'), minHeight:100}} value={this.state.expres} multiline={true} onChangeText={expres => this.setState({ expres, trad:false })} />
              </View>
              <View style={{ width: wp('90%'), alignSelf: 'center', justifyContent: 'space-around', marginTop: hp('3%')}}>
                {/* <Text style={{color:'white'}}>test</Text> */}
                <TouchableOpacity onPress={this.toggleDropdown} style={styles.selector}>
                  <Text style={styles.selectorText}>Translate to</Text>
                  <Icon
                    name={isDropdownVisible ? "chevron-up" : "chevron-down"}
                    size={30}
                    color="#48A2F1"
                  />
                  <Image source={flagSource} style={styles.flag} /> 
                </TouchableOpacity>
                {isDropdownVisible && (
                  <View style={styles.dropdown}>
                    {languages.map((language) => (
                      <TouchableOpacity key={language.code} onPress={() => {this.setState({target_langue:language.code, targ_lang_id:language.id, isDropdownVisible:false}), this.handleTranslate(language.code)}}>
                        <View style={styles.languageOption}>
                          <Text style={styles.languageLabel}>{language.label}</Text>
                          <Image style={styles.languageImage} source={language.imageSource} />
                        </View>
                      </TouchableOpacity>
                    ))}
                  </View>
                )}
                
              </View>


              {trad?
              (
              <View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignSelf: 'center', width: wp('90%'), marginTop: hp('5%') }}>
                  <Text style={{ color: 'white', fontSize: 14 }}>TRANSLATION</Text>
                  <TouchableOpacity onPress={() => this.speakTrad()} style={{ width: wp('20%') }}>
                    <Icon name="volume-medium-outline" size={25} color="#EA1E69" style={{ alignSelf: 'flex-end', marginLeft: 5 }} />
                  </TouchableOpacity>
                </View>
                <View style={{ backgroundColor: 'white', width: wp('90%'), alignSelf: 'center', borderRadius: 5 }}>
                  <TextInput ref={input => { this.textInput = input }} style={{ width: wp('90%'),minHeight:100 }} placeholderTextColor={'grey'} multiline={true} value={this.state.targTEXT} onChangeText={targTEXT => this.setState({ targTEXT })} />
                </View>
              </View>
              ):null
              }
              {/* <TouchableOpacity onPress={() => { this.picId(this.state.picIdlangue), this.saveTEXT(), this.setState({ create: false, idLan: '', idecat: '', addcat: true }) }}>
                <View style={{ backgroundColor: '#EA1E69', width: wp('30%'), paddingLeft: 10, paddingRight: 10, height: 40, alignSelf: 'center', marginTop: hp('2%'), borderRadius: 5, justifyContent: 'center' }}>
                  <Text style={{ color: 'white', textAlign: 'center', fontSize: 14 }}>Enregistrer</Text>
                </View>
              </TouchableOpacity> */}



             {/* {!trad?( 
             <RectButton
               onPress={() => 
                {this.setState({trad:true}),this.handleTranslate(this.state.langue)}
              }
              text="VOIR LA TRADUCTION"
              backgroundColor="#47BD7A"
              />):null} */}

              <Text style={{color:'white', alignSelf:'center', marginTop:15, fontSize:16}}>Category</Text>
              <View style={{
                flexDirection:'row',
                justifyContent:'space-around',
                alignItems:'center'
              }}>
                <View style={styles.selectContainer}>
                  <Picker
                  selectedValue={this.state.selectedCategory}
                  onValueChange={this.handleValueChange}
                  itemStyle={styles.pickerItems}
                  >
                  {category.map(cat => (
                    <Picker.Item key={cat.id} label={cat.intitule} value={cat.id} style={{backgroundColor: '#192356', color: 'white'}}  />
                  ))}
                  </Picker>
                  
                </View>
                <AddButton
                    onPress={() => {
                      // alert('test');
                      this.setState(prevState => ({ newcat: !prevState.newcat }));
                      // this.props.onClose();
                      // this.props.openNewCat();
                      // closeNewCat
                    }}
                    backgroundColor="grey" 
                  />
                
                </View>

                <Modal
                    transparent={true}
                    animationType="fade"
                    visible={this.state.newcat}
                    onRequestClose={() => this.setState({ newcat: false })} // Ferme le modal en appuyant sur le bouton "retour"
                  >
                    <View style={{
                      flex: 1,
                      justifyContent: 'center',
                      alignItems: 'center',
                      backgroundColor: 'rgba(0, 0, 0, 0.5)', // Fond semi-transparent
                    }}>
                      <View style={{
                        backgroundColor: '#192356',
                        width: wp('100%'),
                        // height: hp('30%'),
                        padding: 20,
                        borderRadius: 10,
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                        <Text style={{ fontSize: 20, color: 'white', textAlign:'left' }}>Category name</Text>

                        {/* TextInput pour la saisie */}
                        <TextInput
                          style={{
                            height: 40,
                            borderColor: 'white',
                            borderWidth: 1,
                            marginTop: 10,
                            paddingHorizontal: 10,
                            width: '80%',
                            backgroundColor: 'white',
                            borderRadius: 5,
                          }}
                          placeholder="Category name"
                          placeholderTextColor="grey"
                          value={this.state.inputCat}
                          onChangeText={(text) => this.setState({ inputCat: text })}
                        />
                        <Text style={{ fontSize: 20, color: 'white' }}>Description</Text>
                        <TextInput
                          style={{
                            height: 40,
                            borderColor: 'white',
                            borderWidth: 1,
                            marginTop: 10,
                            paddingHorizontal: 10,
                            width: '80%',
                            backgroundColor: 'white',
                            borderRadius: 5,
                          }}
                          placeholder="desciption"
                          placeholderTextColor="grey"
                          value={this.state.inputDesc}
                          onChangeText={(text) => this.setState({ inputDesc: text })}
                        />
                        {/* Bouton pour fermer le modal */}
                        <View
                          style={{
                            width:wp('100%'),
                            flexDirection:'row',
                            justifyContent:'space-around',
                            alignItems:'center'
                          }}
                          >
                          <RectButton
                            text="CANCEL"
                            backgroundColor="#EA1E69"
                            title="CANCEL"
                            onPress={() => this.setState({ newcat: false })}
                          />
                          <RectButton
                            text="CREATE"
                            backgroundColor="#3498F0"
                            title="CREATE"
                            onPress={() => {this.setState({ newcat: false }), this.saveCat()}}
                          />
                        </View>
                      </View>
                    </View>
                  </Modal>

              <View
              style={{
                flexDirection:'row',
                justifyContent:'space-around'
              }}
              >

              <RectButton
               onPress={() => {
                this.cancel()
              }}
              text="CANCEL"
              backgroundColor="#EA1E69"
              />
              <RectButton
               onPress={() => {
                this.saveTEXT()
              }}
              text="SAVE"
              backgroundColor="#3498F0"
              />
              </View>
            </View>
            
          </ScrollView>
        </View>
        </ModalLayout>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  textInput: {
    textAlign: 'justify',
    fontSize: 14,
    width: '100%',
    // borderColor: 'gray',
    // borderWidth: 1,
    padding: 8,
    color:'black'
  },
  selectContainer: {
    marginTop:15,
    marginBottom:15,
    width:'60%',
    backgroundColor:'transparent',
    alignSelf:'center',
    color:'white',
    borderWidth:1,
    borderColor:'white',
    borderRadius:5
  },
  selectorText:{
    color:'white',
    fontWeight:'bold', 
    fontSize:16, 
    marginBottom:15, 
    marginTop:10, 
    textAlign:'center'
  },
  selector:{
    flexDirection:'row',
    justifyContent:'center',
    alignItems:'center'
  },
  languageImage:{
    position:'absolute',
    right:5,
    alignSelf:'center',
    width:25,
    height:20, 
    borderRadius:2
  },
  languageLabel:{
    color:'blue',
    marginRight:15,
  },
  dropdown:{
    alignSelf:'center', 
    backgroundColor:'white', 
    padding:10, 
    borderRadius:10,
    marginBottom:15,
    minWidth:wp('40%')
  },
  flag: {
    // position: 'absolute',
    // top: 0,
    marginLeft:5,
    right: 5,
    width: 20,
    height: 15,
    borderRadius: 2,
  },
  languageOption:{
    flexDirection:'row',
    padding:10,
    borderTopWidth:1,
    borderColor:'grey'
    
  },
  pickerItems: {
    fontSize: 16,
    backgroundColor:'transparent',
    color: 'white', // Texte en blanc
    height: hp('20%'),
    borderWidth:1, 
    borderColor:'white'
  },
});





const mapDispatchToProps = (dispatch) => {
  return {
    dispatchfetchData:id => dispatch(fetchData(id)),
    getCat:id_groupe => dispatch(getCat(id_groupe))

  };
};

export default connect(null, mapDispatchToProps )(TextModalsIMG);
