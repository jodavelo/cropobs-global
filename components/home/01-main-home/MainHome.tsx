import styles from './MainHome.module.css';
import { useRouter } from 'next/router';

const mainText = [
    {
        text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
        text_es: 'Lorem ipsum dolor sit amet consectetur adipisicing elit..',
        text_pt: 'Lorem ipsum dolor sit amet consectetur adipisicing elit...'
    }
];

export const MainHome = () => {

    const { locale } = useRouter();

    return (
        <div className={ styles['main-home'] }>
            <img src="/home/homeimage1.jpg" alt="Home Image" className={ styles['home-image1'] } />
            <span className={ styles['background-home-image1'] }></span>
            <div className={ styles['text-content'] }>
                <span className={ styles['main-text-content'] }>{ locale == 'en' ? mainText[0].text : ( locale == 'es' ? mainText[0].text_es : mainText[0].text_pt ) }</span>
                {/* <span className={ styles['submain-text-content'] }>...</span> */}
            </div>
        </div>
    )
}
