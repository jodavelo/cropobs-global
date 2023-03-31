import { createContext } from 'react';

interface ContextProps {
    isHome: boolean;
    setIsHome: (settingIsHome: boolean) => void;
    isData: boolean;
    setIsData: (settingIsData: boolean) => void;
    isAboutUs: boolean;
    setIsAboutUs: (settingIsAboutUs: boolean) => void;
    isDataSurfaceContext: boolean;
    setIsDataSurfaceContext: (settingIsDataSurfaceContext: boolean) => void
}

export const LayoutContext = createContext({} as ContextProps);