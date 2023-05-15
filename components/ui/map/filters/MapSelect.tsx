import React, { FC, useEffect } from 'react';
import { SelectOptions } from '../../../../interfaces/data';
import styles from './mapSelect.module.css';
import { useTour } from '@reactour/tour';
import { getCookie, setCookie } from 'cookies-next';
import { map_select_filter_price, map_select_filter_price_es, map_select_filter_price_pt } from '../../../../helpers/data/tour';  

interface MapSelectInterface {
    options: SelectOptions
    selected: string | number
    setSelected: Function
    atrName: string
    id?: string
    locale?: string
}

export const MapSelect: FC<MapSelectInterface> = ({ options={ values: [], names: []}, selected, setSelected, atrName, id=undefined, locale }) => {
    const { values, names } = options;
    const { setSteps, setIsOpen } = useTour();
    useEffect(() => {
        if ( !(selected === 'Wholesale Price') && !getCookie('map_select_filter_price') ) {
            if (setSteps) {
                if( locale == 'en' ) setSteps(map_select_filter_price);
                else if ( locale == 'es' ) setSteps(map_select_filter_price_es);
                else if ( locale == 'pt' ) setSteps(map_select_filter_price_pt);
                setCookie('map_select_filter_price', false);
                setIsOpen(true);
            }
        }
    }, [ locale]);

    const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelected( (prevState: Record<string, any>) => ({
            ...prevState,
            [atrName]: e.target.value
        }));
    };
    return (
    <select
        value={selected}
        onChange={handleSelect}
        className={ styles['select-filter'] }
        id={id}
    >
        {
            (values.length != names.length) ? <option>No option</option> :
            (
                values.map( (value, index) => <option key={value} value={value}>{names[index]}</option>)
            )
        }
    </select>
    )
}
