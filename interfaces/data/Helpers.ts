

export interface Years {
    ticks: number[];
}

export interface Labels {
    labels: number[];
}

export interface Observation {
    value: number;
    year: number;
    id_crop: number;
    crop_name: string;
    crop_name_es: string;
    crop_name_pt: string;
    id_element: number;
    unit: string;
}

export interface Observations {
    observations: any[];
}