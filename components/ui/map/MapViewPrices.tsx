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
    setIdGeoPoint?: (data: number) => void;
}


export const MapViewPrices = ({ children, markers, setIdCountry, setIdGeoPoint }: Props) => {
    const mapDiv = useRef<HTMLDivElement>(null);
    const map = useRef<mapboxgl.Map | null>(null);
    const [lng, setLng] = useState(-70.9);
    const [lat, setLat] = useState(42.35);
    const [zoom, setZoom] = useState(1);
    let hoveredStateId: number | string | null = null;
    const { setMap } = useContext(MapContext);

    useEffect(() => {
        if (map.current) return;
        map.current = new Map({
            container: mapDiv.current!, // container ID            
            style: 'mapbox://styles/ciatkm/ckhgfstwq018818o06dqero91', // style URL            
            center: [lng, lat], // starting position [lng, lat]            
            zoom: zoom, // starting zoom            
            trackResize: true
        });
        setMap(map.current);
    });
    useEffect(() => {
        if (!map.current) return; // wait for map to initialize        
        map.current.on('move', () => {
            setLng(Number(map.current!.getCenter().lng.toFixed(4)));
            setLat(Number(map.current!.getCenter().lat.toFixed(4)));
            setZoom(Number(map.current!.getZoom().toFixed(2)));
        });
    });


    useEffect(() => {

        if (map.current?.getSource('earthquakes') != undefined) {
            map.current?.removeLayer('unclustered-point')
            map.current?.removeLayer('cluster-count')
            map.current?.removeLayer('clusters')
            map.current?.removeSource('earthquakes')
            map.current?.removeImage('custom-marker')
        }
        if (map.current && markers?.priceDataGeopoint && markers?.priceDataGeopoint.hasOwnProperty('features')) {
            map.current.loadImage(
                'https://docs.mapbox.com/mapbox-gl-js/assets/custom_marker.png',
                (error, image) => {
                    if (error) throw error;
                    map.current?.addImage('custom-marker', image!);
                })
            let datans = markers?.priceDataGeopoint
            map.current.addSource('earthquakes', {
                type: 'geojson',
                data: datans,
                generateId: true,
                cluster: true,
                clusterMaxZoom: 14,
                clusterRadius: 40
            });
            map.current.addLayer({
                id: 'clusters',
                type: 'circle',
                source: 'earthquakes',
                filter: ['has', 'point_count'],
                paint: {
                    'circle-color': '#A82F31',
                    'circle-radius': [
                        'step',
                        ['get', 'point_count'],
                        20,
                        100,
                        30,
                        750,
                        40]
                }
            });
            map.current.addLayer({
                id: 'cluster-count',
                type: 'symbol',
                source: 'earthquakes',
                filter: ['has', 'point_count'],
                layout: {
                    'text-field': ['get', 'point_count_abbreviated'],
                    'text-font': ['DIN Offc Pro Medium', 'Arial Unicode MS Bold'],
                    'text-size': 12
                }
            });
            map.current.addLayer({
                id: 'unclustered-point',
                type: 'symbol',
                source: 'earthquakes',
                filter: ['!', ['has', 'point_count']],
                layout: {
                    "icon-image": "custom-marker", //but monument-15 works
                    "text-field": "{title}",
                    "text-font": ["Open Sans Semibold", "Arial Unicode MS Bold"],
                    'icon-size': 0.6,
                    'text-offset': [0, 1.25],
                    "text-anchor": "top"
                }
            });
            map.current.on('mouseenter', 'clusters', () => {
                map.current!.getCanvas().style.cursor = 'pointer';
            });
            map.current.on('mouseleave', 'clusters', () => {
                if (hoveredStateId !== null) {
                    map.current!.setFeatureState(
                        { source: 'earthquakes', id: hoveredStateId },
                        { hover: false }
                    );
                }
                map.current!.getCanvas().style.cursor = '';
                hoveredStateId = null;
            });
            map.current.on('click', 'clusters', (e) => {
                const clusterId = e.features![0].properties!.cluster_id;
                const clusterSource: any = map.current?.getSource('earthquakes');

                clusterSource.getClusterExpansionZoom(clusterId, (err: any, zoom: any) => {
                    if (err) {
                        return;
                    }

                    map.current?.easeTo({
                        center: e.lngLat,
                        zoom: zoom,
                    });

                    map.current!.getCanvas().style.cursor = '';
                });
            });
            map.current.on('mouseenter', 'unclustered-point', () => {
                map.current!.getCanvas().style.cursor = 'pointer';
            });
            map.current.on('mouseleave', 'unclustered-point', () => {
                if (hoveredStateId !== null) {
                    map.current!.setFeatureState(
                        { source: 'earthquakes', id: hoveredStateId },
                        { hover: false }
                    );
                }
                map.current!.getCanvas().style.cursor = '';
                hoveredStateId = null;
            });

            map.current.on('click', 'unclustered-point', (e) => {
                let id_country = e.features![0].properties?.id_country
                let id_geo_point = e.features![0].properties?.id_geo_point
                setIdCountry?.(id_country)
                setIdGeoPoint?.(id_geo_point)
            });
        }

    }, [markers])

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