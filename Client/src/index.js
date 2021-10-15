import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Register from './Components/Register';
import reportWebVitals from './reportWebVitals';
import Login from './Components/Login'
import App from './Components/App';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import {createStore} from 'redux';
import allReducers  from './reducers';
import { Provider } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';

const store = createStore(
  allReducers,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  );

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
    <Provider store={store}>
    <App />
    </Provider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
