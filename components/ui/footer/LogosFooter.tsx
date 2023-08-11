
import styles from './Footer.module.css';
import { LinkComponent } from './';
import { v4 as uuidv4 } from 'uuid';

const links = [
    {
        text: 'www.alliancebioversityciat.org'
    },
    {
        text: 'www.cgiar.org'
    },
]

export const LogosFooter = () => {
    return (
        <div className={ styles['container-logos'] }>
            <div className={ styles['container-logo-images'] }>
                <img src="/logo_alianza.png" alt="Alliance Logo" className={ styles['size-logos'] } />
            </div>
            <div className={ styles['container-logo-images'] }>
                <img src="/footer-foresight.png" alt="Foresight Logo" className={ styles['size-logos3'] } />
                <img src="/footer-market_intelligence.png" alt="MI Logo" className={ styles['size-logos3'] } />
            </div>
            {
                links.map(({ text }) => (
                    <LinkComponent key={ uuidv4() } href={ text }/>
                ))
            }
        </div>
    )
}
