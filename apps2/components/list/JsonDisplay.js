import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

class JsonDisplay extends Component {
  // Vérifie si l'entrée est un objet ou un tableau
  isObject = (value) => value && typeof value === 'object' && !Array.isArray(value);

  // Fonction pour afficher récursivement les éléments du tableau ou de l'objet
  renderItem = (item, key, level) => {
    return (
      <View key={key} style={[styles.itemContainer, { marginLeft: level * 15 }]}>
        {this.isObject(item) ? (
          // Affichage des objets imbriqués avec la clé comme titre
          <View>
            <Text style={styles.key}>{key}:</Text>
            {Object.keys(item).map((subKey) => this.renderItem(item[subKey], subKey, level + 1))}
          </View>
        ) : Array.isArray(item) ? (
          // Affichage des tableaux avec des puces
          <View>
            <Text style={styles.key}>{key}:</Text>
            {item.map((subItem, index) => (
              <View key={index} style={styles.bulletContainer}>
                <Text style={styles.bullet}>•</Text>
                <Text style={styles.value}>{subItem}</Text>
              </View>
            ))}
          </View>
        ) : (
          // Affichage des valeurs simples avec une puce
          <View style={styles.bulletContainer}>
            <Text style={styles.bullet}>•</Text>
            <Text style={styles.value}>{item}</Text>
          </View>
        )}
      </View>
    );
  };

  render() {
    const { data, level = 0 } = this.props;
    return (
      <ScrollView style={styles.container}>
        {this.isObject(data)
          ? Object.keys(data).map((key) => this.renderItem(data[key], key, level))
          : Array.isArray(data)
          ? data.map((item, index) => this.renderItem(item, index, level))
          : <Text style={styles.value}>{data}</Text>
        }
      </ScrollView>
    );
  }
}

// Styles du composant
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  itemContainer: {
    marginVertical: 5,
  },
  bulletContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginVertical: 2,
  },
  bullet: {
    fontSize: 14,
    marginRight: 8,
  },
  key: {
    fontWeight: 'bold',
    fontSize: 16,
    marginTop: 5,
  },
  value: {
    fontSize: 14,
    color:'green',
    flexShrink: 1,
  },
});

export default JsonDisplay;
