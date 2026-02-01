import { StyleSheet} from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

export const styleFooter = StyleSheet.create({
container:
{
    flexDirection:'row',
    position:'absolute',
    bottom:5,
    opacity:0.5,
    // marginTop:hp('5%'),
    // alignSelf:'flex-end',
    height:hp('6%'),
    width:wp('70%'),
    backgroundColor:'#2B4098',
    justifyContent:'space-around',
    alignItems:'center',
    alignSelf:'center',
    borderRadius:20
},
imageIcon:{
    width:25,
    height:25,
  },
imagePlus:{
    width:25,
    height:30,
  },
  imagejitsi:{
    width:25,
    height:25,
  }

}
);
export default styleFooter;