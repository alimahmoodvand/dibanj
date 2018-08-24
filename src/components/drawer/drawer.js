import React, { Component } from 'react';
import {Button, Container, Text} from "native-base";
import {Actions} from "react-native-router-flux";
import {
    addBasket, emptyBasket, emptyBookmark, emptyFavoriets, removeBasket, removeUser,
    saveUser
} from "../../redux/actions";
import {connect} from "react-redux";
import EStyleSheet from 'react-native-extended-stylesheet';
import {Image, ImageBackground, View} from "react-native";
import {EMPTY_FAVORITES} from "../../redux/actions/types";

class DrawerLayout extends Component{
    render(){
        return(
            <Container style={{backgroundColor:'gray'}}>
                <View>
                    <ImageBackground source={{uri:this.props.user.imageUrl}} style={[styles.proImage,{backgroundColor:'gray'}]}>
                        <Text style={styles.proImageText}>{this.props.user.fullName}</Text>
                        <Text style={styles.proImageText}>{this.props.user.userName}</Text>
                    </ImageBackground>
                </View>
                <Button block style={styles.drawerBtn} onPress={()=>Actions.profile()}>
                    <Text style={styles.proImageText}>اطلاعات کاربری</Text>
                </Button>

                {/*<Button block style={styles.drawerBtn} onPress={()=>Actions.user()}>*/}
                    {/*<Text style={styles.proImageText}>پنل کاربری</Text>*/}
                {/*</Button>*/}
                <Button block style={styles.drawerBtn} onPress={()=>{Actions.bookmark()}}>
                    <Text style={styles.proImageText}>لیست علاقه مندی ها</Text>
                </Button>
                <Button block style={styles.drawerBtn} onPress={()=>{Actions.term()}}>
                    <Text style={styles.proImageText}>دوره های من</Text>
                </Button>
                <Button block style={styles.drawerBtn} onPress={()=>{Actions.workout({examType:1})}}>
                    <Text style={styles.proImageText}>تمرین های من</Text>
                </Button>
                <Button block style={styles.drawerBtn} onPress={()=>{Actions.workout({examType:2})}}>
                    <Text style={styles.proImageText}>ازمون های من</Text>
                </Button>
                <Button block style={styles.drawerBtn} onPress={()=>{Actions.help()}}>
                    <Text style={styles.proImageText}>راهنما</Text>
                </Button>
                <Button block style={styles.drawerBtn} onPress={()=>{Actions.contact()}}>
                    <Text style={styles.proImageText}>تماس با ما</Text>
                </Button>
                <Button block style={styles.drawerBtn} onPress={()=>{
                    this.props.removeUser(this.props.user);
                    this.props.emptyBasket();
                    this.props.emptyFavoriets();

                    Actions.reset('auth');
                }}>
                    <Text style={styles.proImageText}>خروج</Text>
                </Button>
            </Container>
        );
    }
}

const styles = EStyleSheet.create({
    proImage:{
        width:'100%',
        height:150,
        justifyContent:'flex-end',
        // alignItems:'center',
    },
    drawerBtn:{
        backgroundColor:'$mainColor',
        justifyContent:'flex-end',
        borderBottomColor:'white',
        borderBottomWidth:0.25
    },
    proImageText:{
        color:'white',
        fontSize:17,
    }
})


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
        }
    }
}
const mapStateToProps=state=>{
    return{
        user:state.user,
        basket:state.basket,
    }
};
export default connect(mapStateToProps,mapDispatchToProps)(DrawerLayout);