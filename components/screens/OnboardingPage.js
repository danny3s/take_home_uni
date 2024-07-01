

import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import  Card  from '../common/Card';

const OnboardingPage = ({ navigation }) => {  

  const handleGoToAddressPage = () => {
    navigation.navigate('AddressPage');
  };

  const handleGoToSeedPhrasePage = () => {
    navigation.navigate('SeedPhrasePage');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Select your preferred method to add a wallet</Text>
      <TouchableOpacity onPress={() => handleGoToAddressPage()}>
        <Card
          icon="eye"
          title="Watch Wallet"
          text="View-only wallet enables you to monitor a wallet without making transactions."
        />
      </TouchableOpacity>

      <TouchableOpacity onPress={() => handleGoToSeedPhrasePage()}>
        <Card
          icon="file-o"
          title="Import Wallet"
          text="Enter your recovery phrase from another cryptocurrency wallet."
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'top',
    alignItems: 'center',
    marginVertical: 20,
    marginHorizontal: 25,
  },
  text: {
    fontSize: 20,
    fontWeight: '500',
    textAlign: 'center',
    marginBottom: 20,
  },
});

export default OnboardingPage;
