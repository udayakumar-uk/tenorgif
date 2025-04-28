import { createSlice } from "@reduxjs/toolkit";

export const favoriteSlice = createSlice({
    name: 'favorite',
    initialState: {
        gifData: []
    },
    reducers: {
        setFavorite(state, action){
            state.gifData = action.payload;
            console.log(action.payload);
            
        }
    }
});

export const {setFavorite} = favoriteSlice.actions

export default favoriteSlice.reducer;

