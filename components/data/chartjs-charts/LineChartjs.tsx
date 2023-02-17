import { FC } from "react"
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    ChartData,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

interface ChartjsData {
    datasets: any[]
    labels: string[]
};

export const LineChartjs: FC<{data: ChartjsData, options: Record<string, any>}> = ({ data, options}) => {
  return (
    <Line options={options} data={data} />
  )
};
