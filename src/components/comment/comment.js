import React, { Component } from 'react';
import HeaderLayout from "../../components/header/header";
import {Button, Container} from "native-base";
import {Image, ImageBackground, Text, View} from "react-native";
import styles from './comment.css'
import {Actions} from "react-native-router-flux";
import MIcon from 'react-native-vector-icons/MaterialIcons';
import Http from "../../services/http";

export default class CommentComp extends Component{
    render(){
        // console.log(this.props)
        const {cmnt,deleteComment,userId}=this.props
        // console.log(cmnt,"comment")
        return(
            <View >
                <View>
                    <Image source={{uri:cmnt.image}}/>
                    <View >
                        <View style={styles.commentTitle}>
                            {userId==cmnt.UserId&&
                            (<MIcon name="delete-forever" onPress={()=>{
                                deleteComment(cmnt);
                            }} color="red" size={25}/>)
                            }
                            <Text style={styles.comment}>{cmnt.persianCreatedAt}</Text>
                            <Text> {cmnt.fullName}</Text>
                        </View>
                        <Text>{cmnt.Comment}</Text>
                    </View>
                </View>
            </View>
        );
    }
}