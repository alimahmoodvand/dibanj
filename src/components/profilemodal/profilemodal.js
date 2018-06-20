import React, { Component } from 'react';
import HeaderLayout from "../../components/header/header";
import {Button, Container} from "native-base";
import {Image, ImageBackground, Text, TouchableHighlight, TouchableOpacity, View} from "react-native";
import styles from './profilemodal.css'
import {Actions} from "react-native-router-flux";
import FIcon from 'react-native-vector-icons/FontAwesome';
import Modal from "react-native-modal";

export default class ProfileModal extends Component {
    state = {
        isModalVisible: false
    };

    _toggleModal = () =>
        this.setState({isModalVisible: !this.state.isModalVisible});
    render() {
        return (
            <Modal
                onBackButtonPress={this._toggleModal}
                onBackdropPress={this._toggleModal}
                backdropColor="transparent"
                style={styles.modal}
                isVisible={this.state.isModalVisible}>
                <View style={styles.container}>
                    <Text>Hello!</Text>
                    <TouchableOpacity onPress={this._toggleModal}>
                        <Text>Hide me!</Text>
                    </TouchableOpacity>
                </View>
            </Modal>
        )
    }
}