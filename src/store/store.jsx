import { configureStore } from "@reduxjs/toolkit";
import loginSlice from "./slices/loginSlice";
import openSlice from "./slices/openSlice";
import calendarSlice from "./slices/calendarSlice";
import storage from 'redux-persist/lib/storage';
import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import thunk from 'redux-thunk';


const reducers = combineReducers({
    login:loginSlice,
    calendar:calendarSlice,
    open:openSlice,
});


const persistConfig = {
    key: 'entrypoint',
    storage,
    //whitelist: ['cart'], // reducername
}

const persistedReducer = persistReducer(persistConfig, reducers);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: [thunk]
})

export default store;