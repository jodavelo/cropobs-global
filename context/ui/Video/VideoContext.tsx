
import { createContext } from 'react';

interface ContextProps {
    isPlaying: boolean;
    setStartPlaying: () => void; 
    setEndPlaying: () => void;
    srcVideo: string;
    setSourceVideo: (source: string) => void;
}

export const VideoContext = createContext({} as ContextProps);