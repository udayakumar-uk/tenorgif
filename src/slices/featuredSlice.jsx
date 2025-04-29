import { createSlice } from "@reduxjs/toolkit";

export const featuerdSlice = createSlice({
    name: 'category',
    initialState: {
        gifData: [],
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
            const getFavData = JSON.parse(localStorage.getItem('favorites'));
            if(getFavData.length){
                action.payload.forEach(gif => {
                    if(getFavData.some(fav => fav.id === gif.id)) {
                        gif.favorite = true;
                    }
                });
            }
            
            state.gifData = action.payload;
        },
        setFeaFavoData(state, action){
            state.gifData = action.payload;
        },
        errFeatuerData(state, action){
            state.loading = false;
            state.err = action.payload
        }
    }
});


export const {startFeatuerdLoading, setFeatuerdData, setFeaFavoData, errFeatuerData} = featuerdSlice.actions

export default featuerdSlice.reducer;

