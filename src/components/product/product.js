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
    render(){
        const {prod,bookmark}=this.props
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

        if(prod.subType==2&&prod.remainCount==0){
             overlay=<Image style={styles.imageLabel} source={require('../../assets/images/finish.png')}/>;
        }else if(prod.PriceAfterDiscount==0){
            overlay=<Image style={styles.imageLabel} source={require('../../assets/images/free.png')}/>;
        }
        else if(prod.isSpecial==1){
             overlay=<Image style={styles.imageLabel} source={require('../../assets/images/special.png')}/>;
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
                        ProductAndCourseId: item.ProductAndCourseId,
                    };
                    data.type = "delete";
                    this.props.removeBookmark(item)
                    Http._postAsyncData(data, 'bookmark')
                }} color="red" size={25}/>
                }
                <Button style={styles.buy} title={prod.id} onPress={()=>Actions.course({id:prod.ProductAndCourseId})}>
                    <Text style={styles.proBtnText}>جزئیات</Text>
                </Button>
                <View style={styles.content}>
                    <View style={styles.container}>
                    <View style={styles.details}>
                        <TouchableOpacity onPress={()=>Actions.course({id:prod.ProductAndCourseId})}>
                        <Text style={[styles.detalsText,{fontWeight:'bold'}]}>{prod.Title}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={()=>Actions.user({userId:prod.MasterId})}>
                            <Text style={styles.detalsText} >{prod.fullName}</Text>
                        </TouchableOpacity>
                        {duration&&
                        <TouchableOpacity onPress={()=>Actions.course({id:prod.ProductAndCourseId})}>
                        <Text style={styles.detalsText}>{'مدت دوره:'+prod.Duration}</Text>
                        </TouchableOpacity>
                        }
                        <TouchableOpacity onPress={()=>Actions.course({id:prod.ProductAndCourseId})}>
                        <Text style={[styles.detalsText]}>{(prod.persianRegisterDeadLine?prod.persianRegisterDeadLine.split(' ')[0]:'')}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={()=>Actions.course({id:prod.ProductAndCourseId})}>
                            {this._getPrices(prod)}
                        </TouchableOpacity>
                    </View>

                    <TouchableOpacity style={styles.image}  onPress={()=>Actions.course({id:prod.ProductAndCourseId})}>
                    <ImageBackground style={styles.image} source={{uri: prod.thumbnailUrl}}>{overlay}</ImageBackground>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.basket}>
                        {(prod.canBuySeperatly != 0&&prod.price>0)&&
                        <Button style={[styles.buyBtn,{backgroundColor:(prod.price>0?'#0094cc':'green')}]} title={prod.id} onPress={() => {
                            if (this._findBasket()) {
                                alert("قبلا به سبد اضافه شده است")
                            }
                            else if (prod.canBuySeperatly === 0) {
                                alert("این محصول جداگانه قابل خرید نیست ")
                            }
                            else {
                                alert("به سبد خرید اضافه شد")
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
                {prod.price == 0 &&
                <Button style={styles.sample} title={prod.id} onPress={() => {
                    Actions.lesson({ProductAndCourseId: prod.ProductAndCourseId, isSample: 0});
                }}>
                    <Text style={styles.proBtnText}>مشاهده</Text>
                </Button>
                }
                {prod.price > 0 &&
                <Button style={styles.sample} title={prod.id} onPress={() => {
                    Actions.lesson({ProductAndCourseId: prod.ProductAndCourseId, isSample: 1});
                }}>
                    <Text style={styles.proBtnText}>نمونه</Text>
                </Button>
                }
            </View>
        );
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
        basket:state.basket
    }
};
export default connect(mapStateToProps,mapDispatchToProps)(Product);