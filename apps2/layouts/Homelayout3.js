import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
} from 'react-native';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';

import { connectToRedux } from '../config/reduxconfig';
import UserProfileCard from '../components/header/UserProfileCard/UserProfileCard';
import BoxConsultation from '../components/buttons/BoxConsultation';
import Footer from '../components/footer/layouts/footer';

import AudioModal from '../components/modals/AudioModal';
import VideoModal from '../components/modals/VideoModal';
import TextModals from '../components/modals/TextModals';
import ImageModal from '../components/modals/ImageModal';

import BeforeAudio from '../components/modals/BeforeAudio';
import BeforeTexte from '../components/modals/BeforeTexte';
import BeforeVideo from '../components/modals/BeforeVideo';
import BeforeImage from '../components/modals/BeforeImage';

import ChatbotConfigModal from '../components/modals/ChatbotConfigModal';
import { openHome, OpenCat, Openjitsi, OpenAlo, goToChat, OpenEl } from '../utils/All';

class Homelayout3 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newAudio: false,
      newVideo: false,
      newText: false,
      newImage: false,

      menu: this.props.menu,

      beforeAudio: false,
      beforeTexte: false,
      beforeVideo: false,
      beforeImage: false,

      chatModalVisible: false,

      // Mesure réelle (évite les valeurs “à la louche”)
      headerHeight: 0,
      footerHeight: 0,
    };
  }

  openChatModal = () => this.setState({ chatModalVisible: true });
  closeChatModal = () => this.setState({ chatModalVisible: false });

  goToVideo = () => {
    this.closeModal();
    this.props.closeAll?.();
    const { userInfo } = this.props;
    this.props.navigation.navigate('Recordings', { id_groupe: userInfo.id_groupe });
  };

  goToExp = () => {
    this.closeModal();
    this.props.closeAll?.();
    this.props.navigation.navigate('ExpressionList', { newdata: 'test' });
  };

  goToImage = () => {
    this.closeModal();
    this.props.closeAll?.();
    const { userInfo } = this.props;
    this.props.navigation.navigate('Images', { id_groupe: userInfo.id_groupe });
  };

  goToAudio = () => {
    this.closeModal();
    this.props.closeAll?.();
    const { userInfo } = this.props;
    this.props.navigation.navigate('Audios', { id_groupe: userInfo.id_groupe });
  };

  closeModal = () => {
    this.setState({
      newAudio: false,
      newText: false,
      newVideo: false,
      newImage: false,
      beforeAudio: false,
      beforeTexte: false,
      beforeVideo: false,
      beforeImage: false,
    });
  };

  render() {
    const { nbaudio, nbtext, nbvideo, userInfo } = this.props;
    const { menu, headerHeight, footerHeight } = this.state;

    // fallback si onLayout n'a pas encore mesuré
    const headerFallback = menu ? hp('32%') : hp('12%');
    const footerFallback = hp('9%');

    const topPadding = headerHeight > 0 ? headerHeight : headerFallback;
    const bottomPadding = footerHeight > 0 ? footerHeight : footerFallback;

    return (
      <SafeAreaView style={styles.safe}>
        <View style={styles.container}>
          {/* CONTENU (NE PASSE PLUS SOUS HEADER/FOOTER) */}
          <KeyboardAvoidingView
            style={styles.contentWrapper}
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
            keyboardVerticalOffset={bottomPadding}
          >
            <View style={[styles.content, { paddingTop: topPadding, paddingBottom: bottomPadding }]}>
              {this.props.children}
            </View>
          </KeyboardAvoidingView>

          {/* HEADER + MENU (ABSOLU) */}
          <View
            style={styles.topContainer}
            onLayout={(e) => this.setState({ headerHeight: e.nativeEvent.layout.height })}
          >
            <UserProfileCard
              login={userInfo?.prenom}
              onLogout={() => this.setState({ menu: !menu })}
              navigation={this.props.navigation}
            />

            {menu && (
              <View style={styles.menuContainer}>
                <View style={styles.boxRow}>
                  <BoxConsultation
                    nb={nbvideo}
                    click={this.props.clickVideo}
                    label="Videos"
                    iconName="slideshow"
                    iconsProvider="MaterialIcons"
                    boxColor="#DB4165"
                    before={() => this.setState({ beforeVideo: true })}
                    goToList={this.goToVideo}
                    create={() => {
                      this.setState({ newVideo: true });
                      this.props.closeAll?.();
                    }}
                  />
                  <BoxConsultation
                    nb={nbtext}
                    click={this.props.clickExp}
                    label="Words"
                    iconName="ios-document-text"
                    iconsProvider="ion"
                    boxColor="#C9902A"
                    before={() => this.setState({ beforeTexte: true })}
                    goToList={this.goToExp}
                    create={() => {
                      this.setState({ newText: true });
                      this.props.closeAll?.();
                    }}
                  />
                </View>

                <View style={styles.boxRow}>
                  <BoxConsultation
                    nb={1}
                    label="Images"
                    click={this.props.clickImage}
                    iconName="image-outline"
                    iconsProvider="ion"
                    boxColor="#48A2F1"
                    before={() => this.setState({ beforeImage: true })}
                    goToList={this.goToImage}
                    create={() => {
                      this.setState({ newImage: true });
                      this.props.closeAll?.();
                    }}
                  />
                  <BoxConsultation
                    nb={nbaudio}
                    click={this.props.clickaudio}
                    label="Audios"
                    iconName="musical-notes"
                    iconsProvider="ion"
                    boxColor="#47BD7A"
                    before={() => this.setState({ beforeAudio: true })}
                    goToList={this.goToAudio}
                    create={() => {
                      this.setState({ newAudio: true });
                      this.props.closeAll?.();
                    }}
                  />
                </View>
              </View>
            )}
          </View>

          {/* FOOTER (ABSOLU) */}
          <View
            style={styles.footerContainer}
            onLayout={(e) => this.setState({ footerHeight: e.nativeEvent.layout.height })}
          >
            <Footer
              OpenHome={() => openHome(this.props.navigation, userInfo)}
              Openjitsi={() => Openjitsi(this.props.navigation, userInfo)}
              OpenCat={() => OpenCat(this.props.navigation, userInfo)}
              OpenAlo={() => OpenAlo(this.props.navigation, userInfo)}
              OpenChat={this.openChatModal}
              OpenEl={() => OpenEl(this.props.navigation, userInfo)}
              user={userInfo}
            />
          </View>

          {/* MODALES */}
          <AudioModal
            visible={this.state.newAudio}
            category={this.props.category}
            userInfo={userInfo}
            onClose={this.closeModal}
            navigation={this.props.navigation}
          />
          <VideoModal
            visible={this.state.newVideo}
            category={this.props.category}
            userInfo={userInfo}
            onClose={this.closeModal}
            navigation={this.props.navigation}
          />
          <TextModals
            visible={this.state.newText}
            category={this.props.category}
            userInfo={userInfo}
            onClose={this.closeModal}
            save={this.closeModal}
            navigation={this.props.navigation}
          />
          <ImageModal
            visible={this.state.newImage}
            category={this.props.category}
            userInfo={userInfo}
            onClose={this.closeModal}
            navigation={this.props.navigation}
          />

          <BeforeAudio
            visible={this.state.beforeAudio}
            onClose={this.closeModal}
            navigation={this.props.navigation}
            list={this.goToAudio}
            newp={() => {
              this.closeModal();
              this.props.navigation.navigate('Enregistre');
            }}
          />
          <BeforeTexte
            visible={this.state.beforeTexte}
            onClose={this.closeModal}
            navigation={this.props.navigation}
            list={this.goToExp}
            newp={() => {
              this.closeModal();
              this.setState({ newText: true });
            }}
          />
          <BeforeVideo
            visible={this.state.beforeVideo}
            onClose={this.closeModal}
            navigation={this.props.navigation}
            list={this.goToVideo}
            newp={() => {
              this.closeModal();
              this.setState({ newVideo: true });
            }}
          />
          <BeforeImage
            visible={this.state.beforeImage}
            onClose={this.closeModal}
            navigation={this.props.navigation}
            list={this.goToImage}
            newp={() => {
              this.closeModal();
              this.setState({ newImage: true });
            }}
          />

          <ChatbotConfigModal
            visible={this.state.chatModalVisible}
            onClose={this.closeChatModal}
            goToChat={(config) =>
              goToChat(this.props.navigation, this.closeChatModal, userInfo, config)
            }
          />
        </View>
      </SafeAreaView>
    );
  }
}

export default connectToRedux(Homelayout3);

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#192356',
  },
  container: {
    flex: 1,
    backgroundColor: '#192356',
  },

  contentWrapper: {
    flex: 1,
  },
  content: {
    flex: 1,
  },

  topContainer: {
    position: 'absolute',
    top: 0,
    width: '100%',
    zIndex: 4,
  },
  menuContainer: {
    marginTop: 0,
  },
  boxRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: '#192356',
    zIndex: 4,
  },

  footerContainer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    zIndex: 5,
  },
});
