import React, { Component } from 'react';
import HeaderLayout from "../../components/header/header";
import {Button, Container} from "native-base";
import {FlatList, Image, Picker, Text, TextInput, View,StyleSheet} from "react-native";
import styles from './message.css'
import {Actions} from "react-native-router-flux";
import FIcon from 'react-native-vector-icons/FontAwesome';
import {SegmentedControls} from "react-native-radio-buttons";
import Product from "../../components/product/product";
import {connect} from "react-redux";
import Accordion from "react-native-collapsible/Accordion";
import Http from "../../services/http";
class Message extends Component{
    _renderItem = (item, index) => {
        item['id'] = index;
        return (<Product prod={item}/>);
    };
    state={
        selectedIndex:false,
    }
    render() {

        return (
            <View style={styles.main}>
                <Image style={styles.bgimage} source={require('../../assets/images/bg.jpg')}/>
                <HeaderLayout/>
                <Accordion
                    sections={this.props.messages}
                    // renderSectionTitle={this._renderSectionTitle}
                    renderHeader={this._renderHeader}
                    renderContent={this._renderContent}
                    onChange={(index)=>this._readMessage(index)}
                />
            </View>
        );
    }
    _renderSectionTitle=(section)=> {
        return (
            <View style={style.content}>
                <Text>{section.Body}</Text>
            </View>
        );
    }

    _renderHeader=(section,index)=> {
        let unread={}
        if(this.state.selectedIndex===index){
            unread=styles.unread
        }
        return (
            <View style={[style.header,unread]}>
                <Text style={style.headerText}>{section.persianCreateAt}</Text>
                {/*<Text style={style.headerText}>jkjkjkjjkkjkjjkjkjk</Text>*/}
                <Text style={style.headerText}>{section.Title}</Text>
            </View>
        );
    }

    _renderContent=(section)=> {
        return (
            <View style={style.content}>
                <Text style={style.bodyText}>{section.Body}</Text>
            </View>
        );
    }

    _readMessage=(selectedIndex)=> {
        this.setState({selectedIndex})
    }
}
const style = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#F5FCFF'
    },
    title: {
        textAlign: 'center',
        fontSize: 22,
        fontWeight: '300',
        marginBottom: 20
    },
    header: {
        backgroundColor: '#F5FCFF',
        padding: 10,
        justifyContent:'space-between',
        flexDirection:'row'
    },
    headerText: {
        textAlign: 'center',
        fontSize: 16,
        fontWeight: '500',
        color:'black',

    },
    bodyText: {
        fontSize: 16,
        color:'black',
        textAlign:'right'
    },
    content: {
        padding: 20,
        backgroundColor: '#fff'
    },
    active: {
        backgroundColor: 'rgba(255,255,255,1)'
    },
    inactive: {
        backgroundColor: 'rgba(245,252,255,1)'
    },
    selectors: {
        marginBottom: 10,
        flexDirection: 'row',
        justifyContent: 'center'
    },
    selector: {
        backgroundColor: '#F5FCFF',
        padding: 10
    },
    activeSelector: {
        fontWeight: 'bold'
    },
    selectTitle: {
        fontSize: 14,
        fontWeight: '500',
        padding: 10
    }
});
const mapStateToProps=state=>{
    return{
        messages:state.messages.messages,
    }
};
export default connect(mapStateToProps,null)(Message);