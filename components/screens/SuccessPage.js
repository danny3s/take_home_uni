
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const SuccessPage = ({ route }) => {
  const { hash } = route.params;
  const navigation = useNavigation();

  const handleContinue = () => {
    navigation.navigate('WalletPage');
  }

  return (
    <View style={styles.container}>
      <Animatable.View animation="bounceIn" style={styles.content}>
        <FontAwesome name="check-circle" size={90} color="green" />
        <Text style={styles.successText}>Transaction successful!</Text>
        <Text style={styles.hashText}>Transaction Hash: {hash}</Text>
      </Animatable.View>
      <TouchableOpacity style={styles.continueButton} onPress={handleContinue}>
        <Text style={styles.continueButtonText}>Continue</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    alignItems: 'center',
  },
  successText: {
    fontSize: 20,
    marginVertical: 10,
  },
  hashText: {
    fontSize: 14,
    marginVertical: 5,
    width: 300, 
    textAlign: 'center', 
  },
  continueButton: {
    position: 'absolute',
    bottom: 30,
    width: '80%',
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
  continueButtonText: {
    color: '#000',
    fontSize: 18,
    fontWeight: '600',
  },
});

export default SuccessPage;
