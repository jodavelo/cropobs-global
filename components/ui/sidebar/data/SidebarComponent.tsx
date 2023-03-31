import { useEffect, useState, useCallback } from 'react';

import { Sidebar, Menu, MenuItem, SubMenu, useProSidebar, sidebarClasses } from 'react-pro-sidebar';
import { AccessAlarm, ThreeDRotation } from '@mui/icons-material';
import AdjustIcon from '@mui/icons-material/Adjust';
import { useWindowSize } from '../../../../hooks';;

interface Props {
    isCollapsedProp?: boolean;
}
export const SidebarComponent = ({ isCollapsedProp }: Props) => {

    const { collapseSidebar } = useProSidebar();
    const { width } = useWindowSize();
    const [sidebarWidth, setSidebarWidth] = useState('');
    const [isCollapsed, setIsCollapsed] = useState( isCollapsedProp );

    useEffect(() => {
        if (width){
            if( width < 991 ) setSidebarWidth('90vw');
            else if ( width > 992 && width < 1200 ) setSidebarWidth('100%')
        }
        else setSidebarWidth('12vw')
        //collapseSidebar();

    }, [ width ])

    useEffect(() => {
        collapseSidebar(); 
    }, [ isCollapsedProp ])
    

    return (
        <Sidebar width={ sidebarWidth } rootStyles={{
            [`.${sidebarClasses.container}`]: {
            //   backgroundColor: 'red',
            //   width: '70%'
            },
          }} >
            <Menu>
                <SubMenu icon={ <AdjustIcon/> } label="Economy">
                    <MenuItem icon={ <AccessAlarm/> }> Pie charts </MenuItem>
                    <MenuItem icon={ <ThreeDRotation/> }> Line charts </MenuItem>
                    <MenuItem icon={ <AccessAlarm/> }> Pie charts </MenuItem>
                    <MenuItem icon={ <ThreeDRotation/> }> Line charts </MenuItem>
                </SubMenu>
                <SubMenu icon={ <AdjustIcon/> } label="Documentation">
                    <MenuItem icon={ <AccessAlarm/> }> Pie charts </MenuItem>
                    <MenuItem icon={ <ThreeDRotation/> }> Line charts </MenuItem>
                    <MenuItem icon={ <AccessAlarm/> }> Pie charts </MenuItem>
                    <MenuItem icon={ <ThreeDRotation/> }> Line charts </MenuItem>
                </SubMenu>
                <MenuItem> Calendar </MenuItem>
            </Menu>
        </Sidebar>
    )
}
