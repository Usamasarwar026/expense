import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import AuthNavigation from './../authNavigation/AuthNavigation';
import AppNavigation from './../appNavigation/AppNavigation';
import LaunchScreen from '../../screens/launchScreen/LaunchScreen';
import {navigationRef} from '../navigationRef/navigationRef';
import useMainNavigation from './useMainNavigation';

export default function Navigation() {
  const {isAuthenticated} = useMainNavigation();

  return (
    <NavigationContainer ref={navigationRef}>
      {isAuthenticated === null ? (
        <LaunchScreen />
      ) : isAuthenticated ? (
        <AppNavigation />
      ) : (
        <AuthNavigation />
      )}
    </NavigationContainer>
  );
}
