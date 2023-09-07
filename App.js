import React from 'react';
import { Provider } from 'react-redux';
import store from '../weather-app/src/redux/store/store'
import AppNavigator from '../weather-app/src/navigation/AppNavigator';

export default function App() {
  return (
    <Provider store={store}>
      <AppNavigator />
    </Provider>
  );
}
