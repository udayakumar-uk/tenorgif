import { createSlice } from "@reduxjs/toolkit";

export const favoriteSlice = createSlice({
    name: 'favorite',
    initialState: {
        gifData: []
    },
    reducers: {
        setFavorite(state, action){
            state.gifData = action.payload;
            localStorage.setItem('favorites', JSON.stringify(action.payload))
        }
    }
});

export const {setFavorite} = favoriteSlice.actions

export default favoriteSlice.reducer;

