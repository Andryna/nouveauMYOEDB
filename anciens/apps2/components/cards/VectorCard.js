import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'; 
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'; 
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import I18n from 'react-native-i18n';
const click = "Expressions";
const VectorCard = ({ nb, label, iconName, iconsProvider, boxColor, loadList , click, goToList, create}) => {
  return (
    <View>
        <TouchableOpacity style={styles.container} onPress={loadList}>
          <View style={[styles.box, { backgroundColor: boxColor }]}>
            {iconsProvider === 'ion' ? (
              <Icon name={iconName} color={'white'} size={80} />
            ) : (
              <MaterialIcons name={iconName} color={'white'} size={80} />
            )}
          <Text style={styles.label}>{label}</Text>
          </View>
          {/* <Text style={styles.number}>({nb})</Text> */}
        </TouchableOpacity>
    </View>
  );
};



const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    // backgroundColor: 'red',
    width: wp('25%'),
    alignSelf: 'center',
    marginBottom:hp('10%'),
    // elevation:5
    // height: hp('15%')
  },
  box: {
    width: wp('22%'),
    alignSelf: 'center',
    height: hp('12%'),
    borderRadius: 10,
    alignItems: 'center',
    justifyContent:'center',
    top:0
  },
  number: {
    color: 'white',
    fontSize: 18,
    fontWeight: '400',
    textAlign:'center'
  },
  label: {

    marginTop: hp('1%'),
    textAlign:'center',
    // opacity: 0.7,
    fontSize: 16,
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

export default VectorCard;
