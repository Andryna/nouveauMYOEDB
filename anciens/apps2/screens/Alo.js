import React from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  StyleSheet, 
  KeyboardAvoidingView, 
  ScrollView, 
  Alert, 
  Image 
} from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/Ionicons';
import AudioRecord from 'react-native-audio-record';
import Sound from 'react-native-sound';
import Homelayout from '../layouts/Homelayout';
import { transcript, translateText, getStats, generateChart } from '../utils/request';
import { connectToRedux } from '../config/reduxconfig';
import * as Progress from 'react-native-progress';
import axios from 'axios';
import { Buffer } from 'buffer';
import VerbList from '../components/list/VerbList';
import AdjList from '../components/list/AdjList';
import { grey100 } from 'react-native-paper/lib/typescript/styles/themes/v2/colors';
// import LottieView from 'lottie-react-native';
import Spinner from 'react-native-spinkit';
import {check,request,PERMISSIONS,RESULTS} from 'react-native-permissions';

class Alo extends React.Component {
  static navigationOptions = {
    headerShown: false,
    drawerLabel: 'Home',
    drawerIcon: ({ tintColor }) => (
      <Icon name="ios-home" color={'blue'} size={20} />
    ),
  };

  constructor(props) {
    super(props);
    this.state = {
      record: false,
      recordingSlot: 1,
      audioFile1: null,
      audioFile2: null,
      sound1: null, // Sound instance for audio1
      sound2: null, // Sound instance for audio2
      isPlaying1: false, // Track play/pause state for audio1
      isPlaying2: false, // Track play/pause state for audio2
      transcripts: false,
      transcribed: false,
      percentCompleted: 0,
      txtfr:null,
      txten:null,
      activeTab: 'text',
      set1: '30', // Taille du premier ensemble
      set2: '10', // Taille du deuxième ensemble
      intersect: '5', // Taille de l'intersection
      imageUri: null,
      vennDiagramUri:null,
      vennHapax:null,
      vennVerb:null,
      vennSub:null,
      vennAdj:null,
      analysing:false,
      activeTab2: 'verbs',
      analysed:true
    };
  }

  componentDidMount() {
    // Initialiser AudioRecord
    AudioRecord.init({
      sampleRate: 32000,
      channels: 1,
      bitsPerSample: 16,
      wavFile: 'audio1.wav',
    });

    // Vérifier et demander la permission
    this.checkPermission();
  }

  checkPermission = async () => {
    try {
      const result = await check(PERMISSIONS.ANDROID.RECORD_AUDIO);
      switch (result) {
        case RESULTS.UNAVAILABLE:
          console.log('Cette fonctionnalité n\'est pas disponible (sur cet appareil / dans ce contexte)');
          break;
        case RESULTS.DENIED:
          console.log('La permission n\'a pas été demandée / est refusée mais peut être demandée');
          await this.requestPermission();
          break;
        case RESULTS.LIMITED:
          console.log('La permission est limitée : certaines actions sont possibles');
          break;
        case RESULTS.GRANTED:
          console.log('La permission est accordée');
          break;
        case RESULTS.BLOCKED:
          console.log('La permission est refusée et ne peut plus être demandée');
          break;
      }
    } catch (error) {
      console.error('Erreur lors de la vérification des permissions:', error);
    }
  };

  requestPermission = async () => {
    try {
      const result = await request(PERMISSIONS.ANDROID.RECORD_AUDIO);
      console.log('Demande de permission:', result);
      if (result === RESULTS.GRANTED) {
        console.log('Permission accordée après la demande');
      }
    } catch (error) {
      console.error('Erreur lors de la demande de permission:', error);
    }
  };



