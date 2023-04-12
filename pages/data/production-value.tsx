import { useState, useEffect, useContext } from 'react'
import { GetStaticProps, NextPage } from 'next';
import { Button, Col, Container, Row } from 'react-bootstrap';
import { useTranslation } from 'next-i18next';
import 'bootstrap/dist/css/bootstrap.min.css';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { Layout } from '../../components/layouts'
import { MainBar, MapView, SidebarComponent } from '../../components/ui';

import { v4 as uuidv4 } from 'uuid';

import styles from './data.module.css';
import { PorcentagesBox, MultichartPV, ChartFrame, ChartSelectionPV, MapPV, PodiumWithLinkCon } from '../../components/data';
import { dataFetcher, datasetGeneratorPV, generateElementsOptions, generateOptionsFromObj, generateRegionOptions, generateYearsOptions, GetChartData2 } from '../../helpers/data';

import { annual_growth_optionsPV, ten_year_moving_average_optionsPV } from '../../helpers/data/chartjs-options';
import axios from 'axios';
import { LeftSideMenuContainer, MapSelect, TopSideMenuContainer } from '../../components/ui/map/filters';
import { useWindowSize } from '../../hooks';
import { LeftSideMenuContext } from '../../context/map/leftsidemenu';
import { MapContext } from '../../context/map';
import React from 'react';
import { sectionState } from '../../interfaces/data/section-states';
import { ElementsData, ElementsState, MacroRegionsData, MacroRegionsState, RegionsData, RegionsState, YearsData, YearsState } from '../../interfaces/data';
import { useTour } from '@reactour/tour';
import useSWR from 'swr';
import { getCookie, setCookie } from 'cookies-next';
import { general_data_steps } from '../../helpers/data/tour';
import { SearchCountryModal } from '../../components/data/search-country-modal';
import { BackButton } from '../../components/data/back-button';
import { SourcesComponent } from '../../components/ui/sources-component';

const mapFilterElements = [58, 1059, 1060];
const regionsElementId = {1201:1201, 1202:1202, 1060:1154, 1059:1153, 58:152, 5510:5510, 1000:1000, 5312:5312, 645:14, 6:6, 7:7};
const baseURL = 'https://commonbeanobservatorytst.ciat.cgiar.org';

interface PercentConfig {
    value: number
    text: string
}

interface PodiumConfig {
    url: string
    text: string
    description: string
}

interface ChartTxts {
    title: string
    axis_x: string
    axis_y: string
    datasets: string[]
}

interface ChartConfig {
    dataURL: Record<string, any>
    options: Record<string, any>
    config: Record<string, string>
    name: string
}

interface DataDocument {
    label : string,
    values: number[]
}

