import { myLang } from "../constants/myconst";
// import AsyncStorage from '@react-native-community/async-storage';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const openHome = (navigation) => {
    navigation.navigate('Accueil');
  };
  export const OpenLink = (navigation) => {
    navigation.navigate('CategoryView',{cat:this.state.cat,dataSource:this.state.dataSource,id_groupe:this.state.id_groupe,trand:this.state.trand,id:this.state.id})
  }
  export const OpenCat = (navigation,user) => {
    // navigation.navigate('CategoryView',{cat:this.state.cat,dataSource:this.state.dataSource,id_groupe:this.state.id_groupe,trand:this.state.trand,id:this.state.id})
    navigation.navigate('CategoryView',{user:user})
  }

  export const OpenAlo = (navigation,user) => {
    // navigation.navigate('CategoryView',{cat:this.state.cat,dataSource:this.state.dataSource,id_groupe:this.state.id_groupe,trand:this.state.trand,id:this.state.id})
    navigation.navigate('Alo',{user:user})
  }
   export const OpenEl = async (navigation, user) => {
    const token = await getCNX();
    navigation.navigate('Elv3', { user: user, token: token });
  };

  export const OpenChat = (navigation,user) => {
    // alert('test');
    navigation.navigate('Chat',{user:user})
  }

  export const goToChat = (navigation, closeModal, user = {}, config) => {
    // alert("Navigating to Chat" + JSON.stringify(config));
    if (typeof closeModal === 'function') {
      closeModal();
    }

    if (navigation && typeof navigation.navigate === 'function') {
      navigation.navigate('Chat', { user: user, config: config }); // params peut contenir userInfo
    }
  };


  
  export const Openjitsi = (navigation,user) =>{
    navigation.navigate('Room',{user:user});
  }
  export const getLanguageCode = (id) => {
    const languages = [
      { id: "1", code: 'en-US', label: 'ENGLISH', imageSource: require('../image/en.png') },
      { id: "5", code: 'fr-FR', label: 'FRENCH', imageSource: require('../image/fr.png') },
      { id: "7", code: 'de-DE', label: 'ALLEMAND', imageSource: require('../image/Germany.png') },
      { id: "4", code: 'es-ES', label: 'SPANISH', imageSource: require('../image/es.png') },
    ];
  
    const language = languages.find(lang => lang.id === id);
    return language ? language.code : 'en-US'; 
  };
  export const getLanguageId = (code) => {
    const languages = [
        { id: "1", code: 'en-US', label: 'ENGLISH', imageSource: require('../image/en.png') },
        { id: "5", code: 'fr-FR', label: 'FRENCH', imageSource: require('../image/fr.png') },
        { id: "7", code: 'de-DE', label: 'ALLEMAND', imageSource: require('../image/Germany.png') },
        { id: "4", code: 'es-ES', label: 'SPANISH', imageSource: require('../image/es.png') },
    ];

    const language = languages.find(lang => lang.code === code);
    return language ? language.id : null; // Retourne null si non trouvé
};

  
  // Utilisation
  // const languageCode = getLanguageCodeById("5");
  // console.log(languageCode); // Affiche 'fr-FR'


export const getCNX = async () => {
  // await AsyncStorage.removeItem('data_Token');
  try {
    const storedData = await AsyncStorage.getItem('data_Token');

    if (storedData) {
      const parsed = JSON.parse(storedData);
      const cnx = parsed?.userdata?.CNX;

      if (cnx) {
        console.log('🔑 CNX token :', cnx);
        return cnx;
      } else {
        console.log('⚠️ CNX non trouvé dans data_Token');
        return null;
      }
    } else {
      console.log('⚠️ Aucun data_Token trouvé');
      return null;
    }
  } catch (error) {
    console.log('❌ Erreur lors de la récupération du CNX :', error);
    return null;
  }
};