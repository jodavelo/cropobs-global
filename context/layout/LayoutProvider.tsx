import { FC, useReducer } from 'react'
import { LayoutContext, layoutReducer } from './'

export interface LayoutState {
    isHome: boolean;
    isData: boolean;
    isAboutUs: boolean;
    isDataSurfaceContext: boolean;
    isDataProduction: boolean;
    isDataProductionValue: boolean;
    isDataConsumption: boolean;
    isDatabases: boolean;
    isDataPrices: boolean;
    isDataPricesInt: boolean;
    isDataTrade: boolean;
    isDataPests: boolean;
    isDataDiseases: boolean;
    isContact: boolean;
    isQuotes: boolean;
}

const LAYOUT_INITIAL_STATE: LayoutState = {
    isHome: false,
    isData: false,
    isAboutUs: false,
    isDataSurfaceContext: false,
    isDataProduction: false,
    isDataProductionValue: false,
    isDataConsumption: false,
    isDatabases: false,
    isDataPrices: false,
    isDataPricesInt: false,
    isDataTrade: false,
    isDataPests: false,
    isDataDiseases: false,
    isContact: false,
    isQuotes: false,
}

interface Props {
    children: JSX.Element
}

export const LayoutProvider: FC<Props> = ({ children }) => {
    
    const [state, dispatch] = useReducer(layoutReducer, LAYOUT_INITIAL_STATE);

    const setIsHome = ( settingIsHome: boolean ) => {
        dispatch({ type: '[Layout] - Set is Home', payload: settingIsHome });
    }

    const setIsData = ( settingIsData: boolean ) => {
        dispatch({ type: '[Layout] - Set is Data', payload: settingIsData });
    }

    const setIsDataSurfaceContext = ( settingIsDataSurfaceContext: boolean ) => {
        dispatch({ type: '[Layout] - Set is Data - Surface Context', payload: settingIsDataSurfaceContext });
    }

    const setIsDataProduction = ( settingIsDataProduction: boolean ) => {
        dispatch({ type: '[Layout] - Set is Data - Production', payload: settingIsDataProduction });
    }

    const setIsDataProductionValue = ( settingIsDataProductionValue: boolean ) => {
        dispatch({ type: '[Layout] - Set is Data - Production Value', payload: settingIsDataProductionValue });
    }

    const setIsDataConsumption = ( settingIsDataConsumption: boolean ) => {
        dispatch({ type: '[Layout] - Set is Data - Consumption', payload: settingIsDataConsumption });
    }

    const setIsAboutUs = ( settingIsAboutUs: boolean ) => {
        dispatch({ type: '[Layout] - Set is About Us', payload: settingIsAboutUs });
    }

    const setIsDatabases = ( settingIsDatabases: boolean ) => {
        dispatch({ type: '[Layout] - Set is Databases', payload: settingIsDatabases });
    }

    const setIsDataPrices = ( settingIsDataPrices: boolean ) => {
        dispatch({ type: '[Layout] - Set is Data Prices', payload: settingIsDataPrices });
    }

    const setIsDataPricesInt = ( settingIsDataPricesInt: boolean ) => {
        dispatch({ type: '[Layout] - Set is Data Prices Int', payload: settingIsDataPricesInt });
    }

    const setIsDataTrade = ( settingIsDataTrade: boolean ) => {
        dispatch({ type: '[Layout] - Set is Data - Trade', payload: settingIsDataTrade });
    }
    const setIsDataPests = ( settingIsDataPests: boolean ) => {
        dispatch({ type: '[Layout] - Set is Data Pests', payload: settingIsDataPests });
    }
    const setIsDataDiseases = ( settingIsDataDiseases: boolean ) => {
        dispatch({ type: '[Layout] - Set is Data Diseases', payload: settingIsDataDiseases });
    }

    const setIsContact = ( settingIsContact: boolean ) => {
        dispatch({ type: '[Layout] - Set is Contact Page', payload: settingIsContact });
    }

    const setIsQuotes = ( settingIsQuotes: boolean ) => {
        dispatch({ type: '[Layout] - Set is Quotes Page', payload: settingIsQuotes });
    }

    return (
        <LayoutContext.Provider value={{
            ...state,

            // Methods
            setIsHome,
            setIsData,
            setIsAboutUs,
            setIsDataSurfaceContext,
            setIsDataProduction,
            setIsDataProductionValue,
            setIsDataConsumption,
            setIsDatabases,
            setIsDataPrices,
            setIsDataPricesInt,
            setIsDataTrade,
            setIsDataPests,
            setIsDataDiseases,
            setIsContact,
            setIsQuotes
        }}>
            { children }
        </LayoutContext.Provider>
    )
}