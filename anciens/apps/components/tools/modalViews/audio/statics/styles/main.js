import { StyleSheet} from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

export const Main = StyleSheet.create({
layoutsView:
{
    flexDirection:'column',
    paddingVertical:hp('4%'),
    justifyContent:'space-between',
    backgroundColor:'grey',
    
},

}
);
export default Main;
