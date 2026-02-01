import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  TouchableHighlight,
  TouchableWithoutFeedback,
  Modal,
  ScrollView,
  Slider,
  Dimensions,
  Picker,
  TextInput,TouchableOpacity,
  FlatList
} from 'react-native';
import Voice from 'react-native-voice';
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen';
// import {  } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { PowerTranslator, ProviderTypes, TranslatorConfiguration, TranslatorFactory} from 'react-native-power-translator';
import Tts from "react-native-tts";
import { RNCamera } from 'react-native-camera';
import Spinner from 'react-native-spinkit';
// import TesseractOcr, { LANG_ENGLISH,LANG_FRENCH } from 'react-native-tesseract-ocr';
import Permissions from 'react-native-permissions';
import config from '../../config.json';
import axios from 'axios';
import * as Progress from 'react-native-progress';
import vision from "react-cloud-vision-api";
import {Timer, Countdown} from 'react-native-element-timer';
import { connect,useDispatch } from 'react-redux';
import { getVideo } from '../actions/videos';
import { getImages } from '../actions/images';
// import { getCat } from '../actions/category';
// import { connectToRedux } from '../config/reduxconfig';
// import vision from "react-cloud-vision-api";
const base_url = config.base_url;

const tessOptions = {};
const flashModeOrder = {
  off: 'on',
  on: 'auto',
  auto: 'torch',
  torch: 'off',
};

const wbOrder = {
  auto: 'sunny',
  sunny: 'cloudy',
  cloudy: 'shadow',
  shadow: 'fluorescent',
  fluorescent: 'incandescent',
  incandescent: 'auto',
};

const landmarkSize = 2;



class CameraScreen extends Component {
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

  state = {
    isLoading:false,
    transcripting:false,
    path:null,
    image:false,
    sendPic:false,
    sendvid:false,
    proff:[],
    PickerValueHolder:'',
    groupe:'14800',
    flash: 'off',
    zoom: 0,
    autoFocus: 'on',
    autoFocusPoint: {
      normalized: { x: 0.5, y: 0.5 }, // normalized values required for autoFocusPointOfInterest
      drawRectPosition: {
        x: Dimensions.get('window').width * 0.5 - 32,
        y: Dimensions.get('window').height * 0.5 - 32,
      },
    },
    depth: 0,
    type: 'back',
    whiteBalance: 'auto',
    ratio: '3:2',
    recordOptions: {
      mute: false,
      // maxDuration: 5,hhhff
      quality: RNCamera.Constants.VideoQuality['480p'],

    },
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
    stopBuser:true,
    picIdlangue:'',
    dataSource:[],
    mot:[],
    targTEXT:'',
    // part:[],
    partialResults: [],
    id: this.props.navigation.state.params.id, //id stagiaire
    PickerValueHolder: this.props.navigation.state.params.idlangue, //PickerValueHolder na  id langue
    infolangue: this.props.navigation.state.params.PickerValueHolder, // juste pour info
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
    idecat:null,
    textimg:'',
    progress:0,
    uploading:false,
    googleVisionDetetion:'',
    scanned:false,
    showbuttonCLose:true,
    showbuttonControl:false,
    percentCompleted:'',
    text:''
    

  };

  constructor(props) {
    super(props);
    //Setting callbacks for the process status
    Voice.onSpeechStart = this.onSpeechStart;
    Voice.onSpeechEnd = this.onSpeechEnd;
    Voice.onSpeechError = this.onSpeechError;
    Voice.onSpeechResults = this.onSpeechResults;
    Voice.onSpeechPartialResults = this.onSpeechPartialResults;
    Voice.onSpeechVolumeChanged = this.onSpeechVolumeChanged;
    this.timerRef = React.createRef();
    // this.state={
    //   id: this.props.navigation.state.params.id,
    //   partialResults:[]
    // }
  }
  componentDidMount() {
    // alert(this.state.id);
     this.checkPermission();
      this.getPicker();
      
      console.log("category: KOA AAAAAAAAAAAA AAAAAAAAAAA AAAAAAAAAAAA AAAAAAAAAAA KOA");
      console.log("category:"+JSON.stringify(this.props.category));
      // this.handleTranslate();
    
      }
  componentWillUnmount() {
    //destroy the process after switching the screen 
    Voice.destroy().then(Voice.removeAllListeners);
  }
  checkPermission = async () => {
    const p = await Permissions.check('android.permission.READ_EXTERNAL_STORAGE');
    const d = await Permissions.check('android.permission.WRITE_EXTERNAL_STORAGE');
    console.log('permission check', p,d);
    if (p === 'authorized' && d === 'authorized') return;
    return this.requestPermission();
  };

  requestPermission = async () => {
    const p = await Permissions.request('android.permission.READ_EXTERNAL_STORAGE');
    const d = await Permissions.request('android.permission.WRITE_EXTERNAL_STORAGE');
    console.log('permission request', p+ 'et' + d);
  };
  // recognizeTextFromImage = async () => {
  //   this.setState({transcripting:true});
  //  const {path}=this.state;
  //   // setIsLoading(true);

  //   try {
  //     const tesseractOptions = {};
  //     const recognizedText = await TesseractOcr.recognize(
  //       path,
  //       LANG_FRENCH,
  //       tesseractOptions,
  //     );
  //     this.setState({textimg:recognizedText,transcripting:false});
  //     alert(this.state.textimg);
  //     console.log(this.state.textimg);
  //     // setText(recognizedText);
  //   } catch (err) {
  //     console.error(err);
  //     this.setState({textimg:'',isLoading:false,progress:0});
  //     // setText('');
  //   }

  //   // setIsLoading(false);
  //   // setProgress(0);
  // };
  onSpeechStart = e => {
    //Invoked when .start() is called without error
    console.log('onSpeechStart: ', e);
    this.setState({
      started: '√',
    });
  };

