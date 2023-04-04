import React, { useState, useEffect } from 'react'
import { GetStaticProps, NextPage } from 'next';
import 'bootstrap/dist/css/bootstrap.min.css';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'react-i18next';
import { Layout } from '../../components/layouts'
import { Col, Container, Row } from 'react-bootstrap';

import styles from './databases.module.css';
import { useWindowSize } from '../../hooks';
import { GenericMapView } from '../../components/ui/map/generic';
import { GenericCard } from '../../components/ui/cards';
import { v4 as uuidv4 } from 'uuid';

const items = [
    {
        imageUrl: 'https://www.fao.org/faostat/en/src/images/logo/FAO-logo-en-w.svg', 
        title: 'FAOSTAT',
        description: 'Indicadores de agricultura a nivel mundial',
        btntext: 'Url',
        link: ' https://www.fao.org/faostat/en/#home',
    },
    {
        imageUrl: 'https://www.fao.org/faostat/en/src/images/logo/FAO-logo-en-w.svg', 
        title: 'FAOSTAT',
        description: 'Indicadores de agricultura a nivel mundial',
        btntext: 'Url',
        link: ' https://www.fao.org/faostat/en/#home',
    },
    {
        imageUrl: 'https://www.fao.org/faostat/en/src/images/logo/FAO-logo-en-w.svg', 
        title: 'FAOSTAT',
        description: 'Indicadores de agricultura a nivel mundial',
        btntext: 'Url',
        link: ' https://www.fao.org/faostat/en/#home',
    },
    {
        imageUrl: 'https://www.fao.org/faostat/en/src/images/logo/FAO-logo-en-w.svg', 
        title: 'FAOSTAT',
        description: 'Indicadores de agricultura a nivel mundial',
        btntext: 'Url',
        link: ' https://www.fao.org/faostat/en/#home',
    },
    {
        imageUrl: 'https://www.fao.org/faostat/en/src/images/logo/FAO-logo-en-w.svg', 
        title: 'FAOSTAT',
        description: 'Indicadores de agricultura a nivel mundial',
        btntext: 'Url',
        link: ' https://www.fao.org/faostat/en/#home',
    },
    {
        imageUrl: 'https://www.fao.org/faostat/en/src/images/logo/FAO-logo-en-w.svg', 
        title: 'FAOSTAT',
        description: 'Indicadores de agricultura a nivel mundial',
        btntext: 'Url',
        link: ' https://www.fao.org/faostat/en/#home',
    },
]

const DatabasesPage: NextPage = () => {

    const { t: dataTranslate } = useTranslation('about');
    return (
        <Layout title="Databases">
            {/* <h1>{ dataTranslate('about-title') }</h1> */}
            <Container fluid>
                <Row>
                    <Col xs={ 12 }>
                        <Row className={ styles['databases-section-description'] }>
                            <Col xs={ 12 }  >
                                <div className={ styles['databases-section-description-content'] }>
                                    <h2 className={ styles['title-description'] }>Title</h2>
                                    <p className={ styles['description-center'] }>Lorem ipsum dolor sit amet consectetur adipisicing elit. Non unde voluptatum ipsum in officiis! Iusto explicabo accusantium aperiam molestiae nihil odit eligendi sit itaque ipsam! Nesciunt soluta quibusdam voluptates necessitatibus?</p>
                                    <p className={ styles['description-center'] }>Lorem ipsum dolor sit amet consectetur adipisicing elit. Non unde voluptatum ipsum in officiis! Iusto explicabo accusantium aperiam molestiae nihil odit eligendi sit itaque ipsam! Nesciunt soluta quibusdam voluptates necessitatibus?</p>
                                </div>
                            </Col>
                        </Row>
                        <Row className={ styles['map-and-cards-container'] }>
                            <Col xs={ 12 } lg={ 7 } className={ styles['map-container'] }>
                                <GenericMapView divContainer='databases-map' geoJsonUrl='https://oeactest.ciat.cgiar.org/api/v1/geojson/countries' />
                            </Col>
                            <Col xs={ 12 } lg={ 5 } className={ styles['grid-layout-cards'] }>
                                <Row>
                                    { 
                                        items.map(item => (
                                            <Col xs={ 12 } lg={ 6 } key={ uuidv4() }>
                                                <GenericCard 
                                                    imageUrl={ item.imageUrl } 
                                                    description={ item.description } 
                                                    btntext={ item.btntext }  
                                                    link={ item.link }
                                                    title={ item.title }
                                                    key={ uuidv4() }
                                                />
                                                <br />
                                            </Col> 
                                        ))
                                    }
                                    {/* <Col xs={ 6 }>
                                        <GenericCard/>
                                    </Col>

                                    <Col xs={ 6 }>
                                        <GenericCard/>
                                    </Col>

                                    //   
                                     */}
                                </Row>

                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Container>
        </Layout>
    )
}

export const getStaticProps: GetStaticProps = async ({ locale }) => {
    return {
        props: {
            // ...( await serverSideTranslations( locale!, ['common'] ) ),
            ...( await serverSideTranslations( locale!, ['about'] ) )
        }
    }
}

export default DatabasesPage