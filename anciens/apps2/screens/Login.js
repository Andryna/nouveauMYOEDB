import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Image, 
  TouchableOpacity,
  KeyboardAvoidingView,
  ImageBackground,
  BackHandler
} from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/Ionicons';

import I18n from 'react-native-i18n';
import en from '../../i18/en';
import fr from '../../i18/fr';
import es from '../../i18/es';
import LoginModals from '../components/modals/LoginModals';
import ArrowButton from '../components/buttons/ArroButton';
import CustomCheckBox from '../components/checkBox/CustomCheckBox';
import config from '../../config.json';
// import firestore from '@react-native-firebase/firestore';
import { connect,useDispatch } from 'react-redux';
import { login, setUserInfo, getUser, storeUser, removeUser } from '../actions/user';
import { fetchData } from '../actions/expressions';
import { fetchAudio } from '../actions/audio';
import { getCat } from '../actions/category';
import { getNbExp } from '../actions/dataStats';
import { getVideo } from '../actions/videos';
import { getImages } from '../actions/images';
import { setLangMyoedb } from '../actions/trandActions';
import { toggleMenu } from '../actions/utils';
import Spinner from 'react-native-spinkit';
// import AsyncStorage from '@react-native-community/async-storage';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';


const base_url = config.base_url;

class Login  extends React.Component{

  static navigationOptions =
  {
   headerShown: false
  };
       constructor(props){
       super(props)
           this.state={
            login:'',
            password:'',
            itemValue:'en',
            showPass:true,
            press:false,
            remebrer:false,
            activeSwitch:1,
            lang:false,
            userData: null,
            isLoading:false
         };
         I18n.locale = 'en';
         I18n.fallbacks = true;
         I18n.translations = {
         en,
         fr,
         es
       }; 
}
async componentDidMount() {
  this.backHandler = BackHandler.addEventListener(
    'hardwareBackPress',
    this.handleBackPress
  );
  const { getUser } = this.props;
  const data_Token = await AsyncStorage.getItem('data_Token');
  if(data_Token){
    console.log('ny enregistrée ato: '+ data_Token);
  }else{
    console.log('no data_Token');
  }
  getUser().then((responseJson) => {
    if (responseJson) {
      this.setState({isLoading:true});
      this.props.dispatchfetchData(responseJson.id)
            .then(() => {
              return this.props.getCat(responseJson.id_groupe);
            })
            .then(() => {
              return this.props.getNbExp(responseJson.id, responseJson.id_groupe);
            })
            .then(() => {
              return this.props.dispatchSetUserInfo(responseJson);
            })
            .then(() => {
              return this.props.getVideo(responseJson.id);
            })
            .then(() => {
              return this.props.dispatchfetchAudio(responseJson.id);
            })
            .then(() => {
              return this.props.getImage(responseJson.id);
            })
            .then(() => {
              this.props.dispatchSetLangMyoedb(this.state.itemValue);
                this.props.navigation.navigate('Accueil', {
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
                });
              this.setState({isLoading:false});

            })
            .catch((error) => {
              console.error(error);
            });
    }else{
      
      console.warn('Veuillez se connecter et profiter MYOEDB');
    }
  })
}

componentWillUnmount() {
  // Retirez l'écouteur lorsque le composant est démonté
  this.backHandler && this.backHandler.remove();
}

handleBackPress = () => {
  // Empêchez le comportement par défaut du bouton de retour
  return true;
};

getToken = async (login, password) => {
  try {
    const response = await axios.post(
      config.base_url + '/portail-stagiaire/auth.php', 
      {
        login: login,
        password: password
      },
      {
        timeout: 10000 // Timeout de 10 secondes
      }
    );
    console.log('login', login, password);
    console.log('response login', response.data);
    const loginData = response.data;
    if (loginData.authentification) {
      console.log("La réponse et userdata ne sont pas vides.");
      await AsyncStorage.setItem('data_Token', JSON.stringify(response.data));
      return response.data;
    } else {
      alert(loginData.message);
      console.log("userdata est vide.");
      return response.data;
    }
  } catch (error) {
    if (error.code === 'ECONNABORTED') {
      alert('Le serveur est saturé, veuillez réessayer ultérieurement.');
    } else {
      console.log(error);
    }
    return error;
  }
}


connecter = async () => {
  this.setState({ isLoading: true });
  const { dispatchLogin, dispatchSetUserInfo } = this.props;
  const { login, password } = this.state;

  if (login && password) {
    dispatchLogin(login, password);
    const data_Token = await this.getToken(login, password);

    if (data_Token.authentification === true) {
      const GUSERID = data_Token.userdata.GUSERID;
      console.log("GUSERID: " + data_Token.userdata.GUSERID);

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

fetchWithTimeout = (url, options, timeout = 10000) => {
  return Promise.race([
    fetch(url, options).then(response => response.json()),
    new Promise((_, reject) =>
      setTimeout(() => reject(new Error('Request timed out')), timeout)
    )
  ]);
}



reconnecter = (login,password) => {
  console.log(password, login);
  const url = config.base_url + '/portail-stagiaire/index.php';
  console.log(url);

  try {
    fetch(url, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        login: login.toString(),
        password: password.toString(),
      })
    })
      .then((response) => response.json())
      .then((responseJson) => {
        dispatchSetUserInfo(responseJson);
        if (responseJson === 'null') {
          alert('Login ou mot de passe invalide');
        } else {
          this.props.dispatchfetchData(responseJson.id)
            .then(() => {
              return this.props.getCat(responseJson.id_groupe);
            })
            .then(() => {
              return this.props.getNbExp(responseJson.id, responseJson.id_groupe);
            })
            .then(() => {
              return this.props.getVideo(responseJson.id);
            })
            .then(() => {
              this.props.toggleMenu();
              // Toutes les actions précédentes sont terminées, vous pouvez continuer ici.
              if (remebrer === true) {
                console.log(JSON.stringify(responseJson));
                this.props.navigation.navigate('Accueil', {
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
                });
              } else {
                this.props.navigation.navigate('Accueil', {
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
                });
              }
              this.setState({isLoading:false});

            })
            .catch((error) => {
              console.error(error);
            });
        }
      })
      .catch((error) => {
        console.error(error);
      });
  } catch (error) {
    console.error(error);
  }
}

