

import { CSSProperties, useContext } from 'react';
import styles from './video.module.css';
import { Buttons, VideoSource } from './';
import { VideoContext } from '../../../../context/ui';

const style: CSSProperties = {
    backgroundColor: 'rgba(0,0,0,0.9)'
}


export const VideoContainer = () => {

    const { isPlaying, srcVideo } = useContext( VideoContext )
    return (
        <div className={ styles['video-general-container'] }>
            <div className={ styles['video-container'] } style={ isPlaying ? style : undefined }>
                
                {
                    isPlaying ? ( <VideoSource src={ srcVideo }/>  )
                    : (
                        <Buttons/>
                    )
                }
            </div>
        </div>
    )
}
