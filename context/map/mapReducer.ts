

import { Map } from 'mapbox-gl';
import { MapState } from './';

type MapActionType = 
    | { type: '[map] - setMap', payload: Map }

export const mapReducer = (state: MapState, action: MapActionType): MapState => {

    switch (action.type) {
        case '[map] - setMap':
            return {
                ...state,
                isMapReady: true,
                map: action.payload
            }

        default:
            return state;
    }

}