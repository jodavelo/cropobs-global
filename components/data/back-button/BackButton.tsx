import { IconButton } from '@mui/material';
import ReplayIcon from '@mui/icons-material/Replay';
import { FC, useEffect } from 'react';
import { getCookie, setCookie } from 'cookies-next';
import { back_button_step, back_button_step_es, back_button_step_pt } from '../../../helpers/data/tour';
import { useTour } from '@reactour/tour';

interface Props {
    regionCode: string
    countryCode: string
    setSectionState: Function
    locale: string
    worldCode?: string
    resetPrices?: false
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

export const BackButton: FC<Props> = ({ regionCode, countryCode, setSectionState, worldCode='WLRD', resetPrices= false, locale }) => {

    const { setSteps, setIsOpen } = useTour();

    if (regionCode === countryCode && countryCode === worldCode) return <></>
    
    useEffect(() => {
        if ( !(regionCode === countryCode && countryCode === worldCode) && !getCookie('back_button_tour') ) {
            if (setSteps) {
                if( locale == 'en' ) setSteps(back_button_step);
                else if ( locale == 'es' ) setSteps(back_button_step_es);
                else if ( locale == 'pt' ) setSteps(back_button_step_pt);
                setCookie('back_button_tour', true);
                setIsOpen(true);
            }
        }
    }, [regionCode, countryCode, locale]);

    return (
    <IconButton id='back-button' style={{color: 'white'}} onClick={() => changeAdmin(regionCode, countryCode, setSectionState, worldCode, resetPrices)}>
        <ReplayIcon/>
    </IconButton>
    )
}
