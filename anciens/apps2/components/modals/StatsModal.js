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
class StatsModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      
    };
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
  }

  render() {
  const {contentStat} = this.props;
    return (
      <Modal
        animationType="slide"
        visible={this.props.visible}
        // visible={true}
      >
        <ModalLayout navigation={this.props.navigation}>
        <View style={{ width: wp('100%'), backgroundColor:'#060a20', paddingBottom:hp('10%') }}>
            <View style={{ justifyContent: 'center', height: hp('8.5%'), width: wp('100%')}}>
                <View style={{ height: hp('4%'), width: wp('100%'), flexDirection: 'row', justifyContent: 'space-between',paddingLeft:15 }}>
                    <TouchableOpacity
                    onPress={() => {
                        this.props.onClose()
                    }}
                    > 
                    <View style={{ flexDirection: 'row' }}>
                        <Icon name="arrow-back-outline" size={25} color="white" style={{ alignSelf: 'center', marginLeft: 5 }} />
                        <Text style={{ color: 'white', marginLeft: wp('18%'), fontSize: hp('2.2%') }}>
                        Details 
                        </Text>
                    </View>
                    </TouchableOpacity>
                </View>
            </View>
            <View>
                {contentStat}
            </View>
        </View>
        </ModalLayout>
      </Modal>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    dispatchfetchData:id => dispatch(fetchData(id))
  };
};

export default connect(null, mapDispatchToProps )(StatsModal);

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