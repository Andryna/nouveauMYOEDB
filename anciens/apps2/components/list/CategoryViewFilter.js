import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
} from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
// import Homelayout from '../../layouts/Homelayout';

const CategoryViewFilter = ({ id, intitule, index, idecat, pic,filterByCategory }) => {
  const handleFilter = () => {
    if (id !== '') {
      filterByCategory('');
    } else {
      filterByCategory(intitule);
    }
  };

  return (
    <TouchableOpacity onPress={handleFilter}>
      <View style={{
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#0C1D65',
        height: 35,
        borderWidth: intitule !== '' ? 0.5 : 0,
        paddingLeft: 15,
        paddingRight: 15,
        borderColor: '#5C4DB1',
        borderRadius: 15,
        justifyContent: 'center',
      }}>
        <Text style={{
          marginHorizontal: wp('3%'),
          marginVertical: hp('0.5%'),
          fontWeight: '400',
          fontSize: id !== '' ? 14 : 12,
          textAlign: 'center',
          color: id !== '' ? 'black' : 'white',
        }}>
          {intitule}
        </Text>
        {id !== '' && idecat === id && (
          <View style={{
            width: wp('4.5%'),
            height: hp('2.5%'),
            borderRadius: 30,
            position: 'absolute',
            right: 0,
            top: hp('-1%'),
          }}>
            <Image style={{
              width: wp('4.5%'),
              height: hp('2.5%'),
            }}
              source={require('../../image/Check-category.png')}>
            </Image>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
};

export default CategoryViewFilter;
