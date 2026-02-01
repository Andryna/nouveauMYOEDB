import React, { Component } from 'react';
import { View, Text, TouchableOpacity, ImageBackground, Modal, TextInput, ScrollView, StyleSheet, Keyboard, Image  } from 'react-native';
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
import { WebView } from 'react-native-webview';
import { fetchData } from '../../actions/expressions';
import { Picker } from '@react-native-picker/picker';
import { reaadText2, readText2, stopAudio, togglePausePlay } from '../../utils/request';
class ShowText extends Component {
  constructor(props) {
    super(props);
    this.state = {
      trad:false,
      langue:this.props.selectedLangue,
      selectedText: '',
      selectedTrad: '',
      isKeyboardOpen:false,
      changed:false,
      selectedCategory:'',
      // Vos états
    };
  }

  componentDidMount(){
    // Tts.addEventListener('tts-start', this.onTtsStart);
    // Tts.addEventListener('tts-finish', this.onTtsFinish);
    // Tts.addEventListener('tts-cancel', this.onTtsCancel);
    // Tts.addEventListener('tts-error', this.onTtsError);
    this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this._keyboardDidShow);
    // Ajouter un écouteur pour détecter quand le clavier est fermé
    this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this._keyboardDidHide);
    // alert(config.googleCloud.apiKey);
    // const {userInfo} = this.props;
    // console.log(userInfo.id);
  }
  componentDidUpdate(prevProps) {
    // Vérifier si le Modal est devenu visible pour la première fois
    if (!prevProps.visible && this.props.visible) {
      // Appeler la fonction de détection de l'ouverture du Modal depuis les props
      this.setState({
        selectedText:this.props.selectedText,
        selectedTrad:this.props.selectedTrad,
        selectedCategory:this.props.selectedCat,
        langue: this.getLanguageCode(this.props.selectedLangue)
      });
      console.log(this.props.category);
      // alert(this.props.visible);
    }
  }
  componentWillUnmount() {
    this.keyboardDidShowListener.remove();
    this.keyboardDidHideListener.remove();
    // Supprimer les gestionnaires d'événements
    // if (this.ttsStartListener) {
    //   this.ttsStartListener.remove();
    // }
    // if (this.ttsFinishListener) {
    //   this.ttsFinishListener.remove();
    // }
    // if (this.ttsCancelListener) {
    //   this.ttsCancelListener.remove();
    // }
    
  }
  _keyboardDidShow = () => {
    this.setState({ isKeyboardOpen: true, changed:false });
    console.log('Clavier ouvert', 'Le clavier est maintenant ouvert.');
  };

  // Fonction appelée lorsque le clavier est fermé
  _keyboardDidHide = () => {
    this.setState({ 
      isKeyboardOpen: false,
      
    });
    console.log('Clavier fermé', 'Le clavier est maintenant fermé.');
    if(this.state.selectedText && this.state.changed){
      // this.setState({
      //   selectedTrad:this.state.selectedText
      // });
      this.handleTranslate(this.state.langue);
      
    }
  };

  onTtsStart = (event) => {
    console.log('TTS Start', event);
  };

  onTtsFinish = (event) => {
    console.log('TTS Finish', event);
  };

  onTtsCancel = (event) => {
    console.log('TTS Cancel', event);
  };

  handleTranslate = (itemValue) => {
    if (itemValue != '') {

      this.setState({ picIdlangue: itemValue });
      // console.log(this.state.expres+'_%_'+itemValue.substring(0,2));
      TranslatorConfiguration.setConfig(ProviderTypes.Google, config.googleCloud.apiKey, itemValue.substring(0, 2));
      // config.googleCloud.apiKey
      const translator = TranslatorFactory.createTranslator();
      translator.translate(this.state.selectedText).then(translated => {
        // Tts.setDefaultLanguage(itemValue);
        // Tts.speak(translated);
        this.setState({ selectedTrad: translated })
      });
    } else {
      alert('This option is not available');
    }
  }
  readText = async (phrase, langue) => {
    stopAudio();
    // langue ici doit correspondre au code OpenAI, ex: 'fr' ou 'en'
    try {
      await readText2(
        phrase,
        ({ isLoading, isPlaying }) => {
          // Tu peux mettre à jour ton state ou loader
          this.setState({ isLoading, isPlaying });
        },
        langue,       // fr / en
        'female',     // ou 'male'
        1.0           // vitesse
      );
    } catch (e) {
      console.error('Erreur readText:', e);
    }
  };
  speakTxt = async () => {
    const { langue, expres } = this.state;
  
    if (!expres) return;
  
    // Exemple : inverser langue si besoin
    if (langue === 'en-US') {
      this.readText(expres, 'fr'); // phrase en anglais → TTS français
    } else {
      this.readText(expres, 'en'); // phrase en français → TTS anglais
    }
  };
  
    // speakTxt = async () => {
    //   const {langue, expres} = this.state;
    //   if(langue == 'en-US'){
    //     this.readText(expres, 'fr-FR');
    //   }else{
    //     this.readText(expres, 'en-US');
    //   }
    // }
    speakTrad = async () => {
      const {langue, targTEXT} = this.state;
      // alert(targTEXT);
      // alert(langue);
        this.readText(targTEXT);
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

  handleTextChange = (text) => {
    this.setState({ 
      selectedText: text,
      changed:true 
    });
    console.log(this.state.selectedText);
  };
  handleTextTrans = (text) => {
    this.setState({ selectedTrad: text, changed:true });
  };

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
  saveEdit(){
    const {userInfo,selectedId, origin_table} = this.props;
    const {selectedText, selectedTrad,selectedCategory, changed} = this.state;
    // alert(userInfo.id);
   if(changed){
     console.log(userInfo.id);
     console.log(selectedId);
     console.log(selectedText);
     console.log(selectedTrad);
     const selectedObject = {
       id: userInfo.id,
       idexp: selectedId,
       expres: selectedText,
       traduction: selectedTrad,
       idecat:selectedCategory
     };
     console.log(JSON.stringify(
       {
       id: userInfo.id,
       idexp: selectedId,
       expres: selectedText,
       traduction: selectedTrad,
       idecat:selectedCategory
       }
     ));
 
     if(origin_table == 'expression_stagiaire'){
      this.setState({ ActivityIndicator_Loading: true }, () => {
        fetch(base_url + '/portail-stagiaire/update.php',
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
                idexp: selectedId,
                expres: selectedText,
                traduction: selectedTrad,
                idecat:selectedCategory
                }
              )
          }).then((response) => response.json()).then((reponse) => {
            console.log(reponse);
           //  alert('saved');
             this.props.dispatchfetchData(userInfo.id)
             .then(() => {
             this.props.save();
           //    // alert('saved');
            })
          }).catch((error) => {
            console.error(error);
            this.setState({ ActivityIndicator_Loading: false });
          });
      });
    }else{
      this.setState({ ActivityIndicator_Loading: true }, () => {
        fetch(base_url + '/portail-stagiaire/updateRec.php',
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
                idexp: selectedId,
                expres: selectedText,
                traduction: selectedTrad,
                idecat:selectedCategory
                }
              )
          }).then((response) => response.json()).then((reponse) => {
            console.log(reponse);
           //  alert('saved');
             this.props.dispatchfetchData(userInfo.id)
             .then(() => {
             this.props.save();
           //    // alert('saved');
            })
          }).catch((error) => {
            console.error(error);
            this.setState({ ActivityIndicator_Loading: false });
          });
      });
    }

   }
  }
  handleValueChange = (itemValue, itemIndex) => {
    // alert(itemValue);
    this.setState({ selectedCategory: itemValue, changed:true });
    const {userInfo,selectedId} = this.props;
    const {selectedText, selectedTrad} = this.state;
    // alert(userInfo.id);
    console.log(userInfo.id);
    console.log(selectedId);
    console.log(selectedText);
    console.log(selectedTrad);
    // alert(itemValue);
    // Vous pouvez ajouter d'autres logiques ici si nécessaire
  };

  cancel(){
    this.props.onClose();
    this.setState({targTEXT:'', expres:''});
    // Tts.stop();
    stopAudio();
  }
  getLanguageCode = (languageCode) => {
    if(languageCode === 'en'){
      return 'fr-FR';
    }else{
      return 'en-US';
    }
    // Diviser le code de langue sur le tiret et récupérer la première partie
  };
  render() {
    const {trad, langue} = this.state; 
    const {userInfo, selectedText, selectedTrad, selectedId, category, selectedLangue } = this.props;
    const imageSource = this.state.langue !== 'en-US' ? require('../../image/en.png') : require('../../image/fr.png');
    const imageTrans = this.state.langue === 'en-US' ? require('../../image/en.png') : require('../../image/fr.png');
    const languageShortCode = this.getLanguageCode(selectedLangue);
    const voiceOptions = [
      { label: 'Male Voice', value: 'male' },
      { label: 'Female Voice', value: 'female' }
    ];

    const myIframeHTML = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <style>
        body {
          font-size: 14px;
          margin: 0;
          padding: 0;
        }
  
        iframe {
          width: 100%;
          height: 100vh;
          border: none;
        }
      </style>
      <title>IFrame Page</title>
    </head>

    <body>
     
      <iframe src="https://elprod.forma2plus.com/`+this.props.transjitsi+`" frameborder="0"></iframe>
    </body>
    </html>
  `;
    return (
      <Modal
        animationType="slide"
        visible={this.props.visible}
        // visible={true}
      >
        <ModalLayout navigation={this.props.navigation}>
        <View style={{ width: wp('100%'), backgroundColor:'#192356', paddingBottom:hp('10%') }}>
          <ScrollView style={{width: wp('100%'), borderRadius: 15 }}>
            <View style={{}}>
              <View style={{ justifyContent: 'center', height: hp('8.5%'), width: wp('100%')}}>
                <View style={{ height: hp('4%'), width: wp('100%'), flexDirection: 'row', justifyContent: 'space-between',paddingLeft:15 }}>
                  <TouchableOpacity
                    onPress={() => {
                      this.props.onClose(),
                      // Tts.stop(),
                      stopAudio(),
                      this.setState({targTEXT:'', expres:'', changed:false})
                    }}
                  > 
                    <View style={{ flexDirection: 'row' }}>
                      <Icon name="arrow-back-outline" size={25} color="white" style={{ alignSelf: 'center', marginLeft: 5 }} />
                      <Text style={{ color: 'white', marginLeft: wp('18%'), fontSize: hp('2.2%') }}>
                        Transcription
                      </Text>
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
              
              {selectedText === 'texte transcripted by Open AI API' && this.props.transjitsi ?( 
              <View style={{backgroundColor:'#020D4D', height:hp('50%'), padding:15, marginBottom:30, marginTop:3, borderRadius:5, overflow: 'scroll' }}>
                {/* <Text style={{color:'white'}}>{this.props.transjitsi}</Text> */}
                <WebView
                  source={{ html: myIframeHTML }}
                  scrollEnabled={true} 
                  style={{ flex: 1 }}
                />
              </View>):
              (
              
              <View>
                
                <View style={{ height: 35, width: wp('90%'), alignSelf: 'center', flexDirection: 'row', justifyContent: 'space-around', marginTop: hp('3%')}}>
                  <TouchableOpacity onPress={() => { this.handleTranslate(this.state.langue) }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', height: 35, paddingLeft: 15, paddingRight: 15, borderRadius: 15, justifyContent: 'center' }}>
                      <Text style={{ marginHorizontal: wp('3%'), marginVertical: hp('0.5%'), fontWeight: '400', fontSize: 14, textAlign: 'center', opacity: 1, color:'white' }}>
                        {languageShortCode == 'en-US' ? "FRENCH":"ENGLISH"}
                      </Text>
                      <Image style={{width:25, height:20, borderRadius:2}} source={imageSource}  />
                      {/* <Image style={styles.flag} source={require('../image/drapeau-france.jpg')} /> */}
                    </View>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={{ backgroundColor: '#3498F0', padding: 5, justifyContent: 'center', borderRadius: 10 }}
                    onPress={this.handleLanguageChange}
                  >
                    <Icon name="swap-horizontal-outline" size={30} color="white" />
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => { this.handleTranslate(this.state.langue) }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', height: 35, paddingLeft: 15, paddingRight: 15, borderRadius: 15, justifyContent: 'center' }}>
                      <Text style={{ marginHorizontal: wp('3%'), marginVertical: hp('0.5%'), fontWeight: '400', fontSize: 14, textAlign: 'center', opacity:1, color:'white' }}>
                      {languageShortCode !== 'en-US' ? "FRENCH":"ENGLISH"}
                      </Text>
                      <Image style={{width:25, height:20,borderRadius:2}} source={imageTrans} />
                    </View>
                  </TouchableOpacity>
                </View>
                
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignSelf: 'center', width: wp('90%'), marginTop: 15}}>
                <Text style={{ color: 'white', fontSize: 14 }}>YOUR TEXT</Text>
                <TouchableOpacity onPress={() => this.readText(this.state.selectedText)} style={{ width: wp('20%') }}>
                  <Icon name="volume-medium-outline" size={25} color="#EA1E69" style={{ alignSelf: 'flex-end', marginLeft: 5 }} />
                </TouchableOpacity>
              </View>
              <View style={{ backgroundColor: 'white', width: wp('90%'), alignSelf: 'center', borderRadius: 5, padding:10 }}>
                <TextInput
                  style={styles.textInput}
                  value={this.state.selectedText}
                  onChangeText={this.handleTextChange}
                  multiline={true}
                />
              </View>
              
              <View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignSelf: 'center', width: wp('90%'), marginTop: 15 }}>
                  <Text style={{ color: 'white', fontSize: 14 }}>TRANSLATION</Text>
                  <TouchableOpacity onPress={() => this.readText(this.state.selectedTrad)} style={{ width: wp('20%') }}>
                    <Icon name="volume-medium-outline" size={25} color="#EA1E69" style={{ alignSelf: 'flex-end', marginLeft: 5 }} />
                  </TouchableOpacity>
                </View>
                <View style={{ backgroundColor: 'white', width: wp('90%'), alignSelf: 'center', borderRadius: 5, padding:10 }}>
                  {/* <TextInput ref={input => { this.textInput = input }} value={selectedTrad} style={{ width: wp('90%') }} placeholderTextColor={'grey'} multiline={true} onChangeText={targTEXT => this.setState({ targTEXT })} /> */}
                {/* <Text style={{ textAlign: 'justify', fontSize:14 }}>
                    {this.state.selectedTrad} {this.props.transjitsi} 
                </Text> */}
                <TextInput
                  style={styles.textInput}
                  value={this.state.selectedTrad}
                  onChangeText={this.handleTextTrans}
                  multiline={true}
                />
                </View>
              </View>
              </View>)
              }


              <Text style={{color:'white', alignSelf:'center', marginTop:15, fontSize:16}}>Category</Text>
              <View style={styles.selectContainer}>
                <Picker
                selectedValue={this.state.selectedCategory}
                onValueChange={this.handleValueChange}
                itemStyle={styles.pickerItems}
                >
                {category.map(cat => (
                  <Picker.Item key={cat.id} label={cat.intitule} value={cat.id} style={{backgroundColor: 'green', color: 'white'}}  />
                ))}
                </Picker>
              </View>
              {/* {this.state.changed?( */}
              <View
                style={{
                  flexDirection:'row',
                  justifyContent:'space-around'
                }}
              >
                <RectButton
                onPress={() => {
                  this.cancel()
                }}
                text="CANCEL"
                backgroundColor="#EA1E69"
                />
                <RectButton
                  onPress={() => {
                    this.props.onClose(),
                    // Tts.stop(),
                    stopAudio(),
                    // alert(this.state.selectedText),
                    this.saveEdit(),
                    // alert(this.state.selectedTrad),
                    this.setState({selectedText:'', selectedTrad:'', changed:false})
                }}
                text="SAVE"
                backgroundColor="#3498F0"
                />
              </View>
            </View>
          </ScrollView>
        </View>
        </ModalLayout>
      </Modal>
    );
  }
}
// const mapStateToProps = (state) => ({
//   category: state.categ.category
// });
const mapDispatchToProps = (dispatch) => {
  return {
    dispatchfetchData:id => dispatch(fetchData(id))
  };
};

export default connect(null, mapDispatchToProps )(ShowText);

const styles = StyleSheet.create({
  textInput: {
    textAlign: 'justify',
    fontSize: 14,
    width: '100%',
    // borderColor: 'gray',
    // borderWidth: 1,
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
    // borderWidth:1,
    // borderColor:'white',
    borderRadius:5
  },
  pickerItems: {
    fontSize: 16,
    backgroundColor:'transparent',
    color: 'white', // Texte en blanc
    height: hp('20%'),
  },
});