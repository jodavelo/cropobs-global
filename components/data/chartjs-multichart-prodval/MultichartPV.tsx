import { FC } from "react";
import { Chart as ChartComponent } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

interface Props {
    xLabels: number[],
    data1: number[],
    data2: number[],
    data3: number[],
    data4: number[],
};

export const MultichartPV: FC<Props> = ({xLabels, data1, data2, data3, data4}) => {
    const data = {
        labels: xLabels,
        datasets: [
          {
            type: 'line' as const,
            label: 'Beans',
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
            data: data1
          },
          {
            type: 'line' as const,
            label: 'Pulses',
            fill: true, //rellenar area debajo de la curva
            lineTension: 0.3, // recta 0 -  curva 
            showLine: false, //mostrar linea
            backgroundColor: 'rgba(128, 128, 128,0.4)', //Color area bajo la curva
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
            data: data2
          },
          {
            type: 'line' as const,
            label: 'Agriculture',
            fill: true, //rellenar area debajo de la curva
            lineTension: 0.3, // recta 0 -  curva 
            showLine: false, //mostrar linea
            backgroundColor: 'rgba(11, 186, 220,0.5)', //Color area bajo la curva
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
            data: data3
          },
          {
            type: 'line' as const,
            label: 'Crops',
            fill: true, //rellenar area debajo de la curva
            lineTension: 0.3, // recta 0 -  curva 
            showLine: false, //mostrar linea
            backgroundColor: 'rgba(75,192,192,0.9)', //Color area bajo la curva
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
            data: data4
          },
          ///****************///
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
            text: 'Gross Production Value',
          },
          legend : {
            position : 'bottom'
          }
        },
        scales: {
          y: {
            ticks: {
              callback: function(value: any, index : any, ticks : any) {
                  return Math.round(value/100000000)/10 + 'B';
              }
            },
            title: {
              display: true,
              text: 'Thousand of dollar (USD)'
            },
            type: 'linear' as const,
            display: true,
            position: 'left' as const,
            min: 0,
            max: 7000000000,
          },
        },
      };
    return (
    <ChartComponent type='line' data={data} options={options as Object}/>
    )
}