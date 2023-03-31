import { FC, useReducer } from 'react'
import { LayoutContext, layoutReducer } from './'

export interface LayoutState {
    isHome: boolean;
    isData: boolean;
    isAboutUs: boolean;
    isDataSurfaceContext: boolean;
}

const LAYOUT_INITIAL_STATE: LayoutState = {
    isHome: false,
    isData: false,
    isAboutUs: false,
    isDataSurfaceContext: false
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

    const setIsAboutUs = ( settingIsAboutUs: boolean ) => {
        dispatch({ type: '[Layout] - Set is About Us', payload: settingIsAboutUs });
    }

    return (
        <LayoutContext.Provider value={{
            ...state,

            // Methods
            setIsHome,
            setIsData,
            setIsAboutUs,
            setIsDataSurfaceContext
        }}>
            { children }
        </LayoutContext.Provider>
    )
}