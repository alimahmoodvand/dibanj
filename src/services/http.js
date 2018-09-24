import {REMOVE_USER} from "../redux/actions/types";
import AlertMessage from "./alertmessage";
import {Actions} from "react-native-router-flux";
import DrawerLayout from './../components/drawer/drawer'
import {Component} from "react";
import React from "react";
import {Text, View} from "react-native";
export default class Http extends Component {
    render(){
        return(<View><Text></Text></View>)
}
    static baseurl="http://199.127.99.12:3001/";
    static async _postAsyncData(data,url='login'){
        try {
            let token=data.token
            delete data.token;
            let response = await fetch(Http.baseurl+url, {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization':'JWT '+token
                },
                body: JSON.stringify(data),
            });
            const statusCode = response.status;
            if(statusCode==401){
                // alert('مجوز استفاده از اپ صادر نشد')
                Actions.unauthorized();
            }else {
                const responseJson = await response.json();
                console.log("_postAsyncData", url, data, responseJson)
                if ((responseJson && responseJson.message)) {
                    new AlertMessage().error(null, responseJson.message)
                    return null;
                } else if (!responseJson) {
                    new AlertMessage().error('responseEmpty')
                    return null;
                } else {
                    return responseJson;
                }
            }
        }
        catch (err){
            console.log("_postAsyncData",url,data,err)
            new AlertMessage().error('serverError',err.message)
            return null;
        }
    }

    static _postDataPromise(data,url='login'){
        try {
            let token=data.token
            delete data.token;
            return fetch(Http.baseurl+url, {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization':'JWT '+token
                },
                body: JSON.stringify(data),
            });
        }
        catch (err){
            console.log("_postAsyncData",err,response)
            return err;
        }
    }
    static _postFilePromise(data,file,url='login') {
        try {
            let token=data.token
            delete data.token;
            const form = new FormData();
            for (const key of Object.keys(data)) {
                if(Array.isArray( data[key])){
                    form.append(key,JSON.stringify(data[key]));
                }else{
                    form.append(key, data[key])
                }
            }
            file.map((item,index)=> {
                form.append('photo', {
                    uri: item.uri,
                    type:item.type,
                    name:item.fileName
                });
            })
            console.log("_postFilePromise",data,file,form,url)
            return fetch(Http.baseurl + url, {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'multipart/form-data',
                    'Authorization': 'JWT ' + token
                },
                body: form,
            });
        }
        catch (err) {
            new AlertMessage().error('serverError',err.message)
            // return err;
        }
    }
}