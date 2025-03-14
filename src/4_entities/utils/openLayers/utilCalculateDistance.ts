import * as SIOl from '@/5_shared/imports/openLayersImports';

type Props = number[][]

export const utilCalculateDistance = (coordinates: Props): number => {
  if (coordinates.length < 2) return 0;

  let totalDistance = 0;
  for (let i = 0; i < coordinates.length - 1; i++) {
    const [lon1, lat1] = coordinates[i];
    const [lon2, lat2] = coordinates[i + 1];

    totalDistance += SIOl.getDistance([lon1, lat1], [lon2, lat2]); // 미터 단위 거리 계산
  }

  return totalDistance; // 미터 단위 반환
};
