import React, {Component} from 'react';
import {View, Text, FlatList, TouchableOpacity, StyleSheet, Alert, Dimensions, KeyboardAvoidingView} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Fontawesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
// import Dates from 'react-native-dates';
import Homelayout from '../layouts/Homelayout';
import {connectToRedux} from '../config/reduxconfig';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import SearchInput from '../components/textInputs/SearchInput';
import I18n from 'react-native-i18n';
import moment from 'moment';
import TimeFilterButton from '../components/buttons/TimeFilterButton';
import Expressions from '../components/list/Expressions';
import {
  searchFilterFunction,
  filterbycat,
  filterByDateRange,
  filterByMonth,
  filterByWeek,
} from '../utils/dataManip';
import HeaderList from '../components/header/HeaderList';
import TextModals from '../components/modals/TextModals';
import Svg, {Path} from 'react-native-svg';
import AddButton from '../components/buttons/AddButton';
import {lists} from '../../styles/styleAcuueil';
import config from '../../config.json';
import ShowText from '../components/modals/ShowText';
import ShowEditText from '../components/modals/ShowEditText';
import Tts from "react-native-tts";
import { PowerTranslator, ProviderTypes, TranslatorConfiguration, TranslatorFactory } from 'react-native-power-translator';
import ReadText from '../components/modals/ReadText';
const base_url = config.base_url;
class ExpressionList extends Component {
  static navigationOptions = {
    headerShown: false,
    headerStyle: {
      backgroundColor: '#2f3c7e',
    },
    drawerLabel: 'Home',
    drawerIcon: ({tintColor}) => (
      <Icon name="ios-home" color={'blue'} size={20} />
    ),
    headerTintColor: '#fff',
    headerLeft: () => null,
    headerRight: () => <View />
  };
  constructor(props) {
    super(props);
    this.state = {
      date: null,
      focus: 'startDate',
      startDate: null,
      endDate: null,
      data: this.props.data,
      headerbackColor: '#192356',
      videoColor: '#081241',
      expressionColor: '#081241',
      imageColor: '#081241',
      audioColor: '#081241',
      toListe: false,
      selected: '',
      refreshing: false,

      newAudio: false,
      newVideo: false,
      newText: false,
      newImage: false,
      menu: this.props.menu,
      beforeAudio: false,
      beforeTexte: false,
      beforeVideo: false,
      beforeImage: false,
      showCat: true,
      showText:false,
      selectedText: '',
      selectedTrad: '',
      showEditText:false,
      trad:false,
      selectedMonth: null,
      selectedId:'',
      selectedCat:'',
      showReader:false
      // data:this.props.data
      // Vos états ici
    };
    this.arrayholder = this.props.data;
    this.props.navigation.addListener('willFocus', async () => {
      try {
        await this.toggleExpressionColor();
        await this.handleRefresh();
    
        const { userInfo, data, category, nbExp, video } = this.props;
    
        if (category.length > 0) {
          const myfirstcat = {...category[0]};
          console.log("MY REDUX", myfirstcat.id);
    
          await this.filterbycat(myfirstcat.intitule);
    
          this.setState({
            idecat: myfirstcat.id,
            pic: myfirstcat.id,
            selected: myfirstcat.intitule,
          });
    
          await this.chronologicalView();
        } else {
          console.log('Le tableau est vide.');
        }
      } catch (error) {
        console.error('Erreur dans willFocus:', error);
      }
    });
    

    this.currentMonth = moment();

    // Générez une liste des mois depuis le mois actuel jusqu'à 12 mois en arrière
    this.months = [];
    for (let index = 0; index < 13; index++) {
      const month = this.currentMonth.clone().subtract(index, 'months');
      
      // Arrêtez la génération si nous atteignons le mois actuel
      if (month.isSameOrBefore(this.currentMonth, 'month')) {
        this.months.unshift({
          month: month.format('MMM'), // Utilisez 'MMM' pour obtenir l'abréviation du mois
          year: month.format('YYYY'),
        });
      }
    }

    // Inversez la liste
    this.months.reverse();
  }
  refresh = async () => {
  this.getfirstCat();
  this.chronologicalView();
  // console.log('cat',this.props.category);
   console.log("expressions data: "+JSON.stringify(this.props.data));
  }
  
