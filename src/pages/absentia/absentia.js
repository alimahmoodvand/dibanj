import React, { Component } from 'react';
import HeaderLayout from "../../components/header/header";
import {Button, Container, Spinner} from "native-base";
import {
    Dimensions, FlatList, Image, RefreshControl, ScrollView, StyleSheet, Switch, Text, TouchableOpacity,
    View
} from "react-native";
import styles from './absentia.css'
import {Actions} from "react-native-router-flux";
import FIcon from 'react-native-vector-icons/FontAwesome';
import Product from "../../components/product/product";
import MIcon from 'react-native-vector-icons/MaterialIcons';
import {addProducts, decPage, incPage, saveProducts} from "../../redux/actions";
import Http from "../../services/http";
import {connect} from "react-redux";

const {height, width} = Dimensions.get('window');
class Absentia extends Component {
    _getdata=async()=>{
            let response = await Http._postAsyncData({
                page:this.page,
                type:this.props.proType,
                subType:this.props.subType,
                token:this.props.user.token
            },'products');
            // console.log(response)
            if(Array.isArray(response)){
                this.products=this.products.concat(response);
                if(response.length>0)
                this.page+=1;
                if(this.products.length==0){
                    this.showSpinner=false;
                    alert(this.props.empty)
                }else{
                    this.showSpinner=true;
                }
                this.setState({updateUI:this.state.updateUI+1});
            }

    }
    page=1;
    showSpinner=true;
    products=[];
    getType="default";
    getItem={};
    componentWillMount=()=> {
        this.setState({
            selectable:'',
            selected:{},
            ddlist:false,
            refreshing:false,
            updateUI:1,
            exist:false,
        })
        this.filterOptions={
            sort:[
                {
                    by:'price',
                    sortingCode:1,
                    title:'کمترین قیمت'
                },{
                    by:'price',
                    sortingCode:0,
                    title:'بیشترین قیمت'
                },{
                    by:'time',
                    sortingCode:0,
                    title:'جدیدترین'
                },{
                    by:'count',
                    sortingCode:0,
                    title:'پرفروش ترین'
                },
            ],
            cat:this.props.categories.filter((item)=>{
                if(item.parentId){
                    return item;
                }
            }),
            filter:[
                {
                    condition:'notStarted',
                    title:'دوره های در حال ثبت نام',
                },{
                    condition:'inProgress',
                    title:'دوره های جاری',
                },{
                    condition:'finished',
                    title:'دوره های پایان یافته',
                },
            ]
        }
        // console.log(this.state)


    }
    _renderItem = (item, index) => {
        item['id'] = index;
        return (<Product prod={item}/>);
    };
    render() {
        // if(this.products.length==0)
        // this._getdata();
        let icon=null;
        if(this.props.img==="absentia"){
            icon=require('../../assets/images/absentia.png')
        }else if(this.props.img==="course"){
            icon=require('../../assets/images/course.png')
        }else if(this.props.img==="store"){
            icon=require('../../assets/images/store.png')
        }else if(this.props.img==="lock"){
            icon=require('../../assets/images/lock.png')
        }else if(this.props.img==="roocket"){
            icon=require('../../assets/images/roocket.png')
        }
        return (
            <View style={styles.main}>
                <Image style={styles.bgimage} source={require('../../assets/images/bg.jpg')}/>

                <HeaderLayout back={true}/>
                <View style={styles.content}>
                    <View style={[styles.halfCircleContainer, style.halfCircleContainer]}>
                    </View>
                    <View style={styles.filter}>
                        <TouchableOpacity style={styles.filterImageContainer} onPress={() => this.setState({selectable:'sort',ddlist:true})}>
                            <Image style={styles.filterImage} source={require('../../assets/images/filter.png')}/>
                        </TouchableOpacity>
                        <MIcon style={styles.filterIcon} name="filter-list" onPress={() => this.setState({selectable:'cat',ddlist:true})} color="white"
                               size={25}/>
                        <MIcon style={styles.filterIcon} name="sort" onPress={() => this.setState({selectable:'filter',ddlist:true})} color="white"
                               size={25}/>
                        {
                            this.props.isstore&&
                            (<View style={styles.filterExist} >
                                <Text style={styles.filterExistText}> محصولات موجود</Text>
                                <Switch   value={ this.state.exist }
                                          onValueChange={(exist) => this.setState({exist})}
                                          tintColor="white" onTintColor="yellow" thumbTintColor="yellow"/>
                            </View>)
                        }

                    </View>
                    <View style={styles.filter}>
                        {
                            this.state.ddlist&&
                            (this._renderFilter())
                        }
                    </View>
                    <View style={style.circles}>
                        <Text style={style.label}>
                            {this.props.label}
                        </Text>
                        <View style={[style.circle]}>
                            {/*<SVGImage style={styles.menuIcon} source={require('../../assets/images/absentia.svg')}/>*/}
                            <Image style={styles.menuIcon} source={icon} />
                        </View>

                    </View>
                    <View style={styles.products}>
                        <FlatList
                            data={this.products.filter((item)=>{
                                if(!this.state.exist){
                                    return item;
                                }else if(this.state.exist/*&&item.remain.remainCount*/){
                                    return item;
                                }
                            })}
                            keyExtractor={(item, index) => index.toString()}
                            renderItem={({item, index}) =>
                                this._renderItem(item, index)
                            }
                            refreshControl={
                                <RefreshControl
                                    onRefresh={this._pullRefresh}
                                                refreshing={this.state.refreshing}
                                    title="Pull to refresh"
                                    tintColor="#ccc"
                                    titleColor="#ddd"
                                />
                            }
                            ListEmptyComponent={()=>
                            {
                                if(this.showSpinner){
                                  return(<Spinner/>);
                                }
                                else{
                                    return(<View>  </View>)
                                }

                            }}
                            onEndReached={()=>{
                                // if(this.products.length>0)
                                if(this.state.selectable===''){
                                    this._getdata();
                                }
                                else if(this.state.selectable==='sort'){
                                    this._getAdvPro(this.state.selected,'productsSort');
                                }else if(this.state.selectable==='filter') {
                                    this._getAdvPro(this.state.selected,'productsFilter');
                                }else if(this.state.selectable==='cat') {
                                    this._getAdvPro(this.state.selected,'category');
                                }

                            }}
                            onEndReachedThreshold={0.1}
                        />
                    </View>
                </View>
            </View>
        );
    }
    _pullRefresh=async()=>{
        this.setState({
            refreshing:true
        });
       await this._getdata();
        this.setState({
            refreshing:false
        });
    }
    _renderFilter=()=>{
      return  (
          <View style={[styles.ddlistContainer]}>
              {
                  this.filterOptions[this.state.selectable].map((item,index)=>{
                      return(
                          <Button key={index} title={index} onPress={()=> {
                              this.products = [];
                              this.page = 1;
                              if (this.state.selectable === 'sort') {
                                  this._getAdvPro(item, 'productsSort');
                              } else if (this.state.selectable === 'filter') {
                                  this._getAdvPro(item, 'productsFilter');
                              } else if (this.state.selectable === 'cat') {
                                  this._getAdvPro(item, 'category');
                              }
                          }
                          } style={styles.ddlist}><Text style={{color:item===this.state.selected?'red':'black'}}>{item.title}</Text></Button>
                      );
                  })
              }
            <View style={styles.collapseContainer}>
                <MIcon name="keyboard-arrow-up" onPress={() => this.setState({
                    ddlist:!this.state.ddlist
                })} color="red"
                       size={25}/>
            </View>
        </View>
      )
    }
    _getAdvPro=async(item,url)=>{
        item.page=this.page;
        item.token=this.props.user.token;
        item.type=1;
        item.subType=2;
        console.log(item,url)
        let response = await Http._postAsyncData(item,url);
        // console.log(response)
        if(Array.isArray(response)){
            this.products=this.products.concat(response);
            if(this.products.length==0){
                this.showSpinner=false;
                alert(this.props.empty)
            }else{
                this.showSpinner=true;
            }
            if(response.length>0)
            this.page+=1;

            this.setState({updateUI:this.state.updateUI+1,selected:item,ddlist:false});
        }
    }
}
const heightCircle=width*0.6*2;
const pad=width*0.6;
let margin=heightCircle/8;
const circleWidth=margin*1.15;

