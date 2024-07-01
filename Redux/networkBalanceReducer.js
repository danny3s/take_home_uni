export const SET_NETWORK_BALANCE = 'SET_NETWORK_BALANCE';

const initialState = {
  homestead: '0',
  matic: '0',
  arbitrum: '0',
  optimism: '0',
};

const networkBalanceReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_NETWORK_BALANCE:
      return {
        ...state,
        [action.payload.network]: action.payload.balance,
      };
    default:
      return state;
  }
};

export default networkBalanceReducer;