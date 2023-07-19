import { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';

interface Props {
    divContainer: string;
    geoJsonUrl: string;
    onMapClick: (id: string, iso3: string, countryName: string, countryNameEs: string, countryNamePt: string) => void; 
    polygonColors: { fill: string, outline: string };
    onReset: boolean;
    // selectedCountry: string | null;
}

export const GenericMapView = ({ divContainer, geoJsonUrl, onMapClick, polygonColors, onReset }: Props) => {
    mapboxgl.accessToken = 'pk.eyJ1IjoiY2lhdGttIiwiYSI6ImNraGdmbDZjejAxNTMycXBwNXppeHIyYjkifQ.Ucfm2G0KapInAojq6f9BZw';
    const [mapInstance, setMapInstance] = useState<mapboxgl.Map | null>(null);
    const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
    //(divContainer)
    // Create a new map.
    

    useEffect(() => {
        const map = new mapboxgl.Map({
            container: divContainer,
            // Choose from Mapbox's core styles, or make your own style with Mapbox Studio
            style: 'mapbox://styles/ciatkm/ckhgfstwq018818o06dqero91',
            zoom: 0.4,
            center: [-10.707019, -61.616079]
        });

        setMapInstance(map);
        map.dragRotate.disable();
        map.touchZoomRotate.disableRotation();
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
                    'fill-color': polygonColors.fill,
                    'fill-outline-color': polygonColors.outline
                }
            });
            
            // When a click event occurs on a feature in the states layer,
            // open a popup at the location of the click, with description
            // HTML from the click event's properties.
            // map.on('click', 'states-layer', (e) => {
            //     new mapboxgl.Popup()
            //     .setLngLat(e.lngLat)
            //     // .setHTML(e.features[0].properties.name)
            //     .setHTML( e!.features![0].properties!.esp_name! )
            //     .addTo(map);
                
            // });
            map.on('click', 'states-layer', (e) => {
                const properties = e!.features![0].properties!;
                //( properties )
                const id = properties.id; // Supongamos que 'id' es el nombre de la propiedad
                const iso3 = properties.iso3; // Supongamos que 'iso3' es el nombre de la propiedad
                const countryName = properties.country_name;
                const countryNameEs = properties.country_name_es;
                const countryNamePt = properties.country_name_pt;
                onMapClick(id, iso3, countryName, countryNameEs, countryNamePt ); // Llama a la función con el id y el iso3  
                // if (selectedCountry) {
                //     map.setPaintProperty('states-layer', 'fill-color', ['match', ['get', 'iso3'], selectedCountry, '#FF0000', '#00FF00']);
                //     map.setPaintProperty('states-layer', 'fill-outline-color', ['match', ['get', 'iso3'], selectedCountry, '#000000', '#FFFFFF']);
                // }
                setSelectedCountry(iso3);
                
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
            
        }   );
            
    }, [])


    useEffect(() => {
        //('=======================================================',{selectedCountry, onReset})
        if (selectedCountry && mapInstance) {
            mapInstance.setPaintProperty('states-layer', 'fill-color', 
                ['match', 
                    ['get', 'iso3'], 
                    selectedCountry, 
                    'rgba(0, 153, 51, 0.4)', // color when there is a match
                    'rgba(167, 167, 167, 0.4)' // default color
                ]);
            mapInstance.setPaintProperty('states-layer', 'fill-outline-color', 
                ['match', 
                    ['get', 'iso3'], 
                    selectedCountry, 
                    'black', // color when there is a match
                    'rgba(167, 167, 167, 1)' // default color
                ]);
        } 
        if( onReset ) {
            if (mapInstance && mapInstance.isStyleLoaded()) {
                // Set all polygons back to the default color
                //('valeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee', {selectedCountry})
                mapInstance.setPaintProperty('states-layer', 'fill-color', 'rgba(167, 167, 167, 0.4)');
                mapInstance.setPaintProperty('states-layer', 'fill-outline-color', 'rgba(167, 167, 167, 1)');
            }
        }
    }, [selectedCountry, mapInstance, onReset]);
  
    

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
