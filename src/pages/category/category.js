import React, { Component } from 'react';
import HeaderLayout from "../../components/header/header";
import {Button, Container, Spinner} from "native-base";
import {FlatList, Image, ScrollView, SectionList, Slider, Switch, Text, View} from "react-native";
import styles from './category.css'
import {Actions} from "react-native-router-flux";
import FIcon from 'react-native-vector-icons/FontAwesome';
import Accordion from 'react-native-collapsible/Accordion';
import Stepper from "../../components/stepper/stepper";
import MIcon from 'react-native-vector-icons/MaterialIcons';
import {connect} from "react-redux";
import {saveCategories} from "../../redux/actions";
import Http from "../../services/http";
import Product from "../../components/product/product";

class Category extends Component{

    componentWillMount() {
        this.setState({
            selectedOptionIndex:0,
            selectCatIndex:false ,
            indexChanges:0,
            page:0,
        })
    }
    category=null;
    products=[];
    componentWillUnmount() {
    }
    render() {

        return (
            <View style={styles.main}>
                <Image style={styles.bgimage} source={require('../../assets/images/bg.jpg')}/>

                <HeaderLayout back={true}/>

                <ScrollView style={styles.content}>
                    <View style={styles.categories}>
                        <Accordion
                            duration={500}
                            sections={ (this.props.categories&&this.props.categories.length> 0)?(this.props.categories.filter((item,index)=>{
                                if(!item.parentId){
                                    return item;
                                }
                            })):[]}
                            onChange={this._change}
                            renderHeader={this._renderHeader}
                            renderContent={this._renderContent}
                        />
                    </View>
                    {
                        this.state.page>0&&
                        <View style={styles.products}>
                            <FlatList
                                data={this.products}
                                keyExtractor={(item, index) => index.toString()}
                                renderItem={({item, index}) =>
                                    this._renderItem(item, index)
                                }
                                ListEmptyComponent={() => <Spinner/>}
                                onEndReached={() => {
                                    //this._catSelect();
                                }}
                                onEndReachedThreshold={0.1}
                            />
                        </View>
                    }
                </ScrollView>

            </View>
        );
    }
    _change=(selectCatIndex)=>{
        this.setState({selectCatIndex})
    }
    _renderHeader=(section,index) =>{
        return (
            <View  style={styles.accordianHeader}>
                {
                    this.state.selectCatIndex!==index&&<FIcon style={styles.filterIcon} name="angle-left"  color="black" size={25}/>
                }
                {
                    this.state.selectCatIndex===index&&<FIcon style={styles.filterIcon} name="angle-down"  color="black" size={25}/>
                }
                <View  style={styles.accordianHeaderContainerText}>
                    <Text style={styles.accordianHeaderText}>{section.title}</Text>
                </View>
            </View>
        );
    }
    _renderContent=(section)=> {
        return (
            <View  style={styles.accordianContent}>
                {

                    this.props.categories.filter((item)=>{
                        if(item.parentId===section.categoryId){
                            return item;
                        }
                    }).map((item,index)=>{
                        let style={};
                        if(item===this.category){
                            style.color='yellow';
                        }
                        return(
                            <Button title={index} key={index} style={styles.subCatsBtn} onPress={()=>{
                                this.setState({page:1}, function() {
                                    this.products=[];
                                    this._catSelect(item)

                                })
                            }}>
                                <Text style={style}>{item.title}</Text>
                            </Button>
                        );
                    })
                }
            </View>
        );
    }
    _renderItem = (item, index) => {
        item['id'] = index;
        return (<Product prod={item}/>);
    };
    _catSelect=async(cat)=> {

        if(this.state.page>0){

            this.category = cat;
            let data = {
                token: this.props.user.token,
                categoryId: cat.categoryId,
                page: this.state.page
            }
            let response = await Http._postAsyncData(data, 'category');
            if (Array.isArray(response)) {
                this.products = this.products.concat(response);
                this.setState({page: this.state.page + 1});
            }
            if (this.products.length == 0) {
                this.setState({page: 0})
            }
        }
    }
}
const mapStateToProps=(state)=>{
    return{
        user:state.user,
        categories:state.categories.categories,

    }
};
const mapDispatchToProps=(dispatch)=> {
    return{
        saveCategories:(categories)=>{
            dispatch(saveCategories(categories));
        }
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(Category);



// static _renderSubHeader(section,index) {
//     return (
//         <View onPress={()=>{}} style={styles.accordianSubHeader}>
//             <FIcon style={styles.filterIcon} name="angle-left"  color="black" size={25}/>
//
//             <View style={styles.accordianSubHeaderContainerText}>
//                 <Text onPress={()=>{}} style={styles.accordianSubHeaderText}>{index}{section.title}</Text>
//             </View>
//         </View>
//     );
// }
// static _renderSubContent(section) {
// return (
//         <View  style={styles.accordianSubContent}>
//             <View style={styles.accordianSubContainer}>
//                 <View  style={styles.accordianSectionStepper}>
//                     <Text style={styles.categoryText}>{section.title}</Text>
//                 </View>
//             </View>
//         </View>
//     );
// }