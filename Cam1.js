import React from 'react'; // Import de React
import { View, Text, Button } from 'react-native'; // Import des composants de base de React Native
import { useNavigation } from '@react-navigation/native'; // Import de useNavigation pour la navigation

// Définition du composant Cam1
function Cam1() {
  const navigation = useNavigation(); // Obtention de l'objet de navigation

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Home Screen</Text>
      <Button
        title="Go to Details"
        onPress={() => navigation.navigate('Details')} // Navigation vers la page Details
      />
      <Button
        title="Go to Camera"
        onPress={() => navigation.navigate('Cam')} // Navigation vers le composant Cam
      />
    </View>
  );
}

export default Cam1; // Exportation du composant
