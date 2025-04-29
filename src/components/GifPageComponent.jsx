import React, { useState, useEffect, lazy, Suspense } from "react";
import Loading from '../img/loading.svg'
import NoFav from '../img/no-favorite.png';

import { AsyncThunkSticker, AsyncThunkFeature } from "../createAsyncThunk.jsx";
import { useDispatch, useSelector } from "react-redux";

import { setLimitation } from "../slices/filterSlice.jsx";
import { Link } from "react-router-dom";

const GifCard = lazy(()=> import('./GifCard.jsx'));


export default function GifPageComponent({gifProp}){

    const dispatch = useDispatch();
    
    const {search, limit, key, pagination} = useSelector(state => state.filter);
    const {gifData, loading, err} = useSelector(state => state[gifProp]);

    useEffect(() => {
        switch(gifProp){
            case 'featured': dispatch(AsyncThunkFeature(search, limit, key));
            case 'sticker': dispatch(AsyncThunkSticker(search, limit, key));
            case 'favorite': {
                console.log(gifProp);
            };
        }
    }, [dispatch, search, limit]);

    function loadMore(count){
        if(limit < 50){
            dispatch(setLimitation(limit+count));
        }
    }

    
    // if(loading) return <p>Loading...</p> 

    if(err) return <p>Error</p>

    return(
        <section className="featured-section">
            <h3 style={{ textTransform: 'capitalize'}}> { gifProp !== 'featured' &&  <><Link to={'/'}>Home</Link> <span className="material-symbols-rounded">arrow_right</span></>} {gifProp}</h3>
            <ul className="flex-section">
                { 
                    gifData.map(sticker => 
                    <Suspense key={sticker.id} fallback={<p>Loading...</p>}> 
                        <GifCard key={sticker.id} feature={sticker} /> 
                    </Suspense>
                    )
                }
            </ul>

            {
                !gifData.length ? <div className="text-center">
                    <img src={NoFav} alt="No items" />
                    <h3>No items</h3>
                </div>

                :

                <div className="pagination">
                    <p>Showing 1 to {gifData.length} of 50 results</p>
                    {gifProp !== 'favorite' && limit !== 50 && pagination && <button className="loadmore btn btn-primary btn-lg" onClick={() => loadMore(10) }>Load More</button>}
                </div>
            }

        </section>
    )
}