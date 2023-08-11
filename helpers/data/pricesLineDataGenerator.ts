import { deepOrange } from "@mui/material/colors";

interface pricesLine {
    x: Date[],
    y: number[],
    type: string,
    name: string,
    connectgaps: boolean,
    showlegend: boolean,
    colorway: string,
}

const chartColors = {
    dark_red: '#4F0614',
    bean_orange2: '#F89A21',
    dark_pink: '#bd7071',
    //bean_orange: '#F57914',
    fair_green: '#6BAA75',
    purple: '#4D5382',
    dark_blue: '#1F7A8C',
    bean_red: '#A82F31',
    water_green: '#94E8B4',
    dark_green: '#679436',
    light_pink: '#E5D0E3',
    bright_brown: '#BD4F28',
    golden_brown: '#A86F0C',
    dark_salmon: '#F77E45',
    green_gray: '#8C9977',
    color_brown: '#85350B',
    rustic_green: '#73682C',
    marine_blue: '#79bcff',
    white: '#FFFFFF',
    gray: '#e3e3e3',
    light_yellow_bean: '#ffc985',
};

export const pricesLineDataGenerator = (inputData: Record<string, any>, currencyType: string): pricesLine[] => {

    //console.log(inputData);
    const data: pricesLine[] = [];
    inputData.cassava_types.forEach((type: Record<string, any>, index: number) => {
        const x: Date[] = [];
        const y: number[] = [];
        type.data.forEach((entry: Record<string, any>) => {
            x.push(new Date(entry.year, (entry.month - 1), 1));
            y.push(entry[currencyType]);
        });
        data.push({
            x,
            y,
            type: 'scatter',
            name: type.cassava_type,
            connectgaps: false,
            showlegend: true,
            colorway:  Object.values(chartColors)[index]

        });
        //console.log(data);    
        const trace1 = {
            x: [1, 2, 3, 4],
            y: [10, 15, 13, 17],
            type: 'scatter',
            line: {
                color: data[0].colorway
            }
          };
          
        const trace2 = {
            x: [1, 2, 3, 4],
            y: [16, 5, 11, 9],
            type: 'scatter',
            line: {
                color: data[1] ? data[1].colorway : deepOrange
            }
          };

          const inputData = data;
          //console.log(inputData)
    
    });
    return data;
}

export const pricesInternationalLineDataGenerator = (inputData: Record<string, any>): pricesLine[] => {

    //console.log(inputData);
    const data: pricesLine[] = [];
    inputData.data.forEach((type: Record<string, any>, index: number) => {
        const x: Date[] = [];
        const y: number[] = [];
        type.data.forEach((report: Record<string, any>) => {
            x.push(new Date(report.year, (report.month - 1), 1));
            y.push(report.average);
        });
        data.push({
            x,
            y,
            type: 'scatter',
            name: type.crop,
            connectgaps: false,
            showlegend: true,
            colorway:  Object.values(chartColors)[index]

        });
        console.log(data);    
        const trace1 = {
            x: [1, 2, 3, 4],
            y: [10, 15, 13, 17],
            type: 'scatter',
            line: {
                color: data[0].colorway
            }
          };
          
        const trace2 = {
            x: [1, 2, 3, 4],
            y: [16, 5, 11, 9],
            type: 'scatter',
            line: {
                color: data[1] ? data[1].colorway : deepOrange
            }
          };

          const inputData = data;
          //console.log(inputData)
    
    });
    return data;
}