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
    id_groupe:this.props.navigation.state.params.id_groupe,
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
      pausedText:'ios-play',
      
      namevid:this.props.navigation.state.params.namevid,
      id_groupe:this.props.navigation.state.params.id_groupe,
    };
  }
  componentDidMount() {
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
    <body style="display:flex; flex-direction: column;justify-content: center; 
      align-items:center;color:red;">
      <video width="100%" controls>
      <source src=" `+ base_url + `/elearning2021/groupes/GRP`+this.state.id_groupe+`/`+namevid + ` " ` +`type="video/mp4">
      <source src="mov_bbb.ogg" type="video/ogg">
      Your browser does not support HTML video.
    </video>
     </body>`;
    
    return (
      <View style = {{flex:1,
        backgroundColor:'#020D4D' 
      }}>
        <View
              style={{  
                height:hp('8%'),width: wp('100%'),justifyContent: 'center',backgroundColor:'#020D4D' ,
                marginTop:hp('2%')
                }}>
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate('Accueil')}>
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
                   VIDEO PLAYER
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
        <WebView 
          source={{ html: customHTML }} 
        />
      </View>
    
    );
  }
}