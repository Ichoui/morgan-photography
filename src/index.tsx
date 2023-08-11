import React from 'react';
import ReactDOM, { Root } from 'react-dom/client';
import './global.scss';
import App from './App';

const root: Root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);