  componentDidMount() {
   this.getfirstCat();
   this.chronologicalView();
  //  console.log('cat',this.props.category);
   console.log("First expression data: " + JSON.stringify(this.props.data[0]));

   console.log("expressions data: "+JSON.stringify(this.props.data));
  }
  getfirstCat(){
    const {userInfo, data, category, nbExp, video} = this.props;
    // var jsonArray = JSON.parse(category);
    if (category.length > 0) {
      const myfirstcat = {...category[0]};
      console.log("MY REDUX",myfirstcat.id);
        this.filterbycat(myfirstcat.intitule);
          this.setState({
            idecat: myfirstcat.id,
            pic: myfirstcat.id,
            // toListe: true,
            selected: myfirstcat.intitule,
          });
    } else {
        console.log('Le tableau est vide.');
    }
  }
handleDateClick = (clickedMonth) => {
  const clickedDate = moment(`${clickedMonth}-01`, 'MMM YYYY'); // fixé au 1er jour du mois
  this.setState({
    selectedMonth: clickedDate.format('MMM YYYY'),
  });

  const firstDayOfMonth = clickedDate.clone().startOf('month');
  const lastDayOfMonth = clickedDate.clone().endOf('month');

  // Inclure toute la journée
  const formattedFirstDay = firstDayOfMonth.format('YYYY-MM-DD 00:00:00');
  const formattedLastDay = lastDayOfMonth.format('YYYY-MM-DD 23:59:59');

  // console.log(`Premier jour du mois : ${formattedFirstDay}`);
  // console.log(`Dernier jour du mois : ${formattedLastDay}`);

  // Appel de la fonction filterbytwodate avec les limites
  this.filterbytwodate(formattedFirstDay, formattedLastDay);

  const intervalInDays = lastDayOfMonth.diff(firstDayOfMonth, 'days') + 1;
  // console.log(`Intervalle en jours : ${intervalInDays} jours`);
};

  
  
  handleChangeText = text => {
    // Gérer les changements de texte
  };

  handleSearch = () => {
    // Gérer la recherche
  };

  filterByWeek = () => {
    // Filtrer par semaine
  };

  filterByMonth = () => {
    // Filtrer par mois
  };

  filterByYear = () => {
    // Filtrer par année
  };

  onDatesChange = dates => {
    // Gérer les changements de dates
  };

  isDateBlocked = date => {
    // Vérifier si une date est bloquée
  };

  filterbytwodate = (lowerLimit,upperLimit) => {
    const {data} = this.props;
    // if  (this.state.startDate != null && this.state.endDate != null) {
      console.log('lowerLimit:' + lowerLimit + ' et ' + upperLimit);
      const newData = data.filter(
        data =>
          lowerLimit <= data.date_creation && data.date_creation <= upperLimit,
      );
      // alert('ici')
      // console.log(newData);

      this.setState({
        data: newData,
      });
    // }

    }


updateExpression = (id, newOr, newCi) => {
  const {userInfo} = this.props;
  this.setState(
    prevState => {
      const newData = prevState.data.map(item =>
        item.id === id ? { ...item, or: newOr, ci: newCi } : item
      );
      return { data: newData };
    },
    // async () => {
    //   // Ce code s'exécute après que l'état ait été mis à jour
    //   try {
    //     await this.props.fetchData(userInfo.id);
    //   } catch (err) {
    //     console.error(err);
    //   }
    // }
  );
};


    
    handleRefresh = async () => {
      try {
        const { userInfo, data, category, nbExp, video } = this.props;
    
        if (category.length > 0) {
          const myfirstcat = {...category[0]};
          console.log("MY REDUX", myfirstcat.id);
    
          await this.filterbycat(myfirstcat.intitule);
    
          this.setState({
            idecat: myfirstcat.id,
            pic: myfirstcat.id,
            selected: myfirstcat.intitule,
          });
        } else {
          console.log('Le tableau est vide.');
        }
    
        // Met à jour l'état pour indiquer le rafraîchissement
        this.setState({ refreshing: true });
    
        // Attendre la récupération des données
        await this.props.fetchData(userInfo.id);
    
        // Mise à jour de l'état avec les nouvelles données
        this.setState({
          data: this.props.data,
          refreshing: false,
        });
    
        this.arrayholder = this.props.data;
    
        if (category.length > 0) {
          const myfirstcat = {...category[0]};
          console.log("MY REDUX", myfirstcat.id);
    
          await this.filterbycat(myfirstcat.intitule);
    
          this.setState({
            idecat: myfirstcat.id,
            pic: myfirstcat.id,
            selected: myfirstcat.intitule,
          });
    
          await this.chronologicalView();
        } else {
          console.log('Le tableau est vide.');
        }
    
      } catch (error) {
        console.error('Erreur dans handleRefresh:', error);
        this.setState({ refreshing: false });
      }
    };
    

