import { useState, useEffect, useContext, CSSProperties } from 'react'
import { GetStaticProps, NextPage } from 'next';
import { Col, Container, Row } from 'react-bootstrap';
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
import { PodiumSelection, PodiumWithLink } from '../../components/data/podium';
import { ChartSelection } from '../../components/data/charts';
import { harvested_production_yield } from '../../helpers/data/chartjs-options/harvested-production-yield';
import { MapContext } from '../../context/map';
import { LeftSideMenuContext } from '../../context/map/leftsidemenu';
import { LeftSideMenuContainer, MapSelect } from '../../components/ui/map/filters';
import { ElementsData, ElementsState, MacroRegionsData, MacroRegionsState, PercentInfoProps, RegionsData, RegionsState, YearsData, YearsState } from '../../interfaces/data';
import { dataFetcher, generateElementsOptions, generateOptionsFromObj, generateRegionOptions, generateYearsOptions } from '../../helpers/data';
import { beansApi } from '../../apis';
import { toFindCropOfInterest } from '../../helpers/data/podium/podiumHelpers';
import { removeCommasFromString } from '../../helpers';
import { PodiumDataStructureFetchApi } from '../../interfaces/data/podium';
import { PercentContainer } from '../../components/data/percent-info';
import { PlotlyChartStackedAreaContainer } from '../../components/data';
import Button from 'react-bootstrap/Button';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import KeyboardTabIcon from '@mui/icons-material/KeyboardTab';
import { useWindowSize } from '../../hooks';
import { useRouter } from 'next/router';
import { SearchCountryModal } from '../../components/data/search-country-modal';
import { useTour } from '@reactour/tour';
import { getCookie, setCookie } from 'cookies-next';
import { general_data_steps } from '../../helpers/data/tour';
import { BackButton } from '../../components/data/back-button';

export const textBold: CSSProperties = {
    color: '#3e3e3e', 
    fontWeight: '800', 
    fontSize: '25px'
}

interface sectionState {
    elementId: number
    regionCode: string
    macroRegionCode: string
    countryCode: string
    year: number
    admin: string
    locationName: string
}

const mapFilterElements = [1201, 1202]; // ! No olvidar modificar aqui 
const regionsElementId = {1201:1201, 1202:1202, 1060:1154, 1059:1153, 58:152, 5510:5510, 1000:1000, 5312:5312, 645:14, 6:6, 7:7};
const baseURL = 'https://commonbeanobservatorytst.ciat.cgiar.org';


