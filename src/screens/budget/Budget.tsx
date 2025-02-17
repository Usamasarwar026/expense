import {View, Text} from 'react-native';
import React from 'react';
import {Styles} from './budgetStyles';

export default function Budget() {
  return (
    <View style={Styles.container}>
      <Text style={Styles.text}>New Budget Coming Soon!</Text>
    </View>
  );
}
