import { useState, useEffect, useContext } from 'react'
import { GetStaticProps, NextPage } from 'next';
import Image from 'next/image';
import { Button, Col, Container, Row, Tab, Tabs } from 'react-bootstrap';
import { useTranslation } from 'next-i18next';
import 'bootstrap/dist/css/bootstrap.min.css';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { Layout } from '../../components/layouts'
import { MainBar, MapView, SidebarComponent } from '../../components/ui';

import { v4 as uuidv4 } from 'uuid';

import styles from './data.module.css';
import { PodiumProductVal as Podium, PorcentagesBoxTr, ChartFrame,  MultichartTr, MultichartTr2 } from '../../components/data';
import { commarize, dataFetcher, datasetGeneratorPV, generateYearsOptions} from '../../helpers/data';

import { annual_growth_optionsPV, ten_year_moving_average_optionsPV } from '../../helpers/data/chartjs-options';
import { ChartSelectionPV } from '../../components/data/charts';
import axios from 'axios';
import { LeftSideMenuContainer, MapSelect, TopSideMenuContainer } from '../../components/ui/map/filters';
import { useWindowSize } from '../../hooks';
import { LeftSideMenuContext } from '../../context/map/leftsidemenu';
import { MapContext } from '../../context/map';
import { APorcentagesBoxTr } from '../../components/data/porcentages-box/APorcentagesBoxTr';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import KeyboardTabIcon from '@mui/icons-material/KeyboardTab';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import { BackButton } from '../../components/data/back-button';
import { GenericMapView } from '../../components/ui/map/generic';
import { GenericMapContext, GenericMapProvider } from '../../context/map/generic';

import gif from '../../public/Spinner-0.5s-98px.gif';
// 
import { RegionsState, SelectOptions, TradeElementState, TradeFlowState, YearsData, YearsState } from '../../interfaces/data';
import useSWR from 'swr';
import { SearchCountryModal } from '../../components/data/search-country-modal';
import { LoadingComponent } from '../../components/ui/loading-component';
import { TradeApiResponse, TradeObservation } from '../../interfaces/data/trade/trade-helpers';


const legendTitleObject = {
    en: {
        quantity: 'Quantity (kg)',
        value: 'Value (US$)'
    },
    es: {
        quantity: 'Cantidad (kg)',
        value: 'Valor (US$)'
    },
    pt: {
        quantity: 'Quantidade (kg)',
        value: 'Valor (US$)'
    }
}

interface locationNameOptions {
    en: string;
    es: string;
    pt: string;
    isoLabel: string;
    clickId: number | null | string;
}

const tradeFlowObject = {
    en: {
        import: 'Import',
        export: 'Export',
        imported: 'import',
        exported: 'export',
        imports: 'Imports',
        exports: 'Exports'
    },
    es: {
        import: 'Importación',
        export: 'Exportación',
        imported: 'importó',
        exported: 'exportó',
        imports: 'Importaciones',
        exports: 'Exportaciones'
    },
    pt: {
        import: 'Importação',
        export: 'Exportação',
        imported: 'importou',
        exported: 'exportou',
        imports: 'Importações',
        exports: 'Exportações'
    }
}

const tradeFlowTitleByLocale = ( locale: string, option: number ) => {
    let text = '';
    let text2 = '';
    let text3 = '';
    if( locale == 'en' ) {
        if(option == 1) {
            text = tradeFlowObject.en.import;
            text2 = tradeFlowObject.en.imported;
            text3 = tradeFlowObject.en.imports;
        }
        if(option == 2) {
            text = tradeFlowObject.en.export;
            text2 = tradeFlowObject.en.exported;
            text3 = tradeFlowObject.en.exports;
        }
    }
    else if( locale == 'es' ) {
        if(option == 1) {
            text = tradeFlowObject.es.import;
            text2 = tradeFlowObject.es.imported;
            text3 = tradeFlowObject.es.imports;
        }
        if(option == 2) {
            text = tradeFlowObject.es.export;
            text2 = tradeFlowObject.es.exported;
            text3 = tradeFlowObject.es.exports;
        }
    }
    else if( locale == 'pt' ) {
        if(option == 1) {
            text = tradeFlowObject.pt.import;
            text2 = tradeFlowObject.pt.imported;
            text3 = tradeFlowObject.pt.imports;
        }
        if(option == 2) {
            text = tradeFlowObject.pt.export;
            text2 = tradeFlowObject.pt.exported;
            text3 = tradeFlowObject.pt.exports;
        }
    }
    return { text, text2, text3 };
}

const legendTitleByLocale = ( locale: string, option: number ) => {
    let legendTitle = '';
    if( locale == 'en' ) {
        if(option == 3001) legendTitle = legendTitleObject.en.quantity;
        if(option == 3002) legendTitle = legendTitleObject.en.value;
    }
    else if( locale == 'es' ) {
        if(option == 3001) legendTitle = legendTitleObject.es.quantity;
        if(option == 3002) legendTitle = legendTitleObject.es.value;
    }
    else if( locale == 'pt' ) {
        if(option == 3001) legendTitle = legendTitleObject.pt.quantity;
        if(option == 3002) legendTitle = legendTitleObject.pt.value;
    }
    return legendTitle;
}

const textByLocale = ( locale: string ) => {
    const tradeFlowSelectNames: string[] = [];
    const tradeElementSelectNames: string[] = [];
    if( locale == 'en' ) {
        tradeFlowSelectNames.push('Import', 'Export');
        tradeElementSelectNames.push('Quantity (kg)', 'Value (US$)');
    }
    else if( locale == 'es' ) {
        tradeFlowSelectNames.push('Importación', 'Exportación');
        tradeElementSelectNames.push('Cantidad (kg)', 'Valor (US$)')
    }
    else if( locale == 'pt' ) {
        tradeFlowSelectNames.push('Importação', 'Exportação');
        tradeElementSelectNames.push('Quantidade (kg)', 'Valor (US$)')
    }
    let selectOptionsObject: SelectOptions = {
        values: tradeFlowSelectValues,
        names: tradeFlowSelectNames
    }
    let selectElementsOptionsObject: SelectOptions = {
        values: tradeElementSelectValues,
        names: tradeElementSelectNames
    }
    return {
        selectOptionsObject,
        selectElementsOptionsObject
    }
}


