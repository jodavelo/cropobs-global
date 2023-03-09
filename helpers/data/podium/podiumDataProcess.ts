interface RankingData {
    ranking: number,
    crop_name: string,
    crop_name_es: string,
    crop_name_pt: string,
    logo_id: number
}

const rankArr = [
    {pos: 1, heightBar: '100%', heightTransparentBar: '0%'},
    {pos: 0, heightBar: '80%', heightTransparentBar: '20%'},
    {pos: 2, heightBar: '65%', heightTransparentBar: '35%'},
    {pos: 3, heightBar: '40%', heightTransparentBar: '60%'}
];

const getRankObj = (ranking: number) => ranking <= 4 ? rankArr[ranking-1] : rankArr[3];

export const podiumDataProcess = (predata: RankingData[]) => {

    const data = Array(predata.length);
    predata.forEach( (entry: RankingData) => {
        const { pos, heightBar, heightTransparentBar } = getRankObj(entry.ranking);
        if ( typeof data[pos] !== "undefined"){
            data[pos+2]= {
                rank: entry.ranking,
                cropName: entry.crop_name,
                urlIcon: `https://commonbeanobservatorytst.ciat.cgiar.org/images/icons/100px/icon-crops-${entry.logo_id}.png`,
                heightBar,
                heightTransparentBar,
                color:  'rgb(181, 181, 181)'
            };
        }
        else{
            data[pos]= {
                rank: entry.ranking,
                cropName: entry.crop_name,
                urlIcon: `https://commonbeanobservatorytst.ciat.cgiar.org/images/icons/100px/icon-crops-${entry.logo_id}.png`,
                heightBar,
                heightTransparentBar,
                color:  'rgb(181, 181, 181)'
            };
        }
        
    });
    return data;
}