
export interface ObjectDataStructureFetchApi {
    ranking: number;
    crop_name: string;
    crop_name_es: string;
    crop_name_pt: string;
    logo_id: number;
}

export interface PodiumDataStructureFetchApi {
    data: ObjectDataStructureFetchApi[];
}

export interface RankingData {
    ranking: number,
    crop_name: string,
    crop_name_es: string,
    crop_name_pt: string,
    logo_id: number,
    year?: number;
}