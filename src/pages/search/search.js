import React, { Component } from 'react';
import HeaderLayout from "../../components/header/header";
import {Button, Container, Spinner} from "native-base";
import {
    FlatList, Image, Picker, RefreshControl, ScrollView, Text, TextInput, TouchableOpacity,
    View
} from "react-native";
import styles from './search.css'
import {Actions} from "react-native-router-flux";
import FIcon from 'react-native-vector-icons/FontAwesome';
import MIcon from 'react-native-vector-icons/MaterialIcons';
import {SegmentedControls} from "react-native-radio-buttons";
import Term from "../term/term";
import Modal from "react-native-modal";
import Product from "../../components/product/product";

import Accordion from 'react-native-collapsible/Accordion';
import Http from "../../services/http";
import {removeUser, saveCategories} from "../../redux/actions";
import {connect} from "react-redux";
import AlertMessage from "../../services/alertmessage";
import Loading from "../../components/laoding/laoding";
class Search extends Component{
    componentWillMount() {
        this.options = [
            {
                label: 'همه',
                value: 'opt1',
                type:0,
                subType:0,
            }, {
                label: 'مجازی',
                value: 'opt',
                type:1,
                subType:2,
            }, {
                label: 'حضوری',
                value: 'opt3',
                type:1,
                subType:1,
            },
            {
                label: 'محصول فیزیکی',
                value: 'opt2',
                type:2,
                subType:1,
            }
        ]
        this.searchParams={
           cats:[],text:''
        };
        this.setState({
            selectedOptionIndex:0,
            selectCatIndex:false ,
            isModalVisible: false,
            indexChanges:0,
            page:0,
            loading:false,
        })

    }
    _headerRender=()=>{
        return(<View style={{backgroundColor:'white'}}>
            <View style={styles.searchSection}>
                <View style={styles.serachBtnSection}>
                    <Button key={0} small   style={styles.btnSearch} title={0} onPress={()=>{
                        this.products=[];
                        this.setState({page:1},()=>{
                            this._searchProduct()
                        });
                    }}>
                        <Text  style={styles.btnSearchText} >جستجو</Text>
                    </Button>
                </View>
                <TextInput
                    style={styles.input}
                    onChangeText={(text) => this.searchParams.text = text}
                    placeholder="جستجو مانند : بازاریابی . مدیریت ..."
                    underlineColorAndroid="transparent"
                />
                <View style={styles.searchIcon}>
                    <FIcon  name="search" size={20} color="#000"/>
                </View>
            </View>
            <View style={styles.filterSection}>
                <Text style={styles.filterHeader}>
                    نوع آموزش
                </Text>
                <SegmentedControls
                    containerStyle={styles.filterOptions}
                    tint={'#1e2126'}
                    selectedTint= {'black'}
                    backTint= {'white'}
                    containerBorderTint={'rgb(255, 200, 0)'}
                    separatorTint={'rgb(255, 200, 0)'}
                    selectedBackgroundColor={'rgb(255, 200, 0)'}
                    optionContainerStyle  ={styles.filterOption}
                    options={ this.options }
                    onSelection={ this._setSelectedOption.bind(this) }
                    selectedIndex ={this.state.selectedOptionIndex}
                    extractText={ (option) => option.label }
                />
            </View>
            <View style={styles.categorySection}>
                {/*<View style={styles.categoryBtnContainer}>*/}
                <Button style={styles.categoryToggle} small title={0} onPress={()=>this._toggleModal()}>
                    <MIcon  name="arrow-drop-down" size={20} color="black"/>
                    <Text >نمایش دسته ها</Text>
                </Button>
                {/*</View>*/}

                <Text style={styles.categoryHeader}>
                    انتخاب دسته
                </Text>

            </View>
            {/*modal place*/}
            <View style={styles.serachOptions}>
                {this._renderCatButton()}

            </View>
        </View>)

    }
    componentWillUnmount(){
        if(this.state.isModalVisible)
            this._toggleModal();
    }
    _toggleModal = () =>{
        if(!this.state.isModalVisible){
            this.setState({selectCatIndex:false})
        }
        this.setState({isModalVisible: !this.state.isModalVisible});
    }
    _setSelectedOption=(item)=>{
        // console.log(item)
       this.setState({selectedOptionIndex:this.options.indexOf(item)});
    }
    onEndReachedCalledDuringMomentum=true;
    products=[];
    showSpinner=true;
    render(){
        // console.log(this.state.selectCatIndex, this.state.selectCatIndex!==false?this.state.selectCatIndex:-1)
        const selectCatIndex=this.state.selectCatIndex;
        return(
            <View style={styles.main}>
                <Loading visible={this.state.loading} />
                <Image style={styles.bgimage} source={require('../../assets/images/bg.jpg')}/>

                <HeaderLayout/>
                <View style={styles.content}>

                <View style={styles.products}>

                {
                        // this.state.page>0&&
                            <FlatList
                                ListHeaderComponent={this._headerRender}
                                data={this.products}
                                keyExtractor={(item, index) => index.toString()}
                                renderItem={({item, index}) =>
                                    this._renderItem(item, index)
                                }
                                // ListEmptyComponent={() => {
                                //     if(this.showSpinner){
                                //         return(<Spinner/>);
                                //     }
                                //     else{
                                //         return(<Text></Text>)
                                //     }
                                //
                                // }}
                                onEndReached={({distanceFromEnd}) => {
                                        this._searchProduct();
                                }}

                                removeClippedSubviews={true}
                                onEndReachedThreshold = {0.1}
                            />
                    }
                    </View>

                </View>
                <Modal
                    onBackButtonPress={this._toggleModal}
                    onBackdropPress={this._toggleModal}
                    backdropColor="transparent"
                    style={styles.modal}
                    isVisible={this.state.isModalVisible}>
                    <ScrollView style={styles.categories}>
                        {/*{console.log(this.state.selectCatIndex!==false?this.state.selectCatIndex:-1)}*/}
                        <View>
                            {selectCatIndex === false &&
                            <Accordion
                                duration={500}
                                sections={(this.props.categories && this.props.categories.length > 0) ? (this.props.categories.filter((item, index) => {
                                    if (!item.parentId) {
                                        return item;
                                    }
                                })) : []}

                                onChange={this._change}
                                renderHeader={this._renderHeader}
                                renderContent={this._renderContent}
                            />
                            }
                            {selectCatIndex !== false &&
                            <Accordion
                                duration={500}
                                sections={(this.props.categories && this.props.categories.length > 0) ? (this.props.categories.filter((item, index) => {
                                    if (!item.parentId) {
                                        return item;
                                    }
                                })) : []}
                                initiallyActiveSection={selectCatIndex}
                                onChange={this._change}
                                renderHeader={this._renderHeader}
                                renderContent={this._renderContent}
                            />
                            }
                        </View>
                    </ScrollView>
                </Modal>
            </View>
        );
    }
    _renderItem = (item, index) => {
        item['id'] = index;
        return (<Product search={true} prod={item}/>);
    };
    _renderCatButton=()=>{
       return this.searchParams.cats.map((item,index)=>{
            return(
                <Button key={index} small   style={styles.serachOption} title={index}>
                <MIcon  name="close" size={20} onPress={()=>{
                    this.searchParams.cats.splice(index,1);
                    this.setState({selectCatIndex:false});
                }} color="yellow"/>
                <Text  style={styles.serachOptionText} >{item.title}</Text>
            </Button>
            );
        })
    }
    isSearching=false;
    _searchProduct=async()=>{
        if(!this.isSearching) {
            this.isSearching=true;
            /*if (!this.searchParams.text.trim()) {
                this.setState({page: 0});
                alert("عبارتی وارد نشده است")
            } else */if (this.state.page > 0) {
                let catsId = [];
                if (this.searchParams.cats.length > 0) {
                    this.searchParams.cats.map((item) => {
                        catsId.push(item.categoryId);
                    })
                }
                let data = {
                    token: this.props.user.token,
                    search: this.searchParams.text,
                    categories: catsId,
                    type: this.options[this.state.selectedOptionIndex].type,
                    subType: this.options[this.state.selectedOptionIndex].subType,
                    page: this.state.page
                }
                this.setState({loading:true})
                let response = await Http._postAsyncData(data, 'search')
                // console.log(response)
                let page=this.state.page;
                if (Array.isArray(response)) {
                    this.products = this.products.concat(response);
                    // console.log(response)
                    if (this.products.length != 0) {
                        this.showSpinner = true;
                    } else {
                        this.showSpinner = false;
                        new AlertMessage().message('notFound')
                    }
                    if (response.length > 0)
                       page=this.state.page + 1;
                }
                this.setState({loading: false,page});

            }
            this.isSearching=false;
        }
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
            <View  style={styles.accordianContent} >
                {

                    this.props.categories.filter((item)=>{
                        if(item.parentId===section.categoryId){
                            return item;
                        }
                    }).map((item,index)=>{
                        let style={};
                        let btnStyle={};
                        if(this.searchParams.cats.indexOf(item)!==-1){
                            style.color='black';
                            style.fontWeight='bold';
                            btnStyle=styles.subCatsBtnSelected;
                        }
                        return(
                            <Button title={index} key={index} style={[styles.subCatsBtn,btnStyle]} onPress={()=>{
                                this._catSelect(item)
                                // setTimeout(()=>{
                                    this.setState({indexChanges:this.state.indexChanges++})
                                // },1000)

                            }}>
                                <Text style={style}>{item.title}</Text>
                            </Button>
                        );
                    })
                }
            </View>
        );
    }
    _catSelect=(cat)=> {
        if(this.searchParams.cats.length===0)
        {
            this.searchParams.cats.push(cat)
        }else{
            let exist=false;
            this.searchParams.cats.map((item,index)=>{
                if(item==cat&&!exist){
                    exist=true;
                    this.searchParams.cats.splice(index,1)
                }
            })
            if(!exist){
                this.searchParams.cats.push(cat)
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
        // saveCategories:(categories)=>{
        //     dispatch(saveCategories(categories));
        // }
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(Search);