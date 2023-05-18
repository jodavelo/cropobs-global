import { useState, useEffect, useContext, SetStateAction } from 'react'
import { GetStaticProps, NextPage } from 'next';
import { Button, Col, Container, Row,  Tab, Tabs } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import 'bootstrap/dist/css/bootstrap.min.css';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { Layout } from '../../components/layouts'
import { MainBar, MapViewPrices } from '../../components/ui';
import { v4 as uuidv4 } from 'uuid';
import styles from './data.module.css';
import {PlotlyChartBox } from '../../components/data';
import { PlotlyChartLine } from '../../components/data';
import axios from 'axios';
import { LeftSideMenuContainer, MapSelectPrices, MapSelectCity, MapSelect } from '../../components/ui/map/filters';
import { dataFetcher, generateElementsOptions, generateCitiesOptions } from '../../helpers/data';
import useSWR from 'swr';
import { useRouter } from 'next/router';
import { MapContext } from '../../context/map';
import { LeftSideMenuContext } from '../../context/map/leftsidemenu';
import { ElementsData,SelectOptions, CitiesData } from '../../interfaces/data';
import { GeoJsonProperties, Geometry } from 'geojson';
import { SidebarComponent } from '../../components/ui/sidebar';
import { useTour } from '@reactour/tour';
import { general_data_steps_prices,  general_data_steps_prices_es, general_data_steps_prices_pt} from '../../helpers/data/tour';
import { getCookie, setCookie } from 'cookies-next';
import { SourcesComponent } from '../../components/ui/sources-component';
import { BackButtonPrices } from '../../components/data/back-button';
import { useWindowSize } from '../../hooks';
import KeyboardTabIcon from '@mui/icons-material/KeyboardTab';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import { LocalSeeRounded } from '@mui/icons-material';

interface sectionState {
    elementId: number
    locationName: string

}

interface ElementsState {
    elementsObj: Record<string, ElementsData>
    elementsOptions: SelectOptions
}

interface CitiesState {
    citiesObj: Record<string, CitiesData>
    citiesOptions: SelectOptions
}

interface Feature {
    type: FeatureType;
    properties: Properties;
    geometry: Geometry;
}
interface Properties {
    id_geo_point: number;
    id_country: number;
    id_geo_admin2: number;
    label: string;
}
enum FeatureType {
    Feature = "Feature",
}
interface marker {
    priceDataGeopoint: Feature
}

interface OtherTexts {
    section_name: string
    section_text: string
    chart1_info: string
    chart2_info: string
    sources_text: string
    search_country: string
    element_locale: string
}
const mapFilterElements = [300050, 300051, 300052];
const baseURL = 'https://cropobs-central.ciat.cgiar.org';
let clickId: string | number | null = null;

