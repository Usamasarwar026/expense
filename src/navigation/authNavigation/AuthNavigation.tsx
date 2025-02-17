import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {AUTH_SCREENS} from '../../constant/constant';
import LaunchScreen from '../../screens/launchScreen/LaunchScreen';
import {RootStackParamList} from '../../types/types';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AuthNavigation() {
  return (
    <Stack.Navigator initialRouteName="LaunchScreen">
      <Stack.Screen
        name="LaunchScreen"
        component={LaunchScreen}
        options={{headerShown: false}}
      />
      {AUTH_SCREENS.map(({name, component}: any) => (
        <Stack.Screen
          key={name}
          name={name as keyof RootStackParamList}
          component={component}
          options={{headerShown: false}}
        />
      ))}
    </Stack.Navigator>
  );
}
