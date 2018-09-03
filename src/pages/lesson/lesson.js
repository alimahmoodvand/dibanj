import React, { Component } from 'react';
import HeaderLayout from "../../components/header/header";
import {Button, Container, Spinner} from "native-base";
import {FlatList, Image, Picker, ScrollView, Text, TextInput, View} from "react-native";
import styles from './lesson.css'
import {connect} from "react-redux";
//import HTML from 'react-native-render-html';
import http from "../../services/http";
import {Actions} from "react-native-router-flux";
import MIcon from 'react-native-vector-icons/MaterialIcons';
import WebView from 'react-native-android-fullscreen-webview-video';

class Lesson extends Component{
    handleMessage=(res)=>{
        console.log(res)
    }
    render() {
        let uri=http.baseurl+"videoRenderer/"+this.props.ProductAndCourseId+"/"+this.props.isSample;
        // console.log(uri);
        return (
            <View style={styles.main}>
                <Image style={styles.bgimage} source={require('../../assets/images/bg.jpg')}/>
                <HeaderLayout back={false}/>
                <View style={styles.content}>
                    <View style={styles.logoContainer}>
                        <View style={styles.closeIcon}>
                            <MIcon name="close"  onPress={() => Actions.pop()} color="#ffa700" size={25}/>
                        </View>
                        <View style={styles.logoCenter}>
                            <Image source={require("../../assets/images/dibanzhnew.png")} style={styles.logo}/>
                        </View>
                    </View>

                    <ScrollView>
                        <WebView
                            source={{uri: uri}}
                            style={styles.contentRender}
                                startInLoadingState={true}
                            renderLoading={()=>{return <Spinner/>}}
                        />
                    </ScrollView>
                </View>
            </View>
        );
    }
}
const mapStateToProps=state=>{
    return{
        user:state.user,
    }
};
export default connect(mapStateToProps,null)(Lesson);