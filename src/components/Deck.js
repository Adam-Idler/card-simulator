import styled from "styled-components";
import cardShirt from '../cardsTypes/classicCard/cardShirt.png';

const DeckWrapper = styled.div`
    position: relative;
    top: 25%;
    left: 15px;
    width: 207px;
    height: 300px;
`;

const CardBackside = styled.div`
    position: absolute;
    width: 207px;
    height: 300px;
    background: url(${cardShirt}) no-repeat center;
    background-size: cover;
`;

const CardCounter = styled.span`
    font-size: 22px;
    position: absolute;
    color: #fff;
    top: -15px;
    right: -35px;
`;

export function Deck({ deck }) {
    return (
        <DeckWrapper>
            <CardCounter>{deck.length}</CardCounter>
            { deck.map( (card, i) => <CardBackside key={i} style={{top: `calc(0% - ${i/2}px)`, left: `calc(0px - ${i/4}px)`}} /> ) }
        </DeckWrapper>
    )
}