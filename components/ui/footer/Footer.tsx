

import styles from './Footer.module.css';
import { CopyrightComponent, MainFooter } from './';

export const Footer = () => {
    return (
        <div className={ styles.footer }>
            <MainFooter/>
            <CopyrightComponent/>
        </div>
    )
}
