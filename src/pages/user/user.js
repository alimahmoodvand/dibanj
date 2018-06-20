import React, { Component } from 'react';
import HeaderLayout from "../../components/header/header";
import {Button, Container} from "native-base";
import {FlatList, Image, ScrollView, SectionList, Slider, Switch, Text, View} from "react-native";
import styles from './user.css'
import {Actions} from "react-native-router-flux";
import FIcon from 'react-native-vector-icons/FontAwesome';
import Product from "../../components/product/product";
import Slideshow from 'react-native-slideshow';
import SingleProduct from "../../components/singleproduct/singleproduct";
import WindowProduct from "../../components/windowproduct/windowproduct";
import Stars from "react-native-stars-rating";
const SECTIONS = [
    {title:"home",content:new Date()
        ,image:{uri:"https://roocket.ir/public/image/2016/1/20/wordpress-cover-2.png"}},
    {title:"home",content:new Date()
        ,image:{uri:"https://roocket.ir/public/image/2016/1/20/wordpress-cover-2.png"}},
    {title:"home",content:new Date()
        ,image:{uri:"https://roocket.ir/public/image/2016/1/20/wordpress-cover-2.png"}},
    {title:"home",content:new Date()
        ,image:{uri:"https://roocket.ir/public/image/2016/1/20/wordpress-cover-2.png"}},
    {title:"home",content:new Date()
        ,image:{uri:"https://roocket.ir/public/image/2016/1/20/wordpress-cover-2.png"}},
];
export default class User extends Component{
    constructor(props) {
        super(props);
        this._renderItem = this._renderItem.bind(this);
        this.state = {
            position: 1,
            interval: null,
            dataSource: [
                {
                    url: 'https://roocket.ir/public/image/2016/1/20/wordpress-cover-2.png',
                }, {
                    url: 'http://placeimg.com/640/480/any',
                }, {
                    url: 'http://placeimg.com/640/480/dog',
                },
                {
                    url: 'https://roocket.ir/public/image/2016/1/20/wordpress-cover-2.png',
                }, {
                    url: 'http://placeimg.com/640/480/any',
                }, {
                    url: 'http://placeimg.com/640/480/dog',
                },
            ],
            products: [
                        {
                            teacher: "home", deadline: new Date()
                            , image: {uri: "https://roocket.ir/public/image/2016/1/20/wordpress-cover-2.png"}
                        },
                        {
                            teacher: "home", deadline: new Date()
                            , image: {uri: "https://roocket.ir/public/image/2016/1/20/wordpress-cover-2.png"}
                        },
                        {
                            teacher: "home", deadline: new Date()
                            , image: {uri: "https://roocket.ir/public/image/2016/1/20/wordpress-cover-2.png"}
                        },
                        {
                            teacher: "home", deadline: new Date()
                            , image: {uri: "https://roocket.ir/public/image/2016/1/20/wordpress-cover-2.png"}
                        },
                        {
                            teacher: "home", deadline: new Date()
                            , image: {uri: "https://roocket.ir/public/image/2016/1/20/wordpress-cover-2.png"}
                        },
                        {
                            teacher: "home", deadline: new Date()
                            , image: {uri: "https://roocket.ir/public/image/2016/1/20/wordpress-cover-2.png"}
                        },
                        {
                            teacher: "home", deadline: new Date()
                            , image: {uri: "https://roocket.ir/public/image/2016/1/20/wordpress-cover-2.png"}
                        },
                        {
                            teacher: "home", deadline: new Date()
                            , image: {uri: "https://roocket.ir/public/image/2016/1/20/wordpress-cover-2.png"}
                        }
            ]
        };
    }

    componentWillMount() {
        this.setState({
            interval: setInterval(() => {
                this.setState({
                    position: this.state.position+1 === this.state.dataSource.length ? 0 : this.state.position + 1
                });
            }, 2000)
        });
    }

    componentWillUnmount() {
        clearInterval(this.state.interval);
    }
    _renderItem = (item,index) => {
        item['id']=index;
       return( <Product prod={item}/>);
    };
    _renderWindowItem = (item,index) => {
        item['id']=index;
        // console.log( <WindowProduct  prod={item}/>)

       return(<WindowProduct   prod={item}/>);
    };
    render() {

        return (
            <View style={styles.main}>
                <Image style={styles.bgimage} source={require('../../assets/images/bg.jpg')}/>

                <HeaderLayout back={true}/>

                <ScrollView style={styles.content}>
                    <View style={styles.userInfo}>
                        <View style={styles.userInfoContainer} >
                            <Text style={styles.userInfoText}>sample</Text>
                            <Text style={styles.userInfoText}>sample</Text>
                            <Text style={styles.userInfoText}>sample</Text>

                        </View>
                        <View style={styles.userImageContainer}>
                            <Image style={styles.userImage} source={require('../../assets/images/bg.jpg')}/>
                        </View>
                    </View>
                    <View style={styles.courseInfo}>
                    <View style={styles.bookmarkContainer}>
                        <Text style={styles.bookmarkTitle}>
                            موضوعات مورد علاقه
                        </Text>
                        <View style={styles.bookmarks} >
                            <Text style={styles.bookmarkText}>
                                #پژوهشگر
                            </Text>
                            <Text style={styles.bookmarkText}>
                                #ورزشکار
                            </Text>
                            <Text style={styles.bookmarkText}>
                                #عکاس
                            </Text>
                        </View>
                    </View>
                        <View style={styles.commentsContainer} >
                            <View style={styles.commentsTitle}>
                                <Text style={styles.commentsTitleText}>
                                    comments
                                </Text>
                            </View>
                            <View style={styles.ratingContainer}>

                                {
                                    SECTIONS.map((item,index)=>{
                                            return  this._renderComments(item,index);
                                        }
                                    )

                                }
                            </View>
                        </View>
                    <View style={styles.productsSection}>
                    <View style={styles.products}>
                        <FlatList
                            numColumns={2}
                            ListHeaderComponent={this._renderHeader}
                            data={this.state.products}
                            keyExtractor={(item,index)=>index.toString()}
                            renderItem={({item,index})=>
                                this._renderWindowItem(item,index)
                            }
                        />
                    </View>
                    </View>
                    </View>
                </ScrollView>

            </View>
        );
    }
    _renderHeader() {
        return (
            <View style={styles.windowContainer}>
                <View style={styles.windowHeaderSection}>
                <View style={styles.windowHeader}>
                    <Text style={styles.windowHeaderText}>sample</Text>
                    <FIcon name="share-alt" onPress={() => Actions.pop()} color="white" size={25}/>
                </View>
                </View>
            </View>
        )
    }

    _renderComments(item,index) {
        return(<View key={index} style={styles.comments}>
            <View style={styles.rateContainer}>
            <Stars
                isActive={true}
                rateMax={5}
                isActive={false}
                isHalfStarEnabled={true}
                onStarPress={(rating) => {}}
                rate={index/2}
                size={20}
            />
        </View>
            <View style={styles.cemmentContainer}>
                <Text style={styles.commentText}>
                    {item.title} </Text>
            </View>

        </View>);
    }
}