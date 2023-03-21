export interface GeoJSONData {
    data: Data;
}

export interface Data {
    type:     string;
    features: Feature[];
}

export interface Feature {
    type:       FeatureType;
    properties: Properties;
    geometry:   Geometry;
}

export interface Geometry {
    type:        GeometryType;
    coordinates: Array<Array<Array<number[] | number>>>;
}

export enum GeometryType {
    MultiPolygon = "MultiPolygon",
    Polygon = "Polygon",
}

export interface Properties {
    country_name:    string;
    country_name_es: string;
    country_name_pt: null | string;
    point:           number[];
    iso3:            string;
    border:          boolean;
    value?:          number;
}

export enum FeatureType {
    Feature = "Feature",
}
