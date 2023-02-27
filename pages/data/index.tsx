import React, { useState } from 'react'
import { GetStaticProps, NextPage } from 'next';
import { Col, Container, Row } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import 'bootstrap/dist/css/bootstrap.min.css';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { Layout } from '../../components/layouts'
import { MainBar, MapView, SidebarComponent } from '../../components/ui';

import { v4 as uuidv4 } from 'uuid';

import styles from './data.module.css';
import { DataPodium, PlotlyChartStackedAreaContainer } from '../../components/data';

import { annual_growth_options } from '../../helpers/data/chartjs-options';
import { ChartSelection } from '../../components/data/charts/ChartSelection';
import { ten_year_moving_average_options } from '../../helpers/data/chartjs-options';
import { PercentInfoProps } from '../../interfaces/data';

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

const items: PercentInfoProps[] = [
  {
      percent: 1.25,
      label: 'lorem ipsum',
      secondaryLabel: 'something for to whow'
  },
//   {
//       percent: 1.25,
//       label: 'lorem ipsum',
//       secondaryLabel: 'something for to whow'
//   },
  // {
  //   percent: 1.25,
  //   label: 'lorem ipsum'
  // },
  // {
  //   percent: 1.25,
  //   label: 'lorem ipsum'
  // },
]
const DataPage: NextPage = () => {

    const { t: dataTranslate } = useTranslation('data');
    const [open, setOpen] = useState(false);
    // const [open2, setOpen2] = useState(false);
    
    // const observationsAPI: Observation[] = observations;
    // const labelsAPI: number[] = labels;
    
    //
    // 

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
                                    <PlotlyChartStackedAreaContainer fetchDataUrl='api/v1/chart/default/beans_surface_context/WLRD?elementIds=[5312]&cropIds=[176,96002,98001,97001,95001,94001,93001,99001]' cropNameToFind='Beans, dry' secondCropName='Pulses excl. Beans' stackedAreaTitle='Stacked area' stackedAreaNormalizedTitle='Stacked area normalized' namesArr={['By value', 'By share']} />
                                    {/* <LineChartjs dataURL={'http://192.168.0.181:3000/api/dummy'} options={annual_growth_options}/> */}
                                    {/* <ChartSelection dataURLArr={['https://commonbeanobservatorytst.ciat.cgiar.org/api/v1/chart/default/beans_production/WLRD?elementIds=[1001,1002,1003]&cropIds=[176]', 'https://commonbeanobservatorytst.ciat.cgiar.org/api/v1/chart/default/beans_production/WLRD?elementIds=[1007,1008,1009]&cropIds=[176]']} optionsArr={[annual_growth_options, ten_year_moving_average_options]} configArr={[{key: 'id_element', name:'id_element'}, {key: 'id_element', name:'id_element'}]} namesArr={['Annual Growth', '10-day moving average']}/> */}
                                    {/* <LineChartjs options={annual_growth_options} data={datax}/> */}
                                    {/* <Podium data={ data }/> */}
                                    {/* <Button onClick={ () => setOpen(!open) } >Ok</Button>
                                    <ToggleDescription isOpen={ open } text='Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque dapibus, massa nec auctor aliquet, urna ex tristique ante, ac tempus quam dui et metus. Proin finibus venenatis nisl, ut egestas dui consequat id. Fusce consequat hendrerit ornare. Aliquam id imperdiet libero. Cras sodales blandit urna ac pellentesque. Nullam venenatis neque nibh, sit amet commodo mauris tincidunt nec. Curabitur maximus a nisl a pretium. Proin iaculis, erat id rhoncus pulvinar,' /> */}
                                    {/* <PlotlyChartStackedArea/> */}
                                    {/* <Podium data={ data }/> */}
                                    {/* <Button onClick={ () => setOpen(!open) } >Ok</Button> */}
                                    {/* <ToggleDescription isOpen={ open } text='Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque dapibus, massa nec auctor aliquet, urna ex tristique ante, ac tempus quam dui et metus. Proin finibus venenatis nisl, ut egestas dui consequat id. Fusce consequat hendrerit ornare. Aliquam id imperdiet libero. Cras sodales blandit urna ac pellentesque. Nullam venenatis neque nibh, sit amet commodo mauris tincidunt nec. Curabitur maximus a nisl a pretium. Proin iaculis, erat id rhoncus pulvinar,' /> */}
                                    
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
    // const dataw = await fetcher('http://localhost:3000/api/dummy');
    return {
        props: {
            // ...( await serverSideTranslations( locale!, ['common'] ) ),
            ...( await serverSideTranslations( locale!, ['data'] ) ),
        }
    }
}

export default DataPage