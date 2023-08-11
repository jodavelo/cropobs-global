import { useEffect, useState, useCallback, CSSProperties, useLayoutEffect } from 'react';

import { Sidebar, Menu, MenuItem, SubMenu, useProSidebar, sidebarClasses } from 'react-pro-sidebar';
import { AccessAlarm, ThreeDRotation } from '@mui/icons-material';
import AdjustIcon from '@mui/icons-material/Adjust';
import AgricultureIcon from '@mui/icons-material/Agriculture';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import { useWindowSize } from '../../../../hooks';import Link from 'next/link';
import { redirect } from 'next/navigation';
import { useRouter } from 'next/router';
import styles from './styles.module.css';

const style: CSSProperties = {
    color: '#0070f3',
    fontWeight: 'bolder'
    // textDecoration: 'underline',
}

interface Props {
    isCollapsedProp?: boolean;
}
export const SidebarComponent = ({ isCollapsedProp }: Props) => {

    const { collapseSidebar } = useProSidebar();
    const { width } = useWindowSize();
    const [sidebarWidth, setSidebarWidth] = useState('');
    const [isCollapsed, setIsCollapsed] = useState( isCollapsedProp );
    const { push, locale } = useRouter();

    useEffect(() => {
        if (width){
            if( width < 991 ) setSidebarWidth('90vw');
            else if ( width > 992 && width < 1200 ) setSidebarWidth('100%')
            else if( width > 1200 ) setSidebarWidth('95%');
        }
        else setSidebarWidth('12vw')
        //collapseSidebar();

    }, [ width ])

    useEffect(() => {
        collapseSidebar(); 
    }, [ isCollapsedProp ])
    

    const [surfaceContextText, setSurfaceContextText] = useState('');
    const [productionText, setProductionText] = useState('');
    const [productionValueText, setProductionValueText] = useState('');
    const [consumptionText, setConsumptionText] = useState('');
    const [pricesText, setPricesText] = useState('');
    const [domesticPricesText, setDomesticPricesText] = useState('');
    const [internationalPricesText, setInternationalPricesText] = useState('');
    const [tradeText, setTradeText] = useState('')
    const [exportImportsText, setExportImportsText] = useState('')
    const [pestAndDiseasesSectionText, setPestAndDiseasesSectionText] = useState('')
    const [pestSectionText, setPestSectionText] = useState('')
    const [diseaseSectionTexts, setDiseaseSectionText] = useState('')

    useLayoutEffect(() => {
        switch ( locale ) {
            case 'en':
                setSurfaceContextText('Surface Context');
                setProductionText('Production');
                setProductionValueText('Production Value');
                setConsumptionText('Consumption');
                setPricesText('Prices');
                setDomesticPricesText('Domestic Prices');
                setInternationalPricesText('International Benchmark Prices');
                setTradeText('Trade');
                setExportImportsText('Imports/Exports');
                setPestAndDiseasesSectionText('Pests & Diseases')
                setPestSectionText('Pests')
                setDiseaseSectionText('Diseases')
                break;
            case 'es':
                setSurfaceContextText('Contexto de la superficie');
                setProductionText('Producción');
                setProductionValueText('Valor de la producción');
                setConsumptionText('Consumo');
                setPricesText('Precios');
                setDomesticPricesText('Precios Nacionales');
                setInternationalPricesText('Precios Internacionales de referencia');
                setTradeText('Comercio');
                setExportImportsText('Importaciones/Exportaciones');
                setPestAndDiseasesSectionText('Plagas & Enfermedades')
                setPestSectionText('Plagas')
                setDiseaseSectionText('Enfermedades')
                break;
            default:
                setSurfaceContextText('Contexto da área');
                setProductionText('Produção');
                setProductionValueText('Valor da produção');
                setConsumptionText('Consumo');
                setPricesText('Preços');
                setDomesticPricesText('Preços domésticos');
                setInternationalPricesText('Preços internacionais de referência');
                setTradeText('Comercio');
                setExportImportsText('Importaciones/Exportaciones');
                setPestAndDiseasesSectionText('Pragas & Doenças')
                setPestSectionText('Pragas')
                setDiseaseSectionText('Doenças')
                break;
        }
    }, )

    return (
        <Sidebar width={ sidebarWidth } rootStyles={{
            [`.${sidebarClasses.container}`]: {
            //   backgroundColor: 'red',
            //   width: '70%'
            },
          }}
            className={ isCollapsedProp ? styles['sidebar-column'] : undefined}
            defaultCollapsed
          >
            <Menu>
                <SubMenu defaultOpen={ true } icon={ <AgricultureIcon/> } label={productionText} className={ isCollapsedProp ? styles['menu-items'] : styles['menu-items-show'] } >
                    <MenuItem  onClick={ () => push('/data/surface-context') } className={ styles['submenu-items'] } > {surfaceContextText} </MenuItem>
                    <MenuItem onClick={ () => push('/data/production') }  className={ styles['submenu-items'] }> {productionText} </MenuItem>
                    <MenuItem onClick={ () => push('/data/production-value')  }className={ styles['submenu-items'] }> {productionValueText} </MenuItem>
                </SubMenu>
                {/* <SubMenu icon={ <AdjustIcon/> } label="Documentation">
                    <MenuItem icon={ <AccessAlarm/> }> Pie charts </MenuItem>
                    <MenuItem icon={ <ThreeDRotation/> }> Line charts </MenuItem>
                    <MenuItem icon={ <AccessAlarm/> }> Pie charts </MenuItem>
                    <MenuItem icon={ <ThreeDRotation/> }> Line charts </MenuItem>
                </SubMenu> */}
                <MenuItem onClick={ () => push('/data/consumption') } icon={<TrendingUpIcon/>} className={ isCollapsedProp ? styles['menu-items'] : styles['menu-items-show'] } > {consumptionText} </MenuItem>
                <SubMenu icon={ <AgricultureIcon/> } label={pricesText} className={ isCollapsedProp ? styles['menu-items'] : styles['menu-items-show'] }>
                    <MenuItem onClick={ () => push('/data/prices') } className={ styles['submenu-items'] }> {domesticPricesText} </MenuItem>
                    <MenuItem onClick={ () => push('/data/prices-international') } className={ styles['submenu-items'] }> {internationalPricesText} </MenuItem>
                </SubMenu>
                <SubMenu icon={ <AgricultureIcon/> } label={tradeText} className={ isCollapsedProp ? styles['menu-items'] : styles['menu-items-show'] }>
                    <MenuItem onClick={ () => push('/data/trade') } className={ styles['submenu-items'] }> {exportImportsText} </MenuItem>
                    {/* <MenuItem onClick={ () => push('/data/prices-international') } className={ styles['submenu-items'] }> {internationalPricesText} </MenuItem> */}
                </SubMenu>
                <SubMenu icon={ <AgricultureIcon/> } label={pestAndDiseasesSectionText} className={ isCollapsedProp ? styles['menu-items'] : styles['menu-items-show'] }>
                    <MenuItem onClick={ () => push('/data/pests') } className={ styles['submenu-items'] }> {pestSectionText} </MenuItem>
                    <MenuItem onClick={ () => push('/data/diseases') } className={ styles['submenu-items'] }> {diseaseSectionTexts} </MenuItem>
                </SubMenu>
            </Menu>
        </Sidebar>
    )
}
