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
import FinancialReport from '../screens/financialReport/FinancialReport';
import DetailTransction from '../screens/detailTransction/DetailTransction';
import AddModel from '../components/addModel/AddModel';
import Expense from '../screens/expense/Expense';

const Stack = createNativeStackNavigator<RootStackParamList>();


export default function Navigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="LaunchScreen">
        <Stack.Screen name="LaunchScreen" component={LaunchScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
        <Stack.Screen name="SignUp" component={SignUp} options={{ headerShown: false }}/>
        <Stack.Screen name="Forget" component={Forget} options={{ headerShown: false }}/>
        <Stack.Screen name="TabNavigation" component={TabNavigation} options={{ headerShown: false }}/>
        <Stack.Screen name="EditProfile" component={EditProfile} options={{ headerShown: false }}/>
        <Stack.Screen name="Logout" component={Logout} options={{ headerShown: false }}/>
        <Stack.Screen name="ResetPassword" component={ResetPassword} options={{ headerShown: false }}/>
        <Stack.Screen name="FinancialReport" component={FinancialReport} options={{ headerShown: false }}/>
        <Stack.Screen name="DetailTransction" component={DetailTransction} options={{ headerShown: false }}/>
        <Stack.Screen name="AddModel" component={AddModel} options={{ headerShown: false }}/>
        <Stack.Screen name="Expense" component={Expense} options={{ headerShown: false }}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
