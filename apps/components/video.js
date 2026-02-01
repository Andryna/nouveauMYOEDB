// AIzaSyBZZC103oLC2F1dGoJRpYNJnaEM--nMEXg

import * as React from 'react';
import {Platform, StyleSheet,Text,Keyboard,Image, TouchableWithoutFeedback,Button,Alert,Slider,View,Picker,TouchableOpacity,ScrollView,ActivityIndicator,FlatList,TextInput, Modal} from 'react-native';  
// import enregistrement from './enregistrement';
// import { createStackNavigator, HeaderTitle } from 'react-navigation';
import App from './Login';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/Ionicons';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
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
import picture from './picture';
import videoList from './videoliste';
import config from '../config.json';
const base_url = config.base_url;

class all extends React.Component{ 
  state={
    data:[],
    selectedItem:null,
  };
  constructor() {
    super();
    this.state = {
      show: false,
    };
  }


  static navigationOptions = {
    drawerLabel: 'all',
    drawerIcon: ({ tintColor }) => (
      <Icon name="ios-list" color={'#C9A022'} size={20} />
    ),
  };
  componentDidMount() {
    // this.getUser();

this.getimage();   

  }
  ShowHideComponent = () => {
    if (this.state.show == true) {
      this.setState({ show: false });
    } else {
      this.setState({ show: true });
    }
  };



  getimage = () => {
    // const{page,seed}=this.state;
  
    this.setState({refreshing:true});
          fetch(base_url + '/portail-stagiaire/getimage.php', {
          method: 'get',
          headers: {
              'Accept': 'application/json',
              'Content-type': 'application/json'
          }
      })
          .then((response) => response.json())
          .then((rep) => {
            // alert(rep);
            this.setState({
              data:rep,
            // audio:rep.audio_langue_origine,
              isLoading:false,
              refreshing: false,
              paused:true,
            }
            );
            // this.arrayholder = rep;
            // alert(JSON.stringify(this.state.data));
            //  alert(arra_map(ythis.state.data.content_langue_cible));
          })
        .catch((error) => {
          console.error(error);
        });

  } 
  ListViewItemSeparator = () => {
    return (
      <View
        style={{
          height: .10,
          width: "100%",
          backgroundColor: "#000",
        }}
      />
    );
  }
  // handleRefresh = () => {
  //   this.setState({
  //     refreshing: true
  //   }, () => {
  //     this.getData();
  //   });
  //   this.setState({
  //     refreshing: false
  //   });

