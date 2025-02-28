import * as ST from '@/5_shared/types';
import * as olProj from 'ol/proj';

type Props = {
  coordinateSystemType: ST.CSTypes;
  originLonLat: number[][];
};

// EPSG_3857 -> EPSG_4326
// EPSG_4326 -> EPSG_4326
export const utilTransformEPSG4326 = ({
  coordinateSystemType,
  originLonLat,
}: Props) => {
  switch (coordinateSystemType) {
    case ST.CSTypes['EPSG_3857']:
      return originLonLat.map((list) => olProj.toLonLat(list));
    default:
      // EPSG_4326:WGS84
      return originLonLat;
  }
};
