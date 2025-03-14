import * as R from 'react';
import * as EU from '@/4_entities/utils';
import * as SC from '@/5_shared/constants';
import * as ST from '@/5_shared/types';
import * as SIOl from '@/5_shared/imports/openLayersImports';

export const useOpenLayers = () => {
    const mapRef = R.useRef<HTMLDivElement>(null);
    const [map, setMap] = R.useState<SIOl.Map | null>(null);

    R.useEffect(() => {
        if (!mapRef.current) return;

        // 한반도 전체 범위(EPSG_4326)
        const [west, south, east, north] = [116, 32, 141, 44];
        const mapExtent = EU.utilTransformEPSG3857_isArr({
            coordinateSystemType: ST.CSTypes.EPSG_4326,
            originLonLat: [
                [west, south],
                [east, north],
            ],
        }).flat();        

        const newMap = new SIOl.Map({
            target: mapRef.current,
            layers: [SC.mapSources],
            controls: [new SIOl.OlZoom({ className: 'custom-zoom' })],
            view: new SIOl.View({
                projection: 'EPSG:3857',
                center: EU.utilTransformEPSG3857_nonArr({
                    coordinateSystemType: ST.CSTypes['EPSG_4326'],
                    originLonLat: SC.examlocations.namYangJu,
                }),
                zoom: 12,
                minZoom: 7,
                extent: mapExtent,
            }),
        });

        setMap(newMap);

        return () => newMap.setTarget(undefined);
    }, []);

    return { mapRef, map };
};
