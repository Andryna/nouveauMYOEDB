import React, { Component } from 'react';
import { View, TouchableOpacity, Image, ActivityIndicator, Text } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/Ionicons'; 
import config from '../../../config.json';
import Svg, { Path } from 'react-native-svg';

const base_url = config.base_grp_url;

class ImageItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      imageUri: null,
    };
  }

  componentDidMount() {
    const { id_groupe, f_name } = this.props;
    const uri = `${base_url}${id_groupe}/${f_name}`;

    Image.prefetch(uri)
      .then(() => {
        this.setState({ imageUri: uri, isLoading: false });
      })
      .catch((error) => {
        console.error('Erreur lors du préchargement de l\'image:', error);
        this.setState({ isLoading: false });
      });
  }

  render() {
    const { onPlay, onEdit, onDelete, f_name, lieu, date, legende_f, id_expression } = this.props;
    const { isLoading, imageUri } = this.state;

    return (
      <TouchableOpacity
        style={{
          width: wp('92%'),
          alignSelf: 'center',
          borderRadius: 5,
          marginTop: 1,
          flexDirection: 'row',
          alignItems: 'center',
          padding: 5,
          backgroundColor: '#0c123b',
          justifyContent: 'space-between', // Espacement entre les icônes et le texte
        }}
        onPress={onPlay}
      >
        <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}>
          <Icon name={"image-outline"} color={'#DB4165'} size={30} />
          <Text
            style={{
              marginLeft: 10,
              color: 'white',
              maxWidth: wp('65%'),
            }}
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            {legende_f && legende_f.trim() !== null ? legende_f : f_name}
          </Text>
        </View>

        {/* Boutons Edit et Delete */}
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <TouchableOpacity
            onPress={onEdit} // Fonction appelée pour l'édition
            style={{
              backgroundColor: '#1e214d',
              borderRadius: 25,
              padding: 8,
              marginRight: 10,
            }}
          >
            <Svg
              xmlns="http://www.w3.org/2000/svg"
              width="15"
              height="15"
              viewBox="0 0 24 24"
              fill="rgba(0, 0, 0, 1)"
            >
              <Path
                d="M19.045 7.401c.378-.378.586-.88.586-1.414s-.208-1.036-.586-1.414l-1.586-1.586c-.378-.378-.88-.586-1.414-.586s-1.036.208-1.413.585L4 13.585V18h4.413L19.045 7.401zm-3-3 1.587 1.585-1.59 1.584-1.586-1.585 1.589-1.584zM6 16v-1.585l7.04-7.018 1.586 1.586L7.587 16H6zm-2 4h16v2H4z"
                fill="#fff"
              />
            </Svg>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={onDelete} // Fonction appelée pour la suppression
            style={{
              backgroundColor: '#DB4165',
              borderRadius: 25,
              padding: 8,
            }}
          >
            <Icon name={"close"} color={'white'} size={15} />
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    );
  }
}

export default ImageItem;