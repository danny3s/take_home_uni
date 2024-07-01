import { SET_ADDRESS } from './actions';

const initialState = '';

const addressReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_ADDRESS:
      return action.payload;
    default:
      return state;
  }
};

export default addressReducer;
