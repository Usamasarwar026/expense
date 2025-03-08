import React from 'react';
import {View} from 'react-native';
import Svg, {Circle, G} from 'react-native-svg';
import {PieChartProps} from '../../types/types';
import {styles} from './pieChartStyles';
import {usePieChart} from './usePieChart';

const PieChart = ({radius, sections, strokeWidth = 20}: PieChartProps) => {
  const {chartData} = usePieChart({sections});

  return (
    <Svg
      width={radius * 2.5}
      height={radius * 2.5}
      viewBox={`0 0 ${radius * 2} ${radius * 2}`}>
      <G transform={`translate(${radius}, ${radius})`}>
        {chartData.map((section, index) => {
          const {startAngle, endAngle, color} = section;
          return (
            <Circle
              key={index}
              cx="0"
              cy="0"
              r={radius - strokeWidth / 2}
              stroke={color}
              strokeWidth={strokeWidth}
              fill="none"
              strokeDasharray={[
                endAngle - startAngle,
                360 - (endAngle - startAngle),
              ]}
              strokeDashoffset={-startAngle}
              strokeLinecap="round"
            />
          );
        })}
      </G>
    </Svg>
  );
};

export default ({radius, sections}: PieChartProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <PieChart radius={radius} strokeWidth={20} sections={sections} />
      </View>
    </View>
  );
};
