import { useState, useEffect, useContext } from 'react'
import { GetStaticProps, NextPage } from 'next';
import { Button, Col, Container, Row } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import 'bootstrap/dist/css/bootstrap.min.css';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { Layout } from '../../components/layouts'
import { MainBar, MapView, SidebarComponent } from '../../components/ui';
import useSWR from 'swr';
import { v4 as uuidv4 } from 'uuid';
import styles from './data.module.css';
import { MapContext } from '../../context/map';
import { LeftSideMenuContext } from '../../context/map/leftsidemenu';
import { LeftSideMenuContainer, MapSelect } from '../../components/ui/map/filters';
import { ElementsData, ElementsState, MacroRegionsData, MacroRegionsState, RegionsData, RegionsState, YearsData, YearsState } from '../../interfaces/data';
import { dataFetcher, generateElementsOptions, generateOptionsFromObj, generateRegionOptions, generateYearsOptions } from '../../helpers/data';
import { BackButton } from '../../components/data/back-button';
import { useTour } from '@reactour/tour';
import { general_data_steps, general_data_steps_prices, general_data_steps_prices_es, general_data_steps_prices_pt } from '../../helpers/data/tour';
import { getCookie, setCookie } from 'cookies-next';
import { SourcesComponent } from '../../components/ui/sources-component';
import { PlotlyChartLineInternational } from '../../components/data/plotly-chart/PlotlyChartLineInternational';
import { PlotlyChartBoxInternational } from '../../components/data/plotly-chart/PlotlyChartBoxInternational';
import { MapViewPricesInt } from '../../components/ui/map/MapViewPricesInt';
import { useWindowSize } from '../../hooks';
import KeyboardTabIcon from '@mui/icons-material/KeyboardTab';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import { useRouter } from 'next/router';


//let clickId: string | number | null = null;

interface sectionState {
    elementId: number
    locationName: string
}

interface OtherTexts {
    section_name: string
    section_text: string
    chart1_info: string
    sources_text: string
    search_country: string
    element_locale: string
}

const ProductionPage: NextPage = () => {
    const { t: dataTranslate } = useTranslation('data-prices');
    const { locale } = useRouter();
    const [ sectionState, setSectionState ] = useState<sectionState>({
        elementId: 300050,
        locationName: 'WORLD'
    });
    const { elementId, locationName } = sectionState;
    const [elementsState, setElements] = useState<ElementsState>({
        elementsObj: {},
        elementsOptions: { values: [], names: []}
    });
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
    const [id_country, setIdCountry] = useState(0)
    
    
    useEffect(() => {
        if( buttonBoth ) {
            setMapCol(5)
            setGraphsCol(7)
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
                    const tempLocationName =  e.features![0].properties!.country_name;
                    setSectionState( (prevState) => ({
                        ...prevState,
                        locationName: tempLocationName
                    }));
                    console.log(e);
                    //setClickId(e.features![0].id ?? null);
                });
            });
        }
    }, [map]);
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

    useEffect(() => {

        const chartTitle = dataTranslate('chart2-title')
        const chartTitleLine = dataTranslate('chart3-title')
        setChartTitle(chartTitle)
        setChartTitleLine(chartTitleLine)
        setOtherTexts({section_name: dataTranslate('section-int-name'), section_text: dataTranslate('section-int-text').replace('#{}',locationName), chart1_info: dataTranslate('chart1-info'), sources_text: dataTranslate('sources-text'), search_country: dataTranslate('search-country'), element_locale: dataTranslate('LOCALE_FILTER_ELEMENT')});
        
    }, [dataTranslate, locationName]);


    // Executes the tour for production. This useEffect runs only once
    useEffect(() => {
        if ( !getCookie('prices_tour') ) {
            if (setSteps) {
                if( locale == 'en' ) setSteps(general_data_steps_prices);
                else if ( locale == 'es' ) setSteps(general_data_steps_prices_es);
                else if ( locale == 'pt' ) setSteps(general_data_steps_prices_pt);
                setCookie('production_tour', true);
                setIsOpen(true);
            }
        }
    }, []);

    return (
        <Layout title={ otherTexts ? otherTexts.section_name : 'Loading...'}>
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
                                <MainBar key={ uuidv4() } section={` ${locationName}`}  >
                                    <BackButton regionCode={'asd'} countryCode={'asdasd'} setSectionState={setSectionState}/>
                                </MainBar>
                            </Col>
                        </Row>
                        <Row className={ styles['padding-left-subcontainers'] }>
                            <LeftSideMenuContainer/>
                            <Col xs={ 12 } lg={ mapCol } style={ showMap ? { display: 'block', height: '80vh', position: 'relative' } : { display: 'none' } } className={ `${ styles['no-margin'] } ${ styles['no-padding'] }` }>
                                
                                <MapViewPricesInt setIdCountry={setIdCountry}/>
                            </Col>
                            <Col xs={ 12 } xl={ graphsCol } style={ !showMap ? { display: 'block', height: '80vh', overflow: 'auto', paddingLeft: '60px', padding: '10px' } : showGraphs ? { display: 'block', height: '80vh', overflow: 'auto', marginTop: '10px', padding: '10px' } : { display: 'none' } }  className={ `${ styles['no-margin'] } ` } >
                                        <MainBar key={ uuidv4() } section={otherTexts ? otherTexts.section_text : 'Loading...'}  ></MainBar>
                                        <PlotlyChartBoxInternational  dataURL={`https://riceobservatory.org/api/v1/charts/comercico/precios/internacionales${id_country==0?'':'?id_country='+id_country}`} title={chartTitle} description='Grafico de precios' /> 
                                        <PlotlyChartLineInternational  dataURL={`https://riceobservatory.org/api/v1/charts/comercico/precios/internacionales/grafico/lineas${id_country==0?'':'?id_country='+id_country}`} title={chartTitleLine} description='Grafico de precios'/>
                                    <SourcesComponent sourcesText={otherTexts ? otherTexts.sources_text : 'Loading...'} shortName='FAO' year='2022' completeName='FAOSTAT Database' url='http://www.fao.org/faostat/en/#data' />
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

export default ProductionPage;