/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
    Image, ImageBackground,
    Platform,
    StyleSheet,
    Text,
    View
} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import {Drawer, LeftButton, Modal, Router, Scene, Stack, Tabs} from "react-native-router-flux";
import Home from "./pages/home/home";
import DrawerLayout from "./components/drawer/drawer";
import Login from "./pages/login/login";
import Signup from "./pages/signup/signup";
import Absentia from "./pages/absentia/absentia";
import Store from "./pages/store/store";
import Search from "./pages/search/search";
import Basket from "./pages/basket/basket";
import Course from "./pages/course/course";
import Profile from "./pages/profile/profile";
import Term from "./pages/term/term";
import Practice from "./pages/practice/practice";
import User from "./pages/user/user";
import MIcon from 'react-native-vector-icons/MaterialIcons';
import Workout from "./pages/workout/workout";
import Category from "./pages/category/category";
import { Provider,connect } from "react-redux"
import Splash from "./pages/splash/splash";
import PStorage from "./redux/store";
import Bookmark from "./pages/bookmark/bookmark";
import Contact from "./pages/contact/contact";
import Help from "./pages/help/help";
import Issue from "./pages/issue/issue";
import VerifyCode from "./pages/verifycode/verifycode";
import Messages from "./pages/message/message";
import Lesson from "./pages/lesson/lesson";
import {Actions} from "react-native-router-flux";
import Answer from "./pages/answer/answer";
import Unauthorized from "./pages/unauthorized/unauthorized"
import Order from "./pages/order/order"
import Signin from "./pages/signin/signin"

EStyleSheet.build({
    $statusBarColor:'red',
    $mainColor:'rgb(255, 200, 0)',
    $grayColor:'#747474',
    $productImage:125,
    $productBntRaduis:100,
    $productBnt:50,

});
class BadgeIcon extends Component {
    render() {
        let style={};
        const {name,focused,field}=this.props;
        if(this.props[field]===0){
            style.height=0;
        }
        return(
            <View>
                <MIcon name={name} color={(focused ? "#ffc800" : "white")} size={28}/>
                <Text style={[{left:-15,position:'absolute',color:'white',fontWeight:'bold',backgroundColor:'red',paddingLeft:4,paddingRight:4},style]}>
                    {this.props[field]}
                </Text>
            </View>
        )
    }
}
const mapStateToPropsStore = state => {return {
    basketCount: state.basket.basket.length,
    messageCount:0
};};
const ConnectedYourTabIcon = connect(mapStateToPropsStore)(BadgeIcon);

