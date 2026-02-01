// UserProfileStyles.js
import { StyleSheet } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    height: 60,
    width: wp('100%'),
    backgroundColor: '#192356',
    alignItems:'center',
    // backgroundColor: 'green',
  },
  profileContainer: {
    // height: hp('4%'),
    width: wp('100%'),
    flexDirection: 'row',
    // backgroundColor:'green',
    padding:5
  },
  profileImage: {
    position: 'absolute',
    right: 10,
    alignSelf: 'center',
    // justifyContent:'center',
    // padding:10,
    // backgroundColor:'white',
    flexDirection: 'column',
  },
  logoImage:{
    position: 'absolute',
    left: 10,
    alignSelf: 'center',
    flexDirection: 'column',
  },
  logoImage:{
    position: 'absolute',
    left: wp('15%'),
    alignSelf: 'center',
    flexDirection: 'column',
  },
  logoImage2:{
    position: 'absolute',
    left: 5,
    alignSelf: 'center',
    flexDirection: 'column',
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 50,
  },
  imageMYOEDB: {
    width: 100,
    height: 20,
    borderRadius: 50,
  },
  userInfo: {
    flexDirection: 'column',
    marginLeft: wp('25%'),
  },
  username: {
    marginLeft: wp('2%'),
    fontSize: 16,
    fontWeight: '400',
    color: 'white',
  },
  companyName: {
    marginLeft: wp('2%'),
    fontSize: 14,
    color: 'white',
  },
  logoutButton1: {
    // flexDirection: 'row',
    position: 'absolute',
    right: 80,
    // backgroundColor: '#020D4D',
    // padding: 6,
    // borderRadius: 50,
    // justifyContent: 'center',
    // alignItems: 'center',
    alignSelf:'center'
  },
  logoutButton: {
    // flexDirection: 'row',
    position: 'absolute',
    left: 5,
    // backgroundColor: '#020D4D',
    // padding: 6,
    // borderRadius: 50,
    // justifyContent: 'center',
    // alignItems: 'center',
    alignSelf:'center'
  },
  loginInfo:{
    fontFamily: 'Arial',
    color:'white',
    position:'absolute',
    right:120,
    alignSelf:'center'
  }
});
