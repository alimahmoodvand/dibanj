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

;

class Product extends Component{
    _getNotExistImage(prod){
        return(
            <Image style={styles.image} source={require('./../../assets/images/bg.jpg')}/>
        );
    }
    _getPrices(prod){
        return(
            <View style={styles.prices}>
                <Text style={{textDecorationLine: 'line-through', textDecorationStyle: 'solid'}}>
                    {prod.price}
                </Text>
                <Text>{prod.DiscountPercent}</Text>
                <Text>{prod.PriceAfterDiscount}</Text>
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
        prod.Thumbnail='http://dibanzh.raaz.co/images/dibanzh/thumbnails/'+prod.Thumbnail;
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
                        <WebView  style={styles.detalsText} source={{html:prod.Description.toString()}} />
                        <Text style={styles.detalsText}>{prod.RegisterDeadLine}</Text>
                        {this._getPrices(prod)}
                    </View>
                    <ImageBackground style={styles.image} source={{uri: prod.Thumbnail}}>
                    <Image style={styles.image} source={{uri: prod.Thumbnail}}/>
                </ImageBackground>
                    </View>
                    <View style={styles.basket}>
                        <Button style={styles.buyBtn} title={prod.id} onPress={()=>{
                            if(this._findBasket()){
                                alert("before add to basket")
                            }
                            else{
                                alert("add to basket")
                                this.props.addBasket(prod);
                            }
                        }}>
                            <Text style={styles.proBtnText}>خرید</Text>
                        </Button>
                </View>
                </View>
                <Button style={styles.sample} title={prod.id} onPress={()=>alert("not exist sample")}>
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