  onSpeechEnd = async (e) => {

    if(this.state.stopBuser==false){
          this.setState({mot:this.state.mot+' '+this.state.partialResults,partialResults:[]});
          // alert(this.state.partialResults);
          // alert(JSON.stringify(this.state.partialResults)); 

     await Voice.start(this.state.infolangue);

    }else{
      alert('stoped');
      
    }
    
    // //Invoked when SpeechRecognizer stops recognition
    // console.log('onSpeechEnd: ', e);
    // this.setState({
    //   end: '√',
    // });
    // this.handleTranslate();
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
    //Invoked when any results are computed
    // console.log('onSpeechPartialResults: ', e);
    this.setState({ 
      // mot:this.state.partialResults,
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


  // async checkRecognition() {


  //   await Voice.isRecognizing().then(result => {
  //     if (result != 1) {
  //       Voice.start(this.state.infolangue)
  //     } else {
  //       return true
  //     }
  //   })
  // }

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
      stopBuser:false
    });

    try {
      await Voice.start(this.state.infolangue);
    } catch (e) {
      //eslint-disable-next-line
      console.error(e);
    }
  };

  _stopRecognizing = async () => {
    this.setState({stopBuser:true})
   
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
    // alert(JSON.stringify(partialResults.toString()));
    // JSON.stringify(partialResults);
    // const {partialResults}=this.state; 
  // const {PickerValueHolder}=this.state; 
  // const {id}=this.state;
  // alert(PickerValueHolder);
  const{targTEXT}=this.state;
      this.setState({ ActivityIndicator_Loading : true }, () =>
      {
          fetch(base_url + '/portail-stagiaire/savetext.php',
          {
            // 'http://10.0.2.2/projet/save.php'
            // 'https://demo.forma2plus.com/portail-stagiaire/index.php'
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
    // const {partialResults}=this.state;
    // const {part} = useState(partialResults);
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
  handleTranslate = () => {
  
    TranslatorConfiguration.setConfig(ProviderTypes.Google, 'AIzaSyBZZC103oLC2F1dGoJRpYNJnaEM--nMEXg','fr');
    
    const translator = TranslatorFactory.createTranslator();
    translator.translate(this.state.googleVisionDetetion).then(translated => {
          Tts.setDefaultLanguage('fr-FR');
            Tts.speak(translated);
            this. setState({targTEXT:translated})
    });
   

  }
  handleTranslateEn = () => {
  
    TranslatorConfiguration.setConfig(ProviderTypes.Google, 'AIzaSyBZZC103oLC2F1dGoJRpYNJnaEM--nMEXg','en');
    
    const translator = TranslatorFactory.createTranslator();
    translator.translate(this.state.googleVisionDetetion).then(translated => {
          Tts.setDefaultLanguage('en-US');
            Tts.speak(translated);
            this. setState({targTEXT:translated})
    });
   

  }
  lire(){
    Tts.setDefaultLanguage('en-US');
    Tts.stop();
    Tts.speak(this.state.googleVisionDetetion);
 }
 evaluer(){
  //  this.setState({scanning:true})
   lire().then(()=>this.setState({scanning:false}));
 }
reecouter(){
  Tts.setDefaultLanguage(this.state.picIdlangue);
  Tts.stop();
  Tts.speak(this.state.targTEXT);

  // this. setState({targTEXT:translated})

}
removeUser = async () =>{
  try {
    let keys = ['login','nom','prenom','email','tel','adresse','cp','ville','password','id'];
    await AsyncStorage.multiRemove(keys, (err) => {
        console.log('Local storage user info removed!');
      });
  // alert(log);
          //Your logic
 
     
  } catch (error) {
    // Error saving data
  }
}
// closeMod(){
//   this.setState({cam:false});
// }

showprof = () =>{
  const {groupe}=this.state;
  // alert(groupe);
  // const id_groupe=14800;
fetch(base_url + '/portail-stagiaire/pickprof.php', {
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  }
 
}).then((response) => response.json())
.then((response) => {
  this.setState({    
    proff: response
  });
  // alert(JSON.stringify(this.state.proff.prof));
  console.log(this.state.proff);
      }).catch((error) => {
        console.error(error);
      });
  }

toggleFacing() {
  this.setState({
    type: this.state.type === 'back' ? 'front' : 'back',
  });
}

toggleFlash() {
  this.setState({
    flash: flashModeOrder[this.state.flash],
  });
}

toggleWB() {
  this.setState({
    whiteBalance: wbOrder[this.state.whiteBalance],
  });
}

toggleFocus() {
  this.setState({
    autoFocus: this.state.autoFocus === 'on' ? 'off' : 'on',
  });
}

touchToFocus(event) {
  const { pageX, pageY } = event.nativeEvent;
  const screenWidth = Dimensions.get('window').width;
  const screenHeight = Dimensions.get('window').height;
  const isPortrait = screenHeight > screenWidth;

  let x = pageX / screenWidth;
  let y = pageY / screenHeight;
  // Coordinate transform for portrait. See autoFocusPointOfInterest in docs for more info
  if (isPortrait) {
    x = pageY / screenHeight;
    y = -(pageX / screenWidth) + 1;
  }

  this.setState({
    autoFocusPoint: {
      normalized: { x, y },
      drawRectPosition: { x: pageX, y: pageY },
    },
  });
}

zoomOut() {
  this.setState({
    zoom: this.state.zoom - 0.1 < 0 ? 0 : this.state.zoom - 0.1,
  });
}

zoomIn() {
  this.setState({
    zoom: this.state.zoom + 0.1 > 1 ? 1 : this.state.zoom + 0.1,
  });
}

setFocusDepth(depth) {
  this.setState({
    depth,
  });
}

takePicture = async function() {
  if (this.camera) {
    const data = await this.camera.takePictureAsync({base64:true});
    // console.warn('takePicture ', data);
    this.setState({path:data.uri,base64:data.base64,image:true,showbuttonCLose:true});
    // alert(this.state.path);
  }
};
handleprogress =(event)=>{
setUploadProgress(Math.round((event.loaded * 100)/event.total));
}
uploadImage = async () => {
  const {mot,targTEXT,path,idecat,infolangue}=this.state; 
  const {text}=this.state;
  const vrr= path.replace(/^.*(\\|\/|\:)/, '');
  const formData = new FormData();
  const ext=path.slice((path.lastIndexOf('.') - 1 >>> 0) + 2);
  const id=this.state.id;
  const Picker=this.state.PickerValueHolder.id;
  this.setState({uploading:true});
  if (ext==='jpg'){
    formData.append('multipart/form-data');
    formData.append('id_stag',id);
    formData.append('idecat',idecat);
    formData.append('mot',this.state.googleVisionDetetion);
    formData.append('targTEXT',targTEXT);
    formData.append('text',text);
    formData.append('id_groupe',this.state.id_groupe);
    formData.append('picture',{
      uri: path,
      name: vrr,
      type: 'image/jpeg', 
    });
    console.log(JSON.stringify(formData));
    try {
      const urlimage = base_url + "/portail-stagiaire/upload_imageexp.php";
      console.log(urlimage);
      const response = await fetch(urlimage, {
        method: 'POST',
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        body: formData,
      })
      .then((response) => response.json())
      .then((responseJson) => {
      if(responseJson =='')
      {
        alert('no response');
        this.setState({uploading:false});
      }
      else{
        this.setState({uploading:false});
        this.props.getImage(this.state.id)
        .then(() => {
          alert('picture saved');
          console.log(responseJson);
        })
      }
    })
    } catch (err) {
      console.log(err)
    }
  }else{
    formData.append('id_stag',id);
    formData.append('infolangue',infolangue);
    formData.append('mot',mot.toString());
    formData.append('targTEXT',targTEXT);
    formData.append('text',text);
    formData.append('id_groupe',this.state.id_groupe);
    formData.append('idecat',this.state.idecat);
    formData.append('video',{
      uri: path,
      name: vrr,
      type: 'video/mp4',   
    });
    this.setState({uploading:true});
    try {
      const urlvideo = base_url + "/portail-stagiaire/upload_videoexp.php";
      await axios.post(urlvideo, formData, {
        headers: {
            Accept: 'application/json',
            'Content-Type': 'multipart/form-data',
        },
        onUploadProgress: progressEvent =>{
          var percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total)
          console.log(percentCompleted);
          if(percentCompleted < 100){
            this.setState({percentCompleted:percentCompleted});
          }else{
            this.setState({uploading:false});
            this.props.navigation.navigate('Accueil');
          }
        }
      })
      .then((resp) => {
        this.setState({uploading:false});
        this.props.getVideo(this.state.id)
        .then(() => {
          alert('your video is ready');
          console.log(resp.data);
        })
      })
    } catch (err) {
      console.log(err)
    }
  }
}

analyseImg = async () =>{
  this.setState({scanning:true});
const {base64}= this.state;
let googleVisionRes = await fetch(config.googleCloud.api + config.googleCloud.apiKey, {
  method: 'POST',
  body: JSON.stringify({
      "requests": [
          {
              "image": {
                  "content": base64
              },
              features: [
                  // { type: "LABEL_DETECTION", maxResults: 10 },
                  // { type: "LANDMARK_DETECTION", maxResults: 5 },
                  // { type: "FACE_DETECTION", maxResults: 5 },
                  // { type: "LOGO_DETECTION", maxResults: 5 },
                  { type: "TEXT_DETECTION", maxResults: 5 },
                  // { type: "DOCUMENT_TEXT_DETECTION", maxResults: 5 },
                  // { type: "SAFE_SEARCH_DETECTION", maxResults: 5 },
                  // { type: "IMAGE_PROPERTIES", maxResults: 5 },
                  // { type: "CROP_HINTS", maxResults: 5 },
                  // { type: "WEB_DETECTION", maxResults: 5 }
              ],
          }
      ]
  })
});

await googleVisionRes.json()
  .then(googleVisionRes => {
      // console.log(googleVisionRes)
      if (googleVisionRes) {
        // this.setState({});
          this.setState(
              {
                  loading: false,
                  googleVisionDetetion: googleVisionRes.responses[0].fullTextAnnotation.text,
                  scanning:false,
                  scanned:true,
                  showbuttonControl:true
              }
          )
          console.log('this.is response', this.state.googleVisionDetetion);
              
      }
  }).catch((error) => { console.log(error) })
 
}

uploadVideo = async () => {
  // this.setState({isLoading:true});
  // this.animation();
  const url = base_url + "/portail-stagiaire/upload_video.php";
  // const {audioFile}=this.state;
  const {path} = this.state;
  // const {infolangue}=this.state;
  const {text}=this.state;

  // alert(path);
  // var z = path.pathname.substring(path.pathname.lastIndexOf('/')+1);
  const vrr= path.replace(/^.*(\\|\/|\:)/, '');
// alert(vrr);
  const formData = new FormData();

  // const id=this.state.id;
  // const Picker=this.state.PickerValueHolder.id;
  // formData.append('id_stag',id);²² 
  // formData.append('targL',Picker);
  formData.append('text',text);
  formData.append('video',{
    uri: path,
    name: vrr,
    type: 'video/mp4',
    
  });
  
  // console.log(JSON.stringify(formData));
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
      // this.setState({isLoading:false});
      alert('Video sent');
      console.log(responseJson);
  
      // alert('Login ou mot de passe invalide');
    }
    // const json = await response.json()
  })
} catch (err) {
    console.log(err)
  }
}

