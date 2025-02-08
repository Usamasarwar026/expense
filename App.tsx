import React from 'react';
import {Provider} from 'react-redux';
import Navigation from './src/navigation/Navigation';
import {store} from './src/store/store';
import {GoogleSignin} from '@react-native-google-signin/google-signin';

export default function App() {
  React.useEffect(() => {
    GoogleSignin.configure({
      webClientId:
        '356685019901-pm0e1tflislt8u6jkmp27n90mvik2uj1.apps.googleusercontent.com',
    });
  }, []);

  return (
    <Provider store={store}>
      <Navigation />
    </Provider>
  );
}
