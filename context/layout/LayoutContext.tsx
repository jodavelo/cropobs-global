import { createContext } from 'react';

interface ContextProps {
    isHome: boolean,
    setIsHome: (settingIsHome: boolean) => void;
}

export const LayoutContext = createContext({} as ContextProps);