import { createSlice } from "@reduxjs/toolkit";

export const categorySlice = createSlice({
    name: 'category',
    initialState: {
        categories: [],
        loading: false,
        err: null
    },
    reducers: {
        startCatLoading(state, action){
            state.loading = true;
            state.err = null;
        },
        setCategoryData(state, action){
            state.loading = false;
            state.categories = action.payload
        },
        errCategoryData(state, action){
            state.loading = false;
            state.err = action.payload
        }
    }
});

export const {startCatLoading, setCategoryData, errCategoryData} = categorySlice.actions

export default categorySlice.reducer;

