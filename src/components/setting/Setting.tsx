import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
import { SettingProps } from '../../types/types';
import {styles} from './settingStyles';

export default function Setting(props: SettingProps) {
  const {name, image, onPress} = props;
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={styles.imageBox}>
        <Image style={styles.image} source={image} />
      </View>
      <View>
        <Text style={styles.text}>{name}</Text>
      </View>
    </TouchableOpacity>
  );
}
