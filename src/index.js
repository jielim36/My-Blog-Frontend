import React from 'react';
import ReactDOM from 'react-dom/client';
import './Style/index.css';
import App from './App';
import { BrowserRouter} from "react-router-dom";
import { TokenProvider } from './Components/TokenProvider';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <TokenProvider>
      <App />
    </TokenProvider>
  </BrowserRouter>
);
