import { FC, useReducer } from 'react'
import { LayoutContext, layoutReducer } from './'

export interface LayoutState {
    isHome: boolean
}

const LAYOUT_INITIAL_STATE: LayoutState = {
    isHome: true
}

interface Props {
    children: JSX.Element
}

export const LayoutProvider: FC<Props> = ({ children }) => {
    
    const [state, dispatch] = useReducer(layoutReducer, LAYOUT_INITIAL_STATE);

    const setIsHome = ( settingIsHome: boolean ) => {
        dispatch({ type: '[Layout] - Set is Home', payload: settingIsHome });
    }

    return (
        <LayoutContext.Provider value={{
            ...state,

            // Methods
            setIsHome
        }}>
            { children }
        </LayoutContext.Provider>
    )
}