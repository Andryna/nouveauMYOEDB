import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'; 
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'; 
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const BoxStats = ({ nb1, label, iconName, iconsProvider, boxColor, before, onClick, goToList, create }) => {
  return (
    <View>
      <TouchableOpacity
        style={styles.container}
        onPress={() => {
          if (before) before(); // Appel de la fonction "before" si elle est définie
          if (onClick) onClick(); // Appel de la fonction "onClick" si elle est définie
        }}
      >
        <View style={[styles.box, { backgroundColor: boxColor }]}>
          {nb1 !== null ? (
            <Text style={styles.number}>{nb1}</Text>
          ) : (
            <View>
              {iconsProvider === 'ion' ? (
                <Icon name={iconName} color={'white'} size={20} />
              ) : (
                <MaterialIcons name={iconName} color={'white'} size={20} />
              )}
            </View>
          )}
          <Text style={styles.label}>{label}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    width: wp('18%'),
    alignSelf: 'center',
    marginBottom: hp('1.5%'),
    elevation: 5,
  },
  box: {
    width: wp('18%'),
    alignSelf: 'center',
    height: hp('10%'),
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5,
    top: 0,
  },
  number: {
    color: 'white',
    fontSize: 14,
    fontWeight: '400',
    textAlign: 'center',
  },
  label: {
    marginTop: hp('1%'),
    textAlign: 'center',
    fontSize: 12,
    color: 'white',
  },
});

export default BoxStats;
