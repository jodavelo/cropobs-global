
import { createContext } from 'react';

interface ContextProps {
    buttonGraphs: boolean;
    buttonBoth: boolean;
    buttonMap: boolean;
    activeGraphsButton: () => void; 
    activeBothButtons: () => void; 
    activeMapButton: () => void;
}

export const LeftSideMenuContext = createContext({} as ContextProps);