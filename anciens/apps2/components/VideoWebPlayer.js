import React, { Component } from 'react';
import { TouchableHighlight,Linking, Platform, Clipboard, StyleSheet, Text, Keyboard, KeyboardAvoidingView, Image, TouchableWithoutFeedback, Button, Alert, Slider, View, TouchableOpacity, ScrollView, ActivityIndicator, FlatList, TextInput, Modal, AsyncStorage, TouchableNativeFeedbackBase, ActionSheetIOS, TouchableOpacityBase } from 'react-native';
import { WebView } from 'react-native-webview';
import moment from 'moment';
import Icon from 'react-native-vector-icons/Ionicons';
import Fontawesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import config from '../../config.json';
const base_url = config.base_url;
export default class VideoWebPlayer extends Component {
  static navigationOptions =
  {
   headerShown: false,
   title: 'Forma2+',
   headerStyle: {
     backgroundColor:'#2f3c7e',
    
   },
   headerTintColor: '#fff',
   headerLeft: () => null
  };
  state = {
    id: this.props.navigation.state.params.id1, 
    type:this.props.navigation.state.params.type,
    url3:''
  };
  constructor(props) {
    super(props);
    super(props);
    
    // init state variables
    this.state = {
      rate: 1,
      volume: 1,
      muted: false,
      resizeMode: 'contain',
      duration: 0.0,
      currentTime: 0.0,
      paused: true,
      pickerValueHolder: '1.0',
      // pausedText: 'Play',
      hideControls: false,
      pausedText:'play',
      namevid:this.props.navigation.state.params.namevid,
      id_groupe:this.props.navigation.state.params.id_groupe,
      trad:this.props.navigation.state.params.trad,
      txt:this.props.navigation.state.params.original,
      transJitsi:this.props.navigation.state.params.transJitsi,
    };
  }
  componentDidMount() {
    // alert(this.state.id_groupe);
    if(this.state.type == '0'){
      this.setState({
        agent:'stag',
        url3:base_url + '/disk2/dropbox/iframe_test.php?group_member_id='+this.state.id+'_'+this.state.id_groupe+'&agent=prof&room_id='+this.state.id+'_'+this.state.id_groupe+'&date='+moment(new Date()).format("YYYY-MM-DD")
      });
    }
    else{
      this.setState({
        agent:'stag',
        url3:base_url + '/disk2/dropbox/iframe_test.php?group_member_id='+this.state.id+'_'+this.state.id_groupe+'&agent=prof&room_id='+this.state.id+'_'+this.state.id_groupe+'&date='+moment(new Date()).format("YYYY-MM-DD")
      });
    }
  }
  render() {
    const pausedText = this.state;
        const paused = this.state;
        const f_name = this.state;
        // const newfname = f_name.replace('output.webm','.mp4');
        // const flexCompleted = this.getCurrentTimePercentage() * 100;
        const {namevid}=this.state;
    const language = "en-us";
    const url = base_url + ':3001/join/'+this.state.id+'_'+this.state.id_groupe+"?agent="+this.state.agent;
    const customHTML = `
    <body style="display:flex; flex-direction: column;justify-content: center;  padding:10px; margin:15px;
      align-items:center;color:red;">
      <video width="100%" height="100%" controls>
        <source src=" `+ base_url + `/elearning2023/groupes/GRP`+this.state.id_groupe+`/`+namevid + ` " ` +`type="video/mp4">
        <source src="mov_bbb.ogg" type="video/ogg">
        Your browser does not support HTML video.
      </video>
     </body>`;
     const myIframeHTML = `
     <!DOCTYPE html>
     <html lang="en">
     <head>
       <meta charset="UTF-8">
       <meta name="viewport" content="width=device-width, initial-scale=1.0">
       <style>
         body {
           font-size: 14px;
           margin: 0;
           padding: 0;
         }
   
         iframe {
           width: 100%;
           height: 100vh;
           border: none;
         }
       </style>
       <title>IFrame Page</title>
     </head>

     <body>
      
       <iframe src="https://elprod.forma2plus.com/`+this.state.transJitsi+`" frameborder="0"></iframe>
     </body>
     </html>
   `;
   
   // Utilisez myIframeHTML dans votre composant React Native avec WebView
   
    return (
      <View style = {{flex:1,
        backgroundColor:'#192356' ,
        padding:15
        // height:hp('100%'),
        // justifyContent:'center'
      }}>
        <View
              style={{  
                height:hp('7%'),width: wp('100%'),justifyContent: 'center',backgroundColor:'#192356' ,
                // marginTop:hp('2%')
                }}>
              <TouchableOpacity
                onPress={() => this.props.navigation.goBack()}>
                <View
                  style={{
                    flexDirection: 'row',
                    // backgroundColor:'white'
                  }}>
                    <Icon name="arrow-back-outline" size={30} color="white" />
                
                 <Text style={{
                    color: 'white',
                    marginLeft: wp('35%'),
                    fontSize: hp('2.2%'),
                    position: 'absolute',
                    // bottom: -4,

                  }}>
                   VIDEO PLAYER:
                  </Text>
                </View>
              </TouchableOpacity>
        </View>
        {/* <View> */}

        {(this.state.transJitsi !== null || this.state.transJitsi !== '') ?(
            <WebView
                source={{ html: customHTML }}
            />
        ):null}

        {/* </View> */}

            {/* <View style={{ backgroundColor:'red',}}> */}
             {this.state.txt == 'texte transcripted by Open AI API' ?( <View style={{backgroundColor:'#020D4D', height:hp('50%'), padding:5, marginBottom:10, marginTop:30, borderRadius:5}}>
                {/* <View style={{ backgroundColor:'#020D4D', marginBottom:10}}>
                  <Text style={{color:'white', fontWeight:'bold', fontSize:16, marginBottom:5}}>Your speech</Text>
                  <Text style={{backgroundColor:'#2B4098', color:'white', textAlign:'justify', marginBottom:10, padding:10, borderRadius:5}}>{this.state.txt}</Text>
                  <Text style={{color:'white', fontWeight:'bold', fontSize:16, marginBottom:5}}>Translation</Text>
                  <Text style={{backgroundColor:'#2B4098', color:'white', textAlign:'justify', marginBottom:10, padding:10, borderRadius:5}}>{this.state.trad}</Text>
                </View> */}
                <WebView
                  source={{ html: myIframeHTML }}
                  // style={{ flex: 1 }}
                />
              </View>):
              ( 
              <View style={{backgroundColor:'#020D4D', height:hp('50%'), padding:5, marginBottom:10, marginTop:30, borderRadius:5}}>
                <View style={{ backgroundColor:'#020D4D', marginBottom:10}}>
                  <Text style={{color:'white', fontWeight:'bold', fontSize:16, marginBottom:5}}>Your speech</Text>
                  <Text style={{backgroundColor:'#2B4098', color:'white', textAlign:'justify', marginBottom:10, padding:10, borderRadius:5}}>{this.state.txt}</Text>
                  <Text style={{color:'white', fontWeight:'bold', fontSize:16, marginBottom:5}}>Translation</Text>
                  <Text style={{backgroundColor:'#2B4098', color:'white', textAlign:'justify', marginBottom:10, padding:10, borderRadius:5}}>{this.state.trad}</Text>
                </View>
              </View>
            )
              }
            {/* </View> */}
      </View>
    
    );
  }
}