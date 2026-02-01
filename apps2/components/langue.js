import React, { Component } from 'react';
 
import { AppRegistry, StyleSheet, View, Platform, Picker, ActivityIndicator, Button, Alert} from 'react-native';
 
export default class langue extends Component {
 
 constructor(props)
 {
 
   super(props);
 
   this.state = { 
 
   isLoading: true,
 
   PickerValueHolder : ''
 
  }
 }
 
 componentDidMount() {
   
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
          }, function() {
            // In this block you can do something with new state.
          });
        })
        .catch((error) => {
          console.error(error);
        });
    }
 
    GetPickerSelectedItemValue=()=>{
 
      Alert.alert(this.state.PickerValueHolder);
 
    }
 
 render() {
 
   if (this.state.isLoading) {
     return (
       <View style={{flex: 1, paddingTop: 20}}>
         <ActivityIndicator />
       </View>
     );
   }
 
   return (
 
    <View style={styles.MainContainer}>
 
          <Picker
            selectedValue={this.state.PickerValueHolder}
 
            onValueChange={(itemValue, itemIndex) => this.setState({PickerValueHolder: itemValue})} >
 
            { this.state.dataSource.map((item, key)=>(
            <Picker.Item label={item.intitule} value={item.intitule} key={key} />)
            )}
    
          </Picker>
 
          <Button title="Click Here To Get Picker Selected Item Value" onPress={ this.GetPickerSelectedItemValue } />
 
    </View>
           
   );
 }
}
 
const styles = StyleSheet.create({
 
MainContainer :{
 
justifyContent: 'center',
flex:1,
margin: 10
}
 
});