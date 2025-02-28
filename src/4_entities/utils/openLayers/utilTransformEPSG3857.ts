import * as olProj from 'ol/proj';
import * as ST from '@/5_shared/types';

type CoordinateSystemType = {
  coordinateSystemType: ST.CSTypes;
};

type Props = CoordinateSystemType & {
  originLonLat: number[][];
};

type SingleProps = CoordinateSystemType & {
  originLonLat: number[];
};

// EPSG_4326 -> EPSG_3857
// EPSG_3857 -> EPSG_3857
export const utilTransformEPSG3857_isArr = ({
  coordinateSystemType,
  originLonLat,
}: Props) => {
  switch (coordinateSystemType) {
    case ST.CSTypes['EPSG_4326']:
      return originLonLat.map((list) => olProj.fromLonLat(list));
    default:
      return originLonLat;
  }
};

export const utilTransformEPSG3857_nonArr = ({
  coordinateSystemType,
  originLonLat,
}: SingleProps) => {
  switch (coordinateSystemType) {
    case ST.CSTypes['EPSG_4326']:
      return olProj.fromLonLat(originLonLat);
    default:
      return originLonLat;
  }
};
