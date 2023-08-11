import { Button } from 'react-bootstrap'
import styles from './searchCountryButton.module.css'
import { FC } from 'react'

interface Props {
    btnText: string,
    setShowCountries: Function
}

export const SearchCountryButton: FC<Props> = ({btnText, setShowCountries}) => {
    return (
        <Button
            className={`${styles['search-country-button']}`}
            style={{width: '145px'}}
            onClick={() => setShowCountries(true)}
            id='search-country-button'
        >
            {btnText}
        </Button>
    )
}
