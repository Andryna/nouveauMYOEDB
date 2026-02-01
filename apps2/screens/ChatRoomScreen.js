// await fetch('https://preprod.forma2plus.com/apicours/send_notification', {

    import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  Platform
} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import messaging from '@react-native-firebase/messaging';
import notifee from '@notifee/react-native';

const { FieldValue } = firestore;

export default function ChatRoomScreen({ route, navigation }) {
  const { userId, adminId } = route.params;
  const currentUserId = '1111'; // ID admin

  // 🔹 Vérifier IDs avant de créer convId
  if (!userId || !adminId) {
    Alert.alert('Erreur', 'ID utilisateur ou admin manquant');
    return null;
  }

  const convId = `${adminId}__${userId}`;

  const [messages, setMessages] = useState([]);
  const [text, setText] = useState('');

  const messagesRef = firestore()
    .collection('conversations')
    .doc(convId)
    .collection('messages');

  const convRef = firestore().collection('conversations').doc(convId);

  // 🔹 Header dynamique
  useEffect(() => {
    const isAdmin = currentUserId === adminId;

    navigation.setOptions({
    //   headerTitle: isAdmin ? `${userId}` : "Responsable",
      headerTitle: isAdmin ? `Frederic` : "Responsable",
      headerStyle: { backgroundColor: '#0f0f1a' },
      headerTintColor: '#00ffea',
      headerTitleStyle: { fontWeight: 'bold', fontSize: 20 },
    });
  }, [navigation, userId, adminId]);

  // 🔹 Listener messages en temps réel
  useEffect(() => {
    const unsub = messagesRef
      .orderBy('timestamp', 'asc')
      .onSnapshot(snapshot => {
        if (!snapshot || !snapshot.docs) return;
        const data = snapshot.docs.map(doc => {
          const msg = doc.data();
          return {
            id: doc.id,
            from: msg.from ?? '',
            to: msg.to ?? '',
            text: msg.text ?? '',
            timestamp: msg.timestamp?.toDate?.() || new Date(),
          };
        });
        setMessages(data);
      }, error => console.error('Snapshot error:', error));

    return () => unsub();
  }, []);

  // 🔹 Setup notifications foreground (iOS/Android)
  useEffect(() => {
    async function setupNotifications() {
      await notifee.requestPermission();

      await notifee.createChannel({
        id: 'default',
        name: 'Notifications par défaut',
        importance: 4,
      });

      const unsubscribe = messaging().onMessage(async remoteMessage => {
        await notifee.displayNotification({
          title: remoteMessage.notification?.title ?? remoteMessage.data?.title,
          body: remoteMessage.notification?.body ?? remoteMessage.data?.body,
          ios: { foregroundPresentationOptions: { alert: true, sound: true, badge: true } },
          android: { channelId: 'default' },
        });
      });

      return unsubscribe;
    }

    const unsubPromise = setupNotifications();
    return () => { unsubPromise.then(unsub => unsub && unsub()); };
  }, []);

  // 🔹 Envoyer un message
  const sendMessage = async () => {
    if (!text.trim()) return;

    // 🔹 Vérifier convId encore une fois
    if (!convId) {
      console.warn('convId invalide', convId);
      return;
    }

    const msgData = {
      from: currentUserId ?? '',
      to: userId ?? '',
      text: text?.trim() ?? '',
      timestamp: FieldValue.serverTimestamp(),
    };

    console.log('Envoi message:', { convId, msgData });

    try {
      await messagesRef.add(msgData);

      await convRef.set(
        {
          userId: userId ?? '',
          adminId: adminId ?? '',
          lastMessage: text.trim(),
          lastTimestamp: FieldValue.serverTimestamp(),
        },
        { merge: true }
      );

      // 🔹 Envoyer notification FCM si token existe
      const userDoc = await firestore().collection('users').doc(userId).get();
      const token = userDoc.exists && userDoc.data()?.fcmToken ? userDoc.data().fcmToken : null;

      if (token) {
        await fetch('https://preprod.forma2plus.com/apicours/send_notification', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            token,
            title: 'Message de l’admin 💎',
            body: text.trim(),
          }),
        });
      }

      setText('');
    } catch (err) {
      console.error('Erreur envoi message:', err);
      Alert.alert('Erreur', 'Impossible d’envoyer le message');
    }
  };

  // 🔹 Affichage messages
  const renderItem = ({ item }) => {
    const isMine = item.from === currentUserId;
    return (
      <View style={[styles.msgBox, isMine ? styles.myMsg : styles.otherMsg]}>
        <Text style={styles.msgText}>{item.text}</Text>
        {/* <Text style={styles.msgInfo}>{isMine ? 'Vous' : userId}</Text> */}
        <Text style={styles.msgInfo}>{isMine ? 'Vous' : 'Frederic'}</Text>
      </View>
    );
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 70}
    >
      <View style={styles.container}>
        <FlatList
          data={messages}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          contentContainerStyle={{ padding: 15 }}
        />

        <View style={styles.inputRow}>
          <TextInput
            value={text}
            onChangeText={setText}
            placeholder="Écrire un message..."
            style={styles.input}
          />
          <TouchableOpacity onPress={sendMessage} style={styles.sendBtn}>
            <Text style={{ color: '#fff' }}>Envoyer</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f0f0f0' },
  msgBox: { padding: 10, borderRadius: 8, marginBottom: 10, maxWidth: '80%' },
  myMsg: { backgroundColor: '#DCF8C6', alignSelf: 'flex-end' },
  otherMsg: { backgroundColor: '#fff', alignSelf: 'flex-start' },
  msgText: { fontSize: 16 },
  msgInfo: { fontSize: 12, color: '#094746ff', textAlign: 'right', marginTop: 4 },
  inputRow: { flexDirection: 'row', padding: 10, borderTopWidth: 1, borderColor: '#ccc', backgroundColor: '#fff' },
  input: { flex: 1, borderWidth: 1, borderColor: '#ccc', borderRadius: 20, paddingHorizontal: 15, marginRight: 10, height: 40 },
  sendBtn: { backgroundColor: '#007AFF', borderRadius: 20, paddingHorizontal: 15, justifyContent: 'center', alignItems: 'center' },
});
