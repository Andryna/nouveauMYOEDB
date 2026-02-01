import React, { Component } from 'react';
import { View, Text, TouchableOpacity, ImageBackground, Modal, TextInput, ScrollView } from 'react-native';
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

class ShowEditText extends Component {
  constructor(props) {
    super(props);
    this.state = {
      trad:false,
      langue:'en-US',
      textValue:this.props.selectedText || ''
      
      // Vos états
    };
  }

  componentDidMount(){
    // alert(config.googleCloud.apiKey);
    // const {userInfo} = this.props;
    // console.log(userInfo.id);
    // this.setState({expres:this.props.selectedText});
  }
//   handleTranslate = (itemValue) => {
//     if (itemValue != '') {

//       this.setState({ picIdlangue: itemValue });
      
//       // console.log(this.state.expres+'_%_'+itemValue.substring(0,2));
//       TranslatorConfiguration.setConfig(ProviderTypes.Google, config.googleCloud.apiKey, itemValue.substring(0, 2));
//       // config.googleCloud.apiKey
//       const translator = TranslatorFactory.createTranslator();
//       translator.translate(this.props.selectedText).then(translated => {
//         Tts.setDefaultLanguage(itemValue);
//         Tts.speak(translated);
//         this.setState({ targTEXT: translated })
//       });
//     } else {
//       alert('This option is not available');
//     }
//   }
  readText = async (phrase, langue) => {
    Tts.setDefaultLanguage(langue);
    Tts.stop();
    Tts.speak(phrase);
  };

  speakTxt = async (txt) => {
    const {langue, expres} = this.state;
    if(langue == 'en-US'){
      this.readText(txt, 'fr-FR');
    }else{
      this.readText(txt, 'en-US');
    }
  }
  speakTrad = async (trad) => {
    const {langue, targTEXT} = this.state;
    // alert(targTEXT);
    // alert(langue);
      this.readText(trad, langue);
  }