 storeUsers = async (a,b,c,d,e,f,g,h,i,j,k) =>{
   try {
     await AsyncStorage.multiSet([
           ["login",a],
           ["nom",b],
           ["prenom",c],
           ["email",d],
           ["tel",e],
           ["adresse",f],
           ["cp",g],
           ["ville",h],
           ["password",i],
           ["id",j],
           ["id_groupe",k]
       ]);
       alert(a+' et '+b+' stored');
   } catch (error) {
    alert('error');
   }
 }
 getUsers = async () =>{
  try {
    await AsyncStorage.multiGet(['login','nom','prenom','email','tel','adresse','cp','ville','password','id','id_groupe']).then((data) => {
      let a = data[0][1];
      let b = data[1][1];
      let c = data[2][1];
      let d = data[3][1];
      let e = data[4][1];
      let f = data[5][1];
      let g = data[6][1];
      let h = data[7][1];
      let i = data[8][1];
      let j = data[9][1];
      let k = data[10][1];

  if(a !== null){
    console.log('Data: '+a+', '+b+', '+c+','+d+','+e+','+f+','+g+','+h+','+i+','+j+' , '+k);

  }else{
    console.log('rien');
  }
  });
  } catch (error) {
    // Error saving data
  }
}
clearAsyncStorage = async () => {
  try {
    await AsyncStorage.clear();
    alert('AsyncStorage cleared successfully');
  } catch (error) {
    console.error('Error clearing AsyncStorage:', error.message);
  }
};

 removeUser = async (i) =>{
   try {
     await AsyncStorage.multiGet(['login', 'password']).then((data) => {
       let log = data[0][1];
       let pas = data[1][1];
   if(log !== ''){
     this.props.navigation.navigate('Accueil',{user:i});

   }
   // alert(log);
           //Your logic
   });
       alert(a+' et '+b+' stored');
   } catch (error) {
     // Error saving data
   }
 }

 change(p){
this.setState({password:p});

 }