  fetchVennDiagram = async () => {
    const { set1, set2, intersect } = this.state;
    try {
        const response = await axios.get('http://149.202.58.189:5018/venn', {
            params: { set1, set2, intersect },
            responseType: 'arraybuffer', // Récupérer les données sous forme binaire
        });

        // Convertir l'image binaire en Base64
        const base64 = `data:image/png;base64,${Buffer.from(response.data, 'binary').toString('base64')}`;
        this.setState({ imageUri: base64 }); // Mettre à jour l'état avec l'image Base64
    } catch (error) {
        console.error('Erreur lors de la récupération du diagramme de Venn:', error);
    }
};

sendJsonToFlask = async (stats1, stats2) => {
  const data =[
    {"stats_duree": 0}, 
    {"stats_nbwords": 11},
    {"stats_debits": 0}, 
    {"glossaire_adjectivs": ["0"],
    "stats_nbadj": 0}, 
    {"glossaire_verbs": ["testing", "good"],
      "stats_nbverb": 1}, 
    {"glossaire_hapaxes": ["gentlemen", 
    "testing", "jersey", "hello", "peace", 
    "ladies", "transcription"], "stats_nbhapax": 7}, 
    {"phrase_active": ["Hello ladies and gentlemen, I am testing peace jersey for transcription."], 
    "phrase_passive": ["0"], "stats_nbact": 1, "stats_nbpass": 0}, 
    {"conjugaison_ingVerb": ["testing"], "conjugaison_modalVerb": ["0"], 
    "conjugaison_pastParticipe": ["0"], "conjugaison_pastVerb": ["0"], 
    "conjugaison_presentVerb": ["0"]}, 
    {"state_db": "no"}, {"type": "pas de durée"}, {"ref": "no ref", 
    "text_reference": "no ref"}, 
    {"glossaire_substantif": ["gentlemen", "jersey", "Hello", "ladies", "peace", "transcription"], "stats_substantif": 6}, 
    {"review": "not found"}, 
    {"glossaire_Mvide": {"am": 1, "and": 1, "for": 1, "i": 1}, "stats_Mvide": 4}, 
    {"glossaire_signifiant": {"gentlemen": 1, "hello": 1, "jersey": 1, "ladies": 1, "peace": 1, "testing": 1, "transcription": 1}, "stats_signifiant": 7}, 
    {"glossaire_Mot": {"am": 1, "and": 1, "for": 1, "gentlemen": 1, "hello": 1, "i": 1, "jersey": 1, "ladies": 1, "peace": 1, "testing": 1, "transcription": 1}, "stats_Mot": 11}
  ];
  const data2 =[
    {"stats_duree": 0}, 
    {"stats_nbwords": 11},
    {"stats_debits": 0}, 
    {"glossaire_adjectivs": ["0"],
    "stats_nbadj": 0}, 
    {"glossaire_verbs": ["testing", "give"],
      "stats_nbverb": 1}, 
    {"glossaire_hapaxes": [
      "more",
   
    "ladies", "transcription"], "stats_nbhapax": 7}, 
    {"phrase_active": ["Hello ladies and gentlemen, I am testing peace jersey for transcription."], 
    "phrase_passive": ["0"], "stats_nbact": 1, "stats_nbpass": 0}, 
    {"conjugaison_ingVerb": ["testing"], "conjugaison_modalVerb": ["0"], 
    "conjugaison_pastParticipe": ["0"], "conjugaison_pastVerb": ["0"], 
    "conjugaison_presentVerb": ["0"]}, 
    {"state_db": "no"}, {"type": "pas de durée"}, {"ref": "no ref", 
    "text_reference": "no ref"}, 
    {"glossaire_substantif": ["Hello", "ladies", "peace", "transcription", "autre"], "stats_substantif": 6}, 
    {"review": "not found"}, 
    {"glossaire_Mvide": {"am": 1, "and": 1, "for": 1, "i": 1}, "stats_Mvide": 4}, 
    {"glossaire_signifiant": {"gentlemen": 1, "hello": 1, "jersey": 1, "ladies": 1, "peace": 1, "testing": 1, "transcription": 1}, "stats_signifiant": 7}, 
    {"glossaire_Mot": {"am": 1, "and": 1, "for": 1, "gentlemen": 1, "hello": 1, "i": 1, "jersey": 1, "ladies": 1, "peace": 1, "testing": 1, "transcription": 1}, "stats_Mot": 11}
  ];
  
  const extractadj = (dataset) => {
    let adj = [];
    dataset.forEach(item => {
      if (item.glossaire_adjectivs) {
        adj = adj.concat(item.glossaire_adjectivs);  // Ajouter les hapaxes à l'array
      }
    });
    return adj;
  };
  const extractsub = (dataset) => {
    let sub = [];
    dataset.forEach(item => {
      if (item.glossaire_substantif) {
        sub = sub.concat(item.glossaire_substantif);  // Ajouter les hapaxes à l'array
      }
    });
    return sub;
  };
  const extractHapaxes = (dataset) => {
    let hapaxes = [];
    dataset.forEach(item => {
      if (item.glossaire_hapaxes) {
        hapaxes = hapaxes.concat(item.glossaire_hapaxes);  // Ajouter les hapaxes à l'array
      }
    });
    return hapaxes;
  };
  const extractVerbes = (dataset) => {
    let hapaxes = [];
    dataset.forEach(item => {
      if (item.glossaire_verbs) {
        verbes = hapaxes.concat(item.glossaire_verbs);  // Ajouter les hapaxes à l'array
      }
    });
    return verbes;
  };
  
  // Extraire les hapaxes de data et data2
  const hapaxesData = extractHapaxes(stats1);
  const hapaxesData2 = extractHapaxes(stats2);

  // Extraire les hapaxes de data et data2
  const verbesData = extractVerbes(stats1);
  const verbesData2 = extractVerbes(stats2);
  // extraire sub
  const sub1 = extractsub(stats1);
  const sub2 = extractsub(stats2);
  const adj1 = extractadj(stats1);
  const adj2 = extractadj(stats2);
  
  
  
  const data3 = [
    {
      "hapaxesData1": hapaxesData,
      "hapaxesData2": hapaxesData2
    }
  ];
  const data4 = [
    {
      "verbesData1": verbesData,
      "verbesData2": verbesData2
    }
  ];
  try {
    // const adjData = [
    //     {
    //         adjData1: ["grand", "petit", "vif", "heureux", "calme"],
    //         adjData2: ["petit", "heureux", "rapide", "tranquille"]
    //     }
    // ];
    const adjData = [
        {
            adjData1: adj1,
            adjData2: adj2
        }
    ];

    const adjResponse = await axios.post('http://149.202.58.189:5018/venn-adj', adjData, {
        headers: {
            'Content-Type': 'application/json',  // Assurez-vous d'envoyer en JSON
        },
        responseType: 'json',  // Attendez une réponse JSON
    });

    // Vérifiez si les données sont bien présentes
    const adj64v = `data:image/png;base64,${adjResponse.data.venn_image_base64}`;
    this.setState({
        vennAdj: adj64v, // Stocker l'image pour l'afficher
        onlyAdj1: adjResponse.data.only_adj1,
        onlyAdj2: adjResponse.data.only_adj2,
        intersectionAdj: adjResponse.data.intersection,
    });
} catch (error) {
    console.error("Erreur lors de l'envoi du JSON à Flask (adjectifs) :", error);
}

  





  try {
    const subData2 = [
      {
        "subData1": sub1,
        "subData2": sub2
      }
    ];
    console.log("sub",subData2);

    const subResponse = await axios.post('http://149.202.58.189:5018/venn-sub', subData2, {
        headers: {
            'Content-Type': 'application/json',  // Assurez-vous d'envoyer en JSON
        },
        responseType: 'json',  // Attendez une réponse JSON
    });

    // Vérifiez si les données sont bien présentes
    const sub64v = `data:image/png;base64,${subResponse.data.venn_image_base64}`;
    this.setState({
        vennSub: sub64v, // Stocker l'image pour l'afficher
        onlySub1: subResponse.data.only_sub1,
        onlySub2: subResponse.data.only_sub2,
        intersectionSub: subResponse.data.intersection,
    });
} catch (error) {
    console.error("Erreur lors de l'envoi du JSON à Flask (substantifs) :", error);
}


  try {
    const hapaxResponse = await axios.post('http://149.202.58.189:5018/venn-verbes', data4, {
      headers: {
          'Content-Type': 'application/json',  // Assurez-vous d'envoyer en JSON
      },
      responseType: 'json',  // Attendez une réponse JSON
    });

    // Vérifiez si les données sont bien présentes
    const hapax64v = `data:image/png;base64,${hapaxResponse.data.venn_image_base64}`;
    this.setState({
      vennVerb: hapax64v, // Stocker l'image pour l'afficher
      onlyVerbes1: hapaxResponse.data.only_verbes1,
      onlyVerbes2: hapaxResponse.data.only_verbes2,
      intersectionVb: hapaxResponse.data.intersection,
      analysing:false,
      analysed:true
    });
} catch (error) {
    console.error("Erreur lors de l'envoi du JSON à Flask verbs :", error);
}

  try {
    const hapaxResponse = await axios.post('http://149.202.58.189:5018/venn-hapax', data3, {
      headers: {
          'Content-Type': 'application/json',  // Assurez-vous d'envoyer en JSON
      },
      responseType: 'json',  // Attendez une réponse JSON
    });

    // Vérifiez si les données sont bien présentes
    const hapax64 = `data:image/png;base64,${hapaxResponse.data.venn_image_base64}`;
    this.setState({
      vennHapax: hapax64, // Stocker l'image pour l'afficher
      onlyHapax1: hapaxResponse.data.only_hapax1,
      onlyHapax2: hapaxResponse.data.only_hapax2,
      intersection: hapaxResponse.data.intersection,
    });
} catch (error) {
    console.error("Erreur lors de l'envoi du JSON à Flask hapax :", error);
}

  try {
    const response = await axios.post('http://149.202.58.189:5018/venn-json',  data, {
      headers: {
          'Content-Type': 'application/json',  // Assurez-vous d'envoyer en JSON
      },
      responseType: 'arraybuffer',  // Si vous attendez une image en réponse
  });

    // Convertir l'image binaire en base64
    const base64Image = `data:image/png;base64,${Buffer.from(response.data, 'binary').toString('base64')}`;
    this.setState({ vennDiagramUri: base64Image }); // Stocker l'image pour l'afficher
  } catch (error) {
    console.error("Erreur lors de l'envoi du JSON à Flask :", error);
  }
};

