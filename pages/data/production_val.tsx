import { useState, useEffect } from 'react'
import { GetStaticProps, NextPage } from 'next';
import { Col, Container, Row } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import 'bootstrap/dist/css/bootstrap.min.css';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { Layout } from '../../components/layouts'
import { MainBar, MapView, SidebarComponent } from '../../components/ui';

import { v4 as uuidv4 } from 'uuid';

import styles from './data.module.css';
import { ModalForm, ToggleDescription, PodiumWithLink, PorcentagesBox, MultichartContainerPV } from '../../components/data';
import { GenerateDataJson2, GetChartData2 } from '../../helpers/data';

import { annual_growth_options, ten_year_moving_average_options } from '../../helpers/data/chartjs-options';
import { ChartSelection } from '../../components/data/charts';
import axios from 'axios';


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

    const chartConfig = [
        {
            dataURL: `https://cropobs-central.ciat.cgiar.org/api/v1/chart/default/beans_production/${regionCode}?elementIds=[1001,1002,1003]&cropIds=[176]`,
            options: annual_growth_options,
            config: {key: 'id_element', name:'id_element'},
            name: 'Annual growth'
        },
        {
            dataURL: `https://cropobs-central.ciat.cgiar.org/api/v1/chart/default/beans_production/${regionCode}?elementIds=[1007,1008,1009]&cropIds=[176]`,
            options: ten_year_moving_average_options,
            config: {key: 'id_element', name:'id_element'},
            name: '10-year moving average'
        }
    ]
    let [data1Json, setdata1Js] = useState([]);
    let [data2Json, setdata2Js] = useState([]);
    let [data3Json, setdata3Js] = useState([]);
    let [data4Json, setdata4Js] = useState([]);
    let [xlabels, setXlabels] = useState([]);
    let [showModal, setShowModal] = useState(false);
    let [open, setOpen] = useState(false);

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

    useEffect( () => {
        axios({url: `https://commonbeanobservatory.org/api/v1/data/value/beans_production_value/VALUE/${regionCode}/1153/176/${year}`})
        .then(response => {
            setPorc1({value: response.data, text: dataPorcentage1.text})
        })

        axios({url: `https://commonbeanobservatory.org/api/v1/data/value/beans_production_value/VALUE/${regionCode}/1154/176/${year}`})
        .then(response => {
            setPorc2({value: response.data, text: dataPorcentage2.text})
        })

    },[])

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
                                    <MapView/>
                                </Col>
                                <Col xs={ 12 } xl={ 6 } style={{ height: '80vh', border: '1px black solid', overflowY: 'scroll', }}>
                                    <PodiumWithLink dataURL='https://commonbeanobservatory.org/api/v1/data/podium/WLRD/252/176/2020' text={`In ${year}, beans were the 28 most important crop in relation to the value of production`} />
                                    <PorcentagesBox data_1={dataPorcentage1} data_2={dataPorcentage2} />
                                    <MultichartContainerPV xLabels={x_labels} data1={data1} data2={data2} data3={data3} data4={data4} setShowModal={setShowModal} setOpen= {setOpen}  open={open} />
                                    <ToggleDescription isOpen={ open } text='Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque dapibus, massa nec auctor aliquet, urna ex tristique ante, ac tempus quam dui et metus. Proin finibus venenatis nisl, ut egestas dui consequat id. Fusce consequat hendrerit ornare. Aliquam id imperdiet libero. Cras sodales blandit urna ac pellentesque. Nullam venenatis neque nibh, sit amet commodo mauris tincidunt nec. Curabitur maximus a nisl a pretium. Proin iaculis, erat id rhoncus pulvinar,' />
                                    {showModal ? (
                                      <div> <ModalForm dataJson={GenerateDataJson2(x_labels,data1,data2,data3,data4)} setShowModal={setShowModal}/> </div>
                                    ) : null
                                    }
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

export default DataPage