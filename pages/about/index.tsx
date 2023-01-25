import React from 'react'
import { GetStaticProps, NextPage } from 'next';
import 'bootstrap/dist/css/bootstrap.min.css';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'react-i18next';
import { Layout } from '../../components/layouts'
import { Col, Container, Row } from 'react-bootstrap';

import styles from './about.module.css';

const AboutPage: NextPage = () => {

    const { t: dataTranslate } = useTranslation('about');

    return (
        <Layout title="Data">
            {/* <h1>{ dataTranslate('about-title') }</h1> */}
            <div className={ styles['container-x'] }>
            <Container>
                <Row>
                    <Col sm={ 12 } style={{ width: '100%', height: '200px', backgroundColor: 'black' }}>Content 1</Col>
                    <Col sm={ 12 } style={{ width: '100%', height: '200px', backgroundColor: 'blue' }}>Content 2</Col>
                </Row>
            </Container>
            </div>
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

export default AboutPage