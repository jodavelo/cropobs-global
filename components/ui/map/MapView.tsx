import { useEffect, useRef, useContext, useState } from 'react';
import mapboxgl, { GeoJSONSource, Map } from 'mapbox-gl';
import { MapContext } from '../../../context/map';
import useSWR from 'swr';
import { dataFetcher } from '../../../helpers/data';
import { MapLegend } from './legend/MapLegend';
import { Data, GeoJSONData } from '../../../interfaces/data/map';
import { FeatureCollection, GeoJsonProperties, Geometry } from 'geojson';

interface Props {
    geoJsonURL: string
    adminIdsURL: string
    percentileURL: string
    quintilURL: string
    admin: string
    legendTitle: string
}

interface AdminJsonData {
    adminJson: Record<string, number>
    values: Number[]
}

const featureValueUpdate = (source: Data, newData: Record<string, number>) => {
   source.features.forEach( (feature) => {
      feature.properties.value = newData[feature.properties.iso3]
   });
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

const changeLineWidth = (map: mapboxgl.Map, adminIds: String[], mode='') => {
    const lineWidth = mode !== 'default' ? [
        'case',
        ['boolean', ['feature-state', 'hover'], false],
        2,
        ['all', ['boolean', ['feature-state', 'hover'], false], ['in', ['get', 'iso3'], ['literal', adminIds]]],
        1,
        ['in', ['get', 'iso3'], ['literal', adminIds]],
        1,
        0
    ] : 
    [
        'case',
        ['boolean', ['feature-state', 'hover'], false],
        2,
        1
    ];
    map.setPaintProperty('country_layer_line', 'line-width', lineWidth);
}

export const MapView = ({ geoJsonURL, adminIdsURL, percentileURL, quintilURL, admin, legendTitle='No title' }: Props) => {
    const mapDiv = useRef<HTMLDivElement>(null);
    const map = useRef<mapboxgl.Map | null>(null);
    const [lng, setLng] = useState(-13.7856);
    const [lat, setLat] = useState(0);
    const [zoom, setZoom] = useState(0.41);
    const [loaded, setLoaded] = useState(false)
    const { setMap } = useContext( MapContext );
    let hoveredStateId: number | string | null = null;
    let clickedStateId: number | string | null = null;

    const { data: predata, isLoading: isLoadingGeo, error: errorGeo } = useSWR<GeoJSONData>(geoJsonURL, dataFetcher);

    const { data: adminIds } = useSWR<String[]>(adminIdsURL, dataFetcher);
    const { data: adminJsonValues } = useSWR<AdminJsonData>( () => percentileURL + `&adminIds=${JSON.stringify( adminIds )}`, dataFetcher);
    const { data: quintilArray, isLoading: isLoadingQuintil } = useSWR<Number[]>( () => quintilURL + `?valuesArray=${JSON.stringify(adminJsonValues?.values)}`, dataFetcher);

    if (errorGeo) console.log('error')

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
            map.current!!.addSource('geo_countries', {
                type: 'geojson',
                data: undefined,
                generateId: true
            });
            map.current!.addLayer({
                id: 'country_layer',
                type: 'fill',
                source: 'geo_countries',
                paint: {
                    'fill-color': 'white',
                    'fill-opacity': 0.7
                }
            });
            map.current!.addLayer({
                id: 'country_layer_alter',
                type: 'fill',
                source: 'geo_countries',
                paint: {
                    'fill-color': [
                        'case',
                        ['boolean', ['feature-state', 'clicked'], false],
                        '#F89A21',
                        '#cccccc'
                    ],
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
                if (e.features?.length! > 0) {
                    console.log("on click");
                    if (clickedStateId == null) {
                        map.current!.setFeatureState(
                            { source: 'geo_countries', id: clickedStateId == null ? undefined : clickedStateId },
                            { clicked: true }
                        );
                    }
                    else {
                        map.current!.setFeatureState(
                            { source: 'geo_countries', id: clickedStateId},
                            { clicked: false }
                        );
                    }
                    clickedStateId = e.features![0].id ?? null;
                    map.current!.setFeatureState(
                        { source: 'geo_countries', id: clickedStateId == null ? undefined : clickedStateId },
                        { clicked: true }
                    );
                }
            });
            map.current!.on('mouseenter', 'country_layer_alter', () => {
                map.current!.getCanvas().style.cursor = 'pointer';
            });
            map.current!.on('mousemove', 'country_layer_alter', (e) => {
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
            map.current!.on('mouseleave', 'country_layer_alter', () => {
                if (hoveredStateId !== null) {
                    map.current!.setFeatureState(
                        { source: 'geo_countries', id: hoveredStateId},
                        { hover: false }
                    );
                }
                map.current!.getCanvas().style.cursor = '';
                hoveredStateId = null;
            });
            map.current!.on('click', 'country_layer_alter', (e) => {
                if (e.features?.length! > 0) {
                    if (clickedStateId == null) {
                        map.current!.setFeatureState(
                            { source: 'geo_countries', id: clickedStateId == null ? undefined : clickedStateId},
                            { clicked: true }
                        );
                    }
                    else {
                        map.current!.setFeatureState(
                            { source: 'geo_countries', id: clickedStateId},
                            { clicked: false }
                        );
                    }
                    clickedStateId = e.features![0].id ?? null;
                    map.current!.setFeatureState(
                        { source: 'geo_countries', id: clickedStateId == null ? undefined : clickedStateId },
                        { clicked: true }
                    );
                }
            });
            setLoaded(true);
        });
        setMap( map.current! );
    });

    useEffect( () => {
         console.log('Geo:'+isLoadingGeo+' '+'Quintil:'+isLoadingQuintil);
        if (!isLoadingGeo && !isLoadingQuintil && loaded && quintilArray && predata) {
            const { data: geojson } = predata;
            if (adminJsonValues?.adminJson) featureValueUpdate(geojson, adminJsonValues.adminJson);
            console.log(geojson);
            (map.current!.getSource('geo_countries') as GeoJSONSource).setData(geojson as FeatureCollection<Geometry, GeoJsonProperties>);
            console.log('in');
            map.current!.setFilter('country_layer', ['in', ['get', 'iso3'], ['literal', adminIds]]);
            map.current!.setFilter('country_layer_alter', ['!', ['in', ['get', 'iso3'], ['literal', adminIds]]]);
            if (admin !== 'World' && adminIds) changeLineWidth(map.current!, adminIds)
            else if (adminIds) changeLineWidth(map.current!, adminIds, 'default');
            changeFillColor(map.current!, quintilArray);
        }
    }, [adminIdsURL, isLoadingGeo, isLoadingQuintil, loaded]);

    return (
      <>
         <div 
            ref={ mapDiv }
            style={{ 
                height: '100%',
                width: '100%',
            }}
         >
         </div>
         {/* Unit should de passed as a prop. TODO */}
         <MapLegend title={legendTitle} percentiles={quintilArray ?? Array(5).fill(0)} />
      </>
    )
}
