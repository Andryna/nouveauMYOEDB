import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import Icon from 'react-native-vector-icons/Ionicons';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const EditActionButton = ({ onAccept, onDecline }) => {
  return (
    <View
      style={{
        width: wp('22%'),
        // height: 60,
        alignItems: 'center',
        justifyContent: 'space-around',
        borderRadius: 5,
        flexDirection: 'row',
        paddingRight: 5,
      }}
    >
      <TouchableOpacity
        style={{
          padding: 6,
          backgroundColor: '#192356',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 10,
          opacity: 0.5,
          marginRight: 5,
        }}
        onPress={onAccept}
      >
        <Icon name={'checkmark-circle'} size={23} color={'white'} style={{ alignSelf: 'center' }} />
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          padding: 5,
          backgroundColor: '#192356',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 10,
          opacity: 0.5,
        }}
        onPress={onDecline}
      >
        <Icon name={'close-circle'} size={23} color={'white'} style={{ alignSelf: 'center' }} />
      </TouchableOpacity>
    </View>
  );
};

export default EditActionButton;
