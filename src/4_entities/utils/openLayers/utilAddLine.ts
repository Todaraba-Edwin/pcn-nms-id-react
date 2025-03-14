import * as EU from '@/4_entities/utils';
import * as ST from '@/5_shared/types';
import * as SIOl from '@/5_shared/imports/openLayersImports';

type Props = {
    map: SIOl.OlMap;
    lineList: SIOl.Coordinate[];
    trackLocationType: 'L5' | 'L6';
    /*
      •	L5  : 가공선로 : 땅 위에 설치한 선로 
      •	L6  : 지중선로 : 땅 아래 설치한 선로
    */
    trackStandard: number;
    trackType: 'L' | 'LI' | 'LR' | 'LG' | 'LN' | 'LC';
    /*
      •	L   : 통신선로 
      •	LI  : 전기선로
      •	LR  : 임대선로
      •	LG  : 관로
      •	LN  : 복합장비선로 - 메인 Pole 미공유
      •	LC  : 복합장비선로 - 메인 Pole 공유
    */
    coordinateSystemType?: ST.CSTypes;
};

const trackColorType = {
    L: ['#ff5500', '#0052d6', '#00bd39', '#ff80ff'],
    LI: ['#000000'],
    LR: ['#adadad'],
    LG: ['#ff0505'],
    LN: ['#ffff1a'],
    LC: ['#00ff80'],
};

/*
  •	거리계산 시의 좌표계 EPSG:4326(WGS 84)
  •	EPSG:3857(Web Mercator) - 지리정보를 평면으로 투영하는 과정에서 거리와 면적에 왜곡이 발생
    고위도지역에서는 실제보다 길어지고, 저위도 지역에서는 실제보다 짧아짐

  •	EPSG:4326(WGS 84) -> EPSG:3857 -> EPSG:4326 : SIOl.toLonLat()
    위도/경도를 사용하여, 이를 활용해 지구 곡률을 반영한 거리 계산이 가능
    OpenLayers의 getDistance() : 두 점 사이의 대권거리를 계산한다는 점에서 적합
 */

const getColor = ({
    trackType,
    trackStandard,
}: {
    trackType: Props['trackType'];
    trackStandard: Props['trackStandard'];
}) => {
    return trackType === 'L'
        ? trackStandard >= 144
            ? trackColorType[trackType][3]
            : trackStandard >= 72
            ? trackColorType[trackType][2]
            : trackStandard >= 24
            ? trackColorType[trackType][1]
            : trackColorType[trackType][0]
        : trackColorType[trackType][0];
};

export const utilAddLine = ({
    map,
    lineList,
    trackStandard,
    coordinateSystemType = ST.CSTypes.EPSG_3857,
    trackLocationType,
    trackType,
}: Props) => {
    const lineDate = EU.utilTransformEPSG3857_isArr({
        coordinateSystemType,
        originLonLat: lineList,
    });

    if (!map) return;
    const isLineDash = trackLocationType === 'L6';
    const totalDistance = lineDate.reduce((acc, coord, index) => {
        if (index === 0) return acc;
        const currentCoord = SIOl.toLonLat(coord);
        const prevCoord = SIOl.toLonLat(lineDate[index - 1]);
        return acc + SIOl.getDistance(prevCoord, currentCoord);
    }, 0);

    const totalDistanceNumber = parseFloat(totalDistance.toFixed(1));

    const textFeature = new SIOl.Feature({
        geometry: new SIOl.LineString(lineDate),
    });

    // OpenLayers의 Feature 클래스는 스타일을 속성으로 받지 않고, 따로 설정하는 방식으로 구성
    textFeature.setStyle(
        new SIOl.Style({
            stroke: new SIOl.Stroke({
                color: getColor({ trackType, trackStandard }),
                width: 4,
                ...(isLineDash && {
                    lineDash: [7, 5],
                    lineCap: 'round',
                    /*
                    •	butt : 선의 끝을 직선으로 자름
                    •	square : 선의 끝을 직각으로 자른 후, 선의 너비만큼 확장
                    •	round : 반원 모양으로 처리, 선 끝이 자연스럽고 부드러움
                  */
                    lineJoin: 'bevel',
                    /*
                    •	miter: 날카롭고 각진 연결
                    •	round: 부드럽고 둥근 연결
                    •	bevel: 직각으로 잘라서 연결
                 */
                }),
            }),
            text: new SIOl.Text({
                font: `bold 11px Verdana`, // 폰트 크기와 글꼴 지정
                text: `${
                    totalDistanceNumber >= 1000
                        ? `${(totalDistanceNumber / 1000).toFixed(1)} km`
                        : `${totalDistanceNumber.toFixed()} m`
                }`,
                placement: 'line',
                textBaseline: 'bottom',
                maxAngle: 360,
                offsetY: -2,
                fill: new SIOl.Fill({
                    color: getColor({ trackType, trackStandard }),
                }),
                overflow: false,
            }),
        })
    );

    const lineVectorLayor = new SIOl.VectorLayer({
        source: new SIOl.VectorSource({
            features: [textFeature],
        }),
    });

    map.addLayer(lineVectorLayor); // 지도에 선 추가
};
