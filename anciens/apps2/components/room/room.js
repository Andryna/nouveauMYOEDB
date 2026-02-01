import React, { Component } from 'react';
import { View,Image,TouchableOpacity,Text,FlatList, ScrollView,Alert } from 'react-native';
import { WebView } from 'react-native-webview';
import moment from 'moment';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {check,request,PERMISSIONS,RESULTS} from 'react-native-permissions';



export default class Room extends Component {
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
    user: this.props.route.params.user, 
    url3:'',
    agent:'stag',
    permissionsGranted: false
    
  };
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    this.requestCameraAndMicrophonePermissions();
    this.updateAgentAndUrl();
  }

  updateAgentAndUrl() {
    const { user } = this.state;
    const agent = user.type === '0' ? 'stag' : 'prof';
    const url3 = `https://preprod.forma2plus.com/disk2/dropbox/iframe_test.php?group_member_id=${user.id}_${user.id_groupe}&agent=${agent}&room_id=${user.id}_${user.id_groupe}&date=${moment(new Date()).format("YYYY-MM-DD")}&config.disableDeepLinking=true`;


    // alert(url3);
    this.setState({ agent, url3 });
  }

  requestCameraAndMicrophonePermissions = async () => {
    const cameraPermissionResult = await request(PERMISSIONS.ANDROID.CAMERA);
    const microphonePermissionResult = await request(PERMISSIONS.ANDROID.RECORD_AUDIO);

    if (
      cameraPermissionResult === RESULTS.GRANTED &&
      microphonePermissionResult === RESULTS.GRANTED
    ) {
      this.setState({ permissionsGranted: true }, () => {
        console.log('Permission accordée');
        // Les autorisations ont été accordées, vous pouvez lancer Jitsi Meet ici
      });
    } else {
      alert("Vous devez accorder la permission d'utilisation du camera et le micro");
      this.props.navigation.goBack();
      // Les autorisations ont été refusées, informez l'utilisateur
    }
  };
//     alert(this.state.type);
//     const expr = this.state.type;
// switch (expr) {
//   case '0':
//     this.setState({agent:'stag'});
//     break;
//   case '3':
//     this.setState({agent:'prof'});
//   case '':
//     console.log("not specified");
//     break;
//   default:
//     console.log("unknow");
// }
// const url2 = 'https://preprod.forma2plus.com:3001/join/'+this.state.id+'_'+this.state.id_groupe+"?agent="+this.state.agent;
// alert(url2);

//  alert("https://preprod.forma2plus.com/mbed_jitsi/jitsi.php?id_call="+this.state.id+'_'+this.state.id_groupe+"&agent=stag");
  

  // https://preprod.forma2plus.com:3001/join/IDSTAGIAIRE_GROUPE?agent=prof
  render() {
    const { permissionsGranted } = this.state;
    const {user} = this.state;
    const language = "en-us";
    // https://preprod.forma2plus.com/mbed_jitsi/jitsi.php?id_call=testpascal_reu
    const url = 'https://preprod.forma2plus.com/disk2/dropbox/iframe_test.php?group_member_id='+user.id+'_'+user.id_groupe+'&agent=stag&room_id='+user.id+'_'+user.id_groupe+'&date='+moment(new Date()).format("YYYY-MM-DD");
    // 'https://demo.forma2plus.com/dropbox/audio_and_transcript/test.php?id_stag_prof=11_11';
    // https://preprod.forma2plus.com:3001/join/'+this.state.id+'_'+this.state.id_groupe+"?agent="+this.state.agent;
    // // const url = "https://preprod.forma2plus.com/mbed_jitsi/jitsi.php?id_call="+this.state.id+'_'+this.state.id_groupe+"&agent=stag";
    const customUserAgent = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36';
    return (
      <View style = {{flex:1}}>
       <View 
          style={{
            justifyContent:'center',
            height:hp('7%'), 
            backgroundColor:'#081134'
            }}
        >
          <View
            style={{width:wp('100%'),flexDirection:'row',justifyContent:'space-between', alignSelf:'baseline', marginTop:hp('2%')}}
          >
            <TouchableOpacity 
              onPress={() =>this.props.navigation.goBack()}
            >
              <View
              style={{
              flexDirection:'row',
              height:hp('5%')
              }}>
                <Image 
                  style={{
                    width:20,
                    height:20,
                  }}
                  source={require('../../image/trace.png')}
                >
                </Image>
                <View>
                    <Text 
                      style={{
                        color:'white',
                        marginLeft:wp('3%'),
                        fontSize:hp('2%')
                      }}
                    >
                      MEETING
                    </Text>
                </View>
              </View>
            </TouchableOpacity>
          </View>
        </View>
        {permissionsGranted && (
          <WebView
          source={{ uri:this.state.url3,headers: {
            "Accept-Language": 'en',
          } }}
          // userAgent='Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Ubuntu Chromium/80.0.3987.163 Chrome/80.0.3987.163 Safari/537.36'
          originWhitelist={['*']}
          javaScriptEnabled={true}
          allowsInlineMediaPlayback={true}
          mediaPlaybackRequiresUserAction={false}
          allowFileAccess={true}
          />
        )}
        
      </View>
    
    );
  }
}