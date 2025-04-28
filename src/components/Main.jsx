
import Sticker from '../components/Sticker';
// import Featured from '../components/Featured';
import GifPageComponent from './GifPageComponent';


export default function Main() {
    return (
        <>
            <Sticker />
            <GifPageComponent gifProp="featured" />
            {/* <Featured /> */}
        </>
    );
}