  categoryViewFilter = (id, intitule, index) => {
    const {idecat} = this.state;
    let colors = [
      '#FFE9F9',
      '#EAF9FE',
      '#FFF5E5',
      '#FBF5FF',
      '#FFF1EF',
      '#A2A2A2',
    ];
    if (id !== idecat) {
      return (
        <TouchableOpacity
          onPress={() => {
            this.filterbycat(intitule),
              this.setState({
                idecat: id,
                pic: id,
                // toListe: true,
                selected: intitule,
              });
          ;}}>
          <View
            style={{
              marginLeft: 5,
              borderRadius: 5,
              justifyContent: 'center',
              // borderWidth: 0.2,
              backgroundColor:'#0c123b',
              marginRight:5,
              // borderTopWidth: 0.2,
              borderColor: '#C9902A',
              padding: 8,
            }}>
            <View
              style={{
                justifyContent: 'center',
              }}>
              <Text
                style={{
                  marginHorizontal: wp('3%'),
                  marginVertical: hp('0.5%'),
                  fontWeight: '400',
                  color: 'white',
                  fontSize: 12,
                  textAlign: 'left',
                }}>
                {intitule}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      );
    }else{
      return (
        <TouchableOpacity
          onPress={() => {
            this.filterbycat(intitule),
              this.setState({
                idecat: id,
                pic: id,
                // toListe: true,
                selected: intitule,
              });
          ;}}>
          <View
            style={{
              marginLeft: 5,
              borderRadius: 5,
              justifyContent: 'center',
              borderWidth: 0.4,
              // backgroundColor:'red',
              marginRight:5,
              // borderTopWidth: 0.2,
              borderColor: '#C9902A',
              padding: 8,
            }}>
            <View
              style={{
                justifyContent: 'center',
              }}>
              <Text
                style={{
                  marginHorizontal: wp('3%'),
                  marginVertical: hp('0.5%'),
                  fontWeight: '400',
                  color: 'white',
                  fontSize: 12,
                  textAlign: 'left',
                }}>
                {intitule}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      );
    }
  };

  filterbycat = itemValue => {
    this.setState({picat: itemValue, refreshing: false});
    // console.log('ici', this.props.data);
    const newData = this.props.data.filter(item => {
      const itemData = `${item.intitule.toUpperCase()}`;
      const textData = itemValue.toUpperCase();
      return itemData.indexOf(textData) > -1;
    });
    this.setState({
      data: newData,
    });
  };

  contentView = (
    id,
    or,
    ci,
    od,
    intit,
    date,
    name,
    type,
    legende,
    index,
    id_category,
    langue,
    origin_table,
    target_langue_cible
  ) => {
    const {ide} = this.state;
    const {userInfo} = this.props;
    if (id !== '') {
      return (
        <View style={{flexDirection: 'row', justifyContent: 'space-evenly'}}>
          <Expressions
            id_stag={userInfo.id}
            id={id}
            or={or}
            ci={ci}
            intit={intit}
            date={date}
            name={name}
            od={od}
            type={type}
            legende={legende}
            index={index}
            id_category={id_category}
            langue={langue}
            ide={ide}
            origin_table = {origin_table}
            deleteItem={(idxp, name) => this.delete(idxp, name, origin_table)}
            onShare={this.onShare}
            _play={this._play}
            show={() => this.show(id, or, ci, od, intit, date, name, type, legende, index, id_category, langue, origin_table)}
            showReader={() => this.showReader(id, or, ci, od, intit, date, name, type, legende, index, id_category, langue, origin_table)}
            showEdit = {this.showEdit}
            refresh = {this.handleRefresh}
            updateExpression = {this.updateExpression}
            target_langue_cible = {target_langue_cible}
          />
        </View>
      );
    }
  };
  show = (
    id,
    or,
    ci,
    od,
    intit,
    date,
    name,
    type,
    legende,
    index,
    id_category,
    langue,
    origin_table
  
  ) => {
    // alert('id: '+origin_table);
    this.setState({showText:true, selectedText:or, selectedTrad: ci, selectedId:id, selectedCat:id_category, langue: langue, origin_table: origin_table});
  };
  showReader = (
    id,
    or,
    ci,
    od,
    intit,
    date,
    name,
    type,
    legende,
    index,
    id_category,
    langue,
    origin_table
  
  ) => {
    // alert('id: '+origin_table);
    this.setState({showReader:true, selectedText:or, selectedTrad: ci, selectedId:id, selectedCat:id_category, langue: langue, origin_table: origin_table});
  };
  showEdit = (id, or, ci) => {
    // alert('not filalized');
    this.setState({showEditText:false, selectedText:or, selectedTrad: ci});
  };
  handleChageOrig = (newtext) => {
    console.log('txt: '+newtext);
    this.setState({selectedText:newtext, trad:true});
  }