  // };
  showcomment = () => {
return(
  <View style={{flexDirection:'row',alignItems:'center'}}><TextInput
// style={{borderRadius:15,borderWidth:1,fontSize:hp('2%'),borderColor:'white',width:wp('75%'),marginLeft:wp('1%'),backgroundColor:'white',top:hp('2%')}}
        multiline={true} 
        placeholder="your comment hear ..."
        style={{fontSize:hp('2%'),textAlign:'justify',backgroundColor:'white',top:hp('0.5%'),borderRadius:25,borderWidth:1,width:wp('60%'),borderColor:'grey'}}
        onChangeText={comment => this.setState({comment})}
        autoCorrect={false}
        />
        <TouchableOpacity style={{marginLeft:wp('2%'),backgroundColor:'#2f3c7e',borderRadius:10}}
onPress={() =>alert("comment")}
>
  <Text style={{color:'white',fontSize:hp('2%')}}>Comment
  </Text>
</TouchableOpacity>
        </View>
);
  }
  handleSelection = (id) => {
    var selectedId = this.state.selectedId
 
    if(selectedId === id)
      this.setState({selectedItem: null});
    else 
      this.setState({selectedItem: id});
      // this.showcomment();
      // console.log(this.state.selectedItem);
 };
  showimage=(name,legende,tuteur,date,id) =>{
    const url=base_url + "/portail-stagiaire/uploads_image/"+name;
    // return <Text>{url}
    //   </Text>
   return(   
   
   <View style={{marginVertical:hp('2%'),backgroundColor:'#cce7e8',padding:hp('1%'),alignItems:'center',marginHorizontal:wp('5%')}}>
     <View style={{flexDirection:'row'}}>
     <Text>
       Sent to  
    </Text>
    <Text style={{fontWeight:'bold',color:'green',marginLeft:wp('1%')}}>
    {tuteur}
    </Text>
    <Text style={{marginLeft:wp('1%')}}>
    on: 
    </Text>
    <Text style={{fontWeight:'bold',color:'green',marginLeft:wp('1%')}}>
    {date}
    </Text>
    </View>
              <View style={{flexDirection:'row',backgroundColor:'grey'}}>
                    <Image
                    style={{width:wp('75%'),height:hp('20%')}}
                    source={{
                      uri: url,
                    }}
                  /> 
                 
             </View>
             {/* <View style={{flexDirection:'row',width:wp('75%'),backgroundColor:'green'}}> */}
             <Text >Legende: <Text style={{backgroundColor:'white',marginLeft:wp('1%')}}> {legende}</Text>

             </Text>

             <View style={{flexDirection:'row',alignItems:'center'}}>
             <View style={{flexDirection:'row',alignItems:'center',marginLeft:wp('3%')}}><TextInput
// style={{borderRadius:15,borderWidth:1,fontSize:hp('2%'),borderColor:'white',width:wp('75%'),marginLeft:wp('1%'),backgroundColor:'white',top:hp('2%')}}
        multiline={true} 
        placeholder="your comment hear ..."
        style={{fontSize:hp('2%'),textAlign:'justify',backgroundColor:'white',top:hp('0.5%'),borderRadius:25,borderWidth:1,width:wp('60%'),borderColor:'grey'}}
        onChangeText={comment => this.setState({comment})}
        autoCorrect={false}
        />
        <TouchableOpacity style={{marginLeft:wp('2%'),backgroundColor:'#2f3c7e',borderRadius:10}}
onPress={() =>alert("comment")}
>
  <Text style={{color:'white',fontSize:hp('2%')}}>Comment
  </Text>
</TouchableOpacity>
        </View>



<TouchableOpacity style={{marginLeft:wp('1%')}}
onPress={() => this.handleSelection(id)}
  // this.ShowHideComponent}
>
  <EvilIcons name="comment" color='blue' size={30}/>
</TouchableOpacity>
             </View>
 </View>
 ); 

  }


