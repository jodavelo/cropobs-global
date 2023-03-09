import { FC, useState } from "react"
import { LineChartjs } from "../chartjs-charts/LineChartjs";

interface ChartConfig {
    dataURL: string
    options: Record<string, any>
    config: Record<string, any>
    name: string
    elementsURL: string
    orderList?: Record<number, number>
    chartID?: string
    chartConfig?: ChartjsConfig
}

interface ChartjsConfig {
    fill: boolean,
    pointRadius: number,
    yAxisID: string,
  }

interface Props {
    chartConfigList: ChartConfig[]
}

export const ChartSelection: FC<Props> = ({ chartConfigList }) => {

    const [selected, setSelected] = useState('0');

    return (
        <>
            <select
                value={selected}
                onChange={(e) => {
                    setSelected(e.target.value);
                }}
            >
                { chartConfigList.map( (chartConfig: Record<string, any>, index: number) => <option key={index} value={index}>{chartConfig.name}</option>)}
            </select>
            <LineChartjs dataURL={chartConfigList[Number(selected)].dataURL} options={chartConfigList[Number(selected)].options} config={chartConfigList[Number(selected)].config} orderList={chartConfigList[Number(selected)].orderList} chartID={chartConfigList[Number(selected)].chartID} chartConf={chartConfigList[Number(selected)].chartConfig} elementsURL={chartConfigList[Number(selected)].elementsURL} />;
        </>
    )
}
