import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
import * as Progress from 'react-native-progress';

export default function ProgressBar({
  categoryName,
  amount,
  progress,
  color,
  textColor,
  onPress,
}: any) {
  return (
    <TouchableOpacity style={style.barcontainer} onPress={onPress}>
      <View style={style.innerBarContainer}>
        <View style={style.upperInnerBar}>
          <Text style={[style.dot, {backgroundColor: color}]}></Text>
          <Text style={style.dottext}>{categoryName}</Text>
        </View>
        <View>
          <Text style={[style.amount, {color: textColor}]}>{amount}</Text>
        </View>
      </View>
      <View style={style.progressBar}>
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

const style = StyleSheet.create({
  barcontainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginBottom: 20,
    height: 50,
  },
  innerBarContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 40,
  },
  upperInnerBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingVertical: 4,
    backgroundColor: '#FCFCFC',
    width: '45%',
    borderRadius: 32,
    paddingLeft: 10,
  },
  dot: {
    width: 14,
    height: 14,
    borderRadius: 50,
    backgroundColor: '#FCAC12',
  },
  dottext: {
    fontSize: 14,
    fontWeight: '500',
    marginLeft: 10,
  },
  progressBar: {
    width: '100%',
    overflow: 'hidden',
  },
  amount: {
    color: '#FD3C4A',
    fontSize: 24,
    fontWeight: '500',
  },
});
