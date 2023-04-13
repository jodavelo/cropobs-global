import { useState, useEffect, useContext } from 'react'
import { GetStaticProps, NextPage } from 'next';
import { Button, Col, Container, Row } from 'react-bootstrap';
import { useTranslation } from 'next-i18next';
import 'bootstrap/dist/css/bootstrap.min.css';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { Layout } from '../../components/layouts'
import { MainBar, MapView, SidebarComponent } from '../../components/ui';
import useSWR from 'swr';
import { v4 as uuidv4 } from 'uuid';

import style from './data.module.css';
import { PodiumProductVal as Podium, PorcentagesBox, MultichartPV, ChartFrame, MultiBar1, MultiBar2, MapCON } from '../../components/data';
import { dataFetcher, datasetGeneratorPV, generateElementsOptions, generateOptionsFromObj, generateRegionOptions, generateYearsOptions } from '../../helpers/data';

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
import { general_data_steps } from '../../helpers/data/tour';
import { SearchCountryModal } from '../../components/data/search-country-modal';
import { BackButton } from '../../components/data/back-button';
import { SourcesComponent } from '../../components/ui/sources-component';
import DOMPurify from 'isomorphic-dompurify';
import KeyboardTabIcon from '@mui/icons-material/KeyboardTab';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import { useWindowSize } from '../../hooks';

var styles = style;
const mapFilterElements = [6, 7, 645];
const regionsElementId = {1201:1201, 1202:1202, 1060:1154, 1059:1153, 58:152, 5510:5510, 1000:1000, 5312:5312, 645:14, 6:6, 7:7};
const baseURL = 'https://commonbeanobservatorytst.ciat.cgiar.org';

interface PodiumConfig {
    url: string
    text: string[]
    name: string
    description: string
}

