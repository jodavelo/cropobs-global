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

const DatabasesPage: NextPage = () => {

    const { t: dataTranslate } = useTranslation('about');
    return (
        <Layout title="Databases">
            {/* <h1>{ dataTranslate('about-title') }</h1> */}
            <Container fluid>
                <Row>
                    <Col xs={ 12 }>
                        <Row>
                            <Col xs={ 12 } className={ styles['databases-section-description'] } >
                                <div className={ styles['databases-section-description-content'] }>
                                    <h2 className={ styles['title-description'] }>Title</h2>
                                    <p className={ styles['description-center'] }>Lorem ipsum dolor sit amet consectetur adipisicing elit. Non unde voluptatum ipsum in officiis! Iusto explicabo accusantium aperiam molestiae nihil odit eligendi sit itaque ipsam! Nesciunt soluta quibusdam voluptates necessitatibus?</p>
                                    <p className={ styles['description-center'] }>Lorem ipsum dolor sit amet consectetur adipisicing elit. Non unde voluptatum ipsum in officiis! Iusto explicabo accusantium aperiam molestiae nihil odit eligendi sit itaque ipsam! Nesciunt soluta quibusdam voluptates necessitatibus?</p>
                                </div>
                            </Col>
                        </Row>
                        <Row>
                            <Col xs={ 12 } lg={ 7 } className={ styles['map-container'] }>
                                <GenericMapView divContainer='databases-map' geoJsonUrl='https://oeactest.ciat.cgiar.org/api/v1/geojson/countries' />
                            </Col>
                            <Col xs={ 12 } lg={ 5 } className={ styles['grid-layout-cards'] }></Col>
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