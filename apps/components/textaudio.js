import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  TouchableHighlight,
  Button,
  ScrollView,
  TextInput
} from 'react-native';
import Voice from 'react-native-voice';
import { Buffer } from 'buffer';
import Permissions from 'react-native-permissions';
import Sound from 'react-native-sound';
import AudioRecord from 'react-native-audio-record';
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen';
import { TouchableOpacity } from 'react-native-gesture-handler';
import enregistre from './enregistre';
import Icon from 'react-native-vector-icons/Ionicons';
import config from '../config.json';
const base_url = config.base_url;
class textaudio extends Component {
  static navigationOptions =
   {
    // headerShown: false,
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
   sound = null;
  state = {
    audioFile: '',
    recording: false,
    loaded: false,
    paused: true,

    pitch: '',
    error: '',
    end: '',
    started: '',
    results: [],
    expres:'',
    // part:[],
    partialResults: [],
    id: this.props.navigation.state.params.id, //id stagiaire
    PickerValueHolder: this.props.navigation.state.params.idlangue, //PickerValueHolder
    infolangue: this.props.navigation.state.params.PickerValueHolder, // juste pour info
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

  async componentDidMount() {
    await this.checkPermission();
   
    this.setState({
      name:this.state.id+'_'+'audio'+'.wav'
    })
    // var month = new Date().getMonth() + 1; //To get the Current Month
    // var year = new Date().getFullYear(); //To get the Current Year
    // var hours = new Date().getHours(); //To get the Current Hours
    //   var date = new Date().getDate();
    //   var min = new Date().getMinutes();
    //   var sec = new Date().getSeconds(); //To get the Current Seconds
    //   var tout=this.state.id+'_'+date+'_'+month+'_'+year+'_'+hours+'_'+min+'_'+sec+'.wav';
    const options = {
      sampleRate: 16000,
      channels: 1,
      bitsPerSample: 16,
      audioSource: 6,
      wavFile:'databank.wav'
      // wavFile:this.state.name, 
      // startRecording()
    };
    // startRecording();
    AudioRecord.init(options);

    AudioRecord.on('data', data => {
      const chunk = Buffer.from(data, 'base64');
      console.log('chunk size', chunk.byteLength);
      // do something with audio chunk
    });
  }
  checkPermission = async () => {
    const p = await Permissions.check('android.permission.RECORD_AUDIO');
    // const p = await Permissions.check('android.permission.INTERNET');
    console.log('permission check', p);
    if (p === 'authorized') return;
    return this.requestPermission();
  };

  requestPermission = async () => {
    const p = await Permissions.request('android.permission.RECORD_AUDIO');
    
    console.log('permission request', p);
  };


  start = () => {
    console.log('start record');
    this.setState({ audioFile: '', recording: true, loaded: false });
    AudioRecord.start();
  };

commencer= () => {
enregistre.start();


}



  stop = async () => {
    if (!this.state.recording) return;
    console.log('stop record');
    let audioFile = await AudioRecord.stop();
    console.log('audioFile', audioFile);
    this.setState({ audioFile, recording: false });
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

  pause = () => {
    this.sound.pause();
    this.setState({ paused: true });
  };

  uploadAudio = async () => {
  
    const path = 'file:///data/user/0/com.forma2p/files/databank.wav'
    const formData = new FormData()
    formData.append('file', {
      uri: path,
      name: 'databank.wav',
      type: 'audio/wav',
    })
    
    try {
      const res = await fetch(base_url + '/portail-stagiaire/upload.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        body: formData,
      })
      const json = await res.json()
    } catch (err) {
      alert(err)
    }
  }







  componentWillUnmount() {
    //destroy the process after switching the screen 
    Voice.destroy().then(Voice.removeAllListeners);
  }

  onSpeechStart = e => {
    //Invoked when .start() is called without error
    console.log('onSpeechStart: ', e);
    this.setState({
      started: '√',
    });
  };

  onSpeechEnd = e => {
    //Invoked when SpeechRecognizer stops recognition
    console.log('onSpeechEnd: ', e);
    this.setState({
      end: '√',
    });
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
    console.log('onSpeechPartialResults: ', e);
    this.setState({
      partialResults: e.value,
    });
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
    });
    
    try {
      await Voice.start(this.state.infolangue);
      // console.log('transcrire');
  
    } catch (e) {
      //eslint-disable-next-line
      console.error(e);
    }
  };

