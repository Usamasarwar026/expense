import {View, TextInput, TouchableOpacity, StyleSheet} from 'react-native';
import React, {useState} from 'react';
import Feather from 'react-native-vector-icons/Feather';
import {InputProps} from '../../types/types';
import {styles} from './inputStyles';

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
  const [isPasswordVisible, setIsPasswordVisible] = useState(!secureTextEntry);

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
          onPress={() => setIsPasswordVisible(!isPasswordVisible)}
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