const SurfaceContextPage: NextPage = () => {
    const { t: dataTranslate } = useTranslation('data-surface-context');
    const { locale } = useRouter();
    const [ sectionState, setSectionState ] = useState<sectionState>({
        elementId: 1201,
        regionCode: 'WLRD',
        macroRegionCode: '10',
        countryCode: 'WLRD',
        year: 2021,
        admin: 'World',
        locationName: 'World'
    });
    const { elementId, regionCode, macroRegionCode, countryCode, year, admin, locationName } = sectionState;
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
    const { setSteps, setIsOpen } = useTour();
    const [showCountries, setShowCountries] = useState(false);
    const [clickId, setClickId] = useState<string | number | null>(null);

    const { data: elementsData, isLoading: isLoadingElements } = useSWR<ElementsData[]>(`${baseURL}/api/v1/data/elements/1`, dataFetcher);
    // alert(`${baseURL}/api/v1/data/elements/1`);
    const { data: yearsData, isLoading: isLoadingYears } = useSWR<YearsData[]>(`${baseURL}/api/v1/data/years/OBSERVATIONS`, dataFetcher);

    const { data: macroRegionsData, isLoading: isLoadingMacroRegions } = useSWR<Record<string, MacroRegionsData>>(`${baseURL}/api/v1/data/macroRegions`, dataFetcher);

    const { data: regionsData, isLoading: isLoadingRegions } = useSWR<Record<string, RegionsData>>(`${baseURL}/api/v1/data/regions/${regionsElementId[elementId as keyof typeof regionsElementId]}/176/${year}`, dataFetcher);
    const { data: indicatorOnAverage, isLoading: isLoadingIndicatorOnAverage } = useSWR<number>(`${baseURL}/api/v1/data/value/beans_surface_context/VALUE/${ countryCode }/1101/176/${ year }`, dataFetcher);
    const { data: indicatorTotalCropLandArea, isLoading: isLoadingIndicatorTotalCropLandArea } = useSWR<number>(`${baseURL}/api/v1/data/value/beans_surface_context/VALUE/${ countryCode }/1201/176/${ year }`, dataFetcher);
    const { data: indicatorTotalCerealArea, isLoading: isLoadingIndicatorTotalCerealArea } = useSWR<number>(`${baseURL}/api/v1/data/value/beans_surface_context/VALUE/${ countryCode }/1202/176/${ year }`, dataFetcher);
    // const { data: regionsData, isLoading: isLoadingRegions } = useSWR<Record<string, RegionsData>>(`${baseURL}/api/v1/data/regions/${regionsElementId[elementId as keyof typeof regionsElementId]}/27/${year}`, dataFetcher);
    // const { data: indicatorOnAverage, isLoading: isLoadingIndicatorOnAverage } = useSWR<number>(`${baseURL}/api/v1/data/value/rice_surface_context/VALUE/${ countryCode }/1101/27/${ year }`, dataFetcher);
    // const { data: indicatorTotalCropLandArea, isLoading: isLoadingIndicatorTotalCropLandArea } = useSWR<number>(`${baseURL}/api/v1/data/value/rice_surface_context/VALUE/${ countryCode }/1201/27/${ year }`, dataFetcher);
    // const { data: indicatorTotalCerealArea, isLoading: isLoadingIndicatorTotalCerealArea } = useSWR<number>(`${baseURL}/api/v1/data/value/rice_surface_context/VALUE/${ countryCode }/1202/27/${ year }`, dataFetcher);

    const sectionName = 'surface-context';

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

    const [podiumRank, setPodiumRank] = useState(0);
    
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
// ------------------------------------------------------------------------------------------------
    useEffect(() => {
        if (elementsData && !isLoadingElements) {
            const elemsObj: Record<string, ElementsData> = {};
            // console.error(elemsObj);
            elementsData.map( (value, index) => (elemsObj[value.ID_ELEMENT] = value));
            let variableByLocale = ''
            if( locale == 'en' ) variableByLocale = 'ELEMENT_EN';
            if( locale == 'es' ) variableByLocale = 'ELEMENT_ES';
            if( locale == 'pt' ) variableByLocale = 'ELEMENT_PT';
            setElements({
                elementsObj: elemsObj,
                elementsOptions: generateElementsOptions(elementsData, variableByLocale, mapFilterElements)
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
            let variableByLocale = ''
            if( locale == 'en' ) variableByLocale = 'region_name';
            if( locale == 'es' ) variableByLocale = 'region_name_es';
            if( locale == 'pt' ) variableByLocale = 'region_name_pt';
            setMacroRegions({
                macroRegionsObj: macroRegionsData,
                macroRegionsOptions: generateOptionsFromObj(macroRegionsData, '', variableByLocale, true)
            });
        }
    }, [isLoadingMacroRegions]);

    useEffect(() => {
        if (macroRegionsObj && regionsData && !isLoadingRegions) {
            let variableByLocale = ''
            if( locale == 'en' ) variableByLocale = 'region_name';
            if( locale == 'es' ) variableByLocale = 'region_name_es';
            if( locale == 'pt' ) variableByLocale = 'region_name_pt';
            // console.log(macroRegionsObj[macroRegionCode as keyof typeof macroRegionsObj]);
            setRegions({
                regionsObj: regionsData,
                regionsOptions: macroRegionCode == '10' ? { values: ['WLRD'], names: ['World']} : generateRegionOptions(regionsData, variableByLocale, macroRegionsObj[macroRegionCode as keyof typeof macroRegionsObj].id_geo_regions)
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
    }, [regionCode])

    // ------------------------------------------------------------------------------------------------------------------------
    // To change podium data, when is changing years select value or any admin Level (region, macro region or country)
    // ------------------------------------------------------------------------------------------------------------------------
    useEffect(() => {
        const dataPodiumFetch = async() => {
            // const response = await beansApi.get(`api/v1/data/podium/${ countryCode }/5412/27/${ year }`);
            const response = await beansApi.get(`api/v1/data/podium/${ countryCode }/5412/176/${ year }`);
            const { data } = response;
            const dataFetch: PodiumDataStructureFetchApi = { data }
            const rank = toFindCropOfInterest( dataFetch, 'Beans, dry' )
            // const rank = toFindCropOfInterest( dataFetch, 'Rice, paddy' )
            setPodiumRank( rank );
        }
        dataPodiumFetch();
    }, [ countryCode, year ]);

    useEffect(() => {
        if (indicatorOnAverage && !isLoadingIndicatorOnAverage) {
            setOnAverageIndicator(indicatorOnAverage);
        }
    }, [isLoadingIndicatorOnAverage]);

    useEffect(() => {
        setIndicators( [] );
        if (indicatorTotalCropLandArea && !isLoadingIndicatorTotalCropLandArea) {
            const totalCropLandArea = Number(indicatorTotalCropLandArea * 100).toFixed(2);
            const indicatorTotalCropLand: PercentInfoProps = {
                label: totalAreaText1,
                percent: totalCropLandArea
            }
            setOnAverageIndicator(indicatorTotalCropLandArea);
            setIndicators( indicators => [...indicators, indicatorTotalCropLand] );
        }
    }, [isLoadingIndicatorTotalCropLandArea]);

    useEffect(() => {
        // setIndicators( [] );
        if (indicatorTotalCerealArea && !isLoadingIndicatorTotalCerealArea) {
            const totalCerealArea = Number(indicatorTotalCerealArea * 100).toFixed(2);
            const indicatorTotalCereal: PercentInfoProps = {
                label: totalAreaText2,
                percent: totalCerealArea
            }
            setOnAverageIndicator(indicatorTotalCerealArea);
            setIndicators( indicators => [...indicators, indicatorTotalCereal] );
        }
    }, [isLoadingIndicatorTotalCerealArea]);


    // const chartConfig = [
    //     {
    //         dataURL: `${baseURL}/api/v1/chart/default/beans_production/${countryCode}?elementIds=[1001,1002,1003]&cropIds=[176]`,
    //         options: annual_growth_options,
    //         config: {key: 'id_element', name:'id_element'},
    //         name: 'Annual growth',
    //         elementsURL: `${baseURL}/api/v1/data/elements/2`,
    //         description: 'gráfico 2 de producción'
    //     },
    //     {
    //         dataURL: `${baseURL}/api/v1/chart/default/beans_production/${countryCode}?elementIds=[1007,1008,1009]&cropIds=[176]`,
    //         options: ten_year_moving_average_options,
    //         config: {key: 'id_element', name:'id_element'},
    //         name: '10-year moving average',
    //         elementsURL: `${baseURL}/api/v1/data/elements/2`,
    //         description: 'gráfico 3 de producción'
    //     }
    // ];


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

    harvested_production_yield.plugins.title.text = 'Harvested area, production and yield' + ` - ${locationName}`;

    annual_growth_options.plugins.title.text = 'Annual Growth' + ` - ${locationName}`;

    ten_year_moving_average_options.plugins.title.text = '10-year moving average' + ` - ${locationName}`;

    const [isCollapsed, setIsCollapsed] = useState(false);
    const { width } = useWindowSize();
    const [sideBarColumn, setSideBarColumn] = useState(1);
    const [contentColumn, setContentColumn] = useState(11);
    const [sideBarSubcolumn, setSideBarSubcolumn] = useState(9);
    const [collapsedSideBarButton, setCollapsedSideBarButton] = useState(3);

    const onCickCollapsed = () => {
        if ( width! > 992 && width! < 1200 ) {
            setSideBarColumn(2);
            setContentColumn(10);
        };
        // if( width! > 1200 ){
        //     setSideBarColumn(2);
        //     setContentColumn(10);
        // }
        setIsCollapsed(!isCollapsed);
        //console.log(isCollapsed)
    }
    useEffect(() => {
        
        if ( isCollapsed ) {
            if( width! <= 1200 ){
                alert('aaaa')
                setSideBarColumn(2);
                setContentColumn(10);
                setSideBarSubcolumn(9);
                setCollapsedSideBarButton(3);
            }
            if( width! > 1200 ) {
                setSideBarColumn(2);
                setContentColumn(10);
                setSideBarSubcolumn(9);
                setCollapsedSideBarButton(2);
            }
            
            // console.log('-----------------------------')
        };
        if ( !isCollapsed ) {
            if( width! <= 1200 ){
                alert(isCollapsed)
                setSideBarColumn(2);
                setContentColumn(10);
                setSideBarSubcolumn(7);
                setCollapsedSideBarButton(5);
            }
            if( width! > 1200 ) {
                setSideBarColumn(1);
                setContentColumn(11);
                setSideBarSubcolumn(9);
                setCollapsedSideBarButton(2);
            }
            
            // console.log('-----------------------------')
        };
        // if( width! > 1200 && !isCollapsed ){
        //     setSideBarColumn(2);
        //     setContentColumn(10);
        //     console.log('-----------------------------x2')
        // }
    }, [ isCollapsed ])
    

    // --------------------------------------------------------------------------------------------------------------
    // Local variables for translation
    // --------------------------------------------------------------------------------------------------------------
    const [titlePage, setTitlePage] = useState('');
    const [titleSection, setTitleSection] = useState('');
    const [text1Podium, setText1Podium] = useState('');
    const [text2Podium, setText2Podium] = useState('');
    const [indicatorText1, setIndicatorText1] = useState('');
    const [indicatorText2, setIndicatorText2] = useState('');
    const [indicatorText3, setIndicatorText3] = useState('');
    const [harvestedAreaText1, setHarvestedAreaText1] = useState('');
    const [harvestedAreaText2, setHarvestedAreaText2] = useState('');
    const [totalAreaText1, setTotalAreaText1] = useState('');
    const [totalAreaText2, setTotalAreaText2] = useState('');
    const [plotly1TitleByValue, setPlotly1TitleByValue] = useState('');
    const [plotly1YLabelByValue, setPlotly1YLabelByValue] = useState('');
    const [plotly1TitleByShare, setPlotly1TitleByShare] = useState('');
    const [plotly1YLabelByShare, setPlotly1YLabelByShare] = useState('');
    const [plotly2TitleByValue, setPlotly2TitleByValue] = useState('');
    const [plotly2YLabelByValue, setPlotly2YLabelByValue] = useState('');
    const [plotly2TitleByShare, setPlotly2TitleByShare] = useState('');
    const [plotly2YLabelByShare, setPlotly2YLabelByShare] = useState('');
    const [byValueText, setByValueText] = useState('');
    const [byShareText, setByShareText] = useState('');
    const [searchCountryTextButton, setSearchCountryTextButton] = useState('')
    useEffect(() => {
        setTitlePage(dataTranslate('title-header')!);
        setTitleSection(dataTranslate('title_section')!);
        setText1Podium(dataTranslate('text1_podium_beans')!);
        setText2Podium(dataTranslate('text2_podium_beans')!);
        setIndicatorText1(dataTranslate('indicator_text1_beans')!);
        setIndicatorText2(dataTranslate('indicator_text2_beans')!);
        setIndicatorText3(dataTranslate('indicator_text3_beans')!);
        setHarvestedAreaText1(dataTranslate('harvested_text1_beans')!);
        setHarvestedAreaText2(dataTranslate('harvested_test2_beans')!);
        setTotalAreaText1(dataTranslate('total_area_beans')!);
        setTotalAreaText2(dataTranslate('total_cereal_area_beans')!);
        setPlotly1TitleByValue(dataTranslate('plotly1_by_value_beans')!+ locationName);
        setPlotly1TitleByShare(dataTranslate('plotly1_by_share_beans')!+ locationName);
        setPlotly2TitleByValue(dataTranslate('plotly2_by_value_beans')!+ locationName);
        setPlotly2TitleByShare(dataTranslate('plotly2_by_share_beans')!+ locationName);
        setByValueText(dataTranslate('by_value')!);
        setByShareText(dataTranslate('by_share')!);
        setPlotly1YLabelByValue(dataTranslate('plotly1_ylabel_by_value_beans')!);
        setPlotly2YLabelByValue(dataTranslate('plotly2_ylabel_by_value_beans')!);
        setPlotly1YLabelByShare(dataTranslate('plotly1_ylabel_by_share_beans')!);
        setPlotly2YLabelByShare(dataTranslate('plotly2_ylabel_by_share_beans')!);
        setSearchCountryTextButton(dataTranslate('search_country')!);
    }, )
    

    // console.log(sideBarColumn, contentColumn)  

    console.log(elementsOptions)
    return (
        <Layout title={ titlePage }>
            <Container fluid>
                <Row>
                    <Col xs={ 12 } lg={ sideBarColumn }className={ styles.sidebar } style={ width! < 991 ? { display: 'none' } : undefined}>
                        <Row>
                            <Col xs={ sideBarSubcolumn }>
                                <SidebarComponent isCollapsedProp={ isCollapsed }/>
                            </Col>
                            <Col xs={ collapsedSideBarButton } style={{ margin: '0', padding: 0 }}>
                                <Button onClick={ onCickCollapsed } style={{ background: 'transparent', color: 'black', borderColor: 'transparent' }} >
                                    {  
                                        !isCollapsed ? <KeyboardTabIcon/> : <KeyboardBackspaceIcon/> 
                                    }
                                </Button>
                            </Col>
                        </Row>
                    </Col>
                    <Col xs={ 12 } lg={ contentColumn } className={ styles['content-data'] }>
                        <Container fluid className={ `${ styles['content-data'] } ${ styles['no-padding'] }` } >
                            <Row>
                                <Col xs={ 12 } className={ `${ styles['no-margin'] } ${ styles['no-padding'] }` }>
                                    <MainBar key={ uuidv4() } section={` ${ titleSection } - ${locationName}`} >
                                            <BackButton regionCode={regionCode} countryCode={countryCode} setSectionState={setSectionState}/>
                                    </MainBar>
                                </Col>
                            </Row>
                            <Row>
                                <LeftSideMenuContainer/>
                                <Col xs={ 12 }  lg={ mapCol } style={ showMap ? { display: 'block', height: '80vh', position: 'relative' } : { display: 'none' } } className={ `${ styles['no-margin'] } ${ styles['no-padding'] }` }>
                                    <Row style={{ position: 'absolute', top: '10px', right: '20px', zIndex: '999', width: '100%', justifyContent: 'flex-end', gap: '5px' }}>
                                        <Row style={{justifyContent: 'flex-end', flexWrap: 'wrap', gap: '5px'}}>
                                            <MapSelect id='element-filter' options={elementsOptions} selected={elementId} setSelected={setSectionState} atrName='elementId'/>
                                            <MapSelect id='year-filter' options={yearsOptions} selected={year} setSelected={setSectionState} atrName='year'/>
                                            <MapSelect id='macro-region-filter' options={macroRegionsOptions} selected={macroRegionCode} setSelected={setSectionState} atrName='macroRegionCode'/>
                                            { macroRegionCode == '10' ? <></> : <MapSelect options={regionsOptions} selected={regionCode} setSelected={setSectionState} atrName='regionCode'/> }
                                        </Row>
                                        <Row style={{justifyContent: 'flex-end', flexWrap: 'wrap'}}>
                                            <Button
                                                className={`${styles['search-country-button']}`}
                                                style={{width: '145px', height: 'inherit'}}
                                                onClick={() => setShowCountries(true)}
                                            >
                                                { searchCountryTextButton }
                                            </Button>
                                        </Row>
                                    </Row>
                                    <MapView admin={admin} geoJsonURL={`${baseURL}/api/v1/geojson/countries/beans_surface_context/ISO3/176`} adminIdsURL={`${baseURL}/api/v1/data/adminIds/beans_surface_context/${admin}/${regionCode}/176/${year}?id_elements=[${elementId}]`} percentileURL={`${baseURL}/api/v1/percentile/values/undefined/data_production_surface_context/${elementId}/176/${year}?tradeFlow=undefined`} quintilURL={`${baseURL}/api/v1/percentile/heatmap`} legendTitle={ elementsObj[elementId]?.ELEMENT_EN ?? 'Loading...'} />
                                    {/* <MapView admin={admin} geoJsonURL={`${baseURL}/api/v1/geojson/countries/rice_surface_context/ISO3/27`} adminIdsURL={`${baseURL}/api/v1/data/adminIds/rice_surface_context/${admin}/${regionCode}/27/${year}?id_elements=[${elementId}]`} percentileURL={`${baseURL}/api/v1/percentile/values/undefined/data_production_surface_context/${elementId}/27/${year}?tradeFlow=undefined`} quintilURL={`${baseURL}/api/v1/percentile/heatmap`} legendTitle={ elementsObj[elementId]?.ELEMENT_EN ?? 'Loading...'} /> */}
                                
                                </Col>
                                <Col xs={ 12 } lg={ graphsCol } style={ showGraphs && !showMap ? { display: 'block', height: '80vh', overflow: 'auto', marginLeft: '60px' } : showGraphs ? { display: 'block', height: '80vh', overflow: 'auto' } : { display: 'none' } }>
                                    <PodiumWithLink 
                                        dataURL={ `${ baseURL }/api/v1/data/podium/${ countryCode }/5412/176/${ year }` } 
                                        text1={ text1Podium } 
                                        text2={ `${ podiumRank }°` }
                                        text3={ text2Podium }
                                        text4={ `${year}` }
                                        description='' />
                                    <p style={{ textAlign: 'center', padding: '20px 0px' }}> { indicatorText1 } <span style={ textBold } >{ onAverageIndicator }°</span> { indicatorText2 } <span style={ textBold }>{ indicatorText3 }</span> </p>
                                    <p style={{ textAlign: 'center' }}>{ harvestedAreaText1 } <span style={ textBold }>{year}</span>{ harvestedAreaText2 }</p>
                                    {/* <PodiumWithLink dataURL={ `${ baseURL }/api/v1/data/podium/${ countryCode }/5412/27/${ year }` } text={`Rice was the ${ podiumRank }° most important crop in relation to harvested area (ranking) in year ${year}`} description='Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras mattis sed libero eu aliquet. Aenean mi tellus, tincidunt sit amet elit nec, mollis tristique arcu. Maecenas ornare vulputate nisl eu hendrerit. Ut vehicula elit quam, at porttitor mauris porta a. Duis condimentum euismod magna et elementum.' /> */}
                                    {/* <p style={{ textAlign: 'center', padding: '20px 0px' }}>	On average, rice was the { onAverageIndicator }° crop to growth the most in the last decade</p> */}
                                    {/* <p style={{ textAlign: 'center' }}>In {year}, harvested rice area accounted for:</p> */} 
                                    <PercentContainer data={ indicators } percentAlone={ false } />
                                    <br /> 
                                    <PlotlyChartStackedAreaContainer  stackedAreaID='chart-container1' moreInfoTextStackedArea='Lorem ipsum 1' stackedAreaNormalizedID='chart-container2' moreInfoTextStackedAreaNormalized='Lorem ipsum 2' fetchDataUrl={ `${ baseURL }/api/v1/chart/default/beans_surface_context/${ countryCode }?elementIds=[5312]&cropIds=[176,96002,98001,97001,95001,94001,93001,99001]` } cropNameToFind='Beans, dry' secondCropName='Peas, dry' stackedAreaTitle={ plotly1TitleByValue } stackedAreaNormalizedTitle={ plotly1TitleByShare } namesArr={[byValueText, byShareText]} yLabelStackedArea={plotly1YLabelByValue} yLabelShare={ plotly1YLabelByShare } />
                                    <PlotlyChartStackedAreaContainer  stackedAreaID='chart-container3' moreInfoTextStackedArea='Lorem ipsum 3' stackedAreaNormalizedID='chart-container4' moreInfoTextStackedAreaNormalized='Lorem ipsum 4' fetchDataUrl={ `${ baseURL }/api/v1/chart/default/beans_surface_context/${ countryCode }?elementIds=[5312]&cropIds=[176,181,187,191,195,197,201,203,205,210,211]` } cropNameToFind='Beans, dry' secondCropName='Peas, dry' stackedAreaTitle={ plotly2TitleByValue } stackedAreaNormalizedTitle={ plotly2TitleByShare } namesArr={[byValueText, byShareText]} yLabelStackedArea={plotly2YLabelByValue} yLabelShare={ plotly2YLabelByShare }  />
                                    {/* <PlotlyChartStackedAreaContainer  stackedAreaID='chart-container1' moreInfoTextStackedArea='Lorem ipsum 1' stackedAreaNormalizedID='chart-container2' moreInfoTextStackedAreaNormalized='Lorem ipsum 2' fetchDataUrl={ `${ baseURL }/api/v1/chart/default/rice_surface_context/${ countryCode }?elementIds=[5312]&cropIds=[27,98002,97001,96001,95001,94001,93001,99001]` } cropNameToFind='Rice, paddy' secondCropName='Cereals excl.rice' stackedAreaTitle='Stacked area' stackedAreaNormalizedTitle='Stacked area normalized' namesArr={['By value', 'By share']} /> */}
                                    {/* <PlotlyChartStackedAreaContainer  stackedAreaID='chart-container3' moreInfoTextStackedArea='Lorem ipsum 3' stackedAreaNormalizedID='chart-container4' moreInfoTextStackedAreaNormalized='Lorem ipsum 4' fetchDataUrl={ `${ baseURL }/api/v1/chart/default/rice_surface_context/${ countryCode }?elementIds=[5312]&cropIds=[27,15,44,56,71,75,79,83,89,92,94,97,101,103,108]` } cropNameToFind='Rice, paddy' secondCropName='Cereals excl.rice' stackedAreaTitle='Stacked area' stackedAreaNormalizedTitle='Stacked area normalized' namesArr={['By value', 'By share']} /> */}
                                    {/* <LineChartjs dataURL={`${baseURL}/api/v1/chart/default/beans_production/${countryCode}?elementIds=[5510,5312,1000]&cropIds=[176]`} elementsURL={`${baseURL}/api/v1/data/elements/2`} options={harvested_production_yield} config={{key: 'id_element', name:'id_element'}} description={'gráfico 1 de producción'} chartID='prod1' chartConf={{fill: true, pointRadius: 1, yAxisID: 'y'}} orderList={{1000:0, 5312:1, 5510:2}}/>
                                    <br/>
                                    <PodiumSelection podiumsList={podiumConfig} /> beans_su
                                    <br/>
                                    <ChartSelection chartConfigList={chartConfig} /> */}
                                </Col>
                            </Row>                    
                        </Container>
                    </Col>
                </Row>
            </Container>
            <SearchCountryModal adminIdsUrl={`${baseURL}/api/v1/data/adminIds/beans_surface_context/${admin}/${regionCode}/176/${year}?id_elements=[${elementId}]`} show={showCountries} handleClose={setShowCountries} clickId={clickId} setSectionState={setSectionState} setClickId={setClickId} />
        </Layout>
    )
}

export const getStaticProps: GetStaticProps = async ({ locale }) => {
    return {
        props: {
            ...( await serverSideTranslations( locale!, ['data-surface-context'] ) ),
        }
    }
}

export default SurfaceContextPage;