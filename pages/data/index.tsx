import React, { useState, useEffect } from 'react'
import { GetStaticProps, NextPage } from 'next';
import { Button, Col, Container, Row } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import 'bootstrap/dist/css/bootstrap.min.css';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { Layout } from '../../components/layouts'
import { MainBar, MapView, SidebarComponent } from '../../components/ui';

import { v4 as uuidv4 } from 'uuid';

import styles from './data.module.css';
import { DataPodium, PlotlyChartStackedArea, PlotlyChartStackedAreaNormalized, Podium, ToggleDescription, traceObject } from '../../components/data';
import { buildPlotStackedAreaObject, getYearsPlotlyChart } from '../../helpers/data';
import { Observation } from '../../interfaces/data/Helpers';
import { useFetch } from '../../hooks';
import { beansApi } from '../../apis';

const data: DataPodium[] = [
    {
        rank: 3,
        cropName: 'Crop 3', 
        urlIcon: 'https://commonbeanobservatorytst.ciat.cgiar.org/images/icons/100px/icon-crops-4.png',
        heightBar: '65%',
        heightTransparentBar: '35%',
        color:  'rgb(181, 181, 181)',
    },
    {
        rank: 1,
        cropName: 'Crop 1', 
        urlIcon: 'https://commonbeanobservatorytst.ciat.cgiar.org/images/icons/100px/icon-crops-4.png',
        heightBar: '100%',
        heightTransparentBar: '0%',
        color:  'rgb(181, 181, 181)',
    },
    
    {
        rank: 2,
        cropName: 'Crop 2', 
        urlIcon: 'https://commonbeanobservatorytst.ciat.cgiar.org/images/icons/100px/icon-crops-4.png',
        heightBar: '80%',
        heightTransparentBar: '20%',
        color:  'rgb(181, 181, 181)',
    }, 
    {
        rank: 4,
        cropName: 'Crop 4', 
        urlIcon: 'https://commonbeanobservatorytst.ciat.cgiar.org/images/icons/100px/icon-crops-4.png',
        heightBar: '40%',
        heightTransparentBar: '60%',
        color:  'rgb(181, 181, 181)',
    }
]

const DataPage: NextPage = () => {

    const { t: dataTranslate } = useTranslation('data');
    const [open, setOpen] = useState(false);
    // const [open2, setOpen2] = useState(false);
    const [traces, setTraces] = useState([]);
    const [stackedAreaTraces, setStackedAreaTraces] = useState([]);
    const [ticks, setTicks] = useState<number[]>([]);
    // const observationsAPI: Observation[] = observations;
    // const labelsAPI: number[] = labels;
    
    useEffect(() => {
      const algo = async() => {
        const response = await beansApi.get('api/v1/chart/default/beans_surface_context/WLRD?elementIds=[5312]&cropIds=[176,96002,98001,97001,95001,94001,93001,99001]');
        const { labels, observations } = response.data.data;
        //console.log({ labels, observations })
        const datasets = buildPlotStackedAreaObject(observations, labels, 'Beans, dry', 'Pulses excl. Beans');
        const { ticks } = getYearsPlotlyChart( labels );
        setTicks(ticks);
        let dataArr: any = [];
        let dataArrStckedArea: any = [];
        datasets.map(dataset => {
          //console.log(dataset.data)
          const { y , fillcolor, marker, name, stackgroup, groupnorm } = dataset;
          const trace: traceObject = {
            x: labels,
            y,
            fillcolor, 
            marker: {
                color: marker.color
            },
            name, 
            stackgroup, 
            groupnorm,
            hovertemplate: '%{y:,.2f}'
          }
          const stackedArea: traceObject = {
            x: labels,
            y,
            fillcolor, 
            marker: {
                color: marker.color
            },
            name, 
            stackgroup, 
            hovertemplate: '%{y:,.2f}'
          }
          dataArr.push(trace)
          dataArrStckedArea.push(stackedArea)
        });
        setTraces(dataArr);
        setStackedAreaTraces(dataArrStckedArea)
      }
      algo();
      
    }, [])
    
    

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
                                    <Podium data={ data }/>
                                    <Button onClick={ () => setOpen(!open) } >Ok</Button>
                                    <ToggleDescription isOpen={ open } text='Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque dapibus, massa nec auctor aliquet, urna ex tristique ante, ac tempus quam dui et metus. Proin finibus venenatis nisl, ut egestas dui consequat id. Fusce consequat hendrerit ornare. Aliquam id imperdiet libero. Cras sodales blandit urna ac pellentesque. Nullam venenatis neque nibh, sit amet commodo mauris tincidunt nec. Curabitur maximus a nisl a pretium. Proin iaculis, erat id rhoncus pulvinar,' />
                                    {/* <PlotlyChartStackedAreaNormalized title='aaa' ticks={ ticks } dataTraces={ traces } /> */}
                                    <PlotlyChartStackedArea dataTraces={ stackedAreaTraces } ticks={ ticks } title='Stacked 1' yAxisLabel='Area (ha)'/>
                                    {/* <PlotlyChartStackedArea dataTraces={ stackedAreaTraces } ticks={ ticks } title='Stacked 2' yAxisLabel='Area (ha) 2'/> */}
                                    {/* <SecondChart/> */}
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
    return {
        props: {
            // ...( await serverSideTranslations( locale!, ['common'] ) ),
            ...( await serverSideTranslations( locale!, ['data'] ) ),
        }
    }
}

export default DataPage