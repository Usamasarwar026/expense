import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {APP_SCREENS} from '../../constant/constant';
import {RootStackParamList} from '../../types/types';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigation() {
  return (
    <Stack.Navigator>
      {APP_SCREENS.map(({name, component}) => (
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
