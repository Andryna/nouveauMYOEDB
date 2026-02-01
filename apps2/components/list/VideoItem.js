import React, { Component } from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  TextInput ,
  KeyboardAvoidingView
} from 'react-native';
import Video from 'react-native-video';
import Icon from 'react-native-vector-icons/Ionicons';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import config from '../../../config.json';
import Svg, { Path } from 'react-native-svg';
import ActionButton from '../buttons/ActionButton';
import EditActionButton from '../buttons/EditActionButton';
import { getStats } from '../../utils/request';
import BoxStats from '../buttons/BoxStats';
import { details } from '../../../styles/styleAcuueil';
const base_url = config.base_url;
class VideoItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      headerbackColor: '#192356',
      videoColor: '#081241',
      expressionColor: '#081241',
      imageColor: '#081241',
      audioColor: '#081241',
      edit: false,
      widthD: wp('55%'),
      legende_f:this.props.legende_f,
      widthText:wp('55%')
    };
  }
  handleChangeText = (text) => {
    this.setState({
      legende_f: text,
    });
  };
  handleAccept = () => {
    this.setState({ edit: false, widthD: wp('55%'), widthText: wp('55%') });
  };

  handleDecline = () => {
    this.setState({ edit: false, widthD: wp('55%'), widthText: wp('55%') });
  };
  
  render() {
    const { f_name, type_file, legende_f,content_orig,content_cible, id_groupe, onDelete, onPlay, lv, target_langue_cible } = this.props;
    return (
      <TouchableOpacity
        style={{
          width: wp('90%'),
          // backgroundColor: '#2B4098',
          alignSelf: 'center',
          borderRadius: 5,
          marginTop: 5,
          alignItems: 'center',
          flexDirection:'row',
          // minHeight:50
        }}
        onPress={onPlay}
      >
        {!this.state.edit? 
        (
        <View
          style={{
            // width: this.state.widthD,
            backgroundColor: 'black',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 5,
          }}
          
        >
          <View
            style={{
            width: 30,
            height: 30,
            backgroundColor: '#a2becd',
            alignItems: 'center',
            justifyContent: 'center',
            alignItems:'center',
            borderRadius: 50,
            opacity: 0.3
          }}
          >
            <Icon name={'play'} size={15} color={'white'} style={{
              alignSelf: 'center'
            }} />
          </View>
        </View>
        ):null
        }
        {this.state.edit?
        (
        <TextInput
          style={{
            color: 'white',
            fontSize: 14,
            marginLeft: wp('5%'),
            fontWeight: 'bold',
            // minHeight: 60,
            minWidth: this.state.widthText,
            maxWidth: this.state.widthText,
          }}
          placeholder="Saisissez votre texte"
          value={this.state.legende_f}
          onChangeText={this.handleChangeText}
        />
        ):
        (
        <Text
          style={{
            color: 'white',
            fontSize: 14,
            marginLeft: wp('5%'),
            fontWeight: 'bold',
            // minHeight:60,
            minWidth:this.state.widthText,
            maxWidth:this.state.widthText
          }}
        >
          {this.state.legende_f} 
        </Text>
        )}
        {this.state.edit ? 
        (
        <EditActionButton
          onAccept={this.handleAccept} 
          onDecline={this.handleDecline}
        />
        ):(
        <ActionButton
          onEdit={()=>this.setState({edit:true, widthD:0, widthText:wp('63%')})} 
          onDelete={onDelete} 
        />
        )
        }
      </TouchableOpacity>
    );
  }
}

export default VideoItem;
