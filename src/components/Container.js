import styled from "styled-components";

export const Container = styled.div`
    &.vertical {
        width: 70%;
        height: 250px;
        left: 50%;
        transform: translateX(-50%);
        
    }
    &.bottom {
        bottom: 0;
        align-items: flex-end;
    }
    &.top {
        top: 0;
    }
    &.horizontal {
        flex-direction: column;
        align-items: center;
        top: 50%;
        transform: translateY(-50%);
    }
    &.right {
        right: 20px;
    }
    &.left {
        left: 20px;
    }
    display: flex;
    justify-content: center;
    position: absolute;
`;