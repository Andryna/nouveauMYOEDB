import React, {Component} from 'react';
import {Image,View,TouchableOpacity,ScrollView,Text,TextInput,FlatList} from 'react-native';  
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import Rec from '../statics/styles/styleRecord';
import Langliste from './compo/langliste'
import Icon from 'react-native-vector-icons/Ionicons';

export default class SettingRecord extends React.Component{
    constructor (props) {
        super(props)
        this.state = {
            idLan:''
        }
    }
    handleTranslate = (itemValue) => {
        if(itemValue!=''){
          
          this.setState({picIdlangue:itemValue});
          // console.log(this.state.expres+'_%_'+itemValue.substring(0,2));
          TranslatorConfiguration.setConfig(ProviderTypes.Google, 'AIzaSyBZZC103oLC2F1dGoJRpYNJnaEM--nMEXg',itemValue.substring(0,2));
          
          const translator = TranslatorFactory.createTranslator();
          translator.translate(this.state.expres).then(translated => {
                Tts.setDefaultLanguage(itemValue);
                  Tts.speak(translated);
                  this. setState({targTEXT:translated})
          });
         }else {
           alert('This option is not available');
         }
      
                      // this.setState({submit: true})
                      // const translator = TranslatorFactory.createTranslator();
                      // translator.translate(text).then(translated => {
                      //     Tts.getInitStatus().then(() => {
                      //         // Tts.speak(translated);
                      //         this. setState({targTEXT:translated,expres:text})
                      //     });
                      //     Tts.stop();
        // });
      }
    LangView=(id,intitule,index,abrev)=>{
        const {idLan}=this.state;
        let colors = ['#FFE9F9', '#EAF9FE', '#FFF5E5', '#FBF5FF','#FFF1EF','#A2A2A2'];
        if (id!== ''){
    if (idLan==id){
      return(
        <TouchableOpacity
        onPress={()=>{this.setState({idLan:''},this.handleTranslate(abrev))}}>
                        <View style={{flexDirection:'row',alignItems:'center',backgroundColor:'#DBDDDC',borderWidth:0.5,borderRadius:20,justifyContent:'center'}}>
                                                              <Text style={{
                                                                marginHorizontal:wp('3%'),
                                                                marginVertical:hp('0.5%'),
                                                                fontWeight:'100',
                                                                textAlign:'center',
                                                                opacity:0.5
                                                              }}>
                                                                {intitule}
                                                              </Text>
                                                              <View
                                                              style={{
                                                                width:wp('4.5%'),
                                                                height:hp('2.5%'),
                                                                borderRadius:30,
                                                                position:'absolute',
                                                                right:0,
                                                                top:hp('-1%')
                                                              }}>
                                                                <Image style={{
                                                  width:wp('4.5%'),
                                                  height:hp('2.5%'),
                                                }}
                                                            source={require('../statics/image/Check-category.png')}>
                                                </Image>
    
                                                              </View>
                                                          
                                                            {/* {this.contentView(item.id_expression,item.content_langue_origine,item.content_langue_cible,item.audio_langue_origine,item.intitule,item.date_creation,item.f_name,item.type_file,item.legende_f)}          */}
                        </View>
      </TouchableOpacity>
                                                          
                                                          
      );
    }
    else{
      return(
        <TouchableOpacity
        // style={{
        //   backgroundColor:'red'
        // }}
        onPress={()=>{this.setState({idLan:id}),this.handleTranslate(abrev)}}>
                        <View style={{alignItems:'center',borderWidth:0.5,borderRadius:20,justifyContent:'flex-start'}}>
                                                              <View
                                                              style={{
                                                                backgroundColor:colors[index % colors.length],
                                                                borderRadius:20 
                                                              }}>
                                                              <Text style={{
                                                                marginHorizontal:wp('3%'),
                                                                marginVertical:hp('0.5%'),
                                                                fontWeight:'100',
                                                                textAlign:'center',
                                                                opacity:0.5
                                                              }}>
                                                                {intitule}
                                                              </Text>
                                                              </View>
                                                            {/* {this.contentView(item.id_expression,item.content_langue_origine,item.content_langue_cible,item.audio_langue_origine,item.intitule,item.date_creation,item.f_name,item.type_file,item.legende_f)}          */}
                        </View>
      </TouchableOpacity>
                                                          
                                                          
      );
    }
          
          
        
        }
        
          
      }
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
        <View style={Rec.liste}>
                 <Langliste/>
        </View>
                <View>
                            <FlatList     
                                        data={this.props.lang}
                                        extraData={this.state}
                                        keyExtractor={(item)=>item.id}
                                        // refreshing={this.state.refreshing}
                                        // horizontal={true}
                                        // numColumns={3}
                                        // onRefresh={this.handleRefresh}
                                        enableEmptySections={true}
                                        // renderSeparator= {this.ListViewItemSeparator}
                                        renderItem={({item,index})=>
                                        <View style={{flexDirection:'row',justifyContent:'center',marginRight:wp('2%'),height:hp('10%'),
                                        paddingBottom:hp('1%')}}>
                                        {this.LangView(item.id,item.intitule,index,item.abrev)}
                                        </View>
                                        }
                            />
                </View>
      </View>
  )}}