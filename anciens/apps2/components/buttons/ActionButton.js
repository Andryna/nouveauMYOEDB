import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import Icon from 'react-native-vector-icons/Ionicons';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';


const ActionButton = ({ onEdit, onDelete }) => {
  return (
    <View
      style={{
        width: wp('30%'),
        // height: 60,
        alignItems: 'center',
        justifyContent: 'space-around',
        borderRadius: 5,
        flexDirection: 'row',
        // backgroundColor:'green'
        // paddingRight: 5,
      }}
    >
      {/* <TouchableOpacity
        style={{
          padding: 5,
          backgroundColor: '#0d65ff',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 30,
          // marginRight:15
        }}
        onPress={onEdit}
      >
        <Icon name={'volume-high-sharp'} size={20} color={'white'} />
      </TouchableOpacity> */}
      <TouchableOpacity
        style={{
          padding: 4,
          backgroundColor: '#E29815',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 30,
          opacity: 1,
          // marginRight: 15,
        }}
        onPress={onEdit}
      >
        <Svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="rgba(0, 0, 0, 1)"
        >
          <Path
            d="M19.045 7.401c.378-.378.586-.88.586-1.414s-.208-1.036-.586-1.414l-1.586-1.586c-.378-.378-.88-.586-1.414-.586s-1.036.208-1.413.585L4 13.585V18h4.413L19.045 7.401zm-3-3 1.587 1.585-1.59 1.584-1.586-1.585 1.589-1.584zM6 16v-1.585l7.04-7.018 1.586 1.586L7.587 16H6zm-2 4h16v2H4z"
            fill="#fff"
          />
        </Svg>
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          padding: 5,
          backgroundColor: 'red',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 30,
        }}
        onPress={onDelete}
      >
        <Icon name={'trash-sharp'} size={20} color={'white'} />
      </TouchableOpacity>
    </View>
  );
};

export default ActionButton;