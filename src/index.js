import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';

import { CurrentAuthProvider, TodoProvider } from './providers';

ReactDOM.render(
  <CurrentAuthProvider>
    <TodoProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </TodoProvider>
  </CurrentAuthProvider>,
  document.getElementById('root')
);
