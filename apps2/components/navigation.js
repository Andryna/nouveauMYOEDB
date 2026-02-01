import * as React from 'react';
import { Button, View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { createAppContainer } from 'react-navigation';
// import { createStackNavigator } from 'react-navigation-stack';


// export default class nouv extends React.Component {
//   render() {
//     return (
//       <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
//         <Text>Details Screen</Text>
//       </View>
//     )
// }}
// nouv.navigationOptions={  
//   tabBarIcon:({tintColor, focused})=>(  
//       <Icon  
//           name={focused ? 'ios-person' : 'md-person'}  
//           color={tintColor}  
//           size={25}  
//       />  
//   )  
// }
import TabNavigator from './video';  
const AppIndex = createAppContainer(TabNavigator)  
  
export default class nouv extends Component{  
    render(){  
        return(  
            <View style={{flex:1}} >  
                <StatusBar  
                    backgroundColor='red'  
                    barStyle='light-content'  
                />  
                <View >  
                    <Icon name='ios-camera' size={28} color='white'/>  
                    <Icon name='ios-menu' size={28} color='white'/>  
                </View>  
                <AppIndex/>  
            </View>  
        )  
    }  
}
// const styles = StyleSheet.create({  
//   wrapper: {  
//       flex: 1,  
//   },  
//   header:{  
//       flexDirection: 'row',  
//       alignItems: 'center',  
//       justifyContent: 'space-between',  
//       backgroundColor: 'red',  
//       paddingHorizontal: 18,  
//       paddingTop: 5,  
//   }  
// });  