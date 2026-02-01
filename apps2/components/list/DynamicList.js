import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';

const DynamicList = ({ title, items }) => {
  return (
    <View style={styles.container}>
      {/* Titre */}
      <Text style={styles.title}>{title}</Text>
      
      {/* Liste */}
      <FlatList
        data={items}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => <Text style={styles.item}>• {item}</Text>}
        ListEmptyComponent={<Text style={styles.empty}>No items available</Text>}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
    marginHorizontal:20,
    padding: 10,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  item: {
    fontSize: 16,
    color: '#333',
    marginBottom: 5,
  },
  empty: {
    fontStyle: 'italic',
    color: '#999',
  },
});

export default DynamicList;
