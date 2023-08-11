export interface TradeApiResponse {
    data: TradeData;
}

export interface TradeData {
    iso3_reporter: string;
    id_element: number;
    country_name: string;
    section: number;
    variable: string;
    country_index: Record<string, TradeCountryIndexEntry>;
    labels: string;
    observations: TradeObservation[];
}

export interface TradeCountryIndexEntry {
    country_name: string;
    esp_name: string;
    pt_name: string | null;
    iso3: string;
}

export interface TradeObservation {
    value: number;
    year: number;
    iso3_reporter: string;
    iso3_partner: string;
    id_crop: number;
    crop_name: string;
    crop_name_es: string | null;
    crop_name_pt: string | null;
    id_element: number;
    unit: string;
}