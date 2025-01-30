import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux'; // Import Redux Provider
import './index.css';
import App from './App';
import { store } from '../src/redux/store'; // Import Redux store
createRoot(document.getElementById('root')).render(_jsx(StrictMode, { children: _jsxs(Provider, { store: store, children: [" ", _jsx(App, {})] }) }));
