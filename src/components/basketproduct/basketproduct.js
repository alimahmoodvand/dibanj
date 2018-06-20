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
    render(){
        const {prod}=this.props
        return(
            <View style={styles.main}>

                <View style={styles.content}>
                    <ImageBackground style={styles.image} source={{uri:prod.image}}>
                    </ImageBackground>
                    <View style={styles.details}>
                        <Text>{prod.title}</Text>
                        <Text>{prod.description}</Text>
                    </View>
                    <View style={styles.prices}>
                        <View style={styles.price}>
                            <Text style={styles.priceText}>
                                {prod.priceAfterDiscount}
                            </Text>
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