export default class App extends Component{
    render() {
        const RouterRedux = connect()(Router);
        return (
            <Provider store={PStorage}>
                <RouterRedux uriPrefix="dibaanzh.ir">
                    <Scene key="root" hideNavBar initial>
                        <Drawer
                            key="drawer"
                            drawerPosition="right"
                            contentComponent={DrawerLayout}
                            tabStyle={styles.tab}
                            hideNavBar={true}
                        >
                            <Scene hideNavBar panHandlers={null}>
                            <Tabs
                                hideNavBar
                                tabBarStyle={styles.tabs}
                                labelStyle={styles.label}
                                key="tabbar"
                                swipeEnabled
                                tabBarPosition="bottom"
                                showLabel={true}
                                activeTintColor="#ffc800"
                                inactiveTintColor="white"
                                tabBarOnPress={(scene, jumpToIndex) => {
                                    const { navigation,defaultHandler} = scene;
                                    // if (navigation.isFocused()) return;
                                    const { key } = navigation.state;
                                    // console.log(key === 'خانه' , navigation.router.childRouters)
                                    if (key === 'خانه' && navigation.router.childRouters) { // You've leave a child scene before, excepts default.
                                        Actions.replace('homep') // This might be what you want to do. It will show you default scene with fresh state.
                                        return;
                                    }

                                    // Otherwise, jump to next scene has been tapped with a index
                                    defaultHandler(scene.index);
                                }}
                            >
                                <Stack
                                    hideNavBar
                                    key="پیام ها"
                                    icon={({focused}) => (<ConnectedYourTabIcon field="messageCount" name="email" focused={focused} />)}
                                >
                                    <Scene key="messagesp" hideNavBar component={Messages} icon={({focused}) => (<ConnectedYourTabIcon field="messageCount" name="email" focused={focused} />)} title="پیام ها">
                                    </Scene>
                                </Stack>
                                <Stack
                                    hideNavBar
                                    key="سبد خرید"
                                    icon={({focused}) => {
                                    return <ConnectedYourTabIcon field="basketCount" name="shopping-basket" focused={focused} />
                                }}
                                >
                                    <Scene key="basketp"  hideNavBar component={Basket}  title="سبد خرید">
                                    </Scene>
                                </Stack>
                                <Stack
                                    hideNavBar
                                    key="دسته بندی"
                                    icon={({focused}) => {
                                    return <MIcon name="format-list-bulleted" color={(focused ? "#ffc800" : "white")}
                                                  size={28}/>;
                                }}
                                >
                                    <Scene key="categoriesp" hideNavBar component={Category} title="دسته بندی">
                                    </Scene>
                                </Stack>
                                <Stack
                                    hideNavBar
                                    key="جستجو"
                                    icon={({focused}) => {
                                    return <MIcon name="search" color={(focused ? "#ffc800" : "white")} size={28}/>;
                                }}
                                >
                                    <Scene key="searchp" hideNavBar component={Search} title="جستجو">
                                    </Scene>
                                </Stack>
                                <Stack
                                    hideNavBar
                                    key="خانه"
                                    initial
                                    icon={({focused}) => {
                                        return <MIcon name="home" color={(focused ? "#ffc800" : "white")} size={28}/>;
                                    }}
                                >
                                    <Scene key="homep" hideNavBar component={Home}  title="خانه" initial>
                                    </Scene>
                                    <Scene key="absentia" icon={({focused}) => {
                                        return <MIcon name="home" color={(focused ? "#ffc800" : "white")} size={28}/>;
                                    }} hideNavBar component={Absentia}>
                                    </Scene>
                                    <Scene key="bookmark" icon={({focused}) => {
                                        return <MIcon name="home" color={(focused ? "#ffc800" : "white")} size={28}/>;
                                    }} hideNavBar component={Bookmark}>
                                    </Scene>
                                    <Scene key="help" icon={({focused}) => {
                                        return <MIcon name="home" color={(focused ? "#ffc800" : "white")} size={28}/>;
                                    }} hideNavBar component={Help}>
                                    </Scene>
                                    <Scene key="issue" icon={({focused}) => {
                                        return <MIcon name="home" color={(focused ? "#ffc800" : "white")} size={28}/>;
                                    }} hideNavBar component={Issue}>
                                    </Scene>
                                    <Scene key="contact" icon={({focused}) => {
                                        return <MIcon name="home" color={(focused ? "#ffc800" : "white")} size={28}/>;
                                    }} hideNavBar component={Contact}>
                                    </Scene>
                                    <Scene key="store" icon={({focused}) => {
                                        return <MIcon name="home" color={(focused ? "#ffc800" : "white")} size={28}/>;
                                    }} hideNavBar component={Store}>
                                    </Scene>
                                    <Scene key="course" icon={({focused}) => {
                                        return <MIcon name="home" color={(focused ? "#ffc800" : "white")} size={28}/>;
                                    }} hideNavBar component={Course}>
                                    </Scene>
                                    <Scene key="profile" hideNavBar component={Profile} title="profile"
                                           icon={({focused}) => {
                                               return <MIcon name="home" color={(focused ? "#ffc800" : "white")}
                                                             size={28}/>;
                                           }}>
                                    </Scene>
                                    <Scene key="workout" hideNavBar component={Workout} title="workout"
                                           icon={({focused}) => {
                                               return <MIcon name="home" color={(focused ? "#ffc800" : "white")}
                                                             size={28}/>;
                                           }}>
                                    </Scene>
                                    <Scene key="term" hideNavBar   path={"/payment/"} component={Term} title="term" icon={({focused}) => {
                                        return <MIcon name="home" color={(focused ? "#ffc800" : "white")} size={28}/>;
                                    }}>
                                    </Scene>
                                    <Scene key="practice" hideNavBar component={Practice} title="practice"
                                           icon={({focused}) => {
                                               return <MIcon name="home" color={(focused ? "#ffc800" : "white")}
                                                             size={28}/>;
                                           }}>
                                    </Scene>
                                    <Scene key="lesson" hideNavBar component={Lesson} title="lesson"
                                           icon={({focused}) => {
                                               return <MIcon name="home" color={(focused ? "#ffc800" : "white")}
                                                             size={28}/>;
                                           }}>
                                    </Scene>
                                    <Scene key="answer" hideNavBar component={Answer} title="answer"
                                           icon={({focused}) => {
                                               return <MIcon name="home" color={(focused ? "#ffc800" : "white")}
                                                             size={28}/>;
                                           }}>
                                    </Scene>
                                    <Scene key="user" hideNavBar component={User} title="user" icon={({focused}) => {
                                        return <MIcon name="home" color={(focused ? "#ffc800" : "white")} size={28}/>;
                                    }}>
                                    </Scene>
                                    <Scene key="order" hideNavBar component={Order} title="order" icon={({focused}) => {
                                        return <MIcon name="home" color={(focused ? "#ffc800" : "white")} size={28}/>;
                                    }}>
                                    </Scene>

                                </Stack>
                            </Tabs>
                            </Scene>
                        </Drawer>
                        <Scene key="unauthorized" hideNavBar component={Unauthorized} title="unauthorized" icon={({focused}) => {
                        return <MIcon name="home" color={(focused ? "#ffc800" : "white")} size={28}/>;
                    }}>
                    </Scene>
                        <Scene key="auth" hideNavBar initial>
                            <Scene key="loginpage" hideNavBar component={Login} title="پیام ها">
                            </Scene>
                            <Scene key="signuppage" hideNavBar component={Signup} title="پیام ها">
                            </Scene>
                            <Scene key="splashpage" path={"/payment/"} hideNavBar initial component={Splash} title="پیام ها">
                            </Scene>
                            <Scene key="verfiycodepage" hideNavBar component={VerifyCode} title="پیام ها">
                            </Scene>
                            <Scene key="signinpage" hideNavBar component={Signin} title="پیام ها">
                            </Scene>
                        </Scene>
                    </Scene>
                </RouterRedux>
            </Provider>
        );
    }
}

const styles = StyleSheet.create({
    bgimage: {
        height:'100%',
        width:'100%',
        position:'absolute',
        top:0,
        left:0
    },
    main:{
        flex:1,
        backgroundColor:'rgba(0,0,0,0)'
    },
    tabs:{
        backgroundColor:'#343c49',
        paddingBottom:5,
        height:60,
        paddingTop:2,
        // paddingBottom:10,
    },
    label:{
        fontSize:17,
        padding:0,
        margin:0,
    },
    tab:{
        padding:0,
        margin:0,
    }
});