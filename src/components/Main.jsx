
import Sticker from '../components/Sticker';
import GifPageComponent from './GifPageComponent';


export default function Main() {
    return (
        <>
            <Sticker />
            <GifPageComponent gifProp="featured" />
        </>
    );
}