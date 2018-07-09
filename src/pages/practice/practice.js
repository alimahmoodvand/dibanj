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
class Practice extends Component{
    _getQuestions=async()=>{
        console.log("zshcbjhbSVf","xdgsg")

        let response = await Http._postAsyncData({userId:this.props.user.userId,
            token:this.props.user.token,
            userCoursesExamAndPracticeId:this.props.userCoursesExamAndPracticeId,
        },'getQuestions');
        // console.log("zshcbjhbSVf",response)

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
                        {/*<View style={styles.practiceDescContainer}>*/}
                            {/*<View style={styles.practiceDesc}>*/}
                            {/*<Text style={styles.practiceDescText}>*/}
                                {/*practices section one</Text>*/}
                            {/*</View>*/}
                            {/*<View style={styles.circleYellow}>*/}
                                {/*<Text style={styles.circleText}>0</Text>*/}
                            {/*</View>*/}
                        {/*</View>*/}
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
                        question.CanUploadFile===1&&
                        (<Button small style={styles.uploadBtn} title={0} onPress={() => alert('sakhca')}>
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

    _sendAnswer=async()=> {
        if(this.answers.length==0){
            alert("answers is empty")
            return;
        }else{
            let response = await Http._postAsyncData({userId:this.props.user.userId,
                token:this.props.user.token,
                answers:this.answers,
            },'insertAnswer');
            Actions.pop();
        }
    }
}
const mapStateToProps=state=>{
    return{
        user:state.user,
    }
};
export default connect(mapStateToProps,null)(Practice);