import 'ol/ol.css';
import * as R from 'react';
import * as S from './style';
import * as SIOL from '@/5_shared/imports/openLayersImports';

type headerProps = {
    map: SIOL.Map;
};

type bodyProps = headerProps & {
    mapRef: React.RefObject<HTMLDivElement | null>;
};

const Header = ({ map }: headerProps) => {
    const [zoomLevel, setZoomLevel] = R.useState(0); // 초기 줌 레벨

    // 줌 레벨 변경을 추적
    R.useEffect(() => {
        if (!map) return;
        const handleZoomChange = () => {
            setZoomLevel(map.getView().getZoom());
        };
        map.on('moveend', handleZoomChange); // 줌 변경 이벤트
        // Cleanup function
        return () => {
            map.un('moveend', handleZoomChange);
        };
    }, [map]);
    return <h1>OpenLayers Exam : ZoomLevel : {zoomLevel.toFixed()} </h1>;
};

export const OpenLayersBody = ({ mapRef, map }: bodyProps) => {
    return (
        <S.Layout>
            <Header map={map} />
            <S.OpenLayersArea ref={mapRef} />
        </S.Layout>
    );
};
