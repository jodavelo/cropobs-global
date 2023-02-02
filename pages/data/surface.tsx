
import { GetStaticProps, NextPage } from 'next'
import { Col, Container, Row } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

import styles from './data.module.css';
import { SidebarComponent } from '../../components/ui';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { Layout } from '../../components/layouts';

const SurfaceContextPage: NextPage = () => {
    // const { t: dataTranslate } = useTranslation('data');
  
    return (
        <Layout title=''>
            <Container fluid>
                <Row>
                    <Col xs={ 12 } lg={ 3 } xl={ 2 } className={ styles.sidebar }>
                        <SidebarComponent/>
                    </Col>
                    <Col xs={ 12 } lg={ 9 } xl={ 10 } className={ styles['content-data'] }></Col>
                </Row>
            </Container>
            
            {/* <h1>{ dataTranslate('title-page') }</h1> */}
        </Layout>
    )
}

// export const getStaticProps: GetStaticProps = async ({ locale }) => {
//     return {
//         props: {
//             // ...( await serverSideTranslations( locale!, ['common'] ) ),
//             ...( await serverSideTranslations( locale!, ['data'] ) )
//         }
//     }
// }
export default SurfaceContextPage