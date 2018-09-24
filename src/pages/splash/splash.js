import React, { Component } from 'react';
import HeaderLayout from "../../components/header/header";
import {Container, Text} from "native-base";
import {Image, StyleSheet, View} from "react-native";
import {connect} from "react-redux";
import {Actions} from "react-native-router-flux";
import Http from "../../services/http";
import {initBookmark, initProduct, removeUser, saveCategories, saveMessages, saveUser} from "../../redux/actions";
import DrawerLayout from "../../components/drawer/drawer";

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
    isInitial=false;
    _selectState=()=> {
        if (this.props.rehydrated) {
            // this.props.removeUser();
            if (this.props.user.token) {
                if (!this.isInitial) {
                    this.isInitial=true;
                    Http._postDataPromise({
                        token: this.props.user.token,
                        userId: this.props.user.userId
                    }, 'initial').then((response) =>response.json()).then((responseData) => {
                            // console.log(responseData)
                            this.props.saveCategories(responseData[0])
                            this.props.saveMessages(responseData[1])
                            this.props.saveUser(responseData[2][0])
                            this.props.initBookmark(responseData[3])
                            this.props.initProduct(responseData[4])
                            Actions.reset('drawer');
                            setTimeout(()=> this.isInitial=false,2000)

                        }).catch((err) => {
                        console.log(err)
                        setTimeout(()=> this.isInitial=false,2000)
                    })
                }
            }
            else if (this.props.user.userId && !this.props.user.token) {
                Actions.signuppage();
            } else {
                Actions.loginpage();
            }
        }
    }
 errorInit=()=>{

 }
 logout=()=>{
     alert('مجوز استفاده از اپ صادر نشد')
     DrawerLayout.clearData()
     Actions.reset('auth');
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
        },
        initProduct:(products)=>{
            dispatch(initProduct(products))
        }
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(Splash)