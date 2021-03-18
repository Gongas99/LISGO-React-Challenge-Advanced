import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';

import { CurrentAuthProvider } from './providers';

ReactDOM.render(
  <CurrentAuthProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </CurrentAuthProvider>,
  document.getElementById('root')
);
