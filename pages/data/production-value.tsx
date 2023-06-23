import { useState, useEffect, useContext } from 'react'
import { GetStaticProps, NextPage } from 'next';
import { Button, Col, Container, Row, Tab, Tabs } from 'react-bootstrap';
import { useTranslation } from 'next-i18next';
import 'bootstrap/dist/css/bootstrap.min.css';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { Layout } from '../../components/layouts'
import { MainBar, MapView, SidebarComponent } from '../../components/ui';

import { v4 as uuidv4 } from 'uuid';

import styles from './data.module.css';
import { PorcentagesBox, MultichartPV, ChartFrame, ChartSelectionPV, MapPV, PodiumWithLinkCon } from '../../components/data';
import { dataFetcher, datasetGeneratorPV, generateElementsOptions, generateOptionsFromObj, generateRegionOptions, generateYearsOptions, GetChartData2 } from '../../helpers/data';

import { annual_growth_optionsPV, ten_year_moving_average_optionsPV } from '../../helpers/data/chartjs-options';
import axios from 'axios';
import { LeftSideMenuContainer, MapSelect, TopSideMenuContainer } from '../../components/ui/map/filters';
import { useWindowSize } from '../../hooks';
import { LeftSideMenuContext } from '../../context/map/leftsidemenu';
import { MapContext } from '../../context/map';
import React from 'react';
import { sectionState } from '../../interfaces/data/section-states';
import { ElementsData, ElementsState, MacroRegionsData, MacroRegionsState, RegionsData, RegionsState, YearsData, YearsState } from '../../interfaces/data';
import { useTour } from '@reactour/tour';
import useSWR from 'swr';
import { getCookie, setCookie } from 'cookies-next';
import { general_data_steps, general_data_steps_es, general_data_steps_es_mobile, general_data_steps_mobile, general_data_steps_pt, general_data_steps_pt_mobile } from '../../helpers/data/tour';
import { SearchCountryModal } from '../../components/data/search-country-modal';
import { BackButton } from '../../components/data/back-button';
import { SourcesComponent } from '../../components/ui/sources-component';
import KeyboardTabIcon from '@mui/icons-material/KeyboardTab';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import { SearchCountryButton } from '../../components/data/search-country-button/SearchCountryButton';
import { useRouter } from 'next/router';
import { LoadingComponent } from '../../components/ui/loading-component';

const mapFilterElements = [58, 1059, 1060];
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

interface PercentConfig {
    value: number
    text: string
}

interface PodiumConfig {
    url: string
    text: string
    description: string
}

interface ChartTxts {
    title: string
    axis_x: string
    axis_y: string
    datasets: string[]
}

interface ChartConfig {
    dataURL: Record<string, any>
    options: Record<string, any>
    config: Record<string, string>
    name: string
}

interface DataDocument {
    label : string,
    values: number[]
}

