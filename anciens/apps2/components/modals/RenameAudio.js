import React from 'react';
import { Modal, TouchableOpacity, View, Text, StyleSheet, TextInput } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import ModalLayout from '../../layouts/ModalLayout';
import Icon from 'react-native-vector-icons/Ionicons';

const RenameAudio = ({ visible, onClose, navigation }) => {
  return (
    <Modal transparent={true} animationType="slide" visible={visible}>
      <ModalLayout navigation={navigation}>
        <View style={styles.renameModal}>
          <View style={styles.header}>
            <TouchableOpacity onPress={onClose}>
              <View style={styles.headerContent}>
                <Icon name="arrow-back-outline" size={25} color="white" style={styles.icon} />
                <Text style={styles.headerText}>Enregistrement audio</Text>
              </View>
            </TouchableOpacity>
          </View>

          <View style={styles.renamContainer}>
            <Text style={styles.renameTitle}>Audio enregistré</Text>
            <TextInput
              style={styles.place}
              placeholder="Audio-01-02-2023.mp3"
              underlineColorAndroid="transparent"
            />
            <Text style={styles.label}>Catégorie</Text>
            <TouchableOpacity style={styles.newCategoryButton}>
              <Text style={styles.buttonText}>+ Nouvelle catégorie</Text>
            </TouchableOpacity>
            <View style={styles.categoryContainer}>
              <Text style={styles.category}>My expression</Text>
              <Text style={styles.category}>TOEIC</Text>
              <Text style={styles.category}>Pro</Text>
            </View>
            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.saveButton}>
                <Text style={styles.buttonText}>ENREGISTRER</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
                <Text style={styles.buttonText}>ANNULER</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ModalLayout>
    </Modal>
  );
};

const styles = StyleSheet.create({
  renameModal: {
    backgroundColor: '#1C2E4A',
    borderRadius: 5,
    alignSelf: 'center',
    width: wp('100%'),
    height: hp('100%'),
  },
  header: {
    justifyContent: 'center',
    height: hp('8.5%'),
    width: wp('100%'),
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 15,
  },
  icon: {
    alignSelf: 'center',
    marginLeft: 5,
  },
  headerText: {
    color: 'white',
    fontSize: hp('2.2%'),
    marginLeft: wp('20%'),
  },
  renamContainer: {
    backgroundColor: '#2D3E5E',
    borderRadius: 5,
    alignSelf: 'center',
    width: wp('80%'),
    height: hp('50%'),
    marginTop: hp('10%'),
    padding: 15,
  },
  renameTitle: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 10,
  },
  place: {
    padding: 8,
    borderRadius: 5,
    backgroundColor: 'white',
    width: wp('70%'),
    alignSelf: 'center',
    marginBottom: 10,
  },
  label: {
    color: 'white',
    fontSize: 14,
    marginBottom: 5,
  },
  newCategoryButton: {
    backgroundColor: '#48A2F1',
    borderRadius: 5,
    padding: 10,
    alignItems: 'center',
    alignSelf: 'center',
    marginBottom: 10,
  },
  categoryContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },
  category: {
    backgroundColor: '#3E4A6F',
    color: 'white',
    padding: 8,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  saveButton: {
    backgroundColor: '#48A2F1',
    borderRadius: 5,
    padding: 10,
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: '#EA1E69',
    borderRadius: 5,
    padding: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 14,
  },
});

export default RenameAudio;