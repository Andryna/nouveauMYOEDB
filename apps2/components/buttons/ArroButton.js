import React from 'react';
import { 
    View, 
    TouchableOpacity, 
    StyleSheet
} from 'react-native';
import {
    widthPercentageToDP as wp, 
    heightPercentageToDP as hp
} from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/Ionicons';

const ArrowButton = ({ onPress, colorback, color }) => {
  const buttonStyle = {
    ...styles.button,
    backgroundColor: colorback || '#EA1E69', // Si color est défini, utilisez-le, sinon utilisez le rouge
  };
  const iconStyle = {
    ...styles.inputIcon,
    color: color || 'white', // Si color est défini, utilisez-le, sinon utilisez le rouge
  };
  return (
    <View style={styles.buttonContainer}>
      <TouchableOpacity
        style={buttonStyle}
        onPress={() => {
          onPress(); 
        }}
      >
        <Icon name={"arrow-forward-outline"} size={35} color={'white'} style={iconStyle} />
      </TouchableOpacity>
    </View>
  );
};

export default ArrowButton;


const styles=StyleSheet.create({
    button:{
      borderRadius:50,
      backgroundColor:'#EA1E69',
      color:'white',
      justifyContent:'center',
      alignItems:'center',
      height:50,
      width: 50,
    },
    buttonContainer:{
      alignItems: 'center',
      justifyContent:'center',
      marginTop:hp('5%')
    }
  })
