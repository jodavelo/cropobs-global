

import { Indicator } from './';
import styles from './indicators.module.css';

const items = [
    {
        imgUrl: '/home/rHOME-11.png',
        indicator: 120,
        label: 'lorem ipsum'
    },
    {
        imgUrl: '/home/rHOME-11.png',
        indicator: 120,
        label: 'lorem ipsum'
    },
    {
        imgUrl: '/home/rHOME-11.png',
        indicator: 120,
        label: 'lorem ipsum'
    },
    {
        imgUrl: '/home/rHOME-11.png',
        indicator: 120,
        label: 'lorem ipsum'
    },
    
]

export const Indicators = () => {
    return (
        <div className={ styles['indicators-container'] }>
            {
                items.map((item, idx) => (
                    <Indicator key={ idx } imgUrl={ item.imgUrl } indicator={ item.indicator } label={ item.label }/>
                ))
            }
        </div>
    )
}
