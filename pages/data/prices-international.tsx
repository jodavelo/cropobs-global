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
import { general_data_steps, general_data_steps_prices } from '../../helpers/data/tour';
import { getCookie, setCookie } from 'cookies-next';
import { SourcesComponent } from '../../components/ui/sources-component';
import { PlotlyChartLineInternational } from '../../components/data/plotly-chart/PlotlyChartLineInternational';
import { PlotlyChartBoxInternational } from '../../components/data/plotly-chart/PlotlyChartBoxInternational';
import { MapViewPricesInt } from '../../components/ui/map/MapViewPricesInt';

const mapFilterElements = [1000, 5312, 5510];
const regionsElementId = {1201:1201, 1202:1202, 1060:1154, 1059:1153, 58:152, 5510:5510, 1000:1000, 5312:5312, 645:14, 6:6, 7:7};
const baseURL = 'https://commonbeanobservatorytst.ciat.cgiar.org';
//let clickId: string | number | null = null;

interface sectionState {
    elementId: number
    locationName: string
}

const ProductionPage: NextPage = () => {
    const { t: dataTranslate } = useTranslation('data');
    const [ sectionState, setSectionState ] = useState<sectionState>({
        elementId: 300050,
        locationName: 'WORLD'
    });
    const { elementId, locationName } = sectionState;
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
    const [id_country, setIdCountry] = useState(0)

    
    
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

    // Executes the tour for production. This useEffect runs only once
    useEffect(() => {
        if ( !getCookie('production_tour') ) {
            if (setSteps) {
                setSteps(general_data_steps_prices);
                setCookie('production_tour', true);
                setIsOpen(true);
            }
        }
    }, []);

    return (
            <Layout title={ dataTranslate('Prices International') }>
                <Container fluid>
                    <Row>
                        <Col xs={ 12 } lg={ 3 } xl={ 2 } className={ styles.sidebar }>
                            <SidebarComponent/>
                        </Col>
                        <Col xs={ 12 } lg={ 9 } xl={ 10 } className={ styles['content-data'] }>
                            <Container fluid className={ `${ styles['content-data'] } ${ styles['no-padding'] }` } >
                                <Row>
                                    <Col xs={ 12 } className={ `${ styles['no-margin'] } ${ styles['no-padding'] }` }>
                                        <MainBar key={ uuidv4() } section={`${locationName}`} >
                                            <BackButton regionCode={'asd'} countryCode={'asdsd'} setSectionState={setSectionState}/>
                                        </MainBar>
                                    </Col>
                                </Row>
                                <Row>
                                    <LeftSideMenuContainer/>
                                    <Col xs={ 12 }  lg={ 5 } style={ { display: 'block', height: '80vh', position: 'relative' } } className={ `${ styles['no-margin'] } ${ styles['no-padding'] }` }>
                                        <Row style={{ position: 'absolute', top: '10px', right: '20px', zIndex: '3', width: '100%', justifyContent: 'flex-end', gap: '5px' }}>
                                        </Row>
                                        <MapViewPricesInt setIdCountry={setIdCountry}/>
                                    </Col>
                                    <Col xs={ 12 } lg={ 7 } style={  { display: 'block', height: '80vh', overflow: 'auto' } }>
                                        <MainBar key={ uuidv4() } section={`International Prices`}></MainBar>
                                        <PlotlyChartBoxInternational  dataURL={`https://riceobservatory.org/api/v1/charts/comercico/precios/internacionales`} title={'International benchmark prices by type of rice'} description='Grafico de precios' /> 
                                        <PlotlyChartLineInternational  dataURL={`https://riceobservatory.org/api/v1/charts/comercico/precios/internacionales/grafico/lineas`} title={'International benchmark prices by type of rice'} description='Grafico de precios'/>
                                        <SourcesComponent sourcesText='' shortName='FAO' year='2022' completeName='FAOSTAT Database' url='http://www.fao.org/faostat/en/#data' />
                                    </Col>
                                </Row>                            
                            </Container>
                        </Col>
                    </Row>
                </Container>
            </Layout>
    )
}

export const getStaticProps: GetStaticProps = async ({ locale }) => {
    return {
        props: {
            ...( await serverSideTranslations( locale!, ['data'] ) ),
        }
    }
}

export default ProductionPage;