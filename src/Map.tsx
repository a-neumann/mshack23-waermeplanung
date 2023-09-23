import { useContext, useEffect, useRef } from "react";
import { Map, MapLayerMouseEvent, MapboxEvent, Map as MapboxMap } from "mapbox-gl";
import MapContext, { IBuildingData } from "./MapContext";

const Map: React.FC = () => {

    const { map, setMap, selectedBuilding, selectBuilding } = useContext(MapContext);

    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {

        let map: MapboxMap | null = null;

        if (ref.current) {

            map = new MapboxMap({
                container: ref.current,
                accessToken: (window as any).MAPBOX_ACCESS_TOKEN,
                style: "mapbox://styles/muenster-heatmap/clmvw135102nj01qu934fc23w",
                center: [7.613244500537093, 51.956803443781894],
                zoom: 11,
                maxBounds: [
                    [7.354098960738185, 51.76145064868882],
                    [7.872005787040393, 52.13665933861387]
                ]
            });

            // for  console debugging
            (window as any).map = map;

            map.once("idle", e => {
                setMap(e.target);
            });
        }

        return () => {
            map?.remove();
        };

    }, []);

    useEffect(() => {

        if (map) {

            const listener = (e: MapLayerMouseEvent) => {

                console.log("selected building: ", e.features?.[0]);

                const building = e.features?.[0] as unknown as IBuildingData;

                if (building.id === selectedBuilding?.properties.id) {
                    selectBuilding(null);
                } else {
                    selectBuilding(building);
                }

            };

            map.on("click", "buildings-fills", listener);

            return () => {
                map.off("click", "buildings-fills", listener);
            };
        }

    }, [map, selectedBuilding, selectBuilding]);

    useEffect(() => {

        map?.setFilter("selected-building-fill", [
            "all",
            [
              "match",
              ["id"],
              [selectedBuilding?.properties.id ?? 99999999999999],
              true,
              false
            ]
        ]);

    }, [selectedBuilding, map]);

    return (
        <div ref={ref} style={{ position: "absolute", top: 0, right: 0, bottom: 0, left: 0 }}>
        </div>
    );
};

export default Map;