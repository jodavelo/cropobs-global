import { useState, useEffect, useContext } from 'react'
import { GetStaticProps, NextPage } from 'next';
import { Button, Col, Container, Row, Tab, Tabs } from 'react-bootstrap';
import { useTranslation } from 'next-i18next';
import 'bootstrap/dist/css/bootstrap.min.css';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { Layout } from '../../components/layouts'
import { MainBar, MapView, SidebarComponent } from '../../components/ui';
import useSWR from 'swr';
import { v4 as uuidv4 } from 'uuid';

import style from './data.module.css';
import { PodiumProductVal as Podium, PorcentagesBox, MultichartPV, ChartFrame, MultiBar1, MultiBar2, MapCON, ChartFrame1Btn } from '../../components/data';
import { dataFetcher, datasetGeneratorPV, generateElementsOptions, generateOptionsFromObj, generateRegionOptions, generateYearsOptions, GenerateDataJsonGeneric ,generateYearsOptionsConsumption } from '../../helpers/data';

import axios from 'axios';
import { LeftSideMenuContainer, MapSelect } from '../../components/ui/map/filters';
import { LeftSideMenuContext } from '../../context/map/leftsidemenu';
import { MapContext } from '../../context/map';
import { PodiumSelectionCon } from '../../components/data/podium/PodiumSelectionCon';
import { APorcentagesBox } from '../../components/data/porcentages-box/APorcentagesBox';
import { sectionState } from '../../interfaces/data/section-states';
import { ElementsData, ElementsState, MacroRegionsData, MacroRegionsState, RegionsData, RegionsState, YearsData, YearsState } from '../../interfaces/data';
import { useTour } from '@reactour/tour';
import { getCookie, setCookie } from 'cookies-next';
import { general_data_steps, general_data_steps_es, general_data_steps_es_mobile, general_data_steps_mobile, general_data_steps_pt, general_data_steps_pt_mobile } from '../../helpers/data/tour';
import { SearchCountryModal } from '../../components/data/search-country-modal';
import { BackButton } from '../../components/data/back-button';
import { SourcesComponent } from '../../components/ui/sources-component';
import DOMPurify from 'isomorphic-dompurify';
import KeyboardTabIcon from '@mui/icons-material/KeyboardTab';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import { useWindowSize } from '../../hooks';
import { useRouter } from 'next/router';
import { SearchCountryButton } from '../../components/data/search-country-button/SearchCountryButton';
import { LoadingComponent } from '../../components/ui/loading-component';

var styles = style;
const mapFilterElements = [6, 7, 645];
const regionsElementId = {1201:1201, 1202:1202, 1060:1154, 1059:1153, 58:152, 5510:5510, 1000:1000, 5312:5312, 645:14, 6:6, 7:7};
const baseURL = process.env.NEXT_PUBLIC_BASE_URL;
const idCrop = process.env.NEXT_PUBLIC_ID_CROP;
const cropName = process.env.NEXT_PUBLIC_CROP_NAME;
const idGroup = process.env.NEXT_PUBLIC_ID_GROUP;
const idIndicators = process.env.NEXT_PUBLIC_ID_INDICATORS;

interface locationNameOptions {
    en: string;
    es: string;
    pt: string;
    isoLabel: string;
    clickId: number | null | string;
}

interface PodiumConfig {
    url: string
    text: string[]
    name: string
    description: string
}

interface DataDocument {
    label : string,
    values: number[]
}

