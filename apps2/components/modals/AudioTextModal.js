import React, { Component } from 'react';
import { View, Text, TouchableOpacity, ImageBackground, Modal, TextInput, ScrollView, Image, StyleSheet, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Homelayout from '../../layouts/Homelayout';
import ModalLayout from '../../layouts/ModalLayout';
import RectButton from '../buttons/RectButton';
import Tts from "react-native-tts";
import { PowerTranslator, ProviderTypes, TranslatorConfiguration, TranslatorFactory } from 'react-native-power-translator';
import config from '../../../config.json';
const base_url = config.base_url;
import { connect,useDispatch } from 'react-redux';
import { fetchData } from '../../actions/expressions';
import { fetchAudio } from '../../actions/audio';
import moment from 'moment';
import I18n from 'react-native-i18n';
import en from '../../../i18/en';
import fr from '../../../i18/fr';
import es from '../../../i18/es';
import { getLanguageCode, getLanguageId} from '../../utils/All';
import { translateTexts, translate,  reaadText2, readText2, stopAudio, togglePausePlay } from '../../utils/request';
class AudioTextModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      trad:false,
      expres: props.defaultText || '',
      tosend: props.tosend || null,
      langue:'en-US',
      infolangue:this.props.infolangue ||  'en-US',
      isDropdownVisible: false,
      isDropdownVisibleOrig:false,
      original_langue: 'fr-FR',
      target_langue: 'en-US',
      saved:false
      // Vos états
    };
    I18n.locale = this.props.langMyoedb;
    I18n.fallbacks = true;
    I18n.translations = {
    en,
    fr,
    es
  };
  }

  componentDidMount(){
    // alert(config.googleCloud.apiKey);
    // const {userInfo} = this.props;
    // console.log(userInfo.id);
  }
  componentDidUpdate(prevProps) {
    if (this.props.defaultText !== prevProps.defaultText) {
      this.setState({ expres: this.props.defaultText });
    }
    if (this.props.tosend !== prevProps.tosend) {
      this.setState({ tosend: this.props.tosend });
    }
    if (this.state.tosend !== null) {
        console.log('Dans le modal 1: ' + JSON.stringify(this.state.tosend));
      }
    // Mettre à jour d'autres états en fonction des nouvelles props si nécessaire
  }
  save2 = async () => {
    this.setState({isLoading:true});
    const url = base_url + "/portail-stagiaire/saveaudio2.php";
    // const {audioFile,idecate,transaudio,targTEXT,id_groupe,duration}=this.state;
    const {tosend, target_langue}=this.state;
    const target_lang_id = getLanguageId(target_langue);
    let info = tosend.infolangue.substring(0, tosend.infolangue.length - 3);
    const {userInfo, category, selectedCategory, audioLegend} = this.props;
    const today = moment().format('D/M/YYYY'); 
    const formData = new FormData();
    formData.append('id_stag',tosend.id_stag);
    formData.append('targL',target_lang_id);
    formData.append('infolangue',tosend.infolangue);
    formData.append('idecate',selectedCategory);
    formData.append('id_groupe',tosend.id_groupe);
    formData.append('transaudio',this.state.expres);
    formData.append('targTEXT',this.state.targTEXT);
    formData.append('pathaudio',tosend.pathaudio);
    formData.append('duration',tosend.duration);
    formData.append('info',info);
    formData.append('platform','Android');
    formData.append('audiolegend','Audio of ' + today + ' : '+audioLegend);
    console.log("tosend ==> "+JSON.stringify(tosend));
    try {
            const response = await fetch(url, {
            method: 'POST',
            headers:
            {
              'Content-Type': 'multipart/form-data',
            },
            body: formData,
      }).then((response) => response.json())
                 .then((responseJson) => {
                            if(responseJson =='')
                            {
                              alert('no response');
                            }
                            else{
                              this.setState({isLoading:false,transcribed:false,showtxt:false, saved:true});
                              this.props.dispatchfetchAudio(tosend.id_stag)
                              .then(() => {
                                this.props.onClose();
                                alert('Audio saved');

                              });
                            }
                   })
       }catch (err) {
      console.log(err);
    }
  }
  
  handleTranslate = async (itemValue) => {
    if (itemValue != '') {
      this.setState({ picIdlangue: itemValue });
      const translated = await translateTexts(this.state.expres, itemValue);
        this.setState({ targTEXT: translated, trad:true })
    } else {
      alert('This option is not available');
    }
  }
  readText = async (phrase, langue) => {
    Tts.setDefaultLanguage(langue);
    Tts.stop();
    Tts.speak(phrase);
  };

  speakTxt = async () => {
    const {langue, expres, infolangue} = this.state;
    this.readText(expres, infolangue);
  }
  speakTrad = async () => {
    const {langue, targTEXT, infolangue, target_langue} = this.state;
    // alert(targTEXT);
    // alert(langue);
      this.readText(targTEXT, target_langue);
  }

  saveTEXT = () => {
    const { idL } = this.state;
    const { pic } = this.state;
    const { expres } = this.state;
    const { id } = this.state;
    const { targTEXT } = this.state;
    const { userInfo } = this.props;
    
    console.log(idL + ' ' + ' ' + pic + ' ' + expres + ' ' + id + ' ' + targTEXT + '' + this.state.pic);
      this.setState({ ActivityIndicator_Loading: true }, () => {
        fetch(base_url + '/portail-stagiaire/save2.php',
          {
            method: 'POST',
            headers:
            {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(
              {
                id: userInfo.id,
                expres: expres,
                traduction: targTEXT,
                PickerValueHolder: this.state.idL,
                id_groupe:userInfo.id_groupe
              })
          }).then((response) => response.json()).then((reponse) => {
            console.log(reponse);
            // alert('saved');
            this.props.dispatchfetchData(userInfo.id)
            .then(() => {
              this.props.save();
            })
          }).catch((error) => {
            console.error(error);
            this.setState({ ActivityIndicator_Loading: false });
          });
      });
  }

  handleLanguageChange = () => {
    this.setState(
      (prevState) => ({
        langue: prevState.langue === 'fr-FR' ? 'en-US' : 'fr-FR'
      }),
      () => {
        // Appelé après que l'état ait été mis à jour
        this.handleTranslate(this.state.langue);
      }
    );
  };
  toggleDropdown = () => {
    this.setState(prevState => ({ isDropdownVisible: !prevState.isDropdownVisible }));
  };
  toggleDropdownOrig = () => {
    this.setState(prevState => ({ isDropdownVisibleOrig: !prevState.isDropdownVisibleOrig }));
  };
  returnClose(){
    Alert.alert(
      `${I18n.t('Do you really want to exit without saving?')}`,
      `${I18n.t('Select NO or yes')}`,
      [
        { text: `${I18n.t('NO')}`, onPress: () =>{
          console.log('saving'),
          this.save2(),
          this.props.onClose()
          }
          },
        { text: `${I18n.t('YES')}`, onPress: () => 
          {this.props.onClose(), this.setState({targTEXT:'', expres:''})}
        },
      ]
    );
    
  }

  
  render() {
    const {trad,isKeyboardOpen, isDropdownVisible, isDropdownVisibleOrig, langue, target_langue} = this.state; 
    const {userInfo, category, selectedCategory, audioLegend, infolangue} = this.props;
    const langid = getLanguageId(target_langue);
    
          
     const imageSource = this.state.langue !== 'en-US' ? require('../../image/en.png') : require('../../image/fr.png');
    const imageTrans = this.state.langue === 'en-US' ? require('../../image/en.png') : require('../../image/fr.png');
    const languages = [
    { id: "1", code: 'en-US', label: 'ENGLISH', imageSource: require('../../image/en.png') },
    { id: "5", code: 'fr-FR', label: 'FRANÇAIS', imageSource: require('../../image/fr.png') },
    { id: "3", code: 'de-DE', label: 'DEUTSCH', imageSource: require('../../image/Germany.png') },
    { id: "4", code: 'es-ES', label: 'ESPAÑOL', imageSource: require('../../image/es.png') },
    { id: "6", code: 'pt-PT', label: 'PORTUGUÊS', imageSource: require('../../image/pt.png') },
    { id: "6", code: 'pt-BR', label: 'PORTUGUÊS (Brasil)', imageSource: require('../../image/brasil.jpeg') },
  ];

    const mylangue = target_langue === 'en'
      ? require('../../image/en.png')
      : langue === 'fr'
      ? require('../../image/fr.png')
      : require('../../image/en.png');
    
   const flagSourceOrigin = infolangue === 'en-US'
    ? require('../../image/en.png')
    : infolangue === 'fr-FR'
    ? require('../../image/fr.png')
    : infolangue === 'es-ES'
    ? require('../../image/es.png')
    : infolangue === 'de-DE'
    ? require('../../image/Germany.png')
    : infolangue === 'pt-PT' 
    ? require('../../image/pt.png')
    : infolangue === 'pt-BR'
    ? require('../../image/brasil.jpeg')
    : require('../../image/en.png');

    const flagSource =
  target_langue === 'en-US'
    ? require('../../image/en.png')
    : target_langue === 'fr-FR'
    ? require('../../image/fr.png')
    : target_langue === 'es-ES'
    ? require('../../image/es.png')
    : target_langue === 'de-DE'
    ? require('../../image/Germany.png')
    : target_langue === 'pt-BR'
    ? require('../../image/brasil.jpeg') // 🇧🇷 Drapeau du Brésil
    : target_langue === 'pt-PT'
    ? require('../../image/pt.png') // 🇵🇹 Drapeau du Portugal
    : require('../../image/en.png');

    const currentLanguage = languages.find(lang => lang.code === langue);
    const today = moment().format('D/M/YYYY'); 
    return (
      <Modal
        animationType="slide"
        visible={this.props.visible}
      >
        <ModalLayout navigation={this.props.navigation}>
          {/* <Text>test</Text> */}
        <View style={{ width: wp('100%'), backgroundColor:'#192356', paddingBottom:hp('10%') }}>
          <ScrollView style={{width: wp('100%'), borderRadius: 15 }}>
            <View style={{}}>
              <View style={{ justifyContent: 'center', height: hp('8.5%'), width: wp('100%')}}>
                <View style={{ height: hp('4%'), width: wp('100%'), flexDirection: 'row', justifyContent: 'space-between',paddingLeft:15 }}>
                  <TouchableOpacity
                    onPress={() =>this.returnClose()}
                  >
                    <View style={{ flexDirection: 'row' }}>
                      <Icon name="arrow-back-outline" size={25} color="white" style={{ alignSelf: 'center', marginLeft: 5 }} />
                      <Text style={{ color: 'white', marginLeft: wp('18%'), fontSize: hp('2.2%') }}>
                        TRANSCRIPTION 
                      </Text>
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
                  {/* <Text style={styles.selectorText}>Original language {infolangue}</Text> */}
              <View style={{ width: wp('90%'), alignSelf: 'center', marginTop: hp('3%'), alignItems:'center'}}>
                {/* <Text style={{color:'white'}}>test</Text> */}
                <TouchableOpacity onPress={this.toggleDropdownOrig} style={styles.selector}>
                  <Text style={styles.selectorText}>Original language</Text>
                  <Icon
                    name={isDropdownVisibleOrig ? "chevron-up" : "chevron-down"}
                    size={30}
                    color="#48A2F1"
                  />
                  <Image source={flagSourceOrigin} style={styles.flag} /> 
                </TouchableOpacity>
                {isDropdownVisibleOrig && (
                  <View style={styles.dropdown}>
                    {languages.map((language) => (
                      <TouchableOpacity key={language.code} onPress={() => this.setState({infolangue:language.code, isDropdownVisibleOrig:false})}>
                        <View style={styles.languageOption}>
                          <Text style={styles.languageLabel}>{language.label}</Text>
                          <Image style={styles.languageImage} source={language.imageSource} />
                        </View>
                      </TouchableOpacity>
                    ))}
                  </View>
                )}
              </View>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignSelf: 'center', width: wp('90%'), marginTop: hp('5%') }}>
                <Text style={{ color: 'white', fontSize: 14 }}>YOUR SPEECH</Text>
                <TouchableOpacity onPress={() => this.speakTxt()} style={{ width: wp('20%') }}>
                  <Icon name="volume-medium-outline" size={25} color="#EA1E69" style={{ alignSelf: 'flex-end', marginLeft: 5 }} />
                </TouchableOpacity>
              </View>
              <View style={{ backgroundColor: 'white', width: wp('90%'), alignSelf: 'center', borderRadius: 5 , padding: 5}}>
                <TextInput ref={input => { this.textInput = input }} style={{ width: wp('90%'), color:'black' }} value={this.state.expres} multiline={true} onChangeText={expres => {this.setState({ expres, trad:true }), this.handleTranslate(this.state.target_langue)} } />               
              </View>
              <View style={{ width: wp('90%'), alignSelf: 'center', justifyContent: 'space-around', marginTop: hp('3%')}}>
                {/* <Text style={{color:'white'}}>test</Text> */}
                <TouchableOpacity onPress={this.toggleDropdown} style={styles.selector}>
                  <Text style={styles.selectorText}>Translate to </Text>
                  <Icon
                    name={isDropdownVisible ? "chevron-up" : "chevron-down"}
                    size={30}
                    color="#48A2F1"
                  />
                  <Image source={flagSource} style={styles.flag} /> 
                </TouchableOpacity>
                {isDropdownVisible && (
                  <View style={styles.dropdown}>
                    {languages.map((language) => (
                      <TouchableOpacity key={language.code} onPress={() => {this.setState({target_langue:language.code, isDropdownVisible:false, trad:true}), this.handleTranslate(language.code)}}>
                        <View style={styles.languageOption}>
                          <Text style={styles.languageLabel}>{language.label}</Text>
                          <Image style={styles.languageImage} source={language.imageSource} />
                        </View>
                      </TouchableOpacity>
                    ))}
                  </View>
                )}
                
              </View>


              {trad?
              (
              <View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignSelf: 'center', width: wp('90%'), marginTop: hp('5%') }}>
                  <Text style={{ color: 'white', fontSize: 14 }}>TRANSLATION</Text>
                  <TouchableOpacity onPress={() => this.speakTrad()} style={{ width: wp('20%') }}>
                    <Icon name="volume-medium-outline" size={25} color="#EA1E69" style={{ alignSelf: 'flex-end', marginLeft: 5 }} />
                  </TouchableOpacity>
                </View>
                <View style={{ backgroundColor: 'white', width: wp('90%'), alignSelf: 'center', borderRadius: 5 , padding: 5}}>
                  <TextInput ref={input => { this.textInput = input }} style={{ width: wp('90%'), color:'black' }} placeholderTextColor={'grey'} multiline={true} value={this.state.targTEXT} onChangeText={targTEXT => this.setState({ targTEXT })} />
                </View>
              </View>
              ):null
              }
              <RectButton
               onPress={() => {
                this.save2()
                
              }}
              text="SAVE"
              backgroundColor="#3498F0"
              />
            </View>
          </ScrollView>
        </View>
        </ModalLayout>
      </Modal>
    );
  }
}


