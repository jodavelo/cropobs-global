import React, { FC } from 'react';
import { SelectOptions } from '../../../../interfaces/data';
import styles from './mapSelect.module.css';

interface MapSelectInterface {
    options: SelectOptions
    selected: string | number
    setSelected: Function
    atrName: string
    id?: string
    setShowGraphs: (data: boolean) => void;
    setShowMap: (data: boolean) => void;
    setMapCol: (data: number) => void;
    setGraphsCol: (data: number) => void;
}

export const MapSelect: FC<MapSelectInterface> = ({ options={ values: [], names: []}, selected, setSelected, atrName, id=undefined , setShowGraphs, setShowMap, setMapCol, setGraphsCol}) => {
    const { values, names } = options;
    const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelected( (prevState: Record<string, any>) => ({
            ...prevState,
            [atrName]: e.target.value
        }));
        setShowGraphs(false);
        setShowMap(true)
        setMapCol(12)
        setGraphsCol(0)
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
