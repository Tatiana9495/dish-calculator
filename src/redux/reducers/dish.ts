import { AnyAction } from 'redux';
import { ADD_SINGLE_DISH, REMOVE_SINGLE_DISH } from '../../consts/actionTypes';

interface IDishState {
  value: null | {
    collection: string;
    id: string;
    title: string;
    portion: string | number;
    img: string | ArrayBuffer | undefined;
  };
}

const initialState: IDishState = {
  value: null,
};

const singleDishReducer = (state = initialState.value, action: AnyAction) => {
  switch (action.type) {
    case ADD_SINGLE_DISH:
      return {
        collection: action.collection,
        id: action.id,
        title: action.title,
        portion: action.portion,
        img: action.img,
      };
    case REMOVE_SINGLE_DISH:
      return initialState.value;
    default:
      return state;
  }
};

export default singleDishReducer;
