
import styles from './Footer.module.css';

export const ContactInfo = () => {
    return (
        <div className={ styles['contact-info-container'] }>
            <p>Innovation and Strategic Analysis for Impact (PISA4Impact)</p>
            <p><img src="/phone-call.webp" alt="Icono telefono" /> +57 (602) 445 0000</p>
            <p><img src="/email.webp" alt="Icono email" /> alliance-dm@cgiar.org</p>
        </div>
    )
}
