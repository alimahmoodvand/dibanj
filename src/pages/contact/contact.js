import React, { Component } from 'react';
import HeaderLayout from "../../components/header/header";
import {Button, Container} from "native-base";
import {FlatList, Image, Picker, Text, TextInput, View} from "react-native";
import styles from './contact.css'
import {connect} from "react-redux";
class Contact extends Component{
    render() {
        return (
            <View style={styles.main}>
                <Image style={styles.bgimage} source={require('../../assets/images/bg.jpg')}/>
                <HeaderLayout back={true}/>
                <Text>Contact page</Text>
            </View>
        );
    }

}
const mapStateToProps=state=>{
    return{
    }
};
export default connect(mapStateToProps,null)(Contact);