import { combineReducers } from 'redux';
import { firebaseReducer } from 'react-redux-firebase';
import { firestoreReducer } from 'redux-firestore';

import user from './user';
import dish from './dish';

export default combineReducers({
  firebase: firebaseReducer,
  firestore: firestoreReducer,
  user: user,
  dish: dish,
});
