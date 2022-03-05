import React from "react";
import styled from "styled-components";

const CardElem = styled.div`
  background: ${({ backSide }) => backSide ? 'transparent' : '#fff'};
  position: relative;
  width: 170px;
  min-width: 170px;
  height: 230px;
  border: ${({ backSide }) => backSide ? '' : '0.5px solid #000'};
  padding: 0 10px;
  box-sizing: border-box;
  opacity: 1;
  border-radius: 7px;
  display: flex;
  user-select: none;

  &.user-card {
    margin-bottom: -68px;
    transition: box-shadow .3s ease;

    &.cant-played:hover {
      box-shadow: 0px 0px 10px 7px #863232;
      z-index: 1000;
    }

    &.can-played:hover {
      box-shadow: 0px 0px 10px 5px #15ac13;
      z-index: 1000;
    }
  }

  &.choose-card {
    cursor: pointer;
    transition: transform .3s;

    &:hover {
      transform: scale(1.05);
    }
  }

  &:last-child {
    margin-right: 0 !important;
  }
`;

export const Card = React.forwardRef((props, ref) => <CardElem {...props} ref={ref} />)