import React, {Component} from 'react';
import {
AppRegistry,
StyleSheet,
Text,
View,
TouchableHighlight,
Platform,
PermissionsAndroid,
TouchableOpacity,
Image,Modal,
ScrollView
} from 'react-native';
import axios from 'axios';
import Sound from 'react-native-sound';
import {AudioRecorder, AudioUtils} from 'react-native-audio';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/Ionicons';
import Voice from 'react-native-voice';
import config from '../config.json';
const base_url = config.base_url;


class audioEx extends Component {
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
  };
  state = {
    pitch: '',
    error: '',
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
    // audio
    currentTime: 0.0,
    recording: false,
    paused: false,
    stoppedRecording: false,
    finished: false,
    users:false,
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
 
    PickerValueHolder: this.props.navigation.state.params.idlangue, //PickerValueHolder
    user: this.props.navigation.state.params.user,
    infolangue: this.props.navigation.state.params.PickerValueHolder, // juste pour info
    audioPath: AudioUtils.DocumentDirectoryPath + '/Databank_record.aac',
    hasPermission: undefined,
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
    // this.state={
    //   id: this.props.navigation.state.params.id,
    //   partialResults:[]
    // }
  }
  
  prepareRecordingPath(audioPath){
    AudioRecorder.prepareRecordingAtPath(audioPath, {
      SampleRate: 22050,
      Channels: 1,
      AudioQuality: "Low",
      AudioEncoding: "aac",
      AudioEncodingBitRate: 32000
    });
  }
  
  componentDidMount() {
    this._checkPermission().then((hasPermission) => {
      this.setState({ hasPermission });
  
      if (!hasPermission) return;
  
      this.prepareRecordingPath(this.state.audioPath);
  
      AudioRecorder.onProgress = (data) => {
        this.setState({currentTime: Math.floor(data.currentTime)});
      };
  
      AudioRecorder.onFinished = (data) => {
        // Android callback comes in the form of a promise instead.
        if (Platform.OS === 'ios') {
          this._finishRecording(data.status === "OK", data.audioFileURL, data.audioFileSize);
        }
      };
    });
  }

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
      // await Voice.start();
    } catch (e) {
      //eslint-disable-next-line
      console.error(e);
    }
  };
  
  demarrer= async () => {


const commence = await Promise.all([ this._startRecognizing(),this._record()]);

  }
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

  componentWillUnmount() {
    //destroy the process after switching the screen 
    Voice.destroy().then(Voice.removeAllListeners);
  }
  
  _checkPermission() {
    if (Platform.OS !== 'android') {
      return Promise.resolve(true);
    }
  
    const rationale = {
      'title': 'Microphone Permission',
      'message': 'AudioExample needs access to your microphone so you can record audio.'
    };
  
    return (PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.RECORD_AUDIO, rationale))
      .then((result) => {
        console.log('Permission result:', result);
        return (result === true || result === PermissionsAndroid.RESULTS.GRANTED);
      });
  }
  
  _renderButton(title, onPress, active) {
    var style = (active) ? styles.activeButtonText : styles.buttonText;
  
    return (
      <TouchableHighlight style={styles.button} onPress={onPress}>
        <Text style={style}>
          {title}
        </Text>
      </TouchableHighlight>
    );
  }
  
  _renderPauseButton(onPress, active) {
    var style = (active) ? styles.activeButtonText : styles.buttonText;
    var title = this.state.paused ?  <Icon name={'md-headset'} size={35} 
    color={'#2f3c7e'}  
      />:  <Icon name={'ios-pause'} size={35} 
      color={'#C9A022'}  
        />;
    return (
      <TouchableHighlight style={styles.button} onPress={onPress}>
        <Text style={style}>
          {title}
        </Text>
      </TouchableHighlight>
    );
  }
  
  async _pause() {
    if (!this.state.recording) {
      console.warn('Can\'t pause, not recording!');
      return;
    }
  
    try {
      const filePath = await AudioRecorder.pauseRecording();
      this.setState({paused: true});
    } catch (error) {
      console.error(error);
    }
  }
  
  async _resume() {
    if (!this.state.paused) {
      console.warn('Can\'t resume, not paused!');
      return;
    }
  
    try {
      await AudioRecorder.resumeRecording();
      this.setState({paused: false});
    } catch (error) {
      console.error(error);
    }
  }
  
  async _stop() {
    if (!this.state.recording) {
      console.warn('Can\'t stop, not recording!');
      return;
    }
  
    this.setState({stoppedRecording: true, recording: false, paused: false});
  
    try {
      const filePath = await AudioRecorder.stopRecording();
  
      if (Platform.OS === 'android') {
        this._finishRecording(true, filePath);
      }
      return filePath;
    } catch (error) {
      console.error(error);
    }
  }
  
  async _play() {
    if (this.state.recording) {
      await this._stop();
    }
  
    // These timeouts are a hacky workaround for some issues with react-native-sound.
    // See https://github.com/zmxv/react-native-sound/issues/89.
    setTimeout(() => {
      var sound = new Sound(this.state.audioPath, '', (error) => {
        if (error) {
          console.log('failed to load the sound', error);
        }
      });
  
      setTimeout(() => {
        sound.play((success) => {
          if (success) {
            console.log('successfully finished playing');
          } else {
            console.log('playback failed due to audio decoding errors');
          }
        });
      }, 100);
    }, 100);
  }
  
  async _record() {
    if (this.state.recording) {
      console.warn('Already recording!');
      return;
    }
  
    if (!this.state.hasPermission) {
      console.warn('Can\'t record, no permission granted!');
      return;
    }
  
    if(this.state.stoppedRecording){
      this.prepareRecordingPath(this.state.audioPath);
    }
  
    this.setState({recording: true, paused: false});
  
    try {
      const filePath = await AudioRecorder.startRecording();
      // await Promise.all([someCall(), anotherCall()]);
      // const [text, filePath] = await Promise.all([Voice.start('en-US'),AudioRecorder.startRecording()]);
    } catch (error) {
      console.error(error);
    }
  }
  
  _finishRecording(didSucceed, filePath) {
    this.setState({ finished: didSucceed });
    console.log(`Finished recording of duration ${this.state.currentTime} seconds at path: ${filePath}`);
  
      // let ext = 'aac';
      // let data = new FormData();
      // data.append('file', {
      //     uri:`file://${filePath}`,
      //     name:`recording.${ext}`,
      //     type:`audio/${ext}`
      // });
  
      // //Upload file to server
      // const url = "https://demo.forma2plus.com/portail-stagiaire/upload.php";
      // let headers = {};
      // headers['Content-Type'] = 'multipart/form-data;';
  
      // axios.post(url, data, {headers:headers});
  }


