
import { CHAINBASE_API_KEY } from '../constants/chainbaseKey';

export const fetchDataForNetwork = async (network, network_ids, wallet_address) => {
  try {
    const response = await fetch(`https://api.chainbase.online/v1/account/tokens?chain_id=${network_ids[network]}&address=${wallet_address}&limit=20`, {
      method: 'GET',
      headers: {
        'x-api-key': CHAINBASE_API_KEY,
        'accept': 'application/json',
      },
    });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Error fetching data for network ${network}:`, error);
    return null;
  }
};

