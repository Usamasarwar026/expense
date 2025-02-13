import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import AuthNavigation from './authNavigation/AuthNavigation';
import AppNavigation from './appNavigation/AppNavigation';
import LaunchScreen from '../screens/launchScreen/LaunchScreen';

export default function Navigation() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    const unsubscribe = auth().onAuthStateChanged(user => {
      setIsAuthenticated(!!user);
    });

    return unsubscribe;
  }, []);
  if (isAuthenticated === null) {
    return (
        <NavigationContainer>
            <LaunchScreen />
        </NavigationContainer>
    );
}


  return (
    <NavigationContainer>
      {isAuthenticated ? <AppNavigation /> : <AuthNavigation />}
    </NavigationContainer>
  );
}















// import * as React from 'react';
// import { NavigationContainer } from '@react-navigation/native';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import LaunchScreen from '../screens/launchScreen/LaunchScreen'; 
// import Login from '../screens/login/Login';
// import SignUp from '../screens/signup/SignUp';
// import Forget from '../screens/forget/Forget';
// import { RootStackParamList } from '../types/types';
// import TabNavigation from './tabNavigation/TabNavigation';
// import EditProfile from '../screens/editProfile/EditProfile';
// import ResetPassword from '../screens/resetPassword/ResetPassword';
// import Logout from '../screens/logout/Logout';
// import FinancialReport from '../screens/financialReport/FinancialReport';
// import DetailTransction from '../screens/detailTransction/DetailTransction';
// import AddModel from '../components/addModel/AddModel';
// import Expense from '../screens/expense/Expense';
// import Income from '../screens/income/Income';
// import auth from '@react-native-firebase/auth'

// const Stack = createNativeStackNavigator<RootStackParamList>();


// export default function Navigation() {
//   const [isAuthenticated, setIsAuthenticated] = React.useState<boolean>(false);

//   React.useEffect(() => {
//     const currentUser = auth().currentUser;
//     if (!currentUser) {
//       auth().signOut();
//     }
//     if (currentUser) {
//       setIsAuthenticated(true);
//     } else {
//       setIsAuthenticated(false);
//     }

//     const unsubscribe = auth().onAuthStateChanged(user => {
//       user?.reload();
//       setIsAuthenticated(!!user);
//     });
//     return unsubscribe;
//   }, []);
//   return (
//     <NavigationContainer>
//       <Stack.Navigator initialRouteName="LaunchScreen">
        
//         <Stack.Screen name="LaunchScreen" component={LaunchScreen} options={{ headerShown: false }} />
//         <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
//         <Stack.Screen name="SignUp" component={SignUp} options={{ headerShown: false }}/>
//         <Stack.Screen name="Forget" component={Forget} options={{ headerShown: false }}/>
//         <Stack.Screen name="TabNavigation" component={TabNavigation} options={{ headerShown: false }}/>
//         <Stack.Screen name="EditProfile" component={EditProfile} options={{ headerShown: false }}/>
//         <Stack.Screen name="Logout" component={Logout} options={{ headerShown: false }}/>
//         <Stack.Screen name="ResetPassword" component={ResetPassword} options={{ headerShown: false }}/>
//         <Stack.Screen name="FinancialReport" component={FinancialReport} options={{ headerShown: false }}/>
//         <Stack.Screen name="DetailTransction" component={DetailTransction} options={{ headerShown: false }}/>
//         <Stack.Screen name="AddModel" component={AddModel} options={{ headerShown: false }}/>
//         <Stack.Screen name="Expense" component={Expense} options={{ headerShown: false }}/>
//         <Stack.Screen name="Income" component={Income} options={{ headerShown: false }}/>
//       </Stack.Navigator>
//     </NavigationContainer>
//   );
// }
