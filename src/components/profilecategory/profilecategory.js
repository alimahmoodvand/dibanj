import React, { Component } from 'react';
import HeaderLayout from "../../components/header/header";
import {Button, Container, Input} from "native-base";
import {
    Image, ImageBackground, Picker, Text, StyleSheet,
    TouchableHighlight, TouchableOpacity, View, Dimensions, FlatList
} from "react-native";
import styles from './profilecategory.css'
import {Actions} from "react-native-router-flux";
import FIcon from 'react-native-vector-icons/FontAwesome';
import Modal from "react-native-modal";
import ProfileModal from "../profilemodal/profilemodal";
import MIcon from 'react-native-vector-icons/MaterialIcons';
import {saveCategories} from "../../redux/actions";
import {connect} from "react-redux";
import Http from "../../services/http";
var categories=null;
 class ProfileCategory extends Component {
    state = {
        isModalVisible: false,
        language:'java',
        index:1,
        updateUI:1,
        tabIndex:0,
    };
    userCats=[];
     _getUserCats=async()=>{
         let response = await Http._postAsyncData({userId:this.props.user.userId,token:this.props.user.token},'userCategoryBookmarks');
         // console.log(response)
         if(Array.isArray(response)){
             this.userCats=response;
             this.setState({updateUI:this.state.updateUI++});
         }
     }
     componentWillMount(){
         this._getUserCats();
     }
         componentWillUnmount(){
        if(this.state.isModalVisible)
        this._toggleModal();
    }
    _toggleModal = () =>
        this.setState({isModalVisible: !this.state.isModalVisible});
    render() {
        const {cats} = this.props;
        categories=cats;
       // console.log(field)
        return (
            <View style={styles.container}>
                <TouchableOpacity onPress={() => this._toggleModal()}>
                <View style={styles.textContainer}>
                    <MIcon  name="add" size={20} color="red" style={styles.addIcon}/>
                    <Text  style={styles.fieldText}>موضوعات مورد علاقه</Text>
                </View>
                <View>
                    <View style={styles.selectedCatContainer} >
                    {
                        this.userCats.map((item,index)=>{
                            return(<Text key={index} style={styles.bookmarkText}>
                                #{item.title}
                            </Text>)
                        })
                    }
                </View>
                </View>
                </TouchableOpacity>
                <Modal
                    onBackButtonPress={this._toggleModal}
                    onBackdropPress={this._toggleModal}
                    backdropColor="transparent"
                    style={styles.modal}
                    isVisible={this.state.isModalVisible}>
                    <View style={styles.modalContainer}>
                        <FlatList
                            data={ (this.props.categories&&this.props.categories.length> 0)?(this.props.categories.filter((item,index)=>{
                                if(!item.parentId){
                                    return item;
                                }
                            })):[]}
                            extraData={{ index:this.state.index }}
                            horizontal={true}
                            keyExtractor={(item, index) => index.toString()}
                            renderItem={({item, index}) =>
                                this._renderTabs(item, index)
                            }
                        />
                        {this._renderSubCat()}
                        {this._renderSelectedCat()}
                        <View style={styles.modalButton}>
                            <Button style={styles.modalButtonCancel} title={0} onPress={this._toggleModal}>
                                <Text style={styles.modalButtonCancelText} >انصراف</Text>
                            </Button>
                            <Button  style={styles.modalButtonVerify} title={0} onPress={()=>{
                                this._sendUserCats();

                            }}>
                                <Text style={styles.modalButtonVerifyText}>تاييد</Text>
                            </Button>
                        </View>
                    </View>
                </Modal>
            </View>
        )
    }
    _renderSubCat=()=>{
        // if(idx!=null)
        // this.setState({index:idx});
        // alert(this.state.index);
        // console.log(this.state.index)
        return(
            <View style={styles.subCatContainer}>
                {
                    this._getCatChild().map((item,index)=>{
                        let flag=false;
                        let bg={};
                        let color={color:'black'}
                        if(this._isMarked(item.categoryId)){
                         bg.backgroundColor='#cecaca';
                             color={color:'gray'}

                            flag=true;
                        }
                       return(
                           <Button style={[styles.subCatBtn,bg]} key={index}title={1}  small  onPress={()=>{
                               this._toggleCat(item)
                           }}>
                            <Text  style={color}>{item.title}</Text>
                        </Button> )
                    })
                }
            </View>
        );
    };
    _getCatChild=()=>{
        let tmp=[];
        this.props.categories.map((item,index)=>{
            if(item.parentId===this.state.index&&item.categoryId!==this.state.index){
                tmp.push(item)
            }
        })
        return tmp;
    }
     _isMarked=(categoryId)=>{
        let isMarked=false;
         this.userCats.map((item,index)=>{
             // console.log(item.categoryId,categoryId,item.categoryId===categoryId)
             if(item.categoryId===categoryId){
                 isMarked= true;
             }
         })
         return isMarked;
     }
    _renderSelectedCat=()=>{
        // if(idx!=null)
        // this.setState({index:idx});
        // alert(this.state.index);
        // console.log(this.state.index,idx)
        return(
            <View style={styles.selectedCatContainer}>
                <Text style={styles.limitTitle}>حداکثر تعداد هشتگ ها 50 عدد می باشد
                </Text>
                {this.userCats.map((item, index) => {
                    return (
                        <Button style={styles.selectedCatBtn} disabled={true} key={index} title={1} small onPress={() => {
                        }}>
                            <Text style={styles.selectedCatText}>{item.title}</Text>
                            <MIcon name="check" size={20} color="green"/>
                        </Button>)
                })
                }
            </View>
        );
    };
    _renderTabs=(item, index) => {
        // console.log(this.state.index,index)

        return (
            <View style={[styles.tabBtnContainer]}>
                {(this.state.index === item.categoryId) &&
                (
                    <Button style={[styles.tabBtn, {borderBottomColor: 'red', borderBottomWidth: 3}]}
                            onPress={() =>{this.setState({index:item.categoryId});}}>
                        <Text style={{color: 'red' }}>{item.title}</Text></Button>
                )}
                {(this.state.index !== item.categoryId) &&
                    (<Button style={[styles.tabBtn, {borderBottomColor: 'black', borderBottomWidth: 3}]}
                             onPress={() =>{this.setState({index:item.categoryId});}}>
                            <Text style={{color:  'black'}}>{item.title}</Text></Button>
                    )}
            </View>
        )
    }

     _toggleCat=(target)=> {
        let isMarked=false;
        if(this.userCats.length<=50) {
            this.userCats.map((item, index) => {
                // console.log(item.categoryId,categoryId,item.categoryId===categoryId)
                if (item.categoryId === target.categoryId) {
                    isMarked = true;
                    this.userCats.splice(index, 1);
                }
            })
            if (!isMarked) {
                this.userCats.push(target)
            }
            this.setState({updateUI: this.state.updateUI++});
        }else{
            alert('تعداد موضوعات بیشتر از حد مجاز است')
        }
     }

     _sendUserCats=async()=> {
        // console.log({
        //     userId:this.props.user.userId,
        //     categoryIds:this.userCats.filter((item)=>{return item.categoryId}),
        //     token:this.props.user.token})
         let categoryIds=[];
         this.userCats.map((item,index)=>{
             categoryIds.push(item.categoryId);
         });
         let response = await Http._postAsyncData({
             userId:this.props.user.userId,
             categoryIds,
             token:this.props.user.token},'categoryBookmark');
         // console.log(response)
         this._toggleModal();

     }
 }
const mapStateToProps=(state)=>{
    return{
        user:state.user,
        categories:state.categories.categories,

    }
};
export default connect(mapStateToProps,null)(ProfileCategory);

