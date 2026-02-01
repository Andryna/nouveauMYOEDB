import React, {
  Component
} from 'react';

import {
  AppRegistry,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
  Picker,
  ProgressBarAndroid,
  TouchableOpacity
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import Video from 'react-native-video';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

export default class VideoPlayertest extends Component {
  static navigationOptions =
   {
    headerShown: false
   };

    constructor(props) {
        super(props);
    
        // init state variables
        this.state = {
          rate: 1,
          volume: 1,
          muted: false,
          resizeMode: 'contain',
          duration: 0.0,
          currentTime: 0.0,
          paused: true,
          pickerValueHolder: '1.0',
          // pausedText: 'Play',
          hideControls: false,
          pausedText:'ios-play',
          
          // namevid:this.props.navigation.state.params.namevid,
          // id_groupe:this.props.navigation.state.params.id_groupe,
        };
    
        this.video = Video;
      }
    
      // load video event
      onLoad = (data) => {
        this.setState({ duration: data.duration });
      };
    
      // video is playing
      onProgress = (data) => {
        this.setState({ currentTime: data.currentTime });
      };
    
      // video ends
      onEnd = () => {
        this.setState({ paused: true, pausedText: 'ios-play'})
        this.video.seek(0);
      };
    
      getCurrentTimePercentage() {
        if (this.state.currentTime > 0) {
          return parseFloat(this.state.currentTime) / parseFloat(this.state.duration);
        }
        return 0;
      };
    
      onChangeRate(itemValue, itemIndex) {
        var rate = parseFloat(itemValue);
        this.setState({pickerValueHolder: itemValue, rate: rate});
      }
    
      // pressing on 'play' button
      onPressBtnPlay() {
        // alert(this.state.id_groupe);
        var pausedText = '';
        if(!this.state.paused){
          pausedText = 'ios-play';
    
          // always show controls
          if(this.timeoutHandle)
            clearTimeout(this.timeoutHandle);
        }
        else {
          pausedText = 'ios-pause';
    
          // hide controls after 5s
          this.timeoutHandle = setTimeout(()=>{
            this.setState({hideControls: true});
          }, 5000);
        }
        this.setState({ paused: !this.state.paused, pausedText: pausedText });
      }
    
      // on press video event
      onPressVideo() {
        // showing controls if they don't show
        if(this.state.hideControls){
          this.setState({hideControls: false});
          this.timeoutHandle = setTimeout(()=>{
            this.setState({hideControls: true});
          }, 8000);
        }
      }
    
      // parse seconds to time (hour:minute:second)
      parseSecToTime(sec) {
        var sec_num = parseInt(sec, 10); // don't forget the second param
        var hours   = Math.floor(sec_num / 3600);
        var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
        var seconds = sec_num - (hours * 3600) - (minutes * 60);
    
        if (hours   < 10) {hours   = "0" + hours;}
        if (minutes < 10) {minutes = "0" + minutes;}
        if (seconds < 10) {seconds = "0" + seconds;}
    
        return hours + ':' + minutes + ':' + seconds;
      }
    
      render() {
        const pausedText = this.state;
        const paused = this.state;
        const flexCompleted = this.getCurrentTimePercentage() * 100;
        const {namevid}=this.state;
    // const url=;
        return (
          <View style={styles.container}>
          
            <View style={{
              backgroundColor:'red',
              width:wp('20%'),
              height:hp('10%')

            }}>
                        <Video
                          ref={(ref:Video) => {this.video = ref}}
                          source={{ uri:'https://www.preprod.forma2plus.com/elearning2020/groupes/GRP13989/9423_1606384334.mp4'}} 
                          style={{width:wp('20%'),
                          height:hp('10%')}}
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
                        />
                      <View style={{position:'absolute',
                      top:hp('2%'),
                      left:wp('6%')
                      }}>
                                  {paused? (
                                <TouchableOpacity 
                                      onPress={() => {this.setState({paused:false}),this.onPressBtnPlay()}}
                                        >
                                                <Icon name={this.state.pausedText} size={30} color={'#B36A00'}
                                                style={{
                                                  alignSelf:'center'
                                                }}
                                                /> 
                                </TouchableOpacity>):(
                                <TouchableOpacity 
                                      onPress={() => this.onPressBtnPlay()}
                                      >
                                                <Icon name={"ios-pause"} size={50} color={'#B36A00'}
                                                style={{
                                                  alignSelf:'center'
                                                }}
                                                /> 
                                </TouchableOpacity>)}
                      </View>
            </View>
</View>
        );
      }
    }

    const styles = StyleSheet.create({
        container: {

        },
        fullScreen: {
          position: 'absolute',
          width:wp('20%'),
          height:hp('10%'),
          top: hp('10%'),
          left: 0,
          bottom: 0,
          right: 0,
        },
        playButton: {
          position: 'absolute',
          bottom: 20,
          left: 20,
          right: 20,
        },
        controls: {
          backgroundColor: 'red',
          width:wp('80%'),
          // height:hp('70%'),
          opacity: 0.7,
          borderRadius: 5,
          // position: 'absolute',
          // left:20,
          // right:20,
          // bottom:hp('10%')
          // height:hp('50%')
         
        },
        progress: {
          flex: 1,
          flexDirection: 'row',
          borderRadius: 3,
          overflow: 'hidden',
        },
        rateControl: {
          flex: 1,
          flexDirection: 'row',
          justifyContent: 'center',
        },
        playControl: {
          // bottom:hp('20%'),
          flex: 1,
          flexDirection: 'row',
          justifyContent: 'center',
        },
        resizeModeControl: {
          flex: 1,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
        },
      });