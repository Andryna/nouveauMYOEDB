import React, { Component } from 'react';
import { View, TouchableOpacity, Text, ScrollView, TextInput, KeyboardAvoidingView, Image, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Sound from 'react-native-sound';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import FadingCircleAlt from 'react-native-spinkit';
import Slider from '@react-native-community/slider';
import { check, request, PERMISSIONS, RESULTS } from 'react-native-permissions';
import * as RNFS from '@dr.pogodin/react-native-fs';
// import RNFS from 'react-native-fs';
import Fontawesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import config from '../../config.json';
import Homelayout from '../layouts/Homelayout';
import HeaderList from '../components/header/HeaderList';
import AddButton from '../components/buttons/AddButton';
import { styles, lists, details } from '../../styles/styleAcuueil';
import { pickStyle } from '../../styles/customStyles';
import BoxConsultation from '../components/buttons/BoxConsultation';
import BoxStats from '../components/buttons/BoxStats';
import { getStats } from '../utils/request';
import RectButton from '../components/buttons/RectButton';
import BeforeAudio from '../components/modals/BeforeAudio';
import Homelayout3 from '../layouts/Homelayout3';
import { PowerTranslator, ProviderTypes, TranslatorConfiguration, TranslatorFactory } from 'react-native-power-translator';
import { TextInput as PaperTextInput, Button } from 'react-native-paper';
import { sendMessageToChatGPT,readText2, stopAudio, togglePausePlay } from '../utils/request';
import Tts from "react-native-tts";
import { getLanguageCode } from '../utils/All';
import DynamicList from '../components/list/DynamicList';
import StaticBulletList from '../components/list/StaticBulletList';
import StatsModal from '../components/modals/StatsModal';
import { connect,useDispatch } from 'react-redux';
import { Dropdown } from 'react-native-element-dropdown';
import { fetchAudio, updateAudioText } from '../actions/audio';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
const base_url = config.base_url;
const base_grp_url = config.base_grp_url_preprod;

class Audioplayer extends Component {
  static navigationOptions = {
    headerShown: false,
    title: 'Forma2+',
    headerStyle: {
      backgroundColor: '#2f3c7e',
    },
    headerTintColor: '#fff',
    headerLeft: () => null,
  };

  state = {
    id: this.props.route?.params?.id1,
    userInfo: this.props.route?.params?.userInfo,
    type: this.props.route?.params?.type,
    namevid: this.props.route?.params?.namevid,
    id_groupe: this.props.route?.params?.id_groupe,
    trad: this.props.route?.params?.trad,
    txt: this.props.route?.params?.original,
    audio_langue_origine: this.props.route?.params?.audio_langue_origine,
    itemDetails: this.props.route?.params?.itemDetails,
    url3: '',
    rate: 1,
    volume: 1,
    muted: false,
    resizeMode: 'contain',
    duration: 0.0,
    currentTime: 0.0,
    paused: true,
    pickerValueHolder: '1.0',
    hideControls: false,
    pausedText: 'ios-play',
    paused: true,
    isLoading: true,
    currentTime: 0,
    duration: 8,
    playSeconds: 0,
    duration: 0,
    headerbackColor: '#192356',
    videoColor: '#081241',
    expressionColor: '#081241',
    imageColor: '#081241',
    audioColor: '#081241',
    refreshing: false,
    playState: 'paused',
    durationInSeconds: null,
    stateText2: details.DisabledTextButton,
    stateText: details.ActiveTextButton,
    styleOrigin: details.highlighted,
    styleRevise: details.normalButton,
    styleIA: details.normalButton,
    showedTxt: 'original',
    currentTxt: null,
    currentTrad: null,
    MYstats:null, 
    inText:false,
    beforeAudio:false,
    cuurent : 'org',
    reading:false,
    isDropdownVisible:false,
    speed: 0.5,
    beforeAudio:false,
    revisedTxtbyIA:'',
    showTxtStat:false,
    analyse:[],
    new: {},
    expressions:{},
    langDetected:{},
    chatResult:{},
    isLoading:false,
    nb_expression: '...',
    nbdiff:0,
    adjectives: [],
    selectedGender:'male',
    isPlaying: false,
    isTogglePlaying:false,
    isPlayingTrad:false,
    isTogglePlayingTrad:false,
    isLoadingAudio: false,
    voiceType:'male'
  };


  // Déclarer whoosh à un niveau supérieur

  whoosh = new Sound(
      base_grp_url+
      this.state.id_groupe +
      '/' +  
      // '14937test_1714624823.wav',
      this.state.audio_langue_origine,
    // "file:///storage/emulated/0/clash/1.mp3" /storage/emulated/0/Download/1.mp3
    // RNFS.DownloadDirectoryPath + '/1.mp3',
    Sound.DEFAULT,
    (error) => {
      if (error) {
        console.log('failed to load the sound', error);
      } else {
        this.setState({ isLoading: false });
        const durationInSeconds = this.whoosh.getDuration();
        const formattedDuration = this.formatDuration(durationInSeconds);
        this.setState({ duration: formattedDuration, durationInSeconds: durationInSeconds });

        this.interval = setInterval(() => {
          if (this.whoosh && this.whoosh.isLoaded() && this.state.playState === 'playing' && !this.sliderEditing) {
            this.whoosh.getCurrentTime((seconds, isPlaying) => {
              this.setState({ playSeconds: seconds });
            });
          }
        }, 100);
      }
    }
  );
  formatDuration = (duration) => {
    const minutes = Math.floor(duration / 60);
    const seconds = Math.floor(duration % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  componentDidMount() {
    Tts.addEventListener('tts-start', this.onTtsStart);
    Tts.addEventListener('tts-finish', this.onTtsFinish);
    Tts.addEventListener('tts-cancel', this.onTtsCancel);
    Tts.setDefaultLanguage('en-US');
    Tts.setDefaultVoice('com.apple.ttsbundle.Samantha-compact');

    this.openTXT();
    const filePath = RNFS.DownloadDirectoryPath + '/1.mp3';
    console.log("file path :  >>>>>>>>>>>>>>>", JSON.stringify(this.state.itemDetails, null, 2));
    // alert(this.state.id_groupe);
    this.toggleAudioColor();
    this.requestStoragePermission();
    this.handleSendMessage();
    // console.log("VAOVAO VAOVAO",this.state.userInfo);
    // alert(this.state.audio_langue_origine);
  }

  componentWillUnmount() {
    // Supprimer les gestionnaires d'événements s'ils existent
    if (this.ttsStartListener) {
      this.ttsStartListener.remove();
    }
    if (this.ttsFinishListener) {
      this.ttsFinishListener.remove();
    }
    if (this.ttsCancelListener) {
      this.ttsCancelListener.remove();
    }
  }


  onTtsStart = (event) => {
    console.log('TTS Start', event);
  }

  onTtsFinish = (event) => {
    // console.log('TTS Finish', event);
    this.setState({reading:false})
  }

  onTtsCancel = (event) => {
    console.log('TTS Cancel', event);
  }

  async requestStoragePermission() {
    try {
      // Remplacer par la permission iOS appropriée, par exemple PHOTO_LIBRARY
      const permissionStatus = await check(PERMISSIONS.IOS.PHOTO_LIBRARY);
      if (permissionStatus === RESULTS.GRANTED) {
        console.log('Permission accordée');
      } else {
        const requestResult = await request(PERMISSIONS.IOS.PHOTO_LIBRARY);
        if (requestResult === RESULTS.GRANTED) {
          console.log('Permission accordée');
        } else {
          console.log('Permission refusée');
        }
      }
    } catch (error) {
      console.error('Erreur lors de la demande de permission :', error);
    }
  }
  toggleVideoColor = () => {
    this.setState({
      videoColor: '#DB4165',
      expressionColor: this.state.headerbackColor,
      imageColor: this.state.headerbackColor,
      audioColor: this.state.headerbackColor,
    });
    this.props.navigation.navigate('Recordings', { 'id_groupe': this.state.id_groupe });
  };

  toggleExpressionColor = () => {

    this.setState({
      videoColor: this.state.headerbackColor,
      expressionColor: '#C9902A',
      imageColor: this.state.headerbackColor,
      audioColor: this.state.headerbackColor,
    });
    this.props.navigation.navigate('ExpressionList', { 'id_groupe': this.state.id_groupe });
  };

  toggleImageColor = () => {
    this.setState({
      videoColor: this.state.headerbackColor,
      expressionColor: this.state.headerbackColor,
      imageColor: '#48A2F1',
      audioColor: this.state.headerbackColor,
    });
  };

  toggleAudioColor = () => {
    this.setState({
      videoColor: this.state.headerbackColor,
      expressionColor: this.state.headerbackColor,
      imageColor: this.state.headerbackColor,
      audioColor: '#47BD7A',
    });
  };
  toggleFirst = () => {
    this.toggleAudioColor();
  };
  soundpause = () => {
    this.setState({ isPlaying: false, paused: true });
    if (this.whoosh) {
      this.whoosh.pause(() => {
        this.setState({ isPlaying: false, paused: true });
      });
    }
  };
  onSliderEditStart = () => {
    this.sliderEditing = true;
  };

  onSliderEditEnd = () => {
    this.sliderEditing = false;
  };

  onSliderEditing = (value) => {
    if (this.whoosh) {
      this.whoosh.setCurrentTime(value);
      this.setState({ playSeconds: value });
    }
  };


  _play = () => {
    this.setState({ paused: false, playState: 'playing' });
    // Utiliser whoosh directement, pas besoin de this.whoosh
    this.whoosh.play((success) => {
      this.whoosh.getCurrentTime((seconds) => console.log('at ' + seconds));
      if (success) {
        this.setState({ paused: true });
        console.log('successfully finished playing');
      } else {
        console.log('playback failed due to audio decoding errors');
      }
    });
  };
  handleTranslate = async (itemValue, textToTranslate) => {
    if (itemValue !== '') {

      // Configure the translator
      TranslatorConfiguration.setConfig(
        ProviderTypes.Google,
        config.googleCloud.apiKey,
        itemValue.substring(0, 2)
      );
      const translator = TranslatorFactory.createTranslator();

      try {
        // Perform translation on the textToTranslate parameter and return the result
        const translated = await translator.translate(textToTranslate);
        
        
        return translated; // Return the translated text
      } catch (error) {
        console.error("Translation error:", error);
        alert('Translation failed');
        return null; // Return null if translation fails
      }
    } else {
      alert('This option is not available');
      return null; // Return null if itemValue is empty
    }
  };
  openTrad() {
    const { showedTxt } = this.state;
    if (showedTxt === 'original') {
      this.setState({ 
        stateText2: details.ActiveTextButton, 
        stateText: details.DisabledTextButton, 
        cuurent:'trad',
        currentTxt: this.state.trad }, async () => {
          const translation = await this.handleTranslate('en', this.state.currentTxt);
          if (translation) {
            console.log("Translation:", translation);
            var rep = await getStats(translation);
            console.log("STATS TRAD.....................",JSON.stringify(rep, null, 2));
            const wordsGlossary =rep.find(item => item.glossaire_Mot)?.glossaire_Mot || {};
            const wordsList = Object.keys(wordsGlossary);
            let adjectives = rep.find(item => item.glossaire_adjectivs)?.glossaire_adjectivs || [];
            adjectives = [...new Set(adjectives.map(adj => adj.toLowerCase()))];

            console.log(wordsList);
            console.log(wordsList.length);
            this.setState({ MYstats: rep, nbdiff: wordsList.length, wordsGlossary, adjectives: adjectives  }, () => {
              console.log("wordsGlossary mis à jour trad:", this.state.wordsGlossary);
          });
          
            
            // this.setState({ MYstats: rep });
          }
        });
    } else {
      console.log("La traduction n'est pas encore disponible");
    }
  }
  openTXT() {
    const { showedTxt } = this.state;
    switch (showedTxt) {
      case 'original':
        this.setState({
          stateText2: details.DisabledTextButton,
          stateText: details.ActiveTextButton,
          cuurent:'org',
          currentTxt: this.state.txt
        }, async () => {
          const translation = await this.handleTranslate('en', this.state.currentTxt);
          if (translation) {
            console.log("Translation:", translation);
            var rep = await getStats(translation);
            
            console.log("STATS .....................",JSON.stringify(rep, null, 2));
            // alert('ici');
            const wordsGlossary =rep.find(item => item.glossaire_Mot)?.glossaire_Mot || {};
            const wordsList = Object.keys(wordsGlossary);
            console.log(wordsList);
            this.setState({ MYstats: rep, nbdiff: wordsList.length, wordsGlossary }, () => {
              console.log("wordsGlossary mis à jour:", this.state.wordsGlossary);
          });
          
          }
        });
        break;
      case 'revised':
        this.setState({
          stateText2: details.DisabledTextButton,
          stateText: details.ActiveTextButton,
          currentTxt: 'pas encore revisée'
        }, () => {
          console.log("L'état a été mis à jour avec succès !");
        });
        break;
      default:
        this.setState({
          stateText2: details.DisabledTextButton,
          stateText: details.ActiveTextButton,
          currentTxt: 'pas encore reformuler par IA'
        },  () => {
          console.log("L'état a été mis à jour avec succès !");
        });
    }
  }

  openOrig() {
    this.setState({
      styleOrigin: details.highlighted,
      styleRevise: details.normalButton,
      styleIA: details.normalButton,
      showedTxt: 'original'
    }, () => {
      this.openTXT();
    });
  }

  openRetravail() {
    this.setState({
      styleOrigin: details.normalButton,
      styleRevise: details.highlighted,
      styleIA: details.normalButton,
      showedTxt: 'revised'
    }, () => {
      this.openTXT();
    });
  }
  openIA() {
    this.setState({
      styleOrigin: details.normalButton,
      styleRevise: details.normalButton,
      styleIA: details.highlighted,
      showedTxt: 'byIA',
    }, () => {
      this.openTXT();
    });
  }
  async valideEdition() {
  const { itemDetails, currentTxt, userInfo } = this.state;
// console.log(itemDetails);
// console.log(userInfo.id);
// console.log(currentTxt);
  try {
    // Traduction du texte
     const translation = await this.handleTranslate('en', currentTxt);
    // Appel de l'action Redux pour mise à jour + fetch automatique
    await this.props.updateAudioText(userInfo.id, itemDetails.id_expression, currentTxt, translation);
    
    this.props.navigation.goBack()
    //   alert('updated sucsessfuly');
    // // Ferme le champ d'édition
    // this.setState({ inText: false });

  } catch (err) {
    console.error("Erreur lors de la mise à jour :", err);
  }
}

  closeModal = () => {
    this.setState({newAudio:false,newText:false, newVideo:false, newImage:false, beforeAudio:false, beforeTexte:false, beforeVideo:false, beforeImage:false});
  };
  goToAudio = () => {
    this.closeModal();
    this.props.navigation.navigate('Audios',{id_groupe:this.state.id_groupe});
  };
  saveEdit = () => {
    
    const {txt, trad} = this.state;
    // Exemple de mise à jour du backend avec `fetch`
    console.log("Saving edits for:", { id, txt, trad });
    fetch(base_url + '/portail-stagiaire/update.php',
      {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: id_stag,
          idexp: id,
          expres: or,
          traduction: ci,
          idecat:id_category
        }),
      })
        .then((response) => response.json())
        .then((result) => {
          console.log('Save successful:', result);
          refresh();
        })
        .catch((error) => {
          console.error('Error saving edits:', error);
        });
    };
    speakTxt = async () => {
      const {langue, expres, infolangue, currentTxt, itemDetails} = this.state;
      // const { itemDetails, MYstats } = this.state;
      // alert();
      // this.state.currentTxt
      this.setState({reading:true});
      // alert((this.state.speed));
      this.readText(currentTxt, itemDetails.langue);
      // if(langue == 'en-US'){
      //   this.readText(expres, 'fr-FR');
      // }else{
      //   this.readText(expres, 'en-US');
      // }
    }
    speakTrad = async () => {
      const {langue, expres, infolangue, currentTxt, itemDetails} = this.state;
      const target_langue = getLanguageCode(itemDetails.target_langue_cible);
      // alert(target_langue.substring(0, 2));
      // alert(langue);
      this.setState({reading:true});
      this.readText(currentTxt, target_langue.substring(0, 2));
    }
    // speakTrad = async (trad) => {
    //   const {langue, targTEXT} = this.state;
    //   const target_langue = getLanguageCode(this.props.target_langue_cible);
    //   // alert(targTEXT);
    //   // alert(target_langue);
    //     this.readText(trad, target_langue);
    // }


    readText = async (phrase, langue) => {
      try {
        if (this.ttsStartListener) {
          this.ttsStartListener.remove();
        }
        if (this.ttsFinishListener) {
          this.ttsFinishListener.remove();
        }
        if (this.ttsCancelListener) {
          this.ttsCancelListener.remove();
        }
          // Arrêter tout texte en cours de lecture
          // await Tts.stop();
          stopAudio();
  
          // Configurer la voix et la langue en fonction de l'option choisie
          switch (langue) {
              case 'en':
                  await Tts.setDefaultVoice('com.apple.ttsbundle.Samantha-compact');
                  await Tts.setDefaultLanguage('en-US');
                  break;
  
              case 'fr':
                  await Tts.setDefaultVoice('com.apple.ttsbundle.Thomas-compact');
                  await Tts.setDefaultLanguage('fr-FR');
                  break;
  
              case 'es':
                  await Tts.setDefaultVoice('com.apple.ttsbundle.Monica-compact');
                  await Tts.setDefaultLanguage('es-ES');
                  break;
  
              case 'de':
                  await Tts.setDefaultVoice('com.apple.ttsbundle.Anna-compact');
                  await Tts.setDefaultLanguage('de-DE');
                  break;
  
              default:
                  console.warn(`Langue non supportée : ${langue}. Utilisation de la langue par défaut (en-US).`);
                  await Tts.setDefaultVoice('com.apple.ttsbundle.Samantha-compact');
                  await Tts.setDefaultLanguage('en-US');
                  break;
          }
          await Tts.setDefaultPitch(1.0); // Définit une valeur standard pour le pitch
          await Tts.setDefaultRate(this.state.speed); // Définit une valeur standard pour le débit (rate)
          
          // Lecture du texte
          await Tts.speak(phrase);
          // this.setState({reading:false});
      } catch (error) {
          // Gestion des erreurs
          console.error('Erreur lors de la lecture TTS :', error);
          await Tts.speak('Voice not available for selected language');
      }
  }

  toggleDropdown = () => {
    this.setState((prevState) => ({
      isDropdownVisible: !prevState.isDropdownVisible,
    }));
  };

  changeSpeed = (rate) => {
    this.setState({ speed: rate, isDropdownVisible: false });
    Tts.setDefaultRate(rate);
  };
  stopTts = () => {
    // Tts.stop();
    stopAudio();
    this.setState({ reading: false });
  };

  handleSendMessage = async () => {
    const {txt, trad, langue, itemDetails} = this.state;
    const target_langue = getLanguageCode(itemDetails.target_langue_cible);
    const  message  = `Identifiez les expressions présentes dans ce texte, listez-les, ne manquez rien, puis classez-les selon leur nature ou leur fonction, met côte à cote avec leur traduction, la langue d'origine est '`+ itemDetails.langue+`' et la traduction est en '`+target_langue+`, voici le texte :

    "`+txt+`"`;
    // alert(itemDetails.langue);
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
          // chatHistory: [
          //   ...prevState.chatHistory,
          //   { role: 'user', content: message }, 
          //   { role: 'assistant', content: chatResponse },
          // ],
          analyse: chatResponse,
          expressions: parsedResult.expressions,
          new: parsedResult.nature_ou_fonction,
          chatResult: parsedResult.nature_ou_fonction,
          langDetected:parsedResult.langues,
          nb_expression: parsedResult.expressions?.length ?? 0
        }),
        () => {
          console.log('Historique des messages mis à jour:');
          console.log(parsedResult.expressions);
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
  }

  closeStat(){
    this.setState({
      showTxtStat:false
    });
  }

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
          isLoadingTrad: isLoading,
          isPlayingTrad:isPlaying,
          isTogglePlayingTrad: isPlaying,
      });
  };
  handlePlay = () => {
      if (this.state.isLoadingAudio) return;
      readText2(this.state.currentTxt, this.setPlayingStatus, this.state.langue, this.state.voiceType, this.state.voiceSpeed);
  };
  render() {
    // const { itemDetails, MYstats, isDropdownVisible } = this.state;
    const { itemDetails, MYstats, isLoading, analyse, chatResult, txt, trad, isDropdownVisible, wordsGlossary } = this.state;
    const target_langue = getLanguageCode(itemDetails.target_langue_cible);
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
    // let wordsGlossary = [];
    let activeSentences = [];
    let passiveSentences = [];
    let wordsList;

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
      // wordsGlossary =MYstats.find(item => item.glossaire_Mot)?.glossaire_Mot || {};
      // wordsList = Object.keys(wordsGlossary);
      activeSentences = MYstats.find(item => item.phrase_active)?.phrase_active || [];
      passiveSentences = MYstats.find(item => item.phrase_passive)?.phrase_passive || [];
      wordsList = wordsGlossary ? Object.entries(wordsGlossary).map(([mot, occurence]) => `${mot} (${occurence})`) : [];
      
    }


   

    const contentAdj = <DynamicList title="Adjectifs" items={adjectives} />;
    const contentVerb = <DynamicList title="Verbes" items={verbs} />;
    const contentSubstatif = <DynamicList title="Substantifs" items={substantifs} />;
    const contentWord = <DynamicList title="Mots differents" items={wordsGlossary} />;
    const contentActive = <DynamicList title="Phrases actives" items={activeSentences} />;
    const contentPassive = <DynamicList title="Phrases passives" items={passiveSentences} />;
    const contentExp = <StaticBulletList title="Expressions"  data={this.state.expressions}  langueOr={itemDetails.langue}  langueCi={target_langue.substring(0, 2)}  />;
    
    // const target_langue = "en-US";
    const flagSource = target_langue === 'en-US'
      ? require('../image/en.png')
      : target_langue === 'fr-FR'
      ? require('../image/fr.png')
      : target_langue === 'es-ES'
      ? require('../image/es.png')
      : target_langue === 'de-DE'
      ? require('../image/Germany.png')
      : require('../image/en.png');
      const voiceOptions = [
        {
          label: 'Male Voice',
          value: 'male',
          icon: 'face-man' // voix masculine
        },
        {
          label: 'Female Voice',
          value: 'female',
          icon: 'face-woman' // voix féminine (plus neutre/élégante)
        }
      ];
    
    return (
  //     <KeyboardAvoidingView 
  //       style={{
  //         // height: hp('87%'),
  //         flex:1,
  //         // width: wp('100%'),
  //         // backgroundColor: '#060a20'
  //       }} 
  //       behavior={Platform.OS === 'ios' ? 'padding' : undefined}
  // keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 80} 
  //     >
        <Homelayout3 navigation={this.props.navigation}>
          <ScrollView
            style={{
          width: wp('100%'),
          backgroundColor: '#060a20',
          // flex:1
        }}
        contentContainerStyle={{ flexGrow: 1, paddingBottom: 50 }}
        keyboardShouldPersistTaps="handled"
        
        >
            <View style={[lists.headerStyle, {marginTop:10}]}>
              <HeaderList
                videoToggle={this.toggleVideoColor}
                expressionToggle={this.toggleExpressionColor}
                imageToggle={this.toggleImageColor}
                audioToggle={this.toggleAudioColor}
                firstElToggle={this.toggleFirst}
                navigation={this.props.navigation}
                videoColor={this.state.videoColor}
                expressionColor={this.state.expressionColor}
                imageColor={this.state.imageColor}
                audioColor={this.state.audioColor}
                id_groupe={this.state.id_groupe}
              />
              <View style={lists.addNew}>
                <TouchableOpacity
                  onPress={() => {
                    console.log('Accueil');
                  }}
                >
                  <View style={{ flexDirection: 'row' }}>
                    <Text style={{ color: 'white', fontSize: 20 }}>
                      My Audios 
                    </Text>
                  </View>
                </TouchableOpacity>
                <AddButton
                  onPress={() => {
                    this.setState({ beforeAudio: true });
                  }}
                  backgroundColor="#47BD7A"
                />
              </View>
            </View>
            <View
              style={{
                // flex: 1,
                backgroundColor: '#192356',
                padding: 10,
                paddingBottom: 20
              }}>
              <View
                style={{
                  width: wp('100%'),
                  justifyContent: 'center',
                  backgroundColor: '#192356',
                  marginBottom: 10
                }}>
                <TouchableOpacity
                  onPress={() => {this.props.navigation.goBack(), this.stopTts()}}>
                  <View
                    style={{
                      flexDirection: 'row'
                    }}>
                    <Icon name="arrow-back-outline" size={20} color="white" />
                  </View>
                </TouchableOpacity>
              </View>
              <View
                style={details.audioContainer}
              >
                <Text style={details.title} >{itemDetails.audio_legend}</Text>
                <View style={{ flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' }}>
                  {!this.state.isLoading ? (<View
                    style={details.audioButtonPlayer}>
                    {this.state.paused ? (
                      <TouchableOpacity onPress={this._play}>
                        <Icon name="play" size={20} color="white" />
                      </TouchableOpacity>

                    ) : (
                      <TouchableOpacity onPress={this.soundpause}>
                        <Icon name="pause" size={20} color="white" />
                      </TouchableOpacity>
                    )}
                  </View>) : (
                      <View>
                        <FadingCircleAlt
                          style={{ alignSelf: 'center', opacity: 0.3 }}
                          color={'white'} size={35} type={'ThreeBounce'}
                        />
                      </View>)}
                  <Text style={details.duration}>{this.state.duration}</Text>
                  <Slider
                    style={{ width: '80%', height: 40 }}
                    minimumValue={0}
                    maximumValue={this.state.durationInSeconds} // Utilisez la durée en secondes plutôt que la durée formatée
                    value={this.state.playSeconds}
                    minimumTrackTintColor="white"
                    thumbTintColor="white"
                    maximumTrackTintColor="grey"
                    onSlidingComplete={this.onSliderEditEnd}
                    onSlidingStart={this.onSliderEditStart}
                    onValueChange={this.onSliderEditing}
                  />
                </View>
                <Text style={details.title} >Créer le {itemDetails.date_creation}</Text>
              </View>

              <View style={{ backgroundColor: '', padding: 10, marginBottom: 5, borderTopLeftRadius: 15, flex:1 }}>
                
                <View style={{marginBottom: 10, flex:1}}>
                  <View
                  style={{
                    backgroundColor: '#2B4098',
                    borderTopLeftRadius:15,
                    borderTopRightRadius:15,
                    // flex:1
                  }}
                  >
                    <View style={{ flexDirection: 'row'}}>
                      <TouchableOpacity onPress={() => this.openTXT()}
                        style={[details.TextButton, this.state.stateText || details.ActiveTextButton]}
                      >
                        <View>
                          <Text style={details.textTitle}>Texte</Text>
                        </View>
                      </TouchableOpacity>
                      <TouchableOpacity onPress={() => this.openTrad()}
                        style={[details.TextTradButton, this.state.stateText2 || details.ActiveTextButton]}
                      >
                        <View>
                          <Text style={details.textTitle}>Traduction</Text>
                        </View>
                      </TouchableOpacity>
                    </View>

                    {/* nouveau TTS */}
                    <View
                      style={{ 
                        flexDirection: 'row',
                        justifyContent: 'space-evenly',
                        alignItems: 'center',
                        }}>
                      
                        <Dropdown
                          style={pickStyle.dropdown2}
                          data={voiceOptions}
                          labelField="label"
                          valueField="value"
                          placeholder="Select Voice"
                          value={this.state.voiceType}
                          onChange={item => {
                            this.setState({ voiceType: item.value });
                          }}
                          renderItem={({ label, icon }) => (
                            <View style={pickStyle.dropdownItem}>
                              <MaterialCommunityIcons name={icon} size={22} color="#192356" style={{ marginRight: 10 }} />
                              <Text style={pickStyle.dropdownItemText}>{label}</Text>
                            </View>
                          )}
                          textStyle={pickStyle.textDropdown}
                          placeholderStyle={pickStyle.placeholderStyle}
                          selectedTextStyle={pickStyle.selectedTextStyle}
                        />
                        <Dropdown
                          style={[pickStyle.dropdown2, { marginLeft: 5 , borderWidth:0}]}
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
                              <Text style={pickStyle.selectedTextStyle}>{selected.label}</Text>
                            ) : (
                              <Text style={pickStyle.placeholderStyle}>Speed</Text>
                            );
                          }}
                          renderItem={({ label }) => (
                            <View style={pickStyle.dropdownItem}>
                              <Text style={pickStyle.dropdownItemText}>{label}</Text>
                            </View>
                          )}
                        textStyle={pickStyle.textDropdown}
                        placeholderStyle={pickStyle.placeholderStyle}
                        selectedTextStyle={pickStyle.selectedTextStyle}
                        />
                      </View>
                      <View style={{ flexDirection: 'row', alignSelf:'flex-end', marginRight: 20, marginBottom: 10, padding: 10}}>
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
                      {/*  nouveau TTS  */}

                    {/* <View style={{ 
                      flexDirection: 'row', 
                      alignSelf: 'center', 
                      width: wp('90%'), 
                      marginTop: hp('5%') , 
                      justifyContent:'center',
                      alignItems:'center',
                      // backgroundColor:'#2B4098'
                    }}>
                    {this.state.reading?
                    (
                      <View>
                        <TouchableOpacity onPress={this.stopTts} 
                          style={{ width: wp('20%'), marginLeft: wp('5%') }}>
                          <Icon name="volume-mute" size={25} color="white" style={{ alignSelf: 'flex-end', marginLeft: 5 }} />
                        </TouchableOpacity>
                      </View>
                    ):null
                    }
                    { this.state.cuurent == 'org' ?
                      (
                        <TouchableOpacity onPress={() => 
                          this.speakTxt()
                          // alert('ok')
                          } style={{ width: wp('20%')}}>
                          <Icon name="volume-medium-outline" size={25} color="#EA1E69" style={{ alignSelf: 'flex-end', marginLeft: 5 }} />
                        </TouchableOpacity>
                      ):
                      (
                        <TouchableOpacity onPress={() => 
                          this.speakTrad()
                          } style={{ width: wp('20%')}}>
                          <Icon name="volume-medium-outline" size={25} color="#EA1E69" style={{ alignSelf: 'flex-end', marginLeft: 5 }} />
                        </TouchableOpacity>
                      )
                    }
                      <TouchableOpacity onPress={this.toggleDropdown} 
                        style={{
                            flexDirection:'row',
                            justifyContent:'center',
                            alignItems:'center', marginLeft:20
                        }}
                      >
                        <Icon
                          name={isDropdownVisible ? "chevron-up" : "chevron-down"}
                          size={30}
                          color="#48A2F1"
                        />
                      </TouchableOpacity>
                    </View> */}
                    {this.state.isDropdownVisible && (
                      <View style={{
                        position: 'absolute',
                        top: 50,
                        right: 10,
                        backgroundColor: 'white',
                        width: 120,
                        borderRadius: 5,
                        elevation: 3,
                        paddingVertical: 10,
                        zIndex:1
                      }}>
                        <TouchableOpacity onPress={() => this.changeSpeed(0.3)} 
                          style={{ padding: 10 }}>
                          <Text style={{ textAlign: 'left' }}>Lent</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this.changeSpeed(0.5)} 
                          style={{ padding: 10 }}>
                          <Text style={{ textAlign: 'left' }}>Normale</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this.changeSpeed(0.6)} 
                          style={{ padding: 10 }}>
                          <Text style={{ textAlign: 'left' }}>Rapide</Text>
                        </TouchableOpacity>
                      </View>
                    )}
                    <TextInput
                      style={{
                        backgroundColor: '#2B4098',
                        color: 'white',
                        textAlign: 'justify',
                        // marginBottom: 50,
                        marginTop:10,
                        padding: 20,
                        borderBottomRightRadius: 5,
                        borderBottomLeftRadius: 5,
                        marginBottom: 10,
                        minHeight: 100,       // <-- hauteur minimum
                        maxHeight: 300,    
                        // flex:1
                      }}
                      value={this.state.currentTxt}
                      onChangeText={(text) => this.setState({ currentTxt: text, inText:true })}
                      multiline={true}
                      scrollEnabled={false}              // permet au TextInput lui-même de scroller si contenu trop long
                      textAlignVertical="top"           // iOS: le texte commence en haut
                      returnKeyType="done"              // permet de fermer le clavier facilement
                      blurOnSubmit={true}               // ferme le clavier sur "Done"
                      // onSubmitEditing={() => Keyboard.dismiss()} 
                    />

                  </View>

                  {/* <PaperTextInput
              value={this.state.currentTxt}
              onChangeText={(text) => this.setState({ currentTxt: text, inText:true })}
              style={[
                { 
                  backgroundColor: '#202C61', // Couleur de fond
                  marginBottom:10,
                  textAlign:'justify'
                }
              ]}
              theme={{
                colors: {
                  text: 'white',           // Couleur du texte
                  primary: '#f9f3c1',  // Supprime l'effet de focus
                  underlineColor: '#202C61', // Supprime la ligne sous le champ
                  textAlign:'justify'
                },
              }}
              
              underlineColor="#202C6" // Ce paramètre est inactif sur iOS, mais sûr à inclure
              editable={true} // Assurez-vous que l'entrée est activée
              returnKeyType="done" // Le bouton "Done" apparaît sur le clavier natif
              onSubmitEditing={()=>alert('sub')} // Action à exécuter sur "Done"
              multiline={true}
              cursorColor="#db3700"
              // activeOutlineColor = "#202C6"
            /> */}
                  {this.state.inText?(
                    <View style={{flexDirection:'row', justifyContent:'space-around'}}>
                      <RectButton
                      onPress={()=>this.valideEdition()}
                      backgroundColor="#47BD7A" 
                      text="Valider"
                      />
                      <RectButton
                      onPress={()=>this.setState({inText:false, currentTxt:this.state.txt})}
                      backgroundColor="red" 
                      text="Annuler"
                      />

                    </View>
                  ):null}

                  {(itemDetails.langue == 'en' || target_langue == 'en-US')?(
                    <View>
                      <Text style={details.title1}>Analyse Lexicale</Text>
                    <View
                    // style={{height:hp('50%')}}
                    >
                      <View style={{flexDirection:'row', justifyContent:'space-between', width:wp('70%'), alignSelf:'center'}}>
                      <BoxStats
                      nb1={nbMots}
                        click={()=>alert('ok')}
                        label={"Mots"}
                        iconName="slideshow"
                        iconsProvider="MaterialIcons"
                        boxColor="#186189"
                        before={() => this.setState({beforeVideo:true})}
                        goToList={()=>alert('ok')}
                        create = {()=>alert('ok')}
                      />
                      
                      
                      <BoxStats
                        nb1={this.state.duration}
                        click={this.props.clickVideo}
                        label={"Durée"}
                        iconName="slideshow"
                        iconsProvider="MaterialIcons"
                        boxColor="#186189"
                        before={() => this.setState({beforeVideo:true})}
                        goToList={this.goToVideo}
                        create = {()=>{this.setState({newVideo:true}),this.props.closeAll()}}
                      />
                      <BoxStats
                        nb1={stats_debit+'w/m'} 
                        click={this.props.clickVideo}
                        label={"Débits"}
                        iconName="slideshow"
                        iconsProvider="MaterialIcons"
                        boxColor="#186189"
                        before={() => this.setState({beforeVideo:true})}
                        goToList={this.goToVideo}
                        create = {()=>{this.setState({newVideo:true}),this.props.closeAll()}}
                      />
                     

                      </View>
                      <View style={{flexDirection:'row', justifyContent:'space-between', width:wp('70%'), alignSelf:'center'}}>
                      <BoxStats
                      nb1={this.state.nbdiff}
                        click={()=>alert('ok')}
                        label={"Mots differents"}
                        iconName="slideshow"
                        iconsProvider="MaterialIcons"
                        boxColor="#2286e3"
                        before={()=>this.setState({showTxtStat:true, contentStat: contentWord})}
                        goToList={()=>alert('ok')}
                        create = {()=>alert('ok')}
                      />
                      
                      <BoxStats
                        nb1={stats_nbverb}
                        click={this.props.clickVideo}
                        label={"Verbes"}
                        iconName="slideshow"
                        iconsProvider="MaterialIcons"
                        boxColor="#2286e3"
                        before={()=>this.setState({showTxtStat:true, contentStat: contentVerb})}
                        goToList={this.goToVideo}
                        create = {()=>{this.setState({newVideo:true}),this.props.closeAll()}}
                      />
                      <BoxStats
                        nb1={stats_nbadj}
                        click={this.props.clickVideo}
                        label={"Adjectifs"}
                        iconName="slideshow"
                        iconsProvider="MaterialIcons"
                        boxColor="#4d81fe"
                        before={()=>this.setState({showTxtStat:true, contentStat: contentAdj})}
                        goToList={this.goToVideo}
                        create = {()=>{this.setState({newVideo:true}),this.props.closeAll()}}
                      />
                      
                      </View>
                      <View style={{flexDirection:'row', justifyContent:'space-between', width:wp('70%'), alignSelf:'center'}}>
                      <BoxStats
                        nb1={stats_nbact}
                        click={this.props.clickVideo}
                        label={"Voix active"}
                        iconName="slideshow"
                        iconsProvider="MaterialIcons"
                        boxColor="#ed254e"
                        before={()=>this.setState({showTxtStat:true, contentStat: contentActive})}
                        goToList={this.goToVideo}
                        create = {()=>{this.setState({newVideo:true}),this.props.closeAll()}}
                      />
                      <BoxStats
                        nb1={stats_nbpass}
                        click={this.props.clickVideo}
                        label={"Voix Passive"}
                        iconName="slideshow"
                        iconsProvider="MaterialIcons"
                        boxColor="#dd9e2e"
                        before={()=>this.setState({showTxtStat:true, contentStat: contentPassive})}
                        goToList={this.goToVideo}
                        create = {()=>{this.setState({newVideo:true}),this.props.closeAll()}}
                      />
                      {this.state.analyse.length > 0 && (
                        <BoxStats
                          nb1={this.state.nb_expression}
                          click={this.props.clickVideo}
                          label="Expressions"
                          iconName="slideshow"
                          iconsProvider="MaterialIcons"
                          
                          boxColor="#18bd5a"
                          before={() =>
                            this.setState({ showTxtStat: true, contentStat: contentExp})
                          }
                          goToList={this.goToVideo}
                          create={() => {
                            this.setState({ newVideo: true });
                            this.props.closeAll();
                          }}
                        />
                      )}

                      </View>
                    </View>
                  {/* <DynamicList title="Adjectifs" items={adjectives} />
                  <DynamicList title="Verbes" items={verbs} />
                  <DynamicList title="Substantifs" items={substantifs} /> */}
                  </View>):null}
                </View>
              </View>
            </View>
          </ScrollView>
          <StatsModal visible={this.state.showTxtStat} onClose={()=>this.closeStat()} contentStat={this.state.contentStat}/>
          <BeforeAudio visible={this.state.beforeAudio} onClose={() => this.closeModal()} navigation={this.props.navigation} list = {()=>this.goToAudio()} newp = {()=>{this.closeModal(),this.props.navigation.navigate('Enregistre')}} />
        </Homelayout3>
      // </KeyboardAvoidingView>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    dispatchfetchAudio: id => dispatch(fetchAudio(id)),
    updateAudioText: (userID, idexp, expres, traduction) =>
    dispatch(updateAudioText(userID, idexp, expres, traduction)),
  };
};


export default connect(null, mapDispatchToProps )(Audioplayer);
