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
import Loading from "../../components/laoding/laoding";
import AlertMessage from "../../services/alertmessage";
class Practice extends Component{
    _getQuestions=async()=>{

        let response = await Http._postAsyncData({
            userId:this.props.user.userId,
            token:this.props.user.token,
            type:this.props.EAPtype,
            ProductAndCourseId:this.props.ProductAndCourseId,
            userCoursesExamAndPracticeId:this.props.userCoursesExamAndPracticeId,
        },'getQuestions');
        if (Array.isArray(response)) {
            if(response.length===0) {
                if (this.props.EAPtype === 2) {
                    this.emptyList="تمرینی پیدا نشد"
                 //   new AlertMessage().error('practiceEmpty')
                } else if (this.props.EAPtype === 1) {
                    this.emptyList="آزمونی پیدا نشد"
                   // new AlertMessage().error('examEmpty')
                }
            }
            this.questions=response;
        }
        this.setState({loading:false})
    };
    questions=[];
    componentWillMount() {
        this.setState({changeUI:1,loading:true})
        this._getQuestions();
    }
    _findQuestions=(question)=>{
       let tmp=[];
       this.questions.map((item,index)=>{
           if(item.QuestionId===question.QuestionId&&question.QuestionOptionId!==item.QuestionOptionId){
               item.label=item.title;
               item.value=item.QuestionOptionId;
               tmp.push(item)
           }
       })
        return tmp;
    }
    emptyList="";
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
                <Loading visible={this.state.loading} />
                <Image style={styles.bgimage} source={require('../../assets/images/bg.jpg')}/>
                <HeaderLayout back={true}/>
                <View style={styles.content}>
                    <ScrollView style={styles.practiceContainer}>
                        {this.emptyList!==""&&
                            <View style={styles.practiceTitle}>
                                <Text style={styles.practiceTitleText}>
                                    {this.emptyList}
                                </Text>
                            </View>
                        }
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
                        {this.questions.length > 0 &&
                        <View style={styles.uploadBtnSection}>
                            <Button small style={styles.uploadBtn} title={0} onPress={() => this._sendAnswer()}>
                                <Text style={styles.uploadBtnText}>انجام</Text>
                            </Button>
                        </View>
                        }
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
        if(this.answers.length===0){
            new AlertMessage().error("answerEmpty")
            return;
        }else{
            this.setState({loading:true})
            Http._postFilePromise({userId:this.props.user.userId,
                token:this.props.user.token,
                uniqueCode: this.props.user.uniqueCode,
                ProductAndCourseId:this.props.ProductAndCourseId,
                EAPtype:this.props.EAPtype,
                answers:this.answers,
            },this.files,'insertAnswer').then((response) => {
                this.setState({loading:false})
                this.statusCode=response.status;
                return   response.json()
            }).then(response=> {
                this.setState({loading: false})
                if (this.statusCode == 200) {
                    new AlertMessage().error("answerDone")
                    Actions.term();
                } else if (this.statusCode == 401) {
                    Actions.unauthorized();
                }
            }).catch(err=>{
                console.log(err)
                this.setState({loading:false})
                new AlertMessage().error("serverError")
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