  handleGenerateChart = async () => {
    try {
      const response = await axios.post(
        'http://149.202.58.189:5018/api/generate-chart', // Remplacez par l'URL de votre API
        {
          values: [30, 40, 30], // Données pour le graphique
          labels: ['A', 'B', 'C'],
        },
        {
          responseType: 'arraybuffer', // Important pour récupérer l'image brute
        }
      );

      // Convertir l'image binaire en Base64
      const base642 = `data:image/png;base64,${Buffer.from(response.data, 'binary').toString('base64')}`;
      this.setState({ chartUri: base642 }); // Mettre à jour l'état avec l'image
    } catch (error) {
      console.error('Erreur lors de la récupération du graphique:', error);
    }

  };

  startRecording = () => {
    const { recordingSlot } = this.state;
    const fileName = recordingSlot === 1 ? 'audio1.wav' : 'audio2.wav';

    AudioRecord.init({
      sampleRate: 32000,
      channels: 1,
      bitsPerSample: 16,
      wavFile: fileName,
    });

    this.setState({ record: true , analysed: false});
    AudioRecord.start();
  };

  stopRecording = async () => {
    let audioFile = await AudioRecord.stop();
    this.setState((prevState) => {
      const newState = { record: false };
      if (prevState.recordingSlot === 1) {
        newState.audioFile1 = audioFile;
        newState.recordingSlot = 2;
      } else {
        newState.audioFile2 = audioFile;
        newState.recordingSlot = 1;
      }
      return newState;
    });
    // Alert.alert("Recording stopped", `Audio saved as ${audioFile}`);
  };

