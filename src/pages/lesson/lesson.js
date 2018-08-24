import React, { Component } from 'react';
import HeaderLayout from "../../components/header/header";
import {Button, Container} from "native-base";
import {FlatList, Image, Picker, ScrollView, Text, TextInput, View, WebView} from "react-native";
import styles from './lesson.css'
import {connect} from "react-redux";
import HTML from 'react-native-render-html';
import http from "../../services/http";

class Lesson extends Component{
    render() {
        let uri=http.baseurl+"videoRenderer/"+this.props.ProductAndCourseId+"/"+this.props.isSample
        console.log(uri);
        return (
            <View style={styles.main}>
                <Image style={styles.bgimage} source={require('../../assets/images/bg.jpg')}/>
                <HeaderLayout back={true}/>
                <View style={styles.content}>
                    <ScrollView>
                        <WebView
                            // automaticallyAdjustContentInsets={false}
                            source={{uri: uri}}
                            style={styles.contentRender}
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