import React, { Component } from 'react';
import HeaderLayout from "../../components/header/header";
import {Button, Container} from "native-base";
import {Image, ImageBackground, Text, TouchableOpacity, View, WebView} from "react-native";
import styles from './product.css'
import {Actions} from "react-native-router-flux";
import FIcon from 'react-native-vector-icons/FontAwesome';
import MIcon from 'react-native-vector-icons/MaterialIcons';
import {connect} from "react-redux";
import {addBasket, removeBookmark, saveProducts} from "../../redux/actions";

//import HTML from 'react-native-render-html';
import Modal from "react-native-modal";
import Http from "../../services/http";


class Product extends Component{
    _getNotExistImage(prod){
        return(
            <Image style={styles.image} source={require('./../../assets/images/bg.jpg')}/>
        );
    }
    _getPrices=(prod)=>{
        let decStyle={color:'black',textAlign:'right'};
        if(prod.DiscountPercent!=0||prod.PriceAfterDiscount!=0){
            // console.log(prod,decStyle,prod.PriceAfterDiscount,prod.price,prod.DiscountPercent)
            decStyle={textDecorationLine: 'line-through', textDecorationStyle: 'solid',color:'red', textDecorationColor: 'red'};
            if(prod.DiscountPercent==0&&prod.PriceAfterDiscount!=0){
                prod.PriceAfterDiscount=parseInt((prod.DiscountPercent/prod.price)*100);
            }
            else if(prod.DiscountPercent!=0&&prod.PriceAfterDiscount==0){
                prod.DiscountPercent=prod.price*parseInt(prod.PriceAfterDiscount/100)
            }
        }
        // console.log(prod,decStyle,prod.PriceAfterDiscount,prod.price,prod.DiscountPercent)
        if(prod.PriceAfterDiscount==prod.price||(prod.PriceAfterDiscount==0&&prod.DiscountPercent==0)){
            prod.PriceAfterDiscount=0;
            decStyle={color:'black'}
        }
        // console.log(prod,decStyle,prod.PriceAfterDiscount,prod.price,prod.DiscountPercent)
        // decStyle.backgroundColor='red';
        return(
            <View style={styles.prices}>
                { prod.price>0&&
                    <Text style={[decStyle]}>
                        {prod.price}
                    </Text>
                }
                {prod.DiscountPercent > 0 &&
                    <Text >{prod.DiscountPercent+'%'}</Text>
                }
                {prod.PriceAfterDiscount > 0&&
                <Text style={[{color:'green'}]}>{prod.PriceAfterDiscount}</Text>
                }
            </View>
        );
    }
    _findBasket=()=>{
        for(let i=0;i<this.props.basket.basket.length;i++){
            if(this.props.prod.ProductAndCourseId==this.props.basket.basket[i].ProductAndCourseId){
                return true;
            }
        }
        return false;
    }
    _findProduct=()=>{
        for(let i=0;i<this.props.products.length;i++){
            if(this.props.prod.ProductAndCourseId==this.props.products[i].ProductAndCourseId){
                return true;
            }
        }
        return false;
    }
    render(){
        const {prod,bookmark,category,search}=this.props
        const myProduct=this._findProduct();
        // console.log(prod)
        let maxlimit=50;
        let regex = /(<([^>]+)>)/ig
        if(prod.Description){
            prod.Description=prod.Description.replace(regex,'').replace(/(\&.*\;)/gi, '').replace(/^\s*$(?:\r\n?|\n)/gm,'')
        }
        prod.Description=(prod.Description&&((prod.Description).length > maxlimit) ?
            (((prod.Description).substring(0,maxlimit-3)) + '...') :
            prod.Description );
        let duration=false;
        if(prod.Duration&&prod.Duration.trim()!==''){
            duration=true;
        }
        let overlay=<Image style={styles.image} source={{uri: prod.thumbnailUrl}}/>;

        if(prod.subType==1&&prod.remainCount<1){
             overlay=<Image style={styles.imageLabel} source={require('../../assets/images/finish.png')}/>;
        }else if(prod.PriceAfterDiscount==0){
            overlay=<Image style={styles.imageLabel} source={require('../../assets/images/free.png')}/>;
        }
        else if(prod.isSpecial==1){
             overlay=<Image style={styles.imageLabel} source={require('../../assets/images/special.png')}/>;
        }
        let deadline=false;
        if(prod.RegisterDeadLine){
            let now=new Date().getTime()
            let deadline=new Date(prod.RegisterDeadLine).getTime()
            if(deadline<now){
                deadline=true;
            }
        }
        return(
            <View style={styles.main}>
                {bookmark &&
                <MIcon style={{
                    // backgroundColor:'yellow',
                    position: 'absolute',
                    top: 0,
                    left: '13%',
                    zIndex: 101,
                    // width:'100%',

                }} name="delete-forever" onPress={() => {
                    let data = {
                        token: this.props.user.token,
                        UserId: this.props.user.userId,
                        ProductAndCourseId: prod.ProductAndCourseId,
                    };
                    data.type = "delete";
                    this.props.removeBookmark(prod)
                    Http._postAsyncData(data, 'bookmark')
                }} color="red" size={25}/>
                }
                <Button style={styles.buy} title={prod.id} onPress={()=>Actions.course({id:prod.ProductAndCourseId,category,search})}>
                    <Text style={styles.proBtnText}>جزئیات</Text>
                </Button>
                <View style={styles.content}>
                    <View style={styles.container}>
                    <View style={styles.details}>
                        <TouchableOpacity style={styles.btns} onPress={()=>Actions.course({id:prod.ProductAndCourseId,category,search})}>
                        <Text style={[styles.detalsText,{fontWeight:'bold'}]}>{prod.Title}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.btns} onPress={()=>Actions.user({userId:prod.MasterId,category,search})}>
                            <Text style={[styles.detalsText,{color:'blue'}]} >{prod.fullName}</Text>
                        </TouchableOpacity>
                        {duration&&
                        <TouchableOpacity style={styles.btns} onPress={()=>Actions.course({id:prod.ProductAndCourseId,category,search})}>
                        <Text style={styles.detalsText}>{'مدت دوره:'+prod.Duration}</Text>
                        </TouchableOpacity>
                        }
                        <TouchableOpacity  style={styles.btns} onPress={()=>Actions.course({id:prod.ProductAndCourseId,category,search})}>
                        <Text style={[styles.detalsText]}>{(prod.persianRegisterDeadLine?prod.persianRegisterDeadLine.split(' ')[0]:'')}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.btns} onPress={()=>Actions.course({id:prod.ProductAndCourseId})}>
                            {this._getPrices(prod)}
                        </TouchableOpacity>
                    </View>