  toggleRecording = () => {
    if (this.state.record) {
      this.stopRecording();
    } else {
      this.startRecording();
    }
  };

  playPauseAudio1 = () => {
    const { audioFile1, sound1, isPlaying1 } = this.state;

    if (isPlaying1) {
      sound1.pause();
      this.setState({ isPlaying1: false });
    } else {
      if (!sound1) {
        const newSound1 = new Sound(audioFile1, '', (error) => {
          if (error) {
            Alert.alert("Error", "Failed to play audio 1!");
            return;
          }
          newSound1.play((success) => {
            if (!success) {
              Alert.alert("Error", "Playback of audio 1 failed");
            }
            this.setState({ isPlaying1: false });
          });
        });
        this.setState({ sound1: newSound1, isPlaying1: true });
      } else {
        sound1.play((success) => {
          if (!success) {
            Alert.alert("Error", "Playback of audio 1 failed");
          }
          this.setState({ isPlaying1: false });
        });
        this.setState({ isPlaying1: true });
      }
    }
  };

  playPauseAudio2 = () => {
    const { audioFile2, sound2, isPlaying2 } = this.state;

    if (isPlaying2) {
      sound2.pause();
      this.setState({ isPlaying2: false });
    } else {
      if (!sound2) {
        const newSound2 = new Sound(audioFile2, '', (error) => {
          if (error) {
            Alert.alert("Error", "Failed to play audio 2!");
            return;
          }
          newSound2.play((success) => {
            if (!success) {
              Alert.alert("Error", "Playback of audio 2 failed");
            }
            this.setState({ isPlaying2: false });
          });
        });
        this.setState({ sound2: newSound2, isPlaying2: true });
      } else {
        sound2.play((success) => {
          if (!success) {
            Alert.alert("Error", "Playback of audio 2 failed");
          }
          this.setState({ isPlaying2: false });
        });
        this.setState({ isPlaying2: true });
      }
    }
  };

