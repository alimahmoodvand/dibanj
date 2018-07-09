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