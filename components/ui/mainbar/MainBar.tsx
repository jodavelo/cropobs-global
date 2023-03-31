import { FC } from 'react';
import styles from './mainbar.module.css';

interface Props {
    section: string;
    label? : string;
    region? : string;
    children?: JSX.Element;
}

export const MainBar: FC<Props> = ({ section, label, region, children }) => {
    return (
        <div className={ styles.container }>
            <>
                { children }
                <span style={{marginLeft: '6px'}}>{ section }{ label ? label : '' }{ region ? region : '' }</span>
            </>
        </div>
    )
}
