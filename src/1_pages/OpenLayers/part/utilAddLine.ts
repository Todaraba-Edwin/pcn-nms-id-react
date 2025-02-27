// OL 라인그리기 관련
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import Feature from 'ol/Feature';
import LineString from 'ol/geom/LineString';
import Stroke from 'ol/style/Stroke';
import Style from 'ol/style/Style';
import { fromLonLat } from 'ol/proj';
import OlMap from 'ol/Map';
import { Coordinate } from 'ol/coordinate';

// OL 라인그리기 관련 - M 표시 관련
import { getDistance } from 'ol/sphere';
import Point from 'ol/geom/Point';
import Fill from 'ol/style/Fill';
import Text from 'ol/style/Text';
import Circle from 'ol/style/Circle';

type Props = {
  map: OlMap;
  lineList: Coordinate[];
};

export const utilAddLine = ({ map, lineList }: Props) => {
  const lineCoordinates = [...lineList.map((list) => fromLonLat(list))];

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

  // M 표시
  const totalDistance = lineCoordinates.reduce((acc, coord, index) => {
    if (index === 0) return acc;
    return acc + getDistance(lineCoordinates[index - 1], coord);
  }, 0);

  const totalDistanceNumber = parseFloat(totalDistance.toFixed(1));

  // ✅ 전체 선의 중간 지점 계산 (거리 기준으로 중간 지점 찾기)
  let distanceTraveled = 0;
  let midPoint = lineCoordinates[0];

  for (let i = 1; i < lineCoordinates.length; i++) {
    const segmentDistance = getDistance(
      lineCoordinates[i - 1],
      lineCoordinates[i]
    );
    distanceTraveled += segmentDistance;

    // 중간 지점에 도달하면 해당 좌표로 설정
    if (distanceTraveled >= totalDistanceNumber / 2) {
      midPoint = [
        (lineCoordinates[i - 1][0] + lineCoordinates[i][0]) / 2,
        (lineCoordinates[i - 1][1] + lineCoordinates[i][1]) / 2,
      ];
      break;
    }
  }

  // 줌 레벨에 따라 폰트 크기 동적으로 조정 (반비례로 설정)
  const getFontSize = (zoomLevel: number) => {
    console.log('zoomLevel', zoomLevel);

    if (zoomLevel < 13) return '0px'; // 아주 작은 글씨 (낮은 줌)
    if (zoomLevel < 15) return '10px'; // 아주 작은 글씨 (낮은 줌)
    if (zoomLevel < 17) return '15px'; // 보통 크기 (중간 줌)
    return '20px';
  };

  // 줌 레벨 변경 시 텍스트 스타일을 업데이트하는 함수
  const updateTextStyle = () => {
    const zoomLevel = map.getView().getZoom() ?? 0; // 현재 줌 레벨 가져오기
    return new Style({
      text: new Text({
        text: `${totalDistance} m`,
        font: `bold ${getFontSize(zoomLevel)} Arial`, // 폰트 크기 반비례 적용
        fill: new Fill({ color: 'red' }),
        stroke: new Stroke({ color: 'white', width: 2 }),
        offsetY: -10, // 텍스트 위치 조정
      }),
      image: new Circle({
        radius: 5,
        fill: new Fill({ color: 'red' }),
        stroke: new Stroke({ color: 'white', width: 2 }),
      }),
    });
  };

  // ✅ 전체 거리 텍스트 생성 (중앙에 표시)
  const textFeature = new Feature({
    geometry: new Point(midPoint),
  });

  // 스타일을 업데이트하여 텍스트 크기를 줌 레벨에 맞게 적용
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

  return {};
};
