// src/index.tsx
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import store from './sagas/store';

import App from './App';


// const store = createStore(rootReducer, applyMiddleware(sagaMiddleware));


ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
