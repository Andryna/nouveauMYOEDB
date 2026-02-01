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
  },
  profileContainer: {
    width: wp('100%'),
    flexDirection: 'row',
    padding:5
  },
  profileImage: {
    position: 'absolute',
    right: 10,
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
    position: 'absolute',
    right: 80,
    alignSelf:'center'
  },
  logoutButton: {
    position: 'absolute',
    left: 5,
    alignSelf:'center'
  },
  loginInfo:{
    fontFamily: 'Arial',
    color:'white',
    position:'absolute',
    right:120,
    alignSelf:'center'
  },

  // Nouveau style pour le bouton flottant “bouée”
  floatingButton: {
    position: 'absolute',
    bottom: 30,
    right: 20,
    backgroundColor: '#2196F3',
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,              // ombre Android
    shadowColor: '#000',       // ombre iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
  incidentButton: {
  position: 'absolute',
  right: 180, // ajuster selon la distance par rapport à logoutButton1
  alignSelf: 'center',
},

});

