import React, { useState, useEffect, lazy, Suspense } from "react";
import Loading from '../img/loading.svg'
import NoFav from '../img/no-favorite.png';

import { AsyncThunkFeature } from "../createAsyncThunk";
import { useDispatch, useSelector } from "react-redux";

import { setPagination } from "../slices/filterSlice";

const GifCard = lazy(()=> import('./GifCard.jsx'));


export default function Featured(){

    const dispatch = useDispatch();
    
    const {search, limit, key, pagination} = useSelector(state => state.filter);
    const {features, loading, err} = useSelector(state => state.featured);

    useEffect(() => {
        dispatch(AsyncThunkFeature(search, limit, key));
    }, [dispatch, search]);

    function loadMore(count){
        if(limit !== 50){
            dispatch(setPagination(pagination+count));
        }
    }

    
    if(loading) return <p>Loading...</p> 

    if(err) return <p>Error</p>

    return(
        <section className="featured-section">
            <h2>Featured</h2>
            <ul className="flex-section">
                { 
                    features.map(feature => 
                    <Suspense key={feature.id} fallback={<p>Loading...</p>}> 
                        <GifCard key={feature.id} feature={feature} /> 
                    </Suspense>) 
                }
            </ul>

            {
                !features.length && <div className="text-center">
                    <img src={NoFav} alt="No items" />
                    <h3>No items</h3>
                </div>
            }

            <div className="pagination">
                {(pagination) && <p>Showing 1 to {limit} of 50 results</p>}
                {limit !== 50 && pagination && <button className="loadmore btn btn-primary btn-lg" onClick={() => loadMore(10) }>Load More</button>}
            </div>
        </section>
    )
}