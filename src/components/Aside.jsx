import React, { useEffect } from "react";
import {Link} from "react-router-dom";
import { AsyncThunkCategory } from "../createAsyncThunk";
import { setSidebarEvent } from "../slices/filterSlice";

import { useDispatch, useSelector } from "react-redux";

export default function Aside(){

    const dispatch = useDispatch();
    
    const {key, search} = useSelector(state => state.filter);
    const {categories, loading, err} = useSelector(state => state.category);

    useEffect(() => {
        dispatch(AsyncThunkCategory(key));
    }, [dispatch]);

    if(loading) return <p>Loading...</p>
    if(err) return <p>Error</p>

    return(
        <aside>
            <section className="aside-section">
                <h2>Categories</h2>
                <nav>
                    <ul className="scrollbar">
                        {categories.map(tag => <li key={tag.searchterm}><Link to="/" onClick={()=> {dispatch(setSidebarEvent(tag.searchterm))}} className={tag.searchterm === search ? 'active' : ''}>{tag.searchterm}</Link></li>)}
                    </ul>
                </nav>
            </section>
        </aside>
    )
}