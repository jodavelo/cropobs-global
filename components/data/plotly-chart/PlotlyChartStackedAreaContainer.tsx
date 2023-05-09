import { FC, useEffect, useState } from 'react';
import { beansApi } from '../../../apis';
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
    yLabelShare
}) => {

    const [traces, setTraces] = useState([]);
    const [stackedAreaTraces, setStackedAreaTraces] = useState([]);
    const [ticks, setTicks] = useState<number[]>([]);
    const [selected, setSelected] = useState('0');
    const [dataJson, setDataJson] = useState<Object[]>([]);

    useEffect(() => {
        const algo = async() => {
        const response = await beansApi.get(fetchDataUrl);
        const { labels, observations } = response.data.data;
        setDataJson( response.data.data.observations );
        const datasets = buildPlotStackedAreaObject(observations, labels, cropNameToFind, secondCropName);
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
        algo();
        
    }, [fetchDataUrl])
    ///console.log({ selected })
    return (
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
    )
}
