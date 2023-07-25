import { useState, useEffect, useContext, CSSProperties, useLayoutEffect } from 'react';
import { GetStaticProps, NextPage } from 'next';
import { Col, Container, Row, Tab, Tabs } from 'react-bootstrap';
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
import { beansApi, centralApi } from '../../apis';
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
import { general_data_steps, general_data_steps_es, general_data_steps_es_mobile, general_data_steps_mobile, general_data_steps_pt, general_data_steps_pt_mobile } from '../../helpers/data/tour';
import { BackButton } from '../../components/data/back-button';
import { SourcesComponent } from '../../components/ui/sources-component';
import { SearchCountryButton } from '../../components/data/search-country-button/SearchCountryButton';
import { LoadingComponent } from '../../components/ui/loading-component';

export const textBold: CSSProperties = {
    color: '#3e3e3e', 
    fontWeight: '800', 
    fontSize: '25px'
}

interface locationNameOptions {
    en: string;
    es: string;
    pt: string;
    isoLabel: string;
    clickId: number | null | string;
    macroRegionCode: null | string;
    regionCode: null | string;
}

interface sectionState {
    elementId: number
    regionCode: string
    macroRegionCode: string
    countryCode: string
    year: number
    admin: string
    locationName: string;
}

const mapFilterElements = [1201, 1202]; // ! No olvidar modificar aqui 
const regionsElementId = {1201:1201, 1202:1202, 1060:1154, 1059:1153, 58:152, 5510:5510, 1000:1000, 5312:5312, 645:14, 6:6, 7:7};
//const baseURL = 'https://cropobs-central.ciat.cgiar.org';
const baseURL = process.env.NEXT_PUBLIC_BASE_URL; //
const idCrop = process.env.NEXT_PUBLIC_ID_CROP; //176
const cropName = process.env.NEXT_PUBLIC_CROP_NAME; //beans
const idGroup = process.env.NEXT_PUBLIC_ID_GROUP; //96001
const idIndicators = process.env.NEXT_PUBLIC_ID_INDICATORS; //2546


