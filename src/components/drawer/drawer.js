import React, { Component } from 'react';
import {Button, Container, Text} from "native-base";
import {Actions} from "react-native-router-flux";
import {
    addBasket, emptyBasket, emptyBookmark, emptyFavoriets, emptyProduct, removeBasket, removeUser,
    saveUser
} from "../../redux/actions";
import {connect} from "react-redux";
import EStyleSheet from 'react-native-extended-stylesheet';
import {Image, ImageBackground, TouchableOpacity, View} from "react-native";
import {EMPTY_FAVORITES} from "../../redux/actions/types";
import {DocumentPicker, DocumentPickerUtil} from "react-native-document-picker";
import Http from "../../services/http";
import ImagePicker from 'react-native-image-crop-picker';
import AlertMessage from "../../services/alertmessage";
import Loading from "../laoding/laoding";

class DrawerLayout extends Component{
    state={
        updateUI:0,
        loading:false,
    }
    statusCode=0;
    render(){
        // console.log("mmmmm",this.props.user)
        return <Container style={{backgroundColor: 'gray'}}>
            <Loading visible={this.state.loading} />
            <View style={{flexDirection:'row'}}>
                <TouchableOpacity style={[styles.proImageContainer, {backgroundColor: 'gray'}]} onPress={() => {
                    ImagePicker.openPicker({
                        width: 300,
                        height: 300,
                        cropping: true
                    }).then(image => {
                        let path=image.path.split('/');
                        image.type=image.mime;
                        image.uri=image.path;
                        image.fileName=path[path.length-1];
                         this.setState({loading:true});
                        Http._postFilePromise({
                            token: this.props.user.token,
                            uniqueCode: this.props.user.uniqueCode,
                            userId: this.props.user.userId
                        }, [image], 'userImage')
                                    .then((response) =>{
                                        this.statusCode=response.status;
                                     return   response.json()
                                    }).then(response => {
                            if (this.statusCode == 200) {
                                let user = this.props.user;
                                user.imageUrl = response.image;
                                user.image = response.image;
                                this.props.saveUser(user);
                            } else if (this.statusCode == 401) {
                                Actions.unauthorized();
                            }
                            this.setState({loading: false});
                        }).catch(err => {
                            this.setState({loading:false});
                            new AlertMessage().error('serverError',err.message?err.message:'')
                                })
                    });
                }}>
                    <View style={styles.userInfo}>
                        <View style={styles.userImageContainer}>
                             <Image style={styles.userImage} source={{uri: this.props.user.imageUrl}}/>
                        </View>
                        <View style={styles.userInfoContainer}>
                            <Text style={styles.userInfoText}>{this.props.user.fullName}</Text>
                            {/*<Text style={styles.userInfoText}>{this.props.user.ostan}</Text>*/}
                        </View>
                    </View>
                </TouchableOpacity>
            </View>
            <Button block style={styles.drawerBtn} onPress={() => Actions.profile()}>
                <Text style={styles.proImageText}>اطلاعات کاربری</Text>
            </Button>
            <Button block style={styles.drawerBtn} onPress={() => {
                Actions.bookmark()
            }}>
                <Text style={styles.proImageText}>لیست علاقه مندی ها</Text>
            </Button>
            <Button block style={styles.drawerBtn} onPress={() => {
                Actions.term()
            }}>
                <Text style={styles.proImageText}>دوره های من</Text>
            </Button>
            <Button block style={styles.drawerBtn} onPress={() => {
                Actions.workout({examType: 2})
            }}>
                <Text style={styles.proImageText}>تمرین های من</Text>
            </Button>
            <Button block style={styles.drawerBtn} onPress={() => {
                Actions.workout({examType: 1})
            }}>
                <Text style={styles.proImageText}>ازمون های من</Text>
            </Button>
            <Button block style={styles.drawerBtn} onPress={() => {
                Actions.order()
            }}>
                <Text style={styles.proImageText}> سفارشات</Text>
            </Button>
            <Button block style={styles.drawerBtn} onPress={() => {
                Actions.help()
            }}>
                <Text style={styles.proImageText}>راهنما</Text>
            </Button>
            <Button block style={styles.drawerBtn} onPress={() => {
                Actions.contact()
            }}>
                <Text style={styles.proImageText}>تماس با ما</Text>
            </Button>
            <Button block style={styles.drawerBtn} onPress={() => {
                this.props.removeUser(this.props.user);
                this.props.emptyBasket();
                this.props.emptyProduct();
                this.props.emptyFavoriets();
                Http._postAsyncData({token:this.props.user.token,userId:this.props.user.userId}, 'auth/logout');
                Actions.reset('auth');
            }}>
                <Text style={styles.proImageText}>خروج</Text>
            </Button>
        </Container>;
    }
}

const styles = EStyleSheet.create({
    proImageContainer:{
        flex:1,
    },
    proImageBG:{
        width:300,
        height:100,
    },
    proImage:{
        flex:1,
    },
    drawerBtn:{
        backgroundColor:'$mainColor',
        justifyContent:'flex-end',
        borderBottomColor:'white',
        borderBottomWidth:0.25
    },
    proImageText:{
        color:'black',
        fontSize:17,
    },
    userInfo:{
        flexDirection:'row-reverse',
        justifyContent:'flex-start',
        alignItems:'center',
    },
    userImageContainer:{
        marginLeft:5,
    },
    userImage:{
        width:'$productBntRaduis',
        height:'$productBntRaduis',
        borderRadius:'$productBntRaduis',
    },
    userInfoContainer:{
    },
    userInfoText:{
        color:'white',
        textAlign:'right',
        fontSize:15,
    },
})


const mapDispatchToProps=(dispatch)=> {
    return{
        removeUser:(user)=>{
            dispatch(removeUser(user));
        },
        emptyBasket:()=>{
            dispatch(emptyBasket());
        },
        emptyFavoriets:()=>{
            dispatch(emptyFavoriets());
        },
        saveUser:(user)=>{
            dispatch(saveUser(user));
        },
        emptyProduct:()=>{
            dispatch(emptyProduct());
        }
    }
}
const mapStateToProps=state=>{
    return{
        user:state.user,
        basket:state.basket,
    }
};
export default connect(mapStateToProps,mapDispatchToProps)(DrawerLayout);