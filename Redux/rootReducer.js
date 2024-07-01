import { combineReducers } from 'redux';
import networkReducer from './networkReducer';
import addressReducer from './addressReducer';
import appModeReducer from './appModeReducer';
import ethBalanceReducer from './ethBalanceReducer';
import networkBalanceReducer from './networkBalanceReducer';
import walletTokenDataReducer from './walletTokenDataReducer';
import mnemonicReducer from './mnemonicReducer';

const rootReducer = combineReducers({
  network: networkReducer,
  address: addressReducer,
  appMode: appModeReducer,
  ethBalance: ethBalanceReducer,
  networkBalance: networkBalanceReducer,
  data: walletTokenDataReducer,
  mnemonic: mnemonicReducer,
});

export default rootReducer;
