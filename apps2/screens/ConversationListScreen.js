import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import firestore from '@react-native-firebase/firestore';

export default function ConversationListScreen({ navigation }) {
  const [conversations, setConversations] = useState([]);

  // Mapping des noms affichés
  const nameMapping = {
    '16524': 'Frederic',
    // ajouter d’autres : '16056': 'Nom', etc.
  };

  useEffect(() => {
    const unsub = firestore()
      .collection('conversations')
      .orderBy('lastTimestamp', 'desc')
      .onSnapshot(
        snapshot => {
          if (!snapshot || !snapshot.docs) {
            console.log('Aucune conversation trouvée.');
            setConversations([]);
            return;
          }

          const data = snapshot.docs
            .map(doc => ({ id: doc.id, ...doc.data() }))
            .filter(c => c.adminId === '1111');

          setConversations(data);
        },
        error => {
          console.error('Erreur snapshot:', error);
          setConversations([]);
        }
      );

    return () => unsub();
  }, []);

  // 🔹 Fonction pour formater la date Firestore
  const formatTimestamp = (ts) => {
    if (!ts) return "";

    try {
      const date = ts.toDate();
      const d = date.getDate().toString().padStart(2, '0');
      const m = (date.getMonth() + 1).toString().padStart(2, '0');
      const y = date.getFullYear();

      const h = date.getHours().toString().padStart(2, '0');
      const min = date.getMinutes().toString().padStart(2, '0');

      return `${d}/${m}/${y} - ${h}:${min}`;
    } catch (err) {
      return "";
    }
  };

  const renderItem = ({ item }) => {
    const displayName = nameMapping[item.userId] ?? item.userId;

    return (
      <TouchableOpacity
        style={styles.item}
        onPress={() =>
          navigation.navigate('ChatRoom', {
            conversationId: item.id,
            userId: item.userId,
            adminId: '1111',
          })
        }
      >
        <Text style={styles.user}>{displayName}</Text>

        <Text numberOfLines={1} style={styles.lastMsg}>
          {item.lastMessage || 'Aucun message'}
        </Text>

        {/* 🔹 Ajout date + heure */}
        <Text style={styles.time}>
          {formatTimestamp(item.lastTimestamp)}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={conversations}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        ListEmptyComponent={
          <Text style={{ textAlign: 'center', marginTop: 20 }}>
            Aucune conversation
          </Text>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f0f0f0' },
  item: {
    padding: 15,
    borderBottomWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#fff',
  },
  user: { fontWeight: 'bold', fontSize: 16, color: '#000' },
  lastMsg: { color: '#555', marginTop: 5 },
  time: { color: '#c1ac0eff', marginTop: 3, fontSize: 12 },
});
