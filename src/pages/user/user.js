import React, { Component } from 'react';
import HeaderLayout from "../../components/header/header";
import {Button, Container, Spinner} from "native-base";
import {FlatList, Image, RefreshControl, ScrollView, SectionList, Slider, Switch, Text, View} from "react-native";
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

    }
    state = {
        updateUI:0,
        refreshing:false,
        showSpinner:true,
    };
    page=1;
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
    pending=false;
    _getMasterProduct=async()=>{
        if(!this.pending) {
            this.pending=true;
            let response = await Http._postAsyncData({
                userId: this.props.userId,
                token: this.props.user.token,
                page: this.page
            }, 'masterProduct');
            if (Array.isArray(response)) {
                this.masterProduct = this.masterProduct.concat(response[1] ? response[1] : []);
                this.user = response[0][0] ? response[0][0] : null;
                if (this.masterProduct.length == 0) {
                    this.showSpinner = false;
                } else {
                    this.showSpinner = true;
                }
                if (response && response[1] && response[1].length > 0)
                    this.page = this.page + 1;
                this.setState({updateUI: this.state.updateUI++});
            }
            this.pending=false;
        }
        // console.log(this.page,this.state)
    }
    userCats=[];
    userComments=[];
    masterProduct=[];
    user=null;
    componentWillMount() {
        const {isUser}=this.props;
        if(isUser) {
            this._getUserCats();
            this._getUserComments();
        }else{
            this._getMasterProduct();
        }
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

                <View style={styles.content}>
                    {/*<View style={styles.userInfo}*/}
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
                {/*</View>*/}
                    {(this.userCats.length + this.userComments.length) > 0 &&

                    <ScrollView>
                        <View style={styles.courseInfo}>
                            {this.userCats.length > 0 &&
                            <View style={styles.bookmarkContainer}>
                                <Text style={styles.bookmarkTitle}>
                                    موضوعات مورد علاقه
                                </Text>
                                <View style={styles.bookmarks}>
                                    {
                                        this.userCats.map((item, index) => {
                                            return (<Text key={index} style={styles.bookmarkText}>
                                                #{item.title}
                                            </Text>)
                                        })
                                    }
                                </View>
                            </View>
                            }
                            {this.userComments.length > 0 &&
                            <View style={styles.commentsContainer}>
                                <View style={styles.commentsTitle}>
                                    <Text style={styles.commentsTitleText}>
                                        نظرات اساتید
                                    </Text>
                                </View>
                                <View style={styles.ratingContainer}>

                                    {
                                        this.userComments.map((item, index) => {
                                                return this._renderComments(item, index);
                                            }
                                        )

                                    }
                                </View>
                            </View>
                            }
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
                    }
                    {this.masterProduct.length > 0 &&

                    <View style={styles.masterProduct}>
                        <FlatList
                        data={this.masterProduct}
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
                        console.log("onEndReached")
                        this._getMasterProduct();
                    }}
                        onEndReachedThreshold={0.1}
                        />
                        </View>
                    }
                </View>

            </View>
        );
    }
    _pullRefresh=async()=>{
        this.setState({
            refreshing:true
        });
        await this._getMasterProduct();
        this.setState({
            refreshing:false
        });
    }
    _renderHeader=()=> {
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

    _renderMasterProduct=(item, index)=> {
            item['id']=index;
            return( <Product prod={item}/>);
    }
}
const mapStateToProps=state=>{
    return{
        user:state.user,
    }
};
export default connect(mapStateToProps,null)(User);