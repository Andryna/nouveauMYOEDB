
import React, {Component} from 'react';
import {Image,View,TouchableOpacity,Text} from 'react-native';  
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/Ionicons';

export default class Header extends Component{ 
      
      render() {
        return (
    <View>
                    <View style={{backgroundColor:'#2f3c7e',height:hp('6.5%'),width:wp('100%'),flexDirection:'row'}}>
                    
                            <TouchableOpacity 
                                    onPress={() =>this.props.open}
                                    style={{width:wp('10%')}}>
                                    <Icon
                                    name name="ios-menu" color={'white'} size={30}
                                    />
                            </TouchableOpacity>
                            <TouchableOpacity 
                                    onPress={this.props.testAlert}
                                    style={{width:wp('10%')}}>
                                    <Icon
                                    name name="ios-home" color={'white'} size={30}
                                    />
                            </TouchableOpacity>

                            <Image style={{width:90,height:20,top:hp('1%'),marginLeft:wp('3%')}}
                                    source={require('../image/logofotsy.png')}>
                            </Image>

                    </View>
                    <Text style={{color:'blue'}}> ceci est un autre {this.props.name} </Text>
          </View>
        );
      }
    }


// <View   style={{flexDirection:'column',
//         // justifyContent:'center',
//         alignItems:'center',
//         backgroundColor:'red',
//         width:wp('100%'),
//         alignSelf:'center',
//         // margin:wp('5%'),
//         height:hp('85%'),
//         // borderRadius:15
//         }}>

//         {/* <View style={{ backgroundColor:'#cce7e8',position: 'absolute',height:hp('29%'),width:wp('55%'),top:hp('12%'),marginLeft:wp('45%'),borderRadius:15}}>
//                         {/* <View style={{borderRadius:10,height:hp('7%'),justifyContent:'center',marginLeft:wp('3%')}} > */}
//                          <View
//                          style={{
//                            flexDirection:'row'
//                          }}
//                          >     
//                               <TouchableOpacity
//                                     style={
//                                   {
//                                     flexDirection:'column',
//                                     alignItems:'center',
//                                     justifyContent:'center',
//                                     backgroundColor:'#0066cc',
//                                     height:hp('15%'),
//                                     width:wp('45%'),
//                                     margin:hp('2%'),
//                                     borderRadius:15,

//                                   }
//                                     }
//                                     onPress={() => this.setState({show2:true,addnew:false})}>
//                                       <View
//                                       style={{
//                                         flexDirection:'row'
//                                       }}
//                                       >
//                                     <Icon name={'ios-mic'} size={50} color={'#E2B81A'}/>
//                                     <Icon name={'ios-text'} size={50} color={'#E2B81A'}/>
//                                        </View>
//                                     <Text style={styles.textMod}>
//                                       Transcription
//                                     </Text>
//                               </TouchableOpacity>
//                               <TouchableOpacity 
//                                    style={
//                                     {
//                                       flexDirection:'column',
//                                       alignItems:'center',
//                                       justifyContent:'center',
//                                       backgroundColor:'#0ABFAA',
//                                       height:hp('15%'),
//                                       width:wp('45%'),
//                                       margin:hp('2%'),
//                                       borderRadius:15,
  
//                                     }
//                                       }
//                                     // style={styles.buttadd}
//                                     onPress={() => this.setState({show1:true})}>
//                                     <Icon name={'ios-mic'} size={50} color={'#E2B81A'}
//                                    style={styles.icone}
//                                     />
//                                     <Text style={styles.textMod2}>
//                                       Audio
//                                     </Text>  
//                                 </TouchableOpacity> 
//                           </View> 
//                           <View
//                          style={{
//                            flexDirection:'row'
//                          }}
//                          >  
//                                 <TouchableOpacity 
//                                             // style={styles.buttadd}
//                                             style={
//                                               {
//                                                 flexDirection:'column',
//                                                 alignItems:'center',
//                                                 justifyContent:'center',
//                                                 backgroundColor:'#6666ff',
//                                                 height:hp('15%'),
//                                                 width:wp('45%'),
//                                                 margin:hp('2%'),
//                                                 borderRadius:15,
            
//                                               }
//                                                 }
//                                             onPress={() => this.setState({create:true})}>
//                                             <Icon name={'md-create'} size={50} color={'#E2B81A'}
//                                             style={styles.icone}
//                                             />
//                                             <Text style={styles.textMod}>
//                                               Write and translate
//                                             </Text> 
//                                 </TouchableOpacity> 
//                                 <TouchableOpacity 
//                                             // style={styles.buttadd}
//                                             style={
//                                               {
//                                                 flexDirection:'column',
//                                                 alignItems:'center',
//                                                 justifyContent:'center',
//                                                 backgroundColor:'#E55717',
//                                                 height:hp('15%'),
//                                                 width:wp('45%'),
//                                                 margin:hp('2%'),
//                                                 borderRadius:15,
            
//                                               }
//                                                 }
//                                             onPress={() => this.setState({cati:true})}>
//                                             <Icon name={'ios-folder'} size={50} color={'#E2B81A'}
//                                             style={styles.icone}/> 
//                                             <Text style={styles.textMod2}>
//                                               Categories
//                                             </Text> 
//                                 </TouchableOpacity> 
//                          </View>
//                          <View
//                          style={{
//                            flexDirection:'row',
//                          }}
//                          > 
                               
//                                 <TouchableOpacity 
//                                             // style={styles.buttadd}
//                                             style={
//                                               {
//                                                 flexDirection:'column',
//                                                 alignItems:'center',
//                                                 justifyContent:'center',
//                                                 backgroundColor:'#B36A00',
//                                                 height:hp('20%'),
//                                                 width:wp('45%'),
//                                                 margin:hp('2%'),
//                                                 borderRadius:15,
            
//                                               }
//                                                 }
                                         
//                                              onPress={() =>this.setState({listexpres:true})}>
//                                             <Icon name={'ios-list'} size={50} color={'#E2B81A'}
//                                             style={styles.icone} />
//                                             <Text style={styles.textMod2}>
//                                               Liste




//                                             </Text> 
//                                 </TouchableOpacity> 
//                           </View>
                              
//        </View>












// <View style={{backgroundColor:'#2f3c7e',height:hp('6.5%'),width:wp('100%'),flexDirection:'row'}}>
     
// <TouchableOpacity 
// onPress={() =>this.props.navigation.openDrawer()}
// style={{width:wp('10%')}}>
// <Icon
// name name="ios-menu" color={'white'} size={30}
// />
// </TouchableOpacity>

// <Image style={{width:90,height:20,top:hp('1%'),marginLeft:wp('3%')}}
// source={require('../image/logofotsy.png')}>
// </Image>

// </View>