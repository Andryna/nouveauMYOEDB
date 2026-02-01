import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Tts from 'react-native-tts'; // Importer la bibliothèque de synthèse vocale
import Ionicons from 'react-native-vector-icons/Ionicons'; // Importer les icônes

const StaticBulletList = ({ title, data, langueOr, langueCi }) => {
  // Fonction pour lire le texte avec une langue spécifiée
  const speak = (text, language) => {
    Tts.setDefaultLanguage(language); // Définir la langue du TTS
    Tts.speak(text); // Lire le texte
  };

  // Fonction pour afficher chaque élément de la liste
  const renderList = (items) => {
    return items.map((item, index) => (
      <View key={index} style={styles.listItem}>
        <Text style={styles.bullet}>{'\u2022'}</Text>
        <View style={styles.textContainer}>
          <View style={styles.textRow}>
            <Text style={styles.originalText}>{item.original}</Text>
            <TouchableOpacity onPress={() => speak(item.original, langueOr)}>
              <Ionicons name="volume-high" size={20} color="#000" style={styles.icon} />
            </TouchableOpacity>
          </View>
          <View style={styles.textRow}>
            <Text style={styles.translationText}>{item.traduction}</Text>
            <TouchableOpacity onPress={() => speak(item.traduction, langueCi)}>
              <Ionicons name="volume-high" size={20} color="#007BFF" style={styles.icon} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    ));
  };

  return (
    <View style={styles.section}>
      {/* Titre sans le bouton pliable */}
      <Text style={styles.title}>{title}</Text>

      {/* Liste affichée directement */}
      {renderList(data)}
    </View>
  );
};

// Styles
const styles = StyleSheet.create({
  section: {
    marginBottom: 16,
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  listItem: {
    flexDirection: 'row',
    marginVertical: 8,
    alignItems: 'flex-start',
  },
  bullet: {
    fontSize: 20,
    marginRight: 8,
    color: '#000',
  },
  textContainer: {
    flex: 1,
  },
  textRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 4,
  },
  originalText: {
    fontSize: 16,
    color: '#444',
    textAlign: 'justify',
  },
  translationText: {
    fontSize: 16,
    color: '#007BFF',
    textAlign: 'justify',
  },
  icon: {
    marginLeft: 8,
  },
});

export default StaticBulletList;
