import styled from "styled-components";

export const Card = styled.div`
    position: relative;
    width: 200px;
    min-width: 180px;
    height: 220px;
    background: white;
    opacity: 1;
    margin-right: 7px;
    border: .5px solid #000;
    border-radius: 7px 7px 0 0;
    display: flex;

    &:last-child {
        margin-right: 0;
    }
`;