  handleTranscript = async () => {
    this.setState({ transcripts: true, transcribed: false, analysing: true });

    const { userInfo } = this.props;
    const { audioFile1, audioFile2 } = this.state;
    console.log(userInfo,audioFile1, audioFile2);

    const responseFr = await transcript({
      userInfo,
      audioFile: audioFile1 || audioFile2,
      infolangue: 'fr-FR', // Set appropriate language info
      idLan: '5', // Set appropriate language ID
      onProgress: percentCompleted => {
        console.log(percentCompleted);
        this.setState({ percentCompleted });
      },
      typeteste: 'alo'
      
    });

    if (responseFr.success) {
      const { data, tosend } = responseFr;
      console.log(data);
      const translatedText = await translateText('en', data.result);
      const stats1 = await getStats(translatedText);
      console.log('Translated Text:', translatedText);
      console.log('stats:', stats1);
      this.setState({
        txtfr: data.result,
        pathaudio: data.audio,
        percentCompleted: 0,
        transcribed: true,
        showtxt: true,
        newText: true,
        resp: data,
        stats1: stats1,
        tosend,
      });
      const responseEn = await transcript({
        userInfo,
        audioFile: audioFile2,
        infolangue: 'en-US', // Set appropriate language info
        idLan: '3', // Set appropriate language ID
        onProgress: percentCompleted => {
          console.log(percentCompleted);
          this.setState({ percentCompleted });
        },
      });

      if (responseEn.success) {
        const { data, tosend } = responseEn;
        const stats2 = await getStats(data.result);
        console.log(data);
        this.setState({
          transcripts: false,
          txten: data.result,
          pathaudio: data.audio,
          percentCompleted: 100,
          transcribed: true,
          showtxt: true,
          newText: true,
          resp: data,
          stats2: stats2,
          tosend,
        });
        
        Alert.alert("Success EN et FR", "Transcription Français-Anglais completed!");
        this.setActiveTab('analysis'); // Mettre l'onglet actif

        // await this.fetchVennDiagram(); // Attendre que fetchVennDiagram se termine
        // await this.handleGenerateChart(); // Ensuite, exécuter handleGenerateChart
        await this.sendJsonToFlask(stats1, stats2); // Ensuite, exécuter handleGenerateChart
      } else {
        Alert.alert("Error", "Failed to transcribe EN audio!");
        this.setState({ transcripts: false });
      }
    } else {
      Alert.alert("Error", "Failed to transcribe FR audio!");
      this.setState({ transcripts: false });
    }
  };
  setActiveTab = (tab) => {
    this.setState({ activeTab: tab });
  };