takeVideo = async () => {
  const { isRecording } = this.state;
  if (this.camera && !isRecording) {
    try {
      const promise = this.camera.recordAsync(this.state.recordOptions);

      if (promise) {
        this.setState({ isRecording: true });
        this.timerRef.current.start();
        const data = await promise;
        console.warn('takeVideo', data);
        this.setState({ path: data.uri });
        console.log(this.state.path);
      }
    } catch (e) {
      console.error(e);
    }
  }
};

toggle = value => () => this.setState(prevState => ({ [value]: !prevState[value] }));

facesDetected = ({ faces }) => this.setState({ faces });

renderFace = ({ bounds, faceID, rollAngle, yawAngle }) => (
  <View
    key={faceID}
    transform={[
      { perspective: 600 },
      { rotateZ: `${rollAngle.toFixed(0)}deg` },
      { rotateY: `${yawAngle.toFixed(0)}deg` },
    ]}
    style={[
      styles.face,
      {
        ...bounds.size,
        left: bounds.origin.x,
        top: bounds.origin.y,
      },
    ]}
  >
    <Text style={styles.faceText}>ID: {faceID}</Text>
    <Text style={styles.faceText}>rollAngle: {rollAngle.toFixed(0)}</Text>
    <Text style={styles.faceText}>yawAngle: {yawAngle.toFixed(0)}</Text>
  </View>
);

