import { IconButton } from '@mui/material';
import ReplayIcon from '@mui/icons-material/Replay';
import { FC } from 'react';

interface Props {
    regionCode: string
    countryCode: string
    setSectionState: Function
    worldCode?: string
    resetPrices?: false
    isForTrade?: boolean
}

const changeAdmin = (regionCode: string, countryCode: string, setSectionState: Function, worldCode: string, resetPrices: false) => {
    switch (true) {
        // When in World region and a country is already selected
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

export const BackButton: FC<Props> = ({ regionCode, countryCode, setSectionState, worldCode='WLRD', resetPrices= false, isForTrade = false }) => {
    const onClickTradeBack = ( setSectionState: Function ) => {
        setSectionState( (prevState: Record<string, any>) => ({
            ...prevState,
            countryCode: 'WLRD',
            regionCode: 'WLRD'
        }));
        console.log('áanaklnlkakaa')
        console.log({regionCode, countryCode, worldCode, setSectionState})
    }
    if( isForTrade ) {
        if (regionCode === countryCode && countryCode === worldCode) return <></>
        return (
        <IconButton style={{color: 'black'}} onClick={ () => onClickTradeBack( setSectionState ) }>
            <ReplayIcon/>
        </IconButton>
        )
    }
    if (regionCode === countryCode && countryCode === worldCode) return <></>
    return (
    <IconButton style={{color: 'white'}} onClick={() => changeAdmin(regionCode, countryCode, setSectionState, worldCode, resetPrices)}>
        <ReplayIcon/>
    </IconButton>
    )
}
