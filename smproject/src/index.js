import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Stateprovider } from './StateProvider';
import reducer,{initialState} from './Reducer';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Stateprovider initialState={initialState} reducer={reducer}>
  <React.StrictMode>
    <App />
  </React.StrictMode>
  </Stateprovider>
);
