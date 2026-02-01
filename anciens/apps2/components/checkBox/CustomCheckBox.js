import React from 'react';
import { TouchableOpacity, View, Text, Image, StyleSheet } from 'react-native';
import {
  widthPercentageToDP as wp, 
  heightPercentageToDP as hp
} from 'react-native-responsive-screen';
const CustomCheckBox = ({ isChecked, label, onToggle }) => {
  return (
    <TouchableOpacity onPress={onToggle} style={styles.container}>
      <View style={styles.checkBox}>
        {isChecked ? (
          <Image style={styles.checkBoxIcon} source={require('../../image/check.png')} />
        ) : (
          <View style={styles.checkBoxOutline} />
        )}
      </View>
      <Text style={styles.label}>{label}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop:hp('3%')
  },
  checkBox: {
    width: 20,
    height: 20,
    borderWidth: 0.5,
    borderColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius:7
  },
  checkBoxIcon: {
    width: 12,
    height: 12,
  },
  checkBoxOutline: {
    width: 18,
    height: 18,
    borderWidth: 0.5,
    borderColor: 'white',
    borderRadius:7
  },
  label: {
    color: 'white',
    fontWeight: 'bold',
    marginLeft: 10,
    fontSize: 12,
  },
});

export default CustomCheckBox;
