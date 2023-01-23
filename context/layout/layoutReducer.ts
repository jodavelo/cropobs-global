
import { LayoutState } from './';

type LayoutActionType = 
    | { type: '[Layout] - Set is Home', payload: boolean }
    // | { type: '[Layout] - Unenable is Home',  }

export const layoutReducer = (state: LayoutState, action: LayoutActionType): LayoutState => {

    switch (action.type) {
        case '[Layout] - Set is Home':
            return {
                ...state,
                isHome: action.payload
            }
        // case '[Layout] - Unenable is Home':
        //     return {
        //         ...state,
        //         isHome: false
        //     }

        default:
            return state;
    }

}