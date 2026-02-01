import { StyleSheet} from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
export const Styles = StyleSheet.create({
  container: {
    flex: 1,

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
    borderWidth:0.7,
    borderColor:'grey',
    borderRadius:10,
    alignSelf:'center',
    marginTop:5
  },
  colone:{
    flexDirection:'column'
  },
  titre:{
    paddingLeft:wp('3%'),
    paddingTop:hp('1%'),
    paddingBottom:hp('1%'),
    fontSize:12,
    color:'white'
  },
  description:{
    fontSize:10,
    paddingLeft:wp('3%'),
    color:'white'
  },
  fontgris:{
    backgroundColor:'#E3E5E4',
    borderRadius:10
  },
  Menuaction:{
    width:wp('10%'),
    position:'absolute',
    top:2,
    right:wp('3%')
  },
  listContainer:{
    height:hp('80%')
  },
  bold:{
    fontWeight:'bold'
  },
  action:{
    flexDirection:'row',
    width:wp('40%'),
    backgroundColor:'white',
    justifyContent:'space-around',
    height:hp('5.5%'),
    borderRadius:10,
    position:'absolute',
    top:0,
    right:wp('12%'),
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
      marginTop:hp('3%'),
      marginBottom:hp('1%'),
      marginLeft:wp('5%')
  },
  secondeTitle:{
    fontSize:12,
    marginLeft:wp('5%'),
    marginTop:hp('1%'),
    marginBottom:hp('0.5%'),
    opacity:0.5
    },
    editModale:{
    backgroundColor:'#F4F6FC',
    height:hp('50%'),
    width:wp('100%'),
    borderRadius:15,
    marginTop:hp('20%')}


});

export default Styles;
