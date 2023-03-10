
import { LeftSideMenuState } from './';

type leftSideMenuActionType = 
    | { type: '[leftSideMenu] - Active Graphs Button' }
    | { type: '[leftSideMenu] - Active Graphs And Map Button' }
    | { type: '[leftSideMenu] - Active Map Button' }

export const leftSideMenuReducer = (state: LeftSideMenuState, action: leftSideMenuActionType): LeftSideMenuState => {

    switch (action.type) {
        case '[leftSideMenu] - Active Graphs Button':
            return {
                ...state,
                buttonBoth: false,
                buttonGraphs: true,
                buttonMap: false
            }
        case '[leftSideMenu] - Active Graphs And Map Button':
            return {
                ...state,
                buttonBoth: true,
                buttonGraphs: false,
                buttonMap: false
            }
        case '[leftSideMenu] - Active Map Button':
            return  {
                ...state,
                buttonBoth: false,
                buttonGraphs: false,
                buttonMap: true
            }

        default:
            return state;
    }

}