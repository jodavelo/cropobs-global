interface Trace {
    y: number[],
    x: number[],
    name: string,
    showlegend: boolean,
    type: string
}

export const boxDataGenerator = (inputData: Record<string, any>, currencyType: string) => {
    const trace: Trace = {
        y: [],
        x: [],
        name: inputData.group,
        showlegend: true,
        type: "box"
    }
    inputData.minAndMax.forEach( (entry: Record<string, number>, index: number) => {
        trace.y = [...trace.y, entry[`min_${currencyType}` as keyof typeof entry], inputData.medians[index][currencyType], entry[`max_${currencyType}` as keyof typeof entry]];
        trace.x = [...trace.x, ...Array(inputData.minAndMax.length).fill(entry.year)];
    });
    return [trace];
}