  renderContent() {
    const { activeTab2 } = this.state;

    switch (activeTab2) {
      case 'verbs':
        return (
            <View style={styles.content}>
              {/* <Text style={styles.txtTitle}>Diagramme des Verbes</Text> */}
              {this.state.vennVerb && (<Image
                source={{ uri: this.state.vennVerb}}
                style={styles.image}
              />)}
              <VerbList
                onlyVerbes1={this.state.onlyVerbes1}
                onlyVerbes2={this.state.onlyVerbes2}
                intersection={this.state.intersectionVb}
                uniqueFr = "Uniquement fr"
                uniqueEn = "Uniquement En"
                commun = "Commun"
              />
            
            </View>
        );
      case 'substantives':
        return (
          <View style={styles.content}>
            {/* <Text style={styles.txtTitle}>Diagramme des Substantifs</Text> */}
            {this.state.vennSub && (<Image
              source={{ uri: this.state.vennSub }}
              style={styles.image}
            />)}
            <VerbList
                onlyVerbes1={this.state.onlySub1}
                onlyVerbes2={this.state.onlySub2}
                intersection={this.state.intersectionSub}
                uniqueFr = "Uniquement fr"
                uniqueEn = "Uniquement En"
                commun = "Commun"
              />
          </View>
        );
      case 'adjectives':
        return (
          <View style={styles.content}>
            {/* <Text style={styles.txtTitle}>Diagramme des Adjectifs</Text> */}
            {this.state.vennAdj && (<Image
              source={{ uri: this.state.vennAdj }}
              style={styles.image}
            />)}
            <VerbList
                onlyVerbes1={this.state.onlyAdj1}
                onlyVerbes2={this.state.onlyAdj2}
                intersection={this.state.intersectionAdj}
                uniqueFr = "Uniquement fr"
                uniqueEn = "Uniquement En"
                commun = "Commun"
              />
          </View>
        );
      default:
        return null;
    }
  }
  restore(){
    // alert("stop");
    this.setState({
      analysed:true,
      record: false,
      recordingSlot: 1,
      audioFile1: null,
      audioFile2: null,
      sound1: null, // Sound instance for audio1
      sound2: null, // Sound instance for audio2
      isPlaying1: false, // Track play/pause state for audio1
      isPlaying2: false, // Track play/pause state for audio2
      transcripts: false,
      transcribed: false,
      percentCompleted: 0,
      txtfr:null,
      txten:null,
      activeTab: 'text',
      set1: '30', // Taille du premier ensemble
      set2: '10', // Taille du deuxième ensemble
      intersect: '5', // Taille de l'intersection
      imageUri: null,
      vennDiagramUri:null,
      vennHapax:null,
      vennVerb:null,
      vennSub:null,
      vennAdj:null,
      analysing:false,
      activeTab2: 'verbs'

    })
  }

