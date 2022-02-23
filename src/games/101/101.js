import styled from "styled-components";
import { PlaySide } from "../../components/PlaySide";
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { useEffect, useState } from "react";
import { ClassicCard } from "../../cardsTypes/classicCard/ClassicCard";
import { classicDeckData } from "../../cardsTypes/classicCard/classicDeckData";
import { Container } from "../../components/Container";
import { GameWrapper } from "../../components/GameWrapper";
import { Deck } from "../../components/Deck";
import { getCard } from "../../common/getCard";
import { shuffle } from "../../common/shuffle";

export function Game101() {
  const defaultDeck = [...classicDeckData];
  const [deck, setDeck] = useState(defaultDeck);
  const [userCards, setUserCards] = useState([]);
  const [enemyCards, setEnemyCards] = useState([]);

  useEffect(() => { shuffle(deck) }, []);
  useEffect(() => getCard(setUserCards, deck, 4), []);
  useEffect(() => getCard(setEnemyCards, deck, 3), []);

  function handleOnDragEnd(result) {
    if (!result.destination) return;
    const items = Array.from(userCards);
    const [reorderedItems] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItems);

    setUserCards(items);
  }

  return (
    <GameWrapper>
      <PlaySide className="left">
        <Deck deck={deck} Card={ClassicCard} />
      </PlaySide>

      <PlaySide className="middle">
        <Container className="top">
          {enemyCards.map((card, index) =>
            <ClassicCard
              key={index}
              cardData={card}
              backSide
              style={{ marginRight: `calc(9px - ${enemyCards.length * 8}px)`, marginTop: '-70px' }}
            />
          )}
        </Container>

        <DragDropContext onDragEnd={handleOnDragEnd}>
          <Droppable droppableId="userCards" direction="horizontal">
            {(provided) =>
              <Container className="bottom" {...provided.droppableProps} ref={provided.innerRef}>
                {userCards.map((card, index) => 
                  <Draggable key={`card-${index}`} draggableId={`card-${index}`} index={index}>
                    {(provided) =>
                      <ClassicCard
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        ref={provided.innerRef}
                        cardData={card}
                        className="user-card"
                      />
                    }
                  </Draggable>
                )}
                {provided.placeholder}
              </Container>
            }
          </Droppable>
        </DragDropContext>
      </PlaySide>
    </GameWrapper>
  );
};