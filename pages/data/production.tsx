import { useState, useEffect, useContext } from 'react'
import { GetStaticProps, NextPage } from 'next';
import { Button, Col, Container, Row } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import 'bootstrap/dist/css/bootstrap.min.css';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { Layout } from '../../components/layouts'
import { MainBar, MapView, SidebarComponent } from '../../components/ui';
import useSWR from 'swr';
import { v4 as uuidv4 } from 'uuid';
import styles from './data.module.css';
import { LineChartjs } from '../../components/data/chartjs-charts';
import { annual_growth_options, ten_year_moving_average_options } from '../../helpers/data/chartjs-options';
import { PodiumSelection } from '../../components/data/podium';
import { ChartSelection } from '../../components/data/charts';
import { harvested_production_yield } from '../../helpers/data/chartjs-options/harvested-production-yield';
import { MapContext } from '../../context/map';
import { LeftSideMenuContext } from '../../context/map/leftsidemenu';
import { LeftSideMenuContainer, MapSelect } from '../../components/ui/map/filters';
import { ElementsData, ElementsState, MacroRegionsData, MacroRegionsState, RegionsData, RegionsState, YearsData, YearsState } from '../../interfaces/data';
import { dataFetcher, generateElementsOptions, generateOptionsFromObj, generateRegionOptions, generateYearsOptions } from '../../helpers/data';
import { BackButton } from '../../components/data/back-button';
import { useTour } from '@reactour/tour';
import { general_data_steps } from '../../helpers/data/tour';
import { getCookie, setCookie } from 'cookies-next';
import { SearchCountryModal } from '../../components/data/search-country-modal';
import { sectionState } from '../../interfaces/data/section-states';


const mapFilterElements = [1000, 5312, 5510];
const regionsElementId = {1201:1201, 1202:1202, 1060:1154, 1059:1153, 58:152, 5510:5510, 1000:1000, 5312:5312, 645:14, 6:6, 7:7};
const baseURL = 'https://commonbeanobservatorytst.ciat.cgiar.org';
//let clickId: string | number | null = null;


