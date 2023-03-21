export interface ElementsData {
    ID_ELEMENT:   number;
    ID_SECTION:   number;
    ELEMENT_NAME: string;
    ELEMENT_ES:   string;
    ELEMENT_PT:   string;
    UNIT:         string;
    ELEMENT_EN:   string;
    SECTION_NAME: string;
}

export interface MacroRegionsData {
    region_name:    string;
    region_name_es: string;
    region_name_pt: string;
    id_geo_regions: string[];
}

export interface RegionsData {
    id_macro_region: number;
    region_name:     string;
    region_name_es:  string;
    region_name_pt:  string;
}

export interface YearsData {
    YEAR: number
}

export interface SelectOptions {
    values: number[] | string[];
    names: string[];
}
