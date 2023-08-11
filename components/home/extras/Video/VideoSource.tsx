

import { FC, useContext } from 'react';
import Button from 'react-bootstrap/Button';
import { VideoContext } from '../../../../context/ui';
import styles from './video.module.css';

interface Props {
    src: string;
}

export const VideoSource: FC<Props> = ({ src }) => {

    const { setEndPlaying, setSourceVideo } = useContext( VideoContext );

    const onReturn = () => {
        setEndPlaying();
        setSourceVideo('');
    }

    return (
        <div className={ styles['video-source-container'] }>
            <Button variant="primary" className={ styles['button-return'] } onClick={ onReturn }>Return</Button>
            <video className={ styles.video } controls autoPlay>
                <source src={ src } type='video/mp4'/>
            </video>
        </div>
    )
}