  _stopRecognizing = async () => {
    //Stops listening for speech
    try {
      await Voice.stop();
      // console.log('fin transcription');
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
    
    const {partialResults}=this.state; 
    // alert(JSON.stringify(partialResults.toString()));
    // JSON.stringify(partialResults);
    // const {partialResults}=this.state; 
  // const {PickerValueHolder}=this.state; 
  // const {id}=this.state;
  // alert(PickerValueHolder);
      this.setState({ ActivityIndicator_Loading : true }, () =>
      {
          fetch(base_url + '/portail-stagiaire/save.php',
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
                expres:partialResults.toString(),
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
autre(){
 enregistre.nouv();
 
}
// dat(){
 
// var month = new Date().getMonth() + 1; //To get the Current Month
// var year = new Date().getFullYear(); //To get the Current Year
// var hours = new Date().getHours(); //To get the Current Hours
//   var date = new Date().getDate();
//   var min = new Date().getMinutes();
//   var sec = new Date().getSeconds(); //To get the Current Seconds
//   var tout=this.state.id+'_'+date+'_'+month+'_'+year+'_'+hours+'_'+min+'_'+sec;
//   alert(tout)
//  }

  render() {
    const { recording, paused, audioFile } = this.state;
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <View style={{justifyContent:'flex-start',flexDirection:'row',marginLeft:widthPercentageToDP('35%')}}>
          <Text>Speech  </Text>
          <Text style={{color:'blue',fontWeight:'bold'}}>{this.state.infolangue}  </Text>
           {/* <Text>by </Text>
           <Text style={{color:'blue',fontWeight:'bold'}}>{this.state.id}</Text>
     <Text>  Id langue: {this.state.PickerValueHolder.id}</Text>
     <TouchableOpacity  onPress={()=>this.langue()}>
       <Text>test</Text>
          </TouchableOpacity>  */}
        </View>
        <View style={styles.container}>
         
    {/* <Text>{this.state.partialResults}</Text>  */}
          <Text style={styles.instructions}>
            Press mike to start /Appuyer le micro pour commencer {this.state.id}
          </Text>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingVertical:heightPercentageToDP('0.5%'),
            }}>
             <Text
              style={{
                flex: 1,
                textAlign: 'center',
                color: '#B0171F',
              }}>{`Started/Commencé: ${this.state.started}`}</Text> 
            <Text
              style={{
                flex: 1,
                textAlign: 'center',
                color: '#B0171F',
              }}>{`End/Fin: ${this.state.end}`}</Text> 
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingVertical: heightPercentageToDP('0.5%'),
            }}>
            <Text
              style={{
                flex: 1,
                textAlign: 'center',
                color: '#B0171F',
              }}>{`Pitch/Pas \n ${this.state.pitch}`}</Text>
            <Text
              style={{
                flex: 1,
                textAlign: 'center',
                color: '#B0171F',
              }}>{`Error/erreur: \n ${this.state.error}`}</Text>
          </View>

          {!recording ? (
            
            <TouchableHighlight
            onPress={this.start}
            disabled={recording}
            // style={{ backgroundColor: 'blue',borderRadius:40}}
            >
           <Icon name={'ios-microphone'} size={35} 
                   color={'#2f3c7e'}  
                     />
          </TouchableHighlight>
      
          ) : (
            <TouchableHighlight
            onPress={this.stop}
            disabled={!recording}
            // style={{ backgroundColor: 'green'}}
            >
           <Icon name={'ios-square'} size={35} 
                   color={'#2f3c7e'}  
                     />
          </TouchableHighlight>
          )}




          {/* <TouchableHighlight
            onPress={() => {this.start()}}
            disabled={recording}
            //  onPress={() => {this._startRecognizing}
             
            // }
          // 
            // disabled={recording}
            style={{ marginVertical: 20 }}>
            <Icon name={'ios-microphone'} size={35} 
                   color={'#2f3c7e'}  
                     />
          </TouchableHighlight> */}
          <Text
            style={{
              textAlign: 'center',
              color: '#2f3c7e',
              marginBottom: 1,
              fontWeight: '700',
            }}>
            Results/Resultats
          </Text>
          <View  style={{flexDirection:'row'}}>
          {paused ? (
            
            <TouchableHighlight
            onPress={this.play}
            disabled={!audioFile}
            // style={{ backgroundColor: 'blue',borderRadius:40}}
            >
           <Icon name={'md-headset'} size={35} 
                   color={'#2f3c7e'}  
                     />
          </TouchableHighlight>
      
          ) : (
            <TouchableHighlight
            onPress={this.pause}
            disabled={!audioFile}
            // style={{ backgroundColor: 'green'}}
            >
           <Icon name={'ios-pause'} size={35} 
                   color={'#C9A022'}  
                     />
          </TouchableHighlight>
          )}
          </View> 
          {/* <Button  onPress={() => this.autre()} title="Record" /> */}
          {/* <View style={{flexDirection:'row',justifyContent:'space-evenly'}}>
         <View >
          <TouchableHighlight
            onPress={this.start}
            disabled={recording}
            style={{ backgroundColor: 'blue',width:'100%' }}>
            <Text>
            Record
              </Text>
          </TouchableHighlight>
       
         </View>
         <View  style={{marginLeft:'3%'}}>
          <TouchableHighlight
            onPress={this._startRecognizing,this.start}
            disabled={recording}
            style={{ backgroundColor: 'blue',width:'100%' }}>
            <Text>
            transcrire
              </Text>
          </TouchableHighlight>
 
         </View>
         <View  style={{marginLeft:'3%'}}>
          <TouchableHighlight
            onPress={this.autre}
            disabled={recording}
            style={{ backgroundColor: 'blue',width:'100%' }}>
            <Text>
            autre
              </Text>
          </TouchableHighlight>
     
         </View> */}



         {/* <View  style={{marginLeft:'3%'}}>
          <TouchableHighlight
            onPress={this.stop}
            disabled={!recording}
            style={{ backgroundColor: 'red',width:'100%'}}>
            <Text> 
            Stop
              </Text>
          </TouchableHighlight>
          </View>
          <View  style={{flexDirection:'row',justifyContent:'space-evenly',marginLeft:'3%'}}>
          {paused ? (
            
            <TouchableHighlight
            onPress={this.play}
            disabled={!audioFile}
            style={{ backgroundColor: 'blue', width:'30%'}}>
            <Text>
            Play
              </Text>
          </TouchableHighlight>
        
          ) : (
            <TouchableHighlight
            onPress={this.pause}
            disabled={!audioFile}
            style={{ backgroundColor: 'green',width:'40%' }}>
            <Text>
            Pause
              </Text>
          </TouchableHighlight>
          )}
          </View> */}

        {/* </View> */}

        <Text>
        audio=> {audioFile}
        </Text>
         
          {/* <ScrollView>
            {this.state.partialResults.map((result, index) => {
              return (
                <Text
                  key={`partial-result-${index}`}
                  style={{
                    textAlign: 'center',
                    color: '#B0171F',
                    fontSize:heightPercentageToDP('2%'),
                    borderWidth:1,
                    marginBottom: 1,
                    fontWeight: '700',
                  }}>
                  {result}
                  
                </Text>
              );
            })}
          </ScrollView> */}
          {/* <ScrollView>
            <Text>{result}
            </Text>
            </ScrollView> */}
          {/* <Text style={styles.stat}>Intuitive list/Liste intituive</Text>
          <ScrollView style={{ marginBottom:heightPercentageToDP('20%') }}>
            {this.state.results.map((result, index) => {
              return (
                <Text key={`result-${index}`} style={styles.stat}>
                  {result}
                </Text>
              );
            })}
          </ScrollView> */}
          <View
            style={{
              flexDirection: 'row',
              justifyContent:'space-evenly',
              position: 'absolute',
              bottom: 0,
            }}>
            {/* <TouchableHighlight
              onPress={this.stop}
              disabled={!recording}
              style={{ flex: 1/3, backgroundColor: '#2f3c7e' }}>
              <Text style={styles.action}>Stop</Text>
            </TouchableHighlight>  */}
            <TouchableHighlight
              onPress={() =>{this.setState({ audioFile: ''})}}
              style={{ flex: 1/3, backgroundColor: '#2f3c7e'}}>
              <Text style={styles.action}>Cancel</Text>
            </TouchableHighlight>
           <TouchableOpacity  onPress={() =>{this.stop,this.props.navigation.navigate('Accueil')}}
            //  disabled={recording}
             
             style={{ flex: 1/3, backgroundColor: '#2f3c7e' }}
            >
              <Text style={styles.action}>Save
              </Text>
              </TouchableOpacity> 
              <TouchableOpacity  onPress={() =>{this.uploadAudio()}}
            //  disabled={recording}
             
             style={{ flex: 1/3, backgroundColor: '#2f3c7e' }}
            >
              <Text style={styles.action}>upload
              </Text>
              </TouchableOpacity> 
              

             {/* <TouchableHighlight
              onPress={this._destroyRecognizer}
              style={{ flex: 1, backgroundColor: '#2f3c7e' }}>
              <Text style={styles.action}>Save</Text>
            </TouchableHighlight>  */}
            {/* <TouchableOpacity  onPress={() =>this.props.navigation.navigate('Accueil')}
             style={{ flex: 1/3, backgroundColor: '#2f3c7e' }}
            >
              <Text style={styles.action}>Accueil
              </Text>
              </TouchableOpacity> */}
          </View>
        </View>
      </SafeAreaView>
    );
  }
}

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
    color: '#333333',
    marginBottom: 5,
  },
  stat: {
    textAlign: 'center',
    marginBottom: 1,
    marginTop: 30,
  },
});
export default textaudio;