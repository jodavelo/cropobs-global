interface ItemNames {
    id: string,
    name: string
}

interface ChartjsConfig {
    fill: boolean,
    pointRadius: number,
    yAxisID: string,
}

export const datasetGenerator = (entries: any[], labels: Number[], key_attr: string, locale_attr: string, orderList: Record<number, number>=[], config: ChartjsConfig = {fill: false, pointRadius: 1, yAxisID: 'y'}): any[] => {
    
    const dataArr: Record<string, Number[]> = {};
    const items: ItemNames[] = [];
    const units: Record<string, string> = {};
    const datasets: any[] = [];


    entries.forEach( (entry: any, i: number) => {
        const key = entry[key_attr];
        if (!dataArr[`${key}`]){
            dataArr[`${key}`] = Array(labels.length).fill(0);
            const item = {id: key, name: entry[locale_attr]};
            if (orderList[key]) items[orderList[key]] = item;
            else items.push(item)
            units[`${key}`] = entry.unit;
        }
        dataArr[`${key}`][labels.indexOf(entry.year)] = entry.value;
    });

    items.forEach( (item) => {
        const dataObj = {
            label: item.name,
            borderColor: item.id == '4412' ? 'blue' : 'rgb(255, 99, 132)',
            backgroundColor: item.id == '4412' ? 'blue' : 'rgb(255, 99, 132)',
            fill: config.fill,
            pointRadius: config.pointRadius,
            data: item.id == '4412' ? dataArr[item.id].reverse() : dataArr[item.id],
            yAxisID: config.yAxisID,
            unit: units[item.id]
        };
        datasets.push(dataObj);
    });

    return datasets;
}