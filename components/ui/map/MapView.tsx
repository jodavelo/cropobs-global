import { useEffect, useRef, useContext } from 'react';
import { Map } from 'mapbox-gl';
import { MapContext } from '../../../context/map';
import { LeftSideMenuContainer } from './filters';
import { LeftSideMenuProvider } from '../../../context/map/leftsidemenu';

interface Props {
    children?: JSX.Element | JSX.Element[]
}

export const MapView = ({ children }: Props) => {
    const mapDiv = useRef<HTMLDivElement>(null);
    const { setMap } = useContext( MapContext );

    useEffect(() => {
        const map = new Map({
            container: mapDiv.current!, // container ID
            style: 'mapbox://styles/ciatkm/ckhgfstwq018818o06dqero91', // style URL
            center: [-74.5, 40], // starting position [lng, lat]
            zoom: 2, // starting zoom
            trackResize: true
            });
        setMap( map );
        
        map.on('load', () => {
            map.resize();
        })

    }, [  ])

    return (
        <div 
            ref={ mapDiv }
            style={{ 
                height: '100%',
                width: '100%',
            }}
        >
            { children }
        </div>
    )
}
