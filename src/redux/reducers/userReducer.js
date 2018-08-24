import {REMOVE_USER, SAVE_USER} from "../actions/types";

const initState={

    "fullName":null,
    "username":null,
    "mobile": null,
    "password":null,
    "email": null,
    "ostan": null,
    "city": null,
    "postalCode": null,
    "address": null,
    "token": null,
};
export default user=(state=initState,action={})=>{
    switch (action.type){
        case SAVE_USER:
            const {user}=action;
            if(user.image&&user.image.indexOf("http")==-1){
                user.image="http://199.127.99.12:3001/"+user.image;
            }
            return  user; /*{
                userId:user.userId
            };*/
            break;
        case REMOVE_USER:
            return  initState; /*{
                userId:user.userId
            };*/
            break;
        default:
            return state;
    }
}