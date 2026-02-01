import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { styles } from './UserProfileStyles';
import { connect } from 'react-redux';
import { removeUser } from '../../../actions/user';
import Svg, {Path} from 'react-native-svg';
const UserProfileCard2 = ({ userInfo,login, removeUser, navigation }) => (
  <View style={styles.container}>
    <View style={styles.profileContainer}>
      <View style={styles.logoImage2}>
        <Image
          style={styles.imageMYOEDB}
          source={require('../../../image2/logo-sm.png')}
        />
      </View>
      <View style={styles.profileImage}>
        <Image
          style={styles.image}
          source={require('../../../image2/profil.jpg')}
        />
      </View>
      <Text style={styles.loginInfo}>
        {login}
      </Text>
      
      <TouchableOpacity
        onPress={() => {
          removeUser();
          navigation.navigate('Login');
        }}
        style={styles.logoutButton1}
      >
        <View>
            <Svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style="fill: rgba(0, 0, 0, 1);transform: ;msFilter:;">
                <Path d="M16 13v-2H7V8l-5 4 5 4v-3z" fill="#FFF" ></Path><Path d="M20 3h-9c-1.103 0-2 .897-2 2v4h2V5h9v14h-9v-4H9v4c0 1.103.897 2 2 2h9c1.103 0 2-.897 2-2V5c0-1.103-.897-2-2-2z" fill="#FFF" >
                </Path>
            </Svg>
          {/* <Icon name="log-out-outline" size={30} color="white" /> */}
        </View>
      </TouchableOpacity>
    </View>
  </View>
);

const mapStateToProps = (state) => ({
  userInfo: state.auth.userInfo,
});

const mapDispatchToProps = (dispatch) => ({
  removeUser: () => dispatch(removeUser()),
});

export default connect(mapStateToProps, mapDispatchToProps)(UserProfileCard2);
