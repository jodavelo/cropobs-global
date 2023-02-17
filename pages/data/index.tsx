import React, { useState } from 'react'
import { GetStaticProps, NextPage } from 'next';
import { Button, Col, Container, Row } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import 'bootstrap/dist/css/bootstrap.min.css';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { Layout } from '../../components/layouts'
import { MainBar, MapView, SidebarComponent } from '../../components/ui';

import { v4 as uuidv4 } from 'uuid';

import styles from './data.module.css';
import { DataPodium, PlotlyChartStackedArea, Podium, ToggleDescription } from '../../components/data';
import { buildPlotStackedAreaObject, getYearsPlotlyChart } from '../../helpers/data';
import { datasetGenerator } from '../../helpers/data/chartJsHelper';
import { LineChartjs } from '../../components/data/chartjs-charts/LineChartjs';

import { annual_growth_options } from '../../helpers/data/chartjs-options/annual-growth';
import { ChartSelection } from '../../components/data/charts/ChartSelection';
import { ten_year_moving_average_options } from '../../helpers/data/chartjs-options/10-year-moving-average';

const fetcher = (url: string) => fetch(url).then((res) => res.json());


const DataPage: NextPage<{ data: Record<string, any> }> = ({ data }) => {

    const { t: dataTranslate } = useTranslation('data');
    const datasets = datasetGenerator(data.observations, data.labels, 'id_element', 'crop_name');
    const datax = {labels: data.labels, datasets};
    console.log(datax);
    // const [open, setOpen] = useState(false);
    // const [open2, setOpen2] = useState(false);
    //const { labels, observations } = data.data;
    // buildPlotStackedAreaObject(observations, labels);
    

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
                                <Col xs={ 12 } xl={ 6 } style={{ height: '80vh', border: '1px black solid' }}>
                                    <ChartSelection dataArr={[datax, datax]} optionsArr={[annual_growth_options, ten_year_moving_average_options]} namesArr={['Annual Growth', '10-day moving average']}/>
                                    {/* <LineChartjs options={annual_growth_options} data={datax}/> */}
                                    {/* <Podium data={ data }/> */}
                                    {/* <Button onClick={ () => setOpen(!open) } >Ok</Button>
                                    <ToggleDescription isOpen={ open } text='Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque dapibus, massa nec auctor aliquet, urna ex tristique ante, ac tempus quam dui et metus. Proin finibus venenatis nisl, ut egestas dui consequat id. Fusce consequat hendrerit ornare. Aliquam id imperdiet libero. Cras sodales blandit urna ac pellentesque. Nullam venenatis neque nibh, sit amet commodo mauris tincidunt nec. Curabitur maximus a nisl a pretium. Proin iaculis, erat id rhoncus pulvinar,' /> */}
                                    {/* <PlotlyChartStackedArea/> */}
                                    {/* <Button onClick={ () => setOpen2(!open2) } >Ok</Button>
                                    <ToggleDescription isOpen={ open2 } text='Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque dapibus, massa nec auctor aliquet, urna ex tristique ante, ac tempus quam dui et metus. Proin finibus venenatis nisl, ut egestas dui consequat id. Fusce consequat hendrerit ornare. Aliquam id imperdiet libero. Cras sodales blandit urna ac pellentesque. Nullam venenatis neque nibh, sit amet commodo mauris tincidunt nec. Curabitur maximus a nisl a pretium. Proin iaculis, erat id rhoncus pulvinar,' /> */}
                                    
                                </Col>
                            </Row>
                            
                        </Container>
                    </Col>
                </Row>
            </Container>
            
            {/* <h1>{ dataTranslate('title-page') }</h1> */}   
        </Layout>
    )
}

export const getStaticProps: GetStaticProps = async ({ locale }) => {
    const dataw = await fetcher('http://localhost:3000/api/dummy');
    return {
        props: {
            // ...( await serverSideTranslations( locale!, ['common'] ) ),
            ...( await serverSideTranslations( locale!, ['data'] ) ),
            data: JSON.parse(dataw).data
        }
    }
}

export default DataPage