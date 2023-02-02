

import { FC } from 'react';
import styles from './mainbar.module.css';

interface Props {
    section: string;
    label? : string;
    region? : string;
}

export const MainBar: FC<Props> = ({ section, label, region }) => {
    return (
        <div className={ styles.container }>
            <span>{ section }{ label ? label : '' }{ region ? region : '' }</span>
        </div>
    )
}
