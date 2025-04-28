import { createSlice } from "@reduxjs/toolkit";

export const stickerSlice = createSlice({
    name: 'category',
    initialState: {
        stickers: [],
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
            state.stickers = action.payload
        },
        errStickerData(state, action){
            state.loading = false;
            state.err = action.payload
        }
    }
});


export const {startStickLoading, setStickerData, errStickerData} = stickerSlice.actions

export default stickerSlice.reducer;

