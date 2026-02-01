import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, TouchableWithoutFeedback, Keyboard } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import ActionButton from '../buttons/ActionButton';
import { TextInput as PaperTextInput, Button } from 'react-native-paper';
import config from '../../../config.json';
const base_url = config.base_url;
import { useDispatch } from 'react-redux'; 
import { fetchData } from '../../actions/expressions';
// Import correct pour Clipboard
// import Clipboard from '@react-native-clipboard/clipboard';
import { PowerTranslator, ProviderTypes, TranslatorConfiguration, TranslatorFactory } from 'react-native-power-translator';


const colorsBoxText = ['#FBAFA9', '#FFF8B9', '#AECCDC', '#D3E4EC', '#D4C0DC', '#F5E2DC', '#A9FBB7', '#D7FFB9'];

const ExpressionItem = ({
  id_stag,
  id,
  or: initialOr,
  ci: initialCi,
  intit,
  date,
  name,
  od,
  type,
  legende,
  index,
  id_category,
  langue,
  deleteItem,
  onShare,
  navigation,
  _play,
  show,
  showEdit,
  refresh,
  item

}) => {
  // Utilisation de l'état pour gérer "or"
  const [or, setOr] = useState(initialOr);
  const [ci, setCi] = useState(initialCi);
  const [change, setChange] = useState(false);

  const dispatch = useDispatch();


  // Texte copié dans le presse-papiers
  const copied = `Category: ${intit}\nOriginal: ${or}\nTranslated: ${ci}`;

  const handlePlayPress = () => {
    if (!od) {
      navigation.navigate('VideoWebPlayer', { namevid: name, id_groupe: navigation.getParam?.('id_groupe', '') });
    } else {
      _play(od);
    }
  };
  const handleDone = () => {
    Keyboard.dismiss();  // Ferme le clavier
    if(change){
      saveEdit();
      setChange(false); 
    }else{
      setChange(false);
    }
    // alert('saved');
  };
  
  const saveEdit = () => {
    // Exemple de mise à jour du backend avec `fetch`
    console.log("Saving edits for:", { id, or, ci });
    const targ = item.target_langue_cible === 0 ? 1 : item.target_langue_cible;
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
          idecat:id_category,
          PickerValueHolder:targ
        }),
      })
        .then((response) => response.json())
        .then((result) => {
          console.log('Save successful:', result);
          refresh();
          // dispatch(fetchData(id_stag))
          // .then(() => {
          //   // this.props.save();
          //   refresh();
          //   // alert('saved');
          // })
          // alert('saved');
        })
        .catch((error) => {
          console.error('Error saving edits:', error);
        });
    };

    const handleTranslate = (text, langId) => {
      setOr(text); // Met à jour le texte original
      setChange(true);
    
      const languages = [
        { id: "1", code: 'en-US', label: 'ENGLISH' },
        { id: "5", code: 'fr-FR', label: 'FRENCH' },
        { id: "7", code: 'de-DE', label: 'GERMAN' },
        { id: "4", code: 'es-ES', label: 'SPANISH' },
      ];
    
      // Trouver la langue correspondant à l'ID
      const selectedLanguage = languages.find(lang => lang.id === langId);
      if (!selectedLanguage) {
        // alert('ok');
        TranslatorConfiguration.setConfig(
          ProviderTypes.Google,
          config.googleCloud.apiKey,
          'en' // Ex: 'fr' pour 'fr-FR'
        );
      
        const translator = TranslatorFactory.createTranslator();
      
        // Traduction automatique
        translator.translate(text)
          .then(translated => setCi(translated)) // Met à jour la traduction
          .catch(error => console.error('Translation failed:', error));
          return;
        }
    
      // Configurer le traducteur avec le code de la langue
      TranslatorConfiguration.setConfig(
        ProviderTypes.Google,
        config.googleCloud.apiKey,
        selectedLanguage.code.substring(0, 2) // Ex: 'fr' pour 'fr-FR'
      );
    
      const translator = TranslatorFactory.createTranslator();
    
      // Traduction automatique
      translator.translate(text)
        .then(translated => setCi(translated)) // Met à jour la traduction
        .catch(error => console.error('Translation failed:', error));
    };
    
    

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <View style={styles.textContainer}>
          <View
            // onPress={() => show(id, or, ci, intit, date, name, od, type, legende, index, id_category, langue)}
            // onPress={Keyboard.dismiss}
            style={styles.expressionCard}
          >
            {/* <Text style={{color:'white'}}>test: {langue}, {item.target_langue_cible}</Text> */}
            {/* Champ de texte modifiable */}
            <PaperTextInput
              // label="Entrez du texte"
              value={or}
              onChangeText={(text) => {handleTranslate(text, item.original_langue_cible)}}
              textColor="white" 
              style={[styles.text1, { backgroundColor: '#202C61', color:'white', textAlign:'justify' }]}
              theme={{
                colors: {
                  text: 'white', // Optionnel, pour spécifier la couleur via le thème
                  primary: 'orange', 
                },
              }}
              returnKeyType="done"  // Le bouton 'Done' apparaît sur le clavier natif
              onSubmitEditing={handleDone}
              multiline={true}
              blurOnSubmit={true}
            />
          <PaperTextInput
            value={ci}
            onChangeText={(text) => { setCi(text); setChange(true); }}
            style={[
              styles.text1,
              { backgroundColor: '#202C61' }
            ]}
            textColor="white"  
            textAlign='justify'
            contentStyle={{ color: 'white', textAlign: 'justify' }}  
            theme={{
              colors: {
                primary: 'white',
                placeholder: 'white',
                underlineColor: 'transparent',
              },
            }}
            editable={true}
            returnKeyType="done"
            onSubmitEditing={handleDone}
            multiline={true}
            blurOnSubmit={true}
            cursorColor="white"
          />








            {/* <TextInput
              style={styles.text1}
              value={or}
              onChangeText={(text) => setOr(text)}
              editable={true}
              multiline={true}
            /> */}
            {/* <View style={styles.separator} /> */}
            {/* <Text style={styles.text1}>{id} / {id_stag} / {id_category}</Text> */}
            <ActionButton
              onEdit={() => show(id, or, ci, intit, date, name, od, type, legende, index, id_category, item.target_langue_cible,  langue)}
              onDelete={() => deleteItem(id)}
            />
          </View>
        </View>
      </View>

    </TouchableWithoutFeedback>
  );
};

const styles = {
  container: {
    marginTop: 5,
    borderRadius: 10,
    backgroundColor: '#202C61',
    width: wp('90%'),
    borderRadius: 5,
    borderColor: 'white',
    padding:10
  },
  textContainer: {
    padding: 5,
  },
  expressionCard: {
    flexDirection: 'column',
  },
  text1: {
    textAlign: 'justify',
    fontSize: 14,
    padding: 10,
    color: 'white',
    borderBottomWidth: 0,  // Supprime la ligne pour iOS
    borderWidth: 0,
    borderColor:'red',
    textDecorationLine: 'none',
  },
  separator: {
    borderWidth: 1,
    borderColor: 'white',
    width: '60%',
    alignSelf: 'center',
    opacity: 0.3,
    marginTop: 10,
  },
};

export default ExpressionItem;