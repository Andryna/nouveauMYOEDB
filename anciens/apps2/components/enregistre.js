import React, { Component } from 'react';
import { StyleSheet, FlatList,View, Button,TextInput,TouchableOpacity,Text,Image, Modal, Alert } from 'react-native';

import {check,request,PERMISSIONS,RESULTS} from 'react-native-permissions';
import Sound from 'react-native-sound';
import AudioRecord from 'react-native-audio-record';
import Icon from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { PowerTranslator, ProviderTypes, TranslatorConfiguration, TranslatorFactory} from 'react-native-power-translator';
// import SocketIOClient from 'react-native-socket.io-client'
// import SocketIOClient from 'socket.io-client/dist/socket.io.js'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import Spinner from 'react-native-spinkit';
import Slider from '@react-native-community/slider';
import Footer from './footer/layouts/footer';
import axios from 'axios';
// import ChunkUpload from 'react-native-chunk-upload';
import * as Progress from 'react-native-progress';

import config from '../../config.json';
import Tts from "react-native-tts";
import I18n from 'react-native-i18n';
import en from '../../i18/en';
import fr from '../../i18/fr';
import es from '../../i18/es';
import {Timer, Countdown} from 'react-native-element-timer';
import {AudioPlayer} from 'react-native-simple-audio-player';
import RNFS from 'react-native-fs';
import { connect,useDispatch } from 'react-redux';
import { fetchData } from '../actions/expressions';
import { fetchAudio } from '../actions/audio';
// import {SpeechToText} from 'react-native-watson-speech-to-text';
const base_url = config.base_url;
import Homelayout from '../layouts/Homelayout';
import ModalLayout from '../layouts/ModalLayout';
import HomeLayout2 from '../layouts/HomeLayout2';
import RenameAudio from './modals/RenameAudio';
import { myLang } from '../constants/myconst';
import TextModals from './modals/TextModals';
import AudioTextModal from './modals/AudioTextModal';
import { Picker } from '@react-native-picker/picker';
import moment from 'moment';
import { getCat } from '../actions/category';
class Enregistre extends Component {
    static navigationOptions =
   {
    headerShown: false,
    title: 'Forma2+',
    headerStyle: {
      backgroundColor:'#2f3c7e',
     
    },
    headerTintColor: '#fff',
    headerLeft: () => null
    // headerTintColor: '#f4511e',
    // headerTitleStyle: {
    //   fontWeight: 'bold',
    // }
   }
   ;

   constructor(props){
    const firstId = (props.category && props.category.length > 0) ? props.category[0].id : null;
    super(props);
    this.state = {
      users:false,
      audioFile: '',
      isLoading:false,
      recording: false,
      loaded: false,
      paused: true,
      currentTime: 0.0,
      infolangue: null,
      PickerValueHolder: null,
      id: null, 
      login:null,
      nom1:null,
      prenom1:null,
      email1:null,
      tel1:null,
      adresse1:null,
      cp1:null,
      ville1:null,
      password1:null,
      id_groupe:null,
      idecate:null,
      trand:null,
      Scolor:'green',
      Plcolor:'grey',
      transBut:false,
      trans:false,
      transaudio:'',
      choice:false,
      recAudio:false,
      plus:false,
      transcripts:false,
      percentCompleted:'',
      pathaudio:'',
      transcribed:false,
      showtransbut:true,
      showtxt:false,
      duration:'',
      audioCurrentTime:0,
      newText: false,
      tosend:null,
      response: {
      path: 'file://file:///data/user/0/com.forma2p/files/test.wav',
      fileName: 'test.wav',
      size: 'your_file_size',
      renameAudio:false,
      idLan: "1",
      addcat: true,
      pickerValueHolder:'',
      idecat: firstId,
      dataSource:this.props.category,
      currentTime: 0,
      playSeconds: 0,
      duration: 0,
      durationInSeconds: null,
      showInput:false,
      selectedCategory:firstId,
      audioLegend:'',
      error:false,
      errorCat:false
      }
    };




    I18n.locale = this.state.trand;
    I18n.fallbacks = true;
    I18n.translations = {
    en,
    fr,
    es
      };
    this.timerRef = React.createRef();
    
    // this.chunk = new ChunkUpload({
    //   path: this.state.response.path,
    //   size: 10095,
    //   fileName: this.state.response.fileName,
    //   filesize: this.state.response.size,
    //   onfetchbloberror: this.handleFetchBlobError,
    //   onwritefileerror: this.handleWriteFileError,
    // });
  
  }
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
        audioFile:'',
        transaudio: ''
      });
  };
  handleFetchBlobError = (error) => {
    console.log('Fetch Blob Error:', error);
  };

  handleWriteFileError = (error) => {
    console.log('Write File Error:', error);
  };
  sound = null;
  async componentDidMount() {
    const today = moment().format('D/M/YYYY'); 

    const {userInfo, category} = this.props;
    if (category && category.length > 0) {
      this.setState({ selectedCategory: this.props.category[0].id });
    }
    console.log("categ:   => ",category);
    // alert(userInfo.id);
    const langWithId1 = myLang.find(lang => lang.id === "1");
    // alert(langWithId1.id);
    this.setState({idLan: langWithId1.id, pickerValueHolder: langWithId1.id, infolangue: langWithId1.abrev});
    this.setState({renameAudio:false});
    // const {userInfo} = this.props;
    // alert(userInfo.id);
    await this.checkPermission();
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
   
  }
  
