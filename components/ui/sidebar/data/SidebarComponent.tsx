import { useEffect, useState, useCallback, CSSProperties, useLayoutEffect } from 'react';

import { Sidebar, Menu, MenuItem, SubMenu, useProSidebar, sidebarClasses } from 'react-pro-sidebar';
import { AccessAlarm, ThreeDRotation } from '@mui/icons-material';
import AdjustIcon from '@mui/icons-material/Adjust';
import AgricultureIcon from '@mui/icons-material/Agriculture';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import { useWindowSize } from '../../../../hooks';import Link from 'next/link';
import { redirect } from 'next/navigation';
import { useRouter } from 'next/router';
;

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
    useLayoutEffect(() => {
        switch ( locale ) {
            case 'en':
                setSurfaceContextText('Surface Context');
                setProductionText('Production');
                setProductionValueText('Production Value');
                setConsumptionText('Consumption');
                break;
            case 'es':
                setSurfaceContextText('Contexto de la superficie');
                setProductionText('Producción');
                setProductionValueText('Valor de la producción');
                setConsumptionText('Consumo');
                break;
            default:
                setSurfaceContextText('Contexto da área');
                setProductionText('Produção');
                setProductionValueText('Valor da produção');
                setConsumptionText('Consumo');
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
            defaultCollapsed
          >
            <Menu>
                <SubMenu icon={ <AgricultureIcon/> } label={productionText}>
                    <MenuItem onClick={ () => push('/data/surface-context') } > {surfaceContextText} </MenuItem>
                    <MenuItem onClick={ () => push('/data/production') } > {productionText} </MenuItem>
                    <MenuItem onClick={ () => push('/data/prod_val') }> {productionValueText} </MenuItem>
                </SubMenu>
                {/* <SubMenu icon={ <AdjustIcon/> } label="Documentation">
                    <MenuItem icon={ <AccessAlarm/> }> Pie charts </MenuItem>
                    <MenuItem icon={ <ThreeDRotation/> }> Line charts </MenuItem>
                    <MenuItem icon={ <AccessAlarm/> }> Pie charts </MenuItem>
                    <MenuItem icon={ <ThreeDRotation/> }> Line charts </MenuItem>
                </SubMenu> */}
                <MenuItem icon={<TrendingUpIcon/>} > {consumptionText} </MenuItem>
            </Menu>
        </Sidebar>
    )
}
