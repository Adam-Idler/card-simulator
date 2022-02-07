import styled from "styled-components";

export const PlayerGround = styled.div`
    &.first {
        bottom: 0;
        align-items: flex-end;
    }
    &.second {
        top: 0;
    }
    display: flex;
    justify-content: center;
    width: 70%;
    height: 250px;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
`;