import * as R from 'react';
import * as EU from '@/4_entities/utils';
import * as SC from '@/5_shared/constants';
import * as SIOl from '@/5_shared/imports/openLayersImports';
import * as ST from '@/5_shared/types';

type Props = {
  examLines: number[][][];
};

export const useOpenLayers = ({ examLines }: Props) => {
  const { testPosition } = SC.examlocations;
  const mapRef = R.useRef<HTMLDivElement>(null);

  R.useEffect(() => {
    if (!mapRef.current) return;

    const map = new SIOl.Map({
      target: mapRef.current,
      layers: [
        new SIOl.OlLayer({
          source: SC.mapSources.OSM,
        }),
      ],
      view: new SIOl.View({
        projection: 'EPSG:3857', // 기본좌표계 EPSG:3857(Web Merctor)
        center: EU.utilTransformEPSG3857_nonArr({
          coordinateSystemType: ST.CSTypes['EPSG_4326'],
          originLonLat: testPosition,
        }),
        zoom: 12,
      }),
    });

    examLines.forEach((list) => {
      EU.utilAddLine({
        map,
        lineList: list,
      });
    });

    return () => map.setTarget(undefined);
  }, [testPosition, examLines]);
  return { mapRef };
};