  render() {
    const { record, isPlaying1, isPlaying2, txtfr, txten,percentCompleted, transcripts, activeTab, audioFile1, audioFile2, analysing, analysed } = this.state;
    const fr_flag = require('../image/fr.png');
    const en_flag = require('../image/en.png');
    const { imageUrl, error } = this.state;
    const { chartUri, imageUri, vennDiagramUri, vennHapax,vennVerb, vennSub, vennAdj} = this.state;
    
    return (
      <KeyboardAvoidingView style={styles.container}>
        {/* <Homelayout navigation={this.props.navigation}> */}
          <ScrollView style={styles.scrollContainer}>
            <View style={styles.header}>
              <Text style={styles.headerText}>ALO</Text>
            </View>
            <View>
              {txtfr && txten && (<View style={styles.navBar}>
                <TouchableOpacity
                  style={[styles.navButton, activeTab === 'text' && styles.activeButton]}
                  onPress={() => this.setActiveTab('text')}
                >
                  <Text style={[styles.navText, activeTab === 'text' && styles.activeText]}>Textes</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.navButton, activeTab === 'analysis' && styles.activeButton]}
                  // onPress={() => {this.setActiveTab('analysis'), this.fetchVennDiagram(), this.handleGenerateChart()}}
                  onPress={async () => {
                    this.setActiveTab('analysis'); // Mettre l'onglet actif
                }}
                
                >
                  <Text style={[styles.navText, activeTab === 'analysis' && styles.activeText]}>Analyses</Text>
                </TouchableOpacity>
              </View>)}
              {txtfr && txten ? (<View>
                {activeTab === 'text' &&(
                  <View>
                    <Text style={styles.txtTitle}>Votre discours en Français</Text>
                    <Text style={styles.txt}>
                      {txtfr}
                    </Text>
                    <Text style={styles.txtTitle}>Votre discours en anglais</Text>
                    <Text style={styles.txtc}>
                      {txten}
                    </Text>
                  </View>
                )}
                {activeTab === 'analysis' &&(
                  <View>
                    <View style={styles.tabBar}>
                      <TouchableOpacity
                        style={[
                          styles.tabButton,
                          this.state.activeTab2 === 'verbs' && styles.activeTabButton,
                        ]}
                        onPress={() => this.setState({ activeTab2: 'verbs' })}
                      >
                        <Text style={styles.tabText}>Verbes</Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={[
                          styles.tabButton,
                          this.state.activeTab2 === 'substantives' && styles.activeTabButton,
                        ]}
                        onPress={() => this.setState({ activeTab2: 'substantives' })}
                      >
                        <Text style={styles.tabText}>Noms</Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={[
                          styles.tabButton,
                          this.state.activeTab2 === 'adjectives' && styles.activeTabButton,
                        ]}
                        onPress={() => this.setState({ activeTab2: 'adjectives' })}
                      >
                        <Text style={styles.tabText}>Adjectifs</Text>
                      </TouchableOpacity>
                    </View>
                    {this.renderContent()}
                  </View>
                )}
              </View>):
              <View>

                <Text style={styles.titleHome}>Bonjour!</Text>
                <Text style={styles.txtHome}>Evaluer votre capacité de production lexicale</Text>
                <Text style={styles.txtHome}>Indentifier votre besoin lexicale en anglais à partir du français</Text>
                {/* <LottieView
                  source={require('../animations/analyse.json')} // Chemin vers votre fichier JSON
                  autoPlay // Démarre automatiquement
                  loop // Répète l'animation en boucle
                  style={styles.animation}
                /> */}
                {analysing && (<View style={{
                  alignSelf:'center',
                  marginTop:hp('10%')
                }}>
                  <Spinner  color={'#1349a0'} size={120} type={'ChasingDots'} />
                  <Text style={{color:"#1349a0", textAlign:'center'}}>analyse en cours ...</Text>
                </View>)}
              </View>
              
              }
            </View>
            {transcripts?(
            <View style={{
              justifyContent:'center',
              alignItems:'center'
            }}>
              <Progress.Bar progress={percentCompleted/100} width={200} color= {'#081241'} />
            </View>
            ):null}
          </ScrollView>

          <View style={styles.micContainer}>
            {audioFile1 && (<View style={styles.audioplayer}>
              <Image source={fr_flag} style={styles.flag} />
              <TouchableOpacity
                onPress={this.playPauseAudio1}
                style={[styles.micButton, { backgroundColor: 'blue' }]}
              >
                <Icon name={isPlaying1 ? 'pause' : 'play'} size={20} color="white" />
              </TouchableOpacity>
            </View>)}

