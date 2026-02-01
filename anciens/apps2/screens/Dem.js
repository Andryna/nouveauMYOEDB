import React, { Component } from 'react';
import {
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  TextInput,
  Alert,
  Button,
  Image,
  AsyncStorage, 
  StatusBar,
  ActivityIndicator,
  NativeAppEventEmitter,
  CheckBox
} from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import * as Progress from 'react-native-progress';
import { connect,useDispatch } from 'react-redux';
import { login, setUserInfo, getUser, storeUser, removeUser } from '../actions/user';
import { fetchData } from '../actions/expressions';
import { fetchAudio } from '../actions/audio';
import { getCat } from '../actions/category';
import { getNbExp } from '../actions/dataStats';
import { getVideo } from '../actions/videos';
import { getImages } from '../actions/images';
import { toggleMenu } from '../actions/utils';

// import {CheckBox } from 'react-native-elements';
 class Dem  extends React.Component{

  static navigationOptions =
   {
    headerShown: false
   };
        constructor(props){
        super(props)
            this.state={
                login:'',
            password:'',
                  
        }
        this.state={
          showPass:true,
          press:false,
          remebrer:false,  
          progress: 0
          }
}
componentDidMount() {
//   this.getUser();  
    let progress = 0;
      this.setState({ progress });
      setTimeout(() => {
        this.setState({ indeterminate: false });
        setInterval(() => {
          progress += Math.random() / 5;
          if (progress > 1) {
            progress = 1;
            this.setState({ progress:0 });
            
          }
          this.setState({ progress });
          
        }, 400);
        
      }, 1000);
    //   setTimeout(() => this.props.navigation.navigate('Login'), 2500)
      this.props.getUser().then((responseJson) => {
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
        setTimeout(() => this.props.navigation.navigate('Login'), 2500)
        //   this.props.navigation.navigate('Login');
          console.warn('Veuillez se connecter et profiter MYOEDB');
        }
      })
  // this.animate(); 
    }

    animate() {
      let progress = 0;
      this.setState({ progress });
      setTimeout(() => {
        this.setState({ indeterminate: false });
        setInterval(() => {
          progress += Math.random() / 5;
          if (progress > 1) {
            progress = 1;
            this.props.navigation.navigate('Login')
          }
          this.setState({ progress });
        }, 200);
      }, 1500);
    }

  getUser = async () =>{
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
      this.props.navigation.navigate('Accueil',{
        login1:a,
        nom1:b,
        prenom1:c,
        email1:d,
        tel1:e,
        adresse1:f,
        cp1:g,
        ville1:h,
        password1:i,
        id1:j,
        id_groupe:k

      });
      // alert("id_groupe:"+k);
      

    }
    // else{
    //   setTimeout(() => this.props.navigation.navigate('Login'), 1500);
    // }
    // alert(log);
            //Your logic
    });
        // alert(a+' et '+b+' stored');
    } catch (error) {
      // Error saving data
    }
  }

  
render(){
const {navigate} =this.props.navigation;
return(
  <View
  source={require('../image2/bg.png')} // Spécifiez ici le chemin de votre image de fond
  style={styles.container}
  >
            
            <View style={styles.centeredTitle}>
            <Image style={styles.myoedb}
             source={require('../image2/logo-myoedb.png')}>
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
            {/* <Text style={{
              color:'white',
              position:'absolute',
              top:hp('35%'),
              fontWeight:'bold',
              fontSize:75
            }}>ALO</Text> */}
            <View style={styles.progressBar}>
              <Progress.Bar progress={this.state.progress} width={250}  color="#DB4165"/>
            </View>
</View>  
);
}
}

const mapStateToProps = (state) => ({
    user: state.user,
  });
  const mapDispatchToProps = (dispatch) => {
    return {
      dispatchLogin: (username, password) => dispatch(login(username, password)),
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
  
    };
  };
  
  
  // Connectez votre composant en utilisant connect
  export default connect(mapStateToProps, mapDispatchToProps )(Dem);
// export default Dem;

const styles=StyleSheet.create({
  container:{
    backgroundColor:'#192356',
  //  position:'absolute',
  
  flex:1,
  alignItems: 'center',
  width:wp('100%'),
  height: hp('100%')
  
  
  },
  ima:{
      marginTop:'3%',
      marginLeft:wp('19%'),
      width:230,
      height:50,
      // position:"relative",
      // opacity:0,
      },
      imageFOND:{
          width:wp('100%'),
          height:hp('70%'),
          top:hp('10%')
      },
      progressBar:{
        position:"absolute",
        bottom:30

      },
      centeredTitle:{
        position:'absolute',
        top:hp('20%')
      },
      centeredCapter:{
        width:wp('80%'),
        position:'absolute',
        top:hp('57%'),
        justifyContent:'space-around',
        flexDirection:'row'
      },
      allCaptation:{
        width:43.5,
        height:45,
        // position:'absolute',
        // top:hp('5%'),
        // alignSelf:'center'
      },
      shape:{
        alignSelf:'center',
        opacity:0.1
      },
      myoedb:{
        width:wp('45%'),
        height:hp('25%'),
        alignSelf:'center'
      }
  
  }
  
  )