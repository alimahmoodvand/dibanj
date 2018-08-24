import React, { Component } from 'react';
import HeaderLayout from "../../components/header/header";
import {Image, ScrollView, Text, TouchableOpacity, View, WebView} from "react-native";
import styles from './term.css'
import {Actions} from "react-native-router-flux";
import FIcon from 'react-native-vector-icons/FontAwesome';
import Accordion from 'react-native-collapsible/Accordion';
import Stepper from "../../components/stepper/stepper";
import MIcon from 'react-native-vector-icons/MaterialIcons';
import {connect} from "react-redux";
import Http from "../../services/http";
import {Spinner} from "native-base";

class Term extends Component{
    _searchObject=(arr,mykey,myvalue)=>{
        let resIndex=-1;
        arr.map((item,index)=>{
            if(item[mykey]==myvalue){
                resIndex=index;
            }
        })
        return resIndex;
    };
    _getCourses=async()=>{
        let response = await Http._postAsyncData({userId:this.props.user.userId,token:this.props.user.token},'userCourses');
        if (Array.isArray(response)) {
            // this.courses=response;
            let crs = [];
            // response.map((parent) => {
            //     try {
            //         if (!parent.ParentId) {
            //             let index = this._searchObject(crs, 'ProductAndCourseId', parent.ProductAndCourseId);
            //             if (index != -1) {
            //                 if (parent.type == 1) {
            //                     crs[index].practice = parent.userCoursesExamAndPracticeId
            //                 }
            //                 if (parent.type == 2) {
            //                     crs[index].exam = parent.userCoursesExamAndPracticeId
            //                 }
            //                 if (this._searchObject(response, 'ParentId', parent.ProductAndCourseId) != -1) {
            //                     crs[index].child = true
            //                 }
            //             } else {
            //
            //                 parent.exam= null
            //                 parent.practice= null
            //                 parent.child= null
            //                 if (parent.type == 1) {
            //                     parent.practice = parent.userCoursesExamAndPracticeId
            //                 }
            //                 if (parent.type == 2) {
            //                     parent.exam = parent.userCoursesExamAndPracticeId
            //                 }
            //                 if (this._searchObject(response, 'ParentId', parent.ProductAndCourseId) != -1) {
            //                     parent.child = true
            //                 }
            //                 crs.push(parent)
            //             }
            //         }
            //     }catch (err){
            //         console.log(err)
            //     }
            // })
            this.courses = response;
          //  console.log(this.courses,crs)
        }
        // console.log("userCourses",response,{userId:this.props.user.userId,token:this.props.user.token})
        this.setState({changeUI:this.state.changeUI+1,selectCatIndex:false})

        // console.log(response)
    };
    courses=[];
    userPAC=[];
    curPAC=[];
    _selectCourse=async(CourseIndex)=> {
        console.log(CourseIndex,this.courses[CourseIndex])

        if(CourseIndex!==false) {
            response = await Http._postAsyncData({
                userId: this.props.user.userId,
                courseId: this.courses[CourseIndex].ProductAndCourseId,
                token: this.props.user.token
            }, 'userCourses');
            if (Array.isArray(response)) {
                this.curPAC=response;
            }
        }
        this.setState({selectCatIndex: CourseIndex})
        //     this.curPAC=[];
        //     this.userPAC.map((item,index)=>{
        //         if(item.ParentId===this.courses[CourseIndex].ProductAndCourseId){
        //             this.curPAC.push(item)
        //         }
        //     })
        // }
        //     this.setState({selectCatIndex: CourseIndex}, () => {
        //         console.log(this.state.selectCatIndex,this.courses[CourseIndex])
        //     })
    }
    componentWillMount() {
        this._getCourses();
        this.setState({isShow:false,changeUI:0,selectCatIndex:false})
    }
    componentWillUnmount() {
    }
    render() {
        const body={ProductAndCourseId:162,isSample:1}
        const token=this.props.user.token;
        return (
            <View style={styles.main}>
                <Image style={styles.bgimage} source={require('../../assets/images/bg.jpg')}/>

                <HeaderLayout back={true}/>

                <ScrollView style={styles.content}>
                    <View style={styles.filter}>
                        <View style={styles.filterExist} >
                            <MIcon style={styles.filterIcon} name="filter-list" onPress={() =>{}} color="white"
                                   size={25}/>
                        </View>
                    </View>
                    <View style={styles.categories}>
                        {
                            this.courses.length>0&&
                            <Accordion
                                duration={300}
                                sections={this.courses}
                                renderHeader={this._renderHeader}
                                renderContent={this._renderContent}
                                onChange={this._selectCourse}
                            />
                        }

                    </View>
                    {
                        this.courses.length==0&&
                        <Spinner/>
                    }
                </ScrollView>

            </View>
        );
    }
    _renderHeader=(section,index)=> {
        return (
            <View onPress={()=>{}} style={styles.accordianHeader}>
                {
                        this.state.selectCatIndex !== index &&
                    <FIcon style={styles.filterIcon} name="angle-left" color="black" size={25}/>
                }
                {
                    this.state.selectCatIndex===index&&
                    <FIcon style={styles.filterIcon} name="angle-down"  color="black" size={25}/>
                }
                {
                    section.practice&&
                    <TouchableOpacity style={styles.train} onPress={()=>Actions.practice({userCoursesExamAndPracticeId:section.practice,ProductAndCourseId:section.ProductAndCourseId,EAPtype:2})}>
                        <Text>{"تمرین"}</Text>
                    </TouchableOpacity>
                }
                {
                    section.exam&&
                    <TouchableOpacity style={styles.train} onPress={()=>Actions.practice({userCoursesExamAndPracticeId:section.exam,ProductAndCourseId:section.ProductAndCourseId,EAPtype:1})}>
                        <Text>{"آزمون"}</Text>
                    </TouchableOpacity>
                }
                <View style={styles.accordianHeaderContainerText}>
                    <Text onPress={()=>{}} style={styles.accordianHeaderText}>{section.Title}</Text>
                </View>
            </View>
        );
    }
    _renderContent=(section)=> {
        console.log(section,this.curPAC)
        if(this.curPAC.length>0) {
            return (
                <View style={styles.accordianSubContent}>
                    <View style={styles.accordianSubContainer}>
                        <View style={styles.accordianSectionStepper}>
                            <Stepper pacs={this.curPAC}/>
                        </View>
                    </View>
                </View>
            );
        }
        else{
            return (
                <Spinner/>
            )
        }
    }
    // _renderContent=(section)=> {
    //     return ;
    // return (
    //         <View  style={styles.accordianContent}>
    //             <Accordion
    //                 duration={1000}
    //                 sections={SECTIONS}
    //                 renderHeader={Term._renderSubHeader}
    //                 renderContent={Term._renderSubContent}
    //             />
    //         </View>
    //     );
    // }
    // static _renderSubHeader(section,index) {
    //     return (
    //         <View onPress={()=>{}} style={styles.accordianSubHeader}>
    //             <FIcon style={styles.filterIcon} name="angle-left"  color="black" size={25}/>
    //
    //             <View style={styles.accordianSubHeaderContainerText}>
    //                 <Text onPress={()=>{}} style={styles.accordianSubHeaderText}>{section.Title}</Text>
    //             </View>
    //         </View>
    //     );
    // }
    //
    // static _renderSubContent(section) {
    // return (
    //         <View  style={styles.accordianSubContent}>
    //             <View style={styles.accordianSubContainer}>
    //                 <View  style={styles.accordianSectionStepper}>
    //                     <Stepper/>
    //                 </View>
    //             </View>
    //         </View>
    //     );
    // }
}
const mapStateToProps=state=>{
    return{
        user:state.user,
    }
};
export default connect(mapStateToProps,null)(Term);