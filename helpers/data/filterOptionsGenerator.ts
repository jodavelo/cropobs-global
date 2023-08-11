import { ElementsData, RegionsData, SelectOptions, YearsData, CitiesData, CitiesDataInt } from "../../interfaces/data";

export const generateElementsOptions = (data: ElementsData[], locale_attr: string, mapFilterElements: Number[]) => {
    const options: SelectOptions = { values: [], names: [] };
    data.forEach( (value, index) => {
        if (mapFilterElements.includes(value.ID_ELEMENT)){
            options.values.push(value.ID_ELEMENT as never);
            options.names.push(value[locale_attr as keyof typeof value] as never);
        }
    });
    return options;
}

export const generateCitiesOptions = (data:  CitiesData[], locale_attr: string) => {
    const options: SelectOptions = { values: [], names: [] };
    console.log(data);
    data.forEach( (value, index) => {
            options.values.push(value.id_geo_point as never);
            options.names.push(value.label as never);
    });
    return options;
}

export const generateCitiesOptionsInt = (data:  CitiesDataInt[], locale_attr: string) => {
    const options: SelectOptions = { values: [], names: [] };
    console.log(data);
    data.forEach( (value, index) => {
            options.values.push(value.iso3 as never);
            options.names.push(value.country_name as never);
    });
    return options;
}

export const generateYearsOptions = (data: YearsData[]) => {
    const options = { values: [], names: [] };
    data.forEach( (value, index) => {
        options.values.push(value.YEAR as never);
        options.names.push(value.YEAR.toString() as never);
    });
    return options;
}

export const generateYearsOptionsConsumption = (data: YearsData[]) => {
    const options = { values: [], names: [] };
    data.forEach( (value, index) => {
        if(value.YEAR< 2020){
            options.values.push(value.YEAR as never);
            options.names.push(value.YEAR.toString() as never);
        }
    });
    return options;
}

export const generateOptionsFromObj = (data: Record<string, any>, value_attr: string, name_attr: string, useKey=false) => {
    const options = { values: [], names: [] };
    Object.keys(data).forEach( (key, index) => {
        if (!useKey){
            options.values.push(data[key][value_attr] as never);
            options.names.push(data[key][name_attr] as never);
        }
        else {
            options.values.push(key as never);
            options.names.push(data[key][name_attr] as never);
        }
    });
    return options;
}

export const generateRegionOptions = (data: Record<string, RegionsData>, name_attr: string, filterList: string[]) => {
    const options = {values: [], names: []};
    filterList.forEach((value, index) => {
        if (data[value]){
            options.values.push(value as never);
            options.names.push(data[value][name_attr as keyof typeof data[typeof value]] as never);
        }
    });
    return options;
}