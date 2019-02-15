import React, { Component } from 'react';
import HeaderLayout from "../../components/header/header";
import {Button, Container} from "native-base";
import {FlatList, Image, Picker, ScrollView, Text, TextInput, View} from "react-native";
import styles from './contact.css'
import {connect} from "react-redux";
import MIcon from 'react-native-vector-icons/MaterialIcons';
class Contact extends Component{
            render() {
            return (
                <View style={styles.main}>
                    <Image style={styles.bgimage} source={require('../../assets/images/bg.jpg')}/>
                    <HeaderLayout back={true}/>
                    <View style={styles.headerContainer}>
                        <View style={styles.header}>
                            <Text>درباره ما</Text>
                        </View>
                    </View>
                    <ScrollView style={styles.content}>
                        <View style={styles.aboutContainer}>
                            <Text>
                                لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است. چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد نیاز و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد. کتابهای زیادی در شصت و سه درصد گذشته، حال و آینده شناخت فراوان جامعه و متخصصان را می طلبد تا با نرم افزارها شناخت بیشتری را برای طراحان رایانه ای علی الخصوص طراحان خلاقی و فرهنگ پیشرو در زبان فارسی ایجاد کرد. در این صورت می توان امید داشت که تمام و دشواری موجود در ارائه راهکارها و شرایط سخت تایپ به پایان رسد وزمان مورد نیاز شامل حروفچینی دستاوردهای اصلی و جوابگوی سوالات پیوسته اهل دنیای موجود طراحی اساسا مورد استفاده قرار گیرد.
                            </Text>
                            <View style={styles.contactContainer}>
                                <View style={styles.contactInfo}>
                                    <Text>+989123456789</Text>
                                    <View style={styles.contactIconContainer}>
                                        <Image style={styles.contactIcon} source={require('../../assets/images/contact/phone.png')}/>
                                    </View>
                                </View>
                                <View style={styles.contactInfo}>
                                    <Text>info@dibaanzh.ir</Text>
                                    <View style={styles.contactIconContainer}>
                                        <Image style={styles.contactIcon} source={require('../../assets/images/contact/mail.png')}/>
                                    </View>
                                </View>
                                <View style={styles.contactInfo}>
                                    <Text>@dibaanzh.ir</Text>
                                    <View style={styles.contactIconContainer}>
                                    <Image style={styles.contactIcon} source={require('../../assets/images/contact/instagram.png')}/>
                                    </View>
                                </View>
                                <View style={styles.contactInfo}>
                                    <Text>@dibaanzh.ir</Text>
                                    <View style={styles.contactIconContainer}>
                                        <Image style={styles.contactIcon} source={require('../../assets/images/contact/telegram.png')}/>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </ScrollView>
                </View>
            );
        }
}
const mapStateToProps=state=>{
    return{
    }
};
export default connect(mapStateToProps,null)(Contact);