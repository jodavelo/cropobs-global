import React, { FC } from 'react';
import { SelectOptions } from '../../../../interfaces/data';
import styles from './mapSelect.module.css';

interface MapSelectInterface {
    options: SelectOptions
    selected: string | number
    setSelected: Function
    atrName: string
    id?: string
    setIdCountry: Function
    setIdGeoPoint: Function
    dataCity: CitiesData[]
}

interface CitiesData {
    id_geo_point : number;
    id_country: number;
    id_geo_admin2: number;
    label: string
  }

export const MapSelectCity: FC<MapSelectInterface> = ({ options={ values: [], names: []}, selected, setSelected, atrName, id=undefined, setIdCountry, setIdGeoPoint, dataCity }) => {
    const { values, names } = options;
    const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
        //console.log(e.target.value);
        let cityObj = dataCity.find(city => city.id_geo_point == Number(e.target.value))
        console.log(cityObj)
        console.log(cityObj?.id_geo_point)
        setIdCountry(
            cityObj?.id_country
        );
        setIdGeoPoint(
            cityObj?.id_geo_point
        );
        setSelected( (prevState: Record<string, any>) => ({
            ...prevState,
            locationName: cityObj?.label 
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
