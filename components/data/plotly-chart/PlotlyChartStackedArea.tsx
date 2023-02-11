
import { FC } from 'react';
import dynamic from 'next/dynamic';
import { v4 as uuidv4 } from 'uuid';

export interface traceObject {
    dataX: number[];
    dataY: number[];
    group: 'one';
    groupNorm: 'percent';
    name: string;
    fillColor: string;
    markerColor: {
        color: string
    };
    template: string;
}

interface Props {
    title: string;
    ticks: number[];
    dataTraces: traceObject[];
}


export const PlotlyChartStackedArea: FC<Props> = ({ dataTraces, ticks, title }) => {
    const PlotlyChart = dynamic(() => import("react-plotlyjs-ts"), { ssr: false, })
    const handleClick = (evt: any) => console.log('')
    const handleHover = (evt: any) => console.log('')

    // const traces = [
    //     {x: [1,2,3], y: [2,1,4], stackgroup: 'one', groupnorm:'percent', name: 'something', fillcolor: '#10b7c9', marker: {color: '#10b7c9'},  hovertemplate:'%{y:,.0f} ha'},
    //     {x: [1,2,3], y: [1,1,2], stackgroup: 'one', groupnorm:'percent', name: 'something 2'},
    //     {x: [1,2,3], y: [3,0,2], stackgroup: 'one', groupnorm:'percent', name: 'something 3'}
    // ];
    const traces = dataTraces;
    const layout = {
        // annotations: [
        //     {
        //         text: 'simple annotation',
        //         x: 0,
        //         xref: 'paper',
        //         y: 0,
        //         yref: 'paper'
        //     }
        // ],
        title: 'simple example',
        xaxis: {
            tickvals:[],
            /* Set the text displayed at the ticks position via tickvals */
            ticktext: [],
            tickangle: -45,
        },
        legend: {"orientation": "h", y: -0.2, xanchor: 'center', x: 0.5, traceorder: 'normal'},
        boxmode: 'group',
        yaxis: {
            title:{
                text: 'Area + ha',
                standoff: 20
            },
            //zeroline: true,
            autorange: true,
            automargin: true,
    
            rangemode: 'tozero',
            //hoverformat: ",.2r"
            //hoverformat: "~s"
            //tickformat: ".0%",
            // range: [0, 2000]
        },
        font: {
            family: 'Arial',//'Bahnschrift SemiBold',
            size: 12,
            color: '#666',
            //font-weight: 'normal'
        },
    }
    const byShareLayoutCrops = {
        font: {
            family: "'Open Sans', sans-serif",
            size: 14,
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
                text: 'Share of total area %',
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
            y: -0.3,
            xanchor: 'center',
            x: 0.5,
            itemsizing: 'constant',
            valign: 'top',
            traceorder: 'normal'
        },
        boxmode: 'group',
        autosize: true
    };

    return (
        <PlotlyChart data={ traces } key={ uuidv4() }
                        layout={byShareLayoutCrops}
                        onClick={handleClick}
                        onHover={handleHover}
        />
    );
}
