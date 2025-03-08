import { useMemo } from 'react';
import { PieChartSection } from '../../types/types';  // Assuming PieChartSection type is defined

interface UsePieChartLogicProps {
  sections: PieChartSection[];
}

export const usePieChart = ({ sections }: UsePieChartLogicProps) => {
  const total = useMemo(() => sections.reduce((sum, section) => sum + section.percentage, 0), [sections]);

  let cumulativePercentage = 0;
  
  // Prepare the data with calculated startAngle and endAngle
  const chartData = useMemo(() => {
    return sections.map((section) => {
      const startAngle = (cumulativePercentage / total) * 360;
      cumulativePercentage += section.percentage;
      const endAngle = (cumulativePercentage / total) * 360;

      return {
        ...section,
        startAngle,
        endAngle,
      };
    });
  }, [sections, total]);

  return {
    chartData,
    total,
  };
};
