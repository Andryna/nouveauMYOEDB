import React, { Component } from 'react';
import { StyleSheet, Text, Button,View,Picker,TouchableOpacity,TextInput, ActivityIndicator} from 'react-native'; 


// import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
// import Icon from 'react-native-vector-icons/Ionicons';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

export default class text extends Component {
  static navigationOptions =
   {
    // headerShown: false,
    title: 'Forma2+',
    headerStyle: {
      backgroundColor:'#2f3c7e',
     
    },
    headerTintColor: '#fff',
    // headerLeft: () => null
    // headerTintColor: '#f4511e',
    // headerTitleStyle: {
    //   fontWeight: 'bold',
    // }
   };
   constructor(props){
    super(props)
    this.state={
      // show:false,
      isLoading: true,
      PickerValueHolder : '1',
      expres:'',
      id:this.props.navigation.state.params.id,
      orig:this.props.navigation.state.params.orig,
      tar:this.props.navigation.state.params.tar,
      idexp:this.props.navigation.state.params.idexp,
    }
  }
  
  async componentDidMount() {
   
    return fetch('https://demo.forma2plus.com/portail-stagiaire/picker.php',{
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          }
        }
       )
          .then((response) => response.json())
          .then((responseJson) => {
            this.setState({
              isLoading: false,
              dataSource: responseJson
            })
          })

        //   .then(()=>{
        //     fetch('http://10.0.2.2/projet/save.php', {
        //     method: 'post',
        //     headers: {
        //         'Accept': 'application/json',
        //         'Content-type': 'application/json'
        //     },
        //     body: JSON.stringify({
        //       id:id, 
        //       expres:expres,
        //       PickerValueHolder:PickerValueHolder,
              
        
        //     })
        // })
        //     .then((response) => response.json())
        //     .then((responseJson) => {
        //       alert(responseJson); 
        //       this.setState({ ActivityIndicator_Loading : false });
              
               
        //     })
        //     })


          



          .catch((error) => {
            console.error(error);
          });}


          save = () =>
          { 
            
           
            const {expres}=this.state; 
          const {PickerValueHolder}=this.state; 
          const {id}=this.state;
          // alert(PickerValueHolder);
              this.setState({ ActivityIndicator_Loading : true }, () =>
              {
                  fetch('https://demo.forma2plus.com/portail-stagiaire/save.php',
                  {
                    // 'http://10.0.2.2/projet/save.php'
                    // 'https://demo.forma2plus.com/portail-stagiaire/index.php'
                      method: 'POST',
                      headers: 
                      {
                          'Accept': 'application/json',
                          'Content-Type': 'application/json',
                      },
                      body: JSON.stringify(
                      {
                        id:id, 
                        expres:expres,
                        PickerValueHolder:PickerValueHolder,
       
                      })
       
                  }).then((response) => response.json()).then((reponse) =>
                  {
                      alert(reponse);
       
                      this.setState({ ActivityIndicator_Loading : false });
       
                  }).catch((error) =>
                  {
                      console.error(error);
       
                      this.setState({ ActivityIndicator_Loading : false});
                  });
              });
          }
langue(){
  alert(this.state.PickerValueHolder)
  // this.props.navigation.navigate('Accueil',id)
}

