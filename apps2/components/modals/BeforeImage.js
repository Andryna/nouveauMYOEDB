import React from 'react';
import { Modal, TouchableOpacity, View, Image, Text, StyleSheet } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import ModalLayout from '../../layouts/ModalLayout';
import RectButton from '../buttons/RectButton';
import VectorCard from '../cards/VectorCard';
import Icon from 'react-native-vector-icons/Ionicons';

const BeforeImage = ({ visible, onClose, navigation, list, newp}) => {
  return (
    <Modal transparent={true} animationType="slide" visible={visible}>
        <ModalLayout navigation={navigation}>
                <View style={{ height: hp('4%'), width: wp('100%'), flexDirection: 'row', justifyContent: 'space-between',backgroundColor:'#192356' ,paddingLeft:15}}>
                  <TouchableOpacity
                    onPress={onClose}
                    style={{width:wp('30%')}}
                  >
                    <View style={{ flexDirection: 'row' }}>
                      <Icon name="arrow-back-outline" size={25} color="white" style={{ alignSelf: 'center', marginLeft: 5 }} />
                    </View>
                  </TouchableOpacity>
                  
                </View>
            <View style={styles.container}>
                
                <View>
                    <VectorCard
                    label={"Image"}
                    iconName="image-outline"
                    iconsProvider="ion"
                    />
                </View>
                <RectButton
                    onPress={newp}
                    text="Add new"
                    backgroundColor="#48A2F1"
                />
                <RectButton
                    onPress={list}
                    text="Consultation"
                    backgroundColor="#48A2F1"
                />
            </View>
        </ModalLayout>
    </Modal>
  );
};

export default BeforeImage;


const styles=StyleSheet.create({
    container:{
        backgroundColor:'#192356', 
        height:hp('80%'), 
        justifyContent:'center',
        alignItems:'center'
    }

  })