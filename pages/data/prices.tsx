import { useState, useEffect, useContext, SetStateAction } from 'react'
import { GetStaticProps, NextPage } from 'next';
import { Col, Container, Row } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import 'bootstrap/dist/css/bootstrap.min.css';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { Layout } from '../../components/layouts'
import { MainBar, MapViewPrices, SidebarComponent } from '../../components/ui';
import { v4 as uuidv4 } from 'uuid';
import styles from './data.module.css';
import {PlotlyChartBox } from '../../components/data';
import { PlotlyChartLine } from '../../components/data';
import axios from 'axios';
import { LeftSideMenuContainer, MapSelect } from '../../components/ui/map/filters';
import { dataFetcher, generateElementsOptions } from '../../helpers/data';
import useSWR from 'swr';
import { MapContext } from '../../context/map';
import { LeftSideMenuContext } from '../../context/map/leftsidemenu';
import { ElementsData,SelectOptions } from '../../interfaces/data';
import { GeoJsonProperties, Geometry } from 'geojson';


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
    const { t: dataTranslate } = useTranslation('data');
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
   
    const [mapCol, setMapCol] = useState(0);
    const [graphsCol, setGraphsCol] = useState(0);
    const [showMap, setShowMap] = useState(false);
    const [showGraphs, setShowGraphs] = useState(false);
    const [onlyMap, setOnlyMap]= useState(true);
    const { buttonBoth, buttonGraphs, buttonMap } = useContext( LeftSideMenuContext );
    const { data: elementsData, isLoading: isLoadingElements } = useSWR<ElementsData[]>(`${baseURL}/api/v1/data/elements/6`, dataFetcher);
    
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
        if( onlyMap ) {
            setMapCol(12)
            setGraphsCol(0)
            setShowMap(true)
            setShowGraphs(false)
        }
       
       
    }, [onlyMap]);

    useEffect( () => {
       
        if( onlyMap ) {
            if (map) map.resize();
        }
    });

    useEffect(() => {
        if (map){
            map.on('load', () => {
                map.on('click', 'unclustered-point', (e) => {
                    setSectionState( (prevState) => ({
                        ...prevState,
                        locationName: e.features![0].properties?.label
                    }));
                    console.log(e.features![0].properties?.label);
                    clickId = e.features![0].id ?? null;
                });
            });
        }
    }, [map]);

    const  handleClick = () => {
        if( onlyMap ) {
            setMapCol(6)
            setGraphsCol(6)
            setShowMap(true)
            setShowGraphs(true)
        }
    };
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
    //console.log(elementsData);
    useEffect(() => {
        if (elementsObj[elementId]) {
            const elementName = elementsObj[elementId].ELEMENT_EN;
            setChartTitle(` ${elementName}`);
        }
    }, [elementId, elementsObj]);
    
    useEffect(()=>{
        getPriceData(elementId);
    },[elementId])
    return (
        <Layout title={ dataTranslate('title-header') }>
            <Container fluid>
                <Row>
                    <Col xs={ 12 } lg={ 3 } xl={ 2 } className={ styles.sidebar }>
                        <SidebarComponent/>
                    </Col>
                    <Col xs={ 12 } lg={ 9 } xl={ 10 } className={ styles['content-data'] }>
                        <Container fluid className={ `${ styles['content-data'] } ${ styles['no-padding'] }` } >
                            <Row>
                                <Col xs={ 12 }  className={ `${ styles['no-margin'] } ${ styles['no-padding'] }` }>
                                    <MainBar key={ uuidv4() } section={`Prices - ${locationName}`} ></MainBar>
                                </Col>
                            <Row/>
                                <LeftSideMenuContainer/>
                                <Col xs={ 12 } lg={ mapCol }  onClick={handleClick} style={ showMap ? { display: 'block', height: '80vh', position: 'relative'  } : { display: 'none' } } className={ `${ styles['no-margin'] } ${ styles['no-padding'] }` }>
                                    <Row style={{ position: 'absolute', top: '10px', right: '20px', zIndex: '999', width: '100%', justifyContent: 'flex-end', gap: '5px', flexWrap: 'wrap' }} >
                                        <MapSelect setMapCol={setMapCol} setGraphsCol={setGraphsCol} setShowMap={setShowMap} setShowGraphs={setShowGraphs} options={elementsOptions} selected={elementId} setSelected={setSectionState} atrName='elementId'/>                                    
                                    </Row>
                                        <MapViewPrices  setIdGeoPoint={setIdGeoPoint} setIdCountry={setIdCountry} markers={priceData ? {priceDataGeopoint: priceData} as marker : {} as marker} ></MapViewPrices>
                                </Col>
                                <Col xs={ 12 } xl={ graphsCol } style={ !showMap ? { display: 'block', height: '80vh', overflow: 'auto', marginLeft: '60px' } : showGraphs ? { display: 'block', height: '80vh', overflow: 'auto' } : { display: 'none' } }>
                                 
                                    <PlotlyChartBox dataURL={`https://cassavalighthouse.org/api/v1/charts/prices/national/boxplot/${elementId}?id_country=${idCountry}&id_geo_point=${idGeoPoint}`} title={chartTitle} description='Boxplot de precios '/>
                                    <PlotlyChartLine dataURL={`https://cassavalighthouse.org/api/v1/charts/prices/national/line/${elementId}?id_country=${idCountry}&id_geo_point=${idGeoPoint}`} title={chartTitle} description='Grafico de precios'/>
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

export default DataPage