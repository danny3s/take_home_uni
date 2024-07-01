import { SET_FETCHED_ETH_WALLET_DATA, SET_FETCHED_MATIC_WALLET_DATA, SET_FETCHED_OP_WALLET_DATA, SET_FETCHED_ARB_WALLET_DATA } from './actions';

const initialState = {
  fetchedETHWalletData: null,
  fetchedMATICWalletData: null,
  fetchedOPWalletData: null,
  fetchedARBWalletData: null,
};

const dataReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_FETCHED_ETH_WALLET_DATA:
      return {
        ...state,
        fetchedETHWalletData: action.payload,
      };
    case SET_FETCHED_MATIC_WALLET_DATA:
      return {
        ...state,
        fetchedMATICWalletData: action.payload,
      };
    case SET_FETCHED_OP_WALLET_DATA:
      return {
        ...state,
        fetchedOPWalletData: action.payload,
      };
    case SET_FETCHED_ARB_WALLET_DATA:
      return {
        ...state,
        fetchedARBWalletData: action.payload,
      };
    default:
      return state;
  }
};

export default dataReducer;