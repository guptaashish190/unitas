
import { persistStore, persistReducer } from 'redux-persist'
// import AsyncStorage from '@react-native-community/async-storage';
import createSecureStore from "redux-persist-expo-securestore";
import { AsyncStorage } from 'react-native';
import { createStore } from 'redux';
import RootReducer from './Reducers/RootReducer';
import persistCombineReducers from 'redux-persist/es/persistCombineReducers';


const storage = createSecureStore();
const persistConfig = {
    key: 'root',
    storage,
    version: 0,
}

// const persistedReducer = persistReducer(persistConfig, RootReducer);
// const store = createStore(RootReducer);
// // export const persistor = persistStore(store);
// export default store; 


const reducer = persistReducer(persistConfig, RootReducer);

export const store = createStore(reducer);
export const persistor = persistStore(store);
