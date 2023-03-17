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
import { dataFetcher, generateElementsOptions, generateOptionsFromObj, generateRegionOptions, generateYearsOptions } from '../../helpers/data';
import useSWR from 'swr';
import { MapSelect } from '../../components/ui/map/filters';


interface sectionState {
    elementId: number
    regionCode: string
    macroRegionCode: string
    countryCode: string
    year: number
    admin: string
}

const mapFilterElements = [1201, 1202];
const regionsElementId = {1201:1201, 1202:1202, 1060:1154, 1059:1153, 58:152, 5510:5510, 1000:1000, 5312:5312, 645:14, 6:6, 7:7};
const baseURL = 'https://commonbeanobservatory.org';
let clickId = null;

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
    const [elementsState, setElements] = useState({
        elementsObj: {},
        elementsOptions: { values: [], names: []}
    });
    const { elementsObj, elementsOptions } = elementsState;
    const [yearsState, setYears] = useState({ yearsOptions: {values: [], names: []}});
    const { yearsOptions } = yearsState;
    const [macroRegionsState, setMacroRegions] = useState({
        macroRegionsObj: {},
        macroRegionsOptions: { values: [], names: []}
    });
    const { macroRegionsOptions, macroRegionsObj } = macroRegionsState;
    const [regionsState, setRegions] = useState({
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

    const { data: elementsData, isLoading: isLoadingElements } = useSWR(`${baseURL}/api/v1/data/elements/1`, dataFetcher);

    const { data: yearsData, isLoading: isLoadingYears } = useSWR(`${baseURL}/api/v1/data/years/OBSERVATIONS`, dataFetcher);

    const { data: macroRegionsData, isLoading: isLoadingMacroRegions } = useSWR(`${baseURL}/api/v1/data/macroRegions`, dataFetcher);

    const { data: regionsData, isLoading: isLoadingRegions } = useSWR(`${baseURL}/api/v1/data/regions/${regionsElementId[elementId]}/176/${year}`, dataFetcher);

    useEffect(() => {
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
                setSectionState( (prevState) => ({
                    ...prevState,
                    countryCode: e.features[0].properties.iso3
                }));
                console.log(e.features[0].properties.country_name);
                clickId = e.features[0].id;
            });
        }
    }, [map]);

    useEffect(() => {
        if (elementsData && !isLoadingElements) {
            const elemsObj = {};
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
            console.log(macroRegionsObj[macroRegionCode]);
            setRegions({
                regionsObj: regionsData,
                regionsOptions: macroRegionCode == '10' ? { values: ['WLRD'], names: ['World']} : generateRegionOptions(regionsData, 'region_name', macroRegionsObj[macroRegionCode].id_geo_regions)
            });
            let codeRegion;
            let idx = -1;
            macroRegionsObj[macroRegionCode]?.id_geo_regions.forEach( (value, index) => {
                if (regionsObj[value] && idx == -1){
                    codeRegion = value;
                    idx = index;
                }
            });
            console.log(codeRegion);
            setSectionState( (prevState) => ({
                ...prevState,
                admin: macroRegionCode == '10' ? 'World' : 'region',
                regionCode: macroRegionCode == '10' ? 'WLRD' : codeRegion,
                countryCode: codeRegion
            }));
            if(map){
                map.setFeatureState(
                    { source: 'geo_countries', id: clickId },
                    { clicked: false }
                );
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
            map.setFeatureState(
                { source: 'geo_countries', id: clickId },
                { clicked: false }
            );
            clickId = null;
        }
    }, [regionCode])



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
                                        { macroRegionCode == 10 ? <></> : <MapSelect options={regionsOptions} selected={regionCode} setSelected={setSectionState} atrName='regionCode'/> }
                                    </Row>
                                    <MapView admin={admin} geoJsonURL={`${baseURL}/api/v1/geojson/countries/beans_surface_context/ISO3/176`} adminIdsURL={`${baseURL}/api/v1/data/adminIds/beans_surface_context/${admin}/${regionCode}/176/${year}?id_elements=[${elementId}]`} percentileURL={`${baseURL}/api/v1/percentile/values/undefined/data_production_surface_context/${elementId}/176/${year}?tradeFlow=undefined`} quintilURL={`${baseURL}/api/v1/percentile/heatmap`} legendTitle={ elementsObj[elementId]?.ELEMENT_EN ?? 'Loading...'} />
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