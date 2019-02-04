import React, { Component } from 'react';
import HeaderLayout from "../../components/header/header";
import {Button, Container, Input} from "native-base";
import {
    Image, ImageBackground, Keyboard, Picker, ScrollView, Text, TouchableHighlight, TouchableOpacity,
    View
} from "react-native";
import styles from './profilefields.css'
import {Actions} from "react-native-router-flux";
import FIcon from 'react-native-vector-icons/FontAwesome';
import Modal from "react-native-modal";
import ProfileModal from "../profilemodal/profilemodal";
import {connect} from "react-redux";
import {addBasket, saveUser} from "../../redux/actions";
import Http from "../../services/http";
import Loading from "../laoding/laoding";
import AlertMessage from "../../services/alertmessage";

class ProfileFields extends Component {
    state = {
        isModalVisible: false,
        language:'java',
        loading:false,
    };
    componentWillUnmount(){
        if(this.state.isModalVisible)
        this._toggleModal();
    }
    _toggleModal = () =>
        this.setState({isModalVisible: !this.state.isModalVisible});
    textValue;
    field;
    render() {
        const {field} = this.props;
        this.textValue=field.value
        return (

            <View style={styles.container} >
                <TouchableOpacity style={styles.fieldIcon}  onPress={this._toggleModal}>
                    <FIcon name="angle-left" onPress={() => this._toggleModal()} color="black" size={25}/>
                </TouchableOpacity>
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
                    <ScrollView
                        keyboardShouldPersistTaps="handled"

                        style={styles.modalContainer}>
                        <View style={styles.inputContainer}>
                            <Loading visible={this.state.loading} />

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
                                this.field=field;
                                this._updateUser();
                            }}>
                                <Text style={styles.modalButtonVerifyText}>تاييد</Text>
                            </Button>
                        </View>
                    </ScrollView>
                    </View>

                </Modal>
            </View>
        )
    }
    _updateUser=async()=>{
        if(this.textValue==''){
            new AlertMessage().error('isEmpty')
        }
        else{
            this.setState({loading:true})
            let user=this.props.user;
            user[this.field.enKey]=this.textValue
            this.field.value=this.textValue;
            let token=this.props.user.token.toString();
            user=await Http._postAsyncData(user,'user/update')
            if(user) {
                user.token=token;
                this.props.saveUser(user);
                new AlertMessage().message('updateUser')
                this._toggleModal();
            }
            this.setState({loading:false})

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
export default connect(mapStateToProps,mapDispatchToProps)(ProfileFields);