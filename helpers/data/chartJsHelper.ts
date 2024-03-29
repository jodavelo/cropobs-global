import { hexToRgbA } from "../hexToRgbA";

interface ItemNames {
    id: string,
    name: string
}

interface ChartjsConfig {
    fill: boolean,
    pointRadius: number,
    yAxisID: string,
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
}

const chartColorsPV = {
	bean_red: '#A82F31',
	dark_blue: '#1F7A8C',
    purple: '#4D5382',
    dark_red: '#4F0614',
	bean_orange2: '#F89A21',
	dark_pink: '#bd7071',
	//bean_orange: '#F57914',
	fair_green: '#6BAA75',
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
}

export const datasetGenerator = (entries: any[], labels: Number[], key_attr: string, locale_attr: string, orderList: Record<number, number>=[], chartID: string = '', config: ChartjsConfig = {fill: false, pointRadius: 1, yAxisID: 'y'}, elements: Record<any, any>): any[] => {
    
    const dataArr: Record<string, Number[]> = {};
    const items: ItemNames[] = [];
    const units: Record<string, string> = {};
    const datasets: any[] = [];


    entries.forEach( (entry: any, i: number) => {
        const key = entry[key_attr];
        if (!dataArr[`${key}`]){
            dataArr[`${key}`] = Array(labels.length).fill(null);
            const item = {id: key, name: key_attr === 'id_element' ? elements[key][locale_attr]: entry[locale_attr]};
            if (orderList[key] !== undefined) items[orderList[key]] = item;
            else items.push(item)
            units[`${key}`] = entry.unit;
        }
        dataArr[`${key}`][labels.indexOf(entry.year)] = entry.value;
    });

    items.forEach( (item, index) => {
        let dataObj;
        switch (true) {
            case (chartID === 'prod1' && item.id == '1000'):
                dataObj = {
                    label: item.name,
                    borderColor: Object.values(chartColors)[index],
                    backgroundColor: Object.values(chartColors)[index],
                    fill: false,
                    pointRadius: 3,
                    data: dataArr[item.id],
                    unit: units[item.id],
                    yAxisID: 'y2',
                    showLine: false
                };
                break;
            default:
                dataObj = {
                    label: item.name,
                    borderColor: Object.values(chartColors)[index],
                    backgroundColor: hexToRgbA(Object.values(chartColors)[index], 0.6),
                    fill: config.fill,
                    pointRadius: config.pointRadius,
                    data: dataArr[item.id],
                    yAxisID: config.yAxisID,
                    unit: units[item.id]
                };
                break;
        }
        datasets.push(dataObj);
    });
    console.log(datasets);
    return datasets;
}

export const datasetGeneratorPV = (entries: any[], labels: Number[], key_attr: string, locale_attr: string, orderList: Record<number, number>=[], chartID: string = '', config: ChartjsConfig = {fill: false, pointRadius: 1, yAxisID: 'y'}, elements: Record<any, any> = {}): any[] => {
    
    const dataArr: Record<string, Number[]> = {};
    const items: ItemNames[] = [];
    const units: Record<string, string> = {};
    const datasets: any[] = [];


    entries.forEach( (entry: any, i: number) => {
        const key = entry[key_attr];
        if (!dataArr[`${key}`]){
            dataArr[`${key}`] = Array(labels.length).fill(null);
            const item = {id: key, name: locale_attr === 'id_element' ? elements[key].ELEMENT_EN : entry[locale_attr]};
            if (orderList[key] !== undefined) items[orderList[key]] = item;
            else items.push(item)
            units[`${key}`] = entry.unit;
        }
        dataArr[`${key}`][labels.indexOf(entry.year)] = entry.value;
    });

    items.forEach( (item, index) => {
        let dataObj;
        switch (true) {
            case (chartID === 'prod1' && item.id == '1000'):
                dataObj = {
                    label: item.name,
                    borderColor: Object.values(chartColorsPV)[index],
                    backgroundColor: Object.values(chartColorsPV)[index],
                    fill: false,
                    pointRadius: 3,
                    data: dataArr[item.id],
                    unit: units[item.id],
                    yAxisID: 'y2',
                    showLine: false
                };
                break;
            default:
                dataObj = {
                    label: item.name,
                    borderColor: Object.values(chartColorsPV)[index],
                    backgroundColor: Object.values(chartColorsPV)[index],
                    fill: config.fill,
                    pointRadius: config.pointRadius,
                    data: dataArr[item.id],
                    yAxisID: config.yAxisID,
                    unit: units[item.id]
                };
                break;
        }
        datasets.push(dataObj);
    });
    //console.log(datasets);
    return datasets;
}

export const datasetGeneratorTr = (entries: any[], labels: Number[], key_attr: string, dataset_lbl: string[], orderList: Record<number, number>=[], chartID: string = '', config: ChartjsConfig = {fill: false, pointRadius: 1, yAxisID: 'y'}): any[] => {
    
    const dataArr: Record<string, Number[]> = {};
    const items: ItemNames[] = [];
    const units: Record<string, string> = {};
    const datasets: any[] = [];


    entries.forEach( (entry: any, i: number) => {
        const key = entry[key_attr];
        if (!dataArr[`${key}`]){
            dataArr[`${key}`] = Array(labels.length).fill(null);
            const item = {id: key, name: ''};
            if (orderList[key] !== undefined) items[orderList[key]] = item;
            else items.push(item)
            units[`${key}`] = entry.unit;
        }
        dataArr[`${key}`][labels.indexOf(entry.year)] = entry.value;
    });

    items.forEach( (item, index) => {
        let dataObj;
        switch (true) {
            case (chartID === 'prod1' && item.id == '1000'):
                dataObj = {
                    label: dataset_lbl[index],
                    borderColor: Object.values(chartColors)[index],
                    backgroundColor: Object.values(chartColors)[index],
                    fill: false,
                    pointRadius: 3,
                    data: dataArr[item.id],
                    unit: units[item.id],
                    yAxisID: 'y2',
                    showLine: false
                };
                break;
            default:
                dataObj = {
                    label: dataset_lbl[index],
                    borderColor: Object.values(chartColors)[index],
                    backgroundColor: Object.values(chartColors)[index],
                    fill: config.fill,
                    pointRadius: config.pointRadius,
                    data: dataArr[item.id],
                    yAxisID: config.yAxisID,
                    unit: units[item.id]
                };
                break;
        }
        datasets.push(dataObj);
    });
    console.log(datasets);
    return datasets;
}