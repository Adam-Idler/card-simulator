import styled from "styled-components";

export const GameButton = styled.button`
  cursor: pointer;
  background: transparent;
  outline: none;
  min-width: 180px;
  max-width: 200px;
  font-size: 18px;
  color: #eee;
  border: 2px solid #eee;
  border-radius: 8px;
  padding: 5px 0px;
  transition: opacity .2s, transform .1s;
  ${props =>
    props.disabled
      ? 'opacity: .6; cursor: not-allowed;'
      : ""
}

  &:hover {
    opacity: .7;
  }

  &:active {
    transform: scale(1.04);
  }
`;
