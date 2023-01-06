import { FC, useReducer } from 'react'
import { LayoutContext, layoutReducer } from './'

export interface LayoutState {
    isHome: boolean
}

const LAYOUT_INITIAL_STATE: LayoutState = {
    isHome: false
}

interface Props {
    children: JSX.Element
}

export const LayoutProvider: FC<Props> = ({ children }) => {
    
    const [state, dispatch] = useReducer(layoutReducer, LAYOUT_INITIAL_STATE);

    const enableIsHome = () => {
        dispatch({ type: '[Layout] - Enable is Home' });
    }

    const unenableIsHome = () => {
        dispatch({ type: '[Layout] - Unenable is Home' });
    }

    return (
        <LayoutContext.Provider value={{
            ...state,

            // Methods
            enableIsHome,
            unenableIsHome
        }}>
            { children }
        </LayoutContext.Provider>
    )
}