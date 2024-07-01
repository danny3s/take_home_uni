
import { useSelector } from 'react-redux';

const useNetworkData = () => {
  const network = useSelector(state => state.network);
  const fetchedDataETH = useSelector(state => state.data.fetchedETHWalletData);
  const fetchedDataMATIC = useSelector(state => state.data.fetchedMATICWalletData);
  const fetchedDataOP = useSelector(state => state.data.fetchedOPWalletData);
  const fetchedDataARB = useSelector(state => state.data.fetchedARBWalletData);

  let dataToDisplay;
  switch (network) {
    case 'homestead':
      dataToDisplay = fetchedDataETH;
      break;
    case 'matic':
      dataToDisplay = fetchedDataMATIC;
      break;
    case 'optimism':
      dataToDisplay = fetchedDataOP;
      break;
    case 'arbitrum':
      dataToDisplay = fetchedDataARB;
      break;
    default:
      dataToDisplay = null;
  }

  return dataToDisplay;
};

export default useNetworkData; 