const marginChild=(margin/2);
const style= StyleSheet.create({
    halfCircleContainer:{
        height:heightCircle,
        borderBottomLeftRadius:heightCircle,
        borderTopLeftRadius:heightCircle,
        overflow:'visible',
        right:-heightCircle/4,
        top:-(marginChild),

        // top:-heightCircle/4,
    },
    circles:{
        // marginTop:margin,
        // marginBottom:margin,
        // overflow:'visible',
        // backgroundColor:'red',
        flexDirection:'row',
        justifyContent:'flex-end',
        alignItems:'center',
        marginTop:-(marginChild/2),
        marginRight:marginChild/2,
        marginBottom:5,
    },

    circle:{
        width:circleWidth,
        height:circleWidth,
        borderRadius:circleWidth,
        borderColor:'white',
        borderWidth:2,
        overflow:'visible',
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'#ffc800',
    },
    label:{
        color:'white',
        fontSize:18,
        marginRight:10,
    }

});

const mapDispatchToProps=(dispatch)=> {
    return{
        saveProducts:(products,page)=>{
            dispatch(saveProducts(products,page));
        },
        incPage:()=>{
            dispatch(incPage());
        },
        decPage:()=>{
            dispatch(decPage());
        },
        addProducts:(products)=>{
            dispatch(addProducts(products));
        },
    }
}
const mapStateToProps=state=>{
    return{
        user:state.user,
        categories:state.categories.categories,
    }
};
export default connect(mapStateToProps,mapDispatchToProps)(Absentia);