import React, { Component } from 'react';
import {
  ImageBackground,
  StyleSheet,
  View,
  Image,
  StatusBar,
  Text,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import * as Progress from 'react-native-progress';
import { ProgressBar, MD3Colors } from 'react-native-paper'
import { connect } from 'react-redux';

import { login, setUserInfo, getUser, storeUser, removeUser } from '../actions/user';
import { fetchData } from '../actions/expressions';
import { fetchAudio } from '../actions/audio';
import { getCat } from '../actions/category';
import { getNbExp } from '../actions/dataStats';
import { getVideo } from '../actions/videos';
import { getImages } from '../actions/images';
import { toggleMenu } from '../actions/utils';

class Dem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      progress: 0,
      isLoading: true, // écran de chargement au départ
    };
  }

  componentDidMount() {
    this.startProgress();
    this.initUser();
  }

  componentWillUnmount() {
    if (this.progressInterval) {
      clearInterval(this.progressInterval);
    }
  }

  startProgress = () => {
    let progress = 0;
    this.setState({ progress });

    this.progressInterval = setInterval(() => {
      progress += Math.random() / 5;
      if (progress > 1) progress = 0;
      this.setState({ progress });
    }, 400);
  };

  initUser = async () => {
    try {
      const responseJson = await this.props.getUser();
console.log("Retrieved user data in Dem:", responseJson);
      // Vérification si utilisateur vide / null / undefined
      if (!responseJson || Object.keys(responseJson).length === 0) {
        console.log('No user found, redirecting to Login.');
        this.props.navigation.replace('Login');
        return;
      }

      // utilisateur existant → récupération des données
      this.setState({ isLoading: true });

      await this.props.dispatchfetchData(responseJson.id);
      await this.props.getCat(responseJson.id_groupe);
      await this.props.getNbExp(responseJson.id, responseJson.id_groupe);
      await this.props.dispatchSetUserInfo(responseJson);
      await this.props.getVideo(responseJson.id);
      await this.props.dispatchfetchAudio(responseJson.id);
      await this.props.getImage(responseJson.id);

      this.setState({ isLoading: false });

      this.props.navigation.replace('Accueil', {
        user: responseJson,
        login1: responseJson.login,
        nom1: responseJson.nom,
        prenom1: responseJson.prenom,
        email1: responseJson.email,
        tel1: responseJson.tel,
        adresse1: responseJson.adresse,
        cp1: responseJson.cp,
        ville1: responseJson.ville,
        password1: responseJson.password,
        id1: responseJson.id,
        id_groupe: responseJson.id_groupe,
        type: responseJson.type,
      });

    } catch (error) {
      console.error(error);
      this.props.navigation.replace('Login');
    }
  };

  render() {
    // const { userInfo } = this.props.user;
    const { isLoading, progress } = this.state;
    // écran de chargement si isLoading
    return(
  <View
  source={require('../image2/bg.png')} // Spécifiez ici le chemin de votre image de fond
  style={styles.container}
  >
            
            <View style={styles.centeredTitle}>
            <Image style={styles.myoedb}
             source={require('../image/logo-myoedb-04.png')}>
           </Image>
            </View>
            <View style={styles.centeredCapter}>
              <Image style={styles.allCaptation}
                source={require('../image2/video.png')}>
              </Image>
              <Image style={styles.allCaptation}
                source={require('../image2/expression.png')}>
              </Image>
              <Image style={styles.allCaptation}
                source={require('../image2/image.png')}>
              </Image>
              <Image style={styles.allCaptation}
                source={require('../image2/audio.png')}>
              </Image>
            </View>
            <View style={styles.progressBar}>
              <Progress.Bar progress={this.state.progress} width={250}  color="#DC4F89"/>
            </View>
</View>  
);
}
}
      

const mapStateToProps = (state) => ({
  user: state.user,
});

const mapDispatchToProps = (dispatch) => ({
  dispatchLogin: (username, password) => dispatch(login(username, password)),
  dispatchSetUserInfo: (userInfo) => dispatch(setUserInfo(userInfo)),
  dispatchfetchData: (id) => dispatch(fetchData(id)),
  dispatchfetchAudio: (id) => dispatch(fetchAudio(id)),
  getCat: (id_groupe) => dispatch(getCat(id_groupe)),
  getNbExp: (id, id_groupe) => dispatch(getNbExp(id, id_groupe)),
  getVideo: (id) => dispatch(getVideo(id)),
  getImage: (id) => dispatch(getImages(id)),
  toggleMenu: () => dispatch(toggleMenu()),
  getUser: () => dispatch(getUser()),
  storeUser: (userData) => dispatch(storeUser(userData)),
  removeUser: () => dispatch(removeUser()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Dem);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: wp('100%'),
    height: hp('100%'),
    backgroundColor: '#192356',
    alignItems: 'center',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#192356',
    // backgroundColor: 'white',
  },
  centeredTitle: {
    position: 'absolute',
    top: hp('20%'),
  },
  centeredCapter: {
    width: wp('80%'),
    position: 'absolute',
    top: hp('57%'),
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  progressBar:{
    position:"absolute",
    bottom:30

  },
  myoedb: {
    width: wp('75%'),
    height: hp('10%'),
  },
  allCaptation: {
    width: 44,
    height: 45,
  },
});
