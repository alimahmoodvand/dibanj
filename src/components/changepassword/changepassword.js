import React, { Component } from 'react';
import HeaderLayout from "../../components/header/header";
import {Button, Container, Input} from "native-base";
import {Image, ImageBackground, Picker, Text, TouchableHighlight, TouchableOpacity, View} from "react-native";
import styles from './changepassword.css'
import {Actions} from "react-native-router-flux";
import FIcon from 'react-native-vector-icons/FontAwesome';
import Modal from "react-native-modal";
import ProfileModal from "../profilemodal/profilemodal";
import {connect} from "react-redux";
import {addBasket, saveUser} from "../../redux/actions";
import Http from "../../services/http";
import Loading from "../laoding/laoding";
import AlertMessage from "../../services/alertmessage";
import user from "../../pages/user/user";

class ChangePassword extends Component {
    state = {
        isModalVisible: false,
        language:'java',
        loading:true,
    };
    componentWillUnmount(){
        if(this.state.isModalVisible)
        this._toggleModal();
    }
    _toggleModal = () =>
        this.setState({isModalVisible: !this.state.isModalVisible});
    textValue;
    passwords={
        password:'',
        newPassword:'',
        repeatPassword:'',
    };
    passwordsText={
        password:'رمز عبور',
        newPassword:'رمز عبور جدید',
        repeatPassword:'تکرار رمز عبور',
    };
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.fieldIcon}>
                    <FIcon name="angle-left" onPress={() => this._toggleModal()} color="black" size={25}/>
                </View>
                <TouchableOpacity style={styles.textContainer}  onPress={this._toggleModal}>
                    <Text style={styles.fieldText}>تغییر رمز عبور</Text>
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
                                   secureTextEntry={true}
                                   onChangeText={(text) => this.passwords.password = text}
                                   >
                            </Input>
                            <Text style={styles.fieldText}>:</Text>
                            <Text style={styles.fieldText}>{this.passwordsText.password}</Text>
                        </View>
                        <View style={styles.inputContainer}>
                            <Input style={[styles.inputText]}
                                   underlineColorAndroid="green"
                                   secureTextEntry={true}
                                   onChangeText={(text) => this.passwords.newPassword = text}
                            >
                            </Input>
                            <Text style={styles.fieldText}>:</Text>
                            <Text style={styles.fieldText}>{this.passwordsText.newPassword}</Text>
                        </View>
                        <View style={styles.inputContainer}>
                            <Input style={[styles.inputText]}
                                   underlineColorAndroid="green"
                                   secureTextEntry={true}
                                   onChangeText={(text) => this.passwords.repeatPassword = text}
                                    >
                            </Input>
                            <Text style={styles.fieldText}>:</Text>
                            <Text style={styles.fieldText}>{this.passwordsText.repeatPassword}</Text>
                        </View>

                        <View style={styles.modalButton}>
                            <Button style={styles.modalButtonCancel} title={0} onPress={this._toggleModal}>
                                <Text style={styles.modalButtonCancelText} >انصراف</Text>
                            </Button>
                            <Button  style={styles.modalButtonVerify} title={0} onPress={()=>{
                                this._changePassword();
                            }}>
                                <Text style={styles.modalButtonVerifyText}>تاييد</Text>
                            </Button>
                        </View>
                    </View>
                </Modal>
            </View>
        )
    }
    _changePassword=async()=>{
        let error='';
        let keys=Object.keys(this.passwords)
            for(let i=0;i<keys.length;i++) {
                if (this.passwords[keys[i]] == '' || this.passwords[keys[i]].trim() == '') {
                    error = `${this.passwordsText[keys[i]]} خالی است `;
                    new AlertMessage().error(null,error)
                    return;
                }if (this.passwords[keys[i]].length < 8) {
                    error = 'shortPass';
                    new AlertMessage().error(error)
                    return;
                }
            }

        if(error!=''){
            new AlertMessage().error(null,error)
        }else  if (this.passwords.newPassword != this.passwords.repeatPassword) {
            error = 'notEqualPass'
            new AlertMessage().error(error)
            return;
        }
        else{
            this.setState({loading:true})
            let data=Object.assign({token:this.props.user.token,userId:this.props.user.userId},this.passwords);
            // console.log(data)
            await Http._postAsyncData(data,'user/changePassword')
            this.setState({loading:false,isModalVisible:false})

        }
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
export default connect(mapStateToProps,mapDispatchToProps)(ChangePassword);