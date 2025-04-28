import { startCatLoading, setCategoryData, errCategoryData } from "./slices/categorySlice";
import { startStickLoading, setStickerData, errStickerData } from "./slices/stickerSlice";
import { startFeatuerdLoading, setFeatuerdData, errFeatuerData } from "./slices/featuredSlice";

export function AsyncThunkCategory(key){

    return async (dispatch) =>{
        dispatch(startCatLoading());
        try{
            const response = await fetch('https://g.tenor.com/v1/categories?key='+key);
            const res = await response.json();
            console.log('categories', res);
            dispatch(setCategoryData(res.tags));
            
        }catch(err){
            console.log(err);
            dispatch(errCategoryData(err));
        }
    }
}

export function AsyncThunkSticker(search, limit, key){

    return async (dispatch) =>{
        dispatch(startStickLoading());
        try{
            const response = await fetch('https://g.tenor.com/v1/search?&searchfilter=sticker&q='+search+'&limit='+limit+'&key='+key);
            const res = await response.json();
            const stickerData = res.results.map(stick => ({ ...stick, sticker: true, favorite: false}));
            console.log('sticker', stickerData);
            dispatch(setStickerData(stickerData));
            
        }catch(err){
            console.log(err);
            dispatch(errStickerData(err));
        }
    }
} 

export function AsyncThunkFeature(search, limit, key){

    return async (dispatch) =>{
        dispatch(startFeatuerdLoading());
        try{
            const response = await fetch('https://g.tenor.com/v1/search?key='+key+'&q='+search+'&limit='+limit);
            const res = await response.json();
            const featureData = res.results.map(fea => ({ ...fea, favorite: false}));
            console.log('featured', featureData);
            
            dispatch(setFeatuerdData(featureData));
            
        }catch(err){
            console.log(err);
            dispatch(errFeatuerData(err));
        }
    }
} 