
import styles from './MainHome.module.css';

export const MainHome = () => {
    return (
        <div className={ styles['main-home'] }>
            <img src="/homeimage1.jpg" alt="Home Image" className={ styles['home-image1'] } />
            <span className={ styles['background-home-image1'] }></span>
            <div className={ styles['text-content'] }>
                <span className={ styles['main-text-content'] }>Observatory Template</span>
                <span className={ styles['submain-text-content'] }>Lorem ipsum dolor sit amet consectetur adipisicing elit.</span>
            </div>
        </div>
    )
}
