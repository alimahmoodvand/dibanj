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
        // console.log(this.props.user.imageUrl+"?v="+new Date().getTime().toString())
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
                            <Image source={require('../../assets/images/drawer/hat.png')} style={styles.userHat}/>
                             <Image style={styles.userImage} source={{uri: this.props.user.imageUrl}}/>
                        </View>
                        <View style={styles.userInfoContainer}>
                            <View style={styles.usernameLine}>

                            </View>
                            <Text style={styles.userInfoText}>{this.props.user.fullName}</Text>
                            <View style={styles.usernameLine}>

                            </View>
                            {/*<Text style={styles.userInfoText}>{this.props.user.ostan}</Text>*/}
                        </View>
                    </View>
                </TouchableOpacity>
            </View>

            <Button block style={styles.drawerBtn} onPress={() => Actions.profile()}>
                <Text style={styles.proImageText}>اطلاعات کاربری</Text>
                <Image style={styles.menuIcon} source={require('../../assets/images/drawer/profile.png')}/>
            </Button>
            <Button block style={styles.drawerBtn} onPress={() => {
                Actions.bookmark()
            }}>
                <Text style={styles.proImageText}>لیست علاقه مندی ها</Text>
                <Image style={styles.menuIcon} source={require('../../assets/images/drawer/bookmark.png')}/>
            </Button>
            <Button block style={styles.drawerBtn} onPress={() => {
                Actions.term({fromApp:true})
            }}>
                <Text style={styles.proImageText}>دوره های من</Text>
                <Image style={styles.menuIcon} source={require('../../assets/images/drawer/term.png')}/>
            </Button>
            <Button block style={styles.drawerBtn} onPress={() => {
                Actions.workout({examType: 2})
            }}>
                <Text style={styles.proImageText}>تمرین های من</Text>
                <Image style={styles.menuIcon} source={require('../../assets/images/drawer/practice.png')}/>
            </Button>
            <Button block style={styles.drawerBtn} onPress={() => {
                Actions.workout({examType: 1})
            }}>
                <Text style={styles.proImageText}>ازمون های من</Text>
                <Image style={styles.menuIcon} source={require('../../assets/images/drawer/exam.png')}/>
            </Button>
            <Button block style={styles.drawerBtn} onPress={() => {
                Actions.order()
            }}>
                <Text style={styles.proImageText}> سفارشات</Text>
                <Image style={styles.menuIcon} source={require('../../assets/images/drawer/order.png')}/>
            </Button>
            <Button block style={styles.drawerBtn} onPress={() => {Actions.help()}}>
                <Text style={styles.proImageText}>راهنما</Text>
                <Image style={styles.menuIcon} source={require('../../assets/images/drawer/help.png')}/>
            </Button>
            <Button block style={styles.drawerBtn} onPress={() => {Actions.contact()}}>
                <Text style={styles.proImageText}>تماس با ما</Text>
                <Image style={styles.menuIcon} source={require('../../assets/images/drawer/contact.png')}/>
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
                <Image style={styles.menuIcon} source={require('../../assets/images/drawer/logout.png')}/>
            </Button>
            <Image source={require('../../assets/images/drawer/drawerfooter.png')} style={{width:'100%',height:150}}/>
        </Container>;
    }
}

const styles = EStyleSheet.create({
    usernameLine:{
        height:1,
        width:75,
        backgroundColor:'white'
    },
    menuIcon:{
        width:25,
        height:25,
        // backgroundColor:'red',
        marginRight:15,
    },
    userHat:{
        width:20,
        height:25,
        position:'absolute',
        top:0,
        zIndex:10,
        right:0,
    },
    proImageContainer:{
        flex:1,
        marginBottom:'$productBntRaduis/10',
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
        flexDirection:'row',
        borderBottomColor:'white',
        height:35,
        marginBottom:2,
        marginTop:2,
        borderRadius:5,
        borderBottomWidth:0.25
    },
    proImageText: {
        color: 'black',
        fontSize: 14,
        textAlign: 'right',
        // alignSelf: 'stretch',
        padding: 0,
        flexWrap:'wrap',
        // backgroundColor: 'blue'
    },
    userInfo:{
        // flexDirection:'row-reverse',
        justifyContent:'flex-start',
        alignItems:'center',
    },
    userImageContainer:{
        marginLeft:5,
    },
    userImage:{
        marginTop:'$productBntRaduis/10',
        width:'$productBntRaduis/2',
        height:'$productBntRaduis/2',
        borderRadius:'$productBntRaduis/2',
    },
    userInfoContainer:{
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
    },
    userInfoText:{
        color:'white',
        textAlign:'right',
        fontSize:17,
        margin:3,
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