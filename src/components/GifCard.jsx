import FavWhite from '../img/favorite-white.svg';
import FavRed from '../img/favorite-red.svg';

import { setShowModal } from "../slices/modalSlice";

import { useDispatch, useSelector } from 'react-redux';

import { setFavorite } from '../slices/favoriteSlice';
import { setFeaFavoData } from '../slices/featuredSlice';
import { setStickFavoData } from '../slices/stickerSlice';


export default function GifCard({feature}){

    const dispatch = useDispatch();
    const favoData = useSelector(state=> state.favorite.gifData);
    const feaData = useSelector(state=> state.featured.gifData);
    const stickData = useSelector(state=> state.sticker.gifData);
    

    function SetFavorite(e, id) {
        e.stopPropagation();
        const setFeaFav = feaData.map(fea=> id === fea.id ? {...fea, favorite: !fea.favorite} : fea);
        const setStickFav = stickData.map(stick=> id === stick.id ? {...stick, favorite: !stick.favorite} : stick);
        
        const feaDataFilter = setFeaFav.filter(gif => gif.favorite);
        const stickDataFilter = setStickFav.filter(gif => gif.favorite);

        if(feaDataFilter.length === 0 && stickDataFilter.length === 0){
            const favoDataFilter = favoData.filter(gif => gif.id !== id);
            dispatch(setFavorite(favoDataFilter));
            return
        }

        dispatch(setFeaFavoData(setFeaFav));
        dispatch(setStickFavoData(setStickFav));
        dispatch(setFavorite([...feaDataFilter, ...stickDataFilter]));

    }

    return(       
        <li onClick={() => dispatch(setShowModal(feature))} >
            <button type="button" onClick={(e) => SetFavorite(e, feature.id)} className="favorite btn"><img src={feature.favorite ? FavRed : FavWhite} alt="Favorite" /></button>
            <img src={feature.media[0].tinygif.url} alt={feature.content_description} loading="lazy"  />
            <span className="text-truncate content" title={feature.content_description}>{feature.content_description}</span>
        </li>
    )
}