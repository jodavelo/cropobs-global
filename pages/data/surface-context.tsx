import { useState, useEffect, useContext } from 'react'
import { GetStaticProps, NextPage } from 'next';
import { Col, Container, Row } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import 'bootstrap/dist/css/bootstrap.min.css';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { Layout } from '../../components/layouts'
import { MainBar, MapView, SidebarComponent } from '../../components/ui';

import { v4 as uuidv4 } from 'uuid';

import styles from './data.module.css';
import { MapContext } from '../../context/map';
import { LeftSideMenuContext } from '../../context/map/leftsidemenu';
import { LeftSideMenuContainer } from '../../components/ui/map/filters';
import { dataFetcher, generateElementsOptions, generateOptionsFromObj, generateRegionOptions, generateYearsOptions, removeDuplicateObjects } from '../../helpers/data';
import useSWR from 'swr';
import { MapSelect } from '../../components/ui/map/filters';
import { ElementsData, MacroRegionsData, PercentInfoProps, RegionsData, SelectOptions, YearsData } from '../../interfaces/data';
import { PodiumWithLink } from '../../components/data/podium';
import { PercentContainer } from '../../components/data/percent-info';
import { PlotlyChartStackedAreaContainer } from '../../components/data';
import { beansApi } from '../../apis';


interface sectionState {
    elementId: number
    regionCode: string
    macroRegionCode: string
    countryCode: string
    year: number
    admin: string
}

interface ElementsState {
    elementsObj: Record<string, ElementsData>
    elementsOptions: SelectOptions
}

interface YearsState {
    yearsOptions: SelectOptions
}

interface MacroRegionsState {
    macroRegionsObj: Record<string, MacroRegionsData>
    macroRegionsOptions: SelectOptions
}

interface RegionsState {
    regionsObj: Record<string, RegionsData>
    regionsOptions: SelectOptions
}

const mapFilterElements = [1201, 1202];
const regionsElementId = {1201:1201, 1202:1202, 1060:1154, 1059:1153, 58:152, 5510:5510, 1000:1000, 5312:5312, 645:14, 6:6, 7:7};
const baseURL = 'https://commonbeanobservatorytst.ciat.cgiar.org';
let clickId: string | number | null = null;

