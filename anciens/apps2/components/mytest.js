
import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { WebView } from 'react-native-webview';
import moment from 'moment';

export default class Mytest extends Component {
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
   
  };
  constructor(props) {
    super(props);
  }
  
  render() {
  
    return (
      <View style = {{flex:1}}>
        {/* <Text>{this.state.url3}</Text> */}
          <WebView
        source={{html: `<video width="100%" height="60%" controls>
                            <source src="https://preprod.forma2plus.com/disk2/elearning2021_test/elearning2021/groupes/GRP10013/4626_1674204744.mp4" type="video/mp4">
                            
                        </video>`}}
        // userAgent='Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Ubuntu Chromium/80.0.3987.163 Chrome/80.0.3987.163 Safari/537.36'
        originWhitelist={['*']}
        javaScriptEnabled={true}
        allowsInlineMediaPlayback={true}
        mediaPlaybackRequiresUserAction={false}
        allowFileAccess={true}
      />
      </View>
    
    );
  }
}