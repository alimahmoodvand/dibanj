import { ADD_PRODUCTS, COURSE_ABS, DEC_PAGE, INC_PAGE} from "../actions/types";

const initState={
    products:[],
    bookmarks:[],
    page:1
}
export default products=(state=initState, action={})=>{
    switch (action.type){
        case COURSE_ABS:
            const {products,page}=action;
            return  {
                products,
                page
            };
        case ADD_PRODUCTS:
            return  {
                ...state,
                products: [...state.products, ...action.products]
            };
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