import React, { Component } from 'react';
import HeaderLayout from "../../components/header/header";
import {Button, Container} from "native-base";
import {FlatList, Image, Picker, Text, TextInput, View} from "react-native";
import styles from './workout.css'
import {Actions} from "react-native-router-flux";
import FIcon from 'react-native-vector-icons/FontAwesome';
import {SegmentedControls} from "react-native-radio-buttons";
import WorkoutReport from "../../components/workoutreport/workoutreport";
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
export default class Workout extends Component{
    _renderItem = (item, index) => {
        item['id'] = index;
        return (<WorkoutReport workout={item}/>);
    };
    render() {
        return (
            <View style={styles.main}>
                <Image style={styles.bgimage} source={require('../../assets/images/bg.jpg')}/>
                <HeaderLayout back={true}/>

                    <FlatList
                        data={SECTIONS}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({item, index}) =>
                            this._renderItem(item, index)
                        }
                    />
            </View>
        );
    }

}