import { FC, useEffect, useRef, useState } from 'react';
import dynamic from "next/dynamic"

import { v4 as uuidv4 } from 'uuid';
import { traceObject } from "./";
import { useWindowSize } from '../../../hooks';
import { PlotlyChartButtons } from './PlotlyChartButtons';
import { formatTextForPlotly } from '../../../helpers';

interface Props {
    title: string;
    ticks: number[];
    yAxisLabel: string;
    dataTraces: traceObject[];
    plotlyDivId: string;
    moreInfoText: string;
    moreInfoText2?: string;
    plotlyDataJson?: Object[];
}

export const PlotlyChartStackedArea: FC<Props> = ({ dataTraces, title, ticks, yAxisLabel, plotlyDivId, moreInfoText, moreInfoText2, plotlyDataJson }) => {
    const Plot = dynamic(() => import("react-plotlyjs-ts"), { ssr: false, })
    const { width } = useWindowSize();
    const [chartHeight, setChartHeight] = useState(0);
    const [positionLegend, setPositionLegend] = useState(0);
    const [chartFontSize, setChartFontSize] = useState(0);
    const [fontSizeTitle, setFontSizeTitle] = useState(0);
    const traces = [
        {x: [1,2,3], y: [2,1,4], stackgroup: 'one'},
        {x: [1,2,3], y: [1,1,2], stackgroup: 'one'},
        {x: [1,2,3], y: [3,0,2], stackgroup: 'one'}
    ];
    useEffect(() => {
      if (width){
        if( width < 300 ) {
          setChartHeight(700);
          setPositionLegend(-0.6);
          setChartFontSize(8);
          setFontSizeTitle(8);
        }
        else if( width > 300 && width < 400) {
          setChartHeight(500);
          setPositionLegend(-1);
          setChartFontSize(10);
          setFontSizeTitle(10);
        }
        else if( width > 400 && width < 500) {
          // setChartHeight(500);
          setPositionLegend(-0.6);
          setChartFontSize(11);
          setFontSizeTitle(10);
        }
        else if( width > 500 && width < 700) {
          // setChartHeight(500);
          setPositionLegend(-0.4);
          setChartFontSize(12);
          setFontSizeTitle(13);
        }
        else if( width > 700 && width < 1000) {
          setChartHeight(500);
          setPositionLegend(-0.4);
          setChartFontSize(13);
          setFontSizeTitle(15);

        }
        else if( width > 1000 && width < 1200) {
          // setChartHeight(500);
          setPositionLegend(-0.38);
          setChartFontSize(9);
          setFontSizeTitle(9);

        }
        else if( width > 1200 && width < 1400) {
          // setChartHeight(500);
          setPositionLegend(-0.6);
          // setChartFontSize(14);
          setChartFontSize(11);
          setFontSizeTitle(11);

        }
        else if( width > 1400 && width < 1600 ) {
          setChartHeight(450);
          setPositionLegend(-0.62);
          setChartFontSize(12);
          setFontSizeTitle(12);

        }
        else if( width > 1600 && width < 3000){
          setChartHeight(450);
          setPositionLegend(-0.60);
          setChartFontSize(14);
          setFontSizeTitle(14);
        }
      }
    }, [width])
    //const layout = {title: 'stacked and filled line chart'}
    const layout = {
        font: {
            family: "'Open Sans', sans-serif",
            size: chartFontSize,
            color: '#54667a'
        },
        title: {
            text: formatTextForPlotly(width!, title, 10),
            font: {
                size: fontSizeTitle
            }
        },
        xaxis: {
            //nticks: 10,
            tickmode: "array",
            tickvals: ticks,
            tickangle: -45,
            tickformat: '%Y',
            hoverformat: '%Y',  // show only year on hover
            /*title: {
                text: word.chart_generated_by,
                font: {
                    size: 8,
                }
            }*/
        },
        yaxis: {
            autorange: true,
            //automargin: true,
            rangemode: 'tozero',
            //hoverformat: ',.0f',
            //showticksuffix: 'all',
            //ticksuffix: ' % ',
            title: {
                text: yAxisLabel,
                font: {
                    size: 14,
                },
                standoff: 5
            },
            zeroline: true,
          
        },
        hovermode: 'x',
        // font: {
        //     family: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",
        //     size: 15,
        //     color: '#666'
        // },
        margin: {l: 45,
          r: 0,
          b: -30,
          t: 23},
        legend: {
            //borderwidth: 5,
            orientation: "h",
            yanchor: 'center',
            y: -0.5,
            xanchor: 'center',
            x: 0.5,
            itemsizing: 'constant',
            valign: 'top',
            traceorder: 'normal',
        },
        boxmode: 'group',
        autosize: true,
        height: chartHeight
    };
    return (
        <>
          <div id={ plotlyDivId }>
            <Plot
              // data={[data]}
              // layout={{
              //     title: "Real-time Data App",
              //     xaxis: { range: [-5, count] },
              //     yaxis: { range: [-5, count] }
              // }}
              key={ uuidv4() }
              data={ dataTraces }
              layout={ layout }
          />
          </div>
          <PlotlyChartButtons divID={ plotlyDivId } plotlyDataJson={ plotlyDataJson } moreInfoText={ moreInfoText } moreInfoText2={ moreInfoText2 } />
        </>
      );
}