 changefr = () =>{
  // alert("ok");
    this.setState({itemValue:'fr',lang:false});
    I18n.locale = 'fr';
}
changeen = () =>{
  // alert("ok");
    this.setState({itemValue:'en',lang:false});
    I18n.locale = 'en';
}
changees = () =>{
  // alert("ok");
    this.setState({itemValue:'es',lang:false});
    I18n.locale = 'es';
}

handleChangeLang = (selectedLang) => {
  this.setState({itemValue:selectedLang,lang:false});
  I18n.locale = selectedLang;
};

closeLangModal = () => {
  this.setState({lang:false});
};

toggleRemember = () => {
  this.setState({ remebrer: !this.state.remebrer });
};
 
render(){
  const {navigate} =this.props.navigation;
  const { langMyoedb } = this.props;
  // <KeyboardAvoidingView
  //   style={{ flex: 1 }}
  //   behavior="padding"
  // >
  // </KeyboardAvoidingView>
  if (this.state.isLoading) {
    return (
      <View style={{ alignSelf: "center", top: hp('40%') }}>
        <Spinner
          // style={{}}
          color={'#2f3c7e'} size={75} type={'ThreeBounce'}
        />
      </View>
    );
  }
  return(
    <KeyboardAvoidingView style={{ }} behavior="padding"> 
      <View style={styles.container}>
              <View style={styles.headcontainer}>
                <Image style={styles.myoedb} source={require('../image2/logo-myoedb.png')} />
                <View style={styles.selectLangContainer}>
                  <TouchableOpacity
                    onPress={() => this.setState({ lang: true })}
                    style={{
                      flexDirection: 'row',
                      backgroundColor: '#313D6E',
                    }}
                  >
                    <View
                      style={{
                        height: 27,
                        width: 95,
                        marginBottom: 2,
                        flexDirection: 'row',
                        justifyContent:'center',
                        alignItems: 'center'
                      }}
                    >
                      {this.state.itemValue === 'fr' ? (
                        <>
                          <Image style={styles.flag} source={require('../image/drapeau-france.jpg')} />
                          <Text style={styles.labelFlag}>{I18n.t('Francais')}</Text>
                        </>
                      ) : (
                        <>
                          <Image style={styles.flag} source={this.state.itemValue === 'en' ? require('../image/GB.jpg') : require('../image/espagne.png')} />
                          <Text style={styles.labelFlag}>{this.state.itemValue === 'en' ? I18n.t('Anglais') : I18n.t('Espagnol')}</Text>
                        </>
                      )}
                    </View>
                    <Icon name="chevron-down" size={18} style={{ marginTop: 4 }} />
                  </TouchableOpacity>
                </View>
              </View>
              <Text style={styles.titre}> </Text>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderWidth: 0.5,
                  borderRadius: 30,
                  borderColor: '#303A77',
                  width: wp('80%'),
                  height: hp('6.5%'),
                  alignSelf: 'center',
                  paddingLeft: 30,
                }}
              >
                <Icon name={'person'} size={20} color={'#3498F0'} style={styles.inputIcon} />
                <TextInput
                  style={styles.place}
                  ref={input1 => { this.textInput1 = input1 }}
                  underlineColorAndroid='transparent'
                  onChangeText={login => {this.setState({ login })}}
                />
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderWidth: 0.5,
                  borderRadius: 30,
                  borderColor: '#303A77',
                  width: wp('80%'),
                  height: hp('6.5%'),
                  alignSelf: 'center',
                  paddingLeft: 30,
                  marginTop: hp('3%')
                }}
              >
                <Icon name={'lock-closed-sharp'} size={20} color={'#3498F0'} style={styles.inputIcon} />
                <TextInput
                  style={styles.placeP}
                  ref={input => { this.textInput = input }}
                  secureTextEntry={true}
                  onChangeText={password => this.setState({ password })}
                />
              </View>
              <CustomCheckBox
                isChecked={this.state.remebrer}
                label={I18n.t('Remember me')}
                onToggle={this.toggleRemember}
              />
              <ArrowButton 
                onPress={() => this.connecter()} 
                iconName = "arrow-forward-outline"
              />
              <LoginModals
                visible={this.state.lang}
                onClose={this.closeLangModal}
                onChangeLang={this.handleChangeLang}
              />
        <View style={{ bottom:40, alignSelf: 'center', position:'absolute'}}>
          <Image style={styles.ima} source={require('../image/logofotsy.png')} />
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}
}
const mapStateToProps = (state) => ({
  user: state.user,
  data_Token: state.auth.data_Token,
  langMyoedb: state.trand.langMyoedb,
});
const mapDispatchToProps = (dispatch) => {
  return {
    dispatchLogin: (username, password) => dispatch(login(username, password)),
    // dispatchGetToken: (username, password) => dispatch(get_Token(username, password)),
    dispatchSetUserInfo: (userInfo) => dispatch(setUserInfo(userInfo)),
    dispatchfetchData:id => dispatch(fetchData(id)),
    dispatchfetchAudio:id => dispatch(fetchAudio(id)),
    getCat:id_groupe => dispatch(getCat(id_groupe)),
    getNbExp:(id, id_groupe) => dispatch(getNbExp(id, id_groupe)),
    getVideo: id => dispatch(getVideo(id)),
    getImage: id => dispatch(getImages(id)),
    toggleMenu: () => dispatch(toggleMenu()),
    getUser: () => dispatch(getUser()),
    storeUser: (userData) => dispatch(storeUser(userData)),
    removeUser: () => dispatch(removeUser()),
    dispatchSetLangMyoedb: (value) => dispatch(setLangMyoedb(value))
  };
};


