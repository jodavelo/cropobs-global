import { FC } from "react";
import CountUp from 'react-countup';

import styles from './indicators.module.css';

interface Props {
    imgUrl: string;
    indicator: number;
    label: string;
    sufix: string;
    prefix: string;
    decimals: number;
}

export const Indicator: FC<Props> = ({ imgUrl, indicator, label, sufix, prefix, decimals }) => {
    return (
        <div className={ styles['indicator-container'] }>
            <img src={ imgUrl } alt="Icon" className={ styles['img-icon'] } />
            <span className={ styles.indicator }><CountUp end={indicator} suffix={sufix} prefix={prefix} decimals={decimals}  delay={2.5}/></span>
            <span className={ styles['text-indicator'] }>{ label }</span>
        </div>
    )
}
