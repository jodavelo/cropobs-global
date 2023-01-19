

import { VideoState } from './';

type VideoActionType = 
    | { type: '[Video] - Start playing' }
    | { type: '[Video] - End playing' }
    | { type: '[Video] - Set source video', payload: string }

export const videoReducer = (state: VideoState, action: VideoActionType): VideoState => {

    switch (action.type) {
        case '[Video] - Start playing':
            return {
                ...state,
                isPlaying: true
            }
        case '[Video] - End playing':
            return {
                ...state,
                isPlaying: false
            }
        case '[Video] - Set source video':
            return {
                ...state,
                srcVideo: action.payload
            }
        default:
            return state;
    }

}