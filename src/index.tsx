import React from 'react';
import ReactDOM from 'react-dom';
import './scss/main.scss';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import store from './redux/store';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import { ReactReduxFirebaseProvider } from 'react-redux-firebase';
import { createFirestoreInstance } from 'redux-firestore';

import { App } from './components/App';

const firebaseConfig = {
  apiKey: 'AIzaSyDOJyiWzHpRPB2YN8Phpfzx5Rk2rwrch5M',
  authDomain: 'dish-calculator-5e4a5.firebaseapp.com',
  databaseURL: 'https://dish-calculator-5e4a5.firebaseio.com',
  projectId: 'dish-calculator-5e4a5',
  storageBucket: 'dish-calculator-5e4a5.appspot.com',
  messagingSenderId: '250535165275',
  appId: '1:250535165275:web:0bf936c6681c5421f92e7e',
  measurementId: 'G-KD7JKX29SN',
};

firebase.initializeApp(firebaseConfig);
firebase.firestore();

const rrfConfig = {
  userProfile: 'users',
  useFirestoreForProfile: true,
};

const rrfProps = {
  firebase,
  config: rrfConfig,
  dispatch: store.dispatch,
  createFirestoreInstance, //since we are using Firestore
};

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ReactReduxFirebaseProvider {...rrfProps}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ReactReduxFirebaseProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
