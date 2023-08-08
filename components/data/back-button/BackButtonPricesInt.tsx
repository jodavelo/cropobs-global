import { IconButton } from '@mui/material';
import ReplayIcon from '@mui/icons-material/Replay';
import { LeftSideMenuContext } from '../../../context/map/leftsidemenu';
import React, { FC, useContext, useEffect } from 'react';

interface Props {
    locationName: string
    countryCode: string
    setSectionState: Function
    worldCode?: string
    isoCode?: string
}



export const BackButtonPricesInt: FC<Props> = ({ locationName, countryCode,  setSectionState, worldCode='World', isoCode='INTL' }) => {
    const changeAdmin = ( locationName: string, countryCode:string, setSectionState: Function, worldCode: string, isoCode: string) => {
   

        switch (true) {
            // When  country is already selected
            case (locationName != worldCode && countryCode != isoCode):
                setSectionState( (prevState: Record<string, any>) => ({
                    ...prevState,
                    countryCode: isoCode,
                    locationName: worldCode
                }));
                break;
            default:
                setSectionState( (prevState: Record<string, any>) => ({
                    ...prevState,
                    ['countryCode']: 'INTL',
                    ["locationName"]: 'World'
                }));
        }
    }
    if ( locationName === worldCode) return <></>
    return (
    <IconButton style={{color: 'white'}} onClick={() => changeAdmin( locationName, countryCode, setSectionState, worldCode, isoCode)}>
        <ReplayIcon/>
    </IconButton>
    )
}