const ProductionPage: NextPage = () => {
    const { t: dataTranslate } = useTranslation('data');
    const [ sectionState, setSectionState ] = useState<sectionState>({
        elementId: 1000,
        regionCode: 'WLRD',
        macroRegionCode: '10',
        countryCode: 'WLRD',
        year: 2021,
        admin: 'World',
        locationName: 'World'
    });
    const { elementId, regionCode, macroRegionCode, countryCode, year, admin, locationName } = sectionState;
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
    const { setSteps, setIsOpen } = useTour();
    const [showCountries, setShowCountries] = useState(false);
    const [clickId, setClickId] = useState<string | number | null>(null)

    const { data: elementsData, isLoading: isLoadingElements } = useSWR<ElementsData[]>(`${baseURL}/api/v1/data/elements/2`, dataFetcher);

    const { data: yearsData, isLoading: isLoadingYears } = useSWR<YearsData[]>(`${baseURL}/api/v1/data/years/OBSERVATIONS`, dataFetcher);

    const { data: macroRegionsData, isLoading: isLoadingMacroRegions } = useSWR<Record<string, MacroRegionsData>>(`${baseURL}/api/v1/data/macroRegions`, dataFetcher);

    const { data: regionsData, isLoading: isLoadingRegions } = useSWR<Record<string, RegionsData>>(`${baseURL}/api/v1/data/regions/${regionsElementId[elementId as keyof typeof regionsElementId]}/176/${year}`, dataFetcher);

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
            map.on('load', () => {
                map.on('click', 'country_layer', (e) => {
                    setSectionState( (prevState) => ({
                        ...prevState,
                        countryCode: e.features![0].properties!.iso3,
                        locationName: e.features![0].properties!.country_name
                    }));
                    console.log(e.features![0].properties!.country_name);
                    setClickId(e.features![0].id ?? null);
                });
            });
        }
    }, [map]);

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
            console.log(macroRegionsObj[macroRegionCode as keyof typeof macroRegionsObj]);
            setRegions({
                regionsObj: regionsData,
                regionsOptions: macroRegionCode == '10' ? { values: ['WLRD'], names: ['World']} : generateRegionOptions(regionsData, 'region_name', macroRegionsObj[macroRegionCode as keyof typeof macroRegionsObj].id_geo_regions)
            });
            let codeRegion = 'WLRD';
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
                setClickId(null);
            }
        }
    }, [isLoadingRegions, macroRegionCode]);

    useEffect(() => {
        setSectionState( (prevState) => ({
            ...prevState,
            regionCode,
            countryCode: regionCode,
            locationName: macroRegionCode == '10' ? 'World' : regionsObj[regionCode]?.region_name
        }));
        if(map){
            if (clickId !== null){
                map.setFeatureState(
                    { source: 'geo_countries', id: clickId },
                    { clicked: false }
                );
            }
            setClickId(null);
        }
    }, [regionCode]);

    // This useEffect is used when the back button is clicked
    useEffect(() => {
        if ([...Object.keys(regionsObj), 'WLRD'].includes(countryCode)){
            setSectionState( (prevState) => ({
                ...prevState,
                locationName: macroRegionCode == '10' ? 'World' : regionsObj[regionCode]?.region_name
            }));
            if(map){
                if (clickId !== null){
                    map.setFeatureState(
                        { source: 'geo_countries', id: clickId },
                        { clicked: false }
                    );
                }
                setClickId(null);
            }
        }
    }, [countryCode]);

    // Executes the tour for production. This useEffect runs only once
    useEffect(() => {
        if ( !getCookie('production_tour') ) {
            if (setSteps) {
                setSteps(general_data_steps);
                setCookie('production_tour', true);
                setIsOpen(true);
            }
        }
    }, []);

    const podiumConfig = [
        {
            url: `${baseURL}/api/v1/data/podium/${countryCode}/1103/176/${year}`,
            text: `In ${year}, crop was the fastest-growing crop in production in relation to ${year - 1}`,
            name: 'Production',
            description: 'podium de producción'
        },
        {
            url: `${baseURL}/api/v1/data/podium/${countryCode}/1101/176/${year}`,
            text: `In ${year}, crop was the fastest-growing crop in area in relation to ${year - 1}`,
            name: 'Area',
            description: 'podium de área'
        },
        {
            url: `${baseURL}/api/v1/data/podium/${countryCode}/1102/176/${year}`,
            text: `In ${year}, crop was the fastest-growing crop in yield in relation to ${year - 1}`,
            name: 'Yield',
            description: 'podium de yield'
        },
    ]

    const chartConfig = [
        {
            dataURL: `${baseURL}/api/v1/chart/default/beans_production/${countryCode}?elementIds=[1001,1002,1003]&cropIds=[176]`,
            options: annual_growth_options,
            config: {key: 'id_element', name:'id_element'},
            name: 'Annual growth',
            elementsURL: `${baseURL}/api/v1/data/elements/2`,
            description: 'gráfico 2 de producción'
        },
        {
            dataURL: `${baseURL}/api/v1/chart/default/beans_production/${countryCode}?elementIds=[1007,1008,1009]&cropIds=[176]`,
            options: ten_year_moving_average_options,
            config: {key: 'id_element', name:'id_element'},
            name: '10-year moving average',
            elementsURL: `${baseURL}/api/v1/data/elements/2`,
            description: 'gráfico 3 de producción'
        }
    ];

    harvested_production_yield.plugins.title.text = 'Harvested area, production and yield' + ` - ${locationName}`;

    annual_growth_options.plugins.title.text = 'Annual Growth' + ` - ${locationName}`;

    ten_year_moving_average_options.plugins.title.text = '10-year moving average' + ` - ${locationName}`;

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
                                        <MainBar key={ uuidv4() } section={`Production - ${locationName}`} >
                                            <BackButton regionCode={regionCode} countryCode={countryCode} setSectionState={setSectionState}/>
                                        </MainBar>
                                    </Col>
                                </Row>
                                <Row>
                                    <LeftSideMenuContainer/>
                                    <Col xs={ 12 }  lg={ mapCol } style={ showMap ? { display: 'block', height: '80vh', position: 'relative' } : { display: 'none' } } className={ `${ styles['no-margin'] } ${ styles['no-padding'] }` }>
                                        <Row style={{ position: 'absolute', top: '10px', right: '20px', zIndex: '3', width: '100%', justifyContent: 'flex-end', gap: '5px', flexWrap: 'wrap' }}>
                                            <MapSelect id='element-filter' options={elementsOptions} selected={elementId} setSelected={setSectionState} atrName='elementId'/>
                                            <MapSelect id='year-filter' options={yearsOptions} selected={year} setSelected={setSectionState} atrName='year'/>
                                            <MapSelect id='macro-region-filter' options={macroRegionsOptions} selected={macroRegionCode} setSelected={setSectionState} atrName='macroRegionCode'/>
                                            { macroRegionCode == '10' ? <></> : <MapSelect options={regionsOptions} selected={regionCode} setSelected={setSectionState} atrName='regionCode'/> }
                                            <Button
                                                className={`${styles['search-country-button']}`}
                                                style={{width: '145px'}}
                                                onClick={() => setShowCountries(true)}
                                            >
                                                Search Country
                                            </Button>
                                        </Row>
                                        <MapView admin={admin} geoJsonURL={`${baseURL}/api/v1/geojson/countries/beans_production/ISO3/176`} adminIdsURL={`${baseURL}/api/v1/data/adminIds/beans_production/${admin}/${regionCode}/176/${year}?id_elements=[${elementId}]`} percentileURL={`${baseURL}/api/v1/percentile/values/undefined/data_production_surface_context/${elementId}/176/${year}?tradeFlow=undefined`} quintilURL={`${baseURL}/api/v1/percentile/heatmap`} legendTitle={ elementsObj[elementId]?.ELEMENT_EN ?? 'Loading...'} />
                                    </Col>
                                    <Col xs={ 12 } lg={ graphsCol } style={ showGraphs && !showMap ? { display: 'block', height: '80vh', overflow: 'auto', marginLeft: '60px' } : showGraphs ? { display: 'block', height: '80vh', overflow: 'auto' } : { display: 'none' } }>
                                        <LineChartjs dataURL={`${baseURL}/api/v1/chart/default/beans_production/${countryCode}?elementIds=[5510,5312,1000]&cropIds=[176]`} elementsURL={`${baseURL}/api/v1/data/elements/2`} options={harvested_production_yield} config={{key: 'id_element', name:'id_element'}} description={'gráfico 1 de producción'} chartID='prod1' chartConf={{fill: true, pointRadius: 1, yAxisID: 'y'}} orderList={{1000:0, 5312:1, 5510:2}}/>
                                        <br/>
                                        <PodiumSelection podiumsList={podiumConfig} />
                                        <br/>
                                        <ChartSelection chartConfigList={chartConfig} />
                                    </Col>
                                </Row>                            
                            </Container>
                        </Col>
                    </Row>
                </Container>
                <SearchCountryModal adminIdsUrl={`${baseURL}/api/v1/data/adminIds/beans_production/${admin}/${regionCode}/176/${year}?id_elements=[${elementId}]`} show={showCountries} handleClose={setShowCountries} clickId={clickId} setSectionState={setSectionState} setClickId={setClickId} />
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

export default ProductionPage;