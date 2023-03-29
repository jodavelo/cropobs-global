import { useState, useEffect, useContext } from 'react'
import { GetStaticProps, NextPage } from 'next';
import { Col, Container, Row } from 'react-bootstrap';
import { useTranslation } from 'next-i18next';
import 'bootstrap/dist/css/bootstrap.min.css';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { Layout } from '../../components/layouts'
import { MainBar, MapView, SidebarComponent } from '../../components/ui';

import { v4 as uuidv4 } from 'uuid';

import styles from './data.module.css';
import { PodiumProductVal as Podium, PorcentagesBoxTr, ChartFrame,  MultichartTr, MultichartTr2 } from '../../components/data';
import { datasetGeneratorPV} from '../../helpers/data';

import { annual_growth_optionsPV, ten_year_moving_average_optionsPV } from '../../helpers/data/chartjs-options';
import { ChartSelectionPV } from '../../components/data/charts';
import axios from 'axios';
import { LeftSideMenuContainer, TopSideMenuContainer } from '../../components/ui/map/filters';
import { useWindowSize } from '../../hooks';
import { LeftSideMenuContext } from '../../context/map/leftsidemenu';
import { MapContext } from '../../context/map';
import { APorcentagesBoxTr } from '../../components/data/porcentages-box/APorcentagesBoxTr';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';

interface sectionState {
    elementId: number,
    regionCode: string,
    year: number
}

