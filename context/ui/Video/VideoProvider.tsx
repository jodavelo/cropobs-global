
import { FC, useReducer } from 'react'
import { VideoContext, videoReducer } from './'

export interface VideoState {
    isPlaying: boolean,
    srcVideo: string,
}

const VIDEO_INITIAL_STATE: VideoState = {
    isPlaying: false,
    srcVideo: ''
}

interface Props {
    children: JSX.Element
}

export const VideoProvider: FC<Props> = ({ children }) => {
    
    const [state, dispatch] = useReducer(videoReducer, VIDEO_INITIAL_STATE)

    const setStartPlaying = () => {
        dispatch({ type: '[Video] - Start playing' })
    }

    const setEndPlaying = () => {
        dispatch({ type: '[Video] - End playing' })
    }

    const setSourceVideo = ( source: string ) => {
        dispatch({ type: '[Video] - Set source video', payload: source });
    }

    return (
        <VideoContext.Provider value={{
            ...state,

            // Methods
            setStartPlaying,
            setEndPlaying,
            setSourceVideo
        }}>
            { children }
        </VideoContext.Provider>
    )
}