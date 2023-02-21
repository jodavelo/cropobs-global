
import { Years, Observation } from "../../interfaces/data";
import { beanColors } from "../";
import { traceObject } from "../../components/data";

export const getYearsPlotlyChart = (years: number[]): Years => {
    if( years.length < 0 ) throw new Error('The array is empty');
    let ticks: number[]  = [];
    years.map((year, idx) => {
        let tick = idx % 5 === 0 ? year : idx === years.length - 1 ? year : -1;
        if( tick !== -1 ) ticks.push( tick )
    })
    return {
        ticks
    }
}


export const buildPlotStackedAreaObject = (observationsApi: Observation[], labels: number[], crop: string, cropAux?: string): traceObject[] => {
    let it: number = 2;
    let datasets: any[] = [];
    let dataArr: any = {};
    let names: any = {};
    let sorted: any[] = []
    let units: any = {};
    if( observationsApi.length < 0 ) throw new Error('The array is empty');
    observationsApi.map((observation, idx) => {
        idx = observation.id_crop;
        if( dataArr[`${ idx }`] === undefined) dataArr[`${ idx }`] = Array( labels.length ).fill( null );
        dataArr[`${ idx }`][ labels.indexOf( observation.year ) ] = observation.value;
        names[`${ idx }`] = observation.crop_name;
        units[ observation.crop_name  ] = observation.unit;
    })
    for( const key in names ) {
       // console.log( names[key] )
        if( names[key] !== crop && names[key] !== cropAux ) sorted.push( [key, names[key], Math.max(...dataArr[key]) ] );
        else {
            if( names[key] === crop ) sorted.push([ key, names[key], 2000000000 ]);
            else if ( names[key] === cropAux ) sorted.push([ key, names[key], 1000000000 ]);
        }
    }
    sorted.sort(function (a, b) {
        return b[2] - a[2];
    });
    //console.log(sorted)
    sorted.map((object, idx) => {
        let colorCalc = Object.values( beanColors )[it % Object.values( beanColors ).length ];
        let newElem = {
            name: sorted[idx][1],
            fillColor: sorted[idx][1][1] === crop ? '#A82F31' : sorted[idx][1][1] === cropAux ? '#F89A21' : colorCalc,
            marker: {
                color: sorted[idx][1][1] === crop ? '#A82F31' : sorted[idx][1][1] === cropAux ? '#F89A21' : colorCalc
            },
            fill: true,
            pointRadius: 1,
            y: dataArr[sorted[idx][0]],
            yAxisID: 'y-axis-1',
            unit: units[sorted[idx][1][1]],
            stackgroup: 'one',
            groupnorm: 'percent'
        }
        datasets.push( newElem );
        it++;
    })
    return datasets;
}
//'Beans, dry' ? '#A82F31' : sorted[idx][1][1] === 'Pulses excl. Beans'