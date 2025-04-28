import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx';
import { Provider } from 'react-redux';
import {store} from './store.jsx';
import { OfflineContent } from './components/Offline.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      {window.navigator.onLine ? <App /> : <OfflineContent />}
    </Provider>
  </StrictMode>,
)
