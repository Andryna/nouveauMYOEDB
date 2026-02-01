import React, { useEffect, useState } from "react";
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from "react-native";
import firestore from "@react-native-firebase/firestore";

export default function UsersListScreen({ navigation }) {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const unsubscribe = firestore()
      .collection("users")
      .onSnapshot(snapshot => {
        const list = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        setUsers(list);
      });

    return unsubscribe;
  }, []);

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.userRow}
      onPress={() => navigation.navigate("ChatScreen", { userId: item.id, name: item.name })}
    >
      <Text style={styles.name}>{item.name ?? "Utilisateur"}</Text>
      <Text style={styles.lastMsg}>{item.lastMessage ?? "..."}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList data={users} keyExtractor={i => i.id} renderItem={renderItem} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  userRow: {
    padding: 15,
    borderBottomWidth: 1,
    borderColor: "#eee",
  },
  name: { fontSize: 18, fontWeight: "600" },
  lastMsg: { fontSize: 14, color: "#777", marginTop: 5 },
});
