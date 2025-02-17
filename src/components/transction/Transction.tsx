import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
import {TransctionProp} from '../../types/types';
import {styles} from './transctionStyles';

export default function Transction({
  title,
  subtitle,
  amount,
  time,
  image,
  type,
}: TransctionProp) {
  return (
    <TouchableOpacity style={styles.TransctionContainer}>
      <View style={styles.leftContainer}>
        <View style={styles.leftContainerImage}>
          <Image style={styles.containerImage} source={image} />
        </View>
      </View>
      <View style={styles.rightContainer}>
        <View>
          <Text style={styles.text1}>{title}</Text>
          <Text style={styles.text2}>{subtitle}</Text>
        </View>
        <View>
          <Text
            style={[
              type === 'Expense' ? styles.red : styles.green,
              styles.text3,
            ]}>
            {amount}
          </Text>
          <Text style={styles.text2}>{time}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}
