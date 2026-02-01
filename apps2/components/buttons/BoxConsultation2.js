import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'; 
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'; 
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import I18n from 'react-native-i18n';
const click = "Expressions";
const BoxConsultation2 = ({ nb, label, iconName, iconsProvider, boxColor, before , click, goToList, create}) => {
  return (
    <View>
      {/* { click !== label ? 
      ( */}
        <TouchableOpacity style={styles.container} onPress={before}>
          <View style={[styles.box, { backgroundColor: boxColor }]}>
            {iconsProvider === 'ion' ? (
              <Icon name={iconName} color={'white'} size={25} />
            ) : (
              <MaterialIcons name={iconName} color={'white'} size={25} />
            )}
          {/* <Text style={styles.label}>{label}</Text> */}
          </View>
          {/* <Text style={styles.number}>({nb})</Text> */}
        </TouchableOpacity>
      {/* ):( */}
        {/* <View style={styles.act}>
          <TouchableOpacity style={[styles.container, {width: wp('30%')}]} onPress={create} >
            <View style={[styles.box, { backgroundColor: 'white'}]}>
              {iconsProvider === 'ion' ? (
                <Icon name={"add"} color={boxColor} size={30} />
              ) : (
                <MaterialIcons name={"add"} color={boxColor} size={35} />
              )}
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.container, {width: wp('20%')}]} onPress={goToList} >
            <View style={[styles.box, { backgroundColor: boxColor, marginTop:0}]}>
              {iconsProvider === 'ion' ? (
                <Icon name={iconName} color={'white'} size={30} />
              ) : (
                <MaterialIcons name={iconName} color={'white'} size={35} />
              )}
            <Text style={styles.label}>{label}</Text>
            </View>
          </TouchableOpacity>
        </View> */}
      {/* )} */}
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
    width: wp('15%'),
    alignSelf: 'center',
    height: hp('5%'),
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
    // opacity: 0.7,
    fontSize: 14,
    color: 'white',
  },
  act:{
    flexDirection:'row',
    justifyContent:'center',
    alignItems:'center',
    // backgroundColor:'white',
    borderRadius:5,
    // marginLeft:wp('3%'),
    marginRight:wp('2.5%')
  }
});

export default BoxConsultation2;
