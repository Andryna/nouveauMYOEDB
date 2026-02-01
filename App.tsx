import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  FlatList,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import messaging from '@react-native-firebase/messaging';
import firebase from '@react-native-firebase/app';

function App() {
  const [messages, setMessages] = useState<any[]>([]);
  const [inputText, setInputText] = useState('');
  const [firebaseStatus, setFirebaseStatus] = useState('Vérification Firebase...');
  const [fcmToken, setFcmToken] = useState<string | null>(null);

  // Vérifie si Firebase est initialisé
  useEffect(() => {
    if (firebase.apps.length > 0) {
      setFirebaseStatus('Firebase est initialisé ✅');
    } else {
      setFirebaseStatus('Firebase NON initialisé ❌');
    }
  }, []);

  // Permission + token FCM
  useEffect(() => {
    async function setupMessaging() {
      try {
        // 1. Autorisation de notification
        await messaging().requestPermission();

        // 2. Enregistrer l'appareil AVANT getToken()
        await messaging().registerDeviceForRemoteMessages();

        // 3. Obtenir token
        const token = await messaging().getToken();
        console.log('📌 FCM Token:', token);
        setFcmToken(token);

        // 4. Ecoute des messages en foreground
        const unsubscribe = messaging().onMessage(async remoteMessage => {
          console.log('📩 Message reçu en foreground:', remoteMessage);
        });

        return unsubscribe;

      } catch (error) {
        console.log('❌ Erreur FCM:', error);
      }
    }

    const unsubscribe = setupMessaging();
    return () => {
      if (unsubscribe && typeof unsubscribe === 'function') unsubscribe();
    };
  }, []);

  // Écoute messages Firestore en temps réel
  useEffect(() => {
    const unsubscribe = firestore()
      .collection('messages')
      .orderBy('timestamp', 'asc')
      .onSnapshot(snapshot => {
        const msgs = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setMessages(msgs);
      });

    return () => unsubscribe();
  }, []);

  // Envoi d'un message
  const sendMessage = () => {
    if (inputText.trim() === '') return;

    firestore().collection('messages').add({
      text: inputText,
      timestamp: firestore.FieldValue.serverTimestamp(),
    });

    setInputText('');
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={80}
    >
      <Text style={styles.firebaseStatus}>{firebaseStatus}</Text>

      {fcmToken && (
        <Text style={styles.tokenText}>📱 Token FCM:{'\n'}{fcmToken}</Text>
      )}

      <FlatList
        data={messages}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.messageItem}>
            <Text>{item.text}</Text>
          </View>
        )}
        style={styles.messageList}
      />

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Écrire un message..."
          value={fcmToken}
          onChangeText={setInputText}
        />
        <Button title="Envoyer" onPress={sendMessage} />
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingHorizontal: 16, paddingTop: 40, backgroundColor: '#f5f5f5' },
  firebaseStatus: { fontSize: 16, marginBottom: 12, color: '#007AFF', textAlign: 'center' },
  tokenText: { fontSize: 12, color: '#555', marginBottom: 20, textAlign: 'center' },
  messageList: { flex: 1, marginBottom: 12 },
  messageItem: { padding: 8, backgroundColor: '#fff', marginBottom: 4, borderRadius: 4 },
  inputContainer: { flexDirection: 'row', alignItems: 'center', marginBottom: 16 },
  input: { flex: 1, borderWidth: 1, borderColor: '#ccc', borderRadius: 4, paddingHorizontal: 8, marginRight: 8, height: 40 },
});

export default App;
