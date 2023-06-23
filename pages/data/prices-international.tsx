import { useState, useEffect, useContext, SetStateAction } from 'react'
import { GetStaticProps, NextPage } from 'next';
import { Button, Col, Container, Row,  Tab, Tabs } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import 'bootstrap/dist/css/bootstrap.min.css';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { Layout } from '../../components/layouts'
import { MainBar } from '../../components/ui';
import { useRouter } from 'next/router';
import { v4 as uuidv4 } from 'uuid';
import styles from './data.module.css';
import { MapContext } from '../../context/map';
import { LeftSideMenuContext } from '../../context/map/leftsidemenu';
import { LeftSideMenuContainer, MapSelect, MapSelectCityInt } from '../../components/ui/map/filters';
import { SelectOptions, CitiesData, CitiesDataInt } from '../../interfaces/data';
import { dataFetcher, generateElementsOptions, generateCitiesOptionsInt } from '../../helpers/data';
import { BackButtonPricesInt } from '../../components/data/back-button';
import { useTour } from '@reactour/tour';
import { general_data_steps_prices_int,  general_data_steps_prices_int_es, general_data_steps_prices_int_pt} from '../../helpers/data/tour';
import { getCookie, setCookie } from 'cookies-next';
import { GeoJsonProperties, Geometry } from 'geojson';
import { SourcesComponent } from '../../components/ui/sources-component';
import { PlotlyChartLineInternational } from '../../components/data/plotly-chart/PlotlyChartLineInternational';
import { PlotlyChartBoxInternational } from '../../components/data/plotly-chart/PlotlyChartBoxInternational';
import { MapViewPricesInt } from '../../components/ui/map/MapViewPricesInt';
import { useWindowSize } from '../../hooks';
import KeyboardTabIcon from '@mui/icons-material/KeyboardTab';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import { SidebarComponent } from '../../components/ui/sidebar';
import axios from 'axios';


//let clickId: string | number | null = null;
interface locationNameOptions {
    en: string;
    es: string;
    pt: string;
    isoLabel: string;
    clickId: number | null | string;
}
interface sectionState {
    idCountry: string
    locationName: string
}
interface CitiesState {
    citiesObj: Record<string, CitiesDataInt>
    citiesOptions: SelectOptions
}

interface Feature {
    type: FeatureType;
    properties: Properties;
    geometry: Geometry;
}
interface Properties {
    id_country: number;
    country_name: string;
    spanish_name: string;
    latitude: number;
    longitude: number;
}
enum FeatureType {
    Feature = "Feature",
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
let clickId: string | number | null = null;
const baseURL = 'https://cropobs-central.ciat.cgiar.org';

const ProductionPage: NextPage = () => {
    const { t: dataTranslate } = useTranslation('data-prices');
    const { locale } = useRouter();
    const[priceData, setPriceData] = useState<Feature>();
    const [countryProperty, setCountryProperty] = useState<{ [name: string]: any } | undefined>();
    const [ sectionState, setSectionState ] = useState<sectionState>({
        idCountry: '',
        locationName: 'World',
    });
    const [locationNameOptions, setLocationNameOptions] = useState<locationNameOptions>({
        en: 'World',
        es: 'Mundo',
        pt: 'Mundo',
        isoLabel: 'WLRD',
        clickId: 0
    });
    const [locationName2, setLocationName2] = useState('');
    const [countryCode2, setCountryCode2] = useState('WLRD');
    const {idCountry, locationName } = sectionState;
    const [citiesName, setCityName] = useState<CitiesState>({
        citiesObj: {},
        citiesOptions: { values: [], names: []}
    });
    const { citiesObj, citiesOptions } = citiesName;
    const [cityData, setCityData] = useState([]);
    const { buttonBoth, buttonGraphs, buttonMap } = useContext( LeftSideMenuContext );
    const { map } = useContext( MapContext );
    const [chartTitle, setChartTitle] = useState<string>('');
    const [chartTitleLine, setChartTitleLine] = useState<string>('');
    const [otherTexts, setOtherTexts] = useState<OtherTexts | undefined>(undefined);
    const [mapCol, setMapCol] = useState(0);
    const [graphsCol, setGraphsCol] = useState(0);
    const [showMap, setShowMap] = useState(false);
    const [showGraphs, setShowGraphs] = useState(false);
    const { setSteps, setIsOpen } = useTour();
    const [id_country, setIdCountry] = useState(0); 
    const [countryName, setCountryName] = useState('')
    const [clickIdd, setClickId] = useState<string | number | null>(null);
    const [isMapView, setIsMapView] = useState(false);


    
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
                            const iso = properties!.id_country
                            setSectionState( (prevState) => ({
                                ...prevState,
                                idCountry: iso,
                                locationName: properties![dataTranslate('LOCALE_COUNTRY_NAME')]
                            }));
                            setCountryCode2(iso);
                            console.log(properties!.id_country)
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
        console.log(locationNameOptions)
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
        //else setClickId( null );
        console.log(clickId)
        console.log({ map })
    }, [locale]);

    // useEffect(() => {
    //     if (map){
    //         map.on('load', () => {
    //             map.on('click', 'country_layer', (e) => {
    //                 let temCountryCode = e.features![0].properties?.id_country;
    //                 let tempLocationNameI = e.features![0].properties![dataTranslate('LOCALE_COUNTRY_NAME')]
    //                 setSectionState( (prevState) => ({
    //                     ...prevState,
    //                     idCountry: temCountryCode,
    //                     locationName: tempLocationNameI,
    //                 }));
    //                 setClickId(e.features![0].id ?? null);
    //             });
    //         });
    //     }
    // }, [dataTranslate, locationName, map]);
    
