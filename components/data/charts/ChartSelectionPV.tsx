import { FC, useState } from "react"
import { LineChartjsPV } from "../chartjs-charts";

interface ChartConfig {
    dataURL: any
    options: Record<string, any>
    config: Record<string, any>
    name: string
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

export const ChartSelectionPV: FC<Props> = ({ chartConfigList }) => {

    const [selected, setSelected] = useState('0');

    return (
        <>
            <select
                className='chart-select'
                style={{width: 'fit-content'}}
                value={selected}
                onChange={(e) => {
                    setSelected(e.target.value);
                }}
            >
                { chartConfigList.map( (chartConfig: Record<string, any>, index: number) => <option key={index} value={index}>{chartConfig.name}</option>)}
            </select>
            <LineChartjsPV data={chartConfigList[Number(selected)].dataURL} options={chartConfigList[Number(selected)].options} config={chartConfigList[Number(selected)].config} orderList={chartConfigList[Number(selected)].orderList} chartID={chartConfigList[Number(selected)].chartID} chartConf={chartConfigList[Number(selected)].chartConfig}/>
        </>
    )
}
