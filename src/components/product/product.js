import React, { Component } from 'react';
import HeaderLayout from "../../components/header/header";
import {Button, Container} from "native-base";
import {Image, ImageBackground, Linking, Text, TouchableOpacity, View, WebView} from "react-native";
import styles from './product.css'
import {Actions} from "react-native-router-flux";
import FIcon from 'react-native-vector-icons/FontAwesome';
import MIcon from 'react-native-vector-icons/MaterialIcons';
import {connect} from "react-redux";
import {addBasket, addProducts, removeBookmark, saveProducts} from "../../redux/actions";

//import HTML from 'react-native-render-html';
import Modal from "react-native-modal";
import Http from "../../services/http";
import AlertMessage from "../../services/alertmessage";


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
        let sectionStyle={};

        if( prod.price===0){
            sectionStyle={
            width:0,
                height:0
            }
            this.infoSideStyle={flex:0.9}
        }
        return(
            <View style={[styles.priceSide,sectionStyle]}>
            <View style={styles.prices}>

                <Text style={[{fontSize:10,fontWeight:'normal'}]}>
                    قیمت (تومان)
                </Text>
                { prod.price>0&&
                    <Text style={[decStyle,{fontSize:11,fontWeight:'normal'}]}>
                        {this._priceSeparate(prod.price)}
                    </Text>
                }
                {prod.DiscountPercent > 0 &&
                    <Text style={[{fontSize:11,fontWeight:'normal'}]}>{prod.DiscountPercent+'%'+' تخفیف'}</Text>
                }
                {prod.PriceAfterDiscount > 0&&
                <Text style={[{color:'green'},{fontSize:11,fontWeight:'normal'}]}>{this._priceSeparate(prod.PriceAfterDiscount)}</Text>
                }
            </View>
            </View>
        );
    }
    infoSideStyle={}
    _priceSeparate=(x)=>{
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, "/");

    };
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
        const {prod,bookmark,category,search,fromParent}=this.props
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
        // prod.Duration="10 روز"
        // prod.Title+=' '+prod.Title+' '+prod.Title+' '+prod.Title;
        if(prod.Duration&&prod.Duration.trim()!==''){
            duration=true;
        }
        let overlay=<Image style={styles.image} source={{uri: prod.thumbnailUrl}}/>;

        // let deadline=false;
        // if(prod.RegisterDeadLine){
        //     let now=new Date().getTime()
        //     let deadline=new Date(prod.RegisterDeadLine).getTime()
        //     if(deadline<now){
        //         deadline=true;
        //     }
        // }
        // console.log(prod)
        let price=this._getPrices(JSON.parse(JSON.stringify(prod)));
        // console.log(prod)
        let canBuy=this.canBuy(prod);
        let isFree=this.isFree(prod);
        return(
            <View style={styles.main}>
                {bookmark &&
                <MIcon style={{
                    // backgroundColor:'yellow',
                    position: 'absolute',
                    top: 0,
                    left: '7%',
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
                }} color="red" size={22}/>
                }
                <Button style={styles.buy} title={prod.id} onPress={()=>Actions.course({fromParent,id:prod.ProductAndCourseId,category,search})}>
                    <Text style={styles.proBtnText}>جزئیات</Text>
                </Button>
                <View style={styles.content}>
                    <View style={styles.container}>

                    <View style={styles.details}>
                        <View style={styles.images}>
                            {this._renderImages(prod)}
                        </View>

                        <View style={[styles.infoSide,this.infoSideStyle]}>
                        <TouchableOpacity style={styles.btns} onPress={()=>Actions.course({fromParent,id:prod.ProductAndCourseId,category,search})}>
                        <Text style={[styles.detalsText,{fontWeight:'bold'}]}>{prod.Title}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.btns} onPress={()=>Actions.user({userId:prod.MasterId,category,search})}>
                            <Text style={[styles.detalsText,{color:'blue'}]} >{prod.fullName}</Text>
                        </TouchableOpacity>
                        {duration&&
                        <TouchableOpacity style={styles.btns} onPress={()=>Actions.course({fromParent,id:prod.ProductAndCourseId,category,search})}>
                        <Text style={[styles.detalsText,{fontSize:10}]}>{'مدت دوره:'+prod.Duration}</Text>
                        </TouchableOpacity>
                        }
                        <TouchableOpacity  style={styles.btns} onPress={()=>Actions.course({fromParent,id:prod.ProductAndCourseId,category,search})}>
                        <Text style={[styles.detalsText,{textAlign:'right',fontSize:10}]}>{(prod.persianRegisterDeadLine&&prod.persianRegisterDeadLine!=="1"? 'مهلت ثبت نام: '+ prod.persianRegisterDeadLine.split(' ')[0].replace(/-/gi,'/'):'')}</Text>
                        </TouchableOpacity>
                        </View>
                        {/*<TouchableOpacity style={styles.btns} onPress={()=>Actions.course({fromParent,id:prod.ProductAndCourseId})}>*/}
                            {price}
                        {/*</TouchableOpacity>*/}
                    </View>
                        <TouchableOpacity style={styles.image}  onPress={()=>Actions.course({fromParent,id:prod.ProductAndCourseId,category,search})}>
                            <ImageBackground style={styles.image} source={{uri: prod.thumbnailUrl}}>{overlay}</ImageBackground>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.basket}>
                        {canBuy&&
                        <Button style={[styles.buyBtn,{backgroundColor:(prod.price>0?'rgb(255, 200, 0)':'rgb(255, 200, 0)')}]} title={prod.id} onPress={() => {
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
                            <Text style={styles.proBtnText}> افزودن به سبد خرید </Text>
                            }
                            {prod.price > 0 &&
                            <MIcon  name="shopping-basket"
                                    color="white" size={22}/>
                            }
                        </Button>
                        }
                        {isFree&&
                        <Button style={[styles.buyBtn,{backgroundColor:(prod.price>0?'rgb(255, 200, 0)':'rgb(255, 200, 0)')}]} title={prod.id} onPress={() => {
                            if (this._findProduct()) {
                                alert("قبلا به دوره های من اضافه شده است")
                            }else{
                                this._buyBasket(prod);
                                this.props.addProducts([prod]);
                            }
                        }}>
                            <Text style={styles.proBtnText}> افزودن به دوره های من </Text>
                            <MIcon  name="shopping-basket"
                                    color="white" size={22}/>
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
    _buyBasket=async(prod)=> {
        let data = {
                token: this.props.user.token,
                UserId: this.props.user.userId,
                products: [prod],
                address:0,
                discountCode: 0,
                discountId:  0,
            }
            let response = await Http._postAsyncData(data, 'order');
            // this.setState({loading:false})

            if ((response)&&response.orderId) {
                new AlertMessage().error("addedProduct");
            }else{
                new AlertMessage().error("serverError");
            }
        // console.log(response,data)
    }
    _renderImages=(prod)=> {
        let images = []
        if (prod.type === 1) {
            if ((prod.remainCount === 0 || prod.remainCount < -1) || new Date(prod.EndDate).getTime() < new Date().getTime()) {
                images.push(<Image style={styles.imageStickerDate} key={0}
                                   source={require('../../assets/images/finish.png')}/>);
            }
            else if (new Date(prod.StartDate).getTime() > new Date().getTime()) {
                images.push(<Image style={styles.imageStickerDate} key={3}
                                   source={require('../../assets/images/registering.png')}/>);
            }
            else if (new Date(prod.StartDate).getTime() < new Date().getTime() && new Date(prod.EndDate).getTime() > new Date().getTime()) {
                images.push(<Image style={styles.imageStickerDate} key={4}
                                   source={require('../../assets/images/progress.png')}/>);
            }
        }else{
            if (prod.subType===1&&prod.remainCount === 0) {
                images.push(<Image style={styles.imageStickerDate} key={0}
                                   source={require('../../assets/images/finish.png')}/>);
            }
        }
        let marginFree = {}
        // console.log(prod)
        if (prod.PriceAfterDiscount === 0) {
            images.push(<Image style={styles.imageStickerFree} key={1}
                               source={require('../../assets/images/free.png')}/>);
        } else {
            marginFree = {marginLeft: '20%'}
            //images.push(<Image style={[styles.imageStickerFree,{height:0}]} key={1} source={require('../../assets/images/free.png')}/>);

        }
        if (prod.isSpecial === 1) {
            images.push(<Image style={[styles.imageStickerFree, marginFree]} key={2}
                               source={require('../../assets/images/home/special.png')}/>);
        }
        return images.map((item, index) => {
            return item;
        })
    }
    canBuy=(prod)=>{
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
        // console.log((prod.canBuySeperatly != 0||!prod.ParentId),prod.PriceAfterDiscount>0,!deadline,!myProduct,!count,prod)
        if(((prod.canBuySeperatly != 0||!prod.ParentId)&&prod.PriceAfterDiscount>0)&&!deadline&&!myProduct&&!count){
            return true;
        }else{
            return false;
        }
    }
    isFree=(prod)=>{
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
        // console.log((prod.canBuySeperatly != 0||!prod.ParentId),prod.PriceAfterDiscount==0,!deadline,!myProduct,!count,prod)
        if(((prod.canBuySeperatly != 0||!prod.ParentId)&&prod.PriceAfterDiscount===0)&&!deadline&&!myProduct&&!count){
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
        addProducts:(products)=>{
            dispatch(addProducts(products));
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