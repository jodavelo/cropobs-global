import styles from './MainHome.module.css';
import { useRouter } from 'next/router';

const mainText = [
    {
        text: 'Observatories are an open data information system at a local, regional and global level for the different actors in the crop value chain and anyone who wants to know a little more about these crops.',
        text_es: 'Los observatorios son un sistema de información de datos abiertos a nivel local, regional y global para los diferentes actores de la cadena de valor de los cultivos y cualquier persona que quiera conocer un poco más acerca de estos cultivos',
        text_pt: 'Os observatórios são um sistema de informação de dados abertos a nível local, regional e global para os diferentes atores da cadeia de valor das culturas e para quem quiser saber um pouco mais sobre essas culturas.'
    }
];

export const MainHome = () => {

    const { locale } = useRouter();

    return (
        <div className={ styles['main-home'] }>
            <img src="/home/home-image.jpg" alt="Home Image" className={ styles['home-image1'] } />
            <span className={ styles['background-home-image1'] }></span>
            <div className={ styles['text-content'] }>
                <span className={ styles['main-text-content'] }>{ locale == 'en' ? mainText[0].text : ( locale == 'es' ? mainText[0].text_es : mainText[0].text_pt ) }</span>
                {/* <span className={ styles['submain-text-content'] }>...</span> */}
            </div>
        </div>
    )
}
