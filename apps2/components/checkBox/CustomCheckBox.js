import React from 'react';
import { TouchableOpacity, View, Text, Image, StyleSheet } from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const SIZE = 20;

const CustomCheckBox = ({ isChecked, label, onToggle }) => {
  return (
    <TouchableOpacity
      onPress={onToggle}
      style={styles.container}
      activeOpacity={0.8}
    >
      <View style={[styles.box, isChecked && styles.boxChecked]}>
        {isChecked && (
          <Image
            source={require('../../image/check.png')}
            style={styles.icon}
          />
        )}
      </View>

      <Text style={styles.label}>{label}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',   // 🔑 alignement vertical parfait
    marginTop: hp('3%'),
  },

  box: {
    width: SIZE,
    height: SIZE,
    borderWidth: 1,
    borderColor: '#fff',
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },

  boxChecked: {
    backgroundColor: '#fff',
  },

  icon: {
    width: 12,
    height: 12,
    tintColor: '#000',      // contraste propre
  },

  label: {
    marginLeft: 10,
    color: '#fff',
    fontSize: 13,
    lineHeight: SIZE,       // 🔑 alignement texte ↔ checkbox
    fontWeight: '600',
  },
});

export default CustomCheckBox;
