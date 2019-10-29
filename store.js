
import { persistStore, persistReducer } from 'redux-persist'
// import AsyncStorage from '@react-native-community/async-storage';

import { AsyncStorage } from 'react-native';
import { createStore } from 'redux';
import RootReducer from './Reducers/RootReducer';


const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
    version: 0,
}

const persistedReducer = persistReducer(persistConfig, RootReducer);
const store = createStore(RootReducer);
// export const persistor = persistStore(store);
export default store; 
