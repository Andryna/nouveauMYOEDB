import { useEffect } from 'react';
import messaging from '@react-native-firebase/messaging';
import firestore from '@react-native-firebase/firestore';
import { useSelector } from 'react-redux';

export default function ChatInitializer() {
  const user = useSelector(state => state.auth.user);
//   const USER_ID = user?.id; // id_stag
 const USER_ID = '1111';

  useEffect(() => {
    if (!USER_ID) return;

    const initFCM = async () => {
      try {
        const authStatus = await messaging().requestPermission();
        const enabled = authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
                        authStatus === messaging.AuthorizationStatus.PROVISIONAL;

        console.log('Permission push:', enabled);

        const fcmToken = await messaging().getToken();
        console.log('FCM TOKEN:', fcmToken);

        await firestore()
          .collection('users')
          .doc(USER_ID.toString())
          .set({ fcmToken }, { merge: true });

        messaging().onTokenRefresh(async newToken => {
          await firestore()
            .collection('users')
            .doc(USER_ID.toString())
            .set({ fcmToken: newToken }, { merge: true });
          console.log('Token FCM mis à jour:', newToken);
        });
      } catch (err) {
        console.error('Erreur FCM:', err);
      }
    };

    initFCM();
  }, [USER_ID]);

  return null;
}