  supprimer = (idxp, name, origin_table) => {
    if(origin_table == 'expression_stagiaire'){
      this.deleteExpressStag(idxp, name);
    }else{
      this.deleteExpressRecord(idxp, name);
    }
  }

  deleteExpressStag = (idxp, name) => {
  const { id_groupe } = this.state;
  console.log(name + ' et ' + idxp + ' ' + id_groupe);

    fetch(base_url + '/portail-stagiaire/deleteexp.php', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: idxp
      })
    })
    .then((response) => response.json())
      .then((rep) => {
        if (rep == '') {
          alert('le serveur ne repond pas');
        }
        else {
          // alert(rep);
          const {userInfo} = this.props;
          this.props.fetchData(userInfo.id)
          .then(() => {
            this.setState({data:this.props.data});
            this.arrayholder = this.props.data;
            this.chronologicalView();
            // alert('expression deleted');
            // this.props.navigation.navigate('Images',{id_groupe:userInfo.id_groupe});
          });
        }
      })
      .catch((error) => {
        console.error(error);
      });
    
  }
  deleteExpressRecord = (idxp, name) => {
  const { id_groupe } = this.state;
  console.log(name + ' et ' + idxp + ' ' + id_groupe);

    fetch(base_url + '/portail-stagiaire/deleteexprec.php', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: idxp
      })
    })
    .then((response) => response.json())
      .then((rep) => {
        if (rep == '') {
          alert('le serveur ne repond pas');
        }
        else {
          // alert(rep);
          const {userInfo} = this.props;
          this.props.fetchData(userInfo.id)
          .then(() => {
            this.setState({data:this.props.data});
            this.arrayholder = this.props.data;
            this.chronologicalView();
            // alert('expression deleted');
            // this.props.navigation.navigate('Images',{id_groupe:userInfo.id_groupe});
          });
        }
      })
      .catch((error) => {
        console.error(error);
      });
    
  }

  delete = (idxp, name, origin_table) => {
    Alert.alert(
      `${I18n.t('DELETING EXPRESSION')}`,
      `${I18n.t('Are you sure you want to delete this expression')}`,
      [
        { text: `${I18n.t('NO')}`, onPress: () => console.warn('NO Pressed') },
        { text: `${I18n.t('YES')}`, onPress: () => this.supprimer(idxp, name, origin_table) }
      ]
    );
  };
  

  handleChangeText = text => {
    this.setState({value: text});
    searchFilterFunction(text, this.arrayholder, newData => {
      this.setState({data: newData});
    });
  };

  toggleVideoColor = () => {
    this.setState({
      videoColor: '#DB4165',
      expressionColor: this.state.headerbackColor,
      imageColor: this.state.headerbackColor,
      audioColor: this.state.headerbackColor,
    });
    const {userInfo} = this.props;
    this.props.navigation.navigate('Recordings', {
      id_groupe: userInfo.id_groupe,
    });
  };

  toggleExpressionColor = () => {
    this.setState({
      videoColor: this.state.headerbackColor,
      expressionColor: '#C9902A',
      imageColor: this.state.headerbackColor,
      audioColor: this.state.headerbackColor,
    });
  };

  toggleImageColor = () => {
    this.setState({
      videoColor: this.state.headerbackColor,
      expressionColor: this.state.headerbackColor,
      imageColor: '#48A2F1',
      audioColor: this.state.headerbackColor,
    });
  };

  toggleAudioColor = () => {
    this.setState({
      videoColor: this.state.headerbackColor,
      expressionColor: this.state.headerbackColor,
      imageColor: this.state.headerbackColor,
      audioColor: '#47BD7A',
    });
    const {userInfo} = this.props;
    this.props.navigation.navigate('Audios', {id_groupe: userInfo.id_groupe});
  };
  toggleFirst = () => {
    this.toggleExpressionColor();
  };
  closeModal = () => {
    this.setState({
      newAudio: false,
      newText: false,
      showText: false,
      showEditText: false,
      trad:false,
      newVideo: false,
      newImage: false,
      beforeAudio: false,
      beforeTexte: false,
      beforeVideo: false,
      beforeImage: false,
      showReader: false
    });
  };
  handleTranslate = (itemValue) => {
    if (itemValue != '') {

      this.setState({ picIdlangue: itemValue });
      
      // console.log(this.state.expres+'_%_'+itemValue.substring(0,2));
      TranslatorConfiguration.setConfig(ProviderTypes.Google, config.googleCloud.apiKey, itemValue.substring(0, 2));
      // config.googleCloud.apiKey
      const translator = TranslatorFactory.createTranslator();
      translator.translate(this.state.selectedText).then(translated => {
        Tts.setDefaultLanguage(itemValue);
        // Tts.speak(translated);
        this.setState({ selectedTrad: translated, trad:false })
      });
    } else {
      alert('This option is not available');
    }
  }

  chronologicalView(){
    // alert('chorno');
    if (this.months.length > 0) {
      // Sélectionnez le premier élément
      const firstItem = this.months[0];
      
      // Cliquez automatiquement sur le premier élément
      this.handleDateClick(`${firstItem.month} ${firstItem.year}`);
    }
    this.setState({
      showCat:false
    });
  }


  // Dans ton composant React Native
