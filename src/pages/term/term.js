import React, { Component } from 'react';
import HeaderLayout from "../../components/header/header";
import { Image, ScrollView, Text, View} from "react-native";
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
    _getCourses=async()=>{
        let response = await Http._postAsyncData({userId:this.props.user.userId,token:this.props.user.token},'userCourses');
        if (Array.isArray(response)) {
            this.courses=response;
        }
        console.log(response)
        this.setState({changeUI:this.state.changeUI+1,selectCatIndex:false})
                response = await Http._postAsyncData({
                    userId: this.props.user.userId,
                    courseId: 2,//this.courses[CourseIndex].ProductAndCourseId,
                    token: this.props.user.token
                }, 'userCourseAndPractice');
        if (Array.isArray(response)) {
            this.userPAC=response;
        }
        console.log(response)
    };
    courses=[];
    userPAC=[];
    _selectCourse=async(CourseIndex)=> {
        // if(CourseIndex!==false) {
        //     let response = await Http._postAsyncData({
        //         userId: this.props.user.userId,
        //         courseId: 2,//this.courses[CourseIndex].ProductAndCourseId,
        //         token: this.props.user.token
        //     }, 'userCourseAndPractice');
        //     if (Array.isArray(response)) {
        //         this.userPAC = response;
        //     }else{
        //         this.userPAC=[];
        //     }
        //     this.setState({selectCatIndex:CourseIndex},()=> {
        //         console.log(this.state.selectCatIndex,this.userPAC.length)
        //     })
        // }else
        {
            this.setState({selectCatIndex: CourseIndex}, () => {
                console.log(this.state.selectCatIndex, this.userPAC.length)
            })
        }
    }
    componentWillMount() {
        this._getCourses();
        this.setState({isShow:false,changeUI:0,selectCatIndex:false})
    }
    componentWillUnmount() {
    }
    render() {
        return (
            <View style={styles.main}>
                <Image style={styles.bgimage} source={require('../../assets/images/bg.jpg')}/>

                <HeaderLayout back={true}/>

                <ScrollView style={styles.content}>
                    <View style={styles.filter}>
                        <View style={styles.filterExist} >
                            <MIcon style={styles.filterIcon} name="filter-list" onPress={() => Actions.pop()} color="white"
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
                    this.state.selectCatIndex!==index&&<FIcon style={styles.filterIcon} name="angle-left"  color="black" size={25}/>
                }
                {
                    this.state.selectCatIndex===index&&<FIcon style={styles.filterIcon} name="angle-down"  color="black" size={25}/>
                }
                <View style={styles.accordianHeaderContainerText}>
                    <Text onPress={()=>{}} style={styles.accordianHeaderText}>{section.Title}</Text>
                </View>
            </View>
        );
    }
    _renderContent=(section)=> {
        console.log(this.userPAC)
        if(this.userPAC.length>0) {
            return (
                <View style={styles.accordianSubContent}>
                    <View style={styles.accordianSubContainer}>
                        <View style={styles.accordianSectionStepper}>
                            <Stepper pacs={this.userPAC}/>
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