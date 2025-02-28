import * as SIOl from '@/5_shared/imports/openLayersImports';

type Props = {
  map: SIOl.OlMap;
  lineList: SIOl.Coordinate[];
};

export const utilAddLine = ({ map, lineList }: Props) => {
  const lineCoordinates = lineList;
  console.log('lineCoordinates', lineCoordinates);

  const lineFeature = new SIOl.Feature({
    geometry: new SIOl.LineString(lineCoordinates),
  });

  lineFeature.setStyle(
    new SIOl.Style({
      stroke: new SIOl.Stroke({
        color: 'blue',
        width: 4,
      }),
    })
  );

  // 2. 거리 계산
  const totalDistance = lineCoordinates.reduce((acc, coord, index) => {
    if (index === 0) return acc;
    console.log(`
        acc : ${acc} 
        coord : ${coord} 
        index : ${index} 
      `);

    return acc + SIOl.getDistance(lineCoordinates[index - 1], coord);
  }, 0);

  console.log('totalDistance', totalDistance);

  const totalDistanceNumber = parseFloat(totalDistance.toFixed(1));

  // 3. 중간 지점 계산 (거리 기준으로 중간 지점 찾기)
  let distanceTraveled = 0;
  let midPoint = lineCoordinates[0];

  for (let i = 1; i < lineCoordinates.length; i++) {
    const segmentDistance = SIOl.getDistance(
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
    return new SIOl.Style({
      text: new SIOl.Text({
        text: `${totalDistance} m`,
        font: `bold ${getFontSize(zoomLevel)} Arial`,
        fill: new SIOl.Fill({ color: 'red' }),
        stroke: new SIOl.Stroke({ color: 'white', width: 2 }),
        offsetY: -10,
      }),
      image: new SIOl.Circle({
        radius: 5,
        fill: new SIOl.Fill({ color: 'red' }),
        stroke: new SIOl.Stroke({ color: 'white', width: 2 }),
      }),
    });
  };

  // 중간 지점 텍스트
  const textFeature = new SIOl.Feature({
    geometry: new SIOl.Point(midPoint),
  });

  textFeature.setStyle(updateTextStyle());

  // 줌 레벨이 변경될 때마다 텍스트 스타일을 업데이트
  map.on('moveend', () => {
    textFeature.setStyle(updateTextStyle());
  });

  const vectorSource = new SIOl.VectorSource({
    features: [lineFeature, textFeature],
  });

  const vectorLayer = new SIOl.VectorLayer({
    source: vectorSource,
  });

  map.addLayer(vectorLayer); // 지도에 선 추가
};
