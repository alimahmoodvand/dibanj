import React, { Component } from 'react';
import {
    StyleSheet,
} from 'react-native';
import {Container, Header, Left, View, Right, Body, Title, Spinner, Text} from "native-base";

export default class Loading extends Component {
    render() {
        let myComponent=<View style={styles.hidden}><Text> </Text></View>
        if(this.props.visible) {
            myComponent=<View style={styles.main}>
                <Spinner/>
            </View>
        }
        return (
            myComponent
        );
    }
}
const styles = StyleSheet.create({
    main:{
        position:'absolute',
        // backgroundColor:'#0002ff',
        backgroundColor:'rgba(0,0,0,0)',
        width:'100%',
        height:'100%',
        alignItems:'center',
        justifyContent:'center',
        zIndex:2000,
    },
    hidden:{
        backgroundColor:'rgba(0,0,0,0)',
        width:0,
        height:0,
    }
});
