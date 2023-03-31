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
import { PodiumProductVal as Podium, PorcentagesBox, MultichartPV, ChartFrame, MultiBar1, MultiBar2, MapCON } from '../../components/data';
import { datasetGeneratorPV } from '../../helpers/data';

import axios from 'axios';
import { LeftSideMenuContainer, TopSideMenuContainer } from '../../components/ui/map/filters';
import { useWindowSize } from '../../hooks';
import { LeftSideMenuContext } from '../../context/map/leftsidemenu';
import { MapContext } from '../../context/map';
import { PodiumSelectionCon } from '../../components/data/podium/PodiumSelectionCon';
import { APorcentagesBox } from '../../components/data/porcentages-box/APorcentagesBox';
import { useRouter } from 'next/router';

interface sectionState {
    elementId: number,
    regionCode: string,
    year: number
}

const DataPage: NextPage = () => {
    const { t: dataTranslate } = useTranslation('data-consuption');
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

    const podiumConfig = [
        {
            url: `https://commonbeanobservatory.org/api/v1/data/podium/${regionCode}/4/2546/${year - 1}`,
            text:  [dataTranslate('podium1-title1'),dataTranslate('podium1-title2')+year],
            name: dataTranslate('podium-option1'),
            description: '',
        },
        {
            url: `https://commonbeanobservatory.org/api/v1/data/podium/${regionCode}/20/2546/${year - 1}`,
            text: [dataTranslate('podium2-title1'),dataTranslate('podium2-title2')+year],
            name: dataTranslate('podium-option2'),
            description: '',
        },
        {
            url: `https://commonbeanobservatory.org/api/v1/data/podium/${regionCode}/5/2546/${year - 1}`,
            text: [dataTranslate('podium3-title1'),dataTranslate('podium3-title2')+year],
            name: dataTranslate('podium-option3'),
            description: '',
        },
    ]

    let [perCapConsup, setPerCapConsup] = useState(0);

    let [dataComplmnt1, setDataComplmnt1] = useState(0);
    let [dataComplmnt2, setDataComplmnt2] = useState(0);
    let [dataComplmnt3, setDataComplmnt3] = useState(0);
    let [dataComplmnt4, setDataComplmnt4] = useState(0);

    let [selfSuff, setSelfSuff] = useState(0);

    let [dataPorcentage1, setPorc1] = useState({
        value: 0,
        text: ``,
    })

    let [dataPorcentage2, setPorc2] = useState({
        value: 0,
        text: ``,
    });

    let [dataPorcentage3, setPorc3] = useState({
        value: 0,
        text: ``,
    })

    let [dataPorcentage4, setPorc4] = useState({
        value: 0,
        text: ``,
    });

    useEffect(() => {

        axios({ url: `https://commonbeanobservatory.org/api/v1/data/value/beans_consumption/VALUE/${regionCode}/14/2546/${year - 1}` })
            .then(response => {
                setPerCapConsup(response.data)
            })

        axios({ url: `https://commonbeanobservatory.org/api/v1/data/value/beans_consumption/VALUE/${regionCode}/12/2546/${year - 1}` })
            .then(response => {
                setSelfSuff(response.data)
            })

        axios({ url: `https://commonbeanobservatory.org/api/v1/data/value/beans_consumption/VALUE/${regionCode}/664/1/${year - 1}` })
            .then(response => {
                setDataComplmnt1(response.data)
            })

        axios({ url: `https://commonbeanobservatory.org/api/v1/data/value/beans_consumption/VALUE/${regionCode}/664/2/${year - 1}` })
            .then(response => {
                setDataComplmnt2(response.data)
            })

        axios({ url: `https://commonbeanobservatory.org/api/v1/data/value/beans_consumption/VALUE/${regionCode}/674/1/${year - 1}` })
            .then(response => {
                setDataComplmnt3(response.data)
            })

        axios({ url: `https://commonbeanobservatory.org/api/v1/data/value/beans_consumption/VALUE/${regionCode}/674/2/${year - 1}` })
            .then(response => {
                setDataComplmnt4(response.data)
            })

        axios({ url: `https://commonbeanobservatory.org/api/v1/data/value/beans_consumption/VALUE/${regionCode}/6/2546/${year - 1}` })
            .then(response => {
                setPorc1({ value: response.data, text: `` })
            })

        axios({ url: `https://commonbeanobservatory.org/api/v1/data/value/beans_consumption/VALUE/${regionCode}/7/2546/${year - 1}` })
            .then(response => {
                setPorc2({ value: response.data, text: `` })
            })

        axios({ url: `https://commonbeanobservatory.org/api/v1/data/value/beans_consumption/VALUE/${regionCode}/23/2546/${year - 1}` })
            .then(response => {
                setPorc3({ value: response.data, text: `` })
            })

        axios({ url: `https://commonbeanobservatory.org/api/v1/data/value/beans_consumption/VALUE/${regionCode}/24/2546/${year - 1}` })
            .then(response => {
                setPorc4({ value: response.data, text: `` })
            })

    }, [])

    let [xlabels1, setxlabels1] = useState(Array(0))
    let [datapoints1, setdatapoints1] = useState(Array(0))
    let [databar11, setdatabar11] = useState(Array(0))
    let [databar12, setdatabar12] = useState(Array(0))
    let [databar13, setdatabar13] = useState(Array(0))
    let [databar14, setdatabar14] = useState(Array(0))
    let [databar15, setdatabar15] = useState(Array(0))

    let [xlabels2, setxlabels2] = useState(Array(0))
    let [datapoints2, setdatapoints2] = useState(Array(0))
    let [databar21, setdatabar21] = useState(Array(0))
    let [databar22, setdatabar22] = useState(Array(0))
    let [databar23, setdatabar23] = useState(Array(0))

    useEffect(() => {
        axios({ url: `https://commonbeanobservatory.org/api/v1/chart/default/beans_consumption/WLRD?elementIds=[5142,5527,5521,5131,5123,95154,14]&cropIds=[2546]` })
            .then(response => {
                const data = datasetGeneratorPV(response.data.data.observations, response.data.data.labels, 'id_element', 'crop_name')
                const chartjsData = { labels: response.data.data.labels, data };
                setxlabels1(response.data.data.labels)
                setdatapoints1(data[0].data.map((datum: number) => datum > 0 ? datum : null))
                setdatabar11(data[2].data.map((datum: number) => datum > 0 ? datum : null))
                setdatabar12(data[4].data.map((datum: number) => datum > 0 ? datum : null))
                setdatabar13(data[1].data.map((datum: number) => datum > 0 ? datum : null))
                setdatabar14(data[3].data.map((datum: number) => datum > 0 ? datum : null))
            })

        axios({ url: `https://commonbeanobservatory.org/api/v1/chart/default/beans_consumption/WLRD?elementIds=[10,5611,5911,12]&cropIds=[2546]` })
            .then(response => {
                const data = datasetGeneratorPV(response.data.data.observations, response.data.data.labels, 'id_element', 'crop_name')
                const chartjsData = { labels: response.data.data.labels, data };
                setxlabels2(response.data.data.labels)
                setdatapoints2(data[1].data)
                setdatabar21(data[0].data)
                setdatabar22(data[2].data.map((datum: number) => -datum))
                setdatabar23(data[3].data)
            })

    }, [])

    const chartTxts1 = {
        title: dataTranslate('chart1-title'),
        axis_x : "",
        axis_y : dataTranslate('chart1-axis-y'),
        axis_y2 : dataTranslate('chart1-axis-y2'),
        datasets: [dataTranslate('chart1-dataset1'),dataTranslate('chart1-dataset3'),dataTranslate('chart1-dataset4'),dataTranslate('chart1-dataset5'),dataTranslate('chart1-dataset6')]
    }

    const chartTxts2 = {
        title: dataTranslate('chart2-title'),
        axis_x : "",
        axis_y : dataTranslate('chart2-axis-y'),
        axis_y2 : dataTranslate('chart2-axis-y2'),
        datasets: [dataTranslate('chart2-dataset1'),dataTranslate('chart2-dataset2'),dataTranslate('chart2-dataset3'),dataTranslate('chart2-dataset4')]
    }

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
                                <MapCON/>
                                <Col xs={12} lg={graphsCol} style={showGraphs ? { display: 'block', height: '81vh', border: '1px black solid', overflowY: 'scroll' } : { display: 'none' }}>
                                    <PodiumSelectionCon podiumsList={podiumConfig} />
                                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '15px' }}>
                                        <span>{dataTranslate('per-capita-title')} {year - 1}:</span>
                                        <span>{Math.round(perCapConsup * 100) / 100} kg {dataTranslate('per-capita-label')}</span>
                                        <span style={{ marginTop: '25px', marginBottom: '10px' }}>{dataTranslate('porc-title')}:</span>
                                    </div>
                                    <PorcentagesBox data_1={{ value: dataPorcentage1.value, text:dataTranslate('porc1-label1')+(Math.round(dataComplmnt1* 100) / 100).toString()+dataTranslate('porc1-label2')}}
                                        data_2={{ value: dataPorcentage2.value, text: dataTranslate('porc2-label1')+(Math.round(dataComplmnt2 * 100) / 100).toString()+dataTranslate('porc2-label2') }} />
                                    <PorcentagesBox data_1={{ value: dataPorcentage3.value, text: dataTranslate('porc3-label1')+(Math.round(dataComplmnt3 * 100) / 100).toString()+dataTranslate('porc3-label2') }}
                                        data_2={{ value: dataPorcentage4.value, text: dataTranslate('porc4-label1')+(Math.round(dataComplmnt4 * 100) / 100).toString()+dataTranslate('porc4-label2') }} />
                                    <ChartFrame data={[]} toggleText={dataTranslate('chart1-toggle')} excludedClasses={[]}>
                                        { xlabels1.length == 0 ? (<div>Loading...</div>) : (<MultiBar1 xLabels={xlabels1} datapoints={datapoints1} databar1={databar11} databar2={databar12} databar3={databar13} databar4={databar14} chartTexts={chartTxts1} />)} 
                                    </ChartFrame>
                                    <APorcentagesBox data={{ value: selfSuff / 100, text: 'Self-sufficiency ratio' }} />
                                    <ChartFrame data={[]} toggleText={dataTranslate('chart2-toggle')} excludedClasses={[]}>
                                        { xlabels1.length == 0 ? (<div>Loading...</div>) : (<MultiBar2 xLabels={xlabels2} datapoints={datapoints2} databar1={databar21} databar2={databar22} databar3={databar23} chartTexts={chartTxts2} />)} 
                                    </ChartFrame>
                                    <div> Source: <i>Data source</i> </div>
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
            ...(await serverSideTranslations(locale!, ['data-consuption'])),
        }
    }
}

export default DataPage