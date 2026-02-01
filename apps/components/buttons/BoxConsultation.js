import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'; 
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'; 
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import I18n from 'react-native-i18n';
const click = "Expressions";
const BoxConsultation = ({ nb, label, iconName, iconsProvider, boxColor, loadList }) => {
  return (
    <View>
      { click === label ? 
      (
        <TouchableOpacity style={styles.container} onPress={loadList}>
          <View style={[styles.box, { backgroundColor: boxColor }]}>
            {iconsProvider === 'ion' ? (
              <Icon name={iconName} color={'white'} size={30} />
            ) : (
              <MaterialIcons name={iconName} color={'white'} size={35} />
            )}
          </View>
          {/* <Text style={styles.label}>{label}</Text>
          <Text style={styles.number}>({nb})</Text> */}
        </TouchableOpacity>
      ):(
        <TouchableOpacity style={[styles.container, {}]} onPress={loadList}>
          <View style={[styles.box, { backgroundColor: boxColor }]}>
            {iconsProvider === 'ion' ? (
              <Icon name={iconName} color={'white'} size={30} />
            ) : (
              <MaterialIcons name={iconName} color={'white'} size={35} />
            )}
          </View>
          {/* <Text style={styles.label}>{label}</Text>
          <Text style={styles.number}>({nb})</Text> */}
        </TouchableOpacity>
      )}
    </View>
  );
};



const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    // backgroundColor: 'red',
    width: wp('20%'),
    alignSelf: 'center',
    marginBottom:hp('3%'),
    elevation:5
    // height: hp('15%')
  },
  box: {
    width: wp('15%'),
    alignSelf: 'center',
    height: hp('8%'),
    borderRadius: 10,
    alignItems: 'center',
    justifyContent:'center',
    elevation:5
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

export default BoxConsultation;
