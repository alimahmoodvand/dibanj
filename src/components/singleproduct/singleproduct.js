import React, { Component } from 'react';
import HeaderLayout from "../../components/header/header";
import {Button, Container} from "native-base";
import {Image, ImageBackground, Text, View} from "react-native";
import styles from './singleproduct.css'
import {Actions} from "react-native-router-flux";
import FIcon from 'react-native-vector-icons/FontAwesome';
import {connect} from "react-redux";
import {
    addBasket, addBookmark, addCloud, removeBasket, removeBookmark, removeCloud,
    saveProducts
} from "../../redux/actions";

class SingleProduct extends Component{
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
            if(this.props.prod.productAndCourseId==this.props.basket.basket[i].productAndCourseId){
                return true;
            }
        }
        return false;
    }
    render(){
        const {prod}=this.props
        return(
            <View style={styles.main}>
                <Button style={styles.buy} title={prod.id} onPress={()=>alert("::::")}>
                <Text style={styles.proBtnText}>خرید</Text>
                </Button>
                <View style={styles.content}>
                    <View style={styles.details}>
                        <Text>{prod.Title}</Text>
                        <Text>{prod.TypeStr}</Text>
                        <Text>{prod.RegisterDeadLineStr}</Text>
                        <Text>{prod.Duration}</Text>
                        <Text>{prod.Description}</Text>
                    </View>
                    {this._getPrices(prod)}
                </View>
                <Button style={styles.sample} title={prod.id} onPress={()=>{
                    if(this._findBasket()){
                        alert("before add to basket")
                    }
                    else{
                        this.props.addBasket(prod);
                    }
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
export default connect(mapStateToProps,mapDispatchToProps)(SingleProduct);