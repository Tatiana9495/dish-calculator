import { ADD_SINGLE_DISH, REMOVE_SINGLE_DISH } from '../../consts/actionTypes';
import { Dispatch } from 'redux';

export const addSingleDish = (collection: string, id: string, title: string, portion: string | number) => (
  dispatch: Dispatch
) => {
  dispatch({ type: ADD_SINGLE_DISH, collection, id, title, portion });
};

export const removeSingleDish = () => (dispatch: Dispatch) => {
  dispatch({ type: REMOVE_SINGLE_DISH });
};
