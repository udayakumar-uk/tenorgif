import './App.css';
import { RouterProvider } from 'react-router-dom';
import { router } from './ReactRouter.jsx';

export default function App() {
  return <RouterProvider router={router} />
}