import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

class VerbList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      expandedSections: {}, // Garde la trace des sections ouvertes/fermées
      onlyVerbes1: props.onlyVerbes1 || [],
      onlyVerbes2: props.onlyVerbes2 || [],
      intersection: props.intersection || [],
    };
  }

  toggleSection = (section) => {
    this.setState((prevState) => ({
      expandedSections: {
        ...prevState.expandedSections,
        [section]: !prevState.expandedSections[section],
      },
    }));
  };

  renderSection = (title, data, sectionKey, color) => {
    const { expandedSections } = this.state;

    // Vérifie si la section doit être affichée
    if (!data || data.length === 0) {
      return null;
    }

    return (
      <View style={styles.section}>
        {/* En-tête de la section */}
        <TouchableOpacity
          onPress={() => this.toggleSection(sectionKey)}
          style={[styles.sectionHeader,{backgroundColor:color}]}
        >
          <Text style={styles.sectionTitle}>{title}</Text>
          <Icon
            name={expandedSections[sectionKey] ? 'chevron-up-outline' : 'chevron-down-outline'}
            size={24}
            color="#fff"
          />
        </TouchableOpacity>

        {/* Contenu de la section */}
        {expandedSections[sectionKey] && (
          <View style={styles.sectionContent}>
            <FlatList
              data={data}
              keyExtractor={(item, index) => `${sectionKey}-${index}`}
              scrollEnabled={false} // Désactive le défilement interne
              renderItem={({ item }) => (
                <Text style={styles.itemText}>• {item}</Text>
              )}
            />
          </View>
        )}
      </View>
    );
  };

  render() {
    const { onlyVerbes1, onlyVerbes2, intersection } = this.props;
    const {uniqueFr, uniqueEn, commun} = this.props;

    return (
      <View style={styles.container}>
        {this.renderSection(uniqueFr, onlyVerbes1, 'onlyVerbes1', '#f8918c')}
        {this.renderSection(commun, intersection, 'intersection', "#d3bb80")}
        {this.renderSection(uniqueEn, onlyVerbes2, 'onlyVerbes2', '#80d3b0')}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f2f2f2',
  },
  section: {
    marginBottom: 20,
    borderRadius: 10,
    backgroundColor: '#ffffff',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#007AFF',
    padding: 12,
    borderRadius:10
  },
  sectionTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  sectionContent: {
    backgroundColor: '#f9f9f9',
    minHeight:100
  },
  itemText: {
    fontSize: 16,
    color: '#333',
    padding: 12,
    paddingLeft: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
});

export default VerbList;
