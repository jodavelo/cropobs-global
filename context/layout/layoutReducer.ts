
import { LayoutState } from './';

type LayoutActionType = 
    | { type: '[Layout] - Enable is Home' }
    | { type: '[Layout] - Unenable is Home' }

export const layoutReducer = (state: LayoutState, action: LayoutActionType): LayoutState => {

    switch (action.type) {
        case '[Layout] - Enable is Home':
            return {
                ...state,
                isHome: true
            }
        case '[Layout] - Unenable is Home':
            return {
                ...state,
                isHome: false
            }

        default:
            return state;
    }

}