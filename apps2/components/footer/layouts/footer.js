
import React, {Component} from 'react';
import {Image,View,TouchableOpacity,Text, StyleSheet} from 'react-native';  
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import styleFooter from '../statics/styles/styleFooter';
import Icon from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import JitsiButton from '../../buttons/JitsiButton';
import AsyncStorage from '@react-native-async-storage/async-storage';
export default class Footer extends React.Component{
  getStoredToken = async () => {
    try {
      const storedData = await AsyncStorage.getItem('data_Token');
      if (storedData !== null) {
        // Si tu as stocké un objet (JSON.stringify), tu peux le parser
        const parsedData = JSON.parse(storedData);
        console.log('📦 data_Token récupéré :', parsedData);
        return parsedData;
      } else {
        console.log('⚠️ Aucun data_Token trouvé');
        return null;
      }
    } catch (error) {
      console.log('❌ Erreur lors de la récupération du token:', error);
      return null;
    }
  };
render(){
  const {user} = this.props;
  return(
<View 
style={styleFooter.container}
>
    <View>
        <TouchableOpacity
          onPress={this.props.OpenHome}
        >
            <Icon name="home" size={30} color="white" />
        </TouchableOpacity>
    </View>
    <View>
      {/* <Text>{Info.id_groupe}</Text>  */}
        <JitsiButton 
          label={"METTING"} boxColor = "#47BD7A" loadItsi = {this.props.Openjitsi}
        />
    </View>
    {/* <View>
        <TouchableOpacity
      //   onPress={() =>alert('Plus')}
        // onPress={this.props.OpenPlus}
        >
              <Text>{user.id_groupe}</Text>
        </TouchableOpacity>
    </View> */}
    {/* {
        this.props.Search?(<View>
        
        <TouchableOpacity
      //   onPress={() =>alert('Search')}
      onPress={this.props.Opensearch}
        >
            <Icon name="search-outline" size={25} color="white" />
        </TouchableOpacity>
    </View>)
    :null
    } */}

{/* e-learning */}

    <View 
      style={{
        // flex: 1, // ou une hauteur explicite comme height: 300
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical:5,
        borderRadius:10
      }}
    >
      <TouchableOpacity
        onPress={this.props.OpenEl}
        // onPress={()=>this.getStoredToken()}
      >
        <Image
          source={require('../../../image2/elv3.png')} 
          style={styles.logo}
          resizeMode="contain"
        />
      </TouchableOpacity>
    </View>

{/* e-learning */}

     <TouchableOpacity
      onPress={this.props.OpenChat}
      style={{
        borderWidth:1,
        borderColor:"white",
        paddingHorizontal:8,
        borderRadius:5
      }}
    >
      <MaterialIcons name="support-agent" size={20} color="white" />
      <Text style={{
        color:"white",
        textAlign:"center"
      }}>
        IA
      </Text>
    </TouchableOpacity>
    <View>
        <TouchableOpacity
      onPress={this.props.OpenCat}
        >
        <Icon name="folder" size={30} color="white" />
        </TouchableOpacity>
    </View>
    {/* <View>
        <TouchableOpacity
        onPress={this.props.OpenAlo}
        >
        <Icon name="analytics" size={30} color="white" />
        </TouchableOpacity>
        </View> */}

</View>   
)}}

const styles = StyleSheet.create({
  
  logo: {
    width: 50,
    height: 25,
    // paddingVertical:10
    // marginBottom: 15,
  },
  
});