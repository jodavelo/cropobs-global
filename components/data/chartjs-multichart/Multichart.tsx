import { FC } from "react";
import { Chart as ChartComponent } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

interface Props {
    xLabels: number[],
    dataProd: number[],
    dataYield: number[],
    dataHarv: number[],
};

export const Multichart: FC<Props> = ({xLabels, dataProd, dataHarv, dataYield}) => {
    const data = {
        labels: xLabels,
        datasets: [
          {
            type: 'line' as const,
            label: 'Harvested Area',
            fill: true, //rellenar area debajo de la curva
            lineTension: 0.3, // recta 0 -  curva 
            showLine: false, //mostrar linea
            backgroundColor: 'rgba(75,192,192,0.4)', //Color area bajo la curva
            //borderColor: 'rgba(75,192,192,1)', //color curva
            //borderCapStyle: 'butt', //final de curva (recta, redondeada, cuadrada)
            //borderDash: [],//punteo de linea
            //borderDashOffset: 0.0,
            //borderJoinStyle: 'round', // forma de picos (cortados, curvos, punta)
            pointRadius: 0,
            //pointBorderColor: 'rgba(75,192,192,1)',
            //pointBackgroundColor: '#fff',
            //pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: 'rgba(75,192,192,1)',
            pointHoverBorderColor: 'rgba(220,220,220,1)',
            pointHoverBorderWidth: 2,
            //pointRadius: 1,
            pointHitRadius: 10,
            data: dataHarv
          },
          {
            type: 'line' as const,
            label: 'Yield',
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
            data: dataYield.map((datum: any) => Math.round(datum * 100) / 100),
            yAxisID: 'y1',
          },
          {
            type: 'line' as const,
            label: 'Production',
            fill: false, //rellenar area debajo de la curva
            lineTension: 0.3, // recta 0 -  curva 
            showLine: true, //mostrar linea
            backgroundColor: 'rgba(11, 186, 220,0.4)', //Color area bajo la curva
            borderColor: 'rgba(11, 186, 220,1)', //color curva
            //borderCapStyle: 'butt', //final de curva (recta, redondeada, cuadrada)
            //borderDash: [],//punteo de linea
            //borderDashOffset: 0.0,
            //borderJoinStyle: 'round', // forma de picos (cortados, curvos, punta)
            pointRadius: 0,
            //pointBorderColor: 'rgba(75,192,192,1)',
            //pointBackgroundColor: '#fff',
            //pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: 'rgba(75,192,192,1)',
            pointHoverBorderColor: 'rgba(220,220,220,1)',
            pointHoverBorderWidth: 2,
            //pointRadius: 1,
            pointHitRadius: 10,
            data: dataProd
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
            text: 'Harvested area, production and yield - World',
          },
          legend : {
            position : 'bottom'
          }
        },
        scales: {
          y: {
            ticks: {
              callback: function(value: any, index : any, ticks : any) {
                  return Math.round(value/100000)/10 + 'M';
              }
            },
            title: {
              display: true,
              text: 'Production (ton) and area (ha)'
            },
            type: 'linear' as const,
            display: true,
            position: 'left' as const,
            min: 0,
            max: 40000000,
          },
          y1: {
            title: {
              display: true,
              text: 'Yield (ton/ha)'
            },
            type: 'linear' as const,
            display: true,
            position: 'right' as const,
            grid: {
              drawOnChartArea: false,
            },
            min: 0,
            max: 0.9,
          },
        },
      };
    return (
    <ChartComponent type='line' data={data} options={options as Object}/>
    )
}