openSearch() {
 alert('search')
}
openPlus() {
 this.setState({plus:true});
}
openHome() {
  // const {audioFile} = this.state;
  // if(audioFile){
  //   alert('vous voulez enregistrer votre audio?');
  // }else{
    this.props.navigation.goBack();

  // }
}
handleTranslate = (itemValue) => {
  if(itemValue!=''){
    this.setState({picIdlangue:itemValue});
    TranslatorConfiguration.setConfig(ProviderTypes.Google, config.googleCloud.apiKey,itemValue.substring(0,2));
    const translator = TranslatorFactory.createTranslator();
    translator.translate(this.state.transaudio).then(translated => {
      Tts.setDefaultLanguage(itemValue);
      this. setState({targTEXT:translated})
    });
   }else {
     alert('This option is not available');
   }
}

LangView=(id,intitule,index,abrev)=>{
  const {idLan}=this.state;
  let colors = ['#FFE9F9', '#EAF9FE', '#FFF5E5', '#FBF5FF','#FFF1EF','#A2A2A2'];
  if (id!== ''){
if (idLan==id){
return(
  <TouchableOpacity
    onPress={()=>{this.setState({idLan:''},this.handleTranslate(abrev))}}>
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
          onPress={()=>{this.setState({idLan:id}),this.handleTranslate(abrev), alert(id)}}
          >
          <View 
            style={{alignItems:'center',borderWidth:0.5,borderRadius:20,justifyContent:'flex-start'}}
            >
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
                {intitule}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      );
    }
  }
}
compte =()=>{
  let i=1;
  i++;
  console.log('morceau numero: ' +i);
}
checkPermission = async () => {
  check(PERMISSIONS.ANDROID.RECORD_AUDIO)
    .then((result) => {
      switch (result) {
        case RESULTS.UNAVAILABLE:
          console.log('Cette fonctionnalité n\'est pas disponible (sur cet appareil / dans ce contexte)');
          break;
        case RESULTS.DENIED:
          console.log('La permission n\'a pas été demandée / est refusée mais peut être demandée');
          break;
        case RESULTS.LIMITED:
          console.log('La permission est limitée : certaines actions sont possibles');
          break;
        case RESULTS.GRANTED:
          console.log('La permission est accordée');
          break;
        case RESULTS.BLOCKED:
          console.log('La permission est refusée et ne peut plus être demandée');
          break;
      }
    })
    .catch((error) => {
      console.log(error);
    });
  this.requestPermission();
};

requestPermission = async () => {
  request(PERMISSIONS.ANDROID.RECORD_AUDIO)
    .then((result) => {
      console.log('Demande de permission', JSON.stringify({ result }));
    });
};

  start = () => {
    console.log("Début de l'enregistrement...");
    this.timerRef.current.start();
    
    // Assurez-vous que AudioRecord est défini avant de commencer l'enregistrement
    if (!AudioRecord) {
      console.log('AudioRecord n\'est pas initialisé');
      return;
    }

    // Démarrez l'enregistrement audio
    AudioRecord.start();
    // Assurez-vous que this.timerRef.current est défini avant de démarrer le timer
    if (this.timerRef.current && typeof this.timerRef.current.start === 'function') {
      this.setState({ audioFile: '', recording: true, loaded: false });
      // this.timerRef.current.start();
    } else {
      console.warn('this.timerRef.current n\'a pas de méthode start()');
    }
  };

  stop = async () => {
    try {
      if (!this.state.recording) return;
  
      console.log('Stopping record...');
      if (!AudioRecord) {
        console.log('AudioRecord is not initialized');
        return;
      }
  
      let audioFile = await AudioRecord.stop();
      console.log('Audio file:', audioFile);
  
      this.setState({ audioFile, recording: false });
      RNFS.stat(audioFile)
      .then(res => {
        const fileSizeInBytes = res.size;
    
        // Créez un objet de fichier à partir du chemin du fichier audio
        const resp = {
          path: audioFile,
          size: fileSizeInBytes,
          fileName: 'test.wav',
          type: 'audio/wav' // Type MIME du fichier
          // Ajoutez d'autres propriétés si nécessaire
        };
        console.log('resp', resp);
        this.setState({
          response: resp
        });
      })
      .catch(error => {
        console.error('Erreur lors de la lecture de la taille du fichier:', error);
      });
      // this.timerRef.current.stop();
  
      const sound = new Sound(audioFile, '', (error) => {
        if (error) {
          console.log('failed to load the sound', error);
          return;
        }
        const duration = sound.getDuration();
        const hours = Math.floor(duration / 3600);
        const minutes = Math.floor((duration - (hours * 3600)) / 60);
        const seconds = Math.floor(duration - (hours  *3600) - (minutes * 60));
        const formattedHours = hours.toString().padStart(2, '0');
        const formattedMinutes = minutes.toString().padStart(2, '0');
        const formattedSeconds = seconds.toString().padStart(2, '0');
        const audiotime =  `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
        this.setState({duration:audiotime, durationInSeconds: duration });
        console.log(audiotime);
      });
       } catch (error) {
      console.error('Error stopping recording:', error);
    }
  }

  load = () => {
    return new Promise((resolve, reject) => {
      if (!this.state.audioFile) {
        return reject('file path is empty');
      }
  
      this.sound = new Sound(this.state.audioFile, '', error => {
        if (error) {
          console.log('failed to load the file', error);
          return reject(error);
        }
        this.setState({ loaded: true });
        return resolve();
      });
    });
  }

  play = async () => {
    if (!this.state.loaded) {
      try {
        await this.load();
      } catch (error) {
        console.log(error);
      }
    }
  
    this.setState({ paused: false });
    Sound.setCategory('Playback');
  
    // Démarrer la lecture audio
    this.sound.play((success) => {
      if (success) {
        this.setState({ paused: true });
        console.log('successfully finished playing');
        this.sound.stop();
      } else {
        console.log('playback failed due to audio decoding errors');
      }
    });
  
    // Mettre à jour la position de lecture périodiquement
    this.positionInterval = setInterval(() => {
      if (this.sound) {
        this.sound.getCurrentTime((seconds) => {
          const hours = Math.floor(seconds / 3600);
          const minutes = Math.floor((seconds - (hours * 3600)) / 60);
          const secondss = Math.floor(seconds - (hours * 3600) - (minutes * 60));
          const formattedHours = hours.toString().padStart(2, '0');
          const formattedMinutes = minutes.toString().padStart(2, '0');
          const formattedSeconds = secondss.toString().padStart(2, '0');
        const audiotime =  `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
          // Mettez à jour l'état de la lecture avec la nouvelle position
          this.setState({ currentPlaybackPosition: seconds,audioCurrentTime:audiotime });
        });
      }
    }, 1000); // Mettez à jour toutes les 1 seconde (1000 millisecondes)
  }

  chunkuploadAudio = () => {
    const pathtoAudio = 'file://' + this.state.audioFile;
    const newresp = this.state.response;
    console.log(newresp);
  }

  uploadT = (file, next, totalChunks) => {
    const { path, fileName, size } = this.state.response;
    const body = new FormData();
    file.headers["x-file-size"] = size;
    file.headers["x-chunk-total-number"] = totalChunks;
    body.append('audio', {
      uri: `file://${file.path}`, // Chemin vers le morceau actuel
      name: file.fileName,
      type: 'audio/wav' // Type MIME du fichier
    });
    axios.post('https://preprod.forma2plus.com/portail-stagiaire/upch/upchs.php', body, {
      headers: {
        "content-type": "multipart/form-data",
        "accept": 'application/json',
        "x-chunk-number": file.headers["x-chunk-number"],
        "x-chunk-total-number": file.headers["x-chunk-total-number"],
        "x-chunk-size": file.headers["x-chunk-size"],
        "x-file-name": file.headers["x-file-name"],
        "x-file-size": file.headers["x-file-size"],
        "x-file-identity": file.headers["x-file-identity"]
      }
    }).then((res) => {
      console.log('reponse serveur chunk', res);
      next();
    }).catch((error) => {
      console.log(error);
    });
  };
  calculateTotalChunks = (fileSize, chunkSize) => {
    return Math.ceil(fileSize / chunkSize);
  };

  updateChunkProperties = () => {
    const { path, fileName, size } = this.state.response;
    console.log('path1', path);
    console.log('filename1', fileName);
    console.log('size1', size);
    this.chunk.path = path;
    this.chunk.fileName = fileName;
    this.chunk.filesize = size;
  };
  handleUpload = () => {
    const { path, fileName, size } = this.state.response;
    this.updateChunkProperties();
    const totalChunks = this.calculateTotalChunks(size, 10095);
    this.chunk.digIn((file, next) => {
      this.uploadT(file, next, totalChunks);
    });
  };
