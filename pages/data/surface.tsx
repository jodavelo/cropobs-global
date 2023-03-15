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
import { DataPodium, PlotlyChartStackedAreaContainer, Podium } from '../../components/data';
import { LineChartjs } from '../../components/data/chartjs-charts';
import { annual_growth_options, ten_year_moving_average_options } from '../../helpers/data/chartjs-options';
import { PodiumWithLink } from '../../components/data/podium/PodiumWithLink';
import { PodiumSelection } from '../../components/data/podium/PodiumSelection';
import { ChartSelection } from '../../components/data/charts';
import { harvested_production_yield } from '../../helpers/data/chartjs-options/harvested-production-yield';
import { centralApi } from '../../apis';
import { PercentInfoProps } from '../../interfaces/data';
import { PercentContainer } from '../../components/data/percent-info';
import { removeDuplicateObjects } from '../../helpers/data';


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
    const [onAverageIndicator, setOnAverageIndicator] = useState(0);
    const [indicators, setIndicators] = useState<PercentInfoProps[]>([]);
    const { elementId, regionCode, year } = sectionState;

    useEffect(() => {
        // ---------------------------------------------------------------------------------------------------
        // To get indicators data
        // ---------------------------------------------------------------------------------------------------
        centralApi.get('api/v1/data/value/rice_surface_context/VALUE/WLRD/1101/27/2020').then((response) => {
            // console.log(response.data)
            setOnAverageIndicator( response.data );
        })
        centralApi.get('api/v1/data/value/rice_surface_context/VALUE/WLRD/1201/27/2020').then((response) => {
            const percent = response.data * 100;
            console.log(percent)
            const indicatorObject: PercentInfoProps = {
                label: 'of the total cropland area',
                percent
            }
            setIndicators( indicators => [...indicators, indicatorObject] );
        })
        centralApi.get('api/v1/data/value/rice_surface_context/VALUE/WLRD/1202/27/2020').then((response) => {
            const percent2 = response.data * 100;
            const indicatorObject2: PercentInfoProps = {
                label: 'of the total cereal area',
                percent: percent2
            }
            setIndicators( indicators => [...indicators, indicatorObject2] );
        })
        const arr = removeDuplicateObjects(indicators)
        setIndicators(arr)
        // console.log(arr)
    }, [])
    
    
    
    // console.log(indicators)

    const podiumConfig = [
        {
            url: `https://cropobs-central.ciat.cgiar.org/api/v1/data/podium/${regionCode}/1103/176/${year}`,
            text: `Ìn ${year}, crop was the fastest-growing crop in production in relation to ${year - 1}`,
            name: 'Production'
        },
        {
            url: `https://cropobs-central.ciat.cgiar.org/api/v1/data/podium/${regionCode}/1101/176/${year}`,
            text: `Ìn ${year}, crop was the fastest-growing crop in area in relation to ${year - 1}`,
            name: 'Area'
        },
        {
            url: `https://cropobs-central.ciat.cgiar.org/api/v1/data/podium/${regionCode}/1102/176/${year}`,
            text: `Ìn ${year}, crop was the fastest-growing crop in yield in relation to ${year - 1}`,
            name: 'Yield'
        },
    ]

    const podiumConfigSurface = [
        {
            url: `https://cropobs-central.ciat.cgiar.org/api/v1/data/podium/WLRD/5412/27/2020`,
            text: `Rice was the 3° most important crop in relation to harvested area (ranking) in year 2020 to ${2020 - 1}`,
            name: 'Surface'
        },
        // {
        //     url: `https://cropobs-central.ciat.cgiar.org/api/v1/data/podium/${regionCode}/1101/176/${year}`,
        //     text: `Ìn 2020, crop was the fastest-growing crop in area in relation to ${year - 1}`,
        //     name: 'Area'
        // },
        // {
        //     url: `https://cropobs-central.ciat.cgiar.org/api/v1/data/podium/${regionCode}/1102/176/2020`,
        //     text: `Ìn 2020, crop was the fastest-growing crop in yield in relation to ${year - 1}`,
        //     name: 'Yield'
        // },
    ]

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
                                <Col xs={ 12 } xl={ 6 } style={{ height: '80vh', border: '1px black solid', overflow: 'auto' }}>
                                    {/* <LineChartjs dataURL={`https://cropobs-central.ciat.cgiar.org/api/v1/chart/default/beans_production/${regionCode}?elementIds=[5510,5312,1000]&cropIds=[176]`} options={harvested_production_yield} config={{key: 'id_element', name:'id_element'}} chartID='prod1' chartConf={{fill: true, pointRadius: 1, yAxisID: 'y'}} orderList={{1000:0, 5510:1, 5312:2}}/> */}
                                    <PodiumSelection podiumsList={podiumConfigSurface} showSelect={ false }/>
                                    <p style={{ textAlign: 'center' }}>	On average, rice was the { onAverageIndicator }° crop to growth the most in the last decade</p>
                                    <p style={{ textAlign: 'center' }}>In 2020, harvested rice area accounted for:</p>
                                    <PercentContainer data={ indicators } percentAlone={ false } />
                                    <PlotlyChartStackedAreaContainer fetchDataUrl='api/v1/chart/default/rice_surface_context/WLRD?elementIds=[5312]&cropIds=[27,98002,97001,96001,95001,94001,93001,99001]' cropNameToFind='Rice, paddy' secondCropName='Cereals excl.rice' stackedAreaTitle='Stacked area' stackedAreaNormalizedTitle='Stacked area normalized' namesArr={['By value', 'By share']} />
                                    <PlotlyChartStackedAreaContainer fetchDataUrl='api/v1/chart/default/rice_surface_context/WLRD?elementIds=[5312]&cropIds=[27,15,44,56,71,75,79,83,89,92,94,97,101,103,108]' cropNameToFind='Rice, paddy' secondCropName='Cereals excl.rice' stackedAreaTitle='Stacked area' stackedAreaNormalizedTitle='Stacked area normalized' namesArr={['By value', 'By share']} />
                                    {/* <ChartSelection chartConfigList={chartConfig} /> */}
                                    {/* <PodiumWithLink text='Lorem ipsum' dataURL='http://cropobscentral.test/api/v1/data/podium/WLRD/5412/27/2020' textAlignCenter={ true } /> */}
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