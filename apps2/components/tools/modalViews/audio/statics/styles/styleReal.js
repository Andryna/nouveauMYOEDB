import { StyleSheet} from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

export const Real = StyleSheet.create({
buttonView:{
    width:wp('90%'),
    height:hp('6%'),
    borderRadius:20,
    backgroundColor:'white',
    borderColor:'#DC4F89',
    borderWidth:1,
    marginLeft:wp('5%'),
    marginTop:hp('3%'),
    marginBottom:hp('3%')

},
textreal:{
    textAlign:'center',
    alignSelf:'center',
    color:'#DC4F89',
    fontSize:hp('2.5'),
    fontWeight:'bold',
},
center:{
justifyContent:'center',
alignItems:'center',
}

}
);
export default Real;
