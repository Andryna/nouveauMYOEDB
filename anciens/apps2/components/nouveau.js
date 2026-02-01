import React, { Component } from 'react';
import { StyleSheet, Text, Button,View,Picker,TouchableOpacity,TextInput, ActivityIndicator} from 'react-native'; 
import { Buffer } from 'buffer';
import Permissions from 'react-native-permissions';
import Sound from 'react-native-sound';
import AudioRecord from 'react-native-audio-record';
// import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
// import Icon from 'react-native-vector-icons/Ionicons';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

export default class nouveau extends Component {
  static navigationOptions =
   {
    // headerShown: false,
    title: 'Forma2+',
    headerStyle: {
      backgroundColor:'#2f3c7e',
     
    },
    headerTintColor: '#fff',
    // headerLeft: () => null
    // headerTintColor: '#f4511e',
    // headerTitleStyle: {
    //   fontWeight: 'bold',
    // }
   };
   constructor(props){
    super(props)
    this.state={
      // show:false,
      isLoading: true,
      PickerValueHolder : ''
      // login:this.props.navigation.state.params.login,
    }
  }
  sound = null;
  state = {
    audioFile: '',
    recording: false,
    loaded: false,
    paused: true
  };
  

  async componentDidMount() {
    await this.checkPermission();
    return fetch('http://10.0.2.2/projet/picker.php',{
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
            }, function() {
              // In this block you can do something with new state.
            });
          })
          .catch((error) => {
            console.error(error);
          });

    const options = {
      sampleRate: 16000,
      channels: 1,
      bitsPerSample: 16,
      audioSource: 6,
      wavFile: 'test.wav',
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

  render() {
    if (this.state.isLoading) {
      return (
        <View style={{flex: 1, paddingTop: 20}}>
          <ActivityIndicator />
        </View>
      );
    }
    const { goBack } = this.props.navigation;
    const { recording, paused, audioFile } = this.state;
    return (
      <View style={styles.container}>
        <View style={styles.container2}>
      {/* <Text style={styles.user}>
Connecté: */}
{/* {this.state.login} */}
  {/* </Text> */}
  <View style={styles.titreV}>
  <Text style={styles.titre}>
    My own expression databank
    </Text>
    <Text style={styles.titre2}>
    Add new
    </Text>
  </View>
  <View style={styles.titreExV}>
 
    <Text style={styles.titreEx}>
    Add new expression!
    </Text>
    <Text style={styles.titreEx}>
    Expression
    </Text>
    <TextInput
    style={styles.exp}
    />
    <Text style={styles.titreEx}>
    Target language
    </Text>
    
  </View>
  <View style={{fontSize:hp('3.2%'),justifyContent:'center',fontWeight: 'bold',
  borderRadius:25,borderWidth:2,borderColor:'grey',top :hp('11.5%'),width:wp('80%')}}
        placeholder="Start Year"
        >
<Picker
            mode='dropdown'
            selectedValue={this.state.PickerValueHolder}
 
            onValueChange={(itemValue, itemIndex) => this.setState({PickerValueHolder: itemValue})} >
 
            { this.state.dataSource.map((item, key)=>(
            <Picker.Item label={item.intitule} value={item.intitule} key={key} />)
            )}
    
          </Picker>
           
   </View> 
   <View style={styles.titreExV2}>
   <Text style={styles.titreEx}>
    Target language text
    </Text>
    <TextInput
    style={styles.exp}
    placeholder='Target language text'
    />
    </View>
    <View style={styles.SaveV}>
    <TouchableOpacity onPress={() => goBack()}
    style={styles.but}
    >
           <Text style={styles.buttext}>
             Save
           </Text>
            </TouchableOpacity>
    </View>

                 {/* <View    style={styles.butV}>

 

 
{/* <View style={styles.ret}>
           <TouchableOpacity onPress={() => goBack()}>
            <Icon name={'ios-arrow-round-back'} size={100} color={'#C9A022'}
                     
                    />
            </TouchableOpacity>
    </View>  */}
{/* </View> */} 
   </View>
      {/* <View style={styles.container}>
        <View style={styles.row}>
          <Button onPress={this.start} title="Record" disabled={recording} />
          <Button onPress={this.stop} title="Stop" disabled={!recording} />
          {paused ? (
            <Button onPress={this.play} title="Play" disabled={!audioFile} />
          ) : (
            <Button onPress={this.pause} title="Pause" disabled={!audioFile} />
          )}
        </View>
        <View>
        <TextInput style={styles.placeP}
           multiline={true} 
        />


        </View>
      </View> */}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center'
  },
  container2:{
    alignItems: 'center'
  },
  row: {
    flexDirection: 'row',
    // justifyContent: 'space-evenly'
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
  titreV:{
    alignItems: 'center',
    // top:hp('10%')
    // color:'blue',
    // marginHorizontal:wp('15%'),
    // fontSize:hp('3%'),
  },
  SaveV:{
top:hp('10%'),

  },
  titre:{
    color:'blue',
    // marginHorizontal:wp('15%'),
    fontSize:hp('3%'),
    
  },
  titre2:{
    color:'blue',
    // marginHorizontal:wp('15%'),
    fontSize:hp('3%'),
    
  },
  titreEx:{
    top:hp('11%'),
    color:'grey',
    fontSize:hp('3%'),
    
  },
  titreExV2:{
    top:hp('3%'),
    color:'grey',
    fontSize:hp('3%'),
    alignItems:'center'
  },
  titreExV:{
    alignItems:'center'
  },
  exp:{
    borderColor:'grey',
    borderWidth:1,
    borderRadius:25,
    width:wp('80%'),
    top:hp('12%'),
    
  },
  but:{
    // position:'absolute',
   padding:25,
  borderRadius:27,
  backgroundColor:'#2f3c7e',
  // opacity:0,
  
  color:'white',
  justifyContent:'center',
  //  marginTop:hp('12%'),
  // marginLeft:wp('30%'),
  // marginHorizontal:2,
  // marginVertical:0,

  height:hp('0.2%'),
  width: wp('80%'),
  top:hp('15%'),
  },
  buttext:{
    textAlign:'center',
      color:'white',
      fontWeight:'bold',
      fontSize:hp('2.5%'),
      
    },
});