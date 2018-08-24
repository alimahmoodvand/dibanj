import React, { Component } from 'react';
import HeaderLayout from "../../components/header/header";
import {Button, Container, Form, Input, Item, Label, Text} from "native-base";
import {Image, StyleSheet, View} from "react-native";
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
     componentWillMount(){
         this.listener=SmsListener.addListener(message => {
             let code=message.body.replace( /^\D+/g, '');
             // console.log(message)
             if(parseInt(code)){
                 this.activationCode=code
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
             remining:60
         })
     }
     componentWillUnmount() {
         this.listener.remove()
         clearInterval(this.state.interval);
     }
    render(){
        // console.log(this.props)
        const {mobile, activationCode}=this.props;
        this.mobile=mobile.toString();
        // this.activationCode=activationCode.toString();
        return(
            <View style={styles.main}>

                <Image style={styles.bgimage} source={require('../../assets/images/bg.jpg')}/>

                <View style={styles.container}>
                    <View style={styles.logoContainer}>
                        <Image source={require("../../assets/images/dibanzh.png")} style={styles.logo}/>
                    </View>
                    <Form>
                            <Label style={styles.labelText}>کد تاييد به شماره تلفن همراه شما ارسال گردید</Label>
                            <Label style={styles.labelText}>تا {this.state.remining} ثانیه دیگر اعتبار دارد</Label>
                            <Label style={styles.labelText}>{mobile}</Label>
                        <Item fixedLabel>
                            {this.activationCode==null&&
                            <Input
                                returnKeyType="go"
                                maxLength={6}
                                keyboardType="numeric"
                                onChangeText={ (text) => this.activationCode = text }  />}
                            {this.activationCode!=null&& <Input value={`${this.activationCode}`} returnKeyType="go"
                                                                maxLength={6} keyboardType="numeric" onChangeText={ (text) => this.activationCode = text }  />}
                            <Label style={styles.labelText}>کد ورود</Label>
                        </Item>
                            <Button full style={styles.loginBtn} onPress={this._verifyCode}>
                                <Text>ورود</Text>
                            </Button>
                    </Form>
                    <Button bordered style={styles.loginBtn} onPress={()=>Actions.loginpage()}>
                        <Text style={styles.labelText} >تغییر شماره</Text>
                    </Button>
                    <Button bordered style={styles.loginBtn} onPress={()=>{this._sendCode}}>
                        <Text style={styles.labelText} >ارسال دوباره</Text>
                    </Button>
                </View>
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
             this.props.saveUser(user);
             clearInterval(this.state.interval);
             if (user.username||user.token) {
                 Actions.reset('drawer');
             }
             else {
                 Actions.reset();
             }
         }else{
             alert("کد منقضی شد دوباره تلاش کنید")
         }
     };
     _sendCode=async()=>{
        let data={
             mobile:this.mobile
         }
         let user=await Http._postAsyncData(data,'login');
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