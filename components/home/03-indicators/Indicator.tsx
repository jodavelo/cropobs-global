import { FC } from "react";

import styles from './indicators.module.css';

interface Props {
    imgUrl: string;
    indicator: number;
    label: string;
}

export const Indicator: FC<Props> = ({ imgUrl, indicator, label }) => {
    return (
        <div className={ styles['indicator-container'] }>
            <img src={ imgUrl } alt="Icon" className={ styles['img-icon'] } />
            <span className={ styles.indicator }>{ indicator }</span>
            <span className={ styles['text-indicator'] }>{ label }</span>
        </div>
    )
}
