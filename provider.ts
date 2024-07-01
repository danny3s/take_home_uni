import { providers } from "ethers";

export const INFURA_API_KEY = 'a86e06aa42ab47668ee9442aab00e1c3';

export type NetworkType = 'homestead' | 'matic' | 'optimism' | 'arbitrum';

export const networks: NetworkType[] = ['homestead', 'matic', 'optimism', 'arbitrum'];

export function getProvider(network: NetworkType): providers.BaseProvider {
      return new providers.InfuraProvider(network, INFURA_API_KEY);
}

export const mainnetProvider = getProvider('homestead');