uploadCh(file, next) {
  console.log(file);
  const body = new FormData();

  body.append('audio', {
    uri: `file://${file.path}`, // Chemin vers le morceau actuel
    name: file.fileName,
    type: 'audio/wav' // Type MIME du fichier
  });
console.log(body);
const customHeaders = {
  "x-chunk-number": file.headers["x-chunk-number"],
  "x-chunk-total-number": file.headers["x-chunk-total-number"],
  "x-chunk-size": file.headers["x-chunk-size"],
  "x-file-name": file.headers["x-file-name"],
  "x-file-size": file.headers["x-file-size"],
  "x-file-identity": file.headers["x-file-identity"]
};

const headers = {
  "Content-Type": "multipart/form-data",
  "Accept": 'application/json',
  ...customHeaders
};

  axios.post('https://preprod.forma2plus.com/portail-stagiaire/upch/upch.php', body, {
    headers: headers
  })
    .then(response => {
      console.log(response.data);
      next(); // Passer au morceau suivant
    })
    .catch(error => {
      console.error(error);
    });
};

  testrans= async () => {
    const url = "54.36.183.14:5007/transcript";
    const filename= "10304_1594802100.wav"
    
    const formData = new FormData();

    formData.append('filename',filename);
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        body: formData,
      }).then((response) => response.json())
      .then((responseJson) => {
      if(responseJson =='')
      {
        alert('no response');
      }
      else{
    console.log(responseJson);
      }
    })
  } catch (err) {
      console.log(err)
    }
  }
  uploadAudio = async () => {
    this.setState({isLoading:true});
    // this.animation();
    const url = base_url + "/portail-stagiaire/upload1.php";
    const {audioFile,idecate}=this.state;
    const path = 'file://' + audioFile;
    const {infolangue}=this.state;
    // alert(path);
    const formData = new FormData();
    const id=this.state.id;
    const Picker=this.state.PickerValueHolder.id;
    console.log(idecate);
    formData.append('id_stag',id);
    formData.append('targL',Picker);
    formData.append('infolangue',infolangue);
    formData.append('idecate',idecate);
    formData.append('id_groupe',this.state.id_groupe);
    formData.append('recording',{
      uri: path,
      name: 'teste.wav',
      type: 'audio/wav',
    });
    // formData.append('multipart/form-data');
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'multipart/form-data',
          // 'Content-Type': `audio/aac`,
        },
        body: formData,
      }).then((response) => response.json())
      .then((responseJson) => {
      // console.log(response.mess);
      if(responseJson =='')
      {
        alert('no response');
        // user:responseJson;
          
      }
      else{
        this.setState({isLoading:false});
        alert('Audio saved');
        console.log(responseJson);
      }
    })
  } catch (err) {
      console.log(err)
    }
  }
  

  transcript = async () => {
    this.setState({transcripts:true,transcribed:false});
    const {userInfo} = this.props;
    const url = base_url + "/portail-stagiaire/upaudio.php";
    const {audioFile}=this.state;
    const path = 'file://'+audioFile;
    const {infolangue, idLan}=this.state;
    // alert('okokoko');
    const formData = new FormData();
    const id=userInfo.id;
    // alert(userInfo.id);
    // const Picker=this.state.PickerValueHolder.id;
    // alert(this.state.idLan);
    formData.append('id_stag',userInfo.id);
    formData.append('targL',idLan);
    formData.append('infolangue',infolangue);
    formData.append('id_groupe',userInfo.id_groupe);
    formData.append('recording',{
      uri: path,
      name: 'teste.wav',
      type: 'audio/wav',
    });
    // alert('transcript');
    console.log(formData);
    try {
     await axios.post(url, formData, {
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'multipart/form-data',
                },
                onUploadProgress: progressEvent =>{
                  var percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total)
                  console.log(percentCompleted);
                  if(percentCompleted < 100){
                    this.setState({percentCompleted:percentCompleted});
                  }
                },
            })
            .then((resp) => {
              const {audioFile,idecate,transaudio,targTEXT,id_groupe,duration,infolangue}=this.state;
              // const {id}=this.state.id;
              // { idLan: id, pickerValueHolder: abrev,infolangue: abrev,allang:false }
              const Picker=this.state.idLan;
              const tosend = {
                id_stag:userInfo.id,
                targL:Picker,
                infolangue:infolangue,
                idecate:idecate,
                id_groupe:userInfo.id_groupe,
                transaudio:transaudio,
                targTEXT:null,
                pathaudio:resp.data.audio,
                duration:duration
              }
              console.log(tosend);
              this.setState({transcripts:false,transaudio:resp.data.result,pathaudio:resp.data.audio,percentCompleted:'100',transcribed:true,showtxt:true, newText:true, resp:resp,tosend:tosend});
              
              
              // this.setState({transcripts:false,transaudio:'resresultp.data.',pathaudio:resp.data.audio,percentCompleted:'100',transcribed:true,showtxt:true, newText:true});
              // alert('transcribed');
              console.log(this.state.resp);
              }) 
   
  } catch (err) {
      console.log(err)
    }
  }

  pause = () => {
    this.sound.pause();
    this.setState({ paused: true });
  };
  animation=()=>{
    

  };

  save2 = async () => {
    this.setState({isLoading:true});
    const url = base_url + "/portail-stagiaire/saveaudio2.php";
    const {audioFile,idecate,transaudio,targTEXT,id_groupe,duration}=this.state;
    const path = 'file://' + audioFile;
    const {infolangue}=this.state;
    const formData = new FormData();
    const id=this.state.id;
    const Picker=this.state.PickerValueHolder.id;
    console.log(idecate);
    formData.append('id_stag',id);
    formData.append('targL',Picker);
    formData.append('infolangue',infolangue);
    formData.append('idecate',idecate);
    formData.append('id_groupe',this.state.id_groupe);
    formData.append('transaudio',transaudio);
    formData.append('targTEXT',targTEXT);
    formData.append('pathaudio',this.state.pathaudio);
    formData.append('duration',duration);
    console.log(this.state.pathaudio);
    console.log('transaudio:'+id_groupe+id+'\n et '+Picker);
    const tosend = {
      id_stag:this.state.id,
      targL:Picker,
      infolangue:infolangue,
      idecate:idecate,
      id_groupe:this.state.id_groupe,
      transaudio:transaudio,
      targTEXT:targTEXT,
      pathaudio:this.state.pathaudio,
      duration:duration
    }
    console.log("tosend ==> "+JSON.stringify(tosend));
    try {
            const response = await fetch(url, {
            method: 'POST',
            headers:
            {
              'Content-Type': 'multipart/form-data',
            },
            body: formData,
      }).then((response) => response.json())
                 .then((responseJson) => {
                            if(responseJson =='')
                            {
                              alert('no response');
                            }
                            else{
                              this.setState({isLoading:false,transcribed:false,showtxt:false});
                              this.props.dispatchfetchAudio(this.state.id)
                              .then(() => {
                                alert('Audio saved');
                              });
                            }
                   })
       }catch (err) {
      console.log(err);
    }
  }

  getstat = async (txt,idexp) => {
    fetch(base_url + '/portail-stagiaire/labo/test.php', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
    
        sentence:txt.toString(),
    
        idexp:idexp,
      })
  }).then((response) => response.json())
  .then((responseStat) => {
    if(responseStat =='null')
      {
        alert('Login ou mot de passe invalide');
      }
    else{
      console.log(responseStat);
      alert('your stats is ready');
      }
    }).catch((error) => {
      console.error(error);
    });
  }
