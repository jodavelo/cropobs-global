import { createContext } from 'react';

interface ContextProps {
    isHome: boolean,
    enableIsHome: () => void; 
    unenableIsHome: () => void;
}

export const LayoutContext = createContext({} as ContextProps);