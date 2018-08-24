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
        prod.Thumbnail= prod.Thumbnail;
        let maxlimit=50;
        let regex = /(<([^>]+)>)/ig
        if(prod.Description){
            prod.Description=prod.Description.replace(regex,'').replace(/(\&.*\;)/gi, '').replace(/^\s*$(?:\r\n?|\n)/gm,'')
        }
        prod.Description=(prod.Description&&((prod.Description).length > maxlimit) ?
            (((prod.Description).substring(0,maxlimit-3)) + '...') :
            prod.Description );
        return(
            <View style={styles.main}>

                <View style={styles.content}>
                    <ImageBackground style={styles.image} source={{uri: prod.Thumbnail}}>
                    </ImageBackground>
                    <View style={styles.details}>
                        <Text>{prod.Title}</Text>
                        <Text>{prod.fullName}</Text>
                        <Text>{prod.persianRegisterDeadLine?prod.persianRegisterDeadLine.split(' ')[0]:'ندارد'}</Text>
                    </View>
                    <View style={styles.prices}>
                        <View style={styles.price}>

                            { prod.price>0&&
                            <Text style={{textDecorationLine: 'line-through', textDecorationStyle: 'solid'}}>
                                {prod.price}
                            </Text>
                            }
                            {prod.DiscountPercent > 0 &&
                            <Text>{prod.DiscountPercent}</Text>
                            }
                            {prod.PriceAfterDiscount > 0 &&
                            <Text style={styles.priceText}>
                                {prod.PriceAfterDiscount}
                            </Text>
                            }
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