
import { createBrowserRouter } from 'react-router-dom';

import Home from './pages/Home';
import ErrorElement from './pages/ErrorElement';
import Main from './components/Main';


import GifPageComponent from './components/GifPageComponent';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
    errorElement: <ErrorElement />,
    children: [
      {
        index: true,
        element: <Main />,
        errorElement: <ErrorElement />,
        
      },
      {
        path: 'stickers',
        element: <GifPageComponent gifProp="sticker" />,
        errorElement: <ErrorElement />,
        
      }
    ]
  }
])