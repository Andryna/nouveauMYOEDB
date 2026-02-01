import React, { Component } from 'react';
import { View, Text, TouchableOpacity, ImageBackground, Modal, TextInput, ScrollView, StyleSheet, Keyboard, Image,FlatList } from 'react-native';
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
import { getStats } from '../../utils/request';
import { details } from '../../../styles/styleAcuueil';
import BoxStats from '../buttons/BoxStats';
import { getLanguageCode } from '../../utils/All';
import DynamicList from '../list/DynamicList';
import { sendMessageToChatGPT } from '../../utils/request';
import JsonDisplay from '../list/JsonDisplay';
import BulletList from '../list/BulletList';
import text from '../text';
class ShowText extends Component {
  constructor(props) {
    super(props);
    this.state = {
      trad:false,
      langue:'en-US',
      selectedText: '',
      selectedTrad: '',
      isKeyboardOpen:false,
      changed:false,
      selectedCategory:'',
      MYstats:null,
      isDropdownVisible:false,
      selectedFlag: this.props.target_langue_cible,
      target_langue_cible: this.props.target_langue_cible,
      dynamicListTitle: "", // Titre de la liste affichée
      dynamicListItems: [], // Contenu de la liste affichée
      isDynamicListVisible: false, 
      message: '',
      // "I’m really interested in what happens with the voice, with the body, to inhabit these different parts of a person’s style,” said Holliday, who has also researched Barack Obama’s speaking style. “Politicians are the best people to study this on because you know what their motivations are — they’re all trying to get elected, or they’re trying to get money, or they’re trying to get voters."`,
      chatHistory: [],
      isLoading: false,
      analyse:[],
      new: {},
      expressions:{},
      langDetected:{},
      chatResult:{},
      isLoading:false

      // Vos états
    };
  }
  showDynamicList = (title, items) => {
    // alert(title);
    this.setState({
      dynamicListTitle: title,
      dynamicListItems: items,
      isDynamicListVisible: true,
    });
  };
  componentDidUpdate(prevProps) {
    // Vérifier si le Modal est devenu visible pour la première fois

    const {l, selectedText, selectedTrad,langue, target_langue_cible} = this.props;
    const target_langue = getLanguageCode(target_langue_cible);
    const origL = this.completLang(langue);
    // alert(origL);
    if (!prevProps.visible && this.props.visible) {
      // Appeler la fonction de détection de l'ouverture du Modal depuis les props
      this.setState({
        selectedText:this.props.selectedText,
        selectedTrad:this.props.selectedTrad,
        selectedCategory:this.props.selectedCat,
        // classification thematique
        message: `Identifiez les expressions présentes dans ce texte, listez-les, puis classez-les selon leur nature ou leur fonction, met côte à cote avec leur traduction, la langue d'origine est '`+ origL+`' et la traduction est en '`+target_langue+`, voici le texte :

      "`+this.props.selectedText+`"`
      })
      // alert(this.props.visible);
    }
    this.fetchStats();
    
  }
  completLang(lang){
    if (lang === 'en') {
     return  'en-US'; // Anglais
    } else if (lang === 'fr') {
      return  'fr-FR'; // Français
    } else if (lang === 'de') {
      return  'de-DE'; // Allemand
    } else if (lang === 'es') {
      return  'es-ES'; // Espagnol
    } else {
      // Langue non reconnue : par défaut en anglais
      // alert("Langue non prise en charge, lecture en anglais par défaut.");
      return  'en-US';
    }
  }
  async fetchStats() {
    try {
      const {l, selectedText, selectedTrad} = this.props;
      if (l === 'fr' && selectedText !== null && selectedTrad !== null) {
        const rep = await getStats(selectedTrad);
        this.setState({ MYstats: rep });
        // console.log(rep);
      } else if (l === 'en' && selectedText !== null && selectedTrad !== null) {
        const rep = await getStats(selectedText);
        this.setState({ MYstats: rep });
        // console.log(rep);
      }else{
        try {
          const translatedText = await this.handleTxtTranslate('en', selectedText);
          const rep = await getStats(translatedText);
          this.setState({ MYstats: rep });
          // console.log(rep);
        } catch (error) {
          this.setState({
            MYstats:null
          });
          // console.error('Error during translation or stats retrieval:', error);
        }
        
      }



     
      // Utilisez `rep` ici comme nécessaire
    } catch (error) {
      // Gérez l'erreur ici
      console.error(error);
    }
  }

