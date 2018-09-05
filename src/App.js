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
import FIcon from 'react-native-vector-icons/FontAwesome';
import MIcon from 'react-native-vector-icons/MaterialIcons';
import Workout from "./pages/workout/workout";
import Category from "./pages/category/category";
import { Provider,connect } from "react-redux"
import Splash from "./pages/splash/splash";
import PStorage from "./redux/store";
import Bookmark from "./pages/bookmark/bookmark";
import Contact from "./pages/contact/contact";
import Help from "./pages/help/help";
import VerifyCode from "./pages/verifycode/verifycode";
import Messages from "./pages/message/message";
import Lesson from "./pages/lesson/lesson";
import {Actions} from "react-native-router-flux";
import Answer from "./pages/answer/answer";
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
                <RouterRedux>
                    {/*<Scene key="root" hideNavBar initial>*/}
                    <Stack key="root" titleStyle={{ alignSelf: 'center' }}>
                        <Stack key="customNavBar" hideTabBar titleStyle={{ alignSelf: 'center' }}>
                        </Stack>
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
                                    <Scene key="basketp" hideNavBar component={Basket}  title="سبد خرید">
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
                                    <Scene key="term" hideNavBar component={Term} title="term" icon={({focused}) => {
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
                                </Stack>
                            </Tabs>
                            </Scene>
                        </Drawer>
                        <Scene key="auth" hideNavBar initial>
                            <Scene key="loginpage" hideNavBar component={Login} title="پیام ها">
                            </Scene>
                            <Scene key="signuppage" hideNavBar component={Signup} title="پیام ها">
                            </Scene>
                            <Scene key="splashpage" hideNavBar initial component={Splash} title="پیام ها">
                            </Scene>
                            <Scene key="verfiycodepage" hideNavBar component={VerifyCode} title="پیام ها">
                            </Scene>
                        </Scene>
                    </Stack>
                    {/*</Scene>*/}
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