import React, { Component } from 'react';
import HeaderLayout from "../../components/header/header";
import {Button, Container} from "native-base";
import {Image, ImageBackground, Text, View} from "react-native";
import styles from './basketproduct.css'
import {Actions} from "react-native-router-flux";
import FIcon from 'react-native-vector-icons/FontAwesome';
import MIcon from 'react-native-vector-icons/MaterialIcons';
import {connect} from "react-redux";
import {addBasket, removeBasket} from "../../redux/actions";

class BasketProduct extends Component{
    _getPrices=(prod)=>{
        let decStyle={color:'black'};
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
        return(
            <View style={styles.prices}>
                <Text style={[{fontSize:11,fontWeight:'normal',color:'black'}]}>
                    قیمت (تومان)
                </Text>
                { prod.price>0&&
                <Text style={[styles.detalsText,decStyle]}>
                    {prod.price}
                </Text>
                }
                {prod.DiscountPercent > 0 &&
                <Text style={styles.detalsText}>{prod.DiscountPercent+' %'}</Text>
                }
                {prod.PriceAfterDiscount > 0 &&
                <Text style={[styles.detalsText,{color:'green'}]}>{prod.PriceAfterDiscount}</Text>
                }
            </View>
        );
    }
    render(){
        const {prod}=this.props
        prod.Thumbnail= prod.Thumbnail;
        let maxlimit=50;
        let regex = /(<([^>]+)>)/ig
        if(prod.Description){
            prod.Description=prod.Description.replace(regex,'').replace(/(\&.*\;)/gi, '').replace(/^\s*$(?:\r\n?|\n)/gm,'')
        }
        prod.Description=(prod.Description&&((prod.Description).length > maxlimit) ?
            (((prod.Description).substring(0,maxlimit-3)) + '...') :
            prod.Description );
        let overlay=<Image style={styles.image} source={{uri: prod.thumbnailUrl}}/>;

        if(prod.subType==2&&prod.remainCount==0){
            overlay=<Image style={styles.imageLabel} source={require('../../assets/images/finish.png')}/>;
        }else if(prod.PriceAfterDiscount==0){
            overlay=<Image style={styles.imageLabel} source={require('../../assets/images/free.png')}/>;
        }
        else if(prod.isSpecial==1){
            overlay=<Image style={styles.imageLabel} source={require('../../assets/images/home/special.png')}/>;
        }
        return(
            <View style={styles.main}>

                <View style={styles.content}>
                    <ImageBackground style={styles.image} source={{uri: prod.thumbnailUrl}}>
                        {overlay}
                    </ImageBackground>
                    <View style={styles.details}>
                        <Text style={styles.detalsText}>{prod.Title}</Text>
                        <Text style={styles.detalsText}>{prod.fullName}</Text>
                        <Text style={styles.detalsText}>{prod.persianRegisterDeadLine&&prod.persianRegisterDeadLine!=="1"?prod.persianRegisterDeadLine.split(' ')[0].replace(/-/gi,'/'):''}</Text>
                    </View>
                    <View style={styles.prices}>
                        <View style={styles.price}>
                            {this._getPrices(prod)}
                        </View>
                        <View style={styles.delete}>
                            <MIcon name="delete-forever" onPress={()=>{
                                this.props.removeBasket(prod);
                            }} color="red" size={25}/>
                        </View>
                    </View>
                </View>

            </View>
        );
    }
}
const mapDispatchToProps=(dispatch)=> {
    return{
        removeBasket:(product)=>{
            dispatch(removeBasket(product));
        },

    }
}
const mapStateToProps=state=>{
    return{
        user:state.user,
        basket:state.basket
    }
};
export default connect(mapStateToProps,mapDispatchToProps)(BasketProduct);