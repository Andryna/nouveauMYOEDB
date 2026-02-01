import React, { Component } from 'react';
import {
  Modal,
  ScrollView,
  ImageBackground,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  FlatList,
  Image
} from 'react-native';
import Footer from '../footer/layouts/footer';
import Add from '../../../apps/components/tools/modalViews/audio/statics/styles/styleAdd';
import Icon from 'react-native-vector-icons/Ionicons';
import Fontawesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import I18n from 'react-native-i18n';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import styles from '../../../styles/styleAcuueil';
import { myLang } from '../../constants/myconst';
import config from '../../../config.json';
import ArrowButton from '../buttons/ArroButton';
const base_url = config.base_url;

class ImageModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      idLan: "",
      addcat: true,
      pickerValueHolder:'',
      idecat:'',
      dataSource:this.props.category
      // Ajoutez d'autres états ici si nécessaire
    };
  }

  LangaudioView = (id, intitule, index, abrev) => {
    const { idLan } = this.state;
    let colors = ['#FFE9F9', '#EAF9FE', '#FFF5E5'
      , '#FBF5FF', '#FFF1EF', '#A2A2A2'];
    if (id !== '') {
      if (idLan == id) {
        return (
          <TouchableOpacity 
            onPress={() => { this.setState({ idLan: '', pickerValueHolder: '',allang:false }) }}>
            <View style={{ alignItems: 'center', borderRadius: 15, justifyContent: 'center', height:35 ,backgroundColor:'#C9902A', marginTop:10  //ito
            }}>
              <Text style={{
                  marginHorizontal: wp('3%'),
                  marginVertical: hp('0.5%'),
                  fontWeight: '400',
                  textAlign: 'center',
                  // opacity: 0.5,
                  fontSize:14,
                  color:'white'
              }}>
                {intitule}
              </Text>
              {/* <View
                style={{
                  width: wp('4.5%'),
                  height: hp('2.5%'),
                  borderRadius: 30,
                  position: 'absolute',
                  right: 0,
                  top: hp('-1%')
                }}>
                <Image style={{
                  width: wp('4.5%'),
                  height: hp('2.5%'),
                }}
                  source={require('../../image/Check-category.png')}>
                </Image>

              </View> */}

              {/* {this.contentView(item.id_expression,item.content_langue_origine,item.content_langue_cible,item.audio_langue_origine,item.intitule,item.date_creation,item.f_name,item.type_file,item.legende_f)}          */}
            </View>
          </TouchableOpacity>


        );
      }
      else {
        return (
          <TouchableOpacity
            // style={{
            //   backgroundColor:'red'
            // }}
            onPress={() => { this.setState({ idLan: id, pickerValueHolder: abrev,allang:false }) }}>
            <View style={{ alignItems: 'center', borderRadius: 15, justifyContent: 'center', height:35 ,backgroundColor:'#0C1D65',marginTop:10 //ito
                  }}>
              <View
                // style={{
                //   // backgroundColor: colors[index % colors.length],
                //   backgroundColor:'#0C1D65', //ito
                //   borderRadius: 20
                // }}
                >
                <Text style={{
                  marginHorizontal: wp('3%'),
                  marginVertical: hp('0.5%'),
                  fontWeight: '400',
                  textAlign: 'center',
                  // opacity: 0.5,
                  fontSize:12,
                  color:'white'
                }}>
                  {intitule}
                </Text>
              </View>
              {/* {this.contentView(item.id_expression,item.content_langue_origine,item.content_langue_cible,item.audio_langue_origine,item.intitule,item.date_creation,item.f_name,item.type_file,item.legende_f)}          */}
            </View>
          </TouchableOpacity>


        );
      }

    }
  }

  handleRefresh() {
    // Implémentez votre fonction handleRefresh ici en utilisant this.state
  }

  categoryView = (id, intitule, index) => {
    const { idecat } = this.state;
    let colors = ['#FFE9F9', '#EAF9FE', '#FFF5E5', '#FBF5FF', '#FFF1EF', '#A2A2A2'];
    if (id !== '') {
      if (idecat == id) {
        return (
          <TouchableOpacity
            onPress={() => this.setState({ idecat: '', pic: '' })}>
            <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: 'white',height:35, borderWidth:0.5, paddingLeft:15,paddingRight:15, borderColor: '#5C4DB1', borderRadius: 15, justifyContent: 'center' }}>
              <Text style={{
                // marginHorizontal: wp('3%'),
                // marginVertical: hp('0.5%'),
                fontSize: 12,
                fontWeight: '400',
                textAlign: 'center'
              }}>
                {intitule}
              </Text>
              <View
                style={{
                  width: wp('4.5%'),
                  height: hp('2.5%'),
                  borderRadius: 30,
                  position: 'absolute',
                  right: 0,
                  top: hp('-1%')
                }}>
                <Image style={{
                  width: wp('4.5%'),
                  height: hp('2.5%'),
                }}
                  source={require('../../image/Check-category.png')}>
                </Image>

              </View>

              {/* {this.contentView(item.id_expression,item.content_langue_origine,item.content_langue_cible,item.audio_langue_origine,item.intitule,item.date_creation,item.f_name,item.type_file,item.legende_f)}          */}
            </View>
          </TouchableOpacity>


        );
      }
      else {
        return (
          <TouchableOpacity
            // style={{
            //   backgroundColor:'red'
            // }}
            onPress={() => { this.setState({ idecat: id, pic: id,all: false  })}}>
            <View style={{ alignItems: 'center', height:35, backgroundColor: '#0C1D65', borderRadius: 15, justifyContent: 'center', paddingLeft:15, paddingRight:15}}>
              <View
                style={{
                  // backgroundColor: colors[index % colors.length],
                  // borderRadius: 20
                }}>
                <Text style={{
                  // marginHorizontal: wp('3%'),
                  // marginVertical: hp('0.5%'),
                  fontWeight: '400',
                  color:'white',
                  fontSize:12,
                  textAlign: 'center'
                }}>
                  {intitule}
                </Text>
              </View>
              {/* {this.contentView(item.id_expression,item.content_langue_origine,item.content_langue_cible,item.audio_langue_origine,item.intitule,item.date_creation,item.f_name,item.type_file,item.legende_f)}          */}
            </View>
          </TouchableOpacity>


        );
      }



    }

  }

  saveCat() {
    // Implémentez votre fonction saveCat ici en utilisant this.state
  }

  toEnregistre = () => {
    const {userInfo} = this.props;
    const { pickerValueHolder } = this.state;
    const { id } = this.state;
    console.log(this.state.idecat);
    fetch(base_url + '/portail-stagiaire/langue.php', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        PickerValueHolder: pickerValueHolder
      })
    }).then((response) => response.json())
      .then((idlangue) => {
        if (idlangue == '') {
          alert('Data empty');
        }
        else {
          this.props.navigation.navigate('Enregistre', {
            idlangue: idlangue,
            id: userInfo.id,
            PickerValueHolder: this.state.pickerValueHolder,
            login1: userInfo.login,
            nom1: userInfo.nom,
            prenom1: userInfo.prenom,
            email1: userInfo.email,
            tel1: userInfo.tel,
            adresse1: userInfo.adresse,
            cp1: userInfo.cp,
            ville1: userInfo.ville,
            password1: userInfo.password,
            id1: userInfo.id,
            id_groupe: userInfo.id_groupe,
            idecat: this.state.idecat,
            dataSource: this.props.category,
            trand:this.state.trand
          });
        }
      }).catch((error) => {
        console.error(error);
      });
  }

  speaking = () => {
    const {userInfo} = this.props;
    const { pickerValueHolder } = this.state;
    const { id } = this.state;
    console.log(this.state.idecat + ' ' + id);
    fetch(base_url + '/portail-stagiaire/langue.php', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        PickerValueHolder: pickerValueHolder
      })

    }).then((response) => response.json())
      .then((idlangue) => {
        if (idlangue == '') {
          alert('Data empty');
        }
        else {
          this.props.navigation.navigate('spechtext', {
            idlangue: idlangue.id,
            id: userInfo.id,
            PickerValueHolder: this.state.pickerValueHolder,
            login1: userInfo.login,
            nom1: userInfo.nom,
            prenom1: userInfo.prenom,
            email1: userInfo.email,
            tel1: userInfo.tel,
            adresse1: userInfo.adresse,
            cp1: userInfo.cp,
            ville1: userInfo.ville,
            password1: userInfo.password,
            id1: userInfo.id,
            id_groupe: userInfo.id_groupe,
            idecat: this.state.idecat,
            dataSource: this.state.dataSource
          });
          // alert('ok');
          console.log(this.state.idecat + ' ' + idlangue.id);
        }
      }).catch((error) => {
        console.error(error);
      });
  }


  gocam = async () => {
    const { pickerValueHolder } = this.state;
    const { userInfo } = this.props;
    console.log('pickerValueHolder: ', pickerValueHolder);

    try {
      // Chercher l'ID de la langue dans le tableau `myLang`
      const selectedLanguage = myLang.find(lang => lang.abrev === pickerValueHolder);

      if (!selectedLanguage) {
        alert('No language selected');
      } else {
        // Si la langue est trouvée, obtenir l'ID de la langue
        const idlangue = selectedLanguage.id;

        this.props.navigation.navigate('Camera', {
          idlangue: idlangue, 
          id: this.state.id, 
          PickerValueHolder: pickerValueHolder,
          login1: userInfo.login,
          nom1: userInfo.nom,
          prenom1: userInfo.prenom1,
          email1: userInfo.email,
          tel1: userInfo.tel,
          adresse1: userInfo.adresse,
          cp1: userInfo.cp,
          ville1: userInfo.ville,
          password1: userInfo.password,
          id1: userInfo.id,
          id_groupe: userInfo.id_groupe,
          idecat: this.state.idecat,
          trand: this.state.trand,
          userInfo: userInfo
        });
      }
    } catch (error) {
      console.error(error);
    }
}

  render() {
    return (
      <Modal transparent={true} animationType="slide" visible={this.props.visible}>
        <View style={{backgroundColor:'#192356', height:hp('100%')}}>
          <View
            style={{
              justifyContent: 'center',
              height: 60,
              width: wp('100%'),
            //   paddingTop: hp('2.5%'),
              marginBottom: -hp('2.5%'),
              // backgroundColor: '#0C1D65',
              alignItems:'center'
            }}>
            <View
              style={{
                width: wp('100%'),
                flexDirection: 'row',
                justifyContent: 'space-between',
                paddingLeft:20
              }}>
              <TouchableOpacity onPress={() => this.props.onClose()}>
                <View
                  style={{
                    flexDirection: 'row',
                  }}>
                  <Icon name="arrow-back-outline" size={25} color="white" />
                  <Text
                    style={{
                      color: 'white',
                      marginLeft: wp('30%'),
                      fontSize: 14,
                      position: 'absolute',
                    }}>
                    Capture Image
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
          <ScrollView
            style={{ height: hp('70%'), width: wp('100%'), borderRadius: 15, paddingTop:50}}>
            <View>
                <View
                  style={{
                    justifyContent: 'center',
                    alignItems:'center'
                  }}>
                    <View
                    style={{
                      backgroundColor:'#48A2F1',
                      padding:15,
                      borderRadius:60,
                      marginBottom:hp('10%')
                    }}>
                      <Icon name={'image-outline'} size={70} color={'#FFFF'} />
                    </View>
                    <Text style={{color:'white'}}>LANGUE</Text>
                    <FlatList
                      data={myLang}
                      extraData={this.props}
                      keyExtractor={(item) => item.id}
                      // refreshing={this.state.refreshing}
                      // horizontal={true}
                      // onRefresh={this.handleRefresh}
                      enableEmptySections={true}
                      // renderSeparator={this.ListViewItemSeparator}
                      renderItem={({ item, index }) => (
                        <View
                          style={{
                            flexDirection: 'column',
                            justifyContent: 'center',
                            // marginRight: wp('2%'),
                            // height: hp('7.2%'),
                            // paddingBottom: hp('1%'),
                          }}>
                          {this.LangaudioView(item.id, item.intitule, index, item.abrev)}
                        </View>
                      )}
                    />
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    display:'none'
                  }}>
                  <Text
                    style={{
                      fontSize: 14,
                      marginLeft: wp('5%'),
                      color: 'white',
                    }}>
                    CATEGORIE
                  </Text>
                  <View
                    style={{
                      right: wp('5%'),
                      position: 'absolute',
                    }}>
                    <TouchableOpacity onPress={() => alert("all")}>
                    </TouchableOpacity>
                  </View>
                </View>
                <View
                  style={{
                    justifyContent: 'center',
                    flexDirection: 'row',
                    marginTop: hp('5%'),
                    display:'none'
                  }}>
                  {this.state.addcat ? (
                        <View
                        style={{
                            borderWidth: 0.5,
                            borderRadius: 15,
                            backgroundColor: '#62CAD6',
                            width: wp('10%'),
                            justifyContent: 'center',
                            alignItems: 'center',
                            height: 35,
                        }}>
                        <TouchableOpacity
                            onPress={() => this.setState({ addcat: false })}>
                            <Icon name={'add-outline'} size={25} color={'white'} />
                        </TouchableOpacity>
                        </View>
                    ) : (
                        <View
                        style={{
                            flexDirection: 'row',
                        }}>
                        <View>
                            <TextInput
                            style={{
                                fontSize: hp('1.5%'),
                                height: 35,
                                width: wp('30%'),
                                borderWidth: 0.2,
                                marginLeft: wp('20%'),
                                backgroundColor: '#E4E6E5',
                                borderRadius: 15,
                                paddingLeft: wp('5%'),
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}
                            onChangeText={(categ) => this.setState({ categ })}
                            />
                        </View>
                        <View
                            style={{
                            height: 35,
                            width: wp('12.5%'),
                            marginLeft: wp('2.5%'),
                            borderRadius: 20,
                            backgroundColor: '#5C4DB1',
                            alignItems: 'center',
                            justifyContent: 'center',
                            }}>
                            <TouchableOpacity
                            disabled={this.state.categ == ''}
                            onPress={() => {
                                this.setState({ addcat: true }), this.saveCat();
                            }}>
                            <Text
                                style={{
                                color: 'white',
                                fontSize: hp('1.5%'),
                                textAlign: 'center',
                                }}>
                                {I18n.t('Add')}
                            </Text>
                            </TouchableOpacity>
                        </View>
                        </View>
                    )}
                  {!this.state.all ? (
                        <View
                        style={{
                            marginLeft: wp('5%'),
                            width: wp('65%'),
                        }}>
                        <FlatList
                            data={this.props.category}
                            extraData={this.props}
                            keyExtractor={(item) => item.id}
                            // refreshing={this.state.refreshing}
                            horizontal={true}
                            // onRefresh={this.handleRefresh}
                            enableEmptySections={true}
                            renderSeparator={this.ListViewItemSeparator}
                            renderItem={({ item, index }) => (
                            <View
                                style={{
                                flexDirection: 'column',
                                justifyContent: 'center',
                                marginRight: wp('2%'),
                                height: 35,
                                }}>
                                {this.categoryView(item.id, item.intitule, index)}
                            </View>
                            )}
                        />
                        </View>
                    ) : (
                        <ScrollView style={{ height: hp('30%') }}>
                        <View
                            style={{
                            marginLeft: wp('5%'),
                            width: wp('75%'),
                            }}>
                            <FlatList
                            data={this.props.category}
                            extraData={this.props}
                            keyExtractor={(item) => item.id}
                            // refreshing={this.state.refreshing}
                            horizontal={false}
                            numColumns={3}
                            // onRefresh={this.handleRefresh}
                            enableEmptySections={false}
                            renderSeparator={this.ListViewItemSeparator}
                            renderItem={({ item, index }) => (
                                <View
                                style={{
                                    flexDirection: 'column',
                                    justifyContent: 'center',
                                    height: hp('7.2%'),
                                    paddingBottom: hp('0.6%'),
                                }}>
                                {this.categoryView(item.id, item.intitule, index)}
                                </View>
                            )}
                            />
                        </View>
                        </ScrollView>
                    )}
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center', alignSelf:'center' , marginTop:hp('20%'), display:'none'}}>
                  <TouchableOpacity
                    style={[Add.rec, { width: wp('43%'), height: hp('12%'), borderRadius: 5, backgroundColor: '#EA1E69' }]}
                    // disabled={this.state.pickerValueHolder == ''}
                    onPress={() => {
                    //   this.setState({ show1: false, addnew: false, plus: false }), this.ecouter();
                    //   alert("ok")
                    this.props.onClose(),this.gocam()
                    }}>
                    <Icon name={"camera-outline"} size={25} color={'white'} />
                    <Text style={[Add.textRec, { marginTop: hp('2%'), fontWeight: '400' }]}>
                      PRENDRE PHOTO
                    </Text>
                  </TouchableOpacity>
                </View>

                <View style={{ flexDirection: 'row', alignItems: 'center', alignSelf:'center'}}>
                  
                <ArrowButton 
                  onPress={async () => {
                    this.props.onClose();
                    await this.gocam(); // Await if you need to ensure gocam completes
                  }} 
                  iconName="arrow-forward-outline"
                  colorback="#EA1E69" // '#EA1E69' 48A2F1
                />
                </View>
                {/* <View style={[styles.butV, { marginTop: hp('5%') }]}>
                  <TouchableOpacity
                    style={styles.butNew}
                    onPress={() => this.props.onClose()}>
                    <Icon name={'arrow-back-outline'} size={35} color={'white'} style={styles.inputIcon} />
                  </TouchableOpacity>
                </View> */}
            </View>
          </ScrollView>
        </View>
      </Modal>
    );
  }
}

export default ImageModal;
