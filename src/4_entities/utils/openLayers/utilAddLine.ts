import { getDistance } from 'ol/sphere';
import Feature from 'ol/Feature';
import LineString from 'ol/geom/LineString';
import { Stroke, Style } from 'ol/style';
import Point from 'ol/geom/Point';
import Fill from 'ol/style/Fill';
import Text from 'ol/style/Text';
import Circle from 'ol/style/Circle';
import OlMap from 'ol/Map';
import { Coordinate } from 'ol/coordinate';
import VectorSource from 'ol/source/Vector';
import VectorLayer from 'ol/layer/Vector';

type Props = {
  map: OlMap;
  lineList: Coordinate[];
};

export const utilAddLine = ({ map, lineList }: Props) => {
  const lineCoordinates = lineList;

  const lineFeature = new Feature({
    geometry: new LineString(lineCoordinates),
  });

  lineFeature.setStyle(
    new Style({
      stroke: new Stroke({
        color: 'blue',
        width: 4,
      }),
    })
  );

  // 2. 거리 계산
  const totalDistance = lineCoordinates.reduce((acc, coord, index) => {
    if (index === 0) return acc;
    return acc + getDistance(lineCoordinates[index - 1], coord);
  }, 0);

  const totalDistanceNumber = parseFloat(totalDistance.toFixed(1));

  // 3. 중간 지점 계산 (거리 기준으로 중간 지점 찾기)
  let distanceTraveled = 0;
  let midPoint = lineCoordinates[0];

  for (let i = 1; i < lineCoordinates.length; i++) {
    const segmentDistance = getDistance(
      lineCoordinates[i - 1],
      lineCoordinates[i]
    );
    distanceTraveled += segmentDistance;

    if (distanceTraveled >= totalDistanceNumber / 2) {
      midPoint = [
        (lineCoordinates[i - 1][0] + lineCoordinates[i][0]) / 2,
        (lineCoordinates[i - 1][1] + lineCoordinates[i][1]) / 2,
      ];
      break;
    }
  }

  // 줌 레벨에 따른 폰트 크기 동적으로 조정
  const getFontSize = (zoomLevel: number) => {
    if (zoomLevel < 13) return '0px';
    if (zoomLevel < 15) return '10px';
    if (zoomLevel < 17) return '15px';
    return '20px';
  };

  const updateTextStyle = () => {
    const zoomLevel = map.getView().getZoom() ?? 0; // 현재 줌 레벨
    return new Style({
      text: new Text({
        text: `${totalDistance} m`,
        font: `bold ${getFontSize(zoomLevel)} Arial`,
        fill: new Fill({ color: 'red' }),
        stroke: new Stroke({ color: 'white', width: 2 }),
        offsetY: -10,
      }),
      image: new Circle({
        radius: 5,
        fill: new Fill({ color: 'red' }),
        stroke: new Stroke({ color: 'white', width: 2 }),
      }),
    });
  };

  // 중간 지점 텍스트
  const textFeature = new Feature({
    geometry: new Point(midPoint),
  });

  textFeature.setStyle(updateTextStyle());

  // 줌 레벨이 변경될 때마다 텍스트 스타일을 업데이트
  map.on('moveend', () => {
    textFeature.setStyle(updateTextStyle());
  });

  const vectorSource = new VectorSource({
    features: [lineFeature, textFeature],
  });

  const vectorLayer = new VectorLayer({
    source: vectorSource,
  });

  map.addLayer(vectorLayer); // 지도에 선 추가
};
