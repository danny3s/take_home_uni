import { SET_MNEMONIC } from './actions';

const initialState = {
  mnemonic: '',
};

const mnemonicReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_MNEMONIC:
      return {
        ...state,
        mnemonic: action.payload,
      };
    default:
      return state;
  }
};

export default mnemonicReducer;
