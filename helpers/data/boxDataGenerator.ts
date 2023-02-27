interface Trace {
    y: number[],
    x: number[],
    name: string,
    showlegend: boolean,
    type: string
}

export const boxDataGenerator = (inputData: Record<string, any>, currencyType: string): Trace[] => {
    const data: Trace[] = [];
    inputData.forEach( (group: Record<string, any>) => {
        const trace: Trace = {
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
        data.push(trace);
    });
    return data;
}