import { SET_NETWORK } from './actions';

const initialState = 'homestead';

function networkReducer(state = initialState, action) {
  switch (action.type) {
    case SET_NETWORK:
      return  action.payload;
    default:
      return state;
  }
}

export default networkReducer;
