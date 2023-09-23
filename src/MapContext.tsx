import { createContext, useState } from "react";
import { Map as MapboxMap } from "mapbox-gl";

export interface IBuildingData {
    id: string;
    layer: {id: string, type: string };
    properties: {
        id: string, // unique id
        AGS: string,
        AGS5: string,
        CellCode: string,
        EBZ_Final: number,
        Fest_ID: number,
        Funktion: string,
        GEBAEUDETY: string, // Gebäudetyp
        GEB_HOEHE: number,
        GEB_KLASSE: number,
        GEB_TYP: string,
        GEB_TYP_IF: string,
        Gemeindena: string, // Gemeinde
        JAHRES_T: number,
        Kreisname: string, // Kreis
        OS: string,
        Shape_Area: number,
        Shape_Leng: number,
        VOL: number,
        WB_HU: number, // Wäremebedarf
        WLD_ID: number, // Wäremebedarf pro m2
        spez_WB_HU: number,
        waermepreisBeimKundenProKWh: string
    };
}

interface IMapContext {
    map: MapboxMap | null;
    setMap: (map: MapboxMap) => void;
    selectedBuilding: IBuildingData | null;
    selectBuilding: (building: IBuildingData | null) => void;
}

const MapContext = createContext<IMapContext>({
    map: null,
    setMap: () => { },
    selectedBuilding: null,
    selectBuilding: () => { }
});

export const MapContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {

    const [map, setMap] = useState<MapboxMap | null>(null);
    const [selectedBuilding, selectBuilding] = useState<IBuildingData | null>(null);

    return (
        <MapContext.Provider value={{ map, setMap, selectedBuilding, selectBuilding }}>
            {children}
        </MapContext.Provider>
    );
};

export default MapContext;