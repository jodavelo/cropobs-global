interface RankingData {
    ranking: number,
    crop_name: string,
    crop_name_es: string,
    crop_name_pt: string,
    logo_id: number,
    year?: number;
}

const rankArr = [
    {pos: 1, heightBar: '100%', heightTransparentBar: '0%'},
    {pos: 0, heightBar: '80%', heightTransparentBar: '20%'},
    {pos: 2, heightBar: '65%', heightTransparentBar: '35%'},
    {pos: 3, heightBar: '40%', heightTransparentBar: '60%'}
];

const getRankObj = (ranking: number) => ranking <= 4 ? rankArr[ranking-1] : rankArr[3];

const reFactorData = (data: RankingData[]) => {
    const newData = Array(0)
    data.forEach((elem:any)=> {if(elem !== undefined) newData.push(elem)})
    return newData
}

export const podiumDataProcess = (predata: RankingData[]) => {

    const data = Array(predata.length);
    predata.forEach( (entry: RankingData) => {
        const { pos, heightBar, heightTransparentBar } = getRankObj(entry.ranking);
        if ( typeof data[pos] !== "undefined"){
            data[pos+2]= {
                rank: entry.ranking+1,
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
export const podiumDataProcessTrans = (predata: RankingData[], locale: string) => {
    /*
    const data = Array(predata.length);
    predata.forEach( (entry: RankingData) => {
        const { pos, heightBar, heightTransparentBar } = getRankObj(entry.ranking);
        if ( typeof data[pos] !== "undefined"){
            data[pos+2]= {
                rank: entry.ranking+1,
                cropName: locale=='en' ? entry.crop_name : locale=='es' ? (entry.crop_name_es ?? 'Sin traducción') : (entry.crop_name_pt ?? 'Sem tradução'),
                keyName: entry.crop_name,
                urlIcon: `https://commonbeanobservatorytst.ciat.cgiar.org/images/icons/100px/icon-crops-${entry.logo_id}.png`,
                heightBar,
                heightTransparentBar,
                color:  'rgb(181, 181, 181)'
            };
        }
        else{
            data[pos]= {
                rank: entry.ranking,
                cropName: locale=='en' ? entry.crop_name : locale=='es' ? (entry.crop_name_es ?? 'Sin traducción') : (entry.crop_name_pt ?? 'Sem tradução'),
                keyName: entry.crop_name,
                urlIcon: `https://commonbeanobservatorytst.ciat.cgiar.org/images/icons/100px/icon-crops-${entry.logo_id}.png`,
                heightBar,
                heightTransparentBar,
                color:  'rgb(181, 181, 181)'
            };
        }
      */ 
        const data = Array(0);
        predata.forEach( (entry: RankingData, idx: number) => {
            const { pos, heightBar, heightTransparentBar } = getRankObj(entry.ranking);
            data.push({
                rank: entry.ranking,
                cropName: locale=='en' ? entry.crop_name : locale=='es' ? (entry.crop_name_es ?? 'Sin traducción') : (entry.crop_name_pt ?? 'Sem tradução'),
                keyName: entry.crop_name,
                urlIcon: `https://commonbeanobservatorytst.ciat.cgiar.org/images/icons/100px/icon-crops-${entry.logo_id}.png`,
                heightBar,
                heightTransparentBar,
                color:  'rgb(181, 181, 181)'
            })
            if (idx === 1){
                data.push(data.splice(0,1)[0]) 
            }
             
    });
    return reFactorData(data);
}

export const getColorByDataProcessed = ( data: any[] ) => {
    let dataProcessed: any[] = [];
    data.map( ( object, idx ) => {
        switch (idx) {
            case 0:
                object.color = '#F89A21';
                dataProcessed.push( object )
                break;
            case 1:
                object.color = '#a82f31';
                dataProcessed.push( object )
                break;
            case 2:
                object.color = '#A86F0C';
                dataProcessed.push( object )
                break;
            default:
                object.color = '#BD4F28';
                dataProcessed.push( object )
                break;
        }
    })
    return dataProcessed;
}

export const podiumDataProcessDownload = (predata: RankingData[], year: number) => {
    let data: Object[] = [];
    predata.map( e => {
        let rank = {
            year,
            crop_name: e.crop_name,
            crop_name_es: e.crop_name_es,
            crop_name_pt: e.crop_name_pt,
            rank: e.ranking
        }
        data.push( rank )
    })
    return data;
}