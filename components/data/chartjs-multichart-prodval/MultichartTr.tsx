import { FC } from "react";
import { Chart as ChartComponent } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
import { useRouter } from "next/router";
Chart.register(...registerables);

interface ChartTexts {
  title: string,
  axis_x : string,
  axis_y : string,
  datasets: string[]
}

interface Props {
    xLabels: any[],
    data1: number[],
    data2: number[],
    data3: number[],
    data4: number[],
    chartTexts: ChartTexts
};

export const MultichartTr: FC<Props> = ({xLabels, data1, data2, data3, data4, chartTexts}) => {
  const { locale } = useRouter();
  const data = {
        labels: xLabels,
        datasets: [
          {
            type: 'line' as const,
            label: chartTexts.datasets[0],
            fill: true, //rellenar area debajo de la curva
            lineTension: 0.3, // recta 0 -  curva 
            showLine: false, //mostrar linea
            backgroundColor: '#4F0614', //Color area bajo la curva
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
            pointHoverBackgroundColor: '#4F0614',
            pointHoverBorderColor: '#4F0614',
            pointHoverBorderWidth: 2,
            //pointRadius: 1,
            pointHitRadius: 10,
            data: data1
          },
          {
            type: 'line' as const,
            label: chartTexts.datasets[1],
            fill: true, //rellenar area debajo de la curva
            lineTension: 0.3, // recta 0 -  curva 
            showLine: false, //mostrar linea
            backgroundColor: '#F89A21', //Color area bajo la curva
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
            pointHoverBackgroundColor: '#F89A21',
            pointHoverBorderColor: '#F89A21',
            pointHoverBorderWidth: 2,
            //pointRadius: 1,
            pointHitRadius: 10,
            data: data2
          },
          {
            type: 'line' as const,
            label: chartTexts.datasets[2],
            fill: true, //rellenar area debajo de la curva
            lineTension: 0.3, // recta 0 -  curva 
            showLine: false, //mostrar linea
            backgroundColor: '#bd7071', //Color area bajo la curva
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
            pointHoverBackgroundColor: '#bd7071',
            pointHoverBorderColor: '#bd7071',
            pointHoverBorderWidth: 2,
            //pointRadius: 1,
            pointHitRadius: 10,
            data: data3
          },
          {
            type: 'line' as const,
            label: chartTexts.datasets[3],
            fill: true, //rellenar area debajo de la curva
            lineTension: 0.3, // recta 0 -  curva 
            showLine: false, //mostrar linea
            backgroundColor: '#6BAA75', //Color area bajo la curva
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
            pointHoverBackgroundColor: '#6BAA75',
            pointHoverBorderColor: '#6BAA75',
            pointHoverBorderWidth: 2,
            //pointRadius: 1,
            pointHitRadius: 10,
            data: data4
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
          y: {
            stacked: true,
            ticks: {
              callback: function(value: any, index : any, ticks : any) {
                if(value < 1000000){
                  return Math.round(value/100)/10 + 'k';
                }
                else {
                  return Math.round(value/100000)/10 + 'M';
                } 
              }
            },
            title: {
              display: true,
              text: chartTexts.axis_y
            },
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
      <div style={{position: 'relative', height: '400px', maxWidth: '800px'}}>
        <ChartComponent type='line' data={data} options={options as Object}/>
      </div>
    )
}