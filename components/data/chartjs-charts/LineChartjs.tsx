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

export const LineChartjs: FC<{dataURL: string, options: Record<string, any>, config: Record<string, any>, orderList?: Record<number, number> , chartID?: string, chartConf?: ChartjsConfig}> = ({ dataURL, options, config, orderList = [], chartID = '', chartConf = {fill: false, pointRadius: 1, yAxisID: 'y'}}) => {
  const { data: predata, error, isLoading } = useSWR(dataURL, dataFetcher);

  if (error) return <div>Failed to load</div>
  if (isLoading) return <div>Loading...</div>

  // This section of the code could be merged into a single hook with the useSWR
  const data = predata.data;
  const datasets = datasetGenerator(data.observations, data.labels, config.key, config.name, orderList, chartID, chartConf);
  const chartjsData = {labels: data.labels, datasets};

  return (
    <Line options={options} data={chartjsData} />
  )
};