const DataPage: NextPage = () => {
    const { t: dataTranslate } = useTranslation('data-consuption');
    const { width } = useWindowSize();
    const { locale } = useRouter();
    const [ sectionState, setSectionState ] = useState<sectionState>({
        elementId: 6,
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

    // Data translation states
    // const [podiumConfig, setPodiumConfig] = useState<PodiumConfig[] | undefined>(undefined);

    const { data: elementsData, isLoading: isLoadingElements, error: errorElements } = useSWR<ElementsData[]>(`${baseURL}/api/v1/data/elements/4`, dataFetcher, {errorRetryCount:2,revalidateOnFocus:false}); //EP

    const { data: yearsData, isLoading: isLoadingYears, error: errorYears } = useSWR<YearsData[]>(`${baseURL}/api/v1/data/years/OBSERVATIONS?remove2=true`, dataFetcher, {errorRetryCount:2,revalidateOnFocus:false}); //EP

    const { data: macroRegionsData, isLoading: isLoadingMacroRegions, error:errorMacroRegions } = useSWR<Record<string, MacroRegionsData>>(`${baseURL}/api/v1/data/macroRegions`, dataFetcher, {errorRetryCount:2,revalidateOnFocus:false}); //EP

    const { data: regionsData, isLoading: isLoadingRegions, error: errorRegions } = useSWR<Record<string, RegionsData>>(`${baseURL}/api/v1/data/regions/${regionsElementId[elementId as keyof typeof regionsElementId]}/${ idIndicators }/${year}`, dataFetcher, {errorRetryCount:2,revalidateOnFocus:false}); //EP
    const [isMapView, setIsMapView] = useState(false);

    const [isCollapsed, setIsCollapsed] = useState(false);
    
    const [sideBarColumn, setSideBarColumn] = useState('');
    const [contentColumn, setContentColumn] = useState('');
    const [sideBarSubcolumn, setSideBarSubcolumn] = useState(9);
    const [collapsedSideBarButton, setCollapsedSideBarButton] = useState(3);
    const [chartTxts1Label, setChartTxts1Label] = useState('');
    const [chartTxts2Label, setChartTxts2Label] = useState('');

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
        }else {
            // if( locale == 'en' ) title = locationNameOptions.en;
            // if( locale == 'es' ) title = locationNameOptions.es;
            // if( locale == 'pt' ) title = locationNameOptions.pt;
            // setLocationName2( title );
            setLocationName2( locationName2 );
            setCountryCode2( locationNameOptions.isoLabel );
        }
    }, [ clickId, countryCode ])

    useEffect(() => {
        const { isoLabel, en, es, pt } = locationNameOptions;
        let title = '';
        if( isoLabel == 'WLRD' ) {
            if( locale == 'en' ) title = 'World';
            if( locale == 'es' ) title = 'Mundo';
            if( locale == 'pt' ) title = 'Mundo';
        }else {
            if( locale == 'en' ) title = en;
            if( locale == 'es' ) title = es;
            if( locale == 'pt' ) title = pt;
        }
        setChartTxts1Label(dataTranslate('chart1-title').replace('#{}', title));
        setChartTxts2Label(dataTranslate('chart2-title').replace('#{}', title))  
        // console.log("-------------------====================--------------------=================", {locationName2, clickId, locationNameOptions})
        // if( clickId !== null ) {
        //     let title = '';
        //     if( locale == 'en' ) title = 'World';
        //     if( locale == 'es' ) title = 'Mundo';
        //     if( locale == 'pt' ) title = 'Mundo';
        //     setChartTxts1Label(dataTranslate('chart1-title').replace('#{}', title));
        //     setChartTxts2Label(dataTranslate('chart2-title').replace('#{}', title))      
        // }
    }, [ locationName2 ])
    

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
        setChartTxts1Label(dataTranslate('chart1-title').replace('#{}', locationName2));
        setChartTxts2Label(dataTranslate('chart2-title').replace('#{}', locationName2))
    }, [locale, dataTranslate, locationName2])

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
        console.log("cambiando-------------------------------------------------------------------------", {regionCode})
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

    /* useEffect(() => {
        setPodiumConfig([
            {
                url: `https://commonbeanobservatorytst.ciat.cgiar.org/api/v1/data/podium/${countryCode}/${clickId ? '1' : '4'}/2546/${year}`,
                text:  [dataTranslate('podium1-title1'),dataTranslate('podium1-title2')+year],
                name: dataTranslate('podium-option1'),
                description: '',
            },
            {
                url: `https://commonbeanobservatorytst.ciat.cgiar.org/api/v1/data/podium/${countryCode}/${clickId ? '16' : '20'}/2546/${year}`,
                text: [dataTranslate('podium2-title1'),dataTranslate('podium2-title2')+year],
                name: dataTranslate('podium-option2'),
                description: '',
            },
            {
                url: `https://commonbeanobservatorytst.ciat.cgiar.org/api/v1/data/podium/${countryCode}/${clickId ? '2' : '5'}/2546/${year}`,
                text: [dataTranslate('podium3-title1'),dataTranslate('podium3-title2')+year],
                name: dataTranslate('podium-option3'),
                description: '',
            },
        ])
    }) */


    const podiumConfig = [
        {
            url: `${ baseURL }/api/v1/data/podium/${countryCode2}/${clickId ? '1' : '4'}/${ idIndicators }/${year}`, //EP
            text:  dataTranslate('podium1-title').replace('#{2}', year.toString()),
            name: dataTranslate('podium-option1'),
            description: dataTranslate('podium1-info'),
        },
        {
            url: `${ baseURL }/api/v1/data/podium/${countryCode2}/${clickId ? '16' : '20'}/${ idIndicators }/${year}`, //EP
            text:  dataTranslate('podium2-title').replace('#{2}', year.toString()),
            name: dataTranslate('podium-option2'),
            description: dataTranslate('podium2-info'),
        },
        {
            url: `${ baseURL }/api/v1/data/podium/${countryCode2}/${clickId ? '2' : '5'}/${ idIndicators }/${year}`, //EP
            text:  dataTranslate('podium3-title').replace('#{2}', year.toString()),
            name: dataTranslate('podium-option3'),
            description: dataTranslate('podium3-info'),
        },
    ];

    let [perCapConsup, setPerCapConsup] = useState(-1000);

    let [dataComplmnt1, setDataComplmnt1] = useState(-1000);
    let [dataComplmnt2, setDataComplmnt2] = useState(-1000);
    let [dataComplmnt3, setDataComplmnt3] = useState(-1000);
    let [dataComplmnt4, setDataComplmnt4] = useState(-1000);
    const [locationText, setLocationText] = useState('');
    const [titleSection, setTitleSection] = useState('');

    let [selfSuff, setSelfSuff] = useState(-1000);

    let [dataPorcentage1, setPorc1] = useState({
        value: -1000,
        text: ``,
    })

    let [dataPorcentage2, setPorc2] = useState({
        value: -1000,
        text: ``,
    });

    let [dataPorcentage3, setPorc3] = useState({
        value: -1000,
        text: ``,
    })

    let [dataPorcentage4, setPorc4] = useState({
        value: -1000,
        text: ``,
    });

    useEffect(() => {

        axios({ url: `${ baseURL }/api/v1/data/value/${ cropName }_consumption/VALUE/${countryCode2}/${clickId ? '645' : '14'}/${ idIndicators }/${year}` }) //EP
            .then(response => {
                setPerCapConsup(response.data)
            })

        axios({ url: `${ baseURL }/api/v1/data/value/${ cropName }_consumption/VALUE/${countryCode2}/12/${ idIndicators }/${year}` }) //EP
            .then(response => {
                setSelfSuff(response.data)
            })

        axios({ url: `${ baseURL }/api/v1/data/value/${ cropName }_consumption/VALUE/${countryCode2}/664/1/${year}` }) //EP
            .then(response => {
                setDataComplmnt1(response.data)
            })

        axios({ url: `${ baseURL }/api/v1/data/value/${ cropName }_consumption/VALUE/${countryCode2}/664/2/${year}` }) //EP
            .then(response => {
                setDataComplmnt2(response.data)
            })

        axios({ url: `${ baseURL }/api/v1/data/value/${ cropName }_consumption/VALUE/${countryCode2}/674/1/${year}` }) //EP
            .then(response => {
                setDataComplmnt3(response.data)
            })

        axios({ url: `${ baseURL }/api/v1/data/value/${ cropName }_consumption/VALUE/${countryCode2}/674/2/${year}` }) //EP
            .then(response => {
                setDataComplmnt4(response.data)
            })

        axios({ url: `${ baseURL }/api/v1/data/value/${ cropName }_consumption/VALUE/${countryCode2}/6/${ idIndicators }/${year}` }) //EP
            .then(response => {
                setPorc1({ value: response.data, text: `` })
            })

        axios({ url: `${ baseURL }/api/v1/data/value/${ cropName }_consumption/VALUE/${countryCode2}/7/${ idIndicators }/${year}` }) //EP
            .then(response => {
                setPorc2({ value: response.data, text: `` })
            })

        axios({ url: `${ baseURL }/api/v1/data/value/${ cropName }_consumption/VALUE/${countryCode2}/${clickId ? '6' : '23'}/${ idIndicators }/${year}` }) //EP
            .then(response => {
                setPorc3({ value: response.data, text: `` })
            })

        axios({ url: `${ baseURL }/api/v1/data/value/${ cropName }_consumption/VALUE/${countryCode2}/24/${ idIndicators }/${year}` }) //EP
            .then(response => {
                setPorc4({ value: response.data, text: `` })
            })

    }, [countryCode2, year]) // change this in case of it don´t work [clickId, year]

    let [xlabels1, setxlabels1] = useState(Array(0))
    let [datapoints1, setdatapoints1] = useState(Array(0))
    let [databar11, setdatabar11] = useState(Array(0))
    let [databar12, setdatabar12] = useState(Array(0))
    let [databar13, setdatabar13] = useState(Array(0))
    let [databar14, setdatabar14] = useState(Array(0))
    let [databar15, setdatabar15] = useState(Array(0))
    const [errorChart1, setErrorChart1] = useState(false)

    let [xlabels2, setxlabels2] = useState(Array(0))
    let [datapoints2, setdatapoints2] = useState(Array(0))
    let [databar21, setdatabar21] = useState(Array(0))
    let [databar22, setdatabar22] = useState(Array(0))
    let [databar23, setdatabar23] = useState(Array(0))
    const [errorChart2, setErrorChart2] = useState(false)

    useEffect(() => {
        axios({ url: `${ baseURL }/api/v1/chart/default/${ cropName }_consumption/${countryCode2}?elementIds=[5142,5527,5521,5131,5123,95154,${clickId ? '645' : '14'}]&cropIds=[${ idIndicators }]` }) //EP
            .then(response => {
                setErrorChart1(false)
                const data = datasetGeneratorPV(response.data.data.observations, response.data.data.labels, 'id_element', 'crop_name')
                const chartjsData = { labels: response.data.data.labels, data };
                setxlabels1(response.data.data.labels)
                setdatapoints1(data[0].data.map((datum: number) => datum > 0 ? datum : null))
                setdatabar11(data[2].data.map((datum: number) => datum > 0 ? datum : null))
                setdatabar12(data[4].data.map((datum: number) => datum > 0 ? datum : null))
                setdatabar13(data[1].data.map((datum: number) => datum > 0 ? datum : null))
                setdatabar14(data[3].data.map((datum: number) => datum > 0 ? datum : null))
                setdatabar15(data[5].data.map((datum: number) => datum > 0 ? datum : null))
            })
            .catch(error => {
                setErrorChart1(true)
            })
        axios({ url: `${ baseURL }/api/v1/chart/default/${ cropName }_consumption/${countryCode2}?elementIds=[${clickId ? '8' : '10'},5611,${clickId ? '9' : '5911'},12]&cropIds=[${ idIndicators }]` }) //EP
            .then(response => {
                setErrorChart2(false)
                const data = datasetGeneratorPV(response.data.data.observations, response.data.data.labels, 'id_element', 'crop_name')
                const chartjsData = { labels: response.data.data.labels, data };
                setxlabels2(response.data.data.labels)
                setdatapoints2(data[1].data)
                setdatabar21(data[0].data)
                setdatabar22(data[2].data.map((datum: number) => -datum))
                setdatabar23(data[3].data)
            })
            .catch(error => {
                setErrorChart2(true)
            })

    }, [clickId])

    

    const chartTxts1 = {
        title: chartTxts1Label,
        axis_x : "",
        axis_y : dataTranslate('chart1-axis-y')?? '',
        axis_y2 : dataTranslate('chart1-axis-y2')??'',
        datasets: [dataTranslate('chart1-dataset1')?? '',dataTranslate('chart1-dataset2')??'',dataTranslate('chart1-dataset4')??'',dataTranslate('chart1-dataset5')??'',dataTranslate('chart1-dataset6')??'',dataTranslate('chart1-dataset3')??'']
    }

    const chartTxts2 = {
        title: chartTxts2Label,
        axis_x : "",
        axis_y : dataTranslate('chart2-axis-y') ?? '',
        axis_y2 : dataTranslate('chart2-axis-y2') ?? '',
        datasets: [dataTranslate('chart2-dataset1') ?? '',dataTranslate('chart2-dataset2')?? '',dataTranslate('chart2-dataset3')?? '',dataTranslate('chart2-dataset4')?? '']
    }

    

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
    useEffect(() => {
        setMapGraphsText(dataTranslate('graphs_maps')!);
        setMetadataText(dataTranslate('metadata')!);
    }, )

    const [dataFrame1, setDataFrame1 ] = useState<DataDocument[] | undefined>(undefined);
    useEffect(()=>{
        setDataFrame1([
            {
                label: locale == "es" ? "Años" : locale == "en" ? "Years" : locale == "pt" ? "Anos" : "",
                values: xlabels1 ?? []
            },
            {
                label: chartTxts1.datasets[0],
                values: datapoints1 ?? []
            },
            {
                label: chartTxts1.datasets[1],
                values: databar11 ?? []
            },
            {
                label: chartTxts1.datasets[2],
                values: databar12 ?? []
            },
            {
                label: chartTxts1.datasets[3],
                values: databar13 ?? []
            },
            {
                label: chartTxts1.datasets[4],
                values: databar14 ?? []
            },
            {
                label: chartTxts1.datasets[5],
                values: databar15 ?? []
            },
        ])
    },[xlabels1,datapoints1,databar11,databar12,databar13,databar14,databar15,locale])
    
    //xLabels={xlabels2} datapoints={datapoints2} databar1={databar21} databar2={databar22} databar3={databar23}
    const [dataFrame2, setDataFrame2 ] = useState<DataDocument[] | undefined>(undefined);
    useEffect(()=>{
        setDataFrame2([
            {
                label: locale == "es" ? "Años" : locale == "en" ? "Years" : locale == "pt" ? "Anos" : "",
                values: xlabels2 ?? []
            },
            {
                label: chartTxts2.datasets[0],
                values: datapoints2 ?? []
            },
            {
                label: chartTxts2.datasets[1],
                values: databar21 ?? []
            },
            {
                label: chartTxts2.datasets[2],
                values: databar22 ?? []
            },
            {
                label: chartTxts2.datasets[3],
                values: databar23 ?? []
            },
        ])
    },[xlabels2,datapoints2,databar21,databar22,databar23,locale])
    useEffect(() => {
        let title = '';
        if( locationName2 == "" ) {
            if( locale == 'en' ) title = 'World';
            if( locale == 'es' ) title = 'Mundo';
            if( locale == 'pt' ) title = 'Mundo';
        }
        // console.log('mmm///////////////////////////////////////////////////////////', {title})
        setChartTxts1Label(dataTranslate('chart1-title').replace('#{}', title));
        setChartTxts2Label(dataTranslate('chart2-title').replace('#{}', title))
    }, [])
    
    return (
        <Layout title={dataTranslate('section-name')}>
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
                    <div className={ styles['main-content-container-consumption'] } style={{ width: contentColumn }} >
                        <Row className={ styles['padding-left-subcontainers'] }>
                            <Col xs={12} className={`${styles['no-margin']} ${styles['no-padding']}`}>
                                {/* <MainBar key={uuidv4()} section={dataTranslate('section-text').replace('#{}',locationName)}> */}
                                <MainBar key={ uuidv4() } section={` ${ titleSection } - ${locationName2}`} >
                                <BackButton regionCode={regionCode} countryCode={ locationNameOptions.isoLabel } setSectionState={setSectionState} setCountryCode2={ setCountryCode2 } setClickId={ setClickId } setLocationNames={ setLocationNameOptions } clickId={ clickId } locale={ locale ?? 'en'}/>
                                    {/* <BackButton regionCode={regionCode} countryCode={countryCode} setSectionState={setSectionState} locale={ locale ?? 'en'}/> */}
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
                                            <LeftSideMenuContainer />
                                            <Col xs={ 12 }  lg={ mapCol } style={ showMap ? { display: 'block', height: '80vh', position: 'relative' } : { display: 'none' } } className={ `${ styles['no-margin'] } ${ styles['no-padding'] }` }>
                                                {!errorElements && !errorMacroRegions && !errorYears && !errorRegions ? <>
                                                <Row className={ styles['row-map-selects-filter'] } style={ isMapView ? { marginRight: '20px' } : undefined }>
                                                    <Row style={{justifyContent: 'flex-end', flexWrap: 'wrap', gap: '5px'}}>
                                                        <MapSelect id='element-filter' options={elementsOptions} selected={elementId} setSelected={setSectionState} atrName='elementId'/>
                                                        <MapSelect id='year-filter' options={yearsOptions} selected={year} setSelected={setSectionState} atrName='year'/>
                                                        <MapSelect id='macro-region-filter' options={macroRegionsOptions} selected={macroRegionCode} setSelected={setSectionState} atrName='macroRegionCode'/>
                                                        { macroRegionCode == '10' ? <></> : <MapSelect options={regionsOptions} selected={regionCode} setSelected={setSectionState} atrName='regionCode'/> }
                                                    </Row>
                                                    <Row style={{justifyContent: 'flex-end', flexWrap: 'wrap'}}>
                                                        <SearchCountryButton btnText={dataTranslate('search-country')} setShowCountries={setShowCountries} />
                                                    </Row>
                                                </Row>
                                                <MapView admin={admin} geoJsonURL={`${baseURL}/api/v1/geojson/countries/${ cropName }_consumption/ISO3/${ idIndicators }`} adminIdsURL={`${baseURL}/api/v1/data/adminIds/${ cropName }_consumption/${admin}/${regionCode}/${ idIndicators }/${year}?id_elements=[${elementId}]`} percentileURL={`${baseURL}/api/v1/percentile/values/undefined/data_production_surface_context/${elementId}/${ idIndicators }/${year}?tradeFlow=undefined`} quintilURL={`${baseURL}/api/v1/percentile/heatmap`} legendTitle={ ( elementsObj[elementId] ? elementsObj[elementId][dataTranslate('LOCALE_FILTER_ELEMENT') as keyof typeof elementsObj[typeof elementId]].toString() : 'Loading...') } elementUnit={elementsObj[elementId]?.UNIT} isMapView={ isMapView } /> {/* //EP */}
                                                </> 
                                            :
                                            <>NO INFO</>
                                            }
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
                                                                    {dataTranslate('search-country')}
                                                                </Button>
                                                            </Row>
                                                        </Row>
                                                    :
                                                        <></>
                                                }
                                                {/* {podiumConfig ? <PodiumSelectionCon podiumsList={podiumConfig} /> : 'Loading...'} */}
                                                    <br></br>
                                                {(podiumConfig && perCapConsup!==-1000 && dataPorcentage1.value!==-1000 && dataComplmnt1!==-1000 && dataPorcentage2.value!==-1000 && dataComplmnt2!==-1000 && dataPorcentage3.value!==-1000 && dataComplmnt3!==-1000 && dataPorcentage4.value!==-1000  && dataComplmnt4!==-1000 && xlabels1.length!==0 && selfSuff!==-1000 && xlabels2.length!==0) || errorChart1 && errorChart2 ?
                                                <>
                                                <PodiumSelectionCon podiumsList={podiumConfig} />
                                                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '15px' }} dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(eval(dataTranslate('per-capita-text').replace('#{1}',year.toString()).replace('#{2}',(Math.round(perCapConsup * 100) / 100).toString())))}}/>
                                                <br></br>
                                                <PorcentagesBox evaluate={true} data_1={{ value: dataPorcentage1.value, text:dataTranslate('porc1-label').replace('#{}',(Math.round(dataComplmnt1* 100) / 100).toString())}}
                                                    data_2={{ value: dataPorcentage2.value, text: dataTranslate('porc2-label').replace('#{}', (Math.round(dataComplmnt2 * 100) / 100).toString()) }} />
                                                <PorcentagesBox evaluate={true} data_1={{ value: dataPorcentage3.value, text: dataTranslate('porc3-label').replace('#{}', (Math.round(dataComplmnt3 * 100) / 100).toString()) }}
                                                    data_2={{ value: dataPorcentage4.value, text: dataTranslate('porc4-label').replace('#{}', (Math.round(dataComplmnt4 * 100) / 100).toString()) }} />
                                                <br></br>
                                                <ChartFrame data={dataFrame1 as any} toggleText={dataTranslate('chart1-toggle')} excludedClasses={[]}>
                                                    { errorChart1 ? (<div>Error</div>) : xlabels1.length == 0 ? (<div>Loading...</div>) : (<MultiBar1 xLabels={xlabels1} datapoints={datapoints1} databar1={databar11} databar2={databar12} databar3={databar13} databar4={databar14} databar5={databar15} chartTexts={chartTxts1} />)} 
                                                </ChartFrame>
                                                <br></br>
                                                <ChartFrame1Btn toggleText={dataTranslate('porc5-toggle')}>
                                                    <APorcentagesBox data={{ value: selfSuff / 100, text: 'Self-sufficiency ratio' }} />
                                                </ChartFrame1Btn>
                                                <br></br>
                                                <ChartFrame data={dataFrame2 as any} toggleText={dataTranslate('chart2-toggle')} excludedClasses={[]}>
                                                    { errorChart2 ? (<div>Error</div>) : xlabels2.length == 0 ? (<div>Loading...</div>) : (<MultiBar2 xLabels={xlabels2} datapoints={datapoints2} databar1={databar21} databar2={databar22} databar3={databar23} chartTexts={chartTxts2} />)} 
                                                </ChartFrame>
                                                <SourcesComponent sourcesText={dataTranslate('sources-text')} shortName='FAO' year='2022' completeName='FAOSTAT Database' url='http://www.fao.org/faostat/en/#data' />
                                                </>
                                                :
                                                <div style={{height:"100%",width:"100%",display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center"}}>
                                                    <LoadingComponent/>
                                                </div>
                                            }
                                            </Col>
                                        </Row>
                                    </Tab>
                                    <Tab eventKey="profile" title={metadataText} tabClassName={styles.coloredTab}>
                                        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Vero natus est accusamus doloribus cum odit nobis, beatae modi iusto cumque soluta voluptates neque fugit voluptatibus mollitia? Atque laudantium quasi nobis.
                                    </Tab>
                                    
                                </Tabs>
                            </Col>
                            
                        </Row>
                    </div>
                </div>
            </Container>
            <SearchCountryModal adminIdsUrl={`${baseURL}/api/v1/data/adminIds/${ cropName }_consumption/${admin}/${regionCode}/${ idIndicators }/${year}?id_elements=[${elementId}]`} show={showCountries} handleClose={setShowCountries} clickId={clickId} setSectionState={setSectionState} setClickId={setClickId} setLocationName2={ setLocationName2 } setLocationNames={ setLocationNameOptions } /> {/* //EP */}
        </Layout>
    )
}

export const getStaticProps: GetStaticProps = async ({ locale }) => {
    return {
        props: {
            ...(await serverSideTranslations(locale!, ['data-consuption'])),
        }
    }
}

export default DataPage