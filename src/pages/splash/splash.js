import React, { Component } from 'react';
import HeaderLayout from "../../components/header/header";
import {Container, Text} from "native-base";
import {Image, StyleSheet, View} from "react-native";
import {connect} from "react-redux";
import {Actions} from "react-native-router-flux";
import Http from "../../services/http";
import {initBookmark, initProduct, removeUser, saveCategories, saveMessages, saveUser} from "../../redux/actions";
import DrawerLayout from "../../components/drawer/drawer";
import  {Animated,Easing}from "react-native";

 class Splash extends Component{
     state = {
         offsetX: new Animated.Value(0),
     }
    render(){
         setTimeout(()=>{
             Animated.timing(
                 this.state.offsetX,
                 {
                     toValue: 1000,
                     easing: Easing.back(),
                     duration: 2000,
                 }
             ).start();
             this._selectState();

         },1000)

        // setTimeout(()=>{
        // },2000)
        return(
            <View style={styles.container}>
                <Image  style={styles.bgimage} source={require('../../assets/images/splash.jpg')}/>
                <View style={styles.content}>
                    <Animated.View style={[styles.logo,{flexDirection:'row'},{ transform: [{translateX: this.state.offsetX}]}]}>
                    <Image source={require("../../assets/images/dibanzhnew.png")} style={styles.logo}/>
                    </Animated.View>
                </View>
            </View>
        );
    }
    isInitial=false;
    statusCode=0;
    _selectState=()=> {
        if (this.props.rehydrated) {
            // this.props.removeUser();
            // console.log(new Date())
            if (this.props.user.token) {
                if (!this.isInitial) {
                    this.isInitial=true;

                    Http._postDataPromise({
                        token: this.props.user.token,
                        uniqueCode: this.props.user.uniqueCode,
                        userId: this.props.user.userId
                    }, 'initial').then((response) =>{
                        this.statusCode=response.status;
                        return response.json()
                    }).then((responseData) => {
                        console.log(responseData)
                            if(this.statusCode==200) {
                                this.props.saveCategories(responseData[0])
                                this.props.saveMessages(responseData[1])
                                this.props.saveUser(responseData[2][0])
                                this.props.initBookmark(responseData[3])
                                this.props.initProduct(responseData[4])
                                setTimeout(()=> {
                                    Actions.reset('drawer');
                                },500);
                                setTimeout(() => this.isInitial = false, 2000)
                            }else if(this.statusCode==401){
                                Actions.unauthorized();
                            }
                        }).catch((err) => {
                        console.log(err)
                        setTimeout(()=> this.isInitial=false,2000)
                    })
                }
            }
            else if (this.props.user.userId && !this.props.user.token) {
                setTimeout(()=>{
                    Actions.signuppage();
                },2000)
            } else {
                setTimeout(()=>{
                    Actions.loginpage();
                },2000)
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