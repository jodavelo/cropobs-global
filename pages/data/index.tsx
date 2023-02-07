import React from 'react'
import { GetStaticProps, NextPage } from 'next';
import { Col, Container, Row } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import 'bootstrap/dist/css/bootstrap.min.css';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { Layout } from '../../components/layouts'
import { MainBar, MapView, SidebarComponent } from '../../components/ui';

import { v4 as uuidv4 } from 'uuid';

import styles from './data.module.css';
import { DataPodium, PlotlyChartComponent, Podium } from '../../components/data';

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
                                    {/* <Podium data={ data }/>
                                    <PlotlyChartComponent/> */}
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
            ...( await serverSideTranslations( locale!, ['data'] ) )
        }
    }
}

export default DataPage