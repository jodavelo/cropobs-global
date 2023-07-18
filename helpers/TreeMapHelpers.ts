import { ISeries } from "../components/data/treemap/TreeMapExample";

interface CountryIndex {
    country_name: string;
    esp_name: string;
    pt_name: string;
    iso3: string;
  }
  
interface Observation {
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

export interface ResponseData {
    data: {
        iso3_reporter: string;
        id_element: number;
        country_name: string;
        section: number;
        variable: string;
        country_index: Record<string, CountryIndex>;
        labels: string;
        observations: Observation[];
    };
}
  
  
type Data = {
    country_index: Record<string, CountryIndex>;
    observations: Observation[];
};
  
export const processJson = (data: Data, globalFlag: string) => {
    const { country_index, observations } = data;

    const englishData: ISeries[] = [];
    const spanishData: ISeries[] = [];
    const portugueseData: ISeries[] = [];

    observations.forEach((observation) => {
        const country = globalFlag === "WLRD" ? country_index[observation.iso3_reporter] : country_index[observation.iso3_partner];
        if (country) {
        englishData.push({ name: country.country_name, data: [{ x: country.country_name, y: observation.value }] });
        spanishData.push({ name: country.esp_name, data: [{ x: country.esp_name, y: observation.value }] });
        portugueseData.push({ name: country.pt_name, data: [{ x: country.pt_name, y: observation.value }] });
        }
    });

    return { englishData, spanishData, portugueseData };
}
  