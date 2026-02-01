import React, { Component } from 'react';
import { View, StyleSheet, Text, StatusBar} from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { connectToRedux } from '../config/reduxconfig';
import UserProfileCard from '../components/header/UserProfileCard/UserProfileCard';
import UserProfileCard2 from '../components/header/UserProfileCard/UserProfileCard2';
import BoxConsultation from '../components/buttons/BoxConsultation';
import Footer from '../components/footer/layouts/footer';
import { openHome, OpenCat, Openjitsi, OpenAlo, OpenEl, OpenChat, goToChat } from '../utils/All';
import { clearAllData } from '../utils/authUtils';
import AudioModal from '../components/modals/AudioModal';
import VideoModal from '../components/modals/VideoModal';
import TextModals from '../components/modals/TextModals';
import ImageModal from '../components/modals/ImageModal';
import BeforeAudio from '../components/modals/BeforeAudio';
import BeforeTexte from '../components/modals/BeforeTexte';
import BeforeVideo from '../components/modals/BeforeVideo';
import BeforeImage from '../components/modals/BeforeImage';
import ChatbotConfigModal from '../components/modals/ChatbotConfigModal';
import { sendMessageToChatGPT } from '../utils/request';
import OrfBox from '../components/buttons/OrfBox';
import { SafeAreaView } from 'react-native-safe-area-context';
// import { getChatCompletion } from '../utils/request';
import OpenAI from 'openai';
import config from '../../config.json';
const OpenAI_API_KEY = config.OPEN_AI_API_KEY;

class Homelayout2 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newAudio: false,
      newVideo:false,
      newText:false,
      newImage:false,
      // menu:this.props.menu,
      menu:true,
      beforeAudio:false,
      beforeTexte:false,
      beforeVideo:false,
      beforeImage:false,
      message: `Identifiez les expressions présentes dans ce texte, listez-les, puis classez-les selon leur nature ou leur fonction :

      "I’m really interested in what happens with the voice, with the body, to inhabit these different parts of a person’s style,” said Holliday, who has also researched Barack Obama’s speaking style. “Politicians are the best people to study this on because you know what their motivations are — they’re all trying to get elected, or they’re trying to get money, or they’re trying to get voters."`,
      chatHistory: [],
      isLoading: false,
      chatModalVisible: false,
    };
  }
  goToVideo = () => {
    this.closeModal();
    this.props.closeAll();
    // this.props.toggleMenu();
    const {userInfo} = this.props;
    // alert(userInfo.prenom);
    this.props.navigation.navigate('Recordings',{id_groupe:userInfo.id_groupe});
  };

  goToExp = () => {
    this.closeModal();
    this.props.closeAll();
    this.props.navigation.navigate('ExpressionList',{newdata: 'test'});
  };

  goToImage = () => {
    this.props.closeAll();
    const {userInfo} = this.props;
    this.closeModal();
    // alert(userInfo.id_groupe);
    this.props.navigation.navigate('Images',{id_groupe:userInfo.id_groupe});
  };

  goToAudio = () => {
    this.closeModal();
    this.props.closeAll();
    const {userInfo} = this.props;
    this.props.navigation.navigate('Audios',{id_groupe:userInfo.id_groupe});
  };
   openChatModal = () => {
    this.setState({ chatModalVisible: true });
  };

  closeChatModal = () => {
    this.setState({ chatModalVisible: false });
  };

  closeModal = () => {
    this.setState({newAudio:false,newText:false, newVideo:false, newImage:false, beforeAudio:false, beforeTexte:false, beforeVideo:false, beforeImage:false});
  };

  handleChatRequest = async () => {
    // const openai = new OpenAI();
    const client = new OpenAI({
      apiKey: OpenAI_API_KEY,  // Remplacez par votre clé API OpenAI
    });
    const completion = await client.chat.completions.create({
      messages: [{ role: "system", content: "You are a helpful assistant." }],
      model: "gpt-4o-mi-2024-07-18",
    });
    console.log(completion.choices[0]);
    
  };

