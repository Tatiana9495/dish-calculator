import { SIGN_IN } from '../../consts/actionTypes';
import { AnyAction } from 'redux';

interface IUserState {
  email: string | null;
}

const initialState: IUserState = {
  email: null,
};

const userReducer = (state = initialState.email, action: AnyAction) => {
  switch (action.type) {
    case SIGN_IN:
      return action.email;
    default:
      return state;
  }
};

export default userReducer;
