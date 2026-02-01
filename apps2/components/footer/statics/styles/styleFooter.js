import { StyleSheet} from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

export const styleFooter = StyleSheet.create({
container:
{
    flexDirection:'row',
    position:'absolute',
    bottom:0,
    opacity:1,
    // marginTop:hp('5%'),
    // alignSelf:'flex-end',
    // height:45,
    width:wp('100%'),
    paddingHorizontal:wp('5%'),
    backgroundColor:'transparent',
    justifyContent:'space-around',
    alignItems:'center',
    alignSelf:'center',
    paddingBottom:20,
    backgroundColor:'#192356',
    // paddingBottom:15,
    paddingTop:10
    // borderRadius:20
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