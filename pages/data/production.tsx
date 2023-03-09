import { useState, useEffect, useContext } from 'react'
import { GetStaticProps, NextPage } from 'next';
import { Col, Container, Row } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import 'bootstrap/dist/css/bootstrap.min.css';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { Layout } from '../../components/layouts'
import { MainBar, MapView, SidebarComponent } from '../../components/ui';

import { v4 as uuidv4 } from 'uuid';

import styles from './data.module.css';
import { DataPodium, Podium } from '../../components/data';
import { LineChartjs } from '../../components/data/chartjs-charts';
import { annual_growth_options, ten_year_moving_average_options } from '../../helpers/data/chartjs-options';
import { PodiumWithLink } from '../../components/data/podium/PodiumWithLink';
import { PodiumSelection } from '../../components/data/podium/PodiumSelection';
import { ChartSelection } from '../../components/data/charts';
import { harvested_production_yield } from '../../helpers/data/chartjs-options/harvested-production-yield';
import { MapContext } from '../../context/map';
import { LeftSideMenuContext } from '../../context/map/leftsidemenu';
import { LeftSideMenuContainer, TopSideMenuContainer } from '../../components/ui/map/filters';


interface sectionState {
    elementId: number,
    regionCode: string,
    year: number
}


const ProductionPage: NextPage = () => {
    const { t: dataTranslate } = useTranslation('data');
    const [ sectionState, setSectionState ] = useState<sectionState>({
        elementId: -1,
        regionCode: 'WLRD',
        year: 2020
    });
    const { elementId, regionCode, year } = sectionState;

    const { buttonBoth, buttonGraphs, buttonMap } = useContext( LeftSideMenuContext );
    const { map } = useContext( MapContext );
    const [mapCol, setMapCol] = useState(0);
    const [graphsCol, setGraphsCol] = useState(0);
    const [showMap, setShowMap] = useState(false);
    const [showGraphs, setShowGraphs] = useState(false);
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

    const podiumConfig = [
        {
            url: `https://cropobs-central.ciat.cgiar.org/api/v1/data/podium/${regionCode}/1103/176/${year}`,
            text: `In ${year}, crop was the fastest-growing crop in production in relation to ${year - 1}`,
            name: 'Production'
        },
        {
            url: `https://cropobs-central.ciat.cgiar.org/api/v1/data/podium/${regionCode}/1101/176/${year}`,
            text: `In ${year}, crop was the fastest-growing crop in area in relation to ${year - 1}`,
            name: 'Area'
        },
        {
            url: `https://cropobs-central.ciat.cgiar.org/api/v1/data/podium/${regionCode}/1102/176/${year}`,
            text: `In ${year}, crop was the fastest-growing crop in yield in relation to ${year - 1}`,
            name: 'Yield'
        },
    ]

    const chartConfig = [
        {
            dataURL: `https://cropobs-central.ciat.cgiar.org/api/v1/chart/default/beans_production/${regionCode}?elementIds=[1001,1002,1003]&cropIds=[176]`,
            options: annual_growth_options,
            config: {key: 'id_element', name:'id_element'},
            name: 'Annual growth',
            elementsURL: 'https://cropobs-central.ciat.cgiar.org/api/v1/data/elements/2'
        },
        {
            dataURL: `https://cropobs-central.ciat.cgiar.org/api/v1/chart/default/beans_production/${regionCode}?elementIds=[1007,1008,1009]&cropIds=[176]`,
            options: ten_year_moving_average_options,
            config: {key: 'id_element', name:'id_element'},
            name: '10-year moving average',
            elementsURL: 'https://cropobs-central.ciat.cgiar.org/api/v1/data/elements/2'
        }
    ];

    harvested_production_yield.plugins.title.text = 'Harvested area, production and yield' + ` - ${regionCode}`;

    annual_growth_options.plugins.title.text = 'Annual Growth' + ` - ${regionCode}`;

    ten_year_moving_average_options.plugins.title.text = '10-year moving average' + ` - ${regionCode}`;

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
                                    <MainBar key={ uuidv4() } section={`Production - ${regionCode}`} />
                                </Col>
                            </Row>
                            <Row>
                                <LeftSideMenuContainer/>
                                <Col xs={ 12 }  lg={ mapCol } style={ showMap ? { display: 'block', height: '80vh',  } : { display: 'none' } } className={ `${ styles['no-margin'] } ${ styles['no-padding'] }` }>
                                    <MapView/>
                                </Col>
                                <Col xs={ 12 } lg={ graphsCol } style={ showGraphs && !showMap ? { display: 'block', height: '80vh', overflow: 'auto', marginLeft: '60px' } : showGraphs ? { display: 'block', height: '80vh', overflow: 'auto' } : { display: 'none' } }>
                                    <LineChartjs dataURL={`https://cropobs-central.ciat.cgiar.org/api/v1/chart/default/beans_production/${regionCode}?elementIds=[5510,5312,1000]&cropIds=[176]`} elementsURL='https://cropobs-central.ciat.cgiar.org/api/v1/data/elements/2' options={harvested_production_yield} config={{key: 'id_element', name:'id_element'}} chartID='prod1' chartConf={{fill: true, pointRadius: 1, yAxisID: 'y'}} orderList={{1000:0, 5510:1, 5312:2}}/>
                                    <br/>
                                    <PodiumSelection podiumsList={podiumConfig} />
                                    <br/>
                                    <ChartSelection chartConfigList={chartConfig} />
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