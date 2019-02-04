import React, { Component } from 'react';
import HeaderLayout from "../../components/header/header";
import {Button, Container, Form, Input, Item, Label, Text,PermissionsAndroid } from "native-base";
import {Image, StyleSheet, View} from "react-native";
import {saveUser} from "../../redux/actions";
import {connect} from "react-redux";
import Http from "../../services/http";
import {Actions} from "react-native-router-flux";
import styles from "./login.css";
import Loading from "../../components/laoding/laoding";
import AlertMessage from "../../services/alertmessage";

 class Login extends Component{
      mobile=""
     state={
          loading:false,
     }
    render(){
        // console.log(this.props)

        return(
            <View style={styles.main}>
                <Loading visible={this.state.loading} />
                <Image style={styles.bgimage} source={require('../../assets/images/bg.jpg')}/>

                <View style={styles.container}>
                    <View style={styles.logoContainer}>
                        <Image source={require("../../assets/images/dibanzhnew.png")} style={styles.logo}/>
                    </View>

                    <Form>
                            <Label style={[styles.labelText,{textAlign:'center'}]}>ورود</Label>
                            <Item fixedLabel>

                            <Input placeholderTextColor={'#c7c7c7'} style={styles.inputText} keyboardType="numeric" onChangeText={ (text) => this.mobile = text } placeholder=' 09123456789'  />
                            <Label style={styles.labelText}>شماره تلفن :</Label>
                        </Item>
                        <Button  full style={styles.loginBtn} onPress={this._sendCode}>
                            <Text style={styles.btnText}>ادامه</Text>
                        </Button>
                        <Button bordered style={[styles.loginBtn, {width: '50%', justifyContent: 'center'}]}
                                onPress={() => Actions.signinpage()}>
                            <Text style={styles.btnText}>ورود با ایمیل</Text>
                        </Button>
                    </Form>
                </View>
            </View>
        );
    }
     _sendCode=async()=>{
          let regex=/09(0[0-9]|9[0-9]|1[0-9]|3[1-9]|2[1-9])-?[0-9]{3}-?[0-9]{4}/
          if(regex.test(this.mobile)){
              this.setState({loading:true});
               let data={
                  mobile:this.mobile
              }
                 let user=await Http._postAsyncData(data,'auth/verification');
               if(user){
                   Actions.verfiycodepage({mobile:this.mobile});
               }
               this.setState({loading:false});

          }else{
             new AlertMessage().error('phoneInvalid');
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
export default connect(null,mapDispatchToProps)(Login);