import { IconButton } from '@mui/material';
import ReplayIcon from '@mui/icons-material/Replay';
import { LeftSideMenuContext } from '../../../context/map/leftsidemenu';
import React, { FC, useContext, useEffect } from 'react';

interface Props {
    regionCode: string
    countryCode: string
    setSectionState: Function
    worldCode?: string
}



export const BackButtonPrices: FC<Props> = ({ regionCode, countryCode, setSectionState, worldCode='WLRD' }) => {
    const { activeMapButton } = useContext( LeftSideMenuContext );
    const changeAdmin = (regionCode: string, countryCode: string, setSectionState: Function, worldCode: string) => {
   

        switch (true) {
            // When in World region and a country is already selected
            case (true):
                setSectionState( (prevState: Record<string, any>) => ({
                    ...prevState,
                    ["elementId"]: 300050
                }));
                activeMapButton()
                break;
            case (regionCode === worldCode && countryCode !== worldCode):
                setSectionState( (prevState: Record<string, any>) => ({
                    ...prevState,
                    countryCode: worldCode
                }));
                break;
            // When in a different region than World region and a country is not selected
            case (regionCode !== worldCode && countryCode === regionCode):
                setSectionState( (prevState: Record<string, any>) => ({
                    ...prevState,
                    macroRegionCode: 10,
                    countryCode: worldCode,
                    regionCode: worldCode
                }));
                break;
            // When in a different region than World region and a country is selected
            case (regionCode !== worldCode && countryCode !== regionCode):
                setSectionState( (prevState: Record<string, any>) => ({
                    ...prevState,
                    countryCode: regionCode
                }));
                break;
            default:
                setSectionState( (prevState: Record<string, any>) => ({
                    ...prevState,
                    countryCode: worldCode,
                    regionCode: worldCode
                }));
        }
    }
    if (regionCode === countryCode && countryCode === worldCode) return <></>
    return (
    <IconButton style={{color: 'white'}} onClick={() => changeAdmin(regionCode, countryCode, setSectionState, worldCode)}>
        <ReplayIcon/>
    </IconButton>
    )
}