                    <TouchableOpacity style={styles.image}  onPress={()=>Actions.course({id:prod.ProductAndCourseId,category,search})}>
                    <ImageBackground style={styles.image} source={{uri: prod.thumbnailUrl}}>{overlay}</ImageBackground>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.basket}>
                        {this.canBy(prod)&&
                        <Button style={[styles.buyBtn,{backgroundColor:(prod.price>0?'#0094cc':'green')}]} title={prod.id} onPress={() => {
                            if (this._findBasket()) {
                                alert("قبلا به سبد اضافه شده است")
                            }else{
                                this.props.addBasket(prod);
                            }
                        }}>
                            {prod.price == 0 &&
                            <Text style={styles.proBtnText}>رایگان</Text>
                            }
                            {prod.price > 0 &&
                            <Text style={styles.proBtnText}>خرید</Text>
                            }
                        </Button>
                        }
                    </View>
                </View>
                {(prod.price == 0||myProduct)&&
                <Button style={styles.sample} title={prod.id} onPress={() => {
                    Actions.lesson({ProductAndCourseId: prod.ProductAndCourseId, isSample: 0,category,search});
                }}>
                    <Text style={styles.proBtnText}>مشاهده</Text>
                </Button>
                }
                {(prod.price > 0 &&!myProduct)&&
                <Button style={styles.sample} title={prod.id} onPress={() => {
                    Actions.lesson({ProductAndCourseId: prod.ProductAndCourseId, isSample: 1,category,search});
                }}>
                    <Text style={styles.proBtnText}>نمونه</Text>
                </Button>
                }
            </View>
        );
    }
    canBy=(prod)=>{
        let deadline=false;
        if(prod.RegisterDeadLine){
            // let now=new Date(new Date().toISOString()).getTime()
            // let deadline=new Date(prod.RegisterDeadLine).getTime()
            // console.log((new Date(prod.RegisterDeadLine)-new Date(new Date().toISOString())),deadline<now,deadline,now,new Date(prod.RegisterDeadLine),new Date(),prod.Title)
            if((new Date(prod.RegisterDeadLine)-new Date(new Date().toISOString()))<0){
                deadline=true;
            }
        }
        let count=false;
        if(prod.remainCount!==-1&&prod.remainCount<1){
            count=true;
        }
            const myProduct=this._findProduct();
        // console.log((prod.canBuySeperatly != 0||!prod.ParentId),prod.price>0,!deadline,!myProduct,!count)
        if(((prod.canBuySeperatly != 0||!prod.ParentId)&&prod.price>0)&&!deadline&&!myProduct&&!count){
            return true;
        }else{
            return false;
        }
    }
}
const mapDispatchToProps=(dispatch)=> {
    return{
        addBasket:(product)=>{
            dispatch(addBasket(product));
        },
        removeBookmark:(product)=>{
            dispatch(removeBookmark(product));
        },
    }
}
const mapStateToProps=state=>{
    return{
        user:state.user,
        products:state.products.products,
        basket:state.basket
    }
};
export default connect(mapStateToProps,mapDispatchToProps)(Product);