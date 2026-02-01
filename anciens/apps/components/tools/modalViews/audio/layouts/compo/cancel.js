import React, {Component} from 'react';
import {Image,View,TouchableOpacity,ScrollView,Text,TextInput} from 'react-native';  
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import Rec from '../../statics/styles/styleRecord';
import Icon from 'react-native-vector-icons/Ionicons';

export default class Cancel extends React.Component{

render()
{return(
      <View style={Rec.CancelView}>
        <TouchableOpacity
        onPress={this.props.record}
        // style={Rec.center}
        >
          <View style={Rec.center}>
                <Text style={Rec.CancelText}>
                    CANCEL
                </Text>
          </View>
        </TouchableOpacity>

      </View>
  )}}