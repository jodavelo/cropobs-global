import { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';

interface Props {
    divContainer: string;
    geoJsonUrl: string;
}

export const GenericMapView = ({ divContainer, geoJsonUrl }: Props) => {
    mapboxgl.accessToken = 'pk.eyJ1IjoiY2lhdGttIiwiYSI6ImNraGdmbDZjejAxNTMycXBwNXppeHIyYjkifQ.Ucfm2G0KapInAojq6f9BZw';
    console.log(divContainer)
    // Create a new map.
    

    useEffect(() => {
        const map = new mapboxgl.Map({
            container: divContainer,
            // Choose from Mapbox's core styles, or make your own style with Mapbox Studio
            style: 'mapbox://styles/ciatkm/ckhgfstwq018818o06dqero91',
            zoom: 1,
            center: [-10.707019, -61.616079]
        });

        map.on('load', () => {
            // Add a source for the state polygons.
            map.addSource('countries', {
                'type': 'geojson',
                'data': geoJsonUrl
            });
            
            // Add a layer showing the state polygons.
            map.addLayer({
                    'id': 'states-layer',
                    'type': 'fill',
                    'source': 'countries',
                    'paint': {
                    'fill-color': 'rgba(167, 167, 167, 0.4)',
                    'fill-outline-color': 'rgba(167, 167, 167, 1)'
                }
            });
            
            // When a click event occurs on a feature in the states layer,
            // open a popup at the location of the click, with description
            // HTML from the click event's properties.
            map.on('click', 'states-layer', (e) => {
                new mapboxgl.Popup()
                .setLngLat(e.lngLat)
                // .setHTML(e.features[0].properties.name)
                .setHTML( e!.features![0].properties!.esp_name! )
                .addTo(map);
            });
            
            // Change the cursor to a pointer when
            // the mouse is over the states layer.
            map.on('mouseenter', 'states-layer', () => {
                map.getCanvas().style.cursor = 'pointer';
            });
            
            // Change the cursor back to a pointer
            // when it leaves the states layer.
            map.on('mouseleave', 'states-layer', () => {
                    map.getCanvas().style.cursor = '';
                });
            });
    })
    

    

    return (
        <div 
            id={ divContainer }
            style={{ 
                height: '100%',
                width: '100%',
            }}
        ></div>
    )
}
