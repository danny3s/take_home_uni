
import { Provider} from 'react-redux';
import store from './Redux/store';
import AppNavigator from './navigation/AppNavigator';


const App = () => {
  return (
    <Provider store={store}>
      <AppNavigator />
    </Provider>
  );
};


export default App;
