import React, { Component } from 'react';
import {
    Image,
    StyleSheet,
} from 'react-native';
import {Container, Header, Left, View, Right, Body, Title, Spinner, Text} from "native-base";

export default class Loading extends Component {
    render() {
        let myComponent=<View style={styles.hidden}><Text> </Text></View>
        if(this.props.visible) {
            myComponent=<View style={styles.main}>
                <View style={styles.loadingContainer}>
                    <Text >لطفا منتظر بمانید...</Text>
                    <Spinner />
                </View>
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
        // backgroundColor:'#afff00',
        backgroundColor:'rgba(0,0,0,0)',
        // backgroundColor:'white',
        width:'100%',
        height:'100%',
        alignItems:'center',
        justifyContent:'center',
        zIndex:2000,
    },
    loadingContainer:{
        backgroundColor:'rgb(255, 200, 0)',
        flexDirection:'row',
        width:'80%',
        alignItems:'center',
        justifyContent:'center',
    },
    hidden:{
        backgroundColor:'rgba(0,0,0,0)',
        width:0,
        height:0,
    },
    bgimage:{
        width:200,
        height:200,
    }
});
