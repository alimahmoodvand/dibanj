import {ADD_BOOKMARK, ADD_CLOUD, EMPTY_FAVORITES, INIT_BOOKMARK, REMOVE_BOOKMARK, REMOVE_CLOUD} from "../actions/types";

const initState={
    bookmarks:[],
    clouds:[],
}
export default favoriets=(state=initState, action={})=>{
    switch (action.type){
        case ADD_BOOKMARK:
            return {
                ...state,
                bookmarks: [...state.bookmarks, action.product]
            }
        case REMOVE_BOOKMARK:
            return {
                ...state,
                bookmarks: state.bookmarks.filter(item => item !== action.product)
            };
        case INIT_BOOKMARK:
            return {
                ...state,
                bookmarks: action.products
            };
        case ADD_CLOUD:
            return {
                ...state,
                clouds: [...state.clouds, action.product]
            }
        case REMOVE_CLOUD:
            return {
                ...state,
                clouds: state.clouds.filter(item => item !== action.product)
            };
        case EMPTY_FAVORITES:
            return initState;

        default:
            return state;
    }
}