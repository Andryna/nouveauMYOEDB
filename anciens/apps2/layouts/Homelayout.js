import React, { Component } from 'react';
import { View, StyleSheet, Text, TouchableWithoutFeedback, Keyboard, Platform, KeyboardAvoidingView } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { connectToRedux } from '../config/reduxconfig';
import UserProfileCard from '../components/header/UserProfileCard/UserProfileCard';
import BoxConsultation from '../components/buttons/BoxConsultation';
import Footer from '../components/footer/layouts/footer';
import { openHome, OpenCat, Openjitsi, OpenAlo, OpenEl, Openjitsi2} from '../utils/All';
import { clearAllData } from '../utils/authUtils';
import AudioModal from '../components/modals/AudioModal';
import VideoModal from '../components/modals/VideoModal';
import TextModals from '../components/modals/TextModals';
import ImageModal from '../components/modals/ImageModal';
import BeforeAudio from '../components/modals/BeforeAudio';
import BeforeTexte from '../components/modals/BeforeTexte';
import BeforeVideo from '../components/modals/BeforeVideo';
import BeforeImage from '../components/modals/BeforeImage';

class Homelayout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newAudio: false,
      newVideo:false,
      newText:false,
      newImage:false,
      menu:this.props.menu,
      beforeAudio:false,
      beforeTexte:false,
      beforeVideo:false,
      beforeImage:false,
      keyboardVisible: false
    };
  }
   componentDidMount() {
    // Écouteurs pour le clavier
    this.keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        this.setState({ keyboardVisible: true });
      }
    );
    this.keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        this.setState({ keyboardVisible: false });
      }
    );
  }

 
  goToVideo = () => {
    this.closeModal();
    this.props.closeAll();
    // this.props.toggleMenu();
    const {userInfo} = this.props;
    // alert(userInfo.id_groupe);
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

  closeModal = () => {
    this.setState({newAudio:false,newText:false, newVideo:false, newImage:false, beforeAudio:false, beforeTexte:false, beforeVideo:false, beforeImage:false});
  };

  render() {
    const { nbaudio, nbtext, nbvideo, userInfo, isMenuOpen } = this.props;
    const {menu, keyboardVisible} = this.state;
    return (
      <View style={styles.container}>
        <View style={{position:'absolute',top:0, padding:0, backgroundColor:'#192356', zIndex:4}}>
          <UserProfileCard
            login={userInfo.prenom}
            onLogout={() => this.setState({menu:!menu})}
            navigation={this.props.navigation} 
          />
          {menu && (
            <View style={styles.act}>
              <View style={styles.boxRow}>
                <BoxConsultation
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
                  iconName="ios-document-text"
                  iconsProvider="ion"
                  boxColor="#C9902A"
                  before={() => this.setState({beforeTexte:true})}
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
          )}
        </View>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={{ flex: 1 }}>
            {/* KeyboardAvoidingView pour déplacer uniquement le contenu sous le clavier */}
            <KeyboardAvoidingView
              style={{ flex: 1 }}
              behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            >
              <View style={{ flex: 1, backgroundColor:'#060a20' }}>
                {/* Ici, nous appliquons uniquement à `this.props.children` l'effet de déplacement */}
                {this.props.children}
              </View>
            </KeyboardAvoidingView>
          </View>
        </TouchableWithoutFeedback>
        
        {!keyboardVisible && (
          <View style={{ height: 50, width: wp('100%'), position: 'absolute', justifyContent: 'center', alignItems: 'center', bottom: 0, zIndex:1, backgroundColor: '#192356', paddingBottom:10}}>
            <Footer
              OpenHome={() => { openHome(this.props.navigation, userInfo), this.setState({ show1: false }); }}
              Openjitsi={() => Openjitsi(this.props.navigation, userInfo)}
              OpenCat={() => OpenCat(this.props.navigation, userInfo)}
              OpenAlo={() => OpenAlo(this.props.navigation, userInfo)}
              OpenEl={() => OpenEl(this.props.navigation, userInfo)}
              user={userInfo}
            />
          </View>
        )}

          <AudioModal visible={this.state.newAudio} category={this.props.category} userInfo = {this.props.userInfo} onClose={() => this.closeModal()} navigation={this.props.navigation} />
          <VideoModal visible={this.state.newVideo} category={this.props.category} userInfo = {this.props.userInfo} onClose={() => this.closeModal()} navigation={this.props.navigation} />
          <TextModals visible={this.state.newText} category={this.props.category} userInfo = {this.props.userInfo} onClose={() => this.closeModal()} save ={() => this.closeModal()} navigation={this.props.navigation} />
          <ImageModal visible={this.state.newImage} category={this.props.category} userInfo = {this.props.userInfo} onClose={() => this.closeModal()} navigation={this.props.navigation} />
          
          {/* Before Modals*/}

          <BeforeAudio visible={this.state.beforeAudio} onClose={() => this.closeModal()} navigation={this.props.navigation} list = {()=>this.goToAudio()} newp = {()=>{this.closeModal(),this.props.navigation.navigate('Enregistre')}} />
          <BeforeTexte visible={this.state.beforeTexte} onClose={() => this.closeModal()} navigation={this.props.navigation} list = {()=>this.goToExp()} newp = {()=>{this.closeModal(),this.setState({newText:true})}}/>
          <BeforeVideo visible={this.state.beforeVideo} onClose={() => this.closeModal()} navigation={this.props.navigation} list = {()=>this.goToVideo()} newp = {()=>{this.closeModal(),this.setState({newVideo:true})}} />
          <BeforeImage visible={this.state.beforeImage} onClose={() => this.closeModal()} navigation={this.props.navigation} list = {()=> this.goToImage()} newp = {()=>{this.closeModal(),this.setState({newImage:true})}} />
      </View>
    );
  }
}

export default connectToRedux(Homelayout);

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
    // marginTop:hp('8%'),
  }
});