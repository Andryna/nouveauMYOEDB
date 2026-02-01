import React, { Component } from 'react';

import { View, Text, Button, Modal, ScrollView, } from 'react-native';

export class Myownmodal extends Component {

    constructor(props) {
    super(props);
    this.state = {

}
}
test = () =>{
    alert('test')
}
render(){
    const { isVisible, message, textValue } = this.props;
    return(
        <Modal
        animationType="slide"
        transparent={false}
        isVisible={isVisible}
        backdropColor={"white"}
        style={{ margin: 0 }}
        onModalHide={() => {}}>
        <View>
          <Text>textValue</Text>
          <Text>message</Text>
        </View>
      </Modal>
    );
}}