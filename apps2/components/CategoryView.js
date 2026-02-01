import React, { Component } from 'react';
import { Text, View, TouchableOpacity, Image, FlatList, Clipboard, ScrollView, Modal, TextInput, Keyboard, Alert, ActionSheetIOS } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/Ionicons';
import Styles from './style';
import Add from './tools/modalViews/audio/statics/styles/styleAdd';
import styles from '../../styles/styleAcuueil';
import Footer from './footer/layouts/footer';
import I18n from 'react-native-i18n';
// import RNRestart from 'react-native-restart';
import en from '../../i18/en';
import fr from '../../i18/fr';
import es from '../../i18/es';
import config from '../../config.json';
import { OpenCat,openHome,Openjitsi } from '../utils/All';
import { connect } from 'react-redux';
import Homelayout from '../layouts/Homelayout';
import { getCat } from '../actions/category';
import ActionButton from './buttons/ActionButton';
import ActionCategButton from './buttons/ActionCategButton';
import EditActionButton from './buttons/EditActionButton';
import RectButton from './buttons/RectButton';
import AddButton from './buttons/AddButton';
const base_url = config.base_url;

class CategoryView extends React.Component {
  static navigationOptions = {
    headerShown: false
  };

  constructor(props) {
    super(props);
    this.state = {
      refreshing: false,
      cat: '',
      ide: '',
      act: false,
      edit: false,
      intitule: '',
      description: '',
      create: false,
      show1: false,
      videolang: false,
      plus: false,
      categorySearch: false,
      addcat: true,
      category:this.props.category
    };

    I18n.locale = this.props.langMyoedb;
    I18n.fallbacks = true;
    I18n.translations = {
      en,
      fr,
      es
    };

    this.arrayholder = this.props.category;
  }

  componentDidMount() {
    const {category, userInfo} = this.props;
    console.log(category);

    this.props.getCat(userInfo.id_groupe);
    this.setState({category:this.props.category});
  }