// login = async () => {
//   const {language} = this.state;
// }
  render() {
    const {navigate} =this.props.navigation;
    if (this.state.isLoading) {
      return (
        <View style={{flex: 1, paddingTop: 20}}>
          <ActivityIndicator />
        </View>
      );
    }
    const{PickerValueHolder}=this.state;
    const { goBack } = this.props.navigation;
    
    return (
    <View  style={styles.container}>  
        <View style={styles.titreV}>
        <Text style={styles.titre}>
            My own expression databank{this.state.id}
            </Text>
            <Text style={styles.titre2}>
            Add new 
            </Text>
        </View>  
        <View>
    
            <Text style={styles.exp}>
            Add new expression!
            </Text>
            <Text style={styles.expr}>
            Expression
            </Text>
            <TextInput
            ref={input => { this.textInput = input }}
            style={styles.place}
            value={this.state.orig}
            // multiline={true} 
            onChangeText= {orig => this.setState({orig})}
            />
            <Text style={styles.targetL}>
            Target language
            </Text>
            
        </View>
            <View style={styles.picker}>
                    <Picker
                    
                        mode='dropdown'
                        selectedValue={this.state.PickerValueHolder}
            
                        onValueChange={(itemValue, itemIndex) => this.setState({PickerValueHolder: itemValue})} >
            
                        { this.state.dataSource.map((item, key)=>(
                        <Picker.Item label={item.intitule} value={item.id} key={key} />
                        
                        )
                        )}
                
                    </Picker>
                    
            </View> 
            <View>
                        <Text style={styles.targetText}>
                            Target language text
                        </Text>
                        {/* <TextInput
                        style={styles.place}
                        placeholder='Target language text'
                        editable={false}
                        /> */}
                        <Text   style={styles.place}>
                        {this.state.expres}
                          </Text>
                </View>
                <View style={styles.SaveV}>
                        <TouchableOpacity onPress={()=> {this.save(),this.setState({expres:''}),this.textInput.clear(),this.props.navigation.navigate('Accueil')}}
                        //  onPress={() => {this.cnc (),this.props.navigation.navigate('enregistre')}}
                        style={styles.but}
                        >
                        <Text style={styles.buttext}>
                                Save
                        </Text>
                        </TouchableOpacity>
                </View>

</View> 
    
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems:'center'
  },

  titreV:{
    alignItems: 'center',
    // top:hp('10%')
    // color:'blue',
    // marginHorizontal:wp('15%'),
    // fontSize:hp('3%'),
  },
  SaveV:{
// top:hp('10%'),

  },
  titre:{
    color:'blue',
    // marginHorizontal:wp('15%'),
    fontSize:hp('3%'),
    
  },
  titre2:{
    color:'blue',
    // marginHorizontal:wp('15%'),
    fontSize:hp('3%'),
    
  },
  titreEx:{
    top:hp('11%'),
    color:'grey',
    fontSize:hp('3%'),
    
  },
  titreExV2:{
    top:hp('3%'),
    color:'grey',
    fontSize:hp('3%'),
    alignItems:'center'
  },
  titreExV:{
    alignItems:'center'
  },
  exp:{
    color:'grey',
    fontSize:hp('3.5%'),
    alignItems:'center',
    marginLeft:wp('20%'), 
    padding:hp('3%')
  },
  expr:{
    color:'grey',
    fontSize:hp('2.5%'),
    marginLeft:wp('39%'), 
  },
  
  place:{
fontSize:hp('3%'),
borderWidth:1,
borderRadius:30,
width:wp('80%'),
marginLeft:wp('9%'),

  },
  targetL:{
    color:'grey',
    fontSize:hp('2.5%'),
    marginLeft:wp('35%'),

  },
  picker:{
borderWidth:1,
width:wp('80%'),
marginLeft:wp('10%'),
borderRadius:30,
  },
  targetText:{
    color:'grey',
    fontSize:hp('2.5%'),
    marginLeft:wp('32%'),

  },
  but:{
    // position:'absolute',
   padding:25,
  borderRadius:27,
  backgroundColor:'#2f3c7e',
  // opacity:0,
  
  color:'white',
  justifyContent:'center',
  //  marginTop:hp('12%'),
  marginLeft:wp('10%'),
  // marginHorizontal:2,
  // marginVertical:0,

  height:hp('0.2%'),
  width: wp('80%'),
  top:hp('15%'),
  },
  buttext:{
    textAlign:'center',
      color:'white',
      fontWeight:'bold',
      fontSize:hp('2.5%'),
      
    },
});