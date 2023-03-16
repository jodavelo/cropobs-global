import { useState, useEffect, useContext } from 'react'
import { GetStaticProps, NextPage } from 'next';
import { Col, Container, Row } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import 'bootstrap/dist/css/bootstrap.min.css';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { Layout } from '../../components/layouts'
import { MainBar, MapView, SidebarComponent } from '../../components/ui';
import { v4 as uuidv4 } from 'uuid';
import Select from 'react-select';
import styles from './data.module.css';
import {PlotlyChartBox } from '../../components/data';
import { PlotlyChartLine } from '../../components/data';
import axios from 'axios';


interface OptionType {
    value: number;
    label: string;
  }

  interface filterPriceState {
    id_price_type: number;
}


const DataPage: NextPage = () => {
    const { t: dataTranslate } = useTranslation('data');
    const [ filterPriceState, setFilterPriceState ] = useState<filterPriceState>({
        id_price_type: 300050,
    });
    const { id_price_type } = filterPriceState;

    const [priceFilter, setPriceFilter] = useState(300051);
    const[priceData, setPriceData] = useState([]);
    
    
    const filterOptions: OptionType[] = [
        { label: 'Wholesale Price', value: 300050 },
        { label: 'Consumer Price', value: 300051 },
        { label: 'Producer Price', value: 300052 },
      ];
   

      const handleSelect = (e)=> { 
        getPriceData(e.value);
        setPriceFilter(e.value);
    }
  
  
    const getPriceData = (id_price_type: any) => {
        axios.get(`https://cassavalighthouse.org/api/v1/geojson/admin2/prices/Nals/${id_price_type}`)
            .then(res=>{setPriceData( res.data.data.geo_points)})
    }


    const getTitle = () => {
        // logic to determine the title based on priceFilter
        if (priceFilter === 300052) {
          return 'Producer Price';
        } else if (priceFilter === 300051) {
          return 'Consumer Price';
        } else {
          return 'Wholesale price';
        }
      }

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
                                {/* <Select options={filterOptions} value={filterOptions.filter(option => option.value=== priceFilter)} onChange={(e) =>  handleSelect(e)}/>  */}
                                    <MapView ></MapView>
                                </Col>
                                <Col xs={ 12 } xl={ 6 } style={{ height: '80vh', border: '1px black solid', overflow: 'auto' }}>
                                 
                                    <PlotlyChartBox dataURL={`https://cassavalighthouse.org/api/v1/charts/prices/national/boxplot/${id_price_type}?id_country=174&id_geo_point=7847`} title={getTitle()}/>
                                    <PlotlyChartLine dataURL={`https://cassavalighthouse.org/api/v1/charts/prices/national/line/${id_price_type}?id_country=174&id_geo_point=7847`} title={getTitle()}/>
                                </Col>
                            </Row>                            
                        </Container>
                    </Col>
                </Row>
            </Container>
        </Layout>
    )
}

export const getStaticProps: GetStaticProps = async ({ locale }) => {
    return {
        props: {
            ...( await serverSideTranslations( locale!, ['data'] ) ),
        }
    }
}

export default DataPage