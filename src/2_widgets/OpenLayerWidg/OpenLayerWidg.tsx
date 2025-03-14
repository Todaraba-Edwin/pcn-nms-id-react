import 'ol/ol.css';
import * as F from '@/3_features';
import * as EH from '@/4_entities/hooks';
import * as EU from '@/4_entities/utils';
import * as SC from '@/5_shared/constants';

export const OpenLayerWidg = () => {
    const { map, mapRef } = EH.useOpenLayers();
    EU.utilAddLine({
        map,
        trackLocationType: 'L5',
        trackType: 'L',
        trackStandard: 12,
        lineList: SC.exam_EPSG_3857_1,
    });
    EU.utilAddLine({
        map,
        trackLocationType: 'L6',
        trackType: 'L',
        trackStandard: 24,
        lineList: SC.exam_EPSG_3857_2,
    });
    EU.utilAddLine({
        map,
        trackLocationType: 'L6',
        trackType: 'L',
        trackStandard: 72,
        lineList: SC.exam_EPSG_3857_3,
    });
    EU.utilAddLine({
        map,
        trackLocationType: 'L6',
        trackType: 'L',
        trackStandard: 144,
        lineList: SC.exam_EPSG_3857_4,
    });
    EU.utilAddLine({
        map,
        trackLocationType: 'L6',
        trackStandard: 0,
        trackType: 'LI',
        lineList: SC.exam_EPSG_3857_5,
    });
    EU.utilAddLine({
        map,
        trackLocationType: 'L6',
        trackStandard: 0,
        trackType: 'LR',
        lineList: SC.exam_EPSG_3857_6,
    });
    EU.utilAddLine({
        map,
        trackLocationType: 'L5',
        trackStandard: 0,
        trackType: 'LN',
        lineList: SC.exam_EPSG_3857_7,
    });
    EU.utilAddLine({
        map,
        trackLocationType: 'L5',
        trackType: 'L',
        trackStandard: 24,
        lineList: SC.exam_EPSG_3857_8,
    });
    EU.utilAddLine({
        map,
        trackLocationType: 'L5',
        trackType: 'L',
        trackStandard: 72,
        lineList: SC.exam_EPSG_3857_9,
    });

    return <F.OpenLayersBody mapRef={mapRef} map={map} />;
};

// import * as ST from '@/5_shared/types';
// EU.utilAddLine({
//   map,
//   lineList: SC.exam_EPSG_4326,
//   coordinateSystemType: ST.CSTypes.EPSG_4326,
// });
