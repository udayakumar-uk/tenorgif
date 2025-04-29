import { createSlice } from "@reduxjs/toolkit";

export const stickerSlice = createSlice({
    name: 'category',
    initialState: {
        gifData: [],
        loading: false,
        err: null
    },
    reducers: {
        startStickLoading(state, action){
            state.loading = true;
            state.err = null;
        },
        setStickerData(state, action){
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
        setStickFavoData(state, action){
            state.gifData = action.payload;
            
        },
        errStickerData(state, action){
            state.loading = false;
            state.err = action.payload
        }
    }
});


export const {startStickLoading, setStickerData, errStickerData, setStickFavoData} = stickerSlice.actions

export default stickerSlice.reducer;

