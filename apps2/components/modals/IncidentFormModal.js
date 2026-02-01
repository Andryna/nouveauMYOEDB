import React, { useState, useEffect } from 'react';
import { Modal, View, Image, Alert, ScrollView } from 'react-native';
import { TextInput, Button, Text, IconButton, Card } from 'react-native-paper';
// import { launchImageLibrary } from 'react-native-image-picker';
import config from '../../../config.json';


const base_url = config.base_url;

export default function IncidentFormModal({ visible, onClose, userInfo }) {
  const [message, setMessage] = useState('');
  const [image, setImage] = useState(null);
  const [imageBase64, setImageBase64] = useState('');
  const id_stagiaire = userInfo?.id || '';
  const name = userInfo?.nom || '';
  const email = userInfo?.email || '';

  const pickImage = () => {
    // launchImageLibrary(
    //   { mediaType: 'photo', includeBase64: true },
    //   (response) => {
    //     if (response.didCancel) return;
    //     if (response.errorMessage) {
    //       console.log('ImagePicker Error: ', response.errorMessage);
    //       return;
    //     }
    //     const asset = response.assets[0];
    //     setImage(asset.uri);
    //     setImageBase64(asset.base64);
    //   }
    // );
  };

 const submitForm = async () => {
  if (!name || !email || !message) {
    Alert.alert('Erreur', 'Veuillez remplir tous les champs.');
    return;
  }

  try {
    const response = await fetch(`${base_url}/portail-stagiaire/send-report.php`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name,
        email,
        message,
        id_stagiaire,
        screenshotBase64: imageBase64
      }),
    });

    const result = await response.json();

    if (response.ok && result.message) {
      // 🟢 Message succès renvoyé depuis PHP
      Alert.alert('Succès', result.message);
    } else if (result.error) {
      // 🔴 Erreur renvoyée par PHP
      Alert.alert('Erreur', result.error);
    } else {
      // 🟡 Réponse inattendue
      Alert.alert('Réponse du serveur', JSON.stringify(result, null, 2));
    }

    onClose(); // fermer le modal après
  } catch (error) {
    console.error(error);
    Alert.alert('Erreur', 'Impossible d’envoyer le formulaire.');
  }
};


  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={{ flex: 1, justifyContent: 'center', backgroundColor: 'rgba(0,0,0,0.5)' }}>
        <Card style={{ margin: 20, borderRadius: 10 }}>
          <Card.Content>
            <ScrollView>
              <Text style={{ fontWeight: 'bold', fontSize: 18, marginBottom: 15 }}>Signaler un incident</Text>

              {/* Champ message */}
              <TextInput
                label="Message"
                value={message}
                onChangeText={setMessage}
                multiline
                mode="outlined"
                style={{ marginBottom: 15 }}
              />

              {/* Sélection image */}
              <Button icon="camera" mode="contained" onPress={pickImage} style={{ marginBottom: 10 }}>
                Sélectionner une image
              </Button>

              {image && (
                <Image
                  source={{ uri: image }}
                  style={{ width: '100%', height: 200, marginBottom: 15, borderRadius: 5 }}
                  resizeMode="cover"
                />
              )}

              {/* Boutons */}
              <Button mode="contained" onPress={submitForm} style={{ marginBottom: 10 }}>
                Envoyer
              </Button>

              <Button mode="outlined" onPress={onClose} color="red">
                Fermer
              </Button>
            </ScrollView>
          </Card.Content>
        </Card>
      </View>
    </Modal>
  );
}
