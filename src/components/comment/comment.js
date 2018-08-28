import React, { Component } from 'react';
import HeaderLayout from "../../components/header/header";
import {Button, Container} from "native-base";
import {Image, ImageBackground, Text, TouchableOpacity, View} from "react-native";
import styles from './comment.css'
import {Actions} from "react-native-router-flux";
import MIcon from 'react-native-vector-icons/MaterialIcons';
import Http from "../../services/http";
import Stars from "react-native-stars-rating";

export default class CommentComp extends Component{
    render(){
        // console.log(this.props)
        const {cmnt,deleteComment,userId}=this.props
        // console.log(cmnt,"comment")
        return(
            <View >
                <View>
                    <View >
                        <View style={styles.commentTitle}>
                            <View style={styles.infoContainer}>
                                <TouchableOpacity onPress={() =>{Actions.user({userId:cmnt.userId,isUser:true})}} style={styles.nameContainer}>
                                <Text style={styles.name}> {cmnt.fullName}</Text>
                                </TouchableOpacity>
                                <View style={styles.otherContainer}>
                                    {userId==cmnt.UserId&&
                                (<MIcon name="close" onPress={()=>{
                                    deleteComment(cmnt);
                                }} color="red" size={20}/>)
                                }
                                <Text style={styles.comment}>{cmnt.persianCreatedAt.split(' ')[0]}</Text>
                                    <Stars
                                        isActive={false}
                                        rateMax={5}
                                        isHalfStarEnabled={true}
                                        onStarPress={(rating) => {}}
                                        rate={cmnt.Rate}
                                        size={20}
                                    />

                                </View>
                            </View>
                            <TouchableOpacity onPress={() =>{Actions.user({userId:cmnt.userId,isUser:true})}} style={styles.userImage}>
                            <Image source={{uri:cmnt.imageUrl}} style={styles.userImage}/>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.commentContainer}>
                            <Text>{cmnt.Comment}</Text>
                        </View>
                    </View>
                </View>
            </View>
        );
    }
}