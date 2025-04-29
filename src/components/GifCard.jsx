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
        
        const getFavData = JSON.parse(localStorage.getItem('favorites')) || [];

        const setFeaFav = feaData.map(fea => fea.id === id ? { ...fea, favorite: !fea.favorite } : fea );
        const setStickFav = stickData.map(stick =>  stick.id === id ? { ...stick, favorite: !stick.favorite } : stick );
        const isAlreadyFavorite = getFavData.some(gif => gif.id === id);

        let updatedFavorites;
        if (isAlreadyFavorite) {
            updatedFavorites = getFavData.filter(gif => gif.id !== id);
        } else {
            const newFavorite = [...setFeaFav, ...setStickFav].find(gif => gif.id === id);
            updatedFavorites = [...getFavData, newFavorite];
        }

        localStorage.setItem('favorites', JSON.stringify(updatedFavorites));

        const favIds = new Set(updatedFavorites.map(gif => gif.id));

        const syncedFeaData = setFeaFav.map(gif => ({ ...gif, favorite: favIds.has(gif.id) }));
        const syncedStickData = setStickFav.map(gif => ({ ...gif, favorite: favIds.has(gif.id) }));

        dispatch(setFeaFavoData(syncedFeaData));
        dispatch(setStickFavoData(syncedStickData));
        dispatch(setFavorite(updatedFavorites));
    }

    return(       
        <li onClick={() => dispatch(setShowModal(feature))} >
            <button type="button" onClick={(e) => SetFavorite(e, feature.id)} className="favorite btn"><img src={feature.favorite ? FavRed : FavWhite} alt="Favorite" /></button>
            <img src={feature.media[0].tinygif.url} alt={feature.content_description} loading="lazy"  />
            <span className="text-truncate content" title={feature.content_description}>{feature.content_description}</span>
        </li>
    )
}