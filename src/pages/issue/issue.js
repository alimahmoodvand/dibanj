import React, { Component } from 'react';
import HeaderLayout from "../../components/header/header";
import {Button, Container} from "native-base";
import {FlatList, Image, Picker, ScrollView, Text, TextInput, TouchableOpacity, View} from "react-native";
import styles from './issue.css'
import {connect} from "react-redux";
import {DocumentPicker, DocumentPickerUtil} from "react-native-document-picker";
import AlertMessage from "../../services/alertmessage";
import ImagePicker from "react-native-image-crop-picker";
import {Actions} from "react-native-router-flux";
import Http from "../../services/http";
import Loading from "../../components/laoding/laoding";
class Issue extends Component{
    issue=null;
    file=null;
    state={
        loading:false
    }
    render() {
        return (
            <View style={styles.main}>
                <Loading visible={this.state.loading} />
                <Image style={styles.bgimage} source={require('../../assets/images/bg.jpg')}/>
                <HeaderLayout back={true}/>
                <View style={styles.headerContainer}>
                    <View style={styles.header}>
                        <Text>مشکلات اپلیکیشن</Text>
                    </View>
                </View>
                <ScrollView style={styles.content}>
                    <View style={styles.issueContainer}>
                        <TextInput
                            style={styles.issueInput}
                            multiline={true}
                            numberOfLines={10}
                            onChangeText={(text) => this.issue=text}
                            placeholder={"اگه مشکل که توی اپلیکیشن دیدی به ما بگو"}
                            />
                        <View style={styles.buttonContainer}>
                        <TouchableOpacity style={styles.uploadBtn} title={0}  onPress={() => {
                            ImagePicker.openPicker({
                                width: 300,
                                height: 300,
                                cropping: true
                            }).then(image => {
                                this.file=image;
                            })

                        }}>
                            <Text style={styles.uploadBtnText}>افزودن فایل</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.doneBtn} title={0} onPress={() =>{this._sendIssue();}}>
                            <Text style={styles.uploadBtnText}>ثبت مشکل</Text>
                        </TouchableOpacity>
                    </View>
                    </View>
                </ScrollView>
            </View>
        );
    }
    _sendIssue=async()=>{
        if(!this.issue){

        }else{
            let files=[];
            if(this.file) {
                let image = this.file;
                let path = image.path.split('/');
                image.type = image.mime;
                image.uri = image.path;
                image.fileName = path[path.length - 1];
                files.push(image)
            }
            this.setState({loading:true});
            Http._postFilePromise({
                token: this.props.user.token,
                uniqueCode: this.props.user.uniqueCode,
                issue: this.issue,
                userId: this.props.user.userId
            }, files, 'insertIssue')
                .then((response) =>{
                    this.statusCode=response.status;
                    return   response.json()
                }).then(response => {
                    console.log(response)
                if (this.statusCode === 200) {
                    new AlertMessage().error('issueDone')
                    Actions.homep();

                } else if (this.statusCode === 401) {
                    Actions.unauthorized();
                }
                this.setState({loading: false});
            }).catch(err => {
                this.setState({loading:false});
                new AlertMessage().error('serverError',err.message?err.message:'')
            })
        }
    }
}
const mapStateToProps=state=>{
    return{
        user:state.user,
    }
};
export default connect(mapStateToProps,null)(Issue);