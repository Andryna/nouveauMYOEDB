import React, { Component } from 'react';
import { StyleSheet, FlatList,View, Button,TextInput,TouchableOpacity,Text,Image, Modal } from 'react-native';

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

// import {SpeechToText} from 'react-native-watson-speech-to-text';
const base_url = config.base_url;
export default class Enregistre extends Component {
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
    super(props);
    this.state = {
      users:false,
      audioFile: '',
      isLoading:false,
      recording: false,
      loaded: false,
      paused: true,
      currentTime: 0.0,
      infolangue: this.props.navigation.state.params.PickerValueHolder,
      PickerValueHolder: this.props.navigation.state.params.idlangue,
      id: this.props.navigation.state.params.id1, 
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
      idecate:this.props.navigation.state.params.idecat,
      dataSource:this.props.navigation.state.params.dataSource,
      trand:this.props.navigation.state.params.trand,
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
      response: {
      path: 'file://file:///data/user/0/com.forma2p/files/test.wav',
      fileName: 'test.wav',
      size: 'your_file_size'
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
  handleFetchBlobError = (error) => {
    console.log('Fetch Blob Error:', error);
  };

  handleWriteFileError = (error) => {
    console.log('Write File Error:', error);
  };
  sound = null;
  
// SpeechToText.initialize("");

  async componentDidMount() {
    await this.checkPermission();

    const options = {
      sampleRate: 32000,
      channels: 1,
      bitsPerSample: 16,
      audioSource: 6,
      wavFile: 'test.wav',
      // startRecording()
    };
    // startRecording();
    AudioRecord.init(options);

    AudioRecord.on('data', data => {
      // const chunk = Buffer.from(data, 'base64');
      // console.log(chunk.toString('base64'));
      // this.compte();// do something with audio chunk
// this._sendChunk(chunk);
// this.socket.on('dong', this._getReply);
    });
  }
  // _sendChunk(chunk){

  //   socket.emit('binaryData',chunck);
  // }
  
  // _getReply(data){

  //   console.log('Reply from server:' + data);
  // }

//   testparse= () =>{
// const idint=parseInt(this.state.id);
// alert(idint);
//   }
openSearch() {
 alert('search')
}
openPlus() {
 this.setState({plus:true});
}
openHome() {
 this.props.navigation.navigate('Accueil');
}
handleTranslate = (itemValue) => {
  if(itemValue!=''){
    
    this.setState({picIdlangue:itemValue});
    // console.log(this.state.expres+'_%_'+itemValue.substring(0,2));
    TranslatorConfiguration.setConfig(ProviderTypes.Google, config.googleCloud.apiKey,itemValue.substring(0,2));
    // config.googleCloud.apiKey
    const translator = TranslatorFactory.createTranslator();
    translator.translate(this.state.transaudio).then(translated => {
          Tts.setDefaultLanguage(itemValue);
            this. setState({targTEXT:translated})
    });
   }else {
     alert('This option is not available');
   }

                // this.setState({submit: true})
                // const translator = TranslatorFactory.createTranslator();
                // translator.translate(text).then(translated => {
                //     Tts.getInitStatus().then(() => {
                //         // Tts.speak(translated);
                //         this. setState({targTEXT:translated,expres:text})
                //     });
                //     Tts.stop();
  // });
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
  // style={{
  //   backgroundColor:'red'
  // }}
  onPress={()=>{this.setState({idLan:id}),this.handleTranslate(abrev)}}>
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
    console.log('start record');
    this.setState({ audioFile: '', recording: true, loaded: false });
    AudioRecord.start();
    this.timerRef.current.start();
  };

  stop = async () => {
    if (!this.state.recording) return;
    console.log('stop record');
    let audioFile = await AudioRecord.stop();
    console.log('audioFile', audioFile);
    this.setState({ audioFile, recording: false,  });
    const pathtoAudio = 'file://' + audioFile;
    // alert(pathtoAudio);



    // rnfs
    RNFS.stat(pathtoAudio)
    .then(res => {
      const fileSizeInBytes = res.size;
  
      // Créez un objet de fichier à partir du chemin du fichier audio
      const resp = {
        path: pathtoAudio,
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





    // 
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
      const audiotime =  `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
      this.setState({duration:audiotime});
      console.log(audiotime);
    });
  };

  chunkuploadAudio = () => {
    const pathtoAudio = 'file://' + this.state.audioFile;
    const newresp = this.state.response;
    console.log(newresp);

    // Demander la permission WRITE_EXTERNAL_STORAGE
    // const permissionResult = await request(PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE);
    // const permissionRead = await request(PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE);
    // if (permissionResult !== 'granted') {
    //   console.log(permissionResult);
    //   return;
    // }
    // if (permissionRead !== 'granted') {
    //   console.log(permissionRead);
    //   return;
    // }
  
    // RNFS.stat(pathtoAudio)
    // .then(response => {
    //   const fileSizeInBytes = response.size;
  
    //   // Créez un objet de fichier à partir du chemin du fichier audio
    //   const audioFile = {
    //     path: 'file://' + pathtoAudio,
    //     size: fileSizeInBytes,
    //     fileName: 'test.wav',
    //     type: 'audio/wav' // Type MIME du fichier
    //     // Ajoutez d'autres propriétés si nécessaire
    //   };
    //   console.log(audioFile);
    //   const chunk = new ChunkUpload({
    //     path: audioFile.path,
    //     size: 10095,
    //     fileName: "test.wav",
    //     fileSize: fileSizeInBytes,
    //     onFetchBlobError: e => console.log(e),
    //     onWriteFileError: e => console.log(e)
    //   });
    //   // const chunkIndex = 0;
    //   // Appel à la méthode digIn en fournissant l'objet de fichier
    //   // console.log('chunk',chunk);
    
    //   // chunk.readChunk(chunkIndex)
    //   //   .then(chunkData => {
    //   //     // chunkData est un objet contenant les données du chunk
    //   //     // Utilisez chunkData.data pour accéder aux données binaires du chunk
    //   //     console.log('Contenu du chunk :', chunkData.data);
    //   //   })
    //   //   .catch(error => {
    //   //     console.error('Erreur lors de la lecture du contenu du chunk :', error);
    //   //   });
    // })
    // .catch(error => {
    //   console.error('Erreur lors de la lecture de la taille du fichier:', error);
    // });
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
    // console.log(file.headers["x-chunk-total-number"]);
    // for (let [key, value] of body.entries()) {
    //   console.log(`Champ "${key}":`, value);
    // }
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
  };

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

    this.sound.play(success => {
      if (success) {
        console.log('successfully finished playing');
      } else {
        console.log('playback failed due to audio decoding errors');
      }
      this.setState({ paused: true });
      // this.sound.release();
    });
  };

  // uploadAudio = async () => {
  //   const path = `file://${audioFile}`
  //   const formData = new FormData()
  //   formData.append('file', {
  //     uri: path,
  //     name: 'test.aac',
  //     type: 'audio/aac',
  //   })
  //   try {
  //     const res = await fetch(API_UPLOAD_MSG_FILE, {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'multipart/form-data',
  //       },
  //       body: formData,
  //     })
  //     const json = await res.json()
  //   } catch (err) {
  //     alert(err)
  //   }
  // }
  testrans= async () => {
    const url = "54.36.183.14:5007/transcript";
    const filename= "10304_1594802100.wav"
    
    const formData = new FormData();

    formData.append('filename',filename);
    // formData.append('targL',Picker);
    // formData.append('recording',{
    //   uri: path,
    //   name: 'test.wav',
    //   type: 'audio/wav',
    // });
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
        // alert('Audio saved');
    console.log(responseJson);
        // alert('Login ou mot de passe invalide');
      }
      // const json = await response.json()
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
    
        // alert('Login ou mot de passe invalide');
      }
      // const json = await response.json()
    })
  } catch (err) {
      console.log(err)
    }
  }
  

  transcript = async () => {
    this.setState({transcripts:true,transcribed:false});
    // this.animation();
    // http://10.0.2.2/projet  https://elprod.forma2plus.com/disk2/elearning2021_test/elearning2021/login
    const url = base_url + "/portail-stagiaire/upaudio.php";
    const {audioFile}=this.state;
    const path = 'file://'+audioFile;
    const {infolangue}=this.state;
    // alert(path);
    const formData = new FormData();
    const id=this.state.id;
    const Picker=this.state.PickerValueHolder.id;
    formData.append('id_stag',id);
    formData.append('targL',Picker);
    formData.append('infolangue',infolangue);
    formData.append('id_groupe',this.state.id_groupe);
    formData.append('recording',{
      uri: path,
      name: 'teste.wav',
      type: 'audio/wav',
    });
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
              this.setState({transcripts:false,transaudio:resp.data.result,pathaudio:resp.data.audio,percentCompleted:'100',transcribed:true,showtxt:true});
              // alert('transcribed');
              console.log(this.state.transaudio);
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

                              alert('Audio saved');
                              // console.log(responseJson.test_txt,responseJson.idexp);
                              console.log(responseJson);
                              // this.getstat(transaudio,responseJson.idexp);
                            }
                   })
       } catch (err) {
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

  render() {
    const { recording, paused, audioFile } = this.state;
    const { goBack } = this.props.navigation;
    const {isLoading}=this.state;
    // if (this.state.isLoading) {
    //   return (

    //     <View style={{backgroundColor: 'transparent',height:hp('20%'),justifyContent:'center',alignItems:'center'}}>
    //          <Text
    //          style={{
    //            fontSize:hp('3%'),
    //            color:'#4F2C8A',
    //          }}
    //          > 
    //          Uploading audio
    //          </Text>
    //          <Spinner
    //          color={'#C9A022'} size={75} type={'Wave'} 
    //          />
    //     </View>      
    //   );
    // }
    return (
      <View style={styles.container}>
<View style={{ justifyContent: 'center', height: hp('8.5%'),width:wp('100%'),backgroundColor:'#0C1D65'}}>
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
                    marginLeft: wp('8%'),
                    fontSize: hp('2.2%'),
                    position: 'absolute',
                    bottom: -4
                  }}>
                   {/* {I18n.t('home')} */}
                  </Text>) : (

                      <View><Text style={{
                            color: 'white',
                            marginLeft: wp('22%'),
                            fontSize: hp('2.2%'),
                            textAlign:'center'

                          }}>
                            {/* {I18n.t('ALL EXPRESSIONSs')} */}
                            ENREGISTREMENT AUDIO
                          </Text>
                      </View>)}
                </View>
              </TouchableOpacity>
            
          
              
              <View >
              </View>
            </View>
          </View>
       {!audioFile?(   <View
          style={{
          flexDirection:'row',
          marginTop:hp('20%'),
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

      <Modal 
    transparent={true}
    animationType="fade"
    visible={this.state.users}
    >
              <TouchableOpacity onPress={() => this.setState({users:false}) }
              style={{with:wp('100%'),height:hp('100%')}}>
                        <View style={{top:hp('7%'),width:wp('30%'), marginLeft:wp('70%')}}>
                                  <View style={{backgroundColor:'#2f3c7e',height:hp('6.5%'),borderWidth:1,borderColor:'white'}}>
                                            <TouchableOpacity
                                            onPress={() =>{this.setState({users:false}),this.props.navigation.navigate('User',{
                                            login1:this.state.login,
                                            nom1:this.state.nom1,
                                            prenom1:this.state.prenom1,
                                            email1:this.state.email1,
                                            tel1:this.state.tel1,
                                            adresse1:this.state.adresse1,
                                            cp1:this.state.cp1,
                                            ville1:this.state.ville1,
                                            password1:this.state.password1,
                                            id1:this.state.id
                                            })}}
                                            style={{
                                              flexDirection:'row',
                                              alignSelf:'center'
                                            }}
                                            >
                                              <Icon name={'ios-contact'} size={20} color={'white'}/>
                                                      <Text style={{color:'white',fontSize:hp('2%'),textAlign:'center',marginLeft:wp('3%')}}>My profil
                                                      </Text>
                                            </TouchableOpacity>
                                  </View> 
                        <View style={{backgroundColor:'#2f3c7e',height:hp('6.5%'),borderWidth:1,borderColor:'white'}}>
                                  <TouchableOpacity 
                                  style={{
                                    flexDirection:'row',
                                    alignSelf:'center'
                                  }}
                                  onPress={() =>{this.props.navigation.navigate('Login'),this.setState({users:false}),this.removeUser()}}>
                                            <Icon name={'md-log-out'} size={20} color={'white'}/>
                                            <Text style={{color:'white',fontSize:hp('2%'),textAlign:'center',marginLeft:wp('3%')}}>Logout
                                            </Text>
                                  </TouchableOpacity>
                        </View> 
                        </View>
              </TouchableOpacity>
    </Modal>
    <Modal
        transparent={true}
        animationType="fade"
        visible={this.state.choice}
    >
    <View
                   style={{
                     flexDirection:'row',
                     justifyContent:'space-evenly',
                    //  position:'absolute',
                     top:hp('40%')
                    //  margin:30
                   }}
                   >
                          <TouchableOpacity
                          onPress={() => {this.start(),this.setState({Scolor:'grey',Stopcolor:'green',Plcolor:'grey',choice:false})}}
                          >
                                  <View
                                  style={{
                                    backgroundColor:'blue',
                                    height:hp('8%'),
                                    justifyContent:'center',
                                    padding:10
                                  }}>
                                        <Text
                                        style={{
                                          color:'white'
                                        }}>
                                        Record audio
                                        </Text>
                                  </View>
                          </TouchableOpacity>
                          <TouchableOpacity
                          onPress={() => this.setState({choice:false,recAudio:true})}
                          >       
                                  <View
                                  style={{
                                    backgroundColor:'blue',
                                    height:hp('8%'),
                                    justifyContent:'center',
                                    padding:10
                                  }}>
                                        <Text
                                        style={{
                                          color:'white'
                                        }}>
                                        Real time transcription
                                        </Text>
                                  </View>
                          </TouchableOpacity>
                         
                   </View>
    </Modal>




{/* plus */}
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
                                            onPress={() => this.setState({create:true})}>
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
                                    onPress={() => this.setState({show1:true})}>
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
{/* plus */}


                 <View >
               
                          

                          

                          {/* <Button onPress={this.start} title="Record" disabled={recording} />
                          <Button onPress={this.stop} title="Stop" disabled={!recording} /> */}
                         
                                      {audioFile? 
                                  (<View>
                                      {!this.showtransbut?
                                      (
                                      <View>
                                      <View style={{
                                          flexDirection:'row',
                                          width:wp('40%'),
                                          alignSelf:'center',
                                          justifyContent:'space-around',
                                          marginTop:hp('20%'),
                                          // backgroundColor:'white'
                                        }}>
                                              {paused ? (
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
                                                // width:wp('16%')
                                              }}
                                              >
                                                        <MaterialIcons name={'play-arrow'} size={35} color={'#020D4D'}
                                                          style={{
                                                        }}
                                                          />
                                              </TouchableOpacity>):
                                                (<TouchableOpacity
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
                                                      <Icon name={'ios-pause'} size={30} color={'#020D4D'}/>
                                              </TouchableOpacity>
                                            )}
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
                                                    <Icon name={'stop'} size={30} color={'#020D4D'}/>
                                            </TouchableOpacity>
                                      </View>
                                {/* autre */}


                                  {!this.state.trans?
                                          (<View style={{width:wp('100%'),alignSelf:'center',marginTop:hp('7%')}}>
                                                  <View style={{width:wp('100%'),alignSelf:'center',flexDirection:'row'}}>
                                                            {/* <TouchableOpacity
                                                            onPress={() =>{this.transcript(),this.setState({trans:false})}}
                                                            style={{
                                                              flexDirection:'row',
                                                              alignSelf:'center'
                                                            }}
                                                            >
                                                                      <Text style={{color:'white',fontSize:hp('2%'),textAlign:'center',marginLeft:wp('3%')}}>Transcript to text
                                                                      </Text>
                                                            </TouchableOpacity> */}
                                                            <TouchableOpacity style={{marginLeft:wp('5%'),width:wp('45%'), height:hp('12%'),backgroundColor:'#DC4F89',borderRadius:10,alignItems:'center',justifyContent:'center'}}
                                                            disabled={this.state.expres ==''}
                                                            onPress={() =>{this.transcript(),this.setState({trans:false})}}
                                                            >
                                                                      <Text style={{color:'white',fontWeight: 'bold',fontSize:14}}>
                                                                      {I18n.t('Get transcription')} 
                                                                      </Text>
                                                            </TouchableOpacity>
                                                          <TouchableOpacity style={{marginLeft:wp('5%'),width:wp('45%'), height:hp('12%'),backgroundColor:'#62CAD6',borderRadius:10,alignItems:'center',justifyContent:'center'}}
                                                                                  disabled={this.state.expres ==''}
                                                                                  onPress={() =>{this.uploadAudio(),this.setState({isLoading:true})}}
                                                                                  >
                                                                                            <Text style={{color:'white',fontWeight: 'bold',fontSize:14}}>
                                                                                            {I18n.t('Tanscript and save')}
                                                                                            </Text>
                                                          </TouchableOpacity> 
                                                          
                                                  </View> 
                                                  {/* <TouchableOpacity 
                                                    style={
                                                      {marginLeft:wp('5%'),
                                                      width:wp('45%'), 
                                                      height:hp('12%'),
                                                      backgroundColor:'#62CAD6'
                                                      ,borderRadius:10,
                                                      alignItems:'center',
                                                      justifyContent:'center'
                                                    }}
                                                    disabled={this.state.expres ==''}
                                                    onPress={() => this.handleUpload()}
                                                  >
                                                    <Text style={{color:'white',fontWeight: 'bold',fontSize:14}}>
                                                      Test chunk-Upload
                                                    </Text>
                                                  </TouchableOpacity>  */}
                                            </View>):null}
                                      </View>):null}
                                      
                              
                                </View>):null}
                         
                          









                            {/* <TouchableOpacity  style={{width:wp('20%'),height:hp('8%'),justifyContent:'center',alignItems:'center',flexDirection:'row',backgroundColor:'blue'}}
                                      onPress={() => this.uploadAudio()}>
                                      {/* send */}
                                      {/* <Text  style={{fontSize:hp('2.5%'),marginLeft:wp('2%'),color:'white'}}>
                                          UPLOAD
                                      </Text> */}
                                      {/* <Icon style={{marginLeft:wp('3%'),bottom:hp('1%')}}
                                      name={'ios-send'} size={30} 
                                      color={'#2f3c7e'}  
                                                /> */}
                            {/* </TouchableOpacity> */}

                  </View>





                  {this.state.transcripts?( <View style={{
                    position:'absolute',
                    top:hp('80%'),
                    alignSelf:'center'
                  }}>
                    <Text style={{
                      color:'white'
                    }}>
                      {this.state.percentCompleted}%
                    </Text>
                    <Progress.Bar progress={this.state.percentCompleted/100} width={200} color= {'white'} />
                    {/* <Progress.Pie progress={this.state.percentCompleted} size={50} />
                    <Progress.Circle size={30} indeterminate={true} progress={this.state.percentCompleted} /> */}
                    {/* <Progress.CircleSnail color={['red', 'green', 'blue']} progress={this.state.percentCompleted}/> */}
                  </View>):null}


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
          ):(null)
         }
        
      </View> 
                
                  {/* <View>
                    <Text>
                      {this.state.id_groupe}
                    </Text>
                  </View> */}

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
          ):(null)
         }
        
      </View>
                  </View>
                  {/* <Modal 
    transparent={true}
    animationType="slide"
    visible={true}
    >
      <View>
        <Spinner  color={'#C9A022'} size={75} type={'Wave'} />
      </View>
    </Modal> */}
    {/* <View style={{
                              // top:hp('70%'),
                              alignSelf:'center',
                              position:'absolute',
                              bottom:0
                              }}>
                                    <TouchableOpacity onPress={() =>{this.props.navigation.goBack()}}>
                                              <Icon name={'ios-home'} size={30} 
                                              color={'#2f3c7e'}  
                                                        />
                                    </TouchableOpacity>
                            </View> */}
                            {!audioFile?(
                              <View style={{
                    flexDirection:'row',
                    justifyContent:'space-around',
                    // marginTop:hp('10%')
                    position:'absolute',
                    bottom:hp('20%'),
                    width:wp('100%')
                  }}>

                 {!recording?( 
                 
                 <TouchableOpacity
                  // onPress={this.start,}
                  onPress={() =>{this.start(),this.setState({Scolor:'grey',Stopcolor:'green',Plcolor:'grey',choice:false})}}
                  disabled={recording}
                  style={
                    {width:60,height:60,backgroundColor:'#EA1E69',borderRadius:50,justifyContent:'center',alignItems:'center'}
                  }
                  >
                          <Icon name={'mic'} size={40} color={'white'}/>
                  </TouchableOpacity>):( <TouchableOpacity
                  // onPress={this.start,}
                  onPress={() =>{this.start(),this.setState({Scolor:'grey',Stopcolor:'green',Plcolor:'grey',choice:false})}}
                  disabled={recording}
                  style={
                    {width:60,height:60,backgroundColor:'#62CAD6',borderRadius:50,justifyContent:'center',alignItems:'center',opacity:0.3}
                  }
                  >
                          <Icon name={'mic'} size={40} color={'white'}/>
                  </TouchableOpacity>)}
                  
                         {recording?(
                         <TouchableOpacity
                          onPress={() => {this.stop(),this.setState({Scolor:'green',
                                                                     Stopcolor:'grey',
                                                                     Plcolor:'green',
                                                                    //  trans:true
                                                                    })}}
                          disabled={!recording}
                            style={
                              {width:50,height:50,backgroundColor:'white',borderRadius:50,justifyContent:'center',alignItems:'center',marginTop:5}
                            }
                          >     
                          <View>
                                  <Icon name={'stop'} size={25} color={'#55C3D1'}/>
                          </View>
                          </TouchableOpacity>):(<TouchableOpacity
                          onPress={() => {this.stop(),this.setState({Scolor:'green',
                                                                     Stopcolor:'grey',
                                                                     Plcolor:'green',
                                                                    //  trans:true
                                                                    })}}
                          disabled={!recording}
                            style={
                              {width:50,height:50,backgroundColor:'white',borderRadius:50,justifyContent:'center',alignItems:'center',marginTop:5,opacity:0.5}
                            }
                          >     
                          <View>
                                  <Icon name={'stop'} size={25} color={'grey'}/>
                          </View>
                          </TouchableOpacity>)}  
                  </View>
                            ):(
                            <TouchableOpacity
                            onPress={()=>{this.setState({audioFile:''})}}
                            style={
                              {width:60,height:60,backgroundColor:'#EA1E69',borderRadius:50,justifyContent:'center',alignItems:'center',position:'absolute',alignSelf:'center',bottom:hp('20%')}
                            }
                            >
                              <Icon name={'add-outline'} size={30} color={'white'}/>
                            </TouchableOpacity>
                            )}
         
    
       <View
          style={{
            backgroundColor:'#020D4D',
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

<Modal
transparent={true}
animationType="slide"
visible={this.state.showtxt}

>
      <View
                      style={{
                        // backgroundColor:'red',
                        height:hp('100%'),
                        marginTop:hp('10%')
                      }}
                      >
                      
                          
  {this.state.transcribed? (<View
  style={{
    width:wp('100%'),
    height:hp('80%'),
    backgroundColor:'#020D4D',
    // backgroundColor:'red',
    position:'absolute',
    top:0
  }}>
        
        <Text
        style={{
          textAlign:'center',
          fontWeight:'bold',
          fontSize:16,
          color:'white',
          marginBottom:5
          
          

        }}
        >
            {I18n.t('Your speech')}:
        </Text>
        <View style={{
          height:hp('25%'),
          backgroundColor:'white',
          justifyContent:'flex-start'
          }}>
              <Text
              style={{
                textAlign:'center',
                fontSize:14
                // color:'white'
                

              }}>
                  {this.state.transaudio}
              </Text>
        </View>
        <Text
                                style={{
                                  fontSize:hp('2%'),
                                  marginLeft:wp('5%'),
                                  // marginTop:hp('2%'),
                                  opacity:0.5
                                }}>
                                {I18n.t('translate to')} 
        </Text>
        <View
          style={{
          // backgroundColor:'white',
          height:35,
          width:wp('90%'),
          alignSelf:'center',
          flexDirection:'row',
          justifyContent:'space-around',
          // marginTop:hp('3%')
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
        <Text
              style={{
                fontSize:hp('2%'),
                marginLeft:wp('5%'),
                // marginTop:hp('2%'),
                opacity:0.5
              }}>
                {I18n.t('Translated text')}
        </Text>
        <View style={{
          height:hp('25%'),
          backgroundColor:'white',
          justifyContent:'flex-start',
          marginTop:5
          }}>
                <Text
                style={{
                  textAlign:'center',
                  fontSize:hp('1.5%'),
                  

                }}>
                    {this.state.targTEXT}
                </Text>
          </View>
        
        <TouchableOpacity style={{marginLeft:wp('5%'),width:wp('90%'), height:hp('5%'),backgroundColor:'#DC4F89',borderRadius:30,alignItems:'center',marginTop:hp('2%'),justifyContent:'center'}}
                                    disabled={this.state.expres ==''}
                                    onPress={() =>{this.save2(),this.setState({isLoading:true})}}
                                    >
                                              <Text style={{color:'white',fontWeight: 'bold',fontSize:hp('2%')}}>
                                              {I18n.t('SAVE')}
                                              </Text>
          </TouchableOpacity>
          <TouchableOpacity style={{marginLeft:wp('5%'),width:wp('90%'), height:hp('5%'),backgroundColor:'#DC4F89',borderRadius:30,alignItems:'center',marginTop:hp('2%'),justifyContent:'center'}}
                                    disabled={this.state.expres ==''}
                                    onPress={() =>{this.setState({showtxt:false})}}
                                    >
                                              <Text style={{color:'white',fontWeight: 'bold',fontSize:hp('2%')}}>
                                              {I18n.t('CANCEL')}
                                              </Text>
          </TouchableOpacity>
  </View>):null}
      </View>

</Modal>


      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center'
    backgroundColor:'#020D4D'
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
});
