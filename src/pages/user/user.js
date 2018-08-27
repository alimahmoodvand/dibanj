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
import {connect} from "react-redux";
import Http from "../../services/http";
class User extends Component{
    constructor(props) {
        super(props);
        this._renderItem = this._renderItem.bind(this);

        this.state = {
            updateUI:0,
        };
    }
    _getUserCats=async()=>{
        let response = await Http._postAsyncData({userId:this.props.userId,token:this.props.user.token},'userCategoryBookmarks');
        // console.log(response)
        if(Array.isArray(response)){
            this.userCats=response;
            this.setState({updateUI:this.state.updateUI++});
        }
    }
    _getUserComments=async()=>{
        let response = await Http._postAsyncData({userId:this.props.userId,token:this.props.user.token},'userComments');
        // console.log(response)
        if(Array.isArray(response)){
            this.userComments=response[1]?response[1]:[];
            this.user=response[0][0]?response[0][0]:null;
            this.setState({updateUI:this.state.updateUI++});
        }
    }
    userCats=[];
    userComments=[];
    user=null;
    componentWillMount() {
        this._getUserCats();
        this._getUserComments();
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
       return(<WindowProduct   prod={item}/>);
    };
    render() {

        return (
            <View style={styles.main}>
                <Image style={styles.bgimage} source={require('../../assets/images/bg.jpg')}/>

                <HeaderLayout back={true}/>

                <ScrollView style={styles.content}>
                    {this.user &&
                    <View style={styles.userInfo}>

                        <View style={styles.userInfoContainer}>
                            <Text style={styles.userInfoText}>{this.user.fullName}</Text>
                            <Text style={styles.userInfoText}>{this.user.ostan}</Text>
                            <Text style={styles.userInfoText}>{this.user.persianRegdate.split(' ')[0]}</Text>
                        </View>
                        <View style={styles.userImageContainer}>
                            <Image style={styles.userImage} source={{uri: this.user.imageUrl}}/>
                        </View>
                    </View>
                    }
                    <View style={styles.courseInfo}>
                    <View style={styles.bookmarkContainer}>
                        <Text style={styles.bookmarkTitle}>
                            موضوعات مورد علاقه
                        </Text>
                        <View style={styles.bookmarks} >
                            {
                                this.userCats.map((item,index)=>{
                                    return( <Text key={index} style={styles.bookmarkText}>
                                            #{item.title}
                                        </Text>)
                                })
                            }
                        </View>
                    </View>
                        <View style={styles.commentsContainer} >
                            <View style={styles.commentsTitle}>
                                <Text style={styles.commentsTitleText}>
                                    نظرات اساتید
                                </Text>
                            </View>
                            <View style={styles.ratingContainer}>

                                {
                                    this.userComments.map((item,index)=>{
                                            return  this._renderComments(item,index);
                                        }
                                    )

                                }
                            </View>
                        </View>
                    <View style={styles.productsSection}>
                    <View style={styles.products}>
                        {/*<FlatList*/}
                            {/*numColumns={2}*/}
                            {/*ListHeaderComponent={this._renderHeader}*/}
                            {/*data={this.state.products}*/}
                            {/*keyExtractor={(item,index)=>index.toString()}*/}
                            {/*renderItem={({item,index})=>*/}
                                {/*this._renderWindowItem(item,index)*/}
                            {/*}*/}
                        {/*/>*/}
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
                    {item.comment} </Text>
            </View>

        </View>);
    }

    _renderCats=()=> {

    }
}
const mapStateToProps=state=>{
    return{
        user:state.user,
    }
};
export default connect(mapStateToProps,null)(User);