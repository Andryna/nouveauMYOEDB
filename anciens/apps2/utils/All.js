import { myLang } from "../constants/myconst";
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
  export const OpenEl = (navigation,user) => {
    // alert('test');
    navigation.navigate('Elv3',{user:user})
  }

  
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
  