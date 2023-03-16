import styles from './mapSelect.module.css';

export const MapSelect = ({ options={ values: [], names: []}, selected, setSelected, atrName }) => {
    const { values, names } = options;
    const handleSelect = (e) => {
        setSelected( (prevState) => ({
            ...prevState,
            [atrName]: e.target.value
        }));
    };
    return (
    <div>
        <select
                value={selected}
                onChange={handleSelect}
                className={ styles['select-filter'] }
        >
            {
                (values.length != names.length) ? <option>No option</option> :
                (
                    values.map( (value, index) => <option key={value} value={value}>{names[index]}</option>)
                )
            }
        </select>
    </div>
    )
}
