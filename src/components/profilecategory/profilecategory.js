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
var categories=null;
export default class ProfileCategory extends Component {
    state = {
        isModalVisible: false,
        language:'java',
        index:0,
        tabIndex:0,
    };

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
                <View style={styles.textContainer}>
                    <MIcon onPress={() => this._toggleModal()} name="add" size={20} color="yellow" style={styles.addIcon}/>
                    <Text  style={styles.fieldText}>موضوعات مورد علاقه</Text>
                </View>
                <View style={styles.bookmarks} >
                    <Text style={styles.bookmarkText}>
                        #پژوهشگر
                    </Text>
                    <Text style={styles.bookmarkText}>
                        #ورزشکار
                    </Text>
                    <Text style={styles.bookmarkText}>
                        #عکاس
                    </Text>
                </View>
                <Modal
                    onBackButtonPress={this._toggleModal}
                    onBackdropPress={this._toggleModal}
                    backdropColor="transparent"
                    style={styles.modal}
                    isVisible={this.state.isModalVisible}>
                    <View style={styles.modalContainer}>
                        <FlatList
                            data={categories}
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
                            <Button  style={styles.modalButtonVerify} title={0} onPress={this._toggleModal}>
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
        // console.log(this.state.index,idx)
        return(
            <View style={styles.subCatContainer}>
                <Button style={styles.subCatBtn} title={1}  small  onPress={()=>{}}>
                    <Text>پژوهشگر</Text>
                </Button>
                <Button disabled={true} style={styles.subCatBtn} title={1} small   onPress={()=>{}}>
                <Text>نویسنده</Text>
            </Button>
                <Button style={styles.subCatBtn} title={1}  small  onPress={()=>{}}>
                <Text>کارآفرین</Text>
            </Button>
                <Button style={styles.subCatBtn} title={1}  small  onPress={()=>{}}>
                <Text>خبرنگار</Text>
            </Button>
            </View>
        );
    };
    _renderSelectedCat=()=>{
        // if(idx!=null)
        // this.setState({index:idx});
        // alert(this.state.index);
        // console.log(this.state.index,idx)
        return(
            <View style={styles.selectedCatContainer}>
                <Text style={styles.limitTitle}># پژوهشگر #ورزشکار # عکاس</Text>
                <Button style={styles.selectedCatBtn} title={1}  small  onPress={()=>{}}>
                    <Text style={styles.selectedCatText}>پژوهشگر</Text>
                    <MIcon  name="check" size={20} color="green"/>
                </Button>
                <Button  style={styles.selectedCatBtn} title={1} small   onPress={()=>{}}>
                <Text style={styles.selectedCatText}>نویسنده</Text>
                    <MIcon  name="check" size={20} color="green"/>
                </Button>
                <Button style={styles.selectedCatBtn} title={1}  small  onPress={()=>{}}>
                <Text style={styles.selectedCatText}>کارآفرین</Text>
                    <MIcon  name="check" size={20} color="green"/>

                </Button>
                <Button style={styles.selectedCatBtn} title={1}  small  onPress={()=>{}}>
                <Text style={styles.selectedCatText}>خبرنگار</Text>
                    <MIcon  name="check" size={20} color="green"/>
                </Button>
            </View>
        );
    };
    _renderTabs=(item, index) => {
        // console.log(this.state.index,index)

        return (
            <View style={[styles.tabBtnContainer]}>
                {(this.state.index == index) &&
                (
                    <Button style={[styles.tabBtn, {borderBottomColor: 'yellow', borderBottomWidth: 3}]}
                            onPress={() =>{this.setState({index});}}>
                        <Text style={{color: 'yellow' }}>{item.teacher}</Text></Button>
                )}
                {(this.state.index != index) &&
                    (<Button style={[styles.tabBtn, {borderBottomColor: 'black', borderBottomWidth: 3}]}
                             onPress={() =>{this.setState({index});}}>
                            <Text style={{color:  'black'}}>{item.teacher}</Text></Button>
                    )}
            </View>
        )
    }
}
const style = StyleSheet.create({
    container: {
        flex: 0.5,
    },
});