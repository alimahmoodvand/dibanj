import React, { Component } from 'react';
import HeaderLayout from "../../components/header/header";
import {Button, Container} from "native-base";
import {Image, ImageBackground, Text, View} from "react-native";
import styles from './workoutreport.css'
import {Actions} from "react-native-router-flux";
import FIcon from 'react-native-vector-icons/FontAwesome';
import MIcon from 'react-native-vector-icons/MaterialIcons';;

export default class WorkoutReport extends Component{
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
                <View style={styles.basket}>
                    <MIcon name="shopping-basket" color="white" size={25}/>
                </View>
            </View>
        );
    }
    render(){
        const {workout}=this.props
        return(
            <View style={styles.main}>
                <Button style={styles.buy} title={workout.id} onPress={()=>Actions.practice()}>
                <Text style={styles.proBtnText}>سوابق
                    پاسخ
                </Text>
                </Button>
                <View style={styles.content}>

                    <View style={styles.practiceContainer}>
                        <View style={styles.practiceTitle}>
                            <Text style={styles.practiceTitleText}>
                                {workout.title}</Text>
                        </View>
                        <View style={styles.practiceDescContainer}>
                            <View style={styles.practiceDesc}>
                                <Text style={styles.practiceDescText}>
                                    {workout.title}</Text>
                            </View>
                            <View style={styles.circleYellow}>
                                <Text style={styles.circleText}> {workout.id}</Text>
                            </View>
                        </View>
                        </View>
                </View>
                <Button style={styles.sample} title={workout.id} onPress={()=>Actions.course({id:prod.productAndCourseId})}>
                    <Text style={styles.proBtnText}>اطلاعات
                        دوره</Text>
                </Button>
            </View>
        );
    }
}