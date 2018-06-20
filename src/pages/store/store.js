import React, { Component } from 'react';
import HeaderLayout from "../../components/header/header";
import {Button, Container} from "native-base";
import {Dimensions, FlatList, Image, Switch, Text, View, StyleSheet, TouchableOpacity} from "react-native";
import styles from './store.css'
import {Actions} from "react-native-router-flux";
import FIcon from 'react-native-vector-icons/FontAwesome';
import Product from "../../components/product/product";
// import SVGImage from 'react-native-remote-svg'
import MIcon from 'react-native-vector-icons/MaterialIcons';

const {height, width} = Dimensions.get('window');

export default class Store extends Component{
    componentWillMount(){
        this.setState({
            products:[
                {teacher:"home",deadline:new Date()
                    ,image:{uri:"https://roocket.ir/public/image/2016/1/20/wordpress-cover-2.png"}},
                {teacher:"home",deadline:new Date()
                    ,image:{uri:"https://roocket.ir/public/image/2016/1/20/wordpress-cover-2.png"}},
                {teacher:"home",deadline:new Date()
                    ,image:{uri:"https://roocket.ir/public/image/2016/1/20/wordpress-cover-2.png"}},
                {teacher:"home",deadline:new Date()
                    ,image:{uri:"https://roocket.ir/public/image/2016/1/20/wordpress-cover-2.png"}},
                {teacher:"home",deadline:new Date()
                    ,image:{uri:"https://roocket.ir/public/image/2016/1/20/wordpress-cover-2.png"}},
                {teacher:"home",deadline:new Date()
                    ,image:{uri:"https://roocket.ir/public/image/2016/1/20/wordpress-cover-2.png"}},
                {teacher:"home",deadline:new Date()
                    ,image:{uri:"https://roocket.ir/public/image/2016/1/20/wordpress-cover-2.png"}},
                {teacher:"home",deadline:new Date()
                    ,image:{uri:"https://roocket.ir/public/image/2016/1/20/wordpress-cover-2.png"}},
                {teacher:"home",deadline:new Date()
                    ,image:{uri:"https://roocket.ir/public/image/2016/1/20/wordpress-cover-2.png"}},
            ]
        })
    }
    _renderItem = (item,index) => {
        item['id']=index;
       return( <Product prod={item}/>);
    };
    state = {
        exist: false
    };
    render() {
        return (
            <View style={styles.main}>
                <Image style={styles.bgimage} source={require('../../assets/images/bg.jpg')}/>

                <HeaderLayout back={true}/>
                <View style={styles.content}>
                    <View style={[styles.halfCircleContainer, style.halfCircleContainer]}>
                    </View>
                    <View style={styles.filter}>
                        <TouchableOpacity style={styles.filterImageContainer}>
                            <Image style={styles.filterImage} source={require('../../assets/images/filter.png')}/>
                        </TouchableOpacity>
                        <MIcon style={styles.filterIcon} name="filter-list" onPress={() => Actions.pop()} color="white"
                               size={25}/>
                        <MIcon style={styles.filterIcon} name="sort" onPress={() => Actions.pop()} color="white"
                               size={25}/>
                        <View style={styles.filterExist} >
                            <Text style={styles.filterExistText}> محصولات موجود</Text>
                            <Switch   value={ this.state.exist }
                                      onValueChange={(exist) => this.setState({exist})}
                                      tintColor="white" onTintColor="yellow" thumbTintColor="yellow"/>
                        </View>
                    </View>
                    <View style={style.circles}>
                        <Text style={style.label}>
                            فروشگاه
                        </Text>
                        <View style={[styles.circle, style.circle]}>
                            <Image style={styles.menuIcon} source={require('../../assets/images/course.png')} />
                        </View>
                    </View>
                    <View style={styles.products}>
                        <FlatList
                            data={this.state.products}
                            keyExtractor={(item,index)=>index.toString()}
                            renderItem={({item,index})=>
                                this._renderItem(item,index)
                            }
                        />
                    </View>
                </View>
            </View>
        );
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