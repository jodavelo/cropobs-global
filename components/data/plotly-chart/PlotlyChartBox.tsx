import { FC, useEffect, useState } from 'react';
import dynamic from "next/dynamic"
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import { traceObject } from ".";
import { useWindowSize } from '../../../hooks';
import useSWR from 'swr';
import { boxDataGenerator, dataFetcher, treeMapDataGenerator } from '../../../helpers/data';
import { use } from 'i18next';
import { DataButtons } from '../data-buttons';
import { ModalForm } from "../modal-form";

interface Props {
    dataURL: string;
    title: string;
    description: string
};

interface typePrice {
    currencyType: string;
}

//const predata = [{"id_group":714119,"group":"Vacuum shelled cassava","source":[{"source":"Conab (2022)"}],"minAndMax":[{"year":2020,"min_nominal":"3.000","max_nominal":"3.500","min_ipc":"0.0539511","max_ipc":"0.0649140","min_usd":"0.5688889","max_usd":"0.6543495"},{"year":2021,"min_nominal":"3.100","max_nominal":"3.500","min_ipc":"0.0522872","max_ipc":"0.0591982","min_usd":"0.5573535","max_usd":"0.6758100"},{"year":2022,"min_nominal":"3.400","max_nominal":"3.500","min_ipc":"0.0530183","max_ipc":"0.0554154","min_usd":"0.6143838","max_usd":"0.7346767"}],"medians":[{"nominal":"3.30","ipc":"0.06","usd":"0.61"},{"nominal":"3.35","ipc":"0.06","usd":"0.63"},{"nominal":"3.45","ipc":"0.05","usd":"0.68"}]}];

const data = [
    {
        y: [3.5, 2, 1],
        type: "box"
    },
    {
        y: [4.5, 3, 2],
        type: "box"
    }
]

export const PlotlyChartBox: FC<Props> = ({ dataURL, title, description }) => {
    const Plot = dynamic(() => import("react-plotlyjs-ts"), { ssr: false, });
    const [priceType, setPriceType] = useState('nominal');
    const [showModal, setShowModal] = useState(false);
    const id = uuidv4();

    const { data: predata, error, isLoading } = useSWR(dataURL, dataFetcher);

    if (error) return <div>Failed to load {error.message}</div>
    if (isLoading) return <div>Loading...</div>

    const layout = {
        title: title,
        yaxis: {
            title: 'SLC/kg',
            zeroline: true,
            rangemode: 'tozero',
        },
        autosize: true,
        boxmode: 'group',
        legend: {"orientation": "h"},
        colorway: '#679436'
    };

    const data = boxDataGenerator(predata,  priceType);


    return (
    <div>
      <select value={priceType} onChange={(e) => setPriceType(e.target.value)}>
        <option value="nominal">Nominal</option>
        <option value="ipc">Real</option>
        <option value="usd">Dolares</option>
      </select>
        <Plot
            key={ uuidv4() }
            data={ data }
            layout={ layout }
        />
        <DataButtons text={description} elementID={id} setShowModal={setShowModal}/>
    </div>
    );
}
