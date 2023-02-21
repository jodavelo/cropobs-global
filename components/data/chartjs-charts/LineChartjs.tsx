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
    Legend
);

export const LineChartjs: FC<{dataURL: string, options: Record<string, any>, config: Record<string, any>}> = ({ dataURL, options, config}) => {
  const { data: predata, error, isLoading } = useSWR(dataURL, dataFetcher);

  if (error) return <div>Failed to load</div>
  if (isLoading) return <div>Loading...</div>

  // This section of the code could be merged into a single hook with the useSWR
  const data = predata.data;
  const datasets = datasetGenerator(data.observations, data.labels, config.key, config.name);
  const chartjsData = {labels: data.labels, datasets};

  return (
    <Line options={options} data={chartjsData} />
  )
};
