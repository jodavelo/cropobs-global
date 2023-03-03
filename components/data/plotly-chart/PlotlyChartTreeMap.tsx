import { FC, useEffect, useState } from 'react';
import dynamic from "next/dynamic"

import { v4 as uuidv4 } from 'uuid';
import { traceObject } from ".";
import { useWindowSize } from '../../../hooks';
import useSWR from 'swr';
import { dataFetcher, treeMapDataGenerator } from '../../../helpers/data';

interface Props {
    dataURL: string;
    totalURL: string;
};

const layout = {
    hovermode: 'closest',
    autosize: true,
    margin: {
        l: 0,
        r: 0,
        b: 0,
        t: 10,
        pad: 2
    },
};

const config = {
    responsive: true,
    toImageButtonOptions: {
        filename: 'Sample text',
        width: 800,
        height: 600,
        format: 'png'
    },
    displayModeBar: true
}

export const PlotlyChartTreeMap: FC<Props> = ({ dataURL, totalURL }) => {
    const Plot = dynamic(() => import("react-plotlyjs-ts"), { ssr: false, });

    const { data: totalValue} = useSWR(totalURL, dataFetcher);
    const { data: predata, error, isLoading } = useSWR(dataURL, dataFetcher);

    if (error) return <div>Failed to load</div>
    if (isLoading) return <div>Loading...</div>

    const data = treeMapDataGenerator(predata, 'iso3_reporter', 'country_name', totalValue);

    return (
        <Plot
            key={ uuidv4() }
            data={ data }
            layout={ layout }
            config={ config }
        />
    );
}
