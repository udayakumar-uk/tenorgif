import React, {useState, useEffect} from "react";
import {Link} from "react-router-dom";
import Loading from '../img/loading.svg';

import { AsyncThunkSticker } from "../createAsyncThunk";

import { useDispatch, useSelector } from "react-redux";

import { setShowModal } from "../slices/modalSlice";
import { setLimitation } from "../slices/filterSlice";



function StickerSlideControl(button){
    var slider = document.getElementById('stickerSlider');
    slider.scrollBy((button == 'next' ? 500 : -500), 0)
}


export default function Sticker(props){

    const dispatch = useDispatch();
    
    const {search, limit, key} = useSelector(state => state.filter);
    const {gifData, loading, err} = useSelector(state => state.sticker);

    useEffect(() => {
        dispatch(AsyncThunkSticker(search, limit, key));
    }, [dispatch, search]);

    
    if(loading) return <p>Loading...</p>
    if(err) return <p>Error</p>

    return(
        <section className="sticker-section">
            <div className="titleNav">
                <h2>Stickers</h2>
                <Link to="stickers" onClick={()=> dispatch(setLimitation(30))}>See All <span className="material-symbols-rounded">arrow_right</span> </Link>
            </div>
            <ul className="flex-section scrollbar" id="stickerSlider">
                <button className="slider-control prev-control" onClick={() => StickerSlideControl('prev')} id="prev"><span className="material-symbols-rounded">chevron_left</span></button>
                <button className="slider-control next-control" onClick={() => StickerSlideControl('next')} id="next"><span className="material-symbols-rounded">chevron_right</span></button>
                { gifData.map(sticker => <li key={sticker.id} onClick={() => dispatch(setShowModal(sticker))} className="drag"
                    style={{backgroundImage: `linear-gradient(1deg, #000000ad 20%, #0000000f 80%), url(${sticker.media[0].tinygif.url})`}} >
                        {sticker.content_description}
                </li>) }
            </ul>
        </section>
    )
}