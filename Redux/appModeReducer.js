import { SET_APP_MODE } from './actions';

const initialState = false;

function appModeReducer(state = initialState, action) {
  switch (action.type) {
    case SET_APP_MODE:
      return action.payload;
    default:
      return state;
  }
}

export default appModeReducer;
