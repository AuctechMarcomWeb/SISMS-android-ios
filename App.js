import React from 'react';
import {
  StatusBar,
  StyleSheet,
  useColorScheme,
  View,
  Text,
} from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native'; // <-- ADD THIS
import Toast from 'react-native-toast-message';
import { toastConfig } from './src/components/ToastConfig';
import RootNavigation from './src/route/RootNavigation';
import store from './src/redux/store';

Text.defaultProps = Text.defaultProps || {};
Text.defaultProps.style = { fontFamily: 'Poppins-Regular' };

function App() {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <SafeAreaProvider>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <Provider store={store}>
        <NavigationContainer>
          {' '}
          {/* WRAP THE ROOT NAV HERE */}
          <RootNavigation />
        </NavigationContainer>
        <Toast config={toastConfig} />
      </Provider>
    </SafeAreaProvider>
  );
}

export default App;
