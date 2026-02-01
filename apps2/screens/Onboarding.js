import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  ActivityIndicator,
  Modal,
  TouchableOpacity,
} from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';
import { WebView } from 'react-native-webview';
import AsyncStorage from '@react-native-async-storage/async-storage';
import config from '../../config.json';
import CustomCheckBox from '../components/checkBox/CustomCheckBox';

const { width } = Dimensions.get('window');
const base_url = config.base_url;

const Onboarding = ({ navigation }) => {
  const [slides, setSlides] = useState([]);
  const [hideGuideNextTime, setHideGuideNextTime] = useState(false);
  const [loading, setLoading] = useState(true);
  const [fullscreen, setFullscreen] = useState(false);
  const [fullscreenVideo, setFullscreenVideo] = useState(null);

  useEffect(() => {
    fetch(`${base_url}/portail-stagiaire/video-url.json`)
      .then(res => res.json())
      .then(data => {
        setSlides(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Erreur chargement JSON:', err);
        setLoading(false);
      });
  }, []);

  const onDone = async () => {
    if (hideGuideNextTime) {
      await AsyncStorage.setItem('hasLaunched', 'true');
    } else {
      await AsyncStorage.removeItem('hasLaunched');
    }
    navigation.replace('Dem');
  };

  const handleMessage = (event) => {
    const msg = event.nativeEvent.data;

    if (msg.startsWith('enterFullscreen:')) {
      const url = msg.replace('enterFullscreen:', '');
      setFullscreenVideo(url);
      setFullscreen(true);
    }
  };

  const renderItem = ({ item, index }) => {
    const isLastSlide = index === slides.length - 1;

    return (
      <View style={[styles.slide, { backgroundColor: item.backgroundColor }]}>
        <Text style={styles.title}>{item.title}</Text>

        <Image
          style={styles.logo}
          source={require('../image/logo-myoedb-04.png')}
        />

        <View style={styles.webviewContainer}>
          <WebView
            source={{
              html: `
                <!DOCTYPE html>
                <html>
                <head>
                  <meta name="viewport" content="width=device-width, initial-scale=1.0">
                  <link rel="stylesheet" href="https://cdn.plyr.io/3.7.8/plyr.css" />
                  <style>
                    body { margin: 0; background: #000; }
                    video { width: 100%; height: 100%; }
                  </style>
                </head>
                <body>
                  <video id="player" controls playsinline>
                    <source src="${item.videoUrl}" type="video/mp4" />
                  </video>
                  <script src="https://cdn.plyr.io/3.7.8/plyr.js"></script>
                  <script>
                    const player = new Plyr('#player', {
                      fullscreen: { enabled: true, iosNative: true }
                    });
                    player.on('enterfullscreen', () => {
                      window.ReactNativeWebView.postMessage(
                        'enterFullscreen:${item.videoUrl}'
                      );
                    });
                  </script>
                </body>
                </html>
              `
            }}
            style={styles.webview}
            javaScriptEnabled
            domStorageEnabled
            allowsInlineMediaPlayback
            allowsFullscreenVideo
            mediaPlaybackRequiresUserAction={false}
            onMessage={handleMessage}
          />
        </View>

        <Text style={styles.text}>{item.text}</Text>

        {isLastSlide && (
          <View style={styles.checkboxContainer}>
            <CustomCheckBox
              isChecked={hideGuideNextTime}
              label="Ne plus afficher ce guide"
              onToggle={() => setHideGuideNextTime(!hideGuideNextTime)}
            />
          </View>
        )}
      </View>
    );
  };

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#fff" />
      </View>
    );
  }

  return (
    <>
      <AppIntroSlider
        renderItem={renderItem}
        data={slides}
        onDone={onDone}
        onSkip={onDone}
        showSkipButton
        nextLabel="Suivant"
        skipLabel="Passer"
        doneLabel="Terminer"
      />

      {/* Plein écran vidéo */}
      {fullscreen && fullscreenVideo && (
        <Modal visible animationType="fade">
          <View style={{ flex: 1, backgroundColor: '#000' }}>
            <WebView
              source={{
                html: `
                  <!DOCTYPE html>
                  <html>
                  <head>
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <link rel="stylesheet" href="https://cdn.plyr.io/3.7.8/plyr.css" />
                    <style>
                      body { margin: 0; background: #000; }
                      video { width: 100%; height: 100%; }
                    </style>
                  </head>
                  <body>
                    <video id="player" controls autoplay>
                      <source src="${fullscreenVideo}" type="video/mp4" />
                    </video>
                    <script src="https://cdn.plyr.io/3.7.8/plyr.js"></script>
                    <script>
                      new Plyr('#player', {
                        fullscreen: {
                          enabled: true,
                          fallback: true,
                          iosNative: true,
                          container: document.body
                        }
                      });
                    </script>
                  </body>
                  </html>
                `
              }}
              style={{ flex: 1 }}
              javaScriptEnabled
              domStorageEnabled
              allowsFullscreenVideo
              allowsInlineMediaPlayback
              mediaPlaybackRequiresUserAction={false}
            />

            <TouchableOpacity
              onPress={() => {
                setFullscreen(false);
                setFullscreenVideo(null);
              }}
              style={styles.closeButton}
            >
              <Text style={{ color: '#fff', fontSize: 16 }}>✕</Text>
            </TouchableOpacity>
          </View>
        </Modal>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  slide: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 40,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 15,
  },
  text: {
    fontSize: 16,
    color: '#fff',
    textAlign: 'center',
    marginTop: 20,
  },
  webviewContainer: {
    width: width * 0.85,
    height: width * 0.5,
    backgroundColor: '#000',
    borderRadius: 10,
    overflow: 'hidden',
  },
  webview: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  logo: {
    width: 120,
    height: 70,
    resizeMode: 'contain',
    marginBottom: 15,
  },
  checkboxContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
  },
  closeButton: {
    position: 'absolute',
    top: 40,
    right: 20,
    backgroundColor: '#00000088',
    padding: 10,
    borderRadius: 20,
  },
});

export default Onboarding;