const DataPage: NextPage = () => {
    const { t: dataTranslate } = useTranslation('data-trades');
    const { locale } = useRouter();
    const [sectionState, setSectionState] = useState<sectionState>({
        elementId: -1,
        regionCode: 'WLRD',
        year: 2020
    });
    const { elementId, regionCode, year } = sectionState;

    const { width = 0 } = useWindowSize();
    const { buttonBoth, buttonGraphs, buttonMap } = useContext(LeftSideMenuContext);
    const { map } = useContext(MapContext);
    const [mapCol, setMapCol] = useState(0);
    const [graphsCol, setGraphsCol] = useState(0);
    const [showMap, setShowMap] = useState(false);
    const [showGraphs, setShowGraphs] = useState(false);
    useEffect(() => {
        if (buttonBoth) {
            setMapCol(6)
            setGraphsCol(6)
            setShowMap(true)
            setShowGraphs(true)
        }
        if (buttonGraphs) {
            setMapCol(0)
            setGraphsCol(12)
            setShowMap(false)
            setShowGraphs(true)
        }
        if (buttonMap) {
            setMapCol(12)
            setGraphsCol(0)
            setShowMap(true)
            setShowGraphs(false)
        }
    }, [buttonBoth, buttonGraphs, buttonMap]);

    useEffect(() => {
        if (buttonBoth) {
            if (map) map.resize();
        }
        if (buttonMap) {
            if (map) map.resize();
        }
    });

    const Plot = dynamic(() => import("react-plotlyjs-ts"), { ssr: false, });

    let [treeLabels, setTreeLabels] = useState(Array<string>(0))
    let [treeValues, setTreeValues] = useState(Array<number>(0))
    let [treeLoading, setTreeLoading] = useState(true)
    let [treeFailed, setTreeFailed] = useState(false)

    let [chartLabels1, setChartLabels1] = useState(Array<string>(0))
    let [chartValues11, setChartValues11] = useState(Array<number>(0))
    let [chartValues12, setChartValues12] = useState(Array<number>(0))
    let [chartLoading1, setChartLoading1] = useState(true)
    let [chartFailed1, setChartFailed1] = useState(false)
    
    let [chartLabels2, setChartLabels2] = useState(Array<string>(0))
    let [chartValues21, setChartValues21] = useState(Array<number>(0))
    let [chartValues22, setChartValues22] = useState(Array<number>(0))
    let [chartValues23, setChartValues23] = useState(Array<number>(0))
    let [chartValues24, setChartValues24] = useState(Array<number>(0))
    let [chartLoading2, setChartLoading2] = useState(true)
    let [chartFailed2, setChartFailed2] = useState(false)

    let [percent1, setpercent1] = useState(0)
    let [percent2, setpercent2] = useState(0)
    let [percent3, setpercent3] = useState(0)

    let [anualdata, setanualdata] = useState({labels: Array(0), datasets: Array<any>(0)});
    let [tenyearsdata, settenyearsdata] = useState({labels: Array(0), datasets: Array<any>(0)});

    useEffect(() => {
        axios({ url: `https://commonbeanobservatorytst.ciat.cgiar.org/api/v1/chart/trade/treeMap/BEANS_TRADE_AUX/1/WLRD/3002/713999/2021` })
            .then(response => {
                const valuesAux = Array<number>(0)
                const labelsAux = Array<string>(0)
                let key = "es_name";
                switch (locale) {
                    case 'en':
                        key = "country_name";
                        break;
                    case 'es':
                        key = "esp_name";
                        break;
                    case 'pt':
                        key = "pt_name";
                        break;
                }

                response.data.data.observations.map((elem: any, idx: number) => {
                    if (idx > 79) {
                        valuesAux.push(elem.value)
                        labelsAux.push(response.data.data.country_index[elem.iso3_reporter][key])
                    }
                })
                setTreeLabels(labelsAux)
                setTreeValues(valuesAux)
                setTreeLoading(false)
            })
            .catch(error => {
                console.log(error)
                setTreeFailed(true)
            })

            axios({ url: `https://commonbeanobservatorytst.ciat.cgiar.org/api/v1/chart/trade/default/BEANS_TRADE_AUX/1/WLRD?cropIds=[71333]&elementIds=[3001,3002]` })
            .then(response => {

                const valuesAux1 = Array<number>(0)
                const valuesAux2 = Array<number>(0)
                response.data.data.observations.map((elem:any) =>{
                    if(elem.id_element == 3002) valuesAux1.push(elem.value)
                    else if(elem.id_element == 3001) valuesAux2.push(elem.value)
                })
                setChartValues11(valuesAux1)
                setChartValues12(valuesAux2)
                setChartLabels1(response.data.data.labels)
                setChartLoading1(false)
            })
            .catch(error => {
                console.log(error)
                setChartFailed1(true)
            })

            axios({ url: `https://commonbeanobservatorytst.ciat.cgiar.org/api/v1/chart/trade/default/BEANS_TRADE_AUX/1/WLRD?cropIds=[71339,71333,71332,71331]&elementIds=[3002]` })
            .then(response => {

                const valuesAux1 = Array<number>(0)
                const valuesAux2 = Array<number>(0)
                const valuesAux3 = Array<number>(0)
                const valuesAux4 = Array<number>(0)
                response.data.data.observations.map((elem:any) =>{
                    if(elem.id_crop == 71331) valuesAux1.push(elem.value)
                    else if(elem.id_crop == 71332) valuesAux2.push(elem.value)
                    else if(elem.id_crop == 71333) valuesAux3.push(elem.value)
                    else if(elem.id_crop == 71339) valuesAux4.push(elem.value)
                })
                setChartValues21(valuesAux3)
                setChartValues22(valuesAux1)
                setChartValues23(valuesAux4)
                setChartValues24(valuesAux2)
                setChartLabels2(response.data.data.labels)
                setChartLoading2(false)
            })
            .catch(error => {
                console.log(error)
                setChartFailed2(true)
            })
            axios({ url: `https://commonbeanobservatorytst.ciat.cgiar.org/api/v1/data/trade/value/BEANS_TRADE_AUX/VALUE/1/WLRD/3101/713999/2021` })
            .then(response => {
                setpercent1( Math.round(response.data * 1000)/1000)
            })
            .catch(error => {
                console.log(error)
                setpercent1(0)
            })
            axios({ url: `https://commonbeanobservatorytst.ciat.cgiar.org/api/v1/data/trade/value/BEANS_TRADE_AUX/VALUE/1/WLRD/3102/713999/2021` })
            .then(response => {
                setpercent2( Math.round(response.data * 100)/100)
            })
            .catch(error => {
                console.log(error)
                setpercent2(0)
            })
            axios({ url: `https://commonbeanobservatorytst.ciat.cgiar.org/api/v1/data/trade/value/BEANS_TRADE_AUX/VALUE/1/WLRD/3103/713999/2021` })
            .then(response => {
                setpercent3( Math.round(response.data * 100)/100)
            })
            .catch(error => {
                console.log(error)
                setpercent3(0)
            })
            axios({url: `https://commonbeanobservatorytst.ciat.cgiar.org/api/v1/chart/trade/default/BEANS_TRADE_AUX/1/WLRD?cropIds=[%22713999%22]&elementIds=[3301,3303,300001]`})
            .then(response => {
                const data = response.data.data;
                const datasets = datasetGeneratorPV(data.observations, data.labels, chartConfig[0].config.name, chartConfig[0].config.key);
                const chartjsData = {labels: data.labels, datasets};
                setanualdata(chartjsData)
            })
            axios({url: `https://commonbeanobservatorytst.ciat.cgiar.org/api/v1/chart/trade/default/BEANS_TRADE_AUX/1/WLRD?cropIds=[%22713999%22]&elementIds=[3302,3304,300003]`})
            .then(response => {
                const data = response.data.data;
                const datasets = datasetGeneratorPV(data.observations, data.labels, chartConfig[1].config.name, chartConfig[1].config.key);
                const chartjsData = {labels: data.labels, datasets};
                settenyearsdata(chartjsData)
            })
    }, [])

    const data = [
        {
            type: "treemap",
            labels: treeLabels,
            parents: treeLabels.map(() => ""),
            values: treeValues,
            texttemplate: "%{label}<br>%{percentParent:.2%}",
            hovertemplate: "<b>%{label}<br><br>%{percentParent:.2%}</b> <br><br>Value: %{value:$,.0f}<extra></extra>"
        }
    ]

    const layout = {
        autosize: true,
        margin: { l: 20, r: 20, b: 0, t: 10, pad: 2 }
    }

    const config = {
        responsive: true,
    }

    const chartConfig = [
        {
            dataURL: anualdata,
            options: annual_growth_optionsPV,
            config: {key: 'crop_name', name:'id_element'},
            name: dataTranslate('chart2-opt1')
        },
        {
            dataURL: tenyearsdata,
            options: ten_year_moving_average_optionsPV,
            config: {key: 'crop_name', name:'id_element'},
            name: dataTranslate('chart2-opt2')
        }
    ]

    return (
        <Layout title={dataTranslate('title-header')}>
            <Container fluid>
                <Row>
                    <Col xs={12} lg={3} xl={2} className={styles.sidebar}>
                        <SidebarComponent />
                    </Col>
                    <Col xs={12} lg={9} xl={10} className={styles['content-data']}>
                        <Container fluid className={`${styles['content-data']} ${styles['no-padding']}`} >
                            <Row>
                                <Col xs={12} className={`${styles['no-margin']} ${styles['no-padding']}`}>
                                    <MainBar key={uuidv4()} section='Lorem ipsum dolor sit amet consectetur, adipisicing elit. Reiciendis quas quis quae accusantium vel' />
                                </Col>
                            </Row>
                            <Row>
                                <LeftSideMenuContainer />
                                <Col xs={12} lg={mapCol} style={showMap ? { display: 'block', height: '80vh', } : { display: 'none' }} className={`${styles['no-margin']} ${styles['no-padding']}`}>
                                    
                                </Col>
                                <Col xs={12} lg={graphsCol} style={showGraphs ? { display: 'block', height: '80vh', border: '1px black solid', overflowY: 'scroll' } : { display: 'none' }}>
                                    <div style={{display: 'flex', flexDirection: 'row'}}>
                                        <div style={{width: "60%", padding: "10px"}}>{dataTranslate('label-chart1')} {dataTranslate('label-chart2')} {dataTranslate('label-chart3')} {dataTranslate('label-chart4')} {dataTranslate('label-chart5')} {sectionState.year}?</div>
                                        <div style={{width: "40%", padding: "10px"}}>{dataTranslate('label-chart6')}{dataTranslate('label-chart7')}{dataTranslate('label-chart8')}: <br/> 1.5M USD </div>
                                    </div>
                                    <ChartFrame data={[]} toggleText='texto muestra del toggle' excludedClasses={[]}>
                                        {treeFailed ? (<div>Failed to load</div>) : (treeLoading ? (<div>Loading...</div>) : (<Plot data={data} layout={layout} config={config}/>) )}
                                    </ChartFrame>
                                    <ChartFrame data={[]} toggleText='texto muestra del toggle' excludedClasses={[]}>
                                        {chartFailed1 ? (<div>Failed to load</div>) : (chartLoading1 ? (<div>Loading...</div>) : (<MultichartTr2 xLabels={chartLabels1} data1={chartValues11} data2={chartValues12} />) )} 
                                    </ChartFrame>
                                    <ChartFrame data={[]} toggleText='texto muestra del toggle' excludedClasses={[]}>
                                        {chartFailed2 ? (<div>Failed to load</div>) : (chartLoading2 ? (<div>Loading...</div>) : (<MultichartTr xLabels={chartLabels2} data2={chartValues22} data4={chartValues24} data3={chartValues23} data1={chartValues21} />) )} 
                                    </ChartFrame>
                                    <PorcentagesBoxTr data_1={{ value: percent1, text: dataTranslate('label-perc1') }}
                                        data_2={{ value: percent2, text: dataTranslate('label-perc2') }} />
                                    <APorcentagesBoxTr data={{value: percent3, text: dataTranslate('label-perc3')}}/>
                                    <ChartFrame data={[]} toggleText={'Toggle test'} excludedClasses={['chart-select']}>
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
            ...(await serverSideTranslations(locale!, ['data-trades'])),
        }
    }
}

export default DataPage
