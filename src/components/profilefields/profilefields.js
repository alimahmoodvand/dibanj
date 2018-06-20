import React, { Component } from 'react';
import HeaderLayout from "../../components/header/header";
import {Button, Container, Input} from "native-base";
import {Image, ImageBackground, Picker, Text, TouchableHighlight, TouchableOpacity, View} from "react-native";
import styles from './profilefields.css'
import {Actions} from "react-native-router-flux";
import FIcon from 'react-native-vector-icons/FontAwesome';
import Modal from "react-native-modal";
import ProfileModal from "../profilemodal/profilemodal";
import {connect} from "react-redux";
import {addBasket, saveUser} from "../../redux/actions";
import Http from "../../services/http";

class ProfileFields extends Component {
    state = {
        isModalVisible: false,
        language:'java'
    };
    componentWillUnmount(){
        if(this.state.isModalVisible)
        this._toggleModal();
    }
    _toggleModal = () =>
        this.setState({isModalVisible: !this.state.isModalVisible});
    textValue;
    render() {

        const {field} = this.props;
        this.textValue=field.value
       // console.log(field)
        return (
            <View style={styles.container}>
                <View style={styles.fieldIcon}>
                    <FIcon name="angle-left" onPress={() => this._toggleModal()} color="black" size={25}/>
                </View>
                <TouchableOpacity style={styles.textContainer}  onPress={this._toggleModal}>
                    <Text style={styles.fieldText}>{field.value}</Text>
                    <Text style={styles.fieldText}>:</Text>
                    <Text style={styles.fieldText}>{field.key}</Text>
                </TouchableOpacity>
                <Modal
                    onBackButtonPress={this._toggleModal}
                    onBackdropPress={this._toggleModal}
                    backdropColor="transparent"
                    style={styles.modal}
                    isVisible={this.state.isModalVisible}>
                    <View style={styles.modalContainer}>
                        <View style={styles.inputContainer}>
                            <Input style={[styles.inputText]}
                                   underlineColorAndroid="green"
                                   onChangeText={(text) => this.textValue = text}
                                   placeholder={field.key.toString()} >
                            {field.value}
                            </Input>
                            <Text style={styles.fieldText}>:</Text>
                            <Text style={styles.fieldText}>{field.key}</Text>
                        </View>
                        <View style={styles.modalButton}>
                            <Button style={styles.modalButtonCancel} title={0} onPress={this._toggleModal}>
                                <Text style={styles.modalButtonCancelText} >انصراف</Text>
                            </Button>
                            <Button  style={styles.modalButtonVerify} title={0} onPress={()=>{
                                if(this.textValue==''){
                                    alert("field empty")
                                }
                                else{
                                    let user=this.props.user;
                                    user[field.enKey]=this.textValue
                                    field.value=this.textValue;
                                    Http._postAsyncData(user,'user/update')
                                    this.props.saveUser(user);
                                    this._toggleModal();
                                }
                            }}>
                                <Text style={styles.modalButtonVerifyText}>تاييد</Text>
                            </Button>
                        </View>
                    </View>
                </Modal>
            </View>
        )
    }
}

const mapDispatchToProps=(dispatch)=> {
    return{
        saveUser:(user)=>{
            dispatch(saveUser(user));
        },

    }
}
const mapStateToProps=state=>{
    return{
        user:state.user,
    }
};
export default connect(mapStateToProps,mapDispatchToProps)(ProfileFields);