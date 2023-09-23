import { useContext, useEffect, useRef } from "react";
import { Map as MapboxMap } from "mapbox-gl";
import MapContext from "./MapContext";

const Map: React.FC = () => {

    const { setMap } = useContext(MapContext);

    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {

        let map: MapboxMap | null = null;

        if (ref.current) {

            map = new MapboxMap({
                container: ref.current,
                accessToken: (window as any).MAPBOX_ACCESS_TOKEN,
                style: "mapbox://styles/mapbox/light-v11",
                center: [7.613244500537093, 51.956803443781894],
                zoom: 11,
                maxBounds: [
                    [7.354098960738185, 51.76145064868882],
                    [7.872005787040393, 52.13665933861387]
                ]
            });

            // for  console debugging
            (window as any).map = map;

            setMap(map);
        }

        return () => {
            map?.remove();
        };

    }, [ref.current]);

    return (
        <div ref={ref} style={{ position: "absolute", top: 0, right: 0, bottom: 0, left: 0 }}>
        </div>
    );
};

export default Map;