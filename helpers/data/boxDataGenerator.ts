import Index from "../../pages";

interface Trace {
    y: number[],
    x: number[],
    name: string,
    showlegend: boolean,
    type: string
}

export const boxDataGenerator = (inputData: Record<string, any>, currencyType: string): Trace[] => {
    const data: Trace[] = [];
    const y0: number[] = [];
    const y1: number[] = [];
    inputData.forEach( (group: Record<string, any>) => {
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