renderHeader = () => {
  const { videoColor, expressionColor, imageColor, audioColor, showCat, toListe, selectedMonth, selected, refreshing } = this.state;
  const { navigation, category, userInfo } = this.props;

  return (
    <View>
      {/* Header principal */}
      <View style={lists.headerStyle}>
        <HeaderList
          videoToggle={this.toggleVideoColor}
          expressionToggle={this.toggleExpressionColor}
          imageToggle={this.toggleImageColor}
          audioToggle={this.toggleAudioColor}
          firstElToggle={this.toggleFirst}
          navigation={navigation}
          videoColor={videoColor}
          expressionColor={expressionColor}
          imageColor={imageColor}
          audioColor={audioColor}
          id_groupe={userInfo.id_groupe}
        />
        <View style={lists.addNew}>
          <TouchableOpacity onPress={() => navigation.navigate('Accueil')}>
            <View style={{ flexDirection: 'row' }}>
              <Text style={{ color: 'white', fontSize: 20 }}>My expressions</Text>
            </View>
          </TouchableOpacity>
          <AddButton
            onPress={() => this.setState({ newText: true })}
            backgroundColor="#C9902A"
          />
        </View>
      </View>

      <View style={styleList.separator} />

      {/* Filtrage par catégorie / vue chronologique */}
      {!toListe && (
        <View style={{ zIndex: 1, elevation: 3, padding: 8 }}>
          <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
            {/* Chronological View */}
            <TouchableOpacity onPress={() => this.chronologicalView()}>
              <View style={{
                justifyContent: 'center',
                width: wp('45%'),
                backgroundColor: showCat ? '#313d6e' : 'transparent',
                marginBottom: 15,
                paddingVertical: 5,
                paddingLeft: 10
              }}>
                <View style={{ height: hp('4%'), flexDirection: 'row' }}>
                  <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', paddingRight: 15 }}>
                    <Svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                      <Path d="M5 22h14c1.103 0 2-.897 2-2V6c0-1.103-.897-2-2-2h-2V2h-2v2H9V2H7v2H5c-1.103 0-2 .897-2 2v14c0 1.103.897 2 2 2zM5 7h14v2H5V7z" fill="#C9902A" />
                    </Svg>
                    <Text style={{ color: 'white', marginLeft: 15, fontSize: 14 }}>Chronological View</Text>
                  </View>
                </View>
              </View>
            </TouchableOpacity>

            {/* Theme / Catégorie */}
            <TouchableOpacity onPress={() => { this.setState({ showCat: true }); this.getfirstCat(); }}>
              <View style={{
                justifyContent: 'center',
                marginBottom: 15,
                width: wp('45%'),
                backgroundColor: showCat ? 'transparent' : '#313d6e',
                paddingVertical: 5,
                paddingLeft: 10
              }}>
                <View style={{ height: hp('4%'), flexDirection: 'row', justifyContent: 'space-between' }}>
                  <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', paddingRight: 15 }}>
                    <Svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                      <Path d="M4 13h6a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1zm-1 7a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-4a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v4zm10 0a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-7a1 1 0 0 0-1-1h-6a1 1 0 0 0-1 1v7zm1-10h6a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1h-6a1 1 0 0 0-1 1v5a1 1 0 0 0 1 1z" fill="#C9902A" />
                    </Svg>
                    <Text style={{ color: 'white', marginLeft: 15, fontSize: 14 }}>Theme</Text>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          </View>

          {/* FlatList Catégories */}
          {showCat && (
            <FlatList
              data={category}
              extraData={this.props}
              keyExtractor={item => item.id}
              refreshing={refreshing}
              horizontal
              onRefresh={this.handleRefresh}
              renderItem={({ item, index }) => (
                <View>{this.categoryViewFilter(item.id, item.intitule, index)}</View>
              )}
            />
          )}
        </View>
      )}

      {/* Filtrage par mois */}
      {!showCat && (
        <View style={{ paddingHorizontal: wp('5%') }}>
          <FlatList
            horizontal
            data={this.months}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => this.handleDateClick(`${item.month} ${item.year}`)}>
                <Text style={ `${item.month} ${item.year}` === selectedMonth ? styleList.highlighted : styleList.normalMonth}>
                  {`${item.month} ${item.year}`}
                </Text>
              </TouchableOpacity>
            )}
          />
        </View>
      )}
    </View>
  );
};

  render() {
    const isDateBlocked = date =>
      date.isBefore(moment('05/09/2000', 'DD/MM/YYYY'));

    // const onDatesChange = ({startDate, endDate, focusedInput}) => {
    //   this.setState({...this.state, focus: focusedInput}, () =>
    //     this.setState({...this.state, startDate, endDate}),
    //   );
    // };;
    const {data, category, userInfo} = this.props;
    const { height, width } = Dimensions.get('window');

let flexValue = 0.9;

if (height <= 568) {
  flexValue = 0.83; 
} else if (height <= 667) {
  flexValue = 0.83; 
} else if (height <= 812) {
  flexValue = 0.9; 
} else if (height <= 896) {
  flexValue = 0.9; 
} else if (height >= 1024) {
  flexValue = 0.9; 
}

    return (
    // <KeyboardAvoidingView
    //   style={{ flex: 1 }}
    //   behavior={Platform.OS === "ios" ? "padding" : undefined}
    // >
      <Homelayout navigation={this.props.navigation}>
        <View style={[styleList.container, { paddingTop: 10}]}>
          {/* header */}

          <View style={{  alignItems: 'center', flex:flexValue, flex:1}}>
            <FlatList
              data={this.state.data}
              extraData={this.state.data}
              keyExtractor={item => item.id_expression}
              refreshing={this.state.refreshing} 
              ListHeaderComponent={this.renderHeader}
              scrollEnabled={true}
              enableEmptySections={true}
              renderSeparator={this.ListViewItemSeparator}
              renderItem={({ item, index }) => (
                <View style={{ flexDirection: 'column', alignItems: 'center' }}>
                  <View>
                    <View
                      style={{ flexDirection: 'row', alignItems: 'center' }}>
                      {this.contentView(
                        item.id_expression,
                        item.content_langue_origine,
                        item.content_langue_cible,
                        item.audio_langue_origine,
                        item.intitule,
                        item.date_creation,
                        item.f_name,
                        item.type_file,
                        item.legende_f,
                        index,
                        item.id_category,
                        item.langue,
                        item.origin_table,
                        item.target_langue_cible
                      )}
                    </View>
                  </View>
                </View>
              )} 
              contentContainerStyle={{
                // marginTop:15,
                paddingBottom: 100, // laisse de la place pour le footer
                paddingTop: 10,     // espace pour que le header soit totalement visible
                backgroundColor: '#060a20',
                // height:hp('90%')
              }}
            />
          </View>
        </View>
        <View>
          <TextModals
            visible={this.state.newText}
            category={this.props.category}
            userInfo={this.props.userInfo}
            onClose={() => this.closeModal()}
            save={() => {
              this.closeModal(),
                  this.setState({ data: this.props.data }),
                alert('Expression saved');
            } }
            navigation={this.props.navigation}
          />
          <ReadText 
            visible={this.state.showReader}
            category={this.props.category}
            userInfo={this.props.userInfo}
            onClose={() => this.closeModal()}
            selectedText={this.state.selectedText}
            selectedTrad={this.state.selectedTrad}
            selectedId={this.state.selectedId}
            selectedCat={this.state.selectedCat}
            selectedLangue = {this.state.langue}
            origin_table = {this.state.origin_table}

            save={() => {
              this.closeModal(),
              this.handleRefresh()
                //  this.setState({ data: this.props.data }),
                //  this.arrayholder = this.props.data
                  // alert('Expression saved');
            } }
            navigation={this.props.navigation}
          />
          <ShowText
            visible={this.state.showText}
            category={this.props.category}
            userInfo={this.props.userInfo}
            onClose={() => this.closeModal()}
            selectedText={this.state.selectedText}
            selectedTrad={this.state.selectedTrad}
            selectedId={this.state.selectedId}
            selectedCat={this.state.selectedCat}
            selectedLangue = {this.state.langue}
            origin_table = {this.state.origin_table}

            save={() => {
              this.closeModal(),
              this.handleRefresh()
                //  this.setState({ data: this.props.data }),
                //  this.arrayholder = this.props.data
                  // alert('Expression saved');
            } }
            navigation={this.props.navigation}
          />
          <ShowEditText
            visible={this.state.showEditText}
            category={this.props.category}
            userInfo={this.props.userInfo}
            onClose={() => this.closeModal()}
            selectedText={this.state.selectedText}
            selectedTrad={this.state.selectedTrad}
            onChange = {this.handleChageOrig}
            handleTranslate= {this.handleTranslate}
            trad = {this.state.trad}
            save={() => {
              // alert(userInfo.id)
              this.closeModal(),
              this.handleRefresh()
              // try {
                // await this.handleRefresh(); // ✅ Attendre la fin de handleRefresh avant de continuer
              //   alert('Expression saved'); // ✅ Afficher l'alerte après la mise à jour
              // } catch (error) {
              //   console.error("Erreur lors de la sauvegarde :", error);
              //   alert("Erreur lors de l'enregistrement !");
              // }
            }}
            // save={
            //   async () => { // ✅ Rendre la fonction `save` asynchrone
            //   alert(userInfo.id)
              
            //   // try {
            //     // await this.handleRefresh(); // ✅ Attendre la fin de handleRefresh avant de continuer
            //   //   alert('Expression saved'); // ✅ Afficher l'alerte après la mise à jour
            //   // } catch (error) {
            //   //   console.error("Erreur lors de la sauvegarde :", error);
            //   //   alert("Erreur lors de l'enregistrement !");
            //   // }
            // }}
            navigation={this.props.navigation}
          />
        </View>
      </Homelayout>
    );
  }
}

export default connectToRedux(ExpressionList);

const styleList = StyleSheet.create({
  container: {
    // height: hp('88%'),
    width: wp('100%'),
    alignSelf: 'center',
    backgroundColor: '#060a20',
    flex:1,
    // marginTop:'10%'
  },
  headerText: {
    color: 'white',
    fontWeight: '400',
    fontSize: 16,
  },
  highlighted: {
    marginLeft: 5,
    borderRadius: 5,
    justifyContent: 'center',
    borderWidth: 0.4,
    backgroundColor:'transparent',
    marginRight:5,
    // borderTopWidth: 0.2,
    borderColor: '#C9902A',
    padding: 8,
    color:'white'
  },
  normalMonth:{
    marginLeft: 5,
    borderRadius: 5,
    justifyContent: 'center',
    // borderWidth: 0.2,
    backgroundColor:'#0c123b',
    marginRight:5,
    // borderTopWidth: 0.2,
    borderColor: '#C9902A',
    padding: 8,
    color:'white',
    fontSize:14
  }
});


