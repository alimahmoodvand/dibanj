import React, { Component } from 'react';
import HeaderLayout from "../../components/header/header";
import {Button, Container, Form, Input, Item, Label, Text} from "native-base";
import {Image, StyleSheet, View, PermissionsAndroid, ToastAndroid} from "react-native";
import {saveUser} from "../../redux/actions";
import {connect} from "react-redux";
import Http from "../../services/http";
import {Actions} from "react-native-router-flux";
import styles from "./verifycode.css";
import SmsListener from 'react-native-android-sms-listener'

 class VerifyCode extends Component{
     mobile;
     activationCode=null;
     listener=null;
     autoread=false;
     requestReadSmsPermission=async()=>{

         try {
             const granted = await PermissionsAndroid.request(
                 PermissionsAndroid.PERMISSIONS.RECEIVE_SMS,
                 {
                     title: "Auto Verification OTP",
                     message: "need access to read sms, to verify OTP"
                 }
             );
             if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                 console.log("sms read permissions granted", granted);
             } else {
                 console.log("sms read permissions denied", denied);
             }
         } catch (err) {
             console.warn(err);
         }
     }
     componentWillMount(){
         this.requestReadSmsPermission();
         this.listener=SmsListener.addListener(message => {
             let code=message.body.replace( /^\D+/g, '');
             console.log(message)
             if(parseInt(code)){
                 this.activationCode=code
                 this.autoread=true;
                 this.setState({
                     remining: this.state.remining === 0 ? this.state.remining : this.state.remining - 1
                 });
             }
             // console.log(this.activationCode)
         })
         this.setState({
             interval: setInterval(() => {
                 this.setState({
                     remining: this.state.remining === 0 ? this.state.remining : this.state.remining - 1
                 });
             }, 1000),
             remining:60,
             welcomeMessage:false
         })
     }
     componentWillUnmount() {
         this.listener.remove()
         clearInterval(this.state.interval);
     }
    render() {
        // console.log(this.props)
        const {mobile, activationCode} = this.props;
        this.mobile = mobile.toString();
        // this.activationCode=activationCode.toString();
        return (
            <View style={styles.main}>

                {!this.state.welcomeMessage &&
                <View style={styles.main}>
                    <Image style={styles.bgimage} source={require('../../assets/images/bg.jpg')}/>
                    <View style={styles.container}>
                        <View style={styles.logoContainer}>
                            <Image source={require("../../assets/images/dibanzhnew.png")} style={styles.logo}/>
                        </View>
                        <Form>
                            <Label style={styles.labelText}>کد تاييد به شماره تلفن همراه شما ارسال گردید</Label>
                            <Label style={styles.labelText}>تا {this.state.remining} ثانیه دیگر اعتبار دارد</Label>
                            <Label style={styles.labelText}>{mobile}</Label>
                            <Item fixedLabel>
                                {!this.autoread &&
                                <Input
                                    returnKeyType="go"
                                    maxLength={6}
                                    keyboardType="numeric"
                                    style={styles.inputText}
                                    onChangeText={(text) => {
                                        this.autoread = false;
                                        this.activationCode = text
                                    }}/>}
                                {this.autoread &&
                                <Input
                                    value={`${this.activationCode}`}
                                    style={styles.inputText}
                                    returnKeyType="go"
                                    maxLength={6}
                                    keyboardType="numeric"
                                    onChangeText={(text) => {
                                        this.autoread = false;
                                        this.activationCode = text
                                    }}/>}
                                <Label style={styles.labelText}>کد ورود</Label>
                            </Item>
                            <Button full style={styles.loginBtn} onPress={this._verifyCode}>
                                <Text style={styles.btnText}>ورود</Text>
                            </Button>
                        </Form>
                        <Button bordered style={[styles.loginBtn, {width: '50%', justifyContent: 'center'}]}
                                onPress={() => Actions.loginpage()}>
                            <Text style={styles.btnText}>تغییر شماره</Text>
                        </Button>
                        <Button bordered style={[styles.loginBtn, {width: '50%', justifyContent: 'center'}]}
                                onPress={() => {
                                    this._sendCode()
                                }}>
                            <Text style={styles.btnText}>ارسال دوباره</Text>
                        </Button>
                    </View>
                </View>
                }
                {
                    this.state.welcomeMessage &&
                    <Image style={styles.bgimage} source={require('../../assets/images/splash.jpg')}/>
                }
            </View>
        );
    }
     _verifyCode=async()=> {
         if(this.state.remining>0) {
             let data = {
                 mobile: this.mobile,
                 activationCode: this.activationCode,
             };
             // console.log(data)
             let user = await Http._postAsyncData(data, 'auth/checkVerification');
             // console.log(user)

             if (user.fullName) {
                 console.log("home")
                 this.props.saveUser(user);
                 clearInterval(this.state.interval);
                 ToastAndroid.showWithGravity(
                     'به دیبانژ خوش آمدید',
                     ToastAndroid.LONG,
                     ToastAndroid.CENTER
                 );
                 this.setState({welcomeMessage:true});
                 setTimeout(()=>Actions.reset('drawer'),2000)
             }
             else if(user&&!user.message){
                 console.log("signup")
                 Actions.signuppage({userId:user.userId,mobile:user.mobile});
             }else if(!user||user.message){
                 console.log("wrong")
                 alert("کد اشتباه است")

             }
         }else{
             alert("کد منقضی شد دوباره تلاش کنید")
         }
     };
     _sendCode=async()=>{
        let data={
             mobile:this.mobile
         }
         let user=await Http._postAsyncData(data,'auth/verification');
         // this.activationCode=user.activationCode;
         this.setState({remining: 60});
         // Actions.verfiycodepage({mobile:this.mobile,activationCode:user.activationCode});
     };
}

const mapDispatchToProps=dispatch=>{
     return{
         saveUser:user=>{
             dispatch(saveUser(user))
         }
     }
};
export default connect(null,mapDispatchToProps)(VerifyCode);