const styles = StyleSheet.create({
  textInput: {
    textAlign: 'justify',
    fontSize: 14,
    width: '100%',
    padding: 8,
    color:'black'
  },
  selectContainer: {
    marginTop:15,
    marginBottom:15,
    width:'70%',
    backgroundColor:'transparent',
    alignSelf:'center',
    color:'white',
    borderRadius:5
  },
  selectorText:{
    color:'white',
    fontWeight:'bold', 
    fontSize:16, 
    marginBottom:15, 
    marginTop:10, 
    textAlign:'center'
  },
  selector:{
    flexDirection:'row',
    justifyContent:'center',
    alignItems:'center'
  },
  languageImage:{
    position:'absolute',
    right:5,
    alignSelf:'center',
    width:25,
    height:20, 
    borderRadius:2
  },
  languageLabel:{
    color:'blue',
    marginRight:15,
  },
  dropdown:{
    alignSelf:'center', 
    backgroundColor:'white', 
    padding:10, 
    borderRadius:10,
    marginBottom:15,
    minWidth:wp('40%')
  },
  flag: {
    marginLeft:5,
    right: 5,
    width: 20,
    height: 15,
    borderRadius: 2,
  },
  languageOption:{
    flexDirection:'row',
    padding:10,
    borderTopWidth:1,
    borderColor:'grey'
    
  },
  pickerItems: {
    fontSize: 16,
    backgroundColor:'transparent',
    color: 'white', // Texte en blanc
    height: hp('20%'),
  },
});
const mapStateToProps = (state) => ({
  langMyoedb: state.trand.langMyoedb
});
const mapDispatchToProps = (dispatch) => {
  return {
    dispatchfetchData:id => dispatch(fetchData(id)),
    dispatchfetchAudio:id => dispatch(fetchAudio(id))
  };
};

export default connect(null, mapDispatchToProps )(AudioTextModal);
