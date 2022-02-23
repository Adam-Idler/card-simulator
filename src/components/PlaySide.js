import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  align-items: center;

  &.left {
    width: 15%;
    justify-self: flex-start;
    justify-content: center;
  }

  &.middle {
    width: 70%;
    justify-self: center;
    flex-direction: column;
    justify-content: space-between;
  }

  &.right {
    width: 15%;
    flex-direction: column;
    align-items: center;    
    justify-content: center;
  }
`;

export const PlaySide = (props) => <Wrapper {...props} />