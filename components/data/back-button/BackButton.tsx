import { IconButton } from '@mui/material';
import ReplayIcon from '@mui/icons-material/Replay';
import { FC, useEffect, useContext } from 'react';
import { getCookie, setCookie } from 'cookies-next';
import { back_button_step, back_button_step_es, back_button_step_pt } from '../../../helpers/data/tour';
import { useTour } from '@reactour/tour';
import { useRouter } from 'next/router';
import { MapContext } from '../../../context/map';
import mapboxgl from 'mapbox-gl';

interface Props {
    regionCode: string
    countryCode: string
    setCountryCode2?: Function
    setSectionState: Function
    setLocationNames?: Function
    setClickId?: Function
    clickId?: string | number| null
    locale: string
    worldCode?: string
    resetPrices?: false
    isForTrade?: boolean
}

const changeAdmin = (regionCode: string, countryCode: string, setSectionState: Function, setCountryCode2: Function | undefined = undefined, setLocationNames: Function | undefined = undefined, clickId: string | number | null = null, setClickId: Function | undefined = undefined, worldCode: string, map: mapboxgl.Map | undefined) => {
    switch (true) {
        // When in World region and a country is already selected
        case (regionCode === worldCode && countryCode !== worldCode):
            setSectionState( (prevState: Record<string, any>) => ({
                ...prevState,
                countryCode: worldCode
            }));
            if( setLocationNames ) {
                setLocationNames((prevState: Record<string, any>) => ({
                    ...prevState,
                    isoLabel: worldCode
                }))
            }
            if ( setCountryCode2 ) setCountryCode2( worldCode )
            if( setClickId ) {
                if(map){
                    if (clickId !== null){
                        map.setFeatureState(
                            { source: 'geo_countries', id: clickId },
                            { clicked: false }
                        );
                    }
                    setClickId(null);
                }
            }
            break;
        // When in a different region than World region and a country is not selected
        case (regionCode !== worldCode && countryCode === regionCode):
            setSectionState( (prevState: Record<string, any>) => ({
                ...prevState,
                macroRegionCode: 10,
                countryCode: worldCode,
                regionCode: worldCode
            }));
            if( setLocationNames ) {
                setLocationNames((prevState: Record<string, any>) => ({
                    ...prevState,
                    isoLabel: worldCode
                }))
            }
            if ( setCountryCode2 ) setCountryCode2( worldCode )
            if( setClickId ) {
                if(map){
                    if (clickId !== null){
                        map.setFeatureState(
                            { source: 'geo_countries', id: clickId },
                            { clicked: false }
                        );
                    }
                    setClickId(null);
                }
            }
            break;
        // When in a different region than World region and a country is selected
        case (regionCode !== worldCode && countryCode !== regionCode):
            setSectionState( (prevState: Record<string, any>) => ({
                ...prevState,
                countryCode: regionCode
            }));
            if( setLocationNames ) {
                setLocationNames((prevState: Record<string, any>) => ({
                    ...prevState,
                    isoLabel: regionCode
                }))
            }
            if ( setCountryCode2 ) setCountryCode2( regionCode )
            break;
        default:
            setSectionState( (prevState: Record<string, any>) => ({
                ...prevState,
                countryCode: worldCode,
                regionCode: worldCode
            }));
            if( setLocationNames ) {
                setLocationNames((prevState: Record<string, any>) => ({
                    ...prevState,
                    isoLabel: worldCode
                }))
            }
            if ( setCountryCode2 ) setCountryCode2( worldCode )
            if( setClickId ) {
                if(map){
                    if (clickId !== null){
                        map.setFeatureState(
                            { source: 'geo_countries', id: clickId },
                            { clicked: false }
                        );
                    }
                    setClickId(null);
                }
            }
    }
}

export const BackButton: FC<Props> = ({ regionCode, countryCode, setCountryCode2, setSectionState, setLocationNames, clickId, setClickId, worldCode='WLRD', resetPrices= false, isForTrade = false, locale }) => {
    const { setSteps, setIsOpen } = useTour();
    
    const { map } = useContext(MapContext);

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
    <IconButton id='back-button' style={{color: 'white'}} onClick={() => changeAdmin(regionCode, countryCode,  setSectionState, setCountryCode2, setLocationNames, clickId, setClickId, worldCode, map)}>
        <ReplayIcon/>
    </IconButton>
    )
}
