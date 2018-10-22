import React, { Component } from 'react';
import HeaderLayout from "../../components/header/header";
import {Button, Container, Form, Input, Item, Label, Text} from "native-base";
import {Image, StyleSheet, View, PermissionsAndroid, ToastAndroid} from "react-native";
import {saveUser} from "../../redux/actions";
import {connect} from "react-redux";
import Http from "../../services/http";
import {Actions} from "react-native-router-flux";
import styles from "./signin.css";
import SmsListener from 'react-native-android-sms-listener'
import Loading from "../../components/laoding/laoding";
import AlertMessage from "../../services/alertmessage";

 class Signin extends Component{
     componentWillMount(){
         this.setState({
             welcomeMessage:false,
             loading:false
         })
     }
     componentWillUnmount() {
     }
     email="";
     password="";
    render() {
        return (
            <View style={styles.main}>
                <Loading visible={this.state.loading} />
                {!this.state.welcomeMessage &&
                <View style={styles.main}>
                    <Image style={styles.bgimage} source={require('../../assets/images/bg.jpg')}/>
                    <View style={styles.container}>
                        <View style={styles.logoContainer}>
                            <Image source={require("../../assets/images/dibanzhnew.png")} style={styles.logo}/>
                        </View>
                        <Form>
                            <Label style={styles.labelText}>ایمیل و رمز عبور خود را وارد کنید</Label>
                            <Item fixedLabel>
                                <Input style={styles.inputText} keyboardType="email-address"  onChangeText={ (text) => this.email = text }  />
                                <Label style={styles.labelText}>ایمیل</Label>
                            </Item>
                            <Item fixedLabel>
                                <Input style={styles.inputText} secureTextEntry={true} onChangeText={ (text) => this.password = text }  />
                                <Label style={styles.labelText}>رمزکاربری</Label>
                            </Item>
                            <Button title={1} full style={styles.loginBtn} onPress={()=>{
                                this._signin();
                            }}>
                                <Text style={styles.btnText}>ورود</Text>
                            </Button>
                        </Form>
                        <Button  title={2} bordered style={[styles.loginBtn, {width: '50%', justifyContent: 'center'}]}
                                onPress={() => Actions.pop()}>
                            <Text style={styles.btnText}>بازگشت</Text>
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
     _signin=async()=> {
        // alert(":::::"+this.email+this.password)
         let error='';
         let regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

         // if (this.password.length < 8) {
         //     error = 'shortPass'
         // }
         if (this.email.trim().length==0||!regex.test(this.email)) {
             error = 'emailInvalid'
         }
         // console.log(error,"::::::::::::::::::::",this.email,this.password)
         if(error=='') {
             this.setState({loading:true});
             let data = {
                 email: this.email,
                 password: this.password,
             };
             let user = await Http._postAsyncData(data, 'auth/login');
             if (user&&user.fullName) {
                 this.props.saveUser(user);
                 ToastAndroid.showWithGravity(
                     '"به رسانه نوین آموزشی دیبانژ" خوش آمدید.',
                     ToastAndroid.LONG,
                     ToastAndroid.CENTER
                 );
                 this.setState({welcomeMessage:true});
                 setTimeout(()=>Actions.reset('drawer'),3000)
             }else{
                 new AlertMessage().error('notFound')
             }
         }else{
             new AlertMessage().error(error)
         }
         this.setState({loading:false});
    };
}

const mapDispatchToProps=dispatch=>{
     return{
         saveUser:user=>{
             dispatch(saveUser(user))
         }
     }
};
export default connect(null,mapDispatchToProps)(Signin);