import styled from "styled-components";

export const GameMessage = styled.h3`
  margin: 0;
  font-size: 32px;
  text-align: center;
  color: #eee;

  &.win {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: #03d203;
  }

  &.loss {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: #e50b16;
  }
`;
