import React, { Component } from 'react';
import HeaderLayout from "../../components/header/header";
import {Button, Container} from "native-base";
import {FlatList, Image, Picker, Text, TextInput, View} from "react-native";
import styles from './unauthorized.css'
import {connect} from "react-redux";
import {emptyBasket, emptyFavoriets, emptyProduct, removeUser, saveUser} from "../../redux/actions";
import {Actions} from "react-native-router-flux";
import Http from "../../services/http";
import {BackHandler } from "react-native";
import {ToastAndroid} from "react-native";
class Unauthorized extends Component{
    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
    }

    handleBackButton() {
        // ToastAndroid.show('Back button is pressed', ToastAndroid.SHORT);
        return true;
    }

    render() {
        return (
            <View style={styles.main}>
                <Text>دستگاه دیگری به اکانت شما وارد شده است . لطفا دوباره وارد اپ شوید</Text>
                <Button block title={1} style={styles.btn} onPress={()=>{
                    this.props.removeUser(this.props.user);
                    this.props.emptyBasket();
                    this.props.emptyProduct();
                    this.props.emptyFavoriets();
                    Actions.reset('auth');
                }}>
                    <Text>خروج</Text>
                </Button>
            </View>
        );
    }

}
const mapDispatchToProps=(dispatch)=> {
    return{
        removeUser:(user)=>{
            dispatch(removeUser(user));
        },
        emptyBasket:()=>{
            dispatch(emptyBasket());
        },
        emptyFavoriets:()=>{
            dispatch(emptyFavoriets());
        },
        saveUser:(user)=>{
            dispatch(saveUser(user));
        },
        emptyProduct:()=>{
            dispatch(emptyProduct());
        }
    }
}
const mapStateToProps=state=>{
    return{
        user:state.user,
        basket:state.basket,
    }
};
export default connect(mapStateToProps,mapDispatchToProps)(Unauthorized);