import React, { Component } from 'react';
import {
  View,
  Image,
  TouchableOpacity,
  Text,
  Alert,
  Platform
} from 'react-native';
import { WebView } from 'react-native-webview';
import moment from 'moment';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { check, request, PERMISSIONS, RESULTS } from 'react-native-permissions';
import { getCNX } from '../utils/All';

export default class Elv3 extends Component {
  static navigationOptions = {
    headerShown: false,
    title: 'Forma2+',
    headerStyle: {
      backgroundColor: '#2f3c7e',
    },
    headerTintColor: '#fff',
    headerLeft: () => null,
  };

  constructor(props) {
    super(props);
    this.state = {
      user: this.props.navigation.state.params.user, // ou this.props.route.params.user si tu utilises React Navigation v6
      token: this.props.navigation.state.params.token, // ou this.props.route.params.user si tu utilises React Navigation v6
      url3: '',
      agent: 'stag',
      permissionsGranted: false,
    };
  }

  async componentDidMount() {
    await this.requestCameraAndMicrophonePermissions();
    this.updateAgentAndUrl();
  }

  // 🔹 Déterminer agent et URL
    updateAgentAndUrl = () => {
    const { user, token } = this.state;
    const agent = user.type === '0' ? 'stag' : 'prof';

    console.log(token);

    const url3 = `https://elearning.forma2plus.com/authorization-baerer?token=${token}`;

    this.setState({ agent, url3 });
    };


  // 🔹 Demande des permissions caméra et micro
  requestCameraAndMicrophonePermissions = async () => {
    try {
      let cameraPermissionResult;
      let microphonePermissionResult;

      if (Platform.OS === 'android') {
        cameraPermissionResult = await request(PERMISSIONS.ANDROID.CAMERA);
        microphonePermissionResult = await request(PERMISSIONS.ANDROID.RECORD_AUDIO);
      } else if (Platform.OS === 'ios') {
        cameraPermissionResult = await request(PERMISSIONS.IOS.CAMERA);
        microphonePermissionResult = await request(PERMISSIONS.IOS.MICROPHONE);
      }

      if (
        cameraPermissionResult === RESULTS.GRANTED &&
        microphonePermissionResult === RESULTS.GRANTED
      ) {
        this.setState({ permissionsGranted: true });
        console.log('✅ Permissions caméra et micro accordées.');
      } else {
        Alert.alert(
          'Permissions requises',
          "Vous devez accorder la permission d'utilisation de la caméra et du micro pour accéder à l'e-learning.",
          [{ text: 'OK', onPress: () => this.props.navigation.goBack() }]
        );
      }
    } catch (error) {
      console.log('❌ Erreur permissions :', error);
      Alert.alert('Erreur', 'Impossible de vérifier les permissions.');
      this.props.navigation.goBack();
    }
  };

  render() {
    const { permissionsGranted, user, url3 } = this.state;

    const url =
      'https://preprod.forma2plus.com/disk2/dropbox/iframe_test.php?' +
      'group_member_id=' + user.id + '_' + user.id_groupe +
      '&agent=' + this.state.agent +
      '&room_id=' + user.id + '_' + user.id_groupe +
      '&date=' + moment(new Date()).format('YYYY-MM-DD');

    const finalUrl = url3 || url;

    return (
      <View style={{ flex: 1 }}>
        {/* 🔹 Header */}
        <View
          style={{
            justifyContent: 'center',
            paddingTop:35,
            // height: hp('7%'),
            backgroundColor: '#081134',
          }}
        >
          <View
            style={{
              width: wp('100%'),
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignSelf: 'baseline',
            //   marginTop: 30,
            }}
          >
            <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
              <View style={{ flexDirection: 'row', height: hp('5%') }}>
                <Image
                  style={{ width: 20, height: 20 }}
                  source={require('../image/trace.png')}
                />
                <View>
                  <Text
                    style={{
                      color: 'white',
                      marginLeft: wp('3%'),
                      fontSize: hp('2%'),
                    }}
                  >
                    E-Learning
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          </View>
        </View>

        {/* 🔹 WebView */}
        {permissionsGranted ? (
          <WebView
            source={{
              uri: finalUrl,
              headers: { 'Accept-Language': 'en' },
            }}
            originWhitelist={['*']}
            javaScriptEnabled={true}
            allowsInlineMediaPlayback={true}
            mediaPlaybackRequiresUserAction={false}
            allowFileAccess={true}
            startInLoadingState={true}
            style={{ flex: 1 }}
          />
        ) : (
          <View
            style={{
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: '#000',
            }}
          >
            <Text style={{ color: '#fff', fontSize: hp('2%'), textAlign: 'center' }}>
              Vérification des permissions...
            </Text>
          </View>
        )}
      </View>
    );
  }
}
