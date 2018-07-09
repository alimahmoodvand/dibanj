import React, { Component } from 'react';
import HeaderLayout from "../../components/header/header";
import {Button, Container} from "native-base";
import {FlatList, Image, Picker, Text, TextInput, View} from "react-native";
import styles from './bookmark.css'
import {Actions} from "react-native-router-flux";
import FIcon from 'react-native-vector-icons/FontAwesome';
import {SegmentedControls} from "react-native-radio-buttons";
import Product from "../../components/product/product";
import {connect} from "react-redux";
class Bookmark extends Component{
    _renderItem = (item, index) => {
        item['id'] = index;
        return (<Product prod={item}/>);
    };
    render() {
        return (
            <View style={styles.main}>
                <Image style={styles.bgimage} source={require('../../assets/images/bg.jpg')}/>
                <HeaderLayout back={true}/>

                    <FlatList
                        data={this.props.bookmarks}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({item, index}) =>
                            this._renderItem(item, index)
                        }
                    />
            </View>
        );
    }

}
const mapStateToProps=state=>{
    return{
        bookmarks:state.favorites.bookmarks,
    }
};
export default connect(mapStateToProps,null)(Bookmark);