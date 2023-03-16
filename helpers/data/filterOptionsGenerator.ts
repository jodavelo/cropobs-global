export const generateElementsObject = (data, locale_attr, mapFilterElements) => {
    const options = { values: [], names: [] };
    data.map( (value, index) => {
        if (mapFilterElements.includes(value.ID_ELEMENT)){
            options.values.push(value.ID_ELEMENT);
            options.names.push(value[locale_attr]);
        }
    });
    return options;
}