import { StyleSheet} from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

export const Styles = StyleSheet.create({
  container: {
    // flex: 1,
    height:hp('100%'),
    // backgroundColor:'red'

  },
  text: {
    fontSize: 30,
    color: 'white'
  },
  tableau:{
    // backgroundColor:'blue'
  },
  ligne:{
    width:wp('90%'),
    borderWidth:0.8,
    borderColor:'grey',
    borderRadius:10,
    alignSelf:'center',
    marginTop:5,
    
  },
  lignecat:{
    width:wp('90%'),
    // borderWidth:0.8,
    borderColor:'white',
    borderRadius:10,
    alignSelf:'center',
    marginTop:5,
    flexDirection:'row',
    justifyContent:'space-between',
    backgroundColor:'#2B4098'
    
  },
  colone:{
    flexDirection:'column'
  },
  titre:{
    paddingLeft:5,
    alignSelf:'center',
    // paddingTop:5,
    // paddingBottom:hp('1%'),
    fontSize:14,
    color:'white'
  },
  description:{
    fontSize:10,
    paddingLeft:wp('3%'),
    color:'white'
  },
  fontgris:{
    // backgroundColor:'#2B4098',
    borderRadius:10,
    justifyContent:'center',
    paddingLeft:10
  },
  Menuaction:{
    width:wp('10%'),
    position:'absolute',
    top:2,
    right:wp('3%')
  },
  listContainer:{
    height:hp('50%'),
    marginBottom:hp('1%')
  },
  bold:{
    fontWeight:'bold'
  },
  action:{
    flexDirection:'row',
    width:wp('20%'),
    // backgroundColor:'white',
    justifyContent:'space-around',
    height:hp('5.5%'),
    borderRadius:10,
    position:'absolute',
    top:0,
    right:0,
    alignItems:'center',
    borderColor:'grey',
    borderWidth:0.5,
    fontSize:12
  },
  image:{ 
    width:15,
    height:15,
    alignSelf:'center'
  },
  imagedelete:{
    width:9,
    height:15,
    alignSelf:'center'
  },
  titleView:{
      flexDirection:'row',
      marginTop:20,
      marginBottom:hp('1%'),
      marginLeft:wp('5%')
  },
  secondeTitle:{
    fontSize:14,
    marginLeft:wp('5%'),
    marginTop:hp('1%'),
    color:'white'
    // marginBottom:hp('0.5%'),
    // opacity:0.5
    },
    editModale:{
    backgroundColor:'#2B4098',
    // height:hp('60%'),
    width:wp('100%'),
    borderRadius:5,
    marginTop:hp('30%'),
    paddingBottom:30
  }


});

export default Styles;
