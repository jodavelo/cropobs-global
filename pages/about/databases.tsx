import React, { useState, useEffect } from 'react'
import { GetStaticProps, NextPage } from 'next';
import 'bootstrap/dist/css/bootstrap.min.css';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'react-i18next';
import { Layout } from '../../components/layouts'
import { Col, Container, Row } from 'react-bootstrap';

import styles from './about.module.css';
import { useWindowSize } from '../../hooks';

const DatabasesPage: NextPage = () => {

    const { t: dataTranslate } = useTranslation('about');
    return (
        <Layout title="Data">
            {/* <h1>{ dataTranslate('about-title') }</h1> */}
            <Container className={ styles['general-containers'] }>
                <Row className={ styles['general-containers'] }>
                    <Col xs={ 12 } md={ 8 } className={ styles.description }>
                        <h3 className={ styles['center-text'] }>Lorem ipsum</h3>
                        <p className={ styles['justify-text'] }>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in leo porttitor, laoreet dolor sit amet, iaculis purus. In hac habitasse platea dictumst. Nunc tempor sollicitudin nisi, et eleifend ligula pharetra quis. Vivamus rhoncus augue a nulla feugiat, ut accumsan eros sollicitudin. Suspendisse vulputate, turpis vel bibendum rutrum, dui felis maximus erat, at luctus nisl odio ut lectus. Mauris quis justo libero. Ut eleifend nec quam vel pellentesque. Vestibulum non tincidunt sem, sed eleifend nisl. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; In consectetur diam non sapien aliquet, ut cursus arcu dignissim. Vivamus iaculis ultrices mollis. Etiam molestie pharetra faucibus. Fusce non ornare orci. Etiam id orci quis urna ullamcorper viverra. Vivamus fringilla ipsum et tellus fermentum commodo.</p>
                    </Col>
                    <Col xs={ 12 } md={ 4 } className={ styles.credits }>
                    <h3 className={ styles['center-text'] }>Lorem ipsum</h3>
                        <p className={ styles['justify-text'] }>Duis sed ultrices dui, lobortis ullamcorper turpis. Duis interdum, quam at blandit dapibus, nisl lectus lobortis sapien, id volutpat ante libero ac purus. Nullam sit amet velit in erat pharetra posuere sit amet vitae mi. Aliquam lobortis sapien sed tortor feugiat, nec pellentesque libero dignissim. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque pretium, libero non dignissim bibendum, neque erat sagittis tortor, at cursus odio metus eget arcu.</p>
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