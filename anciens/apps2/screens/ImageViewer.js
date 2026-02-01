
import Fontawesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import React, { Component } from 'react';
import { View, TouchableOpacity, Text, ScrollView, Image, StyleSheet, Alert, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import config from '../../config.json';
import { connect,useDispatch } from 'react-redux';
import { getImages } from '../actions/images';
import RectButton from '../components/buttons/RectButton';
import { getStats } from '../utils/request';
import BoxStats from '../components/buttons/BoxStats';
import { details } from '../../styles/styleAcuueil';
import { Svg, Path } from 'react-native-svg';
import AddButton2 from '../components/buttons/AddButton2';
import { PowerTranslator, ProviderTypes, TranslatorConfiguration, TranslatorFactory } from 'react-native-power-translator';
import TextModalsIMG from '../components/modals/TextModalsIMG';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import ZoomableImage from '../components/cards/ZoomableImage';
import Spinner from 'react-native-spinkit';
import { getLanguageCode } from '../utils/All';
const base_url = config.base_url;
const base_grp_url = config.base_grp_url;

 class ImageViewer extends Component {
  static navigationOptions = {
    headerShown: false,
    title: 'Forma2+',
    headerStyle: {
      backgroundColor: '#2f3c7e',
    },
    headerTintColor: '#fff',
    headerLeft: () => null,
  };

  constructor(props) {
    super(props); // Appeler le constructeur de la classe parente

    // Initialiser l'état avec les valeurs des paramètres de la route
    this.state = {
      f_name: this.props.route.params.f_name,
      id_groupe: this.props.route.params.id_groupe,
      trad: this.props.route.params.trad,
      txt: this.props.route.params.original,
      description: this.props.route.params.description,
      id_exp: this.props.route.params.id_exp,
      id_files: this.props.route.params.id_files,
      toEdit: false,
      scanning: false,
      selectedLangue: this.props.route.params.selectedLangue,
      langue: this.props.route.params.selectedLangue,
      showLang: false,
      isDropdownVisible: false,
      selectedFlag: require('../image/en.png'),
      targetLangue: this.props.route.params.targetLangue,
      lieu: this.props.route.params.lieu,
      date: this.props.route.params.date,
      start: null, // Index du début de la sélection
      end: null,
      selection: { start: 0, end: 0 },
      showCustomActions: false,
      selectedText: '',
      position: { top: 0, left: 0 },
      // scale: new Animated.Value(1), // Valeur de mise à l'échelle initiale pour le zoom
      isZoomed: false,
      fontSize: 14,
      newText: false,
      rotation: 0,
      MYstats: null, // Nouvelle valeur ajoutée ici
      scrollEnabled: true,
    };
    this.lastRotation = 0;
  }

  toggleScroll = (enabled) => {
    this.setState({ scrollEnabled: enabled });
  };

  componentDidMount() {
    this.fetchStats();
  }

  rotateRight = () => {
    this.setState(prevState => ({
      rotation: prevState.rotation + 90, // Ajoute 90 degrés à chaque clic
    }));
  };
  rotateLeft = () => {
    this.setState(prevState => ({
      rotation: prevState.rotation - 45, // Ajoute 90 degrés à chaque clic
    }));
  };
  
  async fetchStats() {
    try {
      const rep = await getStats(this.state.txt);
      this.setState({ MYstats: rep });
      console.log(rep);
      // Utilisez `rep` ici comme nécessaire
    } catch (error) {
      // Gérez l'erreur ici
      console.error(error);
    }
  }
  
  
  suprimer = (idxp, name) => {
    const { id_groupe } = this.state;
    console.log(name + ' et ' + idxp + ' ' + id_groupe);
  
    let url = name !== '' 
      ? base_url + '/portail-stagiaire/delete.php' 
      : base_url + '/portail-stagiaire/deleteexp.php';
  
    const body = name !== ''
      ? JSON.stringify({ id: idxp, myFile: name, id_groupe: id_groupe })
      : JSON.stringify({ id: idxp });
  
    fetch(url, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: body
    })
    .then(response => response.json())
    .then(rep => {
      if (rep === '') {
        console.log('ts tonga');
      } else {
        const { userInfo } = this.props;
        return this.props.getImage(userInfo.id);
      }
    })
    .then(() => {
      const { userInfo } = this.props;
      this.props.navigation.navigate('Images', { id_groupe: userInfo.id_groupe });
    })
    .catch(error => {
      console.error(error);
      const { userInfo } = this.props;
      return this.props.getImage(userInfo.id);
    })
    .then(() => {
      const { userInfo } = this.props;
      this.props.navigation.navigate('Images', { id_groupe: userInfo.id_groupe });
    });
  };
  

delete = (idxp, name) => {
  console.log(name);
  Alert.alert(
    'DELETING EXPRESSION',
    'Are you sure you want to delete this Expression?',
    [
      { text: 'NO', onPress: () => console.warn('NO Pressed') },
      { text: 'YES', onPress: () => this.suprimer(idxp, name) }
    ]
  );
};

  showEdit = () => {
    this.setState({toEdit:true});
  };
  hideEdit = async () => {
    this.setState({toEdit:false});
    const {userInfo} = this.props;

    const formData = new FormData();
    formData.append('id_stag',userInfo.id);
    formData.append('id_exp',this.state.id_exp);
    formData.append('txt',this.state.txt);
    formData.append('trad',this.state.trad);
    formData.append('description',this.state.description);
    formData.append('id_groupe',userInfo.id_groupe);
    const urlimage = base_url + "/portail-stagiaire/updateFile.php";
    const response = await fetch(urlimage, {
      method: 'POST',
      headers: {
        'Content-Type': 'multipart/form-data',
        // 'Content-Type': `audio/aac`,
      },
      body: formData,
    }
    ).then((response) => response.json())
        .then((rep) => {
          if (rep == '') {
            alert('le serveur ne repond pas');
          }
          else {
            console.log("reponse serveur: "+rep);
            
            this.props.getImage(userInfo.id)
            .then(() => {
                // alert('picture deleted');
                this.props.navigation.navigate('Images',{id_groupe:userInfo.id_groupe});
            });
          }
        }).catch((error) => {
          console.error(error);
        });
  };

  zoomIn = () => {
    this.setState(prevState => ({
      fontSize: prevState.fontSize + 2, // Augmenter la taille de 2
    }));
  };

  // Réduire la taille de la police
  zoomOut = () => {
    this.setState(prevState => ({
      fontSize: prevState.fontSize > 12 ? prevState.fontSize - 2 : 12, // Réduire la taille de 2, minimum 12
    }));
  };
  getLanguageCode = (languageCode) => {
    if (languageCode === 'en') {
      return 'en-US';
    } else if (languageCode === 'fr') {
      return 'fr-FR';
    } else if (languageCode === 'es') {
      return 'es-ES';
    } else {
      return 'en-US'; // Valeur par défaut
    }
  }

  toggleDropdown = () => {
    this.setState(prevState => ({ isDropdownVisible: !prevState.isDropdownVisible }));
  };

  handleTranslate = (itemValue) => {
    const languages = [
      { id: "1", code: 'en-US', label: 'ENGLISH', imageSource: require('../image/en.png') },
      { id: "5", code: 'fr-FR', label: 'FRENCH', imageSource: require('../image/fr.png') },
      { id: "7", code: 'de-DE', label: 'ALLEMAND', imageSource: require('../image/Germany.png') },
      { id: "4", code: 'es-ES', label: 'SPANISH', imageSource: require('../image/es.png') },
    ];
    if (itemValue !== '') {
      const flagSource = itemValue === 'en-US'
        ? require('../image/en.png')
        : itemValue === 'fr-FR'
        ? require('../image/fr.png')
        : itemValue === 'de-DE'
        ? require('../image/Germany.png')
        : require('../image/es.png');
  
      const selectedLanguage = languages.find(language => language.code === itemValue).id;
      const selectedLanguage2 = languages.find(language => language.id === selectedLanguage).code;
  
      this.setState({
        picIdlangue: itemValue,
        selectedFlag: flagSource,
        targetLangue:selectedLanguage,
        isDropdownVisible: false
      });
  
      // Afficher une alerte avec la langue sélectionnée
      // alert(`Langue cible : ${selectedLanguage2}`);
  
      console.log(JSON.stringify(flagSource));
      console.log(this.state.expres + '_%_' + itemValue.substring(0, 2));
      TranslatorConfiguration.setConfig(ProviderTypes.Google, config.googleCloud.apiKey, itemValue.substring(0, 2));
  
      const translator = TranslatorFactory.createTranslator();
      translator.translate(this.state.txt).then(translated => {
        // Tts.setDefaultLanguage(itemValue);
        // Tts.speak(translated);
        this.setState({ selectedTrad: translated, trad: translated, selectedFlag: flagSource, targetLangue: selectedLanguage});
      });
  
    } else {
      alert('This option is not available');
    }
  };
  closeModal = () => {
    this.setState({
      newAudio: false,
      newText: false,
      showText: false,
      showEditText: false,
      trad:false,
      newVideo: false,
      newImage: false,
      beforeAudio: false,
      beforeTexte: false,
      beforeVideo: false,
      beforeImage: false,
    });
  }

  analyseImg = async () => {
    try {
      this.setState({ scanning: true });
  
      const imageUrl  = base_grp_url+this.state.id_groupe+'/'+this.state.f_name; // Assurez-vous que `imageUrl` est défini dans l'état
  
      // Étape 1 : Télécharger l'image depuis l'URL
      const response = await fetch(imageUrl);
      const blob = await response.blob();
  
      // Étape 2 : Convertir le blob en base64
      const base64 = await this.convertBlobToBase64(blob);
  
      // Étape 3 : Envoyer l'image en base64 à l'API Google Vision
      const googleVisionRes = await fetch(config.googleCloud.api + config.googleCloud.apiKey, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          requests: [
            {
              image: {
                content: base64
              },
              features: [{ type: "TEXT_DETECTION", maxResults: 5 }]
            }
          ]
        })
      });
  
      const result = await googleVisionRes.json();
  
      if (result && result.responses && result.responses[0].fullTextAnnotation) {
        const texteDetecte = result.responses[0].fullTextAnnotation.text;
  
        this.setState({
          txt: texteDetecte,
          scanning: false,
          toEdit:true
        });
        alert('scan terminer');
        console.log("Texte scanné : ", texteDetecte);
      } else {
        console.log("Aucun texte détecté.");
        this.setState({ scanning: false, scanned: false });
      }
    } catch (error) {
      console.error("Erreur lors de l'analyse de l'image : ", error);
      this.setState({ scanning: false });
    }
  };
  
  // Fonction pour convertir un blob en base64
  convertBlobToBase64 = (blob) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result.split(',')[1]); // Ignorer le préfixe 'data:...'
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  };

  render() {
    const { isDropdownVisible, langue , selectedFlag, rotation, lieu, date, fontSize, txt, targetLangue} = this.state;
    const {userInfo} = this.props;
    const {MYstats } = this.state;
    const imageSource = this.state.langue !== 'en-US' ? require('../image/en.png') : require('../image/fr.png');
    const imageTrans = this.state.langue === 'en-US' ? require('../image/en.png') : require('../image/fr.png');
    const languageShortCode = this.getLanguageCode(langue);
    const { isZoomed } = this.state;
    const target_langue = getLanguageCode(targetLangue);
    const languages = [
      { id: "1", code: 'en-US', label: 'ENGLISH', imageSource: require('../image/en.png') },
      { id: "5", code: 'fr-FR', label: 'FRENCH', imageSource: require('../image/fr.png') },
      { id: "7", code: 'de-DE', label: 'ALLEMAND', imageSource: require('../image/Germany.png') },
      { id: "4", code: 'es-ES', label: 'SPANISH', imageSource: require('../image/es.png') },
    ];
    
    // const flagSource = langue === 'en'
    //   ? require('../image/en.png')
    //   : langue === 'fr'
    //   ? require('../image/fr.png')
    //   : require('../image/en.png');
    
    const flagSourceOrigin = langue === 'en'
      ? require('../image/en.png')
      : langue === 'fr'
      ? require('../image/fr.png')
      : langue === 'es'
      ? require('../image/es.png')
      : langue === 'de'
      ? require('../image/Germany.png')
      : require('../image/en.png');
    const flagSource = target_langue === 'en-US'
      ? require('../image/en.png')
      : target_langue === 'fr-FR'
      ? require('../image/fr.png')
      : target_langue === 'es-ES'
      ? require('../image/es.png')
      : target_langue === 'de-DE'
      ? require('../image/Germany.png')
      : require('../image/en.png');

    const currentLanguage = languages.find(lang => lang.code === langue);





    let nbMots = "00"; // Valeur par défaut si stats_nbwords n'est pas trouvé
    let stats_signifiant = "00";
    let stats_debit = "0 w/m";
    let stats_duree = "00:00";
    let stats_nbverb = "00";
    let stats_nbadj = "00";
    let stats_nbact = "00";
    let stats_nbpass = "00";
    

    if (MYstats !== null) {
      nbMots = MYstats[1].stats_nbwords;
      stats_signifiant = MYstats[14].stats_signifiant;
      stats_debit = ((nbMots * 60) / this.state.durationInSeconds).toFixed(2);
      stats_nbverb = MYstats[4].stats_nbverb;
      stats_nbadj = MYstats[3].stats_nbadj;
      stats_nbact = MYstats[6].stats_nbact;
      stats_nbpass = MYstats[6].stats_nbpass;
    }
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: '#192356',
          padding: 15,
        }}>
        <View
          style={{  
            width: wp('100%'),
            justifyContent: 'center',
            backgroundColor:'#192356'
            }}>
          <TouchableOpacity
            onPress={() => this.props.navigation.goBack()}>
            <View
              style={{
                flexDirection: 'row'
              }}>
                <Icon name="arrow-back-outline" size={30} color="#48A2F1" />
            
              <Text style={{
                color: '#48A2F1',
                marginLeft: wp('35%'),
                fontSize: hp('2.2%'),
                position: 'absolute'
              }}>
                Image Viewer 
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      

        <View style={{
          width:40, 
          alignItems:'center',
          justifyContent:'space-around',
          backgroundColor:'#020D4D',
          position:'absolute',
          top:hp('10%'),
          right:10,
          zIndex:1,
          borderTopLeftRadius:15,
          borderBottomLeftRadius:15,
        }}>
            <View style={[styles.deleteButton,{marginBottom:20}]}>
              <AddButton2
                size={20}
                onPress={() => {
                  // alert('new text')
                  this.setState({ newText: true });;
                } }
                backgroundColor="#C9902A" 
              />
            </View>
            <TouchableOpacity
            style={{marginBottom:20}}
                onPress={()=>this.analyseImg()}

            >
                <View
                style={{
                  padding:5,
                  backgroundColor:'transparent',
                  alignItems:'center',
                  justifyContent:'center',
                  borderRadius:10,
                  
                  // opacity:0.3
                }}>

                  <Svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="white"
                    width={30} // Width of the SVG
                    height={30} // Height of the SVG
                  >
                    <Path d="M15 3H21V8H19V5H15V3ZM9 3V5H5V8H3V3H9ZM15 21V19H19V16H21V21H15ZM9 21H3V16H5V19H9V21ZM3 11H21V13H3V11Z" />
                  </Svg>
                </View>
            </TouchableOpacity>
            <TouchableOpacity
            style={{marginBottom:20}}
                onPress={()=>this.showEdit()}
            >
                <View>
                    <Icon name="create-outline" size={30} color="white" />
                </View>
            </TouchableOpacity>
            <TouchableOpacity
            style={{marginBottom:20}}
                onPress={this.rotateRight} 
            >
                <View style={styles.deleteButton}>
                    <Icon name="refresh" size={27} color="white" />
                </View>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={()=>this.delete(this.state.id_exp, this.state.f_name)}
            >
                <View style={styles.deleteButton}>
                    <Icon name="trash-outline" size={27} color="red" />
                </View>
            </TouchableOpacity>
        </View>
       
        
        <ScrollView 
        scrollEnabled={this.state.scrollEnabled}
        style={{backgroundColor:'#020D4D', height:hp('10%'), padding:5, marginBottom:10, borderRadius:5}}>
        <View
            style={{
              transform: [{ rotate: `${rotation}deg` }]
            }}
          >
            
          <GestureHandlerRootView 
            style={{width:wp('93%'), height:hp('70%')}}
          >
            <ZoomableImage 
              uri={`${base_grp_url}${this.state.id_groupe}/${this.state.f_name}`} 
              // onZoomStart={() => this.toggleScroll(false)}
              // onZoomEnd={() => this.toggleScroll(true)}
            
            />
          </GestureHandlerRootView>

            {/* <Image style={{width:wp('93%'), height:hp('70%')}} source={{ uri: base_grp_url+this.state.id_groupe+'/'+this.state.f_name}}/> */}
        </View>
            {/* <Text style={{
                color: 'white',
                marginLeft: wp('35%'),
                fontSize: hp('2.2%'),
                position: 'absolute'
            }}>
                {base_grp_url+this.state.id_groupe+'/'+this.state.f_name}
            </Text> */}
         <View style={{
          position:'absolute',
          top:hp('30%'),
          alignSelf:'center',
          backgroundColor:'white'
        }}>
         {this.state.scanning?
          (<Spinner  color={'#020D4D'} size={50} type={'WanderingCubes'} />):null
         }
        </View>
        {/* <View style={styles.buttonAction}>
            <TouchableOpacity
                onPress={()=>this.showEdit()}
            >
                <View style={styles.deleteButton}>
                    <Icon name="create-outline" size={25} color="#48A2F1" />
                </View>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={()=>this.delete(this.state.id_exp, this.state.f_name)}
            >
                <View style={styles.deleteButton}>
                    <Icon name="trash-outline" size={25} color="red" />
                </View>
            </TouchableOpacity>
        </View> */}

        <View style={{
          // backgroundColor:'red', 
          flexDirection:'row', 
          // justifyContent:'center',
          alignItems:'center',
          width:wp('92%'),
          backgroundColor:'#48A2F1',
          marginTop: 30,
          padding:5,
          borderRadius:5
          }}>
            < MaterialIcons name="calendar-today" size={20} color="white" style={{ width:wp('5%'), alignItems:'center', justifyContent:'center'}} />
            <Text style={{color:'white', fontWeight:'bold', fontSize:12, textAlign:'justify', padding:15, width:wp('80%')}}>{date}</Text>  
          </View>
          <View style={{
            // backgroundColor:'red', 
            flexDirection:'row', 
            // justifyContent:'center',
            alignItems:'center',
            width:wp('92%'),
            backgroundColor:'#48A2F1',
            marginTop: 30,
            padding:5,
            borderRadius:5
          }}>
            <MaterialIcons name="location-on" size={25} color="white" style={{ width:wp('5%'), alignItems:'center', justifyContent:'center'}} />
            <Text style={{color:'white', fontWeight:'bold', fontSize:12, textAlign:'justify', padding:15, width:wp('80%')}}>{lieu}</Text>  
          </View>
        <View style={{ backgroundColor:'#020D4D', marginBottom:10}}>
          <View>
            <Text style={{color:'white', fontWeight:'bold', fontSize:16, marginBottom:5}}>Description</Text>  
          </View>

          {this.state.toEdit?(<TextInput
            ref={input => { this.textInput = input }}
            style={styles.textContainer}
            placeholderTextColor={'grey'}
            multiline={true}
            value={this.state.description}
            onChangeText={description => this.setState({ description })}
           />):<Text style={styles.textContainer}>{this.state.description}</Text>}

          
          <View style={{
            flexDirection:'row',
            alignItems:'center',
            justifyContent:'center',
            width:wp('90%'),
            // backgroundColor:'green'
          }}>
            <Text style={{color:'white', fontWeight:'bold', fontSize:16, marginBottom:15, marginTop:10, textAlign:'center'}}>Texte</Text>
            <View style={styles.iconContainer}

            >
              <TouchableOpacity onPress={this.zoomIn} style={styles.zoomButton}>
              <MaterialIcons name="zoom-in" size={30} color="white" />
            </TouchableOpacity>

            <TouchableOpacity onPress={this.zoomOut} style={styles.zoomButton}>
              <MaterialIcons name="zoom-out" size={30} color="white" /> 
              
            </TouchableOpacity>
            </View>

          </View>
          <View>
            <View style={[styles.textInputContainer]}>
              <TextInput
                ref={(input) => { this.textInput = input; }}
                style={[styles.textContainer, { fontSize }]}
                placeholderTextColor="grey"
                multiline={true}
                value={txt}
                onChangeText={(txt) => this.setState({ txt })}
                editable={!this.state.editable} // TextInput needs to be editable for selection on Android
                selectTextOnFocus={false} // Prevent focus triggering the keyboard
                onSelectionChange={this.handleSelectionChange}
                onLayout={this.handleLayout}
                showSoftInputOnFocus={false} // Disable keyboard (for Android)
                autoCorrect={false}
              />
              <Image source={flagSourceOrigin} style={styles.flag} />
            </View>
          </View>

          <TouchableOpacity onPress={this.toggleDropdown} style={styles.selector}>
            <Text style={styles.selectorText}>Translate to</Text>
            <Icon
              name={isDropdownVisible ? "chevron-up" : "chevron-down"}
              size={30}
              color="#48A2F1"
            />
          </TouchableOpacity>

          {isDropdownVisible && (
            <View style={styles.dropdown}>
              {languages.map((language) => (
                <TouchableOpacity key={language.code} onPress={() => this.handleTranslate(language.code)}>
                  <View style={styles.languageOption}>
                    <Text style={styles.languageLabel}>{language.label}</Text>
                    <Image style={styles.languageImage} source={language.imageSource} />
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          )}

          <Text 
          selectable={true}
          style={{color:'white', fontWeight:'bold', fontSize:16, marginBottom:5}}>Translation</Text>
          <View>
             {/* <Text style={styles.textContainer}>{this.state.trad}</Text> */}
             <TextInput
                ref={(input) => { this.textInput = input; }}
                style={[styles.textContainer, { fontSize }]}
                placeholderTextColor="grey"
                multiline={true}
                value={this.state.trad}
                onChangeText={(txt) => this.setState({ txt })}
                editable={!this.state.editable} // TextInput needs to be editable for selection on Android
                selectTextOnFocus={false} // Prevent focus triggering the keyboard
                onSelectionChange={this.handleSelectionChange}
                onLayout={this.handleLayout}
                showSoftInputOnFocus={false} // Disable keyboard (for Android)
                autoCorrect={false}
              />
             <Image style={styles.languageImage} source={flagSource} />
           </View>

          {/* {this.state.toEdit?(<TextInput
            ref={input => { this.textInput = input }}
            style={styles.textContainer}
            placeholderTextColor={'grey'}
            multiline={true}
            value={this.state.trad}
            onChangeText={trad => this.setState({ trad })}
           />):<Text style={styles.textContainer}>{this.state.trad}</Text>} */}
          
          {nbMots !== '00' && (langue == 'en' || target_langue == 'en-US') ?(<View>
            <Text style={details.title1}>Analyse Lexicale </Text>
            <View
              style={{height:hp('50%')}}>
              <View style={{flexDirection:'row', justifyContent:'space-around', width:wp('80%'), alignSelf:'center'}}>
                <BoxStats
                nb1={nbMots}
                click={this.props.clickVideo}
                label={"Mots"}
                iconName="slideshow"
                iconsProvider="MaterialIcons"
                boxColor="#186189"
                before={() => this.setState({beforeVideo:true})}
                goToList={this.goToVideo}
                create = {()=>{this.setState({newVideo:true}),this.props.closeAll()}}
              />
                <BoxStats
                nb1={stats_signifiant}
                click={this.props.clickVideo}
                label={"Mots differents"}
                iconName="slideshow"
                iconsProvider="MaterialIcons"
                boxColor="#186189"
                before={() => this.setState({beforeVideo:true})}
                goToList={this.goToVideo}
                create = {()=>{this.setState({newVideo:true}),this.props.closeAll()}}
              />
              <BoxStats
                nb1={stats_nbverb}
                click={this.props.clickVideo}
                label={"Verbes"}
                iconName="slideshow"
                iconsProvider="MaterialIcons"
                boxColor="#18bd5a"
                before={() => this.setState({beforeVideo:true})}
                goToList={this.goToVideo}
                create = {()=>{this.setState({newVideo:true}),this.props.closeAll()}}
              />
                {/* <BoxStats
                  nb1={this.state.duration}
                click={this.props.clickVideo}
                label={"Durée"}
                iconName="slideshow"
                iconsProvider="MaterialIcons"
                boxColor="#186189"
                before={() => this.setState({beforeVideo:true})}
                goToList={this.goToVideo}
                create = {()=>{this.setState({newVideo:true}),this.props.closeAll()}}
              /> */}
                {/* <BoxStats
                nb1={stats_debit+'w/m'} 
                click={this.props.clickVideo}
                label={"Débits"}
                iconName="slideshow"
                iconsProvider="MaterialIcons"
                boxColor="#186189"
                before={() => this.setState({beforeVideo:true})}
                goToList={this.goToVideo}
                create = {()=>{this.setState({newVideo:true}),this.props.closeAll()}}
              /> */}

              </View>
              <View style={{flexDirection:'row', justifyContent:'space-around', width:wp('80%'), alignSelf:'center'}}>
                
                <BoxStats
                nb1={stats_nbadj}
                click={this.props.clickVideo}
                label={"Adjectifs"}
                iconName="slideshow"
                iconsProvider="MaterialIcons"
                boxColor="#4d81fe"
                before={() => this.setState({beforeVideo:true})}
                goToList={this.goToVideo}
                create = {()=>{this.setState({newVideo:true}),this.props.closeAll()}}
              />
                <BoxStats
                nb1={stats_nbact}
                click={this.props.clickVideo}
                label={"Voix active"}
                iconName="slideshow"
                iconsProvider="MaterialIcons"
                boxColor="#ed254e"
                before={() => this.setState({beforeVideo:true})}
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
                before={() => this.setState({beforeVideo:true})}
                goToList={this.goToVideo}
                create = {()=>{this.setState({newVideo:true}),this.props.closeAll()}}
              />
              </View>
            </View>
          </View>):null}
          {this.state.toEdit?(<View style={styles.row}>
            <RectButton
                onPress={()=>this.hideEdit()}
                text="Edit"
                backgroundColor="#48A2F1"
            />
            <RectButton
                onPress={()=>this.setState({toEdit:false})}
                text="Cancel"
                backgroundColor="red"
            />
          </View>):null}
        </View>
      </ScrollView>
      <TextModalsIMG
        visible={this.state.newText}
        category={this.props.category}
        userInfo={this.props.userInfo}
        onClose={() => this.closeModal()}
        save={() => {
          this.closeModal(),
              this.setState({ data: this.props.data })
              // this.props.navigation.navigate('ExpressionList',{'id_groupe':this.state.id_groupe});
            // alert('Expression saved');
        } }
        navigation={this.props.navigation}
        />
      </View>
    );
  }
}

const mapStateToProps = (state) => ({
  userInfo: state.auth.userInfo,
  data: state.data_All.data,
  category: state.categ.category
});
const mapDispatchToProps = (dispatch) => {
  return {
    getImage: id => dispatch(getImages(id)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps )(ImageViewer);
    const styles= StyleSheet.create({
      deleteButton:{
        padding:5
    },
    buttonAction:{
      justifyContent:'space-around',
      paddingRight:30,
      flexDirection:'row',
      width:wp('100%'),
      alignSelf:'flex-end',
      backgroundColor:'#020D4D'
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
      position: 'absolute',
      top: 5,
      right: 5,
      width: 20,
      height: 15,
      borderRadius: 2,
    },
    textInput: {
      height: 150,
      borderColor: '#000',
      borderWidth: 1,
      padding: 10,
      fontSize: 18,
      color:'white'
    },
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
    zoomButton: {
      padding: 10,
      alignItems: 'center',
      borderRadius: 5,
    },
    })
