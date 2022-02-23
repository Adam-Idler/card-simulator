import React from "react";
import styled from "styled-components";

const CardElem = styled.div`
    background: ${props => props.backSide ? 'transparent' : '#fff'};
    position: relative;
    width: 170px;
    height: 230px;
    border: ${props => props.backSide ? '' : '0.5px solid #000'};
    opacity: 1;
    border-radius: 7px;
    display: flex;
    user-select: none;

    &.user-card {
        ${'' /* cursor: pointer; */}
        margin-bottom: -68px;
    }

    .black-jack &.user-card {
        ${'' /* cursor: default; */}
    }

    &:last-child {
        margin-right: 0 !important;
    }
`;

export const Card = React.forwardRef((props, ref) => <CardElem {...props} ref={ref} />)