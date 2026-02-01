import React from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  Image,
  KeyboardAvoidingView,
  BackHandler,
  Platform
} from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/Ionicons';
import { Dropdown } from 'react-native-element-dropdown';
import I18n from 'react-native-i18n';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import Spinner from 'react-native-spinkit';

import en from '../../i18/en';
import fr from '../../i18/fr';
import es from '../../i18/es';

import ArrowButton from '../components/buttons/ArroButton';
import CustomCheckBox from '../components/checkBox/CustomCheckBox';
import config from '../../config.json';
// import jwt_decode from 'jwt-decode';
import { jwtDecode } from "jwt-decode";

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

const platform = Platform.OS;  // 'ios' ou 'android'
const version = Platform.Version;
const baseUrlTracking = config.elearning_pre_Prod;
class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      login: '',
      password: '',
      remember: false,
      itemValue: 'en',
      isLoading: false,
    };

    I18n.locale = 'en';
    I18n.fallbacks = true;
    I18n.translations = { en, fr, es };
  }

  async componentDidMount() {
    this.backHandler = BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
    await AsyncStorage.removeItem('data_Token');
    this.checkStoredUser();
  }

  componentWillUnmount() {
    this.backHandler && this.backHandler.remove();
  }

  handleBackPress = () => true;

  checkStoredUser = async () => {
    try {
      const data_Token = await AsyncStorage.getItem('data_Token');
      if (data_Token) {
        const userData = JSON.parse(data_Token);
        this.autoLogin(userData);
      }
    } catch (error) {
      console.log('Erreur checkStoredUser:', error);
    }
  };

  autoLogin = async (userData) => {
    this.setState({ isLoading: true });
    console.log("autoLogin called with userData:", userData);
    try {
      await this.loadUserData(userData.tokenMemberId);
      this.setState({ isLoading: false });
    } catch (error) {
      console.error(error);
      this.setState({ isLoading: false });
    }
  };

  getToken = async (login, password) => {
    try {
      const response = await axios.post(
        `${config.base_url}/portail-stagiaire/auth.php`,
        { login, password },
        { timeout: 10000 }
      );
      const data = response.data;
      if (data.authentification) {
        await AsyncStorage.setItem('data_Token', JSON.stringify(data));
        return data;
      } else {
        alert(data.message || 'Login invalide');
        return null;
      }
    } catch (error) {
      if (error.code === 'ECONNABORTED') {
        alert('Le serveur est saturé, veuillez réessayer ultérieurement.');
      } else {
        console.error(error);
      }
      return null;
    }
  };
  getToken2 = async (login, password) => {
    console.log("getToken2 called");
    const urlEncodedData = new URLSearchParams();
    urlEncodedData.append('login', login);
    urlEncodedData.append('password', password);
    urlEncodedData.append('plateform', `${platform} version ${version}`);
    // urlEncodedData.append('plateform', 'android vers 16');
    urlEncodedData.append('ip_adress', '127.0.0.1');
    console.log("URL Encoded Plateform:", `${platform} vers ${version}`);
    try {
      const response = await axios.post(
        baseUrlTracking + '/api-el-login-form',
        urlEncodedData.toString(),
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          timeout: 10000,
        }
      );

      const data = response.data;
      console.log("Response data:", data);
      if (data.Token) {
        // Sauvegarde le token dans AsyncStorage
        
        // Décoder le token avec jwt-decode
        const decodedToken = jwtDecode(data.Token);
        console.log('Token décodé:', decodedToken);

        await AsyncStorage.setItem('data_Token', JSON.stringify(decodedToken));
        // Maintenant tu peux accéder aux informations dans le payload
        // Par exemple, si le token contient un "userId", tu peux le récupérer ainsi :
        const userId = decodedToken.tokenMemberId; // Remplace 'userId' par la clé appropriée
        console.log('User ID:', userId);

        return decodedToken; // Retourner le token
      } else {
        alert(data.error || 'Erreur d\'authentification');
        return null;
      }
    } catch (error) {
      if (error.code === 'ECONNABORTED') {
        alert('Le serveur est saturé, veuillez réessayer ultérieurement.');
      } else {
        console.error('Erreur de requête :', error);
        alert('Une erreur est survenue lors de la connexion.');
      }
      return null;
    }
  };



  loadUserData = async (GUSERID) => {
    const url = `${config.base_url}/portail-stagiaire/index.php`;
    console.log("loadUserData called with GUSERID:", GUSERID);
    const response = await this.fetchWithTimeout(url, {
      method: 'POST',
      headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: GUSERID }),
    });

    if (!response || response === 'null') {
      alert('Login ou mot de passe invalide');
      return;
    }

    const user = response;
    this.props.dispatchSetUserInfo(user);

    // Récupération des données liées
    await this.props.dispatchfetchData(user.id);
    await this.props.getCat(user.id_groupe);
    await this.props.getNbExp(user.id, user.id_groupe);
    await this.props.getVideo(user.id);
    await this.props.dispatchfetchAudio(user.id);
    await this.props.getImage(user.id);

    this.props.toggleMenu();
    this.props.dispatchSetLangMyoedb(this.state.itemValue);

    if (this.state.remember) this.props.storeUser(user);

    this.props.navigation.replace('Accueil', {
      user,
      login1: user.login,
      nom1: user.nom,
      prenom1: user.prenom,
      email1: user.email,
      tel1: user.tel,
      adresse1: user.adresse,
      cp1: user.cp,
      ville1: user.ville,
      password1: user.password,
      id1: user.id,
      id_groupe: user.id_groupe,
      trand: this.state.itemValue,
      type: user.type,
    });
  };

  fetchWithTimeout = (url, options, timeout = 10000) =>
    Promise.race([
      fetch(url, options).then((res) => res.json()),
      new Promise((_, reject) => setTimeout(() => reject(new Error('Request timed out')), timeout)),
    ]);

  connecter = async () => {
    const { login, password } = this.state;
    if (!login || !password) return;

    this.setState({ isLoading: true });
    const data_Token = await this.getToken2(login, password);
    console.log("data_Token:", data_Token);
    console.log("data_Token.userdata.GUSERID:", data_Token ? data_Token.tokenMemberId : "data_Token is null");
    if (data_Token) await this.loadUserData(data_Token.tokenMemberId);
    this.setState({ isLoading: false });
  };

  toggleRemember = () => this.setState((prev) => ({ remember: !prev.remember }));

  handleLangChange = (item) => {
    this.setState({ itemValue: item.value });
    I18n.locale = item.value;
    this.props.dispatchSetLangMyoedb(item.value);
  };

  renderLangItem = (item) => {
    const isSelected = item.value === this.state.itemValue;
    return (
      <View style={[styles.langItem, isSelected ? styles.selectedItem : null]}>
        <Image source={item.flag} style={styles.flag} />
        <View style={{ marginLeft: 10 }}>
          <Text style={{ color: 'white' }}>{item.label}</Text>
        </View>
      </View>
    );
  };

  render() {
    if (this.state.isLoading) {
      return (
        <View style={{ marginTop: hp('40%'), alignSelf: 'center' }}>
          <Spinner color="#2f3c7e" size={70} type="ThreeBounce" />
        </View>
      );
    }

    const LANGUAGES = [
      { label: 'Français', value: 'fr', flag: require('../image/drapeau-france.jpg') },
      { label: 'English', value: 'en', flag: require('../image/GB.jpg') },
      { label: 'Español', value: 'es', flag: require('../image/espagne.png') },
    ];

    return (
      <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}>
        <View style={styles.container}>
          <Image source={require('../image/logo-myoedb-04.png')} style={[styles.logo, { marginBottom: 50 }]} />

          <Dropdown
            style={[styles.dropdown, { marginBottom: 50 }]}
            containerStyle={styles.dropdownContainer}
            data={LANGUAGES}
            labelField="label"
            valueField="value"
            value={this.state.itemValue}
            onChange={this.handleLangChange}
            renderItem={this.renderLangItem}
            renderLeftIcon={() => {
              const selected = LANGUAGES.find((l) => l.value === this.state.itemValue);
              return selected ? <Image source={selected.flag} style={styles.flag} /> : null;
            }}
            placeholder=""
            placeholderStyle={{ color: 'white' }}
            selectedTextStyle={{ color: 'white', marginLeft: 15 }}
          />

          <View style={styles.inputBox}>
            <Icon name="person" size={20} color="#3498F0" />
            <TextInput
              style={styles.input}
              placeholder="Login"
              placeholderTextColor="#aaa"
              onChangeText={(login) => this.setState({ login })}
            />
          </View>

          <View style={styles.inputBox}>
            <Icon name="lock-closed" size={20} color="#3498F0" />
            <TextInput
              style={styles.input}
              secureTextEntry
              placeholder="Password"
              placeholderTextColor="#aaa"
              onChangeText={(password) => this.setState({ password })}
            />
          </View>

          <View style={styles.rememberContainer}>
            <CustomCheckBox
              isChecked={this.state.remember}
              label={I18n.t('Remember me')}
              onToggle={this.toggleRemember}
            />
          </View>

          <ArrowButton onPress={this.connecter} iconName="arrow-forward-outline" />
        </View>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#192356', alignItems: 'center', paddingTop: hp('8%') },
  logo: { width: 200, height: 40, marginBottom: hp('4%') },
  dropdown: { width: wp('60%'), height: 40, backgroundColor: '#313D6E', borderRadius: 25, paddingHorizontal: 12, marginBottom: hp('4%'), color: 'white' },
  dropdownContainer: { backgroundColor: '#313D6E', borderRadius: 12, paddingVertical: 0, color: 'white' },
  langItem: { flexDirection: 'row', alignItems: 'center', padding: 10 },
  selectedItem: { backgroundColor: '#45509aff' },
  flag: { width: 26, height: 18, borderRadius: 3 },
  inputBox: { flexDirection: 'row', alignItems: 'center', width: wp('80%'), height: hp('6.5%'), borderRadius: 30, borderWidth: 0.5, borderColor: '#303A77', paddingHorizontal: 20, marginBottom: hp('3%') },
  input: { color: 'white', marginLeft: 10, width: '90%' },
  rememberContainer: { width: wp('80%'), marginTop: hp('2%'), marginBottom: hp('4%'), alignItems: 'center' },
});

const mapStateToProps = (state) => ({
  user: state.user,
  data_Token: state.auth.data_Token,
  langMyoedb: state.trand.langMyoedb,
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
  dispatchSetLangMyoedb: (value) => dispatch(setLangMyoedb(value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
