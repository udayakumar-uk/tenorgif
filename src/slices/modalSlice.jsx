import { createSlice } from "@reduxjs/toolkit";



function convertToFileSize(size) {
    var i = size == 0 ? 0 : Math.floor(Math.log(size) / Math.log(1024));
    const fileSize =  +((size / Math.pow(1024, i)).toFixed(2)) * 1 + ' ' + ['B', 'kB', 'MB', 'GB', 'TB'][i];
    return fileSize;
}

export const modalSlice = createSlice({
    name: 'modal',
    initialState: {
        showModal: false,
        item: null,
        dims: null,
        size: null,
        type: null,
        sticker: false,
        transparentType: '',
        transparent: false,
        url: ''
    },
    reducers: {
        setShowModal(state, action){
            const item = action.payload
            state.showModal = true;
            state.sticker = item.sticker;
            state.item = item;
            state.type = 'gif';
            state.dims = item.media[0].gif.dims;
            state.url = item.media[0].gif.url;
            state.size = convertToFileSize(item.media[0].gif.size);

            console.log(item);
        },
        setHideModal(state, action){
            state.showModal = false;
            state.type = 'gif';
            state.transparent = false; 
            state.transparentType = ''
        },
        setGifType(state, action){
            const type = action.payload;
            
            if(type === '_transparent'){
                // state.type = '';
                // state.transparentType = state.type+type;
                // state.dims = state.item.media[0][type].dims;
                // state.size = convertToFileSize(state.item.media[0][type].size);
            }else{
                state.type = type;
                state.transparentType = '';
                state.transparent = (type === 'webp' || type === 'tinygif' || type === 'nanogif');
                state.dims = state.item.media[0][type].dims;
                state.url = state.item.media[0][type].url;
                state.size = convertToFileSize(state.item.media[0][type].size);
            }
        }
    }
});

export const { setShowModal, setHideModal, setGifType } = modalSlice.actions

export default modalSlice.reducer;

