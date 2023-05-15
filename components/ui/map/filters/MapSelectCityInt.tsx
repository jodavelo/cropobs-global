import React, { FC } from 'react';
import { SelectOptions } from '../../../../interfaces/data';
import styles from './mapSelect.module.css';

interface MapSelectInterface {
    options: SelectOptions
    selected: string | number
    setSelected: Function
    atrName: string
    id?: string
    dataCity: CitiesData[]
}

interface CitiesData {
    id_country: number;
    country_name: string
    spanish_name: string
  }

export const MapSelectCityInt: FC<MapSelectInterface> = ({ options={ values: [], names: []}, selected, setSelected, atrName, id=undefined, dataCity }) => {
    const { values, names } = options;
    const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
        //console.log(e.target.value);
        let cityObj = dataCity.find(city => city.id_country == Number(e.target.value))
        console.log(cityObj)
        console.log(cityObj?.id_country)
        setSelected( (prevState: Record<string, any>) => ({
            ...prevState,
            idCountry: cityObj?.id_country,
            locationName: cityObj?.country_name 
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
