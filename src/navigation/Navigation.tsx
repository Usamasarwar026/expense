import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import AuthNavigation from './authNavigation/AuthNavigation';
import AppNavigation from './appNavigation/AppNavigation';
import LaunchScreen from '../screens/launchScreen/LaunchScreen';
import { navigationRef } from './navigationRef';

export default function Navigation() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    const unsubscribe = auth().onAuthStateChanged(user => {
      setIsAuthenticated(user ? true : false);
    });
  
    return () => unsubscribe();
  }, []);
  

  return (
    <NavigationContainer ref={navigationRef}>
      {isAuthenticated === null ? <LaunchScreen /> : isAuthenticated ? <AppNavigation /> : <AuthNavigation />}
    </NavigationContainer>
  );
}
