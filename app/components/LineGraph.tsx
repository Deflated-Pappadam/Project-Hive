"use client"
import React from 'react';
import { Line } from 'react-chartjs-2';

interface LineGraphProps {
  data: {
    labels: string[];
    datasets: {
      label: string;
      data: number[];
      fill: boolean;
      borderColor: string;
      tension: number;
    }[];
  };
}

const LineGraph: React.FC<LineGraphProps> = ({ data }) => {
  return (
    <div>
      <Line data={data} />
    </div>
  );
};

export default LineGraph;
