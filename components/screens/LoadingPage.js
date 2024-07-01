
import { useState, useEffect } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { setFetchedETHWalletData, setFetchedMATICWalletData, setFetchedOPWalletData, setFetchedARBWalletData } from '../../Redux/actions';  
import { fetchDataForNetwork } from '../../api/fetchDataForNetwork';
import { network_ids } from '../../constants/constanst'; 
import useEthBalanceCheck from '../../utils/walletBalanceCheck'; 
import {  networks } from '../../provider';

const LoadingPage = () => {
  const navigation = useNavigation();
  const wallet_address = useSelector((state) => state.address);
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();
  const { ethBalanceCheck } = useEthBalanceCheck(wallet_address);

  useEffect(() => {

    const fetchData = async () => {
      try {
        const fetchedDataArray = [];
        for (const network of networks) {
          const data = await fetchDataForNetwork(network, network_ids, wallet_address);
          fetchedDataArray.push({ network, data });
          await new Promise(resolve => setTimeout(resolve, 1000)); 
        }

        fetchedDataArray.forEach(({ network, data }) => {
          if (data) {
            switch (network) {
              case 'homestead':
                dispatch(setFetchedETHWalletData(data));
                break;
              case 'matic':
                dispatch(setFetchedMATICWalletData(data));
                break;
              case 'optimism':
                dispatch(setFetchedOPWalletData(data));
                break;
              case 'arbitrum':
                dispatch(setFetchedARBWalletData(data));
                break;
              default:
                break;
            }
          }
        });

        await ethBalanceCheck();

        setIsLoading(false);
        navigation.navigate('WalletPage');
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [navigation, ethBalanceCheck, wallet_address, dispatch]);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      {isLoading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <Text>Loading complete. Navigating...</Text>
      )}
    </View>
  );
};

export default LoadingPage;
