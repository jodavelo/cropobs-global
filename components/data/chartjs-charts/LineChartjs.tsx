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

export const LineChartjs: FC<{dataURL: string, elementsURL: string, options: Record<string, any>, config: Record<string, any>, orderList?: Record<number, number> , chartID?: string, chartConf?: ChartjsConfig}> = ({ dataURL, elementsURL, options, config, orderList = [], chartID = '', chartConf = {fill: false, pointRadius: 1, yAxisID: 'y'}}) => {
  const { data: predata, error, isLoading } = useSWR(dataURL, dataFetcher);
  const { data: preElements, error: elem_error, isLoading: elem_isLoading } = useSWR(elementsURL, dataFetcher);

  if (error) return <div>Failed to load</div>
  if (elem_error) return <div>Failed to load</div>
  if (isLoading) return <div>Loading...</div>
  if (elem_isLoading) return <div>Loading...</div>

  console.log(preElements);

  const elements = Object.assign({}, ...preElements.map((element: Record<string, any>) => ({[element.ID_ELEMENT]: element})));

  // This section of the code could be merged into a single hook with the useSWR
  const data = predata.data;
  const datasets = datasetGenerator(data.observations, data.labels, config.key, config.name, orderList, chartID, chartConf, elements);
  const chartjsData = {labels: data.labels, datasets};

  return (
    <div style={{ position: 'relative', height: '390px', margin: 'auto', maxWidth: '800px'}}>
      <Line options={options} data={chartjsData} />
    </div>
  )
};
