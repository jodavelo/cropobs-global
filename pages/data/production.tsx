import { useState, useEffect, useContext } from 'react'
import { GetStaticProps, NextPage } from 'next';
import { Button, Col, Container, Row, Tab, Tabs } from 'react-bootstrap';
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
import { PodiumSelectionTranslations } from '../../components/data/podium';
import { ChartSelection } from '../../components/data/charts';
import { harvested_production_yield } from '../../helpers/data/chartjs-options/harvested-production-yield';
import { MapContext } from '../../context/map';
import { LeftSideMenuContext } from '../../context/map/leftsidemenu';
import { LeftSideMenuContainer, MapSelect } from '../../components/ui/map/filters';
import { ElementsData, ElementsState, MacroRegionsData, MacroRegionsState, RegionsData, RegionsState, YearsData, YearsState } from '../../interfaces/data';
import { dataFetcher, generateElementsOptions, generateOptionsFromObj, generateRegionOptions, generateYearsOptions, GenerateDataJsonGeneric } from '../../helpers/data';
import { BackButton } from '../../components/data/back-button';
import { useTour } from '@reactour/tour';
import { general_data_steps, general_data_steps_es, general_data_steps_es_mobile, general_data_steps_mobile, general_data_steps_pt, general_data_steps_pt_mobile } from '../../helpers/data/tour';
import { getCookie, setCookie } from 'cookies-next';
import { SearchCountryModal } from '../../components/data/search-country-modal';
import { sectionState, PodiumConfig, ChartConfig, ConfigChart } from '../../interfaces/data/section-states';
import { SourcesComponent } from '../../components/ui/sources-component';
import KeyboardTabIcon from '@mui/icons-material/KeyboardTab';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import { useWindowSize } from '../../hooks';
import { positionPodiumReplacer } from '../../helpers/data/podium/positionPodiumReplacer';
import { SearchCountryButton } from '../../components/data/search-country-button/SearchCountryButton';
import { useRouter } from 'next/router';
import { LoadingComponent } from '../../components/ui/loading-component';
import { PodiumSelectionCon } from '../../components/data/podium/PodiumSelectionCon';


interface locationNameOptions {
    en: string;
    es: string;
    pt: string;
    isoLabel: string;
    clickId: number | null | string;
}

const mapFilterElements = [1000, 5312, 5510];
const regionsElementId = {1201:1201, 1202:1202, 1060:1154, 1059:1153, 58:152, 5510:5510, 1000:1000, 5312:5312, 645:14, 6:6, 7:7};
// const baseURL = 'https://commonbeanobservatorytst.ciat.cgiar.org';
//const baseURL = 'https://cropobs-central.ciat.cgiar.org';
//let clickId: string | number | null = null;
const baseURL = process.env.NEXT_PUBLIC_BASE_URL; //
const idCrop = process.env.NEXT_PUBLIC_ID_CROP; //176
const cropName = process.env.NEXT_PUBLIC_CROP_NAME; //beans
const idGroup = process.env.NEXT_PUBLIC_ID_GROUP; //96001
const idIndicators = process.env.NEXT_PUBLIC_ID_INDICATORS; //2546

interface OtherTexts {
    section_name: string
    section_text: string
    chart1_info: string
    sources_text: string
    search_country: string
    element_locale: string
}


