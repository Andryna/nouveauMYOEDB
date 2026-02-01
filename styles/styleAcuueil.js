import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent:'flex-start',
    backgroundColor: 'transparent'
  },
  selectorText:{
    color:'white',
    fontWeight:'bold', 
    fontSize:16, 
    marginBottom:15, 
    marginTop:10, 
    textAlign:'center'
  },
  selector:{
    flexDirection:'row',
    justifyContent:'center',
    alignItems:'center'
  },
user:{
flexDirection:'row',
position:'absolute',
marginTop:hp('1%'),
top:hp('13.2%'),
fontSize:hp('2.5%'),
color:'green',
marginHorizontal:wp('2%')

},
headerText:{
  color:'white'
},
but:{
position:'absolute',
color:'white',
justifyContent:'center',
marginLeft:wp('7%'),
bottom:0.1,
height:hp('4.5%'),
width: wp('5%'),
},
but2:{
position:'absolute',
color:'white',
justifyContent:'center',
marginHorizontal:wp('71%'),
bottom:0.1,
height:hp('4.5%'),
width: wp('5%'),
},
but3:{
position:'absolute',
color:'white',
justifyContent:'center',
marginHorizontal:wp('74%'),
bottom:0.1,
height:hp('4.5%'),
width: wp('6%'),
},
ret:{

borderRadius:27,
position:'absolute',
justifyContent:'center',
marginHorizontal:wp('13%'),
marginVertical:hp('65%'),
height:hp('10%'),
width: wp('15%'),
},
buttext:{
textAlign:'center',
color:'white',
fontWeight:'bold',
fontSize:hp('2.5%'),
},
titreV:{
alignItems: 'center',
},
titre:{
// color:'#2f3c7e',
fontSize:hp('2%'),
// fontFamily:'Lobster-Regular'
},
titre2:{
color:'#2f3c7e',
fontSize:hp('3%'),
},
result:{
color:'white',
marginLeft:wp('8%')
  },
cancel:{

backgroundColor:'red',
color:'red'

   },
textMod:{
// textDecorationLine: 'underline',
// color:'white',
fontWeight:'100',
marginLeft:wp('2%'),
fontSize:12
// fontFamily:'Lobster-Regular'
    },
    textMod2:{
      // textDecorationLine: 'underline',
      // color:'white',
      fontWeight:'100',
      marginLeft:wp('3%'),
      fontSize:12
      // fontFamily:'Lobster-Regular'
            },
icone:{
// width:wp('13%')
    },
buttadd:{
alignItems:'center',
flexDirection:'row',
marginLeft:wp('3%')
      },
actbut:{
top:wp('2%'),
flexDirection:'column',
justifyContent:'space-between',
     },
     fivebutt:{
      flexDirection:'column',
      alignItems:'center',
      justifyContent:'center',
      backgroundColor:'#2f3c7e',
      height:hp('20%'),
      width:wp('45%'),
      margin:hp('2%'),
      borderRadius:15,

     },
     listbut:{
      backgroundColor:'#bf1613',
      height:hp('10%'),
      width:wp('40%'),
      margin:hp('2%'),
      borderWidth:1,
      borderColor:'white',
      borderRadius:15
     },
     modliste:{
      // top:hp('10%'),
      width:wp('50%'),
      // height:hp('40%'),
      // backgroundColor:'#cce7e8',
      // marginLeft:wp('49%'),
      alignItems:'center',
      borderRadius:15

     },
     twobut:{
       flexDirection:'column',
       justifyContent:'center',
       alignItems:'center'
     },
     fullScreen: {
      position: 'absolute',
      top: 0,
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
      backgroundColor: 'white',
      opacity: 0.7,
      borderRadius: 5,
      position: 'absolute',
      bottom: 20,
      left: 20,
      right: 20,
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
    butV:{
      alignItems: 'center',
      justifyContent:'center',
      // marginTop:hp('5%')
        },
        butNew:{
          borderRadius:27,
          backgroundColor:'#EA1E69',
          color:'white',
          justifyContent:'center',
          alignItems:'center',
          height:hp('6%'),
          width: wp('15%'),
          },
          

}
);

