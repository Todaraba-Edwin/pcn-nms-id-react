import 'ol/ol.css';
import * as F from '@/3_features';
import * as EH from '@/4_entities/hooks';
import * as EU from '@/4_entities/utils';
import * as SC from '@/5_shared/constants';
import * as ST from '@/5_shared/types';

const examLines = [
  EU.utilTransformEPSG3857_isArr({
    coordinateSystemType: ST.CSTypes.EPSG_3857,
    originLonLat: SC.exam_EPSG_3857,
  }),
  EU.utilTransformEPSG3857_isArr({
    coordinateSystemType: ST.CSTypes.EPSG_4326,
    originLonLat: SC.exam_EPSG_4326,
  }),
];

export const OpenLayerWidg = () => {
  const { mapRef } = EH.useOpenLayers({ examLines });

  return <F.OpenLayersBody mapRef={mapRef} />;
};
