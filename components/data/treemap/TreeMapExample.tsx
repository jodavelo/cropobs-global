import React, { FC, useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { ApexOptions } from 'apexcharts';
import { ResponseData, processJson } from '../../../helpers';
import { useRouter } from 'next/router';

// Dynamic import to prevent server-side rendering issues with ApexCharts
const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

export interface ISeries {
    name: string;
    data: IData[];
  }
  
export interface IData {
    x: string;
    y: number;
} 

const calculateTotal = (series: ISeries[]) => {
    let total = 0;
    series.forEach(item => {
      item.data.forEach(dataItem => {
        total += dataItem.y;
      });
    });
    return total;
}

interface Props {
    dataUrl: string;
    iso3Code: string;
}

export const MyTreeMap: FC<Props> = ({ dataUrl, iso3Code }) => {

    const [englishData, setEnglishData] = useState<ISeries[]>([]);
    const [spanishData, setSpanishData] = useState<ISeries[]>([]);
    const [portugueseData, setPortugueseData] = useState<ISeries[]>([]);
    const [series, setSeries] = useState<ISeries[]>([]);
    const { locale } = useRouter();

    useEffect(() => {
        fetch(dataUrl)
        .then((response) => response.json())
        .then((data: ResponseData) => {
            const { englishData, spanishData, portugueseData } = processJson(data.data, iso3Code);
            setEnglishData(englishData);
            setSpanishData(spanishData);
            setPortugueseData(portugueseData);     
            switch ( locale ) {
                case 'en':
                    setSeries( englishData )
                    break;
                case 'es':
                    setSeries( spanishData )
                    break;
                default:
                    setSeries( portugueseData )
                    break;
            }
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    }, [ dataUrl ]);

    useEffect(() => {
        switch ( locale ) {
            case 'en':
                setSeries( englishData )
                break;
            case 'es':
                setSeries( spanishData )
                break;
            default:
                setSeries( portugueseData )
                break;
        }
    }, [ locale ])
    

    // console.log(series)

    // const [series, setSeries] = useState<ISeries[]>([
    //     {
    //       name: 'New Delhi',
    //       data: [{ x: 'New Delhi', y: 218 }],
    //     },
    //     {
    //       name: 'Kolkata',
    //       data: [{ x: 'Kolkata', y: 149 }],
    //     },
    //     {
    //       name: 'Bangalore',
    //       data: [{ x: 'Bangalore', y: 184 }],
    //     },
    //     {
    //       name: 'Hyderabad',
    //       data: [{ x: 'Hyderabad', y: 85 }],
    //     },
    //     {
    //       name: 'Ahmedabad',
    //       data: [{ x: 'Ahmedabad', y: 45 }],
    //     },
    //     {
    //       name: 'Bangalore',
    //       data: [{ x: 'Bangalore', y: 21 }],
    //     },
    //     {
    //       name: 'Hyderabad',
    //       data: [{ x: 'Hyderabad', y: 19 }],
    //     },
    //   ]);
      
    // const total = calculateTotal(series);
    // console.log(total)
    const options = {
        chart: {
            type: 'treemap',
        },
        dataLabels: {
            enabled: true,
            formatter: function(val: number, opts: any) {
                // console.log(val)
                const total = opts.w.globals.seriesTotals.reduce((a: number, b: number) => a + b, 0);
                const percentage = (opts.w.globals.series[opts.seriesIndex] / total) * 100;
                return `${val} (${percentage.toFixed(2)}%)`;
            },
            style: {
                fontSize: '12px',
                fontFamily: 'Helvetica, Arial, sans-serif',
                fontWeight: 'bold',
            },
        },
        colors: ['#008FFB', '#00E396', '#FEB019', '#FF4560', '#775DD0'],
        legend: {
            show: false
        }
    }


    return (
        <Chart
            options={options as any}
            series={series}
            type="treemap"
            height={350}
        />
    );
};