  saveTEXT = () => {
    const { idL } = this.state;
    const { pic } = this.state;
    const { expres } = this.state;
    const { id } = this.state;
    const { targTEXT } = this.state;
    const { userInfo } = this.props;
    
    console.log(idL + ' ' + ' ' + pic + ' ' + expres + ' ' + id + ' ' + targTEXT + '' + this.state.pic);
    // console.log('groupe', id_groupe);

    

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

            // this.props.dispatchfetchData(userInfo.id);
            // this.getData();
            // this.setState({ ActivityIndicator_Loading: false, targTEXT: '', expres: '', pic: '' });
          }).catch((error) => {
            console.error(error);
            this.setState({ ActivityIndicator_Loading: false });
          });
      });
  }

  render() {
    const {trad} = this.state; 
    const {userInfo, selectedText, selectedTrad} = this.props;
    return (
      <Modal
        animationType="slide"
        visible={this.props.visible}
        // visible={true}
      >
        <ModalLayout navigation={this.props.navigation}>
          {/* <Text>test</Text> */}
        <View style={{ width: wp('100%'), backgroundColor:'#192356', paddingBottom:hp('10%') }}>
          <ScrollView style={{width: wp('100%'), borderRadius: 15 }}>
            <View style={{}}>
              <View style={{ justifyContent: 'center', height: hp('8.5%'), width: wp('100%')}}>
                <View style={{ height: hp('4%'), width: wp('100%'), flexDirection: 'row', justifyContent: 'space-between',paddingLeft:15 }}>
                  <TouchableOpacity
                    onPress={() => {
                      this.props.onClose(),
                      this.setState({targTEXT:'', expres:''})

                    }}
                  >
                    <View style={{ flexDirection: 'row' }}>
                      <Icon name="arrow-back-outline" size={25} color="white" style={{ alignSelf: 'center', marginLeft: 5 }} />
                      <Text style={{ color: 'white', marginLeft: wp('18%'), fontSize: hp('2.2%') }}>
                        MY EXPRESSION DETAILS
                      </Text>
                    </View>
                  </TouchableOpacity>
                  
                </View>
              </View>
              <View style={{ height: 35, width: wp('90%'), alignSelf: 'center', flexDirection: 'row', justifyContent: 'space-around', marginTop: hp('3%') }}>
                <TouchableOpacity onPress={() => { this.props.handleTranslate(this.state.langue) }}>
                  <View style={{ flexDirection: 'row', alignItems: 'center', height: 35, paddingLeft: 15, paddingRight: 15, borderRadius: 15, justifyContent: 'center' }}>
                    <Text style={{ marginHorizontal: wp('3%'), marginVertical: hp('0.5%'), fontWeight: '400', fontSize: 14, textAlign: 'center', opacity: 1, color:'white' }}>
                      {this.state.langue == 'en-US' ? "FRANÇAIS":"ANGLAIS"}
                    </Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{ backgroundColor: '#3498F0', padding: 5, justifyContent: 'center', borderRadius: 10 }}
                  onPress={() => this.setState((prevState) => ({ langue: prevState.langue === 'fr-FR' ? 'en-US' : 'fr-FR' }))}
                >
                  <Icon name="swap-horizontal-outline" size={30} color="white" />
                </TouchableOpacity>

                <TouchableOpacity onPress={() => { this.props.handleTranslate(this.state.langue) }}>
                  <View style={{ flexDirection: 'row', alignItems: 'center', height: 35, paddingLeft: 15, paddingRight: 15, borderRadius: 15, justifyContent: 'center' }}>
                    <Text style={{ marginHorizontal: wp('3%'), marginVertical: hp('0.5%'), fontWeight: '400', fontSize: 14, textAlign: 'center', opacity:1, color:'white' }}>
                    {this.state.langue !== 'en-US' ? "FRANÇAIS":"ANGLAIS"}
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignSelf: 'center', width: wp('90%'), marginTop: 15}}>
                <Text style={{ color: 'white', fontSize: 14 }}>VOTRE TEXTE</Text>
                <TouchableOpacity onPress={() => this.speakTxt(selectedText)} style={{ width: wp('20%') }}>
                  <Icon name="volume-medium-outline" size={25} color="#EA1E69" style={{ alignSelf: 'flex-end', marginLeft: 5 }} />
                </TouchableOpacity>
              </View>
              <View style={{ backgroundColor: 'white', width: wp('90%'), alignSelf: 'center', borderRadius: 5, padding:10 }}>
              {/* <Text style={{ textAlign: 'justify', fontSize:14 }}>
                {selectedText}
              </Text> */}
            <TextInput
                ref={input => { this.textInput = input }}
                value={this.props.selectedText}
                style={{ textAlign: 'justify' }}
                multiline={true}
                // onChangeText={expres => this.setState({ textValue: expres, trad: false })}
                onChangeText={(newText) => {
                    // Appeler la fonction passée en prop depuis le composant parent
                    this.setState({trad: true });
                    this.props.onChange(newText);
                  }}
            />


              </View>
              {this.props.trad?( 
             <RectButton
               onPress={() => 
                {this.setState({trad:true}),this.props.handleTranslate(this.state.langue)}
              }
              text="VOIR LA TRADUCTION"
              backgroundColor="#47BD7A"
              />):null}
              
              <View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignSelf: 'center', width: wp('90%'), marginTop: 15 }}>
                  <Text style={{ color: 'white', fontSize: 14 }}>TRADUCTION</Text>
                  <TouchableOpacity onPress={() => this.speakTrad(selectedTrad)} style={{ width: wp('20%') }}>
                    <Icon name="volume-medium-outline" size={25} color="#EA1E69" style={{ alignSelf: 'flex-end', marginLeft: 5 }} />
                  </TouchableOpacity>
                </View>
                {!this.props.trad?(<View style={{ backgroundColor: 'white', width: wp('90%'), alignSelf: 'center', borderRadius: 5, padding:10 }}>
                  {/* <TextInput ref={input => { this.textInput = input }} value={selectedTrad} style={{ width: wp('90%') }} placeholderTextColor={'grey'} multiline={true} onChangeText={targTEXT => this.setState({ targTEXT })} /> */}
                    <Text style={{ textAlign: 'justify', fontSize:14 }}>
                        {selectedTrad}
                    </Text>
                </View>):null}
              </View>
           


              {/* <TouchableOpacity onPress={() => { this.picId(this.state.picIdlangue), this.saveTEXT(), this.setState({ create: false, idLan: '', idecat: '', addcat: true }) }}>
                <View style={{ backgroundColor: '#EA1E69', width: wp('30%'), paddingLeft: 10, paddingRight: 10, height: 40, alignSelf: 'center', marginTop: hp('2%'), borderRadius: 5, justifyContent: 'center' }}>
                  <Text style={{ color: 'white', textAlign: 'center', fontSize: 14 }}>Enregistrer</Text>
                </View>
              </TouchableOpacity> */}
             
              <RectButton
               onPress={() => {
                this.saveTEXT()
                
              }}
              text="ENREGISTRER"
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

const mapDispatchToProps = (dispatch) => {
  return {
    dispatchfetchData:id => dispatch(fetchData(id))
  };
};

export default connect(null, mapDispatchToProps )(ShowEditText);
