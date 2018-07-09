import {REMOVE_USER} from "../redux/actions/types";

export default class Http{
    static baseurl="http://199.127.99.12:3001/";
    static  _postdata(data) {
        return fetch('http://199.127.99.12:3000/login', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        }).then((response) =>  response.json())
            .then((responseJson) => {
                console.log(responseJson)
                return  responseJson;
            })
            .catch((error) => {
                console.log(error);
                return error;
            });

        // console.log(response)
        // return response;

    }
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
            // console.log("_postAsyncData",url,data,response)

            const responseJson = await response.json();
            console.log("_postAsyncData",url,data,responseJson)

            return responseJson;
        }
        catch (err){
            console.log("_postAsyncData",url,data,err)
            return err;
        }
    }
    static _postDataPromise(data,url='login'){
        try {
            return fetch(Http.baseurl+url, {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization':'JWT '+data.token
                },
                body: JSON.stringify(data),
            });
        }
        catch (err){
            console.log("_postAsyncData",err,response)
            return err;
        }
    }
    static async _getAsyncData(data,url=''){
        try {
            let response = await fetch(Http.baseurl+url, {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization':'JWT '+data.token
                },
                body: JSON.stringify(data),
            });
            const responseJson = await response.json();
            // console.log("_postAsyncData",response.body)
            return responseJson;
        }
        catch (err){
            console.log("_postAsyncData",err)
            return err;
        }
    }
}