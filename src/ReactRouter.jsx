
import { createBrowserRouter } from 'react-router-dom';

import Home from './pages/Home';
import ErrorElement from './pages/ErrorElement';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
    errorElement: <ErrorElement />
  }
])