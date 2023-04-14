import { useState, useEffect, useContext, SetStateAction } from 'react'
import { GetStaticProps, NextPage } from 'next';
import { Button, Col, Container, Row } from 'react-bootstrap';
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
import { LeftSideMenuContainer, MapSelectPrices } from '../../components/ui/map/filters';
import { dataFetcher, generateElementsOptions } from '../../helpers/data';
import useSWR from 'swr';
import { MapContext } from '../../context/map';
import { LeftSideMenuContext } from '../../context/map/leftsidemenu';
import { ElementsData,SelectOptions } from '../../interfaces/data';
import { GeoJsonProperties, Geometry } from 'geojson';
import { SidebarComponent } from '../../components/ui/sidebar';
import { useTour } from '@reactour/tour';
import { general_data_steps, general_data_steps_prices } from '../../helpers/data/tour';
import { getCookie, setCookie } from 'cookies-next';
import { SourcesComponent } from '../../components/ui/sources-component';
import { BackButton } from '../../components/data/back-button';
import { useWindowSize } from '../../hooks';
import KeyboardTabIcon from '@mui/icons-material/KeyboardTab';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';

interface sectionState {
    elementId: number
    locationName: string
}

interface ElementsState {
    elementsObj: Record<string, ElementsData>
    elementsOptions: SelectOptions
}

const mapFilterElements = [300050, 300051, 300052];
const baseURL = 'https://cassavalighthouse.org';

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
let clickId: string | number | null = null;

const DataPage: NextPage = () => {
    const { t: dataTranslate } = useTranslation('data-prices');
    const[priceData, setPriceData] = useState<Feature>();
    const { map } = useContext( MapContext );
    const [ sectionState, setSectionState ] = useState<sectionState>({
        elementId: 300050,
        locationName: 'World'
    });
    const { elementId, locationName } = sectionState;
    const [elementsState, setElements] = useState<ElementsState>({
        elementsObj: {},
        elementsOptions: { values: [], names: []}
    });
    const { elementsObj, elementsOptions } = elementsState;
    const [chartTitle, setChartTitle] = useState<string>('');
    const [idCountry, setIdCountry] = useState(0); 
    const [idGeoPoint, setIdGeoPoint] = useState(0);
    const { setSteps, setIsOpen } = useTour();
    const [mapCol, setMapCol] = useState(0);
    const [graphsCol, setGraphsCol] = useState(0);
    const [showMap, setShowMap] = useState(false);
    const [showGraphs, setShowGraphs] = useState(false);
    const { buttonBoth, buttonGraphs, buttonMap, activeBothButtons, activeMapButton } = useContext( LeftSideMenuContext );
    // const [ mapButtons, setMapButtons] = useState([buttonBoth, buttonGraphs, buttonMap]);
    const { data: elementsData, isLoading: isLoadingElements } = useSWR<ElementsData[]>(`${baseURL}/api/v1/data/elements/6`, dataFetcher);
    
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
                        locationName: tempLocationName
                    }));
                    console.log(e.features![0].properties?.label);
                    clickId = e.features![0].id ?? null;
                    activeBothButtons();
                });
            });
        }
    }, [map]);

    const getPriceData = (elementId: SetStateAction<number>) => {
        axios.get(`https://cassavalighthouse.org/api/v1/geojson/admin2/prices/Nals/${elementId}`)
            .then(res=>{setPriceData( res.data.data.geo_points)})
    }
    
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

    //console.log(elementsData);
    useEffect(() => {
        if (elementsObj[elementId]) {
            const elementName = elementsObj[elementId].ELEMENT_EN;
            setChartTitle(`Year ${elementName}`);
        }
    }, [elementId, elementsObj]);
    
    useEffect(()=>{
        getPriceData(elementId);
    },[elementId])

    // Executes the tour for production. This useEffect runs only once
    useEffect(() => {
        if ( !getCookie('prices_tour') ) {
            if (setSteps) {
                setSteps(general_data_steps_prices);
                setCookie('prices_tour', true);
                setIsOpen(true);
            }
        }
    }, []);
    return (
        <Layout title={ dataTranslate('Prices') }>
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
                                <MainBar key={ uuidv4() } section={`National Price - ${locationName}`}  >
                                    <BackButton regionCode={'asd'} countryCode={'asdasd'} setSectionState={setSectionState}/>
                                </MainBar>
                            </Col>
                        </Row>
                        <Row className={ styles['padding-left-subcontainers'] }>
                            <LeftSideMenuContainer/>
                            <Col xs={ 12 } lg={ mapCol } style={ showMap ? { display: 'block', height: '80vh', position: 'relative'  } : { display: 'none' } } className={ `${ styles['no-margin'] } ${ styles['no-padding'] }` }>
                                <Row style={{ position: 'absolute', top: '10px', right: '20px', zIndex: '3', width: '100%', justifyContent: 'flex-end', gap: '5px' }}>
                                    <Row style={{justifyContent: 'flex-end', flexWrap: 'wrap', gap: '5px', marginRight: '10px'}}>
                                        <MapSelectPrices id='element-filter'  options={elementsOptions} selected={elementId} setSelected={setSectionState} atrName='elementId'/>
                                    </Row>
                                </Row>
                                <MapViewPrices id='map-info' setIdGeoPoint={setIdGeoPoint} setIdCountry={setIdCountry} markers={priceData ? {priceDataGeopoint: priceData} as marker : {} as marker} ></MapViewPrices>
                            </Col>
                            <Col xs={ 12 } xl={ graphsCol } style={ !showMap ? { display: 'block', height: '80vh', overflow: 'auto', marginLeft: '60px' } : showGraphs ? { display: 'block', height: '80vh', overflow: 'auto', marginTop: '10px' } : { display: 'none' } }>                                
                                <PlotlyChartBox dataURL={`https://cassavalighthouse.org/api/v1/charts/prices/national/boxplot/${elementId}?id_country=${idCountry}&id_geo_point=${idGeoPoint}`} title={chartTitle} description='Boxplot de precios '/>
                                <PlotlyChartLine dataURL={`https://cassavalighthouse.org/api/v1/charts/prices/national/line/${elementId}?id_country=${idCountry}&id_geo_point=${idGeoPoint}`} title={chartTitle} description='Grafico de precios'/>
                                <SourcesComponent sourcesText={''} shortName='FAO' year='2022' completeName='FAOSTAT Database' url='http://www.fao.org/faostat/en/#data' />
                            </Col>
                        </Row>
                    </div>
                </div>                
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

export default DataPage