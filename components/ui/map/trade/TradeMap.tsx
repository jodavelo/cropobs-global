import { useEffect, useState, useRef, useContext } from 'react';
import mapboxgl, { GeoJSONSource, LngLatBoundsLike } from 'mapbox-gl';
import { v4 as uuidv4 } from 'uuid';
import { GenericMapContext } from '../../../../context/map/generic';
import useSWR from 'swr';
import { GeoJSONData, Data } from '../../../../interfaces/data/map';
import { dataFetcher } from '../../../../helpers/data';
import { FeatureCollection, GeoJsonProperties, Geometry } from 'geojson';
import { MapLegend } from '../legend/MapLegend';

interface Props {
    geoJsonURL: string
    adminIdsURL: string
    percentileURL: string
    quintilURL: string
    admin: string
    legendTitle: string
    elementUnit: string | null
    isMapView?: boolean
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

export const TradeMap = ({ geoJsonURL, adminIdsURL, percentileURL, quintilURL, admin, legendTitle, elementUnit, isMapView }: Props) => {
    mapboxgl.accessToken = 'pk.eyJ1IjoiY2lhdGttIiwiYSI6ImNraGdmbDZjejAxNTMycXBwNXppeHIyYjkifQ.Ucfm2G0KapInAojq6f9BZw';
    // Create a new map.
    const mapId ='trade-map';
    const mapDiv = useRef<HTMLDivElement>(null);
    const map = useRef<mapboxgl.Map>();
    const { setMap } = useContext( GenericMapContext );
    const [zoom, setZoom] = useState(0.5);
    const [lng, setLng] = useState(-13.7856);
    const [lat, setLat] = useState(0);
    const [loaded, setLoaded] = useState(false)
    let hoveredStateId: number | string | null = null; // This id is different to polygon id that is received from backend, this corresponds to id assigned by mapbox for to can paint it into tyle layer
    let clickedStateId: number | string | null = null;

    const { data: adminIds, isLoading: isLoadingAdminIds } = useSWR<String[]>(adminIdsURL, dataFetcher);
    const { data: predata, isLoading: isLoadingGeo, error: errorGeo } = useSWR<GeoJSONData>(geoJsonURL, dataFetcher);
    const { data: adminJsonValues, isLoading: isLoadingAdminJsonValues } = useSWR<AdminJsonData>( () => percentileURL + `&adminIds=${JSON.stringify( adminIds )}`, dataFetcher);
    const { data: quintilArray, isLoading: isLoadingQuintil } = useSWR<Number[]>( () => quintilURL + `?valuesArray=${JSON.stringify(adminJsonValues?.values)}`, dataFetcher);
    // const { data: adminIds, isLoading: isLoadingAdminIds } = useSWR<String[]>('https://commonbeanobservatorytst.ciat.cgiar.org/api/v1/data/adminIds/BEANS_TRADE_AUX/WLRD/WLRD/713999/2021?id_elements=["3001"]', dataFetcher);
    // const { data: predata, isLoading: isLoadingGeo, error: errorGeo } = useSWR<GeoJSONData>('https://commonbeanobservatorytst.ciat.cgiar.org/api/v1/geojson/countries/BEANS_TRADE_AUX/ISO3_REPORTER/713999', dataFetcher);
    //const { data: adminJsonValues, isLoading: isLoadingAdminJsonValues } = useSWR<AdminJsonData>( () => 'https://commonbeanobservatorytst.ciat.cgiar.org/api/v1/percentile/values/WLRD/data_avg_trade/3001/713999/2021?adminIds=' + `${JSON.stringify( adminIds )}&tradeFlow=2`, dataFetcher);
    //const { data: quintilArray, isLoading: isLoadingQuintil } = useSWR<Number[]>( () => 'https://commonbeanobservatorytst.ciat.cgiar.org/api/v1/percentile/heatmap' + `?valuesArray=${JSON.stringify(adminJsonValues?.values)}`, dataFetcher);

    useEffect(() => {
        console.log('https://commonbeanobservatorytst.ciat.cgiar.org/api/v1/percentile/values/WLRD/data_avg_trade/3001/713999/2021?adminIds=' + `${JSON.stringify( adminIds )}&tradeFlow=2`)
        const bounds: LngLatBoundsLike = [
            [-180, -90], // Southwest coordinates
            [180, 90] // Northeast coordinates
        ];
        if (map.current!) return;
        console.log('New map')
        map.current! = new mapboxgl.Map({
            container: mapDiv.current!, // container ID
            // Choose from Mapbox's core styles, or make your own style with Mapbox Studio
            style: 'mapbox://styles/ciatkm/ckhgfstwq018818o06dqero91', // style URL
            center: [lng, lat], // starting position
            zoom: zoom,
            maxBounds: bounds // starting zoom
        });
        map.current!.resize();
        // disable map rotation using right click + drag
        map.current!.dragRotate.disable();

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

            // For to set style of mouse when is hover on any polygon
            map.current!.on('mouseenter', 'country_layer', () => {
                map.current!.getCanvas().style.cursor = 'pointer';
            });

            
            //This function allow to draw a line around to polygon
            map.current!.on('mousemove', 'country_layer', (e) => {
                
                if (e.features?.length! > 0) {
                    //console.log({hoveredStateId,})
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

            // This function allow to return initial state of polygon that was set previously (without line around to bounds)
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

            // This function allow to change color of polyogn when is clicked
            map.current!.on('click', 'country_layer', (e) => {
                if (e.features?.length! > 0) {
                    console.log("on click");
                    console.log(clickedStateId)
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





            setLoaded(true)
        })
        
        // disable map rotation using touch rotation gesture
        map.current!.touchZoomRotate.disableRotation();
        setMap( map.current! )
    })

    useEffect( () => {
        if( !isLoadingGeo && loaded && !isLoadingAdminIds && !isLoadingQuintil && predata && !isLoadingAdminJsonValues) {
            console.log( quintilArray )
            const geojson = predata!.data
            //console.log( geojson + "=====================" );
            if (adminJsonValues?.adminJson) featureValueUpdate(geojson, adminJsonValues.adminJson);
            //console.log( "=====================" + geojson);
            (map.current!.getSource('geo_countries') as GeoJSONSource).setData(geojson as FeatureCollection<Geometry, GeoJsonProperties>);
            //console.log('in');
            map.current!.setFilter('country_layer', ['in', ['get', 'iso3'], ['literal', adminIds]]);
            map.current!.setFilter('country_layer_alter', ['!', ['in', ['get', 'iso3'], ['literal', adminIds]]]); 
            if (admin !== 'World' && adminIds) changeLineWidth(map.current!, adminIds);
            else if (adminIds) changeLineWidth(map.current!, adminIds, 'default');         
            changeFillColor(map.current!, quintilArray!);
        } 
   }, [isLoadingGeo, loaded, isLoadingAdminIds, isLoadingQuintil]);
    

    

    return (
        <>
            <div 
            ref={ mapDiv }
            style={{ 
                height: '100%',
                width: '100%',
            }}>
            </div>
            <MapLegend unit={ elementUnit! } title={ legendTitle } percentiles={quintilArray ?? Array(5).fill(0)} isMapViewProps={ isMapView } />
        </>
    )
}
