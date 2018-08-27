import React, { Component } from 'react';
import HeaderLayout from "../../components/header/header";
import {Button, Container, Input} from "native-base";
import {
    FlatList, Image, ImageBackground, ScrollView, Text, TextInput, TouchableHighlight, TouchableOpacity,
    View
} from "react-native";
import styles from './profile.css'
import {Actions} from "react-native-router-flux";
import FIcon from 'react-native-vector-icons/FontAwesome';
import Modal from "react-native-modal";
import ProfileFields from "../../components/profilefields/profilefields";
import Address from "../../components/address/address";
import ProfileCategory from "../../components/profilecategory/profilecategory";
import { DocumentPicker, DocumentPickerUtil } from 'react-native-document-picker';
import MIcon from 'react-native-vector-icons/MaterialIcons';
import {connect} from "react-redux";
import {addBasket, saveUser} from "../../redux/actions";
import Http from "../../services/http";
class Profile extends Component {
    componentWillMount(){
        this.uri=this.props.user.image;
            this.fields=this._mapEnToFa();
            this._getUserAddresses();

    }
    state = {
        isModalVisible: false,
        updateUI:0
    };
    componentWillUnmount(){
        if(this.state.isModalVisible)
            this._toggleModal();
    }
    _toggleModal = () =>
        this.setState({isModalVisible: !this.state.isModalVisible});
    address;
    postalCode;
    uri="";
    userAddresses=[];
    _getUserAddresses=async()=>{
        let response = await Http._postAsyncData({userId:this.props.user.userId,token:this.props.user.token},'getAddresses');
        // console.log(response)
        if(Array.isArray(response)){
            this.userAddresses=response;
            this.setState({updateUI:this.state.updateUI++});
        }
    }
    render() {
        return (
            <View style={styles.main}>
                <Image style={styles.bgimage} source={require('../../assets/images/bg.jpg')}/>

                <View style={styles.content}>
                    <View style={styles.closeIcon}>
                        <MIcon name="close" onPress={() => Actions.pop()} color="white" size={25}/>
                    </View>
                    <View style={styles.profileInfo}>
                        <View style={styles.profileInfoCircle}>

                        </View>
                        <View style={styles.profilePicSection}>
                            <Image style={styles.profilePic} source={{uri:this.props.user.imageUrl}}>
                            </Image>
                            <View style={styles.profileTakePic}>
                                <MIcon name="photo-camera" onPress={() => {
                                    DocumentPicker.show({
                                        filetype: [DocumentPickerUtil.images()],
                                    },(error,res) => {
                                        // Android
                                        // console.log(res);
                                        if(res) {
                                            Http._postFilePromise({
                                                token: this.props.user.token,
                                                userId: this.props.user.userId
                                            }, [res], 'userImage')
                                                .then((response) => response.json()).then(response => {
                                                // console.log(response)
                                                let user = this.props.user;
                                                user.imageUrl = response.image;
                                                user.image = response.image;
                                                this.props.saveUser(user);
                                                this.setState({updateUI: this.state.updateUI++});
                                            }).catch(err => {
                                                console.log(err)
                                            })
                                        }

                                    });
                                }} color="red" size={25}/>
                            </View>
                        </View>
                        <Text>{this.props.user.userName}</Text>
                        <Text>{this.props.user.userId}</Text>
                    </View>
                    <ScrollView style={styles.editableInfo}>

                        <View style={{flex: 1}}>
                            <ProfileCategory/>
                            <FlatList
                                data={this.fields}
                                keyExtractor={(item, index) => index.toString()}
                                renderItem={({item, index}) =>
                                    this._renderFields(item, index)
                                }
                            />
                            <FlatList
                                data={this.userAddresses}
                                keyExtractor={(item, index) => index.toString()}
                                renderItem={({item, index}) =>
                                    this._renderAddresses(item, index)
                                }
                            />
                            <Button  full style={styles.loginBtn} onPress={this._toggleModal}>
                                <Text>افزودن آدرس</Text>
                            </Button>
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
                                          this.insertAddress();
                                        }}>
                                            <Text style={styles.modalButtonVerifyText}>تاييد</Text>
                                        </Button>
                                    </View>
                                </View>
                            </Modal>

                        </View>
                    </ScrollView>
                </View>
            </View>
        );
    }
    mapUser=[
        {enTitle:"fullName",faTitle:'نام نام خانوادگی',},
        {enTitle:"ostan",faTitle:'استان',},
        {enTitle:"city",faTitle:'شهر',},
        // {enTitle:"address",faTitle:'آدرس',},
        // {enTitle:"postalCode",faTitle:'کدپستی',},

    ]
    _mapEnToFa=()=>{
        let fields=[];
        // console.log(this.props.user)
        this.mapUser.map((item,index)=>{
            let obj={};
            obj.key=item.faTitle;
            // obj.user=this.props.user;
            obj.enKey=item.enTitle;
            obj.value=this.props.user[item.enTitle];
            fields.push(obj)
        })
        return fields;
    }

    _renderFields(item, index) {
           // console.log(item,index)
            return (<ProfileFields
            field={item}
            />)
    }
    _renderAddresses=(item, index)=> {
        item['id']=index;
           // console.log(item,index)
            return (<Address
                deleteAddress={this._deleteAddress}
                updateAddress={this._updateAddress}
            field={item}
            />)
    }
    _deleteAddress=async(add)=>{
        let data={
            token:this.props.user.token,
            addressId:add.addressId,
            userId:this.props.user.userId
        }
        let response=await Http._postAsyncData(data,'addressDeletion')
        if(Array.isArray(response)){
            this.userAddresses=response;
            this.setState({updateUI:this.state.updateUI++});
        }else{
         alert('خطا دوباره تلاش کنید')
        }
    }
    _updateAddress=async(add)=>{
        let data={
            token:this.props.user.token,
            addressId:add.addressId,
            userId:this.props.user.userId,
            address:add.address,
            postalCode:add.postalCode,
        }
        let response=await Http._postAsyncData(data,'addressUpdate')
        if(Array.isArray(response)){
            this.userAddresses=response;
            this.setState({updateUI:this.state.updateUI++});
        }else{
            alert('خطا دوباره تلاش کنید')
        }
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
                    this._toggleModal();
                } else {
                    alert('خطا دوباره تلاش کنید')
                }
            }
            else {
                alert('لطفا همه موارد را پر کنید')
            }
        }else{
            alert('لطفا همه موارد را پر کنید')
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
export default connect(mapStateToProps,mapDispatchToProps)(Profile);