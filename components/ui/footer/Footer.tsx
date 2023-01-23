

import styles from './Footer.module.css';
import { CopyrightComponent, MainFooter } from './';

export const Footer = () => {
    return (
        <div className={ styles.footer }>
            <MainFooter/>
            <CopyrightComponent important={ true } text='By default, this web page analyze traffic to ensure you get the best experience on our website and help us to improve the performance.'/>
            <CopyrightComponent important={ false } text='Copyright © 2023 The Alliance of Bioversity International and International Center for Tropical Agriculture (CIAT)'/>
        </div>
    )
}
