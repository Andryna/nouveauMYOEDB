import React, { Component } from 'react';
import { View, TouchableOpacity, Text, ScrollView, TextInput, KeyboardAvoidingView, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Sound from 'react-native-sound';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import FadingCircleAlt from 'react-native-spinkit';
import Slider from '@react-native-community/slider';
import { check, request, PERMISSIONS, RESULTS } from 'react-native-permissions';
import RNFS from 'react-native-fs';
import Fontawesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import config from '../../config.json';
import Homelayout from '../layouts/Homelayout';
import HeaderList from '../components/header/HeaderList';
import AddButton from '../components/buttons/AddButton';
import { styles, lists, details } from '../../styles/styleAcuueil';
import BoxConsultation from '../components/buttons/BoxConsultation';
import BoxStats from '../components/buttons/BoxStats';
import { getStats } from '../utils/request';
import RectButton from '../components/buttons/RectButton';
import BeforeAudio from '../components/modals/BeforeAudio';
import { interactWithGemini } from '../utils/request';
import { getLanguageCode } from '../utils/All';
import DynamicList from '../components/list/DynamicList';
import StatsModal from '../components/modals/StatsModal';
import { fetchAudio } from '../actions/audio';
import { connect } from 'react-redux';
import { sendMessageToChatGPT } from '../utils/request';
import BulletList from '../components/list/BulletList';
import StaticBulletList from '../components/list/StaticBulletList';
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
    // id: this.props.navigation.state.route.id1,
    // type: this.props.navigation.state.route.type,
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
    pausedText: 'play',
    namevid: this.props.route.params.namevid,
    id_groupe: this.props.route.params.id_groupe,
    trad: this.props.route.params.trad,
    txt: this.props.route.params.original,
    paused: true,
    audio_langue_origine: this.props.route.params.audio_langue_origine,
    itemDetails: this.props.route.params.itemDetails,
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
    showedTxt: true,
    currentTxt: null,
    currentTrad: null,
    MYstats:null, 
    inText:false,
    beforeAudio:false,
    revisedTxtbyIA:'',
    showTxtStat:false,
    analyse:[],
    new: {},
    expressions:{},
    langDetected:{},
    chatResult:{},
    isLoading:false,
    nb_expression: '...'
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
    // alert(this.state.audio_langue_origine);
    // alert(this.state.id_groupe);
    this.openTXT();
    const filePath = RNFS.DownloadDirectoryPath + '/1.mp3';
    console.log("file path :  >>>>>>>>>>>>>>>", JSON.stringify(this.state.itemDetails));
    this.toggleAudioColor();
    this.requestStoragePermission();
    this.handleSendMessage();
    
  }
  async requestStoragePermission() {
    try {
      const permissionStatus = await check(PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE);
      if (permissionStatus === RESULTS.GRANTED) {
        console.log('Permission accordée');
      } else {
        const requestResult = await request(PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE);
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
      this.whoosh.stop(() => {
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
      this.whoosh.stop();
      this.whoosh.getCurrentTime((seconds) => console.log('at ' + seconds));
      if (success) {
        this.setState({ paused: true });
        console.log('successfully finished playing');
      } else {
        console.log('playback failed due to audio decoding errors');
      }
    });
  };
  openTrad() {
    const {itemDetails} = this.state;
      this.setState({ 
        stateText2: details.ActiveTextButton, 
        stateText: details.DisabledTextButton, 
        showedTxt:false,
        currentTxt: this.state.trad }, async () => {
          if(itemDetails.langue == 'en'){
            var rep = await getStats(this.state.txt);
            console.log("STATS .....................", rep);
            this.setState({ MYstats: rep });
          }else{
            var rep = await getStats(this.state.trad);
            console.log("STATS .....................", rep);
            this.setState({ MYstats: rep });
          }
          // var rep = await getStats(this.state.currentTxt);
          // // console.log("STATS .....................",rep);
          // this.setState({ MYstats: rep });
        });
  }
  async openTXT() {
    const { showedTxt, itemDetails } = this.state;
    // alert(itemDetails.langue);
    
    this.setState({
      showedTxt:true,
      stateText2: details.DisabledTextButton,
      stateText: details.ActiveTextButton,
    });
    try {
      if(itemDetails.langue == 'en'){
        var rep = await getStats(this.state.txt);
        console.log("STATS .....................", rep);
        this.setState({ MYstats: rep });
        const wordsGlossary = rep.find(item => item.glossaire_Mot)?.glossaire_Mot || {};
        const wordsList = Object.keys(wordsGlossary); // Convertit les clés en liste de mots
        const substantifs = rep.find(item => item.glossaire_substantif)?.glossaire_substantif || [];
        const vb =  rep.find(item => item.glossaire_verbs)?.glossaire_verbs || [];

        console.log("Glossaire des mots:", wordsList);
        console.log("sub des mots:", substantifs);
        console.log("vb des mots:", vb);
      }else{
        var rep = await getStats(this.state.trad);
        console.log("STATS .....................", rep);
        this.setState({ MYstats: rep });
        const wordsGlossary = rep.find(item => item.glossaire_Mot)?.glossaire_Mot || {};
        const wordsList = Object.keys(wordsGlossary); // Convertit les clés en liste de mots

        console.log("Glossaire des mots:", wordsList);
      }
    } catch (error) {
      console.error("Erreur lors de la récupération des stats :", error);
    }
    // alert(this.state.txt );
    // switch (showedTxt) {
    //   case 'original':
    //     this.setState({
          // stateText2: details.DisabledTextButton,
          // stateText: details.ActiveTextButton,
    //       currentTxt: this.state.txt
    //     });

    //     try {
    //       var rep = await getStats(this.state.trad);
    //       // console.log("STATS .....................", rep);
    //       this.setState({ MYstats: rep });
    //     } catch (error) {
    //       console.error("Erreur lors de la récupération des stats :", error);
    //     }
    //     break;

    //   case 'revised':
    //     this.setState({
    //       stateText2: details.DisabledTextButton,
    //       stateText: details.ActiveTextButton,
    //       currentTxt: this.state.revisedTxtbyIA
    //     }, () => {
    //       console.log("L'état a été mis à jour avec succès !");
    //     });
    //     break;

    //   default:
    //     this.setState({
    //       stateText2: details.DisabledTextButton,
    //       stateText: details.ActiveTextButton,
    //       currentTxt: this.state.revisedTxtbyIA
    //     });

      
    // }
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

  async  openRetravail() {
    const prompt = "reformuler ce texte. ne donne pas de phrase introductive au debut ou une phrase d'explication à la fin, je veux juste une reformulation. Voici le texte: ' "+this.state.trad + " ' .";
    const response = await interactWithGemini(prompt);
    // console.log('Réponse de Gemini:', response);
    
    this.setState({
      styleOrigin: details.normalButton,
      styleRevise: details.highlighted,
      styleIA: details.normalButton,
      showedTxt: 'revised',
      revisedTxtbyIA: response
    }, () => {
      this.openTXT();
    });
  }
 async openIA() {
    const prompt = "reformuler ce texte. ne donne pas de phrase introductive au debut ou une phrase d'explication à la fin, je veux juste une reformulation. Voici le texte: ' "+this.state.trad + " ' .";
    const response = await interactWithGemini(prompt);
    console.log('Réponse de Gemini:', response);
    this.setState({
      styleOrigin: details.normalButton,
      styleRevise: details.normalButton,
      styleIA: details.highlighted,
      showedTxt: 'byIA',
      revisedTxtbyIA: response
    }, () => {
      this.openTXT();
    });
  }
  valideEdition(){
    const {itemDetails} = this.state;
    // alert(this.state.currentTxt);
    // alert(itemDetails.id);

    this.setState({inText:false});
    this.saveEdit();
  }
  closeModal = () => {
    this.setState({newAudio:false,newText:false, newVideo:false, newImage:false, beforeAudio:false, beforeTexte:false, beforeVideo:false, beforeImage:false});
  };
  goToAudio = () => {
    this.closeModal();
    this.props.navigation.navigate('Audios',{id_groupe:this.state.id_groupe});
  };
  closeStat(){
    this.setState({
      showTxtStat:false
    });
  }

  saveEdit(){
    const {userInfo,selectedId} = this.props;
    const {selectedText, selectedTrad,selectedCategory, target_langue_cible, itemDetails, txt, trad} = this.state;
    // alert(userInfo.id);
    console.log(userInfo.id);
    console.log(selectedId);
    console.log(selectedText);
    console.log(selectedTrad);
    const selectedObject = {
      id: userInfo.id,
      idexp: itemDetails.id_expression,
      expres: txt,
      traduction: trad,
      idecat:itemDetails.id_category
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
                idexp: itemDetails.id_expression,
                expres: txt,
                traduction: trad,
                idecat:itemDetails.id_category,
                PickerValueHolder: itemDetails.target_langue_cible
                }
              )
          }).then((response) => response.json()).then((reponse) => {
            console.log(reponse);
            // alert('saved');
            this.props.dispatchfetchAudio(userInfo.id)
            .then(() => {
                  alert('Audio saved');
            })
          }).catch((error) => {
            console.error(error);
            this.setState({ ActivityIndicator_Loading: false });
          });
      });
  }

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
  };

  render() {
    const { itemDetails, MYstats, isLoading, analyse, chatResult, txt, trad } = this.state;
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
    let wordsGlossary = [];
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
      wordsGlossary =MYstats.find(item => item.glossaire_Mot)?.glossaire_Mot || {};
      wordsList = Object.keys(wordsGlossary);
      activeSentences = MYstats.find(item => item.phrase_active)?.phrase_active || [];
      passiveSentences = MYstats.find(item => item.phrase_passive)?.phrase_passive || [];
      
    }
    const contentAdj = <DynamicList title="Adjectifs" items={adjectives} />;
    const contentVerb = <DynamicList title="Verbes" items={verbs} />;
    const contentSubstatif = <DynamicList title="Substantifs" items={substantifs} />;
    const contentWord = <DynamicList title="Mots differents" items={wordsList} />;
    const contentActive = <DynamicList title="Phrases actives" items={activeSentences} />;
    const contentPassive = <DynamicList title="Phrases passives" items={passiveSentences} />;
    const contentExp = <StaticBulletList title="Expressions"  data={this.state.expressions}  langueOr={itemDetails.langue}  langueCi={target_langue.substring(0, 2)}  />;
    {/* <DynamicList title="Adjectifs" items={adjectives} />
                  <DynamicList title="Verbes" items={verbs} />
                  <DynamicList title="Substantifs" items={substantifs} /> */}
    // const adjectives = ["deep", "complex", "truth", "human", "cold", "major", "melancholic"];
    // const verbs = ["specializing", "calculated", "work", "understand", "learn", "find"];
    // const substantifs = ["emotions", "decision", "imagine", "time", "Sarah", "room"];

    
    return (
      // <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <Homelayout navigation={this.props.navigation}>
          <ScrollView
            style={{
              height: hp('87%'),
              width: wp('100%'),
              backgroundColor: '#060a20'
            }}>
              
            <View style={[lists.headerStyle]}>
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


            {/* <Text>Liste des mots :</Text>
            <FlatList
              data={wordsList}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }) => <Text style={{color:'white'}}>{item}</Text>}
            /> */}
            <View
              style={{
                flex: 1,
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
                  onPress={() => this.props.navigation.goBack()}>
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
                <Text style={details.title} >No legend</Text>
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

              <View style={{ backgroundColor: '#020D4D', padding: 10, marginBottom: 5, borderTopLeftRadius: 15 }}>
                {/* <ScrollView horizontal={true}>
                  <View style={{ flexDirection: 'row' }}>
                    <TouchableOpacity onPress={() => this.openOrig()}>
                      <Text style={this.state.styleOrigin}>Texte d'origine</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.openRetravail()}>
                      <Text style={this.state.styleRevise}>Texte retravaillé</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.openIA()}>
                      <Text style={this.state.styleIA}>Texte reformulé par IA</Text>
                    </TouchableOpacity>
                  </View>
                </ScrollView> */}
                <View style={{ backgroundColor: '#020D4D', marginBottom: 10 }}>
                  <View style={{ flexDirection: 'row' }}>
                    <TouchableOpacity onPress={() => this.openTXT()}
                      style={[details.TextButton, this.state.stateText || details.ActiveTextButton]}
                    >
                      <View>
                        <Text style={details.textTitle}>Texte</Text>
                      </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.openTrad()}
                      style={[details.TextTradButton, this.state.stateText2 || details.DisabledTextButton]}
                    >
                      <View>
                        <Text style={details.textTitle}>Translation </Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                  {this.state.showedTxt?
                  (<TextInput
                    style={{
                      backgroundColor: '#2B4098',
                      color: 'white',
                      textAlign: 'justify',
                      marginBottom: 10,
                      padding: 20,
                      borderBottomRightRadius: 5,
                      borderBottomLeftRadius: 5,
                      marginBottom: 10
                    }}
                    value={this.state.txt}
                    onChangeText={(text) => this.setState({ txt: text, inText:true })}
                    multiline={true}
                  />):
                  (<TextInput
                    style={{
                      backgroundColor: '#2B4098',
                      color: 'white',
                      textAlign: 'justify',
                      marginBottom: 10,
                      padding: 20,
                      borderBottomRightRadius: 5,
                      borderBottomLeftRadius: 5,
                      marginBottom: 10
                    }}
                    value={this.state.trad}
                    onChangeText={(text) => this.setState({ trad: text, inText:true })}
                    multiline={true}
                  />)
                  }
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
                  {(itemDetails.langue == 'en' || target_langue == 'en-US')?(<View>
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
                      nb1={nbMots}
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
            {/* <RectButton
                onPress={() => {
                  this.handleSendMessage()
              }}
              text="Analyse"
              backgroundColor="#3498F0"
              /> */}
           
            </View>
          </ScrollView>
          <BeforeAudio visible={this.state.beforeAudio} onClose={() => this.closeModal()} navigation={this.props.navigation} list = {()=>this.goToAudio()} newp = {()=>{this.closeModal(),this.props.navigation.navigate('Enregistre')}} />
          <StatsModal visible={this.state.showTxtStat} onClose={()=>this.closeStat()} contentStat={this.state.contentStat}/>
        </Homelayout>
      // </KeyboardAvoidingView>

    );
  }
}
const mapStateToProps = (state) => ({
  userInfo: state.auth.userInfo,
  audioData : state.data_Audio.audioData,
  category: state.categ.category
});

const mapDispatchToProps = (dispatch) => {
  return {
    dispatchfetchAudio:id => dispatch(fetchAudio(id))
  };
};

export default connect(mapStateToProps, mapDispatchToProps )(Audioplayer);
