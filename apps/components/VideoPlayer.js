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
import config from '../../config.json';
const base_url = config.base_url;
export default class VideoPlayer extends Component {
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
          
          namevid:this.props.navigation.state.params.namevid,
          id_groupe:this.props.navigation.state.params.id_groupe,
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
        console.log(base_url + "/elearning2020/groupes/GRP"+this.state.id_groupe+"/"+this.state.namevid);
        console.log(this.state.id_groupe);
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
            <Text>
            this video
            </Text>
            <TouchableWithoutFeedback
              style={styles.fullScreen}
              onPress={() => this.onPressVideo()}>
              <Video
                ref={(ref:Video) => {this.video = ref}}
                /* For ExoPlayer */
                source={{uri:base_url + "/elearning2021/groupes/GRP"+this.state.id_groupe+"/"+this.state.namevid}}
                // source={{ uri:" http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4 "}} 
                // /var/www/html/portail-stagiaire/uploads_video
                // https://demo.forma2plus.com/portail-stagiaire/uploads_audio
                // source={require('./videos/tom_and_jerry_31.mp4')}
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
              />
            </TouchableWithoutFeedback>
            {
              !this.state.hideControls ?
              (
                <View style={styles.controls}>
                  <View style={styles.generalControls}>
                    {/* <View style={styles.rateControl}>
                      <Picker
                        style={{width: 110}}
                        selectedValue={this.state.pickerValueHolder}
                        onValueChange={(itemValue, itemIndex) => this.onChangeRate(itemValue, itemIndex)} >
                        <Picker.Item label="x1.5" value="1.5"/>
                        <Picker.Item label="x1.25" value="1.25"/>
                        <Picker.Item label="x1.0" value="1.0"/>
                        <Picker.Item label="x0.75" value="0.75"/>
                        <Picker.Item label="x0.5" value="0.5"/>
                      </Picker>
                    </View> */}
                    <View style={styles.playControl}>
                      {/* <Text onPress={() => this.onPressBtnPlay()}>{this.state.pausedText}</Text> */}
                    
                      {paused? (<TouchableOpacity 
                       style={{ marginBottom:hp('30%')}}
                     onPress={() => {this.setState({paused:false}),this.onPressBtnPlay()}}
                    //  style={{
                    //   //  bottom:hp('20%')
                    //  }}
                      >
                                <Icon name={this.state.pausedText} size={40} color={'#B36A00'}
                                style={{
                                  alignSelf:'center'
                                }}
                                /> 
                      </TouchableOpacity>):(<TouchableOpacity
                       style={{ marginBottom:hp('30%')}}
                     onPress={() => this.onPressBtnPlay()}
                      >
                                <Icon name={"ios-pause"} size={30} color={'#B36A00'}
                                style={{
                                  alignSelf:'center'
                                }}
                                /> 
                      </TouchableOpacity>)}
                    </View>
                    {/* <View style={styles.resizeModeControl}>
                      <Picker
                        style={{width: 150}}
                        selectedValue={this.state.resizeMode}
                        onValueChange={(itemValue, itemIndex) => this.setState({resizeMode: itemValue})} >
                        <Picker.Item label="none" value="none"/>
                        <Picker.Item label="cover" value="cover"/>
                        <Picker.Item label="stretch" value="stretch"/>
                        <Picker.Item label="contain" value="contain"/>
                      </Picker>
                    </View> */}
                  </View>
    
                  <View style={styles.trackingControls}>
                    <ProgressBarAndroid
                      style={styles.progress}
                      styleAttr="Horizontal"
                      indeterminate={false}
                      progress={this.getCurrentTimePercentage()}
                    />
                    <Text>{this.parseSecToTime(parseInt(this.state.currentTime))}/{this.parseSecToTime(parseInt(this.state.duration))}</Text>
                 
                  </View>
                </View>
              ) : (null)
            }
    
            
          </View>
        );
      }
    }

    const styles = StyleSheet.create({
        container: {
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'white',
        },
        fullScreen: {
          position: 'absolute',
          width:wp('100%'),
          height:hp('93%'),
          top: hp('1%'),
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
          // backgroundColor: 'white',
          width:wp('80%'),
          // height:hp('70%'),
          opacity: 0.7,
          borderRadius: 5,
          position: 'absolute',
          // left:20,
          // right:20,
          bottom:hp('5%')
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