const MapTest: NextPage = () => {
    const { t: dataTranslate } = useTranslation('data');
    const [ sectionState, setSectionState ] = useState<sectionState>({
        elementId: 1201,
        regionCode: 'WLRD',
        macroRegionCode: '10',
        countryCode: 'WLRD',
        year: 2020,
        admin: 'World'
    });
    const { elementId, regionCode, year, admin, macroRegionCode } = sectionState;
    const [onAverageIndicator, setOnAverageIndicator] = useState(0);
    const [indicators, setIndicators] = useState<PercentInfoProps[]>([]);
    const [elementsState, setElements] = useState<ElementsState>({
        elementsObj: {},
        elementsOptions: { values: [], names: []}
    });
    const { elementsObj, elementsOptions } = elementsState;
    const [yearsState, setYears] = useState<YearsState>({ yearsOptions: {values: [], names: []}});
    const { yearsOptions } = yearsState;
    const [macroRegionsState, setMacroRegions] = useState<MacroRegionsState>({
        macroRegionsObj: {},
        macroRegionsOptions: { values: [], names: []}
    });
    const { macroRegionsOptions, macroRegionsObj } = macroRegionsState;
    const [regionsState, setRegions] = useState<RegionsState>({
        regionsObj: {},
        regionsOptions: { values: [], names: []}
    });
    const { regionsOptions, regionsObj } = regionsState;
    const { buttonBoth, buttonGraphs, buttonMap } = useContext( LeftSideMenuContext );
    const { map } = useContext( MapContext );
    const [mapCol, setMapCol] = useState(0);
    const [graphsCol, setGraphsCol] = useState(0);
    const [showMap, setShowMap] = useState(false);
    const [showGraphs, setShowGraphs] = useState(false);

    const { data: elementsData, isLoading: isLoadingElements } = useSWR<ElementsData[]>(`${baseURL}/api/v1/data/elements/1`, dataFetcher);

    const { data: yearsData, isLoading: isLoadingYears } = useSWR<YearsData[]>(`${baseURL}/api/v1/data/years/OBSERVATIONS`, dataFetcher);

    const { data: macroRegionsData, isLoading: isLoadingMacroRegions } = useSWR<Record<string, MacroRegionsData>>(`${baseURL}/api/v1/data/macroRegions`, dataFetcher);

    const { data: regionsData, isLoading: isLoadingRegions } = useSWR<Record<string, RegionsData>>(`${baseURL}/api/v1/data/regions/${regionsElementId[elementId as keyof typeof regionsElementId]}/176/${year}`, dataFetcher);

    useEffect(() => {
        // console.log(`${baseURL}/api/v1/geojson/countries/beans_surface_context/ISO3/176`)
        if( buttonBoth ) {
            setMapCol(6)
            setGraphsCol(6)
            setShowMap(true)
            setShowGraphs(true)
        }
        if( buttonGraphs ) {
            setMapCol(0)
            setGraphsCol(12)
            setShowMap(false)
            setShowGraphs(true)
        }
        if( buttonMap ) {
            setMapCol(12)
            setGraphsCol(0)
            setShowMap(true)
            setShowGraphs(false)
        }
    }, [buttonBoth, buttonGraphs, buttonMap]);

    useEffect( () => {
        if( buttonBoth ) {
            if (map) map.resize();
        }
        if( buttonMap ) {
            if (map) map.resize();
        }
    });

    useEffect(() => {
        if (map){
            map.on('click', 'country_layer', (e) => {
                console.log('aaaaaaa')
                setSectionState( (prevState) => ({
                    ...prevState,
                    countryCode: e.features![0].properties!.iso3
                }));
                // console.log(e.features![0].properties!.country_name);
                clickId = e.features![0].id ?? null;
            });
        }
    }, [map]);
// ------------------------------------------------------------------------------------------------
    useEffect(() => {
        if (elementsData && !isLoadingElements) {
            const elemsObj: Record<string, ElementsData> = {};
            elementsData.map( (value, index) => (elemsObj[value.ID_ELEMENT] = value));
            setElements({
                elementsObj: elemsObj,
                elementsOptions: generateElementsOptions(elementsData, 'ELEMENT_EN', mapFilterElements)
            });
        }
    }, [isLoadingElements]);

    useEffect(() => {
        if (yearsData && !isLoadingYears) {
            setYears({yearsOptions: generateYearsOptions(yearsData)});
        }
    }, [isLoadingYears]);

    useEffect(() => {
        if (macroRegionsData && !isLoadingMacroRegions) {
            setMacroRegions({
                macroRegionsObj: macroRegionsData,
                macroRegionsOptions: generateOptionsFromObj(macroRegionsData, '', 'region_name', true)
            });
        }
    }, [isLoadingMacroRegions]);

    useEffect(() => {
        if (macroRegionsObj && regionsData && !isLoadingRegions) {
            // console.log(macroRegionsObj[macroRegionCode as keyof typeof macroRegionsObj]);
            setRegions({
                regionsObj: regionsData,
                regionsOptions: macroRegionCode == '10' ? { values: ['WLRD'], names: ['World']} : generateRegionOptions(regionsData, 'region_name', macroRegionsObj[macroRegionCode as keyof typeof macroRegionsObj].id_geo_regions)
            });
            let codeRegion : string;
            let idx = -1;
            macroRegionsObj[macroRegionCode]?.id_geo_regions.forEach( (value, index) => {
                if (regionsObj[value] && idx == -1){
                    codeRegion = value;
                    idx = index;
                }
            });
            setSectionState( (prevState) => ({
                ...prevState,
                admin: macroRegionCode == '10' ? 'World' : 'region',
                regionCode: macroRegionCode == '10' ? 'WLRD' : codeRegion,
                countryCode: codeRegion
            }));
            if(map){
                if (clickId !== null){
                    map.setFeatureState(
                        { source: 'geo_countries', id: clickId },
                        { clicked: false }
                    );
                }
                clickId = null;
            }
        }
    }, [isLoadingRegions, macroRegionCode]);

    useEffect(() => {
        setSectionState( (prevState) => ({
            ...prevState,
            regionCode,
            countryCode: regionCode
        }));
        if(map){
            if (clickId !== null){
                map.setFeatureState(
                    { source: 'geo_countries', id: clickId },
                    { clicked: false }
                );
            }
            clickId = null;
        }
    }, [regionCode])

    // useEffect(() => {
    //     const request = async() => {
    //         const response = await beansApi.get(`/api/v1/data/podium/WLRD/5412/27${ year }`);
    //         console.log(response)
    //     }
    //     request();
    // }, [regionCode, year])

    useEffect(() => {
        // ---------------------------------------------------------------------------------------------------
        // To get indicators data
        // ---------------------------------------------------------------------------------------------------
        beansApi.get('api/v1/data/value/rice_surface_context/VALUE/WLRD/1101/27/'+year).then((response) => {
            // console.log(response.data)
            setOnAverageIndicator( response.data );
        })
        beansApi.get('api/v1/data/value/rice_surface_context/VALUE/WLRD/1201/27/'+year).then((response) => {
            const percent = Number(response.data * 100).toFixed(2);
            console.log(percent)
            const indicatorObject: PercentInfoProps = {
                label: 'of the total cropland area',
                percent
            }
            setIndicators( indicators => [...indicators, indicatorObject] );
        })
        beansApi.get('api/v1/data/value/rice_surface_context/VALUE/WLRD/1202/27/'+year).then((response) => {
            const percent2 = Number(response.data * 100).toFixed(2);
            const indicatorObject2: PercentInfoProps = {
                label: 'of the total cereal area',
                percent: percent2
            }
            setIndicators( indicators => [...indicators, indicatorObject2] );
        })
        const arr = removeDuplicateObjects(indicators)
        console.log(arr)
        setIndicators(arr)
    }, [year])
    

    const podiumConfigSurface = [
        {
            url: `https://cropobs-central.ciat.cgiar.org/api/v1/data/podium/WLRD/5412/27/2020`,
            text: `Rice was the 3° most important crop in relation to harvested area (ranking) in year 2020 to ${2020 - 1}`,
            name: 'Surface'
        },
        // {
        //     url: `https://cropobs-central.ciat.cgiar.org/api/v1/data/podium/${regionCode}/1101/176/${year}`,
        //     text: `Ìn 2020, crop was the fastest-growing crop in area in relation to ${year - 1}`,
        //     name: 'Area'
        // },
        // {
        //     url: `https://cropobs-central.ciat.cgiar.org/api/v1/data/podium/${regionCode}/1102/176/2020`,
        //     text: `Ìn 2020, crop was the fastest-growing crop in yield in relation to ${year - 1}`,
        //     name: 'Yield'
        // },
    ]

    // console.log({ 'first': `${baseURL}/api/v1/geojson/countries/beans_surface_context/ISO3/176`, 'second': `${baseURL}/api/v1/data/adminIds/beans_surface_context/${admin}/${regionCode}/176/${year}?id_elements=[${elementId}]`, 'thrid': `${baseURL}/api/v1/percentile/values/undefined/data_production_surface_context/${elementId}/176/${year}?tradeFlow=undefined`, 'fouth': `${baseURL}/api/v1/percentile/heatmap`})
    // console.log(sectionState)
    // console.log(`${ baseURL }/api/v1/chart/default/rice_surface_context/${regionCode}?elementIds=[5312]&cropIds=[27,15,44,56,71,75,79,83,89,92,94,97,101,103,108]`)
    return (
        <Layout title={ dataTranslate('title-header') }>
            <Container fluid>
                <Row>
                    <Col xs={ 12 } lg={ 3 } xl={ 2 } className={ styles.sidebar }>
                        <SidebarComponent/>
                    </Col>
                    <Col xs={ 12 } lg={ 9 } xl={ 10 } className={ styles['content-data'] }>
                        <Container fluid className={ `${ styles['content-data'] } ${ styles['no-padding'] }` } >
                            <Row>
                                <Col xs={ 12 } className={ `${ styles['no-margin'] } ${ styles['no-padding'] }` }>
                                    <MainBar key={ uuidv4() } section={`Production - ${macroRegionCode == '10' ? 'World' : (regionsObj[regionCode]?.region_name ?? 'Loading...')}`} />
                                </Col>
                            </Row>
                            <Row>
                                <LeftSideMenuContainer/>
                                <Col xs={ 12 }  lg={ mapCol } style={ showMap ? { display: 'block', height: '80vh', position: 'relative' } : { display: 'none' } } className={ `${ styles['no-margin'] } ${ styles['no-padding'] }` }>
                                    <Row style={{ position: 'absolute', top: '10px', right: '20px', zIndex: '999', width: '100%', justifyContent: 'flex-end', gap: '5px', flexWrap: 'wrap' }}>
                                        <MapSelect options={elementsOptions} selected={elementId} setSelected={setSectionState} atrName='elementId'/>
                                        <MapSelect options={yearsOptions} selected={year} setSelected={setSectionState} atrName='year'/>
                                        <MapSelect options={macroRegionsOptions} selected={macroRegionCode} setSelected={setSectionState} atrName='macroRegionCode'/>
                                        { macroRegionCode == '10' ? <></> : <MapSelect options={regionsOptions} selected={regionCode} setSelected={setSectionState} atrName='regionCode'/> }
                                    </Row>
                                    <MapView admin={admin} geoJsonURL={`${baseURL}/api/v1/geojson/countries/rice_surface_context/ISO3/27`} adminIdsURL={`${baseURL}/api/v1/data/adminIds/rice_surface_context/${admin}/${regionCode}/27/${year}?id_elements=[${elementId}]`} percentileURL={`${baseURL}/api/v1/percentile/values/undefined/data_production_surface_context/${elementId}/176/${year}?tradeFlow=undefined`} quintilURL={`${baseURL}/api/v1/percentile/heatmap`} legendTitle={ elementsObj[elementId]?.ELEMENT_EN ?? 'Loading...'} />
                                </Col>
                                <Col xs={ 12 } lg={ graphsCol } style={ showGraphs ? { display: 'block', height: '80vh', border: '1px black solid', overflow: 'auto' } : { display: 'none' } }>
                                    
                                    {/* <PodiumSelection podiumsList={podiumConfigSurface} showSelect={ false }/> */}
                                    <PodiumWithLink dataURL={ `${ baseURL }/api/v1/data/podium/WLRD/5412/27/${ year }` } text={`Rice was the 3° most important crop in relation to harvested area (ranking) in year ${year}`} />
                                    <p style={{ textAlign: 'center', padding: '20px 0px' }}>	On average, rice was the { onAverageIndicator }° crop to growth the most in the last decade</p>
                                    <p style={{ textAlign: 'center' }}>In {year}, harvested rice area accounted for:</p>
                                    <PercentContainer data={ indicators } percentAlone={ false } />
                                    <PlotlyChartStackedAreaContainer fetchDataUrl={ `${ baseURL }/api/v1/chart/default/rice_surface_context/${regionCode}?elementIds=[5312]&cropIds=[27,98002,97001,96001,95001,94001,93001,99001]` } cropNameToFind='Rice, paddy' secondCropName='Cereals excl.rice' stackedAreaTitle='Stacked area' stackedAreaNormalizedTitle='Stacked area normalized' namesArr={['By value', 'By share']} />
                                    <PlotlyChartStackedAreaContainer fetchDataUrl={ `${ baseURL }/api/v1/chart/default/rice_surface_context/${regionCode}?elementIds=[5312]&cropIds=[27,15,44,56,71,75,79,83,89,92,94,97,101,103,108]` } cropNameToFind='Rice, paddy' secondCropName='Cereals excl.rice' stackedAreaTitle='Stacked area' stackedAreaNormalizedTitle='Stacked area normalized' namesArr={['By value', 'By share']} />
                                </Col>
                            </Row>                            
                        </Container>
                    </Col>
                </Row>
            </Container>
        </Layout>
    )
}

export const getStaticProps: GetStaticProps = async ({ locale }) => {
    return {
        props: {
            ...( await serverSideTranslations( locale!, ['data'] ) ),
        }
    }
}

export default MapTest;