renderLandmarksOfFace(face) {
  const renderLandmark = position =>
    position && (
      <View
        style={[
          styles.landmark,
          {
            left: position.x - landmarkSize / 2,
            top: position.y - landmarkSize / 2,
          },
        ]}
      />
    );
  return (
    <View key={`landmarks-${face.faceID}`}>
      {renderLandmark(face.leftEyePosition)}
      {renderLandmark(face.rightEyePosition)}
      {renderLandmark(face.leftEarPosition)}
      {renderLandmark(face.rightEarPosition)}
      {renderLandmark(face.leftCheekPosition)}
      {renderLandmark(face.rightCheekPosition)}
      {renderLandmark(face.leftMouthPosition)}
      {renderLandmark(face.mouthPosition)}
      {renderLandmark(face.rightMouthPosition)}
      {renderLandmark(face.noseBasePosition)}
      {renderLandmark(face.bottomMouthPosition)}
    </View>
  );
}

renderFaces = () => (
  <View style={styles.facesContainer} pointerEvents="none">
    {this.state.faces.map(this.renderFace)}
  </View>
);

renderLandmarks = () => (
  <View style={styles.facesContainer} pointerEvents="none">
    {this.state.faces.map(this.renderLandmarksOfFace)}
  </View>
);

renderTextBlocks = () => (
  <View style={styles.facesContainer} pointerEvents="none">
    {this.state.textBlocks.map(this.renderTextBlock)}
  </View>
);

renderTextBlock = ({ bounds, value }) => (
  <React.Fragment key={value + bounds.origin.x}>
    <Text style={[styles.textBlock, { left: bounds.origin.x, top: bounds.origin.y }]}>
      {value}
    </Text>
    <View
      style={[
        styles.text,
        {
          ...bounds.size,
          left: bounds.origin.x,
          top: bounds.origin.y,
        },
      ]}
    />
  </React.Fragment>
);

textRecognized = object => {
  const { textBlocks } = object;
  this.setState({ textBlocks });
};

barcodeRecognized = ({ barcodes }) => this.setState({ barcodes });

renderBarcodes = () => (
  <View style={styles.facesContainer} pointerEvents="none">
    {this.state.barcodes.map(this.renderBarcode)}
  </View>
);

renderBarcode = ({ bounds, data, type }) => (
  <React.Fragment key={data + bounds.origin.x}>
    <View
      style={[
        styles.text,
        {
          ...bounds.size,
          left: bounds.origin.x,
          top: bounds.origin.y,
        },
      ]}
    >
      <Text style={[styles.textBlock]}>{`${data} ${type}`}</Text>
    </View>
  </React.Fragment>
);

renderRecording = () => {
  const { isRecording } = this.state;
  const backgroundColor = isRecording ? 'white' : 'darkred';
  const action = isRecording ? this.stopVideo : this.takeVideo;
  const button = isRecording ? this.renderStopRecBtn() : this.renderRecBtn();
  return (
    <TouchableOpacity
      style={[
        styles.flipButton,
        {
          flex: 1,
          alignSelf: 'flex-end',
          backgroundColor:'transparent',
        },
      ]}
      onPress={() => action()}
    >
      {button}
    </TouchableOpacity>
  );
};

stopVideo = async () => {
  await this.camera.stopRecording();
  this.setState({ isRecording:false,sendvid:true});
  
  this.timerRef.current.stop();
  const currentTime = this.timerRef.current.currentTime;
  console.log('====> jj    '+JSON.stringify(currentTime));
};

renderRecBtn() {
  return <Icon name={'ios-videocam'} size={25} 
    color={'white'}  
      />;
}

