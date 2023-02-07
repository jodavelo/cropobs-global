
import dynamic from 'next/dynamic';


export const PlotlyChartComponent = () => {
    const PlotlyChart = dynamic(() => import("react-plotlyjs-ts"), { ssr: false, })
    const handleClick = (evt: any) => console.log('')
    const handleHover = (evt: any) => console.log('')

    const data = [
        {
            marker: {
                color: 'rgb(16, 32, 77)'
            },
            type: 'scatter',
            x: [1, 2, 3],
            y: [6, 2, 3]
        },
        {
            name: 'bar chart example',
            type: 'bar',
            x: [1, 2, 3],
            y: [6, 2, 3],
        }
    ];
    const layout = {
        annotations: [
            {
                text: 'simple annotation',
                x: 0,
                xref: 'paper',
                y: 0,
                yref: 'paper'
            }
        ],
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

    return (
        <PlotlyChart data={data}
                        layout={layout}
                        onClick={handleClick}
                        onHover={handleHover}
        />
    );
}
