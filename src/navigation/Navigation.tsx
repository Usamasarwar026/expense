import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LaunchScreen from '../screens/launchScreen/LaunchScreen'; 
import Login from '../screens/login/Login';
import SignUp from '../screens/signup/SignUp';
import Forget from '../screens/forget/Forget';
import { RootStackParamList } from '../types/types';
import TabNavigation from './TabNavigation';
import EditProfile from '../screens/editProfile/EditProfile';
import ResetPassword from '../screens/resetPassword/ResetPassword';
import Logout from '../screens/logout/Logout';

const Stack = createNativeStackNavigator<RootStackParamList>();


export default function Navigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="TabNavigation">
        <Stack.Screen name="LaunchScreen" component={LaunchScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
        <Stack.Screen name="SignUp" component={SignUp} options={{ headerShown: false }}/>
        <Stack.Screen name="Forget" component={Forget} options={{ headerShown: false }}/>
        <Stack.Screen name="TabNavigation" component={TabNavigation} options={{ headerShown: false }}/>
        <Stack.Screen name="EditProfile" component={EditProfile} options={{ headerShown: false }}/>
        <Stack.Screen name="Logout" component={Logout} options={{ headerShown: false }}/>
        <Stack.Screen name="ResetPassword" component={ResetPassword} options={{ headerShown: false }}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
