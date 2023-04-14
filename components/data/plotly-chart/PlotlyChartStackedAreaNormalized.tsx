
import { FC, useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { v4 as uuidv4 } from 'uuid';
import { useWindowSize } from '../../../hooks';
import { PlotlyChartButtons } from './PlotlyChartButtons';

// import Plot from 'react-plotly.js';

export interface traceObject {
    x: number[];
    y: number[];
    stackgroup: 'one';
    groupnorm?: 'percent';
    name: string;
    fillcolor: string;
    marker: {
        color: string
    };
    hovertemplate?: string;
}

interface Props {
    plotlyDivId: string;
    moreInfoText: string;
    moreInfoText2?: string;
    title: string;
    ticks: number[];
    yLabel?: string;
    dataTraces: traceObject[];
}



export const PlotlyChartStackedAreaNormalized: FC<Props> = ({ plotlyDivId, dataTraces, ticks, title, moreInfoText, moreInfoText2, yLabel = '' }) => {
    const Plot = dynamic(() => import("react-plotlyjs-ts"), { ssr: false, })
    const { width = 0 } = useWindowSize();
    const [chartHeight, setChartHeight] = useState(0);
    const [positionLegend, setPositionLegend] = useState(0);
    const [chartFontSize, setChartFontSize] = useState(0);
    //console.log({ dataTraces })
    
    useEffect(() => {
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
      
    }, [width])
    
    
    const byShareLayoutCrops = {
        font: {
            family: "'Open Sans', sans-serif",
            size: chartFontSize,
            color: '#54667a'
        },
        title: {
            text: title,
            font: {
                size: 14
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
            //hoverformat: '.2f',
            showticksuffix: 'all',
            ticksuffix: ' % ',
            title: {
                text: yLabel,
                font: {
                    size: 14,
                },
                standoff: 5
            }
        },
        hovermode: 'x',
        // font: {
        //     family: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",
        //     size: 15,
        //     color: '#666'
        // },
        margin: {r: 10},
        legend: {
            //borderwidth: 5,
            orientation: "h",
            yanchor: 'bottom',
            y: positionLegend,
            xanchor: 'center',
            x: 0.5,
            itemsizing: 'constant',
            valign: 'top',
            traceorder: 'normal'
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
                layout={ byShareLayoutCrops }
            />
          </div>
          <PlotlyChartButtons divID={ plotlyDivId } moreInfoText={ moreInfoText } moreInfoText2={ moreInfoText2 } />
        </>
      );
}
