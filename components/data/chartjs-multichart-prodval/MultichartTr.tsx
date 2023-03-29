import { FC } from "react";
import { Chart as ChartComponent } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
import { useRouter } from "next/router";
Chart.register(...registerables);

interface Props {
    xLabels: any[],
    data1: number[],
    data2: number[],
    data3: number[],
    data4: number[],
};

export const MultichartTr: FC<Props> = ({xLabels, data1, data2, data3, data4}) => {
  const { locale } = useRouter();
  let title = "";
  switch (locale) {
      case 'en':
          title = "Value of imports by type of beans - WORLD";
          break;
      case 'es':
          title = "Valor de las importaciones por tipo de frijol - MUNDO";
          break;
      case 'pt':
          title = "Valor do importaciones por feijol - MUNDO";
          break;
  }  
  const data = {
        labels: xLabels,
        datasets: [
          {
            type: 'line' as const,
            label: 'Data1',
            fill: true, //rellenar area debajo de la curva
            lineTension: 0.3, // recta 0 -  curva 
            showLine: false, //mostrar linea
            backgroundColor: 'rgba(245, 40, 145, 0.8)', //Color area bajo la curva
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
            label: 'data2',
            fill: true, //rellenar area debajo de la curva
            lineTension: 0.3, // recta 0 -  curva 
            showLine: false, //mostrar linea
            backgroundColor: 'rgba(78, 240, 86, 0.8)', //Color area bajo la curva
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
            label: 'data3',
            fill: true, //rellenar area debajo de la curva
            lineTension: 0.3, // recta 0 -  curva 
            showLine: false, //mostrar linea
            backgroundColor: 'rgba(78, 222, 240, 0.8)', //Color area bajo la curva
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
            label: 'data4',
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
            stacked: true,
          },/*
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
          */
        },
      };
    return (
    <ChartComponent type='line' data={data} options={options as Object}/>
    )
}