
import { createContext } from 'react';
import { Map } from 'mapbox-gl';

interface MapContextProps {
    isMapReady: boolean;
    map?: Map;
    setMap: (map: Map) => void;
    // isHide: boolean;
}

export const MapContext = createContext({} as MapContextProps);