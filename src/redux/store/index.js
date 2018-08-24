import {createStore,applyMiddleware,compose} from "redux";
import {AsyncStorage} from "react-native"
import thunk from "redux-thunk";
import {createLogger} from "redux-logger";
import reducers from "../reducers"
import { autoRehydrate, persistStore} from "redux-persist";

const middleware=[thunk];
const persistConfig = {
    key: 'root',
    storage:AsyncStorage,
}
// const persistedReducer = persistReducer(persistConfig, reducers)

const PStorage=createStore(
    reducers,
    undefined,
    compose(
        applyMiddleware(...middleware),
        autoRehydrate()
    ),
)
let Persistor = persistStore(PStorage,{storage:AsyncStorage})
export default  PStorage;
// export const Ppersistor= PStorage;




// export default () => {
//     let store = createStore(persistedReducer)
//     let persistor = persistStore(store)
//     return { store, persistor }
// }