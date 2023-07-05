import React, { useState, useEffect } from 'react'
import { GetStaticProps, NextPage } from 'next';
import 'bootstrap/dist/css/bootstrap.min.css';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'react-i18next';
import { Layout } from '../../components/layouts'
import { Button, Col, Container, Row } from 'react-bootstrap';

import styles from './databases.module.css';
import { useWindowSize } from '../../hooks';
import { GenericMapView } from '../../components/ui/map/generic';
import { GenericCard } from '../../components/ui/cards';
import { v4 as uuidv4 } from 'uuid';
import { MainBar } from '../../components/ui';
import { BackButton } from '../../components/data/back-button';
import useSWR from 'swr';
import { dataFetcher } from '../../helpers/data';
import { useRouter } from 'next/router';
import { IconButton } from '@mui/material';
import ReplayIcon from '@mui/icons-material/Replay';

export interface DatabaseInfo {
    imageUrl: string;
    title: string;
    description: string;
    btntext: string;
    link: string;
}

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

interface SectionState {
    countryName: string;
    countryNameEs: string;
    iso3: string;
}

const DatabasesPage: NextPage = () => {

    const baseURL = 'http://cropobscentral.test';
    const { locale } = useRouter();

    const { t: dataTranslate } = useTranslation('about');

    const polygonColors = { fill: 'rgba(167, 167, 167, 0.4)', outline: '#717171' };
    const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
    const [resetMap, setResetMap] = useState(false);

    const [iso3Selected, setIso3Selected] = useState<string | null>('WLRD');
    const [idCrop1, setIdCrop1] = useState('2');

    const [dataCards, setDataCards] = useState<DatabaseInfo[]>([])

    const { data: databases, isLoading: isLoadingDataBases } = useSWR(`${baseURL}/api/v1/external_databases/${ idCrop1 }/${ iso3Selected }`, dataFetcher);

    const [locationName, setLocationName] = useState('');
    const [sectionState, setsectionState] = useState<SectionState>({
        countryName: "World",
        countryNameEs: "Mundo",
        iso3: "WLRD"
    })

    const handleResetMap = () => {
        //("Back button clicked!"); // Esta línea es solo para depuración
        setSelectedCountry(null);
        setResetMap( true );
        setIso3Selected('WLRD');
        setsectionState({
            countryName: "World",
            countryNameEs: "Mundo",
            iso3: "WLRD"
        });
    };

    const handleMapClick = (id: string, iso3: string, countryName: string, countryNameEs: string) => {
        ////(`Polígono clickeado: id=${id}, iso3=${iso3}, countryName = ${ countryName }, countryNameEs = ${ countryNameEs }`);
        setSelectedCountry(iso3);
        setIso3Selected( iso3 );
        setsectionState({
            countryName: countryName,
            countryNameEs: countryNameEs,
            iso3: iso3
        });
        setResetMap( false );
        // setIso3Selected( 'WLRD' ); 
    };

    useEffect(() => {
        if( iso3Selected === 'WLRD' ) {
            setIdCrop1( '2' );
        }
        else setIdCrop1( '27' );
        // //({databases, sectionState})
        if (!isLoadingDataBases && databases) {
            const newDataCards = databases.map((database: any) => ({
                imageUrl: database.URL_LOGO,
                title: database.SOURCE,
                link: database.URL_SOURCE,
                description: locale === 'es' ? database.DESCRIPTION_ES : locale === 'pt' ? database.DESCRIPTION_PT : database.DESCRIPTION_EN,
                btntext: 'Url'
            }));
    
            setDataCards(newDataCards);
        }
        if( locale == 'en' ) setLocationName( sectionState.countryName );
        else if( locale == 'es' )setLocationName( sectionState.countryNameEs );
        else if( locale == 'pt' )setLocationName( sectionState.countryNameEs );
    }, [isLoadingDataBases, iso3Selected]);

    useEffect(() => {
        if (!isLoadingDataBases && databases) {
            console.log( {databases, dataCards} )
            const newDataCards = databases.map((database: any) => ({
                imageUrl: database.URL_LOGO,
                title: database.SOURCE,
                link: database.URL_SOURCE,
                description: locale === 'es' ? database.DESCRIPTION_ES : locale === 'pt' ? database.DESCRIPTION_PT : database.DESCRIPTION_EN,
                btntext: 'Url'
            }));
    
            setDataCards(newDataCards);
        }
        if( locale == 'en' ) setLocationName( sectionState.countryName );
        else if( locale == 'es' )setLocationName( sectionState.countryNameEs );
        else if( locale == 'pt' )setLocationName( sectionState.countryNameEs );
    }, [locale, resetMap])    

    // useEffect(() => {
    //     //('==============================', {iso3Selected})
    //     if (!isLoadingDataBases && databases) {
    //         const newDataCards = databases.map((database: any) => ({
    //             imageUrl: database.URL_LOGO,
    //             title: database.SOURCE,
    //             link: database.URL_SOURCE,
    //             description: locale === 'es' ? database.DESCRIPTION_ES : locale === 'pt' ? database.DESCRIPTION_PT : database.DESCRIPTION_EN,
    //             btntext: 'Url'
    //         }));
    
    //         setDataCards(newDataCards);
    //     }
    // }, [iso3Selected])
    
    const [titleText, setTitleText] = useState('');
    const [text1, setText1] = useState('');
    const [text2, setText2] = useState('');
    useEffect(() => {
        setTitleText(dataTranslate('title')!);
        setText1(dataTranslate('text1')!);
        setText2(dataTranslate('text2')!);
    })
    

    return (
        <Layout title="Databases">
            {/* <h1>{ dataTranslate('about-title') }</h1> */}
            <Container fluid>
                <Row>
                    <Col xs={ 12 }>
                        <Row className={ styles['databases-section-description'] }>
                            <Col xs={ 12 }  >
                                <div className={ styles['databases-section-description-content'] }>
                                    <h2 className={ styles['title-description'] }>{ titleText }</h2>
                                    <p className={ styles['description-center'] }>{ text1 }</p>
                                    <p className={ styles['description-center'] }>{ text2 }</p>
                                </div>
                            </Col>
                        </Row>
                        <Row className={ styles['padding-left-subcontainers'] }>
                            <Col xs={ 12 } className={ `${ styles['no-margin'] } ${ styles['no-padding'] }` }>
                                <MainBar key={ uuidv4() } section={` ${ locationName } `} >
                                    {/* <Button onClick={handleResetMap}>Back</Button> */}
                                    {
                                        !resetMap ? (
                                            <IconButton id='back-button' style={{color: 'white'}} onClick={handleResetMap} >
                                                <ReplayIcon/>
                                            </IconButton>
                                        ) : <></>
                                    }
                                    
                                        {/* <BackButton regionCode={regionCode} countryCode={ locationNameOptions.isoLabel } setSectionState={setSectionState} setCountryCode2={ setCountryCode2 } setClickId={ setClickId } setLocationNames={ setLocationNameOptions } clickId={ clickId } locale={ locale ?? 'en'}/> */}
                                </MainBar>
                            </Col>
                        </Row>
                        <Row className={ styles['map-and-cards-container'] }>
                            <Col xs={ 12 } lg={ 7 } className={ styles['map-container'] }>
                                <GenericMapView 
                                    divContainer='databases-map' 
                                    geoJsonUrl='https://oeactest.ciat.cgiar.org/api/v1/geojson/countries'
                                    onMapClick={handleMapClick} 
                                    polygonColors={polygonColors}
                                    onReset={ resetMap }
                                 />
                            </Col>
                            <Col xs={ 12 } lg={ 5 } className={ styles['grid-layout-cards'] }>
                                <Row>
                                    { 
                                        dataCards.map(item => (
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