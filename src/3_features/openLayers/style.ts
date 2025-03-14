import styled from 'styled-components';

export const Layout = styled.main`
    width: 100dvw;
    height: 100dvh;
    display: grid;
    grid-template-rows: auto 1fr;
`;

export const OpenLayersArea = styled.figure`
    .custom-zoom.ol-unselectable.ol-control {
        top: 10px;
        left: 10px;
        display: flex;
        flex-direction: column;
        background: transparent;
        gap: 2px;
    }
`;
