import { useEffect, useRef } from 'react';
import { geolocations } from '@/5_shared/constants';
// OL 초기설정 관련
import 'ol/ol.css';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
// OL 지도제공 관련
import { OSM, XYZ } from 'ol/source';
// OL 좌표설정 관련
import { fromLonLat } from 'ol/proj';
// OL 라인그리기 관련
import { utilAddLine } from './part/utilAddLine';

const mapSources = {
  OSM: new OSM(),
  CartoDB_Dark: new XYZ({
    url: 'https://{1-4}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{scale}.png',
  }),
  CartoDB_Light: new XYZ({
    url: 'https://{1-4}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{scale}.png',
  }),
};

type Props = {
  examLines: number[][][];
};

export const useOpenLayers = ({ examLines }: Props) => {
  const mapRef = useRef(null);
  const { namYangJu: currentLocation } = geolocations;

  useEffect(() => {
    if (!mapRef.current) return;
    const map = new Map({
      target: mapRef.current,
      layers: [
        new TileLayer({
          source: mapSources.OSM,
        }),
      ],
      view: new View({
        center: fromLonLat([currentLocation[0], currentLocation[1]]), // 초기 중심 좌표
        zoom: 10, // 초기 줌 레벨
      }),
    });

    examLines.forEach((list) => {
      utilAddLine({
        map,
        lineList: list,
      });
    });

    return () => map.setTarget(undefined);
  }, [currentLocation, examLines]);
  return { mapRef };
};



