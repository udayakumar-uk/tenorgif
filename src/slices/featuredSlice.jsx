import { createSlice } from "@reduxjs/toolkit";

export const featuerdSlice = createSlice({
    name: 'category',
    initialState: {
        features: [],
        loading: false,
        err: null
    },
    reducers: {
        startFeatuerdLoading(state, action){
            state.loading = true;
            state.err = null;
        },
        setFeatuerdData(state, action){
            state.loading = false;
            state.features = action.payload
        },
        errFeatuerData(state, action){
            state.loading = false;
            state.err = action.payload
        }
    }
});


export const {startFeatuerdLoading, setFeatuerdData, errFeatuerData} = featuerdSlice.actions

export default featuerdSlice.reducer;

