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
import { SelectOptions, CitiesData } from '../../interfaces/data';
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
import data from '../api/international-prices';


//let clickId: string | number | null = null;

interface sectionState {
    idCountry: number
    locationName: string

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
    sources_text: string
    search_country: string
    element_locale: string
}
let clickId: string | number | null = null;

const ProductionPage: NextPage = () => {
    const { t: dataTranslate } = useTranslation('data-prices');
    const { locale } = useRouter();
    const[priceData, setPriceData] = useState<Feature>();
    const [ sectionState, setSectionState ] = useState<sectionState>({
        idCountry: 0,
        locationName: 'World'
    });
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
                    const temCountryCode =e.features![0].properties?.id_country;
                    const tempLocationNameI = e.features![0].properties?.[dataTranslate('LOCALE_COUNTRY_NAME')]
                    setSectionState( (prevState) => ({
                        ...prevState,
                        idCountry: temCountryCode,
                        locationName: tempLocationNameI,
                    }));
                    console.log(dataTranslate('LOCALE_COUNTRY_NAME'))
                    setClickId(e.features![0].id ?? null);
                });
            });
        }
    }, [map,  dataTranslate, locationName]);

//Filter for district elements
    const fetchJson = () => {
        fetch('/api/international-prices')
        .then(response => {
          return response.json();
        }).then(priceData => {
            setPriceData(priceData);
            console.log(priceData.features);
            let countries = priceData.features
            let cityName = (countries.map((c: { properties: { id_country: number; country_name: string; spanish_name: string;  } }) => {return {id_country: c.properties.id_country, country_name: c.properties.country_name, spanish_name: c.properties.spanish_name}}))
            let cityValue = (countries.map((c: { properties: { id_country: any; }; }) => c.properties.id_country))
            const cityObj: Record<string, CitiesData> = {};
            setCityData(cityName)
            setCityName({
                citiesObj: cityObj,
                citiesOptions: generateCitiesOptionsInt(cityName, 'country_name')
            })
            console.log(cityObj)
        }).catch((e: Error) => {
          console.log(e.message);
        });
      }
      useEffect(() => {
        fetchJson()
      },[])
 
    // const getPriceData = (locationName: SetStateAction<string>) =>{
    //     setPriceData( data.country_name)
    // }

    // useEffect(()=>{
    //     getPriceData(locationName, );
    // },[locationName])

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

        const chartTitle = dataTranslate('chart2-title').replace('#{}',locationName)
        const chartTitleLine = dataTranslate('chart3-title').replace('#{}',locationName)
        setChartTitle(chartTitle)
        setChartTitleLine(chartTitleLine)
        setOtherTexts({section_name: dataTranslate('section-int-name'), section_text: dataTranslate('section-int-text').replace('#{}',locationName), chart1_info: dataTranslate('chart1-info'), sources_text: dataTranslate('sources-text'), search_country: dataTranslate('search-country'), element_locale: dataTranslate('LOCALE_FILTER_ELEMENT')});
        
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
                                    <MainBar key={ uuidv4() } section={otherTexts ? otherTexts.section_text : 'Loading...'} >
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
                                                    <MapViewPricesInt setCountryName={setCountryName} setIdCountry={setIdCountry}/>
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
                                                            <PlotlyChartBoxInternational  dataURL={`https://riceobservatory.org/api/v1/charts/comercico/precios/internacionales${idCountry==0?'':'?id_country='+idCountry}`} title={chartTitle} description='Grafico de precios' /> 
                                                            <PlotlyChartLineInternational  dataURL={`https://riceobservatory.org/api/v1/charts/comercico/precios/internacionales/grafico/lineas${idCountry==0?'':'?id_country='+idCountry}`} title={chartTitleLine} description='Grafico de precios'/>
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