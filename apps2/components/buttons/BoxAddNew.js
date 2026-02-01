import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'; 
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'; 
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import I18n from 'react-native-i18n';

const BoxAddNew = ({ nb, label, iconName, iconsProvider, boxColor, loadList }) => {
  return (
    <TouchableOpacity style={styles.container} onPress={loadList}>
      <View style={[styles.box, { backgroundColor: boxColor }]}>
        {iconsProvider === 'ion' ? (
          <Icon name={iconName} color={'white'} size={30} />
        ) : (
          <MaterialIcons name={iconName} color={'white'} size={35} />
        )}
      <Text style={styles.label}>{label}</Text>
      </View>
    </TouchableOpacity>
  );
};



const styles = StyleSheet.create({
  container: {
    marginLeft:5,
    marginRight:5,
    flexDirection: 'column',
    marginTop:10,
    // backgroundColor: 'red',
    width: 80,
    alignSelf: 'center',
    height: 80
  },
  box: {
    width: 80,
    alignSelf: 'center',
    height: 80,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent:'center'
  },
  number: {
    color: 'white',
    fontSize: 16,
    fontWeight: '400',
    textAlign:'center'
  },
  label: {
    // marginLeft: wp('1%'),
    marginTop: hp('1%'),
    textAlign:'center',
    // opacity: 0.7,
    fontSize: 14,
    color: 'white',
  },
});

export default BoxAddNew;