renderStopRecBtn() {
  return <Icon name={'ios-videocam'} size={25} 
  color={'red'}  
    />;
}
showext=()=>{
  const {path}=this.state;
  const ext=path.slice((path.lastIndexOf('.') - 1 >>> 0) + 2);
  alert("voici path"+path+"  et "+"extension:"+ext );
}
renderCamera() {
  const { canDetectFaces, canDetectText, canDetectBarcode } = this.state;

  const drawFocusRingPosition = {
    top: this.state.autoFocusPoint.drawRectPosition.y - 32,
    left: this.state.autoFocusPoint.drawRectPosition.x - 32,
  };
  return (
    <RNCamera
      ref={ref => {
        this.camera = ref;
      }}
      style={{
        flex: 1,
        justifyContent: 'space-between',
      }}
      type={this.state.type}
      flashMode={this.state.flash}
      autoFocus={this.state.autoFocus}
      autoFocusPointOfInterest={this.state.autoFocusPoint.normalized}
      zoom={this.state.zoom}
      whiteBalance={this.state.whiteBalance}
      ratio={this.state.ratio}
      focusDepth={this.state.depth}
      androidCameraPermissionOptions={{
        title: 'Permission to use camera',
        message: 'We need your permission to use your camera',
        buttonPositive: 'Ok',
        buttonNegative: 'Cancel',
      }}
      faceDetectionLandmarks={
        RNCamera.Constants.FaceDetection.Landmarks
          ? RNCamera.Constants.FaceDetection.Landmarks.all
          : undefined
      }
      onFacesDetected={canDetectFaces ? this.facesDetected : null}
      onTextRecognized={canDetectText ? this.textRecognized : null}
      onRecordingEnd={(video) => {
        setTimeout(() => {
          const currentTime2 = this.timerRef.current.currentTime;
          console.log(currentTime2);
        }, 5000); // Attendre 5 secondes avant d'afficher la durée
      }}
      onGoogleVisionBarcodesDetected={canDetectBarcode ? this.barcodeRecognized : null}
    >
      <View style={StyleSheet.absoluteFill}>
        <View style={[styles.autoFocusBox, drawFocusRingPosition]} />
        <TouchableWithoutFeedback onPress={this.touchToFocus.bind(this)}>
          <View style={{ flex: 1 }} />
        </TouchableWithoutFeedback>
      </View>
      <View
        style={{
          flex: 0.5,
          height: 72,
          backgroundColor: 'transparent',
          flexDirection: 'row',
          justifyContent: 'space-around',
        }}
      >
        <View
          style={{
            backgroundColor: 'transparent',
            flexDirection: 'row',
            justifyContent: 'space-around',
          }}
        >
          <TouchableOpacity style={styles.retourne} onPress={this.toggleFacing.bind(this)}>
          <MaterialIcons name={'flip-camera-ios'} size={20} 
                color={'#FFFF'}  
                />
          </TouchableOpacity>
       
            
          <TouchableOpacity style={styles.retourne} onPress={this.toggleFlash.bind(this)}>
            
          <Icon name={'md-flash'} size={20} color={'white'}
                   />
          </TouchableOpacity>
          <TouchableOpacity style={styles.retourne} onPress={this.toggleWB.bind(this)}>
            <Text style={styles.flipText}> WB: {this.state.whiteBalance} </Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            backgroundColor: 'transparent',
            flexDirection: 'row',
            justifyContent: 'space-evenly',
          }}
        >
          <View style={{flexDirection:'row'}}>
            <Text style={{fontSize:16,marginRight:wp('5'),color:'white'}}>Duration:</Text>
            <Timer
                ref={this.timerRef}
                formatTime = "hh:mm:ss"
                textStyle={{color:"red",fontSize:20}}
                onTimes={e => {}}
                onPause={e => {}}
                onEnd={e => {}}
            />
         </View>
          {/* <TouchableOpacity onPress={this.toggle('canDetectFaces')} style={styles.retourne}>
            <Text style={styles.flipText}>
              {!canDetectFaces ? 'Detect Faces' : 'Detecting Faces'}
            </Text>
          </TouchableOpacity> */}
          {/* <TouchableOpacity onPress={this.toggle('canDetectText')} style={styles.retourne}>
            <Text style={styles.flipText}>
              {!canDetectText ? 'Detect Text' : 'Detecting Text'}
            </Text>
          </TouchableOpacity> */}
          {/* <TouchableOpacity onPress={this.toggle('canDetectBarcode')} style={styles.retourne}>
            <Text style={styles.flipText}>
              {!canDetectBarcode ? 'Detect Barcode' : 'Detecting Barcode'}
            </Text>
          </TouchableOpacity> */}
        </View>
        
      </View>
