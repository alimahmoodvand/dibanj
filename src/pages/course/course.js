import React, { Component } from 'react';
import HeaderLayout from "../../components/header/header";
import {Button, Container} from "native-base";
import {FlatList, Image, ScrollView, SectionList, Slider, Switch, Text, TextInput, View,Share,ToastAndroid} from "react-native";
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
import CommentComp from "../../components/comment/comment";
import Stars from "react-native-stars-rating";
import AlertMessage from "../../services/alertmessage";
import Loading from "../../components/laoding/laoding";

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
            }, 4000),
            position: 1,
            interval: null,
            dataSource: [],
            favorite:false,
            save:false,
            loading:true,
        });
    }
    componentWillUnmount() {
        clearInterval(this.state.interval);
    }
    product={};
    childs=[];
    comments=[];
    rating=-1;
    _findProduct=async()=>{
        let data={
            UserId:this.props.user.userId,
            token:this.props.user.token,
            ProductAndCourseId:this.props.id,
        }
        // this.setState({loading:true})
       let response=await Http._postAsyncData(data,'singleProduct')
        if(Array.isArray(response)) {
            if(response[0][0]) {
                this.product = response[0][0];
                this.childs = response[1];
                this.comments = response[3];
                let cmt=false;
                if(Array.isArray(this.comments)){
                    this.comments.map((item)=>{
                        if(item.UserId==this.props.user.userId){
                            cmt=true
                        }
                    })
                }
                this.setState({
                    favorite: this.product.isLiked,
                    save: this.product.isBookmarked,
                    comment: cmt,
                    dataSource: response[2]
                })
            }
            else{
                alert('مجصولی یافت نشد')
                Actions.pop();
            }
        }
        this.setState({loading:false})
    }

    _renderItem = (item,index) => {
        item['id']=index;
       return( <Product prod={item}/>);
    };
    _renderWindowItem = (item,index) => {
        item['id']=index;
       return(<WindowProduct   prod={item}/>);
    };
    _renderCommentItem= (item, index) => {
        item['id'] = index
        return (<CommentComp cmnt={item} userId={this.props.user.userId} deleteComment={this._deleteComment}/>)
    };

    render() {
        const {category=false,search=false}=this.props;

        return (
            <View style={styles.main}>
                <Loading visible={this.state.loading} />
                <Image style={styles.bgimage} source={require('../../assets/images/bg.jpg')}/>

                <HeaderLayout category={category} search={search} back={true}/>

                <ScrollView style={styles.content}>
                    <View style={styles.filter}>
                        <MIcon style={styles.filterIcon} name="share" onPress={() =>{
                            Share.share({
                                message: this.product.shareText+'\r\n'+(this.product.shareUrl),
                                url: (this.product.shareUrl),
                                title: 'اشتراک گذاری'
                            }, {
                                // Android only:
                                dialogTitle: 'اشتراک گذاری',
                                // iOS only:
                                excludedActivityTypes: []
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
                                           Http._postAsyncData(data,'like')
                                           this.setState({favorite:!this.state.favorite})
                                       }
                                       //  else{
                                       //     data.type="delete";
                                       //     this.product.likeCount--;
                                       //     this.props.removeCloud(this.product)
                                       // }

                                   }} color={(!this.state.favorite?"white":"yellow")} size={25}/>
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
                                           ToastAndroid.showWithGravity(
                                               'به لیست علاقه مندی های شما افزوده شد',
                                               ToastAndroid.SHORT,
                                               ToastAndroid.CENTER
                                           );
                                       }
                                       else{
                                           data.type="delete";
                                           this.props.removeBookmark(this.product)
                                           ToastAndroid.showWithGravity(
                                               'از لیست علاقه مندی های شما حذف شد',
                                               ToastAndroid.SHORT,
                                               ToastAndroid.CENTER
                                           );
                                       }
                                       Http._postAsyncData(data,'bookmark')

                                       this.setState({save:!this.state.save})
                                   }}
                                   color={(!this.state.save?"white":"yellow")} size={25}/>
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
                    <SingleProduct prod={this.product}/>
                    {this.childs.length > 0 &&
                    <View style={styles.childHeader}>
                        <Text style={styles.childHeaderText}>
                            این دوره شامل دروس زیر است
                        </Text>
                    </View>
                    }
                    < FlatList
                        data={this.childs}
                        keyExtractor={(item,index)=>index.toString()}
                        renderItem={({item,index})=>
                        this._renderItem(item,index)
                    }/>
                    {
                        <View style={styles.commentsContainer}>
                            {this._renderHeaderComment()}
                            <View style={styles.comments}>
                                {this._renderHeader()}

                                <View style={styles.commentInputContainer}>
                                    <Stars
                                        isActive={true}
                                        rateMax={5}
                                        isHalfStarEnabled={false}
                                        onStarPress={(rating) => {this.rating=rating}}
                                        rate={1}
                                        size={20}
                                    />
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
                            <View style={styles.commentsSection}>
                                < FlatList
                                    data={this.comments}
                                    keyExtractor={(item,index)=>index.toString()}
                                    renderItem={({item,index})=>
                                        this._renderCommentItem(item,index)
                                    }/>
                            </View>
                        </View>
                    }
                    {/*<View style={styles.productsSection}>*/}
                        {/*{this._renderHeaderComment()}*/}
                        {/*<View style={styles.products}>*/}
                        {/*<FlatList*/}
                            {/*// numColumns={2}*/}
                            {/*horizontal={true}*/}
                            {/*// ListHeaderComponent={this._renderHeader}*/}
                            {/*data={this.props.products.products}*/}
                            {/*keyExtractor={(item,index)=>index.toString()}*/}
                            {/*renderItem={({item, index}) => {*/}
                                {/*this._renderWindowItem(item, index)*/}
                            {/*}}*/}
                        {/*/>*/}
                    {/*</View>*/}
                    {/*</View>*/}
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
    _deleteComment=async(cmnt)=>{
        let data={
            token:this.props.user.token,
            CommentId:cmnt.CommentId,
            ProductAndCourseId:this.props.id,
        }
        let response=await Http._postAsyncData(data,'comment/delete');
        if(Array.isArray(response)){
            this.comments=response
        }
        this.setState({comment:false})
    }
    sendComment=async()=> {
        if(this.comment.trim()!="") {
            if (this.rating > -1) {
                let data = {
                    token: this.props.user.token,
                    UserId: this.props.user.userId,
                    ProductAndCourseId: this.props.id,
                    Comment: this.comment,
                    Rate: this.rating,
                }
                this.setState({loading:true})
                let response = await Http._postAsyncData(data, 'comment/insert');
                if (Array.isArray(response)) {
                    this.comments = response
                    this.comment = "";
                    new AlertMessage().message('commentDone')
                }
                this.setState({comment: true})
            } else {
                new AlertMessage().error('rateEmpty')
            }
        }else{
            new AlertMessage().error('commentEmpty')
        }
        this.setState({loading:false})
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