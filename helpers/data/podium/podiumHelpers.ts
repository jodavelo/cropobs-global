import { ObjectDataStructureFetchApi, PodiumDataStructureFetchApi } from '../../../interfaces/data/podium';
import { removeCommasFromString } from '../../generalHelpers';


/**
    dataPodiumObject => {
        "ranking": 0,
        "crop_name": "Crop",
        "crop_name_es": "Cultivo",
        "crop_name_pt": "Crop pt",
        "logo_id": 0
    },
*/

export const toFindCropOfInterest = (dataFetched: PodiumDataStructureFetchApi, cropToFind: string): number => {
    let  numberRank: number = 0;
    const { data } = dataFetched;
    data.map( dataPodiumObject => {
        if( removeCommasFromString( cropToFind ).toLowerCase() === removeCommasFromString( dataPodiumObject.crop_name ).toLowerCase() ) numberRank = dataPodiumObject.ranking;
    } )
    return numberRank;
}