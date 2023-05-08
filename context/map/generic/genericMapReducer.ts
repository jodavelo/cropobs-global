import { Map } from 'mapbox-gl';
import { GenericMapState } from './';

type GenericMapActionType = 
    | { type: 'setMap', payload: Map }
    | { type: 'Set is Map Trade', payload: boolean }

export const genericMapReducer = (state: GenericMapState, action: GenericMapActionType): GenericMapState => {

    switch (action.type) {
        case 'setMap':
            return {
                ...state,
                isMapReady: true,
                map: action.payload
            }
        case 'Set is Map Trade':
            return {
                ...state,
                isMapTrade: action.payload
            }

        default:
            return state;
    }

}