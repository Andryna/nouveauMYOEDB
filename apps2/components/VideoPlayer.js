import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
  ProgressBarAndroid,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Video from 'react-native-video';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import config from '../../config.json';

const base_url = config.base_url;
const base_grp_url = config.base_grp_url;

class VideoPlayer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      rate: 1,
      volume: 1,
      muted: false,
      resizeMode: 'contain',
      duration: 0.0,
      currentTime: 0.0,
      paused: true,
      pickerValueHolder: '1.0',
      hideControls: false,
      pausedText: 'play',
      namevid: this.props.namevid,
      id_groupe: this.props.id_groupe,
      legende: this.props.legende,
    };

    this.video = Video;
  }

  onLoad = (data) => {
    if (data.duration !== this.state.duration) {
      this.setState({ duration: data.duration });
    }
  };

  onProgress = (data) => {
    this.setState({ currentTime: data.currentTime });
  };

  onEnd = () => {
    this.setState({ paused: true, pausedText: 'play' });
    this.video.seek(0);
  };

  getCurrentTimePercentage() {
    return this.state.currentTime > 0
      ? parseFloat(this.state.currentTime) / parseFloat(this.state.duration)
      : 0;
  }

  onChangeRate(itemValue) {
    const rate = parseFloat(itemValue);
    this.setState({ pickerValueHolder: itemValue, rate });
  }

  onPressBtnPlay = () => {
    const { paused } = this.state;
    const pausedText = paused ? 'play' : 'pause';

    if (!paused) {
      if (this.timeoutHandle) clearTimeout(this.timeoutHandle);
    } else {
      this.timeoutHandle = setTimeout(() => {
        this.setState({ hideControls: true });
      }, 5000);
    }

    this.setState({ paused: !paused, pausedText });
    console.log(base_url + `/elearning2020/groupes/GRP${this.props.id_groupe}/${this.props.namevid}`);
    console.log(this.props.id_groupe);
  };

  onPressVideo = () => {
    if (this.state.hideControls) {
      this.setState({ hideControls: false });
      this.timeoutHandle = setTimeout(() => {
        this.setState({ hideControls: true });
      }, 2000);
    }
  };

  parseSecToTime(sec) {
    const sec_num = parseInt(sec, 10);
    let hours = Math.floor(sec_num / 3600);
    let minutes = Math.floor((sec_num - hours * 3600) / 60);
    let seconds = sec_num - hours * 3600 - minutes * 60;

    hours = hours < 10 ? '0' + hours : hours;
    minutes = minutes < 10 ? '0' + minutes : minutes;
    seconds = seconds < 10 ? '0' + seconds : seconds;

    return hours + ':' + minutes + ':' + seconds;
  }

  render() {
    const { pausedText, paused } = this.state;
    const MIN_QUALITY_BITRATE = 1000; // Valeur minimale (500 Kbps)
    const MEDIUM_QUALITY_BITRATE = 1000000; // Valeur moyenne (1 Mbps)
    const HIGH_QUALITY_BITRATE = 5000000; // Valeur haute (5 Mbps)
    return (
      <View style={styles.container}>
        <View style={{flexDirection:'row', alignItems:'center'}}>
          {paused ? (
              <TouchableOpacity onPress={this.onPressBtnPlay}>
                <Icon name={'play'} size={30} color={'#DB4165'} style={{paddingHorizontal:10}}/>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity onPress={this.onPressBtnPlay}>
                <Icon name={'pause'} size={30} color={'#DB4165'} style={{paddingHorizontal:10}}/>
              </TouchableOpacity>
            )}
          <Text style={styles.videoTexte}>{this.props.legende}</Text>

        </View>
        
        <TouchableWithoutFeedback style={styles.fullScreen} onPress={this.onPressVideo}>
          <Video
            ref={(ref) => (this.video = ref)}
            source={{ uri: base_grp_url + `${this.props.id_groupe}/${this.props.namevid}` }}
            style={styles.fullScreen}
            rate={this.state.rate}
            paused={this.state.paused}
            volume={this.state.volume}
            muted={this.state.muted}
            resizeMode={this.state.resizeMode}
            onLoad={this.onLoad}
            onProgress={this.onProgress}
            onEnd={this.onEnd}
            onAudioBecomingNoisy={this.onAudioBecomingNoisy}
            onAudioFocusChanged={this.onAudioFocusChanged}
            repeat={false}
            preferredPeakBitrate={MIN_QUALITY_BITRATE}
          />
        </TouchableWithoutFeedback>
        {!this.state.hideControls ? (
          <View style={styles.controls}>
            <View style={styles.generalControls}>
              <View style={styles.playControl}>
                {paused ? (
                  <TouchableOpacity onPress={this.onPressBtnPlay}>
                    <Icon name={'play'} size={30} color={'white'} style={{paddingHorizontal:10}}/>
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity onPress={this.onPressBtnPlay}>
                    <Icon name={'pause'} size={30} color={'white'} style={{paddingHorizontal:10}}/>
                  </TouchableOpacity>
                )}
                <Text style={{color:'white', fontSize:12}}>
                  {this.parseSecToTime(parseInt(this.state.currentTime))}/{this.parseSecToTime(parseInt(this.state.duration))}
                </Text>
              </View>
            </View>
            <View style={styles.trackingControls}>
              <ProgressBarAndroid
                style={styles.progress}
                styleAttr="Horizontal"
                indeterminate={false}
                progress={this.getCurrentTimePercentage()}
                color={'white'} 
              />
            </View>
          </View>
        ) : null}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    // alignItems: 'center',
  },
  fullScreen: {
    width: wp('100%'),
    height: hp('50%'),
    backgroundColor: 'black',
  },
  controls: {
    width: wp('80%'),
    borderRadius: 5,
    position: 'absolute',
    bottom: 10,
    alignSelf:'center'
  },
  progress: {
    flexDirection: 'row',
    borderRadius: 3,
    overflow: 'hidden',
  },
  playControl: {
    flexDirection:'row',
    alignItems:'center'

  },
  videoTexte:{
    color:'white',
    fontSize:14,
    fontWeight:'bold',
    marginLeft:10
  }
});

export default VideoPlayer;
