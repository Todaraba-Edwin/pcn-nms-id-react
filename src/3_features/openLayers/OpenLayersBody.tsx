import 'ol/ol.css';
import * as S from './style';

type Props = {
  mapRef: React.RefObject<HTMLDivElement | null>;
};

export const OpenLayersBody = ({ mapRef }: Props) => {
  return (
    <S.Layout>
      <h1>OpenLayers Exam</h1>
      <S.OpenLayersArea ref={mapRef} />
    </S.Layout>
  );
};
