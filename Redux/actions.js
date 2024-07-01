export const SET_NETWORK = 'SET_NETWORK';
export const SET_ADDRESS = 'SET_ADDRESS';
export const SET_APP_MODE = 'SET_APP_MODE';
export const SET_ETH_BALANCE = 'SET_ETH_BALANCE';
export const SET_NETWORK_BALANCE = 'SET_NETWORK_BALANCE';
export const SET_FETCHED_ETH_WALLET_DATA = 'SET_FETCHED_ETH_WALLET_DATA';
export const SET_FETCHED_MATIC_WALLET_DATA = 'SET_FETCHED_MATIC_WALLET_DATA';
export const SET_FETCHED_OP_WALLET_DATA = 'SET_FETCHED_OP_WALLET_DATA';
export const SET_FETCHED_ARB_WALLET_DATA = 'SET_FETCHED_ARB_WALLET_DATA';
export const SET_MNEMONIC = 'SET_MNEMONIC';


export const setNetwork = (network) => ({
  type: SET_NETWORK,
  payload: network,
});

export const setAddress = (address) => ({
  type: SET_ADDRESS,
  payload: address,
});

export const setAppMode = (mode) => ({
  type: SET_APP_MODE,
  payload: mode,
});

export const setEthBalance = (ethBalance) => ({
  type: SET_ETH_BALANCE,
  payload: ethBalance,
});

export const setNetworkBalance = (network, balance) => ({
  type: SET_NETWORK_BALANCE,
  payload: { network, balance },
});

export const setFetchedETHWalletData = (data) => ({
  type: SET_FETCHED_ETH_WALLET_DATA,
  payload: data,
});

export const setFetchedMATICWalletData = (data) => ({
  type: SET_FETCHED_MATIC_WALLET_DATA,
  payload: data,
});

export const setFetchedOPWalletData = (data) => ({
  type: SET_FETCHED_OP_WALLET_DATA,
  payload: data,
});

export const setFetchedARBWalletData = (data) => ({
  type: SET_FETCHED_ARB_WALLET_DATA,
  payload: data,
});

export const setMnemonic = (mnemonic) => ({
  type: SET_MNEMONIC,
  payload: mnemonic,
});