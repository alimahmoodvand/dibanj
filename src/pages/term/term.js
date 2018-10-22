import React, { Component } from 'react';
import HeaderLayout from "../../components/header/header";
import {FlatList, Image, ScrollView, Text, TouchableOpacity, View, WebView} from "react-native";
import styles from './term.css'
import {Actions} from "react-native-router-flux";
import FIcon from 'react-native-vector-icons/FontAwesome';
import Accordion from 'react-native-collapsible/Accordion';
import Stepper from "../../components/stepper/stepper";
import MIcon from 'react-native-vector-icons/MaterialIcons';
import {connect} from "react-redux";
import Http from "../../services/http";
import {Button, Spinner} from "native-base";

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
        if (Array.isArray(response)&&response.length>0) {
            // let res=[];
            // for(let i=0;i<30;i++){
            //     res.push(response[0])
            // }
            this.courses = response;
        }else{
            alert('دوره ای یافت نشد')
        }
        this.showSpinner=false;
        this.setState({changeUI:this.state.changeUI+1,selectCatIndex:false})
    };
    courses=[];
    userPAC=[];
    curPAC=[];
    showSpinner=true;
    _selectCourse=async(CourseIndex)=> {
        this.curPAC=[];
        // console.log(CourseIndex,this.courses[CourseIndex])
        this.setState({selectCatIndex: CourseIndex})
        if(CourseIndex!==false) {
           let response = await Http._postAsyncData({
                userId: this.props.user.userId,
                courseId: this.courses[CourseIndex].ProductAndCourseId,
                token: this.props.user.token
            }, 'userCourses');
            if (Array.isArray(response)) {
                this.curPAC=response;
                this.setState({changeUI: this.state.changeUI++})
            }
        }
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
        this.filterOptions=[
            {
                condition:'notStarted',
                title:'دوره های در حال ثبت نام',
            },{
                condition:'inProgress',
                title:'دوره های جاری',
            },{
                condition:'finished',
                title:'دوره های پایان یافته',
            }
        ];
        this._getCourses();
        this.setState({isShow:false,changeUI:0,selectCatIndex:false,ddlist:false,selected:null})
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

                <View style={styles.content}>
                    {/*<View style={styles.filter}>*/}
                        {/*<View style={styles.filterExist} >*/}
                            {/*<MIcon onPress={() => {*/}
                                {/*console.log('clicked')*/}
                                {/*this.setState({ddlist: true})*/}
                            {/*}} style={styles.filterIcon} name="filter-list" color="white"*/}
                                   {/*size={25}/>*/}

                        {/*</View>*/}
                    {/*</View>*/}
                    {/*<View style={styles.filter}>*/}
                    {/*{*/}
                        {/*this.state.ddlist&&*/}
                        {/*this._renderFilter()*/}
                    {/*}*/}
                    {/*</View>*/}

                    {/*<Accordion*/}
                    {/*// duration={300}*/}
                    {/*sections={this.courses}*/}
                    {/*renderHeader={this._renderHeader}*/}
                    {/*renderContent={this._renderContent}*/}
                    {/*onChange={this._selectCourse}*/}
                    {/*/>*/}
                    {this.courses.length>0&&
                    <View style={styles.categories}>
                        {
                            this.courses.length>0&&
                            <FlatList style={{flex:1}}
                            data={this.courses}
                            extraData={this.state}
                            keyExtractor={(item, index) => index.toString()}
                            renderItem={({item,index})=> {
                              return  this._renderHeader(item,index);
                            }}
                            />

                        }

                    </View>
                    }
                    {
                        (this.courses.length==0&&this.showSpinner)&&
                        <Spinner/>
                    }
                </View>

            </View>
        );
    }
    _renderFilter=()=>{
        // console.log(this.filterOptions)
        return  (
            <View style={[styles.ddlistContainer]}>
                {
                    this.filterOptions.map((item,index)=>{
                        // console.log(index)
                        return(
                            <Button key={index} title={index} onPress={()=> {
                                this.setState({selected:item,ddlist:false})
                            }} style={styles.ddlist}><Text style={{color:item===this.state.selected?'red':'black'}}>{item.title}</Text></Button>
                        );
                    })
                }
                <View style={styles.collapseContainer}>
                    <MIcon name="keyboard-arrow-up" onPress={() => this.setState({
                        ddlist:!this.state.ddlist
                    })} color="red" size={25}/>
                </View>
            </View>
        )
    }
    _renderItem=(item,index)=>{
        return <Text>{index}</Text>
    }
    _renderHeader=(section,index)=> {
        return (
            <View key={index} onPress={()=>{}} >
            <View style={styles.accordianHeader}>
                {
                        this.state.selectCatIndex !== index &&
                    <FIcon style={styles.filterIcon} onPress={()=>{this._selectCourse(index)}} name="angle-left" color="black" size={25}/>
                }
                {
                    this.state.selectCatIndex===index&&
                    <FIcon style={styles.filterIcon}  onPress={()=>{this._selectCourse(false)}} name="angle-down"  color="black" size={25}/>
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
                    <Text onPress={()=>{Actions.course({id:section.ProductAndCourseId});}} style={styles.accordianHeaderText}>{section.Title}</Text>
                </View>
                </View>
                {
                    this._renderContent(section,index)
                }
            </View>
        );
    }
    _renderContent=(section,index)=> {
        if(index===this.state.selectCatIndex) {
            // console.log(index, this.state.selectCatIndex,this.curPAC)
            // setTimeout(()=>{
            //     this.setState({changeUI: this.state.changeUI++})
            // },2000)
            if (this.curPAC.length > 0) {
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
            else {
                return (
                    <Spinner/>
                )
            }
        }else{
            return(
                <View><Text>

                </Text></View>
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