import React, { Component } from 'react';
import HeaderLayout from "../../components/header/header";
import {Button, Container} from "native-base";
import {Image, ImageBackground, Text, View} from "react-native";
import styles from './windowproduct.css'
import {Actions} from "react-native-router-flux";
import FIcon from 'react-native-vector-icons/FontAwesome';

export default class WindowProduct extends Component{
    _getNotExistImage(prod){
        return(
            <Image style={styles.image} source={require('./../../assets/images/bg.jpg')}/>
        );
    }
    _getPrices(prod){
        return(
            <View style={styles.prices}>
                <Text style={{textDecorationLine: 'line-through', textDecorationStyle: 'solid'}}>
                    Solid line-through
                </Text>
                <Text>{prod.teacher}</Text>
                <Text>{prod.deadline.getTime().toString()}</Text>
                <FIcon name="shopping-basket" color="yellow" size={20}/>
            </View>
        );
    }
    render(){
        const {prod}=this.props
        // console.log(this.props)
        return(
            <View style={styles.main}>
                <View style={styles.content}>
                    <Image style={styles.image} source={{uri:prod.image}}/>
                    <View style={styles.details}>
                        <Text style={styles.detailsText}>{prod.title}</Text>
                    </View>
                </View>
            </View>
        );
    }
}