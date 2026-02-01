import { AsyncStorage } from 'react-native';

export const clearAllData = async (navigation) => {
  try {
    await AsyncStorage.multiGet(['login', 'nom', 'prenom', 'email', 'tel', 'adresse', 'cp', 'ville', 'password', 'id']).then((data) => {
      let a = data[0][1];
      let b = data[1][1];
      let c = data[2][1];
      let d = data[3][1];
      let e = data[4][1];
      let f = data[5][1];
      let g = data[6][1];
      let h = data[7][1];
      let i = data[8][1];
      let j = data[9][1];
      if (a !== null) {
        console.log(a + ', ' + b + ', ' + c + ',' + d + ',' + e + ',' + f + ',' + g + ',' + h + ',' + i + ',' + j);
        AsyncStorage.getAllKeys()
          .then(keys => AsyncStorage.multiRemove(keys))
          .then(() => {
            alert('Vous êtes déconnecté');
            navigation.goBack();
          });
      } else {
        console.log('rien');
        navigation.goBack();
      }
    });
  } catch (error) {
    console.log(error);
  }
};
