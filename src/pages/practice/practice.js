import React, { Component } from 'react';
import HeaderLayout from "../../components/header/header";
import {Button, Container} from "native-base";
import {Image, Picker, ScrollView, Text, TextInput, View} from "react-native";
import styles from './practice.css'
import {Actions} from "react-native-router-flux";
import FIcon from 'react-native-vector-icons/FontAwesome';
import {SegmentedControls} from "react-native-radio-buttons";
import Http from "../../services/http";
import {connect} from "react-redux";
import RadioForm,{} from "react-native-simple-radio-button";
import {DocumentPicker, DocumentPickerUtil} from "react-native-document-picker";
class Practice extends Component{
    _getQuestions=async()=>{

        let response = await Http._postAsyncData({
            userId:this.props.user.userId,
            token:this.props.user.token,
            userCoursesExamAndPracticeId:this.props.userCoursesExamAndPracticeId,
        },'getQuestions');
        if (Array.isArray(response)) {
            this.questions=response;
            this.setState({changeUI:this.state.changeUI+1})
        }
    };
    questions=[];
    componentWillMount() {
        this.setState({changeUI:1})
        this._getQuestions();
        // console.log("scdjhbjhbjhsvddZsd")
    }
    _findQuestions=(question)=>{
       let tmp=[];
       this.questions.map((item,index)=>{
           if(item.QuestionId==question.QuestionId&&question.QuestionOptionId!=item.QuestionOptionId){
               item.label=item.title;
               item.value=item.QuestionOptionId;
               tmp.push(item)
           }
       })
        return tmp;
    }
    answers=[];
    files=[];
    render() {
        console.log(this.questions.filter((item,index)=>{
            if(item.sortNumber==-1){
                return item;
            }
        }))
        return (
            <View style={styles.main}>
                <Image style={styles.bgimage} source={require('../../assets/images/bg.jpg')}/>
                <HeaderLayout back={true}/>
                <View style={styles.content}>
                    <ScrollView style={styles.practiceContainer}>
                        <View style={styles.practiceTitle}>
                            <Text style={styles.practiceTitleText}>
                                {this.questions.length>0?this.questions.Title:""}</Text>
                        </View>
                        <View style={styles.practiceQuestionContainer}>

                            {
                                this.questions.filter((item,index)=>{
                                if(item.sortNumber===-1){

                                return item;
                            }
                            }).map((question,index)=>{
                                let options=this._findQuestions(question)
                                       // tmp.map((child,index)=>{
                                            return  this._renderQuestion(question,options,index);
                                        //})
                                    }
                                )

                            }
                        </View>
                        <View style={styles.uploadBtnSection}>
                            <Button small style={styles.uploadBtn} title={0} onPress={() =>this._sendAnswer()}>
                                <Text style={styles.uploadBtnText}>انجام</Text>
                            </Button>
                        </View>
                    </ScrollView>

                </View>
            </View>
        );
    }

    _renderQuestion=(question,options,index)=>{
        return(
            <View key={index} style={styles.practiceQuestion}>
                <View style={styles.practiceQuestionTitle}>
                <Text style={styles.practiceQuestionTitleText}>
                   سوال شماره {index+1}</Text>
                </View>
                <View style={styles.question}>
                    <Text style={styles.questionText}>
                        {question.title}</Text>
                    {
                        options.length == 0 &&
                        (<TextInput
                            style={styles.questionInput}
                            multiline
                            underlineColorAndroid='rgba(0,0,0,0)'
                            placeholder="جواب سوال ..."
                            editable={true}
                            maxLength={40}
                            onChangeText={(text) => {
                                question.textAnswer = text;
                                this.answers[index] = question;
                            }}
                        />)
                    }
                    {
                        options.length > 0 &&
                        <RadioForm
                            buttonColor='yellow'
                            formHorizontal={false}
                            radio_props={options}
                            // initial={0}
                            onPress={(value) => {
                                question.answer=value;
                                this.answers[index]=question;
                                // this._onSelect(0,value,question)
                            }}
                            />
                    }
                    {
                        question.CanUploadFile==1&&
                        (<Button small style={styles.uploadBtn} title={0} onPress={() =>{
                            DocumentPicker.show({
                                filetype: [DocumentPickerUtil.allFiles()],
                            },(error,res) => {
                                if(res&&question) {
                                    question.uploadedFileUrl = res.fileName;
                                    this.answers[index] = question;
                                    this.files.push(res);
                                }
                            })
                        }}>
                            <Text style={styles.uploadBtnText}>آپلود</Text>
                        </Button>)
                    }
                </View>
            </View>
        );
    }
    // _onSelect=(index, value,question)=>{
    //     console.log(index, value,question)
    // }

    _sendAnswer=()=> {
        if(this.answers.length==0){
            alert("جواب های خالی را پر کنید")
            return;
        }else{
            Http._postFilePromise({userId:this.props.user.userId,
                token:this.props.user.token,
                ProductAndCourseId:this.props.ProductAndCourseId,
                EAPtype:this.props.EAPtype,
                answers:this.answers,
            },this.files,'insertAnswer').then((response) => response.json()).then(response=>{
                console.log(response)
                alert("جواب های شما ثبت شد")
                Actions.term();
            }).catch(err=>{
                console.log(err)
               alert("خطا دوباره تلاش کنید")
        })
        }
    }
}
const mapStateToProps=state=>{
    return{
        user:state.user,
    }
};
export default connect(mapStateToProps,null)(Practice);