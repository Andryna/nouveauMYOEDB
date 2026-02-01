import React from 'react';
import { Modal, TouchableOpacity, View, Image, Text, StyleSheet } from 'react-native';
import I18n from 'react-native-i18n';
import en from '../../../i18/en';
import fr from '../../../i18/fr';
import es from '../../../i18/es';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const flagImages = {
  en: require('../../image/GB.jpg'),
  fr: require('../../image/drapeau-france.jpg'),
  es: require('../../image/espagne.png'),
};

const languages = ['en', 'fr', 'es'];

const LoginModals = ({ visible, onClose, onChangeLang }) => {
  return (
    <Modal transparent={true} animationType="slide" visible={visible}>
      <TouchableOpacity onPress={onClose} style={styles.container}>
        <View style={styles.line}>
          {languages.map((lang, index) => (
            <TouchableOpacity key={index} onPress={() => onChangeLang(lang)} style={styles.button}>
              <Image style={styles.flag} source={flagImages[lang]} />
              <Text style={styles.label}>{I18n.t(lang === 'en' ? 'Anglais' : lang === 'fr' ? 'Francais' : 'Espagnol')}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </TouchableOpacity>
    </Modal>
  );
};

export default LoginModals;


const styles=StyleSheet.create({
    flag:{
      width:30,
      height:25,
      alignSelf:'flex-start',
      marginRight:4
    },
    line:{
        backgroundColor: '#313D6E',
        width: 113,
        height: 94,
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent:'center',
        marginTop: hp('32%'),
        marginRight: wp('1.75%')
    },
    buttonContainer:{
        borderWidth: 1,
        width: 90,
        alignSelf: 'center',
        borderColor: 'grey',
        marginBottom: 2,
        alignItems: 'center'
    },
    button:{
        height: 27,
        width: 110,
        marginBottom: 2,
        flexDirection: 'row',
        alignItems: 'center', 
    },
    label:{
        color:'white'
    }

  })