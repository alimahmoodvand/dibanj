import React, { Component } from 'react';
import HeaderLayout from "../../components/header/header";
import {Button, Container, Input, Textarea} from "native-base";
import {
    Image, ImageBackground, Picker, Text, TextInput, TouchableHighlight, TouchableOpacity,
    View
} from "react-native";
import styles from './address.css'
import {Actions} from "react-native-router-flux";
import FIcon from 'react-native-vector-icons/FontAwesome';
import Modal from "react-native-modal";
import ProfileModal from "../profilemodal/profilemodal";
import {connect} from "react-redux";
import {addBasket, saveUser} from "../../redux/actions";
import Http from "../../services/http";
import MIcon from 'react-native-vector-icons/MaterialIcons';

class Address extends Component {
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
    address;
    postalCode;
    field;
    render() {

        const {field,deleteAddress,updateAddress} = this.props;
         this.address=field.address
         this.postalCode=field.postalCode
       // console.log(field)
        return (
            <View style={styles.container}>
                <View style={styles.fieldIcon}>
                    <FIcon name="angle-left" onPress={() => this._toggleModal()} color="black" size={25}/>
                    <MIcon name="delete" onPress={() => deleteAddress(field)} color="red" size={25}/>

                </View>
                <TouchableOpacity style={styles.textContainer}  onPress={this._toggleModal}>
                    <View style={styles.textDetail}  >
                        <Text style={styles.fieldText}>آدرس</Text>
                        <Text style={styles.fieldText}>:</Text>
                        <Text style={styles.fieldText}>{field.address}</Text>

                    </View>
                    <View style={styles.textDetail}  >
                        <Text style={styles.fieldText}>کد پستی</Text>
                        <Text style={styles.fieldText}>:</Text>
                        <Text style={styles.fieldText}>{field.postalCode}</Text>

                    </View>

                </TouchableOpacity>

                <Modal
                    onBackButtonPress={this._toggleModal}
                    onBackdropPress={this._toggleModal}
                    backdropColor="transparent"
                    style={styles.modal}
                    isVisible={this.state.isModalVisible}>
                    <View style={styles.modalContainer}>
                        <View style={styles.inputContainer}>
                            <TextInput   style={[styles.inputText]}
                                   underlineColorAndroid="green"
                                         multiline={true}
                                         numberOfLines={5}
                                   onChangeText={(text) => this.address = text}
                                   placeholder={'آدرس'}
                                         defaultValue={this.address}
                            />
                            <Text style={styles.fieldText}>:</Text>
                            <Text style={styles.fieldText}>آدرس</Text>
                        </View>
                        <View style={styles.inputContainer}>
                            <Input style={[styles.inputText]}
                                   underlineColorAndroid="green"
                                   keyboardType = 'numeric'
                                   onChangeText={(text) => this.postalCode = text}
                                   placeholder={'کد پستی'} >
                            {this.postalCode}
                            </Input>
                            <Text style={styles.fieldText}>:</Text>
                            <Text style={styles.fieldText}>کد پستی</Text>
                        </View>
                        <View style={styles.modalButton}>
                            <Button style={styles.modalButtonCancel} title={0} onPress={this._toggleModal}>
                                <Text style={styles.modalButtonCancelText} >انصراف</Text>
                            </Button>
                            <Button  style={styles.modalButtonVerify} title={0} onPress={()=>{
                                if(this.postalCode!=''&&this.address!=''){
                                    if(this.postalCode.length==10) {
                                        field.address = this.address;
                                        field.postalCode = this.postalCode;
                                        updateAddress(field)
                                        this._toggleModal();
                                    }else{
                                        alert('کد پستی را 10 رقمی وارد کنید')
                                    }
                                }else{
                                    alert('لطفا همه موارد را پر کنید')
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
export default connect(mapStateToProps,mapDispatchToProps)(Address);