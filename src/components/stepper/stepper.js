import React, { Component } from 'react';
import HeaderLayout from "../../components/header/header";
import {Button, Container, Input} from "native-base";
import {Image, ImageBackground, Picker, Text, TouchableHighlight, TouchableOpacity, View} from "react-native";
import styles from './stepper.css'
import {Actions} from "react-native-router-flux";
import FIcon from 'react-native-vector-icons/FontAwesome';
export default class Stepper extends Component {
    practices=[];
    courses=[];
    render() {
        const {pacs}=this.props;
        // this.courses=pacs[1];
        // this.practices=pacs[0];
        return (
            <View style={styles.container}>
                    {
                        pacs.map((item,index)=>{
                          return  this._renderSteps(item,index);
                            }
                        )

                    }
            </View>
        )
    };

    _renderSteps=(item,index)=> {
        return (
            <View key={index} style={styles.steps}>
            <TouchableOpacity style={styles.train} onPress={()=>Actions.practice({userCoursesExamAndPracticeId:item.practice,ProductAndCourseId:item.ProductAndCourseId,EAPtype:2})}>
                <Text>{item.practice?"تمرین":""}</Text>
            </TouchableOpacity>
                <TouchableOpacity style={styles.train} onPress={()=>Actions.practice({userCoursesExamAndPracticeId:item.exam,ProductAndCourseId:item.ProductAndCourseId,EAPtype:1})}>
                <Text>{item.exam?"آزمون":""}</Text>
            </TouchableOpacity>
                <TouchableOpacity style={styles.title} >
                    <Text>{(index+1).toString()+"جلسه "}</Text>
                </TouchableOpacity>
                <View style={styles.circles}>
                    {this._renderCircle(index, 2)}
                    {this._renderLine(index, 2)}
                </View>

            </View>
        );
    }
    _renderLine=(index,active)=>{
        // if(index< active)
        {
            if (index > active||index === active) {
                return (<View style={styles.lineGray}>
                </View>);
            }
            else {
                return (<View style={styles.lineYellow}>
                </View>);
            }
        }
    }
    _renderCircle=(index,active)=>{
            if (index > active) {
                return (<View style={styles.circleGray}>
                    <Text style={styles.circleText}>{index+1}</Text>
                </View>);
            }
            else {
                return (<View style={styles.circleYellow}>
                    <Text style={styles.circleText}>{index+1}</Text>
                </View>);
            }
    }
}