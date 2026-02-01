// SearchInput.js (composant fonctionnel)
import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native'; // Importez StyleSheet depuis 'react-native'
import Icon from 'react-native-vector-icons/Ionicons';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
const SearchInput = ({ placeholder, value, onChangeText, onSearch }) => (
  <View style={styles.container}>
    <View style={styles.inputContainer}>
      <TextInput
        placeholder={placeholder}
        style={styles.input}
        onChangeText={onChangeText}
        value={value}
        blurOnSubmit={false}
      />
      <View style={styles.iconContainer}>
        <Icon name={'md-search'} size={20} color={'grey'} onPress={onSearch} />
      </View>
    </View>
  </View>
);

// Définissez les styles dans un objet StyleSheet
const styles = StyleSheet.create({
  container: {
    marginTop:hp('3%'),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  inputContainer: {
    borderWidth: 0.7,
    width: wp('70%'),
    height: hp('5%'),
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    padding: 0,
    alignSelf: 'center',
  },
  input: {
    fontSize: 14,
    textAlign: 'center',
    padding: 0,
  },
  iconContainer: {
    position: 'absolute',
    marginLeft: '3%',
    top: hp('1%'),
    left: wp('2.5%'),
  },
});

export default SearchInput;
