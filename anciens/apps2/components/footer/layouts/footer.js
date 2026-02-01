
import React, {Component} from 'react';
import {Image,View,TouchableOpacity,Text, StyleSheet} from 'react-native';  
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import styleFooter from '../statics/styles/styleFooter';
import Icon from 'react-native-vector-icons/Ionicons';
import JitsiButton from '../../buttons/JitsiButton';
export default class Footer extends React.Component{

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
      >
        <Image
          source={require('../../../image2/elv3.png')} 
          style={styles.logo}
          resizeMode="contain"
        />
      </TouchableOpacity>
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
    <View>
        <TouchableOpacity
      onPress={this.props.OpenCat}
        >
        <Icon name="folder-open" size={30} color="white" />
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
    paddingVertical:10
    // marginBottom: 15,
  },
  
});