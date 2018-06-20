import React, { Component } from 'react';
import HeaderLayout from "../../components/header/header";
import {Container, Text} from "native-base";
import {Image, StyleSheet, View} from "react-native";
import {connect} from "react-redux";
import {Actions} from "react-native-router-flux";
import Http from "../../services/http";
import {saveCategories} from "../../redux/actions";
// import OneSignal from "react-native-onesignal";

 class Splash extends Component{
     // componentWillMount() {
     //     OneSignal.init("4b8d0056-617c-4b04-8e72-0cd5de9a0d23");
     //     OneSignal.addEventListener('ids', this.onIds);
     //
     //     OneSignal.addEventListener('received', this.onReceived);
     //     OneSignal.addEventListener('opened', this.onOpened);
     // }
     //
     // onReceived(notification) {
     //     console.log("Notification received: ", notification);
     // }
     //
     // onOpened(openResult) {
     //     console.log('Message: ', openResult.notification.payload.body);
     //     console.log('Data: ', openResult.notification.payload.additionalData);
     //     console.log('isActive: ', openResult.notification.isAppInFocus);
     //     console.log('openResult: ', openResult);
     // }
     // onIds(device) {
     //     console.log('Device info: ', device);
     // }

    render(){
       if(this.props.rehydrated)
        {
            if (this.props.user.token) {

                Http._postDataPromise({token:this.props.user.token},'categories').then((response) => response.json())
                    .then((responseData) => {
                        this.props.saveCategories(responseData)
                        Actions.reset('drawer')

                    })
            }
            else if (this.props.user.userId&&!this.props.user.token) {
                    Actions.signuppage();
            } else {
                    Actions.loginpage();
            }
        }
        return(
            <View style={styles.container}>
                <Image style={styles.bgimage} source={require('../../assets/images/splash.jpg')}/>
                <View style={styles.content}>
                    <Image source={require("../../assets/images/dibanzh.png")} style={styles.logo}/>
                </View>
            </View>
        );
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
        width:150,
        height:75,
        // backgroundColor:'blue'
    },
    container:{
        flex:1,backgroundColor:'rgba(0,0,0,0)'
    },
    content:{flex:1,backgroundColor:'rgba(0,0,0,0)',justifyContent:'center',alignItems:'center'}
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
        }
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(Splash)