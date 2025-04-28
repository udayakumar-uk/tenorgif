import React, {useState, useEffect} from "react";
import TransImg from '../img/transparent.png';

import { useDispatch, useSelector } from "react-redux";

import { setShowModal, setHideModal, setGifType } from "../slices/modalSlice";


export default function Modal(){
    
    const dispatch = useDispatch();
    const {showModal, item, dims, size, type, sticker, transparentType, transparent, url} = useSelector(state => state.modal);
    const {features, loading, err} = useSelector(state => state.featured);

    const [blogUrl, setBlogUrl] = useState(null);
    
    useEffect(function(){
        createBlob();
    }, [type, transparentType]);

    const createBlob = async function(){
        if(item){
            const blobImgUrl = await fetch(item?.media[0][type + transparentType].url).then(response => response.blob()).then(blob => {
                                const blobUrl = URL.createObjectURL(blob);
                                return blobUrl;
                            }).catch(error => console.error('Error:', error));
            
            setBlogUrl(blobImgUrl);
        }
    }

    const style = {
        background: transparentType ? 'url('+TransImg+')' : '#fff'
    }

    function closeBackdropModal(e){
        e.stopPropagation();
        if(e.target.className.includes('modal-wrapper')){
            dispatch(setHideModal())
        }
    }

    return(
        
        <div className={`modal-wrapper modal ${showModal ? 'in' : ''}`} onClick={(e) => closeBackdropModal(e)} >
           {showModal &&  <div className="modal-container">
                <button className="modal-close btn-icon material-symbols-rounded" onClick={() => dispatch(setHideModal())}>close</button>
                 <div className="modal-body row scrollbar res-row">
                    <div className="col">
                        <div className="gif-img" style={style}>
                        {type == 'mp4' || type == 'tinymp4' || type == 'nanomp4' ? 
                            <video width={item.media[0][type].dims[0]} height={item.media[0][type].dims[1]} controls>
                                <source src={item.media[0][type].url} type="video/mp4" />
                            </video>
                            : 
                            <img src={item.media[0][type + transparentType].url} alt={item.content_description} loading="lazy" />
                        }
                        </div>
                    </div>
                    <div className="col">
                        <h2 className="modal-title">{item.content_description}</h2>
                        <strong className="sub-title">Type</strong>
                        <div className="btn-group">
                            <input type="radio" className="btn-check" name="gifType" id="medium" defaultValue="mediumgif" />
                            <label className="btn btn-sm btn-light" onClick={() => dispatch(setGifType('mediumgif'))} htmlFor="medium">Large</label>
                            
                            <input type="radio" className="btn-check" name="gifType" id="gif" defaultValue="gif" defaultChecked={type === 'gif'} />
                            <label className="btn btn-sm btn-light" onClick={() => dispatch(setGifType('gif'))} htmlFor="gif">Medium</label>
                            
                            <input type="radio" className="btn-check" name="gifType" id="tinygif" defaultValue="tinygif" />
                            <label className="btn btn-sm btn-light" onClick={() => dispatch(setGifType('tinygif'))} htmlFor="tinygif">Tiny</label>

                            <input type="radio" className="btn-check" name="gifType" id="nanogif" defaultValue="nanogif" />
                            <label className="btn btn-sm btn-light" onClick={() => dispatch(setGifType('nanogif'))} htmlFor="nanogif">Nano</label>

                            <input type="radio" className="btn-check" name="gifType" id="webp" defaultValue="webp" />
                            <label className="btn btn-sm btn-light" onClick={() => dispatch(setGifType('webp'))} htmlFor="webp">Webp</label>

                            <input type="radio" className="btn-check" name="gifType" id="mp4" defaultValue="mp4" />
                            <label className="btn btn-sm btn-light" onClick={() => dispatch(setGifType('mp4'))} htmlFor="mp4">Mp4</label>
                            
                            <input type="radio" className="btn-check" name="gifType" id="tinymp4" defaultValue="tinymp4" />
                            <label className="btn btn-sm btn-light" onClick={() => dispatch(setGifType('tinymp4'))} htmlFor="tinymp4">Tinymp4</label>

                            <input type="radio" className="btn-check" name="gifType" id="nanomp4" defaultValue="nanomp4" />
                            <label className="btn btn-sm btn-light" onClick={() => dispatch(setGifType('nanomp4'))} htmlFor="nanomp4">Nanomp4</label>
                        </div>

                        { sticker &&  <>
                                <br />
                                <strong className="sub-title">Transparent (Tiny, Nano, Webp)</strong>
                                <div className="btn-group">
                                    <input type="checkbox" disabled={!transparent} className="btn-check" onClick={(e) => {
                                        const checked = e.target.checked
                                        dispatch(setGifType('_transparent', checked))
                                    }}  name="transparent" id="transparent" defaultValue="_transparent"  />
                                    <label className="btn btn-sm btn-light" htmlFor="transparent">{transparentType ? 'Yes': 'No'}</label>
                                </div>
                            </>
                            }
                        
                        <br />

                        <div className="modal-row row">
                            <div className="col">
                                <strong className="sub-title">Dimensions</strong>
                                <p className="caption">{dims[0]} x {dims[1]}</p>
                            </div>
                            <div className="col">
                                <strong className="sub-title">Size</strong>
                                <p className="caption">{size}</p>
                            </div>
                        </div>
                    </div>
                </div> 
                <div className="modal-footer">
                    <button className="btn btn-dark btn-close" onClick={() => dispatch(setHideModal())}>Close</button>
                    <a href={blogUrl} download={item.content_description} className="btn btn-download btn-primary"><span className="material-symbols-rounded">Download</span> Download</a>
                </div>

            </div> }
            
        </div>
    )
}