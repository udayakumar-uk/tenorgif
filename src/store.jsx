import { configureStore } from '@reduxjs/toolkit';
import categoryReducer from './slices/categorySlice';
import filterReducer from './slices/filterSlice';
import stickerReducer from './slices/stickerSlice';
import featuredReducer from './slices/featuredSlice';
import modalReducer from './slices/modalSlice';
import favoriteReducer from './slices/favoriteSlice';

export const store = configureStore({
    reducer:{
        category: categoryReducer,
        filter: filterReducer,
        modal: modalReducer,
        featured: featuredReducer,
        sticker: stickerReducer,
        favorite: favoriteReducer
    }
})