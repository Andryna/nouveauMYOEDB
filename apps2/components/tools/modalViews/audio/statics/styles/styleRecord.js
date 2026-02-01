import { StyleSheet} from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

export const Rec = StyleSheet.create({
container:
{
    flexDirection:'row',
    position:'absolute',
    alignSelf:'flex-end',
    height:hp('100%'),
    width:wp('100%'),
    backgroundColor:'grey',
    
},
buttonView:{
    width:wp('90%'),
    height:hp('6%'),
    borderRadius:20,
    backgroundColor:'#DC4F89',
    marginLeft:wp('5%'),
    marginTop:hp('3%')

},
CancelView:{
    width:wp('90%'),
    height:hp('6%'),
    borderRadius:20,
    marginLeft:wp('5%'),

},
textaudio:{
    textAlign:'center',
    alignSelf:'center',
    fontWeight:'bold',
    color:'white',
    fontSize:hp('2.5')
},
CancelText:{
    textAlign:'center',
    alignSelf:'center',
    fontWeight:'bold',
    color:'black',
    fontSize:hp('2.5')
},
center:{
justifyContent:'center',
alignItems:'center',
},
liste:{
    marginTop:hp('4%')
}

}
);
export default Rec;
