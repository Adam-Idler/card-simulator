import React from "react";
import { Card } from "../../components/Card";
import styled from "styled-components";
import heart from './suits/heart.png';
import tambourine from './suits/tambourine.png';
import cross from './suits/cross.png';
import spades from './suits/spades.png';
import cardShirt from './cardShirt.png';

const Suit = styled.div`
  background: url(${props => props.image}) center no-repeat;
  background-size: cover;
  ${props => {
    switch (props.image) {
      case heart:
        return 'width: 74px; height: 71px;';
        break;
      case tambourine:
        return 'width: 72px; height: 90px;';
        break;
      case cross:
        return 'width: 67px; height: 70px;';
        break;
      case spades:
        return 'width: 74px; height: 86px;';
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
  top: 0px;
  left: 10px;
  color: ${props => props.color};

  &.reverse {
      transform: rotate(-180deg);
      bottom: 0px;
      right: 10px;
      left: auto;
  }
`;

const CardBackside = styled.div`
  position: absolute;
  width: inherit;
  height: 245px;
  background: url(${cardShirt}) no-repeat center;
  background-size: cover;
`;

export const ClassicCard = React.forwardRef((props, ref) => {
  const color = props.cardData.suit === 'heart' || props.cardData.suit === 'tambourine' ? '#e10000' : 'black';

  switch (props.cardData.suit) {
    case 'heart':
      props.cardData.image = heart;
      break;
    case 'tambourine':
      props.cardData.image = tambourine;
      break;
    case 'cross':
      props.cardData.image = cross;
      break;
    case 'spades':
      props.cardData.image = spades;
      break;
  }

  return (
    <Card {...props} ref={ref}>
      {!props.backSide
        ?
          <>
            <CardValue color={color}>
              {props.cardData.name}
              <SuitMini image={props.cardData.image} />
            </CardValue>
            <CardValue color={color} className="reverse">
              {props.cardData.name}
              <SuitMini image={props.cardData.image} />
            </CardValue>
            <Suit image={props.cardData.image} />
          </>
        :
          <CardBackside />
      }
    </Card>
  );
});