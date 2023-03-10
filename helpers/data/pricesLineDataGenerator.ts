interface pricesLine {
    x: Date[],
    y: number[],
    type: string,
    name: string,
    connectgaps: boolean,
    showlegend: boolean
}

export const pricesLineDataGenerator = (inputData: Record<string, any>, currencyType: string): pricesLine[] => {
    const data: pricesLine[] = [];
    inputData.cassava_types.forEach( (type: Record<string, any>) => {
        const x: Date[] = [];
        const y: number[] = [];
        type.data.forEach( (entry: Record<string, any>) => {
            x.push(new Date(entry.year, (entry.month - 1), 1));
            y.push(entry[currencyType]);
        });
        data.push({
            x,
            y,
            type: 'scatter',
            name: type.cassava_type,
            connectgaps: false,
            showlegend: true
        });
    });
    return data;
}