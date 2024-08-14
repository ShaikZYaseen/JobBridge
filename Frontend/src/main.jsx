import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {Provider} from "react-redux"
import { persistStore } from 'redux-persist'
import { PersistGate } from 'redux-persist/integration/react'
import store from './store/Store.js'
import App from './App.jsx'
import './index.css'


const persistor = persistStore(store);


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>  
    <PersistGate loading={null} persistor={persistor}>
    <App />
    </PersistGate>
    </Provider>
  </StrictMode>,
)
