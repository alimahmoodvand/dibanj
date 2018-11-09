import React, { Component } from 'react';
import HeaderLayout from "../../components/header/header";
import {Button, Container} from "native-base";
import {FlatList, Image, ImageBackground, Switch, Text, TextInput, View} from "react-native";
import styles from './basket.css'
import {Actions} from "react-native-router-flux";
import FIcon from 'react-native-vector-icons/FontAwesome';
import BasketProduct from "../../components/basketproduct/basketproduct";
import Location from "../../components/location/location";
import EStyleSheet from 'react-native-extended-stylesheet';
import {connect} from "react-redux";
import {addBasket, emptyBasket, initProduct, removeBasket} from "../../redux/actions";
import Http from "../../services/http";
import Loading from "../../components/laoding/laoding";
import AlertMessage from "../../services/alertmessage";

class Basket extends Component{
    _renderItem = (item,index) => {
        item['id']=index;
        return( <BasketProduct prod={item}/>);
    };
    state = {
        offcode: false,
        offPercent:0,
        offPrice:0,
        discountCode:0,
        discountId:0,
        isModalVisible: false,
        loading: false,
    };
    componentWillUnmount(){
        if(this.state.isModalVisible)
            this._toggleModal();
    }
    _toggleModal = () =>
        this.setState({isModalVisible: !this.state.isModalVisible});
    prices={};
    address=null;
    render() {
        this.prices={price:0};
        this._sumBasketPrices()
        // console.log(this.prices)
        return (
            <View style={styles.main}>
                <Loading visible={this.state.loading} />

                <Image style={styles.bgimage} source={require('../../assets/images/bg.jpg')}/>
                <HeaderLayout/>
                <View style={styles.content}>
                    <View style={styles.products}>
                        <FlatList
                            data={this.props.basket.basket}
                            keyExtractor={(item, index) => index.toString()}
                            renderItem={({item, index}) =>
                                this._renderItem(item, index)
                            }
                        />
                    </View>
                    {(this.props.basket.basket.length > 0 )&&
                    <View style={styles.paymentSection}>
                        {this.addressRequired &&
                        <Location setAddress={this._setAddress}/>
                        }
                      {this.prices.price > 0 &&
                        <View style={styles.offSection}>
                            <View style={styles.offSwitch}>
                                <Switch value={this.state.offcode}
                                        onValueChange={(offcode) => this.setState({offcode})} tintColor="#f1f1f1"
                                        onTintColor="yellow" thumbTintColor={this.state.offcode?"yellow":"#b2b2b2"}/>
                            </View>
                            <View style={styles.offSectionText}>
                                <Text style={styles.offText}>کد تخفیف دارم</Text>
                            </View>
                        </View>
                        }
                        {
                            this.state.offcode &&
                            <View style={styles.offcodeSection}>
                                <Button style={styles.offcodeBtn} title={0} onPress={() => {
                                    this._checkOffcode();
                                }}>
                                    <Text style={styles.offcodeBtnText}>اعمال کد</Text>
                                </Button>
                                <TextInput
                                    style={styles.input}
                                    placeholder="کد تخفیف را در این بخش وارد کنید"
                                    underlineColorAndroid="transparent"
                                    onChangeText={(text) => this.offcode = text}

                                />
                            </View>
                        }
                        <View style={styles.purchaseSection}>
                            <View style={styles.purchaseBtnSection}>
                                <Button style={styles.purchaseBtn} full onPress={this.buyBasket}>
                                    <Text style={styles.purchaseBtnText}>ادامه ثبت سفارش</Text>
                                </Button>
                            </View>
                            <View style={styles.priceSection}>
                                <Text style={[styles.priceText]}>{this.prices.priceDiscount}</Text>
                                <Text style={[styles.priceText]}>{this.prices.offPercent}</Text>
                                <Text style={[styles.priceText, this.prices.decStyle]}>{this.prices.price}</Text>
                                <Text style={styles.priceSumText}>جمع مبلغ</Text>
                            </View>
                        </View>

                    </View>
                    }
                </View>
            </View>
        );
    }
    _setAddress=(add)=>{
        console.log(add)
        this.address=add;
    }
    addressRequired=false;
    _sumBasketPrices=()=> {
        let price=0
        this.props.basket.basket.map((item,index)=>{
            // console.log(item.PriceAfterDiscount)
            if(item.type==2&&item.subType==1){
                this.addressRequired=true;
            }
            price+=item.PriceAfterDiscount;

        })
        if(this.state.offPercent!==0&&this.state.offcode){
           this.prices.price= price;
           this.prices.decStyle={textDecorationLine: 'line-through', textDecorationStyle: 'solid',color:'black', textDecorationColor: 'red'};
           this.prices.priceDiscount=price-(price*0.01*this.state.offPercent);
           this.prices.offPercent=this.state.offPercent+"%";
        }
        else if(this.state.offPrice!==0&&this.state.offcode){
            this.prices.price= price;
            this.prices.decStyle={textDecorationLine: 'line-through', textDecorationStyle: 'solid',color:'black', textDecorationColor: 'red'};
            this.prices.priceDiscount=price-this.state.offPrice;
            this.prices.offPercent=this.state.offPrice;
        }
        else{
            this.prices.price= price;
            // this.prices.decStyle={textDecorationLine: 'line-through', textDecorationStyle: 'solid'};
            // this.prices.priceDiscount=price-this.state.offPrice;
            // this.prices.offPercent=this.state.offPrice;
        }
        return price;
    }

    buyBasket=async()=> {
        if(this.address||!this.addressRequired) {
            let data = {
                token: this.props.user.token,
                UserId: this.props.user.userId,
                products: this.props.basket.basket,
                address:(this.address&& this.address.addressId)?this.address.addressId:0,
                discountCode: this.state.offcode ? this.state.discountCode : 0,
                discountId: this.state.offcode ? this.state.discountId : 0,
            }
            this.setState({loading:true})
            let response = await Http._postAsyncData(data, 'order');
            this.setState({loading:false})

            if (Array.isArray(response)) {
                this.props.emptyBasket()
                this.props.initProduct(response)
                alert("خرید با موفقیت انجام شد");
                Actions.order();
            }
        } else {
            new AlertMessage().error("addressEmpty")
        }
        // console.log(response,data)
    }

    _checkOffcode=async()=> {
        // console.log(this.offcode)
        if(this.offcode&&this.offcode.trim()!='') {
            this.setState({loading:true})
            let data = {
                token: this.props.user.token,
                discountCode: this.offcode
            }
            let response = await Http._postAsyncData(data, 'discountCode');
            // Actions.pop();
            if (Array.isArray(response) && response.length == 1) {
                this.setState({
                    offPercent: response[0].percent,
                    offPrice: response[0].price,
                    discountId: response[0].discountId,
                    discountCode: response[0].discountCode,
                })
            }
            this.setState({loading:false})
        }else{
            new AlertMessage().error('offEmpty')
        }
        // console.log(response)
    }
}
const mapDispatchToProps=(dispatch)=> {
    return{
        removeBasket:(product)=>{
            dispatch(removeBasket(product));
        },emptyBasket:()=>{
            dispatch(emptyBasket());
        },initProduct:(products)=>{
            dispatch(initProduct(products));
        },

    }
}
const mapStateToProps=state=>{
    return{
        user:state.user,
        basket:state.basket
    }
};
export default connect(mapStateToProps,mapDispatchToProps)(Basket);