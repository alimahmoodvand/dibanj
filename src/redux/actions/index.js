import {
    ADD_BASKET, ADD_BOOKMARK, ADD_CLOUD, ADD_PRODUCTS, COURSE_ABS, DEC_PAGE, INC_PAGE, REMOVE_BASKET,
    REMOVE_BOOKMARK,
    REMOVE_CLOUD,
    REMOVE_USER, SAVE_CATEGORIES, SAVE_MESSAGES,
    SAVE_USER
} from "./types";


export const saveUser=(user)=>({
    type:SAVE_USER,
    user
})
export const removeUser=(user)=>({
    type:REMOVE_USER,
    user
})
export const saveProducts=(products,page)=>({
    type:COURSE_ABS,
    products,
    page
})
export const incPage=()=>({
    type:INC_PAGE,
})
export const decPage=()=>({
    type:DEC_PAGE,
})
export const addBookmark=(product)=>({
    type:ADD_BOOKMARK,
    product
})
export const removeBookmark=(product)=>({
    type:REMOVE_BOOKMARK,
    product
})
export const addCloud=(product)=>({
    type:ADD_CLOUD,
    product
})
export const removeCloud=(product)=>({
    type:REMOVE_CLOUD,
    product
})
export const addBasket=(product)=>({
    type:ADD_BASKET,
    product
})
export const removeBasket=(product)=>({
    type:REMOVE_BASKET,
    product
})
export const addProducts=(products)=>({
    type:ADD_PRODUCTS,
    products
})
export const saveCategories=(categories)=>({
    type:SAVE_CATEGORIES,
    categories
})
export const saveMessages=(messages)=>({
    type:SAVE_MESSAGES,
    messages
})

