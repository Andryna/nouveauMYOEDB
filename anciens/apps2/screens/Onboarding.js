import React from 'react';
import { View, Text, StyleSheet, Dimensions, Image } from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';
import { WebView } from 'react-native-webview';

const { width } = Dimensions.get('window');

const slides = [
  {
    key: 'one',
    title: 'Bienvenue dans MYOEDB !',
    text: 'Découvrez comment utiliser les fonctionnalités principales.',
    videoUrl: 'https://elprod.forma2plus.com/portail-stagiaire/labo/myoedb-2.mp4',
    backgroundColor: '#192356',
  },
  {
    key: 'two',
    title: 'Enregistrez vos expressions',
    text: 'Saisie, traduction, text-to-speech.',
    videoUrl: 'https://cdn.plyr.io/static/blank.mp4',
    backgroundColor: '#C9902A',
  },
  {
    key: 'three',
    title: "Entraînement à l'oral",
    text: 'Audio, réécoute, résumé, speech-to-text, traduction.',
    videoUrl: 'https://cdn.plyr.io/static/blank.mp4',
    backgroundColor: '#47BD7A',
  },
  {
    key: 'for',
    title: 'Collectez des expressions avec votre caméra',
    text: 'Cliquez sur "Terminer" pour continuer.',
    videoUrl: 'https://cdn.plyr.io/static/blank.mp4',
    backgroundColor: '#48A2F1',
  }
];

const Onboarding = ({ navigation }) => {
  const onDone = () => {
    navigation.replace('Dem');
  };

  const renderItem = ({ item }) => (
    <View style={[styles.slide, { backgroundColor: item.backgroundColor }]}>
      <Text style={styles.title}>{item.title}</Text>
      <Image style={styles.myoedb} source={require('../image2/logo-myoedb.png')} />

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
                  body { margin: 0; background-color: #000; }
                  video { width: 100%; height: 100%; }
                  .plyr__controls button { transform: scale(1.5); }
                </style>
              </head>
              <body>
                <video id="player" playsinline controls>
                  <source src="${item.videoUrl}" type="video/mp4" />
                </video>
                <script src="https://cdn.plyr.io/3.7.8/plyr.js"></script>
                <script>
                  const player = new Plyr('#player');

                  document.addEventListener('DOMContentLoaded', () => {
                    const container = document.body;

                    player.on('enterfullscreen', () => {
                      if (container.requestFullscreen) container.requestFullscreen();
                      else if (container.webkitRequestFullscreen) container.webkitRequestFullscreen();
                      else if (container.msRequestFullscreen) container.msRequestFullscreen();
                    });

                    player.on('exitfullscreen', () => {
                      if (document.exitFullscreen) document.exitFullscreen();
                      else if (document.webkitExitFullscreen) document.webkitExitFullscreen();
                      else if (document.msExitFullscreen) document.msExitFullscreen();
                    });
                  });
                </script>
              </body>
              </html>
            `,
          }}
          originWhitelist={['*']}
          style={styles.webview}
          javaScriptEnabled={true}
          allowsInlineMediaPlayback={true}
          mediaPlaybackRequiresUserAction={false}
          allowsFullscreenVideo={true}
        />
      </View>
      <Text style={styles.text}>{item.text}</Text>
    </View>
  );

  return (
    <AppIntroSlider
      renderItem={renderItem}
      data={slides}
      onDone={onDone}
      showSkipButton
    />
  );
};

const styles = StyleSheet.create({
  slide: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 20,
  },
  text: {
    fontSize: 16,
    color: '#fff',
    textAlign: 'center',
    marginTop: 20,
    paddingHorizontal: 10,
  },
  webviewContainer: {
    width: width * 0.85,
    height: width * 0.5,
    backgroundColor: '#000',
    overflow: 'hidden',
    borderRadius: 10,
  },
  webview: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  myoedb: {
    width: 120,
    height: 70,
    resizeMode: 'contain',
    marginBottom: 15,
  },
});

export default Onboarding;