// Connectez votre composant en utilisant connect
export default connect(mapStateToProps, mapDispatchToProps )(Login);

const styles=StyleSheet.create({
container:{
  backgroundColor: '#192356',
  // backgroundColor: 'white',
  // flex:1,
  height:hp('100%')
},
headcontainer:{
  marginTop:hp('7%')
},
titre:{
  textAlign:'center',
  fontSize:hp('2%'),
  marginTop:hp('3%'),
  color:'white'
},
place:{
  color:'white', 
  fontSize:14,
  width: wp('70%'),
  // height:hp('10%'),
  marginLeft:wp('2%'),
  borderColor:'#3498F0',
  // borderBottomWidth:2,
},
placeP:{
  color:'white', 
  fontSize:14,
  width: wp('70%'),
  borderColor:'#3498F0',
  // height:hp('10%'),
  marginLeft:wp('2%'),
},
butNew:{
  borderRadius:27,
  backgroundColor:'#EA1E69',
  color:'white',
  justifyContent:'center',
  alignItems:'center',
  height:hp('6%'),
  width: wp('15%'),
},
but:{
  borderRadius:27,
  backgroundColor:'#DC4F89',
  color:'white',
  justifyContent:'center',
  height:hp('6%'),
  width: wp('80%'),
},
buttext:{
  textAlign:'center',
  color:'white',
  fontWeight:'bold',
  fontSize:hp('2.5%') 
},
oublie:{
  textAlign:'center',
  color:'#2f3c7e'
},
ima:{
  width:80,
  height:20,
  alignSelf:'center'
},
myoedb:{
  width:200,
  height:40,
  alignSelf:'center',
  marginTop:hp('5%')
},
tex:{
  marginLeft:hp('3%'),
  fontSize:hp('2.5%'),
  color:'grey'
},

inputIcon:{
// position:'absolute',
// // top:10,
// left:15
},

btneye:{
  position:'absolute',
  top:10,
  right:15
},
butV:{
  alignItems: 'center',
  justifyContent:'center',
  marginTop:hp('5%')
},
texinput:{
  marginTop:10
},
flag:{
  width:30,
  height:25,
  alignSelf:'flex-start',
  marginRight:4
},
myoedb:{
  width:wp('40%'),
  height:hp('20%'),
  alignSelf:'center'
},
selectLangContainer:{
  width:150,
  height:40,
  alignItems:'center',
  marginTop:hp('5%'),
  alignSelf:'center',
  marginRight:wp('2.5%'),
  borderRadius:50,
  backgroundColor:'#313D6E',
  justifyContent:'center'
},
labelFlag:{
  color:'white'
}
})