import React, { useEffect, useState, useLayoutEffect } from 'react';
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
import { request, PERMISSIONS, RESULTS } from 'react-native-permissions';
import { getCNX } from '../utils/All';

export default function Elv3({ navigation, route }) {
  const { user, token } = route.params;

  const [agent, setAgent] = useState(user.type === '0' ? 'stag' : 'prof');
  const [url3, setUrl3] = useState('');
  const [permissionsGranted, setPermissionsGranted] = useState(false);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
      title: 'Forma2+',
      headerStyle: { backgroundColor: '#2f3c7e' },
      headerTintColor: '#fff',
      headerLeft: () => null,
    });
  }, [navigation]);

  useEffect(() => {
    requestCameraAndMicrophonePermissions();
    updateAgentAndUrl();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const updateAgentAndUrl = () => {
    const a = user.type === '0' ? 'stag' : 'prof';
    const u = `https://elearning.forma2plus.com/authorization-baerer?token=${token}`;
    setAgent(a);
    setUrl3(u);
  };

  const requestCameraAndMicrophonePermissions = async () => {
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
        setPermissionsGranted(true);
        console.log('✅ Permissions caméra et micro accordées.');
      } else {
        Alert.alert(
          'Permissions requises',
          "Vous devez accorder la permission d'utilisation de la caméra et du micro pour accéder à l'e-learning.",
          [{ text: 'OK', onPress: () => navigation.goBack() }]
        );
      }
    } catch (error) {
      console.log('❌ Erreur permissions :', error);
      Alert.alert('Erreur', 'Impossible de vérifier les permissions.');
      navigation.goBack();
    }
  };

  const url =
    'https://preprod.forma2plus.com/disk2/dropbox/iframe_test.php?' +
    'group_member_id=' + user.id + '_' + user.id_groupe +
    '&agent=' + agent +
    '&room_id=' + user.id + '_' + user.id_groupe +
    '&date=' + moment(new Date()).format('YYYY-MM-DD');

  const finalUrl = url3 || url;

  return (
    <View style={{ flex: 1 }}>
      <View
        style={{
          justifyContent: 'center',
          paddingTop:35,
          backgroundColor: '#081134',
        }}
      >
        <View
          style={{
            width: wp('100%'),
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignSelf: 'baseline',
          }}
        >
          <TouchableOpacity onPress={() => navigation.goBack()}>
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