  componentDidMount(){
    Tts.addEventListener('tts-finish', this.onTtsFinish);
    this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this._keyboardDidShow);
    // Ajouter un écouteur pour détecter quand le clavier est fermé
    this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this._keyboardDidHide);
   
    // alert(config.googleCloud.apiKey);
    const {userInfo, category} = this.props;
    // console.log('category texte: ', category);
  }
  componentWillUnmount() {
    // Supprimer les écouteurs du clavier lors du démontage du composant
    this.keyboardDidShowListener.remove();
    this.keyboardDidHideListener.remove();
      // Nettoie les écouteurs pour éviter les fuites mémoire
      
      // if (Tts.removeEventListener) {
      //   Tts.removeEventListener('tts-finish', this.onTtsFinish);
      // }
  }
  onTtsFinish = () => {
    this.setState({ speaking: false, speakingtrad: false });
  };
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
    if(this.state.selectedText){
      // this.setState({
      //   selectedTrad:this.state.selectedText
      // });
      this.handleTranslate(this.state.langue);
    }
  };
  handleTxtTranslate = async (language, text) => {
    if (language !== '' && text !== '') {
      TranslatorConfiguration.setConfig(ProviderTypes.Google, config.googleCloud.apiKey, language);
      const translator = TranslatorFactory.createTranslator();
  
      try {
        const translated = await translator.translate(text);
        return translated; // Return the translated text
      } catch (error) {
        console.error('Translation error:', error);
        return '';
      }
    } else {
      // alert('Language or text is missing.');
      return '';
    }
  };
  
  // handleTranslate = (itemValue) => {
  //   if (itemValue != '') {

  //     this.setState({ picIdlangue: itemValue });
  //     // console.log(this.state.expres+'_%_'+itemValue.substring(0,2));
  //     TranslatorConfiguration.setConfig(ProviderTypes.Google, config.googleCloud.apiKey, itemValue.substring(0, 2));
  //     // config.googleCloud.apiKey
  //     const translator = TranslatorFactory.createTranslator();
  //     translator.translate(this.state.selectedText).then(translated => {
  //       Tts.setDefaultLanguage(itemValue);
  //       // Tts.speak(translated);
  //       this.setState({ selectedTrad: translated })
  //     });
  //   } else {
  //     alert('This option is not available');
  //   }
  // }
  
  handleTranslate = (itemValue) => {
    // alert(itemValue);
    const languages = [
      { id: "1", code: 'en-US', label: 'ENGLISH', imageSource: require('../../image/en.png') },
      { id: "5", code: 'fr-FR', label: 'FRENCH', imageSource: require('../../image/fr.png') },
      { id: "7", code: 'de-DE', label: 'ALLEMAND', imageSource: require('../../image/Germany.png') },
      { id: "4", code: 'es-ES', label: 'SPANISH', imageSource: require('../../image/es.png') },
    ];
    
    if (!itemValue) {
      alert('This option is not available');
      return;
    }
    
    // Recherche de la langue sélectionnée
    const selectedLanguage = languages.find(language => language.code === itemValue);
    if (!selectedLanguage) {
      console.log('Invalid language selection');
      return;
    }
    
    const { id: target_langue_cible, imageSource: flagSource } = selectedLanguage;
    this.props.updateText(target_langue_cible);
    
  
    // Mise à jour de la configuration du traducteur
    TranslatorConfiguration.setConfig(
      ProviderTypes.Google,
      config.googleCloud.apiKey,
      itemValue.substring(0, 2)
    );
  
    const translator = TranslatorFactory.createTranslator();
  
    // Traduction et mise à jour de l'état
    translator.translate(this.state.selectedText).then(translated => {
      this.setState({
        picIdlangue: itemValue,
        selectedFlag: flagSource,
        target_langue_cible,
        selectedTrad: translated,
        trad: translated,
        isDropdownVisible: false,
      });
    }).catch(error => {
      console.error('Translation failed:', error);
    });
  };
  



  readText = async (phrase, langue) => {
    Tts.setDefaultLanguage(langue);
    Tts.stop();
    Tts.speak(phrase);
  };

  speakTxt = async (txt) => {
    const { langue, expres } = this.state;
    // alert(this.props.langue);
  
    // Vérification des codes de langue
    if (this.props.langue === 'en') {
      this.readText(txt, 'en-US'); // Anglais
    } else if (this.props.langue === 'fr') {
      this.readText(txt, 'fr-FR'); // Français
    } else if (this.props.langue === 'de') {
      this.readText(txt, 'de-DE'); // Allemand
    } else if (this.props.langue === 'es') {
      this.readText(txt, 'es-ES'); // Espagnol
    } else {
      // Langue non reconnue : par défaut en anglais
      // alert("Langue non prise en charge, lecture en anglais par défaut.");
      this.readText(txt, 'en-US');
    }
  };
  
  speakTrad = async (trad) => {
    const {langue, targTEXT} = this.state;
    const target_langue = getLanguageCode(this.props.target_langue_cible);
    // alert(targTEXT);
    // alert(target_langue);
      this.readText(trad, target_langue);
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
            // this.props.dispatchfetchData(userInfo.id)
            // .then(() => {
              this.props.save()
              .then(() => {
                alert('saved');
              });

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
    this.setState({ selectedTrad: text });
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
    const {userInfo,selectedId} = this.props;
    const {selectedText, selectedTrad,selectedCategory, target_langue_cible} = this.state;
    // alert(userInfo.id);
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
                idecat:selectedCategory,
                PickerValueHolder: target_langue_cible
                }
              )
          }).then((response) => response.json()).then((reponse) => {
            console.log(reponse);
            // alert('saved');
            this.props.dispatchfetchData(userInfo.id)
            .then(() => {
              this.props.save();
              // alert('saved');
            })
          }).catch((error) => {
            console.error(error);
            this.setState({ ActivityIndicator_Loading: false });
          });
      });
  }
  handleValueChange = (itemValue, itemIndex) => {
    this.setState({ selectedCategory: itemValue });
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
  
  toggleDropdown = () => {
    this.setState(prevState => ({ isDropdownVisible: !prevState.isDropdownVisible }));
  };

  handleSendMessage = async () => {
    const { message } = this.state;
    
    // Vérification de l'entrée utilisateur
    console.log('Message envoyé par l\'utilisateur:', message);
    
    // Affiche une alerte pour tester si la fonction est appelée
    // alert('Fonction handleSendMessage déclenchée');
  
    // Empêche l'envoi d'un message vide
    if (!message.trim()) {
      console.log('Le message est vide, aucune action effectuée.');
      return;
    }
  
    // Activer l'indicateur de chargement
    this.setState({ isLoading: true });
  
    try {
      // Appel de la fonction réutilisable pour envoyer le message
      const chatResponse = await sendMessageToChatGPT(
        message
      );
      let parsedResult = [];
      parsedResult = JSON.parse(chatResponse);
      // Afficher la réponse reçue de l'API OpenAI
      console.log(parsedResult);
  
      // Ajouter les messages à l'historique du chat
      this.setState(
        prevState => ({
          chatHistory: [
            ...prevState.chatHistory,
            { role: 'user', content: message }, 
            { role: 'assistant', content: chatResponse },
          ],
          analyse: chatResponse,
          expressions: parsedResult.expressions,
          new: parsedResult.nature_ou_fonction,
          chatResult: parsedResult.nature_ou_fonction,
          langDetected:parsedResult.langues
        }),
        () => {
          console.log('Historique des messages mis à jour:');
          console.log(parsedResult.nature_ou_fonction);
        }
      );
      

  
      // Afficher l'historique mis à jour
      // console.log('Historique des messages:',this.state.analyse);
    } catch (error) {
      // Gérer et afficher l'erreur dans la console
      console.error('Erreur lors de l\'envoi du message à ChatGPT:', error);
    } finally {
      // Désactiver l'indicateur de chargement
      this.setState({ isLoading: false });
    }
  };
  render() {
    const {trad, isDropdownVisible, analyse, langDetected, isLoading , chatResult} = this.state; 

  
    const { nature_ou_fonction } = analyse;

    const {userInfo, selectedText, selectedTrad, selectedId, category, l, langue, target_langue_cible } = this.props;
    const imageSource = this.state.langue !== 'en-US' ? require('../../image/en.png') : require('../../image/fr.png');
    const imageTrans = this.state.langue === 'en-US' ? require('../../image/en.png') : require('../../image/fr.png');
    const {MYstats } = this.state;
    const target_langue = getLanguageCode(target_langue_cible);
    const origL = this.completLang(langue);
    const flagSourceOrigin = langue === 'en'
    ? require('../../image/en.png')
    : langue === 'fr'
    ? require('../../image/fr.png')
    : langue === 'es'
    ? require('../../image/es.png')
    : langue === 'de'
    ? require('../../image/Germany.png')
    : require('../../image/en.png');
    const flagSource = target_langue === 'en-US'
    ? require('../../image/en.png')
    : target_langue === 'fr-FR'
    ? require('../../image/fr.png')
    : target_langue === 'es-ES'
    ? require('../../image/es.png')
    : target_langue === 'de-DE'
    ? require('../../image/Germany.png')
    : require('../../image/en.png');
    const languages = [
      { id: "1", code: 'en-US', label: 'ENGLISH', imageSource: require('../../image/en.png') },
      { id: "5", code: 'fr-FR', label: 'FRENCH', imageSource: require('../../image/fr.png') },
      { id: "7", code: 'de-DE', label: 'ALLEMAND', imageSource: require('../../image/Germany.png') },
      { id: "4", code: 'es-ES', label: 'SPANISH', imageSource: require('../../image/es.png') },
    ];

    let nbMots = "00"; // Valeur par défaut si stats_nbwords n'est pas trouvé
    let stats_signifiant = "00";
    let stats_debit = "0 w/m";
    let stats_duree = "00:00";
    let stats_nbverb = "00";
    let stats_nbadj = "00";
    let stats_nbact = "00";
    let stats_nbpass = "00";
    let adjectives = [];
    let verbs = [];
    let substantifs = [];
    let glossaireMot = null;
    let motsDifferents = null;
    let glossaire_signifiant = null;
    let motsSignificatifs = null;
    let phrase_active = null;
    let listePhrase_active = null;
    let phrase_passive = null;
    let listePhrase_passive = null;
    if (MYstats !== null) {
      nbMots = MYstats[1].stats_nbwords;
      stats_signifiant = MYstats[14].stats_signifiant;
      stats_debit = ((nbMots * 60) / this.state.durationInSeconds).toFixed(2);
      stats_nbverb = MYstats[4].stats_nbverb;
      stats_nbadj = MYstats[3].stats_nbadj;
      stats_nbact = MYstats[6].stats_nbact;
      stats_nbpass = MYstats[6].stats_nbpass;
      adjectives = MYstats.find(item => item.glossaire_adjectivs)?.glossaire_adjectivs || [];
      verbs = MYstats.find(item => item.glossaire_verbs)?.glossaire_verbs || [];
      substantifs = MYstats.find(item => item.glossaire_substantif)?.glossaire_substantif || [];
      glossaireMot = MYstats.find(item => item.glossaire_Mot)?.glossaire_Mot || {};
      motsDifferents = Object.entries(glossaireMot).map(
        ([mot, occurence]) => `${mot} (${occurence} occurrence${occurence > 1 ? 's' : ''})`
      );
      glossaire_signifiant = MYstats.find(item => item.glossaire_signifiant)?.glossaire_signifiant || {};
      motsSignificatifs = Object.entries(glossaire_signifiant).map(
        ([mot, occurence]) => `${mot} (${occurence} occurrence${occurence > 1 ? 's' : ''})`
      );
      phrase_active = MYstats.find(item => item.phrase_active)?.phrase_active || {};
      listePhrase_active = Object.entries(phrase_active).map(
        ([mot, occurence]) => `${mot} (${occurence} occurrence${occurence > 1 ? 's' : ''})`
      );
      phrase_passive = MYstats.find(item => item.phrase_passive)?.phrase_passive || {};
      listePhrase_passive = Object.entries(phrase_passive).map(
        ([mot, occurence]) => `${mot} (${occurence} occurrence${occurence > 1 ? 's' : ''})`
      );
    }

    const data = {
      expressions: [
        "I'm really interested in what happens with the voice",
        "with the body",
        "to inhabit these different parts of a person's style",
        "said Holliday",
        "who has also researched Barack Obama's speaking style",
        "Politicians are the best people to study this on",
        "because you know what their motivations are",
        "they're all trying to get elected",
        "or they're trying to get money",
        "or they're trying to get voters"
      ],
      nature_ou_fonction: {
        "pronom personnel": ["I'm", "they're", "they're", "they're", "their"],
        verbe: ["interested", "happens", "inhabit", "said", "researched", "are", "trying"],
        préposition: ["in", "with", "with", "of", "on", "to"],
        substantif: ["voice", "body", "parts", "person's", "style", "Holliday", "people"],
        adjectif: ["interested", "different", "best"],
        conjonction: ["and", "because", "or"],
        "groupe prénthétique": ["who has also researched Barack Obama's speaking style"]
      }
    };
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
                      Tts.stop(),
                      this.setState({targTEXT:'', speaking: false, speakingtrad:false,  expres:'', changed:false, analyse:{}})
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
                
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignSelf: 'center', width: wp('90%'), marginTop: 15}}>
                <Text style={{ color: 'white', fontSize: 14 }}>YOUR TEXT</Text>
                {this.state.speaking?
                (<TouchableOpacity onPress={() => {Tts.stop(), this.setState({speakingtrad:false, speaking:false})}} style={{ width: wp('20%') }}>
                  <Icon name="volume-mute-outline" size={25} color="white" style={{ alignSelf: 'flex-end', marginLeft: 5 }} />
                </TouchableOpacity>):
                (<TouchableOpacity onPress={() => {this.speakTxt(this.state.selectedText), this.setState({speaking:true, speakingtrad:false})}} style={{ width: wp('20%') }}>
                  <Icon name="volume-medium-outline" size={25} color="#EA1E69" style={{ alignSelf: 'flex-end', marginLeft: 5 }} />
                </TouchableOpacity>)}
              </View>
              <View style={{ backgroundColor: 'white', width: wp('90%'), alignSelf: 'center', borderRadius: 5, padding:10 }}>
                <TextInput
                  style={styles.textInput}
                  value={this.state.selectedText}
                  onChangeText={this.handleTextChange}
                  multiline={true}
                />
                <Image source={flagSourceOrigin} style={styles.flag} />
              </View>
              
              <TouchableOpacity onPress={this.toggleDropdown} style={[styles.selector, {justifyContent:'center', alignItems:'center'}]}>
                  <Text style={styles.selectorText}>Translate to</Text>
                  <Icon
                    name={isDropdownVisible ? "chevron-up" : "chevron-down"}
                    size={30}
                    color="#48A2F1"
                  />
                  <Image source={flagSource} style={[styles.flag, {position:'relative', marginLeft: 15, marginBottom:0}]} /> 
                </TouchableOpacity>

              {isDropdownVisible && (
                <View style={styles.dropdown}>
                  {languages.map((language) => (
                    <TouchableOpacity key={language.code} onPress={() => {this.setState({isDropdownVisible: false}), this.handleTranslate(language.code)}}>
                      <View style={styles.languageOption}>
                        <Text style={styles.languageLabel}>{language.label}</Text>
                        <Image style={styles.languageImage} source={language.imageSource} />
                      </View>
                    </TouchableOpacity>
                  ))}
                </View>
              )}



              <View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignSelf: 'center', width: wp('90%'), marginTop: 15 }}>
                  <Text style={{ color: 'white', fontSize: 14 }}>TRANSLATION</Text>
                  {this.state.speakingtrad?
                  (<TouchableOpacity onPress={() => {Tts.stop(), this.setState({speakingtrad:false, speaking:false})}} style={{ width: wp('20%') }}>
                  <Icon name="volume-mute-outline" size={25} color="white" style={{ alignSelf: 'flex-end', marginLeft: 5 }} />
                </TouchableOpacity>):
                  (<TouchableOpacity onPress={() => {this.speakTrad(this.state.selectedTrad), this.setState({speakingtrad:true, speaking:false})}} style={{ width: wp('20%') }}>
                  <Icon name="volume-medium-outline" size={25} color="#EA1E69" style={{ alignSelf: 'flex-end', marginLeft: 5 }} />
                </TouchableOpacity>)
                  
                  }
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
                <Image source={flagSource} style={styles.flag} />
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
                  <Picker.Item key={cat.id} label={cat.intitule} value={cat.id} style={{backgroundColor: '#192356', color: 'white'}}  />
                ))}
                </Picker>
              </View>
              {/* {this.state.changed?( */}
              
              {nbMots !== '00' && (langue == 'en' || target_langue == 'en-US')  ? (
                  <View>
                    <Text style={details.title1}>Analyse Lexicale  </Text>
                    <View style={{height: hp('50%')}}>
                      <View style={{flexDirection: 'row', justifyContent: 'space-around', width: wp('80%'), alignSelf: 'center'}}>
                        <BoxStats
                          nb1={nbMots}
                          onClick={() => this.showDynamicList("Mots differents", motsDifferents)}
                          label={"Mots"}
                          iconName="slideshow"
                          iconsProvider="MaterialIcons"
                          boxColor="#186189"
                          before={() => this.setState({beforeVideo: true})}
                          goToList={this.goToVideo}
                          create={() => { this.setState({newVideo: true}); this.props.closeAll(); }}
                        />
                        <BoxStats
                          nb1={stats_signifiant}
                          onClick={() => this.showDynamicList("Mots significatifs", motsSignificatifs)}
                          label={"Mots significatifs"}
                          iconName="slideshow"
                          iconsProvider="MaterialIcons"
                          boxColor="#186189"
                          before={() => this.setState({beforeVideo: true})}
                          goToList={this.goToVideo}
                          create={() => { this.setState({newVideo: true}); this.props.closeAll(); }}
                        />
                        <BoxStats
                          nb1={stats_nbverb}
                          onClick={() => this.showDynamicList("Verbs", verbs)}
                          label={"Verbes"}
                          iconName="slideshow"
                          iconsProvider="MaterialIcons"
                          boxColor="#18bd5a"
                          before={() => this.setState({beforeVideo: true})}
                          goToList={this.goToVideo}
                          create={() => { this.setState({newVideo: true}); this.props.closeAll(); }}
                        />
                        {/* <BoxStats
                          nb1={this.state.duration}
                          click={this.props.clickVideo}
                          label={"Durée"}
                          iconName="slideshow"
                          iconsProvider="MaterialIcons"
                          boxColor="#186189"
                          before={() => this.setState({beforeVideo: true})}
                          goToList={this.goToVideo}
                          create={() => { this.setState({newVideo: true}); this.props.closeAll(); }}
                        /> */}
                      </View>
                      <View style={{flexDirection: 'row', justifyContent: 'space-around', width: wp('80%'), alignSelf: 'center'}}>
                        <BoxStats
                          nb1={stats_nbadj}
                          onClick={() => this.showDynamicList("Adjectifs", adjectives)}
                          label={"Adjectifs"}
                          iconName="slideshow"
                          iconsProvider="MaterialIcons"
                          boxColor="#4d81fe"
                          before={() => this.setState({beforeVideo: true})}
                          goToList={this.goToVideo}
                          create={() => { this.setState({newVideo: true}); this.props.closeAll(); }}
                        />
                        <BoxStats
                          nb1={stats_nbact}
                          onClick={() => this.showDynamicList("Phrases actives", listePhrase_active)}
                          label={"Voix active"}
                          iconName="slideshow"
                          iconsProvider="MaterialIcons"
                          boxColor="#ed254e"
                          before={() => this.setState({beforeVideo: true})}
                          goToList={this.goToVideo}
                          create={() => { this.setState({newVideo: true}); this.props.closeAll(); }}
                        />
                        <BoxStats
                          nb1={stats_nbpass}
                          onClick={() => this.showDynamicList("Phrases Passives", listePhrase_passive)}
                          label={"Voix Passive"}
                          iconName="slideshow"
                          iconsProvider="MaterialIcons"
                          boxColor="#dd9e2e"
                          before={() => this.setState({beforeVideo: true})}
                          goToList={this.goToVideo}
                          create={() => { this.setState({newVideo: true}); this.props.closeAll(); }}
                        />
                      </View>
                      <View style={{flexDirection: 'row', justifyContent: 'space-around', width: wp('80%'), alignSelf: 'center'}}>
                        <BoxStats
                          nb1={stats_signifiant}
                          onClick={() => this.showDynamicList("Substantifs", substantifs)} // Gestion du clic
                          label={"Substantifs"}
                          iconName="slideshow"
                          iconsProvider="MaterialIcons"
                          boxColor="#186189"
                        />
                      </View>
                    </View>
                    {this.state.isDynamicListVisible && (
                        <DynamicList
                          title={this.state.dynamicListTitle}
                          items={this.state.dynamicListItems}
                        />
                      )}
                    {/* <DynamicList title="Adjectifs" items={adjectives} /> */}
                    {/* <DynamicList title="Verbes" items={verbs} />
                    <DynamicList title="Substantifs" items={substantifs} /> */}
                  </View>
                ) : null
              }


              <RectButton
                onPress={() => {
                  this.handleSendMessage()
              }}
              text="Analyse"
              backgroundColor="#3498F0"
              />
{/* 
          <TouchableOpacity style={styles.button} onPress={() => {
                  this.handleSendMessage()
              }}>
            <Icon name="ios-brain" size={28} color="white" />
            <Text style={styles.buttonText}>Analyser avec IA</Text>
          </TouchableOpacity> */}
              {/* <JsonDisplay data={this.state.analyse} /> */}
              {/* <BulletList data={this.state.analyse} /> */}
              {/* Affichage des expressions */}
              {/* <BulletList title="Expressions" data={data.expressions} /> */}
              
              {/* <Text style={{ color: 'white' }}>
                {this.state.analyse && Object.keys(this.state.analyse).length > 0 
                  ? `eto${JSON.stringify(this.state.analyse)}` 
                  : 'Aucun contenu disponible.'}
              </Text> */}

