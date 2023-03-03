

import { FC, useReducer } from 'react'
import { Map } from 'mapbox-gl';
import { MapContext, mapReducer } from './'

export interface MapState {
    isMapReady: boolean;
    map?: Map;
}

const MAP_INITIAL_STATE: MapState = {
    isMapReady: false,
    map: undefined
}

interface Props {
    children: JSX.Element | JSX.Element[]
}

export const MapProvider = ({ children }: Props) => {
    
    const [state, dispatch] = useReducer(mapReducer, MAP_INITIAL_STATE);

    const setMap = (map: Map) => {
        dispatch({ type: '[map] - setMap', payload: map });
    }

    return (
        <MapContext.Provider value={{
            ...state,

            // Methods
            setMap
        }}>
            { children }
        </MapContext.Provider>
    )
}