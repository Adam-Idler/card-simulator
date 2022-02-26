import React from "react";
import styled from "styled-components";

const ContainerElem = styled.div`
  display: flex;
  justify-self: center;

  &.middle {
    width: 170px;
    height: 33%;
    justify-content: center;
  }

  &.top {
    justify-self: flex-start;
  }

  &.bottom {
    height: 165px;
    max-width: 100%;
    justify-self: flex-end;
    align-items: flex-end;
  }
`;

export const Container = React.forwardRef((props, ref) => <ContainerElem {...props} ref={ref} />)