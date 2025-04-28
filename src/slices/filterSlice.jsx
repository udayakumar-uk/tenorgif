import { createSlice } from "@reduxjs/toolkit";

export const filterSlice = createSlice({
    name: 'filter',
    initialState: {
        key: 'LIVDSRZULELA',
        limit: 30,
        search: '',
        pagination: true
    },
    reducers: {
        setSearchVal(state, action){
            state.search = action.payload;
            state.limit = 30;
        },
        setPagination(state, action){
            state.pagination = action.payload;
        },
        setLimitation(state, action){
            state.limit = action.payload;
        },
        setSidebarEvent(state, action){
            state.search = action.payload;
            // state.pagination = false;
            state.limit = 30;
            console.log('setSidebarEvent');
        },
        reset(state){
            // state.pagination = false;
            state.search = '';
            state.limit = 30;
            console.log('reset');
            
        }
    }
});

export const {setSearchVal, setPagination, reset, setSidebarEvent, setLimitation} = filterSlice.actions

export default filterSlice.reducer;

