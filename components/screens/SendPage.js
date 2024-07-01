import { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator, Picker } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { ethers } from 'ethers';
import { INFURA_API_KEY } from '../../provider';
import useNetworkData from '../../hook/useNetworkData';

const ERC20_ABI = [
  "function transfer(address to, uint amount) returns (bool)",
  "function decimals() view returns (uint8)"
];

const SendPage = () => {
  const navigation = useNavigation();
  const dataToDisplay = useNetworkData(); 
  const networkBalances = useSelector((state) => state.networkBalance);
  const network = useSelector((state) => state.network);
  const mnemonicdata = useSelector((state) => state.mnemonic);
  const [recipient, setRecipient] = useState('');
  const [amount, setAmount] = useState('');
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(false);
  const [selectedToken, setSelectedToken] = useState(null);
  const [tokenOptions, setTokenOptions] = useState([]);
  const [nativeTransaction, setNativeTransaction] = useState(true);
  const [isSendButtonDisabled, setIsSendButtonDisabled] = useState(true);

  useEffect(() => {
    const options = [];
    const networkTokens = {
      homestead: 'ETH',
      matic: 'MATIC',
      arbitrum: 'ARB',
      optimism: 'OP',
    };

    if (network in networkTokens) {
      options.push({ label: networkTokens[network], value: networkTokens[network] });
      setSelectedToken(networkTokens[network]);
    }

    dataToDisplay.data.forEach(token => {
      options.push({ label: token.symbol, value: token.symbol });
    });

    setTokenOptions(options);
  }, [dataToDisplay, network, networkBalances]);

  useEffect(() => {
    setIsSendButtonDisabled(!(recipient && amount));
  }, [recipient, amount]);

  const sendTransaction = async () => {
    setLoading(true);
    setStatus('');

    try {
      nativeTransaction ? await sendNativeAsset() : await sendTokenAsset();
    } catch (error) {
      setLoading(false);
      setStatus(`Error: ${error.message}`);
    }
  };

  const sendNativeAsset = async () => {
    const provider = new ethers.providers.InfuraProvider(network, INFURA_API_KEY);
    const wallet = ethers.Wallet.fromMnemonic(mnemonicdata.mnemonic).connect(provider);

    const tx = {
      to: recipient,
      value: ethers.utils.parseEther(amount),
    };

    const txResponse = await wallet.sendTransaction(tx);
    await txResponse.wait();

    setLoading(false);
    navigation.navigate('SuccessPage', { hash: txResponse.hash });
  };

  const sendTokenAsset = async () => {
    const selectedTokenDetails = dataToDisplay.data.find(token => token.symbol === selectedToken);

    if (selectedTokenDetails) {
      try {
        const provider = new ethers.providers.InfuraProvider(network, INFURA_API_KEY);
        const wallet = ethers.Wallet.fromMnemonic(mnemonicdata.mnemonic).connect(provider);
        const tokenContract = new ethers.Contract(selectedTokenDetails.contract_address, ERC20_ABI, wallet);
        const decimals = await tokenContract.decimals();
        const tokenAmount = ethers.utils.parseUnits(amount, decimals);

        const txResponse = await tokenContract.transfer(recipient, tokenAmount);
        await txResponse.wait();

        setLoading(false);
        navigation.navigate('SuccessPage', { hash: txResponse.hash });
      } catch (error) {
        setStatus(`Error: ${error.message}`);
      }
    } else {
      setLoading(false);
      setStatus(`Error: Token details not found for: ${selectedToken}`);
    }
  };

  const handleGoBack = () => {
    navigation.goBack();
  };

  const handleTokenChange = (tokenSymbol) => {
    setSelectedToken(tokenSymbol);
    setNativeTransaction(tokenOptions.length > 0 && tokenSymbol === tokenOptions[0].value);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleGoBack} style={styles.backButton}>
        <FontAwesome name="arrow-left" size={24} color="black" />
        <Text style={styles.backButtonText}>Back</Text>
      </TouchableOpacity>

      <Text style={styles.inputHeader}>Select Token:</Text>
      <Picker
        selectedValue={selectedToken}
        onValueChange={(itemValue) => handleTokenChange(itemValue)}
        style={styles.picker}
      >
        {tokenOptions.map((option, index) => (
          <Picker.Item key={index} label={option.label} value={option.value} />
        ))}
      </Picker>

      <Text style={styles.inputHeader}>Recipient Address:</Text>
      <TextInput
        style={styles.input}
        value={recipient}
        onChangeText={setRecipient}
        placeholder="Recipient Address"
      />
      <Text style={styles.inputHeader}>Amount to send:</Text>
      <TextInput
        style={styles.input}
        value={amount}
        onChangeText={setAmount}
        placeholder="Amount"
        keyboardType="numeric"
      />
      {status ? <Text style={styles.status}>{status}</Text> : null}
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" style={styles.loading} />
      ) : (
        <TouchableOpacity
          style={[styles.sendButton, isSendButtonDisabled && styles.sendButtonDisabled]}
          onPress={sendTransaction}
          disabled={isSendButtonDisabled}
        >
          <Text style={styles.sendButtonText}>Send</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'flex-start',
  },
  backButtonText: {
    fontSize: 16,
    marginLeft: 8,
  },
  inputHeader: {
    paddingBottom: 10,
    fontSize: 18,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  input: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
    borderRadius: 10,
  },
  status: {
    color: 'red',
    marginBottom: 20,
  },
  loading: {
    marginBottom: 20,
  },
  sendButton: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 18,
    borderRadius: 10,
    marginHorizontal: 16,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  sendButtonDisabled: {
    backgroundColor: 'lightgray',
  },
  sendButtonText: {
    color: '#000',
    fontSize: 18,
    fontWeight: '600',
  },
  picker: {
    height: 50,
    marginBottom: 20,
    paddingHorizontal: 10,
    borderRadius: 10,
    borderColor: 'gray',
    borderWidth: 1,
  },
});

export default SendPage;
