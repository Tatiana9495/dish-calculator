import { SIGN_IN } from '../../consts/actionTypes';
import { useFirebase } from 'react-redux-firebase';
import { Dispatch } from 'redux';

export const signIn = (email: string, password: string) => (dispatch: Dispatch) => {
  const firebase = useFirebase();

  firebase
    .login({
      email: email,
      password: password,
    })
    .then(() => {
      // console.log('kiki');
      dispatch({ type: SIGN_IN, email });
    });
};
