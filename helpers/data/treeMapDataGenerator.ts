interface Observation {
    value: number;
    year: number;
    iso3_reporter: string;
    iso3_partner: string;
    id_crop: number;
    crop_name: string;
    crop_name_es?: any;
    crop_name_pt?: any;
    id_element: number;
    unit: string;
}

interface TreeMapData {
    type: string,
    labels: string[],
    parents: string[],
    values: number[],
    text: string[],
    hovertemplate: string,
    texttemplate: string,
    textposition: string,
    marker: Record<string, any>
}

export const treeMapDataGenerator = (rawData: Record<string, any>, iso3_role: string, localeName: string, totalValue: number): TreeMapData[] => {
    const data: TreeMapData[] = [{
        type: "treemap",
        labels: [],
        parents: [],
        values: [],
        text: [],
        hovertemplate:
                "<b>%{label}</b><br><br>" +
                "<b>%{text}%</b><br><br>" +
                "Value: %{value:$,.0f}<br>" +
                "<extra></extra>", 
        texttemplate: "%{label}<br>%{text}%",
        textposition: "middle center",
        marker: {"line": {"width": 2}}
    }];
    const countryIndex = rawData.data.country_index;

    rawData.data.observations.forEach( (entry: Observation) => {
        if (countryIndex[entry[iso3_role as keyof typeof entry]]) {
            data[0].labels.push(countryIndex[entry[iso3_role as keyof typeof entry]][localeName]);
            data[0].parents.push("");
            data[0].values.push(entry.value);
            data[0].text.push(((entry.value * 100) / totalValue).toFixed(2));
        }
    });

    return data;
}