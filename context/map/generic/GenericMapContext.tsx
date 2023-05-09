import { Map } from 'mapbox-gl';
import { createContext } from 'react';

interface ContextProps {
    isMapReady: boolean;
    map?: Map;
    setMap: (map: Map) => void;
    isMapTrade: boolean;
    setIsMapTrade: (isTradeMap: boolean) => void;
}

export const GenericMapContext = createContext({} as ContextProps);