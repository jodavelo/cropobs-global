

import { FC, useReducer } from 'react'
import { LeftSideMenuContext, leftSideMenuReducer } from './'

export interface LeftSideMenuState {
    buttonGraphs: boolean;
    buttonBoth: boolean;
    buttonMap: boolean;
}

const LEFT_SIDE_MENU_INITIAL_STATE: LeftSideMenuState = {
    buttonGraphs: false,
    buttonBoth: true,
    buttonMap: false,
}

interface Props {
    children: JSX.Element
}

export const LeftSideMenuProvider: FC<Props> = ({ children }) => {
    
    const [state, dispatch] = useReducer(leftSideMenuReducer, LEFT_SIDE_MENU_INITIAL_STATE);

    const activeGraphsButton = () => {
        dispatch({ type: '[leftSideMenu] - Active Graphs Button' });
    }

    const activeBothButtons = () => {
        dispatch({ type: '[leftSideMenu] - Active Graphs And Map Button' });
    }

    const activeMapButton = () => {
        dispatch({ type: '[leftSideMenu] - Active Map Button' });
    }

    return (
        <LeftSideMenuContext.Provider value={{
            ...state,

            // Methods
            activeGraphsButton,
            activeBothButtons,
            activeMapButton
        }}>
            { children }
        </LeftSideMenuContext.Provider>
    )
}