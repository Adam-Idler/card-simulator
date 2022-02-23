import styled from "styled-components";

const DeckWrapper = styled.div`
  position: relative;
  width: 170px;
  height: 230px;
`;

const CardCounter = styled.span`
  font-size: 18px;
  position: absolute;
  color: #fff;
  user-select: none;
  top: -15px;
  right: -35px;
`;

export function Deck({ deck, Card }) {
  return (
    <DeckWrapper>
      <CardCounter>{deck.length}</CardCounter>
      {deck.map((card, i) => <Card key={i} cardData={card} style={{ position: 'absolute', top: `calc(0% - ${i / 2}px)`, left: `calc(0px - ${i / 4}px)` }} backSide />)}
    </DeckWrapper>
  )
}