import { FC, useState } from "react"
import { LineChartjs } from "../chartjs-charts/LineChartjs";

interface ChartjsData {
    datasets: any[]
    labels: string[]
}

export const ChartSelection: FC<{dataArr: ChartjsData[], optionsArr: Record<string, any>[], namesArr: string[]}> = ({dataArr, optionsArr, namesArr}) => {

    const [selected, setSelected] = useState('0');

    return (
        <>
            <select
                value={selected}
                onChange={(e) => {
                    setSelected(e.target.value);
                }}
            >
                { namesArr.map( (value, index) => <option key={index} value={index}>{value}</option>)}
            </select>
            <LineChartjs data={dataArr[Number(selected)]} options={optionsArr[Number(selected)]}/>;
        </>
    )
}
