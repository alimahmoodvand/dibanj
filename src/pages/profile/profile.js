import React, { Component } from 'react';
import HeaderLayout from "../../components/header/header";
import {Button, Container} from "native-base";
import {
    FlatList, Image, ImageBackground, ScrollView, Text, TouchableHighlight, TouchableOpacity,
    View
} from "react-native";
import styles from './profile.css'
import {Actions} from "react-native-router-flux";
import FIcon from 'react-native-vector-icons/FontAwesome';
import Modal from "react-native-modal";
import ProfileFields from "../../components/profilefields/profilefields";
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

    }
    state={updateUI:0};
    uri="";
    render() {
        return (
            <View style={styles.main}>
                <Image style={styles.bgimage} source={require('../../assets/images/bg.jpg')}/>

                <View style={styles.content}>
                    <View style={styles.closeIcon}>
                        <FIcon name="times" onPress={() => Actions.pop()} color="white" size={25}/>
                    </View>
                    <View style={styles.profileInfo}>
                        <View style={styles.profileInfoCircle}>

                        </View>
                        <View style={styles.profilePicSection}>
                            <Image style={styles.profilePic} source={{uri:this.props.user.image}}>
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
                                                user.image = response.image;
                                                this.props.saveUser(user);
                                                this.setState({updateUI: this.state.updateUI++});
                                            }).catch(err => {
                                                console.log(err)
                                            })
                                        }

                                    });
                                }} color="black" size={20}/>
                            </View>
                        </View>
                        <Text>{this.props.user.userName}</Text>
                        <Text>{this.props.user.userId}</Text>
                    </View>
                    <View style={styles.editableInfo}>

                        <View style={{flex: 1}}>
                            <ProfileCategory/>
                            <FlatList
                                data={this.fields}
                                keyExtractor={(item, index) => index.toString()}
                                renderItem={({item, index}) =>
                                    this._renderFields(item, index)
                                }
                            />
                        </View>
                    </View>
                </View>
            </View>
        );
    }
    mapUser=[
        {enTitle:"fullName",faTitle:'نام نام خانوادگی',},
        {enTitle:"ostan",faTitle:'استان',},
        {enTitle:"city",faTitle:'شهر',},
        {enTitle:"postalCode",faTitle:'کدپستی',},
        {enTitle:"address",faTitle:'آدرس',}
    ]
    _mapEnToFa=()=>{
        let fields=[];
        console.log(this.props.user)
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