import { RankingData } from "../../../interfaces/data/podium";

export const positionPodiumReplacer = (predata: RankingData[], text: string): string => {
    let position: string | number = -1;
    predata.forEach((entry: RankingData) => {if (entry.crop_name === 'Beans, dry' || entry.crop_name === 'Beans') position = entry.ranking});
    return text.replace('#{2}', position.toString());
}