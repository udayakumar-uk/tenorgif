import FavWhite from '../img/favorite-white.svg';
import FavRed from '../img/favorite-red.svg';

import { setShowModal } from "../slices/modalSlice";

import { useDispatch } from 'react-redux';

export default function GifCard({feature}){

    const dispatch = useDispatch()

    return(       
        <li onClick={() => dispatch(setShowModal(feature))} >
            <button type="button" onClick={(e) => favTrigger(feature, e)} className="favorite btn"><img src={feature.favorite ? FavRed : FavWhite} alt="Favorite" /></button>
            <img src={feature.media[0].tinygif.url} alt={feature.content_description} loading="lazy"  />
            <span className="text-truncate content" title={feature.content_description}>{feature.content_description}</span>
        </li>
    )
}