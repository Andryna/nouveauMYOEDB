import { StyleSheet} from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

export const Add = StyleSheet.create({
container:
{
    flexDirection:'row',
    alignSelf:'flex-end',
    height:hp('100%'),
    width:wp('100%'),
    backgroundColor:'grey',
    
},
modalView:{
  backgroundColor:'#F4F6FC',
  height:hp('25%'),
  width:wp('100%'),
  position:'absolute',
  
  // borderRadius:15,
  marginTop:hp('15%')
},
titleContainer:{
  flexDirection:'row',
  marginTop:hp('3%'),
  marginBottom:hp('1%'),
  marginLeft:wp('5%')
},
line:{
  borderWidth:1,
  width:wp('9%'),
  borderColor:'#DC4F89'
},
title1:{
  color:'#5C4DB1',
  fontSize:hp('2.8%')
},
title2:{
  color:'#5C4DB1',
  fontWeight:'bold',
  marginLeft:wp('1%'),
  fontSize:hp('2.8%')
},
litleTitle:{
  fontSize:hp('2%'),
  marginLeft:wp('5%'),
  // marginTop:hp('2%'),
  opacity:0.5
},
textReal:{
color:'#DC4F89',
fontSize:12,
fontWeight:'bold'
},
textRec:{
  color:'white',
  fontSize:12,
  fontWeight:'bold'
  },
column:{
  flexDirection:'column'
},
imageIcon:{
    width:wp('6.8%'),
    height:hp('3.8%'),
  },
imagePlus:{
    width:wp('7%'),
    height:hp('6%'),
  },
  rec:{marginLeft:wp('5%'),
  width:wp('90%'),
   height:hp('5%'),
   backgroundColor:'#DC4F89',
   borderRadius:30,alignItems:'center',
   marginTop:hp('2%'),
   justifyContent:'center'},
   real:{
     marginLeft:wp('5%'),
     width:wp('90%'),
     height:hp('5%'),
     backgroundColor:'white',
     borderRadius:30,
     borderColor:'#DC4F89',
     alignItems:'center',
     borderWidth:0.5,
     marginTop:hp('2%'),
     justifyContent:'center'
   }

}
);
export default Add;
