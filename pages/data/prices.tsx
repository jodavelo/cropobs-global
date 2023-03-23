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
import { MapSelect } from '../../components/ui/map/filters';
import { dataFetcher, generateElementsOptions, generateOptionsFromObj, generateRegionOptions, generateYearsOptions } from '../../helpers/data';
import useSWR from 'swr';
import { ElementsData,SelectOptions } from '../../interfaces/data';


interface sectionState {
    elementId: number
}

interface ElementsState {
    elementsObj: Record<string, ElementsData>
    elementsOptions: SelectOptions
}

const mapFilterElements = [300050, 300051, 300052];
const baseURL = 'https://cassavalighthouse.org';
const DataPage: NextPage = () => {
    const { t: dataTranslate } = useTranslation('data');
    const[priceData, setPriceData] = useState([]);
    const [ sectionState, setSectionState ] = useState<sectionState>({
        elementId: 300050,
    });
    const { elementId } = sectionState;
    const [elementsState, setElements] = useState<ElementsState>({
        elementsObj: {},
        elementsOptions: { values: [], names: []}
    });
    const { elementsObj, elementsOptions } = elementsState;
    
    const { data: elementsData, isLoading: isLoadingElements } = useSWR<ElementsData[]>(`${baseURL}/api/v1/data/elements/6`, dataFetcher);
  
    const getPriceData = (elementId: SetStateAction<number>) => {
        axios.get(`https://cassavalighthouse.org/api/v1/geojson/admin2/prices/Nals/${elementId}`)
            .then(res=>{setPriceData( res.data.data.geo_points)})
    }

    const getTitle = () => {
         // logic to determine the title based on priceFilter
        if (elementId === 300052) {
           return 'Producer Price';
        } else if (elementId === 300051) {
           return 'Consumer Price';
        } else {
           return 'Wholesale price';
        }
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

    useEffect(()=>{
        getPriceData(elementId)
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
                                <Col xs={ 12 } className={ `${ styles['no-margin'] } ${ styles['no-padding'] }` }>
                                    <MainBar key={ uuidv4() } section='Lorem ipsum dolor sit amet consectetur, adipisicing elit. Reiciendis quas quis quae accusantium vel' />
                                </Col>
                                <Col xs={ 12 } xl={ 6 } className={ `${ styles['no-margin'] } ${ styles['no-padding'] }` }>
                                 {/* <Select options={filterOptions} value={filterOptions.filter(option => option.value=== priceFilter)} onChange={(e) =>  handleSelect(e)}/>   */}
                                        <MapSelect options={elementsOptions} selected={elementId} setSelected={setSectionState} atrName='elementId'/>

                                         <MapViewPrices markers={{priceDataGeopoint: priceData}}></MapViewPrices>
                                </Col>
                                <Col xs={ 12 } xl={ 6 } style={{ height: '80vh', border: '1px black solid', overflow: 'auto' }}>
                                 
                                    <PlotlyChartBox dataURL={`https://cassavalighthouse.org/api/v1/charts/prices/national/boxplot/${elementId}?id_country=174&id_geo_point=7847`} title={getTitle()}/>
                                    <PlotlyChartLine dataURL={`https://cassavalighthouse.org/api/v1/charts/prices/national/line/${elementId}?id_country=174&id_geo_point=7847`} title={getTitle()}/>
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