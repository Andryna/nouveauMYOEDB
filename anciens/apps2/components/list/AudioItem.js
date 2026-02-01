import React, { Component } from 'react';
import { View, Text, TouchableOpacity, TextInput } from 'react-native';
import Video from 'react-native-video';
import Icon from 'react-native-vector-icons/Ionicons';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import config from '../../../config.json';
import ActionButton from '../buttons/ActionButton';
import EditActionButton from '../buttons/EditActionButton';
import Svg, { Path } from 'react-native-svg';

const base_url = config.base_url;
class AudioItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      headerbackColor: '#192356',
      videoColor: '#081241',
      expressionColor: '#081241',
      imageColor: '#081241',
      audioColor: '#081241',
      edit: false,
      widthD: wp('20%'),
      legende_f:this.props.legende_f,
      widthText:wp('43%')
    };
  }
  handleChangeText = (text) => {
    this.setState({
      legende_f: text,
    });
  };
  handleAccept = () => {
    this.setState({ edit: false, widthD: wp('20%'), widthText: wp('43%') });
  };

  handleDecline = () => {
    this.setState({ edit: false, widthD: wp('20%'), widthText: wp('43%') });
  };
  render() {
    const { f_name, type_file, legende_f,content_orig,content_cible, id_groupe, onDelete, onPlay , itemDetails} = this.props;
    return (
      <TouchableOpacity
      style={{
        width: wp('80%'),
        // backgroundColor: '#2B4098',
        alignSelf: 'center',
        justifyContent:'center',
        borderRadius: 5,
        marginTop: 5,
        alignItems: 'center',
        flexDirection:'row',
        // padding:10

      }}
      onPress={onPlay}
      >
        {!this.state.edit?(
          <View
          style={{
            width: this.state.widthD,
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 5,
          }}
        >
          <View
            style={{
            width: 25,
            height: 25,
            backgroundColor: '#47BD7A',
            alignItems: 'center',
            justifyContent: 'center',
            alignItems:'center',
            borderRadius: 50,
          }}
          >
            <Icon name={'play'} size={15} color={'#2B4098'} style={{
              alignSelf: 'center'
            }} />
          </View>
        </View>):null}
        {this.state.edit?
        (
        <TextInput
          style={{
            color: 'white',
            fontSize: hp('2%'),
            marginLeft: wp('5%'),
            fontWeight: 'bold',
            minHeight: 60,
            minWidth: this.state.widthText,
            maxWidth: this.state.widthText,
          }}
          placeholder="Saisissez votre texte"
          value={this.state.legende_f}
          onChangeText={this.handleChangeText}
        />
        ):
        (
          <View
          style={{
            backgroundColor:'#151B37',
            padding:6,
            marginRight:10,
            borderRadius:5
          }}
          >
            <Text
              style={{
                color: 'white',
                fontSize: 14,
                // marginLeft: wp('5%'),
                fontWeight: 'bold',
                minWidth:this.state.widthText,
                maxWidth:this.state.widthText,
                padding:3,
                lineHeight: 25,
                
              }}
            >
              {/* {this.state.legende_f}  */}
              {/* {itemDetails.date_creation}  */}
              {/* {itemDetails.audio_langue_origine}  */}
              {itemDetails.audio_legend ? itemDetails.audio_legend : 'Untitled Audio'}
            </Text>
          </View>
        )}


        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <TouchableOpacity
            onPress={()=>alert('ok')} // Fonction appelée pour l'édition
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


        {/* {this.state.edit ? 
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
        } */}
      </TouchableOpacity>
    );
  }
}

export default AudioItem;