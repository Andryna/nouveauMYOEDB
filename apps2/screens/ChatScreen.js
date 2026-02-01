import React, { useEffect, useLayoutEffect, useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useSelector } from 'react-redux';
import firestore from '@react-native-firebase/firestore';

import ConversationListScreen from './ConversationListScreen';
import ChatRoomScreen from './ChatRoomScreen';
import ChatInitializer from './ChatInitializer';

export default function ChatScreen({ route, navigation }) {
  const user = useSelector(state => state.auth.user);
  // Tu peux forcer l'admin pour tester
  const USER_ID = '1111'; // user?.id;

  const isAdmin = USER_ID === '1111';
  const [unreadCount, setUnreadCount] = useState(2);

  // 🔹 Listener messages non lus pour admin
  useEffect(() => {
    if (!isAdmin) return;

    const unsubscribe = firestore()
      .collection('conversations')
      .where('adminId', '==', '1111')
      .onSnapshot(snapshot => {
        let count = 0;
        snapshot.docs.forEach(doc => {
          const data = doc.data();
          if (data.unreadByAdmin) count += data.unreadByAdmin;
        });
        setUnreadCount(count);
      });

    return () => unsubscribe();
  }, [isAdmin]);

  // 🔹 Mettre à jour le header
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerStyle: {
        backgroundColor: '#0f0f1a',
        shadowColor: '#00ffea',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.8,
        shadowRadius: 8,
        elevation: 10,
        borderBottomWidth: 0,
      },
      headerTitleAlign: 'center',
      headerTitleStyle: {
        fontWeight: 'bold',
        fontSize: 22,
        color: '#00ffea',
        textShadowColor: '#0ff',
        textShadowOffset: { width: 0, height: 0 },
        textShadowRadius: 5,
      },
      headerTitle: () => (
        <Text
          style={{
            color: '#00ffea',
            fontSize: 22,
            fontWeight: 'bold',
            textShadowColor: '#0ff',
            textShadowOffset: { width: 0, height: 0 },
            textShadowRadius: 5,
          }}
        >
          Toutes les demandes
          {/* {isAdmin ? 'Admin 💎' : 'Utilisateur 🚀'} */}
        </Text>
      ),
      headerRight: () => (
        <TouchableOpacity style={{ marginRight: 15 }}>
          <Text style={{ color: '#00ffea', fontWeight: 'bold' }}>⚡</Text>
          {unreadCount > 0 && (
            <View
              style={{
                position: 'absolute',
                right: -6,
                top: -6,
                backgroundColor: 'red',
                borderRadius: 10,
                width: 20,
                height: 20,
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Text style={{ color: 'white', fontSize: 12, fontWeight: 'bold' }}>
                {unreadCount}
              </Text>
            </View>
          )}
        </TouchableOpacity>
      ),
    });
  }, [navigation, unreadCount, isAdmin]);

  if (!USER_ID) return null;

  return (
    <>
      <ChatInitializer />
      {isAdmin ? (
        <ConversationListScreen navigation={navigation} />
      ) : (
        <ChatRoomScreen
          userId={USER_ID}
          adminId="1111"
          navigation={navigation}
        />
      )}
    </>
  );
}
