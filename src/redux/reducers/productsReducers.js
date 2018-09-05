import {ADD_PRODUCTS, COURSE_ABS, DEC_PAGE, EMPTY_PRODUCTS, INC_PAGE, INIT_PRODUCTS} from "../actions/types";

const initState={
    products:[],
    bookmarks:[],
    page:1
}
export default products=(state=initState, action={})=>{
    switch (action.type){
        case INIT_PRODUCTS:
            const {products}=action;
            return  {
                ...state,
                products: products
            };
        case ADD_PRODUCTS:
            return  {
                ...state,
                products: [...state.products, ...action.products]
            };
        case EMPTY_PRODUCTS:
            return  initState;
         case INC_PAGE:
            return  {
                ...state,
                page:state.page+1
            };
         case DEC_PAGE:
            return  {
                ...state,
                page:state.page-1
            };
        default:
            return state;
    }
}