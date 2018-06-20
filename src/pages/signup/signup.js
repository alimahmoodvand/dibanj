import React, { Component } from 'react';
import HeaderLayout from "../../components/header/header";
import {Button, Container, Form, Input, Item, Label, Text} from "native-base";
import {Image, ScrollView, StyleSheet, View} from "react-native";
import {saveUser} from "../../redux/actions";
import {connect} from "react-redux";
import Http from "../../services/http";
import {Actions} from "react-native-router-flux";
import styles from "./singup.css";

 class Signup extends Component{
     singup={
         "fullName":null,
         "username":"siamak",
         "mobile": null,
         "password":"12345",
         "email": null,
         "ostan": null,
         "city": null,
         "postalCode": null,
         "address": null,
     };
    render(){
        // console.log(this.props)
        this.singup.mobile=this.props.user.mobile;
        this.singup.userId=this.props.user.userId;
        return(
            <View style={styles.main}>

                <Image style={styles.bgimage} source={require('../../assets/images/bg.jpg')}/>

                <View style={styles.container}>
                    <ScrollView>
                    <Form style={styles.signupForm}>
                        <Label style={styles.labelText}> ثبت نام</Label>

                        {/*<Item fixedLabel>*/}
                            {/*<Input onChangeText={ (text) => this.singup.fullName = text }  />*/}
                            {/*<Label style={styles.labelText}>نام کامل</Label>*/}
                        {/*</Item>*/}

                        <Item fixedLabel>
                            <Input value={this.singup.username} onChangeText={ (text) => this.singup.username = text }  />
                            <Label style={styles.labelText}>نام کاربری</Label>
                        </Item>

                        {/*<Item fixedLabel>*/}
                            {/*<Input onChangeText={ (text) => this.singup.email = text }  />*/}
                            {/*<Label style={styles.labelText}>ایمیل</Label>*/}
                        {/*</Item>*/}
                        <Item fixedLabel>
                            <Input value={this.singup.password} onChangeText={ (text) => this.singup.password = text }  />
                                                <Label style={styles.labelText}>رمزکاربری</Label>

                        </Item>

                        {/*<Item fixedLabel>*/}
                            {/*<Input onChangeText={ (text) => this.singup.mobile = text }  />*/}
                            {/*<Label style={styles.labelText}>شماره تلفن</Label>*/}
                        {/*</Item>*/}

                        {/*<Item fixedLabel>*/}
                            {/*<Input onChangeText={ (text) => this.singup.ostan = text }  />*/}
                            {/*<Label style={styles.labelText}>استان</Label>*/}
                        {/*</Item>*/}
                        {/*<Item fixedLabel>*/}
                            {/*<Input onChangeText={ (text) => this.singup.city = text } />*/}
                            {/*<Label style={styles.labelText}>شهر</Label>*/}
                        {/*</Item>*/}
                        {/*<Item fixedLabel>*/}
                            {/*<Input onChangeText={ (text) => this.singup.postalCode = text } />*/}
                            {/*<Label style={styles.labelText}>کدپستی</Label>*/}
                        {/*</Item>*/}
                        {/*<Item fixedLabel>*/}
                            {/*<Input multiline={true} onChangeText={ (text) => this.singup.address = text } />*/}
                            {/*<Label style={styles.labelText}>آدرس</Label>*/}
                        {/*</Item>*/}
                        <Button full style={styles.loginBtn} onPress={this._loginCheck}>
                            <Text>ثبت نام</Text>
                        </Button>
                    </Form>
                    <Button bordered style={styles.loginBtn} onPress={()=>Actions.loginpage()}>
                        <Text style={styles.labelText} >ورود</Text>
                    </Button>
                    </ScrollView>
                </View>

            </View>
        );
    }
       _loginCheck=async()=>{
        // data={
        //     email:'a@a.a',
        //     password:'123',
        // }
           let user=await Http._postAsyncData(this.singup,'auth/register');
           // console.log("user",this.singup)
           // console.log("user",user)
           if(user.userId){
               this.props.saveUser(user)
               Actions.reset('drawer');
           }else{
               alert("error")
           }

        // console.log("user",user)
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