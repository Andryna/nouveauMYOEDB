// AIzaSyBZZC103oLC2F1dGoJRpYNJnaEM--nMEXg

import * as React from 'react';
import {Platform, StyleSheet,Text,Keyboard,Image, TouchableWithoutFeedback,Button,Alert,Slider,View,Picker,TouchableOpacity,ScrollView,ActivityIndicator,FlatList,TextInput, Modal} from 'react-native';  
// import enregistrement from './enregistrement';
// import { createStackNavigator, HeaderTitle } from 'react-navigation';
import App from './Login';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/Ionicons';
import Sound from 'react-native-sound';
import {SearchBar } from 'react-native-elements';
import Tts from "react-native-tts";
import { PowerTranslator, ProviderTypes, TranslatorConfiguration, TranslatorFactory} from 'react-native-power-translator';
// import Speech from 'react-native-speech';

// var Speech = require('react-native-speech');
 
export default class User extends React.Component{ 
  state={
  
    
    
    // isLoading:true,
  }
 
  static navigationOptions =
   {
    headerShown: false,
    title: 'Forma2+',
    headerStyle: {
      backgroundColor:'#2f3c7e',
     
    },
    // centerComponent={{ text: 'MY TITLE', style: { color: '#fff' } }},
    headerTintColor: '#fff',
    headerLeft: () => null,
  headerRight:() =><View>
    {/* <TouchableOpacity 
  onPress onPress={() => navigate('nouveau',{prevScreenTitle:' Utilisateur'})}
  ><Text style={{color:'white'}}>Se deconnecté
 </Text></TouchableOpacity> */}
 
 </View> 

   }
   ;
   constructor(props){
    super(props)
    this.state={
        users:false,
    //   isLoading: true,
    //   page:1,
    //   seed:1,
    id: this.props.navigation.state.params.id1, 
    login:this.props.navigation.state.params.login1,
    nom:this.props.navigation.state.params.nom1,
    prenom:this.props.navigation.state.params.prenom1,
    email:this.props.navigation.state.params.email1,
    tel:this.props.navigation.state.params.tel1,
    adresse:this.props.navigation.state.params.adresse1,
    cp:this.props.navigation.state.params.cp1,
    ville:this.props.navigation.state.params.ville1,
    password:this.props.navigation.state.params.password1,
 
orig:'French',
targ:'english'
    }
   
       }
       componentDidMount() {
    // this.getData();
       
      }
      removeUser = async () =>{
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
          // this.props.navigation.navigate('Accueil',{
          //   login1:a,
          //   nom1:b,
          //   prenom1:c,
          //   email1:d,
          //   tel1:e,
          //   adresse1:f,
          //   cp1:g,
          //   ville1:h,
          //   password1:i,
          //   id1:j,
          //   id_groupe:k
    
          // });
          alert("id_groupe:"+k);
          
    
        }
        else{
            // this.props.navigation.navigate('Login');
            alert("rien");
        }
        // alert(log);
                //Your logic
        });
            // alert(a+' et '+b+' stored');
        } catch (error) {
          // Error saving data
        }
      }
      openHome() {
        this.props.navigation.navigate('Accueil');
       }
  render() {
   
    const {id}=this.state;
    const {PickerValueHolder}=this.state;
    const { goBack } = this.props.navigation;
    return(
      <View style={styles.container}>
          <View style={{justifyContent:'center',height:hp('6%'),marginLeft:wp('2.5%')}}>
                              <View
                              style={{height:hp('4%'),width:wp('100%'),flexDirection:'row',justifyContent:'space-between'}}>
                              <TouchableOpacity 
                                      onPress={() =>this.openHome()}>
                                          <View
                              style={{
                              flexDirection:'row'
                              }}>
                                      <Image style={{
                                          width:15,
                                          height:15,
                                      }}
                                      source={require('../image/trace.png')}>
                                      </Image>
                                      <View>
                                          <Text style={{
                                          color:'#5C4DB1',
                                          marginLeft:wp('3%'),
                                          fontSize:hp('2%')
                                          }}>
                                              PROFIL
                                          </Text>
                                      </View>
                              </View>
                              </TouchableOpacity>
                              </View>
                  </View>
<View style={{height:hp('83%')}}>

    <View style={{flexDirection:'row'}}>
                <View style={{width:wp('30%'),marginLeft:wp('2%')}}>
                        <Text style={{marginRight:wp('5%'),top:hp('1%'),fontWeight:'bold'}}>Company:
                        </Text>
                </View>
               <View style={styles.profile}>
                        <Text style={{marginLeft:wp('3%'),top:hp('1%'),fontFamily:'Lobster-Regular'}}>
                        </Text>
                </View>
    </View>
    <View style={{flexDirection:'row',top:hp('1%')}}>
                <View style={{width:wp('30%'),marginLeft:wp('2%')}}>
                        <Text style={{marginRight:wp('5%'),top:hp('1%'),fontWeight:'bold',fontSize:14}}>Lastname
                        </Text>
                </View>
               <View style={styles.profile}>
                        <Text style={{marginLeft:wp('3%'),top:hp('1%'),fontSize:12}}>{this.state.prenom}
                        </Text>
                </View>
    </View>
    <View style={{flexDirection:'row',top:hp('2%')}}>
                <View style={{width:wp('30%'),marginLeft:wp('2%')}}>
                        <Text style={{marginRight:wp('5%'),top:hp('1%'),fontWeight:'bold',fontSize:14}}>Name
                        </Text>
                </View>
               <View style={styles.profile}>
                        <Text style={{marginLeft:wp('3%'),top:hp('1%'),fontSize:12}}> {this.state.nom}
                        </Text>
                </View>
    </View>
    <View style={{flexDirection:'row',top:hp('3%')}}>
                <View style={{width:wp('30%'),marginLeft:wp('2%')}}>
                        <Text style={{marginRight:wp('5%'),top:hp('1%'),fontWeight:'bold',fontSize:14}}>Email
                        </Text>
                </View>
               <View style={styles.profile}>
                        <Text style={{marginLeft:wp('3%'),top:hp('1%'),fontSize:12}}> {this.state.email}
                        </Text>
                </View>
    </View>
    <View style={{flexDirection:'row',top:hp('4%')}}>
                <View style={{width:wp('30%'),marginLeft:wp('2%')}}>
                        <Text style={{marginRight:wp('5%'),top:hp('1%'),fontWeight:'bold',fontSize:14}}>Mobile
                        </Text>
                </View>
               <View style={styles.profile}>
                        <Text style={{marginLeft:wp('3%'),top:hp('1%'),fontSize:12}}> {this.state.tel}
                        </Text>
                </View>
    </View>
    <View style={{flexDirection:'row',top:hp('5%')}}>
                <View style={{width:wp('30%'),marginLeft:wp('2%')}}>
                        <Text style={{marginRight:wp('5%'),top:hp('1%'),fontWeight:'bold'}}>Adresse
                        </Text>
                </View>
               <View style={styles.profile}>
                        <Text style={{marginLeft:wp('3%'),top:hp('1%'),fontSize:12}}> {this.state.adresse}
                        </Text>
                </View>
    </View>
    <View style={{flexDirection:'row',top:hp('6%')}}>
                <View style={{width:wp('30%'),marginLeft:wp('2%')}}>
                        <Text style={{marginRight:wp('5%'),top:hp('1%'),fontWeight:'bold'}}>Code postal
                        </Text>
                </View>
               <View style={styles.profile}>
                        <Text style={{marginLeft:wp('3%'),top:hp('1%'),fontSize:12}}>  {this.state.cp}
                        </Text>
                </View>
    </View>
    <View style={{flexDirection:'row',top:hp('7%')}}>
                <View style={{width:wp('30%'),marginLeft:wp('2%')}}>
                        <Text style={{marginRight:wp('5%'),top:hp('1%'),fontWeight:'bold',fontSize:14}}>Ville
                        </Text>
                </View>
               <View style={styles.profile}>
                        <Text style={{marginLeft:wp('3%'),top:hp('1%'),fontSize:12}}>  {this.state.ville}
                        </Text>
                </View>
    </View>
    <View style={{flexDirection:'row',top:hp('8%')}}>
                <View style={{width:wp('30%'),marginLeft:wp('2%')}}>
                        <Text style={{marginRight:wp('5%'),top:hp('1%'),fontWeight:'bold',fontSize:14}}>Login
                        </Text>
                </View>
               <View style={styles.profile}>
                        <Text style={{marginLeft:wp('3%'),top:hp('1%'),fontSize:12}}>  {this.state.login}
                        </Text>
                </View>
    </View>
    <View style={{flexDirection:'row',top:hp('9%')}}>
                <View style={{width:wp('30%'),marginLeft:wp('2%')}}>
                        <Text style={{marginRight:wp('5%'),top:hp('1%'),fontWeight:'bold',fontSize:14}}>Password
                        </Text>
                </View>
               <View style={styles.profile}>
                        <Text style={{marginLeft:wp('3%'),top:hp('1%'),fontSize:12}}> {this.state.password}
                        </Text>
                </View>
    </View>
    <View style={{flexDirection:'row',top:hp('10%')}}>
                <View style={{width:wp('30%'),marginLeft:wp('2%')}}>
                        <Text style={{marginRight:wp('5%'),bottom:hp('1%'),fontWeight:'bold',fontSize:14}}>Origin Language
                        </Text>
                </View>
               <View style={styles.profile}>
                        <Text style={{marginLeft:wp('3%'),top:hp('1%'),fontSize:12}}> {this.state.orig}
                        </Text>
                </View>
    </View>
    <View style={{flexDirection:'row',top:hp('11%')}}>
                <View style={{width:wp('30%'),marginLeft:wp('2%')}}>
                        <Text style={{marginRight:wp('5%'),bottom:hp('1%'),fontWeight:'bold'}}>Target language
                        </Text>
                </View>
               <View style={styles.profile}>
                        <Text style={{marginLeft:wp('3%'),top:hp('1%'),fontSize:12}}> {this.state.targ}
                        </Text>
                </View>
    </View>
    <View style={{backgroundColor:'blue',width:wp('20%'),alignItems:'center', top:hp('15%'),marginLeft:wp('40%'),borderRadius:20}}>
    
    </View>            
    <Modal 
transparent={true}
animationType="fade"
visible={this.state.users}

>


<TouchableOpacity onPress={() => this.setState({users:false}) }
              style={{with:wp('100%'),height:hp('100%')}}>
                        <View style={{top:hp('7%'),width:wp('30%'), marginLeft:wp('70%')}}>
                                  <View style={{backgroundColor:'#2f3c7e',height:hp('6.5%'),borderWidth:1,borderColor:'white'}}>
                                            <TouchableOpacity
                                            onPress={() =>{this.setState({users:false}),this.props.navigation.navigate('User',{
                                            login1:this.state.login,
                                            nom1:this.state.nom1,
                                            prenom1:this.state.prenom1,
                                            email1:this.state.email1,
                                            tel1:this.state.tel1,
                                            adresse1:this.state.adresse1,
                                            cp1:this.state.cp1,
                                            ville1:this.state.ville1,
                                            password1:this.state.password1,
                                            id1:this.state.id
                                            })}}
                                            style={{
                                              flexDirection:'row',
                                              alignSelf:'center'
                                            }}
                                            >
                                              <Icon name={'ios-person-circle-outline'} size={20} color={'white'}/>
                                                      <Text style={{color:'white',fontSize:hp('2%'),textAlign:'center',marginLeft:wp('3%'),fontFamily:'Sharikhand'}}>My profil
                                                      </Text>
                                            </TouchableOpacity>
                                  </View> 
                        <View style={{backgroundColor:'#2f3c7e',height:hp('6.5%'),borderWidth:1,borderColor:'white'}}>
                                  <TouchableOpacity 
                                  style={{
                                    flexDirection:'row',
                                    alignSelf:'center'
                                  }}
                                  onPress={() =>{this.props.navigation.navigate('Login'),this.setState({users:false}),this.removeUser()}}>
                                            <Icon name={'md-log-out'} size={20} color={'white'}/>
                                            <Text style={{color:'white',fontSize:hp('2%'),textAlign:'center',marginLeft:wp('3%')}}>Logout
                                            </Text>
                                  </TouchableOpacity>
                        </View> 
                        </View>
              </TouchableOpacity>

</Modal>

</View>

      </View>
      
   
      )
      }  
      }
      const styles = StyleSheet.create({
      container: {
        
        
        backgroundColor:'white'
        // flex:1,
          // alignItems: 'center',
        
        },

user:{
flexDirection:'row',
position:'absolute',
marginTop:hp('1%'),
top:hp('13.2%'),
fontSize:hp('2.5%'),
color:'green',
marginHorizontal:wp('2%')

},
but:{
position:'absolute',
color:'white',
justifyContent:'center',
marginHorizontal:wp('61%'),
bottom:0.1,
height:hp('4.5%'),
width: wp('5%'),
},
but2:{
  // position:'absolute',
//  padding:25,
// borderRadius:27,
// backgroundColor:'#2f3c7e',
position:'absolute',

color:'white',
justifyContent:'center',
//  marginTop:hp('12%'),
// marginLeft:wp('30%'),
marginHorizontal:wp('71%'),
// marginVertical:hp('15%'),
bottom:0.1,
height:hp('4.5%'),
width: wp('5%'),
},
but3:{
  // position:'absolute',
//  padding:25,
// borderRadius:27,
// backgroundColor:'#2f3c7e',
position:'absolute',

color:'white',
justifyContent:'center',
//  marginTop:hp('12%'),
// marginLeft:wp('30%'),
marginHorizontal:wp('74%'),
// marginVertical:hp('15%'),
bottom:0.1,
height:hp('4.5%'),
width: wp('6%'),
},
ret:{

  borderRadius:27,
  // backgroundColor:'#2f3c7e',
  
  position:'absolute',
  // opacity:1,
 
  justifyContent:'center',
  //  marginTop:hp('12%'),
  // marginLeft:wp('30%'),
  marginHorizontal:wp('13%'),
  marginVertical:hp('65%'),
  height:hp('10%'),
  width: wp('15%'),
},
buttext:{
textAlign:'center',
  color:'white',
  fontWeight:'bold',
  fontSize:hp('2.5%'),
},
titreV:{
  alignItems: 'center',
  // top:hp('10%')
  // color:'blue',
  // marginHorizontal:wp('15%'),
  // fontSize:hp('3%'),
},
titre:{
  color:'blue',
  // marginHorizontal:wp('15%'),
  fontSize:hp('3%'),
  
},
titre2:{
  color:'blue',
  // marginHorizontal:wp('15%'),
  fontSize:hp('3%'),

  
},
result:{
  color:'white',
  // fontWeight:'bold'
},cancel:{

backgroundColor:'red',
color:'red'

},
profile:{
    width:wp('65%'),
    height:hp('5%'),
    
}
      }
      
      
      )
     