import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'; 
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'; 
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import I18n from 'react-native-i18n';
const click = "Expressions";
const BoxConsultation = ({ nb, label, iconName, iconsProvider, boxColor, before , click, goToList, create}) => {
  return (
    <View>
        <View style={styles.container}>
          <View style={[styles.box, { backgroundColor: boxColor }]}/>
        </View>
    </View>
  );
};



const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    // backgroundColor: 'red',
    width: wp('18%'),
    alignSelf: 'center',
    marginBottom:hp('1.5%'),
    elevation:5
    // height: hp('15%')
  },
  box: {
    width: wp('14%'),
    alignSelf: 'center',
    height: hp('8%'),
    borderRadius: 10,
    alignItems: 'center',
    justifyContent:'center',
    elevation:5,
    top:0
  },
  number: {
    color: 'white',
    fontSize: 16,
    fontWeight: '400',
    textAlign:'center'
  },
  label: {

    marginTop: hp('1%'),
    textAlign:'center',
    fontSize: 12,
    color: 'white',
  },
  act:{
    flexDirection:'row',
    justifyContent:'center',
    alignItems:'center',
    borderRadius:5,
    marginRight:wp('2.5%')
  }
});

export default BoxConsultation;
