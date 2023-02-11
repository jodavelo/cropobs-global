import { useEffect, useLayoutEffect, useRef } from 'react';
import { Map } from 'mapbox-gl';

export const MapView = () => {
    const mapDiv = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const map = new Map({
            container: mapDiv.current!, // container ID
            style: 'mapbox://styles/ciatkm/ckhgg16y61fot19nlo5sbe9el', // style URL
            center: [-74.5, 40], // starting position [lng, lat]
            zoom: 2, // starting zoom
            });
    }, [  ])

    return (
        <div 
            ref={ mapDiv }
            style={{ 
                height: '100%',
                width: '100%',
            }}
        >MapView</div>
    )
}
