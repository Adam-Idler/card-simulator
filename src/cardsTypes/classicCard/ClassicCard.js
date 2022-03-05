import React from "react";
import { Card } from "../../components/Card";
import styled from "styled-components";
import heart from './suits/heart.png';
import tambourine from './suits/tambourine.png';
import cross from './suits/cross.png';
import spades from './suits/spades.png';
import cardShirt from './cardShirt.png';

const Suit = styled.div`
  background: url(${({ image }) => image}) center no-repeat;
  background-size: cover;
  ${({ image }) => {
    switch (image) {
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
  ${({ image }) => {
    switch (image) {
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
  max-width: 25px;
  display: flex;
  flex-direction: column;
  align-items: center;
  color: ${({ color }) => color};

  &.reverse {
    transform: rotate(-180deg);
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
              <span>{props.cardData.name}</span>
              <SuitMini image={props.cardData.image} />
            </CardValue>

            <Suit image={props.cardData.image} />

            <CardValue color={color} className="reverse">
              <span>{props.cardData.name}</span>
              <SuitMini image={props.cardData.image} />
            </CardValue>
          </>
        :
          <CardBackside />
      }
    </Card>
  );
});