interface sectionState {
    elementId: number
    regionCode: string
    macroRegionCode: string
    countryCode: string
    year: number
    admin: string
    locationName: string
    flowId: number
}

// const baseUrl = 'http://cropobscentral.test';
 const baseUrl = 'https://cropobs-central.ciat.cgiar.org';
//const baseUrl = 'https://commonbeanobservatory.org';
const baseURL = process.env.NEXT_PUBLIC_BASE_URL; //
const idCrop = process.env.NEXT_PUBLIC_ID_CROP; //176
const cropName = process.env.NEXT_PUBLIC_CROP_NAME; //beans
const idGroup = process.env.NEXT_PUBLIC_ID_GROUP; //96001
const idIndicators = process.env.NEXT_PUBLIC_ID_INDICATORS; //2546

const tradeFlowSelectValues = [1,2];
const tradeElementSelectValues = [3001, 3002];

export interface ITreeMap {
    type: string;
    labels: string[] | null | undefined | (string | null)[];
    parents: string[] | null | undefined;
    values: number[] | null | undefined;
    texttemplate: string;
    hovertemplate: string;
}

const DataPage: NextPage = () => {
    const { t: dataTranslate } = useTranslation('data-trades');
    const { isMapReady } = useContext( GenericMapContext );
    const { locale } = useRouter();
    const [ sectionState, setSectionState ] = useState<sectionState>({
        elementId: 3001,
        regionCode: 'WLRD',
        macroRegionCode: '10',
        countryCode: 'WLRD',
        year: 2021,
        admin: 'World',
        locationName: dataTranslate('world-locale'),
        flowId: 1        
    });
    const { elementId, regionCode, macroRegionCode, countryCode, year, admin, locationName, flowId } = sectionState;
    const [locationNameOptions, setLocationNameOptions] = useState<locationNameOptions>({
        en: 'World',
        es: 'Mundo',
        pt: 'Mundo',
        isoLabel: 'WLRD',
        clickId: 0
    });
    const [countryCode2, setCountryCode2] = useState('WLRD');
    const { data: yearsData, isLoading: isLoadingYears } = useSWR<YearsData[]>(`${baseUrl}/api/v1/data/years/OBSERVATIONS`, dataFetcher); //EP
    const { data: tradeTotalData, isLoading: isLoadingTradeTotalData } = useSWR<number>(`${baseUrl}/api/v1/data/trade/tradeTotal/${ cropName?.toUpperCase() }_TRADE_AUX/${ flowId }/${ countryCode }/${ elementId }/713999/${ year }`, dataFetcher); //EP
    const { data: tradeImports, isLoading: isLoadingTradeImports } = useSWR<number>(`${baseUrl}/api/v1/chart/trade/default/${ cropName?.toUpperCase() }_TRADE_AUX/1/${ countryCode }?cropIds=[71333]&elementIds=[3001,3002]`, dataFetcher); //EP
    // const { data: treeMapData, isLoading: isLoadingTreeMapData } = useSWR<TradeApiResponse>(`${ baseUrl }/api/v1/chart/trade/treeMap/BEANS_TRADE_AUX/1/${ countryCode }/3002/713999/${ year }`, dataFetcher);

    const { width } = useWindowSize();
    const { buttonBoth, buttonGraphs, buttonMap } = useContext(LeftSideMenuContext);
    const { map } = useContext(MapContext);
    const [mapCol, setMapCol] = useState(0);
    const [graphsCol, setGraphsCol] = useState(0);
    const [showMap, setShowMap] = useState(false);
    const [showGraphs, setShowGraphs] = useState(false);
    
    const [yearsState, setYears] = useState<YearsState>({ yearsOptions: {values: [], names: []}});
    const { yearsOptions } = yearsState;

    const [tradeFlow, setTradeFlow] = useState<TradeFlowState>( { tradeFlowOptions: {values: [], names: []}} );
    const { tradeFlowOptions } = tradeFlow;

    const [tradeElements, setTradeElements] = useState<TradeElementState>( { tradeElementOptions: {values: [], names: []}} );
    const { tradeElementOptions } = tradeElements;

    const Plot = dynamic(() => import("react-plotlyjs-ts"), { ssr: false, });
    const [isCountry, setIsCountry] = useState(false);

    let [treeLabels, setTreeLabels] = useState(Array<string>(0))
    let [treeLabelsES,setTreeLabelsES] = useState(Array<string>(0))
    let [treeLabelsPT,setTreeLabelsPT] = useState(Array<string | null>(0))
    let [treeValues, setTreeValues] = useState(Array<number>(0))
    let [treeLoading, setTreeLoading] = useState(true)
    let [treeFailed, setTreeFailed] = useState(false)

    let [chartLabels1, setChartLabels1] = useState(Array<string>(0))
    let [chartValues11, setChartValues11] = useState(Array<number>(0))
    let [chartValues12, setChartValues12] = useState(Array<number>(0))
    let [chartLoading1, setChartLoading1] = useState(true)
    let [chartFailed1, setChartFailed1] = useState(false)
    
    let [chartLabels2, setChartLabels2] = useState(Array<string>(0))
    let [chartDataNms2, setChartDataNms2] = useState(Array<string>(0))
    let [chartValues21, setChartValues21] = useState(Array<number>(0))
    let [chartValues22, setChartValues22] = useState(Array<number>(0))
    let [chartValues23, setChartValues23] = useState(Array<number>(0))
    let [chartValues24, setChartValues24] = useState(Array<number>(0))
    let [chartLoading2, setChartLoading2] = useState(true)
    let [chartFailed2, setChartFailed2] = useState(false)

    let [percent1, setpercent1] = useState(-1000)
    let [percent2, setpercent2] = useState(-1000)
    let [percent3, setpercent3] = useState(-1000)

    let [anualdata, setanualdata] = useState({labels: Array(0), datasets: Array<any>(0)});
    let [tenyearsdata, settenyearsdata] = useState({labels_1: Array(0), datasets_1: Array<any>(0)});
    let [annualOptions, setAnualOptions] = useState({})

    const [isCollapsed, setIsCollapsed] = useState(false);
    
    const [sideBarColumn, setSideBarColumn] = useState('');
    const [contentColumn, setContentColumn] = useState('');
    const [sideBarSubcolumn, setSideBarSubcolumn] = useState(9);
    const [collapsedSideBarButton, setCollapsedSideBarButton] = useState(3);

    const [clickId, setClickId] = useState<string | number | null>(null);
    const [regionsState, setRegions] = useState<RegionsState>({
        regionsObj: {},
        regionsOptions: { values: [], names: []}
    });
    const { regionsOptions, regionsObj } = regionsState;
    const [legendTitle, setLegendTitle] = useState('');
    const [tradeFlowText, setTradeFlowText] = useState('');
    const [tradeFlowText2, settradeFlowText2] = useState('');
    const [tradeFlowText3, settradeFlowText3] = useState('');
    const [showCountries, setShowCountries] = useState(false);

    // --------------------------------
    const [locationName2, setLocationName2] = useState('');

    useEffect(() => {
        if (buttonBoth) {
            setMapCol(6)
            setGraphsCol(6)
            setShowMap(true)
            setShowGraphs(true)

            
        }
        if (buttonGraphs) {
            setMapCol(0)
            setGraphsCol(12)
            setShowMap(false)
            setShowGraphs(true)
            if (map) map.resize(); 
        }
        if (buttonMap) {
            setMapCol(12)
            setGraphsCol(0)
            setShowMap(true)
            setShowGraphs(false)
            if (map) map.resize(); 
        }
    }, [buttonBoth, buttonGraphs, buttonMap]);

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

    const [isMapView, setIsMapView] = useState(false);

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
        if( buttonBoth ) {
            setIsMapView( false );
        }
        if( buttonMap ) {
            setIsMapView( true ); 
        }
        if (map)  { 
            map.resize(); 
        }
        // if( width! < 991 ) setContentColumn('100%');

        
    })

    // for to can to update treeMap by force
    const [revision, setRevision] = useState(0);

    const [treeMapObject, setTreeMapObject] = useState<ITreeMap>(
        {
            type: "treemap",
            labels: undefined,
            parents: undefined,
            values: undefined,
            texttemplate: "%{label}<br>%{percentParent:.2%}",
            hovertemplate: "<b>%{label}<br><br>%{percentParent:.2%}</b> <br><br>Value: %{value:$,.0f}<extra></extra>"
        }
    )
    const [treeMapData, setTreeMapData] = useState<ITreeMap[]>([])

    useEffect(() => {
        axios.all([
            axios.get(`${ baseUrl }/api/v1/chart/trade/treeMap/${ cropName?.toUpperCase() }_TRADE_AUX/${ flowId }/${ countryCode2 }/3002/713999/${ year }`), //EP
            axios.get(`${ baseUrl }/api/v1/chart/trade/default/${ cropName?.toUpperCase() }_TRADE_AUX/${ flowId }/${ countryCode2 }?cropIds=[71333]&elementIds=[3001,3002]`), //EP
            axios.get(`${ baseUrl }/api/v1/chart/trade/default/${ cropName?.toUpperCase() }_TRADE_AUX/${ flowId }/${ countryCode2 }?cropIds=[71339,71333,71332,71331]&elementIds=[3002]`), //EP
            axios.get(`${ baseUrl }/api/v1/data/trade/value/${ cropName?.toUpperCase() }_TRADE_AUX/VALUE/${ flowId }/${ countryCode2 }/3101/713999/${ year }`), //EP
            axios.get(`${ baseUrl }/api/v1/data/trade/value/${ cropName?.toUpperCase() }_TRADE_AUX/VALUE/${ flowId }/${ countryCode2 }/3102/713999/${ year }`), //EP
            axios.get(`${ baseUrl }/api/v1/data/trade/value/${ cropName?.toUpperCase() }_TRADE_AUX/VALUE/${ flowId }/${ countryCode2 }/3103/713999/${ year }`), //EP
            axios.get(`${ baseUrl }/api/v1/chart/trade/default/${ cropName?.toUpperCase() }_TRADE_AUX/${ flowId }/${ countryCode2 }?cropIds=[%22713999%22]&elementIds=[3301,3303,300001]`), //EP
            axios.get(`${ baseUrl }/api/v1/chart/trade/default/${ cropName?.toUpperCase() }_TRADE_AUX/${ flowId }/${ countryCode2 }?cropIds=[%22713999%22]&elementIds=[3302,3304,300003]`) //EP
        ]).then(axios.spread((...responses) => {
            const responseOne = responses[0];
            const responseTwo = responses[1];
            const response3 = responses[2];
            const response4 = responses[3];
            const response5 = responses[4];
            const response6 = responses[5];
            const response7 = responses[6];
            const response8 = responses[7];

            // Tree Map
            // ---------------------------------------------------------------------------------------------
            const valuesAux = Array<number>(0)
            const labelsAux = Array<string>(0)
            const labelsAuxES = Array<string>(0)
            const labelsAuxPT = Array<string>(0)

            responseOne.data.data.observations.map((elem : any, idx : number)=>{
                if (idx > 79){
                    valuesAux.push(elem.value)
                    labelsAux.push(responseOne.data.data.country_index[elem.iso3_reporter].country_name)
                    labelsAuxES.push(responseOne.data.data.country_index[elem.iso3_reporter].esp_name)
                    labelsAuxPT.push(responseOne.data.data.country_index[elem.iso3_reporter].pt_name)
                }
            })
            setTreeLabels(labelsAux)
            setTreeLabelsES(labelsAuxES)
            setTreeLabelsPT(labelsAuxPT)
            setTreeValues(valuesAux)
            const newTreeMapObject = {
                type: "treemap",
                labels: locale == "en" ? labelsAux : locale == "es" ? labelsAuxES : labelsAuxPT,
                parents: labelsAux.map(() => ""),
                values: valuesAux,
                texttemplate: "%{label}<br>%{percentParent:.2%}",
                hovertemplate: "<b>%{label}<br><br>%{percentParent:.2%}</b> <br><br>Value: %{value:$,.0f}<extra></extra>"
              };
            //setTreeMapObject(newTreeMapObject);
            // Nota: React puede que aún no haya actualizado el valor de treeMapObject 
            // en esta línea, por eso usamos newTreeMapObject directamente.
            setTreeMapData([newTreeMapObject]);    
            setTreeLoading(false)

            // ---------------------------------------------------------------------------------------------

            // another chart
            const valuesAux1 = Array<number>(0)
            const valuesAux2 = Array<number>(0)
            responseTwo.data.data.observations.map((elem:any) =>{
                if(elem.id_element == 3002) valuesAux1.push(elem.value)
                else if(elem.id_element == 3001) valuesAux2.push(elem.value)
            })
            setChartValues11(valuesAux1)
            setChartValues12(valuesAux2)
            setChartLabels1(responseTwo.data.data.labels)
            setChartLoading1(false)

            // ---------------------------------------------------------------------------------------------

            // another chart
            const valuesAux1_1 = Array<number>(0)
            const valuesAux2_1 = Array<number>(0)
            const valuesAux3_1 = Array<number>(0)
            const valuesAux4_1 = Array<number>(0)
            const namesAux = Array<string>(0)
            response3.data.data.observations.map((elem:any) =>{
                if(!namesAux.includes(elem.crop_name)) namesAux.push(elem.crop_name)
                if(elem.id_crop == 71331) {valuesAux1_1.push(elem.value) }
                else if(elem.id_crop == 71332) valuesAux2_1.push(elem.value)
                else if(elem.id_crop == 71333) valuesAux3_1.push(elem.value)
                else if(elem.id_crop == 71339) valuesAux4_1.push(elem.value)
            })
            setChartValues21(valuesAux3_1)
            setChartValues22(valuesAux1_1)
            setChartValues23(valuesAux4_1)
            setChartValues24(valuesAux2_1)
            setChartLabels2(response3.data.data.labels)
            setChartDataNms2(namesAux)
            setChartLoading2(false)

            // ---------------------------------------------------------------------------------------------

            // indicators
            setpercent1( Math.round(response4.data * 1000)/1000)
            setpercent2( Math.round(response5.data * 100)/100)
            setpercent3( Math.round(response6.data * 100)/100)

            // another chart
            const data = response7.data.data;
            const datasets = datasetGeneratorPV(data.observations, data.labels, chartConfig[0].config.key,chartConfig[0].config.name);
            const chartjsData = {labels: data.labels, datasets};
            console.log(chartjsData)
            setanualdata(chartjsData)
        
            const data_1 = response8.data.data;
            const datasets_1 = datasetGeneratorPV(data.observations, data.labels, chartConfig[1].config.key,chartConfig[1].config.name);
            const chartjsData_1 = {labels_1: data_1.labels, datasets_1};
            settenyearsdata(chartjsData_1)

        }))
        .catch(errors => {
            // reaccionar apropiadamente dependiendo del error.
            console.log(errors)
        })
        if( clickId === null ) {
            let title = '';
            if( locale == 'en' ) title = 'World';
            if( locale == 'es' ) title = 'Mundo';
            if( locale == 'pt' ) title = 'Mundo';
            setLocationName2( title );
        }
    }, [])

    useEffect(() => {  

        axios({ url: `${ baseUrl }/api/v1/data/trade/value/${ cropName?.toUpperCase() }_TRADE_AUX/VALUE/${ flowId }/${ countryCode2 }/3101/713999/${ year }` }) //EP
        .then(response => {
            setpercent1( Math.round(response.data * 1000)/1000)
        })
        .catch(error => {
            console.log(error)
            setpercent1(0)
        })
        axios({ url: `${ baseUrl }/api/v1/data/trade/value/${ cropName?.toUpperCase() }_TRADE_AUX/VALUE/${ flowId }/${ countryCode2 }/3102/713999/${ year }` }) //EP
        .then(response => {
            setpercent2( Math.round(response.data * 100)/100)
        })
        .catch(error => {
            console.log(error)
            setpercent2(0)
        })
        axios({ url: `${ baseUrl }/api/v1/data/trade/value/${ cropName?.toUpperCase() }_TRADE_AUX/VALUE/${ flowId }/${ countryCode2 }/3103/713999/${ year }` }) //EP
        .then(response => {
            setpercent3( Math.round(response.data * 100)/100)
        })
        .catch(error => {
            console.log(error)
            setpercent3(0)
        })
            

    }, [countryCode2, flowId, year])

    let data = [
        {
            type: "treemap",
            labels: locale == "en" ? treeLabels : locale == "es" ? treeLabelsES : treeLabelsPT,
            parents: treeLabels.map(() => ""),
            values: treeValues,
            texttemplate: "%{label}<br>%{percentParent:.2%}",
            hovertemplate: "<b>%{label}<br><br>%{percentParent:.2%}</b> <br><br>Value: %{value:$,.0f}<extra></extra>"
        }
    ]

    const layout = {
        autosize: true,
        margin: { l: 20, r: 20, b: 0, t: 10, pad: 2 }
    }

    const config = {
        responsive: true,
    }
    
    const datasetsTranslated = (datasets: any[], index: number) => {
        const result = Array(0)
        datasets.map((ds,idx) => {
            const ds_trans = {} as any
            for (let key in ds) {
                ds_trans[key] = ds[key]
                if(key == "label") ds_trans[key] = dataTranslate('chart3'+index+'-dataset'+(idx+1))
            }
            result.push(ds_trans)
        })
        return result
    }

    const optionsTranslated = (options: any,index:number) => {
        const result = {} as any
        for (let key in options) {
            result[key] = options[key]
            if(key == "plugins") result[key]['title']['text'] = dataTranslate('chart3'+index+'-title')
        }
        return result
    }

    const chartConfig = [
        {
            dataURL: {labels:anualdata.labels,datasets:datasetsTranslated(anualdata.datasets,1)},
            options: optionsTranslated(annual_growth_optionsPV,1),
            config: {key: 'id_element', name: 'crop_name'},
            name: dataTranslate('chart3-opt1')
        },
        {
            dataURL: {labels:tenyearsdata.labels_1,datasets:datasetsTranslated(tenyearsdata.datasets_1,2)},
            options: optionsTranslated(ten_year_moving_average_optionsPV,1),
            config: {key: 'id_element', name: 'crop_name'},
            name: dataTranslate('chart3-opt2')
        }
    ]

    const chartTxts1 = {
        title:  tradeFlowText3 + ' ' + dataTranslate('chart1-title') + locationName2,
        axis_x : "",
        axis_y : dataTranslate('chart1-axis-y'),
        datasets: [dataTranslate('chart1-dataset1'),dataTranslate('chart1-dataset2')]
    }
    
    const chartTxts2 = {
        title: dataTranslate('chart2-title')+tradeFlowText3+" "+dataTranslate('chart2-title_1')+" "+locationName2,
        axis_x : "",
        axis_y : dataTranslate('chart2-axis-y'),
        datasets: [chartDataNms2[2],chartDataNms2[0],chartDataNms2[3],chartDataNms2[1]]
    }

    useEffect(() => {
        const { selectElementsOptionsObject, selectOptionsObject } = textByLocale( locale! );
        setTradeFlow( { tradeFlowOptions: selectOptionsObject } )
        setTradeElements({ tradeElementOptions: selectElementsOptionsObject })
        setLegendTitle( legendTitleByLocale( locale!, elementId ));
        const { text, text2, text3 } = tradeFlowTitleByLocale(locale!, flowId)
        setTradeFlowText( text );
        settradeFlowText2( text2 );
        settradeFlowText3( text3 );
    }, [])
    //console.log( flowId )

    useEffect(() => {
        if (yearsData && !isLoadingYears) {
            setYears({yearsOptions: generateYearsOptions(yearsData)});
        }
    }, [isLoadingYears]);

    useEffect(() => {
        if (map){
            map.on('load', () => {
                map.on('click', 'country_layer', (e) => {
                    if( e.features ) {
                        if( e.features[0] ){
                            const { properties } = e.features[0]; 
                            let id = e.features![0].id ?? null;
                            setIsCountry( true );
                            console.log(e.features![0].properties!.iso3)
                            const iso = e.features![0].properties!.iso3;
                            //console.log( e.features![0].properties![dataTranslate('LOCALE_COUNTRY_NAME')])
                            setSectionState( (prevState) => ({
                                ...prevState,
                                countryCode: iso,
                                regionCode: 'trade_country'
                                //locationName: e.features![0].properties![dataTranslate('LOCALE_COUNTRY_NAME')]
                            }));
                            setCountryCode2(iso);
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

    const [multiChartTrElementId, setMultiChartTrElementId] = useState(3002);

    useEffect(() =>{
        axios.get(`${ baseUrl }/api/v1/chart/trade/default/${ cropName?.toUpperCase() }_TRADE_AUX/${ flowId }/${ countryCode2 }?cropIds=[71339,71333,71332,71331]&elementIds=[${multiChartTrElementId}]`) //EP
        .then(res => {
            const valuesAux1_1 = Array<number>(0)
            const valuesAux2_1 = Array<number>(0)
            const valuesAux3_1 = Array<number>(0)
            const valuesAux4_1 = Array<number>(0)
            const namesAux = Array<string>(0)
            res.data.data.observations.map((elem:any) =>{
                if(!namesAux.includes(elem.crop_name)) namesAux.push(elem.crop_name)
                if(elem.id_crop == 71331) {valuesAux1_1.push(elem.value) }
                else if(elem.id_crop == 71332) valuesAux2_1.push(elem.value)
                else if(elem.id_crop == 71333) valuesAux3_1.push(elem.value)
                else if(elem.id_crop == 71339) valuesAux4_1.push(elem.value)
            })
            setChartValues21(valuesAux3_1)
            setChartValues22(valuesAux1_1)
            setChartValues23(valuesAux4_1)
            setChartValues24(valuesAux2_1)
            setChartLabels2(res.data.data.labels)
            setChartDataNms2(namesAux)
            setChartLoading2(false)
            console.log('value quantity' + multiChartTrElementId)
            console.log(res);

        })
    }, [multiChartTrElementId])

    useEffect(() => {
        setTreeLoading(true);
        setChartLoading1(true);
        setChartLoading2(true);
        axios.all([
            axios.get(`${ baseUrl }/api/v1/chart/trade/treeMap/${ cropName?.toUpperCase() }_TRADE_AUX/${ flowId }/${ countryCode2 }/3002/713999/${ year }`), //EP
            axios.get(`${ baseUrl }/api/v1/chart/trade/default/${ cropName?.toUpperCase() }_TRADE_AUX/${ flowId }/${ countryCode2 }?cropIds=[71333]&elementIds=[3001,3002]`), //EP
            axios.get(`${ baseUrl }/api/v1/chart/trade/default/${ cropName?.toUpperCase() }_TRADE_AUX/${ flowId }/${ countryCode2 }?cropIds=[71339,71333,71332,71331]&elementIds=[3002]`), //EP
            axios.get(`${ baseUrl }/api/v1/chart/trade/default/${ cropName?.toUpperCase() }_TRADE_AUX/${ flowId }/${ countryCode2 }?cropIds=[%22713999%22]&elementIds=[3301,3303,300001]`), //EP
            axios.get(`${ baseUrl }/api/v1/chart/trade/default/${ cropName?.toUpperCase() }_TRADE_AUX/${ flowId }/${ countryCode2 }?cropIds=[%22713999%22]&elementIds=[3302,3304,300003]`), //EP
        ]).then(axios.spread((...responses) => {

            const response1 = responses[0];
            const response2 = responses[1];
            const response3 = responses[2];
            const response4 = responses[3];
            const response5 = responses[4];
            // Tree Map
            // ---------------------------------------------------------------------------------------------
            const valuesAux = Array<number>(0)
            const labelsAux = Array<string>(0)
            const labelsAuxES = Array<string>(0)
            const labelsAuxPT = Array<string>(0)

            if( flowId == 1 ){
                response1.data.data.observations.map((elem : any, idx : number)=>{
                    console.log(response1)
                    console.log(response1.data.data.country_index[elem.iso3_partner])
                    valuesAux.push(elem.value)
                    labelsAux.push(response1.data.data.country_index[elem.iso3_reporter].country_name)
                    labelsAuxES.push(response1.data.data.country_index[elem.iso3_reporter].esp_name)
                    labelsAuxPT.push(response1.data.data.country_index[elem.iso3_reporter].pt_name)
                })
                setTreeLabels(labelsAux)
                setTreeLabelsES(labelsAuxES)
                setTreeLabelsPT(labelsAuxPT)
                setTreeValues(valuesAux)
            }
            if( flowId == 2 ) {
                response1.data.data.observations.map((elem : any, idx : number)=>{
                    console.log(response1)
                    console.log(response1.data.data.country_index[elem.iso3_partner])
                    valuesAux.push(elem.value)
                    labelsAux.push(response1.data.data.country_index[elem.iso3_partner].country_name)
                    labelsAuxES.push(response1.data.data.country_index[elem.iso3_partner].esp_name)
                    labelsAuxPT.push(response1.data.data.country_index[elem.iso3_partner].pt_name)
                })
                setTreeLabels(labelsAux)
                setTreeLabelsES(labelsAuxES)
                setTreeLabelsPT(labelsAuxPT)
                setTreeValues(valuesAux)
            }
            
            //console.log('llenando :', {labelsAux, labelsAuxES, labelsAuxPT, valuesAux})
            const newTreeMapObject = {
                type: "treemap",
                labels: locale == "en" ? labelsAux : locale == "es" ? labelsAuxES : labelsAuxPT,
                parents: labelsAux.map(() => ""),
                values: valuesAux,
                texttemplate: "%{label}<br>%{percentParent:.2%}",
                hovertemplate: "<b>%{label}<br><br>%{percentParent:.2%}</b> <br><br>Value: %{value:$,.0f}<extra></extra>"
              };
            setTreeMapData([newTreeMapObject]);   
            setTreeLoading(false)

            // another chart
            const valuesAux1 = Array<number>(0)
            const valuesAux2 = Array<number>(0)
            response2.data.data.observations.map((elem:any) =>{
                if(elem.id_element == 3002) valuesAux1.push(elem.value)
                else if(elem.id_element == 3001) valuesAux2.push(elem.value)
            })
            setChartValues11(valuesAux1)
            setChartValues12(valuesAux2)
            setChartLabels1(response2.data.data.labels)
            setChartLoading1(false)

            // ---------------------------------------------------------------------------------------------

            // another chart
            const valuesAux1_1 = Array<number>(0)
            const valuesAux2_1 = Array<number>(0)
            const valuesAux3_1 = Array<number>(0)
            const valuesAux4_1 = Array<number>(0)
            const namesAux = Array<string>(0)
            response3.data.data.observations.map((elem:any) =>{
                if(!namesAux.includes(elem.crop_name)) namesAux.push(elem.crop_name)
                if(elem.id_crop == 71331) {valuesAux1_1.push(elem.value) }
                else if(elem.id_crop == 71332) valuesAux2_1.push(elem.value)
                else if(elem.id_crop == 71333) valuesAux3_1.push(elem.value)
                else if(elem.id_crop == 71339) valuesAux4_1.push(elem.value)
            })
            setChartValues21(valuesAux3_1)
            setChartValues22(valuesAux1_1)
            setChartValues23(valuesAux4_1)
            setChartValues24(valuesAux2_1)
            setChartLabels2(response3.data.data.labels)
            setChartDataNms2(namesAux)
            setChartLoading2(false)

            // another chart
            const data = response4.data.data;
            const datasets = datasetGeneratorPV(data.observations, data.labels, chartConfig[0].config.key,chartConfig[0].config.name);
            const chartjsData = {labels: data.labels, datasets};
            setanualdata(chartjsData)
        
            const data_1 = response5.data.data;
            const datasets_1 = datasetGeneratorPV(data.observations, data.labels, chartConfig[1].config.key,chartConfig[1].config.name);
            const chartjsData_1 = {labels_1: data_1.labels, datasets_1};
            settenyearsdata(chartjsData_1)

        // ---------------------------------------------------------------------------------------------
              
        })).catch(errors => {
            console.error(errors)
        })
    }, [flowId, countryCode2])

    // Hook for to test only
    // useEffect(() => {
    //     if(treeMapData) {
    //         console.log(treeMapData);
    //     }
    // }, [treeMapData])
    

    useEffect(() => {
        let title = '';
        if( clickId === null ) {
            if( locale == 'en' ) title = 'World';
            if( locale == 'es' ) title = 'Mundo';
            if( locale == 'pt' ) title = 'Mundo';
            setLocationName2( title );
        }else {
            if( locale == 'en' ) title = locationNameOptions.en;
            if( locale == 'es' ) title = locationNameOptions.es;
            if( locale == 'pt' ) title = locationNameOptions.pt;
            setLocationName2( title );
        }
    }, [ locale ])

    useEffect(() => {
        let title = '';
        if( clickId === null ) {
            if( locale == 'en' ) title = 'World';
            if( locale == 'es' ) title = 'Mundo';
            if( locale == 'pt' ) title = 'Mundo';
            setLocationName2( title );
        }else {
            if( locale == 'en' ) title = locationNameOptions.en;
            if( locale == 'es' ) title = locationNameOptions.es;
            if( locale == 'pt' ) title = locationNameOptions.pt;
            setLocationName2( title );
        }
    }, [ clickId ])
    

    // This useEffect is used when the back button is clicked
    useEffect(() => {
        if ([...Object.keys(regionsObj), 'WLRD'].includes(countryCode)){
            setSectionState( (prevState) => ({
                ...prevState,
                locationName: macroRegionCode == '10' ? dataTranslate('world-locale') : regionsObj[regionCode][dataTranslate('LOCALE_FILTER_REGION') as keyof typeof regionsObj[typeof regionCode]].toString()
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
    }, [countryCode, dataTranslate]);

    useEffect(() => {
        const { selectElementsOptionsObject, selectOptionsObject } = textByLocale( locale! );
        setTradeFlow( { tradeFlowOptions: selectOptionsObject } )
        setTradeElements({ tradeElementOptions: selectElementsOptionsObject })
        setLegendTitle( legendTitleByLocale( locale!, elementId ));
        const { text, text2, text3 } = tradeFlowTitleByLocale(locale!, flowId)
        setTradeFlowText( text );
        settradeFlowText2( text2 );
        settradeFlowText3( text3 );
    }, [ locale ])

    useEffect(() => {
        setLegendTitle( legendTitleByLocale( locale!, elementId ));
        // console.log(baseUrl + `/api/v1/data/adminIds/BEANS_TRADE_AUX/${ regionCode }/${ countryCode }/713999/${ year }?id_elements=["${ elementId }"]`)
        
    }, [ elementId ])

    useEffect(() => {
        const { text, text2, text3 } = tradeFlowTitleByLocale(locale!, flowId)
        setTradeFlowText( text );
        settradeFlowText2( text2 );
        settradeFlowText3( text3 );
    }, [ flowId ])

    // ---------------------------------------------------------------------------------------
    // Total import o export value 
    // ---------------------------------------------------------------------------------------
    const [tradeTotal, setTradeTotal] = useState<number | string>('');
    useEffect(() => {
        if( !isLoadingTradeTotalData ) {
            setTradeTotal( commarize(tradeTotalData!) )
            console.log(tradeTotalData)
            console.log( commarize(tradeTotalData!) )
        }
    }, [ isLoadingTradeTotalData ])

    
    
    
    

    // ----------------------------------------------------------------------------------------
    // For to show or hide loader gif
    // ----------------------------------------------------------------------------------------
    // const [loaderClass, setLoaderClass] = useState('hide_loader');
    // useEffect(() => {
    //     if( isMapReady ) setLoaderClass('hide_loader');
    //     else setLoaderClass('show_loader')
    //     console.log( loaderClass )
    // }, [ isMapReady ])

    // --------------------------------------------------------------------------------------------------------------
    // Local variables for translation
    // --------------------------------------------------------------------------------------------------------------
    const [titlePage, setTitlePage] = useState('');
    const [searchCountryTextButton, setSearchCountryTextButton] = useState('');
    const [mapGraphsText, setMapGraphsText] = useState('');
    const [metadataText, setMetadataText] = useState('');
    const [locationText, setLocationText] = useState('');


    useEffect(() => {
        setTitlePage(dataTranslate('title-header')!);
        setSearchCountryTextButton(dataTranslate('search_country')!);
        setMapGraphsText(dataTranslate('graphs_map')!);
        setMetadataText(dataTranslate('metadata')!);
        
        setLocationText(locationName);
    }, [dataTranslate, locationName])
    

    return (
        <Layout title={ dataTranslate('title-header') }>
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
                    <div className={ styles['main-content-container'] } style={{ width: contentColumn }} >
                        <Row className={ styles['padding-left-subcontainers'] }>
                            <Col xs={ 12 } className={ `${ styles['no-margin'] } ${ styles['no-padding'] }` }>
                                <MainBar key={ uuidv4() } section={  `${dataTranslate('trade')} -  ${locationName2}` } >
                                        <BackButton locale={ locale! } regionCode={regionCode} countryCode={countryCode} setCountryCode2={ setCountryCode2 } setClickId={ setClickId } clickId={ clickId } setSectionState={setSectionState} isForTrade={ true } />
                                        {/* <BackButton regionCode={regionCode} countryCode={ locationNameOptions.isoLabel } setSectionState={setSectionState} setCountryCode2={ setCountryCode2 } setClickId={ setClickId } setLocationNames={ setLocationNameOptions } clickId={ clickId } locale={ locale ?? 'en'}/> */}
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
                                                    {/* <MapSelect id='element-filter' options={elementsOptions} selected={elementId} setSelected={setSectionState} atrName='elementId'/> */}
                                                    <MapSelect id='trade-flow-filter' options={tradeFlowOptions} selected={flowId} setSelected={setSectionState} atrName='flowId'/>
                                                    <MapSelect id='element-filter' options={tradeElementOptions} selected={elementId} setSelected={setSectionState} atrName='elementId'/>
                                                    <MapSelect id='year-filter' options={yearsOptions} selected={year} setSelected={setSectionState} atrName='year'/>
                                                    {/* <MapSelect id='macro-region-filter' options={macroRegionsOptions} selected={macroRegionCode} setSelected={setSectionState} atrName='macroRegionCode'/>
                                                    { macroRegionCode == '10' ? <></> : <MapSelect options={regionsOptions} selected={regionCode} setSelected={setSectionState} atrName='regionCode'/> } */}
                                                </Row>
                                                <Row style={{justifyContent: 'flex-end', flexWrap: 'wrap'}}>
                                                    <Button
                                                        className={`${styles['search-country-button']}`}
                                                        style={{width: '145px', height: 'inherit'}}
                                                        onClick={() => setShowCountries(true)}
                                                    >
                                                        search country
                                                    </Button>
                                                </Row>
                                                
                                            </Row>
                                            <MapView admin={ admin } geoJsonURL={ baseUrl + `/api/v1/geojson/countries/${ cropName?.toUpperCase() }_TRADE_AUX/ISO3_REPORTER/713999` } adminIdsURL={ baseUrl + `/api/v1/data/adminIds/${ cropName?.toUpperCase() }_TRADE_AUX/${ regionCode }/${ countryCode }/713999/${ year }?id_elements=["${ elementId }"]` } percentileURL={ baseUrl + `/api/v1/percentile/values/${ countryCode }/data_avg_trade/${ elementId }/713999/${ year }?tradeFlow=${ flowId }`  } quintilURL={ baseUrl + '/api/v1/percentile/heatmap' } legendTitle={ legendTitle } elementUnit={'kg'} isMapView={ false } /> {/* //EP */}
                                            {/* <MapView admin={admin} geoJsonURL={`${baseURL}/api/v1/geojson/countries/rice_surface_context/ISO3/27`} adminIdsURL={`${baseURL}/api/v1/data/adminIds/rice_surface_context/${admin}/${regionCode}/27/${year}?id_elements=[${elementId}]`} percentileURL={`${baseURL}/api/v1/percentile/values/undefined/data_production_surface_context/${elementId}/27/${year}?tradeFlow=undefined`} quintilURL={`${baseURL}/api/v1/percentile/heatmap`} legendTitle={ elementsObj[elementId]?.ELEMENT_EN ?? 'Loading...'} /> */}
                                        
                                        </Col>
                                        <Col xs={ 12 } lg={ graphsCol } style={ showGraphs && !showMap ? { display: 'block', height: '80vh', overflow: 'auto', paddingLeft: '60px' } : showGraphs ? { display: 'block', height: '80vh', overflow: 'auto' } : { display: 'none' } }>
                                        {(!treeLoading && !chartLoading1 && !chartLoading2 && percent1!==-1000 && percent2!==-1000 && percent3!==-1000 && anualdata.labels.length>0 && tenyearsdata.labels_1.length>0) ?
                                            <>
                                                <div style={{display: 'flex', flexDirection: 'row'}}>
                                                    <div style={{width: "60%", padding: "10px"}}>{dataTranslate('label-chart1')} <i> { locale == 'en' ? locationName2 : ( locale == 'pt' ? locationName2 : '' ) } <b>{ tradeFlowText2 }</b> { locale == 'es' ? locationName2 : '' } {dataTranslate('label-chart4')}</i> {dataTranslate('label-chart5')} <i><b>{sectionState.year}</b></i> ?</div>
                                                    <div style={{width: "40%", padding: "10px", textAlign: "center"}}>{dataTranslate('label-chart6')}{ tradeFlowText } {dataTranslate('label-chart8')}: <br/> <i><b>{ tradeTotal }</b></i> USD </div>
                                                </div>
                                                <ChartFrame data={[]} toggleText={dataTranslate('tree-toggle')} excludedClasses={[]}>
                                                    {treeFailed ? (<div>Failed to load</div>) : (treeLoading ? (<div>Loading...</div>) : (<Plot key={revision} data={treeMapData} layout={layout} config={config} />) )}
                                                </ChartFrame>
                                                <ChartFrame data={[]} toggleText={dataTranslate('chart1-toggle')} excludedClasses={[]}>
                                                    {chartFailed1 ? (<div>Failed to load</div>) : (chartLoading1 ? (<div>Loading...</div>) : (<MultichartTr2 xLabels={chartLabels1} data1={chartValues11} data2={chartValues12} chartTexts={chartTxts1} />) )} 
                                                </ChartFrame>
                                                <ChartFrame data={[]} toggleText={dataTranslate('chart2-toggle')} excludedClasses={[]}>
                                                    {chartFailed2 ? (<div>Failed to load</div>) : (chartLoading2 ? (<div>Loading...</div>) : (<MultichartTr setMultiChartTrElementId={setMultiChartTrElementId} xLabels={chartLabels2} data2={chartValues22} data4={chartValues24} data3={chartValues23} data1={chartValues21} chartTexts={chartTxts2}/>) )} 
                                                </ChartFrame>
                                                <PorcentagesBoxTr data_1={{ value: percent1, text: dataTranslate('label-perc1') + tradeFlowText3 + dataTranslate('label-perc1_1') }}
                                                    data_2={{ value: percent2, text: dataTranslate('label-perc2')+ tradeFlowText3 + dataTranslate('label-perc2_2') }} />
                                                <APorcentagesBoxTr data={{value: percent3, text: dataTranslate('label-perc3')+ tradeFlowText3 + dataTranslate('label-perc3_3') }}/>
                                                <ChartFrame data={[]} toggleText={dataTranslate('chart3-toggle')} excludedClasses={['chart-select']}>
                                                    <ChartSelectionPV chartConfigList={chartConfig} />
                                                </ChartFrame>
                                                <div> Source: <i>Data source</i> </div>
                                            </>
                                        :
                                        <div style={{height:"100%",width:"100%",display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center"}}><LoadingComponent/></div>
                                        }
                                        </Col>
                                        
                                    </Row>
                                    
                                </Tab>
                                <Tab eventKey="profile" title={metadataText} tabClassName={styles.coloredTab}>
                                    
                                </Tab>
                            </Tabs>
                            </Col>

                            
                        </Row>
                    </div>
                </div> 
            </Container>
            <SearchCountryModal adminIdsUrl={baseUrl + `/api/v1/data/adminIds/${ cropName?.toUpperCase() }_TRADE_AUX/${ regionCode }/${ countryCode }/713999/${ year }?id_elements=["${ elementId }"]`} show={showCountries} handleClose={setShowCountries} clickId={clickId} setSectionState={setSectionState} setClickId={setClickId} />
        </Layout>
    )
}

export const getStaticProps: GetStaticProps = async ({ locale }) => {
    return {
        props: {
            ...(await serverSideTranslations(locale!, ['data-trades'])),
        }
    }
}

export default DataPage
