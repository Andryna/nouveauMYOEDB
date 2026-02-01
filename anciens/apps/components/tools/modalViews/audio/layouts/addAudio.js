import React,{Component} from 'react';
import {Image,View,TouchableOpacity,ScrollView,Text,TextInput} from 'react-native';  
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import Add from '../statics/styles/styleAdd';
import Icon from 'react-native-vector-icons/Ionicons';
import Record from './record';
import RealTime from './realTime'
import Cancel from './compo/cancel'
import SettingRecord from './settingRecord'
import Main from '../statics/styles/main';
export default class AddAudio extends Component{
    constructor (props) {
        super(props)
        this.state = {
            open: false,   
            record:false,  
        }
    }
    openSearch(login) {
        // const login=this.props.datas.login;
        alert(login);
      }
      opendetails = () =>{
        this.props.opendetails()
    }
render()
{return(
<ScrollView 
style={Add.container}
>
        <View style={Add.modalView}>
                        <View style={Add.titleContainer}>
                                        <View style={Add.column}>
                                                  <Text style={Add.title1}>
                                                    Add
                                                  </Text>
                                                  <View style={Add.line}/>
                                        </View>
                                        <Text style={Add.title2}>
                                          new audio 
                                        </Text>
                        </View>
                        {this.state.record?(<View>
                                        <Record record={()=>this.openSearch()}/>
                                        <RealTime record={()=>this.openSearch(this.props.datas.log)}/>
                                        <Cancel record={()=>this.opendetails()}/>
                                        

                        </View>):(<SettingRecord lang={
                          this.props.datas.lang
                        }/>)}
        </View>

</ScrollView>   )}}