
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import OnboardingPage from '../components/screens/OnboardingPage';
import AddAddressPage from '../components/screens/AddAddressPage';
import ImportWalletPage from '../components/screens/ImportWalletPage';
import WalletPage from '../components/screens/WalletPage';
import LoadingPage from '../components/screens/LoadingPage';
import SendPage from '../components/screens/SendPage';
import SuccessPage from '../components/screens/SuccessPage';

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="OnboardingPage"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="OnboardingPage" component={OnboardingPage} />
        <Stack.Screen name="AddressPage" component={AddAddressPage} />
        <Stack.Screen name="SeedPhrasePage" component={ImportWalletPage} />
        <Stack.Screen name="LoadingPage" component={LoadingPage} />
        <Stack.Screen name="WalletPage" component={WalletPage} />
        <Stack.Screen name="SendPage" component={SendPage} />
        <Stack.Screen name="SuccessPage" component={SuccessPage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
