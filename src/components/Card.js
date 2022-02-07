import styled from "styled-components";

export const Card = styled.div`
    position: relative;
    width: 180px;
    height: 220px;
    background: white;
    opacity: 1;
    margin-right: 7px;
    border-radius: 7px 7px 0 0;
    display: flex;

    &:last-child {
        margin-right: 0;
    }
`;