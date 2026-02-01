import React, { Component } from 'react';
import { View, Text, TouchableOpacity, ImageBackground, Modal, TextInput, ScrollView, StyleSheet, Keyboard, Image ,ActivityIndicator, KeyboardAvoidingView } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Homelayout from '../../layouts/Homelayout';
import ModalLayout from '../../layouts/ModalLayout';
import RectButton from '../buttons/RectButton';
import Tts from "react-native-tts";
// import { PowerTranslator, ProviderTypes, TranslatorConfiguration, TranslatorFactory } from 'react-native-power-translator';
import config from '../../../config.json';
const base_url = config.base_url;
import { connect,useDispatch } from 'react-redux';
import { WebView } from 'react-native-webview';
import { fetchData } from '../../actions/expressions';
import { Picker } from '@react-native-picker/picker';
import { reaadText2, readText2, stopAudio, togglePausePlay } from '../../utils/request';
import { Dropdown } from 'react-native-element-dropdown';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { RadioButton } from 'react-native-paper'; 

class ReadText extends Component {
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
      selectedGender:'male',
      isPlaying: false,
      isTogglePlaying:false,
      isPlayingTrad:false,
      isTogglePlayingTrad:false,
      isLoadingAudio: false,
      isLoadingTradAudio: false,
      voiceType:'male'
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
    // if(this.state.selectedText && this.state.changed){
    //   // this.setState({
    //   //   selectedTrad:this.state.selectedText
    //   // });
    //   // this.handleTranslate(this.state.langue);
      
    // }
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
    alert(itemValue);
    // if (itemValue != '') {

    //   this.setState({ picIdlangue: itemValue });
    //   // // console.log(this.state.expres+'_%_'+itemValue.substring(0,2));
    //   // TranslatorConfiguration.setConfig(ProviderTypes.Google, config.googleCloud.apiKey, itemValue.substring(0, 2));
    //   // // config.googleCloud.apiKey
    //   // const translator = TranslatorFactory.createTranslator();
    //   // translator.translate(this.state.selectedText).then(translated => {
    //   //   Tts.setDefaultLanguage(itemValue);
    //   //   Tts.speak(translated);
    //   //   this.setState({ selectedTrad: translated })
    //   // });
    // } else {
    //   alert('This option is not available');
    // }
  }

  readText = async (phrase, langue) => {
    // alert('reading');
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
        this.readText(targTEXT, langue);
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
  }
  getLanguageCode = (languageCode) => {
    if(languageCode === 'en'){
      return 'fr-FR';
    }else{
      return 'en-US';
    }
    // Diviser le code de langue sur le tiret et récupérer la première partie
  };

  handleGenderSelect = (gender) => {
    this.setState({ selectedGender: gender });
    };
    handleToggle = () => {
    const isNowPlaying = togglePausePlay();
    this.setState({ isTogglePlaying: isNowPlaying });
    };
    handleStop = () => {   
        stopAudio();
        this.setState({ 
            isPlaying: false, 
            isTogglePlaying: false,
            isPlayingTrad: false,
            isTogglePlayingTrad: false
         })
     }

