import { ADD_BASKET,REMOVE_BASKET} from "../actions/types";

const initState={
    basket:[]
}
export default basket=(state=initState, action={})=>{
    switch (action.type){
        case ADD_BASKET:
            return {
                ...state,
                basket: [...state.basket, action.product]
            }
        case REMOVE_BASKET:
            return {
                ...state,
                basket: state.basket.filter(item => item !== action.product)
            };
        // case ADD_CLOUD:
        //     return {
        //         ...state,
        //         clouds: [...state.clouds, action.product]
        //     }
        // case REMOVE_CLOUD:
        //     return {
        //         ...state,
        //         clouds: state.clouds.filter(item => item !== action.product)
        //     };
        default:
            return state;
    }
}