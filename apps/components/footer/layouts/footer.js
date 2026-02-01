
import React, {Component} from 'react';
import {Image,View,TouchableOpacity,Text} from 'react-native';  
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
            <Icon name="ios-home" size={30} color="white" />
        </TouchableOpacity>
    </View>
    <View>
      {/* <Text>{Info.id_groupe}</Text>  */}
        <JitsiButton 
          label={"METTING"} boxColor = "#47BD7A" loadItsi = {this.props.OpenPlus}
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
    <View>
        <TouchableOpacity
      onPress={this.props.OpenCat}
        >
        <Icon name="ios-folder" size={30} color="white" />
        </TouchableOpacity>
    </View>

</View>   
)}}