const PVPage: NextPage = () => {
    const { t: dataTranslate } = useTranslation('data-prod-val');
    const [ sectionState, setSectionState ] = useState<sectionState>({
        elementId: 58,
        regionCode: 'WLRD',
        macroRegionCode: '10',
        countryCode: 'WLRD',
        year: 2020,
        admin: 'World',
        locationName: 'World'
    });
    const { elementId, regionCode, macroRegionCode, countryCode, year, admin, locationName } = sectionState;
    const [elementsState, setElements] = useState<ElementsState>({
        elementsObj: {},
        elementsOptions: { values: [], names: []}
    });
    const { elementsObj, elementsOptions } = elementsState;
    const [yearsState, setYears] = useState<YearsState>({ yearsOptions: {values: [], names: []}});
    const { yearsOptions } = yearsState;
    const [macroRegionsState, setMacroRegions] = useState<MacroRegionsState>({
        macroRegionsObj: {},
        macroRegionsOptions: { values: [], names: []}
    });
    const { macroRegionsOptions, macroRegionsObj } = macroRegionsState;
    const [regionsState, setRegions] = useState<RegionsState>({
        regionsObj: {},
        regionsOptions: { values: [], names: []}
    });
    const { regionsOptions, regionsObj } = regionsState;
    const { buttonBoth, buttonGraphs, buttonMap } = useContext( LeftSideMenuContext );
    const { map } = useContext( MapContext );
    const [mapCol, setMapCol] = useState(0);
    const [graphsCol, setGraphsCol] = useState(0);
    const [showMap, setShowMap] = useState(false);
    const [showGraphs, setShowGraphs] = useState(false);
    const { setSteps, setIsOpen } = useTour();
    const [showCountries, setShowCountries] = useState(false);
    const [clickId, setClickId] = useState<string | number | null>(null);
    // Chart Data states
    const [data1, setData1] = useState<number[] | undefined>(undefined);
    const [data2, setData2] = useState<number[] | undefined>(undefined);
    const [data3, setData3] = useState<number[] | undefined>(undefined);
    const [data4, setData4] = useState<number[] | undefined>(undefined);
    const [x_labels, setXLabels] = useState<number[] | undefined>(undefined);
    const [dataFrame1, setDataFrame1] = useState<DataDocument[] | undefined>(undefined);
    // Data translation states
    const [percentConfig1, setPercentConfig1] = useState<PercentConfig | undefined>(undefined);
    const [percentConfig2, setPercentConfig2] = useState<PercentConfig | undefined>(undefined);
    const [podiumConfig, setPodiumConfig] = useState<PodiumConfig | undefined>(undefined);
    const [chartTxts, setChartTxts] = useState<ChartTxts | undefined>(undefined);
    const [chartConfig, setChartConfig] = useState<ChartConfig[] | undefined>(undefined);

    const { data: elementsData, isLoading: isLoadingElements } = useSWR<ElementsData[]>(`${baseURL}/api/v1/data/elements/3`, dataFetcher);

    const { data: yearsData, isLoading: isLoadingYears } = useSWR<YearsData[]>(`${baseURL}/api/v1/data/years/OBSERVATIONS`, dataFetcher);

    const { data: macroRegionsData, isLoading: isLoadingMacroRegions } = useSWR<Record<string, MacroRegionsData>>(`${baseURL}/api/v1/data/macroRegions`, dataFetcher);

    const { data: regionsData, isLoading: isLoadingRegions } = useSWR<Record<string, RegionsData>>(`${baseURL}/api/v1/data/regions/${regionsElementId[elementId as keyof typeof regionsElementId]}/176/${year}`, dataFetcher);

    const optionsTranslated = (options: any,index:number) => {
        const result = {} as any
        for (let key in options) {
            result[key] = options[key]
            if(key == "plugins") result[key]['title']['text'] = dataTranslate('chart2'+index+'-title').replace('#{}', locationName)
        }
        return result
    }

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

    useEffect(() => {
        if (map){
            map.on('load', () => {
                map.on('click', 'country_layer', (e) => {
                    setSectionState( (prevState) => ({
                        ...prevState,
                        countryCode: e.features![0].properties!.iso3,
                        locationName: e.features![0].properties!.country_name
                    }));
                    console.log(e.features![0].properties!.country_name);
                    setClickId(e.features![0].id ?? null);
                });
            });
        }
    }, [map]);

    useEffect(() => {
        if (elementsData && !isLoadingElements) {
            const elemsObj: Record<string, ElementsData> = {};
            elementsData.map( (value, index) => (elemsObj[value.ID_ELEMENT] = value));
            setElements({
                elementsObj: elemsObj,
                elementsOptions: generateElementsOptions(elementsData, 'ELEMENT_EN', mapFilterElements)
            });
        }
    }, [isLoadingElements]);

    useEffect(() => {
        if (yearsData && !isLoadingYears) {
            setYears({yearsOptions: generateYearsOptions(yearsData)});
        }
    }, [isLoadingYears]);

    useEffect(() => {
        if (macroRegionsData && !isLoadingMacroRegions) {
            setMacroRegions({
                macroRegionsObj: macroRegionsData,
                macroRegionsOptions: generateOptionsFromObj(macroRegionsData, '', 'region_name', true)
            });
        }
    }, [isLoadingMacroRegions]);

    useEffect(() => {
        console.log('Aquí no');
        if (macroRegionsObj && regionsData && !isLoadingRegions) {
            console.log('Aquí sí');
            console.log(macroRegionsObj[macroRegionCode as keyof typeof macroRegionsObj]);
            setRegions({
                regionsObj: regionsData,
                regionsOptions: macroRegionCode == '10' ? { values: ['WLRD'], names: ['World']} : generateRegionOptions(regionsData, 'region_name', macroRegionsObj[macroRegionCode as keyof typeof macroRegionsObj].id_geo_regions)
            });
            let codeRegion = 'WLRD';
            let idx = -1;
            macroRegionsObj[macroRegionCode]?.id_geo_regions.forEach( (value, index) => {
                if (regionsObj[value] && idx == -1){
                    codeRegion = value;
                    idx = index;
                }
            });
            setSectionState( (prevState) => ({
                ...prevState,
                admin: macroRegionCode == '10' ? 'World' : 'region',
                regionCode: macroRegionCode == '10' ? 'WLRD' : codeRegion,
                countryCode: codeRegion
            }));
            if(map){
                if (clickId !== null){
                    map.setFeatureState(
                        { source: 'geo_countries', id: clickId },
                        { clicked: false }
                    );
                }
                setClickId(null);
            }
        }
    }, [isLoadingRegions, macroRegionCode]);

    useEffect(() => {
        setSectionState( (prevState) => ({
            ...prevState,
            regionCode,
            countryCode: regionCode,
            locationName: macroRegionCode == '10' ? 'World' : regionsObj[regionCode]?.region_name
        }));
        if(map){
            if (clickId !== null){
                map.setFeatureState(
                    { source: 'geo_countries', id: clickId },
                    { clicked: false }
                );
            }
            setClickId(null);
        }
    }, [regionCode]);

    // This useEffect is used when the back button is clicked
    useEffect(() => {
        if ([...Object.keys(regionsObj), 'WLRD'].includes(countryCode)){
            setSectionState( (prevState) => ({
                ...prevState,
                locationName: macroRegionCode == '10' ? 'World' : regionsObj[regionCode]?.region_name
            }));
            if(map){
                if (clickId !== null){
                    map.setFeatureState(
                        { source: 'geo_countries', id: clickId },
                        { clicked: false }
                    );
                }
                setClickId(null);
            }
        }
    }, [countryCode]);

    // Executes the tour for production. This useEffect runs only once
    useEffect(() => {
        if ( !getCookie('production_tour') ) {
            if (setSteps) {
                setSteps(general_data_steps);
                setCookie('production_tour', true);
                setIsOpen(true);
            }
        }
    }, []);


    useEffect(() => {
        GetChartData2(setXLabels,setData1,setData2,setData3,setData4,countryCode, clickId ? '58' : '152');
    }, [clickId, regionCode]);

    useEffect(() => {
        setDataFrame1([
            {
                label:"Years", 
                values : x_labels ?? []
            },
            {
                label:"Beans", 
                values : data1 ?? []
            },
            {
                label:"Pulses", 
                values : data2 ?? []
            },
            {
                label:"Agriculture", 
                values : data3 ?? []
            },
            {
                label:"Crops", 
                values : data4 ?? []
            },
        ]);
    }, [x_labels, data1, data2, data3, data4]);

    let [valuePorc1, setValuePorc1] = useState(0)

    let [valuePorc2, setValuePorc2] = useState(0)

    let [anualdata, setanualdata] = useState({labels: Array(0), datasets: Array<any>(0)});
    let [tenyearsdata, settenyearsdata] = useState({labels: Array(0), datasets: Array<any>(0)});

    useEffect( () => {
        axios({url: `https://commonbeanobservatorytst.ciat.cgiar.org/api/v1/data/value/beans_production_value/VALUE/${countryCode}/${clickId ? '1059' : '1153'}/176/${year}`})
        .then(response => {
            setValuePorc1(response.data)
        })

        axios({url: `https://commonbeanobservatorytst.ciat.cgiar.org/api/v1/data/value/beans_production_value/VALUE/${countryCode}/${clickId ? '1060' : '1154'}/176/${year}`})
        .then(response => {
            setValuePorc2(response.data)
        })

    },[clickId, year, regionCode]);

    useEffect(() => {
        axios({url: `https://commonbeanobservatorytst.ciat.cgiar.org/api/v1/chart/default/beans_production_value/${countryCode}?elementIds=[1058,7184]&cropIds=[176,22008,22016]`})
            .then(response => {
                const data = response.data.data;
                const datasets = datasetGeneratorPV(data.observations, data.labels, 'id_crop', 'crop_name');
                const chartjsData = {labels: data.labels, datasets};
                setanualdata(chartjsData)
            })
        axios({url: `https://commonbeanobservatorytst.ciat.cgiar.org/api/v1/chart/default/beans_production_value/${countryCode}?elementIds=[2058,8184]&cropIds=[176,22008,22016]`})
            .then(response => {
                const data = response.data.data;
                const datasets = datasetGeneratorPV(data.observations, data.labels, 'id_crop', 'crop_name');
                const chartjsData = {labels: data.labels, datasets};
                settenyearsdata(chartjsData)
            })
    }, [clickId, regionCode]);

    const dataFrame2 = [
        {
            label:"Years - Annual Growth", 
            values : anualdata.labels
        },
        {
            label:"Beans - Annual Growth", 
            values : anualdata.datasets[0]
        },
        {
            label:"Value Added - Annual Growth", 
            values : anualdata.datasets[2]
        },
        {
            label:"Gross Domestic Product - Annual Growth", 
            values : anualdata.datasets[1]
        },
        {
            label:"Years - 10 Year Moving Average", 
            values : tenyearsdata.labels
        },
        {
            label:"Crops", 
            values : tenyearsdata.datasets[0]
        },
        {
            label:"Pulses", 
            values : tenyearsdata.datasets[2]
        },
        {
            label:"Agriculture", 
            values : tenyearsdata.datasets[1]
        },
    ]

    // UseEffect to get Translations
    useEffect(() => {
        setPercentConfig1({
            value: valuePorc1,
            text : dataTranslate('porc1-label'),
        });
    
        setPercentConfig2({
            value: valuePorc2,
            text : dataTranslate('porc2-label'),
        })
    
        setPodiumConfig({
            url: `https://commonbeanobservatorytst.ciat.cgiar.org/api/v1/data/podium/${countryCode}/${clickId ? '158' : '252'}/176/${year}`,
            text: dataTranslate('podium-title').replace('#{2}', year.toString()),
            description: '',
        })
    
        setChartTxts({
            title: dataTranslate('chart1-title').replace('#{}', locationName),
            axis_x : "",
            axis_y : dataTranslate('chart1-axis-y'),
            datasets: [dataTranslate('chart1-dataset1'),dataTranslate('chart1-dataset2'),dataTranslate('chart1-dataset3'),dataTranslate('chart1-dataset4')]
        })
    }, [valuePorc1, valuePorc2, clickId, year, regionCode, dataTranslate]);

    useEffect(() => {
        const datasetsTranslated = (datasets: any[], index: number) => {
            const result = Array(0)
            datasets.map((ds,idx) => {
                const ds_trans = {} as any
                for (let key in ds) {
                    ds_trans[key] = ds[key]
                    if(key == "label") ds_trans[key] = dataTranslate('chart2'+index+'-dataset'+(idx+1))
                }
                result.push(ds_trans)
            })
            return result
        }

        setChartConfig([
            {
                dataURL: {labels:anualdata.labels,datasets:datasetsTranslated(anualdata.datasets,1)},
                options: optionsTranslated(annual_growth_optionsPV,1),
                config: {key: 'id_crop', name: 'crop_name'},
                name: dataTranslate('chart2-opt1')
            },
            {
                dataURL: {labels:tenyearsdata.labels,datasets:datasetsTranslated(tenyearsdata.datasets,2)},
                options: optionsTranslated(ten_year_moving_average_optionsPV,1),
                config: {key: 'id_crop', name: 'crop_name'},
                name: dataTranslate('chart2-opt2')
            }
        ])
    }, [anualdata, tenyearsdata, dataTranslate]);

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
                                    <MainBar key={ uuidv4() } section={`Production Value - ${locationName}`}>
                                        <BackButton regionCode={regionCode} countryCode={countryCode} setSectionState={setSectionState}/>
                                    </MainBar>
                                </Col>
                            </Row>
                            <Row>
                                <LeftSideMenuContainer/>
                                <Col xs={ 12 }  lg={ mapCol } style={ showMap ? { display: 'block', height: '80vh', position: 'relative' } : { display: 'none' } } className={ `${ styles['no-margin'] } ${ styles['no-padding'] }` }>
                                    <Row style={{ position: 'absolute', top: '10px', right: '20px', zIndex: '3', width: '100%', justifyContent: 'flex-end', gap: '5px' }}>
                                        <Row style={{justifyContent: 'flex-end', flexWrap: 'wrap', gap: '5px'}}>
                                            <MapSelect id='element-filter' options={elementsOptions} selected={elementId} setSelected={setSectionState} atrName='elementId'/>
                                            <MapSelect id='year-filter' options={yearsOptions} selected={year} setSelected={setSectionState} atrName='year'/>
                                            <MapSelect id='macro-region-filter' options={macroRegionsOptions} selected={macroRegionCode} setSelected={setSectionState} atrName='macroRegionCode'/>
                                            { macroRegionCode == '10' ? <></> : <MapSelect options={regionsOptions} selected={regionCode} setSelected={setSectionState} atrName='regionCode'/> }
                                        </Row>
                                        <Row style={{justifyContent: 'flex-end', flexWrap: 'wrap'}}>
                                            <Button
                                                className={`${styles['search-country-button']}`}
                                                style={{width: '145px'}}
                                                onClick={() => setShowCountries(true)}
                                            >
                                                Search Country
                                            </Button>
                                        </Row>
                                    </Row>
                                    <MapView admin={admin} geoJsonURL={`${baseURL}/api/v1/geojson/countries/beans_production_value/ISO3/176`} adminIdsURL={`${baseURL}/api/v1/data/adminIds/beans_production_value/${admin}/${regionCode}/176/${year}?id_elements=[${elementId}]`} percentileURL={`${baseURL}/api/v1/percentile/values/undefined/data_production_surface_context/${elementId}/176/${year}?tradeFlow=undefined`} quintilURL={`${baseURL}/api/v1/percentile/heatmap`} legendTitle={ elementsObj[elementId]?.ELEMENT_EN ?? 'Loading...'} elementUnit={elementsObj[elementId]?.UNIT} />
                                </Col>
                                <Col xs={ 12 } lg={ graphsCol } style={ showGraphs && !showMap ? { display: 'block', height: '80vh', overflow: 'auto', marginLeft: '60px' } : showGraphs ? { display: 'block', height: '80vh', overflow: 'auto' } : { display: 'none' } }>
                                    { percentConfig1 && percentConfig2 && podiumConfig && chartTxts && chartConfig ?
                                        <>
                                            <PodiumWithLinkCon dataURL={podiumConfig.url} text={podiumConfig.text} description={podiumConfig.description}/>
                                            <br></br>
                                            <PorcentagesBox data_1={percentConfig1} data_2={percentConfig2} />
                                            <br></br>
                                            <ChartFrame data={dataFrame1 ?? []} toggleText={dataTranslate('chart1-toggle')} excludedClasses={[]}>
                                                <MultichartPV xLabels={x_labels ?? []} data1={data1 ?? []} data2={data2 ?? []} data3={data3 ?? []} data4={data4 ?? []} chartTexts={chartTxts} />
                                            </ChartFrame>
                                            <br></br>
                                            <ChartFrame data={dataFrame2} toggleText={dataTranslate('chart2-toggle')} excludedClasses={['chart-select']}>
                                                <ChartSelectionPV chartConfigList={chartConfig} />
                                            </ChartFrame>
                                        </>
                                        :
                                        'Loading...'
                                    }
                                    <SourcesComponent shortName='FAO' year='2022' completeName='FAOSTAT Database' url='http://www.fao.org/faostat/en/#data' />
                                </Col>
                            </Row>                            
                        </Container>
                    </Col>
                </Row>
            </Container>
            <SearchCountryModal adminIdsUrl={`${baseURL}/api/v1/data/adminIds/beans_production_value/${admin}/${regionCode}/176/${year}?id_elements=[${elementId}]`} show={showCountries} handleClose={setShowCountries} clickId={clickId} setSectionState={setSectionState} setClickId={setClickId} />
        </Layout>
    )
}

export const getStaticProps: GetStaticProps = async ({ locale }) => {
    return {
        props: {
            ...( await serverSideTranslations( locale!, ['data-prod-val'] ) ),
        }
    }
}

export default PVPage