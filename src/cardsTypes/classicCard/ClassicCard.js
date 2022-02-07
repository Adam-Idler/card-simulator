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
    margin: 0 auto;
`;

const SuitMini = styled(Suit)`
    margin: 0;
    ${props => {
        switch (props.image) {
            case heart:
                return 'max-width: 21.5px; max-height: 19.4px';
                break;
            case tambourine:
                return 'max-width: 21px; max-height: 26px';
                break;
            case cross:
                return 'max-width: 21px; max-height: 21px';
                break;
            case spades:
                return 'max-width: 21.5px; max-height: 24px';
                break;
        }
    }}
`;

const CardValue = styled.span`
    font-size: 32px;
    font-weight: bold;
    position: absolute;
    max-width: 25px;
    display: flex;
    flex-direction: column;
    align-items: center;
    top: 5px;
    left: 10px;
    color: ${props => props.color};

    &.reverse {
        transform: rotate(-180deg);
        bottom: 5px;
        right: 10px;
        left: auto;
    }
`;

export function ClassicCard({ cardData, style, className }) {
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
        <Card style={style} className={className}>
            <CardValue color={color}>
                {cardData.name}
                <SuitMini image={cardData.image} />
            </CardValue>
            <CardValue color={color} className="reverse">
                {cardData.name}
                <SuitMini image={cardData.image} />
            </CardValue>
            <Suit image={cardData.image} />
        </Card>
    );
};