import { useEffect, useState } from 'react';
import mapboxgl, { LngLatBoundsLike } from 'mapbox-gl';
import { v4 as uuidv4 } from 'uuid';

export const TradeMap = () => {
    mapboxgl.accessToken = 'pk.eyJ1IjoiY2lhdGttIiwiYSI6ImNraGdmbDZjejAxNTMycXBwNXppeHIyYjkifQ.Ucfm2G0KapInAojq6f9BZw';
    // Create a new map.
    const mapId ='trade-map';
    const [zoom, setZoom] = useState(0.5);
    
    useEffect(() => {
        const bounds: LngLatBoundsLike = [
            [-180, -90], // Southwest coordinates
            [180, 90] // Northeast coordinates
        ];
        const map = new mapboxgl.Map({
            container: mapId, // container ID
            // Choose from Mapbox's core styles, or make your own style with Mapbox Studio
            style: 'mapbox://styles/mapbox/light-v11', // style URL
            center: [-68.137343, 45.137451], // starting position
            zoom: 5 // starting zoom
        });
        
    }, [])
    

    

    return (
        <div 
            id={ mapId }
            style={{ 
                height: '100%',
                width: '100%',
            }}
        ></div>
    )
}
