import React from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
} from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import I18n from 'react-native-i18n';
import en from '../../../i18/en';
import fr from '../../../i18/fr';
import es from '../../../i18/es';

const ImageDescription = ({ title, text }) => (
  <View style={styles.descriptionContainer}>
    <Text style={styles.descriptionTitle}>{title}</Text>
    <View style={styles.descriptionDivider} />
    <Text style={styles.descriptionText}>{text}</Text>
  </View>
);

const ImageTranscription = ({ language, text }) => (
  <View style={styles.transcriptionContainer}>
    <View style={styles.languageBadge}>
      <Text style={styles.languageText}>{language}</Text>
    </View>
    <Text style={styles.transcriptionText}>{text}</Text>
  </View>
);

const Categories = ({ category }) => (
  <View style={styles.categoryContainer}>
    <Text style={styles.categoryText}>{category ? category : I18n.t('Not categorised')}</Text>
  </View>
);

const ImageView = ({ imageSource, description, transcription, category }) => (
  <View style={styles.container}>
    <Image
      style={styles.image}
      source={{ uri: imageSource }}
    />
    <View style={styles.actionsContainer}>
      {/* Ajoutez ici vos boutons d'action */}
    </View>
    <ImageDescription title={I18n.t('Nom du fichier:')} text={description} />
    <ImageDescription title={I18n.t('Date de création:')} text={date} />
    <ImageDescription title={I18n.t('Description:')} text={description} />
    <ScrollView style={styles.transcriptionScroll}>
      <ImageTranscription language="EN" text={original} />
      <ImageTranscription language="FR" text={cible} />
    </ScrollView>
    <ImageDescription title={"I18n.t('categories')"} text={intit} />
    <Categories category={intit} />
  </View>
);

const styles = {
  container: {
    width: wp('100%'),
    height: hp('90%'),
  },
  image: {
    width: wp('90%'),
    height: hp('30%'),
    alignSelf: 'center',
    borderRadius: 10,
  },
  actionsContainer: {
    width: wp('60%'),
    height: hp('5%'),
    marginLeft: wp('35%'),
    justifyContent: 'space-around',
    flexDirection: 'row',
  },
  descriptionContainer: {
    flexDirection: 'row',
    marginLeft: wp('5%'),
  },
  descriptionTitle: {
    fontSize: hp('2%'),
    opacity: 0.6,
  },
  descriptionDivider: {
    height: 2,
    backgroundColor: 'pink',
  },
  descriptionText: {
    fontSize: hp('1.5%'),
    marginLeft: wp('2%'),
    opacity: 0.6,
  },
  transcriptionContainer: {
    flexDirection: 'row',
    width: wp('90%'),
    alignSelf: 'center',
    marginTop: hp('0.3%'),
  },
  languageBadge: {
    backgroundColor: 'pink',
    width: wp('6%'),
    height: hp('3%'),
  },
  languageText: {
    fontSize: hp('2%'),
  },
  transcriptionText: {
    width: wp('82%'),
    left: wp('8%'),
    position: 'absolute',
    top: 0,
    fontSize: hp('1.5%'),
    opacity: 0.6,
    textAlign: 'left',
  },
  transcriptionScroll: {
    height: hp('15%'),
  },
  categoryContainer: {
    flexDirection: 'column',
    marginTop: hp('1.5%'),
    marginLeft: wp('5%'),
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#5C4DB1',
    width: wp('45%'),
    marginTop: hp('2%'),
    marginLeft: wp('5%'),
  },
  categoryText: {
    paddingTop: 2,
    paddingBottom: 2,
    textAlign: 'center',
    fontSize: hp('2%'),
    opacity: 0.6,
  },
};

export default ImageView;