//Filter for district elements

    const getPriceData = () => {
        axios.get(`${baseURL}/api/v1/data/adminIdsInter/region/CAM/4`)
            .then(res=>{
                setPriceData( res.data.data)
                console.log(res.data.features)
                let countries = res.data.data.features;
                let cityName = (countries.map((c: { properties: { country_name: string; country_name_es: string; country_name_pt: string; iso3: string} }) => {return {country_name: c.properties.country_name, country_name_es: c.properties.country_name_es, country_name_pt: c.properties.country_name_pt, iso3: c.properties.iso3 }}))
                let cityValue = (countries.map((c: { properties: { point: any; }; }) => c.properties.point))
                const cityObj: Record<string, CitiesDataInt> = {};
                setCityData(cityName)
                setCityName({
                    citiesObj: cityObj,
                    citiesOptions: generateCitiesOptionsInt(cityName, 'country_name')
                })
            })
    }
    useEffect(() => {
            getPriceData()
    },[]) 

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

    const [locationText, setLocationText] = useState('');
    const [titleSection, setTitleSection] = useState('');
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
        setTitleSection(dataTranslate('section-int-name')!);
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
        setLocationText(locationName);

    }, [dataTranslate, locationName])
    useEffect(() => {

        const chartTitle = dataTranslate('chart2-title').replace('#{}',locationName)
        const chartTitleLine = dataTranslate('chart3-title').replace('#{}',locationName)
        setChartTitle(chartTitle)
        setChartTitleLine(chartTitleLine)
        setOtherTexts({section_name: dataTranslate('section-int-name'), section_text: dataTranslate('section-int-text').replace('#{}',locationName), chart1_info: dataTranslate('chart-int-info'), chart2_info: dataTranslate('chart-int-info2'), sources_text: dataTranslate('sources-text'), search_country: dataTranslate('search-country'), element_locale: dataTranslate('LOCALE_FILTER_ELEMENT')});
        
    }, [dataTranslate, locationName]);


    // Executes the tour for production. This useEffect runs only once
    setTimeout(() => {
        if ( !getCookie('prices_tour') ) {
            if (setSteps) {
                if( locale == 'en' ) setSteps(general_data_steps_prices_int);
                else if ( locale == 'es' ) setSteps(general_data_steps_prices_int_es);
                else if ( locale == 'pt' ) setSteps(general_data_steps_prices_int_pt);
                setCookie('prices_tour', true);
    /*useEffect(() => {
        if ( !getCookie('prices_tour') ) {
            if (setSteps) {
                if( locale == 'en' ) setSteps(general_data_steps_prices);
                else if ( locale == 'es' ) setSteps(general_data_steps_prices_es);
                else if ( locale == 'pt' ) setSteps(general_data_steps_prices_pt);
                setCookie('production_tour', true);
            }
        }
    }*/
                setIsOpen(true);
            }
        }
    }, 4000, []);

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
                                    <MainBar key={ uuidv4() } section={` ${ titleSection } - ${locationName}`} >
                                        <BackButtonPricesInt  idCountry={idCountry} locationName={locationName} setSectionState={setSectionState}/>
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
                                                    <MapViewPricesInt  geoJsonURL={`${baseURL}/api/v1/data/adminIdsInter/region/CAM/4`} setCountryName={setCountryName} setIdCountry={setIdCountry}/>
                                                </Col>
                                                <Col xs={ 12 } lg={ graphsCol } style={ showGraphs && !showMap ? { display: 'block', height: '80vh', overflow: 'auto', paddingLeft: '60px' } : showGraphs ? { display: 'block', height: '80vh', overflow: 'auto' } : { display: 'none' } }>
                                                    {
                                                        buttonGraphs ?
                                                        <Row style={{ zIndex: '3', width: '100%', justifyContent: 'flex-end', gap: '5px', marginTop: '20px', marginBottom: '20px'}}>
                                                            <Row style={{justifyContent: 'center', flexWrap: 'wrap', gap: '5px'}}>
                                                                <MapSelectCityInt id='city-filter'  options={citiesOptions} selected={idCountry} setSelected={setSectionState} dataCity={cityData}  atrName='selectCity'/> 
                                                            </Row>
                                                        </Row>
                                                        :
                                                            <></>
                                                        }
                                                            <PlotlyChartBoxInternational  dataURL={`https://cropobs-central.ciat.cgiar.org/api/v1/chart/prices/comercico/precios/internacionales/4`} title={chartTitle} description={otherTexts ? otherTexts.chart1_info : 'Loading...'} /> 
                                                            <PlotlyChartLineInternational dataURL={`https://cropobs-central.ciat.cgiar.org/api/v1/chart/prices/comercico/precios/internacionales/grafico/lineas/4`} title={chartTitleLine} description={otherTexts ? otherTexts.chart2_info : 'Loading...'}/>
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

export default ProductionPage;