const PricesPage: NextPage = () => {
    const { t: dataTranslate } = useTranslation('data-prices');
    const[priceData, setPriceData] = useState<Feature>();
    const { locale } = useRouter();
    const { map } = useContext( MapContext );
    const [ sectionState, setSectionState ] = useState<sectionState>({
        elementId: 300050,
        locationName: 'World',
    });
    const { elementId, locationName  } = sectionState;
    const [elementsState, setElements] = useState<ElementsState>({
        elementsObj: {},
        elementsOptions: { values: [], names: []}
    });
    const { elementsObj, elementsOptions } = elementsState;
    const [citiesName, setCityName] = useState<CitiesState>({
        citiesObj: {},
        citiesOptions: { values: [], names: []}
    });
    const { citiesObj, citiesOptions } = citiesName;
    const [chartTitle, setChartTitle] = useState<string>('');
    const [otherTexts, setOtherTexts] = useState<OtherTexts | undefined>(undefined);
    const [chartTitleLine, setChartTitleLine] = useState<string>('');
    const [cityData, setCityData] = useState([]); 
    const [idCountry, setIdCountry] = useState(0); 
    const [idGeoPoint, setIdGeoPoint] = useState(0);
    const { setSteps, setIsOpen } = useTour();
    const [mapCol, setMapCol] = useState(0);
    const [graphsCol, setGraphsCol] = useState(0);
    const [showMap, setShowMap] = useState(false);
    const [showGraphs, setShowGraphs] = useState(false);
    const { buttonBoth, buttonGraphs, buttonMap, activeBothButtons, activeMapButton } = useContext( LeftSideMenuContext );
    const { data: elementsData, isLoading: isLoadingElements } = useSWR<ElementsData[]>(`${baseURL}/api/v1/data/elements/6`, dataFetcher);

    //console.log(citiesData);
    
    useEffect(() => {
        activeMapButton();
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
            if (map) map.resize();
        }
        if( buttonMap ) {
            if (map) map.resize();
        }
    });


    useEffect(() => {
        if (map){
            map.on('load', () => {
                map.on('click', 'unclustered-point', (e) => {
                    const tempLocationName = e.features![0].properties?.label;
                    setSectionState( (prevState) => ({
                        ...prevState,
                        locationName: tempLocationName,
                    }));
                    console.log(e.features![0].properties?.label);
                    console.log(e.features![0].properties?.id_country);
                    console.log(e.features![0].properties?.id_geo_point)

                    clickId = e.features![0].id ?? null;
                    activeBothButtons();
                });
            });
        }
    }, [map]);

    const getPriceData = (elementId: SetStateAction<number> ) => {
        axios.get(`https://cropobs-central.ciat.cgiar.org/api/v1/geojson/admin2/125/prices/${elementId}`)
            .then(res=>{
                setPriceData( res.data.data.geo_points)
                let countries = res.data.data.geo_points.features;
                let cityName = (countries.map((c: { properties: { label: string; id_geo_point: number; id_country: number; id_geo_admin2: number;  } }) => {return {label: c.properties.label, id_geo_point: c.properties.id_geo_point, id_country: c.properties.id_country, id_geo_admin2: c.properties.id_geo_admin2}}))
                let cityValue = (countries.map((c: { properties: { id_geo_point: any; }; }) => c.properties.id_geo_point))
                const cityObj: Record<string, CitiesData> = {};
                setCityData(cityName)
                setCityName({
                    citiesObj: cityObj,
                    citiesOptions: generateCitiesOptions(cityName, 'label')
                })
            })
    }
    
    useEffect(() => {
        if (elementsData && !isLoadingElements) {
            const elemsObj: Record<string, ElementsData> = {};
            elementsData.map( (value, index) => (elemsObj[value.ID_ELEMENT] = value));
            setElements({
                elementsObj: elemsObj,
                elementsOptions: generateElementsOptions(elementsData,  dataTranslate('LOCALE_NAME'), mapFilterElements)
            });
        }
    }, [isLoadingElements, dataTranslate]);


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
        if( width! < 992 ) {
            setSideBarColumn( '0%' );
            setContentColumn( '100%' );
        }
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
                setSideBarColumn( '8%' );
                setContentColumn( '92%' );
            }
        }
        else if (width! > 1200 && width! < 1400){
            if ( !isCollapsed ) {
                setSideBarColumn( '15%' );
                setContentColumn( '85%' );
            }else {
                setSideBarColumn( '7%' );
                setContentColumn( '93%' );
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
    

    //console.log(elementsData);
    
    useEffect(()=>{
        getPriceData(elementId, );
    },[elementId])

    // Executes the tour for production. This useEffect runs only once
    setTimeout(() => {
        if ( !getCookie('prices_tour') ) {
            if (setSteps) {
                if( locale == 'en' ) setSteps(general_data_steps_prices);
                else if ( locale == 'es' ) setSteps(general_data_steps_prices_es);
                else if ( locale == 'pt' ) setSteps(general_data_steps_prices_pt);
                /*setCookie('prices_tour', true);*/
                setCookie('prices_tour', true);
                setIsOpen(true);
            }
        }
    }, 4000, []);



// --------------------------------------------------------------------------------------------------------------
// Local variables for translation
// --------------------------------------------------------------------------------------------------------------

    const[chartTitleYear, setChartTitleYear] = useState('')
    const[chartTitleMonth, setChartTitleMonth] = useState('')
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

    
    useEffect(() => {
        if(elementId == 300050){
            setChartTitleYear(dataTranslate('chart-title-whole-yearly')!);
            setChartTitleMonth(dataTranslate('chart-title-whole-monthly')!);
        }
        if(elementId == 300051){
            setChartTitleYear(dataTranslate('chart-title-consumer-yearly')!);
            setChartTitleMonth(dataTranslate('chart-title-consumer-monthly')!);
        }
        if(elementId == 300052){
            setChartTitleYear(dataTranslate('chart-title-producer-yearly')!);
            setChartTitleMonth(dataTranslate('chart-title-producer-monthly')!);
        }
    }, [elementId, dataTranslate])

    useEffect(() => {
        if (elementsObj[elementId]) {
            let variableByLocale = ''
            if( locale == 'en' ) variableByLocale = 'ELEMENT_EN';
            if( locale == 'es' ) variableByLocale = 'ELEMENT_ES';
            if( locale == 'pt' ) variableByLocale = 'ELEMENT_PT';
            // const elementName = eval(`elementsObj[elementId].${variableByLocale}`);
        //     if(locale == 'en') {
        //         setChartTitle( `${dataTranslate('chart1-title')} ${elementName} - ${locationName}`);
        //     } else if( locale == 'es') {
        //         setChartTitle( `${elementName} ${dataTranslate('chart1-title')} - ${locationName}`);
        //     }else if (locale == 'pt') {
        //         setChartTitle( `${elementName} ${dataTranslate('chart1-title')} - ${locationName}`);
        // }
        }
    }, [elementId, elementsObj, locationName]);

    // useEffect(() => {
    //     if (elementsObj[elementId]) {
    //         let variableByLocale = ''
    //         if( locale == 'en' ) variableByLocale = 'ELEMENT_EN';
    //         if( locale == 'es' ) variableByLocale = 'ELEMENT_ES';
    //         if( locale == 'pt' ) variableByLocale = 'ELEMENT_PT';
    //         const elementName =  eval(`elementsObj[elementId].${variableByLocale}`);
    //         if(( locale == 'en' )){
    //             setChartTitleLine( ` ${dataTranslate('chart1-title2')} ${elementName}- ${locationName} `);
    //         } else if ( locale == 'es' ){
    //             setChartTitleLine( `${elementName} ${dataTranslate('chart1-title2')}- ${locationName} `);
    //         } else if(locale == 'pt'){
    //             setChartTitleLine( `${elementName} ${dataTranslate('chart1-title2')}- ${locationName} `);
    //         }
           
    //     }
    // }, [elementId, elementsObj]);

    useEffect(() => {
        
        setOtherTexts({section_name: dataTranslate('section-name'), section_text: dataTranslate('section-text').replace('#{}',locationName), chart1_info: dataTranslate('chart1-info'), chart2_info: dataTranslate('chart2-info'), sources_text: dataTranslate('sources-text'), search_country: dataTranslate('search-country'), element_locale: dataTranslate('LOCALE_FILTER_ELEMENT')});
        
    }, [dataTranslate, locationName]);
    
    return (
        <Layout title={ otherTexts ? otherTexts.section_name : 'Loading...' }>
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
                            <Col xs={ 12 } className={ `${ styles['no-margin'] } ${ styles['no-padding'] }` }>
                                <MainBar key={ uuidv4() } section={otherTexts ? otherTexts.section_text : 'Loading...'}  >
                                    <BackButtonPrices   locationName={locationName} setSectionState={setSectionState}/>
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
                                                <Col xs={ 12 } lg={ mapCol } style={ showMap ? { display: 'block', height: '80vh', position: 'relative'  } : { display: 'none' } } className={ `${ styles['no-margin'] } ${ styles['no-padding'] }` }>
                                                    <Row style={{ position: 'absolute', top: '10px', right: '20px', zIndex: '3', width: '100%', justifyContent: 'flex-end', gap: '5px' }}>
                                                        <Row style={{justifyContent: 'flex-end', flexWrap: 'wrap', gap: '5px', marginRight: '10px'}}>
                                                            <MapSelectPrices id='element-filter'  options={elementsOptions} selected={elementId} setSelected={setSectionState} atrName='elementId'/>
                                                        </Row>
                                                    </Row>
                                                    <MapViewPrices id='map-info' setIdGeoPoint={setIdGeoPoint} setIdCountry={setIdCountry} markers={priceData ? {priceDataGeopoint: priceData} as marker : {} as marker} ></MapViewPrices>
                                                </Col>
                                                <Col xs={ 12 } xl={ graphsCol } style={ !showMap ? { display: 'block', height: '80vh', overflow: 'auto', paddingLeft: '60px' } : showGraphs ? { display: 'block', height: '80vh', overflow: 'auto', marginTop: '10px' } : { display: 'none' } }> 
                                                    {
                                                        buttonGraphs ?
                                                        <Row style={{ zIndex: '3', width: '100%', justifyContent: 'flex-end', gap: '5px', marginTop: '20px', marginBottom: '20px'}}>
                                                            <Row style={{justifyContent: 'center', flexWrap: 'wrap', gap: '5px'}}>
                                                                <MapSelect id='element-filter-price'  options={elementsOptions} selected={elementId} setSelected={setSectionState} atrName='elementId'  locale={ locale ?? 'en'}/> 
                                                                <MapSelectCity id='city-filter'  options={citiesOptions} selected={idGeoPoint}   setSelected={setSectionState} dataCity={cityData} setIdCountry={setIdCountry} setIdGeoPoint={setIdGeoPoint} atrName='selectCity'/> 

                                                                {/* <MapSelectPrices id='element-filter'  options={locationName} selected={locationName} setSelected={setSectionState} atrName='locationName'/>  */}
                                                            </Row>
                                                        </Row>
                                                        :
                                                            <></>
                                                    }                         
                                                    <PlotlyChartBox dataURL={`https://cropobs-central.ciat.cgiar.org/api/v1/chart/prices/national/boxplot/125/${elementId}?id_country=${idCountry}&id_geo_point=${idGeoPoint}`} title={`${chartTitleYear} - ${locationName}`} description={otherTexts ? otherTexts.chart1_info : 'Loading...'}/>
                                                    <PlotlyChartLine dataURL={`https://cropobs-central.ciat.cgiar.org/api/v1/chart/prices/national/line/125/${elementId}?id_country=${idCountry}&id_geo_point=${idGeoPoint}`} title={`${chartTitleMonth} - ${locationName}`} description={otherTexts ? otherTexts.chart2_info : 'Loading...'}/>  
                                                    <SourcesComponent sourcesText={otherTexts ? otherTexts.sources_text : 'Loading...'} shortName='FAO' year='2022' completeName='FAOSTAT Database' url='http://www.fao.org/faostat/en/#data' />
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
        </Layout>
    )
}

export const getStaticProps: GetStaticProps = async ({ locale }) => {
    return {
        props: {
            ...( await serverSideTranslations( locale!, ['data-prices'] ) ),
        }
    }
}

export default PricesPage