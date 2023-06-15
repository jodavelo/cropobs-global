import { IconButton } from '@mui/material';
import ReplayIcon from '@mui/icons-material/Replay';
import { LeftSideMenuContext } from '../../../context/map/leftsidemenu';
import React, { FC, useContext, useEffect } from 'react';

interface Props {
    locationName: string
    idCountry: string
    setSectionState: Function
    worldCode?: string
}



export const BackButtonPricesInt: FC<Props> = ({ locationName, idCountry,  setSectionState, worldCode='World' }) => {
    const changeAdmin = ( locationName: string, idCountry:string, setSectionState: Function, worldCode: string) => {
   

        switch (true) {
            // When in World region and a country is already selected
            case (locationName != worldCode):
                setSectionState( (prevState: Record<string, any>) => ({
                    ...prevState,
                    ["idCountry"]: '',
                    locationName: worldCode
                }));
                break;
            default:
                setSectionState( (prevState: Record<string, any>) => ({
                    ...prevState,
                    ["idCountry"]: '',
                    ["locationName"]: 'World'
                }));
        }
    }
    if ( locationName === worldCode) return <></>
    return (
    <IconButton style={{color: 'white'}} onClick={() => changeAdmin( locationName,idCountry, setSectionState, worldCode)}>
        <ReplayIcon/>
    </IconButton>
    )
}
