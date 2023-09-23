import { createContext, useState } from "react";
import { Map as MapboxMap } from "mapbox-gl";

interface IMapContext {
    map: MapboxMap | null;
    setMap: (map: MapboxMap) => void;
}

const MapContext = createContext<IMapContext>({ map: null, setMap: () => { } });

export const MapContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {

    const [map, setMap] = useState<MapboxMap | null>(null);

    return (
        <MapContext.Provider value={{ map, setMap }}>
            {children}
        </MapContext.Provider>
    );
};

export default MapContext;