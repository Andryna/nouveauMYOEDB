import React, {Component} from 'react';
import {Image,View,TouchableOpacity,ScrollView,Text,TextInput} from 'react-native';  
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import Rec from '../statics/styles/styleRecord';
import Icon from 'react-native-vector-icons/Ionicons';

export default class Record extends React.Component{

render()
{return(
      <View style={Rec.buttonView}>
        <TouchableOpacity
        onPress={this.props.record}
        // style={Rec.center}
        >
          <View style={Rec.center}>
                <Text style={Rec.textaudio}>
                    RECORD AUDIO
                </Text>
          </View>
        </TouchableOpacity>

      </View>
  )}}