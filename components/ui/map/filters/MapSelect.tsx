import React, { FC } from 'react';
import { SelectOptions } from '../../../../interfaces/data';
import styles from './mapSelect.module.css';

interface MapSelectInterface {
    options: SelectOptions
    selected: string | number
    setSelected: Function
    atrName: string
    id?: string
}

export const MapSelect: FC<MapSelectInterface> = ({ options={ values: [], names: []}, selected, setSelected, atrName, id=undefined }) => {
    const { values, names } = options;
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
