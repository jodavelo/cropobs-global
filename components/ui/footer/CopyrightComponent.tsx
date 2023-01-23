

import { FC } from 'react';
import styles from './Footer.module.css';

interface Props {
    text: string;
    important: boolean
}

export const CopyrightComponent: FC<Props> = ({ text, important }) => {
    return (
        <div className={ important ? styles['important-text-copyright'] : styles['footer-copyright'] }>{ text }</div>
    )
}
