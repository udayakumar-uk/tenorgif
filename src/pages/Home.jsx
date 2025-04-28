import { useState } from 'react';
import { useSelector } from 'react-redux';

import Header from '../components/Header';
import Aside from '../components/Aside';
import Sticker from '../components/Sticker';
import Featured from '../components/Featured';
import Modal from '../components/Modal';



export default function Home(){

    const [sidebar, setSidebar] = useState(false);

    const {search} = useSelector(state => state.filter)


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
                    <Sticker />
                    <Featured />
                    {/* <Main loadMore={loadMore} filter={filter} sticker={stickers} featured={featured} itemClicks={itemClicks} favTrigger={FavoriteClick} seeAllClick={seeAllClick} /> */}
                    {/* <Modal modalItem={modal.item} open={modal.showModal} type={modal.type} modal={{ ...modal }} modalTrigger={{closeModal, closeBackdropModal, gifType, convertToFileSize}} />

                    <Routes>
                    <Route path='/' element={<Main loadMore={loadMore} filter={filter} sticker={stickers} featured={featured} itemClicks={itemClicks} favTrigger={FavoriteClick} seeAllClick={seeAllClick} />}/>
                    <Route path='favorites' element={<Featured filter={filter} title="Favorite" featured={favorites} FeaturedItemClick={itemClicks} favTrigger={FavoriteClick} />}/>
                    <Route path='stickers' element={<Featured loadMore={loadMore} filter={filter} title="Stickers" featured={stickers} FeaturedItemClick={itemClicks} favTrigger={FavoriteClick} />}/>
                    </Routes> */}
                </main>
            </section>
        </div>
    )
}