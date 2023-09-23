import { useContext, useEffect, useRef } from "react";
import { MapLayerMouseEvent, MapboxGeoJSONFeature, Map as MapboxMap, Popup } from "mapbox-gl";
import MapContext, { IBuildingData } from "./MapContext";

interface IBuildingCluster {
    properties: {
        Energy_Usage_Label: number,
        Total_WB_HU_MWh_Per_Ha: number,
        city_name: number,
        identifier: string,
        touching_a_heat_line: boolean
    };
    geometry: any;
}

const Map: React.FC = () => {

    const { map, setMap, selectedBuilding, selectBuilding, showAreas } = useContext(MapContext);

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

                console.log("Old selected building", selectedBuilding?.properties.id);

                if (building.properties.id === selectedBuilding?.properties.id) {
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

        if (!map) return;

        const popup = new Popup({
            closeButton: false,
            closeOnClick: false
        });

        const enterListener = (e: MapLayerMouseEvent) => {
            // Change the cursor style as a UI indicator.
            map.getCanvas().style.cursor = "pointer";

            if (e.features?.[0]) {

                const cluster = e.features[0] as unknown as IBuildingCluster;

                // Copy coordinates array.
                const coordinates = cluster.geometry.coordinates.slice();
                const energyLabel = cluster.properties.Energy_Usage_Label;
                const mwhPha = cluster.properties.Total_WB_HU_MWh_Per_Ha;

                const text = "Energie-Label: " + energyLabel + "<br />" +
                    "Wärmeverbrauch pro Hektar: " + mwhPha + " MWh";
                
                // Ensure that if the map is zoomed out such that multiple
                // copies of the feature are visible, the popup appears
                // over the copy being pointed to.
                while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
                    coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
                }
                
                // Populate the popup and set its coordinates
                // based on the feature found.
                popup.setLngLat(coordinates).setHTML(text).addTo(map);
            }
        };

        const mouseLeave = (e: MapLayerMouseEvent) => {

            map.getCanvas().style.cursor = "";
            popup.remove();
        };
             
        map.on("mouseenter", "building-blocks", enterListener);
        map.on("mouseleave", "building-blocks", mouseLeave);

        return () => {
            map.off("mouseenter", "building-blocks", enterListener);
            map.off("mouseleave", "building-blocks", mouseLeave);
        };

    }, [map]);

    useEffect(() => {

        map?.setFilter("selected-building-fill", [
            "all",
            [
              "match",
              ["id"],
              [selectedBuilding?.properties.Shape_Area ?? 99999999999999],
              true,
              false
            ]
        ]);

    }, [selectedBuilding, map]);

    useEffect(() => {

        map?.setLayoutProperty("building-blocks", "visibility", showAreas ? "visible" : "none");

    }, [showAreas, map]);

    return (
        <div ref={ref} style={{ position: "absolute", top: 0, right: 0, bottom: 0, left: 0 }}>
        </div>
    );
};

export default Map;