export const lists = StyleSheet.create({
  listContainer: {
    flex: 1,
    backgroundColor: '#61dafb',
  },
  listItem: {
    fontStyle: 'italic',
    fontWeight: 'bold'
  },
  text:{
color:'white'
  },
  headerStyle:{
    backgroundColor:'#081241',
    paddingHorizontal:wp('5%'),
    paddingVertical:15,
    marginTop:'14%'
  },
  addNew:{
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center'
  }
});
export const details = StyleSheet.create({
  audioContainer:{
    backgroundColor:'black',
    borderRadius:10,
    marginBottom:15
  },
  title:{
    // backgroundColor:'red',
    textAlign:'center',
    color:'white',
    marginBottom:15,
    marginTop:4
  },
  title1:{
    // backgroundColor:'red',
    textAlign:'center',
    color:'white',
    marginBottom:15,
    marginTop:4,
    fontSize: 16,
    fontWeight:'bold'
  },
  audioButtonPlayer:{
    height: 25,
    width: 25,
    alignSelf: 'center',
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  duration:{
    color:'white', 
    fontWeight:'bold', 
    fontSize:14
  },
  mt1:{
    marginTop:10
  },
  textTitle:{
    color:'white', 
    fontWeight:'bold', 
    fontSize:16, 
    marginBottom:5
  },
  textTitle2:{
    color:'white', 
    fontWeight:'bold', 
    fontSize:16, 
    marginBottom:5,
    textAlign:'center'
  },
  TextButton:{
    padding:10,
    width:wp('45%'),
    borderTopLeftRadius:15
  },
  TextTradButton:{
    padding:10,
    width:wp('45%'),
    borderTopRightRadius:15
  },
  TextButton2:{
    padding:10,
    width:wp('50%'),
    borderTopLeftRadius:15
  },
  TextTradButton2:{
    padding:10,
    width:wp('50%'),
    borderTopRightRadius:15
  },
  ActiveTextButton:{
    backgroundColor:'#2B4098'
  },
  DisabledTextButton:{
    backgroundColor:'#020D4D'
  },
  horizontalLine: {
    marginTop: 10, // Espacement entre le texte et la ligne
    width: '100%', // Largeur de la ligne
    height: 2, // Hauteur de la ligne
    backgroundColor: '#2B4098', // Couleur de la ligne
  },
  highlighted: {
    marginLeft: 5,
    borderRadius: 5,
    justifyContent: 'center',
    textAlign:'center',
    borderWidth: 0.4,
    backgroundColor:'transparent',
    // borderTopWidth: 0.2,
    borderColor: 'blue',
    padding: 10,
    color:'white',
    width:wp('40%'),
    alignItems:'center',
    marginBottom:10
  },
  normalButton:{
    marginLeft: 5,
    borderRadius: 5,
    justifyContent: 'center',
    textAlign:'center',
    // borderWidth: 0.2,
    backgroundColor:'#0c123b',
    // borderTopWidth: 0.2,
    borderColor: '#C9902A',
    padding: 10,
    color:'white',
    fontSize:14,
    width:wp('40%'),
    alignItems:'center',
    marginBottom:10
  },
  centeredInline:{
    flexDirection:'row',
    justifyContent:'space-around',
    alignItems:'center'
  },
  input: {
    width: wp('90%'),
    minHeight: 100,
    // paddingTop:45,
    justifyContent: 'flex-start',
    backgroundColor: 'white',
    textAlignVertical: 'top', // Aligner le texte vers le haut
    paddingHorizontal: 10, // Marge intérieure horizontale
    paddingTop: 25, // Marge intérieure supérieure
    paddingBottom:10,
    borderRadius:5,
    color: 'black'
  },
});

// const container = StyleSheet.compose(page.container, lists.listContainer);
// const text = StyleSheet.compose(page.text, lists.listItem);

export default styles;