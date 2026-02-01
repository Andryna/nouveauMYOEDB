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

const ArrowButton = ({ onPress }) => {
  return (
    <View style={styles.buttonContainer}>
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          onPress(); 
        }}
      >
        <Icon name={"arrow-forward-outline"} size={35} color={'white'} style={styles.inputIcon} />
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
      height:hp('8%'),
      width: wp('15%'),
    },
    buttonContainer:{
      alignItems: 'center',
      justifyContent:'center',
      marginTop:hp('5%')
    }
  })
