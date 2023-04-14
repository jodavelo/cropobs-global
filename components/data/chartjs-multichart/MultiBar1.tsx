import { FC } from "react";
import { Chart as ChartComponent } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
import { commarize } from "../../../helpers/data";
Chart.register(...registerables);

interface ChartTexts {
  title: string,
  axis_x : string,
  axis_y : string,
  axis_y2 : string,
  datasets: string[]
}

interface Props {
    xLabels: number[],
    databar1: number[],
    databar2: number[],
    databar3: number[],
    databar4: number[],
    datapoints: number[],
    chartTexts: ChartTexts,
};

export const MultiBar1: FC<Props> = ({xLabels, datapoints, databar1, databar2, databar3, databar4, chartTexts}) => {
    const data = {
        labels: xLabels,
        datasets: [
          {
            label: chartTexts.datasets[0],
            type: 'line' as const,
            fill: false, //rellenar area debajo de la curva
            lineTension: 0.3, // recta 0 -  curva 
            showLine: false, //mostrar linea
            //backgroundColor: 'rgb(128, 128, 128,0.4)', //Color area bajo la curva
            //borderColor: 'rgba(75,192,192,1)', //color curva
            //borderCapStyle: 'butt', //final de curva (recta, redondeada, cuadrada)
            //borderDash: [],//punteo de linea
            //borderDashOffset: 0.0,
            //borderJoinStyle: 'round', // forma de picos (cortados, curvos, punta)
            pointBorderColor: 'rgba(220,220,220,1)',
            pointBackgroundColor: 'rgba(128, 128, 128,1)',
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: 'rgb(128, 128, 128);',
            pointHoverBorderColor: 'rgba(220,220,220,1)',
            pointHoverBorderWidth: 2,
            pointRadius: 3,
            pointHitRadius: 10,
            data: datapoints.length > 0 ? datapoints.map((datum: any) => Math.round(datum * 100) / 100) : [],
            yAxisID: 'y1',
          },
          {
          label: chartTexts.datasets[1],
          data: databar1,
          backgroundColor: 'rgba(100,209,209,1)',
          yAxisID: 'y',
        },
        {
          label: chartTexts.datasets[2],
          data: databar2,
          backgroundColor: 'rgba(178,178,178,1)',
          yAxisID: 'y',
        },
        {
          label: chartTexts.datasets[3],
          data: databar3,
          backgroundColor: 'rgba(178,0,178,1)',
          yAxisID: 'y',
        },
        {
          label: chartTexts.datasets[4],
          data: databar4,
          backgroundColor: 'rgba(178,178,0,1)',
          yAxisID: 'y',
        },
        ]
      };
    
      const options = {
        responsive: true,
        devicePixelRatio: 2,
        maintainAspectRatio: false,
        interaction: {
          mode: 'index' as const,
          intersect: false,
        },
        stacked: false,
        plugins: {
          title: {
            display: true,
            text: chartTexts.title,
          },
          legend : {
            position : 'bottom'
          }
        },
        scales: {
          x: {
            stacked: true
          },
          y: {
            ticks: {
              callback: function(value: any, index : any, ticks : any) {
                  return commarize(value);
              }
            },
            title: {
              display: true,
              text: chartTexts.axis_y
            },
            type: 'linear' as const,
            display: true,
            position: 'left' as const,
            stacked: true
          },
          y1: {
            title: {
              display: true,
              text: chartTexts.axis_y2
            },
            type: 'linear' as const,
            display: true,
            position: 'right' as const,
            grid: {
              drawOnChartArea: false,
            },
            stacked: true
          },
        },
      };
    return (
    <ChartComponent type='bar' data={data} options={options as Object}/>
    )
}