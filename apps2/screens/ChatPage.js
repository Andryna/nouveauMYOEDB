import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, FlatList, Text, StyleSheet } from 'react-native';
import firestore from '@react-native-firebase/firestore';

const ChatPage = ({ userId }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  // Écoute des messages en temps réel
  useEffect(() => {
    const unsubscribe = firestore()
      .collection('chat') // collection pour les messages
      .orderBy('createdAt', 'asc')
      .onSnapshot(querySnapshot => {
        const msgs = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        setMessages(msgs);
      });

    return () => unsubscribe();
  }, []);

  const sendMessage = async () => {
    if (!newMessage.trim()) return;

    await firestore().collection('chat').add({
      text: newMessage,
      userId: userId, // ici users.id_stag
      createdAt: firestore.FieldValue.serverTimestamp(),
    });

    setNewMessage('');
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={messages}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={[styles.message, item.userId === userId ? styles.myMessage : styles.adminMessage]}>
            <Text>{item.text}</Text>
          </View>
        )}
      />

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Tapez un message..."
          value={newMessage}
          onChangeText={setNewMessage}
        />
        <Button title="Envoyer" onPress={sendMessage} />
      </View>
    </View>
  );
};

export default ChatPage;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10 },
  message: { padding: 10, borderRadius: 8, marginVertical: 5, maxWidth: '80%' },
  myMessage: { alignSelf: 'flex-end', backgroundColor: '#DCF8C6' },
  adminMessage: { alignSelf: 'flex-start', backgroundColor: '#E5E5E5' },
  inputContainer: { flexDirection: 'row', alignItems: 'center' },
  input: { flex: 1, borderWidth: 1, borderColor: '#ccc', borderRadius: 20, paddingHorizontal: 10, marginRight: 10 },
});