            {(audioFile1 && audioFile2)?
              (<TouchableOpacity
                onPress={()=>this.restore()}
                
                style={[styles.micButton, { backgroundColor: 'white' , borderWidth:1, borderColor:'red', borderRadius:50}]}
              >
                <Icon name={'refresh'} size={30} color="red" />
              </TouchableOpacity>):
              (<TouchableOpacity
                onPress={this.toggleRecording}
                style={[styles.micButton, { backgroundColor: record ? 'red' : '#47BD7A' }]}
              >
                <Icon name={record ? 'stop' : 'mic'} size={30} color="white" />
              </TouchableOpacity>)
            }

            {audioFile2 && (<View style={styles.audioplayer}>
              <Image source={en_flag} style={styles.flag} />
              <TouchableOpacity
                onPress={this.playPauseAudio2}
                style={[styles.micButton, { backgroundColor: 'blue' }]}
              >
                <Icon name={isPlaying2 ? 'pause' : 'play'} size={20} color="white" />
              </TouchableOpacity>
            </View>)}
          </View>

          {(audioFile1 && audioFile2 && !analysed )?(<View style={styles.transcriptionContainer}>
            <TouchableOpacity
              onPress={this.handleTranscript}
              style={styles.transcriptionButton}
            >
              <Text style={styles.transcriptionButtonText}>Analyser</Text>
            </TouchableOpacity>
          </View>):null}
        {/* </Homelayout> */}
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  animation:{
    width:200,
    height:200
  },
  titleHome:{
    color:'#1349a0',
    textAlign:'center',
    fontSize:24,
    fontWeight:'bold'
  },
  txtHome:{
    color:'grey',
    fontSize:18,
    textAlign:'center',
    marginTop:15
  },
  logoApp:{
    color:'white',
    flexDirection:'row'
  },
  textLogo:{
    color:'white',
  },
  content: {
    flex: 1,
    padding: 20,
    backgroundColor: 'white', // Ajoutez une couleur de fond pour la clarté
  },
  
  tabBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: 'grey',
    paddingVertical: 10,
  },
  tabButton: {
    padding: 10,
  },
  activeTabButton: {
    borderBottomWidth: 3,
    borderBottomColor: '#fff',
  },
  tabText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  navBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#ddd',
    paddingVertical: 10,
  },
  navButton: {
    padding: 10,
  },
  navText: {
    fontSize: 16,
    color: '#555',
  },
  activeButton: {
    borderBottomWidth: 2,
    borderBottomColor: '#007bff',
  },
  activeText: {
    color: '#007bff',
  },
  txtTitle:{
    fontSize:18,
    fontWeight:'bold',
    textAlign:'center',
    marginTop:15
  },
  txt:{
    padding:25,
    paddingLeft:20,
    paddingRight:20,
    textAlign:'justify',
    borderWidth:1,
    borderColor:'grey',
    borderRadius:10,
    marginTop:20,
    marginLeft:20,
    marginRight:20
  },
  txtc:{
    padding:25,
    paddingLeft:20,
    paddingRight:20,
    textAlign:'justify',
    borderWidth:1,
    borderColor:'grey',
    borderRadius:10,
    marginTop:20,
    marginBottom:20,
    marginLeft:20,
    marginRight:20
  },
  flag: {
    width: 30,
    height: 20,
    borderRadius: 2,
    marginBottom: 5,
  },
  audioplayer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  scrollContainer: {
    backgroundColor: 'white',
    height: hp('65%')
  },
  header: {
    backgroundColor: '#081241',
    paddingHorizontal: wp('5%'),
    paddingVertical: 15,
    // alignItems: 'center',
  },
  headerText: {
    color: 'white',
    fontSize: 20,
    textAlign: 'Left',
    fontWeight:'bold',
    fontStyle:'italic'
  },
  micContainer: {
    backgroundColor: 'white',
    height: hp('20%'),
    justifyContent: 'space-around',
    alignItems: 'center',
    flexDirection: 'row',
  },
  micButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  transcriptionContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  transcriptionButton: {
    backgroundColor: '#081241',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 5,
  },
  transcriptionButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  image: {
    width: 400,
    height: 400,
    marginTop: 20,
    backgroundColor:'grey',
    alignSelf:'center'
  },
});

export default connectToRedux(Alo);
