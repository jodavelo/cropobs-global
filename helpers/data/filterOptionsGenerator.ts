export const generateElementsOptions = (data, locale_attr, mapFilterElements) => {
    const options = { values: [], names: [] };
    data.forEach( (value, index) => {
        if (mapFilterElements.includes(value.ID_ELEMENT)){
            options.values.push(value.ID_ELEMENT);
            options.names.push(value[locale_attr]);
        }
    });
    return options;
}

export const generateYearsOptions = (data) => {
    const options = { values: [], names: [] };
    data.forEach( (value, index) => {
        options.values.push(value.YEAR);
        options.names.push(value.YEAR.toString());
    });
    return options;
}

export const generateOptionsFromObj = (data, value_attr, name_attr, useKey=false) => {
    const options = { values: [], names: [] };
    Object.keys(data).forEach( (key, index) => {
        if (!useKey){
            options.values.push(data[key][value_attr]);
            options.names.push(data[key][name_attr]);
        }
        else {
            options.values.push(key);
            options.names.push(data[key][name_attr]);
        }
    });
    return options;
}

export const generateRegionOptions = (data, name_attr, filterList) => {
    const options = {values: [], names: []};
    filterList.forEach((value, index) => {
        if (data[value]){
            options.values.push(value);
            options.names.push(data[value][name_attr]);
        }
    });
    return options;
}