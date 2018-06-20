import {combineReducers}from "redux";
import user from "./userReducer"
import products from "./productsReducers"
import favorites from "./favorietsReducers"
import basket from "./shopReducers"
import categories from "./categoriesReducers"

const rehydrated=(state=false,action)=>{
    switch (action.type){
        case 'persist/REHYDRATE':
            // console.log(action.type,action,state)
            return true;
            break;
            // return {
            //     rehydrate:action.payload.rehydrate,
            //     user:action.payload.user
            // };
        default:
            return state;
    }
}
export default combineReducers({
    rehydrated,
    categories,
    products,
    favorites,
    basket,
    user
})