closeModal (){
  this.setState({renameAudio:false});
}
LangaudioView = (id, intitule, index, abrev) => {
  const { idLan } = this.state;
  let colors = ['#FFE9F9', '#EAF9FE', '#FFF5E5'
    , '#FBF5FF', '#FFF1EF', '#A2A2A2'];
  if (id !== '') {
    if (idLan == id) {
      return (
        <TouchableOpacity 
          onPress={() => { this.setState({ idLan: '', pickerValueHolder: '',allang:false })}}>
          <View style={{ alignItems: 'center', borderRadius: 15, justifyContent: 'center', height:35 ,backgroundColor:'#C9902A', marginTop:10 //ito
          }}>
            <Text style={{
              marginHorizontal: wp('3%'),
              marginVertical: hp('0.5%'),
              fontWeight: '400',
              textAlign: 'center',
              // opacity: 0.5,
              fontSize:14,
              color:'white'
            }}>
              {intitule}
            </Text>
          </View>
        </TouchableOpacity>
      );
    }
    else {
      return (
        <TouchableOpacity
          onPress={() => { this.setState({ idLan: id, pickerValueHolder: abrev,infolangue: abrev,allang:false })}}>
          <View style={{ 
            alignItems: 'center', 
            borderRadius: 15, 
            justifyContent: 'center', 
            height:35 ,
            backgroundColor:'#0C1D65',
            marginTop:10 //ito
            }}>
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
            {/* {this.contentView(item.id_expression,item.content_langue_origine,item.content_langue_cible,item.audio_langue_origine,item.intitule,item.date_creation,item.f_name,item.type_file,item.legende_f)}          */}
          </View>
        </TouchableOpacity>
      );
    }
  }
}
onSliderEditStart = () => {
  this.sliderEditing = true;
};