const PVPage: NextPage = () => {
    const { t: dataTranslate } = useTranslation('data-prod-val');
    const { locale } = useRouter();
    const [ sectionState, setSectionState ] = useState<sectionState>({
        elementId: 58,
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
    // Chart Data states
    const [data1, setData1] = useState<number[] | undefined>(undefined);
    const [data2, setData2] = useState<number[] | undefined>(undefined);
    const [data3, setData3] = useState<number[] | undefined>(undefined);
    const [data4, setData4] = useState<number[] | undefined>(undefined);
    const [x_labels, setXLabels] = useState<number[] | undefined>(undefined);
    const [dataFrame1, setDataFrame1] = useState<DataDocument[] | undefined>(undefined);
    // Data translation states
    const [percentConfig1, setPercentConfig1] = useState<PercentConfig | undefined>(undefined);
    const [percentConfig2, setPercentConfig2] = useState<PercentConfig | undefined>(undefined);
    const [podiumConfig, setPodiumConfig] = useState<PodiumConfig | undefined>(undefined);
    const [chartTxts, setChartTxts] = useState<ChartTxts | undefined>(undefined);
    const [chartConfig, setChartConfig] = useState<ChartConfig[] | undefined>(undefined);

    const { data: elementsData, isLoading: isLoadingElements } = useSWR<ElementsData[]>(`${baseURL}/api/v1/data/elements/3`, dataFetcher); //EP

    const { data: yearsData, isLoading: isLoadingYears } = useSWR<YearsData[]>(`${baseURL}/api/v1/data/years/OBSERVATIONS`, dataFetcher); //EP

    const { data: macroRegionsData, isLoading: isLoadingMacroRegions } = useSWR<Record<string, MacroRegionsData>>(`${baseURL}/api/v1/data/macroRegions`, dataFetcher); // EP

    const { data: regionsData, isLoading: isLoadingRegions } = useSWR<Record<string, RegionsData>>(`${baseURL}/api/v1/data/regions/${regionsElementId[elementId as keyof typeof regionsElementId]}/${ idCrop }/${year}`, dataFetcher); //EP
    const [isMapView, setIsMapView] = useState(false);

    const optionsTranslated = (options: any,index:number) => {
        const result = {} as any
        for (let key in options) {
            result[key] = options[key]
            if(key == "plugins") result[key]['title']['text'] = dataTranslate('chart2'+index+'-title').replace('#{}', locationName)
            if(key == "scales") result[key]['y']['title']['text'] = dataTranslate('chart2'+index+'-y-axis')
        }
        return result
    }

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
    }, [locale])

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
        GetChartData2(setXLabels,setData1,setData2,setData3,setData4,countryCode, clickId ? '58' : '152');
    }, [clickId, regionCode]);

    useEffect(() => {
        setDataFrame1([
            {
                label:"Years", 
                values : x_labels ?? []
            },
            {
                label:"Beans", 
                values : data1 ?? []
            },
            {
                label:"Pulses", 
                values : data2 ?? []
            },
            {
                label:"Agriculture", 
                values : data3 ?? []
            },
            {
                label:"Crops", 
                values : data4 ?? []
            },
        ]);
    }, [x_labels, data1, data2, data3, data4]);

    let [valuePorc1, setValuePorc1] = useState(0)

    let [valuePorc2, setValuePorc2] = useState(0)

    let [anualdata, setanualdata] = useState({labels: Array(0), datasets: Array<any>(0)});
    let [tenyearsdata, settenyearsdata] = useState({labels: Array(0), datasets: Array<any>(0)});

    useEffect( () => {
        axios({url: `${ baseURL }/api/v1/data/value/${ cropName }_production_value/VALUE/${countryCode2}/${clickId ? '1059' : '1153'}/${ idCrop }/${year}`}) //EP
        .then(response => {
            setValuePorc1(response.data)
        })

        axios({url: `${ baseURL }/api/v1/data/value/${ cropName }_production_value/VALUE/${countryCode2}/${clickId ? '1060' : '1154'}/${ idCrop }/${year}`}) //EP
        .then(response => {
            setValuePorc2(response.data)
        })

    },[clickId, year, regionCode]);

    useEffect(() => {
        axios({url: `${ baseURL }/api/v1/chart/default/${ cropName }_production_value/${countryCode2}?elementIds=[1058,7184]&cropIds=[${ idCrop },22008,22016]`}) //EP
            .then(response => {
                const data = response.data.data;
                const datasets = datasetGeneratorPV(data.observations, data.labels, 'id_crop', 'crop_name');
                const chartjsData = {labels: data.labels, datasets};
                setanualdata(chartjsData)
            })
        axios({url: `${ baseURL }/api/v1/chart/default/${ cropName }_production_value/${countryCode2}?elementIds=[2058,8184]&cropIds=[${ idCrop },22008,22016]`}) //EP
            .then(response => {
                const data = response.data.data;
                const datasets = datasetGeneratorPV(data.observations, data.labels, 'id_crop', 'crop_name');
                const chartjsData = {labels: data.labels, datasets};
                settenyearsdata(chartjsData)
            })
    }, [clickId, regionCode]);

    const dataFrame2 = [
        {
            label:"Years - Annual Growth", 
            values : anualdata.labels
        },
        {
            label:"Beans - Annual Growth", 
            values : anualdata.datasets[0]
        },
        {
            label:"Value Added - Annual Growth", 
            values : anualdata.datasets[2]
        },
        {
            label:"Gross Domestic Product - Annual Growth", 
            values : anualdata.datasets[1]
        },
        {
            label:"Years - 10 Year Moving Average", 
            values : tenyearsdata.labels
        },
        {
            label:"Crops", 
            values : tenyearsdata.datasets[0]
        },
        {
            label:"Pulses", 
            values : tenyearsdata.datasets[2]
        },
        {
            label:"Agriculture", 
            values : tenyearsdata.datasets[1]
        },
    ]

    // UseEffect to get Translations
    useEffect(() => {
        setPercentConfig1({
            value: valuePorc1,
            text : dataTranslate('porc1-label'),
        });
    
        setPercentConfig2({
            value: valuePorc2,
            text : dataTranslate('porc2-label'),
        })
    
        setPodiumConfig({
            url: `${ baseURL }/api/v1/data/podium/${countryCode2}/${clickId ? '158' : '252'}/${ idCrop }/${year}`,
            text: dataTranslate('podium-title').replace('#{2}', year.toString()),
            description: dataTranslate('podium-info'),
        })
    
        setChartTxts({
            title: dataTranslate('chart1-title').replace('#{}', locationName),
            axis_x : "",
            axis_y : dataTranslate('chart1-axis-y'),
            datasets: [dataTranslate('chart1-dataset1'),dataTranslate('chart1-dataset2'),dataTranslate('chart1-dataset3'),dataTranslate('chart1-dataset4')]
        })
    }, [valuePorc1, valuePorc2, clickId, year, regionCode, dataTranslate]);

    useEffect(() => {
        const datasetsTranslated = (datasets: any[], index: number) => {
            const result = Array(0)
            datasets.map((ds,idx) => {
                const ds_trans = {} as any
                for (let key in ds) {
                    ds_trans[key] = ds[key]
                    if(key == "label") ds_trans[key] = dataTranslate('chart2'+index+'-dataset'+(idx+1))
                }
                result.push(ds_trans)
            })
            return result
        }

        setChartConfig([
            {
                dataURL: {labels:anualdata.labels,datasets:datasetsTranslated(anualdata.datasets,1)},
                options: optionsTranslated(annual_growth_optionsPV,1),
                config: {key: 'id_crop', name: 'crop_name'},
                name: dataTranslate('chart2-opt1')
            },
            {
                dataURL: {labels:tenyearsdata.labels,datasets:datasetsTranslated(tenyearsdata.datasets,2)},
                options: optionsTranslated(ten_year_moving_average_optionsPV,1),
                config: {key: 'id_crop', name: 'crop_name'},
                name: dataTranslate('chart2-opt2')
            }
        ])
    }, [anualdata, tenyearsdata, dataTranslate]);

    const [isCollapsed, setIsCollapsed] = useState(false);
    const { width } = useWindowSize();
    const [sideBarColumn, setSideBarColumn] = useState('');
    const [contentColumn, setContentColumn] = useState('');
    const [sideBarSubcolumn, setSideBarSubcolumn] = useState(9);
    const [collapsedSideBarButton, setCollapsedSideBarButton] = useState(3);
    const [locationText, setLocationText] = useState('');
    const [titleSection, setTitleSection] = useState('');

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
                setContentColumn( '79.8%' );
            }else {
                setSideBarColumn( '10%' );
                setContentColumn( '89.8%' );
            }
        }else if (width! > 1200 && width! < 1400){
            if ( !isCollapsed ) {
                setSideBarColumn( '15%' );
                setContentColumn( '84.9%' );
            }else {
                setSideBarColumn( '10%' );
                setContentColumn( '89.9%' );
            }
            
        }
        else if (width! > 1400){
            if ( !isCollapsed ) {
                setSideBarColumn( '13%' );
                setContentColumn( '87%' );
            }else {
                setSideBarColumn( '8%' );
                setContentColumn( '92%' );
            }
            
        }

    }, [ isCollapsed ])

    useEffect(() => {
        if ( width! > 992 && width! < 1200 ) {
            if ( !isCollapsed ) {
                setSideBarColumn( '20%' );
                setContentColumn( '79.8%' );
            }else {
                setSideBarColumn( '8%' );
                setContentColumn( '91.8%' );
            }
        }
        else if (width! > 1200 && width! < 1400){
            if ( !isCollapsed ) {
                setSideBarColumn( '15%' );
                setContentColumn( '84.9%' );
            }else {
                setSideBarColumn( '7%' );
                setContentColumn( '92.9%' );
            }
            
        }
        else if (width! > 1400 && width! < 1600){
            if ( !isCollapsed ) {
                setSideBarColumn( '13%' );
                setContentColumn( '87%' );
            }else {
                setSideBarColumn( '6%' );
                setContentColumn( '94%' );
            }
            
        }
        else if ( width! > 1600 ){
            if ( !isCollapsed ) {
                setSideBarColumn( '13%' );
                setContentColumn( '87%' );
            }else {
                setSideBarColumn( '5%' );
                setContentColumn( '95%' );
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
    useEffect(() => {    
        setMapGraphsText(dataTranslate('graphs_maps')!);
        setMetadataText(dataTranslate('metadata')!);
        setMetadataText1(dataTranslate('metadata_text1_beans')!);
        setMetadataText2(dataTranslate('metadata_text2_beans')!);
        setMetadataText3(dataTranslate('metadata_text3_beans')!);
        setMetadataText4(dataTranslate('metadata_text4_beans')!);
        setMetadataText5(dataTranslate('metadata_text5_beans')!);
        setMetadataText6(dataTranslate('metadata_text6_beans')!);
        setMetadataText7(dataTranslate('metadata_text7_beans')!);
        setMetadataText8(dataTranslate('metadata_text8_beans')!);
        setMetadataText9(dataTranslate('metadata_text9_beans')!);
        setMetadataText10(dataTranslate('metadata_text10_beans')!);
        setMetadataText11(dataTranslate('metadata_text11_beans')!);
    }, )

    return (
        <Layout title={ dataTranslate('section-name') }>
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
                    <div className={ styles['main-content-container'] } style={{ width: contentColumn }}>
                        <Row className={ styles['padding-left-subcontainers'] }>
                            <Col xs={ 12 } className={ `${ styles['no-margin'] } ${ styles['no-padding'] }` }>
                                {/* <MainBar key={ uuidv4() } section={dataTranslate('section-text').replace('#{}',locationName)}> */}
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
                                                        <SearchCountryButton btnText={dataTranslate('search-country')} setShowCountries={setShowCountries} />
                                                    </Row>
                                                </Row>
                                                <MapView admin={admin} geoJsonURL={`${baseURL}/api/v1/geojson/countries/${ cropName }_production_value/ISO3/${ idCrop }`} adminIdsURL={`${baseURL}/api/v1/data/adminIds/${ cropName }_production_value/${admin}/${regionCode}/${ idCrop }/${year}?id_elements=[${elementId}]`} percentileURL={`${baseURL}/api/v1/percentile/values/undefined/data_production_surface_context/${elementId}/${ idCrop }/${year}?tradeFlow=undefined`} quintilURL={`${baseURL}/api/v1/percentile/heatmap`} legendTitle={ ( elementsObj[elementId] ? elementsObj[elementId][dataTranslate('LOCALE_FILTER_ELEMENT') as keyof typeof elementsObj[typeof elementId]].toString() : 'Loading...') } elementUnit={elementsObj[elementId]?.UNIT} isMapView={ isMapView } /> {/* //EP */}
                                            </Col>
                                            <Col xs={ 12 } lg={ graphsCol } className={styles['col-right-prodval']} style={ showGraphs && !showMap ? { display: 'block', height: '80vh', overflow: 'auto', paddingLeft: '60px', width: '98%' } : showGraphs ? { display: 'block', height: '80vh', overflow: 'auto', width: '48%' } : { display: 'none' } }>
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
                                                { percentConfig1 && percentConfig2 && podiumConfig && chartTxts && chartConfig && dataFrame1 && x_labels && data1 && data2 && data3 && data4 ?
                                                    <>
                                                        <PodiumWithLinkCon dataURL={podiumConfig.url} text={podiumConfig.text} description={podiumConfig.description}/>
                                                        <br></br>
                                                        <PorcentagesBox data_1={percentConfig1} data_2={percentConfig2} />
                                                        <br></br>
                                                        <ChartFrame data={dataFrame1} toggleText={dataTranslate('chart1-toggle')} excludedClasses={[]}>
                                                            
                                                                <MultichartPV xLabels={x_labels} data1={data1} data2={data2} data3={data3} data4={data4} chartTexts={chartTxts} />
                                                            
                                                        </ChartFrame>
                                                        <br></br>
                                                        <ChartFrame data={dataFrame2} toggleText={dataTranslate('chart2-toggle')} excludedClasses={['chart-select']}>
                                                            <ChartSelectionPV chartConfigList={chartConfig} />
                                                        </ChartFrame>
                                                    </>
                                                    :
                                                    <div style={{height:"100%",width:"100%",display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center"}}><LoadingComponent/></div>
                                                    
                                                }
                                                <SourcesComponent sourcesText={dataTranslate('sources-text')} shortName='FAO' year='2022' completeName='FAOSTAT Database' url='http://www.fao.org/faostat/en/#data' />
                                            </Col>
                                        </Row>
                                    </Tab>
                                    <Tab eventKey="profile" title={metadataText} tabClassName={styles.coloredTab}>
                                        <p>
                                            { metadataText1 }      
                                        </p>
                                        <p>{ metadataText2 }: </p>
                                        <ol type='a'>
                                                <li><span className={ styles['text-strong'] }>{ metadataText3 }</span>: { metadataText4 }</li>
                                                <li><span className={ styles['text-strong'] }>{ metadataText5 }</span>: { metadataText6 }</li>
                                        </ol>
                                        <p className={ styles['text-strong'] }>{ metadataText7 }:</p>
                                        <ul><li>{ metadataText8 } <span><a href="http://www.fao.org/faostat/en/#data">http://www.fao.org/faostat/en/#data</a></span></li></ul>
                                        <p>{ metadataText9 } : </p>
                                        <ul>
                                                <li>{ metadataText10 }</li>
                                                <li>{ metadataText11 }</li>
                                        </ul>
                                    </Tab>
                                    
                                </Tabs>
                            </Col>
                            
                        </Row>
                    </div>
                </div>
                {/* -------------- */}
                
            </Container>
            <SearchCountryModal adminIdsUrl={`${baseURL}/api/v1/data/adminIds/${ cropName }_production_value/${admin}/${regionCode}/${ idCrop }/${year}?id_elements=[${elementId}]`} show={showCountries} handleClose={setShowCountries} clickId={clickId} setSectionState={setSectionState} setClickId={setClickId} setLocationName2={ setLocationName2 } setLocationNames={ setLocationNameOptions } />
        </Layout>
    )
}

export const getStaticProps: GetStaticProps = async ({ locale }) => {
    return {
        props: {
            ...( await serverSideTranslations( locale!, ['data-prod-val'] ) ),
        }
    }
}

export default PVPage
