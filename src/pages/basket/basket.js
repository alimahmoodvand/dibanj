import React, { Component } from 'react';
import HeaderLayout from "../../components/header/header";
import {Button, Container} from "native-base";
import {FlatList, Image, ImageBackground, Switch, Text, TextInput, View} from "react-native";
import styles from './basket.css'
import {Actions} from "react-native-router-flux";
import FIcon from 'react-native-vector-icons/FontAwesome';
import BasketProduct from "../../components/basketproduct/basketproduct";
import EStyleSheet from 'react-native-extended-stylesheet';
import {connect} from "react-redux";
import {addBasket, removeBasket} from "../../redux/actions";
import Http from "../../services/http";

class Basket extends Component{
    componentWillMount(){
        this.setState({
            products:[
                {teacher:"home",deadline:new Date()
                    ,image:{uri:"https://roocket.ir/public/image/2016/1/20/wordpress-cover-2.png"}},
                {teacher:"home",deadline:new Date()
                    ,image:{uri:"https://roocket.ir/public/image/2016/1/20/wordpress-cover-2.png"}},
                {teacher:"home",deadline:new Date()
                    ,image:{uri:"https://roocket.ir/public/image/2016/1/20/wordpress-cover-2.png"}},
                {teacher:"home",deadline:new Date()
                    ,image:{uri:"https://roocket.ir/public/image/2016/1/20/wordpress-cover-2.png"}},
                {teacher:"home",deadline:new Date()
                    ,image:{uri:"https://roocket.ir/public/image/2016/1/20/wordpress-cover-2.png"}},
                {teacher:"home",deadline:new Date()
                    ,image:{uri:"https://roocket.ir/public/image/2016/1/20/wordpress-cover-2.png"}},
                {teacher:"home",deadline:new Date()
                    ,image:{uri:"https://roocket.ir/public/image/2016/1/20/wordpress-cover-2.png"}},
                {teacher:"home",deadline:new Date()
                    ,image:{uri:"https://roocket.ir/public/image/2016/1/20/wordpress-cover-2.png"}},
                {teacher:"home",deadline:new Date()
                    ,image:{uri:"https://roocket.ir/public/image/2016/1/20/wordpress-cover-2.png"}},
            ]
        })
    }
    _renderItem = (item,index) => {
        item['id']=index;
        return( <BasketProduct prod={item}/>);
    };
    state = {
        offcode: false
    };
    render() {
        return (
            <View style={styles.main}>
                <Image style={styles.bgimage} source={require('../../assets/images/bg.jpg')}/>
                <HeaderLayout back={true}/>
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
                    <View style={styles.paymentSection}>
                        <View style={styles.offSection}>
                            <View style={styles.offSwitch}>
                                <Switch  value={ this.state.offcode }
                                         onValueChange={(offcode) => this.setState({offcode})} tintColor="#f1f1f1" onTintColor="yellow" thumbTintColor="#b2b2b2"/>
                            </View>
                            <View style={styles.offSectionText}>
                                <Text style={styles.offText}>کد تخفیف دارم</Text>
                            </View>
                        </View>
                        {
                            this.state.offcode&&
                            <View style={styles.offcodeSection}>
                                <Button style={styles.offcodeBtn} title={0} onPress={()=>alert('sakhca')}>
                                    <Text  style={styles.offcodeBtnText} >اعمال کد</Text>
                                </Button>
                                <TextInput
                                    style={styles.input}
                                    placeholder="کد تخفیف را در این بخش وارد کنید"
                                    underlineColorAndroid="transparent"
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
                                    <Text style={styles.priceText}>{this._sumBasketPrice()}</Text>
                                    <Text style={styles.priceSumText}>جمع مبلغ</Text>
                                </View>
                        </View>

                        </View>
                </View>
            </View>
        );
    }

    _sumBasketPrice=()=> {
        let price=0
        this.props.basket.basket.map((item,index)=>{
            price+=item.priceAfterDiscount;
        })
    return price;
    }

    buyBasket=async()=> {
        let data={
            token:this.props.user.token,
            UserId:this.props.user.userId,
            products:this.props.basket.basket
        }
        let response=await Http._postAsyncData(data,'order');
        console.log(response,data)
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
export default connect(mapStateToProps,mapDispatchToProps)(Basket);