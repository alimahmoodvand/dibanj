import {
    SAVE_CATEGORIES
} from "../actions/types";

const initState={
    categories:[]
}
export default categories=(state=initState, action={})=>{
    switch (action.type){
        case SAVE_CATEGORIES:
            return {
                categories: action.categories
            }
        default:
            return state;
    }
}