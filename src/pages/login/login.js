import React, { Component } from 'react';
import HeaderLayout from "../../components/header/header";
import {Button, Container, Form, Input, Item, Label, Text} from "native-base";
import {Image, StyleSheet, View} from "react-native";
import {saveUser} from "../../redux/actions";
import {connect} from "react-redux";
import Http from "../../services/http";
import {Actions} from "react-native-router-flux";
import styles from "./login.css";

 class Login extends Component{
      mobile=""
    render(){
        // console.log(this.props)

        return(
            <View style={styles.main}>

                <Image style={styles.bgimage} source={require('../../assets/images/bg.jpg')}/>

                <View style={styles.container}>
                    <View style={styles.logoContainer}>
                        <Image source={require("../../assets/images/dibanzh.png")} style={styles.logo}/>
                    </View>

                    <Form>

                        <Label style={styles.labelText}>ورود</Label>
                        <Item fixedLabel>
                            <Input keyboardType="numeric" onChangeText={ (text) => this.mobile = text }  />
                            <Label style={styles.labelText}>شماره تلفن</Label>
                        </Item>
                        <Button  full style={styles.loginBtn} onPress={this._sendCode}>
                            <Text>ادامه</Text>
                        </Button>
                    </Form>
                    <Button bordered style={styles.loginBtn} onPress={()=>Actions.signuppage()}>
                        <Text style={styles.labelText} >ثبت نام</Text>
                    </Button>
                </View>
            </View>
        );
    }
     _sendCode=async()=>{
        let data={
            mobile:this.mobile
        }
           let user=await Http._postAsyncData(data,'auth/verification');
           Actions.verfiycodepage({mobile:this.mobile,activationCode:user.activationCode});
     };
}

const mapDispatchToProps=dispatch=>{
     return{
         saveUser:user=>{
             dispatch(saveUser(user))
         }
     }
};
export default connect(null,mapDispatchToProps)(Login);