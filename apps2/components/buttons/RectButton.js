import React from 'react';
import { TouchableOpacity, View, Text } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/Ionicons';

const RectButton = ({ onPress, text, backgroundColor, radius, iconName, iconColor }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={{
        backgroundColor: backgroundColor || '#EA1E69',
        width: wp('40%'),
        paddingLeft: 10,
        paddingRight: 10,
        height: 40,
        alignSelf: 'center',
        marginTop: hp('2%'),
        borderRadius: radius || 5,
        justifyContent: 'center',
        flexDirection:'row',
        alignItems:'center'
      }}>
        {iconName?(<Icon name={iconName} size={20} color={iconColor || '#2B4098'} style={{
              alignSelf: 'center',
              marginRight: 5
            }} 
        />):null}
        <Text style={{ color: 'white', textAlign: 'center', fontSize: 14 }}>
          {text || 'Enregistrer'}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default RectButton;
