import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  KeyboardAvoidingView,
  BackHandler,
} from 'react-native';

import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/Ionicons';
import { Dropdown } from 'react-native-element-dropdown';

import I18n from 'react-native-i18n';
import en from '../../i18/en';
import fr from '../../i18/fr';
import es from '../../i18/es';

import LoginModals from '../components/modals/LoginModals';
import ArrowButton from '../components/buttons/ArroButton';
import CustomCheckBox from '../components/checkBox/CustomCheckBox';

import config from '../../config.json';
import { connect } from 'react-redux';
import { login, setUserInfo, getUser, storeUser } from '../actions/user';

import { fetchData } from '../actions/expressions';
import { fetchAudio } from '../actions/audio';
import { getCat } from '../actions/category';
import { getNbExp } from '../actions/dataStats';
import { getVideo } from '../actions/videos';
import { getImages } from '../actions/images';
import { setLangMyoedb } from '../actions/trandActions';
import { toggleMenu } from '../actions/utils';

import Spinner from 'react-native-spinkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      login: '',
      password: '',
      remebrer: false,
      itemValue: 'en',
      isLoading: false,
    };

    I18n.locale = 'en';
    I18n.fallbacks = true;
    I18n.translations = { en, fr, es };
  }

  toggleRemember = () => {
    this.setState(prev => ({ remebrer: !prev.remebrer }));
  };

  handleLangChange = (item) => {
    this.setState({ itemValue: item.value });
    I18n.locale = item.value;
    this.props.dispatchSetLangMyoedb(item.value);
  };

 connecter = async () => {
  this.setState({ isLoading: true });
  const { dispatchLogin, dispatchSetUserInfo } = this.props;
  const { login, password } = this.state;

  if (login && password) {
    dispatchLogin(login, password);
    const data_Token = await this.getToken(login, password);

    if (data_Token.authentification === true) {
      const GUSERID = data_Token.userdata.GUSERID;
      console.log("GUSERID: " + data_Token);

      const { remebrer } = this.state;
      const url = config.base_url + '/portail-stagiaire/index.php';
      
      try {
        const responseJson = await this.fetchWithTimeout(url, {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            id: data_Token.userdata.GUSERID
          })
        }, 10000); // Timeout set to 10 seconds

        console.log('USER-INFO: ', responseJson);
        dispatchSetUserInfo(responseJson);

        if (responseJson === 'null') {
          alert('Login ou mot de passe invalide');
          this.setState({ isLoading: false });
        } else {
          this.props.dispatchfetchData(responseJson.id)
            .then(() => this.props.getCat(responseJson.id_groupe))
            .then(() => this.props.getNbExp(responseJson.id, responseJson.id_groupe))
            .then(() => this.props.getVideo(responseJson.id))
            .then(() => this.props.dispatchfetchAudio(responseJson.id))
            .then(() => this.props.getImage(responseJson.id))
            .then(() => {
              this.props.toggleMenu();
              this.props.dispatchSetLangMyoedb(this.state.itemValue);
              const navigationParams = {
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
                trand: this.state.itemValue,
                type: responseJson.type,
              };

              if (remebrer === true) {
                console.log('INFORMATION STAGIAIRE À ENREGISTRER : ' + JSON.stringify(responseJson));
                this.props.storeUser(responseJson);
              }

              this.props.navigation.navigate('Accueil', navigationParams);
              this.setState({ isLoading: false });
            })
            .catch((error) => {
              console.error(error);
              this.setState({ isLoading: false });
            });
        }
      } catch (error) {
        if (error.message === 'Request timed out') {
          alert('Le serveur est saturé, veuillez réessayer ultérieurement.');
        } else {
          console.error(error);
        }
        this.setState({ isLoading: false });
      }
    } else {
      console.log("tsy lasa " + JSON.stringify(data_Token));
      this.setState({ isLoading: false });
    }
  } else {
    this.setState({ isLoading: false });
  }
}



  // renderLangItem = (item) => (
  //   <View style={styles.langItem}>
  //     <Image source={item.flag} style={styles.flag} />
  //     <Text style={styles.langLabel}>{item.label}</Text>
  //   </View>
  // );
  renderLangItem = (item) => {
  const isSelected = item.value === this.state.itemValue;
  return (
    <View style={[styles.langItem, isSelected ? styles.selectedItem : null]}>
      <Image source={item.flag} style={styles.flag} />
      <Text style={[styles.langLabel,{color:"white"}]}>{item.label}</Text>
    </View>
  );
};


  render() {
    if (this.state.isLoading) {
      return (
        <View style={{ marginTop: hp('40%') }}>
          <Spinner color="#2f3c7e" size={70} type="ThreeBounce" />
        </View>
      );
    }

    const LANGUAGES = [
      {
        label: 'Français',
        value: 'fr',
        flag: require('../image/drapeau-france.jpg'),
      },
      {
        label: 'English',
        value: 'en',
        flag: require('../image/GB.jpg'),
      },
      {
        label: 'Español',
        value: 'es',
        flag: require('../image/espagne.png'),
      },
    ];

    return (
      <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}>
        <View style={styles.container}>

          {/* LOGO */}
          <Image
            source={require('../image/logo-myoedb-04.png')}
            style={[styles.logo, {marginBottom:50}]}
          />

          {/* 🌍 DROPDOWN LANGUE */}
          <Dropdown
            style={[styles.dropdown, {marginBottom:50}]}
            containerStyle={styles.dropdownContainer}
            data={LANGUAGES}
            labelField="label"
            valueField="value"
            value={this.state.itemValue}
            onChange={this.handleLangChange}
            renderItem={this.renderLangItem}
            renderLeftIcon={() => {
              const selected = LANGUAGES.find(l => l.value === this.state.itemValue);
              return selected ? <Image source={selected.flag} style={styles.flag} /> : null;
            }}
            placeholder=""
            placeholderStyle={{ color: 'white' }}        // texte avant sélection
            selectedTextStyle={{ color: 'white', marginLeft:15 }} 
          />

          {/* LOGIN */}
          <View style={styles.inputBox}>
            <Icon name="person" size={20} color="#3498F0" />
            <TextInput
              style={styles.input}
              placeholder="Login"
              placeholderTextColor="#aaa"
              onChangeText={login => this.setState({ login })}
            />
          </View>

          {/* PASSWORD */}
          <View style={styles.inputBox}>
            <Icon name="lock-closed" size={20} color="#3498F0" />
            <TextInput
              style={styles.input}
              secureTextEntry
              placeholder="Password"
              placeholderTextColor="#aaa"
              onChangeText={password => this.setState({ password })}
            />
          </View>

          {/* ☑️ REMEMBER ME */}
          <View style={styles.rememberContainer}>
            <CustomCheckBox
              isChecked={this.state.remebrer}
              label={I18n.t('Remember me')}
              onToggle={this.toggleRemember}
            />
          </View>

          {/* ➡️ LOGIN */}
          <ArrowButton
            onPress={this.connecter}
            iconName="arrow-forward-outline"
          />

        </View>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#192356',
    alignItems: 'center',
    paddingTop: hp('8%'),
  },
  logo: {
    width: 200,
    height: 40,
    marginBottom: hp('4%'),
  },
  dropdown: {
    width: wp('60%'),
    height: 40,
    backgroundColor: '#313D6E',
    borderRadius: 25,
    paddingHorizontal: 12,
    marginBottom: hp('4%'),
    color: 'white',
  },
  // dropdownContainer: {
  //   backgroundColor: '#313D6E',
  //   borderRadius: 12,
  // },
  dropdownContainer: {
  backgroundColor: '#313D6E', // même couleur que le dropdown principal
  borderRadius: 12,
  paddingVertical: 0,
  color: 'white',
},

  langItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  langLabel: {
    color: 'white',
    marginLeft: 10,
  },
  flag: {
    width: 26,
    height: 18,
    borderRadius: 3,
  },
  inputBox: {
    flexDirection: 'row',
    alignItems: 'center',
    width: wp('80%'),
    height: hp('6.5%'),
    borderRadius: 30,
    borderWidth: 0.5,
    borderColor: '#303A77',
    paddingHorizontal: 20,
    marginBottom: hp('3%'),
  },
  input: {
    color: 'white',
    marginLeft: 10,
    width: '90%',
  },
  rememberContainer: {
    width: wp('80%'),
    marginTop: hp('2%'),
    marginBottom: hp('4%'),
    alignItems: 'center',
  },
  selectedItem: {
  // borderWidth: 1,
  color: 'white',
  borderColor: '#303A77', // couleur de la bordure
  // borderRadius: 8,
  backgroundColor: '#45509aff', // pas de fond blanc
},

});

const mapDispatchToProps = dispatch => ({
  dispatchSetLangMyoedb: value => dispatch(setLangMyoedb(value)),
});

export default connect(null, mapDispatchToProps)(Login);
