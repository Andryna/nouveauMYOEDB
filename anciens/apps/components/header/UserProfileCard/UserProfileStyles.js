// UserProfileStyles.js
import { StyleSheet } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignSelf: 'center',
    alignItems: 'center',
    height: hp('10.5%'),
    width: wp('90%'),
    marginBottom: -hp('1.5%'),
    backgroundColor: '#3498F0',
    borderRadius: 50,
    marginTop: hp('3%'),
  },
  profileContainer: {
    height: hp('4%'),
    width: wp('95%'),
    flexDirection: 'row',
  },
  profileImage: {
    position: 'absolute',
    left: wp('5%'),
    alignSelf: 'center',
    flexDirection: 'column',
  },
  image: {
    width: wp('18%'),
    height: hp('10%'),
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
  logoutButton: {
    flexDirection: 'row',
    position: 'absolute',
    right: wp('5%'),
    backgroundColor: '#020D4D',
    padding: 6,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
