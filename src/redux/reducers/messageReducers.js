import {
    SAVE_CATEGORIES, SAVE_MESSAGES
} from "../actions/types";

const initState={
    messages:[]
}
export default messages=(state=initState, action={})=>{
    switch (action.type){
        case SAVE_MESSAGES:
            return {
                messages: action.messages
            }
        default:
            return state;
    }
}