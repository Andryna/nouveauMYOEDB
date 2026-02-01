import React, {Component} from 'react';
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
import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
// var Speech = require('react-native-speech');
import { createDrawerNavigator } from 'react-navigation-drawer';
import camera from './camera';
import Accueil from './Accueil';


export default class picture extends React.Component{ 
    // static navigationOptions = {
    //     drawerLabel: 'picture',
    //     drawerIcon: ({ tintColor }) => (
    //       <Icon name="md-image" color={'#C9A022'} size={20} />
    //     ),
    //   };

    //   testkely=()=>{
    //     alert('okok');
    //   }
      render() {
        return (
          <View style={{ flex: 1,alignItems: 'center' }}>
                  <View style={{backgroundColor:'#2f3c7e',height:hp('6.5%'),width:wp('100%'),flexDirection:'row'}}>
     
    

    <Image style={{width:90,height:20,top:hp('1%'),marginLeft:wp('3%')}}
     source={require('../image/logofotsy.png')}>
     </Image>

  </View>

            <Text>Picture liste</Text>
{/* <View>
<Text>Picture </Text>
<TouchableOpacity
style={{backgroundColor:'green'}}
onPress={()=>alert('ok')}
>
  <Text 
  style={{color:'purple'}}
  >
  Soratra
  <Text style={{color:'red'}}>
    soratra mena
  </Text>
  </Text>
  <Icon name="ios-home" color={'red'} size={40}/>
</TouchableOpacity>


</View> */}

{/* <Autre
name="bob" testAlert={this.testkely}
/> */}




          </View>
        );
      }
    }

//     class Autre extends Component {
//       render(){
//         //render styles and components conditionally using this.props.selected ? _ : _
//         // const name="";
//         return (
//           <View>
//  <View style={{backgroundColor:'#2f3c7e',height:hp('6.5%'),width:wp('100%'),flexDirection:'row'}}>
     
//      <TouchableOpacity 
//   onPress={() =>this.props.navigation.openDrawer()}
//   style={{width:wp('10%')}}>
//    <Icon
//    name name="ios-menu" color={'white'} size={30}
//    />
//     </TouchableOpacity>

//     <Image style={{width:90,height:20,top:hp('1%'),marginLeft:wp('3%')}}
//      source={require('../image/logofotsy.png')}>
//      </Image>

//   </View>
//          <Text style={{color:'blue'}}> ceci est un autre {this.props.name} </Text>
//          <TouchableOpacity onPress={this.props.testAlert}>
//            <Icon name="ios-person" color={'black'} size={30}/>
//         </TouchableOpacity>
//         </View>
//         )
//       }
//     }