import React, { Component } from 'react';
import {Button, Container, Text} from "native-base";
import {Actions} from "react-native-router-flux";
import {
    addBasket, emptyBasket, emptyBookmark, emptyFavoriets, removeBasket, removeUser,
    saveUser
} from "../../redux/actions";
import {connect} from "react-redux";
import EStyleSheet from 'react-native-extended-stylesheet';
import {Image, ImageBackground, TouchableOpacity, View} from "react-native";
import {EMPTY_FAVORITES} from "../../redux/actions/types";
import {DocumentPicker, DocumentPickerUtil} from "react-native-document-picker";
import Http from "../../services/http";
import ImagePicker from 'react-native-image-crop-picker';

class DrawerLayout extends Component{
    state={
        updateUI:0
    }
    render(){
        // console.log("mmmmm",this.props.user)
        return <Container style={{backgroundColor: 'gray'}}>
            <View style={{flexDirection:'row'}}>
                <TouchableOpacity style={[styles.proImageContainer, {backgroundColor: 'gray'}]} onPress={() => {
                    // Actions.user({userId:1017})
                    // DocumentPicker.show({
                    //     filetype: [DocumentPickerUtil.images()],
                    // }, (error, res) => {
                    //     // Android
                    //     // console.log(res);
                    //     if (res) {
                    //         Http._postFilePromise({
                    //             token: this.props.user.token,
                    //             userId: this.props.user.userId
                    //         }, [res], 'userImage')
                    //             .then((response) => response.json()).then(response => {
                    //             console.log(response)
                    //             let user = this.props.user;
                    //             user.imageUrl = response.image;
                    //             user.image = response.image;
                    //             this.props.saveUser(user);
                    //             this.setState({updateUI: this.state.updateUI++});
                    //         }).catch(err => {
                    //             console.log(err)
                    //         })
                    //     }
                    //
                    // });
                    ImagePicker.openPicker({
                        width: 300,
                        height: 300,
                        cropping: true
                    }).then(image => {
                        let path=image.path.split('/');
                        image.type=image.mime;
                        image.uri=image.path;
                        image.fileName=path[path.length-1];
                                Http._postFilePromise({
                                    token: this.props.user.token,
                                    userId: this.props.user.userId
                                }, [image], 'userImage')
                                    .then((response) => response.json()).then(response => {
                                    console.log(response)
                                    let user = this.props.user;
                                    user.imageUrl = response.image;
                                    user.image = response.image;
                                    this.props.saveUser(user);
                                    this.setState({updateUI: this.state.updateUI++});
                                }).catch(err => {
                                    // alert('error')
                                    // console.log(err)
                                })

                        // console.log(image);
                    });
                }}>
                    {/*<ImageBackground source={{uri: this.props.user.imageUrl}} resizeMode='contain'*/}
                                     {/*imageStyle={styles.proImage}*/}
                                     {/*style={[styles.proImageBG, {backgroundColor: 'gray'}]}>*/}
                        {/*<Text style={styles.proImageText}>{this.props.user.fullName}</Text>*/}
                        {/*<Text style={styles.proImageText}>{this.props.user.userName}</Text>*/}
                    {/*</ImageBackground>*/}
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
                this.props.emptyFavoriets();

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
        // width:300,
        // height:100,
        // flexDirection:'row',
    },
    proImageBG:{
        width:300,
        height:100,
    },
    proImage:{
        flex:1,
        // width:100,
        // height:100,
        // justifyContent:'flex-end',

        // alignItems:'center',
    },
    drawerBtn:{
        backgroundColor:'$mainColor',
        justifyContent:'flex-end',
        borderBottomColor:'white',
        borderBottomWidth:0.25
    },
    proImageText:{
        color:'white',
        fontSize:17,
    },
    userInfo:{
        flexDirection:'row-reverse',
        justifyContent:'flex-start',
        alignItems:'center',
        // flex:1,
        // marginBottom:20,
    },
    userImageContainer:{
        // flex:0.4,
        marginLeft:5,
    },
    userImage:{
        width:'$productBntRaduis',
        height:'$productBntRaduis',
        borderRadius:'$productBntRaduis',
    },
    userInfoContainer:{
        // paddingRight:20,
        // flex:0.6,

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