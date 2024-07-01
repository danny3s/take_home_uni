
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useSelector } from 'react-redux';
import { useNavigation, CommonActions } from '@react-navigation/native';
import { FontAwesome } from '@expo/vector-icons';
import ScrollableButtonRow from '../common/RoundButtonRow';
import TokenList from '../common/TokenList';

const WalletPage = () => {
  const navigation = useNavigation();
  const networkBalances = useSelector((state) => state.networkBalance);
  const network = useSelector((state) => state.network);
  const address = useSelector((state) => state.address);
  const enableSending = useSelector((state) => state.appMode);

  const handleGoBack = () => {
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: 'OnboardingPage' }], 
      })
    );
  };

  const goToSendPage = () => {
    navigation.navigate('SendPage');
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleGoBack} style={styles.backButton}>
        <FontAwesome name="power-off" size={20} color="black" />
      </TouchableOpacity>
      <View style={styles.content}>
        <View style={styles.card}>
          <Text style={styles.title}>Total balance</Text>
          {network === 'homestead' && (
            <Text style={styles.balance}>{networkBalances.homestead} ETH</Text>
          )}
          {network === 'matic' && (
            <Text style={styles.balance}>{networkBalances.matic} MATIC</Text>
          )}
          {network === 'arbitrum' && (
            <Text style={styles.balance}>{networkBalances.arbitrum} ARB</Text>
          )}
          {network === 'optimism' && (
            <Text style={styles.balance}>{networkBalances.optimism} OP</Text>
          )}
          <Text style={styles.address}>{address}</Text>
        </View>
        <ScrollableButtonRow />
        <TokenList />

      </View>
    
      {enableSending && (
        <TouchableOpacity onPress={() => goToSendPage()} style={styles.sendButton}>
          <Text style={styles.sendButtonText}>Send</Text>
        </TouchableOpacity>
      )}

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  backButton: {
    flexDirection: 'row',
    marginBottom: 16,
    marginLeft: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: '400',
  },
  address: {
    fontSize: 14,
    fontWeight: 'bold',
    paddingTop: 10,
    color: 'rgba(0, 0, 0, 0.5)',
  },
  balance: {
    fontSize: 18,
    fontWeight: 'bold',
    paddingTop: 10,
  },
  content: {
    paddingHorizontal: 20,
  },
  sendButton: {
    left: 0,
    right: 0,
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
  sendButtonText: {
    color: '#000',
    fontSize: 18,
    fontWeight: '600',
  },
});

export default WalletPage;
