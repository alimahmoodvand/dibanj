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
import TermProduct from "../../components/termproduct/termproduct";
import {Button, Spinner} from "native-base";
import {
    initBookmark, initProduct, removeBasket, removeUser, saveCategories, saveMessages,
    saveUser
} from "../../redux/actions";

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
    _getUserPAC=async()=>{
        let response = await Http._postAsyncData({UserId:this.props.user.userId,token:this.props.user.token},'getUserPAC');
        if (Array.isArray(response)&&response.length>0) {
            // let res=[];
            // for(let i=0;i<30;i++){
            //     res.push(response[0])
            // }
            for(let i=0;i<response.length;i++) {
                for (let j = 0; j < this.props.basket.basket.length; j++) {
                    if(response[i].ProductAndCourseId===this.props.basket.basket[j].ProductAndCourseId){
                         this.props.removeBasket(this.props.basket.basket[j])
                        break;
                    }
                }
            }
            this.props.initProduct(response)
        }else{
          //  alert('دوره ای یافت نشد')
        }
        this.setState({fromApp:true})
        // this.showSpinner=false;
        // this.setState({changeUI:this.state.changeUI+1,selectCatIndex:false})
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
       // console.log("componentWillMount")
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
        if(!this.props.fromApp){
            this._getUserPAC();
        }
        this.setState({isShow:false,changeUI:0,selectCatIndex:false,ddlist:false,selected:null,fromApp:this.props.fromApp})

    }
    // componentWillReceiveProps(props) {
    //     // console.log("componentWillReceiveProps",this.props.fromApp,props.fromApp)
    //     this.props = props;
    //     this.setState({isShow:false,changeUI:0,selectCatIndex:false,ddlist:false,selected:null,fromApp:this.props.fromApp})
    //
    // }
    componentWillUnmount() {
    }

    render() {

        this.courses=this.props.products.filter((item)=>{
            if(!item.ParentId){
                return item;
            }
        });
        const body={ProductAndCourseId:162,isSample:1}
        const token=this.props.user.token;
        return (
            <View style={styles.main}>
                <Image style={styles.bgimage} source={require('../../assets/images/bg.jpg')}/>

                <HeaderLayout back={true}/>

                <View style={styles.content}>
                    {(this.courses.length>0&&this.state.fromApp)&&
                    <View style={styles.categories}>
                        {
                            this.courses.length>0&&
                            <FlatList style={{flex:1}}
                            data={this.courses}
                            extraData={this.state}
                            keyExtractor={(item, index) => index.toString()}
                            renderItem={({item,index})=> {
                              return  this._renderItem(item,index);
                            }}
                            />

                        }

                    </View>
                    }
                    {
                        (!this.state.fromApp)&&
                        <Spinner/>
                    }
                </View>

            </View>
        );
    }
    _renderItem=(item,index)=>{
        return(<TermProduct isChild={true} prod={item} />);
    }
}
const mapStateToProps=state=>{
    return{
        user:state.user,
        products:state.products.products,
        basket:state.basket,
    }
};

const mapDispatchToProps=(dispatch)=> {
    return{
        initProduct:(products)=>{
            dispatch(initProduct(products))
        },removeBasket:(product)=>{
            dispatch(removeBasket(product))
        },
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(Term);