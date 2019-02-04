import React, { Component } from 'react';
import HeaderLayout from "../../components/header/header";
import {Button, Container} from "native-base";
import {Image, ImageBackground, Text, TouchableOpacity, View} from "react-native";
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
        const {workout,EAPtype}=this.props
        let style={backgroundColor:'white'}
        let status='حل نشده'
        if(workout.status==1){
            style.backgroundColor='#00000011'
            status='در حال بررسی'
        }else if(workout.status==2){
            style.backgroundColor='#5bff1d33'
            status='قبول'
        }else if(workout.status==-2){
            style.backgroundColor='#ff000a22'
            status='مردود'

        }
        return(
            <View style={styles.main}>
                {workout.status !== 0 &&
                <Button style={styles.buy} title={workout.id}
                        onPress={() => Actions.answer({
                            userCoursesExamAndPracticeId: workout.userCoursesExamAndPracticeId,
                            examAndPracticeId: workout.examAndPracticeId,
                            EAPStatus:workout.status
                        })}>
                    <Text style={styles.proBtnText}>سوابق پاسخ</Text>
                </Button>
                }
                {workout.status === 0 &&
                <Button style={styles.buy} title={workout.id}
                        onPress={() => Actions.practice({userCoursesExamAndPracticeId: workout.examAndPracticeId,ProductAndCourseId: workout.courseId,EAPtype})}>
                    <Text style={styles.proBtnText}>حل کردن</Text>
                </Button>
                }
                <View style={styles.content}>
                    <View style={[styles.practiceContainer,style]}>
                        <TouchableOpacity style={styles.practiceTitle}  onPress={()=>Actions.course({id:workout.courseId})}>
                            <Text style={styles.practiceTitleText}>
                                {workout.courseTitle}</Text>
                        </TouchableOpacity>
                        <View style={styles.practiceDescContainer}>
                            <TouchableOpacity style={styles.practiceDesc}  onPress={()=>{
                                if(workout.status !== 0){
                                    Actions.answer({
                                        userCoursesExamAndPracticeId: workout.userCoursesExamAndPracticeId,
                                        examAndPracticeId: workout.examAndPracticeId,
                                        EAPStatus:workout.status
                                    })
                                }else{
                                    Actions.practice({userCoursesExamAndPracticeId: workout.examAndPracticeId,ProductAndCourseId: workout.courseId,EAPtype})
                                }
                            }}>
                                <Text style={styles.practiceDescText}>
                                    {workout.title}</Text>
                                <Text style={styles.practiceDescText}>
                                    {' ( '+status+' ) '}</Text>
                            </TouchableOpacity>
                            <View style={styles.circleYellow}>
                                <Text style={styles.circleText}> {workout.id+1}</Text>
                            </View>
                        </View>
                        </View>
                </View>
                <Button style={styles.sample} title={workout.id} onPress={()=>Actions.course({id:workout.courseId})}>
                        <Text style={styles.proBtnText}>اطلاعات
                        دوره</Text>
                </Button>
            </View>
        );
    }
}