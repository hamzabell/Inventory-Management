import {  configureStore } from '@reduxjs/toolkit';
import { loadState } from '../browser-storage';
import typesReducer from './slices/typeSlice';
import customReducer from './slices/customSlice';

export default configureStore({
    reducer: {
        types: typesReducer,
        custom: customReducer
    },
    preloadedState: loadState(),
})