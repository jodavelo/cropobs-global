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
    Filler
} from 'chart.js';
import useSWR from 'swr';
import { Line } from 'react-chartjs-2';
import { dataFetcher } from "../../../helpers/data";
import { datasetGenerator } from "../../../helpers/data";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler
);

interface ChartjsConfig {
  fill: boolean,
  pointRadius: number,
  yAxisID: string,
}

export const LineChartjsPV: FC<{data: any, options: Record<string, any>, config: Record<string, any>, orderList?: Record<number, number> , chartID?: string, chartConf?: ChartjsConfig}> = ({ data, options, config, orderList = [], chartID = '', chartConf = {fill: false, pointRadius: 1, yAxisID: 'y'}}) => {

  return (
    <Line options={options} data={data} />
  )
};
