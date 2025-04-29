import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Header from '../components/Header';
import Aside from '../components/Aside';
import Modal from '../components/Modal';
import { Outlet } from 'react-router-dom';

import { setFavorite } from '../slices/favoriteSlice';



export default function Home(){

    const [sidebar, setSidebar] = useState(false);

    const dispatch = useDispatch()

    useEffect(()=>{
        const getFavItems = JSON.parse(localStorage.getItem('favorites'));
        if(getFavItems){

            dispatch(setFavorite(getFavItems));
        }
    }, [])

    function openSidebar(e){
        if(e && e.target.className.includes('open-sidebar')){
            setSidebar(false);
        }else{
            setSidebar(true);
        }
    }

    return(
        <div className="App">
            <Header openSidebar={openSidebar} />
            <section className="flex-section px-3">
                <div className={`aside-wrapper ${sidebar ? 'open-sidebar' : ''}`} onClick={openSidebar} >
                    <Aside />
                </div>
                
                <main>
                    <Modal />
                    <Outlet />
                </main>
            </section>
        </div>
    )
}