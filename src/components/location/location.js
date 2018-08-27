import React, { Component } from 'react';
import HeaderLayout from "../../components/header/header";
import {Button, Container, Input, Textarea} from "native-base";
import {
    FlatList,
    Image, ImageBackground, Picker, Text, TextInput, TouchableHighlight, TouchableOpacity,
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
    postalCode;
    field;
    render() {

        const {field,updateAddress} = this.props;
         // this.address=field.address
         // this.postalCode=field.postalCode
       // console.log(field)
        return (
            <View style={styles.offSection}>
                <View style={styles.offSwitch}>
                    <FIcon name="angle-left" color="black"  onPress={this._toggleModal} size={25}/>
                </View>
                <View style={styles.offSectionText}>
                    <Text style={styles.offText}>آدرس:</Text>
                </View>
                <Modal
                    onBackButtonPress={this._toggleModal}
                    onBackdropPress={this._toggleModal}
                    backdropColor="transparent"
                    style={styles.modal}
                    isVisible={this.state.isModalVisible}>
                    <View style={styles.modalContainer}>
                        <FlatList
                            data={this.userAddresses}
                            keyExtractor={(item, index) => index.toString()}
                            renderItem={({item, index}) =>
                                this._renderAddress(item, index)
                            }
                        />
                    </View>
                </Modal>
            </View>
        )
    }
    _renderAddress=(field)=>{
        return (<TouchableOpacity style={styles.textContainer}  onPress={this._toggleModal}>
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