const SurfaceContextPage: NextPage = () => {
    const { t: dataTranslate } = useTranslation('data-surface-context');
    const { width } = useWindowSize();
    const { locale } = useRouter();
    const [ sectionState, setSectionState ] = useState<sectionState>({
        elementId: 1201,
        regionCode: 'WLRD',
        macroRegionCode: '10',
        countryCode: 'WLRD',
        year: 2020,
        admin: 'World',
        locationName: dataTranslate('world-locale')
    });
    const [locationNameOptions, setLocationNameOptions] = useState<locationNameOptions>({
        en: 'World',
        es: 'Mundo',
        pt: 'Mundo',
        isoLabel: 'WLRD',
        clickId: 0,
        macroRegionCode: '10',
        regionCode: 'WLRD'
    });
    const [locationName2, setLocationName2] = useState('');
    const { elementId, regionCode, macroRegionCode, countryCode, year, admin, locationName } = sectionState;
    const [countryCode2, setCountryCode2] = useState('WLRD');
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
    const { buttonBoth, buttonGraphs, buttonMap, activeBothButtons } = useContext( LeftSideMenuContext );
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

    const { data: regionsData, isLoading: isLoadingRegions } = useSWR<Record<string, RegionsData>>(`${baseURL}/api/v1/data/regions/${regionsElementId[elementId as keyof typeof regionsElementId]}/${idCrop}/${year}`, dataFetcher);
    const { data: indicatorOnAverage, isLoading: isLoadingIndicatorOnAverage } = useSWR<number>(`${baseURL}/api/v1/data/value/${cropName}_surface_context/VALUE/${ countryCode2 }/1101/${idCrop}/${ year }`, dataFetcher);
    const { data: indicatorTotalCropLandArea, isLoading: isLoadingIndicatorTotalCropLandArea } = useSWR<number>(`${baseURL}/api/v1/data/value/${cropName}_surface_context/VALUE/${ countryCode2 }/1201/${idCrop}/${ year }`, dataFetcher);
    const { data: indicatorTotalCerealArea, isLoading: isLoadingIndicatorTotalCerealArea } = useSWR<number>(`${baseURL}/api/v1/data/value/${cropName}_surface_context/VALUE/${ countryCode2 }/1202/${idCrop}/${ year }`, dataFetcher);
    // const { data: regionsData, isLoading: isLoadingRegions } = useSWR<Record<string, RegionsData>>(`${baseURL}/api/v1/data/regions/${regionsElementId[elementId as keyof typeof regionsElementId]}/27/${year}`, dataFetcher);
    // const { data: indicatorOnAverage, isLoading: isLoadingIndicatorOnAverage } = useSWR<number>(`${baseURL}/api/v1/data/value/rice_surface_context/VALUE/${ countryCode }/1101/27/${ year }`, dataFetcher);
    // const { data: indicatorTotalCropLandArea, isLoading: isLoadingIndicatorTotalCropLandArea } = useSWR<number>(`${baseURL}/api/v1/data/value/rice_surface_context/VALUE/${ countryCode }/1201/27/${ year }`, dataFetcher);
    // const { data: indicatorTotalCerealArea, isLoading: isLoadingIndicatorTotalCerealArea } = useSWR<number>(`${baseURL}/api/v1/data/value/rice_surface_context/VALUE/${ countryCode }/1202/27/${ year }`, dataFetcher);

    const sectionName = 'surface-context';
    const [isMapView, setIsMapView] = useState(false);

    useEffect(() => {
        activeBothButtons();
    }, []);

    useEffect(() => {
        // console.log(`${baseURL}/api/v1/geojson/countries/${cropName}_surface_context/ISO3/${idCrop}`)
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
            setIsMapView( false );
            if (map) map.resize();
        }
        if( buttonMap ) {
            setIsMapView( true );
            if (map) map.resize();
        }
    });

    useEffect(() => {
        if( isMapView ) { 
            if( map ) {
                map.setCenter([-74.261613, 4.658291])
                map.setZoom(1);
            }
        }else{
            if( map ) {
                map.setCenter([-13.7856, 0])
                map.setZoom(0.41);
            }
        }
        
    }, [ isMapView ])
    

    const [podiumRank, setPodiumRank] = useState(0);
    
    useEffect(() => {
        if (map){
            map.on('load', () => {
                map.on('click', 'country_layer', (e) => {
                    
                    if( e.features ){
                        if( e.features[0] ){
                            const { properties } = e.features[0]; 
                            let id = e.features![0].id ?? null;
                            const iso = properties!.iso3
                            setSectionState( (prevState) => ({
                                ...prevState,
                                countryCode: iso,
                                locationName: properties![dataTranslate('LOCALE_COUNTRY_NAME')]
                            }));
                            setCountryCode2(iso);
                            // console.log(properties!.iso3)
                            setLocationNameOptions(( prevState ) => ({
                                ...prevState,
                                en: properties!.country_name,
                                es: properties!.country_name_es,
                                pt: properties!.country_name_pt,
                                isoLabel: iso,
                                clickId: id
                            })); 
                            setLocationName2( locale == 'en' ? e.features![0].properties!.country_name : ( locale == 'es' ? e.features![0].properties!.country_name_es : e.features![0].properties!.country_name_pt) )
                            setClickId(e.features![0].id ?? null);
                        }
                    }
                    console.log(e.features![0].id)
                });
            });
        }
    }, [map, dataTranslate, locale]);

    useEffect(() => {
        let title = '';
        if( clickId === null && countryCode === 'WLRD') {
            if( locale == 'en' ) title = 'World';
            if( locale == 'es' ) title = 'Mundo';
            if( locale == 'pt' ) title = 'Mundo';
            setLocationName2( title );
        }
        else if ( clickId !== null && (countryCode !== regionCode) ) {
            if( locale == 'en' ) title = locationNameOptions.en;
            if( locale == 'es' ) title = locationNameOptions.es;
            if( locale == 'pt' ) title = locationNameOptions.pt;
            setLocationName2( title );
        }
    }, [ clickId, countryCode ])
    
    // useEffect(() => {
    //     console.log('11111111111111111111111111111111111111111111111111111111111', locationNameOptions)
    //     setCountryCode2( locationNameOptions.regionCode! )
    // }, [ locationNameOptions.macroRegionCode, locationNameOptions.regionCode ])


    // This for to fix in filters
    useEffect(() => {
        //console.log('vaaaaaaa', locationNameOptions.isoLabel)
        // console.log('Valor de locationNameOptions.macroRegionCode:', locationNameOptions.macroRegionCode);
        // console.log('Valor de locationNameOptions.regionCode:', locationNameOptions.regionCode);
        setCountryCode2(locationNameOptions.isoLabel);
    }, [locationNameOptions.isoLabel]);
    

    useEffect(() => {
        // console.log('======================+++++++++++++++++++++++++++++++++++++++++', {locationNameOptions})
        // console.log(locationNameOptions)
        let location = '';
        switch (locale) {
            case 'en':
                location = locationNameOptions.en;
                break;
            case 'es':
                location = locationNameOptions.es;
                break;
            default:
                location = locationNameOptions.pt;           
                break;
        }
        const { isoLabel } = locationNameOptions;
        if( isoLabel === 'WLRD' ) {
            switch (locale) {
                case 'en':
                    location = 'World';
                    break;
                case 'es':
                    location = 'Mundo';
                    break;
                default:
                    location = 'Mundo';           
                    break;
            }
        }
        setLocationName2( location );
        setLocationText( location );
        setSectionState( (prevState) => ({
            ...prevState,
            countryCode: locationNameOptions.isoLabel,
            locationName: location,
        }));
        setCountryCode2( locationNameOptions.isoLabel )
        if( locationNameOptions.isoLabel === 'WLRD' ) {
            if(map){
                if (clickId !== null){
                    map.setFeatureState(
                        { source: 'geo_countries', id: clickId },
                        { clicked: false }
                    );
                }
                setClickId(null);
            }
        }else {
            if(map){
                if (clickId !== null){
                    map.setFeatureState(
                        { source: 'geo_countries', id: clickId },
                        { clicked: true }
                    );
                }
                setClickId( clickId );
            }
        }
        //else setClickId( null );
        // console.log(clickId)
        // console.log({ map })
        // console.log(locationNameOptions)
    }, [locale]);

    useEffect(() => {
        if( clickId === null ) {
            let title = '';
            if( locale == 'en' ) title = 'World';
            if( locale == 'es' ) title = 'Mundo';
            if( locale == 'pt' ) title = 'Mundo';
            setLocationName2( title );
        }else {
            setLocationName2( locationName2 );
            setCountryCode2( locationNameOptions.isoLabel );
        }
        //console.log('fngknrfkgknknkbnklnfkgn', locationName2)
    }, [ clickId ])
    

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
    }, [isLoadingElements, locale]);

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
    }, [isLoadingMacroRegions, locale]);

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
        }
    }, [locale]);

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
            if (map) {
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
            locationName: macroRegionCode == '10' ? dataTranslate('world-locale') : regionsObj[regionCode][dataTranslate('LOCALE_FILTER_REGION') as keyof typeof regionsObj[typeof regionCode]].toString()
        }));
        setLocationName2( (macroRegionCode == '10' ? dataTranslate('world-locale') : regionsObj[regionCode][dataTranslate('LOCALE_FILTER_REGION') as keyof typeof regionsObj[typeof regionCode]].toString()) ?? 'Loading...' );
        setLocationNameOptions(( prevState ) => ({
            ...prevState,
            en: regionsObj[regionCode]?.region_name,
            es: regionsObj[regionCode]?.region_name_es,
            pt: regionsObj[regionCode]?.region_name_pt,
            isoLabel: regionCode,
            clickId: null
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
            // const response = await beansApi.get(`api/v1/data/podium/${ countryCode2 }/5412/${idCrop}/${ year }`);
            const response = await centralApi.get(`api/v1/data/podium/${ countryCode2 }/5412/${idCrop}/${ year }`);
            const { data } = response;
            const dataFetch: PodiumDataStructureFetchApi = { data }
            const rank = toFindCropOfInterest( dataFetch, 'Beans, dry' )
            // const rank = toFindCropOfInterest( dataFetch, 'Rice, paddy' )
            setPodiumRank( rank );
        }
        dataPodiumFetch();
    }, [ countryCode2, year ]);

    useEffect(() => {
        if (indicatorOnAverage && !isLoadingIndicatorOnAverage) {
            setOnAverageIndicator(indicatorOnAverage);
        }
    }, [isLoadingIndicatorOnAverage]);

    // const chartConfig = [
    //     {
    //         dataURL: `${baseURL}/api/v1/chart/default/${cropName}_production/${countryCode}?elementIds=[1001,1002,1003]&cropIds=[${idCrop}]`,
    //         options: annual_growth_options,
    //         config: {key: 'id_element', name:'id_element'},
    //         name: 'Annual growth',
    //         elementsURL: `${baseURL}/api/v1/data/elements/2`,
    //         description: 'gráfico 2 de producción'
    //     },
    //     {
    //         dataURL: `${baseURL}/api/v1/chart/default/${cropName}_production/${countryCode}?elementIds=[1007,1008,1009]&cropIds=[${idCrop}]`,
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
                locationName: macroRegionCode == '10' ? dataTranslate('world-locale') : regionsObj[regionCode][dataTranslate('LOCALE_FILTER_REGION') as keyof typeof regionsObj[typeof regionCode]].toString()
            }));
            setLocationName2( (macroRegionCode == '10' ? dataTranslate('world-locale') : regionsObj[regionCode][dataTranslate('LOCALE_FILTER_REGION') as keyof typeof regionsObj[typeof regionCode]].toString()) ?? '...' );
            setLocationNameOptions(( prevState ) => ({
                ...prevState,
                en: regionsObj[regionCode]?.region_name,
                es: regionsObj[regionCode]?.region_name_es,
                pt: regionsObj[regionCode]?.region_name_pt,
                isoLabel: regionCode,
                clickId: null
            })); 

            if( locationNameOptions.isoLabel === 'WLRD' ) {
                if(map){
                    if (clickId !== null){
                        map.setFeatureState(
                            { source: 'geo_countries', id: clickId },
                            { clicked: false }
                        );
                    }
                    setClickId(null);
                }
            }else {
                if(map){
                    if (clickId !== null){
                        map.setFeatureState(
                            { source: 'geo_countries', id: clickId },
                            { clicked: true }
                        );
                    }
                    setClickId( clickId );
                }
            }
        }
    }, [countryCode]);

    // Executes the tour for production. This useEffect runs only once
    useEffect(() => {
        if ( !getCookie('production_tour') ) {
            setTimeout( () => {
                if (setSteps) {
                    if( window.innerWidth! < 991 ) {
                        if( locale == 'en' ) setSteps(general_data_steps_mobile);
                        else if ( locale == 'es' ) setSteps(general_data_steps_es_mobile);
                        else if ( locale == 'pt' ) setSteps(general_data_steps_pt_mobile);
                    }
                    else { 
                        if( locale == 'en' ) setSteps(general_data_steps);
                        else if ( locale == 'es' ) setSteps(general_data_steps_es);
                        else if ( locale == 'pt' ) setSteps(general_data_steps_pt);
                    }
                    setCookie('production_tour', true);
                    setIsOpen(true);
                }
            }, 2000);
        }
    }, []);

    const [isCollapsed, setIsCollapsed] = useState(false);
    
    const [sideBarColumn, setSideBarColumn] = useState('');
    const [contentColumn, setContentColumn] = useState('');
    const [sideBarSubcolumn, setSideBarSubcolumn] = useState(9);
    const [collapsedSideBarButton, setCollapsedSideBarButton] = useState(3);

    const onCickCollapsed = () => {
        
        setIsCollapsed(!isCollapsed);
        //console.log(isCollapsed)
    }
    useEffect(() => {
        if( width! < 992 ) {
            setSideBarColumn( '0%' );
            setContentColumn( '100%' );
        }
        if ( width! > 992 && width! < 1200 ) {
            if ( !isCollapsed ) {
                setSideBarColumn( '20%' );
                setContentColumn( '78%' );
            }else {
                setSideBarColumn( '10%' );
                setContentColumn( '88%' );
            }
        }else if (width! > 1200 && width! < 1400){
            if ( !isCollapsed ) {
                setSideBarColumn( '15%' );
                setContentColumn( '83.1%' );
            }else {
                setSideBarColumn( '10%' );
                setContentColumn( '88.1%' );
            }
            
        }
        else if (width! > 1400){
            if ( !isCollapsed ) {
                setSideBarColumn( '13%' );
                setContentColumn( '85.2%' );
            }else {
                setSideBarColumn( '8%' );
                setContentColumn( '90.2%' );
            }
            
        }

    }, [ isCollapsed ])

    useEffect(() => {
        if ( width! > 992 && width! < 1200 ) {
            if ( !isCollapsed ) {
                setSideBarColumn( '20%' );
                setContentColumn( '78%' );
            }else {
                setSideBarColumn( '8%' );
                setContentColumn( '90%' );
            }
        }
        else if (width! > 1200 && width! < 1400){
            if ( !isCollapsed ) {
                setSideBarColumn( '15%' );
                setContentColumn( '83.1%' );
            }else {
                setSideBarColumn( '7%' );
                setContentColumn( '91.1%' );
            }
            
        }
        else if (width! > 1400 && width! < 1600){
            if ( !isCollapsed ) {
                setSideBarColumn( '13%' );
                setContentColumn( '85.2%' );
            }else {
                setSideBarColumn( '6%' );
                setContentColumn( '92.2%' );
            }
            
        }
        else if ( width! > 1600 ){
            if ( !isCollapsed ) {
                setSideBarColumn( '13%' );
                setContentColumn( '85.2%' );
            }else {
                setSideBarColumn( '5%' );
                setContentColumn( '93.2%' );
            }
        }
        // if( width! < 991 ) setContentColumn('100%');
    })
    
    

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
    const [searchCountryTextButton, setSearchCountryTextButton] = useState('');
    const [mapGraphsText, setMapGraphsText] = useState('');
    const [metadataText, setMetadataText] = useState('');
    const [podiumMoreInfoText, setPodiumMoreInfoText] = useState('');
    const [moreInfoChart1_1, setMoreInfoChart1_1] = useState('');
    const [moreInfoChart1_2, setMoreInfoChart1_2] = useState('');
    const [moreInfoChart2_1, setMoreInfoChart2_1] = useState('');
    const [moreInfoChart2_2, setMoreInfoChart2_2] = useState('');
    const [localeFilterElement, setLocaleFilterElement] = useState('');
    const [locationText, setLocationText] = useState('');
    const [metadataText1, setMetadataText1] = useState('');
    const [metadataText2, setMetadataText2] = useState('');
    const [metadataText3, setMetadataText3] = useState('');
    const [metadataText4, setMetadataText4] = useState('');
    const [metadataText5, setMetadataText5] = useState('');
    const [metadataText6, setMetadataText6] = useState('');
    const [metadataText7, setMetadataText7] = useState('');
    const [metadataText8, setMetadataText8] = useState('');
    const [metadataText9, setMetadataText9] = useState('');
    const [metadataText10, setMetadataText10] = useState('');
    const [metadataText11, setMetadataText11] = useState('');
    const [metadataText12, setMetadataText12] = useState('');
    const [metadataText13, setMetadataText13] = useState('');
    const [metadataText14, setMetadataText14] = useState('');
    const [metadataText15, setMetadataText15] = useState('');

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
        setPlotly1TitleByShare(dataTranslate('plotly1_by_value_beans')!+ locationName);
        setPlotly2TitleByValue(dataTranslate('plotly2_by_value_beans')!+ locationName);
        setPlotly2TitleByShare(dataTranslate('plotly2_by_value_beans')!+ locationName);
        setByValueText(dataTranslate('by_value')!);
        setByShareText(dataTranslate('by_share')!);
        setPlotly1YLabelByValue(dataTranslate('plotly1_ylabel_by_value_beans')!);
        setPlotly2YLabelByValue(dataTranslate('plotly2_ylabel_by_value_beans')!);
        setPlotly1YLabelByShare(dataTranslate('plotly1_ylabel_by_share_beans')!);
        setPlotly2YLabelByShare(dataTranslate('plotly2_ylabel_by_share_beans')!);
        setSearchCountryTextButton(dataTranslate('search_country')!);
        setMapGraphsText(dataTranslate('graphs_maps')!);
        setMetadataText(dataTranslate('metadata')!);
        setPodiumMoreInfoText(dataTranslate('more_info_podium_beans')!);
        setMoreInfoChart1_1(dataTranslate('harvested_area_in_relation_to_other_crops_beans_1')!);
        setMoreInfoChart1_2(dataTranslate('harvested_area_in_relation_to_other_crops_beans_2')!);
        setMoreInfoChart2_1(dataTranslate('harvested_area_in_relation_to_other_keywork_beans_1')!);
        setMoreInfoChart2_2(dataTranslate('harvested_area_in_relation_to_other_keywork_beans_2')!);
        setMetadataText1(dataTranslate('metadata_text1_beans')!);
        setMetadataText2(dataTranslate('metadata_text2_beans')!);
        setMetadataText3(dataTranslate('text1_1_list_beans')!);
        setMetadataText4(dataTranslate('text1_2_list_beans')!);
        setMetadataText5(dataTranslate('text2_1_list_beans')!);
        setMetadataText6(dataTranslate('text2_2_list_beans')!);
        setMetadataText7(dataTranslate('text3_1_list_beans')!);
        setMetadataText8(dataTranslate('text3_2_list_beans')!);
        setMetadataText9(dataTranslate('note')!);
        setMetadataText10(dataTranslate('metadata_text3_beans')!);
        setMetadataText11(dataTranslate('references')!);
        setMetadataText12(dataTranslate('faotext')!);
        setMetadataText13(dataTranslate('variables')!);
        setMetadataText14(dataTranslate('text4_1_list_beans')!);
        setMetadataText15(dataTranslate('text4_2_list_beans')!);
        setLocaleFilterElement(dataTranslate('LOCALE_FILTER_ELEMENT')!);
        setLocationText(locationName);
    }, [dataTranslate, locationName])

    // useEffect(() => {
    //     setIndicators( [] );
    //     if (indicatorTotalCropLandArea && !isLoadingIndicatorTotalCropLandArea) {
    //         const totalCropLandArea = Number(indicatorTotalCropLandArea * 100).toFixed(2);
    //         const indicatorTotalCropLand: PercentInfoProps = {
    //             label: totalAreaText1,
    //             percent: totalCropLandArea
    //         }
    //         setOnAverageIndicator(indicatorTotalCropLandArea);
    //         setIndicators( indicators => [...indicators, indicatorTotalCropLand] );
    //     }
    // }, [isLoadingIndicatorTotalCropLandArea, totalAreaText1]);
    
    // useEffect(() => {
    //     // setIndicators( [] );
    //     if (indicatorTotalCerealArea && !isLoadingIndicatorTotalCerealArea) {
    //         const totalCerealArea = Number(indicatorTotalCerealArea * 100).toFixed(2);
    //         const indicatorTotalCereal: PercentInfoProps = {
    //             label: totalAreaText2,
    //             percent: totalCerealArea
    //         }
    //         setOnAverageIndicator(indicatorTotalCerealArea);
    //         setIndicators( indicators => [...indicators, indicatorTotalCereal] );
    //     }
    // }, [isLoadingIndicatorTotalCerealArea,totalAreaText2]);

    useEffect(() => {
        if (!isLoadingIndicatorTotalCropLandArea && !isLoadingIndicatorTotalCerealArea) {
            setIndicators([]);
    
            if (indicatorTotalCropLandArea) {
                const totalCropLandArea = Number(indicatorTotalCropLandArea * 100).toFixed(2);
                const indicatorTotalCropLand: PercentInfoProps = {
                    label: totalAreaText1,
                    percent: totalCropLandArea,
                };
                setOnAverageIndicator(indicatorTotalCropLandArea);
                setIndicators((indicators) => [...indicators, indicatorTotalCropLand]);
            }   
            if (indicatorTotalCerealArea) {
                const totalCerealArea = Number(indicatorTotalCerealArea * 100).toFixed(2);
                const indicatorTotalCereal: PercentInfoProps = {
                    label: totalAreaText2,
                    percent: totalCerealArea,
                };
                setOnAverageIndicator(indicatorTotalCerealArea);
                setIndicators((indicators) => [...indicators, indicatorTotalCereal]);
            }
        }
    }, [isLoadingIndicatorTotalCropLandArea, isLoadingIndicatorTotalCerealArea, totalAreaText1, totalAreaText2]);
    

    // console.log(sideBarColumn, contentColumn)  

    //console.log(elementsOptions)
    console.log(`${baseURL}/api/v1/data/adminIds/${cropName}_surface_context/${admin}/${regionCode}/${idCrop}/${year}?id_elements=[${elementId}]`)
    return (
        <Layout title={ titlePage }>
            <Container fluid className={ styles['custom-container-fluid'] }>
                <div className={ styles['custom-subcontainer-fluid'] }>
                    {/* modificar el width abajo */}
                    <div className={ styles['sidebar-container'] } style={ width! < 991 ? { display: 'none' } : { width: sideBarColumn }}>
                        <div className={ isCollapsed ? styles['sidebar-component-container-collapsed'] : styles['sidebar-component-container'] }>
                            <SidebarComponent isCollapsedProp={ isCollapsed }/>
                        </div>
                        <div className={ isCollapsed ? styles['sidebar-arrow-container-collapsed'] : styles['sidebar-arrow-container'] }>
                            <Button id='btn-collapse-sidebar' onClick={ onCickCollapsed } className={ styles['button-collapsed'] } >
                                {  
                                    isCollapsed ? <KeyboardTabIcon/> : <KeyboardBackspaceIcon/> 
                                }
                            </Button>
                        </div>
                    </div>
                    {/* modificar el width abajo */}
                    <div className={ styles['main-content-container'] } style={{ width: contentColumn, marginLeft: "0px" }} >
                        <Row className={ styles['padding-left-subcontainers'] }>
                            <Col xs={ 12 } className={ `${ styles['no-margin'] } ${ styles['no-padding'] }` }>
                                <MainBar key={ uuidv4() } section={` ${ titleSection } - ${locationName2}`} >
                                        <BackButton regionCode={regionCode} countryCode={ locationNameOptions.isoLabel } setSectionState={setSectionState} setCountryCode2={ setCountryCode2 } setClickId={ setClickId } setLocationNames={ setLocationNameOptions } clickId={ clickId } locale={ locale ?? 'en'}/>
                                </MainBar>
                            </Col>
                        </Row>
                        <Row className={ styles['padding-left-subcontainers'] }>
                            <Col xs={ 12 } style={{ height: '50px', padding: '0' }}>
                            <Tabs
                                defaultActiveKey="home"
                                id="uncontrolled-tab-example"
                                >
                                <Tab eventKey="home" title={ mapGraphsText } tabClassName={styles.coloredTab}>
                                    <Row style={{ paddingLeft: '12px' }}>
                                        <LeftSideMenuContainer/>
                                        <Col xs={ 12 }  lg={ mapCol } style={ showMap ? { display: 'block', height: '80vh', position: 'relative' } : { display: 'none' } } className={ `${ styles['no-margin'] } ${ styles['no-padding'] }` }>
                                            <Row className={ styles['row-map-selects-filter'] } style={ isMapView ? { marginRight: '20px' } : undefined }>
                                                <Row style={{justifyContent: 'flex-end', flexWrap: 'wrap', gap: '5px'}}>
                                                    <MapSelect id='element-filter' options={elementsOptions} selected={elementId} setSelected={setSectionState} atrName='elementId'/>
                                                    <MapSelect id='year-filter' options={yearsOptions} selected={year} setSelected={setSectionState} atrName='year'/>
                                                    <MapSelect id='macro-region-filter' options={macroRegionsOptions} selected={locationNameOptions.macroRegionCode!} setSelected={setSectionState} setLocationNames={ setLocationNameOptions } atrName='macroRegionCode'/>
                                                    { macroRegionCode == '10' ? <></> : <MapSelect options={regionsOptions} selected={locationNameOptions.regionCode!} setSelected={setSectionState} setLocationNames={ setLocationNameOptions } atrName='regionCode'/> }
                                                </Row>
                                                <Row style={{justifyContent: 'flex-end', flexWrap: 'wrap'}}>
                                                    <SearchCountryButton btnText={searchCountryTextButton} setShowCountries={setShowCountries} />
                                                </Row>
                                            </Row>
                                            <MapView admin={admin} geoJsonURL={`${baseURL}/api/v1/geojson/countries/${cropName}_surface_context/ISO3/${idCrop}`} adminIdsURL={`${baseURL}/api/v1/data/adminIds/${cropName}_surface_context/${admin}/${regionCode}/${idCrop}/${year}?id_elements=[${elementId}]`} percentileURL={`${baseURL}/api/v1/percentile/values/undefined/data_production_surface_context/${elementId}/${idCrop}/${year}?tradeFlow=undefined`} quintilURL={`${baseURL}/api/v1/percentile/heatmap`} legendTitle={ ( (localeFilterElement !== '') && elementsObj[elementId] ? elementsObj[elementId][localeFilterElement as keyof typeof elementsObj[typeof elementId]].toString() : 'Loading...') } elementUnit={elementsObj[elementId]?.UNIT} isMapView={ isMapView } />
                                            {/* <MapView admin={admin} geoJsonURL={`${baseURL}/api/v1/geojson/countries/rice_surface_context/ISO3/27`} adminIdsURL={`${baseURL}/api/v1/data/adminIds/rice_surface_context/${admin}/${regionCode}/27/${year}?id_elements=[${elementId}]`} percentileURL={`${baseURL}/api/v1/percentile/values/undefined/data_production_surface_context/${elementId}/27/${year}?tradeFlow=undefined`} quintilURL={`${baseURL}/api/v1/percentile/heatmap`} legendTitle={ elementsObj[elementId]?.ELEMENT_EN ?? 'Loading...'} /> */}
                                        
                                        </Col>
                                        <Col xs={ 12 } lg={ graphsCol } style={ showGraphs && !showMap ? { display: 'block', height: '80vh', overflow: 'auto', paddingLeft: '60px' } : showGraphs ? { display: 'block', height: '80vh', overflow: 'auto' } : { display: 'none' } }>
                                            {
                                                buttonGraphs ?
                                                    <Row style={{ zIndex: '3', width: '100%', justifyContent: 'flex-end', gap: '5px', marginTop: '20px', marginBottom: '20px'}}>
                                                        <Row style={{justifyContent: 'center', flexWrap: 'wrap', gap: '5px'}}>
                                                            <MapSelect id='year-filter' options={yearsOptions} selected={year} setSelected={setSectionState} atrName='year'/>
                                                            <MapSelect id='macro-region-filter' options={macroRegionsOptions} selected={locationNameOptions.macroRegionCode!} setSelected={setSectionState} setLocationNames={ setLocationNameOptions } atrName='macroRegionCode'/>
                                                            { macroRegionCode == '10' ? <></> : <MapSelect options={regionsOptions} selected={locationNameOptions.regionCode!} setSelected={setSectionState} setLocationNames={ setLocationNameOptions } atrName='regionCode'/> }
                                                            <Button
                                                                className={`${styles['search-country-button']}`}
                                                                style={{width: '145px', lineHeight: '12px'}}
                                                                onClick={() => setShowCountries(true)}
                                                            >
                                                                {searchCountryTextButton}
                                                            </Button>
                                                        </Row>
                                                    </Row>
                                                :
                                                    <></>
                                            }
                                            {(!isLoadingElements && !isLoadingYears && !isLoadingMacroRegions && !isLoadingRegions)?
                                            <>
                                            <PodiumWithLink 
                                                dataURL={ `${ baseURL }/api/v1/data/podium/${ countryCode2 }/5412/${idCrop}/${ year }` } 
                                                text1={ text1Podium } 
                                                text2={ `${ podiumRank }°` }
                                                text3={ text2Podium }
                                                text4={ `${year}` }
                                                description={ podiumMoreInfoText }
                                                currentYearSelected={ year }
                                                />
                                            <p style={{ textAlign: 'center', padding: '20px 0px' }}> { indicatorText1 } <span style={ textBold } >{ indicatorOnAverage }°</span> { indicatorText2 } <span style={ textBold }>{ indicatorText3 }</span> </p>
                                            <p style={{ textAlign: 'center' }}>{ harvestedAreaText1 } <span style={ textBold }>{year}</span>{ harvestedAreaText2 }</p>
                                            {/* <PodiumWithLink dataURL={ `${ baseURL }/api/v1/data/podium/${ countryCode }/5412/27/${ year }` } text={`Rice was the ${ podiumRank }° most important crop in relation to harvested area (ranking) in year ${year}`} description='Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras mattis sed libero eu aliquet. Aenean mi tellus, tincidunt sit amet elit nec, mollis tristique arcu. Maecenas ornare vulputate nisl eu hendrerit. Ut vehicula elit quam, at porttitor mauris porta a. Duis condimentum euismod magna et elementum.' /> */}
                                            {/* <p style={{ textAlign: 'center', padding: '20px 0px' }}>	On average, rice was the { onAverageIndicator }° crop to growth the most in the last decade</p> */}
                                            {/* <p style={{ textAlign: 'center' }}>In {year}, harvested rice area accounted for:</p> */} 
                                            <PercentContainer data={ indicators } percentAlone={ false } />
                                            <br /> 
                                            <PlotlyChartStackedAreaContainer locale={ locale } stackedAreaID='chart-container1' moreInfoTextStackedArea={ moreInfoChart1_1 } moreInfoTextStackedArea2={moreInfoChart1_2} stackedAreaNormalizedID='chart-container2' moreInfoTextStackedAreaNormalized={ moreInfoChart1_1 } moreInfoTextStackedAreaNormalized2={moreInfoChart1_2} fetchDataUrl={ `${ baseURL }/api/v1/chart/default/${cropName}_surface_context/${ countryCode2 }?elementIds=[5312]&cropIds=[${idCrop},96002,98001,97001,95001,94001,93001,99001]` } cropNameToFind='Beans, dry' secondCropName='Peas, dry' stackedAreaTitle={ plotly1TitleByValue } stackedAreaNormalizedTitle={ plotly1TitleByShare } namesArr={[byValueText, byShareText]} yLabelStackedArea={plotly1YLabelByValue} yLabelShare={ plotly1YLabelByShare } />
                                            <PlotlyChartStackedAreaContainer locale={ locale } stackedAreaID='chart-container3' moreInfoTextStackedArea={ moreInfoChart2_1 } moreInfoTextStackedArea2={ moreInfoChart2_2 } stackedAreaNormalizedID='chart-container4' moreInfoTextStackedAreaNormalized={ moreInfoChart2_1 } moreInfoTextStackedAreaNormalized2={ moreInfoChart2_2 } fetchDataUrl={ `${ baseURL }/api/v1/chart/default/${cropName}_surface_context/${ countryCode2 }?elementIds=[5312]&cropIds=[${idCrop},181,187,191,195,197,201,203,205,210,211]` } cropNameToFind='Beans, dry' secondCropName='Peas, dry' stackedAreaTitle={ plotly2TitleByValue } stackedAreaNormalizedTitle={ plotly2TitleByShare } namesArr={[byValueText, byShareText]} yLabelStackedArea={plotly2YLabelByValue} yLabelShare={ plotly2YLabelByShare }  />
                                            {/* <PlotlyChartStackedAreaContainer  stackedAreaID='chart-container1' moreInfoTextStackedArea='Lorem ipsum 1' stackedAreaNormalizedID='chart-container2' moreInfoTextStackedAreaNormalized='Lorem ipsum 2' fetchDataUrl={ `${ baseURL }/api/v1/chart/default/rice_surface_context/${ countryCode }?elementIds=[5312]&cropIds=[27,98002,97001,96001,95001,94001,93001,99001]` } cropNameToFind='Rice, paddy' secondCropName='Cereals excl.rice' stackedAreaTitle='Stacked area' stackedAreaNormalizedTitle='Stacked area normalized' namesArr={['By value', 'By share']} /> */}
                                            {/* <PlotlyChartStackedAreaContainer  stackedAreaID='chart-container3' moreInfoTextStackedArea='Lorem ipsum 3' stackedAreaNormalizedID='chart-container4' moreInfoTextStackedAreaNormalized='Lorem ipsum 4' fetchDataUrl={ `${ baseURL }/api/v1/chart/default/rice_surface_context/${ countryCode }?elementIds=[5312]&cropIds=[27,15,44,56,71,75,79,83,89,92,94,97,101,103,108]` } cropNameToFind='Rice, paddy' secondCropName='Cereals excl.rice' stackedAreaTitle='Stacked area' stackedAreaNormalizedTitle='Stacked area normalized' namesArr={['By value', 'By share']} /> */}
                                            {/* <LineChartjs dataURL={`${baseURL}/api/v1/chart/default/${cropName}_production/${countryCode}?elementIds=[5510,5312,1000]&cropIds=[${idCrop}]`} elementsURL={`${baseURL}/api/v1/data/elements/2`} options={harvested_production_yield} config={{key: 'id_element', name:'id_element'}} description={'gráfico 1 de producción'} chartID='prod1' chartConf={{fill: true, pointRadius: 1, yAxisID: 'y'}} orderList={{1000:0, 5312:1, 5510:2}}/>
                                            <br/>
                                            <PodiumSelection podiumsList={podiumConfig} /> beans_su
                                            <br/>
                                            <ChartSelection chartConfigList={chartConfig} /> */}
                                            <SourcesComponent sourcesText={ locale == 'en' ? 'Data Sources:' : ( locale == 'es' ? 'Fuentes:' : 'Fontes:' ) } shortName='FAO' year='2022' completeName='FAOSTAT Database' url='http://www.fao.org/faostat/en/#data' />
                                            </>
                                            :
                                            <div style={{height:"100%",width:"100%",display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center"}}><LoadingComponent/></div>
                                            }
                                            
                                        </Col>
                                    </Row>
                                    
                                </Tab>
                                <Tab eventKey="profile" title={metadataText} tabClassName={styles.coloredTab}>
                                    <p>
                                        { metadataText1 }
                                    </p>
                                    <p>{ metadataText2 }</p>
                                    <ol type='a'>
                                        <li><span className={ styles['text-strong'] }>{ metadataText3 } </span>: { metadataText4 }</li>
                                        <li><span className={ styles['text-strong'] }>{ metadataText5 } </span>: { metadataText6 }</li>
                                        <li><span className={ styles['text-strong'] }>{ metadataText7 } </span>: { metadataText8 }</li>
                                    </ol>
                                    <p><span className={ styles['text-strong'] }>{ metadataText9 }: </span>{ metadataText10 }</p>
                                    <p className={ styles['text-strong'] }>{ metadataText11 }</p>
                                    <ul>
                                        <li>{ metadataText12 } <a href="http://www.fao.org/faostat/en/#data">http://www.fao.org/faostat/en/#data</a></li>
                                    </ul>
                                    <p className={ styles['text-strong'] }>{ metadataText13 }</p>
                                    <ul >
                                        <li>{ metadataText14 }</li>
                                        <li>{ metadataText15 }</li>
                                    </ul>
                                </Tab>
                            </Tabs>
                            </Col>

                            
                        </Row>
                    </div>
                </div> 
            </Container>
            <SearchCountryModal adminIdsUrl={`${baseURL}/api/v1/data/adminIds/${cropName}_surface_context/${admin}/${regionCode}/${idCrop}/${year}?id_elements=[${elementId}]`} show={showCountries} handleClose={setShowCountries} clickId={clickId} setSectionState={setSectionState} setClickId={setClickId} setLocationName2={ setLocationName2 } setLocationNames={ setLocationNameOptions } />
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
