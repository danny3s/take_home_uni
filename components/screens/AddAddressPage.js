import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { FontAwesome } from '@expo/vector-icons';
import { VITALIK_ADDRESS } from '../../constants/addressHardCoded'; 
import { useDispatch } from 'react-redux';
import { setAddress, setAppMode } from '../../Redux/actions';

const AddAddressPage = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [address, setWalletAddress] = useState('');
  const [isValid, setIsValid] = useState(false);
  const [loading, setLoading] = useState(false);

  const fetchCopiedText = async () => {
    // Simulating copying from clipboard by using a hardcoded address because it doesn't work on Simulation
    const text = VITALIK_ADDRESS;
    handleInputChange(text);
  };

  const handleContinue = async () => {
    const regex = /^0x/;
    const valid = regex.test(address);

    if (valid) {
      setLoading(true); 
      try {
        dispatch(setAddress(address));
        await new Promise(resolve => setTimeout(resolve, 1000)); 
        dispatch(setAppMode(false));
        navigation.navigate('LoadingPage'); 
      } catch (error) {
        Alert.alert('Error', 'Something went wrong. Please try again.');
      } finally {
        setLoading(false);
      }
    } else {
      Alert.alert('Invalid Input', 'Please enter a valid address.');
    }
  };

  const handleInputChange = (text) => {
    setWalletAddress(text);
    setIsValid(text.trim().length > 0 && /^0x/.test(text));
  };

  const disableContinue = !isValid || loading; 

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <FontAwesome name="arrow-left" size={15} color="black" />
        <Text style={styles.backButtonText}>Back</Text>
      </TouchableOpacity>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Paste address here"
          value={address}
          onChangeText={handleInputChange}
        />
        <TouchableOpacity onPress={fetchCopiedText} style={styles.pasteButton}>
          <FontAwesome name="clipboard" size={20} color="black" />
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        onPress={handleContinue}
        style={[styles.continueButton, { backgroundColor: disableContinue ? '#ccc' : '#007bff' }]}
        disabled={disableContinue}
      >
        {loading ? (
          <ActivityIndicator size="small" color="#fff" />
        ) : (
          <Text style={styles.continueButtonText}>Continue</Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginVertical: 20,
    marginHorizontal: 25,
    paddingTop: 16,
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
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingRight: 36,
    marginTop: 10,
  },
  input: {
    flex: 1,
    padding: 12,
  },
  pasteButton: {
    position: 'absolute',
    right: 8,
    top: '50%',
    transform: [{ translateY: -12 }],
  },
  continueButton: {
    position: 'absolute',
    bottom: 30,
    left: 0,
    right: 0,
    borderRadius: 25,
    paddingVertical: 18,
    paddingHorizontal: 24,
    backgroundColor: '#007bff',
  },
  continueButtonText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
  },
});

export default AddAddressPage;
