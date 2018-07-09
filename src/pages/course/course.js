import React, { Component } from 'react';
import HeaderLayout from "../../components/header/header";
import {Button, Container} from "native-base";
import {FlatList, Image, ScrollView, SectionList, Slider, Switch, Text, TextInput, View,Share} from "react-native";
import styles from './course.css'
import {Actions} from "react-native-router-flux";
import FIcon from 'react-native-vector-icons/FontAwesome';
import Product from "../../components/product/product";
import Slideshow from 'react-native-slideshow';
import SingleProduct from "../../components/singleproduct/singleproduct";
import WindowProduct from "../../components/windowproduct/windowproduct";
import MIcon from 'react-native-vector-icons/MaterialIcons';
import {connect} from "react-redux";
import {
    saveProducts, addBookmark, removeBookmark, removeCloud, addCloud} from "../../redux/actions";
import Http from "../../services/http";

class Course extends Component{
    product=null;
    comment="";
    componentWillMount() {
        this._findProduct();
        this.setState({
            interval: setInterval(() => {
                this.setState({
                    position: this.state.position+1 === this.state.dataSource.length ? 0 : this.state.position + 1
                });
            }, 2000),
            position: 1,
            interval: null,
            dataSource: [],
            favorite:false,
            save:false,

        });
    }
    componentWillUnmount() {
        clearInterval(this.state.interval);
    }
    product={};
    childs=[];
    _findProduct=async()=>{
        // for(let i=0;i<this.props.products.products.length;i++){
        //     if(this.props.id===this.props.products.products[i].ProductAndCourseId){
        //         return this.props.products.products[i];
        //     }
        // }
        let data={
            UserId:this.props.user.userId,
            token:this.props.user.token,
            ProductAndCourseId:this.props.id,
        }
       let response=await Http._postAsyncData(data,'singleProduct')
        // console.log(response)
        if(Array.isArray(response)&&response.length==3) {
            // response.map((item,index)=>{
            //     if(item.ProductAndCourseId===this.props.id){
            //         this.product = item;
            //         response.splice(index,1)
            //     }
            // })
            this.product = response[0][0];
            this.childs=response[1];
            this.setState({
                favorite:   this.product.isLiked,
                save:   this.product.isBookmarked,
                comment: false,
                dataSource:response[2]
            })
        }

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
                    <View style={styles.filter}>
                        <MIcon style={styles.filterIcon} name="share" onPress={() =>{
                            Share.share({
                                message: 'BAM: we\'re helping your business with awesome React Native apps',
                                url: 'http://bam.tech',
                                title: 'Wow, did you see that?'
                            }, {
                                // Android only:
                                dialogTitle: 'Share BAM goodness',
                                // iOS only:
                                excludedActivityTypes: [
                                    'com.apple.UIKit.activity.PostToTwitter'
                                ]
                            })
                        }} color="white" size={25}/>
                            <MIcon style={styles.filterIcon} name={(this.state.favorite?"favorite":"favorite-border")}
                                   onPress={() => {
                                       let data={
                                           token:this.props.user.token,
                                           UserId:this.props.user.userId,
                                           ProductAndCourseId:this.props.id,
                                       }
                                       if(!this.state.favorite){
                                           data.type="insert";
                                           this.product.likeCount++;
                                           this.props.addCloud(this.product)
                                        }
                                        else{
                                           data.type="delete";
                                           this.product.likeCount--;
                                           this.props.removeCloud(this.product)
                                       }
                                       Http._postAsyncData(data,'like')

                                       this.setState({favorite:!this.state.favorite})
                                   }} color="white" size={25}/>
                        <Text style={[styles.filterIcon,{color:'white'}]}>{this.product.likeCount}</Text>
                        <View style={styles.filterExist} >
                            <MIcon style={styles.filterIcon} name={(this.state.save?"bookmark":"bookmark-border")}
                                   onPress={() =>{
                                       let data={
                                           token:this.props.user.token,
                                           UserId:this.props.user.userId,
                                           ProductAndCourseId:this.props.id,
                                       }
                                       if(!this.state.save){
                                           data.type="insert";
                                           this.props.addBookmark(this.product)
                                       }
                                       else{
                                           data.type="delete";
                                           this.props.removeBookmark(this.product)
                                       }
                                       Http._postAsyncData(data,'bookmark')

                                       this.setState({save:!this.state.save})
                                   }}
                                   color="white" size={25}/>
                        </View>
                    </View>
                    {
                        this.state.dataSource.length>0&&
                        <Slideshow
                            height={125}
                            containerStyle={styles.slideshow}
                            dataSource={this.state.dataSource}
                            position={this.state.position}
                            arrowSize={1}
                            indicatorSelectedColor='rgb(255, 200, 0)'
                            onPositionChanged={(position) => this.setState({position})}
                        />
                    }
                    <SingleProduct  prod={this.product}/>
                    <View style={styles.childHeader}>
                        <Text style={styles.childHeaderText}>
                            این دوره شامل مباحث زیر است
                        </Text>

                    </View>
                    <FlatList
                    data={this.childs}
                    keyExtractor={(item,index)=>index.toString()}
                    renderItem={({item,index})=>
                        this._renderItem(item,index)
                    }
                    />
                    {
                        !this.state.comment&&
                        <View style={styles.commentsContainer}>
                            {this._renderHeaderComment()}
                            <View style={styles.comments}>
                                {this._renderHeader()}
                                <View style={styles.commentInputContainer}>
                                    <TextInput
                                        style={styles.commentInput}
                                        multiline
                                        underlineColorAndroid='rgba(0,0,0,0)'
                                        placeholder='* نظر شما در مورد این مطلب چیست؟'
                                        editable={true}
                                        onChangeText={(text) => this.comment = text}
                                        maxLength={40}
                                    />
                                    <Button small style={styles.commentBtn} title={0}
                                            onPress={() => this.sendComment()}>
                                        <Text style={styles.commentBtnText}>ارسال</Text>
                                    </Button>
                                </View>

                            </View>
                        </View>
                    }
                    <View style={styles.productsSection}>
                        {this._renderHeaderComment()}
                        <View style={styles.products}>
                        <FlatList
                            // numColumns={2}
                            horizontal={true}
                            // ListHeaderComponent={this._renderHeader}
                            data={this.props.products.products}
                            keyExtractor={(item,index)=>index.toString()}
                            renderItem={({item,index})=>
                                this._renderWindowItem(item,index)
                            }
                        />
                    </View>
                    </View>
                </ScrollView>

            </View>
        );
    }
    _renderHeader() {
        return (
            <View></View>
            /*<View style={styles.windowContainer}>
                <View style={styles.windowHeaderSection}>
                <View style={styles.windowHeader}>
                    <Text style={styles.windowHeaderText}>دیگران هم خریده اند</Text>
                    <MIcon name="supervisor-account" onPress={() => Actions.pop()} color="white" size={25}/>
                </View>
                </View>
            </View>*/
        )
    }
    _renderHeaderComment() {
        return (
            <View style={styles.headerCommentContainer}>
                <View style={styles.headerCommentHeaderSection}>
                <View style={styles.headerCommentHeader}>
                    <Text style={styles.headerCommentHeaderText}>نظرات</Text>
                    <MIcon name="comment" onPress={() => Actions.pop()} color="white" size={25}/>
                </View>
                </View>
            </View>
        )
    }

    sendComment=async()=> {
        let data={
            token:this.props.user.token,
            UserId:this.props.user.userId,
            ProductAndCourseId:this.props.id,
            Comment:this.comment
        }
        let response=await Http._postAsyncData(data,'comment/delete');
        console.log(response)
        this.setState({comment:true})
    }
}
const mapDispatchToProps=(dispatch)=> {
    return{
        saveProducts:(products,page)=>{
            dispatch(saveProducts(products,page));
        },
        addBookmark:(product)=>{
            dispatch(addBookmark(product));
        },
        removeBookmark:(product)=>{
            dispatch(removeBookmark(product));
        },
        addCloud:(product)=>{
            dispatch(addCloud(product));
        },
        removeCloud:(product)=>{
            dispatch(removeCloud(product));
        }

    }
}
const mapStateToProps=state=>{
    return{
        user:state.user,
        products:state.products,
    }
};
export default connect(mapStateToProps,mapDispatchToProps)(Course);