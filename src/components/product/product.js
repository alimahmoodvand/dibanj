import React, { Component } from 'react';
import HeaderLayout from "../../components/header/header";
import {Button, Container} from "native-base";
import {Image, ImageBackground, Text, View, WebView} from "react-native";
import styles from './product.css'
import {Actions} from "react-native-router-flux";
import FIcon from 'react-native-vector-icons/FontAwesome';
import MIcon from 'react-native-vector-icons/MaterialIcons';
import {connect} from "react-redux";
import {addBasket, saveProducts} from "../../redux/actions";

import HTML from 'react-native-render-html';
import Modal from "react-native-modal";


class Product extends Component{
    _getNotExistImage(prod){
        return(
            <Image style={styles.image} source={require('./../../assets/images/bg.jpg')}/>
        );
    }
    _getPrices(prod){
        return(
            <View style={styles.prices}>
                { prod.price>0&&
                    <Text style={{textDecorationLine: 'line-through', textDecorationStyle: 'solid'}}>
                        {prod.price}
                    </Text>
                }
                {prod.DiscountPercent > 0 &&

                <Text>{prod.DiscountPercent}</Text>
                }
                {prod.PriceAfterDiscount > 0 &&
                <Text>{prod.PriceAfterDiscount}</Text>
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
        const {prod}=this.props
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
        // console.log(prod,(prod.Duration&&prod.Duration.trim()!==''),prod.Duration,prod.Duration.trim()!=='',duration)
        // prod.Description=(((prod.Description).length > maxlimit) ?
        //     (((prod.Description).substring(0,maxlimit-3)) + '...') :
        //     prod.Description );
        return(
            <View style={styles.main}>
                {/*<Button style={styles.buy} title={prod.id} onPress={()=>{
                    console.log(prod)
                    Actions.course(prod)

                }}>
                <Text style={styles.proBtnText}>جزئیات</Text>
                </Button>*/}
                <Button style={styles.buy} title={prod.id} onPress={()=>Actions.course({id:prod.ProductAndCourseId})}>
                    <Text style={styles.proBtnText}>جزئیات</Text>
                </Button>
                <View style={styles.content}>
                    <View style={styles.container}>
                    <View style={styles.details}>
                        <Text style={styles.detalsText}>{prod.Title}</Text>
                        <Text style={styles.detalsText} >{prod.fullName}</Text>
                        {duration&&
                        <Text style={styles.detalsText}>{'مدت دوره:'+prod.Duration}</Text>
                        }
                        {duration==false&&
                        <Text style={styles.detalsText}>{prod.Description}</Text>
                        }

                        <Text style={styles.detalsText}>{prod.persianRegisterDeadLine?prod.persianRegisterDeadLine.split(' ')[0]:'ندارد'}</Text>
                        {this._getPrices(prod)}
                    </View>
                    <ImageBackground style={styles.image} source={{uri: prod.thumbnailUrl}}>
                    <Image style={styles.image} source={{uri: prod.thumbnailUrl}}/>
                </ImageBackground>
                    </View>
                    <View style={styles.basket}>
                        {prod.canBuySeperatly != 0 &&
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
                <Button style={styles.sample} title={prod.id} onPress={()=>{
                    Actions.lesson({ProductAndCourseId:prod.ProductAndCourseId,isSample:1});
                }}>
                    <Text style={styles.proBtnText}>نمونه</Text>
                </Button>
            </View>
        );
    }
}
const mapDispatchToProps=(dispatch)=> {
    return{
        addBasket:(product)=>{
            dispatch(addBasket(product));
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