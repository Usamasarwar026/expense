import {View, Text, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import {TransctionProp} from '../../types/types';
import {styles} from './transctionStyles';
import {
  IMAGE_BACKGROUND_COLOR,
  TRANSACTION_IMAGE,
} from '../../constant/constant';
import {useTransction} from './useTransction';

export default function Transction({
  title,
  subtitle,
  amount,
  time,
  type,
  onPress,
}: TransctionProp) {
  const {formattedAmount} = useTransction(amount, type);

  return (
    <TouchableOpacity style={styles.TransctionContainer} onPress={onPress}>
      <View style={styles.leftContainer}>
        <View
          style={[
            styles.leftContainerImage,
            {backgroundColor: IMAGE_BACKGROUND_COLOR(title)},
          ]}>
          <Image
            style={styles.containerImage}
            source={TRANSACTION_IMAGE(title)}
          />
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
            {formattedAmount}
          </Text>
          <Text style={styles.text4}>{time}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}
