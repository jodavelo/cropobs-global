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
import { PodiumProductVal as Podium, PorcentagesBox, MultichartPV, ChartFrame, ChartSelectionPV, MapPV } from '../../components/data';
import { datasetGeneratorPV, GetChartData2 } from '../../helpers/data';

import { annual_growth_optionsPV, ten_year_moving_average_optionsPV } from '../../helpers/data/chartjs-options';
import axios from 'axios';
import { LeftSideMenuContainer, TopSideMenuContainer } from '../../components/ui/map/filters';
import { useWindowSize } from '../../hooks';
import { LeftSideMenuContext } from '../../context/map/leftsidemenu';
import { MapContext } from '../../context/map';


interface sectionState {
    elementId: number,
    regionCode: string,
    year: number
}

const DataPage: NextPage = () => {
    const { t: dataTranslate } = useTranslation('data');
    const [ sectionState, setSectionState ] = useState<sectionState>({
        elementId: -1,
        regionCode: 'WLRD',
        year: 2020
    });
    const { elementId, regionCode, year } = sectionState;

    const { width = 0} = useWindowSize();
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

    let [data1Json, setdata1Js] = useState([]);
    let [data2Json, setdata2Js] = useState([]);
    let [data3Json, setdata3Js] = useState([]);
    let [data4Json, setdata4Js] = useState([]);
    let [xlabels, setXlabels] = useState([]);

    useEffect(() => {
        GetChartData2(setXlabels,setdata1Js,setdata2Js,setdata3Js,setdata4Js)
    }, []);

    const x_labels = xlabels;
    const data1 = data1Json.map((datum: any) => datum.value);
    const data2 = data2Json.map((datum: any) => datum.value);
    const data3 = data3Json.map((datum: any) => datum.value);
    const data4 = data4Json.map((datum: any) => datum.value);

    let [dataPorcentage1, setPorc1] = useState({
        value: 0,
        text: "Of the production value",
    })

    let [dataPorcentage2, setPorc2] = useState({
        value: 0,
        text: "Of the pulses production value",
    });

    let [anualdata, setanualdata] = useState({labels: Array(0), datasets: Array<any>(0)});
    let [tenyearsdata, settenyearsdata] = useState({labels: Array(0), datasets: Array<any>(0)});

    useEffect( () => {
        axios({url: `https://commonbeanobservatorytst.ciat.cgiar.org/api/v1/data/value/beans_production_value/VALUE/${regionCode}/1153/176/${year}`})
        .then(response => {
            setPorc1({value: response.data, text: dataPorcentage1.text})
        })

        axios({url: `https://commonbeanobservatorytst.ciat.cgiar.org/api/v1/data/value/beans_production_value/VALUE/${regionCode}/1154/176/${year}`})
        .then(response => {
            setPorc2({value: response.data, text: dataPorcentage2.text})
        })

        axios({url: `https://commonbeanobservatory.org/api/v1/chart/default/beans_production_value/${regionCode}?elementIds=[1058,7184]&cropIds=[176,22008,22016]`})
        .then(response => {
            const data = response.data.data;
            const datasets = datasetGeneratorPV(data.observations, data.labels, chartConfig[0].config.key, chartConfig[0].config.name);
            const chartjsData = {labels: data.labels, datasets};
            setanualdata(chartjsData)
        })
        axios({url: `https://commonbeanobservatory.org/api/v1/chart/default/beans_production_value/${regionCode}?elementIds=[2058,8184]&cropIds=[176,22008,22016]`})
        .then(response => {
            const data = response.data.data;
            const datasets = datasetGeneratorPV(data.observations, data.labels, chartConfig[1].config.key, chartConfig[1].config.name);
            const chartjsData = {labels: data.labels, datasets};
            settenyearsdata(chartjsData)
        })

    },[])

    const dataFrame1 = [
        {
            label:"Years", 
            values : x_labels
        },
        {
            label:"Beans", 
            values : data1
        },
        {
            label:"Pulses", 
            values : data2
        },
        {
            label:"Agriculture", 
            values : data3
        },
        {
            label:"Crops", 
            values : data4
        },
    ]

    const dataFrame2 = [
        {
            label:"Years - Annual Growth", 
            values : anualdata.labels
        },
        {
            label:"Beans - Annual Growth", 
            values : anualdata.datasets[0]
        },
        {
            label:"Value Added - Annual Growth", 
            values : anualdata.datasets[2]
        },
        {
            label:"Gross Domestic Product - Annual Growth", 
            values : anualdata.datasets[1]
        },
        {
            label:"Years - 10 Year Moving Average", 
            values : tenyearsdata.labels
        },
        {
            label:"Crops", 
            values : tenyearsdata.datasets[0]
        },
        {
            label:"Pulses", 
            values : tenyearsdata.datasets[2]
        },
        {
            label:"Agriculture", 
            values : tenyearsdata.datasets[1]
        },
    ]

    const chartConfig = [
        {
            dataURL: anualdata,
            options: annual_growth_optionsPV,
            config: {key: 'crop_name', name:'id_element'},
            name: 'Annual growth'
        },
        {
            dataURL: tenyearsdata,
            options: ten_year_moving_average_optionsPV,
            config: {key: 'crop_name', name:'id_element'},
            name: '10-year moving average'
        }
    ]

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
                            </Row>
                            <Row>
                                <LeftSideMenuContainer/>
                                    {/*<MapView>
                                        <TopSideMenuContainer/>
                                    </MapView>*/}
                                    <MapPV/>
                                <Col xs={ 12 } lg={ graphsCol } style={ showGraphs ? { display: 'block', height: '80vh', border: '1px black solid', overflowY: 'scroll' } : { display: 'none' } }>
                                    
                                    <Podium dataURL={`https://commonbeanobservatorytst.ciat.cgiar.org/api/v1/data/podium/${regionCode}/252/176/${year}`} year={year} />
                                    <PorcentagesBox data_1={dataPorcentage1} data_2={dataPorcentage2} />
                                    <ChartFrame data={dataFrame1} toggleText={'Toggle test'} excludedClasses={[]}>
                                        <MultichartPV xLabels={x_labels} data1={data1} data2={data2} data3={data3} data4={data4} />
                                    </ChartFrame>
                                    <ChartFrame data={dataFrame2} toggleText={'Toggle test'} excludedClasses={['chart-select']}>
                                        <ChartSelectionPV chartConfigList={chartConfig} />
                                    </ChartFrame>
                                    
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