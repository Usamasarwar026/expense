import {View, TextInput, TouchableOpacity} from 'react-native';
import React from 'react';
import Feather from 'react-native-vector-icons/Feather';
import {InputProps} from '../../types/types';
import {styles} from './inputStyles';
import {useInput} from './useInput';

export default function Input(props: InputProps) {
  const {
    style,
    placeholder,
    placeholderTextColor,
    value,
    onChangeText,
    secureTextEntry,
    keyboardType,
  } = props;
  const {isPasswordVisible, togglePasswordVisibility} =
    useInput(secureTextEntry);

  return (
    <View>
      <TextInput
        style={style}
        placeholder={placeholder}
        placeholderTextColor={placeholderTextColor}
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry && !isPasswordVisible}
        keyboardType={keyboardType}
      />
      {secureTextEntry && (
        <TouchableOpacity
          onPress={togglePasswordVisibility}
          style={styles.icon}>
          <Feather
            name={isPasswordVisible ? 'eye' : 'eye-off'}
            size={20}
            color="gray"
          />
        </TouchableOpacity>
      )}
    </View>
  );
}
