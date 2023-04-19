import { IconButton } from '@mui/material';
import ReplayIcon from '@mui/icons-material/Replay';
import { LeftSideMenuContext } from '../../../context/map/leftsidemenu';
import React, { FC, useContext, useEffect } from 'react';

interface Props {
    locationName: string
    setSectionState: Function
    worldCode?: string
}



export const BackButtonPrices: FC<Props> = ({ locationName, setSectionState, worldCode='World' }) => {
    const { activeMapButton } = useContext( LeftSideMenuContext );
    const changeAdmin = ( locationName: string, setSectionState: Function, worldCode: string) => {
   

        switch (true) {
            // When in World region and a country is already selected
            case (locationName != worldCode):
                setSectionState( (prevState: Record<string, any>) => ({
                    ...prevState,
                    ["elementId"]: 300050,
                    locationName: worldCode
                }));
                activeMapButton()
                break;
            default:
                setSectionState( (prevState: Record<string, any>) => ({
                    ...prevState,
                    ["elementId"]: 300050,
                    ["locarionName"]: 'World'
                }));
                activeMapButton()
        }
    }
    if ( locationName === worldCode) return <></>
    return (
    <IconButton style={{color: 'white'}} onClick={() => changeAdmin( locationName, setSectionState, worldCode)}>
        <ReplayIcon/>
    </IconButton>
    )
}
