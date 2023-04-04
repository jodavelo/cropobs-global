
import styles from './Footer.module.css';

export const FooterDescription = () => {
    return (
        <div className={ styles['description-container'] }>
            <p>The Alliance of Bioversity International and CIAT is part of CGIAR, a global research partnership for a food-secure future.</p>
            <p>Bioversity International is the operating name of the International Plant Genetic Resources Institute (IPGRI).</p>
        </div>
    )
}
