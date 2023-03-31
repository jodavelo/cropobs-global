import { FC } from "react";
import { Chart as ChartComponent } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
import { useRouter } from "next/router";
Chart.register(...registerables);

interface Props {
    xLabels: any[],
    data1: number[],
    data2: number[],
};

export const MultichartTr2: FC<Props> = ({xLabels, data1, data2}) => {
  const { locale } = useRouter();
  
  let title = "";
  switch (locale) {
      case 'en':
          title = "Imports of common beans - WORLD";
          break;
      case 'es':
          title = "Importaciones de common beans - MUNDO";
          break;
      case 'pt':
          title = "Importacao do common beans - MUNDO";
          break;
  }
  const data = {
        labels: xLabels,
        datasets: [
          {
            type: 'line' as const,
            label: 'Data1',
            fill: false, //rellenar area debajo de la curva
            lineTension: 0.3, // recta 0 -  curva 
            showLine: true, //mostrar linea
            backgroundColor: 'rgba(245, 40, 145, 0.8)', //Color area bajo la curva
            borderColor: 'rgba(245, 40, 145, 0.8)', //color curva
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
            label: 'data2',
            fill: false, //rellenar area debajo de la curva
            lineTension: 0.3, // recta 0 -  curva 
            showLine: true, //mostrar linea
            backgroundColor: 'rgba(78, 240, 86, 0.8)', //Color area bajo la curva
            borderColor: 'rgba(78, 240, 86, 0.8)', //color curva
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
            text: title,
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
              text: 'Value (USD) and Quantity (kg)'
            },
            type: 'linear' as const,
            display: true,
            position: 'left' as const,
            //min: 0,
            //max: 7000000000,
          },
        },
      };
    return (
    <ChartComponent type='line' data={data} options={options as Object}/>
    )
}