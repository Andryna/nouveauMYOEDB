import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Video from 'react-native-video';
import Icon from 'react-native-vector-icons/Ionicons';

class VideoItem extends Component {
  render() {
    const { f_name, type_file, legende_f, id_groupe, onDelete, onPlay } = this.props;
    return (
      <View>
        {f_name !== "" && type_file === "video" ? (
          <View
            style={{
              height: hp('18.5%'),
              width: wp('30%'),
              backgroundColor: '#2E2759',
              alignSelf: 'center',
              borderRadius: 5,
              marginTop: hp('2%'),
              alignItems: 'center'
            }}
          >
            <Video
              ref={(ref) => { this.video = ref; }}
              source={{ uri: base_url + "/elearning2023/groupes/GRP" + id_groupe + "/" + f_name }}
              style={{
                height: hp('15%'),
                width: wp('25%'),
                borderRadius: 5,
                backgroundColor: 'white'
              }}
              rate={this.state.rate}
              paused={true}
              volume={this.state.volume}
              muted={this.state.muted}
              resizeMode={this.state.resizeMode}
              onLoad={this.onLoad}
              onProgress={this.onProgress}
              onEnd={this.onEnd}
              onAudioBecomingNoisy={this.onAudioBecomingNoisy}
              onAudioFocusChanged={this.onAudioFocusChanged}
              repeat={false}
            />
            <Text
              style={{
                color: 'white',
                fontSize: hp('2%'),
                marginLeft: wp('5%'),
                fontWeight: 'bold'
              }}
            >
              {legende_f}
            </Text>
            <View style={{
              position: 'absolute',
              top: hp('2.5%'),
              alignSelf: 'center'
            }}>
              <TouchableOpacity
                style={{
                  width: 80,
                  height: 80,
                  backgroundColor: 'white',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: 50,
                  opacity: 0.7
                }}
                onPress={onPlay}
              >
                <Icon name={'ios-play'} size={50} color={'pink'} style={{
                  alignSelf: 'center'
                }} />
              </TouchableOpacity>
            </View>
            <View style={{
              position: 'absolute',
              bottom: hp('3%'),
              alignSelf: 'center',
              left: wp('2%')
            }}>
              <TouchableOpacity style={{
                alignItems: 'center',
                justifyContent: 'center',
              }} onPress={() => onDelete(f_name)}>
                <Icon name={'ios-trash'} size={20} color={'red'} style={{
                  alignSelf: 'center'
                }} />
              </TouchableOpacity>
            </View>
          </View>
        ) : null}
      </View>
    );
  }
}

export default VideoItem;
