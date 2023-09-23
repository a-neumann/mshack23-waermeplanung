import { createContext, useState } from "react";
import { Map as MapboxMap } from "mapbox-gl";

export interface IBuildingData {
    id: string, // unique id
    block_energy_usage_label: number, // 1-5
    block_touching_a_heat_line: boolean,
    spez_wb_hu: number, // Wärmbedarf pro m2
    total_wb_HU_mwh_per_ha: number,
    waermepreis_beim_kunden_pro_kwh: number,
    wb_hu: number
}

interface IMapContext {
    map: MapboxMap | null;
    setMap: (map: MapboxMap) => void;
    selectedBuilding: IBuildingData | null;
    selectBuilding: (building: IBuildingData | null) => void;
    showAreas: boolean;
    setShowAreas: (show: boolean) => void;
}

const MapContext = createContext<IMapContext>({
    map: null,
    setMap: () => { },
    selectedBuilding: null,
    selectBuilding: () => { },
    showAreas: true,
    setShowAreas: () => { }
});

export const MapContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {

    const [map, setMap] = useState<MapboxMap | null>(null);
    const [showAreas, setShowAreas] = useState(true);
    const [selectedBuilding, selectBuilding] = useState<IBuildingData | null>(null);

    return (
        <MapContext.Provider value={{ map, setMap, selectedBuilding, selectBuilding, showAreas, setShowAreas }}>
            {children}
        </MapContext.Provider>
    );
};

export default MapContext;