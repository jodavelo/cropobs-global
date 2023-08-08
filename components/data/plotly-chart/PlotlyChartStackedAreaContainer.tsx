import { FC, useEffect, useState } from 'react';
import { beansApi, centralApi } from '../../../apis';
import { buildPlotStackedAreaObject, getYearsPlotlyChart } from '../../../helpers/data';
import { PlotlyChartStackedArea, PlotlyChartStackedAreaNormalized, traceObject } from './';

interface Props {
    fetchDataUrl: string;
    cropNameToFind: string;
    secondCropName: string;
    stackedAreaTitle?: string;
    stackedAreaNormalizedTitle?: string;
    namesArr: string[];
    stackedAreaID: string;
    stackedAreaNormalizedID: string;
    moreInfoTextStackedArea: string;
    moreInfoTextStackedArea2?: string;
    moreInfoTextStackedAreaNormalized: string;
    moreInfoTextStackedAreaNormalized2?: string;
    yLabelStackedArea?: string;
    yLabelShare?: string;
    locale?: string;
    errorSetter?: Function;
}

export const PlotlyChartStackedAreaContainer: FC<Props> = ({ 
    fetchDataUrl, 
    cropNameToFind, 
    secondCropName, 
    stackedAreaTitle, 
    stackedAreaNormalizedTitle, 
    namesArr, 
    stackedAreaID, 
    stackedAreaNormalizedID, 
    moreInfoTextStackedArea,
    moreInfoTextStackedArea2,
    moreInfoTextStackedAreaNormalized,
    moreInfoTextStackedAreaNormalized2,
    yLabelStackedArea,
    yLabelShare,
    locale,
    errorSetter = (error:boolean)=>{}
}) => {

    const [traces, setTraces] = useState([]);
    const [stackedAreaTraces, setStackedAreaTraces] = useState([]);
    const [ticks, setTicks] = useState<number[]>([]);
    const [selected, setSelected] = useState('0');
    const [dataJson, setDataJson] = useState<Object[]>([]);
    const [loadingPL, setLoadingPL] = useState(false);
    const [errorPL, setErrorPL] = useState(false);
    //const cropNameLocale = ;
    
    const generateJsonStackedAreaLocale = (observationsJson: { value: any; year: any; crop_name: any; unit: any; }[]) => {
        return observationsJson.map((observation: { value: any; year: any, crop_name: any, unit: any }) => (
            {
                value: observation.value, 
                year: observation.year,
                //TODO: Find a way to get dynamic property
                //@ts-ignore
                crop_name: observation[locale == 'en' ? `crop_name` : `crop_name_${locale}` ], 
                unit: observation.unit
            }))  
    }

    useEffect(() => {
        console.log('====================================================================', { locale })
        const algo = async() => {
            setLoadingPL(true)
            const response = await centralApi
                .get(fetchDataUrl)
                .catch((error) => {
                    setErrorPL(true)
                    return {data:{data:-1}}
                } );
            errorSetter(errorPL)
            if(response.data.data!== -1){
                const { labels, observations } = response.data.data;
                let localeObservations = generateJsonStackedAreaLocale(response.data.data.observations)
                setDataJson(localeObservations);
                const datasets = buildPlotStackedAreaObject(observations, labels, cropNameToFind, secondCropName, locale);
                console.log( datasets )
                const { ticks } = getYearsPlotlyChart( labels );
                setTicks(ticks);
                let dataArr: any = [];
                let dataArrStckedArea: any = [];
                datasets.map(dataset => {
                    //console.log(dataset.data)
                    const { y , fillcolor, marker, name, stackgroup, groupnorm } = dataset;
                    const trace: traceObject = {
                        x: labels,
                        y,
                        fillcolor, 
                        marker: {
                            color: marker.color
                        },
                        name, 
                        stackgroup, 
                        groupnorm,
                        hovertemplate: '%{y:,.2f}'
                    }
                    const stackedArea: traceObject = {
                        x: labels,
                        y,
                        fillcolor, 
                        marker: {
                            color: marker.color
                        },
                        name, 
                        stackgroup, 
                        hovertemplate: '%{y:,.2f}'
                    }
                    dataArr.push(trace)
                    dataArrStckedArea.push(stackedArea)
                });
                    setTraces(dataArr);
                    setStackedAreaTraces(dataArrStckedArea)
                }
        }
        algo();
        setLoadingPL(false)    
        
    }, [fetchDataUrl, locale])

     useEffect(() => {
        
        
    }, [fetchDataUrl])

    ///console.log({ selected })
    return (
        <>{!errorPL && !loadingPL ? 
            <div style={{maxWidth:'800px',margin:'auto'}}>
                <select
                    value={selected}
                    onChange={(e) => {
                        setSelected(e.target.value);
                    }}
                >
                    { namesArr.map( (value, index) => <option key={index} value={index}>{value}</option>)}
                </select>
                {
                    selected == '0' 
                        ? <PlotlyChartStackedArea plotlyDivId={ stackedAreaID } moreInfoText={ moreInfoTextStackedArea } moreInfoText2={ moreInfoTextStackedArea2 } dataTraces={ stackedAreaTraces } ticks={ ticks } title={ stackedAreaTitle! } yAxisLabel={ yLabelStackedArea! } plotlyDataJson={ dataJson } />
                        : <PlotlyChartStackedAreaNormalized  plotlyDivId={ stackedAreaNormalizedID } moreInfoText={ moreInfoTextStackedAreaNormalized } moreInfoText2={ moreInfoTextStackedAreaNormalized2 }  title={ stackedAreaNormalizedTitle! } ticks={ ticks } dataTraces={ traces } yLabel={yLabelShare}  />
                }
            </div>
        : <div>Error</div> }</>
    )
}
