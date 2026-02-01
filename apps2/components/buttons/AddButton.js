// CustomButton.js
import React from 'react';
import { TouchableOpacity, View, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const AddButton = ({ onPress, backgroundColor }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={[styles.buttonContainer, { backgroundColor }]}>
        <Icon name="add" size={35} color="white" style={styles.icon} />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    padding: 5,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    alignSelf: 'center',
  },
});

export default AddButton;
