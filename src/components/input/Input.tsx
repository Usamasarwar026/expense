import { View, Text, TextInput } from 'react-native'
import React from 'react'
// import { signupInput } from '../../types/types';

export default function Input(props:any) {
    const {style,placeholder,placeholderTextColor,value,onChangeText,secureTextEntry,keyboardType} = props;
  return (
    <View>
     <TextInput
               style={style}
               placeholder={placeholder}
               placeholderTextColor={placeholderTextColor}
               value={value}
               onChangeText={onChangeText}
               secureTextEntry={secureTextEntry}
               keyboardType={keyboardType}
             />
    </View>
  )
}