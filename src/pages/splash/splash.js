import React, { Component } from 'react';
import HeaderLayout from "../../components/header/header";
import {Container, Text} from "native-base";
import {Image, StyleSheet, View} from "react-native";
import {connect} from "react-redux";
import {Actions} from "react-native-router-flux";
import Http from "../../services/http";
import {initBookmark, removeUser, saveCategories, saveMessages, saveUser} from "../../redux/actions";

 class Splash extends Component{
    render(){
        setTimeout(()=>{
            this._selectState();
        },500)
        return(
            <View style={styles.container}>
                <Image  style={styles.bgimage} source={require('../../assets/images/splash.jpg')}/>
                <View style={styles.content}>
                    <Image source={require("../../assets/images/dibanzhnew.png")} style={styles.logo}/>
                </View>
            </View>
        );
    }

    _selectState=()=>{
        if(this.props.rehydrated)
        {
            // this.props.removeUser();
            if (this.props.user.token) {

                Http._postDataPromise({token:this.props.user.token},'categories').then((response) => response.json())
                    .then((responseData) => {
                        this.props.saveCategories(responseData)
                        Http._postDataPromise({token:this.props.user.token},'userMessages').then((response) => response.json())
                            .then((responseData) => {
                                // console.log(responseData)
                                this.props.saveMessages(responseData)
                                Http._postDataPromise({token:this.props.user.token,userId:this.props.user.userId},'getUser').then((response) => response.json())
                                    .then((responseData) => {
                                        this.props.saveUser(responseData)
                                        Http._postDataPromise({token:this.props.user.token,userId:this.props.user.userId},'getBookmark').then((response) => response.json())
                                            .then((responseData) => {
                                                this.props.initBookmark(responseData)
                                                Actions.reset('drawer')
                                            }).catch((err)=>{
                                            Actions.reset('drawer')
                                        })
                                    }).catch((err)=>{
                                    Actions.reset('drawer')
                                })
                            }).catch((err)=>{
                            Actions.reset('drawer')
                        })
                    }).catch((err)=>{
                    console.log(err)
                    Actions.reset('drawer')
                })
                //     Actions.reset('drawer')
            }
            else if (this.props.user.userId&&!this.props.user.token) {
                Actions.signuppage();
            } else {
                Actions.loginpage();
            }
        }
 }
}
const styles=StyleSheet.create({
    bgimage: {
        height: '100%',
        width: '100%',
        position: 'absolute',
        top: 0,
        left: 0
    },
    logo:{
        flex:1,
        height:75,
        // backgroundColor:'blue'
    },
    container:{
        flex:1,backgroundColor:'rgba(0,0,0,0)'
    },
    content:{flex:1,backgroundColor:'rgba(0,0,0,0)',justifyContent:'center',alignItems:'center',flexWrap:'wrap',flexDirection:'row'}
})


const mapStateToProps=state=>{
     return{
         user:state.user,
         rehydrated:state.rehydrated
     }
}
const mapDispatchToProps=(dispatch)=> {
    return{
        saveCategories:(categories)=>{
            dispatch(saveCategories(categories));
        },
        saveMessages:(messages)=>{
            dispatch(saveMessages(messages))
        },
        saveUser:(messages)=>{
            dispatch(saveUser(messages))
        },
        removeUser:()=>{
            dispatch(removeUser())
        },
        initBookmark:(products)=>{
            dispatch(initBookmark(products))
        }
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(Splash)