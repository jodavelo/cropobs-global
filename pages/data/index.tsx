import React, { useState, useContext, useEffect } from 'react'
import { GetStaticProps, NextPage } from 'next';
import { Col, Container, Row, Button } from 'react-bootstrap';
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
import { geojsonApi } from '../../apis/geojsonApi';
import { LeftSideMenuContext, LeftSideMenuProvider } from '../../context/map/leftsidemenu';
import { LeftSideMenuContainer, TopSideMenuContainer } from '../../components/ui/map/filters';
import { useWindowSize } from '../../hooks';
import { MapContext } from '../../context/map';

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
    
  let [prodJson, setProdJson] = useState([]);
  let [harvJson, setHarvJson] = useState([]);
  let [yieldJson, setYieldJson] = useState([]);
  let [xlabels, setXlabels] = useState([]);
  let [showModal, setShowModal] = useState(false);
  let [open, setOpen] = useState(false);

//   useEffect(() => {
//     GetChartData(setXlabels,setProdJson,setHarvJson,setYieldJson)
//   }, []);

  const x_labels = xlabels;
  const prod_data = prodJson.map((datum: any) => datum.value);
  const area_data = harvJson.map((datum: any) => datum.value);
  const yield_data = yieldJson.map((datum: any) => datum.value);
  const { t: dataTranslate } = useTranslation('data');

    console.log({ buttonBoth, buttonGraphs, buttonMap })
    return (
        <Layout title={ dataTranslate('title-header') }>
            
            <Container fluid>
                <Row>
                  <Button className={styles["toggle-dropdown"]}   onClick={() => setOpen(!open)} aria-controls="collapse-button" aria-expanded={open}>
                    <svg viewBox="0 0 448 512" width="100">
                    <path d="M16 132h416c8.837 0 16-7.163 16-16V76c0-8.837-7.163-16-16-16H16C7.163 60 0 67.163 0 76v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16z" />
                    </svg>
                  </Button>
                   <Col xs={ 12 } lg={ 3 } xl={ 2 } style={{width: open ? "60px" : ""}}   className={styles["sidebar"]}  id="collapse-button">
                        <SidebarComponent />
                    </Col>
                    
                    <Col xs={ 12 } lg={ 9 } xl={ 10 } className={ styles['content-data'] }>
                        <Container fluid className={ `${ styles['content-data'] } ${ styles['no-padding'] }` } >
                            <Row>
                               {/*  <Col xs={ 12 } className={ `${ styles['no-margin'] } ${ styles['no-padding'] }` }>
                                    <TabComponent></TabComponent>
                                </Col> */}

                                 <Col xs={ 12 } className={ `${ styles['no-margin'] } ${ styles['no-padding'] }` }>
                                    <MainBar key={ uuidv4() } section='Lorem ipsum dolor sit amet consectetur, adipisicing elit. Reiciendis quas quis quae accusantium vel' />
                                </Col>
                                
                            </Row>
                            <Row>
                                <LeftSideMenuContainer/>
                                
                                <Col xs={ 12 }  lg={ mapCol } style={ showMap ? { display: 'block', height: '80vh',  } : { display: 'none' } } className={ `${ styles['no-margin'] } ${ styles['no-padding'] }` }>
                                    <MapView >
                                        <TopSideMenuContainer/>
                                    </MapView>
                                </Col>
                               {/*  <Col xs={ 12 } xl={ 6 } style={{ height: '80vh', border: '1px black solid' }}>
                                  <Podium data={ data }></Podium>
                                  <PercentContainer ></PercentContainer>
                                </Col> */}
                                <Col xs={ 12 } lg={ graphsCol } style={ showGraphs ? { display: 'block', height: '80vh', border: '1px black solid' } : { display: 'none' } }>
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
                                    {/* <MultichartContainer xLabels={x_labels} dataProd={prod_data} dataHarv={area_data} dataYield={yield_data} setShowModal={setShowModal} setOpen= {setOpen}  open={open} />
                                    <ToggleDescription isOpen={ open } text='Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque dapibus, massa nec auctor aliquet, urna ex tristique ante, ac tempus quam dui et metus. Proin finibus venenatis nisl, ut egestas dui consequat id. Fusce consequat hendrerit ornare. Aliquam id imperdiet libero. Cras sodales blandit urna ac pellentesque. Nullam venenatis neque nibh, sit amet commodo mauris tincidunt nec. Curabitur maximus a nisl a pretium. Proin iaculis, erat id rhoncus pulvinar,' />
                                    {showModal ? (
                                      <div> <ModalForm dataJson={GenerateDataJson(x_labels,prod_data,area_data,yield_data)} setShowModal={setShowModal}/> </div>
                                    ) : null
                                    } */}
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
    // const data = await geojsonApi.get('api/v1/geojson/countries');
    // console.log(data.data)
    return {
        props: {
            // ...( await serverSideTranslations( locale!, ['common'] ) ),
            ...( await serverSideTranslations( locale!, ['data'] ) ),
        }
    }
}

export default DataPage