{              <View style={{marginTop:50, marginBottom:50}}>
                {isLoading ? (
                  <View style={{
                    backgroundColor: 'white',
                    width: wp('90%'),
                    alignSelf: 'center',
                    padding: 10,
                    borderRadius: 10,
                  }}>
                    <Text style={{ color: 'gray', textAlign: 'center' }}>
                      Chargement en cours...
                    </Text>
                  </View>
                ) : (
                  analyse && analyse.length > 0 ? (
                    <View style={{
                      backgroundColor: 'white',
                      width: wp('90%'),
                      alignSelf: 'center',
                      padding: 10,
                      borderRadius: 10,
                    }}>
                      <BulletList 
                        title="Expressions" 
                        data={this.state.expressions} 
                        langueOr={origL} 
                        langueCi={target_langue} 
                      />
                      <BulletList 
                        title="Verbs" 
                        data={chatResult.verbe} 
                        langueOr={origL} 
                        langueCi={target_langue} 
                      />
                      <BulletList 
                        title="Adjectives" 
                        data={chatResult.adjectif} 
                        langueOr={origL} 
                        langueCi={target_langue} 
                      />
                      {/* <BulletList 
                        title="personal pronouns" 
                        data={chatResult.pronom_personnel} 
                        langueOr={origL} 
                        langueCi={target_langue} 
                      /> */}
                      {/* <BulletList data={this.state.new} /> */}
                    </View>
                  ) : null
                )}
              </View>}





              <RectButton
                onPress={() => {
                  this.props.onClose(),
                  Tts.stop(),
                  // alert(this.state.selectedText),
                  this.saveEdit(),
                  // alert(this.state.selectedTrad),
                  this.setState({selectedText:'', selectedTrad:'', changed:false})
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
  button: {
    flexDirection: 'row',
    backgroundColor: '#4A90E2',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 25,
    alignItems: 'center',
    elevation: 3, // Ombre pour Android
    shadowColor: '#000', // Ombre pour iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    marginLeft: 10,
    fontWeight: 'bold',
  },
  categoryContainer: {
    marginBottom: 20,
    backgroundColor: '#ffffff',
    padding: 10,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  categoryTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  itemText: {
    fontSize: 16,
    color: '#555',
  },
  textInput: {
    textAlign: 'justify',
    fontSize: 14,
    width: '100%',
    // borderColor: 'gray',
    // borderWidth: 1,
    padding: 8,
    color:'black'
  },

  flag: {
    position: 'absolute',
    top: 5,
    right: 5,
    width: 20,
    height: 15,
    borderRadius: 2,
  },
  selectContainer: {
    marginTop:15,
    marginBottom:15,
    width:'70%',
    backgroundColor:'transparent',
    alignSelf:'center',
    color:'white',
    borderWidth:1,
    borderColor:'white',
    borderRadius:5
  },
  pickerItems: {
    fontSize: 16,
    color: 'transparent', // Texte en blanc
    height: 44,
  },
  textContainer:{
    backgroundColor:'white', 
    color:'black', 
    textAlign:'justify', 
    marginBottom:10, 
    paddingTop:25,
    padding:10, 
    borderRadius:5
  },
  row:{
    flexDirection:'row',
    justifyContent:'space-around'
  },
  languageOption:{
    flexDirection:'row',
    padding:10,
    borderTopWidth:1,
    borderColor:'grey'
    
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
    alignItems:'center',
    width:wp('50%'),
    alignSelf:'center'
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
    position: 'absolute',
    top: 5,
    right: 5,
    width: 20,
    height: 15,
    borderRadius: 2,
  },
  // textInput: {
  //   height: 150,
  //   borderColor: '#000',
  //   borderWidth: 1,
  //   padding: 10,
  //   fontSize: 18,
  //   color:'white'
  // },
  selectionContainer: {
    marginTop: 20,
    padding: 10,
  },
  textWrapper: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  normalText: {
    fontSize: 18,
    color: '#000',
  },
  selectedText: {
    fontSize: 18,
    backgroundColor: 'red', // Couleur de la sélection personnalisée (rouge)
    color: '#fff',
  },
  customActionsContainer: {
    position: 'absolute', // Position flottante
    backgroundColor: 'lightgray',
    padding: 10,
    borderRadius: 8,
    zIndex: 1,
  },
  customActionText: {
    fontSize: 16,
    marginVertical: 5,
  },
  iconContainer: {
    position: 'absolute',
    width: '35%',
    // backgroundColor: 'red',
    right: 5,
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
  },
});