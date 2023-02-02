import { useEffect, useState } from 'react';

import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import { AccessAlarm, ThreeDRotation } from '@mui/icons-material';
import { useWindowSize } from '../../../../hooks';;

export const SidebarComponent = () => {

    const { width } = useWindowSize();
    const [sidebarWidth, setSidebarWidth] = useState('');

    useEffect(() => {
        if( width < 991 ) setSidebarWidth('90vw');
        else if ( width > 992 && width < 1200 ) setSidebarWidth('23vw')
        else setSidebarWidth('15vw')

    }, [ width ])

    return (
        <Sidebar width={ sidebarWidth }>
            <Menu>
                <SubMenu label="Economy">
                    <MenuItem icon={ <AccessAlarm/> }> Pie charts </MenuItem>
                    <MenuItem icon={ <ThreeDRotation/> }> Line charts </MenuItem>
                    <MenuItem icon={ <AccessAlarm/> }> Pie charts </MenuItem>
                    <MenuItem icon={ <ThreeDRotation/> }> Line charts </MenuItem>
                </SubMenu>
                <SubMenu label="Documentation">
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