const ProductionPage: NextPage = () => {
    const { t: dataTranslate } = useTranslation('data-production');
    const { locale } = useRouter();
    const [ sectionState, setSectionState ] = useState<sectionState>({
        elementId: 1000,
        regionCode: 'WLRD',
        macroRegionCode: '10',
        countryCode: 'WLRD',
        year: 2021,
        admin: 'World',
        locationName: dataTranslate('world-locale')
    });
    const [locationNameOptions, setLocationNameOptions] = useState<locationNameOptions>({
        en: 'World',
        es: 'Mundo',
        pt: 'Mundo',
        isoLabel: 'WLRD',
        clickId: 0
    });
    const [locationName2, setLocationName2] = useState('');
    const { elementId, regionCode, macroRegionCode, countryCode, year, admin, locationName } = sectionState;
    const [countryCode2, setCountryCode2] = useState('WLRD');
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

    const [podiumConfig, setPodiumConfig] = useState<PodiumConfig[] | undefined>(undefined);
    const [chartConfig, setChartConfig] = useState<ChartConfig[] | undefined>(undefined);
    const [lineChartConfig, setLineChartConfig] = useState<ConfigChart | undefined>(undefined);
    const [otherTexts, setOtherTexts] = useState<OtherTexts | undefined>(undefined);

    const { data: elementsData, isLoading: isLoadingElements } = useSWR<ElementsData[]>(`${baseURL}/api/v1/data/elements/2`, dataFetcher);

    const { data: yearsData, isLoading: isLoadingYears } = useSWR<YearsData[]>(`${baseURL}/api/v1/data/years/OBSERVATIONS`, dataFetcher);

    const { data: macroRegionsData, isLoading: isLoadingMacroRegions } = useSWR<Record<string, MacroRegionsData>>(`${baseURL}/api/v1/data/macroRegions`, dataFetcher);

    const { data: regionsData, isLoading: isLoadingRegions } = useSWR<Record<string, RegionsData>>(`${baseURL}/api/v1/data/regions/${regionsElementId[elementId as keyof typeof regionsElementId]}/${ idCrop }/${year}`, dataFetcher);
    const [isMapView, setIsMapView] = useState(false);

    useEffect(() => {
        activeBothButtons();
    }, []);

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
                                countryCode: e.features![0].properties!.iso3,
                                locationName: e.features![0].properties![dataTranslate('LOCALE_COUNTRY_NAME')]
                            }));
                            setCountryCode2(iso);
                            console.log(properties!.iso3)
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

    useEffect(() => {
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
        setTitleSection(dataTranslate('section-name')!);
        console.log({countryCode2})
    }, [locale])

    useEffect(() => {
        setTitleSection(dataTranslate('section-name') ?? '');
    })
    

    useEffect(() => {
        if( clickId === null ) {
            let title = '';
            if( locale == 'en' ) title = 'World';
            if( locale == 'es' ) title = 'Mundo';
            if( locale == 'pt' ) title = 'Mundo';
            setSectionState( (prevState) => ({
                ...prevState,
                locationName: title
            }));
        }else {
            setLocationName2( locationName2 );
            setCountryCode2( locationNameOptions.isoLabel );
        }
    }, [ clickId ])
    

    useEffect(() => {
        if (elementsData && !isLoadingElements) {
            const elemsObj: Record<string, ElementsData> = {};
            elementsData.map( (value, index) => (elemsObj[value.ID_ELEMENT] = value));
            setElements({
                elementsObj: elemsObj,
                elementsOptions: generateElementsOptions(elementsData, dataTranslate('LOCALE_FILTER_ELEMENT'), mapFilterElements)
            });
        }
    }, [isLoadingElements, dataTranslate]);

    useEffect(() => {
        if (yearsData && !isLoadingYears) {
            setYears({yearsOptions: generateYearsOptions(yearsData)});
        }
    }, [isLoadingYears]);

    useEffect(() => {
        if (macroRegionsData && !isLoadingMacroRegions) {
            setMacroRegions({
                macroRegionsObj: macroRegionsData,
                macroRegionsOptions: generateOptionsFromObj(macroRegionsData, '', dataTranslate('LOCALE_FILTER_REGION'), true)
            });
        }
    }, [isLoadingMacroRegions, dataTranslate]);

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
        // console.log("cambiando-------------------------------------------------------------------------", {regionCode})
        setCountryCode2( regionCode )
    }, [regionCode])

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

    useEffect(() => {
        setPodiumConfig([
            {
                url: `${baseURL}/api/v1/data/podium/${countryCode2}/1103/${idCrop}/${year}`,
                text: dataTranslate('podium1-description').replace('#{1}',year.toString()).replace('#{3}',(year-1).toString()),
                name: dataTranslate('podium1-selector-text'),
                description: dataTranslate('podiums-info'),
                textFormatter: positionPodiumReplacer
            },
            {
                url: `${baseURL}/api/v1/data/podium/${countryCode2}/1101/${idCrop}/${year}`,
                text: dataTranslate('podium2-description').replace('#{1}',year.toString()).replace('#{3}',(year-1).toString()),
                name: dataTranslate('podium2-selector-text'),
                description: dataTranslate('podiums-info'),
                textFormatter: positionPodiumReplacer
            },
            {
                url: `${baseURL}/api/v1/data/podium/${countryCode2}/1102/${idCrop}/${year}`,
                text: dataTranslate('podium3-description').replace('#{1}',year.toString()).replace('#{3}',(year-1).toString()),
                name: dataTranslate('podium3-selector-text'),
                description: dataTranslate('podiums-info'),
                textFormatter: positionPodiumReplacer
            },
        ]);
    
        setChartConfig([
            {
                dataURL: `${baseURL}/api/v1/chart/default/${cropName}_production/${countryCode2}?elementIds=[1001,1002,1003]&cropIds=[${idCrop}]`,
                options: annual_growth_options,
                config: {key: 'id_element', name: dataTranslate('LOCALE_NAME')},
                name: dataTranslate('chart2_1-selector-text'),
                elementsURL: `${baseURL}/api/v1/data/elements/2`,
                description: dataTranslate('chart2_1-info')
            },
            {
                dataURL: `${baseURL}/api/v1/chart/default/${cropName}_production/${countryCode2}?elementIds=[1007,1008,1009]&cropIds=[${idCrop}]`,
                options: ten_year_moving_average_options,
                config: {key: 'id_element', name: dataTranslate('LOCALE_NAME')},
                name: dataTranslate('chart2_2-selector-text'),
                elementsURL: `${baseURL}/api/v1/data/elements/2`,
                description: dataTranslate('chart2_2-info')
            }
        ]);

        
    }, [clickId, year, locationName, dataTranslate]);
    
    useEffect(() => {
        harvested_production_yield.plugins.title.text = dataTranslate('chart1-title').replace('#{}', locationName);
        harvested_production_yield.scales.y.title.text = dataTranslate('chart1-y-axis-label');
        harvested_production_yield.scales.y2.title.text = dataTranslate('chart1-y1-axis-label');
        
        annual_growth_options.plugins.title.text = dataTranslate('chart2_1-title').replace('#{}', locationName);
        annual_growth_options.scales.y.title.text = dataTranslate('chart2_1-y-axis-label');
        
        ten_year_moving_average_options.plugins.title.text = dataTranslate('chart2_2-title').replace('#{}', locationName);
        ten_year_moving_average_options.scales.y.title.text = dataTranslate('chart2_2-y-axis-label');
        setLineChartConfig({key:'id_element', name: dataTranslate('LOCALE_NAME')});
        setOtherTexts({section_name: dataTranslate('section-name'), section_text: dataTranslate('section-text').replace('#{}',locationName), chart1_info: dataTranslate('chart1-info'), sources_text: dataTranslate('sources-text'), search_country: dataTranslate('search-country'), element_locale: dataTranslate('LOCALE_FILTER_ELEMENT')});
        
    }, [dataTranslate, locationName]);



    const [isCollapsed, setIsCollapsed] = useState(false);
    const { width } = useWindowSize();
    const [sideBarColumn, setSideBarColumn] = useState('');
    const [contentColumn, setContentColumn] = useState('');
    const [sideBarSubcolumn, setSideBarSubcolumn] = useState(9);
    const [collapsedSideBarButton, setCollapsedSideBarButton] = useState(3);
    const [locationText, setLocationText] = useState('');

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
    const [mapGraphsText, setMapGraphsText] = useState('');
    const [metadataText, setMetadataText] = useState('');
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
    const [titleSection, setTitleSection] = useState('');
    useEffect(() => {
        setMapGraphsText(dataTranslate('graphs_maps')!);
        setMetadataText(dataTranslate('metadata')!);
        setMetadataText1(dataTranslate('metadata_text1_beans')!);
        setMetadataText2(dataTranslate('metadata_text2_beans')!);
        setMetadataText3(dataTranslate('harvested_area')!);
        setMetadataText4(dataTranslate('harvested_area_description')!);
        setMetadataText5(dataTranslate('production')!);
        setMetadataText6(dataTranslate('production_description')!);
        setMetadataText7(dataTranslate('yield')!);
        setMetadataText8(dataTranslate('yield_description')!);
        setMetadataText9(dataTranslate('references')!);
        setMetadataText10(dataTranslate('faotext')!);
    }, )

    return (
            <Layout title={ otherTexts ? otherTexts.section_name : 'Loading...' }>
                <Container fluid className={ styles['custom-container-fluid'] }>
                    <div className={ styles['custom-subcontainer-fluid'] }>
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
                        <div className={ styles['main-content-container'] } style={{ width: contentColumn }} >
                            <Row className={ styles['padding-left-subcontainers'] }>
                                <Col xs={ 12 } className={ `${ styles['no-margin'] } ${ styles['no-padding'] }` }>
                                    {/* <MainBar key={ uuidv4() } section={otherTexts ? otherTexts.section_text : 'Loading...'} > */}
                                    <MainBar key={ uuidv4() } section={` ${ titleSection } - ${locationName2}`} >
                                        {/* <BackButton regionCode={regionCode} countryCode={countryCode} setSectionState={setSectionState} locale={locale ?? 'en'}/> */}
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
                                                            <MapSelect id='macro-region-filter' options={macroRegionsOptions} selected={macroRegionCode} setSelected={setSectionState} atrName='macroRegionCode'/>
                                                            { macroRegionCode == '10' ? <></> : <MapSelect options={regionsOptions} selected={regionCode} setSelected={setSectionState} atrName='regionCode'/> }
                                                        </Row>
                                                        <Row style={{justifyContent: 'flex-end', flexWrap: 'wrap'}}>
                                                            <SearchCountryButton btnText={otherTexts?.search_country ?? 'Loading...'} setShowCountries={setShowCountries} />
                                                        </Row>
                                                    </Row>
                                                    <MapView admin={admin} geoJsonURL={`${baseURL}/api/v1/geojson/countries/${cropName}_production/ISO3/${idCrop}`} adminIdsURL={`${baseURL}/api/v1/data/adminIds/${cropName}_production/${admin}/${regionCode}/${idCrop}/${year}?id_elements=[${elementId}]`} percentileURL={`${baseURL}/api/v1/percentile/values/undefined/data_production_surface_context/${elementId}/${idCrop}/${year}?tradeFlow=undefined`} quintilURL={`${baseURL}/api/v1/percentile/heatmap`} legendTitle={ (otherTexts && elementsObj[elementId] ? elementsObj[elementId][otherTexts?.element_locale as keyof typeof elementsObj[typeof elementId]].toString() : 'Loading...') } elementUnit={elementsObj[elementId]?.UNIT} isMapView={ isMapView } />
                                                </Col>
                                                <Col xs={ 12 } lg={ graphsCol } style={ showGraphs && !showMap ? { display: 'block', height: '80vh', overflow: 'auto', paddingLeft: '60px' } : showGraphs ? { display: 'block', height: '80vh', overflow: 'auto' } : { display: 'none' } }>
                                                    {
                                                        buttonGraphs ?
                                                        <Row style={{ zIndex: '3', width: '100%', justifyContent: 'flex-end', gap: '5px', marginTop: '20px', marginBottom: '20px'}}>
                                                            <Row style={{justifyContent: 'center', flexWrap: 'wrap', gap: '5px'}}>
                                                                <MapSelect id='year-filter' options={yearsOptions} selected={year} setSelected={setSectionState} atrName='year'/>
                                                                <MapSelect id='macro-region-filter' options={macroRegionsOptions} selected={macroRegionCode} setSelected={setSectionState} atrName='macroRegionCode'/>
                                                                { macroRegionCode == '10' ? <></> : <MapSelect options={regionsOptions} selected={regionCode} setSelected={setSectionState} atrName='regionCode'/> }
                                                                <Button
                                                                    className={`${styles['search-country-button']}`}
                                                                    style={{width: '145px', lineHeight: '12px'}}
                                                                    onClick={() => setShowCountries(true)}
                                                                >
                                                                    {otherTexts?.search_country}
                                                                </Button>
                                                            </Row>
                                                        </Row>
                                                        :
                                                            <></>
                                                        }
                                                        {(!isLoadingElements && !isLoadingYears && !isLoadingMacroRegions && !isLoadingRegions) ?
                                                        <>
                                                        {
                                                            lineChartConfig ? 
                                                            <LineChartjs dataURL={`${baseURL}/api/v1/chart/default/${cropName}_production/${countryCode2}?elementIds=[5510,5312,1000]&cropIds=[${idCrop}]`} elementsURL={`${baseURL}/api/v1/data/elements/2`} options={harvested_production_yield} config={lineChartConfig} description={otherTexts ? otherTexts.chart1_info : 'Loading...'} chartID='prod1' chartConf={{fill: true, pointRadius: 1, yAxisID: 'y'}} orderList={{1000:0, 5312:1, 5510:2}}/>
                                                            : 'Loading...'
                                                        }
                                                    <br/>
                                                        {
                                                            podiumConfig ? 
                                                        <PodiumSelectionTranslations podiumsList={podiumConfig} />
                                                            : 'Loading...'
                                                        }
                                                    <br/>
                                                        {
                                                            chartConfig ?
                                                        <ChartSelection chartConfigList={chartConfig} />
                                                            : 'Loading...'
                                                        }
                                                    <SourcesComponent sourcesText={otherTexts ? otherTexts.sources_text : 'Loading...'} shortName='FAO' year='2022' completeName='FAOSTAT Database' url='http://www.fao.org/faostat/en/#data' />          
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
                                                <li><span className={ styles['text-strong'] }>{ metadataText3 }</span>: { metadataText4 }</li>
                                                <li><span className={ styles['text-strong'] }>{ metadataText5 }</span>: { metadataText6 }</li>
                                                <li><span className={ styles['text-strong'] }>{ metadataText7 }</span>: { metadataText8 }</li>
                                           </ol>
                                           <p className={ styles['text-strong'] }>{ metadataText9 }:</p>
                                           <ul><li>{ metadataText10 } <span><a href="http://www.fao.org/faostat/en/#data">http://www.fao.org/faostat/en/#data</a></span></li></ul>
                                        </Tab>
                                        
                                    </Tabs>
                                </Col>
                                
                            </Row>
                        </div>
                    </div>
                        {/* -------------- */}
                    
                </Container>
                <SearchCountryModal adminIdsUrl={`${baseURL}/api/v1/data/adminIds/${cropName}_production/${admin}/${regionCode}/${idCrop}/${year}?id_elements=[${elementId}]`} show={showCountries} handleClose={setShowCountries} clickId={clickId} setSectionState={setSectionState} setClickId={setClickId} setLocationName2={ setLocationName2 } setLocationNames={ setLocationNameOptions } />
            </Layout>
    )
}

export const getStaticProps: GetStaticProps = async ({ locale }) => {
    return {
        props: {
            ...( await serverSideTranslations( locale!, ['data-production'] ) ),
        }
    }
}

export default ProductionPage;
