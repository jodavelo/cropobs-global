
import { LayoutState } from './';

type LayoutActionType = 
    | { type: '[Layout] - Set is Home', payload: boolean }
    | { type: '[Layout] - Set is Data', payload: boolean}
    | { type: '[Layout] - Set is Data - Surface Context', payload: boolean}
    | { type: '[Layout] - Set is About Us', payload: boolean}
    // | { type: '[Layout] - Unenable is Home',  }

export const layoutReducer = (state: LayoutState, action: LayoutActionType): LayoutState => {

    switch (action.type) {
        case '[Layout] - Set is Home':
            return {
                ...state,
                isHome: action.payload,
            }
            case '[Layout] - Set is Data':
                return {
                    ...state,
                    isData: action.payload,

                }
            case '[Layout] - Set is Data - Surface Context': 
                return {
                    ...state,
                    isDataSurfaceContext: action.payload
                }
            case '[Layout] - Set is About Us':
                return {
                    ...state,
                    isAboutUs: action.payload
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