import Index from "../../pages";

interface Trace {
    y: number[],
    x: number[],
    name: string,
    showlegend: boolean,
    type: string,
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

export const boxDataGenerator = (inputData: Record<string, any>, currencyType: string): Trace[] => {
    const data: Trace[] = [];
    const y0: number[] = [];
    const y1: number[] = [];
    inputData.forEach( (group: Record<string, any>, index: number) => {
        const years: number[] = [];
        const xdata: number[] = [];
        group.minAndMax.forEach((minMax: { [x: string]: number; year: number; }, i: string | number)=>{
            console.log(group.medians[i],'asas');
            xdata.push(minMax[`min_${currencyType}`])
            xdata.push(group.medians[i][`${currencyType}`])
            xdata.push(minMax[`max_${currencyType}`])
            //
            years.push(minMax.year)
            years.push(minMax.year)
            years.push(minMax.year)
        })
        data.push({
            y: xdata,
            x:years,
            type: 'box',
            name: group.group,
            showlegend: true,
            colorway:  Object.values(chartColors)[index]
        }
        )
/*         const trace: Trace = {
            y: [],
            x: [],
            name: group.group,
            showlegend: true,
            type: "box"
        }
        group.minAndMax.forEach( (entry: Record<string, number>, index: number) => {
            trace.y = [...trace.y, entry[`min_${currencyType}` as keyof typeof entry], group.medians[index][currencyType], entry[`max_${currencyType}` as keyof typeof entry]];
            trace.x = [...trace.x, ...Array(group.minAndMax.length).fill(entry.year)];
        });
        data.push(trace); */
       for (var i = 0; i < 50; i ++) {
                y0[i] = Math.random();
                y1[i] = Math.random() + 1;
            }

            const trace1 = {
                y: y0,
                type: 'box'
            };
        
            const trace2 = {
                y: y1,
                type: 'box'
            };
            //console.log(trace1);
            const inputData = data;

        });
    return data;
}

export const boxInternationalDataGenerator = (inputData: Record<string, any>, currencyType: string): Trace[] => {
    const data: Trace[] = [];
    const y0: number[] = [];
    const y1: number[] = [];
    console.log(data)
    inputData.data.forEach( (crop_type: Record<string, any>, index: number) => {
        const years: number[] = [];
        const xdata: number[] = [];
        crop_type.minsAndMaxs.forEach((minMax: { [x: string]: number; year: number; }, i: string | number)=>{
            // console.log(rice_type.medians[i],'asas');
            xdata.push(minMax[`min`])
            xdata.push(crop_type.medians[i].median)
            xdata.push(minMax[`max`])
            //
            years.push(minMax.year)
            years.push(minMax.year)
            years.push(minMax.year)
        })
        data.push({
            y: xdata,
            x:years,
            type: 'box',
            name: crop_type.crop_type,
            showlegend: true,
            colorway:  Object.values(chartColors)[index]
        }
        )
        
       for (var i = 0; i < 50; i ++) {
                y0[i] = Math.random();
                y1[i] = Math.random() + 1;
            }

            const trace1 = {
                y: y0,
                type: 'box'
            };
        
            const trace2 = {
                y: y1,
                type: 'box'
            };
            //console.log(trace1);
            const inputData = data;

        });
    return data;
}