setPlayingStatus = ({ isLoading, isPlaying }) => {
    this.setState({
        isLoadingAudio: isLoading,
        isPlaying,
        isTogglePlaying: isPlaying,
    });
};
setPlayingStatusTrad = ({ isLoading, isPlaying }) => {
    this.setState({
        isLoadingTradAudio: isLoading,
        isPlayingTrad:isPlaying,
        isTogglePlayingTrad: isPlaying,
    });
};
handlePlay = () => {
  alert("playing");
    if (this.state.isLoadingAudio) return;
    readText2(this.state.selectedText, this.setPlayingStatus, this.state.langue, this.state.voiceType, this.state.voiceSpeed);
};
handlePlayTrad = () => {
    if (this.state.isLoadingTradAudio) return;
    readText2(this.state.selectedTrad, this.setPlayingStatusTrad, this.state.langue, this.state.voiceType, this.state.voiceSpeed);
};
  setPlaying = (playing) => {
    this.setState({ isPlaying: playing,isTogglePlaying: playing });
  };
  setPlayingTrad = (playing) => {
    this.setState({
        isPlayingTrad: playing,
        isTogglePlayingTrad: playing,
    });
};

  render() {
    const {trad, langue, selectedGender} = this.state; 
    const {userInfo, selectedText, selectedTrad, selectedId, category, selectedLangue } = this.props;
    const imageSource = this.state.langue !== 'en-US' ? require('../../image/en.png') : require('../../image/fr.png');
    const imageTrans = this.state.langue === 'en-US' ? require('../../image/en.png') : require('../../image/fr.png');
    const languageShortCode = this.getLanguageCode(selectedLangue);
     const voiceOptions = [
  {
    label: 'Male',
    value: 'male',
    icon: 'face-man' // voix masculine
  },
  {
    label: 'Female',
    value: 'female',
    icon: 'face-woman' // voix féminine (plus neutre/élégante)
  }
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
    <Modal animationType="slide" visible={this.props.visible}>
      <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      // keyboardVerticalOffset={80} // Décalage si tu as un header ou un footer
    >
        <ModalLayout navigation={this.props.navigation}>
        <View style={{ width: wp('100%'), backgroundColor: '#192356', paddingBottom: hp('10%') }}>
            <ScrollView 
            style={{ flex: 1 }}
    // contentContainerStyle={{ flexGrow: 1 }}
            contentContainerStyle={{ flexGrow: 1, paddingBottom: 100 }} keyboardShouldPersistTaps="handled">
            <View style={{ justifyContent: 'center', height: hp('8.5%'), flexDirection: 'row', alignItems: 'center', alignSelf:'flex-start', marginLeft: wp('5%'), marginTop: 10 }}>
                <TouchableOpacity onPress={() => { 
                  this.props.onClose(); 
                  // Tts.stop(); 
                  }}>
                <Icon name="arrow-back-outline" size={25} color="white" />
                </TouchableOpacity>
                <Text style={{ color: 'white', marginLeft: 10, fontSize: hp('2.2%') }}>Listen To your Text</Text>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 20 }}>
              <Text style={{ color: 'white', fontSize: 14 }}>YOUR TEXT</Text>
            </View>
            <View
              style={{
                backgroundColor:'#07072fff',
                width:wp('90%'),
                marginLeft:wp('4.5%'), 
                flexDirection:'row',
                alignItems:'flex-start',
                justifyContent:'space-around',
                padding:10,
                shadowOpacity:1,
                shadowColor:'#1b1b50ff',
                marginTop:30,
                borderRadius:5
              }}
            >
              <Text style={{ marginLeft: 5, color:'white', fontSize:14, fontWeight:'bold' }}>Voice:</Text>
              <View
                style={{ 
                  flexDirection: 'row',
                  justifyContent: 'space-evenly',
                  alignItems: 'center'
                }}
              >
                <View style={{ justifyContent: 'space-evenly', alignItems: 'flex-start' }}>
                  {voiceOptions.map((item, index) => (
                    <TouchableOpacity
                      key={index}
                      style={{ flexDirection: 'row', alignItems: 'center', marginHorizontal: 5 }}
                      onPress={() => this.setState({ voiceType: item.value })}
                    >
                      <RadioButton
                        value={item.value}
                        status={this.state.voiceType === item.value ? 'checked' : 'unchecked'}
                        onPress={() => this.setState({ voiceType: item.value })}
                      />
                      <Text style={{ marginLeft: 5, color:'white' }}>{item.label}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
              <Dropdown
                style={{ 
                  marginRight: 5, 
                  color:'white', 
                  fontSize:14, 
                  fontWeight:'bold',
                  width:wp('30%') ,
                  borderWidth:1,
                  borderColor:'white',
                  padding:10,
                  borderRadius:5

                }}
                data={[
                  { label: 'Slow', value: 0.6 },
                  { label: 'Normal', value: 1.0 },
                ]}
                labelField="label"
                valueField="value"
                placeholder="Speed"
                value={this.state.voiceSpeed}
                onChange={item => this.setState({ voiceSpeed: item.value })}
                renderCustomizedButtonChild={() => {
                  const selected = [{ label: 'Slow', value: 0.6 }, { label: 'Normal', value: 1.0 }, { label: 'Fast', value: 1.5 }]
                    .find(opt => opt.value === this.state.voiceSpeed);
                  return selected ? (
                    <Text style={styles.selectedTextStyle}>{selected.label}</Text>
                  ) : (
                    <Text style={styles.placeholderStyle}>Speed</Text>
                  );
                }}
                renderItem={({ label }) => (
                  <View style={styles.dropdownItem}>
                    <Text style={styles.dropdownItemText}>{label}</Text>
                  </View>
                )}
                textStyle={styles.textDropdown}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
              />
            </View>
            <View style={{ 
              flexDirection: 'row', 
              alignSelf:'flex-end', 
              marginRight: 20, 
              backgroundColor:'#07072fff',
              width:wp('90%'),
              justifyContent:'flex-end'
              }}
            >
              {this.state.isLoadingAudio ? (
                  <ActivityIndicator size="small" color="#4CAF50" />
              ) : !this.state.isPlaying ? (
                  <TouchableOpacity onPress={this.handlePlay} style={{ marginHorizontal: 5 }}>
                      <Icon name="volume-medium-outline" size={25} color="#EA1E69" style={{ alignSelf: 'flex-end', marginLeft: 5 }} />
                  </TouchableOpacity>
              ) : (
                  <>
                      <TouchableOpacity
                          onPress={() => {
                              stopAudio();
                              this.setState({ isPlaying: false, isTogglePlaying: false });
                          }}
                          style={{ marginHorizontal: 5 }}
                      >
                          <Icon
                              name="volume-mute-outline"
                              size={25}
                              color="#FFFFFF"
                              style={{ alignSelf: 'flex-end', marginLeft: 5 }}
                          />

                      </TouchableOpacity>
                  </>
              )}
            </View>
            <View style={{ 
              backgroundColor: 'white', 
              borderRadius: 5, 
              padding: 10,
              width:wp('90%'),
              alignSelf:'center',
              marginTop:15 
              }}>
                <TextInput
                style={styles.textInput}
                value={this.state.selectedText}
                onChangeText={(text) => this.setState({ selectedText: text })}
                multiline
                />
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 20, paddingHorizontal: 20 }}>
                <Text style={{ color: 'white', fontSize: 14 }}>TRANSLATION</Text>
            </View>
            <View
              style={{
                backgroundColor:'#07072fff',
                width:wp('90%'),
                marginLeft:wp('4.5%'), 
                flexDirection:'row',
                alignItems:'flex-start',
                justifyContent:'space-around',
                padding:10,
                shadowOpacity:1,
                shadowColor:'#1b1b50ff',
                marginTop:30,
                borderRadius:5
              }}
            >
              <Text style={{ marginLeft: 5, color:'white', fontSize:14, fontWeight:'bold' }}>Voice:</Text>
              <View
              style={{ 
                flexDirection: 'row',
                justifyContent: 'space-evenly',
                alignItems: 'center',
                // backgroundColor:'red'
                }}>
                  <View style={{ justifyContent: 'space-evenly', alignItems: 'flex-start' }}>
                    {voiceOptions.map((item, index) => (
                      <TouchableOpacity
                        key={index}
                        style={{ flexDirection: 'row', alignItems: 'center', marginHorizontal: 5 }}
                        onPress={() => this.setState({ voiceType: item.value })}
                      >
                        <RadioButton
                          value={item.value}
                          status={this.state.voiceType === item.value ? 'checked' : 'unchecked'}
                          onPress={() => this.setState({ voiceType: item.value })}
                        />
                        <Text style={{ marginLeft: 5, color:'white' }}>{item.label}</Text>
                      </TouchableOpacity>
                    ))}
                  </View>
              </View>
              <Dropdown
                style={{ 
                  marginRight: 5, 
                  color:'white', 
                  fontSize:14, 
                  fontWeight:'bold',
                  width:wp('30%') ,
                  borderWidth:1,
                  borderColor:'white',
                  padding:10,
                  borderRadius:5
                }}
                data={[
                  { label: 'Slow', value: 0.6 },
                  { label: 'Normal', value: 1.0 },
                ]}
                labelField="label"
                valueField="value"
                placeholder="Speed"
                value={this.state.voiceSpeed}
                onChange={item => this.setState({ voiceSpeed: item.value })}
                renderCustomizedButtonChild={() => {
                  const selected = [{ label: 'Slow', value: 0.6 }, { label: 'Normal', value: 1.0 }, { label: 'Fast', value: 1.5 }]
                    .find(opt => opt.value === this.state.voiceSpeed);
                  return selected ? (
                    <Text style={styles.selectedTextStyle}>{selected.label}</Text>
                  ) : (
                    <Text style={styles.placeholderStyle}>Speed</Text>
                  );
                }}
                renderItem={({ label }) => (
                  <View style={styles.dropdownItem}>
                    <Text style={styles.dropdownItemText}>{label}</Text>
                  </View>
                )}
                textStyle={styles.textDropdown}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
              />
            </View>
            <View style={{ 
              flexDirection: 'row', 
              alignSelf:'flex-end', 
              marginRight: 20, 
              // marginBottom: 10,
              backgroundColor:'#07072fff',
              width:wp('90%'),
              justifyContent:'flex-end'
              }}
            >
              {this.state.isLoadingTradAudio ? (
                  <ActivityIndicator size="small" color="#4CAF50" />
              ) : !this.state.isPlayingTrad ? (
                  <TouchableOpacity onPress={this.handlePlayTrad} style={{ marginHorizontal: 5 }}>
                      <Icon name="volume-medium-outline" size={25} color="#EA1E69" style={{ alignSelf: 'flex-end', marginLeft: 5 }} />
                  </TouchableOpacity>
              ) : (
                  <>
                      <TouchableOpacity
                          onPress={() => {
                              stopAudio();
                              this.setState({ isPlayingTrad: false, isTogglePlayingTrad: false });
                          }}
                          style={{ marginHorizontal: 5 }}
                      >
                          <Icon
                              name="volume-mute-outline"
                              size={25}
                              color="#FFFFFF"
                              style={{ alignSelf: 'flex-end', marginLeft: 5 }}
                          />

                      </TouchableOpacity>
                  </>
              )}
            </View>
            <View style={{ backgroundColor: 'white', margin: 20, borderRadius: 5, padding: 10 }}>
                <TextInput
                style={styles.textInput}
                value={this.state.selectedTrad}
                onChangeText={(text) => this.setState({ selectedTrad: text })}
                multiline
                />
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginTop: 20 }}>
                <RectButton
                onPress={() => { this.props.onClose(); this.handleStop(); }}
                text="CLOSE"
                backgroundColor="#EA1E69"
                />
            </View>
            </ScrollView>
        </View>
        </ModalLayout>

    </KeyboardAvoidingView>
    </Modal>
    );
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    dispatchfetchData:id => dispatch(fetchData(id))
  };
};

export default connect(null, mapDispatchToProps )(ReadText);

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
  dropdown2: {
    height: 50,
    width: '40%',
    backgroundColor: 'transparent',
    borderRadius: 8,
    paddingHorizontal: 8,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    // alignSelf: 'center',
  },
  dropdownItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    alignItems: 'center',
    flexDirection: 'row',
  },
  dropdownItemText: {
    fontSize: 16,
    color: '#333',
  },
  textDropdown: {
    fontSize: 16,
    color: 'white',
  },
  placeholderStyle: {
    fontSize: 16,
    color: '#999',
  },
  selectedTextStyle: {
    fontSize: 16,
    color: 'white',
  },
  dropdown: {
    height: 50,
    width: '80%',
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingHorizontal: 8,
    marginVertical: 10,
    alignSelf: 'center',
  },


});