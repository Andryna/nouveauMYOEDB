import React, { useState, useEffect, useRef } from 'react';
import { ScrollView, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Sound from 'react-native-sound';
import config from '../../../config.json';
const base_url = config.base_url;

const AudioDetails = ({ newItem, toListe, userInfo }) => {
  const [sound, setSound] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [playSeconds, setPlaySeconds] = useState(0);
  const [playState, setPlayState] = useState('paused');
  const [sliderEditing, setSliderEditing] = useState(false);
  const intervalRef = useRef(null); // Référence pour stocker l'ID de l'intervalle

  useEffect(() => {
    const loadSound = async () => {
      const whoosh = new Sound(
        base_url + '/elearning2023/groupes/GRP' + userInfo.id_groupe + '/'+'14937test_1714624823.wav',
        // newItem.audio_langue_origine,
        Sound.DEFAULT,
        (error) => {
          if (error) {
            console.log('failed to load the sound', error);
            return;
          } else {
            setIsLoading(false);
            // Chargé avec succès
            console.log(
              'duration in seconds: ' +
                whoosh.getDuration() +
                'number of channels: ' +
                whoosh.getNumberOfChannels()
            );

            intervalRef.current = setInterval(() => {
              if (
                whoosh &&
                whoosh.isLoaded() &&
                playState === 'playing' &&
                !sliderEditing
              ) {
                whoosh.getCurrentTime((seconds, isPlaying) => {
                  setPlaySeconds(seconds);
                });
              }
            }, 100);
          }
        }
      );

      setSound(whoosh);
    };

    loadSound();

    return () => {
      // Nettoyer l'interval en utilisant la référence
      clearInterval(intervalRef.current);
    };
  }, []);

  const playSound = () => {
    console.log(base_url + '/elearning2023/groupes/GRP' + userInfo.id_groupe + '/'+newItem.audio_langue_origine);
    if (sound) {
      sound.play();
      setPlayState('playing');
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.innerContainer}>
        <TouchableOpacity onPress={toListe}>
          <View style={styles.row}>
            <Icon name="arrow-back-outline" size={35} color="white" />
            <Text style={styles.text}>{newItem.audio_langue_origine}</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={playSound}>
          <View style={styles.row}>
            <Icon name="play" size={35} color="white" />
            <Text style={styles.text}>{newItem.audio_langue_origine}</Text>
          </View>
        </TouchableOpacity>
        <Text style={styles.absoluteText}>{newItem.audio_langue_origine} test {base_url + '/elearning2023/groupes/GRP' + userInfo.id_groupe + '/'+newItem.audio_langue_origine}</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 5,
    paddingBottom: 10,
    height: hp('30%')
  },
  innerContainer: {
    height: hp('180%'),
    backgroundColor: 'red',
    marginBottom: 10
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  text: {
    color: 'white'
  },
  absoluteText: {
    position: 'absolute',
    bottom: 0
  }
});

export default AudioDetails;
