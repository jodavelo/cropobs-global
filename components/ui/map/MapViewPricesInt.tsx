import { useEffect, useRef, useContext, useState } from 'react';
import mapboxgl, { Map, Marker, GeoJSONSource } from 'mapbox-gl';
import { MapContext } from '../../../context/map';
import { LeftSideMenuContainer } from './filters';
import { LeftSideMenuProvider } from '../../../context/map/leftsidemenu';
import { FeatureCollection, GeoJsonProperties, Geometry } from 'geojson';

export interface Feature {
    type: FeatureType;
    properties: Properties;
    geometry: Geometry;
}
export interface Properties {
    id_geo_point: number;
    id_country: number;
    id_geo_admin2: number;
    label: string;
}
export enum FeatureType {
    Feature = "Feature",
}
export interface marker {
    priceDataGeopoint: Feature
}
interface Props {
    children?: JSX.Element | JSX.Element[]
    markers?: marker
    features?: Feature
    setIdCountry?: (data: number) => void;
    setCountryName?: (data: string) => void;
    setIdGeoPoint?: (data: number) => void;
}

const changeFillColor = (map: mapboxgl.Map, steps: Number[]) => {
    const fillColor = [
        'case',
        ['boolean', ['feature-state', 'clicked'], false],
        '#F89A21',
        ['==', ['get', 'value'], null],
        'white',
        ['step', ['get', 'value'],
           '#E4A0A1', steps[1],
           '#DB8081', steps[2],
           '#D26062', steps[3],
           '#C94042', steps[4],
           '#A82F31'
        ]
    ];
    map.setPaintProperty('country_layer', 'fill-color', fillColor);
}


export const MapViewPricesInt = ({ children, setIdCountry, setCountryName }: Props) => {
    const mapDiv = useRef<HTMLDivElement>(null);
    const map = useRef<mapboxgl.Map | null>(null);
    const [lng, setLng] = useState(-70.9);
    const [lat, setLat] = useState(42.35);
    const [zoom, setZoom] = useState(1);
    const { setMap } = useContext(MapContext);
    const [loaded, setLoaded] = useState(false)
    let hoveredStateId: number | string | null = null;
    let clickedStateId: number | string | null = null;

    useEffect(() => {
        if (!map.current) return; // wait for map to initialize        
        map.current.on('move', () => {
            setLng(Number(map.current!.getCenter().lng.toFixed(4)));
            setLat(Number(map.current!.getCenter().lat.toFixed(4)));
            setZoom(Number(map.current!.getZoom().toFixed(2)));
        });
    });


    useEffect(() => {
        if (map.current!) return;
        console.log('creating new map canvas');
        map.current! = new Map({
            container: mapDiv.current!, // container ID
            style: 'mapbox://styles/ciatkm/ckhgfstwq018818o06dqero91', // style URL
            center: [lng, lat], // starting position [lng, lat]
            zoom: zoom, // starting zoom
            // trackResize: true
        });
        map.current!.on('load', () => {
            map.current!.addSource('geo_countries', {
                type: 'geojson',
                data: '/api/international-prices',
                generateId: true
        });
            map.current!.addLayer({
                id: 'country_layer',
                type: 'fill',
                source: 'geo_countries',
                paint: {
                    'fill-color': '#A82F31',
                    'fill-opacity': 0.7
                }
            });
            map.current!.addLayer({
                id: 'country_layer_line',
                type: 'line',
                source: 'geo_countries',
                paint: {
                    'line-color': 'black',
                    'line-width': [
                        'case',
                        ['boolean', ['feature-state', 'hover'], false],
                        2,
                        1
                    ]
                }
            });
            map.current!.on('mouseenter', 'country_layer', () => {
                map.current!.getCanvas().style.cursor = 'pointer';
            });
            map.current!.on('mousemove', 'country_layer', (e) => {
                if (e.features?.length! > 0) {
                    if (hoveredStateId !== null) {
                        map.current!.setFeatureState(
                            { source: 'geo_countries', id: hoveredStateId},
                            { hover: false }
                        );
                    }
                    hoveredStateId = e.features![0].id ?? null;
                    map.current!.setFeatureState(
                        { source: 'geo_countries', id: hoveredStateId == null ? undefined : hoveredStateId },
                        { hover: true }
                    );
                }
            });
            map.current!.on('mouseleave', 'country_layer', () => {
                if (hoveredStateId !== null) {
                    map.current!.setFeatureState(
                        { source: 'geo_countries', id: hoveredStateId},
                        { hover: false }
                    );
                }
                map.current!.getCanvas().style.cursor = '';
                hoveredStateId = null;
            });
            map.current!.on('click', 'country_layer', (e) => {

                setIdCountry?.(e.features![0].properties?.id_country)
                setCountryName?.(e.features![0].properties?.country_name)
                
            });
        });
        setMap( map.current! );
    });

    return (
        <div
            ref={mapDiv}
            style={{
                height: '100%',
                width: '100%',
            }}
        >
            {children}
        </div>
    )
}