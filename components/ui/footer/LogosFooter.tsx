
import styles from './Footer.module.css';
import { LinkComponent } from './';

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
            <img src="/logo_alianza.png" alt="Alliance Logo" className={ styles['size-logos'] } />
            {
                links.map(({ text }) => (
                    <LinkComponent key={ text } href={ text }/>
                ))
            }
        </div>
    )
}
