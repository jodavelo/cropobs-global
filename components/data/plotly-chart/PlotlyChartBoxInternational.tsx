import { FC, useEffect, useState } from 'react';
import dynamic from "next/dynamic"
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import { traceObject } from ".";
import { useWindowSize } from '../../../hooks';
import useSWR from 'swr';
import { boxInternationalDataGenerator, dataFetcher, treeMapDataGenerator, boxDataGenerator } from '../../../helpers/data';
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

export const PlotlyChartBoxInternational: FC<Props> = ({ dataURL, title, description }) => {
    const Plot = dynamic(() => import("react-plotlyjs-ts"), { ssr: false, });
    const [priceType, setPriceType] = useState('nominal');
    const [showModal, setShowModal] = useState(false);
    const { width } = useWindowSize();
    const [chartHeight, setChartHeight] = useState(0);
    const [positionLegend, setPositionLegend] = useState(0);
    const [chartFontSize, setChartFontSize] = useState(0);
    const id = uuidv4();
    useEffect(() => {
        if (width){
          if( width < 300 ) {
            setChartHeight(700);
            setPositionLegend(-0.6);
            setChartFontSize(8);
          }
          else if( width > 300 && width < 400) {
            setChartHeight(500);
            setPositionLegend(-1);
            setChartFontSize(10);
          }
          else if( width > 400 && width < 500) {
            // setChartHeight(500);
            setPositionLegend(-0.6);
            setChartFontSize(11);
          }
          else if( width > 500 && width < 700) {
            // setChartHeight(500);
            setPositionLegend(-0.4);
            setChartFontSize(12);
          }
          else if( width > 700 && width < 1000) {
            // setChartHeight(500);
            setPositionLegend(-0.4);
            setChartFontSize(13);
          }
          else if( width > 1000 && width < 1200) {
            // setChartHeight(500);
            setPositionLegend(-0.38);
            setChartFontSize(14);
          }
          else if( width > 1200 && width < 1400) {
            // setChartHeight(500);
            setPositionLegend(-0.6);
            // setChartFontSize(14);
          }
          else if( width > 1400 && width < 1600 ) {
            setChartHeight(450);
            setPositionLegend(-0.62);
            setChartFontSize(14);
          }
          else if( width > 1600 && width < 3000){
            setChartHeight(450);
            setPositionLegend(-0.60);
            setChartFontSize(15);
          }
        }
      }, [width])

    const { data: predata, error, isLoading } = useSWR(dataURL, dataFetcher);

    if (error) return <div>Failed to load {error.message}</div>
    if (isLoading) return <div>Loading...</div>

    const layout = {
        title:  {
            text: `<b> ${title}`,
            font: {
                size: chartFontSize,
                color: '#7a7a7a',
                family: "'Open Sans', sans-serif"
            },
        },
        yaxis: {
            title: 'USD / Ton',
            zeroline: true,
            rangemode: 'tozero',
        },
        autosize: true,
        boxmode: 'group',
        legend: {"orientation": "h"},
        colorway: Object.values(chartColors)
    };

    const data = boxInternationalDataGenerator(predata,  priceType);

    console.log(data);
    return (
    <>
        <div style={{ position: 'relative', height: '390px', margin: 'auto', maxWidth: '800px'}}>
    
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
