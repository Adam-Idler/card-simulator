import { Card } from "../../components/Card";
import styled from "styled-components";
import heart from './suits/heart.png';
import tambourine from './suits/tambourine.png';
import cross from './suits/cross.png';
import spades from './suits/spades.png';

const Suit = styled.div`
    background: url(${ props => props.image }) center no-repeat;
    background-size: cover;
    ${props => {
        switch (props.image) {  
            case heart:
                return 'width: 84px; height: 80px;';
                break;
            case tambourine:
                return 'width: 82px; height: 100px;';
                break;
            case cross:
                return 'width: 77px; height: 80px;';
                break;
            case spades:
                return 'width: 84px; height: 96px;';
                break;
        }
    }}
    align-self: center;
    margin: 40px auto 0;
`;

const SuitMini = styled(Suit)`
    margin: 0;
    transform: scale(0.3);
    position: absolute;
    ${props => {
        switch (props.image) {
            case heart:
                return 'top: 20px; left: -22px';
                break;
            case tambourine:
                return 'top: 10px; left: -20px';
                break;
            case cross:
                return 'top: 20px; left: -20px';
                break;
            case spades:
                return 'top: 14px; left: -22px';
                break;
        }
    }}
`;

const CardValue = styled.span`
    font-size: 32px;
    font-weight: bold;
    position: absolute;
    top: 5px;
    left: 10px;
    color: ${props => props.color};
`;

export function ClassicCard({ cardData }) {
    const color = cardData.suit === 'heart' || cardData.suit === 'tambourine' ? '#e10000' : 'black';
    
    switch (cardData.suit) {
        case 'heart':
            cardData.image = heart;
            break;
        case 'tambourine':
            cardData.image = tambourine;
            break;
        case 'cross':
            cardData.image = cross;
            break;
        case 'spades':
            cardData.image = spades;
            break;
    }

    return (
        <Card>
            <CardValue color={color}>{cardData.value}</CardValue>
            <SuitMini image={cardData.image} />
            <Suit image={cardData.image} />
        </Card>
    );
};