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
    isDataPrices: boolean;
    setIsDataPrices: (settingIsDataPrices: boolean) => void;
    isDataPricesInt: boolean;
    setIsDataPricesInt: (settingIsDataPrices: boolean) => void;
    isDatabases: boolean;
    setIsDatabases: (settingIsDatabases: boolean) => void;
    isDataTrade: boolean;
    setIsDataTrade: (settingIsDataTrade: boolean) => void;
    isContact: boolean;
    setIsContact: (settingIsContact: boolean) => void;
}

export const LayoutContext = createContext({} as ContextProps);