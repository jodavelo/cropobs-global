import { FC, useEffect, useState } from 'react';
import dynamic from "next/dynamic"
import useSWR from 'swr';
import { boxDataGenerator, dataFetcher } from '../../../helpers/data';
import { DataButtons } from "../data-buttons/DataButtons";
import { v4 as uuidv4 } from 'uuid';
import { ModalForm } from "../modal-form";
import { useTranslation } from 'react-i18next';

interface Props {
    dataURL: string;
    title: string;
    description: string
};

interface typePrice {
    currencyType: string;
}

const chartColors = {
    dark_red: '#4F0614',
    bean_orange2: '#F89A21',
    dark_pink: '#bd7071',
    //bean_orange: '#F57914',
    fair_green: '#6BAA75',
    purple: '#4D5382',
    dark_blue: '#1F7A8C',
    bean_red: '#A82F31',
    water_green: '#94E8B4',
    dark_green: '#679436',
    light_pink: '#E5D0E3',
    bright_brown: '#BD4F28',
    golden_brown: '#A86F0C',
    dark_salmon: '#F77E45',
    green_gray: '#8C9977',
    color_brown: '#85350B',
    rustic_green: '#73682C',
    marine_blue: '#79bcff',
    white: '#FFFFFF',
    gray: '#e3e3e3',
    light_yellow_bean: '#ffc985',
};
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

export const PlotlyChartBox: FC<Props> = ({ dataURL, title, description}) => {
    const Plot = dynamic(() => import("react-plotlyjs-ts"), { ssr: false});
    const { t: dataTranslate } = useTranslation('data-prices');
    const [priceType, setPriceType] = useState('nominal');
    const [showModal, setShowModal] = useState(false);

    const { data: predata, error, isLoading } = useSWR(dataURL, dataFetcher);
    const [filterOptionNominal, setFilterOptionNominal] = useState('');
    const [filterOptionReal, setFilterOptionReal] = useState('');
    const [filterOptionUsd, setFilterOptionUsd] = useState('');

    useEffect(() => {
        setFilterOptionNominal(dataTranslate('nominal-option-filter')!);
        setFilterOptionReal(dataTranslate('real-option-filter')!);
        setFilterOptionUsd(dataTranslate('usd-option-filter')!);
    }, )

    if (error) return <div>Failed to load {error.message}</div>
    if (isLoading) return <div>Loading...</div>

    const layout = {
        font: {
            family: "'Open Sans', sans-serif",
            size: 14,
            color: '#54667a'
        },
        title:  {
            text: `<b> ${title}`,
            font: {
                size: 14,
            },
            standoff: 5
        },
        xaxis: {
            tickmode: "array",
            tickangle: -45,
        },
        yaxis: {
            title: {
                text: 'SLC/Kg',
                font: {
                    size: 14,
                },
                standoff: 5
            },
            zeroline: true,
            rangemode: 'tozero',
            
        },
        autosize: true,
        boxmode: 'group',
        legend: {
            //borderwidth: 5,
            orientation: "h",
            yanchor: 'bottom',
            y: -0.3,
            xanchor: 'center',
            x: 0.5,
            itemsizing: 'constant',
            valign: 'top',
            traceorder: 'normal'
        },
        colorway: Object.values(chartColors),
    };

    const data = boxDataGenerator(predata,  priceType);
    const id = uuidv4();


    return (
    <>
        <div style={{ position: 'relative', height: '490px', margin: 'auto', maxWidth: '800px'}}>
            <select value={priceType} onChange={(e) => setPriceType(e.target.value)} style={{marginTop: '10px'}}>
                <option value="nominal">{filterOptionNominal}</option>
                <option value="ipc">{filterOptionReal}</option>
                <option value="usd">{filterOptionUsd}</option>
            </select>
                <Plot 
                    /*  @ts-ignore// */
                    id={ id }
                    data={ data }
                    layout={ layout }
                />
        </div>
        <DataButtons text={description} elementID={id} setShowModal={setShowModal}/>
        {showModal ? (
            <ModalForm dataJson={[]} setShowModal={setShowModal}/>
        ) : null
        }
    </>
    );
}
