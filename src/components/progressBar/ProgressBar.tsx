import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
import * as Progress from 'react-native-progress';
import { styles } from './progressBarStyles';

export default function ProgressBar({
  categoryName,
  amount,
  progress,
  color,
  textColor,
  onPress,
}: any) {
  return (
    <TouchableOpacity style={styles.barcontainer} onPress={onPress}>
      <View style={styles.innerBarContainer}>
        <View style={styles.upperInnerBar}>
          <Text style={[styles.dot, {backgroundColor: color}]}></Text>
          <Text style={styles.dottext}>{categoryName}</Text>
        </View>
        <View>
          <Text style={[styles.amount, {color: textColor}]}>{amount}</Text>
        </View>
      </View>
      <View style={styles.progressBar}>
        <Progress.Bar
          progress={progress}
          width={null}
          height={12}
          color={color}
          borderWidth={0}
          borderRadius={10}
          unfilledColor="lightgray"
        />
      </View>
    </TouchableOpacity>
  );
}
