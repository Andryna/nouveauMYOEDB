import React from 'react';
import { View, Text, TouchableOpacity, Image, Clipboard } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const colorsBoxText = ['#FBAFA9', '#FFF8B9', '#AECCDC', '#D3E4EC', '#D4C0DC', '#F5E2DC', '#A9FBB7', '#D7FFB9'];

const ExpressionItem = ({
  id,
  or,
  ci,
  intit,
  date,
  name,
  od,
  type,
  legende,
  index,
  id_category,
  ide,
  showedit,
  deleteItem,
  onShare,
  navigation,
  _play
}) => {
  const copied = `Category: ${intit}\noriginal: ${or}\ntranslated: ${ci}`;

  const handlePlayPress = () => {
    if (od === '') {
      navigation.navigate('VideoWebPlayer', { namevid: name, id_groupe: navigation.getParam('id_groupe', '') });
    } else {
      _play(od);
    }
  };

  return (
    <View
      style={[
        styles.container,
        // {
        //   backgroundColor: od === '' ? colorsBoxText[index % colorsBoxText.length] : '#F5E2DC',
        // },
      ]}
    >
      <View style={styles.textContainer}>
        <TouchableOpacity onPress={() => showedit(id, or, ci, intit, date, name, od, type, legende, index, id_category)} style = {styles.expressionCard}>
          <Text style={styles.text}>{or}</Text>
          <View style={styles.separator} />
          <Text style={styles.text}>{ci}</Text>
        </TouchableOpacity>
      </View>
      {od !== '' ? (
        <View style={styles.actionsContainer}>
          <TouchableOpacity onPress={handlePlayPress}>
            {name !== '' ? (
              <Image style={styles.actionImage} source={require('../../image/play-2.png')} />
            ) : (
              <Image style={styles.actionImage} source={require('../../image/sound.png')} />
            )}
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.action}>
          <View style={styles.actionsContainer}>
            <TouchableOpacity onPress={() => { Clipboard.setString(copied), alert('text copié') }}>
              <Icon name="copy-outline" color = "white" size={15} style={styles.actionIcon} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => showedit(id, or, ci, intit, date, name, od, type, legende, index, id_category)}>
              <Icon name="create-outline" color = "white" size={15} style={styles.actionIcon} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => deleteItem(id, name)}>
              <Icon name="trash-outline" color = "white" size={15} style={styles.actionIcon} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => onShare(or, ci, od, name)}>
              <Icon name="share-social-outline" color="white" size={15} style={styles.actionIcon} />
            </TouchableOpacity>
          </View>
          <TouchableOpacity
          onPress={()=>alert("read "+or)}
          style={styles.read}
          >
            <Icon name="volume-high" color="#DD9E2E" size={25} />
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = {
  container: {
    marginTop: hp('2%'),
    // borderWidth: 0.4,
    elevation:8,
    // borderColor: 'grey',
    margin: 5,
    borderRadius: 10,
    backgroundColor: '#2B4098',
    width: wp('90%'),
    borderRadius:5
  },
  textContainer: {
    alignItems: 'center',
    paddingBottom: 10,
  },
  expressionCard:{
    flexDirection:'row'
  },
  text: {
    textAlign: 'justify',
    fontSize: 14,
    fontWeight: 'bold',
    padding:10,
    color:'white',
    // backgroundColor:'red',
    width:wp('42%')
  },
  separator: {
    borderWidth: 0.5,
    borderColor: 'white',
    height: hp('5%'),
    alignSelf: 'center',
    marginTop: 5,
    marginBottom: 5,
    opacity: 0.5,
  },
  action:{
    backgroundColor:'#1E307F',
    flexDirection:'row',
    borderRadius:5
  },
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 5,
    width:wp('50%')
  },
  actionIcon: {
    width: 30,
    height: 30,
    alignSelf: 'center',
  },
  read:{
    position:'absolute',
    alignSelf:'center',
    right:20
  },
  actionImage: {
    width: 30,
    height: 30,
    alignSelf: 'center',
  },
};

export default ExpressionItem;
