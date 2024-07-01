import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { FontAwesome } from '@expo/vector-icons';
import { useDispatch } from 'react-redux';
import { setAddress, setAppMode, setMnemonic } from '../../Redux/actions';
import { ethers } from 'ethers'; 

const ImportWalletPage = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [mnemonic, setMnemonicKey] = useState('');
  const [walletAddress, setWalletAddress] = useState('');

  const generateWalletFromMnemonic = async () => {
    try {
      const wallet = ethers.Wallet.fromMnemonic(mnemonic);
      const address = wallet.address;
      setWalletAddress(address);
      dispatch(setAppMode(true));
      dispatch(setMnemonic(mnemonic));
      dispatch(setAddress(address));
      navigation.navigate('LoadingPage'); 
    } catch (error) {
      console.error('Error generating wallet:', error);
      setWalletAddress('Error generating wallet');
    }
  };

  const handleGoBack = () => {
    navigation.goBack(); 
  };

  const disableContinue = !mnemonic; 

  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <TouchableOpacity onPress={handleGoBack} style={styles.backButton}>
          <FontAwesome name="arrow-left" size={24} color="black" />
          <Text style={styles.backButtonText}>Back</Text>
        </TouchableOpacity>
        
        <TextInput
          style={styles.input}
          placeholder="Enter your mnemonic phrase"
          onChangeText={text => setMnemonicKey(text)}
          value={mnemonic}
          multiline={true}
          numberOfLines={4}
        />
        {walletAddress ? (
          <Text style={styles.walletAddress}>Wallet Address: {walletAddress}</Text>
        ) : null}
      </View>
      <TouchableOpacity
        onPress={generateWalletFromMnemonic}
        style={[
          styles.continueButton,
          { backgroundColor: disableContinue ? '#ccc' : '#007bff' }
        ]}
        disabled={disableContinue}
      >
         
          <Text style={styles.continueButtonText}>Continue</Text>
        
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 16,
    justifyContent: 'space-between', 
  },
  topContainer: {
    flex: 1,
    justifyContent: 'flex-start', 
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  backButtonText: {
    fontSize: 16,
    marginLeft: 8,
  },
  input: {
    width: '100%',
    height: 120,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginBottom: 16,
    textAlignVertical: 'top',
  },
  walletAddress: {
    fontSize: 18,
    marginTop: 16,
  },
  continueButton: {
    borderRadius: 25,
    paddingVertical: 18,
    paddingHorizontal: 24,
    backgroundColor: '#007bff',
    marginBottom: 30,   
  },
  continueButtonText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
  },
});

export default ImportWalletPage;