handleSendMessage = async () => {
  const { message } = this.state;
  
  // Vérification de l'entrée utilisateur
  console.log('Message envoyé par l\'utilisateur:', message);
  
  // Affiche une alerte pour tester si la fonction est appelée
  alert('Fonction handleSendMessage déclenchée');

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
    
    // Afficher la réponse reçue de l'API OpenAI
    console.log('Réponse de l\'assistant:', chatResponse);

    // Ajouter les messages à l'historique du chat
    this.setState(prevState => ({
      chatHistory: [
        ...prevState.chatHistory,
        { role: 'user', content: message }, // Afficher le vrai message de l'utilisateur
        { role: 'assistant', content: chatResponse },
      ], // Réinitialiser le champ de message
    }));

    // Afficher l'historique mis à jour
    console.log('Historique des messages:', this.state.chatHistory);
  } catch (error) {
    // Gérer et afficher l'erreur dans la console
    console.error('Erreur lors de l\'envoi du message à ChatGPT:', error);
  } finally {
    // Désactiver l'indicateur de chargement
    this.setState({ isLoading: false });
  }
};


  render() {
    
    const { nbaudio, nbtext, nbvideo, userInfo, isMenuOpen } = this.props;
    const prenom = decodeURIComponent(userInfo.prenom);
    const {menu} = this.state;
    return (
      <>
      <SafeAreaView style={styles.container}>
        <StatusBar
        backgroundColor="transparent" // couleur de fond (ici blanc)
        barStyle="dark-content"  
        // translucent // couleur des icônes : noir sur fond clair
        />
        <View 
        style={{
              position: 'absolute',
              top: 0, // ✅ se décale sous la barre d’état automatiquement
              left: 0,
              right: 0,
              backgroundColor: '#192356',
              paddingTop:20,
              zIndex: 4,
            }}
        >
          <UserProfileCard2
            login={userInfo.prenom}
            onLogout={() => this.setState({menu:!menu})}
            navigation={this.props.navigation} 
          />
          
            <View style={styles.act}>
              <View style={styles.boxRow}>
                {/* <BoxConsultation
                  nb={nbvideo}
                  click={this.props.clickVideo}
                  label={"Videos"}
                  iconName="slideshow"
                  iconsProvider="MaterialIcons"
                  boxColor="#DB4165"
                  before={() => this.setState({beforeVideo:true})}
                  goToList={this.goToVideo}
                  create = {()=>{this.setState({newVideo:true}),this.props.closeAll()}}
                /> */}
                <OrfBox
                  nb={nbvideo}
                  click={this.props.clickVideo}
                  label={"Videos"}
                  iconName="slideshow"
                  iconsProvider="MaterialIcons"
                  boxColor="#DB4165"
                  before={() => this.setState({beforeVideo:true})}
                  goToList={this.goToVideo}
                  create = {()=>{this.setState({newVideo:true}),this.props.closeAll()}}
                />
                <BoxConsultation
                  nb={nbtext}
                  click={this.props.clickExp}
                  label="Words"
                  iconName="document-text"
                  iconsProvider="ion"
                  boxColor="#C9902A"
                  before={() => this.setState({beforeTexte:true})}
                  // before={() => {alert('this.setState({beforeTexte:true})'), this.handleSendMessage()}}
                  goToList={this.goToExp}
                  create = {()=>{this.setState({newText:true}),this.props.closeAll()}}
                />
              </View>
              <View style={styles.boxRow}>
                <BoxConsultation
                  nb={1}
                  label={"Images"}
                  click={this.props.clickImage}
                  iconName="image-outline"
                  iconsProvider="ion"
                  boxColor="#48A2F1"
                  before={() => this.setState({beforeImage:true})}
                  goToList={this.goToImage}
                  create = {()=>{this.setState({newImage:true}),this.props.closeAll()}}
                />
                <BoxConsultation
                  nb={nbaudio}
                  click={this.props.clickaudio}
                  label={"Audios"}
                  iconName="musical-notes"
                  iconsProvider="ion"
                  boxColor="#47BD7A"
                  before={() => this.setState({beforeAudio:true})}
                  goToList={this.goToAudio}
                  create = {()=>{this.setState({newAudio:true}),this.props.closeAll()}}
                />
              </View>
            </View>
          
        </View>
        <View>
          {this.props.children}
        </View>
        <View style={{ height: 50, width: wp('100%'), position: 'absolute', justifyContent: 'center', alignItems: 'center', bottom: 0, zIndex:1 }}>
            <Footer
              OpenHome={() => { openHome(this.props.navigation, userInfo), this.setState({ show1: false }) }}
              Openjitsi={() => Openjitsi(this.props.navigation, userInfo)}
              OpenCat={() => { OpenCat(this.props.navigation, userInfo)}}
              OpenAlo={() => { OpenAlo(this.props.navigation, userInfo)}}
              OpenEl={() => { OpenEl(this.props.navigation, userInfo)}}
              // OpenChat={() => { OpenChat(this.props.navigation, userInfo)}}
              OpenChat={() => { this.openChatModal() }}
              user={userInfo}
            />
          </View>

          <AudioModal visible={this.state.newAudio} category={this.props.category} userInfo = {this.props.userInfo} onClose={() => this.closeModal()} navigation={this.props.navigation} />
          <VideoModal visible={this.state.newVideo} category={this.props.category} userInfo = {this.props.userInfo} onClose={() => this.closeModal()} navigation={this.props.navigation} />
          <TextModals visible={this.state.newText} category={this.props.category} userInfo = {this.props.userInfo} onClose={() => this.closeModal()} save ={() => {this.closeModal(), alert("expression saved")}} navigation={this.props.navigation} />
          <ImageModal visible={this.state.newImage} category={this.props.category} userInfo = {this.props.userInfo} onClose={() => this.closeModal()} navigation={this.props.navigation} />
          
          {/* Before Modals*/}

          <BeforeAudio visible={this.state.beforeAudio} onClose={() => this.closeModal()} navigation={this.props.navigation} list = {()=>this.goToAudio()} newp = {()=>{this.closeModal(),this.props.navigation.navigate('Enregistre')}} />
          <BeforeTexte visible={this.state.beforeTexte} onClose={() => this.closeModal()} navigation={this.props.navigation} list = {()=>this.goToExp()} newp = {()=>{this.closeModal(),this.setState({newText:true})}}/>
          <BeforeVideo visible={this.state.beforeVideo} onClose={() => this.closeModal()} navigation={this.props.navigation} list = {()=>this.goToVideo()} newp = {()=>{this.closeModal(),this.setState({newVideo:true})}} />
          <BeforeImage visible={this.state.beforeImage} onClose={() => this.closeModal()} navigation={this.props.navigation} list = {()=> this.goToImage()} newp = {()=>{this.closeModal(),this.setState({newImage:true})}} />
      {/* chat Modal */}
      <ChatbotConfigModal 
        visible={this.state.chatModalVisible} 
        onClose={this.closeChatModal} 
        goToChat={(config) =>
            goToChat(this.props.navigation, this.closeChatModal, userInfo, config)
          }
      />
      </SafeAreaView>
      </>
    );
  }
}

export default connectToRedux(Homelayout2);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: hp('100%'), 
    width:wp('100%'),// Utiliser 100% de la hauteur de l'écran
    // backgroundColor: 'white', // Couleur de fond
    backgroundColor: '#192356', // Couleur de fond
    justifyContent: 'flex-start',
    // alignItems: 'center',
    justifyContent:'center'
  },
  boxRow: {
    flexDirection: 'row',
    justifyContent:'center',
    backgroundColor:'#192356',
    // height:hp('30%'),
    // top:hp('5%')
    zIndex:4
  },
  act:{
    marginTop:hp('33%'),
  }
});
