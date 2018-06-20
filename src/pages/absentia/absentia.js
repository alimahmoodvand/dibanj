import React, { Component } from 'react';
import HeaderLayout from "../../components/header/header";
import {Button, Container, Spinner} from "native-base";
import {Dimensions, FlatList, Image, RefreshControl, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import styles from './absentia.css'
import {Actions} from "react-native-router-flux";
import FIcon from 'react-native-vector-icons/FontAwesome';
import Product from "../../components/product/product";
// import SVGImage from 'react-native-remote-svg'
import MIcon from 'react-native-vector-icons/MaterialIcons';
import {addProducts, decPage, incPage, saveProducts} from "../../redux/actions";
import Http from "../../services/http";
import {connect} from "react-redux";

const {height, width} = Dimensions.get('window');
class Absentia extends Component {
    _getdata=async()=>{
       console.log({page:this.state.page,token:this.props.user.token})
            let response = await Http._postAsyncData({page:this.state.page,token:this.props.user.token},'products');
            console.log(response)
            if(Array.isArray(response)){
                this.products=this.products.concat(response);
                this.setState({page:this.state.page+1});

            }
    }
    page=1;
    products=[];
    componentWillMount=()=> {
        this.setState({
            selectable:'',
            selected:{},
            ddlist:false,
            refreshing:false,
            page:1
        })
        this.filterOptions={
            sort:[
                {
                    title:'کمترین قیمت'
                },{
                    title:'بیشترین قیمت'
                },{
                    title:'جدیدترین'
                },{
                    title:'پرفروش ترین'
                },
            ],
            cat:[
                {
                    title:'دسته موضوعی سطح اول'
                },{
                    title:'دسته موضوعی سطح اول'
                },{
                    title:'دسته موضوعی سطح اول'
                },{
                    title:'دسته موضوعی سطح اول'
                },{
                    title:'دسته موضوعی سطح اول'
                },{
                    title:'دسته موضوعی سطح اول'
                },{
                    title:'دسته موضوعی سطح اول'
                },{
                    title:'دسته موضوعی سطح اول'
                },
            ],
            filter:[
                {
                    title:'دوره های در حال ثبت نام',
                },{
                    title:'دوره های جاری',
                },{
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
                    </View>
                    <View style={styles.filter}>
                        {
                            this.state.ddlist&&
                            (this._renderFilter())
                        }
                    </View>
                    <View style={style.circles}>
                        <Text style={style.label}>
                            دوره های مجازی
                        </Text>
                        <View style={[style.circle]}>
                            {/*<SVGImage style={styles.menuIcon} source={require('../../assets/images/absentia.svg')}/>*/}
                            <Image style={styles.menuIcon} source={require('../../assets/images/absentia.png')} />
                        </View>

                    </View>
                    <View style={styles.products}>
                        <FlatList
                            data={this.products}
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
                            ListEmptyComponent={()=><Spinner/>}
                            onEndReached={()=>{
                                // if(this.products.length>0)
                                this._getdata();
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
                          <Button key={index} title={index} onPress={()=>{this.setState({selected:item,ddlist:false})}} style={styles.ddlist}><Text style={{color:item==this.state.selected?'yellow':'black'}}>{item.title}</Text></Button>
                      );
                  })
              }
            <View style={styles.collapseContainer}>
                <MIcon name="keyboard-arrow-up" onPress={() => this.setState({
                    ddlist:!this.state.ddlist
                })} color="yellow"
                       size={25}/>
            </View>
        </View>
      )
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
        // products:state.products,
    }
};
export default connect(mapStateToProps,mapDispatchToProps)(Absentia);