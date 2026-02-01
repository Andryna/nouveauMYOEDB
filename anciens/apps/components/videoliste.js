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
import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
// var Speech = require('react-native-speech');
import { createDrawerNavigator } from 'react-navigation-drawer';
import camera from './camera';
import Accueil from './Accueil';
import Header from './header';


export default class videoList extends React.Component {
    static navigationOptions = {
      drawerLabel: 'video',
      drawerIcon: ({ tintColor }) => (
        <Icon name="md-film" color={'#C9A022'} size={20} />
      )
    };
    testaction=()=>{
      alert('action');
    };
    testkely=()=>{
      console.log('okok');
    }
    opdraw(){
      this.props.navigation.openDrawer()
    }
    render() {
      return (
        <View style={{ flex: 1,alignItems: 'center' }}>
      {/* <Header testAlert={this.testaction} name="react" open={()=>this.props.navigation.openDrawer()} /> */}
          
          <Text>Video liste</Text>
        </View>
      );
    }
  }