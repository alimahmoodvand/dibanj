import React, { Component } from 'react';
import HeaderLayout from "../../components/header/header";
import {Button, Container} from "native-base";
import {Image, Picker, Text, TextInput, View} from "react-native";
import styles from './practice.css'
import {Actions} from "react-native-router-flux";
import FIcon from 'react-native-vector-icons/FontAwesome';
import {SegmentedControls} from "react-native-radio-buttons";
const SECTIONS = [
    {title:"home",content:new Date()
        ,image:{uri:"https://roocket.ir/public/image/2016/1/20/wordpress-cover-2.png"}},
    {title:"home",content:new Date()
        ,image:{uri:"https://roocket.ir/public/image/2016/1/20/wordpress-cover-2.png"}},
    {title:"home",content:new Date()
        ,image:{uri:"https://roocket.ir/public/image/2016/1/20/wordpress-cover-2.png"}},
    {title:"home",content:new Date()
        ,image:{uri:"https://roocket.ir/public/image/2016/1/20/wordpress-cover-2.png"}},
    {title:"home",content:new Date()
        ,image:{uri:"https://roocket.ir/public/image/2016/1/20/wordpress-cover-2.png"}},
];
export default class Practice extends Component{
    render() {
        return (
            <View style={styles.main}>
                <Image style={styles.bgimage} source={require('../../assets/images/bg.jpg')}/>
                <HeaderLayout back={true}/>
                <View style={styles.content}>
                    <View style={styles.practiceContainer}>
                        <View style={styles.practiceTitle}>
                            <Text style={styles.practiceTitleText}>
                                practices section one</Text>
                        </View>
                        <View style={styles.practiceDescContainer}>
                            <View style={styles.practiceDesc}>
                            <Text style={styles.practiceDescText}>
                                practices section one</Text>
                            </View>
                            <View style={styles.circleYellow}>
                                <Text style={styles.circleText}>0</Text>
                            </View>
                        </View>
                        <View style={styles.practiceQuestionContainer}>

                            {
                                SECTIONS.map((item,index)=>{
                                        return  this._renderQuestion(item,index);
                                    }
                                )

                            }
                        </View>
                        <View style={styles.uploadBtnSection}>
                            <Button small style={styles.uploadBtn} title={0} onPress={() => alert('sakhca')}>
                                <Text style={styles.uploadBtnText}>upload</Text>
                            </Button>
                        </View>
                    </View>

                </View>
            </View>
        );
    }
    _renderQuestion(item,index){
        return(
            <View key={index} style={styles.practiceQuestion}>
                <View style={styles.practiceQuestionTitle}>
                <Text style={styles.practiceQuestionTitleText}>
                    question {index}</Text>
                </View>
                <View style={styles.question}>
                    <Text style={styles.questionText}>
                        {item.title}</Text>
                    <TextInput
                        style={styles.questionInput}
                        multiline
                        underlineColorAndroid='rgba(0,0,0,0)'
                        placeholder={item.title.toString()}
                        editable = {true}
                        maxLength = {40}
                    />
                    <Button small style={styles.uploadBtn} title={0} onPress={() => alert('sakhca')}>
                        <Text style={styles.uploadBtnText}>upload</Text>
                    </Button>
                </View>
            </View>
        );
    }
}