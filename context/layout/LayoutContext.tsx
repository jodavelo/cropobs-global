import { createContext } from 'react';

interface ContextProps {
    isHome: boolean;
    setIsHome: (settingIsHome: boolean) => void;
    isData: boolean;
    setIsData: (settingIsData: boolean) => void;
    isAboutUs: boolean;
    setIsAboutUs: (settingIsAboutUs: boolean) => void;
    isDataSurfaceContext: boolean;
    setIsDataSurfaceContext: (settingIsDataSurfaceContext: boolean) => void;
    isDataProduction: boolean;
    setIsDataProduction: (settingIsDataProduction: boolean) => void;
    isDataProductionValue: boolean;
    setIsDataProductionValue: (settingIsDataProductionValue: boolean) => void;
    isDataConsumption: boolean;
    setIsDataConsumption: (settingIsDataConsumption: boolean) => void;
    isDatabases: boolean;
    setIsDatabases: (settingIsDatabases: boolean) => void;
}

export const LayoutContext = createContext({} as ContextProps);