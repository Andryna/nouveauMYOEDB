import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
export const pickStyle = StyleSheet.create({
dropdown2: {
    height: 50,
    width: '40%',
    backgroundColor: 'transparent',
    borderRadius: 8,
    paddingHorizontal: 8,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    alignSelf: 'center',
  },
  dropdownItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    alignItems: 'center',
    flexDirection: 'row',
  },
  dropdownItemText: {
    fontSize: 16,
    color: '#333',
  },
  textDropdown: {
    fontSize: 16,
    color: 'white',
  },
  placeholderStyle: {
    fontSize: 16,
    color: '#999',
  },
  selectedTextStyle: {
    fontSize: 16,
    color: 'white',
  },
  dropdown: {
    height: 50,
    width: '80%',
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingHorizontal: 8,
    marginVertical: 10,
    alignSelf: 'center',
  }
})