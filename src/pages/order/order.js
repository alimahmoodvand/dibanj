import React, { Component } from 'react';
import HeaderLayout from "../../components/header/header";
import {FlatList, Image, ScrollView, Text, TouchableOpacity, View, WebView} from "react-native";
import styles from './orders.css.js'
import {Actions} from "react-native-router-flux";
import FIcon from 'react-native-vector-icons/FontAwesome';
import Accordion from 'react-native-collapsible/Accordion';
import Stepper from "../../components/stepper/stepper";
import MIcon from 'react-native-vector-icons/MaterialIcons';
import {connect} from "react-redux";
import Http from "../../services/http";
import {Button, Spinner} from "native-base";

class Order extends Component{
    _searchObject=(arr,mykey,myvalue)=>{
        let resIndex=-1;
        arr.map((item,index)=>{
            if(item[mykey]==myvalue){
                resIndex=index;
            }
        })
        return resIndex;
    };
    _getOrders=async()=>{
        let response = await Http._postAsyncData({userId:this.props.user.userId,token:this.props.user.token},'userOrders');
        if (Array.isArray(response)&&response.length>0) {
            let orders=[];
            let ids=[];
            response.map((item)=>{
                if(this._searchObject(orders,"orderId",item.orderId)===-1){
                    orders.push(item);
                    orders[this._searchObject(orders,"orderId",item.orderId)].child=[];
                }
                orders[this._searchObject(orders,"orderId",item.orderId)].child.push(item);
            });
            this.orders = orders;
        }else{
            alert('سفارشی یافت نشد')
        }
        this.showSpinner=false;
        this.setState({changeUI:this.state.changeUI+1,selectCatIndex:false})
    };
    orders=[];
    userPAC=[];
    curPAC=[];
    showSpinner=true;
    _selectOrder=async(OrderIndex)=> {
        // console.log(OrderIndex,this.orders[OrderIndex])
        //
        if(OrderIndex!==false) {
            this.curPAC=this.orders[OrderIndex].child
            console.log(this.curPAC)
        //     response = await Http._postAsyncData({
        //         userId: this.props.user.userId,
        //         orderId: this.orders[OrderIndex].ProductAndOrderId,
        //         token: this.props.user.token
        //     }, 'userOrders');
        //     if (Array.isArray(response)) {
        //         this.curPAC=response;
            }
        // }
        this.setState({selectCatIndex: OrderIndex})
        //     this.curPAC=[];
        //     this.userPAC.map((item,index)=>{
        //         if(item.ParentId===this.orders[OrderIndex].ProductAndOrderId){
        //             this.curPAC.push(item)
        //         }
        //     })
        // }
        //     this.setState({selectCatIndex: OrderIndex}, () => {
        //         console.log(this.state.selectCatIndex,this.orders[OrderIndex])
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
        this._getOrders();
        this.setState({isShow:false,changeUI:0,selectCatIndex:false,ddlist:false,selected:null})
    }
    componentWillUnmount() {
    }

    render() {
        const body={ProductAndOrderId:162,isSample:1}
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
                    {this.orders.length > 0 &&
                    <View style={styles.categories}>
                        {
                            this.orders.length > 0 &&
                            <FlatList style={{flex: 1}}
                                      data={this.orders}
                                      extraData={this.state}
                                      keyExtractor={(item, index) => index.toString()}
                                      renderItem={({item, index}) => {
                                          return this._renderHeader(item, index);
                                      }}
                            />

                        }

                    </View>
                    }
                    {
                        (this.orders.length==0&&this.showSpinner)&&
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
    _renderHeader=(section,index)=> {
        let bg={}
        if(section.ostatus===2){
            bg={backgroundColor:'#ff000a22'}
        }else if(section.ostatus===1){
            bg={backgroundColor:'#5bff1d33'};
        }
        return (
            <View key={index}  >
                <TouchableOpacity style={styles.accordianHeader} onPress={()=> {
                    if (this.state.selectCatIndex !== index)
                        this._selectOrder(index)
                    else
                        this._selectOrder(false)

                }}>
                    {
                        this.state.selectCatIndex !== index &&
                        <FIcon style={styles.filterIcon} onPress={()=>{this._selectOrder(index)}} name="angle-left" color="black" size={30}/>
                    }
                    {
                        this.state.selectCatIndex===index&&
                        <FIcon style={styles.filterIcon}  onPress={()=>{this._selectOrder(false)}} name="angle-down"  color="black" size={30}/>
                    }
                <View style={styles.accordianHeaderContainerText}>
                     <Text style={styles.accordianHeaderText}>{section.persianRegDate.split(' ')[0]}:  </Text>
                    <Text  style={styles.accordianHeaderText}> تاریخ </Text>
                    <Text  style={styles.accordianHeaderText}>  {section.paymentCost}: </Text>
                    <Text  style={styles.accordianHeaderText}> قیمت </Text>
                    <Text  style={styles.accordianHeaderText}>  {section.orderId} :</Text>
                    <Text  style={styles.accordianHeaderText}> شماره </Text>

                </View>
              </TouchableOpacity>
                {
                    this._renderContent(section,index)
                }
            </View>
        );
    }
    _renderContent=(section,index)=> {
        // console.log(section,this.curPAC,section)
        if(index===this.state.selectCatIndex) {
            if (this.curPAC.length > 0) {
                return (
                    <View style={styles.accordianSubContent}>
                        <View style={styles.accordianSubContainer}>
                            <View style={styles.accordianSectionStepper}>
                                {
                                    this.curPAC.map(item => {
                                        return this._renderContentItem(item);
                                    })
                                }
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
    _renderContentItem=(section)=>{
        let bg={}
        let status='ثبت شده'
        if(section.status===1){
            bg={backgroundColor:'#daff1d82'};
            status='در حال بررسی'
        }else if(section.status===2){
            bg={backgroundColor:'#1d4cff33'}
            status='ارسال شده'
        }else if(section.status===3||section.status===100){
            bg={backgroundColor:'#5bff1d33'}
            status='موفق'
        }else if(section.status===-1){
            bg={backgroundColor:'#ff000a22'}
            status='ناموفق'
        }
        // console.log(bg,status)
        return (
            <View key={section.orderDetailId} style={[styles.accordianHeader,bg]}>
                <View style={styles.accordianHeaderContainerText}>
                    <Text  style={styles.accordianHeaderText}>  {status} </Text>
                    <Text  style={styles.accordianHeaderText}>  {section.totalPrice} </Text>
                    <Text  style={styles.accordianHeaderText}>  {section.Title} </Text>
                    <Text  style={styles.accordianHeaderText}>  {section.orderDetailId} </Text>
                </View>
            </View>
        );
    }
}
const mapStateToProps=state=>{
    return{
        user:state.user,
    }
};
export default connect(mapStateToProps,null)(Order);