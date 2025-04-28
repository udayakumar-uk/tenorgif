import React, {useEffect, useState, useRef} from "react";
import Logo from "../img/tenor_logo.svg.png";
import {Link} from 'react-router-dom';
import { setSearchVal, reset } from "../slices/filterSlice";
import { useDispatch, useSelector } from "react-redux";

export default function Header({openSidebar}){
    const isDarkMode = localStorage.getItem('darkMode') == 'true';

    const [darkMode, setDarkMode] = useState(isDarkMode);

    const dispatch = useDispatch();

    const ref = useRef();

    const {search} = useSelector(state => state.filter);

    useEffect(()=>{
        localStorage.setItem('darkMode', darkMode);
    }, [darkMode]);

    return(
        <header>
            <Link className="header-logo" onClick={()=> {
                ref.current.value = '';
                dispatch(reset())
            }} to='/'><img src={Logo} width="100" alt="logo" /></Link>
            
            <button type="button" className="open-menu btn btn-sm" onClick={() => openSidebar()}><span className="material-symbols-rounded">menu</span></button>

            <div className="search--form">
                <label htmlFor="search" className="material-symbols-rounded search--icon">search</label>
                <input ref={ref} type="search"
                    onKeyUp={(e) => {
                        if(e.keyCode == 13){
                            dispatch(setSearchVal(e.target.value));
                            // navigate('/');
                        }
                    }} 
                    defaultValue={search}
                    name="search" id="search" className="form-input" />
            </div>

            <Link to="favorites" title="Favorite" className="favorite"><span className="material-symbols-rounded">Favorite</span> {<span className="isFav"></span>} </Link>

            <div className="theme--switch">
                <input type="checkbox" name="color-scheme" id="theme" value="light" defaultChecked={darkMode} onChange={()=>{setDarkMode(!darkMode)}} hidden />
                <label htmlFor="theme" className="material-symbols-rounded theme--icon light-theme">{darkMode ? 'dark_mode' : 'light_mode'}</label>
            </div>
        </header>
    )
}