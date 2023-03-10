import { useEffect, useRef, useContext, useState } from 'react';
import mapboxgl, { Map } from 'mapbox-gl';
import { MapContext } from '../../../context/map';
import { LeftSideMenuContainer } from './filters';
import { LeftSideMenuProvider } from '../../../context/map/leftsidemenu';

interface Props {
    children?: JSX.Element | JSX.Element[]
}

export const MapView = ({ children }: Props) => {
    const mapDiv = useRef<HTMLDivElement>(null);
    const map = useRef<mapboxgl.Map | null>(null);
    const [lng, setLng] = useState(-70.9);
    const [lat, setLat] = useState(42.35);
    const [zoom, setZoom] = useState(1);
    const { setMap } = useContext( MapContext );

    useEffect(() => {
        if (map.current) return;
        map.current = new Map({
            container: mapDiv.current!, // container ID
            style: 'mapbox://styles/ciatkm/ckhgfstwq018818o06dqero91', // style URL
            center: [lng, lat], // starting position [lng, lat]
            zoom: zoom, // starting zoom
            trackResize: true
        });
        setMap( map.current );
    });

    useEffect(() => {
        if (!map.current) return; // wait for map to initialize
        map.current.on('move', () => {
            setLng(Number(map.current!.getCenter().lng.toFixed(4)));
            setLat(Number(map.current!.getCenter().lat.toFixed(4)));
            setZoom(Number(map.current!.getZoom().toFixed(2)));
        });
    });

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
