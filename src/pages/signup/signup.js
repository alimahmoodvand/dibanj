import React, { Component } from 'react';
import HeaderLayout from "../../components/header/header";
import {Button, Container, Form, Input, Item, Label, Text} from "native-base";
import {Image, ScrollView, StyleSheet, View} from "react-native";
import {saveUser} from "../../redux/actions";
import {connect} from "react-redux";
import Http from "../../services/http";
import {Actions} from "react-native-router-flux";
import styles from "./singup.css";
import AlertMessage from "../../services/alertmessage";
import Loading from "../../components/laoding/laoding";

 class Signup extends Component{
     singup={
         "fullName":null,
         "username":"",
         "mobile": null,
         "password":"",
         "passwordRepeat":"",
         "email": "",
         "ostan": null,
         "city": null,
         "postalCode": null,
         "address": null,
     };
     state={
         loading:false,
     }
    render(){
        // console.log(this.props)
        this.singup.mobile=this.props.mobile;
        this.singup.userId=this.props.userId;
        return(
            <View style={styles.main}>
                <Loading visible={this.state.loading} />
                <Image style={styles.bgimage} source={require('../../assets/images/bg.jpg')}/>

                <View style={styles.container}>

                    <ScrollView>

                    <Form style={styles.signupForm}>
                        <View style={styles.logoContainer}>
                        <Image source={require("../../assets/images/dibanzhnew.png")} style={styles.logo}/>
                    </View>
                        <Label style={styles.labelText}> لطفا برای خود نام کاربری,ایمیل و رمز عبور انتخاب کنید. </Label>
                        <Item fixedLabel>
                            <Input style={styles.inputText} onChangeText={ (text) => this.singup.username = text }  />
                            <Label style={styles.labelText}>نام کاربری</Label>
                        </Item>
                        <Item fixedLabel>
                            <Input style={styles.inputText} keyboardType="email-address"  onChangeText={ (text) => this.singup.email = text }  />
                            <Label style={styles.labelText}>ایمیل</Label>
                        </Item>
                        <Item fixedLabel>
                            <Input style={styles.inputText} secureTextEntry={true} onChangeText={ (text) => this.singup.password = text }  />
                                                <Label style={styles.labelText}>رمزکاربری</Label>
                        </Item>
                        <Item fixedLabel>
                            <Input style={styles.inputText} secureTextEntry={true} onChangeText={ (text) => this.singup.passwordRepeat = text }  />
                                                <Label style={styles.labelText}>تکرار رمز </Label>
                        </Item>
                        <Button full style={styles.loginBtn} onPress={this._loginCheck}>
                            <Text style={styles.btnText}>ثبت نام</Text>
                        </Button>
                    </Form>
                    </ScrollView>
                </View>

            </View>
        );
    }
       _loginCheck=async()=> {
         console.log(this.singup)
           let error = '';
           let regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
           if (this.singup.password != this.singup.passwordRepeat) {
               error = 'notEqualPass'
           }
           if (this.singup.password.length < 8) {
               error = 'shortPass'
           }
           if (this.singup.email.trim().length==0||!regex.test(this.singup.email)) {
               error = 'emailInvalid'
           }
           if (this.singup.username.trim().length < 3) {
               error = 'shortUsername'
           }
           console.log(error)
           if (error == '') {
               this.setState({loading: true});
               let user = await Http._postAsyncData(this.singup, 'auth/register');
               if (user && user.userId) {
                   this.props.saveUser(user)
                   Actions.reset('drawer');
               }
               this.setState({loading: false});
           } else {
               new AlertMessage().error(error)
           }
       };
}

const mapDispatchToProps=dispatch=>{
     return{
         saveUser:user=>{
             dispatch(saveUser(user))
         }
     }
};
const mapStateToProps=state=>{
    return{
        user:state.user,
    }
};
export default connect(mapStateToProps,mapDispatchToProps)(Signup);