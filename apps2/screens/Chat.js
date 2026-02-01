import React, { Component } from 'react';
import { View, Image, TouchableOpacity, Text, Alert, Platform } from 'react-native';
import { WebView } from 'react-native-webview';
import moment from 'moment';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { request, PERMISSIONS, RESULTS } from 'react-native-permissions';

export default class Chat extends Component {

  constructor(props) {
    super(props);

    // IMPORTANT : utiliser props dans le constructor ! (sinon crash)
    this.state = {
      user: props.route?.params?.user,
      config: props.route?.params?.config,
      url3: '',
      agent: 'stag',
      permissionsGranted: false,
    };
  }

  componentDidMount() {
    this.requestMicrophonePermission();
    this.updateAgentAndUrl();
  }

  updateAgentAndUrl() {
    const { user, config } = this.state;
    const agent = user?.type === '0' ? 'stag' : 'prof';

    const url3 = `https://chatbox.forma2plus.com/realtime-with-config?level=${config.level}&voice=${config.voice}&language=${config.language}&realtiIdStagiaire=${user.id}&discussionMode=${config.discussionMode}`;

    console.log(url3);

    this.setState({ agent, url3 });
  }

 requestMicrophonePermission = async () => {
  try {
    let permission;
    if (Platform.OS === 'ios') {
      permission = PERMISSIONS.IOS.MICROPHONE;
    } else if (Platform.OS === 'android') {
      permission = PERMISSIONS.ANDROID.RECORD_AUDIO;
    }

    const result = await request(permission);

    if (result === RESULTS.GRANTED) {
      this.setState({ permissionsGranted: true });
      console.log("Permission micro accordée ✅");
    } else {
      Alert.alert(
        "Permission refusée",
        "Vous devez autoriser l'accès au micro.",
        [{ text: "OK", onPress: () => this.props.navigation.goBack() }]
      );
    }
  } catch (error) {
    console.error("Erreur permission micro:", error);
    Alert.alert("Erreur", "Impossible de vérifier la permission du micro.");
    this.props.navigation.goBack();
  }
};

  render() {
    const { permissionsGranted, url3 } = this.state;

    return (
      <View style={{ flex: 1 }}>

        {/* HEADER */}
        <View
          style={{
            justifyContent: 'center',
            height: hp('10%'),
            backgroundColor: '#081134',
          }}
        >
          <View
            style={{
              width: wp('100%'),
              flexDirection: 'row',
              alignItems: 'center',
              marginTop: hp('3%'),
            }}
          >
            <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Image
                  style={{ width: 20, height: 20 }}
                  source={require('../image/trace.png')}
                />
                <Text
                  style={{
                    color: 'white',
                    marginLeft: wp('3%'),
                    fontSize: 14,
                    fontWeight: 'bold'
                  }}
                >
                  Realtime Discussion
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>

        {/* WEBVIEW */}
        {permissionsGranted && (
          <WebView
            source={{
              uri: url3,
              headers: { 'Accept-Language': 'en' },
            }}
            originWhitelist={['*']}
            javaScriptEnabled={true}
            allowsInlineMediaPlayback={true}
            mediaPlaybackRequiresUserAction={false}
            allowFileAccess={true}
            userAgent="Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36"
          />
        )}
      </View>
    );
  }
}
