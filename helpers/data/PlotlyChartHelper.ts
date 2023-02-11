
import { Observations, Years, Labels } from "../../interfaces/data";

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

export const buildPlotStackedAreaObject = (observationsApi: Observations, labelsApi: Labels) => {
    let it: number = 2;
    let datasets: any[] = [];
    let dataArr: any = {};
    let names: any = {};
    let sorted: any[] = []
    let units: any = {};
    const { observations } = observationsApi;
    const { labels } = labelsApi;
    if( observations.length < 0 ) throw new Error('The array is empty');
    observations.map((observation, idx) => {
        idx = observation.id_crop;
        if( dataArr[`${ idx }`] === undefined) dataArr[`${ idx }`] = Array( labels.length ).fill( null );
        dataArr[`${ idx }`][ labels.indexOf( observation.year ) ] = observation.value;
        names[`${ idx }`] = observation.crop_name;
        units[ observation.crop_name  ] = observation.unit;
    })
    console.log(names);
    // names.map(nameObject => {

    // })
}