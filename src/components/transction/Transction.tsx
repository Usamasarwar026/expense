import {View, Text, Image, TouchableOpacity} from 'react-native';
import React, { useEffect } from 'react';
import {TransctionProp} from '../../types/types';
import {styles} from './transctionStyles';
import { useAppDispatch, useAppSelector } from '../../hooks/useRedux';
import { fetchExchangeRates, fetchSelectedCurrency } from '../../store/transctionSlice/transctionSlice';

export default function Transction({
  title,
  subtitle,
  amount,
  time,
  image,
  type,
}: TransctionProp) {
  const dispatch = useAppDispatch();
   const selectedCurrency = useAppSelector(
          state => state.transctions.selectedCurrency,
        );
        const exchangeRates = useAppSelector(
          state => state.transctions.exchangeRates,
        );
      
        useEffect(() => {
          dispatch(fetchSelectedCurrency());
        }, [dispatch]);
        
        useEffect(() => {
          dispatch(fetchExchangeRates());
        }, [dispatch]);
      
        
      const convertAmount = (amount: number, currency: string) => {
        const rate = exchangeRates[currency] || 1;
        const convertedAmount = amount * rate;
        return new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: currency,
          minimumFractionDigits: 0,
          maximumFractionDigits: 0,
        }).format(convertedAmount);
      };
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
            {type === 'Expense' ? `- ${convertAmount(amount, selectedCurrency)}` : `+ ${convertAmount(amount, selectedCurrency)}`}
          </Text>
          <Text style={styles.text4}>{time}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}