  render() {
    return(
      <View >
          <View style={{backgroundColor:'#2f3c7e',height:hp('6.5%'),width:wp('100%'),flexDirection:'row'}}>
       
            <TouchableOpacity 
         onPress={() =>this.props.navigation.openDrawer()}
         style={{width:wp('10%')}}>
          <Icon
          name name="ios-menu" color={'white'} size={30}
          />
           </TouchableOpacity>
    
           <Image style={{width:90,height:20,top:hp('1%'),marginLeft:wp('3%')}}
            source={require('../image/logofotsy.png')}>
            </Image>

         </View>

         <Text style={{color:'black',textAlign:'center'}}>
            Trainee-teacher approach</Text>
            <View style={{flexDirection:'row',backgroundColor:'#2f3c7e',top:hp('2%'),justifyContent:'space-evenly'}}>

        <Text style={{color:'white'}}> My file</Text>
        {/* <Text style={{color:'white'}}>Tutor</Text> */}
        {/* <Text style={{color:'white'}}>Legende</Text> */}
          </View>
        {/* <View style={{flexDirection:'row'}}>
        <View style={{width:wp('55%'),height:hp('20%'),backgroundColor:'grey',top:hp('2%')}}>
        <Image
        style={{width:wp('55%'),height:hp('20%')}}
        source={{
          uri: 'https://reactnative.dev/img/tiny_logo.png',
        }}
      /> */}

      {/* https://demo.forma2plus.com/portail-stagiaire/uploads_image/001_1595940741.jpg */}
      {/* <Image
        style={{width:wp('55%'),height:hp('20%'),top:hp('2%')}}
        source={{
          uri: 'https://demo.forma2plus.com/portail-stagiaire/uploads_image/001_1595940741.jpg',
        }}
      />
          
          </View>
          <Text style={{top:hp('2%')}}>this is an example
            </Text>
          </View> */}
<View style={{height:hp('83%'),top:hp('2%')}}>
          <FlatList
//  style={{}}

 data={this.state.data}
//  audio={this.state.audio}
 extraData={this.state}
keyExtractor={this.state.selectedId}
  // (item)=>item.id_file}
// refreshing={this.state.refreshing}
// onRefresh={this.handleRefresh}
enableEmptySections={true}
renderSeparator= {this.ListViewItemSeparator}
renderItem={({item})=>
<View style={{flexDirection:'column'}}>

  <View style={{borderLeftWidth:0.5,borderRightWidth:0.5}}>
  {this.showimage(item.name_file,item.legende,item.id_tuteur,item.date_file,item.id_file)}
  {/* <Text>
    {item.name_file}
  </Text> */}
  </View>
 
</View>  

}
/>
</View>

      </View>
      );
      }  
      }

    
      const MyDrawerNavigator = createDrawerNavigator(
        {all: {
          screen: all,
        },
        picture: {
          screen: picture,
        },
        video: {
          screen: videoList,
        },
        Camera:{
          screen:camera
        },
        // Home:{
        //   screen:Accueil
        // }
       
      },
      {
        initialRouteName: 'all',
        drawerPosition:'left',
        drawerType:'front',
        // activeTintColor: 'red',
        drawerWidth:wp('50%'),
        drawerBackgroundColor: '#cce7e8',
        contentOptions: {
          activeTintColor: 'white',
          activeBackgroundColor:'#2f3c7e',
          itemsContainerStyle: {
            marginVertical: 0,
            // backgroundColor:'black'
          },
          iconContainerStyle: {
            opacity: 1
          }
        }
     
        
    }
    );
      const MyApp = createAppContainer(MyDrawerNavigator);
      
      // const TabNavigator = createBottomTabNavigator(
      //   {
      //   Picture:{
      //     screen: HomeScreen,
      //     navigationOptions: {
      //       tabBarLabel: 'Picture',
      //        tabBarIcon: ({ color, size }) => (
      //       <Icon name="md-image" color={'blue'} size={30} />
      //     ),
      //     }
      //   },
      //   Video: {
      //     screen: SettingsScreen ,
      //     navigationOptions: {
      //       tabBarLabel: 'Video',
      //       tabBarIcon: ({ color, size }) => (
      //         <Icon name="md-film" color={'blue'} size={30} />
      //       ),
      //     }
      //   },
      
      //   All:{
      //     screen: videoList ,
      //     navigationOptions: {
      //       tabBarLabel: 'All',
      //       tabBarIcon: ({ color, size }) => (
      //         <Icon name="ios-list" color={'blue'} size={30} />
      //       ),
      //     }
      //   }

      //  },
      //  {
      //   initialRouteName: "All",
      //   // tabBarComponent: MaterialTopTabBar, // custom component with your props
      //   tabBarOptions: {
      //     activeTintColor: 'black',
      //   inactiveTintColor: '#C9A022',
      //   style: {
      //     backgroundColor: '#cce7e8',
      //     height:hp('9%')
      //   },
      //   labelStyle: {
      //     textAlign: 'center',
      //     fontSize:hp('3%')
      //   },
      //   indicatorStyle: {
      //     borderBottomColor: '#87B56A',
      //     borderBottomWidth: 2,
      //     // height:hp('50%')
      //   },
      //   }
      // }
 
      // );
      // const AppContainer = createAppContainer(TabNavigator);
      export default class video extends React.Component {
        static navigationOptions =
  {
   headerShown: false,
  //  title: 'Forma2+',
  //  headerStyle: {
  //    backgroundColor:'#2f3c7e',
    
  //  },
  //  headerTintColor: '#fff',
  //  headerLeft: () => null,
  //  headerTintColor: '#f4511e',
  //  headerTitleStyle: {
  //    fontWeight: 'bold',
  //  }
  };
        render() {
          return <MyApp 
          
          />;
        }
      }





      const styles = StyleSheet.create({
      container: {
        
        
        // backgroundColor:'white'
        // flex:1,
          // alignItems: 'center',
        
        }
      }
      
      
      )
     