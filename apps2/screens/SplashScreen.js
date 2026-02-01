// SplashScreen.js
import React, { useEffect } from 'react';
import { View, Image, StyleSheet } from 'react-native';

const SplashScreen = ({ navigation }) => {
  useEffect(() => {
    // Simulez un chargement ou effectuez d'autres opérations nécessaires
    setTimeout(() => {
      // Naviguez vers votre écran principal après un certain délai
      navigation.replace('Dem');
    }, 5500); // ajustez la durée du splash screen selon vos besoins
  }, []);

  return (
    <View style={styles.container}>
      <Image
        style={styles.logo}
        source={require('../image2/logo-myoedb.png')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#192356',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 200,
    height: 200,
  },
});

export default SplashScreen;
