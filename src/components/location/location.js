import React, { Component } from 'react';
import HeaderLayout from "../../components/header/header";
import {Button, Container, Input, Textarea} from "native-base";
import {
    FlatList,
    Image, ImageBackground, Picker, ScrollView, Text, TextInput, TouchableHighlight, TouchableOpacity,
    View
} from "react-native";
import styles from './location.css'
import {Actions} from "react-native-router-flux";
import FIcon from 'react-native-vector-icons/FontAwesome';
import Modal from "react-native-modal";
import ProfileModal from "../profilemodal/profilemodal";
import {connect} from "react-redux";
import {addBasket, saveUser} from "../../redux/actions";
import Http from "../../services/http";
import MIcon from 'react-native-vector-icons/MaterialIcons';

class Location extends Component {
    state = {
        isModalVisible: false,
        language:'java',
        updateUI:0
    };
    userAddresses=[];
    _getUserAddresses=async()=>{
        let response = await Http._postAsyncData({userId:this.props.user.userId,token:this.props.user.token},'getAddresses');
        // console.log(response)
        if(Array.isArray(response)){
            this.userAddresses=response;
            this.setState({updateUI:this.state.updateUI++});
        }
    }
    componentWillUnmount(){
        if(this.state.isModalVisible)
        this._toggleModal();
    }
    componentWillMount(){
      this._getUserAddresses()
    }
    _toggleModal = () =>
        this.setState({isModalVisible: !this.state.isModalVisible});
    address;
    selectedAddress=null;
    postalCode;
    field;
    setAddress=null;
    render() {
        let maxlimit=40
        this.setAddress=this.props.setAddress
        if(this.selectedAddress) {
            this.selectedAddress.address = (this.selectedAddress.address && ((this.selectedAddress.address).length > maxlimit) ?
                (((this.selectedAddress.address).substring(0, maxlimit)) + '...') :
                this.selectedAddress.address);
        }
        return (
            <View style={styles.offSection}>
                <View style={styles.offSwitch}>
                    <FIcon name="angle-left" color="black"  onPress={this._toggleModal} size={25}/>
                </View>
                <View style={styles.offSectionText}>
                    {this.selectedAddress&&
                    <TouchableOpacity style={styles.textContainer} onPress={this._toggleModal}>
                    <View style={styles.textDetail}  >
                        <Text style={styles.fieldText}>آدرس</Text>
                        <Text style={styles.fieldText}>:</Text>
                        <Text style={styles.fieldText}>{this.selectedAddress.address}</Text>

                    </View>
                    <View style={styles.textDetail}  >
                        <Text style={styles.fieldText}>کد پستی</Text>
                        <Text style={styles.fieldText}>:</Text>
                        <Text style={styles.fieldText}>{this.selectedAddress.postalCode}</Text>
                    </View>
                    </TouchableOpacity>
                   }
                    {!this.selectedAddress &&
                    <TouchableOpacity  style={styles.textContainer}  onPress={this._toggleModal}>
                        <View style={styles.textDetail}>
                            <Text style={styles.fieldText}>آدرس</Text>
                        </View>
                    </TouchableOpacity>
                    }
                </View>
                <Modal
                    onBackButtonPress={this._toggleModal}
                    onBackdropPress={this._toggleModal}
                    backdropColor="transparent"
                    style={styles.modal}
                    isVisible={this.state.isModalVisible}>
                    <ScrollView style={styles.modalContainer}>
                        <FlatList
                            data={this.userAddresses}
                            keyExtractor={(item, index) => index.toString()}
                            renderItem={({item, index}) =>
                                this._renderAddress(item, index)
                            }
                        />
                        <View style={styles.inputContainer}>
                            <TextInput   style={[styles.inputText]}
                                         underlineColorAndroid="green"
                                         multiline={true}
                                         numberOfLines={5}
                                         onChangeText={(text) => this.address = text}
                                         placeholder={'آدرس'}
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
                            <Button  style={styles.modalButtonVerify} title={0} onPress={()=>{
                                this.insertAddress()
                            }}>
                                <MIcon name="add" color="white" size={25}/>
                                <Text style={styles.modalButtonVerifyText}>افزودن</Text>
                            </Button>
                        </View>
                    </ScrollView>

                </Modal>
            </View>
        )

    }
    insertAddress=async()=> {
        if(this.postalCode&&this.address) {
            if (this.postalCode.length == 10) {
                let data = {
                    token: this.props.user.token,
                    userId: this.props.user.userId,
                    address: this.address,
                    postalCode: this.postalCode,
                }
                let response = await Http._postAsyncData(data, 'addressInsertion')
                if (Array.isArray(response)) {
                    this.userAddresses = response;
                    this.setState({updateUI:this.state.updateUI++});
                } else {
                    alert('خطا دوباره تلاش کنید')
                }
            }
            else {
                alert('کد پستی را 10 رقمی وارد کنید')
            }
        }else{
            alert('لطفا همه موارد را پر کنید')
        }
    }
    _renderAddress=(field)=>{
        let selectedStyle={};
        if(this.selectedAddress&&this.selectedAddress.addressId==field.addressId){
            selectedStyle.backgroundColor='#32ff0044'
        }
        // console.log(selectedStyle)
        return (<TouchableOpacity style={[styles.textContainer,selectedStyle]}  onPress={()=>{
            this.selectedAddress=field;
            this.setAddress(field)
            this._toggleModal();
        }}>
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

        </TouchableOpacity>);
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
export default connect(mapStateToProps,mapDispatchToProps)(Location);