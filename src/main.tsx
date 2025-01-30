import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux'; // Import Redux Provider
import './index.css';
import App from './App';
import {store} from '../src/redux/store'; // Import Redux store

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}> {/* Provide the Redux store to the app */}
      <App />
    </Provider>
  </StrictMode>
);
