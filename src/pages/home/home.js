import React, { Component } from 'react';
import HeaderLayout from "../../components/header/header";
import {Image, Text, View, Dimensions, StyleSheet, TouchableOpacity} from "react-native";
import styles from './home.css'
import {Actions} from "react-native-router-flux";
import Slideshow from "react-native-slideshow";
import {connect} from "react-redux";
import {removeUser, saveProducts} from "../../redux/actions";
import Http from "../../services/http";
// import SVGImage from 'react-native-remote-svg';
// import DIcon from "../../components/dicon/dicon";
// import DIcon from "../../components/dicon/dicon";
const {height, width} = Dimensions.get('window');


class Home extends Component {
    _getSlider=async()=> {
        let response = await Http._postAsyncData({token: this.props.user.token}, 'sliderImages')
        if (Array.isArray(response)) {
            this.setState({dataSource:response})

        }
    }
    constructor(props) {
        super(props);
        this.state = {
            position: 1,
            interval: null,
            dataSource: [],
        };
    }
    componentWillMount() {
        this.setState({
            interval: setInterval(() => {
                this.setState({
                    position: this.state.position+1 === this.state.dataSource.length ? 0 : this.state.position + 1
                });
            }, 4000)
        });
        this._getSlider();
    }

    componentWillUnmount() {
        clearInterval(this.state.interval);
    }
    render() {
        return (
            <View style={styles.main}>
                <Image style={styles.bgimage} source={require('../../assets/images/bg.jpg')}/>

                <HeaderLayout/>
                <View style={[styles.content, style.content]}>
                    <View style={[styles.halfCircleContainer, style.halfCircleContainer]}>
                        <Slideshow
                            indicatorSize={1}
                            containerStyle={[styles.slideshow,style.slideshow]}
                            dataSource={this.state.dataSource}
                            position={this.state.position}
                            arrowSize={1}
                            height={slideHeight}
                            indicatorSelectedColor='rgb(255, 200, 0)'
                            onPositionChanged={(position) => this.setState({ position })}
                        />
                    </View>
                    <View style={style.circles}>
                        <Text style={style.label}>
                            دوره های مجازی
                        </Text>
                        <TouchableOpacity  style={[ style.circle, {marginRight: one}]} onPress={() => {Actions.absentia({
                            subType:2,
                            proType:1,
                            img:"absentia",
                            label:"دوره های مجازی",
                            empty:'دوره ای یافت نشد',
                        });}} >
                            {/*<SVGImage style={styles.menuIcon} source={require('../../assets/images/absentia.svg')}/>*/}
                            <Image style={styles.menuIcon} source={require('../../assets/images/absentia.png')} />
                            </TouchableOpacity >

                    </View>
                    <View style={style.circles}>
                        <Text style={style.label}>
                            دوره های حضوری
                        </Text>
                        <TouchableOpacity style={[styles.circle, style.circle, {marginRight: two}]} onPress={() => {Actions.absentia({
                            subType:1,
                            proType:1,
                            img:"course",
                            label:"دوره های حضوری",
                            empty:'دوره ای یافت نشد',
                        });}}>
                            {/*<SVGImage style={{width:'80%',*/}
                                {/*height:'80%',}} source={require('../../assets/images/absentia.svg')}/>*/}
                            <Image style={styles.menuIcon} source={require('../../assets/images/course.png')} />

                        </TouchableOpacity>
                    </View>
                    <View style={style.circles}>
                        <Text style={style.label}>
                            فروشگاه
                        </Text>
                        <TouchableOpacity style={[styles.circle, style.circle, {marginRight: three}]} onPress={() => Actions.absentia(
                            {
                                isstore:true,
                                subType:1,
                                proType:1,
                                img:"store",
                                label:"فروشگاه",
                                empty:'محصولی یافت نشد',

                            }
                        )} >
                            {/*<SVGImage style={styles.menuIcon} source={require('../../assets/images/store.svg')}/>*/}
                            <Image style={styles.menuIcon} source={require('../../assets/images/store.png')} />

                        </TouchableOpacity>
                    </View>
                    <View style={style.circles}>
                        <Text style={style.label}>
                            رایگان
                        </Text>
                        <TouchableOpacity style={[styles.circle, style.circle, {marginRight: four}]} onPress={() => Actions.absentia({
                            subType:-1,
                            proType:0,
                            img:"lock",
                            label:"رایگان",
                            empty:'محصولی یافت نشد',
                        })}>
                            {/*<SVGImage style={styles.menuIcon} source={require('../../assets/images/lock.svg')}/>*/}
                            <Image style={styles.menuIcon} source={require('../../assets/images/lock.png')} />

                        </TouchableOpacity>
                    </View>
                    <View style={style.circles}>
                        <Text style={style.label}>
                            پیشنهادات ویژه
                        </Text>
                        <TouchableOpacity style={[styles.circle, style.circle, {marginRight: five}]}  onPress={() => Actions.absentia({
                            subType:0,
                            proType:-1,
                            img:"roocket",
                            label:" پیشنهادات ویژه",
                            empty:'محصولی یافت نشد',

                        })}>
                            {/*<SVGImage style={styles.menuIcon} source={require('../../assets/images/roocket.svg')}/>*/}
                            <Image style={styles.menuIcon} source={require('../../assets/images/roocket.png')} />
                        </TouchableOpacity>
                    </View>
                </View>

            </View>

                );
    }

    // _rendeMenu() {
    //     return (
    //
    //     );
    // }
}
const heightCircle=width*0.6*2;
const pad=width*0.6;
let margin=heightCircle/8;
const circleWidth=margin*1.15;

const marginChild=circleWidth/9;
const split=heightCircle/10;
const one=(split*-2)+pad;
const two=(split*-1)+pad;
const three=(split*-0.6)+pad;
const four=(split*-1)+pad;
const five=(split*-2)+pad;
const slideHeight=(heightCircle-10);
const style= StyleSheet.create({
    content:{
        paddingTop:margin/2,
        paddingBottom:margin/2,
    },
    halfCircleContainer:{
        height:heightCircle,
        width:heightCircle/2,
        borderBottomLeftRadius:heightCircle,
        borderTopLeftRadius:heightCircle,
        overflow:'visible',
        right:0

    },
    slideshow:{
      width:slideHeight/2,
        height:slideHeight,
        borderBottomLeftRadius:slideHeight,
        borderTopLeftRadius:slideHeight,
      // borderBottomLeftRadius:heightCircle,
      // borderTopLeftRadius:heightCircle,
      overflow:'hidden'

    },
    circles:{
        // marginTop:margin,
        // marginBottom:margin,
        // overflow:'visible',
        // backgroundColor:'red',
        flexDirection:'row',
        alignItems:'center'
    },

    circle:{
        width:circleWidth,
        height:circleWidth,
        borderRadius:circleWidth,
        borderColor:'white',
        borderWidth:2,
        marginTop:marginChild,
        marginBottom:marginChild,
        overflow:'visible',
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'#ffc800',
    },
    label:{
        color:'white',
        fontSize:18,
        marginRight:10,
    }

});

const mapStateToProps=(state)=>{
    return{
        user:state.user
    }
};
const mapDispatchToProps=(dispatch)=> {
    return{
        removeUser:(user)=>{
            dispatch(removeUser(user));
        }
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(Home);