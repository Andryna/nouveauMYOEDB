import React, {Component} from 'react';
import {Image,View,TouchableOpacity,ScrollView,Text,TextInput} from 'react-native';  
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import Real from '../statics/styles/styleReal';
import Icon from 'react-native-vector-icons/Ionicons';

export default class RealTime extends React.Component{

render()
{return(
      <View style={Real.buttonView}>
        <TouchableOpacity
        onPress={this.props.record}
        // style={Real.center}
        >
          <View style={Real.center}>
                <Text style={Real.textreal}>
                    REAL-TIME TRANSCRIPTION
                </Text>
          </View>
        </TouchableOpacity>

      </View>
  )}}