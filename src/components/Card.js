import styled from "styled-components";

export const Card = styled.div`
    background: ${props => props.backSide ? 'transparent' : '#fff'};
    position: relative;
    width: 170px;
    height: 220px;
    border: ${props => props.backSide ? '' : '0.5px solid #000'};
    opacity: 1;
    border-radius: 7px;
    display: flex;

    &.user-card {
        margin-bottom: -70px;
    }

    &:last-child {
        margin-right: 0 !important;
    }
`;