onSliderEditEnd = () => {
  this.sliderEditing = false;
};

onSliderEditing = (value) => {
  if (this.whoosh) {
    this.whoosh.setCurrentTime(value);
    this.setState({ currentPlaybackPosition: value });
  }
  setShowInput = (state) =>{
    this.setState({
      setShowInput:state
    });
  }
}

  handleValueChange = (itemValue, itemIndex) => {
    this.setState({ selectedCategory: itemValue });
    const {userInfo,selectedId} = this.props;
    const {selectedText, selectedTrad} = this.state;
    // alert(userInfo.id);
    console.log(userInfo.id);
    console.log(itemValue);
    console.log(selectedText);
    console.log(selectedTrad);
    // alert(itemValue);
    // Vous pouvez ajouter d'autres logiques ici si nécessaire
  };
  handleSaveCat = async () =>{
    const {userInfo} = this.props;
    // this.setState({ ActivityIndicator_Loading: true }, () => {
    //   fetch('https://elprod.forma2plus.com/portail-stagiaire/savecat.php', {
    //     method: 'POST',
    //     headers: {
    //       'Accept': 'application/json',
    //       'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify({
    //       categ: this.state.newCategory,
    //       desc: 'description',
    //       id_groupe: userInfo.id_groupe,
    //       id: userInfo.id
    //     })
    //   }).then((response) => response.json()).then((reponse) => {
    //     this.props.getCat(userInfo.id_groupe)
    //     .then(() => {
    //       // alert('picture saved');
    //       this.setState({category:this.props.category, selectedCategory: this.props.category[0].id, showInput:false});
    //       alert('theme added succesfuly');
    //       // console.log(reponse);
    //     })
        
    //     // this.getPicker();
    //     // this.setState({ ActivityIndicator_Loading: false });
    //   }).catch((error) => {
    //     console.error(error);
    //     this.setState({ ActivityIndicator_Loading: false });
    //   });
    // });
  }
 
  render() {
    const { recording, paused, audioFile } = this.state;
    const { goBack } = this.props.navigation;
    const {isLoading,showInput}=this.state;
    const {category} = this.props;
    return(
      <ModalLayout navigation={this.props.navigation}>
        <View style={styles.container2}>
        <View style={styles.container}>
          <View // TSY MIDITRA
            style={{ 
              justifyContent: 'center', 
              height: hp('8.5%'),
              width:wp('100%'),
              backgroundColor:'#0C1D65',
              display:'none'
              }
            }
            >
            <View
              style={{ 
                height: hp('4%'), 
                width: wp('100%'), 
                flexDirection: 'row', 
                justifyContent: 'space-between' ,
                // display:'none'
                }
              }
              >
              <TouchableOpacity
              style={{backgroundColor:'red'}}
                onPress={() => {
                  this.setState({ listexpres: false, iconHeader: true ,imagedetails:false}),
                  this.openHome()
                  }
                }
                >
                <View
                  style={{
                    flexDirection: 'row'
                    }
                  }
                  >
                  <Icon 
                    name={"arrow-back-outline"} 
                    size={25} color="white"
                    style={{alignSelf:'center'}}
                  />
                  {this.state.iconHeader ? 
                    (
                      <Text style={{
                      color: 'white',
                      marginLeft: wp('8%'),
                      fontSize: hp('2.2%'),
                      position: 'absolute',
                      bottom: -4
                      }}>
                    {/* {I18n.t('home')} */}
                      </Text>
                    ) : 
                    (
                      <View>
                        <Text 
                          style={{
                            color: 'white',
                            marginLeft: wp('22%'),
                            fontSize: hp('2.2%'),
                            textAlign:'center'
                          }}
                          >
                          {/* {I18n.t('ALL EXPRESSIONSs')} */}
                          ENREGISTREMENT AUDIO
                        </Text>
                      </View>
                    )
                  }
                </View>
              </TouchableOpacity>
              <View >
              </View>
            </View>
          </View>
          <View
            style={{
              height: hp('4%'),
              width: wp('100%'),
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginLeft:10
            }}
            >
            <TouchableOpacity onPress={() => this.props.navigation.navigate('Accueil')}>
              <View
                style={{
                  flexDirection: 'row',
                }}>
                <Icon name="arrow-back-outline" size={30} color="white" />
                <Text
                  style={{
                    color: 'white',
                    marginLeft: wp('35%'),
                    fontSize: 16,
                    position: 'absolute',
                  }}>
                  RECORD AUDIO
                </Text>
              </View>
            </TouchableOpacity>
          </View>
          {!audioFile?
            ( 
            <View>
               {/* <View style={{
                // padding:10,
                marginTop:hp('10%'),
                marginBottom:hp('5%'),
                backgroundColor:'#47BD7A',
                // position:'absolute',
                // bottom:hp('20%'),
                alignSelf:'center',
                // height: 300,
                width:100,
                height:100,
                borderRadius:60,
                justifyContent:'center',
                alignItems:'center',
                
              }}>
                <Icon name={'mic'} size={40} color={'white'}/>
              </View> */}
              <View
                style={{
                flexDirection:'row',
                marginTop:hp('20%'),
                alignSelf:'center',
                // position:'absolute',
                // bottom:hp('10%')
                }}
                >
                <Timer
                  ref={this.timerRef}
                  formatTime = "hh:mm:ss"
                  textStyle={{color:"white",fontSize:40}}
                  onTimes={e => {}}
                  onPause={e => {}}
                  onEnd={e => {}}
                />
              </View>
              <View
                style={{
                  justifyContent: 'center',
                  alignItems:'center'
                }}>
                  <Text style={{color:'white'}}>LANGUE</Text>
                  <FlatList
                    data={myLang}
                    extraData={this.props}
                    keyExtractor={(item) => item.id}
                    // refreshing={this.state.refreshing}
                    // horizontal={true}
                    // onRefresh={this.handleRefresh}
                    enableEmptySections={true}
                    // renderSeparator={this.ListViewItemSeparator}
                    renderItem={({ item, index }) => (
                      <View
                        style={{
                          justifyContent: 'center',
                          width:wp('25%')
                        }}>
                        {this.LangaudioView(item.id, item.intitule, index, item.abrev)}
                      </View>
                    )}
                  />
              </View>
            </View>
            ):null
          }
          

          {/* plus */}
          <View  
            style={styles.renamContainer}
          >
            {audioFile? 
              (
                <View>
                  {!this.showtransbut?
                    (
                      <View>
                        {/* <Icon name="wave-outline" size={30} color="#000" /> */}
                        <View 
                          style={{
                            // flexDirection:…,
                            width:wp('40%'),
                            alignSelf:'center',
                            // justifyContent:'space-around',
                            // marginTop:hp('20%'),
                            alignItems:'center'
                            }}
                          >
                            <View
                              style={{
                                backgroundColor:'green',
                                padding: 20,
                                borderRadius:60
                              }}
                            >
                              <MaterialIcons name={'multitrack-audio'} size={80} color={'white'}
                               
                              />
                            </View>
                            <View style={{
                           
                              marginTop:20,
                              marginBottom:25
                            }}>
                              <View
                              style={{ flexDirection:'row',
                              justifyContent:'space-between',
                              alignItems:'center',
                              width:wp('50%'),
                              alignSelf:'center'
                              }}>
                                <Text style={{color:'white'}}>{this.state.audioCurrentTime}</Text>
                                <Text style={{color:'white'}}>{this.state.duration}</Text>
                              </View>
                              <Slider
                                style={{ width: wp('60%'), height: 10 }}
                                minimumValue={0}
                                maximumValue={this.state.durationInSeconds}
                                // maximumValue={100}
                                value={this.state.currentPlaybackPosition}
                                minimumTrackTintColor="white"
                                thumbTintColor="green" // Changer la couleur du point en vert
                                maximumTrackTintColor="grey"
                                onSlidingComplete={this.onSliderEditEnd}
                                onSlidingStart={this.onSliderEditStart}
                                onValueChange={this.onSliderEditing}
                                thumbProps={{
                                  children: <View style={{ width: 3, height: 3, borderRadius: 1.5, backgroundColor: 'green' }} />, // Définir la taille et la couleur du point
                                }}
                              />
                            </View>
                          {paused ? 
                          (
                            <View>
                            <TouchableOpacity
                            onPress={() => {this.play(),this.setState({Scolor:'green',Stopcolor:'grey'})}}
                            disabled={!audioFile}
                            style={{
                            backgroundColor: 'white',
                            width:50,
                            height:50,
                            borderRadius:50,
                            justifyContent:'center',
                            alignItems:'center'
                            }}
                            >
                            <MaterialIcons name={'play-arrow'} size={35} color={'#020D4D'}
                            style={{
                            }}
                            />
                            </TouchableOpacity>
                        
                          
                            </View>
                          ):
                          (
                            <TouchableOpacity
                              onPress={() => {this.pause(),this.setState({Scolor:'green',Stopcolor:'grey'})}}
                              disabled={!audioFile}
                              style={{
                              backgroundColor: 'white',
                              width:50,
                              height:50,
                              borderRadius:50,
                              justifyContent:'center',
                              alignItems:'center'
                              }}
                              >
                              <Icon name={'pause'} size={30} color={'#020D4D'}/>
                            </TouchableOpacity>
                            )
                          }
                        </View>
                        {!this.state.trans?
                          (
                            <View> 


<View style={styles.renameModal}>
          {/* <View style={styles.header}>
            <TouchableOpacity onPress={()=>alert('ok')}>
              <View style={styles.headerContent}>
                <Icon name="arrow-back-outline" size={25} color="white" style={styles.icon} />
                <Text style={styles.headerText}>Enregistrement audio</Text>
              </View>
            </TouchableOpacity>
          </View> */}

          <View style={styles.renamContainer}>
            <Text style={styles.renameTitle}>Audio legend </Text>
            <TextInput
              style={[styles.place, this.state.error && { borderColor: 'red', borderWidth: 2 }]}
              placeholder="Audio-01-02-2023.wav"
              underlineColorAndroid="transparent"
              value={this.state.audioLegend}
              onChangeText={(text) => this.setState({ audioLegend: text, error: false })} 
            />

            <Text style={styles.label}>Theme</Text>
            <TouchableOpacity 
            onPress={() => this.setState({showInput:true})}
            style={[styles.newCategoryButton, this.state.errorCat && { borderColor: 'red', borderWidth: 2 }]}>
              <Text style={styles.buttonText}>+ New Theme</Text>
            </TouchableOpacity>
            {this.state.showInput && (
              <View style={styles.newCategoryContainer}>
                <TextInput
                  style={styles.place}
                  placeholder="Nouvelle catégorie"
                  value={this.state.newCategory}
                  onChangeText={(text) => this.setState({ newCategory: text })}
                />
                <View style={styles.buttonRow}>
                  <TouchableOpacity onPress={this.handleSaveCat} style={styles.saveButton}>
                    <Text style={styles.buttonText}>SAVE</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => this.setState({ showInput: false })} style={styles.cancelButton}>
                    <Text style={styles.buttonText}>CANCEL</Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}


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
            <View style={styles.buttonContainer}>
            <TouchableOpacity 
              onPress={() => {
                if (!this.state.audioLegend) {
                  this.setState({ error: true });
                  setTimeout(() => this.setState({ error: false }), 2000); // Supprime l'erreur après 2 sec
                } else if (!this.state.selectedCategory) { // Correction de "elseif" -> "else if" et ajout de "this.state."
                  this.setState({ errorCat: true });
                  setTimeout(() => this.setState({ errorCat: false }), 2000);
                } else {
                  this.transcript();
                  this.setState({ trans: false });
                }
              }}
              style={styles.saveButton}
            >
              <Text style={styles.buttonText}>TRANSCRIPTION</Text>
            </TouchableOpacity>


              <TouchableOpacity style={styles.cancelButton}
               disabled={this.state.expres ==''}
               onPress={()=>{this.setState({audioFile:''})}}
               >
                <Text style={styles.buttonText}>CANCEL</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
                              {/* ancien code */}
                            

                            </View>
                          ):null
                        }
                      </View>
                    ):null
                  }
                </View>
              ):null
            }
          </View>
          {this.state.transcripts?
            ( 
              <View 
                style={{
                  position:'absolute',
                  top:hp('80%'),
                  alignSelf:'center'
                  }
                }
                >
                <Text 
                  style={{
                    color:'white'
                    }
                  }
                  >
                  {this.state.percentCompleted}%
                </Text>
                <Progress.Bar progress={this.state.percentCompleted/100} width={200} color= {'white'} />
              </View>
            ):null
          }
          <View
            style={{alignItems:'center'}}
            >
            {this.state.transcripts?
              (
                <View
                  style={{alignItems:'center',
                    position:'absolute',
                    top:hp('18%')
                    }}
                  >
                  <Spinner  color={'#C9A022'} size={35} type={'FadingCircle'} />
                </View>
              ):null
            }
          </View> 
          <View style={{justifyContent:'center'}}>
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
                    style={{fontSize:hp('2%'),bottom:hp('2%'),fontWeight:'bold'}}
                    >
                    {I18n.t('Uploading and transcripting')}!
                    </Text>
                  </View>
                ):null
              }
            </View>
          </View>
          {!audioFile?
            (
              <View 
              style={{
                flexDirection:'row',
                justifyContent:'space-around',
                // display:'none',
                // position:'absolute',
                bottom:hp('0%'),
                width:wp('100%'),
                // backgroundColor:'green',
                padding:10
                }}
                >
                {/* {recording?
                  (
                    <TouchableOpacity
                      onPress={() =>{
                        this.stop().then(()=>{
                          this.start(),this.setState({Scolor:'grey',Stopcolor:'green',Plcolor:'grey',choice:false})
                          })
                        }
                      }
                      disabled={!recording}
                      style={{width:50,height:50,backgroundColor:'white',borderRadius:50,justifyContent:'center',alignItems:'center'}
                      }
                      >     
                      <View>
                        <Icon name={'refresh-outline'} size={25} color={'#55C3D1'}/>
                      </View>
                    </TouchableOpacity>
                  ):
                  (
                      <TouchableOpacity
                        onPress={() =>{
                          this.stop().then(()=>{
                            this.start(),this.setState({Scolor:'grey',Stopcolor:'green',Plcolor:'grey',choice:false})
                            })
                          }
                        }
                        disabled={!recording}
                        style={
                        {width:50,height:50,backgroundColor:'white',borderRadius:50,justifyContent:'center',alignItems:'center',opacity:0.9, borderWidth:4, borderColor:'#384192'}
                        }
                        >     
                        <View>
                          <Icon name={'refresh-outline'} size={25} color={'#55C3D1'}/>
                        </View>
                      </TouchableOpacity>
                  )
                } */}
                {!recording?
                  ( 
                    <TouchableOpacity
                      onPress={() =>{
                          this.start(),this.setState({Scolor:'grey',Stopcolor:'green',Plcolor:'grey',choice:false
                          })
                        }
                      }
                      disabled={recording}
                      style={{
                        width:60,
                        height:60,
                        backgroundColor:'#EA1E69',
                        borderRadius:50,
                        justifyContent:'center',
                        alignItems:'center',
                        // position:'relative',
                        marginBottom:hp('25%')
                        }
                      }
                      >
                      <Icon name={'mic'} size={25} color={'white'}/>
                    </TouchableOpacity>
                  ): null
                  
                }
                              
                {recording?
                  (
                    <TouchableOpacity
                      onPress={() => {
                        this.stop(),this.setState({Scolor:'green',
                            Stopcolor:'grey',
                            Plcolor:'green',
                            // renameAudio:true
                            }
                          )
                        }
                      }
                      disabled={!recording}
                      style={{
                        width:60,
                        height:60,
                        backgroundColor:'white',
                        borderRadius:50,
                        justifyContent:'center',
                        alignItems:'center',
                        marginTop:5,
                        marginBottom:hp('25%')
                      }
                      }
                      >     
                      <View>
                        <Icon name={'stop'} size={25} color={'#55C3D1'}/>
                      </View>
                    </TouchableOpacity>
                  ):null
                }  
              </View>
            ):
            null
          }
        </View>

        </View>
        <AudioTextModal
          visible={this.state.newText}
          category={this.props.category}
          selectedCategory={this.state.selectedCategory}
          audioLegend={this.state.audioLegend}
          userInfo={this.props.userInfo}
          onClose={() => this.closeModal()}
          defaultText={this.state.transaudio}
          tosend={this.state.tosend}
          save={() => {
            this.closeModal(),
                this.setState({ data: this.props.data }),
              alert('Expression saved');
          } }
          navigation={this.props.navigation}
        />
        <RenameAudio visible={false} onClose={() => this.closeModal()} navigation={this.props.navigation} list = {()=>alert('fonction exploitable')} newp = {()=>{this.closeModal(),this.setState({renameAudio:false})}} />
     </ModalLayout>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center'
    // backgroundColor:'#020D4D',
    // backgroundColor:'#192356',
    // backgroundColor:'green',
    // height:hp('90%')
  },
  container2: {
    flex: 1,
    // justifyContent: 'center'
    backgroundColor:'#020D4D',
    // backgroundColor:'#192356',
    // backgroundColor:'green',
    // height:hp('90%')
  },
  row: {
    top:hp('2%'),
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems:'center'
  },
  placeP:{
    top:50,
    color:'blue', 
    fontSize:hp('2.5%'),
    width: wp('80%'),
    height:hp('20%'),
   borderColor:'#C9A022',
   borderWidth:2,
    marginLeft:hp('6%'),
    // opacity:0,
  },
   btn:{
    padding:25,
//  borderRadius:27,
    backgroundColor:'#2f3c7e',
    justifyContent:'center',
    marginHorizontal:wp('12%'),
    marginVertical:hp('5%'),
    height:hp('0.2%'),
    width: wp('22%'),

   },
   btntex:{
color:'white'

   },





   renameModal: {
    // backgroundColor: '#1C2E4A',
    borderRadius: 5,
    alignSelf: 'center',
    width: wp('100%'),
    height: hp('100%'),
  },
  header: {
    justifyContent: 'center',
    height: hp('8.5%'),
    width: wp('100%'),
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 15,
  },
  icon: {
    alignSelf: 'center',
    marginLeft: 5,
  },
  headerText: {
    color: 'white',
    fontSize: hp('2.2%'),
    marginLeft: wp('20%'),
  },
  renamContainer: {
    // backgroundColor: '#2D3E5E',
    borderRadius: 5,
    alignSelf: 'center',
    // width: wp('80%'),
    // height: hp('50%'),
    marginTop: 10,
    padding: 15,
  },
  renameTitle: {
    color: 'white',
    fontSize: 16,
    textAlign: 'left',
    marginBottom: 10,
  },
  place: {
    padding: 8,
    borderRadius: 5,
    backgroundColor: 'white',
    width: wp('70%'),
    alignSelf: 'center',
    marginBottom: 10,
  },
  label: {
    color: 'white',
    fontSize: 14,
    marginBottom: 5,
  },
  newCategoryButton: {
    backgroundColor: '#48A2F1',
    borderRadius: 5,
    padding: 10,
    alignItems: 'center',
    alignSelf: 'center',
    marginBottom: 10,
  },
  categoryContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },
  category: {
    backgroundColor: '#3E4A6F',
    color: 'white',
    padding: 8,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  saveButton: {
    backgroundColor: '#48A2F1',
    borderRadius: 5,
    padding: 10,
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: '#EA1E69',
    borderRadius: 5,
    padding: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 14,
  },
  buttonRow: { flexDirection: 'row', justifyContent:'space-around', marginTop: 10, marginBottom:25},
  newCategoryContainer: { 
    padding: 20,
    backgroundColor: '#2D3E5E',
    borderRadius:15,
    marginBottom:25
  },
  selectContainer: {
    marginTop:15,
    marginBottom:20,
    // // width:'70%',
    backgroundColor:'#2D3E5E',
    // alignSelf:'center',
    color:'white',
    // borderWidth:1,
    borderColor:'white',
    borderRadius:5
  },
  pickerItems: {
    fontSize: 16,
    color: 'transparent', // Texte en blanc
    height: 44,
  },
  textContainer:{
    backgroundColor:'white', 
    color:'black', 
    textAlign:'justify', 
    marginBottom:10, 
    paddingTop:25,
    padding:10, 
    borderRadius:5
  },
  // saveButton: { backgroundColor: 'green', padding: 10, flex: 1, marginRight: 5 },
  // cancelButton: { backgroundColor: 'red', padding: 10, flex: 1, marginLeft: 5 },
});

const mapStateToProps = (state) => ({
  userInfo: state.auth.userInfo,
  audioData : state.data_Audio.audioData,
  category: state.categ.category
});

const mapDispatchToProps = (dispatch) => {
  return {
    dispatchfetchData:id => dispatch(fetchData(id)),
    dispatchfetchAudio:id => dispatch(fetchAudio(id)),
    getCat:id_groupe => dispatch(getCat(id_groupe)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps )(Enregistre);
