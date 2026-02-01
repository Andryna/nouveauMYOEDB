import React, { Component } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { connectToRedux } from '../config/reduxconfig';
import UserProfileCard from '../components/header/UserProfileCard/UserProfileCard';
import BoxConsultation from '../components/buttons/BoxConsultation';

import Footer from '../components/footer/layouts/footer';
import { openHome, OpenCat, Openjitsi } from '../utils/All';
import { clearAllData } from '../utils/authUtils';

// Captation Modal
import AudioModal from '../components/modals/AudioModal';
import VideoModal from '../components/modals/VideoModal';
import TextModals from '../components/modals/TextModals';
import ImageModal from '../components/modals/ImageModal';

// Before Captation Modale
import BeforeAudio from '../components/modals/BeforeAudio';
import BeforeTexte from '../components/modals/BeforeTexte';
import BeforeVideo from '../components/modals/BeforeVideo';
import BeforeImage from '../components/modals/BeforeImage';
import OrfBox from '../components/buttons/OrfBox';

class ModalLayout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newAudio: false,
      newVideo:false,
      newText:false,
      newImage:false,
      menu:false,
      beforeAudio:false,
      beforeTexte:false,
      beforeVideo:false,
      beforeImage:false
    };
  }
  goToVideo = () => {
    this.props.closeAll();
    this.closeModal();
    this.props.toggleMenu();
    this.props.navigation.navigate('Recordings',{id_groupe:userInfo.id_groupe});
  };

  goToExp = () => {
    this.props.closeAll();
    this.props.toggleMenu();
    this.props.navigation.navigate('ExpressionList',{newdata: 'test'});
    // console.log(this.props.data);
    // alert('exp');
  };

  goToImage = () => {
    this.props.closeAll();
    this.closeModal();
    this.props.toggleMenu();
    this.props.navigation.navigate('Recordings',{id_groupe:userInfo.id_groupe});
  };

  goToAudio = () => {
    this.props.closeAll();
    this.closeModal();
    this.props.toggleMenu();
    this.props.navigation.navigate('Audios',{id_groupe:userInfo.id_groupe});
  };

  closeModal = () => {
    // alert("close");
    this.setState({newAudio:false,newText:false, newVideo:false, newImage:false, beforeAudio:false, beforeTexte:false, beforeVideo:false, beforeImage:false});
  };

  render() {
    const { nbaudio, nbtext, nbvideo, userInfo } = this.props;
    const {menu} = this.state;

    return (
      // <SafeAreaView>

      // </SafeAreaView>
      <ScrollView 
      style={[styles.container,]}
        nestedScrollEnabled={true}
      
      >
          <View style={{position:'relative', backgroundColor:'#192356', top:0,paddingTop:20,zIndex:1}}>
            <UserProfileCard
                login={userInfo.prenom}
                onLogout={() => this.setState({menu:!menu})}
                navigation={this.props.navigation} 
                onClose={this.closeModal} 
            />
          {menu && (
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
        <View style={{backgroundColor:'white', width:wp('100%')}}>
        {this.props.children}
        </View>

        <AudioModal visible={this.state.newAudio} category={this.props.category} userInfo = {this.props.userInfo} onClose={() => this.closeModal()} navigation={this.props.navigation} />
        <VideoModal visible={this.state.newVideo} category={this.props.category} userInfo = {this.props.userInfo} onClose={() => this.closeModal()} navigation={this.props.navigation} />
        <TextModals visible={this.state.newText} category={this.props.category} userInfo = {this.props.userInfo} onClose={() => this.closeModal()} save ={() => this.closeModal()} navigation={this.props.navigation} />
        <ImageModal visible={this.state.newImage} category={this.props.category} userInfo = {this.props.userInfo} onClose={() => this.closeModal()} navigation={this.props.navigation} />
        
        {/* Before Modals*/}

        <BeforeAudio visible={this.state.beforeAudio} onClose={() => this.closeModal()} navigation={this.props.navigation} list = {()=>this.goToAudio()} newp = {()=>{this.closeModal(),this.props.navigation.navigate('Enregistre')}} />
        <BeforeTexte visible={this.state.beforeTexte} onClose={() => this.closeModal()} navigation={this.props.navigation} list = {()=>this.goToExp()} newp = {()=>{this.closeModal(),this.setState({newText:true})}}/>
        <BeforeVideo visible={this.state.beforeVideo} onClose={() => this.closeModal()} navigation={this.props.navigation} list = {()=>this.goToVideo()} newp = {()=>{this.closeModal(),this.setState({newVideo:true})}} />
        <BeforeImage visible={this.state.beforeImage} onClose={() => this.closeModal()} navigation={this.props.navigation} list = {()=> this.goToImage()} newp = {()=>{this.closeModal(),this.setState({newImage:true})}} />
    </ScrollView>
    );
  }
}

export default connectToRedux(ModalLayout);

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    height: hp('100%'), 
    width:wp('100%'),// Utiliser 100% de la hauteur de l'écran
    // backgroundColor: 'white', // Couleur de fond
    backgroundColor: '#192356', // Couleur de fond
    // justifyContent: 'flex-start',
    // alignItems: 'center',
    // justifyContent:'center'
  },
  boxRow: {
    flexDirection: 'row',
    justifyContent:'center',
    backgroundColor:'#192356',
    zIndex:1
  },
  act:{
    marginTop:hp('10%'),
  }
});