  saveCat = () => {
    const {userInfo} = this.props;
    this.setState({ ActivityIndicator_Loading: true }, () => {
      fetch('https://elprod.forma2plus.com/portail-stagiaire/savecat.php', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          categ: this.state.categ,
          desc: this.state.desc,
          id_groupe: userInfo.id_groupe,
          id: userInfo.id
        })
      }).then((response) => response.json()).then((reponse) => {
        this.props.getCat(userInfo.id_groupe)
        .then(() => {
          // alert('picture saved');
          this.setState({category:this.props.category});
          // alert(reponse);
          console.log(reponse);
        })
        
        // this.getPicker();
        // this.setState({ ActivityIndicator_Loading: false });
      }).catch((error) => {
        console.error(error);
        this.setState({ ActivityIndicator_Loading: false });
      });
    });
  }

  getPicker = () => {
    const { user } = this.state;
    console.log('USER: ', user);
    fetch(base_url + '/portail-stagiaire/picke_category.php', {
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-type': 'application/json'
      },
      body: JSON.stringify({
        id_groupe: user.id_groupe,
      })
    }).then((response) => response.json()).then((responseJson) => {
      console.log(responseJson);
      this.setState({
        isLoading: false,
        cat: responseJson
      });
      console.log(JSON.stringify(responseJson));
    }).catch((error) => {
      console.error(error);
    });
  }

  handleRefresh = () => {
    const {userInfo} = this.props;
    this.setState({
      refreshing: true
    }, () => {
      this.props.getCat(userInfo.id_groupe)
        .then(() => {
          // alert('picture saved');
          this.setState({category:this.props.category,refreshing: false});
          // alert(reponse);
          // alert('ref');
          console.log(reponse);
        })
    });
    
  }

  ListViewItemSeparator = () => {
    return (
      <View style={{
        height: 2,
        width: "100%",
        backgroundColor: "#000"
      }} />
    );
  }

  update() {
    const { intitule, description, ide } = this.state;
    console.log("intitule: " + intitule + 'description: ' + description + 'ide: ' + ide);
    const {userInfo} = this.props;
    fetch(base_url + '/portail-stagiaire/update_category.php', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: ide,
        intitule: intitule,
        description: description
      })
    }).then((response) => response.json()).then((rep) => {
      if (rep == '') {
        alert('pas de reponse');
      } else {
        this.props.getCat(userInfo.id_groupe)
        .then(() => {
          // alert('picture saved');
          this.setState({category:this.props.category});
          // alert('rep');
          console.log(rep);
        })
      }
    }).catch((error) => {
      console.error(error);
    });
  }

  openSearch() {
    this.setState({ categorySearch: true });
  }

  openPlus() {
    this.setState({ plus: true });
  }

  openHome() {
    this.props.navigation.navigate('Accueil');
  }

  showcategory(id, intitule, description) {
    const { ide, act } = this.state;
    const copied = "Intiule: " + intitule + "\n" + "Description: " + description;

    // if (id == ide) {
      return (
        <View style={Styles.tableau}>
          <View style={Styles.lignecat}>
            <TouchableOpacity style={Styles.fontgris} onPress={() => this.setState({ ide: '', act: false })}>
              <Text style={[Styles.titre, { color: 'white', padding:15, width:wp('65%')}]}>{intitule}</Text>
              {/* <Text style={[Styles.description, { color: 'white' }]}>{description}</Text> */}
            </TouchableOpacity>
            {/* <TouchableOpacity style={Styles.Menuaction} onPress={() => this.setState({ act: !this.state.act, ide: id })}>
              <Icon name={'ios-ellipsis-vertical'} size={18} color={'white'} />
            </TouchableOpacity> */}
            
              {/* <View style={Styles.action}> */}
                {/* <TouchableOpacity onPress={() => { Clipboard.setString(copied), alert('text copied') }}>
                  <Image style={Styles.image} source={require('../image/copy.png')}></Image>
                </TouchableOpacity> */}
                <ActionCategButton
                  onEdit={()=>this.setState({ edit: true, intitule: intitule, description: description, ide:id })} 
                  onDelete={()=>this.delete(id)} 
                />
                {/* <TouchableOpacity onPress={() => { this.setState({ edit: true, intitule: intitule, description: description }) }}>
                  <Image style={Styles.image} source={require('../image/edit-2.png')}></Image>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.delete(id)}>
                  <Image style={Styles.imagedelete} source={require('../image/delete.png')}></Image>
                </TouchableOpacity> */}
              {/* </View> */}
            
          </View>
        </View>
      );
    // } else {
    //   return (
    //     <View style={Styles.tableau}>
    //       <View style={Styles.ligne}>
    //         <TouchableOpacity onPress={() => this.setState({ ide: id })}>
    //           <Text style={Styles.titre}>{intitule}</Text>
    //         </TouchableOpacity>
    //         <TouchableOpacity style={Styles.Menuaction} onPress={() => { this.setState({ act: true, ide: id }) }}>
    //           <Icon name={'ios-ellipsis-vertical'} size={20} color={'white'} />
    //         </TouchableOpacity>
    //       </View>
    //     </View>
    //   );
    // }
  }

  categoryView = (id, intitule, index) => {
    const { idecat } = this.state;
    let colors = ['#FFE9F9', '#EAF9FE', '#FFF5E5', '#FBF5FF', '#FFF1EF', '#A2A2A2'];

    if (id !== '') {
      if (idecat == id) {
        return (
          <TouchableOpacity onPress={() => this.setState({ idecat: '', pic: '' })}>
            <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: '#DBDDDC', borderWidth: 0.5, borderColor: '#5C4DB1', borderRadius: 20, justifyContent: 'center' }}>
              <Text style={{
                marginHorizontal: wp('3%'),
                marginVertical: hp('0.5%'),
                fontWeight: '100',
                textAlign: 'center',
                opacity: 0.5
              }}>
                {intitule}
              </Text>
              <View style={{
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
                }} source={require('../image/Check-category.png')}></Image>
              </View>
            </View>
          </TouchableOpacity>
        );
      } else {
        return (
          <TouchableOpacity onPress={() => { this.setState({ idecat: id, pic: id }) }}>
            <View style={{ alignItems: 'center', borderWidth: 0.5, borderColor: '#5C4DB1', borderRadius: 20, justifyContent: 'flex-start' }}>
              <View style={{
                backgroundColor: colors[index % colors.length],
                borderRadius: 20
              }}>
                <Text style={{
                  marginHorizontal: wp('3%'),
                  marginVertical: hp('0.5%'),
                  fontWeight: '100',
                  textAlign: 'center',
                  opacity: 0.5
                }}>
                  {intitule}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        );
      }
    }
  }

  searchFilterFunction = text => {
    this.setState({
      value: text,
    });

    const newData = this.arrayholder.filter(item => {
      const itemData = `${item.intitule.toUpperCase()} ${item.intitule.toUpperCase()}`;
      const textData = text.toUpperCase();

      return itemData.indexOf(textData) > -1;
    });
    this.setState({
      cat: newData,
    });
  };

  suprimer = (id) => {
    const { id_groupe } = this.state;
    console.log(' id: ' + id);
    const {userInfo} = this.props;
    fetch(base_url + '/portail-stagiaire/del_cat.php', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: id,
      })
    }).then((response) => response.json()).then((rep) => {
      if (rep == '') {
        alert('pas de reponse');
      } else {
        this.props.getCat(userInfo.id_groupe)
        .then(() => {
          this.setState({category:this.props.category});
          // alert(rep);
          console.log(rep);
        })
      }
    }).catch((error) => {
      console.error(error);
    });
  }

  delete = (id) => {
    Alert.alert(
      `${I18n.t('DELETING CATEGORY')}`,
      `${I18n.t('Are you sure you want to delete this Category?')}`,
      [
        { text: `${I18n.t('NO')}`, onPress: () => console.warn('NO Pressed ') },
        { text: `${I18n.t('YES')}`, onPress: () => this.suprimer(id) },
      ]
    );
  };

  render() {
    const {user} = this.state;
    const {category} = this.state;
    return (
      <Homelayout navigation={this.props.navigation}>
        <View style={[Styles.container,
        { 
          backgroundColor: '#192356',
          paddingTop:hp('15%')

       }
        ]}>

          <View style={{ justifyContent: 'center', height: hp('6%'), marginLeft: wp('2.5%') }}>
            <View style={{ height: hp('4%'), width: wp('100%'), flexDirection: 'row', justifyContent: 'space-between' }}>
              <TouchableOpacity onPress={() => this.openHome()}>
                <View style={{ flexDirection: 'row' }}>
                  <Image style={{ width: 15, height: 15 }} source={require('../image/trace.png')}></Image>
                  <View>
                    <Text style={{ color: 'white', marginLeft: wp('3%'), fontSize: 14 }}>{I18n.t('ALL CATEGORIES')}</Text>
                  </View>
                </View>
              </TouchableOpacity>
            </View>
          </View>

          {this.state.more ? (
            <View style={{ marginLeft: wp('5%') }}>
              <TouchableOpacity onPress={() => { this.setState({ more: false }), this.searchFilterFunction(" ") }}>
                <Text style={{ fontSize: hp('2%'), opacity: 0.5 }}>
                  {/* {I18n.t('See all')} */}
                </Text>
              </TouchableOpacity>
            </View>
          ) : null}

{this.state.addcat ? (
            <View 
            style={{
              width:45,
              height:50, 
              marginLeft:wp('10%')
            }}
            >
              <AddButton
                onPress={() => this.setState({ addcat: false })}
                backgroundColor="#47BD7A" 
              />
            </View>
          ) : (
            <View style={{ flexDirection: 'row', marginBottom: hp('2%'), alignSelf: 'center' }}>
              <View>
                <TextInput
                  style={{
                    fontSize: 12, height: hp('5.5%'),
                    width: wp('60%'),
                    borderWidth: 0.2,
                    backgroundColor: '#E4E6E5',
                    borderRadius: 5,
                    paddingLeft: wp('5%'),
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                  underlineColorAndroid='transparent'
                  onChangeText={categ => this.setState({ categ })}
                  placeholder="Enter your new category name"
                />
              </View>
              

              <View style={{
                height: hp('5.5%'),
                width: wp('17.5%'),
                marginLeft: wp('2.5%'),
                borderRadius: 5,
                backgroundColor: '#5C4DB1',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <TouchableOpacity
                  disabled={this.state.categ == ''}
                  onPress={() => { this.setState({ addcat: true }), this.saveCat() }}>
                  <Text style={{
                    color: 'white',
                    fontSize: hp('1.5%'),
                    textAlign: 'center'
                  }}>
                    {I18n.t('Add')}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          )}

          <View style={{
            borderWidth: 0.2,
            width: wp('80%'),
            height: hp('6%'),
            borderRadius: 30,
            justifyContent: 'center',
            backgroundColor: 'white',
            alignSelf: 'center',
            marginBottom: hp('1%')
          }}>
            <TextInput
              placeholder={I18n.t('Search for categories')}
              placeholderTextColor={'grey'}
              style={{ fontSize: 14, textAlign: 'center', color:'black' }}
              ref={(input) => { this.searchInput3 = input; }}
              onChangeText={text => this.searchFilterFunction(text)}
              autoCorrect={false}
              value={this.state.value}
              onSubmitEditing={() => this.setState({ iconHeader: false, categorySearch: false, more: true })}
              blurOnSubmit={false}
            />
            <View style={{ position: 'absolute', marginLeft: wp('3%') }}>
              <Icon name={'search'} size={20} color={'grey'} />
            </View>
          </View>

          <View>
            <Text></Text>
          </View>

          <View style={Styles.listContainer}>
            <FlatList
              data={this.state.category}
              extraData={this.state}
              keyExtractor={(item) => item.id}
              refreshing={this.state.refreshing}
              onRefresh={this.handleRefresh}
              enableEmptySections={true}
              renderSeparator={this.ListViewItemSeparator}
              renderItem={({ item, index }) =>
                this.showcategory(item.id, item.intitule, item.description)
              }
            />
            {/* <View style={{ height: hp('10%'), width: wp('100%'), position: 'absolute', justifyContent: 'center', alignItems: 'center', bottom: 20}}>
              <Footer
                OpenHome={() => { openHome(this.props.navigation, user)}}
                Openjitsi={() => Openjitsi(this.props.navigation, user)}
                OpenCat={() => { OpenCat(this.props.navigation, user)}}
                user={user}
              />
          </View> */}
          </View>

          <Modal transparent={true} animationType="slide" visible={this.state.edit}>
            <ScrollView style={{
              width: wp('100%'),
              height: hp('100%'),
              backgroundColor: '#081241'
            }}>
              <ScrollView style={Styles.editModale}>
                <View>
                  <View style={Styles.titleView}>
                    <View style={Styles.colone}>
                      <Text style={{
                        color: 'white',
                        fontSize: 16,
                        fontWeight:'bold'
                      }}>
                        {I18n.t('Edit')} {I18n.t('Category')}
                      </Text>
                      {/* <View style={{
                        borderWidth: 1,
                        borderColor: '#DC4F89'
                      }} /> */}
                    </View>
                    {/* <Text style={{
                      color: 'white',
                      fontSize: 16,
                      fontWeight:'bold'
                    }}>
                      
                    </Text> */}
                  </View>
                  <Text style={Styles.secondeTitle}>
                    {I18n.t('Category')}
                  </Text>
                  <TextInput
                    ref={input => { this.textInput = input }}
                    style={{ backgroundColor: 'white', fontSize: 14, width: wp('90%'), alignSelf: 'center', borderRadius:5, marginTop:15 }}
                    value={this.state.intitule}
                    multiline={true}
                    onSubmitEditing={Keyboard.dismiss}
                    placeholder={I18n.t('Cat')}
                    onChangeText={intitule => this.setState({ intitule })}
                  />
                  <Text style={Styles.secondeTitle}>
                    {I18n.t('Description')}
                  </Text>
                  <View style={{ }}>
                    <TextInput
                      ref={input => { this.textInput = input }}
                      style={{ backgroundColor: 'white', fontSize: 14, width: wp('90%'), alignSelf: 'center', borderRadius:5, marginTop: 15  }}
                      multiline={true}
                      value={this.state.description}
                      placeholder={I18n.t('Describe your category')}
                      onChangeText={description => this.setState({ description })}
                    />
                  </View>
                </View>
                <View style={{ flexDirection: 'row', justifyContent:'space-around', top:0}}>
                  
                <RectButton
                  onPress={() => {
                    this.setState({ edit: false })
                    
                  }}
                  text="Cancel"
                  backgroundColor="#3498F0"
                  />
                  <RectButton
                  onPress={() => 
                    { this.update(), this.setState({ edit: false }) }
                  }
                  text="Save"
                  backgroundColor="#47BD7A"
                  />
                  
                  {/* <TouchableOpacity style={Add.rec} onPress={() => { this.update(), this.setState({ edit: false }) }}>
                    <Text style={Add.textRec}>
                      {I18n.t('SAVE')}
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity style={{ width: wp('90%'), height: hp('5%'), marginLeft: wp('5%'), borderRadius: 30, alignItems: 'center', marginTop: hp('1%'), justifyContent: 'center', marginBottom: hp('5%') }} onPress={() => this.setState({ edit: false })}>
                    <Text style={{ fontWeight: 'bold', fontSize: 12 }}>
                      {I18n.t('CANCEL')}
                    </Text>
                  </TouchableOpacity> */}
                </View>
              </ScrollView>
              
            </ScrollView>
          </Modal>
        </View>
      </Homelayout>
    );
  }
}

const mapStateToProps = (state) => ({
  userInfo: state.auth.userInfo,
  data: state.data_All.data,
  category: state.categ.category,
  langMyoedb: state.trand.langMyoedb
});

const mapDispatchToProps = (dispatch) => {
  return {
    getCat:id_groupe => dispatch(getCat(id_groupe)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(CategoryView);
