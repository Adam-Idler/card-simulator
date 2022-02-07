import styled from "styled-components";

export const Card = styled.div`
    position: relative;
    width: 200px;
    min-width: 180px;
    height: 280px;
    background: white;
    opacity: 1;
    border: .5px solid #000;
    border-radius: 7px;
    display: flex;

    &.user-card {
        margin-bottom: -80px;
    }

    &:last-child {
        margin-right: 0 !important;
    }
`;
