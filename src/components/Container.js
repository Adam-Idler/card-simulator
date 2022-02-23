import React from "react";
import styled from "styled-components";

const ContainerElem = styled.div`
  display: flex;
  align-self: center;

  &.middle {
      width: 100%;
      height: 20%;
  }

  ${'' /* &.top {
      align-self: center;
  }

  &.bottom {
      align-self: flex-end;
  } */}
`;

export const Container = React.forwardRef((props, ref) => <ContainerElem {...props} ref={ref} />)