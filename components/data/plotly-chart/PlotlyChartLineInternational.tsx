import { FC, useEffect, useState } from 'react';
import dynamic from "next/dynamic"
import { v4 as uuidv4 } from 'uuid';
import { traceObject } from ".";
import { useWindowSize } from '../../../hooks';
import useSWR from 'swr';
import { dataFetcher, pricesInternationalLineDataGenerator, pricesLineDataGenerator, treeMapDataGenerator } from '../../../helpers/data';
import { DataButtons } from '../data-buttons';
import { ModalForm } from "../modal-form";


interface Props {
    dataURL: string;
    title: string
    description: string
};

//const predata = [{"id_admin":32,"spa_name":"Brasil","eng_name":"Brazil","cassava_types":[{"id_cassava_type":714119,"cassava_type":"Vacuum shelled cassava","data":[{"year":2020,"month":6,"nominal":"3.400","full_date":"202006","ipc":"0.0638443","usd":"0.6543495"},{"year":2020,"month":7,"nominal":"3.400","full_date":"202007","ipc":"0.0636153","usd":"0.6439394"},{"year":2020,"month":8,"nominal":"3.400","full_date":"202008","ipc":"0.0634629","usd":"0.6225966"},{"year":2020,"month":9,"nominal":"3.500","full_date":"202009","ipc":"0.0649140","usd":"0.6482682"},{"year":2020,"month":10,"nominal":"3.200","full_date":"202010","ipc":"0.0588439","usd":"0.5688889"},{"year":2020,"month":11,"nominal":"3.200","full_date":"202011","ipc":"0.0583248","usd":"0.5907329"},{"year":2020,"month":12,"nominal":"3.000","full_date":"202012","ipc":"0.0539511","usd":"0.5830904"},{"year":2021,"month":1,"nominal":"3.300","full_date":"202101","ipc":"0.0591982","usd":"0.6161314"},{"year":2021,"month":2,"nominal":"3.300","full_date":"202102","ipc":"0.0586935","usd":"0.6093058"},{"year":2021,"month":3,"nominal":"3.300","full_date":"202103","ipc":"0.0581526","usd":"0.5844846"},{"year":2021,"month":4,"nominal":"3.100","full_date":"202104","ipc":"0.0544594","usd":"0.5573535"},{"year":2021,"month":5,"nominal":"3.300","full_date":"202105","ipc":"0.0574957","usd":"0.6238185"},{"year":2021,"month":6,"nominal":"3.400","full_date":"202106","ipc":"0.0589257","usd":"0.6758100"},{"year":2021,"month":7,"nominal":"3.400","full_date":"202107","ipc":"0.0583654","usd":"0.6594259"},{"year":2021,"month":8,"nominal":"3.450","full_date":"202108","ipc":"0.0587129","usd":"0.6570177"},{"year":2021,"month":9,"nominal":"3.400","full_date":"202109","ipc":"0.0571985","usd":"0.6440614"},{"year":2021,"month":10,"nominal":"3.500","full_date":"202110","ipc":"0.0581539","usd":"0.6318830"},{"year":2021,"month":11,"nominal":"3.200","full_date":"202111","ipc":"0.0526689","usd":"0.5759539"},{"year":2021,"month":12,"nominal":"3.200","full_date":"202112","ipc":"0.0522872","usd":"0.5662715"},{"year":2022,"month":1,"nominal":"3.400","full_date":"202201","ipc":"0.0552567","usd":"0.6143838"},{"year":2022,"month":3,"nominal":"3.500","full_date":"202203","ipc":"0.0554154","usd":"0.7045089"},{"year":2022,"month":4,"nominal":"3.500","full_date":"202204","ipc":"0.0548342","usd":"0.7346767"},{"year":2022,"month":5,"nominal":"3.400","full_date":"202205","ipc":"0.0530183","usd":"0.6849315"},{"year":2022,"month":6,"nominal":"3.500","full_date":"202206","ipc":null,"usd":"0.7008410"}]}]}];

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

export const PlotlyChartLineInternational: FC<Props> = ({ dataURL, title, description }) => {
    const Plot = dynamic(() => import("react-plotlyjs-ts"), { ssr: false, });
    const [priceType, setPriceType] = useState('month');
    const { width } = useWindowSize();
    const [showModal, setShowModal] = useState(false);
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
      
    const {data: predata, error, isLoading } = useSWR(dataURL, dataFetcher);

    if(error) return <div> Failed to load ...</div>
    if(isLoading) return <div>Is loading ...</div>

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
            range: [0, 30]
        },
        boxmode: 'group',
        legend: {"orientation": "h"},
        colorway: Object.values(chartColors)
    };
    

    const data = pricesInternationalLineDataGenerator(predata)

    return (
    <>
        <div style={{ position: 'relative', height: '490px', margin: 'auto', maxWidth: '800px'}}>
            <Plot
             /*  @ts-ignore// */
                id={ id }
                key={ uuidv4() }
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
