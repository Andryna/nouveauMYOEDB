import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'; 
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'; 
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import I18n from 'react-native-i18n';

const JitsiButton = ({ label, loadItsi }) => {
  return (
    <TouchableOpacity style={styles.container} onPress={loadItsi}>
        <Image  style={[styles.box]}
                source={require('../../image2/jitsi.png')}>
        </Image>
        <Text style={styles.label}>{label}</Text>
    </TouchableOpacity>
  );
};



const styles = StyleSheet.create({
  container: {
    alignSelf:'center',
    flexDirection: 'row',
    backgroundColor: '#2B4098',
    width: wp('24%'),
    alignSelf: 'center',
    justifyContent:'center',
    height: hp('4%'),
    padding:7,
    borderRadius:20,
    // position:'absolute',
    // bottom:0,
    elevation:5
  },
  box: {
    width: 35,
    alignSelf: 'center',
    height:25,
    borderRadius: 50,
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
    marginLeft: wp('1%'),
    textAlign:'center',
    // opacity: 0.7,
    fontSize: 14,
    color: 'white',
  },
});

export default JitsiButton;
