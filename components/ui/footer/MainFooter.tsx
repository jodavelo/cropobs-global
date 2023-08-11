
import styles from './Footer.module.css';
import { ContactInfo, FooterDescription, LogosFooter } from './';

export const MainFooter = () => {
    return (
        <div className={ styles['main-footer'] }>
            <FooterDescription/>
            <LogosFooter/>
            <ContactInfo/>
        </div>
    )
}
