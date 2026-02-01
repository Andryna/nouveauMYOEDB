import React from 'react';
import { TouchableHighlight, Text, StyleSheet } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const TimeFilterButton = ({ onPress, isActive, label }) => (
  <TouchableHighlight
    onPress={onPress}
    style={[
      styles.button
    ]}
  >
    <Text
      style={[
        styles.buttonText
      ]}
    >
      {label}
    </Text>
  </TouchableHighlight>
);

const styles = StyleSheet.create({
  button: {
    borderRadius:15,
    paddingLeft:10,
    paddingRight:10,
    justifyContent:'center',
    height:35,
    marginLeft:wp('2.5%'),
    backgroundColor:'#0C1D65'
  },
  buttonText: {
    fontSize: hp('1.8%'),
    color:'grey',
    fontWeight: '100',

  },
});

export default TimeFilterButton;
