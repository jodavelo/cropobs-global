

import { useContext } from 'react';
import { VideoContext } from '../../../../context/ui';
import styles from './video.module.css';

export const Buttons = () => {

    const { setStartPlaying, setSourceVideo } = useContext( VideoContext )

    const toPlayVideo1 = () => {
        setStartPlaying();
        setSourceVideo('/home/videoplayback.mp4');
    
    }

    const toPlayVideo2 = () => {
        setStartPlaying();
        setSourceVideo('/home/videoplayback.mp4');
    }

    return (
        <div className={ styles['video-subcontainer'] }>
            <h2>Lorem ipsum</h2>
            <div className={ styles['button-box'] }>
                <div className={ styles.button } onClick={ toPlayVideo1 }>
                    <h6 className={ styles['label-button'] }>Btn 1</h6>
                    <img className={ styles['img-button'] } src="https://riceobservatory.org/images/home/acerca-boton.png" alt="Icon" />
                </div>
                <div className={ styles.button } onClick={ toPlayVideo2 }>
                    <h6 className={ styles['label-button'] }>Btn 1</h6>
                    <img className={ styles['img-button'] } src="https://riceobservatory.org/images/home/acerca-boton.png" alt="Icon" />
                </div>
            </div>
        </div>
    )
}
