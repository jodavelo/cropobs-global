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
    moreInfoTextStackedAreaNormalized: string;
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
    moreInfoTextStackedAreaNormalized,
    yLabelStackedArea,
    yLabelShare
}) => {

    const [traces, setTraces] = useState([]);
    const [stackedAreaTraces, setStackedAreaTraces] = useState([]);
    const [ticks, setTicks] = useState<number[]>([]);
    const [selected, setSelected] = useState('0');

    useEffect(() => {
        const algo = async() => {
        const response = await beansApi.get(fetchDataUrl);
        const { labels, observations } = response.data.data;
        //console.log({ labels, observations })
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
        <>
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
                    ? <PlotlyChartStackedArea plotlyDivId={ stackedAreaID } moreInfoText={ moreInfoTextStackedArea } dataTraces={ stackedAreaTraces } ticks={ ticks } title={ stackedAreaTitle! } yAxisLabel={ yLabelStackedArea! }/>
                    : <PlotlyChartStackedAreaNormalized  plotlyDivId={ stackedAreaNormalizedID } moreInfoText={ moreInfoTextStackedAreaNormalized } title={ stackedAreaNormalizedTitle! } ticks={ ticks } dataTraces={ traces } yLabel={yLabelShare}  />
            }
            
            
        </>
    )
}
