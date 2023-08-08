
import { useEffect } from 'react';
import styles from './MainHome.module.css';

export const MainHome = () => {

    let varibale = '';
    useEffect(() => {
      
    
    }, [])
        

    return (
        <div className={ styles['main-home'] }>
            <img src="/home/home-image.jpg" alt="Home Image" className={ styles['home-image1'] } />
            <span className={ styles['background-home-image1'] }></span>
            <div className={ styles['text-content'] }>
                <span className={ styles['main-text-content'] }>Los observatorios son un sistema de información de datos abiertos a nivel local, regional y global para los diferentes actores de la cadena de valor de los cultivos y cualquier persona que quiera conocer un poco más acerca de estos cultivos</span>
            </div>
        </div>
    )
}
