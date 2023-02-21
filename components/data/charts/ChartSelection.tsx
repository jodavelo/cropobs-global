import { FC, useState } from "react"
import { LineChartjs } from "../chartjs-charts/LineChartjs";

export const ChartSelection: FC<{dataURLArr: string[], optionsArr: Record<string, any>[], configArr: Record<string, any>, namesArr: string[]}> = ({dataURLArr, optionsArr, configArr, namesArr}) => {

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
            <LineChartjs dataURL={dataURLArr[Number(selected)]} options={optionsArr[Number(selected)]} config={configArr[Number(selected)]}/>;
        </>
    )
}
