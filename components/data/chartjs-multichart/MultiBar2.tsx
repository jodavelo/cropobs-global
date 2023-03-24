import { FC } from "react";
import { Chart as ChartComponent } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

interface Props {
    xLabels: number[],
    databar1: number[],
    databar2: number[],
    databar3: number[],
    datapoints: number[],
};

export const MultiBar2: FC<Props> = ({xLabels, datapoints, databar1, databar2, databar3}) => {
    const data = {
        labels: xLabels,
        datasets: [
          {
            label: 'Self-sufficiency ratio',
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
            data: datapoints.map((datum: any) => Math.round(datum * 1000) / 1000),
            yAxisID: 'y1',
          },
          {
          label: 'Dataset 1',
          data: databar1,
          backgroundColor: 'rgba(100,209,209,1)',
          yAxisID: 'y',
        },
        {
          label: 'Dataset 2',
          data: databar2,
          backgroundColor: 'rgba(178,178,178,1)',
          yAxisID: 'y',
        },
        {
          label: 'Dataset 3',
          data: databar3,
          backgroundColor: 'rgba(178,0,178,1)',
          yAxisID: 'y',
        },
        ]
      };
    
      const options = {
        responsive: true,
        aspectRatio: 1.9,
        interaction: {
          mode: 'index' as const,
          intersect: false,
        },
        stacked: false,
        plugins: {
          title: {
            display: true,
            text: 'Allocation of domestic beans supply - WORLD',
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
                return Math.round(value/100)/10 + 'k';
              }
            },
            title: {
              display: true,
              text: ''
            },
            type: 'linear' as const,
            display: true,
            position: 'left' as const,
            min: -5000,
            max: 30000,
            stacked: true
          },
          y1: {
            title: {
              display: true,
              text: ''
            },
            type: 'linear' as const,
            display: true,
            position: 'right' as const,
            grid: {
              drawOnChartArea: false,
            },
            min: 0.98,
            max: 1.07,
            stacked: true
          },
        },
      };
    return (
    <ChartComponent type='bar' data={data} options={options as Object}/>
    )
}