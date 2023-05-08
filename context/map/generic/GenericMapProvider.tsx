import { FC, useReducer } from 'react'
import { GenericMapContext, genericMapReducer } from './'
import { Map } from 'mapbox-gl';

export interface GenericMapState {
    isMapReady: boolean;
    map?: Map,
    isMapTrade: boolean;
}

const GENERIC_MAP_INITIAL_STATE: GenericMapState = {
    isMapReady: false,
    map: undefined,
    isMapTrade: false,
}

interface Props {
    children: JSX.Element | JSX.Element[]
}

export const GenericMapProvider: FC<Props> = ({ children }) => {
    
    const [state, dispatch] = useReducer(genericMapReducer, GENERIC_MAP_INITIAL_STATE);

    const setMap = ( map: Map ) => {
        dispatch({ type: 'setMap', payload: map });
    }
    
    const setIsMapTrade = ( isTradeMap: boolean ) => {
        dispatch({ type: 'Set is Map Trade', payload: isTradeMap })
    }

    return (
        <GenericMapContext.Provider value={{
            ...state,

            // Methods
            setMap,
            setIsMapTrade
        }}>
            { children }
        </GenericMapContext.Provider>
    )
}