// https://speech.googleapis.com/v1p1beta1/speech:recognize
  // {
  //   "audio": {
  //     "content": "/* Your audio */"
  //   },
  //   "config": {
  //     "enableAutomaticPunctuation": true,
  //     "encoding": "LINEAR16",
  //     "languageCode": "en-US",
  //     "model": "default"
  //   }
  // }


  transcripte = async ()=>{
    const url = "https://speech.googleapis.com/v1/speech:recognize";
    const path = 'file://' + AudioUtils.DocumentDirectoryPath + '/Databank_record.aac';
    alert(path);
  //   const formData = new FormData();
   
  //   formData.append(
  //     JSON.stringify({
  //       "audio": {
  //             "content": path
  //           },
  //           "config": {
  //             "enableAutomaticPunctuation": true,
  //             "encoding": "LINEAR16",
  //             "languageCode": "en-US",
  //             "model": "default"
  //           }     

  //           })
  //   );
  //   try {
  //     const response = await fetch(url, {
  //       method: 'POST',
  //       headers: {
  //         'Authorization': 'Bearer 7ed5e4c68b97d2e6d27d5403c3486d78a0a81948',
  //         'Content-Type': 'multipart/form-data',
  //         // 'Content-Type': `audio/aac`,
  //       },
  //       body: formData,
  //     }).then((response) => response.json())
  //     .then((responseJson) => {
  //     // console.log(response.mess);
  //     if(responseJson =='')
  //     {
  //       // alert('no response');
  //       this.setState({trans:'vide'});
  //       alert(this.state.trans);
  //       // user:responseJson;
          
  //     }
  //     else{
  //       // alert('Audio saved');
  //       // this.setState({trans:responseJson});
  //       // alert( JSON.stringify(responseJson));
  //       console.log(responseJson);
  //       // alert('Login ou mot de passe invalide');
  //     }
  //     // const json = await response.json()
  //   })
  // } catch (err) {
  //     console.log(err)
  //   }

  }

  uploadAudio = async () => {
    const url = base_url + "/portail-stagiaire/upload.php";
    const path = 'file://' + AudioUtils.DocumentDirectoryPath + '/Databank_record.aac';
    const formData = new FormData();
    const id=this.state.id;
    const Picker=this.state.PickerValueHolder.id;
    formData.append('id_stag',id);
    formData.append('targL',Picker);
    formData.append('recording', {
      uri: path,
      name: 'Databank_record.aac',
      type: 'audio/aac',
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
        alert('Audio saved');
    
        // alert('Login ou mot de passe invalide');
      }
      // const json = await response.json()
    })
  } catch (err) {
      console.log(err)
    }
  }
  
  render() {
    const { goBack } = this.props.navigation;
    const { recording } = this.state;
    // const textospec=this._startRecognizing();
    // const recaudio= this._record();
    return (
      <View style={styles.container}>
         <View style={{backgroundColor:'#2f3c7e',height:hp('6.5%'),width:wp('100%')}}>
        <Image style={{width:90,height:20,top:hp('1%'),marginLeft:wp('3%')}}
            source={require('../image/logofotsy.png')}>
            </Image>
            <View >
            <TouchableOpacity style={{width:wp('10%'),height:hp('6%'),bottom:hp('3.5%'),marginLeft:wp('85%')}}
onPress={() => this.setState({users:true})}>
  <Icon name={'ios-contact'} size={40} color={'white'}
                     />
 
  
</TouchableOpacity> 
              </View>
        </View>
        <Modal 
transparent={true}
animationType="fade"
visible={this.state.users}

>


<TouchableOpacity onPress={() => this.setState({users:false}) }
 style={{with:wp('100%'),height:hp('100%')}}>
      <View style={{top:hp('11%'),width:wp('30%'), marginLeft:wp('70%')}}>
        <View style={{backgroundColor:'#2f3c7e',height:hp('6.5%'),borderWidth:1,borderColor:'white'}}>
        <TouchableOpacity
        onPress={() =>{this.setState({users:false}),this.props.navigation.navigate('User',{user:this.state.user,
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
        
        })}}>
          <Text style={{color:'white',fontWeight:'bold',fontSize:hp('3%'),textAlign:'center'}}>My profil
          </Text>
          </TouchableOpacity>
        </View> 

        <View style={{backgroundColor:'#2f3c7e',height:hp('6.5%'),borderWidth:1,borderColor:'white'}}>
        <TouchableOpacity 
        onPress={() =>{this.props.navigation.navigate('Login'),this.setState({users:false})}}>
          <Text style={{color:'white',fontWeight:'bold',fontSize:hp('3%'),textAlign:'center'}}>Logout
          </Text>
          </TouchableOpacity>
        </View> 
      </View>
     
  </TouchableOpacity>

</Modal>
        <Text style={{textAlign:'center',fontWeight:'100',fontSize:hp('2%'),color:'#2f3c7e'}}>
        Press mike to start and square to save /Appuyer le micro pour commencer et le carré pour enregistrer 
        {/* {this.state.password1} */}
        {/* id_stagiaire: {this.state.id} et {this.state.infolangue} et id langue: {this.state.PickerValueHolder.id} date:now() */}
          </Text>
   

        <View style={styles.recStop}>
        {!recording ?  (<View style={{marginLeft:wp('5%')}}>
          <TouchableOpacity onPress={() =>{this._record()}}>
          <Icon name={'ios-microphone'} size={30} 
                   color={'#2f3c7e'}  
                     />
          </TouchableOpacity>
          </View>):(
          <View style={{marginLeft:wp('5%')}}>
          <TouchableOpacity onPress={() =>{this._stop(),this.transcripte()}}>
          <Icon name={'ios-square'} size={40} 
                   color={'#2f3c7e'}  
                     />
          </TouchableOpacity>
          </View>)}
          {/* {this._renderButton("RECORD", () => {this._record()}, this.state.recording )} */}
          {/* {this._renderButton("PLAY", () => {this._play()} )} */}
          {/* {this._renderButton("STOP", () => {this._stop()} )} */}
          {/* {this._renderButton("PAUSE", () => {this._pause()} )} */}
          {/* {this._renderPauseButton(() => {this.state.paused ? this._resume() : this._pause()})} */}
          <Text style={styles.progressText}>{this.state.currentTime}s</Text>
          </View>
          {/* <ScrollView style={{borderWidth:1,width:wp('15%')}}>
          <Text>{this.state.mot} ici</Text>
            {this.state.partialResults.map((result, index) => {
              return (
               
                <Text
                  key={`partial-result-${index}`}
                  style={{
                    textAlign: 'center',
              
                    fontSize:hp('2%'),
                 
                    marginBottom: 1,
                    fontWeight: '500',
                  }}>
                  {result} et ici 

                  
                </Text>
              );
            })}
          </ScrollView> */}

          <View style={{flexDirection:'row',top:hp('70%')}}>
          <View style={styles.cancel}>
          <TouchableOpacity onPress={() =>{this.props.navigation.goBack()}}>
          <Icon name={'ios-home'} size={30} 
                   color={'#2f3c7e'}  
                     />
          </TouchableOpacity>
          </View>

         
          </View>
        </View>
      
    );
  }
  }

  var styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'column',
      alignItems: 'center',
      backgroundColor: '#F5FCFF',
    },
    controls: {
      justifyContent: 'center',
      alignItems: 'center',
      flex: 1,
    },
    progressText: {
      top:hp('10%'),
      fontSize: 50,
      // color: "#fff"
    },
    button: {bottom:hp('10%'),
      padding: 20
    },
    disabledButtonText: {
      color: '#eee'
    },
    buttonText: {
      fontSize: 20,
      // color: "#fff"
    },
    activeButtonText: {
      fontSize: 20,
      color: "#B81F00"
    },
 
cancel:{
      // marginLeft:wp('3%'),
      // top:hp('10%'),
      bottom:hp('10%'),
      borderRadius:30,
      // backgroundColor:'red',
      width:'18%',
      alignItems:'center'
      
          },
          recStop:{
            top:hp('5%')
          }

  });

export default audioEx;