<View
                  style={{alignItems:'center',
                  backgroundColor:'white',
                  width:wp('50%'),
                  alignSelf:'center'
                  }}
                  >
                    {this.state.uploading?
                      (
                      <View
                      style={{alignItems:'center'}}
                      >
                      <Spinner  color={'#C9A022'} size={75} type={'Wave'} />
                      <Text
                      style={{fontSize:hp('2%'),bottom:hp('2%'),fontWeight:'bold'}}
                      >
                      Uploading expression
                      </Text>

                      <Progress.Bar progress={this.state.percentCompleted/100} width={150} />
                      </View>
                        ):(null)
                    } 
                    
                  </View>

      <View style={{ bottom: 0 }}>
        <View
          style={{
            height: 20,
            backgroundColor: 'transparent',
            flexDirection: 'row',
            alignSelf: 'flex-end',
          }}
        >
          <Slider
            style={{ width: 150, marginTop: 15, alignSelf: 'flex-end' }}
            onValueChange={this.setFocusDepth.bind(this)}
            step={0.1}
            disabled={this.state.autoFocus === 'on'}
          />
        </View>
        {this.state.zoom !== 0 && (
          <Text style={[styles.flipText, styles.zoomText]}>Zoom: {this.state.zoom}</Text>
        )}
        <View
          style={{
            height:hp('10%'),
            backgroundColor: 'transparent',
            flexDirection: 'row',
            alignSelf: 'flex-end',
            justifyContent:'space-evenly',
            width:wp('100%')
          }}
        >
        <TouchableOpacity
            style={[styles.flipButton, { flex: 0.15, alignSelf: 'flex-end'}]}
            onPress={() =>{this.setState({cam:false}),this.props.navigation.navigate('Accueil')}}
          >
           {/* local-movies */}
            <Icon name={'ios-home'} size={25} color={'white'}
                   />
            {/* <Text style={styles.flipText}> + </Text> */}
          </TouchableOpacity> 
              <TouchableOpacity
            style={[styles.flipButton, { flex: 0.1, alignSelf: 'flex-end' }]}
            onPress={this.zoomIn.bind(this)}
          >
            <MaterialIcons name={'zoom-in'} size={25} 
                color={'#FFFF'}  
                />
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.flipButton, { flex: 0.1, alignSelf: 'flex-end' }]}
            onPress={this.zoomOut.bind(this)}
          >
            <MaterialIcons name={'zoom-out'} size={25} 
                color={'#FFFF'}  
                />
          </TouchableOpacity>
         
          <TouchableOpacity
            style={[styles.flipButton, { flex: 0.25, alignSelf: 'flex-end' }]}
            onPress={this.toggleFocus.bind(this)}
          >
            <Text style={styles.flipText}> AF : {this.state.autoFocus} </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.flipButton, styles.picButton, { flex: 0.25, alignSelf: 'flex-end' }]}
            onPress={this.takePicture.bind(this)}
          >
        <Icon name={'camera'} size={25} 
          color={'#FFFF'}  
          />
          </TouchableOpacity>
          <View
          style={{
            height: 56,
            backgroundColor: 'transparent',
            flexDirection: 'row',
            alignSelf: 'flex-end',
            width:wp('20%')
          }}
        >
          {this.renderRecording()}
        </View>
        </View>
      </View>
      {!!canDetectFaces && this.renderFaces()}
      {!!canDetectFaces && this.renderLandmarks()}
      {!!canDetectText && this.renderTextBlocks()}
      {!!canDetectBarcode && this.renderBarcodes()}
    </RNCamera>
  );
}

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
          // alert(id),
            this.setState({
              idecat: id,
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
          // alert(id),
            this.setState({
              idecat: id,
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

  render() {
    
    const{stopBuser,path,googleVisionDetetion}=this.state;
    const {isLoading}=this.state;
    const {transcripting}=this.state;
    return (
      <View
      style={styles.container}
      >
        {/* <Text>test</Text> */}
         {this.renderCamera()} 
        
       
       
        <Modal
        transparent={true}
        animationType="slide"
        visible={this.state.cam}
        
        >
       <View  style={styles.container}>
       {this.renderCamera()}
      </View>
      
      
        </Modal>
        <Modal 
transparent={true}
animationType="slide"
visible={this.state.sendPic}

>
<ScrollView
style={{
  width:wp('100%'),
  height:hp('100%'),
}}>
  <View style={{backgroundColor:'#F4F6FC',width:wp('90%'),alignSelf:'center',alignItems:'center',marginTop:hp('45%')}}>
    
        <View style={{height:hp('6%'),width:wp('90%')}}>
        <Text style={{textAlign:'center',fontSize:hp('3%'),fontFamily:'Lobster-Regular'}}>Description
        </Text>
        </View> 

        <View  style={{borderColor:'grey',height:hp('20%'),alignItems:'center',paddingBottom:hp('5%')}}>
 
            <View >
            <TextInput
            ref={input => { this.textInput = input }}
            style={{backgroundColor:'white',fontSize:hp('2%'),width:wp('85%')}}
            multiline={true} 
            value={this.state.text}
            placeholder="Description text"
            onChangeText= {text => this.setState({text})}
            onSubmitEditing={()=>alert('ok')}
            />
            </View>
            {/* <Text>
              {this.state.path}
              </Text> */}

        </View>
        <TouchableOpacity style={{ width:wp('90%'), height:hp('5%'),borderRadius:30,alignItems:'center',marginTop:hp('1%'),justifyContent:'center'}}
              onPress={() => {this.uploadImage(),this.setState({sendPic:false})}}>
                        <Text style={{fontWeight: 'bold'}}>
                                              OK
                        </Text>
        </TouchableOpacity>
            
        {/* <View  style={{flexDirection:'row',top:hp('40%'),position:'absolute'}}>
          
        <TouchableOpacity style={{ width:wp('15%'), height:hp('4.5%'),backgroundColor:'grey',borderRadius:5,alignItems:'center'}}
          
          onPress={() => this.setState({sendPic:false,text:''})}>
            <Text style={{color:'white'}}>
                  Cancel
            </Text>
             
        </TouchableOpacity> 
        <TouchableOpacity style={{width:wp('15%'), height:hp('4.5%'),marginLeft:wp('25%'),backgroundColor:'blue',borderRadius:5,alignItems:'center',}}
          
          // onPress={() => {this.cnc (),this.props.navigation.navigate('enregistre',{id:this.state.id,PickerValueHolder:this.state.PickerValueHolder})}}
          onPress={() =>{this.uploadImage(),this.setState({sendPic:false})}}
          >
            <Text style={{color:'white'}}>
                  Ok
                </Text>
             
        </TouchableOpacity>
         
      
        </View> */}
       
       
      
     
  </View>
</ScrollView>
</Modal>
{/* send Video */}

    <Modal 
      transparent={true}
      animationType="slide"
      visible={this.state.sendvid}
      // visible={true}

      >
      <View style={{backgroundColor:'#192356',width:wp('90%'),top:hp('35%'),marginLeft:wp('5%'),alignItems:'center',borderRadius:10}}>
        <View style={{backgroundColor:'#DB4165',height:40,width:wp('90%'),borderTopStartRadius:10,borderTopEndRadius:10, justifyContent:'center'}}>
          <Text style={{fontSize:14,fontWeight:'100',color:'white',textAlign:'left', marginLeft:30}}>
            MY VIDEO
          </Text>
        </View> 
        <View  style={{borderColor:'red',top :10, marginBottom:30}}>
          <View>
            <Text style={{textAlign:'center',color:'grey', marginBottom:10}}>
              Choose theme (facultatives)
            </Text>
          </View>
          <View style={{height:50}}>
            {/* eto ndray */}
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
          <View >
            <TextInput
            ref={input => { this.textInput = input }}
            style={{backgroundColor:'white',fontSize:14,width:wp('60%'), alignSelf:'center', borderWidth:0.5, borderColor:'grey', borderRadius:10}}
            multiline={true} 
            value={this.state.text}
            placeholder="Title heare"
            onChangeText= {text => this.setState({text})}
            />
          </View>
        </View>
        <View  style={{flexDirection:'row', marginBottom:10}}>
          <TouchableOpacity style={{ padding:8, justifyContent:'center',backgroundColor:'grey',borderRadius:5,alignItems:'center'}}
            onPress={() => this.setState({sendvid:false})}
            >
            <Text style={{color:'white',fontSize:12}}>
              CANCEL
            </Text>   
          </TouchableOpacity> 
          <TouchableOpacity style={{padding:8 ,marginLeft:wp('25%'),backgroundColor:'#47BD7A',borderRadius:5,alignItems:'center', justifyContent:'center'}}
            onPress={() =>{this.uploadImage(),this.setState({sendvid:false,cam:false})}}
            >
            <Text style={{color:'white', fontSize:12}}>
            CONFIRM
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>


{/* view image */}
<Modal 
transparent={true}
animationType="slide"
visible={this.state.image}
// visible={true}

>

  <View style={{backgroundColor:'#F4F6FC',position: 'absolute',height:hp('100%'),width:wp('100%'),top:0,alignItems:'center'}}>
    
        <View style={{
                      alignItems:'center'}}> 
        {this.state.scanned?(<Image
          source={{ uri: this.state.path,isStatic:true }}
          style={{width:wp('95%'), height:hp('40%')}}
        />):(<Image
          source={{ uri: this.state.path,isStatic:true }}
          style={{width:wp('100%'), height:hp('100%')}}
        />)}
        <TouchableOpacity
          onPress={() =>{this.analyseImg(),this.setState({showbuttonCLose:false})}}
          style={{
            position:'absolute',
            bottom:hp('8%'), right:10

          }}
          > 
          <View
          style={{
            width:50,
            height:50,
            backgroundColor:'white',
            alignItems:'center',
            justifyContent:'center',
            borderRadius:10,
            // opacity:0.3
          }}>
            <Icon name={'ios-search'} size={25} color={'#48A2F1'}/>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() =>{this.setState({showbuttonCLose:false, scanned:true, showbuttonControl: true})}}
          style={{
            position:'absolute',
            bottom:hp('8%'), left:10

          }}
          > 
          <View
          style={{
            width:50,
            height:50,
            backgroundColor:'white',
            alignItems:'center',
            justifyContent:'center',
            borderRadius:10,
            // opacity:0.3
          }}>
            <Icon name={'ios-save'} size={25} color={'#48A2F1'}/>
          </View>
        </TouchableOpacity>
              {this.state.showbuttonCLose?
              (<TouchableOpacity
              onPress={() => this.setState({image:false,path:null,scanning:false,scanned:false,googleVisionDetetion:'',showbuttonCLose:false})}
              style={{
                position:'absolute',
                top:hp('2%'),
                right:10,

              }}
              > 
                <View
                style={{
                  width:30,
                  height:30,
                  
                  backgroundColor:'white',
                  alignItems:'center',
                  justifyContent:'center',
                  borderRadius:30,
                  // opacity:0.3
                }}>
                         <Icon name={'ios-close'} size={25} color={'red'}/>
                </View>
              </TouchableOpacity>):null}
              {this.state.scanning?(<View
                      style={{alignItems:'center',position:'absolute',top:hp('55%')}}
                      >
                      <Spinner  color={'#C9A022'} size={50} type={'WanderingCubes'} />
              </View>):null}
        <View>
    
             
              
    {this.state.scanned?(
    <View
    style={{
      
      width:wp('95%'),
      // marginLeft:wp('2.5%')
    }}>
            <View
            style={{
              height:hp('20%'),
              backgroundColor:'white'
            }}>
                      <TextInput
                              ref={input => { this.textInput = input }}
                              style={styles.place}
                              value={this.state.googleVisionDetetion}
                              multiline={true} 
                              onChangeText= {googleVisionDetetion => this.setState({googleVisionDetetion})}
                      />
            </View>
            <View
            style={{
              flexDirection:'row',
              justifyContent:'space-around',
              marginTop:hp('1%'),
              marginBottom:hp('1%'),
            }}>
                      <TouchableOpacity
                      onPress={()=>{this.setState({idLan:''},this.handleTranslate())}}>
                                <View
                                style={{
                                  backgroundColor:'white',
                                  height:hp('5%'),
                                  width:wp('25%'),
                                  borderRadius:15,
                                  alignItems:'center',
                                  justifyContent:'center'
                                  
                                }}>
                                
                                      <Text
                                      style={{
                                        textAlign:'center'
                                      }}>French</Text>
                                </View>
                      </TouchableOpacity>
                      <TouchableOpacity
                      onPress={()=>{this.setState({idLan:''},this.handleTranslateEn())}}>
                                <View
                                style={{
                                  backgroundColor:'white',
                                  height:hp('5%'),
                                  width:wp('25%'),
                                  borderRadius:15,
                                  alignItems:'center',
                                  justifyContent:'center'
                                  
                                }}>
                                
                                      <Text
                                      style={{
                                        textAlign:'center'
                                      }}>English</Text>
                                </View>
                      </TouchableOpacity>
                      <TouchableOpacity
                      onPress={()=>this.setState({sendPic:true})}>
                                <View
                                style={{
                                  backgroundColor:'white',
                                  height:hp('5%'),
                                  width:wp('25%'),
                                  borderRadius:15,
                                  alignItems:'center',
                                  justifyContent:'center'
                                  
                                }}>
                                
                                      <Text
                                      style={{
                                        textAlign:'center'
                                      }}>Describe</Text>
                                </View>
                      </TouchableOpacity>
                      <TouchableOpacity
                      onPress={()=>this.lire()}>
                                <View
                                style={{
                                  height:hp('5%'),
                                  borderRadius:15,
                                  alignItems:'center',
                                  justifyContent:'center'
                                  
                                }}>                                                                                           
                                <Image style={{width:wp('6%'),height:hp('3%')}}
                                                  source={require('../image/sound.png')}>
                                                  </Image>
                                </View>
                      </TouchableOpacity>
                      
            </View>
            <View
            style={{
              height:hp('20%'),
              backgroundColor:'white'
            }}>
                      <TextInput
                              ref={input => { this.textInput = input }}
                              style={styles.place}
                              value={this.state.targTEXT}
                              multiline={true} 
                              onChangeText= {targTEXT => this.setState({targTEXT})}
                      />
            </View>
    </View>
            ):null}
     </View>
     </View>
     {this.state.showbuttonControl?(<View  style={{flexDirection:'column',bottom:hp('5%'),position:'absolute'}}>
          
              <TouchableOpacity style={{width:wp('90%'), height:hp('5%'),backgroundColor:'#DC4F89',borderRadius:30,alignItems:'center',marginTop:hp('2%'),justifyContent:'center'}}
              // disabled={this.state.expres ==''}
              onPress={() =>this.setState({image:false,cam:false,sendPic:true,scanned:false,showbuttonControl:false})}
               >
                        <Text style={{color:'white',fontWeight: 'bold'}}>
                                     CONFIRM
                        </Text>
              </TouchableOpacity>
              <TouchableOpacity style={{ width:wp('90%'), height:hp('5%'),borderRadius:30,alignItems:'center',marginTop:hp('1%'),justifyContent:'center'}}
              onPress={() => this.setState({image:false,path:null,scanning:false,scanned:false,googleVisionDetetion:'',showbuttonControl:false})}>
                        <Text style={{fontWeight: 'bold'}}>
                                      CANCEL
                        </Text>
              </TouchableOpacity>
         
      
    </View>):null}
       
       
      
     
  </View>

</Modal>
      </View>
    
    );
  }
}






// *** CLASS CAMERA***


// ***CLASS CAMERA***






const styles = StyleSheet.create({
  button: {
    width: 50,
    height: 50,
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  action: {
    width: '100%',
    textAlign: 'center',
    color: 'white',
    paddingVertical: 8,
    marginVertical: 5,
    marginRight:'10%',
    fontWeight: 'bold',
  },
  instructions: {
    textAlign: 'center',
    color: 'blue',
    marginBottom: 5,
    
  },
  stat: {
    textAlign: 'center',
    marginBottom: 1,
    marginTop: 30,
    opacity:0
  },
  buttadd:{
    position:'absolute',
    top:heightPercentageToDP('8%'),
   
    alignItems:'center',
    flexDirection:'row',
    marginLeft:wp('15%')
          },
  textMod:{
            textDecorationLine: 'underline',
            color:'blue'
           },
           retourne: {
            // flex: 0.3,
            height: 40,
            marginHorizontal: 2,
            marginBottom: 10,
            marginTop: 10,
            borderRadius: 8,
            borderColor: 'white',
            borderWidth: 1,
            padding: 5,
            alignItems: 'center',
            justifyContent: 'center',
          },
        
          flipButton: {
            flex: 0.3,
            height: 40,
            marginHorizontal: 2,
            marginBottom: 10,
            marginTop: 10,
            borderRadius: 8,
            borderColor: 'white',
            borderWidth: 1,
            padding: 5,
            alignItems: 'center',
            justifyContent: 'center',
          },
          autoFocusBox: {
            position: 'absolute',
            height: 64,
            width: 64,
            borderRadius: 12,
            borderWidth: 2,
            borderColor: 'white',
            opacity: 0.4,
          },
          flipText: {
            color: 'white',
            fontSize: 15,
          },
          zoomText: {
            position: 'absolute',
            bottom: 70,
            zIndex: 2,
            left: 2,
          },
          picButton: {
            backgroundColor: 'transparent',
          },
          facesContainer: {
            position: 'absolute',
            bottom: 0,
            right: 0,
            left: 0,
            top: 0,
          },
          face: {
            padding: 10,
            borderWidth: 2,
            borderRadius: 2,
            position: 'absolute',
            borderColor: '#FFD700',
            justifyContent: 'center',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
          },
          landmark: {
            width: landmarkSize,
            height: landmarkSize,
            position: 'absolute',
            backgroundColor: 'red',
          },
          faceText: {
            color: '#FFD700',
            fontWeight: 'bold',
            textAlign: 'center',
            margin: 10,
            backgroundColor: 'transparent',
          },
          text: {
            padding: 10,
            borderWidth: 2,
            borderRadius: 2,
            position: 'absolute',
            borderColor: '#F00',
            justifyContent: 'center',
          },
          textBlock: {
            color: '#F00',
            position: 'absolute',
            textAlign: 'center',
            backgroundColor: 'transparent',
          }

  
  
});

const mapStateToProps = (state) => ({
  category: state.categ.category,
});

const mapDispatchToProps = (dispatch) => {
  return {
    getVideo: id => dispatch(getVideo(id)),
    getImage: id => dispatch(getImages(id)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps )(CameraScreen);