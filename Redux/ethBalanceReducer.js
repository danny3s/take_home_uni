import { SET_ETH_BALANCE } from './actions';

const initialState = '0';

function ethBalanceReducer(state = initialState, action) {
  switch (action.type) {
    case SET_ETH_BALANCE:
      return action.payload;
    default:
      return state;
  }
}

export default ethBalanceReducer;
