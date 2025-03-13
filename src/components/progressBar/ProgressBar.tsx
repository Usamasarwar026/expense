import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import * as Progress from 'react-native-progress';
import {styles} from './progressBarStyles';
import {ProgressBarProps} from '../../types/types';
import useProgressBar from './useProgressBar';
import { COLORS } from '../../constant/color';

export default function ProgressBar({
  categoryName,
  amount,
  progress,
  color,
  textColor,
  onPress,
}: ProgressBarProps) {
  const {currencyAmount} = useProgressBar({amount})
  return (
    <TouchableOpacity style={styles.barcontainer} onPress={onPress}>
      <View style={styles.innerBarContainer}>
        <View style={styles.upperInnerBar}>
          <Text style={[styles.dot, {backgroundColor: color}]}></Text>
          <Text style={styles.dottext}>{categoryName}</Text>
        </View>
        <View>
          <Text style={[styles.amount, {color: textColor}]}>{currencyAmount}</Text>
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
          unfilledColor={COLORS.LIGHT_GREY}
        />
      </View>
    </TouchableOpacity>
  );
}