const DataPage: NextPage = () => {
    const { t: dataTranslate } = useTranslation('data-consuption');
    const [ sectionState, setSectionState ] = useState<sectionState>({
        elementId: 6,
        regionCode: 'WLRD',
        macroRegionCode: '10',
        countryCode: 'WLRD',
        year: 2020,
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
    const [clickId, setClickId] = useState<string | number | null>(null);

    // Data translation states
    // const [podiumConfig, setPodiumConfig] = useState<PodiumConfig[] | undefined>(undefined);

    const { data: elementsData, isLoading: isLoadingElements } = useSWR<ElementsData[]>(`${baseURL}/api/v1/data/elements/4`, dataFetcher);

    const { data: yearsData, isLoading: isLoadingYears } = useSWR<YearsData[]>(`${baseURL}/api/v1/data/years/OBSERVATIONS`, dataFetcher);

    const { data: macroRegionsData, isLoading: isLoadingMacroRegions } = useSWR<Record<string, MacroRegionsData>>(`${baseURL}/api/v1/data/macroRegions`, dataFetcher);

    const { data: regionsData, isLoading: isLoadingRegions } = useSWR<Record<string, RegionsData>>(`${baseURL}/api/v1/data/regions/${regionsElementId[elementId as keyof typeof regionsElementId]}/2546/${year}`, dataFetcher);

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
        console.log('Aquí no');
        if (macroRegionsObj && regionsData && !isLoadingRegions) {
            console.log('Aquí sí');
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
            url: `https://commonbeanobservatorytst.ciat.cgiar.org/api/v1/data/podium/${countryCode}/${clickId ? '1' : '4'}/2546/${year}`,
            text:  dataTranslate('podium1-title').replace('#{2}', year.toString()),
            name: dataTranslate('podium-option1'),
            description: '',
        },
        {
            url: `https://commonbeanobservatorytst.ciat.cgiar.org/api/v1/data/podium/${countryCode}/${clickId ? '16' : '20'}/2546/${year}`,
            text:  dataTranslate('podium2-title').replace('#{2}', year.toString()),
            name: dataTranslate('podium-option2'),
            description: '',
        },
        {
            url: `https://commonbeanobservatorytst.ciat.cgiar.org/api/v1/data/podium/${countryCode}/${clickId ? '2' : '5'}/2546/${year}`,
            text:  dataTranslate('podium3-title').replace('#{2}', year.toString()),
            name: dataTranslate('podium-option3'),
            description: '',
        },
    ];

    let [perCapConsup, setPerCapConsup] = useState(0);

    let [dataComplmnt1, setDataComplmnt1] = useState(0);
    let [dataComplmnt2, setDataComplmnt2] = useState(0);
    let [dataComplmnt3, setDataComplmnt3] = useState(0);
    let [dataComplmnt4, setDataComplmnt4] = useState(0);

    let [selfSuff, setSelfSuff] = useState(0);

    let [dataPorcentage1, setPorc1] = useState({
        value: 0,
        text: ``,
    })

    let [dataPorcentage2, setPorc2] = useState({
        value: 0,
        text: ``,
    });

    let [dataPorcentage3, setPorc3] = useState({
        value: 0,
        text: ``,
    })

    let [dataPorcentage4, setPorc4] = useState({
        value: 0,
        text: ``,
    });

    useEffect(() => {

        axios({ url: `https://commonbeanobservatorytst.ciat.cgiar.org/api/v1/data/value/beans_consumption/VALUE/${countryCode}/${clickId ? '645' : '14'}/2546/${year}` })
            .then(response => {
                setPerCapConsup(response.data)
            })

        axios({ url: `https://commonbeanobservatorytst.ciat.cgiar.org/api/v1/data/value/beans_consumption/VALUE/${countryCode}/12/2546/${year}` })
            .then(response => {
                setSelfSuff(response.data)
            })

        axios({ url: `https://commonbeanobservatorytst.ciat.cgiar.org/api/v1/data/value/beans_consumption/VALUE/${countryCode}/664/1/${year}` })
            .then(response => {
                setDataComplmnt1(response.data)
            })

        axios({ url: `https://commonbeanobservatorytst.ciat.cgiar.org/api/v1/data/value/beans_consumption/VALUE/${countryCode}/664/2/${year}` })
            .then(response => {
                setDataComplmnt2(response.data)
            })

        axios({ url: `https://commonbeanobservatorytst.ciat.cgiar.org/api/v1/data/value/beans_consumption/VALUE/${countryCode}/674/1/${year}` })
            .then(response => {
                setDataComplmnt3(response.data)
            })

        axios({ url: `https://commonbeanobservatorytst.ciat.cgiar.org/api/v1/data/value/beans_consumption/VALUE/${countryCode}/674/2/${year}` })
            .then(response => {
                setDataComplmnt4(response.data)
            })

        axios({ url: `https://commonbeanobservatorytst.ciat.cgiar.org/api/v1/data/value/beans_consumption/VALUE/${countryCode}/6/2546/${year}` })
            .then(response => {
                setPorc1({ value: response.data, text: `` })
            })

        axios({ url: `https://commonbeanobservatorytst.ciat.cgiar.org/api/v1/data/value/beans_consumption/VALUE/${countryCode}/7/2546/${year}` })
            .then(response => {
                setPorc2({ value: response.data, text: `` })
            })

        axios({ url: `https://commonbeanobservatorytst.ciat.cgiar.org/api/v1/data/value/beans_consumption/VALUE/${countryCode}/${clickId ? '6' : '23'}/2546/${year}` })
            .then(response => {
                setPorc3({ value: response.data, text: `` })
            })

        axios({ url: `https://commonbeanobservatorytst.ciat.cgiar.org/api/v1/data/value/beans_consumption/VALUE/${countryCode}/24/2546/${year}` })
            .then(response => {
                setPorc4({ value: response.data, text: `` })
            })

    }, [clickId, year])

    let [xlabels1, setxlabels1] = useState(Array(0))
    let [datapoints1, setdatapoints1] = useState(Array(0))
    let [databar11, setdatabar11] = useState(Array(0))
    let [databar12, setdatabar12] = useState(Array(0))
    let [databar13, setdatabar13] = useState(Array(0))
    let [databar14, setdatabar14] = useState(Array(0))
    let [databar15, setdatabar15] = useState(Array(0))

    let [xlabels2, setxlabels2] = useState(Array(0))
    let [datapoints2, setdatapoints2] = useState(Array(0))
    let [databar21, setdatabar21] = useState(Array(0))
    let [databar22, setdatabar22] = useState(Array(0))
    let [databar23, setdatabar23] = useState(Array(0))

    useEffect(() => {
        axios({ url: `https://commonbeanobservatorytst.ciat.cgiar.org/api/v1/chart/default/beans_consumption/${countryCode}?elementIds=[5142,5527,5521,5131,5123,95154,${clickId ? '645' : '14'}]&cropIds=[2546]` })
            .then(response => {
                const data = datasetGeneratorPV(response.data.data.observations, response.data.data.labels, 'id_element', 'crop_name')
                const chartjsData = { labels: response.data.data.labels, data };
                setxlabels1(response.data.data.labels)
                setdatapoints1(data[0].data.map((datum: number) => datum > 0 ? datum : null))
                setdatabar11(data[2].data.map((datum: number) => datum > 0 ? datum : null))
                setdatabar12(data[4].data.map((datum: number) => datum > 0 ? datum : null))
                setdatabar13(data[1].data.map((datum: number) => datum > 0 ? datum : null))
                setdatabar14(data[3].data.map((datum: number) => datum > 0 ? datum : null))
            })
        console.log(`https://commonbeanobservatorytst.ciat.cgiar.org/api/v1/chart/default/beans_consumption/${countryCode}?elementIds=[${clickId ? '8' : '10'},5611,${clickId ? '9' : '5911'},12]&cropIds=[2546]`);
        axios({ url: `https://commonbeanobservatorytst.ciat.cgiar.org/api/v1/chart/default/beans_consumption/${countryCode}?elementIds=[${clickId ? '8' : '10'},5611,${clickId ? '9' : '5911'},12]&cropIds=[2546]` })
            .then(response => {
                const data = datasetGeneratorPV(response.data.data.observations, response.data.data.labels, 'id_element', 'crop_name')
                const chartjsData = { labels: response.data.data.labels, data };
                setxlabels2(response.data.data.labels)
                setdatapoints2(data[1].data)
                setdatabar21(data[0].data)
                setdatabar22(data[2].data.map((datum: number) => -datum))
                setdatabar23(data[3].data)
            })

    }, [clickId])

    const chartTxts1 = {
        title: dataTranslate('chart1-title').replace('#{}', locationName),
        axis_x : "",
        axis_y : dataTranslate('chart1-axis-y'),
        axis_y2 : dataTranslate('chart1-axis-y2'),
        datasets: [dataTranslate('chart1-dataset1'),dataTranslate('chart1-dataset3'),dataTranslate('chart1-dataset4'),dataTranslate('chart1-dataset5'),dataTranslate('chart1-dataset6')]
    }

    const chartTxts2 = {
        title: dataTranslate('chart2-title').replace('#{}', locationName),
        axis_x : "",
        axis_y : dataTranslate('chart2-axis-y'),
        axis_y2 : dataTranslate('chart2-axis-y2'),
        datasets: [dataTranslate('chart2-dataset1'),dataTranslate('chart2-dataset2'),dataTranslate('chart2-dataset3'),dataTranslate('chart2-dataset4')]
    }

    const [isCollapsed, setIsCollapsed] = useState(false);
    const { width } = useWindowSize();
    const [sideBarColumn, setSideBarColumn] = useState('');
    const [contentColumn, setContentColumn] = useState('');
    const [sideBarSubcolumn, setSideBarSubcolumn] = useState(9);
    const [collapsedSideBarButton, setCollapsedSideBarButton] = useState(3);

    const onCickCollapsed = () => {
        
        setIsCollapsed(!isCollapsed);
        //console.log(isCollapsed)
    }
    useEffect(() => {
        if ( width! > 992 && width! < 1200 ) {
            if ( !isCollapsed ) {
                setSideBarColumn( '20%' );
                setContentColumn( '80%' );
            }else {
                setSideBarColumn( '10%' );
                setContentColumn( '90%' );
            }
        }else if (width! > 1200 && width! < 1400){
            if ( !isCollapsed ) {
                setSideBarColumn( '15%' );
                setContentColumn( '85%' );
            }else {
                setSideBarColumn( '10%' );
                setContentColumn( '90%' );
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
                setContentColumn( '80%' );
            }else {
                setSideBarColumn( '10%' );
                setContentColumn( '90%' );
            }
        }
        else if (width! > 1200 && width! < 1400){
            if ( !isCollapsed ) {
                setSideBarColumn( '15%' );
                setContentColumn( '85%' );
            }else {
                setSideBarColumn( '10%' );
                setContentColumn( '90%' );
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
        // if( width! < 991 ) setContentColumn('100%');
    })

    return (
        <Layout title={dataTranslate('section-name')}>
            <Container fluid className={ styles['custom-container-fluid'] }>
                <div className={ styles['custom-subcontainer-fluid'] }>
                    <div className={ styles['sidebar-container'] } style={ width! < 991 ? { display: 'none' } : { width: sideBarColumn }}>
                        <div className={ styles['sidebar-component-container'] }>
                            <SidebarComponent isCollapsedProp={ isCollapsed }/>
                        </div>
                        <div className={ styles['sidebar-arrow-container'] }>
                            <Button onClick={ onCickCollapsed } className={ styles['button-collapsed'] } >
                                {  
                                    isCollapsed ? <KeyboardTabIcon/> : <KeyboardBackspaceIcon/> 
                                }
                            </Button>
                        </div>
                    </div>
                    <div className={ styles['main-content-container'] } style={{ width: contentColumn }} >
                        <Row className={ styles['padding-left-subcontainers'] }>
                            <Col xs={12} className={`${styles['no-margin']} ${styles['no-padding']}`}>
                                <MainBar key={uuidv4()} section={dataTranslate('section-text').replace('#{}',locationName)}>
                                    <BackButton regionCode={regionCode} countryCode={countryCode} setSectionState={setSectionState}/>
                                </MainBar>
                            </Col>
                        </Row>
                        <Row className={ styles['padding-left-subcontainers'] }>
                            <LeftSideMenuContainer />
                            <Col xs={ 12 }  lg={ mapCol } style={ showMap ? { display: 'block', height: '80vh', position: 'relative' } : { display: 'none' } } className={ `${ styles['no-margin'] } ${ styles['no-padding'] }` }>
                                <Row style={{ position: 'absolute', top: '10px', right: '20px', zIndex: '3', width: '100%', justifyContent: 'flex-end', gap: '5px' }}>
                                    <Row style={{justifyContent: 'flex-end', flexWrap: 'wrap', gap: '5px'}}>
                                        <MapSelect id='element-filter' options={elementsOptions} selected={elementId} setSelected={setSectionState} atrName='elementId'/>
                                        <MapSelect id='year-filter' options={yearsOptions} selected={year} setSelected={setSectionState} atrName='year'/>
                                        <MapSelect id='macro-region-filter' options={macroRegionsOptions} selected={macroRegionCode} setSelected={setSectionState} atrName='macroRegionCode'/>
                                        { macroRegionCode == '10' ? <></> : <MapSelect options={regionsOptions} selected={regionCode} setSelected={setSectionState} atrName='regionCode'/> }
                                    </Row>
                                    <Row style={{justifyContent: 'flex-end', flexWrap: 'wrap'}}>
                                        <Button
                                            className={`${styles['search-country-button']}`}
                                            style={{width: '145px'}}
                                            onClick={() => setShowCountries(true)}
                                        >
                                            Search Country
                                        </Button>
                                    </Row>
                                </Row>
                                <MapView admin={admin} geoJsonURL={`${baseURL}/api/v1/geojson/countries/beans_consumption/ISO3/2546`} adminIdsURL={`${baseURL}/api/v1/data/adminIds/beans_consumption/${admin}/${regionCode}/2546/${year}?id_elements=[${elementId}]`} percentileURL={`${baseURL}/api/v1/percentile/values/undefined/data_production_surface_context/${elementId}/2546/${year}?tradeFlow=undefined`} quintilURL={`${baseURL}/api/v1/percentile/heatmap`} legendTitle={ elementsObj[elementId]?.ELEMENT_EN ?? 'Loading...'} elementUnit={elementsObj[elementId]?.UNIT} />
                            </Col>
                            <Col xs={ 12 } lg={ graphsCol } style={ showGraphs && !showMap ? { display: 'block', height: '80vh', overflow: 'auto', marginLeft: '60px' } : showGraphs ? { display: 'block', height: '80vh', overflow: 'auto' } : { display: 'none' } }>
                                {/* {podiumConfig ? <PodiumSelectionCon podiumsList={podiumConfig} /> : 'Loading...'} */}
                                    <br></br>
                                <PodiumSelectionCon podiumsList={podiumConfig} />
                                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '15px' }} dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(eval(dataTranslate('per-capita-text').replace('#{1}',year.toString()).replace('#{2}',(Math.round(perCapConsup * 100) / 100).toString())))}}/>
                                <br></br>
                                <PorcentagesBox evaluate={true} data_1={{ value: dataPorcentage1.value, text:dataTranslate('porc1-label').replace('#{}',(Math.round(dataComplmnt1* 100) / 100).toString())}}
                                    data_2={{ value: dataPorcentage2.value, text: dataTranslate('porc2-label').replace('#{}', (Math.round(dataComplmnt2 * 100) / 100).toString()) }} />
                                <PorcentagesBox evaluate={true} data_1={{ value: dataPorcentage3.value, text: dataTranslate('porc3-label').replace('#{}', (Math.round(dataComplmnt2 * 100) / 100).toString()) }}
                                    data_2={{ value: dataPorcentage4.value, text: dataTranslate('porc4-label').replace('#{}', (Math.round(dataComplmnt2 * 100) / 100).toString()) }} />
                                <br></br>
                                <ChartFrame data={[]} toggleText={dataTranslate('chart1-toggle')} excludedClasses={[]}>
                                    { xlabels1.length == 0 ? (<div>Loading...</div>) : (<MultiBar1 xLabels={xlabels1} datapoints={datapoints1} databar1={databar11} databar2={databar12} databar3={databar13} databar4={databar14} chartTexts={chartTxts1} />)} 
                                </ChartFrame>
                                <br></br>
                                <APorcentagesBox data={{ value: selfSuff / 100, text: 'Self-sufficiency ratio' }} />
                                <br></br>
                                <ChartFrame data={[]} toggleText={dataTranslate('chart2-toggle')} excludedClasses={[]}>
                                    { xlabels1.length == 0 ? (<div>Loading...</div>) : (<MultiBar2 xLabels={xlabels2} datapoints={datapoints2} databar1={databar21} databar2={databar22} databar3={databar23} chartTexts={chartTxts2} />)} 
                                </ChartFrame>
                                <SourcesComponent sourcesText={dataTranslate('sources-text')} shortName='FAO' year='2022' completeName='FAOSTAT Database' url='http://www.fao.org/faostat/en/#data' />
                            </Col>
                        </Row>
                    </div>
                </div>
            </Container>
            <SearchCountryModal adminIdsUrl={`${baseURL}/api/v1/data/adminIds/beans_consumption/${admin}/${regionCode}/176/${year}?id_elements=[${elementId}]`} show={showCountries} handleClose={setShowCountries} clickId={clickId} setSectionState={setSectionState} setClickId={setClickId} />
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