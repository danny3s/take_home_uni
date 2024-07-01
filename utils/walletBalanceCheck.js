
import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { networks } from '../provider';
import { getProvider } from '../provider'; 
import { setNetworkBalance } from '../Redux/actions'; 

const useWalletBalanceCheck = (walletAddress) => {
  const dispatch = useDispatch();

  const ethBalanceCheck = useCallback(async () => {
    try {
      for (const network of networks) {
        console.log(`Fetching balance for network: ${network}`);
        const provider = getProvider(network);
        const balance = await provider.getBalance(walletAddress);
        console.log(`Balance fetched for ${network}: ${balance.toString()}`);
        const formattedBalance = balance ? (balance / 10 ** 18).toFixed(4) : null;
        dispatch(setNetworkBalance(network, formattedBalance));
      }
    } catch (error) {
      console.error('Error fetching balance:', error);
      throw error;
    }
  }, [dispatch, walletAddress]);

  return { ethBalanceCheck };
};

export default useWalletBalanceCheck;
