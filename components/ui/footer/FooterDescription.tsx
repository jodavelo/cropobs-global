import styles from './Footer.module.css';
import { useRouter } from 'next/router';

const footertxt : any = {
    en:'The Alliance Bioversity and CIAT is part of CGIAR, a global research partnership for a food-secure future.',
    es:'La Alianza Bioversity y CIAT es parte de CGIAR, una asociación de investigación mundial para un futuro con seguridad alimentaria',
    pt:'A Aliança Bioversity e CIAT faz parte do CGIAR, uma parceria global de pesquisa para um futuro com segurança alimentar'
}

export const FooterDescription = () => {
    const {locale} = useRouter();
    return (
        <div className={ styles['description-container'] }>
            <p>{footertxt[locale!]}</p>
        </div>
    )
}
