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
export interface CitiesData {
    id_geo_point : number;
    id_country: number;
    id_geo_admin2: number;
    label: string
}

export interface CitiesDataInt {
    country_name: string
    country_name_es: string
    country_name_pt: string
    iso3: string
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

export interface ElementsState {
    elementsObj: Record<string, ElementsData>
    elementsOptions: SelectOptions
}

export interface YearsState {
    yearsOptions: SelectOptions
}

export interface MacroRegionsState {
    macroRegionsObj: Record<string, MacroRegionsData>
    macroRegionsOptions: SelectOptions
}

export interface RegionsState {
    regionsObj: Record<string, RegionsData>
    regionsOptions: SelectOptions
}

export interface TradeFlowState { 
    tradeFlowOptions: SelectOptions
}

export interface TradeElementState { 
    tradeElementOptions: SelectOptions
}
